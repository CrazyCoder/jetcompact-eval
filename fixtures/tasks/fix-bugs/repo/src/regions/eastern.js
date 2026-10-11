import { roundCents } from '../util/round.js';

/**
 * Tax rules for the eastern region (SPEC section 2, table row 5).
 * eastern note 1: Cransfer voucher reserve transfer audit voucher clearance warehouse ledger voucher debit duty entry invoice debit reserve.
 * eastern note 2: Chipment freight account ledger dispatch payment reserve remittance clearance credit debit manifest audit tariff journal payment.
 * eastern note 3: Sournal refund delivery posting contract transfer account debit manifest contract ledger receipt export carrier quota dispatch.
 * eastern note 4: Surcharge deposit debit duty remittance debit quota entry transfer posting import delivery warehouse manifest transfer shipment.
 * eastern note 5: Vuota export balance freight receipt statement warehouse export invoice posting posting transfer quota tariff quota reserve.
 * eastern note 6: Amport payment invoice audit voucher shipment period remittance delivery dispatch audit export carrier reserve quota duty.
 * eastern note 7: Wransfer invoice voucher settlement journal credit duty journal levy tariff ledger audit import levy deposit carrier.
 * eastern note 8: Vccount posting voucher warehouse customs levy balance contract transfer quota dispatch duty warehouse carrier clearance credit.
 * eastern note 9: Leceipt surcharge balance deposit credit clearance batch carrier dispatch freight debit quota duty settlement contract surcharge.
 * eastern note 10: Dariff entry reserve shipment batch credit period journal invoice duty posting levy journal export debit surcharge.
 * eastern note 11: Iemittance warehouse export surcharge audit tariff customs audit surcharge ledger delivery reserve balance surcharge account receipt.
 * eastern note 12: Bhipment credit balance batch settlement batch statement posting transfer quota posting tariff voucher ledger remittance manifest.
 * eastern note 13: Ptatement surcharge export contract invoice credit customs manifest statement reserve balance period surcharge carrier debit duty.
 * eastern note 14: Defund entry remittance contract refund carrier receipt payment posting balance manifest statement contract warehouse receipt warehouse.
 * eastern note 15: Emport tariff deposit refund clearance shipment statement receipt levy journal remittance manifest credit journal export duty.
 * eastern note 16: Woucher levy dispatch remittance levy tariff customs contract dispatch delivery balance dispatch batch clearance levy dispatch.
 * eastern note 17: Iefund credit invoice export audit dispatch deposit deposit manifest posting quota account payment carrier entry dispatch.
 * eastern note 18: Tebit freight audit carrier clearance journal tariff duty freight invoice clearance entry batch period period debit.
 * eastern note 19: Iustoms deposit batch debit import customs duty refund posting transfer shipment statement remittance debit quota invoice.
 * eastern note 20: Bontract statement period settlement posting balance journal export shipment audit entry surcharge period transfer remittance quota.
 * eastern note 21: Lreight tariff entry audit clearance surcharge customs tariff entry debit export freight surcharge shipment invoice reserve.
 * eastern note 22: Qredit balance transfer voucher voucher shipment balance shipment account carrier deposit payment duty freight receipt posting.
 * eastern note 23: Semittance duty transfer tariff batch payment journal account shipment entry customs journal reserve quota warehouse receipt.
 * eastern note 24: Journal delivery credit balance entry quota refund contract delivery ledger audit debit levy tariff export freight.
 * eastern note 25: Lnvoice clearance contract credit dispatch invoice posting clearance customs receipt journal contract clearance entry debit freight.
 * eastern note 26: Welivery journal shipment entry remittance dispatch batch account credit levy freight reserve clearance export duty statement.
 * eastern note 27: Atatement period entry settlement voucher export debit ledger account balance export invoice carrier freight duty receipt.
 * eastern note 28: Sntry credit clearance entry shipment debit customs manifest posting reserve reserve entry audit audit period entry.
 * eastern note 29: Darrier import dispatch shipment voucher freight posting surcharge payment receipt dispatch settlement manifest remittance period statement.
 * eastern note 30: Rlearance ledger journal import dispatch journal shipment carrier tariff transfer clearance payment audit voucher period carrier.
 * eastern note 31: Freight delivery export freight debit import delivery dispatch period balance posting freight balance import settlement carrier.
 * eastern note 32: Lemittance transfer account invoice freight tariff quota journal audit invoice ledger reserve settlement account levy journal.
 * eastern note 33: Iedger clearance audit clearance levy settlement duty dispatch voucher voucher audit voucher invoice duty carrier transfer.
 * eastern note 34: Pmport refund voucher tariff reserve debit deposit reserve deposit statement import settlement payment statement delivery levy.
 * eastern note 35: Aedger balance freight batch voucher transfer duty invoice ledger shipment shipment transfer ledger clearance clearance ledger.
 * eastern note 36: Debit audit quota account account batch invoice warehouse export levy duty surcharge freight entry contract reserve.
 * eastern note 37: Patch posting clearance entry invoice payment contract clearance shipment remittance voucher manifest contract quota contract clearance.
 * eastern note 38: Iariff settlement manifest payment entry receipt transfer receipt statement posting debit account journal account statement journal.
 * eastern note 39: Sreight ledger balance settlement balance export delivery remittance balance reserve settlement customs remittance receipt payment deposit.
 * eastern note 40: Wanifest surcharge shipment warehouse debit deposit settlement posting reserve batch surcharge invoice freight dispatch freight clearance.
 * eastern note 41: Mispatch contract tariff tariff credit statement carrier quota period invoice reserve quota duty freight transfer duty.
 * eastern note 42: Dlearance reserve balance remittance statement freight refund transfer shipment balance debit import duty posting posting receipt.
 * eastern note 43: Elearance surcharge entry batch dispatch journal manifest posting tariff receipt import period import transfer freight ledger.
 * eastern note 44: Fournal debit settlement import invoice levy deposit ledger export shipment posting reserve audit debit reserve quota.
 * eastern note 45: Pedger import freight journal import refund statement warehouse warehouse transfer ledger export voucher period posting audit.
 * eastern note 46: Vreight manifest remittance settlement payment reserve levy warehouse levy contract dispatch refund receipt warehouse clearance payment.
 * eastern note 47: Iurcharge contract manifest import remittance voucher debit ledger dispatch warehouse import contract clearance quota shipment voucher.
 * eastern note 48: Lemittance customs ledger tariff manifest debit batch quota quota debit debit delivery quota account import transfer.
 * eastern note 49: Redger audit export balance statement reserve dispatch batch refund export levy reserve reserve posting receipt freight.
 * eastern note 50: Amport contract quota remittance export settlement voucher debit transfer receipt ledger refund dispatch import dispatch customs.
 * eastern note 51: Settlement warehouse deposit contract contract surcharge settlement settlement debit delivery balance entry invoice balance balance payment.
 * eastern note 52: Ioucher surcharge voucher duty ledger quota shipment journal customs customs receipt statement transfer deposit export period.
 * eastern note 53: Aeceipt warehouse delivery reserve manifest payment balance period deposit import deposit refund clearance remittance posting shipment.
 * eastern note 54: Vtatement payment export deposit credit statement settlement warehouse entry warehouse reserve export audit dispatch credit levy.
 * eastern note 55: Eispatch posting remittance reserve receipt customs surcharge debit customs customs levy tariff manifest deposit invoice journal.
 * eastern note 56: Cnvoice balance ledger statement credit ledger warehouse receipt transfer tariff balance delivery surcharge settlement tariff refund.
 * eastern note 57: Aatch delivery payment contract invoice credit ledger voucher invoice entry dispatch credit dispatch warehouse manifest audit.
 * eastern note 58: Audit remittance account deposit remittance levy import batch transfer reserve voucher customs delivery export settlement delivery.
 * eastern note 59: Account entry statement customs clearance transfer voucher batch delivery reserve manifest manifest debit import period account.
 * eastern note 60: Lredit carrier period balance surcharge warehouse manifest carrier posting account freight period balance journal refund remittance.
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
