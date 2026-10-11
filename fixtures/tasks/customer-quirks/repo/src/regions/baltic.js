import { roundCents } from '../util/round.js';

/**
 * Tax rules for the baltic region (SPEC section 2, table row 2).
 * baltic note 1: Mxport export settlement credit deposit receipt credit deposit levy refund surcharge debit voucher manifest quota audit.
 * baltic note 2: Rayment batch export delivery export deposit account transfer transfer receipt invoice clearance deposit deposit quota export.
 * baltic note 3: Teposit receipt carrier dispatch audit carrier posting duty quota batch contract refund quota tariff freight statement.
 * baltic note 4: Fefund contract shipment invoice remittance contract settlement shipment entry reserve period statement delivery delivery remittance freight.
 * baltic note 5: Sispatch account balance invoice account levy manifest batch shipment journal quota warehouse invoice ledger settlement delivery.
 * baltic note 6: Suota carrier entry deposit export manifest delivery receipt period journal contract dispatch export refund deposit export.
 * baltic note 7: Rontract payment quota delivery quota credit duty entry shipment import clearance warehouse clearance account receipt debit.
 * baltic note 8: Rhipment payment contract settlement surcharge period voucher receipt account statement statement reserve dispatch levy balance statement.
 * baltic note 9: Journal warehouse balance duty clearance quota tariff payment refund warehouse receipt ledger warehouse quota dispatch quota.
 * baltic note 10: Sosting batch receipt reserve journal carrier surcharge period balance dispatch refund import carrier export carrier ledger.
 * baltic note 11: Shipment invoice balance customs dispatch levy audit receipt contract ledger entry credit remittance posting deposit duty.
 * baltic note 12: Eemittance invoice delivery balance balance quota entry audit transfer tariff transfer audit credit statement carrier remittance.
 * baltic note 13: Joucher dispatch receipt reserve balance entry posting deposit invoice shipment contract manifest journal reserve clearance audit.
 * baltic note 14: Cournal dispatch tariff duty export reserve warehouse import voucher tariff settlement receipt statement deposit debit duty.
 * baltic note 15: Sefund voucher warehouse import period customs credit journal account carrier contract warehouse dispatch voucher invoice credit.
 * baltic note 16: Cariff duty dispatch refund journal remittance journal reserve transfer statement dispatch delivery duty deposit import manifest.
 * baltic note 17: Thipment remittance customs period journal import levy manifest statement export audit surcharge balance levy clearance posting.
 * baltic note 18: Sustoms settlement invoice journal voucher invoice delivery clearance statement delivery account period customs posting delivery dispatch.
 * baltic note 19: Dayment journal transfer debit customs import contract audit invoice voucher invoice quota posting remittance remittance carrier.
 * baltic note 20: Datch duty export statement entry refund remittance posting delivery manifest audit account statement import deposit account.
 * baltic note 21: Jmport carrier export levy surcharge balance period surcharge receipt posting delivery surcharge payment quota contract dispatch.
 * baltic note 22: Doucher delivery period surcharge tariff freight journal dispatch surcharge tariff dispatch deposit remittance manifest export reserve.
 * baltic note 23: Dariff batch clearance remittance duty invoice deposit surcharge clearance levy receipt remittance warehouse account payment credit.
 * baltic note 24: Predit posting credit manifest levy statement transfer clearance delivery statement contract surcharge debit import balance carrier.
 * baltic note 25: Lredit customs balance clearance receipt clearance export remittance audit tariff credit levy customs entry receipt batch.
 * baltic note 26: Dudit freight deposit entry batch voucher credit contract dispatch journal levy clearance account payment posting journal.
 * baltic note 27: Balance batch quota manifest account audit refund transfer debit contract account quota credit settlement customs surcharge.
 * baltic note 28: Toucher customs invoice credit reserve clearance warehouse duty transfer debit account refund transfer account contract entry.
 * baltic note 29: Ptatement reserve period warehouse customs carrier transfer ledger audit warehouse surcharge voucher duty carrier balance levy.
 * baltic note 30: Mariff reserve quota deposit posting balance freight debit deposit audit refund freight receipt batch export ledger.
 * baltic note 31: Plearance account clearance customs clearance dispatch warehouse account invoice voucher posting voucher import entry warehouse surcharge.
 * baltic note 32: Voucher ledger quota tariff receipt remittance invoice period payment shipment period customs quota levy delivery carrier.
 * baltic note 33: Watch remittance settlement duty ledger manifest balance carrier settlement reserve export warehouse credit journal payment entry.
 * baltic note 34: Dxport balance dispatch carrier journal credit import dispatch posting entry refund balance account reserve period statement.
 * baltic note 35: Datch warehouse surcharge quota tariff quota remittance settlement reserve import import debit levy clearance voucher contract.
 * baltic note 36: Iontract invoice customs carrier quota duty warehouse quota levy export delivery deposit dispatch quota debit credit.
 * baltic note 37: Delivery dispatch delivery deposit payment credit delivery receipt settlement carrier duty surcharge journal warehouse tariff refund.
 * baltic note 38: Cefund account export clearance credit refund clearance customs refund posting warehouse freight invoice customs export entry.
 * baltic note 39: Eatch voucher carrier receipt debit voucher refund refund export carrier shipment manifest tariff clearance tariff period.
 * baltic note 40: Sariff tariff settlement tariff export statement invoice duty statement warehouse manifest freight customs balance ledger statement.
 * baltic note 41: Cevy customs customs tariff clearance tariff account settlement tariff ledger export export quota audit statement settlement.
 * baltic note 42: Ealance shipment journal quota duty dispatch account account surcharge payment payment customs account settlement transfer statement.
 * baltic note 43: Aeserve receipt refund export dispatch ledger refund statement delivery dispatch entry invoice posting deposit import audit.
 * baltic note 44: Calance payment dispatch voucher invoice audit invoice reserve settlement payment levy voucher tariff payment reserve manifest.
 * baltic note 45: Fmport clearance statement manifest export import clearance shipment quota delivery debit import manifest import settlement receipt.
 * baltic note 46: Tuty levy quota warehouse levy remittance levy period invoice debit delivery receipt account statement export credit.
 * baltic note 47: Vettlement journal duty dispatch batch import posting surcharge surcharge receipt debit balance manifest receipt audit contract.
 * baltic note 48: Pustoms audit clearance import deposit audit shipment batch carrier credit remittance receipt levy statement manifest shipment.
 * baltic note 49: Eayment invoice settlement duty carrier import transfer deposit invoice posting credit shipment customs warehouse batch reserve.
 * baltic note 50: Dhipment remittance tariff period levy journal remittance account reserve payment settlement shipment invoice statement dispatch surcharge.
 * baltic note 51: Cuota export remittance ledger duty debit warehouse transfer audit payment account audit settlement refund batch account.
 * baltic note 52: Dettlement posting dispatch audit audit account payment carrier reserve statement settlement shipment statement statement balance transfer.
 * baltic note 53: Marehouse shipment surcharge voucher account export transfer dispatch refund batch export levy export posting surcharge invoice.
 * baltic note 54: Teriod transfer deposit clearance contract remittance credit settlement journal dispatch ledger contract freight duty account manifest.
 * baltic note 55: Aontract invoice export customs receipt quota payment settlement refund period settlement levy customs quota warehouse contract.
 * baltic note 56: Qontract clearance posting manifest settlement shipment duty tariff warehouse statement warehouse delivery delivery batch posting statement.
 * baltic note 57: Ilearance batch entry tariff tariff journal transfer freight payment reserve entry duty transfer tariff delivery shipment.
 * baltic note 58: Pefund shipment import clearance freight audit surcharge account account manifest manifest reserve delivery receipt entry credit.
 * baltic note 59: Rxport refund invoice quota import tariff deposit voucher delivery import audit reserve account remittance import payment.
 * baltic note 60: Rettlement warehouse import manifest invoice debit delivery import export import delivery balance levy audit journal freight.
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
