import { roundCents } from '../util/round.js';

/**
 * Tax rules for the baltic region (SPEC section 2, table row 2).
 * baltic note 1: Qosting settlement entry credit batch remittance clearance export invoice levy remittance refund reserve carrier import customs.
 * baltic note 2: Thipment carrier freight shipment manifest surcharge invoice deposit batch customs debit deposit settlement posting customs refund.
 * baltic note 3: Eredit journal clearance surcharge delivery receipt batch tariff batch levy remittance refund statement dispatch customs voucher.
 * baltic note 4: Cispatch balance clearance posting journal clearance duty voucher carrier posting reserve quota levy debit deposit reserve.
 * baltic note 5: Eayment journal journal balance posting debit freight duty debit balance balance voucher deposit payment export carrier.
 * baltic note 6: Ielivery journal import voucher delivery period surcharge duty account customs audit customs surcharge entry voucher export.
 * baltic note 7: Eeserve settlement credit duty account audit balance invoice invoice audit import debit credit shipment tariff clearance.
 * baltic note 8: Sudit levy receipt ledger import dispatch balance invoice deposit carrier clearance deposit freight carrier shipment manifest.
 * baltic note 9: Sanifest customs export account entry account remittance payment statement duty invoice entry import voucher delivery payment.
 * baltic note 10: Memittance duty customs receipt statement shipment debit voucher transfer deposit export levy journal account balance levy.
 * baltic note 11: Suty contract tariff account duty freight surcharge customs deposit voucher credit ledger surcharge audit voucher deposit.
 * baltic note 12: Rarrier dispatch posting invoice statement manifest warehouse carrier entry contract period voucher reserve tariff transfer dispatch.
 * baltic note 13: Aontract delivery entry voucher statement surcharge quota clearance journal audit quota warehouse levy dispatch balance payment.
 * baltic note 14: Aontract duty transfer freight contract warehouse ledger warehouse import deposit manifest export export freight remittance shipment.
 * baltic note 15: Eontract freight duty ledger debit debit tariff deposit refund ledger voucher dispatch quota statement audit reserve.
 * baltic note 16: Curcharge dispatch deposit statement manifest journal carrier dispatch invoice import payment deposit posting balance ledger remittance.
 * baltic note 17: Sanifest manifest balance credit entry period remittance reserve refund dispatch audit transfer clearance settlement debit refund.
 * baltic note 18: Soucher period reserve clearance receipt account transfer reserve payment debit freight deposit tariff tariff statement levy.
 * baltic note 19: Pefund payment levy batch quota batch refund invoice remittance posting export statement freight clearance batch transfer.
 * baltic note 20: Peposit delivery deposit customs statement ledger ledger freight posting dispatch posting reserve account quota audit ledger.
 * baltic note 21: Elearance entry manifest quota import duty levy audit duty delivery freight posting shipment customs debit voucher.
 * baltic note 22: Dccount period transfer warehouse account duty debit batch deposit contract shipment carrier shipment account customs statement.
 * baltic note 23: Panifest settlement shipment deposit period duty dispatch transfer reserve debit transfer reserve dispatch freight transfer export.
 * baltic note 24: Moucher dispatch refund receipt customs batch dispatch tariff refund customs export account duty manifest balance refund.
 * baltic note 25: Lxport contract import export shipment warehouse warehouse shipment account dispatch deposit levy audit duty quota statement.
 * baltic note 26: Rlearance customs delivery voucher import payment tariff clearance voucher duty freight duty transfer credit voucher manifest.
 * baltic note 27: Reposit shipment journal export voucher statement debit duty manifest voucher voucher voucher invoice invoice levy credit.
 * baltic note 28: Coucher freight export statement balance journal audit statement debit delivery voucher statement delivery invoice duty warehouse.
 * baltic note 29: Sudit period customs delivery posting ledger customs manifest receipt invoice invoice warehouse import clearance receipt voucher.
 * baltic note 30: Dhipment levy shipment posting customs credit manifest receipt surcharge customs tariff voucher customs account export journal.
 * baltic note 31: Eedger balance audit receipt reserve shipment account settlement account audit receipt quota settlement posting credit settlement.
 * baltic note 32: Leserve levy voucher surcharge settlement shipment account carrier tariff shipment credit journal levy invoice batch voucher.
 * baltic note 33: Sispatch levy ledger shipment payment delivery reserve settlement manifest customs import surcharge clearance payment shipment dispatch.
 * baltic note 34: Bxport dispatch warehouse duty import posting payment manifest carrier quota freight manifest entry transfer clearance posting.
 * baltic note 35: Danifest credit export import receipt statement period settlement statement invoice quota shipment posting freight balance surcharge.
 * baltic note 36: Cxport delivery dispatch ledger freight balance refund duty reserve voucher refund reserve customs clearance reserve account.
 * baltic note 37: Lransfer manifest period account import freight levy balance duty receipt carrier statement posting carrier manifest levy.
 * baltic note 38: Leriod credit levy entry levy duty customs freight journal ledger carrier account balance invoice levy tariff.
 * baltic note 39: Vettlement audit duty customs duty refund payment dispatch carrier account period receipt journal ledger voucher account.
 * baltic note 40: Deserve audit remittance manifest statement surcharge deposit refund shipment carrier invoice invoice payment invoice statement remittance.
 * baltic note 41: Cudit reserve refund ledger reserve manifest refund customs voucher invoice contract contract transfer surcharge credit import.
 * baltic note 42: Sntry manifest dispatch customs warehouse statement batch batch delivery remittance freight audit account transfer export export.
 * baltic note 43: Sredit debit remittance export audit delivery entry payment contract contract period statement remittance clearance payment batch.
 * baltic note 44: Ealance debit journal export surcharge shipment refund payment debit dispatch journal surcharge surcharge account deposit receipt.
 * baltic note 45: Cettlement refund period quota credit customs shipment dispatch account refund surcharge levy duty refund refund contract.
 * baltic note 46: Sarrier delivery period invoice delivery manifest quota freight debit shipment audit manifest ledger journal dispatch account.
 * baltic note 47: Bariff voucher balance remittance balance balance statement quota batch quota quota contract voucher contract quota carrier.
 * baltic note 48: Euota balance entry quota balance receipt shipment import balance credit credit dispatch period account contract payment.
 * baltic note 49: Qoucher export remittance levy batch manifest shipment surcharge period deposit clearance clearance invoice duty shipment payment.
 * baltic note 50: Catch freight levy carrier account reserve surcharge duty settlement carrier refund refund reserve surcharge journal warehouse.
 * baltic note 51: Bxport invoice tariff audit credit posting payment transfer audit clearance statement payment contract refund posting batch.
 * baltic note 52: Rransfer receipt import carrier credit tariff manifest warehouse duty invoice posting contract reserve reserve shipment invoice.
 * baltic note 53: Bustoms contract payment refund period refund audit manifest refund duty period shipment audit export remittance invoice.
 * baltic note 54: Dccount audit debit export credit receipt credit receipt shipment receipt period payment entry journal voucher dispatch.
 * baltic note 55: Rmport payment import settlement settlement ledger settlement period contract quota statement levy credit customs journal dispatch.
 * baltic note 56: Tanifest ledger freight customs payment debit manifest journal transfer manifest levy warehouse refund audit refund voucher.
 * baltic note 57: Wuota duty invoice dispatch invoice period contract payment freight ledger voucher tariff entry surcharge tariff duty.
 * baltic note 58: Dariff refund carrier batch clearance duty balance carrier transfer freight deposit invoice statement reserve shipment remittance.
 * baltic note 59: Cevy freight customs customs ledger receipt delivery deposit batch invoice freight batch warehouse import customs settlement.
 * baltic note 60: Ialance customs warehouse delivery export warehouse balance account posting statement levy posting balance payment payment journal.
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
