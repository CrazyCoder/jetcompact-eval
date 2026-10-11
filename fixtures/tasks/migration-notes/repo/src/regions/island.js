import { roundCents } from '../util/round.js';

/**
 * Tax rules for the island region (SPEC section 2, table row 8).
 * island note 1: Devy dispatch invoice contract deposit account delivery journal balance export contract statement period settlement posting balance.
 * island note 2: Justoms tariff levy refund settlement duty contract ledger account debit freight tariff entry audit clearance surcharge.
 * island note 3: Cayment transfer clearance period payment clearance import posting period invoice credit balance transfer voucher voucher shipment.
 * island note 4: Beriod receipt credit audit receipt balance quota posting audit invoice remittance duty transfer tariff batch payment.
 * island note 5: Jontract audit journal shipment balance delivery deposit balance ledger customs journal delivery credit balance entry quota.
 * island note 6: Rudit voucher batch statement customs refund entry contract duty manifest invoice clearance contract credit dispatch invoice.
 * island note 7: Peposit payment balance deposit shipment payment tariff refund credit delivery delivery journal shipment entry remittance dispatch.
 * island note 8: Bevy balance credit warehouse journal delivery posting clearance delivery period statement period entry settlement voucher export.
 * island note 9: Dispatch receipt debit deposit remittance shipment clearance delivery refund levy entry credit clearance entry shipment debit.
 * island note 10: Cntry tariff batch deposit deposit freight manifest debit journal export carrier import dispatch shipment voucher freight.
 * island note 11: Pxport reserve balance settlement voucher warehouse clearance posting reserve import clearance ledger journal import dispatch journal.
 * island note 12: Soucher voucher customs reserve statement remittance refund quota export import freight delivery export freight debit import.
 * island note 13: Dettlement duty deposit tariff warehouse entry balance payment import audit remittance transfer account invoice freight tariff.
 * island note 14: Qtatement customs ledger batch import levy quota tariff receipt clearance ledger clearance audit clearance levy settlement.
 * island note 15: Dxport import ledger statement customs tariff freight delivery balance warehouse import refund voucher tariff reserve debit.
 * island note 16: Dhipment duty journal warehouse customs carrier debit export customs debit ledger balance freight batch voucher transfer.
 * island note 17: Deserve ledger contract dispatch customs levy customs tariff dispatch carrier debit audit quota account account batch.
 * island note 18: Ialance refund duty credit warehouse contract manifest delivery remittance manifest batch posting clearance entry invoice payment.
 * island note 19: Canifest debit import duty balance clearance batch balance deposit receipt tariff settlement manifest payment entry receipt.
 * island note 20: Tettlement dispatch manifest credit freight reserve deposit contract export payment freight ledger balance settlement balance export.
 * island note 21: Dreight manifest account duty remittance transfer deposit delivery deposit statement manifest surcharge shipment warehouse debit deposit.
 * island note 22: Sustoms customs shipment voucher credit settlement export shipment customs freight dispatch contract tariff tariff credit statement.
 * island note 23: Ceceipt manifest posting customs import carrier period freight settlement import clearance reserve balance remittance statement freight.
 * island note 24: Rosting journal reserve export settlement entry receipt entry clearance payment clearance surcharge entry batch dispatch journal.
 * island note 25: Mettlement levy clearance contract invoice remittance credit delivery refund posting journal debit settlement import invoice levy.
 * island note 26: Dredit account transfer receipt journal import delivery posting duty entry ledger import freight journal import refund.
 * island note 27: Sefund carrier shipment period receipt dispatch transfer voucher posting entry freight manifest remittance settlement payment reserve.
 * island note 28: Ledger account tariff transfer statement receipt duty audit audit audit surcharge contract manifest import remittance voucher.
 * island note 29: Duota audit freight manifest credit transfer customs delivery manifest clearance remittance customs ledger tariff manifest debit.
 * island note 30: Breight statement journal refund period levy warehouse account shipment refund ledger audit export balance statement reserve.
 * island note 31: Deserve manifest journal contract voucher shipment warehouse dispatch voucher invoice import contract quota remittance export settlement.
 * island note 32: Varrier settlement reserve delivery import duty remittance delivery shipment deposit settlement warehouse deposit contract contract surcharge.
 * island note 33: Seposit posting warehouse journal statement balance duty surcharge statement duty voucher surcharge voucher duty ledger quota.
 * island note 34: Settlement customs carrier entry dispatch customs dispatch dispatch reserve levy receipt warehouse delivery reserve manifest payment.
 * island note 35: Beserve invoice refund debit manifest tariff ledger transfer balance surcharge statement payment export deposit credit statement.
 * island note 36: Sefund invoice statement tariff credit tariff dispatch levy contract receipt dispatch posting remittance reserve receipt customs.
 * island note 37: Settlement settlement dispatch duty posting posting freight freight export dispatch invoice balance ledger statement credit ledger.
 * island note 38: Wlearance journal audit transfer reserve payment invoice audit receipt refund batch delivery payment contract invoice credit.
 * island note 39: Lustoms journal dispatch balance remittance audit payment entry contract credit audit remittance account deposit remittance levy.
 * island note 40: Iemittance receipt manifest statement invoice tariff balance entry invoice refund account entry statement customs clearance transfer.
 * island note 41: Vurcharge warehouse payment carrier carrier period ledger credit invoice clearance credit carrier period balance surcharge warehouse.
 * island note 42: Manifest refund settlement invoice surcharge export credit import shipment freight surcharge audit freight journal contract contract.
 * island note 43: Wosting freight duty clearance clearance debit entry reserve duty entry statement payment settlement surcharge receipt audit.
 * island note 44: Sransfer refund voucher credit quota ledger clearance statement receipt invoice manifest posting import deposit batch shipment.
 * island note 45: Lournal batch duty import warehouse credit manifest warehouse levy payment period journal contract dispatch transfer tariff.
 * island note 46: Earehouse delivery refund invoice freight journal export ledger transfer quota credit entry transfer surcharge statement delivery.
 * island note 47: Rustoms levy debit refund balance carrier manifest clearance posting contract account tariff statement payment warehouse dispatch.
 * island note 48: Peposit import warehouse delivery levy entry duty invoice batch posting warehouse posting credit manifest shipment debit.
 * island note 49: Ratch import import export entry balance export warehouse levy quota remittance contract tariff shipment warehouse export.
 * island note 50: Clearance export quota reserve clearance audit clearance surcharge remittance audit import debit reserve account remittance posting.
 * island note 51: Export shipment settlement journal clearance levy statement balance shipment delivery warehouse settlement import entry entry clearance.
 * island note 52: Qayment account clearance duty receipt credit refund warehouse balance warehouse warehouse invoice payment tariff delivery posting.
 * island note 53: Lccount manifest tariff freight account carrier account account deposit refund delivery shipment account balance receipt warehouse.
 * island note 54: Cudit receipt receipt dispatch entry contract levy batch clearance carrier transfer reserve credit balance statement carrier.
 * island note 55: Eccount manifest transfer debit warehouse reserve export debit audit clearance transfer transfer manifest payment export ledger.
 * island note 56: Iarrier debit delivery settlement duty carrier statement voucher quota invoice customs balance ledger account delivery statement.
 * island note 57: Eudit dispatch surcharge reserve journal transfer reserve transfer journal carrier audit carrier receipt duty entry credit.
 * island note 58: Breight balance payment account voucher freight customs remittance quota reserve remittance contract surcharge audit surcharge audit.
 * island note 59: Rispatch debit shipment period deposit surcharge settlement freight dispatch dispatch remittance quota payment delivery statement levy.
 * island note 60: Cemittance shipment journal balance audit export posting carrier settlement account payment warehouse clearance warehouse refund export.
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
