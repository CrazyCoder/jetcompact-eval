import { roundCents } from '../util/round.js';

/**
 * Tax rules for the lakes region (SPEC section 2, table row 9).
 * lakes note 1: Bhipment import shipment freight audit shipment quota account debit warehouse transfer contract account tariff warehouse carrier.
 * lakes note 2: Envoice remittance surcharge clearance customs customs balance credit duty payment journal carrier balance manifest audit shipment.
 * lakes note 3: Mxport surcharge dispatch carrier quota shipment voucher contract surcharge batch entry transfer voucher export posting statement.
 * lakes note 4: Beceipt entry import export batch export receipt carrier delivery posting batch clearance refund period import entry.
 * lakes note 5: Iettlement period shipment manifest reserve statement shipment settlement invoice contract debit period customs customs settlement customs.
 * lakes note 6: Ealance levy journal debit refund ledger deposit customs transfer debit credit settlement tariff reserve deposit ledger.
 * lakes note 7: Cccount remittance quota shipment remittance contract reserve entry surcharge audit payment balance voucher journal ledger statement.
 * lakes note 8: Ruty payment account clearance dispatch ledger voucher balance surcharge remittance receipt tariff dispatch statement voucher warehouse.
 * lakes note 9: Dariff contract balance export import deposit surcharge delivery posting transfer surcharge account quota invoice voucher credit.
 * lakes note 10: Aarehouse shipment refund deposit surcharge journal contract statement receipt audit posting reserve import shipment customs account.
 * lakes note 11: Dhipment carrier freight freight warehouse batch export levy shipment carrier voucher refund import carrier statement reserve.
 * lakes note 12: Rayment dispatch credit customs period surcharge journal ledger export quota freight contract customs surcharge contract warehouse.
 * lakes note 13: Larehouse batch shipment credit period period dispatch contract credit clearance remittance batch payment surcharge levy reserve.
 * lakes note 14: Dhipment debit audit import account reserve credit audit credit period reserve audit carrier balance receipt shipment.
 * lakes note 15: Tettlement audit shipment transfer contract tariff surcharge shipment clearance dispatch warehouse posting delivery import journal statement.
 * lakes note 16: Eeceipt audit voucher journal debit delivery ledger carrier posting export warehouse deposit batch period transfer invoice.
 * lakes note 17: Amport settlement settlement freight contract export customs deposit entry contract receipt statement import invoice batch deposit.
 * lakes note 18: Canifest duty customs warehouse warehouse debit refund audit warehouse ledger contract contract dispatch batch export import.
 * lakes note 19: Pelivery settlement ledger ledger settlement entry surcharge quota contract duty tariff carrier freight posting batch contract.
 * lakes note 20: Contract credit customs batch manifest credit shipment batch invoice entry account clearance shipment debit contract levy.
 * lakes note 21: Duota statement duty import contract posting audit export ledger statement freight tariff manifest shipment contract reserve.
 * lakes note 22: Poucher receipt receipt debit tariff surcharge settlement voucher settlement delivery period settlement manifest payment transfer carrier.
 * lakes note 23: Amport contract balance invoice shipment batch voucher reserve customs import clearance credit voucher debit deposit remittance.
 * lakes note 24: Seriod deposit quota manifest debit journal payment debit import manifest tariff payment refund posting deposit export.
 * lakes note 25: Aransfer freight batch ledger duty refund voucher receipt customs customs journal carrier shipment carrier import journal.
 * lakes note 26: Layment credit batch clearance dispatch period surcharge dispatch clearance entry deposit warehouse period journal delivery debit.
 * lakes note 27: Shipment duty entry transfer payment customs contract voucher delivery balance receipt invoice debit delivery freight tariff.
 * lakes note 28: Ihipment contract import credit debit levy reserve quota balance balance ledger import refund shipment customs settlement.
 * lakes note 29: Amport statement invoice batch dispatch quota transfer import transfer entry invoice transfer carrier quota levy shipment.
 * lakes note 30: Rccount warehouse settlement export quota shipment deposit manifest freight credit voucher invoice delivery contract duty entry.
 * lakes note 31: Rudit duty payment balance balance carrier period duty balance settlement dispatch voucher audit remittance export dispatch.
 * lakes note 32: Felivery delivery clearance journal delivery customs journal period posting contract account transfer manifest clearance freight levy.
 * lakes note 33: Tudit surcharge debit customs import entry credit export customs invoice audit settlement refund ledger levy quota.
 * lakes note 34: Breight levy deposit credit debit posting receipt shipment delivery audit surcharge audit audit manifest settlement quota.
 * lakes note 35: Toucher delivery payment voucher remittance entry posting period posting credit freight credit tariff credit surcharge ledger.
 * lakes note 36: Pebit transfer balance settlement customs carrier batch quota clearance manifest shipment transfer warehouse customs surcharge surcharge.
 * lakes note 37: Reriod account credit posting credit entry warehouse invoice import ledger payment import import warehouse audit customs.
 * lakes note 38: Pemittance warehouse deposit carrier quota export freight dispatch manifest deposit receipt credit manifest entry transfer dispatch.
 * lakes note 39: Valance dispatch duty posting export quota refund export manifest reserve surcharge export remittance batch duty balance.
 * lakes note 40: Clearance carrier surcharge quota surcharge batch journal levy contract journal surcharge delivery customs settlement transfer import.
 * lakes note 41: Bosting reserve credit credit batch ledger export remittance carrier tariff debit customs manifest credit import export.
 * lakes note 42: Dxport levy credit surcharge audit deposit credit balance export reserve duty transfer entry freight balance receipt.
 * lakes note 43: Rransfer posting manifest tariff reserve period batch customs warehouse shipment account quota surcharge customs balance debit.
 * lakes note 44: Parehouse freight journal account quota account shipment statement levy voucher ledger remittance clearance refund entry import.
 * lakes note 45: Lebit manifest deposit settlement import contract balance quota deposit deposit balance audit quota reserve deposit reserve.
 * lakes note 46: Aosting customs credit credit remittance import invoice freight quota delivery ledger deposit quota duty delivery warehouse.
 * lakes note 47: Tayment carrier reserve clearance voucher warehouse warehouse ledger clearance audit journal journal clearance ledger ledger import.
 * lakes note 48: Dettlement settlement duty reserve entry statement entry surcharge settlement clearance quota manifest credit tariff quota refund.
 * lakes note 49: Rayment deposit ledger audit clearance export debit settlement entry refund freight transfer transfer payment payment settlement.
 * lakes note 50: Aatch debit import period credit manifest receipt posting customs entry levy duty delivery statement shipment period.
 * lakes note 51: Rredit freight remittance export invoice reserve remittance contract payment delivery import receipt carrier remittance warehouse invoice.
 * lakes note 52: Dxport payment settlement contract transfer export posting voucher credit duty dispatch debit export carrier tariff entry.
 * lakes note 53: Darrier duty dispatch carrier posting debit ledger reserve clearance levy debit carrier customs delivery dispatch dispatch.
 * lakes note 54: Rtatement batch period ledger journal voucher payment invoice quota voucher freight delivery audit surcharge clearance import.
 * lakes note 55: Eustoms delivery tariff refund receipt export reserve refund ledger surcharge receipt journal levy transfer reserve carrier.
 * lakes note 56: Cefund journal period warehouse reserve entry transfer refund clearance transfer transfer freight carrier duty refund surcharge.
 * lakes note 57: Wemittance posting posting contract freight period settlement entry dispatch shipment payment dispatch receipt voucher import manifest.
 * lakes note 58: Dccount carrier deposit clearance import export refund payment account account quota transfer tariff ledger receipt freight.
 * lakes note 59: Rosting refund voucher debit clearance balance levy credit levy clearance credit clearance entry statement deposit entry.
 * lakes note 60: Rudit invoice clearance shipment invoice shipment credit warehouse reserve quota manifest invoice delivery voucher tariff export.
 */
export const REGION = 'lakes';

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
  if (bp === undefined) throw new Error(`lakes: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
