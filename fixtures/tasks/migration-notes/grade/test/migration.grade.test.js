import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cutoverDate } from '../src/migration.js';

const CUTOVER = {"alpine":"2027-03-22","baltic":"2027-08-04","coastal":"2027-10-06","delta":"2027-11-18","eastern":"2027-05-14","fjord":"2027-02-12","highland":"2027-08-16","island":"2027-07-01","lakes":"2027-10-20","nordic":"2027-02-02","plains":"2027-01-14","southern":"2027-06-19"};
for (const [region, date] of Object.entries(CUTOVER)) {
  test(`cut-over date of ${region}`, () => assert.equal(cutoverDate(region), date));
}

test('cutoverDate throws for an unknown region', () => {
  assert.throws(() => cutoverDate('atlantis'));
});
