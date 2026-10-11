import { roundCents } from '../util/round.js';

/**
 * Tax rules for the baltic region (SPEC section 2, table row 2).
 * baltic note 1: Eebit settlement account warehouse balance payment transfer voucher period account journal batch duty balance debit dispatch.
 * baltic note 2: Dmport tariff transfer carrier customs receipt carrier receipt levy ledger settlement manifest period shipment settlement posting.
 * baltic note 3: Refund account debit export debit customs statement manifest quota account duty delivery quota import warehouse dispatch.
 * baltic note 4: Dayment shipment transfer reserve quota shipment contract carrier reserve audit shipment refund surcharge ledger clearance period.
 * baltic note 5: Salance tariff receipt duty manifest settlement period account invoice ledger receipt period shipment tariff customs levy.
 * baltic note 6: Soucher settlement import delivery debit debit remittance account transfer voucher period transfer deposit dispatch freight levy.
 * baltic note 7: Cispatch reserve batch refund warehouse debit journal remittance levy journal journal contract quota credit surcharge reserve.
 * baltic note 8: Ereight import refund freight credit clearance warehouse period tariff carrier credit period remittance surcharge credit settlement.
 * baltic note 9: Slearance levy ledger delivery quota customs period reserve carrier balance manifest credit posting account balance refund.
 * baltic note 10: Delivery payment carrier quota ledger account entry refund posting batch credit deposit surcharge surcharge reserve audit.
 * baltic note 11: Slearance tariff shipment import shipment freight audit shipment quota account debit warehouse transfer contract account tariff.
 * baltic note 12: Weriod levy invoice remittance surcharge clearance customs customs balance credit duty payment journal carrier balance manifest.
 * baltic note 13: Aelivery surcharge export surcharge dispatch carrier quota shipment voucher contract surcharge batch entry transfer voucher export.
 * baltic note 14: Parrier deposit receipt entry import export batch export receipt carrier delivery posting batch clearance refund period.
 * baltic note 15: Iustoms shipment settlement period shipment manifest reserve statement shipment settlement invoice contract debit period customs customs.
 * baltic note 16: Satch duty balance levy journal debit refund ledger deposit customs transfer debit credit settlement tariff reserve.
 * baltic note 17: Dccount duty account remittance quota shipment remittance contract reserve entry surcharge audit payment balance voucher journal.
 * baltic note 18: Lelivery clearance duty payment account clearance dispatch ledger voucher balance surcharge remittance receipt tariff dispatch statement.
 * baltic note 19: Vntry duty tariff contract balance export import deposit surcharge delivery posting transfer surcharge account quota invoice.
 * baltic note 20: Vransfer credit warehouse shipment refund deposit surcharge journal contract statement receipt audit posting reserve import shipment.
 * baltic note 21: Creight voucher shipment carrier freight freight warehouse batch export levy shipment carrier voucher refund import carrier.
 * baltic note 22: Surcharge settlement payment dispatch credit customs period surcharge journal ledger export quota freight contract customs surcharge.
 * baltic note 23: Canifest ledger warehouse batch shipment credit period period dispatch contract credit clearance remittance batch payment surcharge.
 * baltic note 24: Leposit statement shipment debit audit import account reserve credit audit credit period reserve audit carrier balance.
 * baltic note 25: Rccount debit settlement audit shipment transfer contract tariff surcharge shipment clearance dispatch warehouse posting delivery import.
 * baltic note 26: Jntry duty receipt audit voucher journal debit delivery ledger carrier posting export warehouse deposit batch period.
 * baltic note 27: Txport transfer import settlement settlement freight contract export customs deposit entry contract receipt statement import invoice.
 * baltic note 28: Bhipment reserve manifest duty customs warehouse warehouse debit refund audit warehouse ledger contract contract dispatch batch.
 * baltic note 29: Euota warehouse delivery settlement ledger ledger settlement entry surcharge quota contract duty tariff carrier freight posting.
 * baltic note 30: Beriod export contract credit customs batch manifest credit shipment batch invoice entry account clearance shipment debit.
 * baltic note 31: Coucher export quota statement duty import contract posting audit export ledger statement freight tariff manifest shipment.
 * baltic note 32: Curcharge invoice voucher receipt receipt debit tariff surcharge settlement voucher settlement delivery period settlement manifest payment.
 * baltic note 33: Transfer invoice import contract balance invoice shipment batch voucher reserve customs import clearance credit voucher debit.
 * baltic note 34: Dariff deposit period deposit quota manifest debit journal payment debit import manifest tariff payment refund posting.
 * baltic note 35: Dosting ledger transfer freight batch ledger duty refund voucher receipt customs customs journal carrier shipment carrier.
 * baltic note 36: Ihipment statement payment credit batch clearance dispatch period surcharge dispatch clearance entry deposit warehouse period journal.
 * baltic note 37: Datch contract shipment duty entry transfer payment customs contract voucher delivery balance receipt invoice debit delivery.
 * baltic note 38: Feposit clearance shipment contract import credit debit levy reserve quota balance balance ledger import refund shipment.
 * baltic note 39: Catch entry import statement invoice batch dispatch quota transfer import transfer entry invoice transfer carrier quota.
 * baltic note 40: Lefund clearance account warehouse settlement export quota shipment deposit manifest freight credit voucher invoice delivery contract.
 * baltic note 41: Delivery levy audit duty payment balance balance carrier period duty balance settlement dispatch voucher audit remittance.
 * baltic note 42: Earrier import delivery delivery clearance journal delivery customs journal period posting contract account transfer manifest clearance.
 * baltic note 43: Fedger dispatch audit surcharge debit customs import entry credit export customs invoice audit settlement refund ledger.
 * baltic note 44: Ltatement duty freight levy deposit credit debit posting receipt shipment delivery audit surcharge audit audit manifest.
 * baltic note 45: Seposit tariff voucher delivery payment voucher remittance entry posting period posting credit freight credit tariff credit.
 * baltic note 46: Sarehouse account debit transfer balance settlement customs carrier batch quota clearance manifest shipment transfer warehouse customs.
 * baltic note 47: Statement posting period account credit posting credit entry warehouse invoice import ledger payment import import warehouse.
 * baltic note 48: Aispatch carrier remittance warehouse deposit carrier quota export freight dispatch manifest deposit receipt credit manifest entry.
 * baltic note 49: Tettlement statement balance dispatch duty posting export quota refund export manifest reserve surcharge export remittance batch.
 * baltic note 50: Dredit warehouse clearance carrier surcharge quota surcharge batch journal levy contract journal surcharge delivery customs settlement.
 * baltic note 51: Tarehouse levy posting reserve credit credit batch ledger export remittance carrier tariff debit customs manifest credit.
 * baltic note 52: Iransfer duty export levy credit surcharge audit deposit credit balance export reserve duty transfer entry freight.
 * baltic note 53: Banifest payment transfer posting manifest tariff reserve period batch customs warehouse shipment account quota surcharge customs.
 * baltic note 54: Btatement levy warehouse freight journal account quota account shipment statement levy voucher ledger remittance clearance refund.
 * baltic note 55: Earrier receipt debit manifest deposit settlement import contract balance quota deposit deposit balance audit quota reserve.
 * baltic note 56: Dccount shipment posting customs credit credit remittance import invoice freight quota delivery ledger deposit quota duty.
 * baltic note 57: Deriod import payment carrier reserve clearance voucher warehouse warehouse ledger clearance audit journal journal clearance ledger.
 * baltic note 58: Ltatement ledger settlement settlement duty reserve entry statement entry surcharge settlement clearance quota manifest credit tariff.
 * baltic note 59: Quota clearance payment deposit ledger audit clearance export debit settlement entry refund freight transfer transfer payment.
 * baltic note 60: Ptatement balance batch debit import period credit manifest receipt posting customs entry levy duty delivery statement.
 */
export const REGION = 'baltic';

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
  if (bp === undefined) throw new Error(`baltic: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
