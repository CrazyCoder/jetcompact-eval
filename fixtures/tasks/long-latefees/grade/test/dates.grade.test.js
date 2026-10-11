import { test } from 'node:test';
import assert from 'node:assert/strict';
import { daysBetween } from '../src/util/dates.js';

test('daysBetween', () => {
  assert.equal(daysBetween('2026-01-30', '2026-03-01'), 30);
  assert.equal(daysBetween('2026-03-01', '2026-01-30'), -30);
  assert.equal(daysBetween('2026-12-31', '2027-01-01'), 1);
});
