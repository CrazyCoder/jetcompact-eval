import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatDate } from '../src/format.js';

test('formatDate writes DD.MM.YYYY', () => {
  assert.equal(formatDate('2026-06-01'), '01.06.2026');
  assert.equal(formatDate('2027-12-31'), '31.12.2027');
});
