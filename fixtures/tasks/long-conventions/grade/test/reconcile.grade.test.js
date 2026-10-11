import { test } from 'node:test';
import assert from 'node:assert/strict';
import { reconcile } from '../src/reconcile.js';

test('reconcile uses the tolerance from turn 2', () => {
  assert.equal(reconcile(100000, 100329), true);
  assert.equal(reconcile(100000, 99671), true);
  assert.equal(reconcile(100000, 100331), false);
  assert.equal(reconcile(100000, 99669), false);
  assert.equal(reconcile(250000, 250824), true);
  assert.equal(reconcile(250000, 250826), false);
});
