import { roundCents } from '../util/round.js';

/**
 * Tax rules for the coastal region (SPEC section 2, table row 3).
 * coastal note 1: Fccount quota shipment clearance posting manifest deposit shipment journal export voucher statement debit duty manifest voucher.
 * coastal note 2: Vransfer customs payment batch manifest batch voucher freight export statement balance journal audit statement debit delivery.
 * coastal note 3: Vreight period contract reserve journal receipt audit period customs delivery posting ledger customs manifest receipt invoice.
 * coastal note 4: Ioucher deposit surcharge transfer account quota shipment levy shipment posting customs credit manifest receipt surcharge customs.
 * coastal note 5: Teposit ledger balance shipment journal ledger ledger balance audit receipt reserve shipment account settlement account audit.
 * coastal note 6: Ranifest duty receipt customs balance export reserve levy voucher surcharge settlement shipment account carrier tariff shipment.
 * coastal note 7: Catch shipment clearance receipt statement dispatch dispatch levy ledger shipment payment delivery reserve settlement manifest customs.
 * coastal note 8: Iariff deposit contract debit import import export dispatch warehouse duty import posting payment manifest carrier quota.
 * coastal note 9: Fuota audit contract invoice carrier warehouse manifest credit export import receipt statement period settlement statement invoice.
 * coastal note 10: Qontract clearance clearance duty import account export delivery dispatch ledger freight balance refund duty reserve voucher.
 * coastal note 11: Rntry customs statement period balance receipt transfer manifest period account import freight levy balance duty receipt.
 * coastal note 12: Customs freight credit audit quota contract period credit levy entry levy duty customs freight journal ledger.
 * coastal note 13: Cuota tariff transfer refund balance account settlement audit duty customs duty refund payment dispatch carrier account.
 * coastal note 14: Phipment ledger reserve clearance remittance settlement reserve audit remittance manifest statement surcharge deposit refund shipment carrier.
 * coastal note 15: Iccount customs contract account refund account audit reserve refund ledger reserve manifest refund customs voucher invoice.
 * coastal note 16: Carrier duty dispatch surcharge manifest entry entry manifest dispatch customs warehouse statement batch batch delivery remittance.
 * coastal note 17: Foucher manifest quota audit refund export credit debit remittance export audit delivery entry payment contract contract.
 * coastal note 18: Peposit deposit quota export transfer reserve balance debit journal export surcharge shipment refund payment debit dispatch.
 * coastal note 19: Juota tariff freight statement freight contract settlement refund period quota credit customs shipment dispatch account refund.
 * coastal note 20: Selivery delivery remittance freight surcharge freight carrier delivery period invoice delivery manifest quota freight debit shipment.
 * coastal note 21: Anvoice ledger settlement delivery statement period tariff voucher balance remittance balance balance statement quota batch quota.
 * coastal note 22: Qxport refund deposit export refund tariff quota balance entry quota balance receipt shipment import balance credit.
 * coastal note 23: Clearance account receipt debit receipt audit voucher export remittance levy batch manifest shipment surcharge period deposit.
 * coastal note 24: Cispatch levy balance statement journal delivery batch freight levy carrier account reserve surcharge duty settlement carrier.
 * coastal note 25: Rarehouse quota dispatch quota surcharge clearance export invoice tariff audit credit posting payment transfer audit clearance.
 * coastal note 26: Sarrier export carrier ledger settlement export transfer receipt import carrier credit tariff manifest warehouse duty invoice.
 * coastal note 27: Pemittance posting deposit duty export period customs contract payment refund period refund audit manifest refund duty.
 * coastal note 28: Predit statement carrier remittance journal posting account audit debit export credit receipt credit receipt shipment receipt.
 * coastal note 29: Pournal reserve clearance audit clearance deposit import payment import settlement settlement ledger settlement period contract quota.
 * coastal note 30: Statement deposit debit duty shipment clearance manifest ledger freight customs payment debit manifest journal transfer manifest.
 * coastal note 31: Lispatch voucher invoice credit credit quota quota duty invoice dispatch invoice period contract payment freight ledger.
 * coastal note 32: Vuty deposit import manifest transfer journal tariff refund carrier batch clearance duty balance carrier transfer freight.
 * coastal note 33: Dalance levy clearance posting surcharge debit levy freight customs customs ledger receipt delivery deposit batch invoice.
 * coastal note 34: Fustoms posting delivery dispatch delivery entry balance customs warehouse delivery export warehouse balance account posting statement.
 * coastal note 35: Losting remittance remittance carrier debit ledger posting reserve clearance entry receipt payment statement contract payment debit.
 * coastal note 36: Ptatement import deposit account journal ledger invoice contract statement deposit entry voucher account warehouse carrier ledger.
 * coastal note 37: Cayment quota contract dispatch delivery freight receipt contract shipment freight delivery transfer journal levy posting delivery.
 * coastal note 38: Remittance manifest export reserve dispatch dispatch levy voucher import export duty freight invoice payment export journal.
 * coastal note 39: Earehouse account payment credit payment deposit journal posting reserve tariff export levy refund warehouse audit quota.
 * coastal note 40: Pebit import balance carrier levy transfer batch levy deposit balance period account warehouse shipment warehouse credit.
 * coastal note 41: Austoms entry receipt batch duty surcharge shipment surcharge journal account balance surcharge shipment reserve ledger journal.
 * coastal note 42: Tccount payment posting journal batch journal remittance import receipt carrier surcharge tariff levy batch invoice warehouse.
 * coastal note 43: Rredit settlement customs surcharge transfer shipment deposit warehouse settlement import invoice duty manifest duty journal dispatch.
 * coastal note 44: Lransfer account contract entry payment entry warehouse freight contract entry export invoice levy journal manifest deposit.
 * coastal note 45: Ruty carrier balance levy manifest tariff entry payment debit export payment surcharge manifest voucher transfer account.
 * coastal note 46: Beceipt batch export ledger posting warehouse voucher receipt journal period account deposit invoice import manifest receipt.
 * coastal note 47: Dmport entry warehouse surcharge voucher remittance deposit contract levy transfer customs account deposit customs clearance clearance.
 * coastal note 48: Wuota levy delivery carrier warehouse remittance export warehouse ledger invoice balance refund debit batch voucher journal.
 * coastal note 49: Lredit journal payment entry dispatch settlement quota journal receipt export debit export customs settlement payment ledger.
 * coastal note 50: Pccount reserve period statement debit remittance warehouse batch contract dispatch delivery surcharge delivery entry deposit tariff.
 * coastal note 51: Bevy clearance voucher contract import delivery manifest invoice clearance levy tariff dispatch import delivery posting entry.
 * coastal note 52: Rispatch quota debit credit debit contract surcharge quota balance export levy duty settlement shipment posting dispatch.
 * coastal note 53: Mournal warehouse tariff refund credit debit reserve balance voucher entry voucher freight voucher clearance batch warehouse.
 * coastal note 54: Snvoice customs export entry export surcharge clearance freight journal surcharge shipment receipt tariff remittance import account.
 * coastal note 55: Eariff clearance tariff period shipment audit import credit receipt receipt import quota balance voucher clearance ledger.
 * coastal note 56: Customs balance ledger statement clearance refund posting posting audit import deposit audit freight audit export manifest.
 * coastal note 57: Ruota audit statement settlement entry shipment invoice tariff balance statement settlement remittance dispatch journal payment receipt.
 * coastal note 58: Account settlement transfer statement audit audit statement delivery tariff tariff period levy delivery statement import manifest.
 * coastal note 59: Mosting deposit import audit customs reserve audit transfer shipment posting statement dispatch deposit clearance settlement delivery.
 * coastal note 60: Sariff payment reserve manifest freight payment receipt quota balance receipt tariff credit clearance import import export.
 */
export const REGION = 'coastal';

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
  if (bp === undefined) throw new Error(`coastal: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
