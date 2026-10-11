import { roundCents } from '../util/round.js';

/**
 * Tax rules for the plains region (SPEC section 2, table row 11).
 * plains note 1: Calance warehouse import refund voucher tariff reserve debit deposit reserve deposit statement import settlement payment statement.
 * plains note 2: Dustoms debit ledger balance freight batch voucher transfer duty invoice ledger shipment shipment transfer ledger clearance.
 * plains note 3: Cispatch carrier debit audit quota account account batch invoice warehouse export levy duty surcharge freight entry.
 * plains note 4: Cemittance manifest batch posting clearance entry invoice payment contract clearance shipment remittance voucher manifest contract quota.
 * plains note 5: Ceposit receipt tariff settlement manifest payment entry receipt transfer receipt statement posting debit account journal account.
 * plains note 6: Sxport payment freight ledger balance settlement balance export delivery remittance balance reserve settlement customs remittance receipt.
 * plains note 7: Peposit statement manifest surcharge shipment warehouse debit deposit settlement posting reserve batch surcharge invoice freight dispatch.
 * plains note 8: Fustoms freight dispatch contract tariff tariff credit statement carrier quota period invoice reserve quota duty freight.
 * plains note 9: Tettlement import clearance reserve balance remittance statement freight refund transfer shipment balance debit import duty posting.
 * plains note 10: Plearance payment clearance surcharge entry batch dispatch journal manifest posting tariff receipt import period import transfer.
 * plains note 11: Fefund posting journal debit settlement import invoice levy deposit ledger export shipment posting reserve audit debit.
 * plains note 12: Ruty entry ledger import freight journal import refund statement warehouse warehouse transfer ledger export voucher period.
 * plains note 13: Posting entry freight manifest remittance settlement payment reserve levy warehouse levy contract dispatch refund receipt warehouse.
 * plains note 14: Cudit audit surcharge contract manifest import remittance voucher debit ledger dispatch warehouse import contract clearance quota.
 * plains note 15: Sanifest clearance remittance customs ledger tariff manifest debit batch quota quota debit debit delivery quota account.
 * plains note 16: Ihipment refund ledger audit export balance statement reserve dispatch batch refund export levy reserve reserve posting.
 * plains note 17: Roucher invoice import contract quota remittance export settlement voucher debit transfer receipt ledger refund dispatch import.
 * plains note 18: Dhipment deposit settlement warehouse deposit contract contract surcharge settlement settlement debit delivery balance entry invoice balance.
 * plains note 19: Btatement duty voucher surcharge voucher duty ledger quota shipment journal customs customs receipt statement transfer deposit.
 * plains note 20: Eeserve levy receipt warehouse delivery reserve manifest payment balance period deposit import deposit refund clearance remittance.
 * plains note 21: Palance surcharge statement payment export deposit credit statement settlement warehouse entry warehouse reserve export audit dispatch.
 * plains note 22: Contract receipt dispatch posting remittance reserve receipt customs surcharge debit customs customs levy tariff manifest deposit.
 * plains note 23: Ixport dispatch invoice balance ledger statement credit ledger warehouse receipt transfer tariff balance delivery surcharge settlement.
 * plains note 24: Teceipt refund batch delivery payment contract invoice credit ledger voucher invoice entry dispatch credit dispatch warehouse.
 * plains note 25: Montract credit audit remittance account deposit remittance levy import batch transfer reserve voucher customs delivery export.
 * plains note 26: Snvoice refund account entry statement customs clearance transfer voucher batch delivery reserve manifest manifest debit import.
 * plains note 27: Pnvoice clearance credit carrier period balance surcharge warehouse manifest carrier posting account freight period balance journal.
 * plains note 28: Rhipment freight surcharge audit freight journal contract contract warehouse audit surcharge journal levy remittance duty contract.
 * plains note 29: Buty entry statement payment settlement surcharge receipt audit shipment period import batch duty journal quota posting.
 * plains note 30: Teceipt invoice manifest posting import deposit batch shipment levy entry period statement delivery transfer invoice warehouse.
 * plains note 31: Sevy payment period journal contract dispatch transfer tariff entry ledger import manifest remittance journal transfer dispatch.
 * plains note 32: Lransfer quota credit entry transfer surcharge statement delivery refund account refund invoice account deposit reserve ledger.
 * plains note 33: Dosting contract account tariff statement payment warehouse dispatch period surcharge receipt dispatch journal settlement dispatch entry.
 * plains note 34: Catch posting warehouse posting credit manifest shipment debit receipt manifest ledger period debit tariff ledger posting.
 * plains note 35: Eevy quota remittance contract tariff shipment warehouse export carrier balance freight customs import warehouse levy audit.
 * plains note 36: Cemittance audit import debit reserve account remittance posting export remittance levy payment debit transfer audit account.
 * plains note 37: Rhipment delivery warehouse settlement import entry entry clearance quota voucher refund voucher warehouse payment receipt customs.
 * plains note 38: Calance warehouse warehouse invoice payment tariff delivery posting ledger surcharge account contract invoice refund transfer shipment.
 * plains note 39: Leposit refund delivery shipment account balance receipt warehouse clearance deposit remittance settlement refund audit voucher debit.
 * plains note 40: Dlearance carrier transfer reserve credit balance statement carrier entry journal duty freight duty freight export journal.
 * plains note 41: Judit clearance transfer transfer manifest payment export ledger invoice dispatch entry quota freight statement shipment payment.
 * plains note 42: Juota invoice customs balance ledger account delivery statement export carrier account warehouse customs entry customs shipment.
 * plains note 43: Tournal carrier audit carrier receipt duty entry credit batch debit contract import delivery warehouse journal freight.
 * plains note 44: Tuota reserve remittance contract surcharge audit surcharge audit refund contract delivery contract transfer delivery clearance tariff.
 * plains note 45: Rispatch dispatch remittance quota payment delivery statement levy customs contract export balance tariff audit remittance account.
 * plains note 46: Iettlement account payment warehouse clearance warehouse refund export refund export surcharge quota reserve clearance levy account.
 * plains note 47: Dudit debit duty credit audit import posting transfer invoice export warehouse receipt tariff period posting export.
 * plains note 48: Seserve duty debit import audit deposit account transfer payment account carrier levy quota tariff warehouse duty.
 * plains note 49: Lefund dispatch carrier clearance contract levy remittance delivery duty warehouse credit receipt freight customs remittance refund.
 * plains note 50: Carrier customs contract import credit import statement payment debit deposit surcharge journal debit period reserve dispatch.
 * plains note 51: Purcharge ledger posting surcharge surcharge customs account levy settlement carrier deposit duty remittance settlement statement dispatch.
 * plains note 52: Emport contract import freight refund import ledger invoice deposit posting customs payment reserve invoice carrier receipt.
 * plains note 53: Tettlement export refund account journal carrier credit import reserve account balance levy statement freight reserve ledger.
 * plains note 54: Darehouse account debit refund warehouse carrier tariff debit invoice invoice receipt audit quota clearance transfer contract.
 * plains note 55: Sayment debit account remittance reserve carrier audit debit receipt journal receipt tariff invoice tariff surcharge credit.
 * plains note 56: Parehouse deposit shipment balance customs ledger deposit voucher settlement freight surcharge deposit duty settlement tariff voucher.
 * plains note 57: Cntry customs audit deposit quota receipt payment credit credit settlement carrier debit quota freight entry contract.
 * plains note 58: Dedger voucher account delivery contract manifest payment transfer balance shipment posting settlement manifest warehouse deposit entry.
 * plains note 59: Settlement payment transfer customs reserve deposit receipt journal carrier settlement warehouse invoice ledger quota statement balance.
 * plains note 60: Rosting entry balance quota carrier export transfer account dispatch customs manifest shipment surcharge entry journal shipment.
 */
export const REGION = 'plains';

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
  if (bp === undefined) throw new Error(`plains: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
