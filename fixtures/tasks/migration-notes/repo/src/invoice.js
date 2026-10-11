import { regions } from './regions/index.js';

/**
 * Builds an invoice: one tax amount per line from the customer's region,
 * then subtotal, tax and total in cents (SPEC section 5).
 */
export function buildInvoice(customer, lines, date = '2026-06-01') {
  const mod = regions[customer.region];
  if (!mod) throw new Error(`unknown region ${customer.region}`);
  const taxed = lines.map((line) => ({ ...line, taxCents: mod.computeTax(line.amountCents, line.category) }));
  const subtotalCents = taxed.reduce((s, l) => s + l.amountCents, 0);
  const taxCents = taxed.reduce((s, l) => s + l.taxCents, 0);
  return { customerId: customer.id, date, lines: taxed, subtotalCents, taxCents, totalCents: subtotalCents + taxCents };
}
