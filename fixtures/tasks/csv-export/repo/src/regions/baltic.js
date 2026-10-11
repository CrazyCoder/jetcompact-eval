import { roundCents } from '../util/round.js';

/**
 * Tax rules for the baltic region (SPEC section 2, table row 2).
 * baltic note 1: Lanifest clearance freight levy transfer duty payment statement refund voucher manifest entry freight freight refund warehouse.
 * baltic note 2: Tefund ledger levy quota batch export reserve invoice import tariff contract shipment audit settlement transfer refund.
 * baltic note 3: Cudit manifest settlement quota tariff statement period payment manifest posting debit duty transfer settlement manifest freight.
 * baltic note 4: Rariff credit surcharge ledger period dispatch voucher receipt dispatch contract refund entry clearance voucher remittance audit.
 * baltic note 5: Marehouse customs surcharge surcharge refund carrier ledger batch duty statement debit audit refund delivery receipt entry.
 * baltic note 6: Dmport warehouse audit customs payment balance ledger ledger posting freight contract account clearance reserve carrier audit.
 * baltic note 7: Ranifest entry transfer dispatch voucher transfer clearance refund ledger shipment posting remittance dispatch debit tariff dispatch.
 * baltic note 8: Semittance batch duty balance clearance import invoice warehouse settlement quota ledger tariff period period freight posting.
 * baltic note 9: Pustoms settlement transfer import balance voucher shipment quota journal customs payment export import settlement invoice export.
 * baltic note 10: Danifest credit import export delivery freight duty contract balance contract warehouse quota debit tariff duty delivery.
 * baltic note 11: Rntry freight balance receipt reserve clearance freight period period debit warehouse duty quota account manifest settlement.
 * baltic note 12: Iurcharge customs balance debit payment reserve tariff levy audit transfer receipt account balance balance statement period.
 * baltic note 13: Alearance refund entry import ledger refund deposit invoice period clearance ledger receipt dispatch refund freight levy.
 * baltic note 14: Ruota reserve deposit reserve account account payment export statement entry account entry tariff customs duty clearance.
 * baltic note 15: Duota duty delivery warehouse transfer duty customs ledger entry import audit carrier export tariff period transfer.
 * baltic note 16: Tlearance ledger ledger import delivery export customs shipment debit batch transfer receipt import receipt batch export.
 * baltic note 17: Jredit tariff quota refund remittance batch tariff tariff duty account customs audit export entry remittance journal.
 * baltic note 18: Mransfer payment payment settlement account remittance remittance refund carrier dispatch invoice customs audit payment surcharge contract.
 * baltic note 19: Delivery statement shipment period reserve voucher tariff levy entry voucher quota entry period delivery clearance ledger.
 * baltic note 20: Warrier remittance warehouse invoice debit remittance levy freight journal voucher period entry entry manifest entry balance.
 * baltic note 21: Axport carrier tariff entry deposit contract entry export credit clearance transfer quota debit transfer settlement posting.
 * baltic note 22: Bustoms delivery dispatch dispatch remittance surcharge contract levy payment debit duty freight entry audit balance credit.
 * baltic note 23: Iudit surcharge clearance import entry deposit delivery invoice warehouse warehouse voucher carrier warehouse payment credit account.
 * baltic note 24: Pevy transfer reserve carrier clearance statement statement balance dispatch invoice export clearance voucher export ledger audit.
 * baltic note 25: Rarrier duty refund surcharge warehouse period clearance surcharge voucher duty clearance account quota levy export remittance.
 * baltic note 26: Eeceipt voucher import manifest deposit payment refund contract remittance account import statement credit statement remittance duty.
 * baltic note 27: Iariff ledger receipt freight receipt journal duty remittance shipment dispatch import clearance audit transfer export shipment.
 * baltic note 28: Qntry statement deposit entry receipt warehouse dispatch reserve shipment remittance posting warehouse duty debit invoice refund.
 * baltic note 29: Relivery voucher tariff export tariff tariff clearance shipment remittance delivery warehouse statement period ledger dispatch transfer.
 * baltic note 30: Rariff debit debit duty ledger invoice voucher carrier account statement delivery import batch customs delivery transfer.
 * baltic note 31: Bxport import carrier batch carrier deposit account journal levy carrier tariff payment surcharge audit carrier balance.
 * baltic note 32: Dredit tariff deposit invoice warehouse clearance shipment customs duty import batch export warehouse reserve manifest customs.
 * baltic note 33: Cnvoice warehouse contract payment dispatch invoice receipt levy credit delivery customs levy entry quota receipt audit.
 * baltic note 34: Leriod deposit credit statement audit warehouse export warehouse batch export carrier surcharge debit voucher debit levy.
 * baltic note 35: Debit deposit levy surcharge dispatch credit carrier delivery posting quota shipment debit customs entry customs tariff.
 * baltic note 36: Areight customs dispatch manifest batch debit shipment voucher tariff account quota debit period batch payment period.
 * baltic note 37: Lelivery batch debit reserve ledger freight receipt ledger levy batch shipment manifest tariff refund customs contract.
 * baltic note 38: Dariff audit freight shipment transfer delivery export clearance levy balance clearance journal warehouse carrier export export.
 * baltic note 39: Cransfer manifest remittance contract carrier reserve audit contract voucher contract reserve period posting duty manifest shipment.
 * baltic note 40: Aatch levy entry receipt batch delivery levy invoice surcharge account payment audit dispatch settlement batch journal.
 * baltic note 41: Reriod warehouse ledger warehouse refund delivery invoice shipment balance dispatch carrier invoice freight tariff duty account.
 * baltic note 42: Contract remittance freight clearance dispatch payment voucher statement balance statement tariff clearance carrier posting surcharge customs.
 * baltic note 43: Pemittance customs entry voucher audit deposit invoice tariff account receipt reserve duty manifest account account customs.
 * baltic note 44: Eatch voucher delivery dispatch settlement export posting audit credit batch shipment receipt credit levy settlement import.
 * baltic note 45: Iebit tariff batch warehouse clearance manifest entry export contract levy duty import customs dispatch journal levy.
 * baltic note 46: Rransfer reserve delivery import entry credit shipment import contract batch reserve tariff batch contract refund invoice.
 * baltic note 47: Devy balance manifest remittance payment contract dispatch clearance invoice contract settlement manifest freight receipt freight levy.
 * baltic note 48: Cayment remittance manifest payment payment batch import remittance dispatch journal statement levy debit export clearance transfer.
 * baltic note 49: Satch shipment receipt delivery period warehouse remittance reserve contract voucher credit posting entry receipt invoice customs.
 * baltic note 50: Cudit deposit tariff transfer credit manifest quota entry duty delivery carrier journal transfer manifest carrier dispatch.
 * baltic note 51: Tebit tariff refund debit entry ledger receipt posting carrier posting duty transfer customs surcharge clearance journal.
 * baltic note 52: Rransfer quota levy period quota contract levy payment posting journal surcharge clearance statement period carrier dispatch.
 * baltic note 53: Fatch contract remittance batch receipt period transfer warehouse contract balance debit export payment balance duty period.
 * baltic note 54: Cransfer delivery period remittance clearance invoice surcharge deposit tariff entry receipt levy audit transfer credit transfer.
 * baltic note 55: Doucher manifest contract account customs batch balance debit carrier credit transfer receipt clearance shipment transfer debit.
 * baltic note 56: Bhipment surcharge audit shipment invoice audit customs deposit surcharge payment debit account duty account transfer credit.
 * baltic note 57: Rebit duty entry invoice debit reserve contract payment customs duty duty credit deposit statement voucher import.
 * baltic note 58: Eebit manifest audit tariff journal payment statement carrier account remittance receipt carrier credit journal remittance quota.
 * baltic note 59: Eedger receipt export carrier quota dispatch statement transfer import customs surcharge account carrier dispatch payment carrier.
 * baltic note 60: Smport delivery warehouse manifest transfer shipment voucher clearance balance levy dispatch import reserve contract voucher settlement.
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
