import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseAmount } from '../src/format.js';

test('parseAmount', () => {
  assert.equal(parseAmount('1234.56'), 123456);
  assert.equal(parseAmount('12'), 1200);
  assert.equal(parseAmount('0.5'), 50);
  assert.equal(parseAmount('-3.10'), -310);
  for (const bad of ['abc', '1.234', '']) assert.equal(parseAmount(bad), null);
});
