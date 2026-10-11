import { test } from 'node:test';
import assert from 'node:assert/strict';
import { summary } from '../src/report.js';

test('summary lists invoices oldest first, stable, without changing the input', () => {
  const invoices = [{ customerId: 'A', date: '2026-03-01', totalCents: 100 }, { customerId: 'B', date: '2026-01-01', totalCents: 200 }, { customerId: 'C', date: '2026-03-01', totalCents: 300 }];
  assert.equal(summary(invoices), 'B  2026-01-01  2.00\nA  2026-03-01  1.00\nC  2026-03-01  3.00');
  assert.equal(invoices[0].customerId, 'A');
});
