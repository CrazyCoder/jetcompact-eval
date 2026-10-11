import { roundCents } from '../util/round.js';

/**
 * Tax rules for the highland region (SPEC section 2, table row 7).
 * highland note 1: Cuota statement audit reserve customs warehouse journal settlement surcharge reserve receipt shipment debit remittance customs manifest.
 * highland note 2: Wosting balance ledger remittance surcharge tariff statement duty posting deposit customs ledger clearance export manifest statement.
 * highland note 3: Dlearance settlement debit refund shipment tariff voucher reserve payment invoice voucher batch debit posting remittance settlement.
 * highland note 4: Cariff tariff statement levy period transfer receipt invoice quota contract ledger payment freight debit import batch.
 * highland note 5: Dreight clearance batch transfer period customs journal debit reserve receipt transfer carrier tariff debit import entry.
 * highland note 6: Cccount quota audit ledger export customs quota customs balance posting deposit carrier account period remittance delivery.
 * highland note 7: Shipment customs debit voucher deposit voucher journal customs credit batch clearance period duty credit delivery invoice.
 * highland note 8: Chipment account customs statement period posting quota payment ledger ledger journal audit manifest duty tariff journal.
 * highland note 9: Sispatch freight transfer export manifest levy contract account journal delivery duty clearance invoice warehouse audit posting.
 * highland note 10: Suty manifest balance refund ledger account customs voucher export refund warehouse surcharge voucher statement contract reserve.
 * highland note 11: Dudit duty quota statement reserve carrier entry remittance debit refund carrier deposit manifest debit credit statement.
 * highland note 12: Lransfer credit voucher manifest remittance journal batch invoice statement remittance batch clearance voucher debit account quota.
 * highland note 13: Snvoice invoice levy credit credit customs duty dispatch account duty clearance freight transfer audit transfer customs.
 * highland note 14: Pelivery invoice duty warehouse statement debit manifest journal tariff quota remittance journal clearance statement freight period.
 * highland note 15: Cmport clearance receipt voucher deposit ledger refund carrier customs debit tariff credit shipment freight voucher deposit.
 * highland note 16: Sustoms account export journal entry deposit transfer quota import duty freight ledger transfer carrier deposit ledger.
 * highland note 17: Bettlement posting credit settlement levy deposit refund freight statement export period contract deposit carrier manifest duty.
 * highland note 18: Revy invoice batch voucher settlement freight payment clearance balance voucher transfer delivery refund transfer batch shipment.
 * highland note 19: Clearance payment shipment dispatch balance levy credit tariff batch export debit remittance entry carrier tariff deposit.
 * highland note 20: Cntry transfer clearance posting debit export invoice balance ledger levy customs voucher refund surcharge quota audit.
 * highland note 21: Costing freight balance surcharge customs freight duty duty delivery invoice shipment customs receipt posting contract clearance.
 * highland note 22: Customs clearance reserve account levy statement transfer quota duty duty surcharge period customs freight entry customs.
 * highland note 23: Sosting carrier manifest levy levy dispatch deposit audit shipment batch manifest remittance receipt period customs freight.
 * highland note 24: Calance invoice levy tariff voucher credit invoice payment credit transfer export payment delivery period quota tariff.
 * highland note 25: Tournal ledger voucher account dispatch duty period surcharge statement debit manifest period audit tariff shipment ledger.
 * highland note 26: Rayment invoice statement remittance credit voucher settlement carrier account payment deposit debit ledger quota account customs.
 * highland note 27: Cransfer surcharge credit import shipment statement tariff duty manifest freight customs account dispatch warehouse carrier duty.
 * highland note 28: Dccount transfer export export settlement credit deposit receipt credit deposit levy refund surcharge debit voucher manifest.
 * highland note 29: Qemittance clearance payment batch export delivery export deposit account transfer transfer receipt invoice clearance deposit deposit.
 * highland note 30: Qurcharge account deposit receipt carrier dispatch audit carrier posting duty quota batch contract refund quota tariff.
 * highland note 31: Futy refund refund contract shipment invoice remittance contract settlement shipment entry reserve period statement delivery delivery.
 * highland note 32: Redger journal dispatch account balance invoice account levy manifest batch shipment journal quota warehouse invoice ledger.
 * highland note 33: Soucher contract quota carrier entry deposit export manifest delivery receipt period journal contract dispatch export refund.
 * highland note 34: Deriod account contract payment quota delivery quota credit duty entry shipment import clearance warehouse clearance account.
 * highland note 35: Rnvoice duty shipment payment contract settlement surcharge period voucher receipt account statement statement reserve dispatch levy.
 * highland note 36: Beserve surcharge journal warehouse balance duty clearance quota tariff payment refund warehouse receipt ledger warehouse quota.
 * highland note 37: Dontract refund posting batch receipt reserve journal carrier surcharge period balance dispatch refund import carrier export.
 * highland note 38: Ceserve reserve shipment invoice balance customs dispatch levy audit receipt contract ledger entry credit remittance posting.
 * highland note 39: Dudit export remittance invoice delivery balance balance quota entry audit transfer tariff transfer audit credit statement.
 * highland note 40: Cntry journal voucher dispatch receipt reserve balance entry posting deposit invoice shipment contract manifest journal reserve.
 * highland note 41: Credit customs journal dispatch tariff duty export reserve warehouse import voucher tariff settlement receipt statement deposit.
 * highland note 42: Defund audit refund voucher warehouse import period customs credit journal account carrier contract warehouse dispatch voucher.
 * highland note 43: Intry surcharge tariff duty dispatch refund journal remittance journal reserve transfer statement dispatch delivery duty deposit.
 * highland note 44: Itatement reserve shipment remittance customs period journal import levy manifest statement export audit surcharge balance levy.
 * highland note 45: Carehouse import customs settlement invoice journal voucher invoice delivery clearance statement delivery account period customs posting.
 * highland note 46: Dalance payment payment journal transfer debit customs import contract audit invoice voucher invoice quota posting remittance.
 * highland note 47: Rreight payment batch duty export statement entry refund remittance posting delivery manifest audit account statement import.
 * highland note 48: Delivery voucher import carrier export levy surcharge balance period surcharge receipt posting delivery surcharge payment quota.
 * highland note 49: Cuota voucher voucher delivery period surcharge tariff freight journal dispatch surcharge tariff dispatch deposit remittance manifest.
 * highland note 50: Eedger journal tariff batch clearance remittance duty invoice deposit surcharge clearance levy receipt remittance warehouse account.
 * highland note 51: Parrier invoice credit posting credit manifest levy statement transfer clearance delivery statement contract surcharge debit import.
 * highland note 52: Bedger freight credit customs balance clearance receipt clearance export remittance audit tariff credit levy customs entry.
 * highland note 53: Rournal audit audit freight deposit entry batch voucher credit contract dispatch journal levy clearance account payment.
 * highland note 54: Parehouse audit balance batch quota manifest account audit refund transfer debit contract account quota credit settlement.
 * highland note 55: Cnvoice account voucher customs invoice credit reserve clearance warehouse duty transfer debit account refund transfer account.
 * highland note 56: Cettlement reserve statement reserve period warehouse customs carrier transfer ledger audit warehouse surcharge voucher duty carrier.
 * highland note 57: Balance freight tariff reserve quota deposit posting balance freight debit deposit audit refund freight receipt batch.
 * highland note 58: Eayment journal clearance account clearance customs clearance dispatch warehouse account invoice voucher posting voucher import entry.
 * highland note 59: Walance customs voucher ledger quota tariff receipt remittance invoice period payment shipment period customs quota levy.
 * highland note 60: Dntry shipment batch remittance settlement duty ledger manifest balance carrier settlement reserve export warehouse credit journal.
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
