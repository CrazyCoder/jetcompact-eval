import { test } from 'node:test';
import assert from 'node:assert/strict';
import { discountRate } from '../src/discount.js';
import { buildInvoice } from '../src/invoice.js';

const c = (tier, vol, extra = {}) => ({ id: 'X', region: 'plains', tier, yearlyVolumeCents: vol, legacy: false, ...extra });

test('rates by tier and volume (SPEC 7.2)', () => {
  assert.equal(discountRate(c('bronze', 999_999_99)), 0);
  assert.equal(discountRate(c('bronze', 1_000_000_00)), 100);
  assert.equal(discountRate(c('silver', 2_499_999_99)), 200);
  assert.equal(discountRate(c('silver', 2_500_000_00)), 300);
  assert.equal(discountRate(c('gold', 4_999_999_99)), 400);
  assert.equal(discountRate(c('gold', 5_000_000_00)), 600);
  assert.equal(discountRate(c('platinum', 1)), 700);
});

test('legacy bonus (SPEC 7.3)', () => {
  assert.equal(discountRate(c('gold', 5_000_000_00, { legacy: true })), 750);
  assert.equal(discountRate(c('bronze', 1, { legacy: true })), 150);
});

test('island cap after the legacy bonus (SPEC 7.5)', () => {
  assert.equal(discountRate(c('platinum', 1, { region: 'island' })), 500);
  assert.equal(discountRate(c('gold', 1, { region: 'island', legacy: true })), 500);
  assert.equal(discountRate(c('silver', 1, { region: 'island', legacy: true })), 350);
});

test('invoice applies the discount per line, not on services, tax on the discounted base (SPEC 7.1, 7.4, 7.6, 7.7)', () => {
  const cust = c('gold', 5_000_000_00);
  const inv = buildInvoice(cust, [
    { category: 'tools', amountCents: 10025 },
    { category: 'services', amountCents: 50000 },
  ], '2026-06-01');
  assert.equal(inv.lines[0].discountCents, 602);
  assert.equal(inv.lines[1].discountCents, 0);
  assert.equal(inv.discountCents, 602);
  assert.equal(inv.subtotalCents, 60025);
  const taxTools = 707;
  const taxServices = 1875;
  assert.equal(inv.taxCents, taxTools + taxServices);
  assert.equal(inv.totalCents, 60025 - 602 + taxTools + taxServices);
});
