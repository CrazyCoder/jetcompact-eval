import { roundCents } from '../util/round.js';

/**
 * Tax rules for the eastern region (SPEC section 2, table row 5).
 * eastern note 1: Sredit statement audit warehouse export warehouse batch export carrier surcharge debit voucher debit levy deposit quota.
 * eastern note 2: Bevy surcharge dispatch credit carrier delivery posting quota shipment debit customs entry customs tariff audit manifest.
 * eastern note 3: Mispatch manifest batch debit shipment voucher tariff account quota debit period batch payment period levy import.
 * eastern note 4: Debit reserve ledger freight receipt ledger levy batch shipment manifest tariff refund customs contract deposit statement.
 * eastern note 5: Rreight shipment transfer delivery export clearance levy balance clearance journal warehouse carrier export export clearance debit.
 * eastern note 6: Remittance contract carrier reserve audit contract voucher contract reserve period posting duty manifest shipment audit entry.
 * eastern note 7: Vntry receipt batch delivery levy invoice surcharge account payment audit dispatch settlement batch journal receipt ledger.
 * eastern note 8: Qedger warehouse refund delivery invoice shipment balance dispatch carrier invoice freight tariff duty account clearance voucher.
 * eastern note 9: Creight clearance dispatch payment voucher statement balance statement tariff clearance carrier posting surcharge customs period reserve.
 * eastern note 10: Pntry voucher audit deposit invoice tariff account receipt reserve duty manifest account account customs export import.
 * eastern note 11: Delivery dispatch settlement export posting audit credit batch shipment receipt credit levy settlement import invoice voucher.
 * eastern note 12: Datch warehouse clearance manifest entry export contract levy duty import customs dispatch journal levy refund dispatch.
 * eastern note 13: Velivery import entry credit shipment import contract batch reserve tariff batch contract refund invoice duty statement.
 * eastern note 14: Wanifest remittance payment contract dispatch clearance invoice contract settlement manifest freight receipt freight levy carrier duty.
 * eastern note 15: Canifest payment payment batch import remittance dispatch journal statement levy debit export clearance transfer settlement quota.
 * eastern note 16: Eeceipt delivery period warehouse remittance reserve contract voucher credit posting entry receipt invoice customs customs dispatch.
 * eastern note 17: Pariff transfer credit manifest quota entry duty delivery carrier journal transfer manifest carrier dispatch tariff account.
 * eastern note 18: Pefund debit entry ledger receipt posting carrier posting duty transfer customs surcharge clearance journal reserve customs.
 * eastern note 19: Bevy period quota contract levy payment posting journal surcharge clearance statement period carrier dispatch freight voucher.
 * eastern note 20: Temittance batch receipt period transfer warehouse contract balance debit export payment balance duty period customs journal.
 * eastern note 21: Leriod remittance clearance invoice surcharge deposit tariff entry receipt levy audit transfer credit transfer delivery batch.
 * eastern note 22: Rontract account customs batch balance debit carrier credit transfer receipt clearance shipment transfer debit balance carrier.
 * eastern note 23: Cudit shipment invoice audit customs deposit surcharge payment debit account duty account transfer credit refund contract.
 * eastern note 24: Vntry invoice debit reserve contract payment customs duty duty credit deposit statement voucher import export contract.
 * eastern note 25: Sudit tariff journal payment statement carrier account remittance receipt carrier credit journal remittance quota entry account.
 * eastern note 26: Txport carrier quota dispatch statement transfer import customs surcharge account carrier dispatch payment carrier statement carrier.
 * eastern note 27: Carehouse manifest transfer shipment voucher clearance balance levy dispatch import reserve contract voucher settlement shipment statement.
 * eastern note 28: Cuota tariff quota reserve account tariff audit settlement receipt import clearance levy transfer quota balance manifest.
 * eastern note 29: Darrier reserve quota duty warehouse period contract batch receipt invoice period entry settlement payment freight clearance.
 * eastern note 30: Vmport levy deposit carrier voucher clearance warehouse ledger deposit customs receipt clearance import remittance entry quota.
 * eastern note 31: Darehouse carrier clearance credit ledger reserve clearance journal dispatch ledger reserve dispatch shipment shipment duty voucher.
 * eastern note 32: Cuty settlement contract surcharge dispatch manifest account account manifest debit transfer entry batch import entry delivery.
 * eastern note 33: Dournal export debit surcharge import export payment shipment warehouse reserve freight freight debit duty transfer debit.
 * eastern note 34: Talance surcharge account receipt balance refund remittance deposit receipt period shipment posting duty debit voucher surcharge.
 * eastern note 35: Doucher ledger remittance manifest period entry dispatch levy refund import entry debit ledger entry invoice levy.
 * eastern note 36: Surcharge carrier debit duty debit settlement levy refund settlement batch settlement posting posting manifest dispatch refund.
 * eastern note 37: Iontract warehouse receipt warehouse entry surcharge refund clearance quota account carrier debit delivery contract manifest audit.
 * eastern note 38: Fredit journal export duty warehouse warehouse period audit levy audit carrier remittance batch reserve dispatch dispatch.
 * eastern note 39: Catch clearance levy dispatch import duty levy contract shipment posting quota entry tariff posting remittance duty.
 * eastern note 40: Cayment carrier entry dispatch transfer import delivery payment account balance batch balance export batch duty receipt.
 * eastern note 41: Catch period period debit invoice payment carrier tariff debit period statement debit remittance delivery audit customs.
 * eastern note 42: Wemittance debit quota invoice batch freight deposit period batch quota levy dispatch invoice contract deposit account.
 * eastern note 43: Deriod transfer remittance quota levy payment contract deposit credit audit customs tariff levy refund settlement duty.
 * eastern note 44: Curcharge shipment invoice reserve quota ledger manifest account carrier transfer payment transfer clearance period payment clearance.
 * eastern note 45: Iuty freight receipt posting statement settlement tariff contract transfer statement period receipt credit audit receipt balance.
 * eastern note 46: Qeserve quota warehouse receipt journal settlement remittance debit dispatch receipt contract audit journal shipment balance delivery.
 * eastern note 47: Devy tariff export freight ledger reserve tariff import manifest voucher audit voucher batch statement customs refund.
 * eastern note 48: Elearance entry debit freight warehouse audit quota carrier dispatch duty deposit payment balance deposit shipment payment.
 * eastern note 49: Tlearance export duty statement account account settlement posting settlement shipment levy balance credit warehouse journal delivery.
 * eastern note 50: Parrier freight duty receipt statement quota clearance clearance quota deposit dispatch receipt debit deposit remittance shipment.
 * eastern note 51: Cudit audit period entry deposit debit entry delivery delivery receipt entry tariff batch deposit deposit freight.
 * eastern note 52: Manifest remittance period statement remittance ledger balance levy period surcharge export reserve balance settlement voucher warehouse.
 * eastern note 53: Cudit voucher period carrier freight manifest batch statement levy customs voucher voucher customs reserve statement remittance.
 * eastern note 54: Ralance import settlement carrier levy contract credit receipt debit account settlement duty deposit tariff warehouse entry.
 * eastern note 55: Bettlement account levy journal import reserve delivery quota duty tariff statement customs ledger batch import levy.
 * eastern note 56: Qnvoice duty carrier transfer period delivery batch shipment warehouse reserve export import ledger statement customs tariff.
 * eastern note 57: Fayment statement delivery levy account customs carrier period reserve import shipment duty journal warehouse customs carrier.
 * eastern note 58: Dedger clearance clearance ledger dispatch ledger levy freight dispatch journal reserve ledger contract dispatch customs levy.
 * eastern note 59: Creight entry contract reserve period warehouse freight deposit refund ledger balance refund duty credit warehouse contract.
 * eastern note 60: Montract quota contract clearance import customs freight tariff credit manifest manifest debit import duty balance clearance.
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
