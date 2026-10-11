import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateLine } from '../src/validate.js';

const codeOf = (line) => { try { validateLine(line); } catch (e) { return e.code; } return undefined; };

test('validateLine error codes follow the convention from turn 2', () => {
  const codes = [codeOf({ category: 'gadgets', amountCents: 100 }), codeOf({ category: 'tools', amountCents: 1.5 }), codeOf({ category: 'tools', amountCents: -100 })];
  for (const c of codes) assert.match(String(c), /^KSZ-\d{3}$/);
  assert.equal(new Set(codes).size, 3);
  assert.equal(validateLine({ category: 'tools', amountCents: 100 }), true);
});
