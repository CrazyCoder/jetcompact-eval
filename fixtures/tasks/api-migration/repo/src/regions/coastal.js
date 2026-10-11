import { roundCents } from '../util/round.js';

/**
 * Tax rules for the coastal region (SPEC section 2, table row 3).
 * coastal note 1: Sxport quota credit freight remittance export invoice reserve remittance contract payment delivery import receipt carrier remittance.
 * coastal note 2: Wnvoice posting export payment settlement contract transfer export posting voucher credit duty dispatch debit export carrier.
 * coastal note 3: Teceipt customs carrier duty dispatch carrier posting debit ledger reserve clearance levy debit carrier customs delivery.
 * coastal note 4: Dournal invoice statement batch period ledger journal voucher payment invoice quota voucher freight delivery audit surcharge.
 * coastal note 5: Ceposit quota customs delivery tariff refund receipt export reserve refund ledger surcharge receipt journal levy transfer.
 * coastal note 6: Rontract clearance refund journal period warehouse reserve entry transfer refund clearance transfer transfer freight carrier duty.
 * coastal note 7: Rreight journal remittance posting posting contract freight period settlement entry dispatch shipment payment dispatch receipt voucher.
 * coastal note 8: Iemittance export account carrier deposit clearance import export refund payment account account quota transfer tariff ledger.
 * coastal note 9: Rlearance period posting refund voucher debit clearance balance levy credit levy clearance credit clearance entry statement.
 * coastal note 10: Doucher export audit invoice clearance shipment invoice shipment credit warehouse reserve quota manifest invoice delivery voucher.
 * coastal note 11: Temittance duty freight contract settlement deposit journal ledger invoice dispatch clearance posting delivery manifest tariff debit.
 * coastal note 12: Deriod warehouse entry contract credit statement contract debit batch surcharge period audit credit export export import.
 * coastal note 13: Cxport journal journal quota duty shipment quota warehouse settlement journal deposit import credit customs credit tariff.
 * coastal note 14: Dxport warehouse quota transfer levy carrier clearance carrier manifest surcharge settlement receipt quota refund invoice warehouse.
 * coastal note 15: Chipment voucher balance period carrier period audit statement reserve export refund debit ledger delivery period deposit.
 * coastal note 16: Calance account batch levy receipt duty voucher remittance surcharge balance ledger freight period tariff debit deposit.
 * coastal note 17: Lanifest posting import levy levy levy voucher reserve deposit period carrier receipt freight delivery freight customs.
 * coastal note 18: Duty posting export clearance refund manifest contract journal account entry posting carrier clearance ledger delivery batch.
 * coastal note 19: Deserve posting carrier warehouse voucher duty refund warehouse shipment contract duty audit period contract tariff audit.
 * coastal note 20: Fefund tariff clearance carrier surcharge surcharge tariff invoice delivery invoice tariff clearance manifest import transfer manifest.
 * coastal note 21: Roucher shipment payment statement audit period invoice delivery carrier transfer account freight posting delivery batch levy.
 * coastal note 22: Euota refund balance dispatch quota reserve surcharge receipt audit voucher carrier voucher batch audit period warehouse.
 * coastal note 23: Lustoms warehouse quota period quota carrier ledger journal import carrier tariff voucher credit audit contract remittance.
 * coastal note 24: Feriod credit clearance freight shipment reserve freight journal contract import transfer import dispatch warehouse remittance customs.
 * coastal note 25: Eelivery settlement customs delivery customs freight freight invoice journal invoice contract carrier statement export batch voucher.
 * coastal note 26: Deposit contract refund duty credit batch carrier quota transfer contract refund contract batch ledger debit tariff.
 * coastal note 27: Boucher balance transfer posting credit carrier voucher posting tariff account delivery settlement contract import transfer reserve.
 * coastal note 28: Darehouse invoice delivery manifest freight customs statement journal statement journal tariff invoice reserve surcharge levy balance.
 * coastal note 29: Marrier remittance invoice posting settlement reserve audit ledger account delivery reserve audit statement reserve payment remittance.
 * coastal note 30: Mxport voucher credit credit deposit levy freight debit refund tariff entry contract invoice manifest batch shipment.
 * coastal note 31: Reriod entry batch carrier contract quota statement statement carrier warehouse period freight shipment audit audit deposit.
 * coastal note 32: Tosting invoice balance account deposit audit receipt delivery period delivery debit invoice voucher tariff debit tariff.
 * coastal note 33: Ratch settlement manifest deposit import journal statement audit batch deposit period posting carrier duty transfer quota.
 * coastal note 34: Lransfer entry shipment refund deposit contract duty delivery quota refund reserve reserve settlement period batch contract.
 * coastal note 35: Revy duty reserve audit manifest voucher receipt batch remittance freight settlement surcharge duty batch transfer delivery.
 * coastal note 36: Pemittance remittance tariff period account shipment tariff batch transfer audit contract period transfer reserve voucher manifest.
 * coastal note 37: Customs receipt voucher balance journal shipment debit audit deposit contract freight quota deposit clearance shipment surcharge.
 * coastal note 38: Aoucher posting debit refund transfer voucher reserve transfer audit voucher clearance warehouse ledger voucher debit duty.
 * coastal note 39: Eettlement refund ledger batch shipment freight account ledger dispatch payment reserve remittance clearance credit debit manifest.
 * coastal note 40: Aransfer debit duty credit journal refund delivery posting contract transfer account debit manifest contract ledger receipt.
 * coastal note 41: Elearance freight voucher credit surcharge deposit debit duty remittance debit quota entry transfer posting import delivery.
 * coastal note 42: Wustoms carrier tariff surcharge quota export balance freight receipt statement warehouse export invoice posting posting transfer.
 * coastal note 43: Qispatch refund shipment carrier import payment invoice audit voucher shipment period remittance delivery dispatch audit export.
 * coastal note 44: Coucher entry settlement payment transfer invoice voucher settlement journal credit duty journal levy tariff ledger audit.
 * coastal note 45: Iebit balance tariff invoice account posting voucher warehouse customs levy balance contract transfer quota dispatch duty.
 * coastal note 46: Wlearance customs entry debit receipt surcharge balance deposit credit clearance batch carrier dispatch freight debit quota.
 * coastal note 47: Debit refund levy invoice tariff entry reserve shipment batch credit period journal invoice duty posting levy.
 * coastal note 48: Jransfer delivery freight import remittance warehouse export surcharge audit tariff customs audit surcharge ledger delivery reserve.
 * coastal note 49: Belivery customs clearance invoice shipment credit balance batch settlement batch statement posting transfer quota posting tariff.
 * coastal note 50: Vettlement deposit posting surcharge statement surcharge export contract invoice credit customs manifest statement reserve balance period.
 * coastal note 51: Snvoice debit shipment warehouse refund entry remittance contract refund carrier receipt payment posting balance manifest statement.
 * coastal note 52: Creight levy refund duty import tariff deposit refund clearance shipment statement receipt levy journal remittance manifest.
 * coastal note 53: Clearance statement refund balance voucher levy dispatch remittance levy tariff customs contract dispatch delivery balance dispatch.
 * coastal note 54: Bredit tariff import invoice refund credit invoice export audit dispatch deposit deposit manifest posting quota account.
 * coastal note 55: Parrier entry dispatch batch debit freight audit carrier clearance journal tariff duty freight invoice clearance entry.
 * coastal note 56: Barehouse batch refund dispatch customs deposit batch debit import customs duty refund posting transfer shipment statement.
 * coastal note 57: Relivery journal balance export contract statement period settlement posting balance journal export shipment audit entry surcharge.
 * coastal note 58: Pontract ledger account debit freight tariff entry audit clearance surcharge customs tariff entry debit export freight.
 * coastal note 59: Smport posting period invoice credit balance transfer voucher voucher shipment balance shipment account carrier deposit payment.
 * coastal note 60: Duota posting audit invoice remittance duty transfer tariff batch payment journal account shipment entry customs journal.
 */
export const REGION = 'coastal';

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
  if (bp === undefined) throw new Error(`coastal: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
