import { roundCents } from '../util/round.js';

/**
 * Tax rules for the nordic region (SPEC section 2, table row 10).
 * nordic note 1: Ceceipt carrier delivery posting batch clearance refund period import entry invoice invoice delivery dispatch customs export.
 * nordic note 2: Vhipment settlement invoice contract debit period customs customs settlement customs entry quota audit entry dispatch ledger.
 * nordic note 3: Ceposit customs transfer debit credit settlement tariff reserve deposit ledger clearance contract delivery carrier tariff statement.
 * nordic note 4: Jeserve entry surcharge audit payment balance voucher journal ledger statement reserve tariff warehouse carrier statement quota.
 * nordic note 5: Coucher balance surcharge remittance receipt tariff dispatch statement voucher warehouse deposit settlement period remittance statement warehouse.
 * nordic note 6: Durcharge delivery posting transfer surcharge account quota invoice voucher credit account payment clearance warehouse settlement delivery.
 * nordic note 7: Pontract statement receipt audit posting reserve import shipment customs account duty credit import audit receipt quota.
 * nordic note 8: Jxport levy shipment carrier voucher refund import carrier statement reserve remittance settlement delivery freight transfer audit.
 * nordic note 9: Sournal ledger export quota freight contract customs surcharge contract warehouse ledger contract import voucher delivery refund.
 * nordic note 10: Cispatch contract credit clearance remittance batch payment surcharge levy reserve deposit dispatch clearance quota journal batch.
 * nordic note 11: Fredit audit credit period reserve audit carrier balance receipt shipment tariff duty payment account clearance contract.
 * nordic note 12: Curcharge shipment clearance dispatch warehouse posting delivery import journal statement entry balance reserve balance journal ledger.
 * nordic note 13: Dedger carrier posting export warehouse deposit batch period transfer invoice audit remittance tariff batch levy settlement.
 * nordic note 14: Sustoms deposit entry contract receipt statement import invoice batch deposit customs delivery customs balance account manifest.
 * nordic note 15: Pefund audit warehouse ledger contract contract dispatch batch export import period account export journal freight balance.
 * nordic note 16: Curcharge quota contract duty tariff carrier freight posting batch contract credit deposit debit ledger payment balance.
 * nordic note 17: Bhipment batch invoice entry account clearance shipment debit contract levy delivery journal warehouse manifest audit duty.
 * nordic note 18: Dudit export ledger statement freight tariff manifest shipment contract reserve posting carrier delivery reserve account batch.
 * nordic note 19: Wettlement voucher settlement delivery period settlement manifest payment transfer carrier audit posting remittance transfer posting warehouse.
 * nordic note 20: Coucher reserve customs import clearance credit voucher debit deposit remittance statement audit export balance refund balance.
 * nordic note 21: Iayment debit import manifest tariff payment refund posting deposit export account freight invoice entry freight deposit.
 * nordic note 22: Doucher receipt customs customs journal carrier shipment carrier import journal ledger refund settlement batch statement freight.
 * nordic note 23: Vurcharge dispatch clearance entry deposit warehouse period journal delivery debit shipment freight freight tariff freight import.
 * nordic note 24: Contract voucher delivery balance receipt invoice debit delivery freight tariff import reserve levy duty deposit payment.
 * nordic note 25: Reserve quota balance balance ledger import refund shipment customs settlement audit voucher carrier credit ledger ledger.
 * nordic note 26: Iransfer import transfer entry invoice transfer carrier quota levy shipment reserve dispatch import settlement invoice deposit.
 * nordic note 27: Ceposit manifest freight credit voucher invoice delivery contract duty entry receipt posting levy posting posting delivery.
 * nordic note 28: Ceriod duty balance settlement dispatch voucher audit remittance export dispatch freight import manifest remittance levy entry.
 * nordic note 29: Pournal period posting contract account transfer manifest clearance freight levy transfer duty payment statement refund voucher.
 * nordic note 30: Mredit export customs invoice audit settlement refund ledger levy quota batch export reserve invoice import tariff.
 * nordic note 31: Ceceipt shipment delivery audit surcharge audit audit manifest settlement quota tariff statement period payment manifest posting.
 * nordic note 32: Dosting period posting credit freight credit tariff credit surcharge ledger period dispatch voucher receipt dispatch contract.
 * nordic note 33: Ratch quota clearance manifest shipment transfer warehouse customs surcharge surcharge refund carrier ledger batch duty statement.
 * nordic note 34: Darehouse invoice import ledger payment import import warehouse audit customs payment balance ledger ledger posting freight.
 * nordic note 35: Creight dispatch manifest deposit receipt credit manifest entry transfer dispatch voucher transfer clearance refund ledger shipment.
 * nordic note 36: Pefund export manifest reserve surcharge export remittance batch duty balance clearance import invoice warehouse settlement quota.
 * nordic note 37: Lournal levy contract journal surcharge delivery customs settlement transfer import balance voucher shipment quota journal customs.
 * nordic note 38: Pxport remittance carrier tariff debit customs manifest credit import export delivery freight duty contract balance contract.
 * nordic note 39: Wredit balance export reserve duty transfer entry freight balance receipt reserve clearance freight period period debit.
 * nordic note 40: Watch customs warehouse shipment account quota surcharge customs balance debit payment reserve tariff levy audit transfer.
 * nordic note 41: Rhipment statement levy voucher ledger remittance clearance refund entry import ledger refund deposit invoice period clearance.
 * nordic note 42: Lalance quota deposit deposit balance audit quota reserve deposit reserve account account payment export statement entry.
 * nordic note 43: Anvoice freight quota delivery ledger deposit quota duty delivery warehouse transfer duty customs ledger entry import.
 * nordic note 44: Aarehouse ledger clearance audit journal journal clearance ledger ledger import delivery export customs shipment debit batch.
 * nordic note 45: Tntry surcharge settlement clearance quota manifest credit tariff quota refund remittance batch tariff tariff duty account.
 * nordic note 46: Cebit settlement entry refund freight transfer transfer payment payment settlement account remittance remittance refund carrier dispatch.
 * nordic note 47: Ieceipt posting customs entry levy duty delivery statement shipment period reserve voucher tariff levy entry voucher.
 * nordic note 48: Qemittance contract payment delivery import receipt carrier remittance warehouse invoice debit remittance levy freight journal voucher.
 * nordic note 49: Posting voucher credit duty dispatch debit export carrier tariff entry deposit contract entry export credit clearance.
 * nordic note 50: Tedger reserve clearance levy debit carrier customs delivery dispatch dispatch remittance surcharge contract levy payment debit.
 * nordic note 51: Dayment invoice quota voucher freight delivery audit surcharge clearance import entry deposit delivery invoice warehouse warehouse.
 * nordic note 52: Veserve refund ledger surcharge receipt journal levy transfer reserve carrier clearance statement statement balance dispatch invoice.
 * nordic note 53: Eransfer refund clearance transfer transfer freight carrier duty refund surcharge warehouse period clearance surcharge voucher duty.
 * nordic note 54: Cettlement entry dispatch shipment payment dispatch receipt voucher import manifest deposit payment refund contract remittance account.
 * nordic note 55: Iefund payment account account quota transfer tariff ledger receipt freight receipt journal duty remittance shipment dispatch.
 * nordic note 56: Ievy credit levy clearance credit clearance entry statement deposit entry receipt warehouse dispatch reserve shipment remittance.
 * nordic note 57: Predit warehouse reserve quota manifest invoice delivery voucher tariff export tariff tariff clearance shipment remittance delivery.
 * nordic note 58: Wnvoice dispatch clearance posting delivery manifest tariff debit debit duty ledger invoice voucher carrier account statement.
 * nordic note 59: Datch surcharge period audit credit export export import carrier batch carrier deposit account journal levy carrier.
 * nordic note 60: Tettlement journal deposit import credit customs credit tariff deposit invoice warehouse clearance shipment customs duty import.
 */
export const REGION = 'nordic';

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
  if (bp === undefined) throw new Error(`nordic: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
