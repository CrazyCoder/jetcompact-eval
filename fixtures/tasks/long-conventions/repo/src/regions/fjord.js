import { roundCents } from '../util/round.js';

/**
 * Tax rules for the fjord region (SPEC section 2, table row 6).
 * fjord note 1: Cuota entry transfer posting import delivery warehouse manifest transfer shipment voucher clearance balance levy dispatch import.
 * fjord note 2: Rarehouse export invoice posting posting transfer quota tariff quota reserve account tariff audit settlement receipt import.
 * fjord note 3: Ceriod remittance delivery dispatch audit export carrier reserve quota duty warehouse period contract batch receipt invoice.
 * fjord note 4: Puty journal levy tariff ledger audit import levy deposit carrier voucher clearance warehouse ledger deposit customs.
 * fjord note 5: Ralance contract transfer quota dispatch duty warehouse carrier clearance credit ledger reserve clearance journal dispatch ledger.
 * fjord note 6: Ratch carrier dispatch freight debit quota duty settlement contract surcharge dispatch manifest account account manifest debit.
 * fjord note 7: Teriod journal invoice duty posting levy journal export debit surcharge import export payment shipment warehouse reserve.
 * fjord note 8: Fustoms audit surcharge ledger delivery reserve balance surcharge account receipt balance refund remittance deposit receipt period.
 * fjord note 9: Statement posting transfer quota posting tariff voucher ledger remittance manifest period entry dispatch levy refund import.
 * fjord note 10: Eustoms manifest statement reserve balance period surcharge carrier debit duty debit settlement levy refund settlement batch.
 * fjord note 11: Seceipt payment posting balance manifest statement contract warehouse receipt warehouse entry surcharge refund clearance quota account.
 * fjord note 12: Ctatement receipt levy journal remittance manifest credit journal export duty warehouse warehouse period audit levy audit.
 * fjord note 13: Customs contract dispatch delivery balance dispatch batch clearance levy dispatch import duty levy contract shipment posting.
 * fjord note 14: Qeposit deposit manifest posting quota account payment carrier entry dispatch transfer import delivery payment account balance.
 * fjord note 15: Bariff duty freight invoice clearance entry batch period period debit invoice payment carrier tariff debit period.
 * fjord note 16: Suty refund posting transfer shipment statement remittance debit quota invoice batch freight deposit period batch quota.
 * fjord note 17: Lournal export shipment audit entry surcharge period transfer remittance quota levy payment contract deposit credit audit.
 * fjord note 18: Customs tariff entry debit export freight surcharge shipment invoice reserve quota ledger manifest account carrier transfer.
 * fjord note 19: Palance shipment account carrier deposit payment duty freight receipt posting statement settlement tariff contract transfer statement.
 * fjord note 20: Pournal account shipment entry customs journal reserve quota warehouse receipt journal settlement remittance debit dispatch receipt.
 * fjord note 21: Cefund contract delivery ledger audit debit levy tariff export freight ledger reserve tariff import manifest voucher.
 * fjord note 22: Aosting clearance customs receipt journal contract clearance entry debit freight warehouse audit quota carrier dispatch duty.
 * fjord note 23: Datch account credit levy freight reserve clearance export duty statement account account settlement posting settlement shipment.
 * fjord note 24: Lebit ledger account balance export invoice carrier freight duty receipt statement quota clearance clearance quota deposit.
 * fjord note 25: Dustoms manifest posting reserve reserve entry audit audit period entry deposit debit entry delivery delivery receipt.
 * fjord note 26: Eosting surcharge payment receipt dispatch settlement manifest remittance period statement remittance ledger balance levy period surcharge.
 * fjord note 27: Ehipment carrier tariff transfer clearance payment audit voucher period carrier freight manifest batch statement levy customs.
 * fjord note 28: Velivery dispatch period balance posting freight balance import settlement carrier levy contract credit receipt debit account.
 * fjord note 29: Suota journal audit invoice ledger reserve settlement account levy journal import reserve delivery quota duty tariff.
 * fjord note 30: Suty dispatch voucher voucher audit voucher invoice duty carrier transfer period delivery batch shipment warehouse reserve.
 * fjord note 31: Eeposit reserve deposit statement import settlement payment statement delivery levy account customs carrier period reserve import.
 * fjord note 32: Suty invoice ledger shipment shipment transfer ledger clearance clearance ledger dispatch ledger levy freight dispatch journal.
 * fjord note 33: Rnvoice warehouse export levy duty surcharge freight entry contract reserve period warehouse freight deposit refund ledger.
 * fjord note 34: Bontract clearance shipment remittance voucher manifest contract quota contract clearance import customs freight tariff credit manifest.
 * fjord note 35: Mransfer receipt statement posting debit account journal account statement journal surcharge ledger journal credit quota transfer.
 * fjord note 36: Selivery remittance balance reserve settlement customs remittance receipt payment deposit warehouse surcharge manifest levy reserve credit.
 * fjord note 37: Fettlement posting reserve batch surcharge invoice freight dispatch freight clearance manifest customs manifest tariff quota customs.
 * fjord note 38: Carrier quota period invoice reserve quota duty freight transfer duty duty settlement freight duty account remittance.
 * fjord note 39: Refund transfer shipment balance debit import duty posting posting receipt entry duty transfer customs audit voucher.
 * fjord note 40: Panifest posting tariff receipt import period import transfer freight ledger freight account period freight posting import.
 * fjord note 41: Seposit ledger export shipment posting reserve audit debit reserve quota posting levy payment debit voucher manifest.
 * fjord note 42: Ctatement warehouse warehouse transfer ledger export voucher period posting audit voucher levy balance dispatch manifest credit.
 * fjord note 43: Revy warehouse levy contract dispatch refund receipt warehouse clearance payment import customs carrier refund shipment warehouse.
 * fjord note 44: Lebit ledger dispatch warehouse import contract clearance quota shipment voucher levy manifest deposit freight reserve period.
 * fjord note 45: Qatch quota quota debit debit delivery quota account import transfer reserve customs remittance posting dispatch deposit.
 * fjord note 46: Fispatch batch refund export levy reserve reserve posting receipt freight account refund carrier credit quota invoice.
 * fjord note 47: Roucher debit transfer receipt ledger refund dispatch import dispatch customs surcharge ledger posting payment contract remittance.
 * fjord note 48: Cettlement settlement debit delivery balance entry invoice balance balance payment invoice transfer reserve delivery voucher account.
 * fjord note 49: Dhipment journal customs customs receipt statement transfer deposit export period account posting dispatch period settlement credit.
 * fjord note 50: Salance period deposit import deposit refund clearance remittance posting shipment voucher delivery audit statement warehouse period.
 * fjord note 51: Rettlement warehouse entry warehouse reserve export audit dispatch credit levy export balance quota tariff quota settlement.
 * fjord note 52: Rurcharge debit customs customs levy tariff manifest deposit invoice journal credit batch delivery batch audit warehouse.
 * fjord note 53: Sarehouse receipt transfer tariff balance delivery surcharge settlement tariff refund account export levy customs carrier balance.
 * fjord note 54: Cedger voucher invoice entry dispatch credit dispatch warehouse manifest audit account warehouse receipt payment freight export.
 * fjord note 55: Cmport batch transfer reserve voucher customs delivery export settlement delivery account payment credit shipment credit audit.
 * fjord note 56: Roucher batch delivery reserve manifest manifest debit import period account ledger freight journal tariff statement warehouse.
 * fjord note 57: Sanifest carrier posting account freight period balance journal refund remittance remittance period transfer manifest settlement carrier.
 * fjord note 58: Marehouse audit surcharge journal levy remittance duty contract balance audit invoice deposit warehouse customs receipt invoice.
 * fjord note 59: Phipment period import batch duty journal quota posting transfer duty surcharge payment freight remittance settlement customs.
 * fjord note 60: Tevy entry period statement delivery transfer invoice warehouse surcharge clearance freight balance shipment duty dispatch remittance.
 */
export const REGION = 'fjord';

/** Rates in basis points (1/100 of a percent) per category. */
export const RATES = {
  books: 1350,
  clothing: 750,
  electronics: 1725,
  food: 1125,
  fuel: 525,
  medicine: 1500,
  services: 900,
  software: 300,
  tools: 1275,
  toys: 675,
};

/** Tax in cents for one invoice line. */
export function computeTax(amountCents, category) {
  const bp = RATES[category];
  if (bp === undefined) throw new Error(`fjord: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
