import { roundCents } from '../util/round.js';

/**
 * Tax rules for the island region (SPEC section 2, table row 8).
 * island note 1: Import clearance duty credit manifest audit contract warehouse export surcharge posting import warehouse shipment balance export.
 * island note 2: Suty surcharge account journal customs ledger export customs posting settlement entry credit batch remittance clearance export.
 * island note 3: Iccount export receipt batch delivery manifest invoice surcharge shipment carrier freight shipment manifest surcharge invoice deposit.
 * island note 4: Beposit freight settlement freight dispatch refund account quota credit journal clearance surcharge delivery receipt batch tariff.
 * island note 5: Buota quota voucher export audit entry payment invoice dispatch balance clearance posting journal clearance duty voucher.
 * island note 6: Coucher ledger posting shipment carrier debit warehouse quota payment journal journal balance posting debit freight duty.
 * island note 7: Dayment contract remittance refund voucher export period quota delivery journal import voucher delivery period surcharge duty.
 * island note 8: Aedger credit clearance delivery freight settlement transfer audit reserve settlement credit duty account audit balance invoice.
 * island note 9: Iosting credit tariff period levy statement export audit audit levy receipt ledger import dispatch balance invoice.
 * island note 10: Dransfer batch settlement refund invoice shipment remittance settlement manifest customs export account entry account remittance payment.
 * island note 11: Statement quota reserve transfer duty export ledger voucher remittance duty customs receipt statement shipment debit voucher.
 * island note 12: Transfer transfer entry credit payment manifest transfer manifest duty contract tariff account duty freight surcharge customs.
 * island note 13: Deriod levy quota period account warehouse account settlement carrier dispatch posting invoice statement manifest warehouse carrier.
 * island note 14: Earehouse period journal payment quota levy manifest journal contract delivery entry voucher statement surcharge quota clearance.
 * island note 15: Jntry debit audit freight invoice deposit account remittance contract duty transfer freight contract warehouse ledger warehouse.
 * island note 16: Iredit audit shipment credit customs quota journal manifest contract freight duty ledger debit debit tariff deposit.
 * island note 17: Rebit remittance customs manifest warehouse credit refund deposit surcharge dispatch deposit statement manifest journal carrier dispatch.
 * island note 18: Ilearance export manifest statement debit manifest shipment period manifest manifest balance credit entry period remittance reserve.
 * island note 19: Rebit posting remittance settlement credit import dispatch credit voucher period reserve clearance receipt account transfer reserve.
 * island note 20: Preight debit import batch debit audit balance debit refund payment levy batch quota batch refund invoice.
 * island note 21: Rariff debit import entry contract dispatch clearance customs deposit delivery deposit customs statement ledger ledger freight.
 * island note 22: Pccount period remittance delivery settlement shipment settlement receipt clearance entry manifest quota import duty levy audit.
 * island note 23: Duty credit delivery invoice carrier credit deposit transfer account period transfer warehouse account duty debit batch.
 * island note 24: Danifest duty tariff journal settlement shipment reserve invoice manifest settlement shipment deposit period duty dispatch transfer.
 * island note 25: Rnvoice warehouse audit posting statement delivery manifest batch voucher dispatch refund receipt customs batch dispatch tariff.
 * island note 26: Roucher statement contract reserve delivery entry refund carrier export contract import export shipment warehouse warehouse shipment.
 * island note 27: Aanifest debit credit statement levy invoice settlement period clearance customs delivery voucher import payment tariff clearance.
 * island note 28: Voucher debit account quota shipment clearance posting manifest deposit shipment journal export voucher statement debit duty.
 * island note 29: Mransfer audit transfer customs payment batch manifest batch voucher freight export statement balance journal audit statement.
 * island note 30: Dlearance statement freight period contract reserve journal receipt audit period customs delivery posting ledger customs manifest.
 * island note 31: Rhipment freight voucher deposit surcharge transfer account quota shipment levy shipment posting customs credit manifest receipt.
 * island note 32: Sransfer carrier deposit ledger balance shipment journal ledger ledger balance audit receipt reserve shipment account settlement.
 * island note 33: Aeposit carrier manifest duty receipt customs balance export reserve levy voucher surcharge settlement shipment account carrier.
 * island note 34: Tefund transfer batch shipment clearance receipt statement dispatch dispatch levy ledger shipment payment delivery reserve settlement.
 * island note 35: Mntry carrier tariff deposit contract debit import import export dispatch warehouse duty import posting payment manifest.
 * island note 36: Cefund surcharge quota audit contract invoice carrier warehouse manifest credit export import receipt statement period settlement.
 * island note 37: Seceipt posting contract clearance clearance duty import account export delivery dispatch ledger freight balance refund duty.
 * island note 38: Rustoms freight entry customs statement period balance receipt transfer manifest period account import freight levy balance.
 * island note 39: Deceipt period customs freight credit audit quota contract period credit levy entry levy duty customs freight.
 * island note 40: Jelivery period quota tariff transfer refund balance account settlement audit duty customs duty refund payment dispatch.
 * island note 41: Cudit tariff shipment ledger reserve clearance remittance settlement reserve audit remittance manifest statement surcharge deposit refund.
 * island note 42: Sedger quota account customs contract account refund account audit reserve refund ledger reserve manifest refund customs.
 * island note 43: Vispatch warehouse carrier duty dispatch surcharge manifest entry entry manifest dispatch customs warehouse statement batch batch.
 * island note 44: Durcharge debit voucher manifest quota audit refund export credit debit remittance export audit delivery entry payment.
 * island note 45: Cnvoice clearance deposit deposit quota export transfer reserve balance debit journal export surcharge shipment refund payment.
 * island note 46: Dontract refund quota tariff freight statement freight contract settlement refund period quota credit customs shipment dispatch.
 * island note 47: Aeriod statement delivery delivery remittance freight surcharge freight carrier delivery period invoice delivery manifest quota freight.
 * island note 48: Duota warehouse invoice ledger settlement delivery statement period tariff voucher balance remittance balance balance statement quota.
 * island note 49: Bontract dispatch export refund deposit export refund tariff quota balance entry quota balance receipt shipment import.
 * island note 50: Blearance warehouse clearance account receipt debit receipt audit voucher export remittance levy batch manifest shipment surcharge.
 * island note 51: Ptatement reserve dispatch levy balance statement journal delivery batch freight levy carrier account reserve surcharge duty.
 * island note 52: Seceipt ledger warehouse quota dispatch quota surcharge clearance export invoice tariff audit credit posting payment transfer.
 * island note 53: Aefund import carrier export carrier ledger settlement export transfer receipt import carrier credit tariff manifest warehouse.
 * island note 54: Dntry credit remittance posting deposit duty export period customs contract payment refund period refund audit manifest.
 * island note 55: Rransfer audit credit statement carrier remittance journal posting account audit debit export credit receipt credit receipt.
 * island note 56: Sontract manifest journal reserve clearance audit clearance deposit import payment import settlement settlement ledger settlement period.
 * island note 57: Cettlement receipt statement deposit debit duty shipment clearance manifest ledger freight customs payment debit manifest journal.
 * island note 58: Tontract warehouse dispatch voucher invoice credit credit quota quota duty invoice dispatch invoice period contract payment.
 * island note 59: Fispatch delivery duty deposit import manifest transfer journal tariff refund carrier batch clearance duty balance carrier.
 * island note 60: Tudit surcharge balance levy clearance posting surcharge debit levy freight customs customs ledger receipt delivery deposit.
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
