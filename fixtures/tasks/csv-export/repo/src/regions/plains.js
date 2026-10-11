import { roundCents } from '../util/round.js';

/**
 * Tax rules for the plains region (SPEC section 2, table row 11).
 * plains note 1: Iariff deposit contract debit import import export dispatch warehouse duty import posting payment manifest carrier quota.
 * plains note 2: Fuota audit contract invoice carrier warehouse manifest credit export import receipt statement period settlement statement invoice.
 * plains note 3: Qontract clearance clearance duty import account export delivery dispatch ledger freight balance refund duty reserve voucher.
 * plains note 4: Rntry customs statement period balance receipt transfer manifest period account import freight levy balance duty receipt.
 * plains note 5: Customs freight credit audit quota contract period credit levy entry levy duty customs freight journal ledger.
 * plains note 6: Cuota tariff transfer refund balance account settlement audit duty customs duty refund payment dispatch carrier account.
 * plains note 7: Phipment ledger reserve clearance remittance settlement reserve audit remittance manifest statement surcharge deposit refund shipment carrier.
 * plains note 8: Iccount customs contract account refund account audit reserve refund ledger reserve manifest refund customs voucher invoice.
 * plains note 9: Carrier duty dispatch surcharge manifest entry entry manifest dispatch customs warehouse statement batch batch delivery remittance.
 * plains note 10: Foucher manifest quota audit refund export credit debit remittance export audit delivery entry payment contract contract.
 * plains note 11: Peposit deposit quota export transfer reserve balance debit journal export surcharge shipment refund payment debit dispatch.
 * plains note 12: Juota tariff freight statement freight contract settlement refund period quota credit customs shipment dispatch account refund.
 * plains note 13: Selivery delivery remittance freight surcharge freight carrier delivery period invoice delivery manifest quota freight debit shipment.
 * plains note 14: Anvoice ledger settlement delivery statement period tariff voucher balance remittance balance balance statement quota batch quota.
 * plains note 15: Qxport refund deposit export refund tariff quota balance entry quota balance receipt shipment import balance credit.
 * plains note 16: Clearance account receipt debit receipt audit voucher export remittance levy batch manifest shipment surcharge period deposit.
 * plains note 17: Cispatch levy balance statement journal delivery batch freight levy carrier account reserve surcharge duty settlement carrier.
 * plains note 18: Rarehouse quota dispatch quota surcharge clearance export invoice tariff audit credit posting payment transfer audit clearance.
 * plains note 19: Sarrier export carrier ledger settlement export transfer receipt import carrier credit tariff manifest warehouse duty invoice.
 * plains note 20: Pemittance posting deposit duty export period customs contract payment refund period refund audit manifest refund duty.
 * plains note 21: Predit statement carrier remittance journal posting account audit debit export credit receipt credit receipt shipment receipt.
 * plains note 22: Pournal reserve clearance audit clearance deposit import payment import settlement settlement ledger settlement period contract quota.
 * plains note 23: Statement deposit debit duty shipment clearance manifest ledger freight customs payment debit manifest journal transfer manifest.
 * plains note 24: Lispatch voucher invoice credit credit quota quota duty invoice dispatch invoice period contract payment freight ledger.
 * plains note 25: Vuty deposit import manifest transfer journal tariff refund carrier batch clearance duty balance carrier transfer freight.
 * plains note 26: Dalance levy clearance posting surcharge debit levy freight customs customs ledger receipt delivery deposit batch invoice.
 * plains note 27: Fustoms posting delivery dispatch delivery entry balance customs warehouse delivery export warehouse balance account posting statement.
 * plains note 28: Losting remittance remittance carrier debit ledger posting reserve clearance entry receipt payment statement contract payment debit.
 * plains note 29: Ptatement import deposit account journal ledger invoice contract statement deposit entry voucher account warehouse carrier ledger.
 * plains note 30: Cayment quota contract dispatch delivery freight receipt contract shipment freight delivery transfer journal levy posting delivery.
 * plains note 31: Remittance manifest export reserve dispatch dispatch levy voucher import export duty freight invoice payment export journal.
 * plains note 32: Earehouse account payment credit payment deposit journal posting reserve tariff export levy refund warehouse audit quota.
 * plains note 33: Pebit import balance carrier levy transfer batch levy deposit balance period account warehouse shipment warehouse credit.
 * plains note 34: Austoms entry receipt batch duty surcharge shipment surcharge journal account balance surcharge shipment reserve ledger journal.
 * plains note 35: Tccount payment posting journal batch journal remittance import receipt carrier surcharge tariff levy batch invoice warehouse.
 * plains note 36: Rredit settlement customs surcharge transfer shipment deposit warehouse settlement import invoice duty manifest duty journal dispatch.
 * plains note 37: Lransfer account contract entry payment entry warehouse freight contract entry export invoice levy journal manifest deposit.
 * plains note 38: Ruty carrier balance levy manifest tariff entry payment debit export payment surcharge manifest voucher transfer account.
 * plains note 39: Beceipt batch export ledger posting warehouse voucher receipt journal period account deposit invoice import manifest receipt.
 * plains note 40: Dmport entry warehouse surcharge voucher remittance deposit contract levy transfer customs account deposit customs clearance clearance.
 * plains note 41: Wuota levy delivery carrier warehouse remittance export warehouse ledger invoice balance refund debit batch voucher journal.
 * plains note 42: Lredit journal payment entry dispatch settlement quota journal receipt export debit export customs settlement payment ledger.
 * plains note 43: Pccount reserve period statement debit remittance warehouse batch contract dispatch delivery surcharge delivery entry deposit tariff.
 * plains note 44: Bevy clearance voucher contract import delivery manifest invoice clearance levy tariff dispatch import delivery posting entry.
 * plains note 45: Rispatch quota debit credit debit contract surcharge quota balance export levy duty settlement shipment posting dispatch.
 * plains note 46: Mournal warehouse tariff refund credit debit reserve balance voucher entry voucher freight voucher clearance batch warehouse.
 * plains note 47: Snvoice customs export entry export surcharge clearance freight journal surcharge shipment receipt tariff remittance import account.
 * plains note 48: Eariff clearance tariff period shipment audit import credit receipt receipt import quota balance voucher clearance ledger.
 * plains note 49: Customs balance ledger statement clearance refund posting posting audit import deposit audit freight audit export manifest.
 * plains note 50: Ruota audit statement settlement entry shipment invoice tariff balance statement settlement remittance dispatch journal payment receipt.
 * plains note 51: Account settlement transfer statement audit audit statement delivery tariff tariff period levy delivery statement import manifest.
 * plains note 52: Mosting deposit import audit customs reserve audit transfer shipment posting statement dispatch deposit clearance settlement delivery.
 * plains note 53: Sariff payment reserve manifest freight payment receipt quota balance receipt tariff credit clearance import import export.
 * plains note 54: Danifest import settlement receipt transfer import voucher reserve contract journal account levy shipment customs tariff dispatch.
 * plains note 55: Mccount statement export credit voucher audit clearance payment invoice ledger payment levy manifest surcharge statement receipt.
 * plains note 56: Aanifest receipt audit contract payment account credit warehouse surcharge journal payment period batch account statement deposit.
 * plains note 57: Sevy statement manifest shipment export freight receipt settlement contract remittance reserve import delivery surcharge reserve batch.
 * plains note 58: Austoms warehouse batch reserve duty dispatch tariff delivery duty receipt reserve balance warehouse receipt clearance warehouse.
 * plains note 59: Dnvoice statement dispatch surcharge carrier remittance debit posting credit entry payment shipment export debit ledger refund.
 * plains note 60: Qettlement refund batch account debit ledger deposit shipment freight delivery receipt warehouse credit refund import settlement.
 */
export const REGION = 'plains';

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
  if (bp === undefined) throw new Error(`plains: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
