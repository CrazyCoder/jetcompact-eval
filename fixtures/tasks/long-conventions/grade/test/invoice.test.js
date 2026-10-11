import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildInvoice } from '../src/invoice.js';

const cases = [{"r":"alpine","lines":[{"category":"food","amountCents":20000},{"category":"tools","amountCents":2500},{"category":"books","amountCents":9990}],"tax":4050,"total":36540},{"r":"baltic","lines":[{"category":"food","amountCents":21000},{"category":"tools","amountCents":2600},{"category":"books","amountCents":9990}],"tax":2279,"total":35869},{"r":"coastal","lines":[{"category":"food","amountCents":22000},{"category":"tools","amountCents":2700},{"category":"books","amountCents":9990}],"tax":4168,"total":38858},{"r":"delta","lines":[{"category":"food","amountCents":23000},{"category":"tools","amountCents":2800},{"category":"books","amountCents":9990}],"tax":4599,"total":40389},{"r":"eastern","lines":[{"category":"food","amountCents":24000},{"category":"tools","amountCents":2900},{"category":"books","amountCents":9990}],"tax":2482,"total":39372},{"r":"fjord","lines":[{"category":"food","amountCents":25000},{"category":"tools","amountCents":3000},{"category":"books","amountCents":9990}],"tax":4543,"total":42533},{"r":"highland","lines":[{"category":"food","amountCents":26000},{"category":"tools","amountCents":3100},{"category":"books","amountCents":9990}],"tax":5148,"total":44238},{"r":"island","lines":[{"category":"food","amountCents":27000},{"category":"tools","amountCents":3200},{"category":"books","amountCents":9990}],"tax":2684,"total":42874},{"r":"lakes","lines":[{"category":"food","amountCents":28000},{"category":"tools","amountCents":3300},{"category":"books","amountCents":9990}],"tax":4920,"total":46210},{"r":"nordic","lines":[{"category":"food","amountCents":29000},{"category":"tools","amountCents":3400},{"category":"books","amountCents":9990}],"tax":5697,"total":48087},{"r":"plains","lines":[{"category":"food","amountCents":30000},{"category":"tools","amountCents":3500},{"category":"books","amountCents":9990}],"tax":2886,"total":46376},{"r":"southern","lines":[{"category":"food","amountCents":31000},{"category":"tools","amountCents":3600},{"category":"books","amountCents":9990}],"tax":5296,"total":49886}];

for (const c of cases) {
  test(`invoice totals in ${c.r}`, () => {
    const inv = buildInvoice({ id: 'T', region: c.r }, c.lines);
    assert.equal(inv.taxCents, c.tax);
    assert.equal(inv.totalCents, c.total);
  });
}
