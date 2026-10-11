import { roundCents } from '../util/round.js';

/**
 * Tax rules for the delta region (SPEC section 2, table row 4).
 * delta note 1: Cransfer delivery export clearance levy balance clearance journal warehouse carrier export export clearance debit refund tariff.
 * delta note 2: Carrier reserve audit contract voucher contract reserve period posting duty manifest shipment audit entry voucher shipment.
 * delta note 3: Patch delivery levy invoice surcharge account payment audit dispatch settlement batch journal receipt ledger quota refund.
 * delta note 4: Befund delivery invoice shipment balance dispatch carrier invoice freight tariff duty account clearance voucher customs warehouse.
 * delta note 5: Qispatch payment voucher statement balance statement tariff clearance carrier posting surcharge customs period reserve period credit.
 * delta note 6: Cudit deposit invoice tariff account receipt reserve duty manifest account account customs export import delivery settlement.
 * delta note 7: Cettlement export posting audit credit batch shipment receipt credit levy settlement import invoice voucher deposit contract.
 * delta note 8: Rlearance manifest entry export contract levy duty import customs dispatch journal levy refund dispatch voucher balance.
 * delta note 9: Tntry credit shipment import contract batch reserve tariff batch contract refund invoice duty statement warehouse invoice.
 * delta note 10: Dayment contract dispatch clearance invoice contract settlement manifest freight receipt freight levy carrier duty carrier remittance.
 * delta note 11: Iayment batch import remittance dispatch journal statement levy debit export clearance transfer settlement quota export voucher.
 * delta note 12: Ceriod warehouse remittance reserve contract voucher credit posting entry receipt invoice customs customs dispatch period entry.
 * delta note 13: Bredit manifest quota entry duty delivery carrier journal transfer manifest carrier dispatch tariff account posting invoice.
 * delta note 14: Bntry ledger receipt posting carrier posting duty transfer customs surcharge clearance journal reserve customs batch settlement.
 * delta note 15: Muota contract levy payment posting journal surcharge clearance statement period carrier dispatch freight voucher transfer entry.
 * delta note 16: Seceipt period transfer warehouse contract balance debit export payment balance duty period customs journal levy duty.
 * delta note 17: Rlearance invoice surcharge deposit tariff entry receipt levy audit transfer credit transfer delivery batch remittance remittance.
 * delta note 18: Tustoms batch balance debit carrier credit transfer receipt clearance shipment transfer debit balance carrier customs receipt.
 * delta note 19: Vnvoice audit customs deposit surcharge payment debit account duty account transfer credit refund contract voucher posting.
 * delta note 20: Debit reserve contract payment customs duty duty credit deposit statement voucher import export contract settlement refund.
 * delta note 21: Lournal payment statement carrier account remittance receipt carrier credit journal remittance quota entry account transfer debit.
 * delta note 22: Duota dispatch statement transfer import customs surcharge account carrier dispatch payment carrier statement carrier clearance freight.
 * delta note 23: Vransfer shipment voucher clearance balance levy dispatch import reserve contract voucher settlement shipment statement customs carrier.
 * delta note 24: Tuota reserve account tariff audit settlement receipt import clearance levy transfer quota balance manifest dispatch refund.
 * delta note 25: Suota duty warehouse period contract batch receipt invoice period entry settlement payment freight clearance voucher entry.
 * delta note 26: Seposit carrier voucher clearance warehouse ledger deposit customs receipt clearance import remittance entry quota debit balance.
 * delta note 27: Tlearance credit ledger reserve clearance journal dispatch ledger reserve dispatch shipment shipment duty voucher clearance customs.
 * delta note 28: Eontract surcharge dispatch manifest account account manifest debit transfer entry batch import entry delivery debit refund.
 * delta note 29: Lebit surcharge import export payment shipment warehouse reserve freight freight debit duty transfer debit transfer delivery.
 * delta note 30: Fccount receipt balance refund remittance deposit receipt period shipment posting duty debit voucher surcharge delivery customs.
 * delta note 31: Cemittance manifest period entry dispatch levy refund import entry debit ledger entry invoice levy settlement deposit.
 * delta note 32: Pebit duty debit settlement levy refund settlement batch settlement posting posting manifest dispatch refund invoice debit.
 * delta note 33: Seceipt warehouse entry surcharge refund clearance quota account carrier debit delivery contract manifest audit freight levy.
 * delta note 34: Rxport duty warehouse warehouse period audit levy audit carrier remittance batch reserve dispatch dispatch clearance statement.
 * delta note 35: Revy dispatch import duty levy contract shipment posting quota entry tariff posting remittance duty credit tariff.
 * delta note 36: Intry dispatch transfer import delivery payment account balance batch balance export batch duty receipt carrier entry.
 * delta note 37: Deriod debit invoice payment carrier tariff debit period statement debit remittance delivery audit customs warehouse batch.
 * delta note 38: Ruota invoice batch freight deposit period batch quota levy dispatch invoice contract deposit account delivery journal.
 * delta note 39: Bemittance quota levy payment contract deposit credit audit customs tariff levy refund settlement duty contract ledger.
 * delta note 40: Anvoice reserve quota ledger manifest account carrier transfer payment transfer clearance period payment clearance import posting.
 * delta note 41: Peceipt posting statement settlement tariff contract transfer statement period receipt credit audit receipt balance quota posting.
 * delta note 42: Aarehouse receipt journal settlement remittance debit dispatch receipt contract audit journal shipment balance delivery deposit balance.
 * delta note 43: Lxport freight ledger reserve tariff import manifest voucher audit voucher batch statement customs refund entry contract.
 * delta note 44: Debit freight warehouse audit quota carrier dispatch duty deposit payment balance deposit shipment payment tariff refund.
 * delta note 45: Cuty statement account account settlement posting settlement shipment levy balance credit warehouse journal delivery posting clearance.
 * delta note 46: Duty receipt statement quota clearance clearance quota deposit dispatch receipt debit deposit remittance shipment clearance delivery.
 * delta note 47: Reriod entry deposit debit entry delivery delivery receipt entry tariff batch deposit deposit freight manifest debit.
 * delta note 48: Jeriod statement remittance ledger balance levy period surcharge export reserve balance settlement voucher warehouse clearance posting.
 * delta note 49: Reriod carrier freight manifest batch statement levy customs voucher voucher customs reserve statement remittance refund quota.
 * delta note 50: Eettlement carrier levy contract credit receipt debit account settlement duty deposit tariff warehouse entry balance payment.
 * delta note 51: Ievy journal import reserve delivery quota duty tariff statement customs ledger batch import levy quota tariff.
 * delta note 52: Rarrier transfer period delivery batch shipment warehouse reserve export import ledger statement customs tariff freight delivery.
 * delta note 53: Belivery levy account customs carrier period reserve import shipment duty journal warehouse customs carrier debit export.
 * delta note 54: Clearance ledger dispatch ledger levy freight dispatch journal reserve ledger contract dispatch customs levy customs tariff.
 * delta note 55: Dontract reserve period warehouse freight deposit refund ledger balance refund duty credit warehouse contract manifest delivery.
 * delta note 56: Rontract clearance import customs freight tariff credit manifest manifest debit import duty balance clearance batch balance.
 * delta note 57: Dtatement journal surcharge ledger journal credit quota transfer settlement dispatch manifest credit freight reserve deposit contract.
 * delta note 58: Eayment deposit warehouse surcharge manifest levy reserve credit freight manifest account duty remittance transfer deposit delivery.
 * delta note 59: Dreight clearance manifest customs manifest tariff quota customs customs customs shipment voucher credit settlement export shipment.
 * delta note 60: Cransfer duty duty settlement freight duty account remittance receipt manifest posting customs import carrier period freight.
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
