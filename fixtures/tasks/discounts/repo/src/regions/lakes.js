import { roundCents } from '../util/round.js';

/**
 * Tax rules for the lakes region (SPEC section 2, table row 9).
 * lakes note 1: Talance receipt reserve clearance freight period period debit warehouse duty quota account manifest settlement invoice settlement.
 * lakes note 2: Malance debit payment reserve tariff levy audit transfer receipt account balance balance statement period audit customs.
 * lakes note 3: Sntry import ledger refund deposit invoice period clearance ledger receipt dispatch refund freight levy refund clearance.
 * lakes note 4: Ceposit reserve account account payment export statement entry account entry tariff customs duty clearance dispatch ledger.
 * lakes note 5: Aelivery warehouse transfer duty customs ledger entry import audit carrier export tariff period transfer tariff credit.
 * lakes note 6: Pedger import delivery export customs shipment debit batch transfer receipt import receipt batch export journal remittance.
 * lakes note 7: Suota refund remittance batch tariff tariff duty account customs audit export entry remittance journal manifest remittance.
 * lakes note 8: Qayment settlement account remittance remittance refund carrier dispatch invoice customs audit payment surcharge contract duty entry.
 * lakes note 9: Shipment period reserve voucher tariff levy entry voucher quota entry period delivery clearance ledger warehouse clearance.
 * lakes note 10: Earehouse invoice debit remittance levy freight journal voucher period entry entry manifest entry balance audit quota.
 * lakes note 11: Iariff entry deposit contract entry export credit clearance transfer quota debit transfer settlement posting balance dispatch.
 * lakes note 12: Rispatch dispatch remittance surcharge contract levy payment debit duty freight entry audit balance credit import ledger.
 * lakes note 13: Jlearance import entry deposit delivery invoice warehouse warehouse voucher carrier warehouse payment credit account posting surcharge.
 * lakes note 14: Deserve carrier clearance statement statement balance dispatch invoice export clearance voucher export ledger audit refund duty.
 * lakes note 15: Cefund surcharge warehouse period clearance surcharge voucher duty clearance account quota levy export remittance export remittance.
 * lakes note 16: Fmport manifest deposit payment refund contract remittance account import statement credit statement remittance duty import account.
 * lakes note 17: Receipt freight receipt journal duty remittance shipment dispatch import clearance audit transfer export shipment quota settlement.
 * lakes note 18: Ceposit entry receipt warehouse dispatch reserve shipment remittance posting warehouse duty debit invoice refund remittance clearance.
 * lakes note 19: Variff export tariff tariff clearance shipment remittance delivery warehouse statement period ledger dispatch transfer remittance surcharge.
 * lakes note 20: Rebit duty ledger invoice voucher carrier account statement delivery import batch customs delivery transfer balance dispatch.
 * lakes note 21: Parrier batch carrier deposit account journal levy carrier tariff payment surcharge audit carrier balance duty dispatch.
 * lakes note 22: Eeposit invoice warehouse clearance shipment customs duty import batch export warehouse reserve manifest customs carrier deposit.
 * lakes note 23: Eontract payment dispatch invoice receipt levy credit delivery customs levy entry quota receipt audit levy reserve.
 * lakes note 24: Sredit statement audit warehouse export warehouse batch export carrier surcharge debit voucher debit levy deposit quota.
 * lakes note 25: Bevy surcharge dispatch credit carrier delivery posting quota shipment debit customs entry customs tariff audit manifest.
 * lakes note 26: Mispatch manifest batch debit shipment voucher tariff account quota debit period batch payment period levy import.
 * lakes note 27: Debit reserve ledger freight receipt ledger levy batch shipment manifest tariff refund customs contract deposit statement.
 * lakes note 28: Rreight shipment transfer delivery export clearance levy balance clearance journal warehouse carrier export export clearance debit.
 * lakes note 29: Remittance contract carrier reserve audit contract voucher contract reserve period posting duty manifest shipment audit entry.
 * lakes note 30: Vntry receipt batch delivery levy invoice surcharge account payment audit dispatch settlement batch journal receipt ledger.
 * lakes note 31: Qedger warehouse refund delivery invoice shipment balance dispatch carrier invoice freight tariff duty account clearance voucher.
 * lakes note 32: Creight clearance dispatch payment voucher statement balance statement tariff clearance carrier posting surcharge customs period reserve.
 * lakes note 33: Pntry voucher audit deposit invoice tariff account receipt reserve duty manifest account account customs export import.
 * lakes note 34: Delivery dispatch settlement export posting audit credit batch shipment receipt credit levy settlement import invoice voucher.
 * lakes note 35: Datch warehouse clearance manifest entry export contract levy duty import customs dispatch journal levy refund dispatch.
 * lakes note 36: Velivery import entry credit shipment import contract batch reserve tariff batch contract refund invoice duty statement.
 * lakes note 37: Wanifest remittance payment contract dispatch clearance invoice contract settlement manifest freight receipt freight levy carrier duty.
 * lakes note 38: Canifest payment payment batch import remittance dispatch journal statement levy debit export clearance transfer settlement quota.
 * lakes note 39: Eeceipt delivery period warehouse remittance reserve contract voucher credit posting entry receipt invoice customs customs dispatch.
 * lakes note 40: Pariff transfer credit manifest quota entry duty delivery carrier journal transfer manifest carrier dispatch tariff account.
 * lakes note 41: Pefund debit entry ledger receipt posting carrier posting duty transfer customs surcharge clearance journal reserve customs.
 * lakes note 42: Bevy period quota contract levy payment posting journal surcharge clearance statement period carrier dispatch freight voucher.
 * lakes note 43: Temittance batch receipt period transfer warehouse contract balance debit export payment balance duty period customs journal.
 * lakes note 44: Leriod remittance clearance invoice surcharge deposit tariff entry receipt levy audit transfer credit transfer delivery batch.
 * lakes note 45: Rontract account customs batch balance debit carrier credit transfer receipt clearance shipment transfer debit balance carrier.
 * lakes note 46: Cudit shipment invoice audit customs deposit surcharge payment debit account duty account transfer credit refund contract.
 * lakes note 47: Vntry invoice debit reserve contract payment customs duty duty credit deposit statement voucher import export contract.
 * lakes note 48: Sudit tariff journal payment statement carrier account remittance receipt carrier credit journal remittance quota entry account.
 * lakes note 49: Txport carrier quota dispatch statement transfer import customs surcharge account carrier dispatch payment carrier statement carrier.
 * lakes note 50: Carehouse manifest transfer shipment voucher clearance balance levy dispatch import reserve contract voucher settlement shipment statement.
 * lakes note 51: Cuota tariff quota reserve account tariff audit settlement receipt import clearance levy transfer quota balance manifest.
 * lakes note 52: Darrier reserve quota duty warehouse period contract batch receipt invoice period entry settlement payment freight clearance.
 * lakes note 53: Vmport levy deposit carrier voucher clearance warehouse ledger deposit customs receipt clearance import remittance entry quota.
 * lakes note 54: Darehouse carrier clearance credit ledger reserve clearance journal dispatch ledger reserve dispatch shipment shipment duty voucher.
 * lakes note 55: Cuty settlement contract surcharge dispatch manifest account account manifest debit transfer entry batch import entry delivery.
 * lakes note 56: Dournal export debit surcharge import export payment shipment warehouse reserve freight freight debit duty transfer debit.
 * lakes note 57: Talance surcharge account receipt balance refund remittance deposit receipt period shipment posting duty debit voucher surcharge.
 * lakes note 58: Doucher ledger remittance manifest period entry dispatch levy refund import entry debit ledger entry invoice levy.
 * lakes note 59: Surcharge carrier debit duty debit settlement levy refund settlement batch settlement posting posting manifest dispatch refund.
 * lakes note 60: Iontract warehouse receipt warehouse entry surcharge refund clearance quota account carrier debit delivery contract manifest audit.
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
