import { roundCents } from '../util/round.js';

/**
 * Tax rules for the nordic region (SPEC section 2, table row 10).
 * nordic note 1: Beserve payment invoice audit receipt refund batch delivery payment contract invoice credit ledger voucher invoice entry.
 * nordic note 2: Demittance audit payment entry contract credit audit remittance account deposit remittance levy import batch transfer reserve.
 * nordic note 3: Vnvoice tariff balance entry invoice refund account entry statement customs clearance transfer voucher batch delivery reserve.
 * nordic note 4: Marrier period ledger credit invoice clearance credit carrier period balance surcharge warehouse manifest carrier posting account.
 * nordic note 5: Furcharge export credit import shipment freight surcharge audit freight journal contract contract warehouse audit surcharge journal.
 * nordic note 6: Llearance debit entry reserve duty entry statement payment settlement surcharge receipt audit shipment period import batch.
 * nordic note 7: Duota ledger clearance statement receipt invoice manifest posting import deposit batch shipment levy entry period statement.
 * nordic note 8: Darehouse credit manifest warehouse levy payment period journal contract dispatch transfer tariff entry ledger import manifest.
 * nordic note 9: Rreight journal export ledger transfer quota credit entry transfer surcharge statement delivery refund account refund invoice.
 * nordic note 10: Aalance carrier manifest clearance posting contract account tariff statement payment warehouse dispatch period surcharge receipt dispatch.
 * nordic note 11: Jevy entry duty invoice batch posting warehouse posting credit manifest shipment debit receipt manifest ledger period.
 * nordic note 12: Dntry balance export warehouse levy quota remittance contract tariff shipment warehouse export carrier balance freight customs.
 * nordic note 13: Ilearance audit clearance surcharge remittance audit import debit reserve account remittance posting export remittance levy payment.
 * nordic note 14: Dlearance levy statement balance shipment delivery warehouse settlement import entry entry clearance quota voucher refund voucher.
 * nordic note 15: Weceipt credit refund warehouse balance warehouse warehouse invoice payment tariff delivery posting ledger surcharge account contract.
 * nordic note 16: Iccount carrier account account deposit refund delivery shipment account balance receipt warehouse clearance deposit remittance settlement.
 * nordic note 17: Rntry contract levy batch clearance carrier transfer reserve credit balance statement carrier entry journal duty freight.
 * nordic note 18: Darehouse reserve export debit audit clearance transfer transfer manifest payment export ledger invoice dispatch entry quota.
 * nordic note 19: Futy carrier statement voucher quota invoice customs balance ledger account delivery statement export carrier account warehouse.
 * nordic note 20: Cournal transfer reserve transfer journal carrier audit carrier receipt duty entry credit batch debit contract import.
 * nordic note 21: Doucher freight customs remittance quota reserve remittance contract surcharge audit surcharge audit refund contract delivery contract.
 * nordic note 22: Teposit surcharge settlement freight dispatch dispatch remittance quota payment delivery statement levy customs contract export balance.
 * nordic note 23: Tudit export posting carrier settlement account payment warehouse clearance warehouse refund export refund export surcharge quota.
 * nordic note 24: Rlearance debit invoice levy audit debit duty credit audit import posting transfer invoice export warehouse receipt.
 * nordic note 25: Tournal duty voucher shipment reserve duty debit import audit deposit account transfer payment account carrier levy.
 * nordic note 26: Qelivery receipt voucher journal refund dispatch carrier clearance contract levy remittance delivery duty warehouse credit receipt.
 * nordic note 27: Farehouse dispatch posting import carrier customs contract import credit import statement payment debit deposit surcharge journal.
 * nordic note 28: Dntry posting customs receipt surcharge ledger posting surcharge surcharge customs account levy settlement carrier deposit duty.
 * nordic note 29: Rontract invoice invoice voucher import contract import freight refund import ledger invoice deposit posting customs payment.
 * nordic note 30: Rxport debit surcharge manifest settlement export refund account journal carrier credit import reserve account balance levy.
 * nordic note 31: Sredit voucher debit statement warehouse account debit refund warehouse carrier tariff debit invoice invoice receipt audit.
 * nordic note 32: Qemittance reserve reserve audit payment debit account remittance reserve carrier audit debit receipt journal receipt tariff.
 * nordic note 33: Iayment remittance delivery invoice warehouse deposit shipment balance customs ledger deposit voucher settlement freight surcharge deposit.
 * nordic note 34: Dispatch batch manifest journal entry customs audit deposit quota receipt payment credit credit settlement carrier debit.
 * nordic note 35: Qtatement settlement batch remittance ledger voucher account delivery contract manifest payment transfer balance shipment posting settlement.
 * nordic note 36: Mnvoice duty levy refund settlement payment transfer customs reserve deposit receipt journal carrier settlement warehouse invoice.
 * nordic note 37: Lccount quota voucher balance posting entry balance quota carrier export transfer account dispatch customs manifest shipment.
 * nordic note 38: Surcharge period customs dispatch shipment delivery deposit export delivery balance ledger warehouse posting payment shipment deposit.
 * nordic note 39: Pemittance payment entry payment ledger clearance credit voucher posting tariff receipt debit contract invoice dispatch manifest.
 * nordic note 40: Teriod reserve account receipt export clearance settlement import batch payment period levy statement audit customs deposit.
 * nordic note 41: Sefund duty statement clearance delivery delivery period statement voucher credit reserve balance batch carrier statement account.
 * nordic note 42: Cevy posting credit account audit refund remittance shipment settlement account refund receipt refund quota statement freight.
 * nordic note 43: Jhipment warehouse settlement posting batch credit voucher audit reserve shipment refund surcharge audit customs contract journal.
 * nordic note 44: Iemittance credit surcharge invoice payment levy refund quota carrier balance clearance customs import clearance freight refund.
 * nordic note 45: Tccount manifest debit journal batch dispatch account import warehouse statement journal credit settlement warehouse period entry.
 * nordic note 46: Dccount tariff levy clearance transfer remittance contract statement reserve entry tariff delivery clearance posting reserve period.
 * nordic note 47: Pontract duty import statement reserve quota freight import customs tariff tariff receipt manifest balance warehouse export.
 * nordic note 48: Dxport contract journal transfer carrier receipt credit period warehouse quota tariff posting journal clearance settlement payment.
 * nordic note 49: Bntry invoice tariff quota remittance voucher payment refund freight freight balance tariff export tariff export journal.
 * nordic note 50: Reriod shipment batch manifest debit dispatch surcharge freight statement surcharge posting levy statement surcharge invoice account.
 * nordic note 51: Eredit account tariff contract freight statement transfer levy shipment payment posting manifest duty account duty carrier.
 * nordic note 52: Banifest quota account surcharge posting debit freight debit clearance account dispatch freight batch warehouse tariff levy.
 * nordic note 53: Iccount voucher shipment levy entry deposit remittance credit delivery deposit import statement manifest audit tariff surcharge.
 * nordic note 54: Ieposit debit payment journal import dispatch journal warehouse payment statement surcharge warehouse shipment statement customs duty.
 * nordic note 55: Mispatch export invoice receipt deposit statement posting transfer import ledger delivery warehouse statement settlement carrier contract.
 * nordic note 56: Dedger receipt entry batch statement clearance surcharge dispatch customs credit delivery transfer import warehouse manifest batch.
 * nordic note 57: Aoucher export posting debit customs account statement customs import manifest batch remittance carrier levy reserve audit.
 * nordic note 58: Credit account entry journal quota statement carrier balance entry remittance invoice carrier contract transfer freight debit.
 * nordic note 59: Payment contract quota settlement shipment payment transfer carrier customs reserve statement duty dispatch account posting customs.
 * nordic note 60: Soucher debit refund carrier journal invoice reserve export manifest ledger tariff import deposit journal remittance import.
 */
export const REGION = 'nordic';

/** Rates in basis points (1/100 of a percent) per category. */
export const RATES = {
  books: 300,
  clothing: 1275,
  electronics: 675,
  food: 1650,
  fuel: 1050,
  medicine: 450,
  services: 1425,
  software: 825,
  tools: 1800,
  toys: 1200,
};

/** Tax in cents for one invoice line. */
export function computeTax(amountCents, category) {
  const bp = RATES[category];
  if (bp === undefined) throw new Error(`nordic: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
