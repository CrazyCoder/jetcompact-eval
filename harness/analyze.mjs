// Grades and measures every run under runs/ that has a meta.json.
//   node harness/analyze.mjs [run-id-prefix]
// Writes runs/results.json and prints a per-run table, then per arm-variant
// and per task: mean [min-max] of each metric. Labels are "builtin",
// "jetcompact", or "jetcompact:<variant>" for a variant other than default.
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const runsDir = join(root, 'runs');
const prefix = process.argv[2] ?? '';
const lines = (f) => (existsSync(f) ? readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean) : []);
const ctx = (u) => (u.input_tokens ?? 0) + (u.cache_read_input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0);
const label = (meta) => (meta.arm !== 'jetcompact' ? meta.arm : !meta.variant || meta.variant === 'default' ? 'jetcompact' : `jetcompact:${meta.variant}`);
// A JetCompact compaction that digested old prose logs "old prose digest: N messages, ..."
// (or "old prose summarize: ...") in the outcome line.
const DIGEST = /old prose (?:digest|summarize): [1-9]\d* messages/;

function grade(run, task) {
  const gradeDir = join(root, 'fixtures', 'tasks', task, 'grade');
  const w = mkdtempSync(join(tmpdir(), `grade-${run}-`));
  cpSync(join(runsDir, run, 'work'), w, { recursive: true });
  cpSync(gradeDir, w, { recursive: true });
  const files = readdirSync(join(gradeDir, 'test')).map((f) => `test/${f}`);
  const r = spawnSync(process.execPath, ['--test', '--test-reporter=tap', ...files], { cwd: w, encoding: 'utf8', timeout: 120000 });
  const n = (k) => Number(r.stdout.match(new RegExp(`^# ${k} (\\d+)`, 'm'))?.[1] ?? NaN);
  return { pass: n('pass'), fail: n('fail') };
}

function measure(run) {
  const meta = JSON.parse(readFileSync(join(runsDir, run, 'meta.json'), 'utf8'));
  const stepFiles = readdirSync(join(root, 'fixtures', 'tasks', meta.task, 'steps')).sort();
  const seen = new Map(); // assistant message id -> usage
  const tools = [];
  const compactions = [];
  let lastCtx = 0;
  let cost = 0;
  let phase = 0; // number of compactions so far
  stepFiles.forEach((sf, i) => {
    const tag = String(i + 1).padStart(2, '0');
    const prompt = readFileSync(join(root, 'fixtures', 'tasks', meta.task, 'steps', sf), 'utf8').trim();
    const events = lines(join(runsDir, run, `stream-${tag}.jsonl`));
    const result = events.find((e) => e.type === 'result');
    if (result?.total_cost_usd !== undefined) cost = result.total_cost_usd;
    // A /compact step below the trigger did not run (skipped-NN): no compaction.
    if (prompt === '/compact' && existsSync(join(runsDir, run, `skipped-${tag}`))) return;
    if (prompt === '/compact') {
      const debug = existsSync(join(runsDir, run, `debug-${tag}.log`)) ? readFileSync(join(runsDir, run, `debug-${tag}.log`), 'utf8') : '';
      const req = debug.match(/in (\d+) request\(s\)/);
      compactions.push({ step: tag, ms: result?.duration_ms ?? null, before: lastCtx, after: null, text: (result?.result ?? '').slice(0, 120), jevRequests: req ? Number(req[1]) : 0, digest: DIGEST.test(debug) });
      phase++;
      return;
    }
    for (const e of events) {
      if (e.type !== 'assistant') continue;
      const m = e.message;
      if (m?.usage && !seen.has(m.id)) {
        seen.set(m.id, m.usage);
        const c = ctx(m.usage);
        const open = compactions.at(-1);
        if (open && open.after === null) open.after = c;
        lastCtx = c;
      }
      for (const b of m?.content ?? []) if (b.type === 'tool_use') tools.push({ name: b.name, key: b.name + ' ' + JSON.stringify(b.input), path: b.input?.file_path, command: b.input?.command?.trim(), phase });
    }
  });
  const usage = [...seen.values()].reduce((s, u) => ({
    input: s.input + (u.input_tokens ?? 0),
    cacheWrite: s.cacheWrite + (u.cache_creation_input_tokens ?? 0),
    cacheRead: s.cacheRead + (u.cache_read_input_tokens ?? 0),
    output: s.output + (u.output_tokens ?? 0),
  }), { input: 0, cacheWrite: 0, cacheRead: 0, output: 0 });
  const counts = new Map();
  for (const t of tools) counts.set(t.key, (counts.get(t.key) ?? 0) + 1);
  const repeated = [...counts.values()].reduce((s, n) => s + n - 1, 0);
  // After a compaction: a Read of a file read before the first one, or a Bash
  // command that contains one run before it (`node scripts/audit.mjs | grep x`).
  // Test runs are left out: running the suite again is not recovering a fact.
  const readBefore = new Set(tools.filter((t) => t.name === 'Read' && t.phase === 0).map((t) => t.path));
  const ranBefore = [...new Set(tools.filter((t) => t.name === 'Bash' && t.phase === 0 && t.command && !/\b(npm (run )?test|node --test)\b/.test(t.command)).map((t) => t.command))];
  const rereads = tools.filter((t) => t.phase > 0 && ((t.name === 'Read' && readBefore.has(t.path)) || (t.name === 'Bash' && t.command && ranBefore.some((c) => t.command.includes(c))))).length;
  const recall = tools.filter((t) => /recall$/.test(t.name)).length;
  // Digest engagement: debug logs of any step (a compaction can also run
  // automatically inside a turn) whose outcome line digested old prose.
  const debugLogs = readdirSync(join(runsDir, run)).filter((f) => /^debug-\d+\.log$/.test(f));
  const digest = debugLogs.filter((f) => DIGEST.test(readFileSync(join(runsDir, run, f), 'utf8'))).length;
  return { meta, cost, usage, toolCalls: tools.length, repeated, rereads, recall, digest, compactions };
}

const runs = readdirSync(runsDir).filter((d) => d.startsWith(prefix) && !d.startsWith('smoke') && existsSync(join(runsDir, d, 'meta.json')));
const results = runs.map((run) => {
  const m = measure(run);
  return { run, task: m.meta.task, arm: m.meta.arm, variant: m.meta.variant ?? 'default', label: label(m.meta), ...m, grade: grade(run, m.meta.task) };
});
writeFileSync(join(runsDir, 'results.json'), JSON.stringify(results, null, 2));

const k = (n) => (Number.isFinite(n) ? (n / 1000).toFixed(0) + 'k' : '-');
const ok = (r) => r.grade.fail === 0 && r.meta.exit === 0;
console.log('run | label | ok | grade | cost $ | in+cw | cache read | out | calls | repeat | reread | recall | digest | compactions (ms: before->after)');
for (const r of results.sort((a, b) => a.run.localeCompare(b.run))) {
  console.log([r.run, r.label, ok(r) ? 'yes' : 'NO', `${r.grade.pass}/${r.grade.pass + r.grade.fail}`, r.cost.toFixed(2), k(r.usage.input + r.usage.cacheWrite), k(r.usage.cacheRead), k(r.usage.output), r.toolCalls, r.repeated, r.rereads, r.recall, r.digest,
    r.compactions.map((c) => `${c.ms}ms ${k(c.before)}->${c.after === null ? '?' : k(c.after)}${c.jevRequests ? ` jev${c.jevRequests}` : ''}${c.digest ? ' digest' : ''}${/Not compacted/i.test(c.text) ? ' REFUSED' : ''}`).join('; ')].join(' | '));
}

// mean [min-max] of a metric over runs; fmt formats one value.
const stat = (xs, fmt = (x) => x.toFixed(1)) => {
  const v = xs.filter(Number.isFinite);
  if (!v.length) return '-';
  const mean = v.reduce((a, b) => a + b, 0) / v.length;
  return `${fmt(mean)} [${fmt(Math.min(...v))}-${fmt(Math.max(...v))}]`;
};
const usd = (x) => x.toFixed(2);
const labels = [...new Set(results.map((r) => r.label))].sort();
const gradeShare = (r) => r.grade.pass / (r.grade.pass + r.grade.fail);

console.log('\nper arm-variant, mean [min-max]');
console.log('label | runs | success | grade share | cost $ | cache write | cache read | output | calls | repeated | rereads | recall | digest | compaction ms | context after compaction');
for (const l of labels) {
  const rs = results.filter((r) => r.label === l);
  const cs = rs.flatMap((r) => r.compactions);
  console.log([l, rs.length, `${rs.filter(ok).length}/${rs.length}`, stat(rs.map(gradeShare), usd), stat(rs.map((r) => r.cost), usd), stat(rs.map((r) => r.usage.cacheWrite), k), stat(rs.map((r) => r.usage.cacheRead), k), stat(rs.map((r) => r.usage.output), k),
    stat(rs.map((r) => r.toolCalls)), stat(rs.map((r) => r.repeated)), stat(rs.map((r) => r.rereads)), stat(rs.map((r) => r.recall)), stat(rs.map((r) => r.digest)),
    stat(cs.map((c) => c.ms ?? NaN), (x) => x.toFixed(0)), stat(cs.filter((c) => c.after !== null).map((c) => c.after), k)].join(' | '));
}

console.log('\nper task, mean [min-max]');
console.log('task | label | runs | success | grade share | cost $ | rereads | recall | digest');
for (const task of [...new Set(results.map((r) => r.task))].sort()) {
  for (const l of labels) {
    const rs = results.filter((r) => r.task === task && r.label === l);
    if (!rs.length) continue;
    console.log([task, l, rs.length, `${rs.filter(ok).length}/${rs.length}`, stat(rs.map(gradeShare), usd), stat(rs.map((r) => r.cost), usd), stat(rs.map((r) => r.rereads)), stat(rs.map((r) => r.recall)), stat(rs.map((r) => r.digest))].join(' | '));
  }
}
