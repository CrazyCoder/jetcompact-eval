import { test } from 'node:test';
import assert from 'node:assert/strict';
import { regionTotals } from '../src/report.js';

test('regionTotals sums totals by the customer region', () => {
  const invoices = [{ customerId: 'C1000', totalCents: 100 }, { customerId: 'C1012', totalCents: 50 }, { customerId: 'C1001', totalCents: 7 }];
  assert.deepEqual(regionTotals(invoices), { alpine: 150, baltic: 7 });
  assert.throws(() => regionTotals([{ customerId: 'C9999', totalCents: 1 }]));
});
