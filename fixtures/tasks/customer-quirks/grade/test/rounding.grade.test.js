import { test } from 'node:test';
import assert from 'node:assert/strict';
import { roundingFor } from '../src/rounding.js';
import { buildInvoice } from '../src/invoice.js';

const CASES = [{"id":"C1053","mode":"truncate","region":"fjord","category":"books","amountCents":1004,"taxCents":135},{"id":"C1047","mode":"up","region":"southern","category":"books","amountCents":1001,"taxCents":136},{"id":"C1056","mode":"half-up","region":"lakes","category":"books","amountCents":1100,"taxCents":149}];
for (const c of CASES) {
  test(`${c.id} rounds line tax with ${c.mode}`, () => {
    assert.equal(roundingFor(c.id), c.mode);
    const inv = buildInvoice({ id: c.id, region: c.region }, [{ category: c.category, amountCents: c.amountCents }]);
    assert.equal(inv.taxCents, c.taxCents);
  });
}

test('everyone else rounds half-even', () => {
  for (const id of ["C1000","C1001","C1050","C1099","C1159"]) assert.equal(roundingFor(id), 'half-even');
  const p = {"id":"C1007","region":"island","category":"books","amountCents":1800,"taxCents":148};
  assert.equal(buildInvoice({ id: p.id, region: p.region }, [{ category: p.category, amountCents: p.amountCents }]).taxCents, p.taxCents);
});
