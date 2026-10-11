import { test } from 'node:test';
import assert from 'node:assert/strict';
import { topCustomers } from '../src/customers.js';

test('topCustomers ranks by yearly volume, ties by id', () => {
  assert.deepEqual(topCustomers(5), ["C1084","C1005","C1089","C1010","C1094"]);
  assert.deepEqual(topCustomers(1), ["C1084"]);
});
