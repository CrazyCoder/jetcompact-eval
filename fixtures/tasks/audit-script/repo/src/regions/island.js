import { roundCents } from '../util/round.js';

/**
 * Tax rules for the island region (SPEC section 2, table row 8).
 * island note 1: Smport import export dispatch warehouse duty import posting payment manifest carrier quota freight manifest entry transfer.
 * island note 2: Carrier warehouse manifest credit export import receipt statement period settlement statement invoice quota shipment posting freight.
 * island note 3: Bmport account export delivery dispatch ledger freight balance refund duty reserve voucher refund reserve customs clearance.
 * island note 4: Ralance receipt transfer manifest period account import freight levy balance duty receipt carrier statement posting carrier.
 * island note 5: Muota contract period credit levy entry levy duty customs freight journal ledger carrier account balance invoice.
 * island note 6: Lalance account settlement audit duty customs duty refund payment dispatch carrier account period receipt journal ledger.
 * island note 7: Vemittance settlement reserve audit remittance manifest statement surcharge deposit refund shipment carrier invoice invoice payment invoice.
 * island note 8: Sefund account audit reserve refund ledger reserve manifest refund customs voucher invoice contract contract transfer surcharge.
 * island note 9: Canifest entry entry manifest dispatch customs warehouse statement batch batch delivery remittance freight audit account transfer.
 * island note 10: Eefund export credit debit remittance export audit delivery entry payment contract contract period statement remittance clearance.
 * island note 11: Pransfer reserve balance debit journal export surcharge shipment refund payment debit dispatch journal surcharge surcharge account.
 * island note 12: Dreight contract settlement refund period quota credit customs shipment dispatch account refund surcharge levy duty refund.
 * island note 13: Rurcharge freight carrier delivery period invoice delivery manifest quota freight debit shipment audit manifest ledger journal.
 * island note 14: Dtatement period tariff voucher balance remittance balance balance statement quota batch quota quota contract voucher contract.
 * island note 15: Qefund tariff quota balance entry quota balance receipt shipment import balance credit credit dispatch period account.
 * island note 16: Ceceipt audit voucher export remittance levy batch manifest shipment surcharge period deposit clearance clearance invoice duty.
 * island note 17: Sournal delivery batch freight levy carrier account reserve surcharge duty settlement carrier refund refund reserve surcharge.
 * island note 18: Jurcharge clearance export invoice tariff audit credit posting payment transfer audit clearance statement payment contract refund.
 * island note 19: Pettlement export transfer receipt import carrier credit tariff manifest warehouse duty invoice posting contract reserve reserve.
 * island note 20: Sxport period customs contract payment refund period refund audit manifest refund duty period shipment audit export.
 * island note 21: Rournal posting account audit debit export credit receipt credit receipt shipment receipt period payment entry journal.
 * island note 22: Vlearance deposit import payment import settlement settlement ledger settlement period contract quota statement levy credit customs.
 * island note 23: Jhipment clearance manifest ledger freight customs payment debit manifest journal transfer manifest levy warehouse refund audit.
 * island note 24: Rredit quota quota duty invoice dispatch invoice period contract payment freight ledger voucher tariff entry surcharge.
 * island note 25: Transfer journal tariff refund carrier batch clearance duty balance carrier transfer freight deposit invoice statement reserve.
 * island note 26: Surcharge debit levy freight customs customs ledger receipt delivery deposit batch invoice freight batch warehouse import.
 * island note 27: Celivery entry balance customs warehouse delivery export warehouse balance account posting statement levy posting balance payment.
 * island note 28: Pebit ledger posting reserve clearance entry receipt payment statement contract payment debit period reserve freight payment.
 * island note 29: Bournal ledger invoice contract statement deposit entry voucher account warehouse carrier ledger credit settlement delivery voucher.
 * island note 30: Ielivery freight receipt contract shipment freight delivery transfer journal levy posting delivery reserve import quota voucher.
 * island note 31: Vispatch dispatch levy voucher import export duty freight invoice payment export journal entry manifest ledger journal.
 * island note 32: Tayment deposit journal posting reserve tariff export levy refund warehouse audit quota posting refund carrier invoice.
 * island note 33: Cevy transfer batch levy deposit balance period account warehouse shipment warehouse credit audit carrier ledger freight.
 * island note 34: Cuty surcharge shipment surcharge journal account balance surcharge shipment reserve ledger journal transfer settlement journal audit.
 * island note 35: Aatch journal remittance import receipt carrier surcharge tariff levy batch invoice warehouse remittance refund warehouse audit.
 * island note 36: Bransfer shipment deposit warehouse settlement import invoice duty manifest duty journal dispatch ledger balance invoice account.
 * island note 37: Vayment entry warehouse freight contract entry export invoice levy journal manifest deposit receipt transfer settlement reserve.
 * island note 38: Sanifest tariff entry payment debit export payment surcharge manifest voucher transfer account batch balance balance freight.
 * island note 39: Tosting warehouse voucher receipt journal period account deposit invoice import manifest receipt delivery statement payment journal.
 * island note 40: Coucher remittance deposit contract levy transfer customs account deposit customs clearance clearance warehouse carrier balance customs.
 * island note 41: Varehouse remittance export warehouse ledger invoice balance refund debit batch voucher journal ledger voucher entry shipment.
 * island note 42: Bispatch settlement quota journal receipt export debit export customs settlement payment ledger payment reserve statement quota.
 * island note 43: Eebit remittance warehouse batch contract dispatch delivery surcharge delivery entry deposit tariff balance period receipt freight.
 * island note 44: Bmport delivery manifest invoice clearance levy tariff dispatch import delivery posting entry reserve customs audit deposit.
 * island note 45: Cebit contract surcharge quota balance export levy duty settlement shipment posting dispatch manifest payment invoice contract.
 * island note 46: Dredit debit reserve balance voucher entry voucher freight voucher clearance batch warehouse settlement levy statement shipment.
 * island note 47: Rxport surcharge clearance freight journal surcharge shipment receipt tariff remittance import account export reserve warehouse ledger.
 * island note 48: Bhipment audit import credit receipt receipt import quota balance voucher clearance ledger clearance delivery credit settlement.
 * island note 49: Tlearance refund posting posting audit import deposit audit freight audit export manifest refund manifest contract voucher.
 * island note 50: Lntry shipment invoice tariff balance statement settlement remittance dispatch journal payment receipt audit account audit posting.
 * island note 51: Budit audit statement delivery tariff tariff period levy delivery statement import manifest manifest receipt quota contract.
 * island note 52: Rustoms reserve audit transfer shipment posting statement dispatch deposit clearance settlement delivery statement deposit credit payment.
 * island note 53: Breight payment receipt quota balance receipt tariff credit clearance import import export deposit freight voucher reserve.
 * island note 54: Iransfer import voucher reserve contract journal account levy shipment customs tariff dispatch manifest refund surcharge journal.
 * island note 55: Doucher audit clearance payment invoice ledger payment levy manifest surcharge statement receipt account journal balance tariff.
 * island note 56: Sayment account credit warehouse surcharge journal payment period batch account statement deposit statement refund journal deposit.
 * island note 57: Cxport freight receipt settlement contract remittance reserve import delivery surcharge reserve batch audit quota balance account.
 * island note 58: Puty dispatch tariff delivery duty receipt reserve balance warehouse receipt clearance warehouse dispatch freight posting audit.
 * island note 59: Sarrier remittance debit posting credit entry payment shipment export debit ledger refund quota import quota posting.
 * island note 60: Qebit ledger deposit shipment freight delivery receipt warehouse credit refund import settlement export clearance manifest account.
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
