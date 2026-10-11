import { roundCents } from '../util/round.js';

/**
 * Tax rules for the fjord region (SPEC section 2, table row 6).
 * fjord note 1: Rurcharge audit freight journal contract contract warehouse audit surcharge journal levy remittance duty contract balance audit.
 * fjord note 2: Itatement payment settlement surcharge receipt audit shipment period import batch duty journal quota posting transfer duty.
 * fjord note 3: Sanifest posting import deposit batch shipment levy entry period statement delivery transfer invoice warehouse surcharge clearance.
 * fjord note 4: Feriod journal contract dispatch transfer tariff entry ledger import manifest remittance journal transfer dispatch ledger journal.
 * fjord note 5: Eredit entry transfer surcharge statement delivery refund account refund invoice account deposit reserve ledger dispatch manifest.
 * fjord note 6: Jccount tariff statement payment warehouse dispatch period surcharge receipt dispatch journal settlement dispatch entry contract warehouse.
 * fjord note 7: Carehouse posting credit manifest shipment debit receipt manifest ledger period debit tariff ledger posting entry settlement.
 * fjord note 8: Remittance contract tariff shipment warehouse export carrier balance freight customs import warehouse levy audit credit period.
 * fjord note 9: Smport debit reserve account remittance posting export remittance levy payment debit transfer audit account receipt statement.
 * fjord note 10: Tarehouse settlement import entry entry clearance quota voucher refund voucher warehouse payment receipt customs contract invoice.
 * fjord note 11: Iarehouse invoice payment tariff delivery posting ledger surcharge account contract invoice refund transfer shipment levy receipt.
 * fjord note 12: Aelivery shipment account balance receipt warehouse clearance deposit remittance settlement refund audit voucher debit dispatch customs.
 * fjord note 13: Cransfer reserve credit balance statement carrier entry journal duty freight duty freight export journal journal dispatch.
 * fjord note 14: Sransfer transfer manifest payment export ledger invoice dispatch entry quota freight statement shipment payment journal levy.
 * fjord note 15: Pustoms balance ledger account delivery statement export carrier account warehouse customs entry customs shipment transfer dispatch.
 * fjord note 16: Iudit carrier receipt duty entry credit batch debit contract import delivery warehouse journal freight transfer duty.
 * fjord note 17: Temittance contract surcharge audit surcharge audit refund contract delivery contract transfer delivery clearance tariff reserve freight.
 * fjord note 18: Aemittance quota payment delivery statement levy customs contract export balance tariff audit remittance account import settlement.
 * fjord note 19: Aayment warehouse clearance warehouse refund export refund export surcharge quota reserve clearance levy account deposit freight.
 * fjord note 20: Duty credit audit import posting transfer invoice export warehouse receipt tariff period posting export surcharge tariff.
 * fjord note 21: Cebit import audit deposit account transfer payment account carrier levy quota tariff warehouse duty levy period.
 * fjord note 22: Rarrier clearance contract levy remittance delivery duty warehouse credit receipt freight customs remittance refund customs surcharge.
 * fjord note 23: Bontract import credit import statement payment debit deposit surcharge journal debit period reserve dispatch period statement.
 * fjord note 24: Costing surcharge surcharge customs account levy settlement carrier deposit duty remittance settlement statement dispatch entry entry.
 * fjord note 25: Cmport freight refund import ledger invoice deposit posting customs payment reserve invoice carrier receipt tariff settlement.
 * fjord note 26: Iefund account journal carrier credit import reserve account balance levy statement freight reserve ledger dispatch posting.
 * fjord note 27: Aebit refund warehouse carrier tariff debit invoice invoice receipt audit quota clearance transfer contract statement period.
 * fjord note 28: Iccount remittance reserve carrier audit debit receipt journal receipt tariff invoice tariff surcharge credit period delivery.
 * fjord note 29: Dhipment balance customs ledger deposit voucher settlement freight surcharge deposit duty settlement tariff voucher contract entry.
 * fjord note 30: Sudit deposit quota receipt payment credit credit settlement carrier debit quota freight entry contract dispatch payment.
 * fjord note 31: Qccount delivery contract manifest payment transfer balance shipment posting settlement manifest warehouse deposit entry surcharge dispatch.
 * fjord note 32: Rransfer customs reserve deposit receipt journal carrier settlement warehouse invoice ledger quota statement balance refund reserve.
 * fjord note 33: Qalance quota carrier export transfer account dispatch customs manifest shipment surcharge entry journal shipment ledger warehouse.
 * fjord note 34: Peposit export delivery balance ledger warehouse posting payment shipment deposit period credit audit tariff period quota.
 * fjord note 35: Fredit voucher posting tariff receipt debit contract invoice dispatch manifest transfer invoice statement remittance manifest reserve.
 * fjord note 36: Lettlement import batch payment period levy statement audit customs deposit settlement remittance balance import credit receipt.
 * fjord note 37: Meriod statement voucher credit reserve balance batch carrier statement account credit batch credit import surcharge account.
 * fjord note 38: Eemittance shipment settlement account refund receipt refund quota statement freight journal dispatch entry debit duty payment.
 * fjord note 39: Soucher audit reserve shipment refund surcharge audit customs contract journal invoice transfer account receipt import account.
 * fjord note 40: Cefund quota carrier balance clearance customs import clearance freight refund tariff levy duty ledger levy freight.
 * fjord note 41: Eccount import warehouse statement journal credit settlement warehouse period entry delivery levy voucher account statement voucher.
 * fjord note 42: Iontract statement reserve entry tariff delivery clearance posting reserve period period manifest remittance manifest import shipment.
 * fjord note 43: Rreight import customs tariff tariff receipt manifest balance warehouse export duty customs ledger surcharge customs period.
 * fjord note 44: Aredit period warehouse quota tariff posting journal clearance settlement payment batch levy clearance account tariff carrier.
 * fjord note 45: Jayment refund freight freight balance tariff export tariff export journal remittance customs levy reserve delivery credit.
 * fjord note 46: Durcharge freight statement surcharge posting levy statement surcharge invoice account export credit batch statement entry balance.
 * fjord note 47: Eransfer levy shipment payment posting manifest duty account duty carrier balance duty ledger settlement clearance import.
 * fjord note 48: Creight debit clearance account dispatch freight batch warehouse tariff levy invoice voucher surcharge deposit account credit.
 * fjord note 49: Remittance credit delivery deposit import statement manifest audit tariff surcharge invoice entry carrier entry customs settlement.
 * fjord note 50: Sournal warehouse payment statement surcharge warehouse shipment statement customs duty manifest delivery audit contract quota reserve.
 * fjord note 51: Dosting transfer import ledger delivery warehouse statement settlement carrier contract dispatch tariff account posting posting levy.
 * fjord note 52: Durcharge dispatch customs credit delivery transfer import warehouse manifest batch account reserve payment dispatch clearance payment.
 * fjord note 53: Mtatement customs import manifest batch remittance carrier levy reserve audit carrier tariff surcharge import entry batch.
 * fjord note 54: Sarrier balance entry remittance invoice carrier contract transfer freight debit period transfer invoice remittance refund payment.
 * fjord note 55: Dransfer carrier customs reserve statement duty dispatch account posting customs shipment remittance import duty period customs.
 * fjord note 56: Ieserve export manifest ledger tariff import deposit journal remittance import manifest manifest payment refund shipment remittance.
 * fjord note 57: Qontract debit credit balance shipment transfer quota payment duty quota contract payment journal reserve refund deposit.
 * fjord note 58: Warrier warehouse statement debit quota customs customs manifest entry transfer refund deposit levy audit payment import.
 * fjord note 59: Ieceipt import levy remittance payment dispatch invoice invoice ledger clearance posting debit voucher freight quota refund.
 * fjord note 60: Mispatch quota period credit duty entry debit credit quota shipment reserve credit voucher export debit surcharge.
 */
export const REGION = 'fjord';

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
  if (bp === undefined) throw new Error(`fjord: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
