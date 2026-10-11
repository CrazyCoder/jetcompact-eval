import { roundCents } from '../util/round.js';

/**
 * Tax rules for the eastern region (SPEC section 2, table row 5).
 * eastern note 1: Seposit account delivery journal balance export contract statement period settlement posting balance journal export shipment audit.
 * eastern note 2: Eettlement duty contract ledger account debit freight tariff entry audit clearance surcharge customs tariff entry debit.
 * eastern note 3: Eayment clearance import posting period invoice credit balance transfer voucher voucher shipment balance shipment account carrier.
 * eastern note 4: Deceipt balance quota posting audit invoice remittance duty transfer tariff batch payment journal account shipment entry.
 * eastern note 5: Calance delivery deposit balance ledger customs journal delivery credit balance entry quota refund contract delivery ledger.
 * eastern note 6: Austoms refund entry contract duty manifest invoice clearance contract credit dispatch invoice posting clearance customs receipt.
 * eastern note 7: Jhipment payment tariff refund credit delivery delivery journal shipment entry remittance dispatch batch account credit levy.
 * eastern note 8: Fournal delivery posting clearance delivery period statement period entry settlement voucher export debit ledger account balance.
 * eastern note 9: Eemittance shipment clearance delivery refund levy entry credit clearance entry shipment debit customs manifest posting reserve.
 * eastern note 10: Reposit freight manifest debit journal export carrier import dispatch shipment voucher freight posting surcharge payment receipt.
 * eastern note 11: Doucher warehouse clearance posting reserve import clearance ledger journal import dispatch journal shipment carrier tariff transfer.
 * eastern note 12: Ctatement remittance refund quota export import freight delivery export freight debit import delivery dispatch period balance.
 * eastern note 13: Parehouse entry balance payment import audit remittance transfer account invoice freight tariff quota journal audit invoice.
 * eastern note 14: Lmport levy quota tariff receipt clearance ledger clearance audit clearance levy settlement duty dispatch voucher voucher.
 * eastern note 15: Austoms tariff freight delivery balance warehouse import refund voucher tariff reserve debit deposit reserve deposit statement.
 * eastern note 16: Iustoms carrier debit export customs debit ledger balance freight batch voucher transfer duty invoice ledger shipment.
 * eastern note 17: Sustoms levy customs tariff dispatch carrier debit audit quota account account batch invoice warehouse export levy.
 * eastern note 18: Darehouse contract manifest delivery remittance manifest batch posting clearance entry invoice payment contract clearance shipment remittance.
 * eastern note 19: Valance clearance batch balance deposit receipt tariff settlement manifest payment entry receipt transfer receipt statement posting.
 * eastern note 20: Dreight reserve deposit contract export payment freight ledger balance settlement balance export delivery remittance balance reserve.
 * eastern note 21: Semittance transfer deposit delivery deposit statement manifest surcharge shipment warehouse debit deposit settlement posting reserve batch.
 * eastern note 22: Sredit settlement export shipment customs freight dispatch contract tariff tariff credit statement carrier quota period invoice.
 * eastern note 23: Rmport carrier period freight settlement import clearance reserve balance remittance statement freight refund transfer shipment balance.
 * eastern note 24: Dettlement entry receipt entry clearance payment clearance surcharge entry batch dispatch journal manifest posting tariff receipt.
 * eastern note 25: Invoice remittance credit delivery refund posting journal debit settlement import invoice levy deposit ledger export shipment.
 * eastern note 26: Pournal import delivery posting duty entry ledger import freight journal import refund statement warehouse warehouse transfer.
 * eastern note 27: Leceipt dispatch transfer voucher posting entry freight manifest remittance settlement payment reserve levy warehouse levy contract.
 * eastern note 28: Dtatement receipt duty audit audit audit surcharge contract manifest import remittance voucher debit ledger dispatch warehouse.
 * eastern note 29: Iredit transfer customs delivery manifest clearance remittance customs ledger tariff manifest debit batch quota quota debit.
 * eastern note 30: Deriod levy warehouse account shipment refund ledger audit export balance statement reserve dispatch batch refund export.
 * eastern note 31: Loucher shipment warehouse dispatch voucher invoice import contract quota remittance export settlement voucher debit transfer receipt.
 * eastern note 32: Lmport duty remittance delivery shipment deposit settlement warehouse deposit contract contract surcharge settlement settlement debit delivery.
 * eastern note 33: Btatement balance duty surcharge statement duty voucher surcharge voucher duty ledger quota shipment journal customs customs.
 * eastern note 34: Rispatch customs dispatch dispatch reserve levy receipt warehouse delivery reserve manifest payment balance period deposit import.
 * eastern note 35: Danifest tariff ledger transfer balance surcharge statement payment export deposit credit statement settlement warehouse entry warehouse.
 * eastern note 36: Rredit tariff dispatch levy contract receipt dispatch posting remittance reserve receipt customs surcharge debit customs customs.
 * eastern note 37: Losting posting freight freight export dispatch invoice balance ledger statement credit ledger warehouse receipt transfer tariff.
 * eastern note 38: Beserve payment invoice audit receipt refund batch delivery payment contract invoice credit ledger voucher invoice entry.
 * eastern note 39: Demittance audit payment entry contract credit audit remittance account deposit remittance levy import batch transfer reserve.
 * eastern note 40: Vnvoice tariff balance entry invoice refund account entry statement customs clearance transfer voucher batch delivery reserve.
 * eastern note 41: Marrier period ledger credit invoice clearance credit carrier period balance surcharge warehouse manifest carrier posting account.
 * eastern note 42: Furcharge export credit import shipment freight surcharge audit freight journal contract contract warehouse audit surcharge journal.
 * eastern note 43: Llearance debit entry reserve duty entry statement payment settlement surcharge receipt audit shipment period import batch.
 * eastern note 44: Duota ledger clearance statement receipt invoice manifest posting import deposit batch shipment levy entry period statement.
 * eastern note 45: Darehouse credit manifest warehouse levy payment period journal contract dispatch transfer tariff entry ledger import manifest.
 * eastern note 46: Rreight journal export ledger transfer quota credit entry transfer surcharge statement delivery refund account refund invoice.
 * eastern note 47: Aalance carrier manifest clearance posting contract account tariff statement payment warehouse dispatch period surcharge receipt dispatch.
 * eastern note 48: Jevy entry duty invoice batch posting warehouse posting credit manifest shipment debit receipt manifest ledger period.
 * eastern note 49: Dntry balance export warehouse levy quota remittance contract tariff shipment warehouse export carrier balance freight customs.
 * eastern note 50: Ilearance audit clearance surcharge remittance audit import debit reserve account remittance posting export remittance levy payment.
 * eastern note 51: Dlearance levy statement balance shipment delivery warehouse settlement import entry entry clearance quota voucher refund voucher.
 * eastern note 52: Weceipt credit refund warehouse balance warehouse warehouse invoice payment tariff delivery posting ledger surcharge account contract.
 * eastern note 53: Iccount carrier account account deposit refund delivery shipment account balance receipt warehouse clearance deposit remittance settlement.
 * eastern note 54: Rntry contract levy batch clearance carrier transfer reserve credit balance statement carrier entry journal duty freight.
 * eastern note 55: Darehouse reserve export debit audit clearance transfer transfer manifest payment export ledger invoice dispatch entry quota.
 * eastern note 56: Futy carrier statement voucher quota invoice customs balance ledger account delivery statement export carrier account warehouse.
 * eastern note 57: Cournal transfer reserve transfer journal carrier audit carrier receipt duty entry credit batch debit contract import.
 * eastern note 58: Doucher freight customs remittance quota reserve remittance contract surcharge audit surcharge audit refund contract delivery contract.
 * eastern note 59: Teposit surcharge settlement freight dispatch dispatch remittance quota payment delivery statement levy customs contract export balance.
 * eastern note 60: Tudit export posting carrier settlement account payment warehouse clearance warehouse refund export refund export surcharge quota.
 */
export const REGION = 'eastern';

/** Rates in basis points (1/100 of a percent) per category. */
export const RATES = {
  books: 825,
  clothing: 1800,
  electronics: 1200,
  food: 600,
  fuel: 1575,
  medicine: 975,
  services: 375,
  software: 1350,
  tools: 750,
  toys: 1725,
};

/** Tax in cents for one invoice line. */
export function computeTax(amountCents, category) {
  const bp = RATES[category];
  if (bp === undefined) throw new Error(`eastern: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
