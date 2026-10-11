import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dueDate, lateFee } from '../src/latefee.js';

test('dueDate follows the payment terms from turn 2', () => {
  assert.equal(dueDate('2026-03-10'), '2026-04-07');
  assert.equal(dueDate('2026-12-20'), '2027-01-17');
});

const CASES = [["2026-04-07",0],["2026-03-10",0],["2026-04-08",1593],["2026-05-07",1593],["2026-05-08",3185],["2029-01-01",7963]];
for (const [paidOn, fee] of CASES) {
  test(`late fee when paid on ${paidOn}`, () => assert.equal(lateFee({ date: '2026-03-10', totalCents: 123457 }, { id: 'X', region: 'alpine' }, paidOn), fee));
}

test('the exempt region pays no late fee', () => {
  assert.equal(lateFee({ date: '2026-03-10', totalCents: 123457 }, { id: 'X', region: 'eastern' }, '2026-05-22'), 0);
});
