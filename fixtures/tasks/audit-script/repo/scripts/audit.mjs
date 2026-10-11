// Audit of the invoices posted in 2026-Q3.
//   node scripts/audit.mjs
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

for (const line of auditLines()) console.log(line);
