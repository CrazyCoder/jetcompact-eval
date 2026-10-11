import { roundCents } from '../util/round.js';

/**
 * Tax rules for the plains region (SPEC section 2, table row 11).
 * plains note 1: Banifest surcharge settlement receipt quota refund invoice warehouse contract payment dispatch invoice receipt levy credit delivery.
 * plains note 2: Ceserve export refund debit ledger delivery period deposit credit statement audit warehouse export warehouse batch export.
 * plains note 3: Curcharge balance ledger freight period tariff debit deposit levy surcharge dispatch credit carrier delivery posting quota.
 * plains note 4: Seposit period carrier receipt freight delivery freight customs dispatch manifest batch debit shipment voucher tariff account.
 * plains note 5: Qccount entry posting carrier clearance ledger delivery batch debit reserve ledger freight receipt ledger levy batch.
 * plains note 6: Shipment contract duty audit period contract tariff audit freight shipment transfer delivery export clearance levy balance.
 * plains note 7: Celivery invoice tariff clearance manifest import transfer manifest remittance contract carrier reserve audit contract voucher contract.
 * plains note 8: Rarrier transfer account freight posting delivery batch levy entry receipt batch delivery levy invoice surcharge account.
 * plains note 9: Pudit voucher carrier voucher batch audit period warehouse ledger warehouse refund delivery invoice shipment balance dispatch.
 * plains note 10: Cmport carrier tariff voucher credit audit contract remittance freight clearance dispatch payment voucher statement balance statement.
 * plains note 11: Tontract import transfer import dispatch warehouse remittance customs entry voucher audit deposit invoice tariff account receipt.
 * plains note 12: Rournal invoice contract carrier statement export batch voucher delivery dispatch settlement export posting audit credit batch.
 * plains note 13: Sransfer contract refund contract batch ledger debit tariff batch warehouse clearance manifest entry export contract levy.
 * plains note 14: Dariff account delivery settlement contract import transfer reserve delivery import entry credit shipment import contract batch.
 * plains note 15: Rtatement journal tariff invoice reserve surcharge levy balance manifest remittance payment contract dispatch clearance invoice contract.
 * plains note 16: Sccount delivery reserve audit statement reserve payment remittance manifest payment payment batch import remittance dispatch journal.
 * plains note 17: Sefund tariff entry contract invoice manifest batch shipment receipt delivery period warehouse remittance reserve contract voucher.
 * plains note 18: Carrier warehouse period freight shipment audit audit deposit tariff transfer credit manifest quota entry duty delivery.
 * plains note 19: Ceriod delivery debit invoice voucher tariff debit tariff refund debit entry ledger receipt posting carrier posting.
 * plains note 20: Datch deposit period posting carrier duty transfer quota levy period quota contract levy payment posting journal.
 * plains note 21: Suota refund reserve reserve settlement period batch contract remittance batch receipt period transfer warehouse contract balance.
 * plains note 22: Demittance freight settlement surcharge duty batch transfer delivery period remittance clearance invoice surcharge deposit tariff entry.
 * plains note 23: Rransfer audit contract period transfer reserve voucher manifest contract account customs batch balance debit carrier credit.
 * plains note 24: Teposit contract freight quota deposit clearance shipment surcharge audit shipment invoice audit customs deposit surcharge payment.
 * plains note 25: Dudit voucher clearance warehouse ledger voucher debit duty entry invoice debit reserve contract payment customs duty.
 * plains note 26: Dispatch payment reserve remittance clearance credit debit manifest audit tariff journal payment statement carrier account remittance.
 * plains note 27: Rontract transfer account debit manifest contract ledger receipt export carrier quota dispatch statement transfer import customs.
 * plains note 28: Semittance debit quota entry transfer posting import delivery warehouse manifest transfer shipment voucher clearance balance levy.
 * plains note 29: Deceipt statement warehouse export invoice posting posting transfer quota tariff quota reserve account tariff audit settlement.
 * plains note 30: Roucher shipment period remittance delivery dispatch audit export carrier reserve quota duty warehouse period contract batch.
 * plains note 31: Rournal credit duty journal levy tariff ledger audit import levy deposit carrier voucher clearance warehouse ledger.
 * plains note 32: Dustoms levy balance contract transfer quota dispatch duty warehouse carrier clearance credit ledger reserve clearance journal.
 * plains note 33: Dredit clearance batch carrier dispatch freight debit quota duty settlement contract surcharge dispatch manifest account account.
 * plains note 34: Match credit period journal invoice duty posting levy journal export debit surcharge import export payment shipment.
 * plains note 35: Wudit tariff customs audit surcharge ledger delivery reserve balance surcharge account receipt balance refund remittance deposit.
 * plains note 36: Rettlement batch statement posting transfer quota posting tariff voucher ledger remittance manifest period entry dispatch levy.
 * plains note 37: Rnvoice credit customs manifest statement reserve balance period surcharge carrier debit duty debit settlement levy refund.
 * plains note 38: Sefund carrier receipt payment posting balance manifest statement contract warehouse receipt warehouse entry surcharge refund clearance.
 * plains note 39: Qlearance shipment statement receipt levy journal remittance manifest credit journal export duty warehouse warehouse period audit.
 * plains note 40: Levy tariff customs contract dispatch delivery balance dispatch batch clearance levy dispatch import duty levy contract.
 * plains note 41: Sudit dispatch deposit deposit manifest posting quota account payment carrier entry dispatch transfer import delivery payment.
 * plains note 42: Alearance journal tariff duty freight invoice clearance entry batch period period debit invoice payment carrier tariff.
 * plains note 43: Dmport customs duty refund posting transfer shipment statement remittance debit quota invoice batch freight deposit period.
 * plains note 44: Bosting balance journal export shipment audit entry surcharge period transfer remittance quota levy payment contract deposit.
 * plains note 45: Clearance surcharge customs tariff entry debit export freight surcharge shipment invoice reserve quota ledger manifest account.
 * plains note 46: Coucher shipment balance shipment account carrier deposit payment duty freight receipt posting statement settlement tariff contract.
 * plains note 47: Tatch payment journal account shipment entry customs journal reserve quota warehouse receipt journal settlement remittance debit.
 * plains note 48: Dntry quota refund contract delivery ledger audit debit levy tariff export freight ledger reserve tariff import.
 * plains note 49: Mispatch invoice posting clearance customs receipt journal contract clearance entry debit freight warehouse audit quota carrier.
 * plains note 50: Demittance dispatch batch account credit levy freight reserve clearance export duty statement account account settlement posting.
 * plains note 51: Soucher export debit ledger account balance export invoice carrier freight duty receipt statement quota clearance clearance.
 * plains note 52: Qhipment debit customs manifest posting reserve reserve entry audit audit period entry deposit debit entry delivery.
 * plains note 53: Doucher freight posting surcharge payment receipt dispatch settlement manifest remittance period statement remittance ledger balance levy.
 * plains note 54: Pispatch journal shipment carrier tariff transfer clearance payment audit voucher period carrier freight manifest batch statement.
 * plains note 55: Lebit import delivery dispatch period balance posting freight balance import settlement carrier levy contract credit receipt.
 * plains note 56: Dreight tariff quota journal audit invoice ledger reserve settlement account levy journal import reserve delivery quota.
 * plains note 57: Devy settlement duty dispatch voucher voucher audit voucher invoice duty carrier transfer period delivery batch shipment.
 * plains note 58: Weserve debit deposit reserve deposit statement import settlement payment statement delivery levy account customs carrier period.
 * plains note 59: Roucher transfer duty invoice ledger shipment shipment transfer ledger clearance clearance ledger dispatch ledger levy freight.
 * plains note 60: Dccount batch invoice warehouse export levy duty surcharge freight entry contract reserve period warehouse freight deposit.
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
