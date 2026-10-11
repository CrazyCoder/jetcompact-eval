// Cost trade-off of compacting more vs less, fitted from the runs and
// projected over a long session.
//   node harness/tradeoff.mjs [--json]
//
// Per run it measures, from the stream-json events:
//   - each compaction: context before/after, its Claude cost and seconds;
//   - growth: context tokens added per assistant message between compactions;
//   - re-reads after a compaction: Read calls on a path read before it, with
//     the size of their results (tokens the compaction made the model fetch
//     again), and identical repeated calls.
// Per arm it averages those and simulates one long session: every turn reads
// the cached context and adds `growth` tokens; at the trigger the context
// compacts to (after/before) of itself, costing the arm's compaction cost
// and time, then pays a cache rewrite of the new context and the arm's
// re-read tokens. Prices are Sonnet 5.5 per million tokens (1-hour cache).
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// $ per 1M tokens. A 1-hour cache write costs 2x input, a 5-minute one 1.25x;
// a cache that expires (a pause longer than its TTL) is rewritten whole.
const TTL = {
  '1h': { input: 3, write: 6, read: 0.3, output: 15 },
  '5m': { input: 3, write: 3.75, read: 0.3, output: 15 },
};
let PRICE = TTL['1h'];
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (name, fallback) => {
  const at = process.argv.indexOf(`--${name}`);
  return at > 0 && process.argv[at + 1] ? process.argv[at + 1] : fallback;
};
// --runs <dir> fits from another run folder (an archive); --window, --turns
// and --base (tokens that never compact: tools, system prompt) shape the
// projected session.
const runsDir = arg('runs', join(root, 'runs'));
const json = process.argv.includes('--json');
const PROJECT = { window: Number(arg('window', 200_000)), turns: Number(arg('turns', 400)), base: Number(arg('base', 20_000)) };
const k = (n) => `${Math.round(n / 1000)}k`;
const parse = (f) => readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
const ctx = (u) => (u.input_tokens ?? 0) + (u.cache_read_input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0);
const tok = (chars) => chars / 4;
const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN);

function measure(run) {
  const meta = JSON.parse(readFileSync(join(runsDir, run, 'meta.json'), 'utf8'));
  const stepsDir = join(root, 'fixtures', 'tasks', meta.task, 'steps');
  const steps = readdirSync(stepsDir).sort();
  let prevCost = 0;
  let lastCtx = 0;
  let open = null;
  const compactions = [];
  const growth = [];
  const readBefore = new Set();
  const seenCalls = new Set();
  let phase = 0;
  let rereadTokens = 0;
  let rereads = 0;
  let repeats = 0;
  const pending = new Map(); // tool_use_id -> counts as re-read
  steps.forEach((sf, i) => {
    const file = join(runsDir, run, `stream-${String(i + 1).padStart(2, '0')}.jsonl`);
    if (!existsSync(file)) return;
    const events = parse(file);
    const result = events.find((e) => e.type === 'result');
    const cost = (result?.total_cost_usd ?? prevCost) - prevCost;
    prevCost = result?.total_cost_usd ?? prevCost;
    const prompt = readFileSync(join(stepsDir, sf), 'utf8').trim();
    if (prompt === '/compact') {
      open = { before: lastCtx, after: null, cost, seconds: (result?.duration_ms ?? 0) / 1000 };
      compactions.push(open);
      phase++;
      return;
    }
    const seen = new Set();
    for (const e of events) {
      // stream-json splits one assistant message into an event per content
      // block, all with the same id: count its usage once, read every block.
      if (e.type === 'assistant' && e.message?.usage && !seen.has(e.message.id)) {
        seen.add(e.message.id);
        const c = ctx(e.message.usage);
        if (open && open.after === null) open.after = c;
        else if (lastCtx > 0 && c > lastCtx) growth.push(c - lastCtx);
        lastCtx = c;
      }
      if (e.type === 'assistant') {
        for (const b of e.message?.content ?? []) {
          if (b.type !== 'tool_use') continue;
          const key = b.name + JSON.stringify(b.input);
          if (phase > 0 && seenCalls.has(key)) repeats++;
          seenCalls.add(key);
          const path = b.input?.file_path;
          if (b.name === 'Read' && path) {
            if (phase > 0 && readBefore.has(path)) pending.set(b.id, true);
            if (phase === 0) readBefore.add(path);
          }
        }
      }
      if (e.type === 'user') {
        for (const b of e.message?.content ?? []) {
          if (b.type === 'tool_result' && pending.has(b.tool_use_id)) {
            rereads++;
            rereadTokens += tok(JSON.stringify(b.content ?? '').length);
            pending.delete(b.tool_use_id);
          }
        }
      }
    }
  });
  return { run, arm: meta.variant && meta.variant !== 'default' ? `${meta.arm}:${meta.variant}` : meta.arm, task: meta.task, compactions, growth, rereads, rereadTokens, repeats, total: prevCost };
}

const runs = readdirSync(runsDir).filter((d) => !d.startsWith('smoke') && existsSync(join(runsDir, d, 'meta.json')));
const measured = runs.map(measure).filter((m) => m.compactions.length > 0 && m.compactions.every((c) => c.after !== null));
const arms = [...new Set(measured.map((m) => m.arm))].sort();

const fit = Object.fromEntries(arms.map((arm) => {
  const ms = measured.filter((m) => m.arm === arm);
  const cs = ms.flatMap((m) => m.compactions);
  return [arm, {
    runs: ms.length,
    compactions: cs.length,
    ratio: mean(cs.map((c) => c.after / c.before)), // context kept by a compaction
    compactCost: mean(cs.map((c) => c.cost)),
    compactSeconds: mean(cs.map((c) => c.seconds)),
    growth: mean(ms.flatMap((m) => m.growth)), // tokens per assistant message
    rereadTokensPerCompaction: mean(ms.map((m) => m.rereadTokens / m.compactions.length)),
    rereadsPerCompaction: mean(ms.map((m) => m.rereads / m.compactions.length)),
    repeatsPerCompaction: mean(ms.map((m) => m.repeats / m.compactions.length)),
  }];
}));

/**
 * One long session of `turns` assistant messages in a `window`-token context
 * that compacts at `trigger` of it. Each turn reads the cached context, writes
 * `growth` new tokens and outputs `out` tokens. A compaction keeps `ratio` of
 * the context (`ratio` overrides the arm's), costs the arm's compaction cost
 * and seconds, rewrites the cache at the new size, and adds the arm's re-read
 * tokens (also written to cache) plus one extra turn per re-read.
 */
function simulate(f, { turns = PROJECT.turns, window = PROJECT.window, trigger = 0.6, base = PROJECT.base, out = 600, ratio = f.ratio, expireEvery = 0 } = {}) {
  let c = base;
  let cost = 0;
  let seconds = 0;
  let compactions = 0;
  for (let t = 0; t < turns; t++) {
    // A pause past the cache's TTL: this turn rewrites the whole context.
    const expired = expireEvery > 0 && t > 0 && t % expireEvery === 0;
    cost += ((expired ? c * PRICE.write : c * PRICE.read) + f.growth * PRICE.write + out * PRICE.output) / 1e6;
    c += f.growth;
    if (c >= trigger * window) {
      compactions++;
      cost += f.compactCost;
      seconds += f.compactSeconds;
      c = Math.max(base, c * ratio);
      cost += (c * PRICE.write) / 1e6; // the prefix changed: the cache is rewritten
      const extra = f.rereadTokensPerCompaction;
      cost += (extra * PRICE.write + f.rereadsPerCompaction * (c * PRICE.read + out * PRICE.output)) / 1e6;
      c += extra;
    }
  }
  return { cost, seconds, compactions };
}

// Growth depends on the task, not the arm: project every arm with the pooled
// rate, so the arms differ only in what their compactions do.
const pooledGrowth = mean(measured.flatMap((m) => m.growth));
for (const f of Object.values(fit)) f.growth = pooledGrowth;

const r = (n, d = 2) => (Number.isFinite(n) ? n.toFixed(d) : 'n/a');
if (json) {
  console.log(JSON.stringify({ fit, measured: measured.map(({ growth, ...m }) => m) }, null, 2));
} else {
  console.log('Fitted per arm (means over compactions in the runs)');
  console.log('arm | runs | compactions | kept ratio | compaction $ | compaction s | growth tok/msg | rereads/compaction | reread tok/compaction | repeats/compaction');
  for (const [arm, f] of Object.entries(fit)) {
    console.log([arm, f.runs, f.compactions, r(f.ratio), r(f.compactCost, 3), r(f.compactSeconds, 1), r(f.growth, 0), r(f.rereadsPerCompaction, 1), r(f.rereadTokensPerCompaction, 0), r(f.repeatsPerCompaction, 1)].join(' | '));
  }
  const scenarios = [
    { label: '1-hour cache, no pause over an hour', ttl: '1h', expireEvery: 0 },
    { label: '5-minute cache, no pause over 5 minutes', ttl: '5m', expireEvery: 0 },
    { label: '5-minute cache, a pause over 5 minutes every 15 messages', ttl: '5m', expireEvery: 15 },
  ];
  const ratios = [0.3, 0.4, 0.5, 0.6, 0.7];
  for (const sc of scenarios) {
    PRICE = TTL[sc.ttl];
    console.log(`\n${sc.label}: projected ${PROJECT.turns}-message session, ${k(PROJECT.window)} window, ${k(PROJECT.base)} fixed (cost $, compaction seconds, compactions)`);
    console.log('arm | trigger 50% | 60% | 75% | 90%');
    for (const [arm, f] of Object.entries(fit)) {
      const cells = [0.5, 0.6, 0.75, 0.9].map((trigger) => {
        const s = simulate(f, { trigger, expireEvery: sc.expireEvery });
        return `$${r(s.cost)} ${r(s.seconds, 0)}s x${s.compactions}`;
      });
      console.log([arm, ...cells].join(' | '));
    }
    const jc = fit['jetcompact'];
    const bi = fit['builtin'];
    if (jc) {
      console.log(`Context kept per compaction, swept at a 60% trigger (cost $, compactions)`);
      console.log('re-reads after a compaction | ' + ratios.join(' | '));
      const rows = [['as measured for JetCompact', jc], ['as measured for the built-in summary', bi ?? jc], ['5x the built-in summary', { rereadTokensPerCompaction: 5 * (bi ?? jc).rereadTokensPerCompaction, rereadsPerCompaction: 5 * (bi ?? jc).rereadsPerCompaction }]];
      for (const [label, rr] of rows) {
        const cells = ratios.map((ratio) => {
          const s = simulate({ ...jc, rereadTokensPerCompaction: rr.rereadTokensPerCompaction, rereadsPerCompaction: rr.rereadsPerCompaction }, { ratio, expireEvery: sc.expireEvery });
          return `$${r(s.cost)} x${s.compactions}`;
        });
        console.log([label, ...cells].join(' | '));
      }
    }
  }
  PRICE = TTL['1h'];
}
