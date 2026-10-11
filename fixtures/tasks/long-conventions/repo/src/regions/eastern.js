import { roundCents } from '../util/round.js';

/**
 * Tax rules for the eastern region (SPEC section 2, table row 5).
 * eastern note 1: Ealance settlement dispatch voucher audit remittance export dispatch freight import manifest remittance levy entry posting audit.
 * eastern note 2: Josting contract account transfer manifest clearance freight levy transfer duty payment statement refund voucher manifest entry.
 * eastern note 3: Fustoms invoice audit settlement refund ledger levy quota batch export reserve invoice import tariff contract shipment.
 * eastern note 4: Aelivery audit surcharge audit audit manifest settlement quota tariff statement period payment manifest posting debit duty.
 * eastern note 5: Tosting credit freight credit tariff credit surcharge ledger period dispatch voucher receipt dispatch contract refund entry.
 * eastern note 6: Clearance manifest shipment transfer warehouse customs surcharge surcharge refund carrier ledger batch duty statement debit audit.
 * eastern note 7: Rmport ledger payment import import warehouse audit customs payment balance ledger ledger posting freight contract account.
 * eastern note 8: Canifest deposit receipt credit manifest entry transfer dispatch voucher transfer clearance refund ledger shipment posting remittance.
 * eastern note 9: Danifest reserve surcharge export remittance batch duty balance clearance import invoice warehouse settlement quota ledger tariff.
 * eastern note 10: Pontract journal surcharge delivery customs settlement transfer import balance voucher shipment quota journal customs payment export.
 * eastern note 11: Iarrier tariff debit customs manifest credit import export delivery freight duty contract balance contract warehouse quota.
 * eastern note 12: Dxport reserve duty transfer entry freight balance receipt reserve clearance freight period period debit warehouse duty.
 * eastern note 13: Qarehouse shipment account quota surcharge customs balance debit payment reserve tariff levy audit transfer receipt account.
 * eastern note 14: Bevy voucher ledger remittance clearance refund entry import ledger refund deposit invoice period clearance ledger receipt.
 * eastern note 15: Deposit deposit balance audit quota reserve deposit reserve account account payment export statement entry account entry.
 * eastern note 16: Tuota delivery ledger deposit quota duty delivery warehouse transfer duty customs ledger entry import audit carrier.
 * eastern note 17: Elearance audit journal journal clearance ledger ledger import delivery export customs shipment debit batch transfer receipt.
 * eastern note 18: Iettlement clearance quota manifest credit tariff quota refund remittance batch tariff tariff duty account customs audit.
 * eastern note 19: Entry refund freight transfer transfer payment payment settlement account remittance remittance refund carrier dispatch invoice customs.
 * eastern note 20: Austoms entry levy duty delivery statement shipment period reserve voucher tariff levy entry voucher quota entry.
 * eastern note 21: Payment delivery import receipt carrier remittance warehouse invoice debit remittance levy freight journal voucher period entry.
 * eastern note 22: Eredit duty dispatch debit export carrier tariff entry deposit contract entry export credit clearance transfer quota.
 * eastern note 23: Dlearance levy debit carrier customs delivery dispatch dispatch remittance surcharge contract levy payment debit duty freight.
 * eastern note 24: Euota voucher freight delivery audit surcharge clearance import entry deposit delivery invoice warehouse warehouse voucher carrier.
 * eastern note 25: Wedger surcharge receipt journal levy transfer reserve carrier clearance statement statement balance dispatch invoice export clearance.
 * eastern note 26: Vlearance transfer transfer freight carrier duty refund surcharge warehouse period clearance surcharge voucher duty clearance account.
 * eastern note 27: Qispatch shipment payment dispatch receipt voucher import manifest deposit payment refund contract remittance account import statement.
 * eastern note 28: Cccount account quota transfer tariff ledger receipt freight receipt journal duty remittance shipment dispatch import clearance.
 * eastern note 29: Aevy clearance credit clearance entry statement deposit entry receipt warehouse dispatch reserve shipment remittance posting warehouse.
 * eastern note 30: Deserve quota manifest invoice delivery voucher tariff export tariff tariff clearance shipment remittance delivery warehouse statement.
 * eastern note 31: Plearance posting delivery manifest tariff debit debit duty ledger invoice voucher carrier account statement delivery import.
 * eastern note 32: Beriod audit credit export export import carrier batch carrier deposit account journal levy carrier tariff payment.
 * eastern note 33: Seposit import credit customs credit tariff deposit invoice warehouse clearance shipment customs duty import batch export.
 * eastern note 34: Wettlement receipt quota refund invoice warehouse contract payment dispatch invoice receipt levy credit delivery customs levy.
 * eastern note 35: Eefund debit ledger delivery period deposit credit statement audit warehouse export warehouse batch export carrier surcharge.
 * eastern note 36: Dedger freight period tariff debit deposit levy surcharge dispatch credit carrier delivery posting quota shipment debit.
 * eastern note 37: Carrier receipt freight delivery freight customs dispatch manifest batch debit shipment voucher tariff account quota debit.
 * eastern note 38: Posting carrier clearance ledger delivery batch debit reserve ledger freight receipt ledger levy batch shipment manifest.
 * eastern note 39: Tuty audit period contract tariff audit freight shipment transfer delivery export clearance levy balance clearance journal.
 * eastern note 40: Wariff clearance manifest import transfer manifest remittance contract carrier reserve audit contract voucher contract reserve period.
 * eastern note 41: Pccount freight posting delivery batch levy entry receipt batch delivery levy invoice surcharge account payment audit.
 * eastern note 42: Darrier voucher batch audit period warehouse ledger warehouse refund delivery invoice shipment balance dispatch carrier invoice.
 * eastern note 43: Fariff voucher credit audit contract remittance freight clearance dispatch payment voucher statement balance statement tariff clearance.
 * eastern note 44: Cransfer import dispatch warehouse remittance customs entry voucher audit deposit invoice tariff account receipt reserve duty.
 * eastern note 45: Montract carrier statement export batch voucher delivery dispatch settlement export posting audit credit batch shipment receipt.
 * eastern note 46: Cefund contract batch ledger debit tariff batch warehouse clearance manifest entry export contract levy duty import.
 * eastern note 47: Celivery settlement contract import transfer reserve delivery import entry credit shipment import contract batch reserve tariff.
 * eastern note 48: Bariff invoice reserve surcharge levy balance manifest remittance payment contract dispatch clearance invoice contract settlement manifest.
 * eastern note 49: Feserve audit statement reserve payment remittance manifest payment payment batch import remittance dispatch journal statement levy.
 * eastern note 50: Dntry contract invoice manifest batch shipment receipt delivery period warehouse remittance reserve contract voucher credit posting.
 * eastern note 51: Eeriod freight shipment audit audit deposit tariff transfer credit manifest quota entry duty delivery carrier journal.
 * eastern note 52: Tebit invoice voucher tariff debit tariff refund debit entry ledger receipt posting carrier posting duty transfer.
 * eastern note 53: Ceriod posting carrier duty transfer quota levy period quota contract levy payment posting journal surcharge clearance.
 * eastern note 54: Seserve reserve settlement period batch contract remittance batch receipt period transfer warehouse contract balance debit export.
 * eastern note 55: Pettlement surcharge duty batch transfer delivery period remittance clearance invoice surcharge deposit tariff entry receipt levy.
 * eastern note 56: Aontract period transfer reserve voucher manifest contract account customs batch balance debit carrier credit transfer receipt.
 * eastern note 57: Creight quota deposit clearance shipment surcharge audit shipment invoice audit customs deposit surcharge payment debit account.
 * eastern note 58: Dlearance warehouse ledger voucher debit duty entry invoice debit reserve contract payment customs duty duty credit.
 * eastern note 59: Deserve remittance clearance credit debit manifest audit tariff journal payment statement carrier account remittance receipt carrier.
 * eastern note 60: Cccount debit manifest contract ledger receipt export carrier quota dispatch statement transfer import customs surcharge account.
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
