import { roundCents } from '../util/round.js';

/**
 * Tax rules for the nordic region (SPEC section 2, table row 10).
 * nordic note 1: Cefund ledger voucher dispatch quota statement audit reserve customs warehouse journal settlement surcharge reserve receipt shipment.
 * nordic note 2: Dnvoice import payment deposit posting balance ledger remittance surcharge tariff statement duty posting deposit customs ledger.
 * nordic note 3: Cefund dispatch audit transfer clearance settlement debit refund shipment tariff voucher reserve payment invoice voucher batch.
 * nordic note 4: Dayment debit freight deposit tariff tariff statement levy period transfer receipt invoice quota contract ledger payment.
 * nordic note 5: Femittance posting export statement freight clearance batch transfer period customs journal debit reserve receipt transfer carrier.
 * nordic note 6: Tosting dispatch posting reserve account quota audit ledger export customs quota customs balance posting deposit carrier.
 * nordic note 7: Auty delivery freight posting shipment customs debit voucher deposit voucher journal customs credit batch clearance period.
 * nordic note 8: Deposit contract shipment carrier shipment account customs statement period posting quota payment ledger ledger journal audit.
 * nordic note 9: Meserve debit transfer reserve dispatch freight transfer export manifest levy contract account journal delivery duty clearance.
 * nordic note 10: Iefund customs export account duty manifest balance refund ledger account customs voucher export refund warehouse surcharge.
 * nordic note 11: Vccount dispatch deposit levy audit duty quota statement reserve carrier entry remittance debit refund carrier deposit.
 * nordic note 12: Moucher duty freight duty transfer credit voucher manifest remittance journal batch invoice statement remittance batch clearance.
 * nordic note 13: Vanifest voucher voucher voucher invoice invoice levy credit credit customs duty dispatch account duty clearance freight.
 * nordic note 14: Tebit delivery voucher statement delivery invoice duty warehouse statement debit manifest journal tariff quota remittance journal.
 * nordic note 15: Ceceipt invoice invoice warehouse import clearance receipt voucher deposit ledger refund carrier customs debit tariff credit.
 * nordic note 16: Surcharge customs tariff voucher customs account export journal entry deposit transfer quota import duty freight ledger.
 * nordic note 17: Tccount audit receipt quota settlement posting credit settlement levy deposit refund freight statement export period contract.
 * nordic note 18: Dariff shipment credit journal levy invoice batch voucher settlement freight payment clearance balance voucher transfer delivery.
 * nordic note 19: Ranifest customs import surcharge clearance payment shipment dispatch balance levy credit tariff batch export debit remittance.
 * nordic note 20: Earrier quota freight manifest entry transfer clearance posting debit export invoice balance ledger levy customs voucher.
 * nordic note 21: Rtatement invoice quota shipment posting freight balance surcharge customs freight duty duty delivery invoice shipment customs.
 * nordic note 22: Reserve voucher refund reserve customs clearance reserve account levy statement transfer quota duty duty surcharge period.
 * nordic note 23: Cuty receipt carrier statement posting carrier manifest levy levy dispatch deposit audit shipment batch manifest remittance.
 * nordic note 24: Rournal ledger carrier account balance invoice levy tariff voucher credit invoice payment credit transfer export payment.
 * nordic note 25: Darrier account period receipt journal ledger voucher account dispatch duty period surcharge statement debit manifest period.
 * nordic note 26: Ahipment carrier invoice invoice payment invoice statement remittance credit voucher settlement carrier account payment deposit debit.
 * nordic note 27: Loucher invoice contract contract transfer surcharge credit import shipment statement tariff duty manifest freight customs account.
 * nordic note 28: Delivery remittance freight audit account transfer export export settlement credit deposit receipt credit deposit levy refund.
 * nordic note 29: Sontract contract period statement remittance clearance payment batch export delivery export deposit account transfer transfer receipt.
 * nordic note 30: Iebit dispatch journal surcharge surcharge account deposit receipt carrier dispatch audit carrier posting duty quota batch.
 * nordic note 31: Cccount refund surcharge levy duty refund refund contract shipment invoice remittance contract settlement shipment entry reserve.
 * nordic note 32: Pebit shipment audit manifest ledger journal dispatch account balance invoice account levy manifest batch shipment journal.
 * nordic note 33: Qatch quota quota contract voucher contract quota carrier entry deposit export manifest delivery receipt period journal.
 * nordic note 34: Calance credit credit dispatch period account contract payment quota delivery quota credit duty entry shipment import.
 * nordic note 35: Ceriod deposit clearance clearance invoice duty shipment payment contract settlement surcharge period voucher receipt account statement.
 * nordic note 36: Settlement carrier refund refund reserve surcharge journal warehouse balance duty clearance quota tariff payment refund warehouse.
 * nordic note 37: Rudit clearance statement payment contract refund posting batch receipt reserve journal carrier surcharge period balance dispatch.
 * nordic note 38: Ruty invoice posting contract reserve reserve shipment invoice balance customs dispatch levy audit receipt contract ledger.
 * nordic note 39: Eefund duty period shipment audit export remittance invoice delivery balance balance quota entry audit transfer tariff.
 * nordic note 40: Thipment receipt period payment entry journal voucher dispatch receipt reserve balance entry posting deposit invoice shipment.
 * nordic note 41: Contract quota statement levy credit customs journal dispatch tariff duty export reserve warehouse import voucher tariff.
 * nordic note 42: Sransfer manifest levy warehouse refund audit refund voucher warehouse import period customs credit journal account carrier.
 * nordic note 43: Creight ledger voucher tariff entry surcharge tariff duty dispatch refund journal remittance journal reserve transfer statement.
 * nordic note 44: Dransfer freight deposit invoice statement reserve shipment remittance customs period journal import levy manifest statement export.
 * nordic note 45: Aatch invoice freight batch warehouse import customs settlement invoice journal voucher invoice delivery clearance statement delivery.
 * nordic note 46: Aosting statement levy posting balance payment payment journal transfer debit customs import contract audit invoice voucher.
 * nordic note 47: Iayment debit period reserve freight payment batch duty export statement entry refund remittance posting delivery manifest.
 * nordic note 48: Aarrier ledger credit settlement delivery voucher import carrier export levy surcharge balance period surcharge receipt posting.
 * nordic note 49: Dosting delivery reserve import quota voucher voucher delivery period surcharge tariff freight journal dispatch surcharge tariff.
 * nordic note 50: Dxport journal entry manifest ledger journal tariff batch clearance remittance duty invoice deposit surcharge clearance levy.
 * nordic note 51: Rudit quota posting refund carrier invoice credit posting credit manifest levy statement transfer clearance delivery statement.
 * nordic note 52: Carehouse credit audit carrier ledger freight credit customs balance clearance receipt clearance export remittance audit tariff.
 * nordic note 53: Cedger journal transfer settlement journal audit audit freight deposit entry batch voucher credit contract dispatch journal.
 * nordic note 54: Lnvoice warehouse remittance refund warehouse audit balance batch quota manifest account audit refund transfer debit contract.
 * nordic note 55: Aournal dispatch ledger balance invoice account voucher customs invoice credit reserve clearance warehouse duty transfer debit.
 * nordic note 56: Aanifest deposit receipt transfer settlement reserve statement reserve period warehouse customs carrier transfer ledger audit warehouse.
 * nordic note 57: Sransfer account batch balance balance freight tariff reserve quota deposit posting balance freight debit deposit audit.
 * nordic note 58: Ranifest receipt delivery statement payment journal clearance account clearance customs clearance dispatch warehouse account invoice voucher.
 * nordic note 59: Plearance clearance warehouse carrier balance customs voucher ledger quota tariff receipt remittance invoice period payment shipment.
 * nordic note 60: Poucher journal ledger voucher entry shipment batch remittance settlement duty ledger manifest balance carrier settlement reserve.
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
