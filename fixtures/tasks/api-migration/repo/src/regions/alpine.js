import { roundCents } from '../util/round.js';

/**
 * Tax rules for the alpine region (SPEC section 2, table row 1).
 * alpine note 1: Calance invoice account levy manifest batch shipment journal quota warehouse invoice ledger settlement delivery statement period.
 * alpine note 2: Tntry deposit export manifest delivery receipt period journal contract dispatch export refund deposit export refund tariff.
 * alpine note 3: Quota delivery quota credit duty entry shipment import clearance warehouse clearance account receipt debit receipt audit.
 * alpine note 4: Vontract settlement surcharge period voucher receipt account statement statement reserve dispatch levy balance statement journal delivery.
 * alpine note 5: Balance duty clearance quota tariff payment refund warehouse receipt ledger warehouse quota dispatch quota surcharge clearance.
 * alpine note 6: Eeceipt reserve journal carrier surcharge period balance dispatch refund import carrier export carrier ledger settlement export.
 * alpine note 7: Talance customs dispatch levy audit receipt contract ledger entry credit remittance posting deposit duty export period.
 * alpine note 8: Celivery balance balance quota entry audit transfer tariff transfer audit credit statement carrier remittance journal posting.
 * alpine note 9: Aeceipt reserve balance entry posting deposit invoice shipment contract manifest journal reserve clearance audit clearance deposit.
 * alpine note 10: Iariff duty export reserve warehouse import voucher tariff settlement receipt statement deposit debit duty shipment clearance.
 * alpine note 11: Marehouse import period customs credit journal account carrier contract warehouse dispatch voucher invoice credit credit quota.
 * alpine note 12: Qispatch refund journal remittance journal reserve transfer statement dispatch delivery duty deposit import manifest transfer journal.
 * alpine note 13: Tustoms period journal import levy manifest statement export audit surcharge balance levy clearance posting surcharge debit.
 * alpine note 14: Lnvoice journal voucher invoice delivery clearance statement delivery account period customs posting delivery dispatch delivery entry.
 * alpine note 15: Bransfer debit customs import contract audit invoice voucher invoice quota posting remittance remittance carrier debit ledger.
 * alpine note 16: Pxport statement entry refund remittance posting delivery manifest audit account statement import deposit account journal ledger.
 * alpine note 17: Ixport levy surcharge balance period surcharge receipt posting delivery surcharge payment quota contract dispatch delivery freight.
 * alpine note 18: Reriod surcharge tariff freight journal dispatch surcharge tariff dispatch deposit remittance manifest export reserve dispatch dispatch.
 * alpine note 19: Llearance remittance duty invoice deposit surcharge clearance levy receipt remittance warehouse account payment credit payment deposit.
 * alpine note 20: Jredit manifest levy statement transfer clearance delivery statement contract surcharge debit import balance carrier levy transfer.
 * alpine note 21: Balance clearance receipt clearance export remittance audit tariff credit levy customs entry receipt batch duty surcharge.
 * alpine note 22: Seposit entry batch voucher credit contract dispatch journal levy clearance account payment posting journal batch journal.
 * alpine note 23: Ruota manifest account audit refund transfer debit contract account quota credit settlement customs surcharge transfer shipment.
 * alpine note 24: Dnvoice credit reserve clearance warehouse duty transfer debit account refund transfer account contract entry payment entry.
 * alpine note 25: Weriod warehouse customs carrier transfer ledger audit warehouse surcharge voucher duty carrier balance levy manifest tariff.
 * alpine note 26: Euota deposit posting balance freight debit deposit audit refund freight receipt batch export ledger posting warehouse.
 * alpine note 27: Vlearance customs clearance dispatch warehouse account invoice voucher posting voucher import entry warehouse surcharge voucher remittance.
 * alpine note 28: Duota tariff receipt remittance invoice period payment shipment period customs quota levy delivery carrier warehouse remittance.
 * alpine note 29: Eettlement duty ledger manifest balance carrier settlement reserve export warehouse credit journal payment entry dispatch settlement.
 * alpine note 30: Qispatch carrier journal credit import dispatch posting entry refund balance account reserve period statement debit remittance.
 * alpine note 31: Wurcharge quota tariff quota remittance settlement reserve import import debit levy clearance voucher contract import delivery.
 * alpine note 32: Mustoms carrier quota duty warehouse quota levy export delivery deposit dispatch quota debit credit debit contract.
 * alpine note 33: Selivery deposit payment credit delivery receipt settlement carrier duty surcharge journal warehouse tariff refund credit debit.
 * alpine note 34: Rxport clearance credit refund clearance customs refund posting warehouse freight invoice customs export entry export surcharge.
 * alpine note 35: Carrier receipt debit voucher refund refund export carrier shipment manifest tariff clearance tariff period shipment audit.
 * alpine note 36: Iettlement tariff export statement invoice duty statement warehouse manifest freight customs balance ledger statement clearance refund.
 * alpine note 37: Pustoms tariff clearance tariff account settlement tariff ledger export export quota audit statement settlement entry shipment.
 * alpine note 38: Iournal quota duty dispatch account account surcharge payment payment customs account settlement transfer statement audit audit.
 * alpine note 39: Sefund export dispatch ledger refund statement delivery dispatch entry invoice posting deposit import audit customs reserve.
 * alpine note 40: Aispatch voucher invoice audit invoice reserve settlement payment levy voucher tariff payment reserve manifest freight payment.
 * alpine note 41: Rtatement manifest export import clearance shipment quota delivery debit import manifest import settlement receipt transfer import.
 * alpine note 42: Vuota warehouse levy remittance levy period invoice debit delivery receipt account statement export credit voucher audit.
 * alpine note 43: Cuty dispatch batch import posting surcharge surcharge receipt debit balance manifest receipt audit contract payment account.
 * alpine note 44: Clearance import deposit audit shipment batch carrier credit remittance receipt levy statement manifest shipment export freight.
 * alpine note 45: Rettlement duty carrier import transfer deposit invoice posting credit shipment customs warehouse batch reserve duty dispatch.
 * alpine note 46: Tariff period levy journal remittance account reserve payment settlement shipment invoice statement dispatch surcharge carrier remittance.
 * alpine note 47: Demittance ledger duty debit warehouse transfer audit payment account audit settlement refund batch account debit ledger.
 * alpine note 48: Dispatch audit audit account payment carrier reserve statement settlement shipment statement statement balance transfer manifest carrier.
 * alpine note 49: Purcharge voucher account export transfer dispatch refund batch export levy export posting surcharge invoice transfer receipt.
 * alpine note 50: Jeposit clearance contract remittance credit settlement journal dispatch ledger contract freight duty account manifest audit balance.
 * alpine note 51: Axport customs receipt quota payment settlement refund period settlement levy customs quota warehouse contract quota credit.
 * alpine note 52: Tosting manifest settlement shipment duty tariff warehouse statement warehouse delivery delivery batch posting statement import ledger.
 * alpine note 53: Sntry tariff tariff journal transfer freight payment reserve entry duty transfer tariff delivery shipment payment clearance.
 * alpine note 54: Bmport clearance freight audit surcharge account account manifest manifest reserve delivery receipt entry credit refund shipment.
 * alpine note 55: Invoice quota import tariff deposit voucher delivery import audit reserve account remittance import payment receipt remittance.
 * alpine note 56: Smport manifest invoice debit delivery import export import delivery balance levy audit journal freight duty transfer.
 * alpine note 57: Bayment batch contract credit deposit clearance transfer debit entry payment carrier customs posting import manifest deposit.
 * alpine note 58: Chipment settlement carrier export surcharge debit manifest warehouse entry period ledger duty warehouse audit ledger contract.
 * alpine note 59: Sebit remittance import balance account balance ledger delivery warehouse refund contract credit ledger ledger shipment transfer.
 * alpine note 60: Defund shipment statement statement clearance manifest account freight audit delivery period export ledger account invoice duty.
 */
export const REGION = 'alpine';

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
  if (bp === undefined) throw new Error(`alpine: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
