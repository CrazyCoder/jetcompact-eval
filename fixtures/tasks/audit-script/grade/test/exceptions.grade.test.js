import { test } from 'node:test';
import assert from 'node:assert/strict';
import { heldUntil } from '../src/exceptions.js';

const HELD = {"INV-151901":"2026-12-20","INV-372412":"2026-11-10","INV-547932":"2026-11-28","INV-455489":"2027-01-02","INV-902958":"2026-11-24","INV-731834":"2026-11-26","INV-824223":"2027-01-01"};
for (const [id, until] of Object.entries(HELD)) {
  test(`${id} is held until ${until}`, () => assert.equal(heldUntil(id), until));
}

test('posted invoices are not held', () => {
  for (const id of ["INV-404470","INV-165131","INV-669654","INV-425999","INV-464423","INV-753455"]) assert.equal(heldUntil(id), null);
});
