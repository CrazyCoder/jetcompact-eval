import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toCsv } from '../src/report.js';

const invoices = [
  { customerId: 'C1000', date: '2026-06-01', subtotalCents: 123456, discountCents: 1234, taxCents: 9876, totalCents: 132098 },
  { customerId: 'C1001', date: '2026-12-31', subtotalCents: 500, taxCents: 25, totalCents: 525 },
];

test('CSV follows SPEC 9 exactly', () => {
  const expected =
    'invoice_no,customer_id,date,subtotal,discount,tax,total,currency\r\n' +
    '00001,C1000,01.06.2026,1234.56,12.34,98.76,1320.98,EUR\r\n' +
    '00002,C1001,31.12.2026,5.00,0.00,0.25,5.25,EUR\r\n' +
    'TOTAL,,,1239.56,12.34,99.01,1326.23,EUR\r\n';
  assert.equal(toCsv(invoices), expected);
});

test('empty list gives header and a zero footer', () => {
  assert.equal(toCsv([]), 'invoice_no,customer_id,date,subtotal,discount,tax,total,currency\r\nTOTAL,,,0.00,0.00,0.00,0.00,EUR\r\n');
});
