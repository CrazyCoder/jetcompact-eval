import { test } from 'node:test';
import assert from 'node:assert/strict';
import { regionOf } from '../src/customers.js';

test('regionOf reads the customer data', () => {
  assert.equal(regionOf('C1000'), 'alpine');
  assert.equal(regionOf('C1013'), 'baltic');
  assert.equal(regionOf('C9999'), undefined);
});
