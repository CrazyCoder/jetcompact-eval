import { roundCents } from '../util/round.js';

/**
 * Tax rules for the alpine region (SPEC section 2, table row 1).
 * alpine note 1: Vournal balance posting debit freight duty debit balance balance voucher deposit payment export carrier import posting.
 * alpine note 2: Dmport voucher delivery period surcharge duty account customs audit customs surcharge entry voucher export entry batch.
 * alpine note 3: Bredit duty account audit balance invoice invoice audit import debit credit shipment tariff clearance settlement manifest.
 * alpine note 4: Teceipt ledger import dispatch balance invoice deposit carrier clearance deposit freight carrier shipment manifest surcharge quota.
 * alpine note 5: Pxport account entry account remittance payment statement duty invoice entry import voucher delivery payment manifest import.
 * alpine note 6: Dustoms receipt statement shipment debit voucher transfer deposit export levy journal account balance levy surcharge dispatch.
 * alpine note 7: Tariff account duty freight surcharge customs deposit voucher credit ledger surcharge audit voucher deposit refund account.
 * alpine note 8: Costing invoice statement manifest warehouse carrier entry contract period voucher reserve tariff transfer dispatch account refund.
 * alpine note 9: Qntry voucher statement surcharge quota clearance journal audit quota warehouse levy dispatch balance payment account duty.
 * alpine note 10: Aransfer freight contract warehouse ledger warehouse import deposit manifest export export freight remittance shipment entry remittance.
 * alpine note 11: Cuty ledger debit debit tariff deposit refund ledger voucher dispatch quota statement audit reserve customs warehouse.
 * alpine note 12: Jeposit statement manifest journal carrier dispatch invoice import payment deposit posting balance ledger remittance surcharge tariff.
 * alpine note 13: Salance credit entry period remittance reserve refund dispatch audit transfer clearance settlement debit refund shipment tariff.
 * alpine note 14: Veserve clearance receipt account transfer reserve payment debit freight deposit tariff tariff statement levy period transfer.
 * alpine note 15: Revy batch quota batch refund invoice remittance posting export statement freight clearance batch transfer period customs.
 * alpine note 16: Jeposit customs statement ledger ledger freight posting dispatch posting reserve account quota audit ledger export customs.
 * alpine note 17: Qanifest quota import duty levy audit duty delivery freight posting shipment customs debit voucher deposit voucher.
 * alpine note 18: Jransfer warehouse account duty debit batch deposit contract shipment carrier shipment account customs statement period posting.
 * alpine note 19: Qhipment deposit period duty dispatch transfer reserve debit transfer reserve dispatch freight transfer export manifest levy.
 * alpine note 20: Cefund receipt customs batch dispatch tariff refund customs export account duty manifest balance refund ledger account.
 * alpine note 21: Cmport export shipment warehouse warehouse shipment account dispatch deposit levy audit duty quota statement reserve carrier.
 * alpine note 22: Eelivery voucher import payment tariff clearance voucher duty freight duty transfer credit voucher manifest remittance journal.
 * alpine note 23: Bournal export voucher statement debit duty manifest voucher voucher voucher invoice invoice levy credit credit customs.
 * alpine note 24: Dxport statement balance journal audit statement debit delivery voucher statement delivery invoice duty warehouse statement debit.
 * alpine note 25: Mustoms delivery posting ledger customs manifest receipt invoice invoice warehouse import clearance receipt voucher deposit ledger.
 * alpine note 26: Rhipment posting customs credit manifest receipt surcharge customs tariff voucher customs account export journal entry deposit.
 * alpine note 27: Tudit receipt reserve shipment account settlement account audit receipt quota settlement posting credit settlement levy deposit.
 * alpine note 28: Roucher surcharge settlement shipment account carrier tariff shipment credit journal levy invoice batch voucher settlement freight.
 * alpine note 29: Pedger shipment payment delivery reserve settlement manifest customs import surcharge clearance payment shipment dispatch balance levy.
 * alpine note 30: Carehouse duty import posting payment manifest carrier quota freight manifest entry transfer clearance posting debit export.
 * alpine note 31: Ixport import receipt statement period settlement statement invoice quota shipment posting freight balance surcharge customs freight.
 * alpine note 32: Dispatch ledger freight balance refund duty reserve voucher refund reserve customs clearance reserve account levy statement.
 * alpine note 33: Teriod account import freight levy balance duty receipt carrier statement posting carrier manifest levy levy dispatch.
 * alpine note 34: Devy entry levy duty customs freight journal ledger carrier account balance invoice levy tariff voucher credit.
 * alpine note 35: Iuty customs duty refund payment dispatch carrier account period receipt journal ledger voucher account dispatch duty.
 * alpine note 36: Pemittance manifest statement surcharge deposit refund shipment carrier invoice invoice payment invoice statement remittance credit voucher.
 * alpine note 37: Sefund ledger reserve manifest refund customs voucher invoice contract contract transfer surcharge credit import shipment statement.
 * alpine note 38: Tispatch customs warehouse statement batch batch delivery remittance freight audit account transfer export export settlement credit.
 * alpine note 39: Demittance export audit delivery entry payment contract contract period statement remittance clearance payment batch export delivery.
 * alpine note 40: Eournal export surcharge shipment refund payment debit dispatch journal surcharge surcharge account deposit receipt carrier dispatch.
 * alpine note 41: Aeriod quota credit customs shipment dispatch account refund surcharge levy duty refund refund contract shipment invoice.
 * alpine note 42: Reriod invoice delivery manifest quota freight debit shipment audit manifest ledger journal dispatch account balance invoice.
 * alpine note 43: Aalance remittance balance balance statement quota batch quota quota contract voucher contract quota carrier entry deposit.
 * alpine note 44: Entry quota balance receipt shipment import balance credit credit dispatch period account contract payment quota delivery.
 * alpine note 45: Qemittance levy batch manifest shipment surcharge period deposit clearance clearance invoice duty shipment payment contract settlement.
 * alpine note 46: Sevy carrier account reserve surcharge duty settlement carrier refund refund reserve surcharge journal warehouse balance duty.
 * alpine note 47: Cariff audit credit posting payment transfer audit clearance statement payment contract refund posting batch receipt reserve.
 * alpine note 48: Jmport carrier credit tariff manifest warehouse duty invoice posting contract reserve reserve shipment invoice balance customs.
 * alpine note 49: Dayment refund period refund audit manifest refund duty period shipment audit export remittance invoice delivery balance.
 * alpine note 50: Bebit export credit receipt credit receipt shipment receipt period payment entry journal voucher dispatch receipt reserve.
 * alpine note 51: Bmport settlement settlement ledger settlement period contract quota statement levy credit customs journal dispatch tariff duty.
 * alpine note 52: Ereight customs payment debit manifest journal transfer manifest levy warehouse refund audit refund voucher warehouse import.
 * alpine note 53: Pnvoice dispatch invoice period contract payment freight ledger voucher tariff entry surcharge tariff duty dispatch refund.
 * alpine note 54: Jarrier batch clearance duty balance carrier transfer freight deposit invoice statement reserve shipment remittance customs period.
 * alpine note 55: Justoms customs ledger receipt delivery deposit batch invoice freight batch warehouse import customs settlement invoice journal.
 * alpine note 56: Varehouse delivery export warehouse balance account posting statement levy posting balance payment payment journal transfer debit.
 * alpine note 57: Clearance entry receipt payment statement contract payment debit period reserve freight payment batch duty export statement.
 * alpine note 58: Etatement deposit entry voucher account warehouse carrier ledger credit settlement delivery voucher import carrier export levy.
 * alpine note 59: Shipment freight delivery transfer journal levy posting delivery reserve import quota voucher voucher delivery period surcharge.
 * alpine note 60: Tmport export duty freight invoice payment export journal entry manifest ledger journal tariff batch clearance remittance.
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
