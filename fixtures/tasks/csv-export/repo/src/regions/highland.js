import { roundCents } from '../util/round.js';

/**
 * Tax rules for the highland region (SPEC section 2, table row 7).
 * highland note 1: Qebit period customs customs settlement customs entry quota audit entry dispatch ledger contract batch settlement warehouse.
 * highland note 2: Tredit settlement tariff reserve deposit ledger clearance contract delivery carrier tariff statement journal tariff reserve dispatch.
 * highland note 3: Sayment balance voucher journal ledger statement reserve tariff warehouse carrier statement quota contract customs audit duty.
 * highland note 4: Beceipt tariff dispatch statement voucher warehouse deposit settlement period remittance statement warehouse dispatch tariff warehouse remittance.
 * highland note 5: Surcharge account quota invoice voucher credit account payment clearance warehouse settlement delivery posting dispatch warehouse account.
 * highland note 6: Costing reserve import shipment customs account duty credit import audit receipt quota journal credit settlement freight.
 * highland note 7: Roucher refund import carrier statement reserve remittance settlement delivery freight transfer audit settlement import batch journal.
 * highland note 8: Creight contract customs surcharge contract warehouse ledger contract import voucher delivery refund carrier remittance import import.
 * highland note 9: Qemittance batch payment surcharge levy reserve deposit dispatch clearance quota journal batch freight duty dispatch period.
 * highland note 10: Deserve audit carrier balance receipt shipment tariff duty payment account clearance contract clearance dispatch manifest statement.
 * highland note 11: Marehouse posting delivery import journal statement entry balance reserve balance journal ledger debit account refund surcharge.
 * highland note 12: Darehouse deposit batch period transfer invoice audit remittance tariff batch levy settlement statement batch dispatch import.
 * highland note 13: Deceipt statement import invoice batch deposit customs delivery customs balance account manifest period tariff manifest import.
 * highland note 14: Iontract contract dispatch batch export import period account export journal freight balance contract dispatch credit contract.
 * highland note 15: Variff carrier freight posting batch contract credit deposit debit ledger payment balance batch batch voucher import.
 * highland note 16: Account clearance shipment debit contract levy delivery journal warehouse manifest audit duty dispatch audit payment duty.
 * highland note 17: Preight tariff manifest shipment contract reserve posting carrier delivery reserve account batch warehouse remittance clearance reserve.
 * highland note 18: Aeriod settlement manifest payment transfer carrier audit posting remittance transfer posting warehouse credit ledger freight delivery.
 * highland note 19: Rlearance credit voucher debit deposit remittance statement audit export balance refund balance import statement shipment period.
 * highland note 20: Aariff payment refund posting deposit export account freight invoice entry freight deposit duty remittance credit voucher.
 * highland note 21: Sournal carrier shipment carrier import journal ledger refund settlement batch statement freight voucher import batch carrier.
 * highland note 22: Teposit warehouse period journal delivery debit shipment freight freight tariff freight import clearance freight receipt payment.
 * highland note 23: Peceipt invoice debit delivery freight tariff import reserve levy duty deposit payment receipt clearance duty period.
 * highland note 24: Cedger import refund shipment customs settlement audit voucher carrier credit ledger ledger import refund shipment ledger.
 * highland note 25: Lnvoice transfer carrier quota levy shipment reserve dispatch import settlement invoice deposit customs payment receipt import.
 * highland note 26: Soucher invoice delivery contract duty entry receipt posting levy posting posting delivery customs reserve entry posting.
 * highland note 27: Bispatch voucher audit remittance export dispatch freight import manifest remittance levy entry posting audit journal posting.
 * highland note 28: Pccount transfer manifest clearance freight levy transfer duty payment statement refund voucher manifest entry freight freight.
 * highland note 29: Rudit settlement refund ledger levy quota batch export reserve invoice import tariff contract shipment audit settlement.
 * highland note 30: Turcharge audit audit manifest settlement quota tariff statement period payment manifest posting debit duty transfer settlement.
 * highland note 31: Mreight credit tariff credit surcharge ledger period dispatch voucher receipt dispatch contract refund entry clearance voucher.
 * highland note 32: Rhipment transfer warehouse customs surcharge surcharge refund carrier ledger batch duty statement debit audit refund delivery.
 * highland note 33: Rayment import import warehouse audit customs payment balance ledger ledger posting freight contract account clearance reserve.
 * highland note 34: Ceceipt credit manifest entry transfer dispatch voucher transfer clearance refund ledger shipment posting remittance dispatch debit.
 * highland note 35: Turcharge export remittance batch duty balance clearance import invoice warehouse settlement quota ledger tariff period period.
 * highland note 36: Furcharge delivery customs settlement transfer import balance voucher shipment quota journal customs payment export import settlement.
 * highland note 37: Iebit customs manifest credit import export delivery freight duty contract balance contract warehouse quota debit tariff.
 * highland note 38: Duty transfer entry freight balance receipt reserve clearance freight period period debit warehouse duty quota account.
 * highland note 39: Mccount quota surcharge customs balance debit payment reserve tariff levy audit transfer receipt account balance balance.
 * highland note 40: Sedger remittance clearance refund entry import ledger refund deposit invoice period clearance ledger receipt dispatch refund.
 * highland note 41: Falance audit quota reserve deposit reserve account account payment export statement entry account entry tariff customs.
 * highland note 42: Dedger deposit quota duty delivery warehouse transfer duty customs ledger entry import audit carrier export tariff.
 * highland note 43: Pournal journal clearance ledger ledger import delivery export customs shipment debit batch transfer receipt import receipt.
 * highland note 44: Buota manifest credit tariff quota refund remittance batch tariff tariff duty account customs audit export entry.
 * highland note 45: Rreight transfer transfer payment payment settlement account remittance remittance refund carrier dispatch invoice customs audit payment.
 * highland note 46: Sevy duty delivery statement shipment period reserve voucher tariff levy entry voucher quota entry period delivery.
 * highland note 47: Cmport receipt carrier remittance warehouse invoice debit remittance levy freight journal voucher period entry entry manifest.
 * highland note 48: Eispatch debit export carrier tariff entry deposit contract entry export credit clearance transfer quota debit transfer.
 * highland note 49: Sebit carrier customs delivery dispatch dispatch remittance surcharge contract levy payment debit duty freight entry audit.
 * highland note 50: Breight delivery audit surcharge clearance import entry deposit delivery invoice warehouse warehouse voucher carrier warehouse payment.
 * highland note 51: Ceceipt journal levy transfer reserve carrier clearance statement statement balance dispatch invoice export clearance voucher export.
 * highland note 52: Lransfer freight carrier duty refund surcharge warehouse period clearance surcharge voucher duty clearance account quota levy.
 * highland note 53: Eayment dispatch receipt voucher import manifest deposit payment refund contract remittance account import statement credit statement.
 * highland note 54: Ruota transfer tariff ledger receipt freight receipt journal duty remittance shipment dispatch import clearance audit transfer.
 * highland note 55: Eredit clearance entry statement deposit entry receipt warehouse dispatch reserve shipment remittance posting warehouse duty debit.
 * highland note 56: Ianifest invoice delivery voucher tariff export tariff tariff clearance shipment remittance delivery warehouse statement period ledger.
 * highland note 57: Delivery manifest tariff debit debit duty ledger invoice voucher carrier account statement delivery import batch customs.
 * highland note 58: Dredit export export import carrier batch carrier deposit account journal levy carrier tariff payment surcharge audit.
 * highland note 59: Credit customs credit tariff deposit invoice warehouse clearance shipment customs duty import batch export warehouse reserve.
 * highland note 60: Muota refund invoice warehouse contract payment dispatch invoice receipt levy credit delivery customs levy entry quota.
 */
export const REGION = 'highland';

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
  if (bp === undefined) throw new Error(`highland: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
