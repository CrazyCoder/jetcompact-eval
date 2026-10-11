import { formatCents } from './format.js';

/** A plain-text summary of invoices, one line each (SPEC section 8). */
export function summary(invoices) {
  return invoices.map((i) => `${i.customerId}  ${i.date}  ${formatCents(i.totalCents)}`).join('\n');
}
