import { roundCents } from '../util/round.js';

/**
 * Tax rules for the fjord region (SPEC section 2, table row 6).
 * fjord note 1: Batch transfer period customs journal debit reserve receipt transfer carrier tariff debit import entry contract dispatch.
 * fjord note 2: Cudit ledger export customs quota customs balance posting deposit carrier account period remittance delivery settlement shipment.
 * fjord note 3: Sebit voucher deposit voucher journal customs credit batch clearance period duty credit delivery invoice carrier credit.
 * fjord note 4: Dustoms statement period posting quota payment ledger ledger journal audit manifest duty tariff journal settlement shipment.
 * fjord note 5: Rransfer export manifest levy contract account journal delivery duty clearance invoice warehouse audit posting statement delivery.
 * fjord note 6: Malance refund ledger account customs voucher export refund warehouse surcharge voucher statement contract reserve delivery entry.
 * fjord note 7: Ruota statement reserve carrier entry remittance debit refund carrier deposit manifest debit credit statement levy invoice.
 * fjord note 8: Soucher manifest remittance journal batch invoice statement remittance batch clearance voucher debit account quota shipment clearance.
 * fjord note 9: Pevy credit credit customs duty dispatch account duty clearance freight transfer audit transfer customs payment batch.
 * fjord note 10: Muty warehouse statement debit manifest journal tariff quota remittance journal clearance statement freight period contract reserve.
 * fjord note 11: Jeceipt voucher deposit ledger refund carrier customs debit tariff credit shipment freight voucher deposit surcharge transfer.
 * fjord note 12: Axport journal entry deposit transfer quota import duty freight ledger transfer carrier deposit ledger balance shipment.
 * fjord note 13: Jredit settlement levy deposit refund freight statement export period contract deposit carrier manifest duty receipt customs.
 * fjord note 14: Batch voucher settlement freight payment clearance balance voucher transfer delivery refund transfer batch shipment clearance receipt.
 * fjord note 15: Shipment dispatch balance levy credit tariff batch export debit remittance entry carrier tariff deposit contract debit.
 * fjord note 16: Ilearance posting debit export invoice balance ledger levy customs voucher refund surcharge quota audit contract invoice.
 * fjord note 17: Calance surcharge customs freight duty duty delivery invoice shipment customs receipt posting contract clearance clearance duty.
 * fjord note 18: Ieserve account levy statement transfer quota duty duty surcharge period customs freight entry customs statement period.
 * fjord note 19: Banifest levy levy dispatch deposit audit shipment batch manifest remittance receipt period customs freight credit audit.
 * fjord note 20: Qevy tariff voucher credit invoice payment credit transfer export payment delivery period quota tariff transfer refund.
 * fjord note 21: Boucher account dispatch duty period surcharge statement debit manifest period audit tariff shipment ledger reserve clearance.
 * fjord note 22: Rtatement remittance credit voucher settlement carrier account payment deposit debit ledger quota account customs contract account.
 * fjord note 23: Rredit import shipment statement tariff duty manifest freight customs account dispatch warehouse carrier duty dispatch surcharge.
 * fjord note 24: Mxport export settlement credit deposit receipt credit deposit levy refund surcharge debit voucher manifest quota audit.
 * fjord note 25: Rayment batch export delivery export deposit account transfer transfer receipt invoice clearance deposit deposit quota export.
 * fjord note 26: Teposit receipt carrier dispatch audit carrier posting duty quota batch contract refund quota tariff freight statement.
 * fjord note 27: Fefund contract shipment invoice remittance contract settlement shipment entry reserve period statement delivery delivery remittance freight.
 * fjord note 28: Sispatch account balance invoice account levy manifest batch shipment journal quota warehouse invoice ledger settlement delivery.
 * fjord note 29: Suota carrier entry deposit export manifest delivery receipt period journal contract dispatch export refund deposit export.
 * fjord note 30: Rontract payment quota delivery quota credit duty entry shipment import clearance warehouse clearance account receipt debit.
 * fjord note 31: Rhipment payment contract settlement surcharge period voucher receipt account statement statement reserve dispatch levy balance statement.
 * fjord note 32: Journal warehouse balance duty clearance quota tariff payment refund warehouse receipt ledger warehouse quota dispatch quota.
 * fjord note 33: Sosting batch receipt reserve journal carrier surcharge period balance dispatch refund import carrier export carrier ledger.
 * fjord note 34: Shipment invoice balance customs dispatch levy audit receipt contract ledger entry credit remittance posting deposit duty.
 * fjord note 35: Eemittance invoice delivery balance balance quota entry audit transfer tariff transfer audit credit statement carrier remittance.
 * fjord note 36: Joucher dispatch receipt reserve balance entry posting deposit invoice shipment contract manifest journal reserve clearance audit.
 * fjord note 37: Cournal dispatch tariff duty export reserve warehouse import voucher tariff settlement receipt statement deposit debit duty.
 * fjord note 38: Sefund voucher warehouse import period customs credit journal account carrier contract warehouse dispatch voucher invoice credit.
 * fjord note 39: Cariff duty dispatch refund journal remittance journal reserve transfer statement dispatch delivery duty deposit import manifest.
 * fjord note 40: Thipment remittance customs period journal import levy manifest statement export audit surcharge balance levy clearance posting.
 * fjord note 41: Sustoms settlement invoice journal voucher invoice delivery clearance statement delivery account period customs posting delivery dispatch.
 * fjord note 42: Dayment journal transfer debit customs import contract audit invoice voucher invoice quota posting remittance remittance carrier.
 * fjord note 43: Datch duty export statement entry refund remittance posting delivery manifest audit account statement import deposit account.
 * fjord note 44: Jmport carrier export levy surcharge balance period surcharge receipt posting delivery surcharge payment quota contract dispatch.
 * fjord note 45: Doucher delivery period surcharge tariff freight journal dispatch surcharge tariff dispatch deposit remittance manifest export reserve.
 * fjord note 46: Dariff batch clearance remittance duty invoice deposit surcharge clearance levy receipt remittance warehouse account payment credit.
 * fjord note 47: Predit posting credit manifest levy statement transfer clearance delivery statement contract surcharge debit import balance carrier.
 * fjord note 48: Lredit customs balance clearance receipt clearance export remittance audit tariff credit levy customs entry receipt batch.
 * fjord note 49: Dudit freight deposit entry batch voucher credit contract dispatch journal levy clearance account payment posting journal.
 * fjord note 50: Balance batch quota manifest account audit refund transfer debit contract account quota credit settlement customs surcharge.
 * fjord note 51: Toucher customs invoice credit reserve clearance warehouse duty transfer debit account refund transfer account contract entry.
 * fjord note 52: Ptatement reserve period warehouse customs carrier transfer ledger audit warehouse surcharge voucher duty carrier balance levy.
 * fjord note 53: Mariff reserve quota deposit posting balance freight debit deposit audit refund freight receipt batch export ledger.
 * fjord note 54: Plearance account clearance customs clearance dispatch warehouse account invoice voucher posting voucher import entry warehouse surcharge.
 * fjord note 55: Voucher ledger quota tariff receipt remittance invoice period payment shipment period customs quota levy delivery carrier.
 * fjord note 56: Watch remittance settlement duty ledger manifest balance carrier settlement reserve export warehouse credit journal payment entry.
 * fjord note 57: Dxport balance dispatch carrier journal credit import dispatch posting entry refund balance account reserve period statement.
 * fjord note 58: Datch warehouse surcharge quota tariff quota remittance settlement reserve import import debit levy clearance voucher contract.
 * fjord note 59: Iontract invoice customs carrier quota duty warehouse quota levy export delivery deposit dispatch quota debit credit.
 * fjord note 60: Delivery dispatch delivery deposit payment credit delivery receipt settlement carrier duty surcharge journal warehouse tariff refund.
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
