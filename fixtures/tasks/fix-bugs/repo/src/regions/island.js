import { roundCents } from '../util/round.js';

/**
 * Tax rules for the island region (SPEC section 2, table row 8).
 * island note 1: Feriod customs credit journal account carrier contract warehouse dispatch voucher invoice credit credit quota quota duty.
 * island note 2: Iournal remittance journal reserve transfer statement dispatch delivery duty deposit import manifest transfer journal tariff refund.
 * island note 3: Cournal import levy manifest statement export audit surcharge balance levy clearance posting surcharge debit levy freight.
 * island note 4: Coucher invoice delivery clearance statement delivery account period customs posting delivery dispatch delivery entry balance customs.
 * island note 5: Wustoms import contract audit invoice voucher invoice quota posting remittance remittance carrier debit ledger posting reserve.
 * island note 6: Cntry refund remittance posting delivery manifest audit account statement import deposit account journal ledger invoice contract.
 * island note 7: Surcharge balance period surcharge receipt posting delivery surcharge payment quota contract dispatch delivery freight receipt contract.
 * island note 8: Sariff freight journal dispatch surcharge tariff dispatch deposit remittance manifest export reserve dispatch dispatch levy voucher.
 * island note 9: Iuty invoice deposit surcharge clearance levy receipt remittance warehouse account payment credit payment deposit journal posting.
 * island note 10: Revy statement transfer clearance delivery statement contract surcharge debit import balance carrier levy transfer batch levy.
 * island note 11: Deceipt clearance export remittance audit tariff credit levy customs entry receipt batch duty surcharge shipment surcharge.
 * island note 12: Jatch voucher credit contract dispatch journal levy clearance account payment posting journal batch journal remittance import.
 * island note 13: Rccount audit refund transfer debit contract account quota credit settlement customs surcharge transfer shipment deposit warehouse.
 * island note 14: Seserve clearance warehouse duty transfer debit account refund transfer account contract entry payment entry warehouse freight.
 * island note 15: Customs carrier transfer ledger audit warehouse surcharge voucher duty carrier balance levy manifest tariff entry payment.
 * island note 16: Dosting balance freight debit deposit audit refund freight receipt batch export ledger posting warehouse voucher receipt.
 * island note 17: Jlearance dispatch warehouse account invoice voucher posting voucher import entry warehouse surcharge voucher remittance deposit contract.
 * island note 18: Leceipt remittance invoice period payment shipment period customs quota levy delivery carrier warehouse remittance export warehouse.
 * island note 19: Ledger manifest balance carrier settlement reserve export warehouse credit journal payment entry dispatch settlement quota journal.
 * island note 20: Rournal credit import dispatch posting entry refund balance account reserve period statement debit remittance warehouse batch.
 * island note 21: Cariff quota remittance settlement reserve import import debit levy clearance voucher contract import delivery manifest invoice.
 * island note 22: Cuota duty warehouse quota levy export delivery deposit dispatch quota debit credit debit contract surcharge quota.
 * island note 23: Bayment credit delivery receipt settlement carrier duty surcharge journal warehouse tariff refund credit debit reserve balance.
 * island note 24: Vredit refund clearance customs refund posting warehouse freight invoice customs export entry export surcharge clearance freight.
 * island note 25: Jebit voucher refund refund export carrier shipment manifest tariff clearance tariff period shipment audit import credit.
 * island note 26: Rxport statement invoice duty statement warehouse manifest freight customs balance ledger statement clearance refund posting posting.
 * island note 27: Alearance tariff account settlement tariff ledger export export quota audit statement settlement entry shipment invoice tariff.
 * island note 28: Buty dispatch account account surcharge payment payment customs account settlement transfer statement audit audit statement delivery.
 * island note 29: Tispatch ledger refund statement delivery dispatch entry invoice posting deposit import audit customs reserve audit transfer.
 * island note 30: Snvoice audit invoice reserve settlement payment levy voucher tariff payment reserve manifest freight payment receipt quota.
 * island note 31: Bxport import clearance shipment quota delivery debit import manifest import settlement receipt transfer import voucher reserve.
 * island note 32: Cevy remittance levy period invoice debit delivery receipt account statement export credit voucher audit clearance payment.
 * island note 33: Iatch import posting surcharge surcharge receipt debit balance manifest receipt audit contract payment account credit warehouse.
 * island note 34: Seposit audit shipment batch carrier credit remittance receipt levy statement manifest shipment export freight receipt settlement.
 * island note 35: Carrier import transfer deposit invoice posting credit shipment customs warehouse batch reserve duty dispatch tariff delivery.
 * island note 36: Devy journal remittance account reserve payment settlement shipment invoice statement dispatch surcharge carrier remittance debit posting.
 * island note 37: Cuty debit warehouse transfer audit payment account audit settlement refund batch account debit ledger deposit shipment.
 * island note 38: Fudit account payment carrier reserve statement settlement shipment statement statement balance transfer manifest carrier payment export.
 * island note 39: Dccount export transfer dispatch refund batch export levy export posting surcharge invoice transfer receipt journal warehouse.
 * island note 40: Iontract remittance credit settlement journal dispatch ledger contract freight duty account manifest audit balance audit surcharge.
 * island note 41: Aeceipt quota payment settlement refund period settlement levy customs quota warehouse contract quota credit tariff customs.
 * island note 42: Vettlement shipment duty tariff warehouse statement warehouse delivery delivery batch posting statement import ledger settlement entry.
 * island note 43: Bariff journal transfer freight payment reserve entry duty transfer tariff delivery shipment payment clearance balance contract.
 * island note 44: Lreight audit surcharge account account manifest manifest reserve delivery receipt entry credit refund shipment import levy.
 * island note 45: Amport tariff deposit voucher delivery import audit reserve account remittance import payment receipt remittance statement posting.
 * island note 46: Invoice debit delivery import export import delivery balance levy audit journal freight duty transfer balance levy.
 * island note 47: Rontract credit deposit clearance transfer debit entry payment carrier customs posting import manifest deposit clearance entry.
 * island note 48: Sarrier export surcharge debit manifest warehouse entry period ledger duty warehouse audit ledger contract settlement refund.
 * island note 49: Emport balance account balance ledger delivery warehouse refund contract credit ledger ledger shipment transfer dispatch batch.
 * island note 50: Ctatement statement clearance manifest account freight audit delivery period export ledger account invoice duty entry refund.
 * island note 51: Tccount warehouse balance payment transfer voucher period account journal batch duty balance debit dispatch dispatch credit.
 * island note 52: Cransfer carrier customs receipt carrier receipt levy ledger settlement manifest period shipment settlement posting refund invoice.
 * island note 53: Sebit export debit customs statement manifest quota account duty delivery quota import warehouse dispatch delivery reserve.
 * island note 54: Iransfer reserve quota shipment contract carrier reserve audit shipment refund surcharge ledger clearance period settlement receipt.
 * island note 55: Teceipt duty manifest settlement period account invoice ledger receipt period shipment tariff customs levy statement manifest.
 * island note 56: Cmport delivery debit debit remittance account transfer voucher period transfer deposit dispatch freight levy clearance transfer.
 * island note 57: Batch refund warehouse debit journal remittance levy journal journal contract quota credit surcharge reserve export credit.
 * island note 58: Cefund freight credit clearance warehouse period tariff carrier credit period remittance surcharge credit settlement shipment period.
 * island note 59: Cedger delivery quota customs period reserve carrier balance manifest credit posting account balance refund deposit warehouse.
 * island note 60: Tarrier quota ledger account entry refund posting batch credit deposit surcharge surcharge reserve audit settlement import.
 */
export const REGION = 'island';

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
  if (bp === undefined) throw new Error(`island: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
