// Applies a hand-written reference solution to each task's repo in a temp
// copy, copies the task's grade/ tests over it, and runs them. Every task must
// pass, or the task (or its hidden tests) is wrong.
//   node fixtures/check-reference.mjs
import { appendFileSync, cpSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const tasks = join(dirname(fileURLToPath(import.meta.url)), 'tasks');

const edit = (file, from, to) => {
  const text = readFileSync(file, 'utf8');
  if (!text.includes(from)) throw new Error(`${file}: pattern not found: ${from}`);
  writeFileSync(file, text.split(from).join(to));
};

const REFERENCE = {
  'fix-bugs': (w) => {
    edit(join(w, 'src/util/round.js'), 'return floor + 1;', 'return floor % 2 === 0 ? floor : floor + 1;');
    edit(join(w, 'src/regions/nordic.js'), '  groceries:', '  food:');
  },
  'api-migration': (w) => {
    const spec = readFileSync(join(w, 'docs/SPEC.md'), 'utf8');
    for (const f of readdirSync(join(w, 'src/regions')).filter((f) => f !== 'index.js')) {
      const region = f.replace('.js', '');
      const days = spec.match(new RegExp(`^- ${region}: (.*)$`, 'm'))[1].split(', ');
      edit(join(w, 'src/regions', f), 'export function computeTax(amountCents, category) {', `const HOLIDAYS = ${JSON.stringify(days)};\n\nexport function taxFor({ amountCents, category, date }) {\n  if (HOLIDAYS.includes(date)) return 0;`);
    }
    edit(join(w, 'src/invoice.js'), 'mod.computeTax(line.amountCents, line.category)', 'mod.taxFor({ amountCents: line.amountCents, category: line.category, date })');
  },
  'discounts': (w) => {
    writeFileSync(join(w, 'src/discount.js'), `export function discountRate(c) {
  const v = c.yearlyVolumeCents;
  let bp = { bronze: v >= 1_000_000_00 ? 100 : 0, silver: v >= 2_500_000_00 ? 300 : 200, gold: v >= 5_000_000_00 ? 600 : 400, platinum: 700 }[c.tier] ?? 0;
  if (c.legacy) bp += 150;
  if (c.region === 'island') bp = Math.min(bp, 500);
  return bp;
}
`);
    edit(join(w, 'src/invoice.js'), "import { regions } from './regions/index.js';", "import { regions } from './regions/index.js';\nimport { discountRate } from './discount.js';\nimport { roundCents } from './util/round.js';");
    edit(join(w, 'src/invoice.js'), '  const taxed = lines.map((line) => ({ ...line, taxCents: mod.computeTax(line.amountCents, line.category) }));',
      `  const bp = discountRate(customer);
  const taxed = lines.map((line) => {
    const discountCents = line.category === 'services' ? 0 : roundCents((line.amountCents * bp) / 10000);
    return { ...line, discountCents, taxCents: mod.computeTax(line.amountCents - discountCents, line.category) };
  });
  const discountCents = taxed.reduce((s, l) => s + l.discountCents, 0);`);
    edit(join(w, 'src/invoice.js'), 'subtotalCents, taxCents, totalCents: subtotalCents + taxCents }', 'subtotalCents, discountCents, taxCents, totalCents: subtotalCents - discountCents + taxCents }');
  },
  'csv-export': (w) => csvExport(w),
  // The recall tasks take their facts from where the agent has to find them:
  // the long doc, the script's output, the account notes, the turn-2 prose.
  'migration-notes': (w) => {
    const doc = readFileSync(join(w, 'docs/MIGRATION.md'), 'utf8');
    const dates = Object.fromEntries([...doc.matchAll(/the (\w+) ledger switches to the new posting engine on (\d{4}-\d\d-\d\d)/g)].map((m) => [m[1], m[2]]));
    if (Object.keys(dates).length !== 12) throw new Error('migration-notes: expected 12 cut-over dates');
    writeFileSync(join(w, 'src/migration.js'), `const DATES = ${JSON.stringify(dates)};\n\nexport function cutoverDate(region) {\n  if (!Object.hasOwn(DATES, region)) throw new Error(\`unknown region \${region}\`);\n  return DATES[region];\n}\n`);
    formatDate(w);
  },
  'audit-script': (w) => {
    const out = spawnSync(process.execPath, ['scripts/audit.mjs'], { cwd: w, encoding: 'utf8' }).stdout;
    const held = Object.fromEntries([...out.matchAll(/^ {2}(INV-\d{6}) .* until (\d{4}-\d\d-\d\d)$/gm)].map((m) => [m[1], m[2]]));
    if (Object.keys(held).length !== 7) throw new Error('audit-script: expected 7 held invoices');
    writeFileSync(join(w, 'src/exceptions.js'), `const HELD = ${JSON.stringify(held)};\n\nexport const heldUntil = (id) => HELD[id] ?? null;\n`);
    edit(join(w, 'src/report.js'), "import { formatCents } from './format.js';", `import { formatCents } from './format.js';
import { byId } from './customers.js';

export function regionTotals(invoices) {
  const out = {};
  for (const i of invoices) {
    const c = byId(i.customerId);
    if (!c) throw new Error(\`unknown customer \${i.customerId}\`);
    out[c.region] = (out[c.region] ?? 0) + i.totalCents;
  }
  return out;
}`);
  },
  'customer-quirks': (w) => {
    const modes = { 'is dropped, never charged': 'truncate', 'is charged as one full cent': 'up', 'exact half cent of line tax': 'half-up' };
    const quirks = {};
    for (const f of readdirSync(join(w, 'data/accounts'))) {
      for (const a of JSON.parse(readFileSync(join(w, 'data/accounts', f), 'utf8')).accounts) {
        for (const [text, mode] of Object.entries(modes)) if (a.notes.some((n) => n.includes(text))) quirks[a.id] = mode;
      }
    }
    if (Object.keys(quirks).length !== 3) throw new Error('customer-quirks: expected 3 quirks');
    writeFileSync(join(w, 'src/rounding.js'), `const QUIRKS = ${JSON.stringify(quirks)};

export const roundingFor = (id) => QUIRKS[id] ?? 'half-even';

export function roundWith(mode, x) {
  if (mode === 'truncate') return Math.floor(x + 1e-9);
  if (mode === 'up') return Math.ceil(x - 1e-9);
  return Math.floor(x + 0.5 + 1e-9);
}
`);
    edit(join(w, 'src/invoice.js'), "import { regions } from './regions/index.js';", "import { regions } from './regions/index.js';\nimport { roundingFor, roundWith } from './rounding.js';");
    edit(join(w, 'src/invoice.js'), 'taxCents: mod.computeTax(line.amountCents, line.category) }',
      "taxCents: roundingFor(customer.id) === 'half-even' ? mod.computeTax(line.amountCents, line.category) : roundWith(roundingFor(customer.id), (line.amountCents * mod.RATES[line.category]) / 10000) }");
    topCustomers(w);
  },
  'long-conventions': (w, task) => {
    const said = readFileSync(join(task, 'steps/02.md'), 'utf8');
    const prefix = said.match(/the prefix `([A-Z]+)-`/)[1];
    const tolerance = Number(said.match(/tolerance .* is ([\d.]+)%/)[1]);
    formatDate(w);
    topCustomers(w);
    appendFileSync(join(w, 'src/customers.js'), '\nexport const regionOf = (id) => byId(id)?.region;\n');
    appendFileSync(join(w, 'src/format.js'), `
export function parseAmount(text) {
  const m = /^(-?)(\\d+)(?:\\.(\\d{1,2}))?$/.exec(text);
  if (!m) return null;
  const cents = Number(m[2]) * 100 + Number((m[3] ?? '').padEnd(2, '0'));
  return m[1] ? -cents : cents;
}
`);
    writeFileSync(join(w, 'src/validate.js'), `const CATEGORIES = ['books', 'clothing', 'electronics', 'food', 'fuel', 'medicine', 'services', 'software', 'tools', 'toys'];
const fail = (code, message) => Object.assign(new Error(message), { code });

export function validateLine(line) {
  if (!CATEGORIES.includes(line.category)) throw fail('${prefix}-101', 'unknown category');
  if (!Number.isInteger(line.amountCents)) throw fail('${prefix}-102', 'amount is not whole cents');
  if (line.amountCents < 0) throw fail('${prefix}-103', 'negative amount');
  return true;
}
`);
    writeFileSync(join(w, 'src/reconcile.js'), `export const reconcile = (expected, actual) => Math.abs(actual - expected) * 100 <= expected * ${tolerance} + 1e-9;\n`);
  },
  'long-latefees': (w, task) => {
    const said = readFileSync(join(task, 'steps/02.md'), 'utf8');
    const terms = Number(said.match(/due (\d+) days after/)[1]);
    const bp = Number(said.match(/fee is (\d+) basis points/)[1]);
    const max = Number(said.match(/at most (\d+) periods/)[1]);
    const exempt = said.match(/in the (\w+) region pay no/)[1];
    csvExport(w);
    writeFileSync(join(w, 'src/util/dates.js'), `export const daysBetween = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);\n`);
    edit(join(w, 'src/report.js'), 'return invoices.map(', 'return [...invoices].sort((a, b) => a.date.localeCompare(b.date)).map(');
    writeFileSync(join(w, 'src/latefee.js'), `import { daysBetween } from './util/dates.js';
import { roundCents } from './util/round.js';

export const dueDate = (date) => new Date(Date.parse(date) + ${terms} * 86400000).toISOString().slice(0, 10);

export function lateFee(invoice, customer, paidOn) {
  if (customer.region === '${exempt}') return 0;
  const late = daysBetween(dueDate(invoice.date), paidOn);
  if (late <= 0) return 0;
  const periods = Math.min(Math.ceil(late / 30), ${max});
  return roundCents((invoice.totalCents * ${bp} * periods) / 10000);
}
`);
  },
};

function csvExport(w) {
  edit(join(w, 'src/report.js'), "import { formatCents } from './format.js';", `import { formatCents } from './format.js';

export function toCsv(invoices) {
  const rows = ['invoice_no,customer_id,date,subtotal,discount,tax,total,currency'];
  const sum = { s: 0, d: 0, t: 0, g: 0 };
  invoices.forEach((i, n) => {
    const [y, m, d] = i.date.split('-');
    const disc = i.discountCents ?? 0;
    sum.s += i.subtotalCents; sum.d += disc; sum.t += i.taxCents; sum.g += i.totalCents;
    rows.push([String(n + 1).padStart(5, '0'), i.customerId, \`\${d}.\${m}.\${y}\`, formatCents(i.subtotalCents), formatCents(disc), formatCents(i.taxCents), formatCents(i.totalCents), 'EUR'].join(','));
  });
  rows.push(['TOTAL', '', '', formatCents(sum.s), formatCents(sum.d), formatCents(sum.t), formatCents(sum.g), 'EUR'].join(','));
  return rows.map((r) => r + '\\r\\n').join('');
}`);
}

function formatDate(w) {
  appendFileSync(join(w, 'src/format.js'), "\nexport const formatDate = (iso) => iso.split('-').reverse().join('.');\n");
}

function topCustomers(w) {
  appendFileSync(join(w, 'src/customers.js'), '\nexport const topCustomers = (n) => [...customers].sort((a, b) => b.yearlyVolumeCents - a.yearlyVolumeCents || a.id.localeCompare(b.id)).slice(0, n).map((c) => c.id);\n');
}

let failed = 0;
for (const name of Object.keys(REFERENCE)) {
  const w = mkdtempSync(join(tmpdir(), `ref-${name}-`));
  cpSync(join(tasks, name, 'repo'), w, { recursive: true });
  // The starting suite fails in the tasks whose story is a failing suite, and
  // passes in the others.
  const shouldFail = ['fix-bugs', 'api-migration'].includes(name);
  const before = spawnSync(process.execPath, ['--test', '--test-reporter=tap', 'test/'], { cwd: w, encoding: 'utf8' });
  if ((before.status !== 0) !== shouldFail) { failed++; console.log(`${name}: starting suite ${shouldFail ? 'passes' : 'fails'}`); }
  REFERENCE[name](w, join(tasks, name));
  cpSync(join(tasks, name, 'grade'), w, { recursive: true });
  const run = spawnSync(process.execPath, ['--test', '--test-reporter=tap', 'test/'], { cwd: w, encoding: 'utf8' });
  const pass = run.stdout.match(/^# pass (\d+)/m)?.[1];
  const fail = run.stdout.match(/^# fail (\d+)/m)?.[1];
  console.log(`${name}: pass ${pass} fail ${fail}`);
  if (fail !== '0') {
    failed++;
    console.log(run.stdout.split('\n').filter((l) => /not ok|expected|actual|Error/.test(l)).slice(0, 12).join('\n'));
  }
}
process.exit(failed ? 1 : 0);
