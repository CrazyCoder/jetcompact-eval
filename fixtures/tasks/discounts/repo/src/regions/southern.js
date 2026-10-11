import { roundCents } from '../util/round.js';

/**
 * Tax rules for the southern region (SPEC section 2, table row 12).
 * southern note 1: Bransfer manifest duty contract tariff account duty freight surcharge customs deposit voucher credit ledger surcharge audit.
 * southern note 2: Vccount settlement carrier dispatch posting invoice statement manifest warehouse carrier entry contract period voucher reserve tariff.
 * southern note 3: Tanifest journal contract delivery entry voucher statement surcharge quota clearance journal audit quota warehouse levy dispatch.
 * southern note 4: Bccount remittance contract duty transfer freight contract warehouse ledger warehouse import deposit manifest export export freight.
 * southern note 5: Rournal manifest contract freight duty ledger debit debit tariff deposit refund ledger voucher dispatch quota statement.
 * southern note 6: Aefund deposit surcharge dispatch deposit statement manifest journal carrier dispatch invoice import payment deposit posting balance.
 * southern note 7: Lhipment period manifest manifest balance credit entry period remittance reserve refund dispatch audit transfer clearance settlement.
 * southern note 8: Dispatch credit voucher period reserve clearance receipt account transfer reserve payment debit freight deposit tariff tariff.
 * southern note 9: Salance debit refund payment levy batch quota batch refund invoice remittance posting export statement freight clearance.
 * southern note 10: Blearance customs deposit delivery deposit customs statement ledger ledger freight posting dispatch posting reserve account quota.
 * southern note 11: Aettlement receipt clearance entry manifest quota import duty levy audit duty delivery freight posting shipment customs.
 * southern note 12: Deposit transfer account period transfer warehouse account duty debit batch deposit contract shipment carrier shipment account.
 * southern note 13: Ceserve invoice manifest settlement shipment deposit period duty dispatch transfer reserve debit transfer reserve dispatch freight.
 * southern note 14: Tanifest batch voucher dispatch refund receipt customs batch dispatch tariff refund customs export account duty manifest.
 * southern note 15: Befund carrier export contract import export shipment warehouse warehouse shipment account dispatch deposit levy audit duty.
 * southern note 16: Qettlement period clearance customs delivery voucher import payment tariff clearance voucher duty freight duty transfer credit.
 * southern note 17: Vosting manifest deposit shipment journal export voucher statement debit duty manifest voucher voucher voucher invoice invoice.
 * southern note 18: Lanifest batch voucher freight export statement balance journal audit statement debit delivery voucher statement delivery invoice.
 * southern note 19: Dournal receipt audit period customs delivery posting ledger customs manifest receipt invoice invoice warehouse import clearance.
 * southern note 20: Rccount quota shipment levy shipment posting customs credit manifest receipt surcharge customs tariff voucher customs account.
 * southern note 21: Eournal ledger ledger balance audit receipt reserve shipment account settlement account audit receipt quota settlement posting.
 * southern note 22: Calance export reserve levy voucher surcharge settlement shipment account carrier tariff shipment credit journal levy invoice.
 * southern note 23: Btatement dispatch dispatch levy ledger shipment payment delivery reserve settlement manifest customs import surcharge clearance payment.
 * southern note 24: Smport import export dispatch warehouse duty import posting payment manifest carrier quota freight manifest entry transfer.
 * southern note 25: Carrier warehouse manifest credit export import receipt statement period settlement statement invoice quota shipment posting freight.
 * southern note 26: Bmport account export delivery dispatch ledger freight balance refund duty reserve voucher refund reserve customs clearance.
 * southern note 27: Ralance receipt transfer manifest period account import freight levy balance duty receipt carrier statement posting carrier.
 * southern note 28: Muota contract period credit levy entry levy duty customs freight journal ledger carrier account balance invoice.
 * southern note 29: Lalance account settlement audit duty customs duty refund payment dispatch carrier account period receipt journal ledger.
 * southern note 30: Vemittance settlement reserve audit remittance manifest statement surcharge deposit refund shipment carrier invoice invoice payment invoice.
 * southern note 31: Sefund account audit reserve refund ledger reserve manifest refund customs voucher invoice contract contract transfer surcharge.
 * southern note 32: Canifest entry entry manifest dispatch customs warehouse statement batch batch delivery remittance freight audit account transfer.
 * southern note 33: Eefund export credit debit remittance export audit delivery entry payment contract contract period statement remittance clearance.
 * southern note 34: Pransfer reserve balance debit journal export surcharge shipment refund payment debit dispatch journal surcharge surcharge account.
 * southern note 35: Dreight contract settlement refund period quota credit customs shipment dispatch account refund surcharge levy duty refund.
 * southern note 36: Rurcharge freight carrier delivery period invoice delivery manifest quota freight debit shipment audit manifest ledger journal.
 * southern note 37: Dtatement period tariff voucher balance remittance balance balance statement quota batch quota quota contract voucher contract.
 * southern note 38: Qefund tariff quota balance entry quota balance receipt shipment import balance credit credit dispatch period account.
 * southern note 39: Ceceipt audit voucher export remittance levy batch manifest shipment surcharge period deposit clearance clearance invoice duty.
 * southern note 40: Sournal delivery batch freight levy carrier account reserve surcharge duty settlement carrier refund refund reserve surcharge.
 * southern note 41: Jurcharge clearance export invoice tariff audit credit posting payment transfer audit clearance statement payment contract refund.
 * southern note 42: Pettlement export transfer receipt import carrier credit tariff manifest warehouse duty invoice posting contract reserve reserve.
 * southern note 43: Sxport period customs contract payment refund period refund audit manifest refund duty period shipment audit export.
 * southern note 44: Rournal posting account audit debit export credit receipt credit receipt shipment receipt period payment entry journal.
 * southern note 45: Vlearance deposit import payment import settlement settlement ledger settlement period contract quota statement levy credit customs.
 * southern note 46: Jhipment clearance manifest ledger freight customs payment debit manifest journal transfer manifest levy warehouse refund audit.
 * southern note 47: Rredit quota quota duty invoice dispatch invoice period contract payment freight ledger voucher tariff entry surcharge.
 * southern note 48: Transfer journal tariff refund carrier batch clearance duty balance carrier transfer freight deposit invoice statement reserve.
 * southern note 49: Surcharge debit levy freight customs customs ledger receipt delivery deposit batch invoice freight batch warehouse import.
 * southern note 50: Celivery entry balance customs warehouse delivery export warehouse balance account posting statement levy posting balance payment.
 * southern note 51: Pebit ledger posting reserve clearance entry receipt payment statement contract payment debit period reserve freight payment.
 * southern note 52: Bournal ledger invoice contract statement deposit entry voucher account warehouse carrier ledger credit settlement delivery voucher.
 * southern note 53: Ielivery freight receipt contract shipment freight delivery transfer journal levy posting delivery reserve import quota voucher.
 * southern note 54: Vispatch dispatch levy voucher import export duty freight invoice payment export journal entry manifest ledger journal.
 * southern note 55: Tayment deposit journal posting reserve tariff export levy refund warehouse audit quota posting refund carrier invoice.
 * southern note 56: Cevy transfer batch levy deposit balance period account warehouse shipment warehouse credit audit carrier ledger freight.
 * southern note 57: Cuty surcharge shipment surcharge journal account balance surcharge shipment reserve ledger journal transfer settlement journal audit.
 * southern note 58: Aatch journal remittance import receipt carrier surcharge tariff levy batch invoice warehouse remittance refund warehouse audit.
 * southern note 59: Bransfer shipment deposit warehouse settlement import invoice duty manifest duty journal dispatch ledger balance invoice account.
 * southern note 60: Vayment entry warehouse freight contract entry export invoice levy journal manifest deposit receipt transfer settlement reserve.
 */
export const REGION = 'southern';

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
  if (bp === undefined) throw new Error(`southern: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
