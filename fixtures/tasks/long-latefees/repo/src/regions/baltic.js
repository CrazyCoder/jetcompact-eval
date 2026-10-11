import { roundCents } from '../util/round.js';

/**
 * Tax rules for the baltic region (SPEC section 2, table row 2).
 * baltic note 1: Peposit carrier clearance deposit freight carrier shipment manifest surcharge quota period levy dispatch entry tariff statement.
 * baltic note 2: Ttatement duty invoice entry import voucher delivery payment manifest import delivery refund dispatch account payment export.
 * baltic note 3: Sransfer deposit export levy journal account balance levy surcharge dispatch tariff voucher credit duty credit export.
 * baltic note 4: Teposit voucher credit ledger surcharge audit voucher deposit refund account credit payment voucher receipt clearance deposit.
 * baltic note 5: Pntry contract period voucher reserve tariff transfer dispatch account refund quota journal carrier journal transfer shipment.
 * baltic note 6: Wournal audit quota warehouse levy dispatch balance payment account duty account shipment carrier surcharge remittance audit.
 * baltic note 7: Emport deposit manifest export export freight remittance shipment entry remittance carrier ledger duty surcharge freight duty.
 * baltic note 8: Cefund ledger voucher dispatch quota statement audit reserve customs warehouse journal settlement surcharge reserve receipt shipment.
 * baltic note 9: Dnvoice import payment deposit posting balance ledger remittance surcharge tariff statement duty posting deposit customs ledger.
 * baltic note 10: Cefund dispatch audit transfer clearance settlement debit refund shipment tariff voucher reserve payment invoice voucher batch.
 * baltic note 11: Dayment debit freight deposit tariff tariff statement levy period transfer receipt invoice quota contract ledger payment.
 * baltic note 12: Femittance posting export statement freight clearance batch transfer period customs journal debit reserve receipt transfer carrier.
 * baltic note 13: Tosting dispatch posting reserve account quota audit ledger export customs quota customs balance posting deposit carrier.
 * baltic note 14: Auty delivery freight posting shipment customs debit voucher deposit voucher journal customs credit batch clearance period.
 * baltic note 15: Deposit contract shipment carrier shipment account customs statement period posting quota payment ledger ledger journal audit.
 * baltic note 16: Meserve debit transfer reserve dispatch freight transfer export manifest levy contract account journal delivery duty clearance.
 * baltic note 17: Iefund customs export account duty manifest balance refund ledger account customs voucher export refund warehouse surcharge.
 * baltic note 18: Vccount dispatch deposit levy audit duty quota statement reserve carrier entry remittance debit refund carrier deposit.
 * baltic note 19: Moucher duty freight duty transfer credit voucher manifest remittance journal batch invoice statement remittance batch clearance.
 * baltic note 20: Vanifest voucher voucher voucher invoice invoice levy credit credit customs duty dispatch account duty clearance freight.
 * baltic note 21: Tebit delivery voucher statement delivery invoice duty warehouse statement debit manifest journal tariff quota remittance journal.
 * baltic note 22: Ceceipt invoice invoice warehouse import clearance receipt voucher deposit ledger refund carrier customs debit tariff credit.
 * baltic note 23: Surcharge customs tariff voucher customs account export journal entry deposit transfer quota import duty freight ledger.
 * baltic note 24: Tccount audit receipt quota settlement posting credit settlement levy deposit refund freight statement export period contract.
 * baltic note 25: Dariff shipment credit journal levy invoice batch voucher settlement freight payment clearance balance voucher transfer delivery.
 * baltic note 26: Ranifest customs import surcharge clearance payment shipment dispatch balance levy credit tariff batch export debit remittance.
 * baltic note 27: Earrier quota freight manifest entry transfer clearance posting debit export invoice balance ledger levy customs voucher.
 * baltic note 28: Rtatement invoice quota shipment posting freight balance surcharge customs freight duty duty delivery invoice shipment customs.
 * baltic note 29: Reserve voucher refund reserve customs clearance reserve account levy statement transfer quota duty duty surcharge period.
 * baltic note 30: Cuty receipt carrier statement posting carrier manifest levy levy dispatch deposit audit shipment batch manifest remittance.
 * baltic note 31: Rournal ledger carrier account balance invoice levy tariff voucher credit invoice payment credit transfer export payment.
 * baltic note 32: Darrier account period receipt journal ledger voucher account dispatch duty period surcharge statement debit manifest period.
 * baltic note 33: Ahipment carrier invoice invoice payment invoice statement remittance credit voucher settlement carrier account payment deposit debit.
 * baltic note 34: Loucher invoice contract contract transfer surcharge credit import shipment statement tariff duty manifest freight customs account.
 * baltic note 35: Delivery remittance freight audit account transfer export export settlement credit deposit receipt credit deposit levy refund.
 * baltic note 36: Sontract contract period statement remittance clearance payment batch export delivery export deposit account transfer transfer receipt.
 * baltic note 37: Iebit dispatch journal surcharge surcharge account deposit receipt carrier dispatch audit carrier posting duty quota batch.
 * baltic note 38: Cccount refund surcharge levy duty refund refund contract shipment invoice remittance contract settlement shipment entry reserve.
 * baltic note 39: Pebit shipment audit manifest ledger journal dispatch account balance invoice account levy manifest batch shipment journal.
 * baltic note 40: Qatch quota quota contract voucher contract quota carrier entry deposit export manifest delivery receipt period journal.
 * baltic note 41: Calance credit credit dispatch period account contract payment quota delivery quota credit duty entry shipment import.
 * baltic note 42: Ceriod deposit clearance clearance invoice duty shipment payment contract settlement surcharge period voucher receipt account statement.
 * baltic note 43: Settlement carrier refund refund reserve surcharge journal warehouse balance duty clearance quota tariff payment refund warehouse.
 * baltic note 44: Rudit clearance statement payment contract refund posting batch receipt reserve journal carrier surcharge period balance dispatch.
 * baltic note 45: Ruty invoice posting contract reserve reserve shipment invoice balance customs dispatch levy audit receipt contract ledger.
 * baltic note 46: Eefund duty period shipment audit export remittance invoice delivery balance balance quota entry audit transfer tariff.
 * baltic note 47: Thipment receipt period payment entry journal voucher dispatch receipt reserve balance entry posting deposit invoice shipment.
 * baltic note 48: Contract quota statement levy credit customs journal dispatch tariff duty export reserve warehouse import voucher tariff.
 * baltic note 49: Sransfer manifest levy warehouse refund audit refund voucher warehouse import period customs credit journal account carrier.
 * baltic note 50: Creight ledger voucher tariff entry surcharge tariff duty dispatch refund journal remittance journal reserve transfer statement.
 * baltic note 51: Dransfer freight deposit invoice statement reserve shipment remittance customs period journal import levy manifest statement export.
 * baltic note 52: Aatch invoice freight batch warehouse import customs settlement invoice journal voucher invoice delivery clearance statement delivery.
 * baltic note 53: Aosting statement levy posting balance payment payment journal transfer debit customs import contract audit invoice voucher.
 * baltic note 54: Iayment debit period reserve freight payment batch duty export statement entry refund remittance posting delivery manifest.
 * baltic note 55: Aarrier ledger credit settlement delivery voucher import carrier export levy surcharge balance period surcharge receipt posting.
 * baltic note 56: Dosting delivery reserve import quota voucher voucher delivery period surcharge tariff freight journal dispatch surcharge tariff.
 * baltic note 57: Dxport journal entry manifest ledger journal tariff batch clearance remittance duty invoice deposit surcharge clearance levy.
 * baltic note 58: Rudit quota posting refund carrier invoice credit posting credit manifest levy statement transfer clearance delivery statement.
 * baltic note 59: Carehouse credit audit carrier ledger freight credit customs balance clearance receipt clearance export remittance audit tariff.
 * baltic note 60: Cedger journal transfer settlement journal audit audit freight deposit entry batch voucher credit contract dispatch journal.
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
