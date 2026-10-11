// Budget guard: the money spent by runs since runs/.budget-start.
//   node harness/ledger.mjs                  print the total
//   node harness/ledger.mjs --init           create runs/.budget-start (now) if missing
//   node harness/ledger.mjs --check <usd>    exit 1 when the total has reached <usd>
// A run counts when its meta.json is newer than the start; a run still going
// (no meta.json yet) counts by its newest stream file. A run's cost is the
// total_cost_usd of the result event in its last stream-NN.jsonl that has
// one; it is cumulative over the session's turns.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const runsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'runs');
const startFile = join(runsDir, '.budget-start');
const [flag, arg] = process.argv.slice(2);

if (flag === '--init') {
  mkdirSync(runsDir, { recursive: true });
  if (!existsSync(startFile)) writeFileSync(startFile, new Date().toISOString() + '\n');
  console.log(`budget start ${readFileSync(startFile, 'utf8').trim()}`);
  process.exit(0);
}

function runCost(dir) {
  const streams = readdirSync(dir).filter((f) => /^stream-\d+\.jsonl$/.test(f)).sort().reverse();
  for (const f of streams) {
    const result = readFileSync(join(dir, f), 'utf8').split('\n').reverse().find((l) => l.includes('"type":"result"'));
    if (!result) continue;
    try {
      const cost = JSON.parse(result).total_cost_usd;
      if (typeof cost === 'number') return cost;
    } catch {}
  }
  return 0;
}

function lastActivity(dir) {
  const meta = join(dir, 'meta.json');
  if (existsSync(meta)) return statSync(meta).mtimeMs;
  const streams = readdirSync(dir).filter((f) => f.startsWith('stream-')).map((f) => statSync(join(dir, f)).mtimeMs);
  return streams.length ? Math.max(...streams) : 0;
}

const start = existsSync(startFile) ? Date.parse(readFileSync(startFile, 'utf8').trim()) : 0;
let total = 0;
let runs = 0;
for (const d of existsSync(runsDir) ? readdirSync(runsDir) : []) {
  const dir = join(runsDir, d);
  if (!statSync(dir).isDirectory() || lastActivity(dir) <= start) continue;
  total += runCost(dir);
  runs++;
}

const since = start ? new Date(start).toISOString() : 'the beginning';
if (flag === '--check') {
  const budget = Number(arg);
  if (!Number.isFinite(budget)) {
    console.error('usage: ledger.mjs --check <usd>');
    process.exit(2);
  }
  if (total >= budget) {
    console.log(`budget reached: $${total.toFixed(2)} of $${budget.toFixed(2)} in ${runs} runs since ${since}`);
    process.exit(1);
  }
  process.exit(0);
}
console.log(`spent $${total.toFixed(2)} in ${runs} runs since ${since}`);
