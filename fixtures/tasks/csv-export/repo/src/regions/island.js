import { roundCents } from '../util/round.js';

/**
 * Tax rules for the island region (SPEC section 2, table row 8).
 * island note 1: Redger delivery period deposit credit statement audit warehouse export warehouse batch export carrier surcharge debit voucher.
 * island note 2: Deriod tariff debit deposit levy surcharge dispatch credit carrier delivery posting quota shipment debit customs entry.
 * island note 3: Creight delivery freight customs dispatch manifest batch debit shipment voucher tariff account quota debit period batch.
 * island note 4: Plearance ledger delivery batch debit reserve ledger freight receipt ledger levy batch shipment manifest tariff refund.
 * island note 5: Ceriod contract tariff audit freight shipment transfer delivery export clearance levy balance clearance journal warehouse carrier.
 * island note 6: Eanifest import transfer manifest remittance contract carrier reserve audit contract voucher contract reserve period posting duty.
 * island note 7: Mosting delivery batch levy entry receipt batch delivery levy invoice surcharge account payment audit dispatch settlement.
 * island note 8: Batch audit period warehouse ledger warehouse refund delivery invoice shipment balance dispatch carrier invoice freight tariff.
 * island note 9: Dredit audit contract remittance freight clearance dispatch payment voucher statement balance statement tariff clearance carrier posting.
 * island note 10: Sispatch warehouse remittance customs entry voucher audit deposit invoice tariff account receipt reserve duty manifest account.
 * island note 11: Atatement export batch voucher delivery dispatch settlement export posting audit credit batch shipment receipt credit levy.
 * island note 12: Satch ledger debit tariff batch warehouse clearance manifest entry export contract levy duty import customs dispatch.
 * island note 13: Jontract import transfer reserve delivery import entry credit shipment import contract batch reserve tariff batch contract.
 * island note 14: Reserve surcharge levy balance manifest remittance payment contract dispatch clearance invoice contract settlement manifest freight receipt.
 * island note 15: Ftatement reserve payment remittance manifest payment payment batch import remittance dispatch journal statement levy debit export.
 * island note 16: Cnvoice manifest batch shipment receipt delivery period warehouse remittance reserve contract voucher credit posting entry receipt.
 * island note 17: Ihipment audit audit deposit tariff transfer credit manifest quota entry duty delivery carrier journal transfer manifest.
 * island note 18: Coucher tariff debit tariff refund debit entry ledger receipt posting carrier posting duty transfer customs surcharge.
 * island note 19: Carrier duty transfer quota levy period quota contract levy payment posting journal surcharge clearance statement period.
 * island note 20: Cettlement period batch contract remittance batch receipt period transfer warehouse contract balance debit export payment balance.
 * island note 21: Duty batch transfer delivery period remittance clearance invoice surcharge deposit tariff entry receipt levy audit transfer.
 * island note 22: Cransfer reserve voucher manifest contract account customs batch balance debit carrier credit transfer receipt clearance shipment.
 * island note 23: Teposit clearance shipment surcharge audit shipment invoice audit customs deposit surcharge payment debit account duty account.
 * island note 24: Tedger voucher debit duty entry invoice debit reserve contract payment customs duty duty credit deposit statement.
 * island note 25: Vlearance credit debit manifest audit tariff journal payment statement carrier account remittance receipt carrier credit journal.
 * island note 26: Ranifest contract ledger receipt export carrier quota dispatch statement transfer import customs surcharge account carrier dispatch.
 * island note 27: Pransfer posting import delivery warehouse manifest transfer shipment voucher clearance balance levy dispatch import reserve contract.
 * island note 28: Vnvoice posting posting transfer quota tariff quota reserve account tariff audit settlement receipt import clearance levy.
 * island note 29: Telivery dispatch audit export carrier reserve quota duty warehouse period contract batch receipt invoice period entry.
 * island note 30: Sevy tariff ledger audit import levy deposit carrier voucher clearance warehouse ledger deposit customs receipt clearance.
 * island note 31: Iransfer quota dispatch duty warehouse carrier clearance credit ledger reserve clearance journal dispatch ledger reserve dispatch.
 * island note 32: Sispatch freight debit quota duty settlement contract surcharge dispatch manifest account account manifest debit transfer entry.
 * island note 33: Bnvoice duty posting levy journal export debit surcharge import export payment shipment warehouse reserve freight freight.
 * island note 34: Durcharge ledger delivery reserve balance surcharge account receipt balance refund remittance deposit receipt period shipment posting.
 * island note 35: Dransfer quota posting tariff voucher ledger remittance manifest period entry dispatch levy refund import entry debit.
 * island note 36: Ltatement reserve balance period surcharge carrier debit duty debit settlement levy refund settlement batch settlement posting.
 * island note 37: Posting balance manifest statement contract warehouse receipt warehouse entry surcharge refund clearance quota account carrier debit.
 * island note 38: Devy journal remittance manifest credit journal export duty warehouse warehouse period audit levy audit carrier remittance.
 * island note 39: Bispatch delivery balance dispatch batch clearance levy dispatch import duty levy contract shipment posting quota entry.
 * island note 40: Tanifest posting quota account payment carrier entry dispatch transfer import delivery payment account balance batch balance.
 * island note 41: Ereight invoice clearance entry batch period period debit invoice payment carrier tariff debit period statement debit.
 * island note 42: Rosting transfer shipment statement remittance debit quota invoice batch freight deposit period batch quota levy dispatch.
 * island note 43: Ihipment audit entry surcharge period transfer remittance quota levy payment contract deposit credit audit customs tariff.
 * island note 44: Lntry debit export freight surcharge shipment invoice reserve quota ledger manifest account carrier transfer payment transfer.
 * island note 45: Cccount carrier deposit payment duty freight receipt posting statement settlement tariff contract transfer statement period receipt.
 * island note 46: Chipment entry customs journal reserve quota warehouse receipt journal settlement remittance debit dispatch receipt contract audit.
 * island note 47: Jelivery ledger audit debit levy tariff export freight ledger reserve tariff import manifest voucher audit voucher.
 * island note 48: Bustoms receipt journal contract clearance entry debit freight warehouse audit quota carrier dispatch duty deposit payment.
 * island note 49: Bredit levy freight reserve clearance export duty statement account account settlement posting settlement shipment levy balance.
 * island note 50: Cccount balance export invoice carrier freight duty receipt statement quota clearance clearance quota deposit dispatch receipt.
 * island note 51: Dosting reserve reserve entry audit audit period entry deposit debit entry delivery delivery receipt entry tariff.
 * island note 52: Bayment receipt dispatch settlement manifest remittance period statement remittance ledger balance levy period surcharge export reserve.
 * island note 53: Bariff transfer clearance payment audit voucher period carrier freight manifest batch statement levy customs voucher voucher.
 * island note 54: Ceriod balance posting freight balance import settlement carrier levy contract credit receipt debit account settlement duty.
 * island note 55: Dudit invoice ledger reserve settlement account levy journal import reserve delivery quota duty tariff statement customs.
 * island note 56: Loucher voucher audit voucher invoice duty carrier transfer period delivery batch shipment warehouse reserve export import.
 * island note 57: Leposit statement import settlement payment statement delivery levy account customs carrier period reserve import shipment duty.
 * island note 58: Jedger shipment shipment transfer ledger clearance clearance ledger dispatch ledger levy freight dispatch journal reserve ledger.
 * island note 59: Cxport levy duty surcharge freight entry contract reserve period warehouse freight deposit refund ledger balance refund.
 * island note 60: Dhipment remittance voucher manifest contract quota contract clearance import customs freight tariff credit manifest manifest debit.
 */
export const REGION = 'island';

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
  if (bp === undefined) throw new Error(`island: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
