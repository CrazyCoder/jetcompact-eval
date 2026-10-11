// Writes meta.json for runs that finished every step but lost it (the
// harness script was edited while they ran, so bash died at the last line).
//   node harness/recover-meta.mjs <run-id> ...
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
for (const id of process.argv.slice(2)) {
  const dir = join(root, 'runs', id);
  if (existsSync(join(dir, 'meta.json'))) { console.log(`${id}: has meta.json`); continue; }
  const m = id.match(/^(.+)-(builtin|jetcompact)(?:-(.+))?-(\d+)$/);
  if (!m) { console.log(`${id}: unrecognised id`); continue; }
  const [, task, arm, variant = 'default'] = m;
  const steps = readdirSync(join(root, 'fixtures', 'tasks', task, 'steps')).length;
  const streams = readdirSync(dir).filter((f) => /^stream-\d+\.jsonl$/.test(f)).sort();
  const results = streams.map((f) => readFileSync(join(dir, f), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)).find((e) => e.type === 'result'));
  if (streams.length !== steps || results.some((r) => !r)) { console.log(`${id}: ${streams.length}/${steps} steps finished, not recovered`); continue; }
  const first = readFileSync(join(dir, streams[0]), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)).find((e) => e.session_id);
  const meta = {
    arm, task, id, variant, session: first.session_id,
    exit: results.some((r) => r.is_error && r.subtype !== 'success') ? 1 : 0,
    steps, seconds: Math.round(results.reduce((s, r) => s + (r.duration_ms ?? 0), 0) / 1000),
    window: 100000, model: 'sonnet', compactAs: arm === 'jetcompact' ? 'auto' : 'auto', recovered: true,
  };
  writeFileSync(join(dir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');
  console.log(`${id}: recovered (${steps} steps, ${meta.seconds}s)`);
}
