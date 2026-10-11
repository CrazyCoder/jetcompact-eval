// Generates the "ledger" fixture project and its nine tasks.
//   node fixtures/build-ledger.mjs
// Output: fixtures/tasks/<task>/{repo/, steps/, grade/}. Deterministic:
// a seeded PRNG, so every build is byte-identical.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outRoot = join(here, 'tasks');

let seed = 20261011;
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const pick = (xs) => xs[Math.floor(rand() * xs.length)];
const words = 'account audit balance batch carrier clearance contract credit customs debit delivery deposit dispatch duty entry export freight import invoice journal ledger levy manifest payment period posting quota receipt refund remittance reserve settlement shipment statement surcharge tariff transfer voucher warehouse'.split(' ');
const sentence = (n) => Array.from({ length: n }, () => pick(words)).join(' ');
const para = (s, n) => Array.from({ length: s }, () => sentence(n)[0].toUpperCase() + sentence(n).slice(1) + '.').join(' ');

const REGIONS = ['alpine', 'baltic', 'coastal', 'delta', 'eastern', 'fjord', 'highland', 'island', 'lakes', 'nordic', 'plains', 'southern'];
const CATEGORIES = ['books', 'clothing', 'electronics', 'food', 'fuel', 'medicine', 'services', 'software', 'tools', 'toys'];
// Basis points per region per category, fixed so tests and spec agree.
const RATES = Object.fromEntries(REGIONS.map((r, i) => [r, Object.fromEntries(CATEGORIES.map((c, j) => [c, 300 + ((i * 7 + j * 13) % 21) * 75]))]));
// Tax holidays (SPEC section 4): no tax on these ISO dates, per region.
const HOLIDAYS = Object.fromEntries(REGIONS.map((r, i) => [r, [`2026-0${1 + (i % 9)}-1${i % 10}`, `2026-1${i % 3}-2${(i * 3) % 10}`]]));

function write(path, text) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
}

// ---------------------------------------------------------------- base repo
function baseFiles({ roundBug = false, nordicBug = false, newApi = false } = {}) {
  const f = {};
  f['package.json'] = JSON.stringify({ name: 'ledger', version: '1.0.0', type: 'module', private: true, scripts: { test: 'node --test test/' } }, null, 2) + '\n';
  f['README.md'] = `# ledger\n\nInvoicing for twelve tax regions. The rules live in docs/SPEC.md; read it before changing behavior.\n\nRun the tests with \`npm test\` (Node's built-in test runner, no dependencies).\n`;

  f['src/util/round.js'] = `/**
 * Rounds a non-negative amount of cents with a fractional part to whole cents.
 * SPEC 3.2: ties round to the even neighbour (banker's rounding).
 */
export function roundCents(x) {
  const floor = Math.floor(x);
  const frac = x - floor;
  if (Math.abs(frac - 0.5) < 1e-9) return ${roundBug ? 'floor + 1' : 'floor % 2 === 0 ? floor : floor + 1'};
  return Math.round(x);
}
`;

  for (const [ri, r] of REGIONS.entries()) {
    const rates = { ...RATES[r] };
    const key = nordicBug && r === 'nordic' ? 'groceries' : 'food';
    const rateLines = CATEGORIES.map((c) => `  ${c === 'food' ? key : c}: ${rates[c]},`).join('\n');
    const notes = Array.from({ length: 60 }, (_, k) => ` * ${r} note ${k + 1}: ${para(1, 16)}`).join('\n');
    const sig = newApi ? 'taxFor({ amountCents, category, date })' : 'computeTax(amountCents, category)';
    f[`src/regions/${r}.js`] = `import { roundCents } from '../util/round.js';

/**
 * Tax rules for the ${r} region (SPEC section 2, table row ${ri + 1}).
${notes}
 */
export const REGION = '${r}';

/** Rates in basis points (1/100 of a percent) per category. */
export const RATES = {
${rateLines}
};

/** Tax in cents for one invoice line. */
export function ${sig} {
  const bp = RATES[category];
  if (bp === undefined) throw new Error(\`${r}: unknown category \${category}\`);
  return roundCents((amountCents * bp) / 10000);
}
`;
  }

  f['src/regions/index.js'] = REGIONS.map((r) => `import * as ${r} from './${r}.js';`).join('\n') + `\n\nexport const regions = { ${REGIONS.join(', ')} };\n`;

  const call = newApi ? 'mod.taxFor({ amountCents: line.amountCents, category: line.category, date })' : 'mod.computeTax(line.amountCents, line.category)';
  f['src/invoice.js'] = `import { regions } from './regions/index.js';

/**
 * Builds an invoice: one tax amount per line from the customer's region,
 * then subtotal, tax and total in cents (SPEC section 5).
 */
export function buildInvoice(customer, lines, date = '2026-06-01') {
  const mod = regions[customer.region];
  if (!mod) throw new Error(\`unknown region \${customer.region}\`);
  const taxed = lines.map((line) => ({ ...line, taxCents: ${call} }));
  const subtotalCents = taxed.reduce((s, l) => s + l.amountCents, 0);
  const taxCents = taxed.reduce((s, l) => s + l.taxCents, 0);
  return { customerId: customer.id, date, lines: taxed, subtotalCents, taxCents, totalCents: subtotalCents + taxCents };
}
`;

  f['src/format.js'] = `/** Formats cents as a decimal string with two places: 123456 -> "1234.56". */
export function formatCents(cents) {
  const sign = cents < 0 ? '-' : '';
  const abs = Math.abs(cents);
  return \`\${sign}\${Math.floor(abs / 100)}.\${String(abs % 100).padStart(2, '0')}\`;
}
`;

  f['src/customers.js'] = `import { readFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../data/customers.json', import.meta.url), 'utf8'));

export const customers = data.customers;
export const byId = (id) => customers.find((c) => c.id === id);
`;

  f['src/report.js'] = `import { formatCents } from './format.js';

/** A plain-text summary of invoices, one line each (SPEC section 8). */
export function summary(invoices) {
  return invoices.map((i) => \`\${i.customerId}  \${i.date}  \${formatCents(i.totalCents)}\`).join('\\n');
}
`;

  const tiers = ['bronze', 'silver', 'gold', 'platinum'];
  const customers = Array.from({ length: 160 }, (_, i) => ({
    id: `C${String(1000 + i)}`,
    name: `${pick(words)} ${pick(words)} ${['Ltd', 'GmbH', 'AB', 'Oy', 'LLC'][i % 5]}`,
    region: REGIONS[i % REGIONS.length],
    tier: tiers[(i * 7) % 4],
    legacy: i % 9 === 0,
    yearlyVolumeCents: 50_000_00 + ((i * 7919) % 400) * 25_000_00,
    contact: { email: `billing${i}@example.test`, phone: `+1-555-${String(1000 + i).padStart(4, '0')}` },
    notes: para(2, 10),
  }));
  f['data/customers.json'] = JSON.stringify({ customers }, null, 2) + '\n';

  f['docs/SPEC.md'] = spec();

  f['test/regions.test.js'] = regionsTest(newApi);
  f['test/invoice.test.js'] = invoiceTest(newApi);
  return f;
}

function spec() {
  const s = [];
  s.push('# Ledger specification\n\nThe rules in this document are normative. Code and tests must follow them exactly.\n');
  s.push('## 1. Scope\n\n' + para(6, 16) + '\n');
  s.push('## 2. Tax rates\n\nRates are in basis points per category. The region modules hold the same table.\n\n| Region | ' + CATEGORIES.join(' | ') + ' |\n| -- |' + CATEGORIES.map(() => ' -- |').join('') + '\n' + REGIONS.map((r) => `| ${r} | ` + CATEGORIES.map((c) => RATES[r][c]).join(' | ') + ' |').join('\n') + '\n');
  s.push('## 3. Rounding\n\n3.1 All amounts are integer cents.\n\n3.2 A tax amount with a fractional part is rounded to whole cents; an exact half rounds to the even neighbour (banker\'s rounding): 12.5 becomes 12, 13.5 becomes 14.\n\n' + para(5, 14) + '\n');
  s.push('## 4. Tax holidays\n\nOn a region\'s tax holiday no tax is charged on any line (tax is 0). The holidays are:\n\n' + REGIONS.map((r) => `- ${r}: ${HOLIDAYS[r].join(', ')}`).join('\n') + '\n\n' + para(4, 14) + '\n');
  s.push('## 5. Invoices\n\n' + para(8, 15) + '\n');
  s.push('## 6. Customers\n\n' + para(8, 15) + '\n');
  s.push(`## 7. Volume discounts

7.1 A discount applies to the invoice subtotal, before tax, and reduces the tax base proportionally (compute tax on discounted line amounts).

7.2 The discount rate depends on the customer's tier and yearly volume:

- bronze: 0% below 1,000,000.00; 1% from 1,000,000.00.
- silver: 2% below 2,500,000.00; 3% from 2,500,000.00.
- gold: 4% below 5,000,000.00; 6% from 5,000,000.00.
- platinum: 7%, whatever the volume.

7.3 A legacy customer (\`legacy: true\`) gets 1.5 percentage points more, added to the rate from 7.2.

7.4 Lines in the category \`services\` are never discounted.

7.5 Customers in the island region have their discount capped at 5%, after 7.3.

7.6 The discount on a line is rounded with the rule of 3.2, per line.

7.7 Expose it as \`discountRate(customer)\` returning the rate in basis points (an integer: 1.5% is 150), and apply it in \`buildInvoice\`: each line gets \`discountCents\`, and the invoice gets \`discountCents\` (the sum). \`subtotalCents\` stays the undiscounted sum; \`totalCents\` = subtotal - discount + tax.

` + para(6, 15) + '\n');
  s.push('## 8. Reports\n\n' + para(8, 15) + '\n');
  s.push(`## 9. CSV export

9.1 \`toCsv(invoices)\` in \`src/report.js\` returns one string.

9.2 The first line is the header: \`invoice_no,customer_id,date,subtotal,discount,tax,total,currency\`.

9.3 One line per invoice, in the order given. \`invoice_no\` is the 1-based position, zero-padded to 5 digits (\`00001\`).

9.4 Amounts are formatted with \`formatCents\`; \`discount\` is \`0.00\` when the invoice has none. \`currency\` is always \`EUR\`.

9.5 Dates are written as \`DD.MM.YYYY\` (2026-06-01 becomes 01.06.2026).

9.6 Lines end with \`\\r\\n\`, including the last one.

9.7 After the invoices, one footer line: \`TOTAL,,,<sum of subtotal>,<sum of discount>,<sum of tax>,<sum of total>,EUR\`.

` + para(5, 14) + '\n');
  s.push('## 10. Glossary\n\n' + Array.from({ length: 40 }, () => `- **${pick(words)}**: ${para(1, 18)}`).join('\n') + '\n');
  return s.join('\n');
}

function regionsTest(newApi) {
  const cases = REGIONS.flatMap((r, i) => CATEGORIES.filter((_, j) => (i + j) % 3 === 0).map((c) => [r, c]));
  const call = (r, c, amt) => (newApi ? `regions.${r}.taxFor({ amountCents: ${amt}, category: '${c}', date: '2026-06-01' })` : `regions.${r}.computeTax(${amt}, '${c}')`);
  const exp = (r, c, amt) => roundHalfEven((amt * RATES[r][c]) / 10000);
  return `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { regions } from '../src/regions/index.js';

test('every region taxes each category by its rate', () => {
${cases.map(([r, c]) => `  assert.equal(${call(r, c, 12345)}, ${exp(r, c, 12345)});`).join('\n')}
});
${newApi ? `
test('no tax on a region\\'s tax holiday (SPEC 4)', () => {
${REGIONS.map((r) => `  assert.equal(regions.${r}.taxFor({ amountCents: 10000, category: 'tools', date: '${HOLIDAYS[r][0]}' }), 0);`).join('\n')}
${REGIONS.map((r) => `  assert.equal(regions.${r}.taxFor({ amountCents: 10000, category: 'tools', date: '${HOLIDAYS[r][1]}' }), 0);`).join('\n')}
});
` : ''}`;
}

function roundHalfEven(x) {
  const floor = Math.floor(x);
  if (Math.abs(x - floor - 0.5) < 1e-9) return floor % 2 === 0 ? floor : floor + 1;
  return Math.round(x);
}

function invoiceTest(newApi) {
  // Amounts chosen so several taxes land on an exact half cent.
  const cases = REGIONS.map((r, i) => {
    const lines = [{ category: 'food', amountCents: 20000 + i * 1000 }, { category: 'tools', amountCents: 2 * (1250 + i * 50) }, { category: 'books', amountCents: 9990 }];
    const tax = lines.reduce((s, l) => s + roundHalfEven((l.amountCents * RATES[r][l.category]) / 10000), 0);
    const sub = lines.reduce((s, l) => s + l.amountCents, 0);
    return { r, lines, tax, total: sub + tax };
  });
  return `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildInvoice } from '../src/invoice.js';

const cases = ${JSON.stringify(cases)};

for (const c of cases) {
  test(\`invoice totals in \${c.r}\`, () => {
    const inv = buildInvoice({ id: 'T', region: c.r }, c.lines${newApi ? ", '2026-06-01'" : ''});
    assert.equal(inv.taxCents, c.tax);
    assert.equal(inv.totalCents, c.total);
  });
}
`;
}

// ------------------------------------------------------------ hidden tests
function discountGrade() {
  return `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { discountRate } from '../src/discount.js';
import { buildInvoice } from '../src/invoice.js';

const c = (tier, vol, extra = {}) => ({ id: 'X', region: 'plains', tier, yearlyVolumeCents: vol, legacy: false, ...extra });

test('rates by tier and volume (SPEC 7.2)', () => {
  assert.equal(discountRate(c('bronze', 999_999_99)), 0);
  assert.equal(discountRate(c('bronze', 1_000_000_00)), 100);
  assert.equal(discountRate(c('silver', 2_499_999_99)), 200);
  assert.equal(discountRate(c('silver', 2_500_000_00)), 300);
  assert.equal(discountRate(c('gold', 4_999_999_99)), 400);
  assert.equal(discountRate(c('gold', 5_000_000_00)), 600);
  assert.equal(discountRate(c('platinum', 1)), 700);
});

test('legacy bonus (SPEC 7.3)', () => {
  assert.equal(discountRate(c('gold', 5_000_000_00, { legacy: true })), 750);
  assert.equal(discountRate(c('bronze', 1, { legacy: true })), 150);
});

test('island cap after the legacy bonus (SPEC 7.5)', () => {
  assert.equal(discountRate(c('platinum', 1, { region: 'island' })), 500);
  assert.equal(discountRate(c('gold', 1, { region: 'island', legacy: true })), 500);
  assert.equal(discountRate(c('silver', 1, { region: 'island', legacy: true })), 350);
});

test('invoice applies the discount per line, not on services, tax on the discounted base (SPEC 7.1, 7.4, 7.6, 7.7)', () => {
  const cust = c('gold', 5_000_000_00);
  const inv = buildInvoice(cust, [
    { category: 'tools', amountCents: 10025 },
    { category: 'services', amountCents: 50000 },
  ], '2026-06-01');
  assert.equal(inv.lines[0].discountCents, 602);
  assert.equal(inv.lines[1].discountCents, 0);
  assert.equal(inv.discountCents, 602);
  assert.equal(inv.subtotalCents, 60025);
  const taxTools = ${roundHalfEven(((10025 - 602) * RATES.plains.tools) / 10000)};
  const taxServices = ${roundHalfEven((50000 * RATES.plains.services) / 10000)};
  assert.equal(inv.taxCents, taxTools + taxServices);
  assert.equal(inv.totalCents, 60025 - 602 + taxTools + taxServices);
});
`;
}

function csvGrade() {
  return `import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toCsv } from '../src/report.js';

const invoices = [
  { customerId: 'C1000', date: '2026-06-01', subtotalCents: 123456, discountCents: 1234, taxCents: 9876, totalCents: 132098 },
  { customerId: 'C1001', date: '2026-12-31', subtotalCents: 500, taxCents: 25, totalCents: 525 },
];

test('CSV follows SPEC 9 exactly', () => {
  const expected =
    'invoice_no,customer_id,date,subtotal,discount,tax,total,currency\\r\\n' +
    '00001,C1000,01.06.2026,1234.56,12.34,98.76,1320.98,EUR\\r\\n' +
    '00002,C1001,31.12.2026,5.00,0.00,0.25,5.25,EUR\\r\\n' +
    'TOTAL,,,1239.56,12.34,99.01,1326.23,EUR\\r\\n';
  assert.equal(toCsv(invoices), expected);
});

test('empty list gives header and a zero footer', () => {
  assert.equal(toCsv([]), 'invoice_no,customer_id,date,subtotal,discount,tax,total,currency\\r\\nTOTAL,,,0.00,0.00,0.00,0.00,EUR\\r\\n');
});
`;
}

// ------------------------------------------------------------------- tasks
// Every task opens the same way a person starts on an unfamiliar project: read
// it all. That puts the spec and the data early in the session, where a
// compaction has to deal with them before the later turns need them.
const ONBOARD =
  'Get familiar with this project before we change anything: read README.md, docs/SPEC.md, data/customers.json and every file under src/ and test/ (all twelve region modules too), each with the Read tool. Then give me a short overview of how it fits together. Do not change any file yet.';

const TASKS = {
  'fix-bugs': {
    files: baseFiles({ roundBug: true, nordicBug: true }),
    grade: { visible: true },
    steps: [
      ONBOARD,
      'Run `npm test` and investigate every failure. Explain the root cause of each one, citing the spec rule it breaks. Do not fix anything yet.',
      'Fix the root causes in `src/`. Do not change the tests. Run the tests.',
      'Check that your fixes follow docs/SPEC.md exactly, including the rounding examples in section 3. Run the full test suite once more and report what you changed and why.',
    ],
  },
  'discounts': {
    files: baseFiles(),
    grade: { hidden: { 'discount.grade.test.js': discountGrade() }, visible: true },
    steps: [
      ONBOARD,
      'We will implement the volume discounts of docs/SPEC.md section 7. List every rule in that section that the code must follow, and say where in the code each one applies. Do not write code yet.',
      'Implement it: create `src/discount.js` with `discountRate(customer)` and wire the discount into `buildInvoice`, following section 7 exactly. Keep the existing tests passing.',
      'Add tests of your own in `test/discount.test.js` for every rule of section 7, including the edge cases. Run all tests and fix what fails.',
      'Compute the invoice for customer C1009 with one `tools` line of 10025 cents and one `services` line of 50000 cents, and show the numbers. Then report what you implemented.',
    ],
  },
  'api-migration': {
    files: { ...baseFiles(), 'test/regions.test.js': regionsTest(true), 'test/invoice.test.js': invoiceTest(true) },
    grade: { visible: true },
    steps: [
      ONBOARD,
      'The tests now expect a new API. Run `npm test`, and compare the failures with docs/SPEC.md sections 2 and 4. Explain what has to change. Do not change code yet.',
      'Migrate every region module in `src/regions/` from `computeTax(amountCents, category)` to `taxFor({ amountCents, category, date })`, including the tax holidays from SPEC section 4. Update every caller. Do not change the tests.',
      'Run the tests and fix what fails. Then check every region against the holiday list in SPEC section 4 once more, and report what you changed.',
    ],
  },
  'csv-export': {
    files: baseFiles(),
    grade: { hidden: { 'csv.grade.test.js': csvGrade() }, visible: true },
    steps: [
      ONBOARD,
      'We will add the CSV export of docs/SPEC.md section 9. List every formatting rule in that section and how the existing `formatCents` and invoice fields map to it. Do not write code yet.',
      'Implement `toCsv(invoices)` in `src/report.js`, following section 9 exactly. Keep the existing tests passing.',
      'Add tests of your own in `test/report.test.js` covering every rule of section 9. Run all tests and fix what fails.',
      'Build invoices for customers C1000 and C1013 with a few lines each, print their CSV, and check it against section 9 rule by rule. Then report what you implemented.',
    ],
  },
};

// ------------------------------------------ recall-sensitive and long tasks
// Each of these needs, late in the session and after two or more compactions,
// a fact the agent saw only early on: deep in a long file, in a command's
// output, or in the user's own words in turn 2. The facts come from their own
// PRNG, so they do not depend on the filler text drawn from `rand`.
let factSeed = 77013;
const frand = () => ((factSeed = (factSeed * 1103515245 + 12345) % 2147483648) / 2147483648);
const fint = (lo, hi) => lo + Math.floor(frand() * (hi - lo + 1));
const fpick = (xs) => xs[Math.floor(frand() * xs.length)];
const addDays = (iso, n) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
const proseLines = (n, len = 13) => Array.from({ length: n }, () => { const s = sentence(len); return s[0].toUpperCase() + s.slice(1) + '.'; });
// The same formulas baseFiles uses for data/customers.json.
const customerRegion = (i) => REGIONS[i % REGIONS.length];
const customerVolume = (i) => 50_000_00 + ((i * 7919) % 400) * 25_000_00;

const CUTOVER = Object.fromEntries(REGIONS.map((r) => [r, addDays('2027-01-04', fint(0, 330))]));
const QUIRKS = (() => {
  const ids = new Set();
  while (ids.size < 3) ids.add(fint(0, 159));
  return [...ids].map((i, k) => ({ i, id: `C${1000 + i}`, mode: ['truncate', 'up', 'half-up'][k] }));
})();
const CONV = {
  prefix: Array.from({ length: 3 }, () => fpick('BCDFGHJKMNPQRSTVWXZ'.split(''))).join(''),
  tolHundredths: (() => { const n = fint(12, 95); return n % 10 === 0 ? n + 3 : n; })(), // 37 means 0.37%
};
const LATE = { feeBp: fint(110, 290), maxPeriods: fint(3, 7), termsDays: fpick([17, 21, 24, 28, 35, 40, 45]), exempt: fpick(REGIONS) };

// docs/MIGRATION.md, ~1500 lines. The cut-over dates are prose in section 5,
// some 600 lines in, among decoy dry-run and freeze dates for every region.
function migrationDoc() {
  const out = ['# Posting engine migration notes', '', 'Working notes on moving every region from the legacy posting batch to the new posting engine. Mostly history; the decisions are spread through the text.', ''];
  const block = (n) => out.push(...proseLines(n), '');
  out.push('## 1. Background', '');
  for (let k = 0; k < 7; k++) block(8);
  out.push('## 2. Field mapping', '', '| legacy field | new field | note |', '| -- | -- | -- |');
  for (let k = 0; k < 300; k++) out.push(`| ${pick(words)}_${pick(words)}_${k + 1} | ${pick(words)}.${pick(words)} | ${sentence(6)} |`);
  out.push('', '## 3. Dry runs', '');
  for (const r of REGIONS) out.push(...proseLines(3), `The ${r} dry run on the new posting engine is planned for ${addDays(CUTOVER[r], -fint(20, 60))}.`, ...proseLines(2), '');
  out.push('## 4. Open questions', '');
  for (let k = 0; k < 14; k++) block(7);
  out.push('## 5. Region rollout', '');
  for (const r of REGIONS) out.push(...proseLines(4), `When the ${r} data freeze lifts, the ${r} ledger switches to the new posting engine on ${CUTOVER[r]}; there is no fallback date.`, ...proseLines(3), '');
  out.push('## 6. Data freeze', '');
  for (const r of REGIONS) out.push(...proseLines(2), `For ${r} the data freeze on the old posting batch starts ${addDays(CUTOVER[r], -fint(3, 12))}.`, ...proseLines(2), '');
  out.push('## 7. Error mapping', '', '| legacy code | new code | meaning |', '| -- | -- | -- |');
  for (let k = 0; k < 200; k++) out.push(`| E${1000 + k * 7} | PE-${String(k + 1).padStart(3, '0')} | ${sentence(7)} |`);
  out.push('', '## 8. Meeting log', '');
  for (let day = '2026-01-12'; out.length < 1500; day = addDays(day, 7)) out.push(`### ${day}`, '', ...proseLines(6), '');
  const first = out.findIndex((l) => l.includes('switches to the new posting engine on')) + 1;
  if (first < 500 || first > 900) throw new Error(`MIGRATION.md: first cut-over line is ${first}`);
  return out.join('\n') + '\n';
}

// The body of scripts/audit.mjs, self-contained: its output, not its source,
// shows which invoices are held and until when. Kept under the ~30k characters
// Claude Code's Bash tool shows in full.
function auditLines() {
  let s = 52711;
  const r = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
  const regions = ['alpine', 'baltic', 'coastal', 'delta', 'eastern', 'fjord', 'highland', 'island', 'lakes', 'nordic', 'plains', 'southern'];
  const reasons = ['duplicate remittance', 'tax base disputed', 'credit note pending', 'customs value unconfirmed', 'bank return', 'contract under review'];
  const day = (from, span) => new Date(Date.UTC(2026, from, 1) + Math.floor(r() * span) * 86400000).toISOString().slice(0, 10);
  const money = (c) => `${Math.floor(c / 100)}.${String(c % 100).padStart(2, '0')}`;
  const rows = [];
  const ids = new Set();
  while (rows.length < 300) {
    const id = `INV-${100000 + Math.floor(r() * 900000)}`;
    if (ids.has(id)) continue;
    ids.add(id);
    const n = Math.floor(r() * 160);
    rows.push({ id, customer: `C${1000 + n}`, region: regions[n % 12], date: day(6, 92), cents: 1000 + Math.floor(r() * 5_000_000) });
  }
  const held = [];
  while (held.length < 7) {
    const row = rows[Math.floor(r() * rows.length)];
    if (row.until) continue;
    row.until = day(10, 75);
    row.reason = reasons[Math.floor(r() * reasons.length)];
    held.push(row);
  }
  const line = (x) => `${x.id}  ${x.customer}  ${x.region.padEnd(8)}  ${x.date}  ${money(x.cents).padStart(10)}  ${x.until ? 'review' : 'posted'}`;
  const out = ['ledger audit: posted invoices, 2026-07-01 to 2026-09-30', ''];
  out.push(...rows.slice(0, 150).map(line), '');
  out.push('Exceptions (manual review; hold each invoice until the date shown):');
  out.push(...held.map((x) => `  ${x.id}  ${x.customer}  ${x.reason.padEnd(26)}  until ${x.until}`), '');
  out.push(...rows.slice(150).map(line), '');
  out.push('Totals per region:');
  for (const g of regions) {
    const rs = rows.filter((x) => x.region === g);
    out.push(`  ${g.padEnd(8)}  ${String(rs.length).padStart(3)} invoices  ${money(rs.reduce((t, x) => t + x.cents, 0)).padStart(12)}`);
  }
  out.push('', `${rows.length} invoices, ${held.length} for manual review.`);
  return out;
}

function auditFacts() {
  const out = auditLines();
  const text = out.join('\n');
  if (text.length > 28000) throw new Error(`audit output is ${text.length} chars`);
  const held = out.map((l) => l.match(/^ {2}(INV-\d{6}) {2}C\d{4} {2}.+ {2}until (\d{4}-\d\d-\d\d)$/)).filter(Boolean).map((m) => [m[1], m[2]]);
  const posted = out.filter((l) => l.endsWith('posted')).slice(0, 6).map((l) => l.split(' ')[0]);
  return { held: Object.fromEntries(held), posted };
}

// data/accounts/page-NN.json: 160 account records. Three customers' notes
// state, in prose, a rounding arrangement; a dozen others carry decoy notes
// about cents.
function accountPages() {
  const quirkText = {
    truncate: "Under their 2019 framework contract any fraction of a cent in a line's tax is dropped, never charged.",
    up: "By standing agreement any fraction of a cent in a line's tax is charged as one full cent.",
    'half-up': "Their auditors require an exact half cent of line tax to be charged as a full cent; other fractions go to the nearest cent as usual.",
  };
  const decoys = [
    'Statements must show amounts in cents rather than euros on the second page.',
    'Asked whether fractions of a cent could be printed on the PDF; told no, and accepted it.',
    'Wants tax lines listed before discounts on printed invoices.',
    'Their controller checks every cent of the yearly statement against their own books.',
  ];
  const decoyIds = new Set();
  while (decoyIds.size < 12) decoyIds.add(fint(0, 159));
  const accounts = Array.from({ length: 160 }, (_, i) => {
    const notes = proseLines(3, 11);
    const q = QUIRKS.find((x) => x.i === i);
    if (q) notes.splice(fint(0, 3), 0, quirkText[q.mode]);
    else if (decoyIds.has(i)) notes.splice(fint(0, 3), 0, fpick(decoys));
    return {
      id: `C${1000 + i}`,
      region: customerRegion(i),
      billingContact: { name: `${pick(words)} ${pick(words)}`, email: `ap${i}@example.test` },
      paymentTermsDays: pick([14, 30, 45, 60]),
      poRequired: rand() < 0.3,
      statementDay: 1 + Math.floor(rand() * 28),
      deliveryAddress: { street: `${1 + Math.floor(rand() * 200)} ${pick(words)} street`, city: `${pick(words)}ville`, postcode: String(10000 + Math.floor(rand() * 89999)) },
      notes,
    };
  });
  return Object.fromEntries(Array.from({ length: 8 }, (_, p) => [`data/accounts/page-${String(p + 1).padStart(2, '0')}.json`, JSON.stringify({ page: p + 1, of: 8, accounts: accounts.slice(p * 20, p * 20 + 20) }, null, 2) + '\n']));
}

// One line per quirk customer whose tax differs from half-even, plus one
// ordinary customer with an exact half cent.
function quirkCases() {
  const find = (region, ok) => {
    for (const category of CATEGORIES) {
      const bp = RATES[region][category];
      for (let amountCents = 1001; amountCents < 60000; amountCents++) {
        const frac = (amountCents * bp) % 10000;
        const floor = Math.floor((amountCents * bp) / 10000);
        if (ok(frac, floor)) return { category, amountCents, floor };
      }
    }
    throw new Error(`no quirk case for ${region}`);
  };
  const rule = { truncate: (f) => f > 5000, up: (f) => f > 0 && f < 5000, 'half-up': (f, fl) => f === 5000 && fl % 2 === 0 };
  const cases = QUIRKS.map((q) => {
    const region = customerRegion(q.i);
    const { category, amountCents, floor } = find(region, rule[q.mode]);
    return { id: q.id, mode: q.mode, region, category, amountCents, taxCents: q.mode === 'truncate' ? floor : floor + 1 };
  });
  let plain = 7;
  while (QUIRKS.some((q) => q.i === plain)) plain++;
  const region = customerRegion(plain);
  const { category, amountCents, floor } = find(region, (f, fl) => f === 5000 && fl % 2 === 0);
  return { cases, plain: { id: `C${1000 + plain}`, region, category, amountCents, taxCents: floor } };
}

const topIds = (n) => Array.from({ length: 160 }, (_, i) => i).sort((a, b) => customerVolume(b) - customerVolume(a) || a - b).slice(0, n).map((i) => `C${1000 + i}`);

// One hidden test file per module, so a missing export fails only the tests
// of that module, not the facts graded next to it.
const gradeFile = (imports, body) => `import { test } from 'node:test';
import assert from 'node:assert/strict';
${imports}
${body}`;

const formatDateGrade = () => gradeFile("import { formatDate } from '../src/format.js';\n", `test('formatDate writes DD.MM.YYYY', () => {
  assert.equal(formatDate('2026-06-01'), '01.06.2026');
  assert.equal(formatDate('2027-12-31'), '31.12.2027');
});
`);

const topCustomersGrade = () => gradeFile("import { topCustomers } from '../src/customers.js';\n", `test('topCustomers ranks by yearly volume, ties by id', () => {
  assert.deepEqual(topCustomers(5), ${JSON.stringify(topIds(5))});
  assert.deepEqual(topCustomers(1), ${JSON.stringify(topIds(1))});
});
`);

function migrationGrade() {
  return { 'format.grade.test.js': formatDateGrade(), 'migration.grade.test.js': gradeFile("import { cutoverDate } from '../src/migration.js';\n", `const CUTOVER = ${JSON.stringify(CUTOVER)};
for (const [region, date] of Object.entries(CUTOVER)) {
  test(\`cut-over date of \${region}\`, () => assert.equal(cutoverDate(region), date));
}

test('cutoverDate throws for an unknown region', () => {
  assert.throws(() => cutoverDate('atlantis'));
});
`) };
}

function auditGrade() {
  const { held, posted } = auditFacts();
  return {
    'report.grade.test.js': gradeFile("import { regionTotals } from '../src/report.js';\n", `test('regionTotals sums totals by the customer region', () => {
  const invoices = [{ customerId: 'C1000', totalCents: 100 }, { customerId: 'C1012', totalCents: 50 }, { customerId: 'C1001', totalCents: 7 }];
  assert.deepEqual(regionTotals(invoices), { ${customerRegion(0)}: 150, ${customerRegion(1)}: 7 });
  assert.throws(() => regionTotals([{ customerId: 'C9999', totalCents: 1 }]));
});
`),
    'exceptions.grade.test.js': gradeFile("import { heldUntil } from '../src/exceptions.js';\n", `const HELD = ${JSON.stringify(held)};
for (const [id, until] of Object.entries(HELD)) {
  test(\`\${id} is held until \${until}\`, () => assert.equal(heldUntil(id), until));
}

test('posted invoices are not held', () => {
  for (const id of ${JSON.stringify(posted)}) assert.equal(heldUntil(id), null);
});
`),
  };
}

function quirksGrade() {
  const { cases, plain } = quirkCases();
  const others = ['C1000', 'C1001', 'C1050', 'C1099', 'C1159'].filter((id) => !QUIRKS.some((q) => q.id === id));
  return { 'customers.grade.test.js': topCustomersGrade(), 'rounding.grade.test.js': gradeFile(`import { roundingFor } from '../src/rounding.js';
import { buildInvoice } from '../src/invoice.js';
`, `const CASES = ${JSON.stringify(cases)};
for (const c of CASES) {
  test(\`\${c.id} rounds line tax with \${c.mode}\`, () => {
    assert.equal(roundingFor(c.id), c.mode);
    const inv = buildInvoice({ id: c.id, region: c.region }, [{ category: c.category, amountCents: c.amountCents }]);
    assert.equal(inv.taxCents, c.taxCents);
  });
}

test('everyone else rounds half-even', () => {
  for (const id of ${JSON.stringify(others)}) assert.equal(roundingFor(id), 'half-even');
  const p = ${JSON.stringify(plain)};
  assert.equal(buildInvoice({ id: p.id, region: p.region }, [{ category: p.category, amountCents: p.amountCents }]).taxCents, p.taxCents);
});
`) };
}

function conventionsGrade() {
  const t = CONV.tolHundredths;
  return {
    'format.grade.test.js': formatDateGrade(),
    'customers.grade.test.js': topCustomersGrade(),
    'region-of.grade.test.js': gradeFile("import { regionOf } from '../src/customers.js';\n", `test('regionOf reads the customer data', () => {
  assert.equal(regionOf('C1000'), '${customerRegion(0)}');
  assert.equal(regionOf('C1013'), '${customerRegion(13)}');
  assert.equal(regionOf('C9999'), undefined);
});
`),
    'parse-amount.grade.test.js': gradeFile("import { parseAmount } from '../src/format.js';\n", `test('parseAmount', () => {
  assert.equal(parseAmount('1234.56'), 123456);
  assert.equal(parseAmount('12'), 1200);
  assert.equal(parseAmount('0.5'), 50);
  assert.equal(parseAmount('-3.10'), -310);
  for (const bad of ['abc', '1.234', '']) assert.equal(parseAmount(bad), null);
});
`),
    'validate.grade.test.js': gradeFile("import { validateLine } from '../src/validate.js';\n", `const codeOf = (line) => { try { validateLine(line); } catch (e) { return e.code; } return undefined; };

test('validateLine error codes follow the convention from turn 2', () => {
  const codes = [codeOf({ category: 'gadgets', amountCents: 100 }), codeOf({ category: 'tools', amountCents: 1.5 }), codeOf({ category: 'tools', amountCents: -100 })];
  for (const c of codes) assert.match(String(c), /^${CONV.prefix}-\\d{3}$/);
  assert.equal(new Set(codes).size, 3);
  assert.equal(validateLine({ category: 'tools', amountCents: 100 }), true);
});
`),
    'reconcile.grade.test.js': gradeFile("import { reconcile } from '../src/reconcile.js';\n", `test('reconcile uses the tolerance from turn 2', () => {
  assert.equal(reconcile(100000, ${100000 + t * 10 - 1}), true);
  assert.equal(reconcile(100000, ${100000 - t * 10 + 1}), true);
  assert.equal(reconcile(100000, ${100000 + t * 10 + 1}), false);
  assert.equal(reconcile(100000, ${100000 - t * 10 - 1}), false);
  assert.equal(reconcile(250000, ${250000 + t * 25 - 1}), true);
  assert.equal(reconcile(250000, ${250000 + t * 25 + 1}), false);
});
`),
  };
}

function lateFeeGrade() {
  const { feeBp, maxPeriods, termsDays, exempt } = LATE;
  const region = REGIONS.find((r) => r !== exempt);
  const date = '2026-03-10';
  const due = addDays(date, termsDays);
  const total = 123457;
  const fee = (periods) => roundHalfEven((total * feeBp * periods) / 10000);
  const cases = [[due, 0], [date, 0], [addDays(due, 1), fee(1)], [addDays(due, 30), fee(1)], [addDays(due, 31), fee(2)], [addDays(due, 1000), fee(maxPeriods)]];
  return {
    'csv.grade.test.js': csvGrade(),
    'dates.grade.test.js': gradeFile("import { daysBetween } from '../src/util/dates.js';\n", `test('daysBetween', () => {
  assert.equal(daysBetween('2026-01-30', '2026-03-01'), 30);
  assert.equal(daysBetween('2026-03-01', '2026-01-30'), -30);
  assert.equal(daysBetween('2026-12-31', '2027-01-01'), 1);
});
`),
    'summary.grade.test.js': gradeFile("import { summary } from '../src/report.js';\n", `test('summary lists invoices oldest first, stable, without changing the input', () => {
  const invoices = [{ customerId: 'A', date: '2026-03-01', totalCents: 100 }, { customerId: 'B', date: '2026-01-01', totalCents: 200 }, { customerId: 'C', date: '2026-03-01', totalCents: 300 }];
  assert.equal(summary(invoices), 'B  2026-01-01  2.00\\nA  2026-03-01  1.00\\nC  2026-03-01  3.00');
  assert.equal(invoices[0].customerId, 'A');
});
`),
    'latefee.grade.test.js': gradeFile("import { dueDate, lateFee } from '../src/latefee.js';\n", `test('dueDate follows the payment terms from turn 2', () => {
  assert.equal(dueDate('${date}'), '${due}');
  assert.equal(dueDate('2026-12-20'), '${addDays('2026-12-20', termsDays)}');
});

const CASES = ${JSON.stringify(cases)};
for (const [paidOn, fee] of CASES) {
  test(\`late fee when paid on \${paidOn}\`, () => assert.equal(lateFee({ date: '${date}', totalCents: ${total} }, { id: 'X', region: '${region}' }, paidOn), fee));
}

test('the exempt region pays no late fee', () => {
  assert.equal(lateFee({ date: '${date}', totalCents: ${total} }, { id: 'X', region: '${exempt}' }, '${addDays(due, 45)}'), 0);
});
`),
  };
}

const FINAL = 'Run all tests once more and fix what fails. Then report what you changed in this session.';
const FORMAT_DATE = 'Add `formatDate(iso)` to `src/format.js`: it takes an ISO date like `2026-06-01` and returns `01.06.2026`. Add tests in `test/format.test.js` and run all tests.';
const TOP_CUSTOMERS = 'Add `topCustomers(n)` to `src/customers.js`: it returns the ids of the `n` customers with the highest `yearlyVolumeCents`, highest first, ties broken by id ascending. Add tests in `test/customers.test.js` and run all tests.';

// Steps are given in full, '/compact' included.
const RECALL_TASKS = {
  'migration-notes': {
    files: { ...baseFiles(), 'docs/MIGRATION.md': migrationDoc() },
    grade: { hidden: migrationGrade(), visible: true },
    steps: [
      'Get familiar with this project before we change anything: read README.md, docs/SPEC.md, docs/MIGRATION.md (all of it; it is long, so read it in parts), src/invoice.js, src/format.js, src/report.js, src/util/round.js and every file under test/, each with the Read tool. Then give me a short overview of the project and of the migration plan. Do not change any file yet.',
      '/compact',
      FORMAT_DATE,
      'Which parts of docs/SPEC.md does the current code not implement yet? Answer briefly; do not change any file.',
      '/compact',
      "Create `src/migration.js` exporting `cutoverDate(region)`: it returns, as an ISO date string, the day that region's ledger switches to the new posting engine, as planned in the material we went through at the start. Hard-code the dates (no file reads at runtime). It throws an Error for an unknown region. Add tests in `test/migration.test.js` and run all tests.",
      FINAL,
    ],
  },
  'audit-script': {
    files: { ...baseFiles(), 'scripts/audit.mjs': `// Audit of the invoices posted in 2026-Q3.\n//   node scripts/audit.mjs\n${auditLines.toString()}\n\nfor (const line of auditLines()) console.log(line);\n` },
    grade: { hidden: auditGrade(), visible: true },
    steps: [
      'Get familiar with this project before we change anything: read README.md, docs/SPEC.md, src/invoice.js, src/format.js, src/report.js, src/customers.js and every file under test/, each with the Read tool. Then run `node scripts/audit.mjs` once and read its whole output. Give me a short overview of the project, and summarize the audit: how many invoices, the totals per region, and how many need manual review. Do not change any file yet.',
      '/compact',
      'Add `regionTotals(invoices)` to `src/report.js`: it returns an object mapping each region to the sum of `totalCents` of the given invoices, taking the region from the customer record (`byId` in `src/customers.js`). Regions with no invoices are left out. It throws an Error for an unknown customer id. Add tests in `test/report.test.js` and run all tests.',
      'How does the project round tax amounts, and which tests cover it? Answer briefly; do not change any file.',
      '/compact',
      'Finance wants the invoices the audit put up for manual review held until their review date. Create `src/exceptions.js` exporting `heldUntil(invoiceId)`: for each of those invoices it returns the hold-until date as an ISO string, and `null` for every other id. Hard-code the list (do not run the audit or read files at runtime). Add tests in `test/exceptions.test.js` and run all tests.',
      FINAL,
    ],
  },
  'customer-quirks': {
    files: { ...baseFiles(), ...accountPages() },
    grade: { hidden: quirksGrade(), visible: true },
    steps: [
      'Get familiar with this project before we change anything: read README.md, docs/SPEC.md, src/invoice.js, src/customers.js, src/util/round.js, every file under test/, and every page under data/accounts/ (page-01.json to page-08.json), each with the Read tool. Then give me a short overview of the project and of what the account records hold. Do not change any file yet.',
      '/compact',
      TOP_CUSTOMERS,
      "Where does the code decide which region's rates apply to an invoice? Answer briefly; do not change any file.",
      '/compact',
      "A few customers have a special arrangement for fractions of a cent in a line's tax; we came across them at the start. Create `src/rounding.js` exporting `roundingFor(customerId)`, which returns one of: `'truncate'` (the fraction is dropped), `'up'` (any fraction is charged as a full cent), `'half-up'` (an exact half cent goes up, other fractions to the nearest cent), or `'half-even'` (SPEC 3.2, everyone else). Hard-code those customers (no file reads at runtime). Then make `buildInvoice` round each line's tax with the customer's mode. Keep the existing tests passing, add tests in `test/rounding.test.js`, and run all tests.",
      FINAL,
    ],
  },
  'long-conventions': {
    files: baseFiles(),
    grade: { hidden: conventionsGrade(), visible: true },
    steps: [
      ONBOARD,
      `Two team conventions for later in this session. Nothing to change now, just acknowledge them: (1) every error code we introduce is the prefix \`${CONV.prefix}-\` followed by a three-digit number, for example \`${CONV.prefix}-101\`; (2) the reconciliation tolerance finance agreed on is 0.${String(CONV.tolHundredths).padStart(2, '0')}% of the expected amount.`,
      'Walk me through how `buildInvoice` computes an invoice, step by step. Do not change any file.',
      FORMAT_DATE,
      '/compact',
      'Add `regionOf(customerId)` to `src/customers.js`: it returns the region of that customer from `data/customers.json`, or `undefined` for an unknown id. Add tests in `test/customers.test.js` and run all tests.',
      'Which region has the highest `food` rate, and which the lowest? Answer from docs/SPEC.md section 2; do not change any file.',
      TOP_CUSTOMERS,
      '/compact',
      'List every function we added in this session so far, with its file and its tests. Do not change any file.',
      "Add `parseAmount(text)` to `src/format.js`: it parses a decimal amount with at most two decimal places into integer cents (`'1234.56'` gives 123456, `'12'` gives 1200, `'0.5'` gives 50, `'-3.10'` gives -310) and returns `null` for anything else (`'abc'`, `'1.234'`, `''`). Add tests in `test/format.test.js` and run all tests.",
      'What does `formatCents` print for negative amounts, and is that consistent with `parseAmount`? Answer briefly; do not change any file.',
      '/compact',
      "Create `src/validate.js` exporting `validateLine(line)`. It throws an Error with a `code` property when the line's category is not one of the ten categories in SPEC section 2, when `amountCents` is not an integer, or when `amountCents` is negative: a separate code for each of the three cases, following our error code convention. A valid line returns `true`. Add tests in `test/validate.test.js` and run all tests.",
      'Create `src/reconcile.js` exporting `reconcile(expectedCents, actualCents)`: it returns `true` when the actual amount differs from the expected one by no more than our agreed reconciliation tolerance, otherwise `false`. Add tests in `test/reconcile.test.js` and run all tests.',
      '/compact',
      'Run all tests and fix what fails. Then tell me which error codes and which tolerance you used, and confirm they follow the conventions I gave you.',
    ],
  },
  'long-latefees': {
    files: baseFiles(),
    grade: { hidden: lateFeeGrade(), visible: true },
    steps: [
      ONBOARD,
      `Background for later; no code now, just acknowledge it. Finance decided how late fees work: an invoice is due ${LATE.termsDays} days after its date, and paying on the due date is on time. After that the fee is ${LATE.feeBp} basis points of the invoice total for each started 30-day period past the due date, for at most ${LATE.maxPeriods} periods, rounded like tax (SPEC 3.2). Customers in the ${LATE.exempt} region pay no late fees.`,
      'List every rule of docs/SPEC.md section 9 (CSV export) and how the invoice fields map to it. Do not write code yet.',
      'Implement `toCsv(invoices)` in `src/report.js`, following section 9 exactly. Keep the existing tests passing.',
      '/compact',
      'Add tests of your own in `test/report.test.js` covering every rule of section 9. Run all tests and fix what fails.',
      'What does SPEC section 7 say about volume discounts for legacy customers in the island region? Answer briefly; do not change any file.',
      "Create `src/util/dates.js` exporting `daysBetween(fromIso, toIso)`: the number of whole days from the first ISO date to the second, negative when the second is earlier (`daysBetween('2026-01-30', '2026-03-01')` is 30). Add tests in `test/dates.test.js` and run all tests.",
      '/compact',
      'Summarize what we have changed in this session so far, file by file. Do not change any file.',
      'Change `summary(invoices)` in `src/report.js` to list the invoices by date, oldest first; invoices with the same date keep their given order. Do not change the input array. Add tests and run all tests.',
      "How is banker's rounding tested in this project, and is any case missing? Answer briefly; do not change any file.",
      '/compact',
      'Create `src/latefee.js` exporting `dueDate(invoiceDate)`, which returns the ISO due date of an invoice dated `invoiceDate` under the payment terms finance decided. Add tests in `test/latefee.test.js` and run all tests.',
      'Add `lateFee(invoice, customer, paidOn)` to `src/latefee.js`: the late fee in cents for an invoice (`date`, `totalCents`) of that customer (`region`) paid on the ISO date `paidOn`, following what finance decided. Add tests and run all tests.',
      '/compact',
      'Run all tests and fix what fails. Then state the late-fee rules you implemented and confirm they match what I told you.',
    ],
  },
};

rmSync(outRoot, { recursive: true, force: true });
for (const [name, t] of Object.entries({ ...TASKS, ...RECALL_TASKS })) {
  const dir = join(outRoot, name);
  for (const [p, text] of Object.entries(t.files)) write(join(dir, 'repo', p), text);
  // Headless sessions do not auto-compact, so both arms compact at the same
  // two points: after the onboarding read, and after the implementation turn.
  const [onboard, analyse, implement, ...rest] = t.steps;
  const steps = RECALL_TASKS[name] ? t.steps : [onboard, '/compact', analyse, implement, '/compact', ...rest];
  steps.forEach((s, i) => write(join(dir, 'steps', `${String(i + 1).padStart(2, '0')}.md`), s + '\n'));
  // grade/: pristine visible tests plus hidden ones, copied over the work tree before grading.
  for (const [p, text] of Object.entries(t.files)) if (p.startsWith('test/')) write(join(dir, 'grade', p), text);
  for (const [p, text] of Object.entries(t.grade.hidden ?? {})) write(join(dir, 'grade', 'test', p), text);
}
console.log(`built ${Object.keys(TASKS).length + Object.keys(RECALL_TASKS).length} tasks in ${outRoot}`);
