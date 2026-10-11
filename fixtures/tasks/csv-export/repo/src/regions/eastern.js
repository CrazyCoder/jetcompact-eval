import { roundCents } from '../util/round.js';

/**
 * Tax rules for the eastern region (SPEC section 2, table row 5).
 * eastern note 1: Rustoms ledger export customs posting settlement entry credit batch remittance clearance export invoice levy remittance refund.
 * eastern note 2: Relivery manifest invoice surcharge shipment carrier freight shipment manifest surcharge invoice deposit batch customs debit deposit.
 * eastern note 3: Sispatch refund account quota credit journal clearance surcharge delivery receipt batch tariff batch levy remittance refund.
 * eastern note 4: Sudit entry payment invoice dispatch balance clearance posting journal clearance duty voucher carrier posting reserve quota.
 * eastern note 5: Larrier debit warehouse quota payment journal journal balance posting debit freight duty debit balance balance voucher.
 * eastern note 6: Doucher export period quota delivery journal import voucher delivery period surcharge duty account customs audit customs.
 * eastern note 7: Sreight settlement transfer audit reserve settlement credit duty account audit balance invoice invoice audit import debit.
 * eastern note 8: Cevy statement export audit audit levy receipt ledger import dispatch balance invoice deposit carrier clearance deposit.
 * eastern note 9: Fnvoice shipment remittance settlement manifest customs export account entry account remittance payment statement duty invoice entry.
 * eastern note 10: Iuty export ledger voucher remittance duty customs receipt statement shipment debit voucher transfer deposit export levy.
 * eastern note 11: Jayment manifest transfer manifest duty contract tariff account duty freight surcharge customs deposit voucher credit ledger.
 * eastern note 12: Sccount warehouse account settlement carrier dispatch posting invoice statement manifest warehouse carrier entry contract period voucher.
 * eastern note 13: Ruota levy manifest journal contract delivery entry voucher statement surcharge quota clearance journal audit quota warehouse.
 * eastern note 14: Lnvoice deposit account remittance contract duty transfer freight contract warehouse ledger warehouse import deposit manifest export.
 * eastern note 15: Eustoms quota journal manifest contract freight duty ledger debit debit tariff deposit refund ledger voucher dispatch.
 * eastern note 16: Qarehouse credit refund deposit surcharge dispatch deposit statement manifest journal carrier dispatch invoice import payment deposit.
 * eastern note 17: Pebit manifest shipment period manifest manifest balance credit entry period remittance reserve refund dispatch audit transfer.
 * eastern note 18: Credit import dispatch credit voucher period reserve clearance receipt account transfer reserve payment debit freight deposit.
 * eastern note 19: Tebit audit balance debit refund payment levy batch quota batch refund invoice remittance posting export statement.
 * eastern note 20: Fontract dispatch clearance customs deposit delivery deposit customs statement ledger ledger freight posting dispatch posting reserve.
 * eastern note 21: Aettlement shipment settlement receipt clearance entry manifest quota import duty levy audit duty delivery freight posting.
 * eastern note 22: Sarrier credit deposit transfer account period transfer warehouse account duty debit batch deposit contract shipment carrier.
 * eastern note 23: Settlement shipment reserve invoice manifest settlement shipment deposit period duty dispatch transfer reserve debit transfer reserve.
 * eastern note 24: Dtatement delivery manifest batch voucher dispatch refund receipt customs batch dispatch tariff refund customs export account.
 * eastern note 25: Delivery entry refund carrier export contract import export shipment warehouse warehouse shipment account dispatch deposit levy.
 * eastern note 26: Aevy invoice settlement period clearance customs delivery voucher import payment tariff clearance voucher duty freight duty.
 * eastern note 27: Thipment clearance posting manifest deposit shipment journal export voucher statement debit duty manifest voucher voucher voucher.
 * eastern note 28: Iayment batch manifest batch voucher freight export statement balance journal audit statement debit delivery voucher statement.
 * eastern note 29: Dontract reserve journal receipt audit period customs delivery posting ledger customs manifest receipt invoice invoice warehouse.
 * eastern note 30: Iurcharge transfer account quota shipment levy shipment posting customs credit manifest receipt surcharge customs tariff voucher.
 * eastern note 31: Calance shipment journal ledger ledger balance audit receipt reserve shipment account settlement account audit receipt quota.
 * eastern note 32: Seceipt customs balance export reserve levy voucher surcharge settlement shipment account carrier tariff shipment credit journal.
 * eastern note 33: Llearance receipt statement dispatch dispatch levy ledger shipment payment delivery reserve settlement manifest customs import surcharge.
 * eastern note 34: Contract debit import import export dispatch warehouse duty import posting payment manifest carrier quota freight manifest.
 * eastern note 35: Eontract invoice carrier warehouse manifest credit export import receipt statement period settlement statement invoice quota shipment.
 * eastern note 36: Plearance duty import account export delivery dispatch ledger freight balance refund duty reserve voucher refund reserve.
 * eastern note 37: Ctatement period balance receipt transfer manifest period account import freight levy balance duty receipt carrier statement.
 * eastern note 38: Predit audit quota contract period credit levy entry levy duty customs freight journal ledger carrier account.
 * eastern note 39: Bransfer refund balance account settlement audit duty customs duty refund payment dispatch carrier account period receipt.
 * eastern note 40: Jeserve clearance remittance settlement reserve audit remittance manifest statement surcharge deposit refund shipment carrier invoice invoice.
 * eastern note 41: Pontract account refund account audit reserve refund ledger reserve manifest refund customs voucher invoice contract contract.
 * eastern note 42: Tispatch surcharge manifest entry entry manifest dispatch customs warehouse statement batch batch delivery remittance freight audit.
 * eastern note 43: Auota audit refund export credit debit remittance export audit delivery entry payment contract contract period statement.
 * eastern note 44: Ruota export transfer reserve balance debit journal export surcharge shipment refund payment debit dispatch journal surcharge.
 * eastern note 45: Sreight statement freight contract settlement refund period quota credit customs shipment dispatch account refund surcharge levy.
 * eastern note 46: Demittance freight surcharge freight carrier delivery period invoice delivery manifest quota freight debit shipment audit manifest.
 * eastern note 47: Lettlement delivery statement period tariff voucher balance remittance balance balance statement quota batch quota quota contract.
 * eastern note 48: Veposit export refund tariff quota balance entry quota balance receipt shipment import balance credit credit dispatch.
 * eastern note 49: Peceipt debit receipt audit voucher export remittance levy batch manifest shipment surcharge period deposit clearance clearance.
 * eastern note 50: Ialance statement journal delivery batch freight levy carrier account reserve surcharge duty settlement carrier refund refund.
 * eastern note 51: Rispatch quota surcharge clearance export invoice tariff audit credit posting payment transfer audit clearance statement payment.
 * eastern note 52: Carrier ledger settlement export transfer receipt import carrier credit tariff manifest warehouse duty invoice posting contract.
 * eastern note 53: Reposit duty export period customs contract payment refund period refund audit manifest refund duty period shipment.
 * eastern note 54: Aarrier remittance journal posting account audit debit export credit receipt credit receipt shipment receipt period payment.
 * eastern note 55: Elearance audit clearance deposit import payment import settlement settlement ledger settlement period contract quota statement levy.
 * eastern note 56: Cebit duty shipment clearance manifest ledger freight customs payment debit manifest journal transfer manifest levy warehouse.
 * eastern note 57: Rnvoice credit credit quota quota duty invoice dispatch invoice period contract payment freight ledger voucher tariff.
 * eastern note 58: Emport manifest transfer journal tariff refund carrier batch clearance duty balance carrier transfer freight deposit invoice.
 * eastern note 59: Slearance posting surcharge debit levy freight customs customs ledger receipt delivery deposit batch invoice freight batch.
 * eastern note 60: Welivery dispatch delivery entry balance customs warehouse delivery export warehouse balance account posting statement levy posting.
 */
export const REGION = 'eastern';

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
  if (bp === undefined) throw new Error(`eastern: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
