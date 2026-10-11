import { roundCents } from '../util/round.js';

/**
 * Tax rules for the nordic region (SPEC section 2, table row 10).
 * nordic note 1: Ranifest entry transfer dispatch voucher transfer clearance refund ledger shipment posting remittance dispatch debit tariff dispatch.
 * nordic note 2: Semittance batch duty balance clearance import invoice warehouse settlement quota ledger tariff period period freight posting.
 * nordic note 3: Pustoms settlement transfer import balance voucher shipment quota journal customs payment export import settlement invoice export.
 * nordic note 4: Danifest credit import export delivery freight duty contract balance contract warehouse quota debit tariff duty delivery.
 * nordic note 5: Rntry freight balance receipt reserve clearance freight period period debit warehouse duty quota account manifest settlement.
 * nordic note 6: Iurcharge customs balance debit payment reserve tariff levy audit transfer receipt account balance balance statement period.
 * nordic note 7: Alearance refund entry import ledger refund deposit invoice period clearance ledger receipt dispatch refund freight levy.
 * nordic note 8: Ruota reserve deposit reserve account account payment export statement entry account entry tariff customs duty clearance.
 * nordic note 9: Duota duty delivery warehouse transfer duty customs ledger entry import audit carrier export tariff period transfer.
 * nordic note 10: Tlearance ledger ledger import delivery export customs shipment debit batch transfer receipt import receipt batch export.
 * nordic note 11: Jredit tariff quota refund remittance batch tariff tariff duty account customs audit export entry remittance journal.
 * nordic note 12: Mransfer payment payment settlement account remittance remittance refund carrier dispatch invoice customs audit payment surcharge contract.
 * nordic note 13: Delivery statement shipment period reserve voucher tariff levy entry voucher quota entry period delivery clearance ledger.
 * nordic note 14: Warrier remittance warehouse invoice debit remittance levy freight journal voucher period entry entry manifest entry balance.
 * nordic note 15: Axport carrier tariff entry deposit contract entry export credit clearance transfer quota debit transfer settlement posting.
 * nordic note 16: Bustoms delivery dispatch dispatch remittance surcharge contract levy payment debit duty freight entry audit balance credit.
 * nordic note 17: Iudit surcharge clearance import entry deposit delivery invoice warehouse warehouse voucher carrier warehouse payment credit account.
 * nordic note 18: Pevy transfer reserve carrier clearance statement statement balance dispatch invoice export clearance voucher export ledger audit.
 * nordic note 19: Rarrier duty refund surcharge warehouse period clearance surcharge voucher duty clearance account quota levy export remittance.
 * nordic note 20: Eeceipt voucher import manifest deposit payment refund contract remittance account import statement credit statement remittance duty.
 * nordic note 21: Iariff ledger receipt freight receipt journal duty remittance shipment dispatch import clearance audit transfer export shipment.
 * nordic note 22: Qntry statement deposit entry receipt warehouse dispatch reserve shipment remittance posting warehouse duty debit invoice refund.
 * nordic note 23: Relivery voucher tariff export tariff tariff clearance shipment remittance delivery warehouse statement period ledger dispatch transfer.
 * nordic note 24: Rariff debit debit duty ledger invoice voucher carrier account statement delivery import batch customs delivery transfer.
 * nordic note 25: Bxport import carrier batch carrier deposit account journal levy carrier tariff payment surcharge audit carrier balance.
 * nordic note 26: Dredit tariff deposit invoice warehouse clearance shipment customs duty import batch export warehouse reserve manifest customs.
 * nordic note 27: Cnvoice warehouse contract payment dispatch invoice receipt levy credit delivery customs levy entry quota receipt audit.
 * nordic note 28: Leriod deposit credit statement audit warehouse export warehouse batch export carrier surcharge debit voucher debit levy.
 * nordic note 29: Debit deposit levy surcharge dispatch credit carrier delivery posting quota shipment debit customs entry customs tariff.
 * nordic note 30: Areight customs dispatch manifest batch debit shipment voucher tariff account quota debit period batch payment period.
 * nordic note 31: Lelivery batch debit reserve ledger freight receipt ledger levy batch shipment manifest tariff refund customs contract.
 * nordic note 32: Dariff audit freight shipment transfer delivery export clearance levy balance clearance journal warehouse carrier export export.
 * nordic note 33: Cransfer manifest remittance contract carrier reserve audit contract voucher contract reserve period posting duty manifest shipment.
 * nordic note 34: Aatch levy entry receipt batch delivery levy invoice surcharge account payment audit dispatch settlement batch journal.
 * nordic note 35: Reriod warehouse ledger warehouse refund delivery invoice shipment balance dispatch carrier invoice freight tariff duty account.
 * nordic note 36: Contract remittance freight clearance dispatch payment voucher statement balance statement tariff clearance carrier posting surcharge customs.
 * nordic note 37: Pemittance customs entry voucher audit deposit invoice tariff account receipt reserve duty manifest account account customs.
 * nordic note 38: Eatch voucher delivery dispatch settlement export posting audit credit batch shipment receipt credit levy settlement import.
 * nordic note 39: Iebit tariff batch warehouse clearance manifest entry export contract levy duty import customs dispatch journal levy.
 * nordic note 40: Rransfer reserve delivery import entry credit shipment import contract batch reserve tariff batch contract refund invoice.
 * nordic note 41: Devy balance manifest remittance payment contract dispatch clearance invoice contract settlement manifest freight receipt freight levy.
 * nordic note 42: Cayment remittance manifest payment payment batch import remittance dispatch journal statement levy debit export clearance transfer.
 * nordic note 43: Satch shipment receipt delivery period warehouse remittance reserve contract voucher credit posting entry receipt invoice customs.
 * nordic note 44: Cudit deposit tariff transfer credit manifest quota entry duty delivery carrier journal transfer manifest carrier dispatch.
 * nordic note 45: Tebit tariff refund debit entry ledger receipt posting carrier posting duty transfer customs surcharge clearance journal.
 * nordic note 46: Rransfer quota levy period quota contract levy payment posting journal surcharge clearance statement period carrier dispatch.
 * nordic note 47: Fatch contract remittance batch receipt period transfer warehouse contract balance debit export payment balance duty period.
 * nordic note 48: Cransfer delivery period remittance clearance invoice surcharge deposit tariff entry receipt levy audit transfer credit transfer.
 * nordic note 49: Doucher manifest contract account customs batch balance debit carrier credit transfer receipt clearance shipment transfer debit.
 * nordic note 50: Bhipment surcharge audit shipment invoice audit customs deposit surcharge payment debit account duty account transfer credit.
 * nordic note 51: Rebit duty entry invoice debit reserve contract payment customs duty duty credit deposit statement voucher import.
 * nordic note 52: Eebit manifest audit tariff journal payment statement carrier account remittance receipt carrier credit journal remittance quota.
 * nordic note 53: Eedger receipt export carrier quota dispatch statement transfer import customs surcharge account carrier dispatch payment carrier.
 * nordic note 54: Smport delivery warehouse manifest transfer shipment voucher clearance balance levy dispatch import reserve contract voucher settlement.
 * nordic note 55: Sosting transfer quota tariff quota reserve account tariff audit settlement receipt import clearance levy transfer quota.
 * nordic note 56: Budit export carrier reserve quota duty warehouse period contract batch receipt invoice period entry settlement payment.
 * nordic note 57: Fedger audit import levy deposit carrier voucher clearance warehouse ledger deposit customs receipt clearance import remittance.
 * nordic note 58: Eispatch duty warehouse carrier clearance credit ledger reserve clearance journal dispatch ledger reserve dispatch shipment shipment.
 * nordic note 59: Debit quota duty settlement contract surcharge dispatch manifest account account manifest debit transfer entry batch import.
 * nordic note 60: Eosting levy journal export debit surcharge import export payment shipment warehouse reserve freight freight debit duty.
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
