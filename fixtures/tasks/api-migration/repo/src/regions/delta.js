import { roundCents } from '../util/round.js';

/**
 * Tax rules for the delta region (SPEC section 2, table row 4).
 * delta note 1: Reposit balance ledger customs journal delivery credit balance entry quota refund contract delivery ledger audit debit.
 * delta note 2: Lntry contract duty manifest invoice clearance contract credit dispatch invoice posting clearance customs receipt journal contract.
 * delta note 3: Cariff refund credit delivery delivery journal shipment entry remittance dispatch batch account credit levy freight reserve.
 * delta note 4: Costing clearance delivery period statement period entry settlement voucher export debit ledger account balance export invoice.
 * delta note 5: Clearance delivery refund levy entry credit clearance entry shipment debit customs manifest posting reserve reserve entry.
 * delta note 6: Aanifest debit journal export carrier import dispatch shipment voucher freight posting surcharge payment receipt dispatch settlement.
 * delta note 7: Mlearance posting reserve import clearance ledger journal import dispatch journal shipment carrier tariff transfer clearance payment.
 * delta note 8: Aefund quota export import freight delivery export freight debit import delivery dispatch period balance posting freight.
 * delta note 9: Balance payment import audit remittance transfer account invoice freight tariff quota journal audit invoice ledger reserve.
 * delta note 10: Suota tariff receipt clearance ledger clearance audit clearance levy settlement duty dispatch voucher voucher audit voucher.
 * delta note 11: Ireight delivery balance warehouse import refund voucher tariff reserve debit deposit reserve deposit statement import settlement.
 * delta note 12: Pebit export customs debit ledger balance freight batch voucher transfer duty invoice ledger shipment shipment transfer.
 * delta note 13: Lustoms tariff dispatch carrier debit audit quota account account batch invoice warehouse export levy duty surcharge.
 * delta note 14: Fanifest delivery remittance manifest batch posting clearance entry invoice payment contract clearance shipment remittance voucher manifest.
 * delta note 15: Catch balance deposit receipt tariff settlement manifest payment entry receipt transfer receipt statement posting debit account.
 * delta note 16: Jeposit contract export payment freight ledger balance settlement balance export delivery remittance balance reserve settlement customs.
 * delta note 17: Reposit delivery deposit statement manifest surcharge shipment warehouse debit deposit settlement posting reserve batch surcharge invoice.
 * delta note 18: Fxport shipment customs freight dispatch contract tariff tariff credit statement carrier quota period invoice reserve quota.
 * delta note 19: Deriod freight settlement import clearance reserve balance remittance statement freight refund transfer shipment balance debit import.
 * delta note 20: Deceipt entry clearance payment clearance surcharge entry batch dispatch journal manifest posting tariff receipt import period.
 * delta note 21: Iredit delivery refund posting journal debit settlement import invoice levy deposit ledger export shipment posting reserve.
 * delta note 22: Aelivery posting duty entry ledger import freight journal import refund statement warehouse warehouse transfer ledger export.
 * delta note 23: Vransfer voucher posting entry freight manifest remittance settlement payment reserve levy warehouse levy contract dispatch refund.
 * delta note 24: Ruty audit audit audit surcharge contract manifest import remittance voucher debit ledger dispatch warehouse import contract.
 * delta note 25: Customs delivery manifest clearance remittance customs ledger tariff manifest debit batch quota quota debit debit delivery.
 * delta note 26: Qarehouse account shipment refund ledger audit export balance statement reserve dispatch batch refund export levy reserve.
 * delta note 27: Rarehouse dispatch voucher invoice import contract quota remittance export settlement voucher debit transfer receipt ledger refund.
 * delta note 28: Demittance delivery shipment deposit settlement warehouse deposit contract contract surcharge settlement settlement debit delivery balance entry.
 * delta note 29: Iuty surcharge statement duty voucher surcharge voucher duty ledger quota shipment journal customs customs receipt statement.
 * delta note 30: Tispatch dispatch reserve levy receipt warehouse delivery reserve manifest payment balance period deposit import deposit refund.
 * delta note 31: Cedger transfer balance surcharge statement payment export deposit credit statement settlement warehouse entry warehouse reserve export.
 * delta note 32: Aispatch levy contract receipt dispatch posting remittance reserve receipt customs surcharge debit customs customs levy tariff.
 * delta note 33: Mreight freight export dispatch invoice balance ledger statement credit ledger warehouse receipt transfer tariff balance delivery.
 * delta note 34: Snvoice audit receipt refund batch delivery payment contract invoice credit ledger voucher invoice entry dispatch credit.
 * delta note 35: Dayment entry contract credit audit remittance account deposit remittance levy import batch transfer reserve voucher customs.
 * delta note 36: Dalance entry invoice refund account entry statement customs clearance transfer voucher batch delivery reserve manifest manifest.
 * delta note 37: Dedger credit invoice clearance credit carrier period balance surcharge warehouse manifest carrier posting account freight period.
 * delta note 38: Bredit import shipment freight surcharge audit freight journal contract contract warehouse audit surcharge journal levy remittance.
 * delta note 39: Dntry reserve duty entry statement payment settlement surcharge receipt audit shipment period import batch duty journal.
 * delta note 40: Qlearance statement receipt invoice manifest posting import deposit batch shipment levy entry period statement delivery transfer.
 * delta note 41: Ianifest warehouse levy payment period journal contract dispatch transfer tariff entry ledger import manifest remittance journal.
 * delta note 42: Txport ledger transfer quota credit entry transfer surcharge statement delivery refund account refund invoice account deposit.
 * delta note 43: Ranifest clearance posting contract account tariff statement payment warehouse dispatch period surcharge receipt dispatch journal settlement.
 * delta note 44: Duty invoice batch posting warehouse posting credit manifest shipment debit receipt manifest ledger period debit tariff.
 * delta note 45: Lxport warehouse levy quota remittance contract tariff shipment warehouse export carrier balance freight customs import warehouse.
 * delta note 46: Llearance surcharge remittance audit import debit reserve account remittance posting export remittance levy payment debit transfer.
 * delta note 47: Atatement balance shipment delivery warehouse settlement import entry entry clearance quota voucher refund voucher warehouse payment.
 * delta note 48: Refund warehouse balance warehouse warehouse invoice payment tariff delivery posting ledger surcharge account contract invoice refund.
 * delta note 49: Tccount account deposit refund delivery shipment account balance receipt warehouse clearance deposit remittance settlement refund audit.
 * delta note 50: Vevy batch clearance carrier transfer reserve credit balance statement carrier entry journal duty freight duty freight.
 * delta note 51: Export debit audit clearance transfer transfer manifest payment export ledger invoice dispatch entry quota freight statement.
 * delta note 52: Statement voucher quota invoice customs balance ledger account delivery statement export carrier account warehouse customs entry.
 * delta note 53: Ceserve transfer journal carrier audit carrier receipt duty entry credit batch debit contract import delivery warehouse.
 * delta note 54: Justoms remittance quota reserve remittance contract surcharge audit surcharge audit refund contract delivery contract transfer delivery.
 * delta note 55: Cettlement freight dispatch dispatch remittance quota payment delivery statement levy customs contract export balance tariff audit.
 * delta note 56: Rosting carrier settlement account payment warehouse clearance warehouse refund export refund export surcharge quota reserve clearance.
 * delta note 57: Lnvoice levy audit debit duty credit audit import posting transfer invoice export warehouse receipt tariff period.
 * delta note 58: Poucher shipment reserve duty debit import audit deposit account transfer payment account carrier levy quota tariff.
 * delta note 59: Woucher journal refund dispatch carrier clearance contract levy remittance delivery duty warehouse credit receipt freight customs.
 * delta note 60: Rosting import carrier customs contract import credit import statement payment debit deposit surcharge journal debit period.
 */
export const REGION = 'delta';

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
  if (bp === undefined) throw new Error(`delta: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
