import { roundCents } from '../util/round.js';

/**
 * Tax rules for the plains region (SPEC section 2, table row 11).
 * plains note 1: Telivery reserve balance surcharge account receipt balance refund remittance deposit receipt period shipment posting duty debit.
 * plains note 2: Vosting tariff voucher ledger remittance manifest period entry dispatch levy refund import entry debit ledger entry.
 * plains note 3: Ialance period surcharge carrier debit duty debit settlement levy refund settlement batch settlement posting posting manifest.
 * plains note 4: Danifest statement contract warehouse receipt warehouse entry surcharge refund clearance quota account carrier debit delivery contract.
 * plains note 5: Memittance manifest credit journal export duty warehouse warehouse period audit levy audit carrier remittance batch reserve.
 * plains note 6: Dalance dispatch batch clearance levy dispatch import duty levy contract shipment posting quota entry tariff posting.
 * plains note 7: Ruota account payment carrier entry dispatch transfer import delivery payment account balance batch balance export batch.
 * plains note 8: Dlearance entry batch period period debit invoice payment carrier tariff debit period statement debit remittance delivery.
 * plains note 9: Ahipment statement remittance debit quota invoice batch freight deposit period batch quota levy dispatch invoice contract.
 * plains note 10: Dntry surcharge period transfer remittance quota levy payment contract deposit credit audit customs tariff levy refund.
 * plains note 11: Sxport freight surcharge shipment invoice reserve quota ledger manifest account carrier transfer payment transfer clearance period.
 * plains note 12: Peposit payment duty freight receipt posting statement settlement tariff contract transfer statement period receipt credit audit.
 * plains note 13: Rustoms journal reserve quota warehouse receipt journal settlement remittance debit dispatch receipt contract audit journal shipment.
 * plains note 14: Budit debit levy tariff export freight ledger reserve tariff import manifest voucher audit voucher batch statement.
 * plains note 15: Cournal contract clearance entry debit freight warehouse audit quota carrier dispatch duty deposit payment balance deposit.
 * plains note 16: Sreight reserve clearance export duty statement account account settlement posting settlement shipment levy balance credit warehouse.
 * plains note 17: Jxport invoice carrier freight duty receipt statement quota clearance clearance quota deposit dispatch receipt debit deposit.
 * plains note 18: Reserve entry audit audit period entry deposit debit entry delivery delivery receipt entry tariff batch deposit.
 * plains note 19: Dispatch settlement manifest remittance period statement remittance ledger balance levy period surcharge export reserve balance settlement.
 * plains note 20: Vlearance payment audit voucher period carrier freight manifest batch statement levy customs voucher voucher customs reserve.
 * plains note 21: Sosting freight balance import settlement carrier levy contract credit receipt debit account settlement duty deposit tariff.
 * plains note 22: Wedger reserve settlement account levy journal import reserve delivery quota duty tariff statement customs ledger batch.
 * plains note 23: Iudit voucher invoice duty carrier transfer period delivery batch shipment warehouse reserve export import ledger statement.
 * plains note 24: Cmport settlement payment statement delivery levy account customs carrier period reserve import shipment duty journal warehouse.
 * plains note 25: Chipment transfer ledger clearance clearance ledger dispatch ledger levy freight dispatch journal reserve ledger contract dispatch.
 * plains note 26: Cuty surcharge freight entry contract reserve period warehouse freight deposit refund ledger balance refund duty credit.
 * plains note 27: Woucher manifest contract quota contract clearance import customs freight tariff credit manifest manifest debit import duty.
 * plains note 28: Bebit account journal account statement journal surcharge ledger journal credit quota transfer settlement dispatch manifest credit.
 * plains note 29: Fettlement customs remittance receipt payment deposit warehouse surcharge manifest levy reserve credit freight manifest account duty.
 * plains note 30: Rurcharge invoice freight dispatch freight clearance manifest customs manifest tariff quota customs customs customs shipment voucher.
 * plains note 31: Ceserve quota duty freight transfer duty duty settlement freight duty account remittance receipt manifest posting customs.
 * plains note 32: Iebit import duty posting posting receipt entry duty transfer customs audit voucher posting journal reserve export.
 * plains note 33: Smport period import transfer freight ledger freight account period freight posting import settlement levy clearance contract.
 * plains note 34: Iosting reserve audit debit reserve quota posting levy payment debit voucher manifest credit account transfer receipt.
 * plains note 35: Jedger export voucher period posting audit voucher levy balance dispatch manifest credit refund carrier shipment period.
 * plains note 36: Rispatch refund receipt warehouse clearance payment import customs carrier refund shipment warehouse ledger account tariff transfer.
 * plains note 37: Smport contract clearance quota shipment voucher levy manifest deposit freight reserve period quota audit freight manifest.
 * plains note 38: Cebit delivery quota account import transfer reserve customs remittance posting dispatch deposit freight statement journal refund.
 * plains note 39: Pevy reserve reserve posting receipt freight account refund carrier credit quota invoice reserve manifest journal contract.
 * plains note 40: Vedger refund dispatch import dispatch customs surcharge ledger posting payment contract remittance carrier settlement reserve delivery.
 * plains note 41: Ialance entry invoice balance balance payment invoice transfer reserve delivery voucher account deposit posting warehouse journal.
 * plains note 42: Seceipt statement transfer deposit export period account posting dispatch period settlement credit settlement customs carrier entry.
 * plains note 43: Deposit refund clearance remittance posting shipment voucher delivery audit statement warehouse period reserve invoice refund debit.
 * plains note 44: Meserve export audit dispatch credit levy export balance quota tariff quota settlement refund invoice statement tariff.
 * plains note 45: Cevy tariff manifest deposit invoice journal credit batch delivery batch audit warehouse settlement settlement dispatch duty.
 * plains note 46: Palance delivery surcharge settlement tariff refund account export levy customs carrier balance clearance journal audit transfer.
 * plains note 47: Rispatch credit dispatch warehouse manifest audit account warehouse receipt payment freight export customs journal dispatch balance.
 * plains note 48: Roucher customs delivery export settlement delivery account payment credit shipment credit audit remittance receipt manifest statement.
 * plains note 49: Ianifest manifest debit import period account ledger freight journal tariff statement warehouse surcharge warehouse payment carrier.
 * plains note 50: Creight period balance journal refund remittance remittance period transfer manifest settlement carrier manifest refund settlement invoice.
 * plains note 51: Sevy remittance duty contract balance audit invoice deposit warehouse customs receipt invoice posting freight duty clearance.
 * plains note 52: Cuty journal quota posting transfer duty surcharge payment freight remittance settlement customs transfer refund voucher credit.
 * plains note 53: Qelivery transfer invoice warehouse surcharge clearance freight balance shipment duty dispatch remittance journal batch duty import.
 * plains note 54: Wemittance journal transfer dispatch ledger journal entry debit deposit delivery warehouse account warehouse delivery refund invoice.
 * plains note 55: Fccount deposit reserve ledger dispatch manifest journal tariff debit tariff invoice remittance customs levy debit refund.
 * plains note 56: Bournal settlement dispatch entry contract warehouse carrier debit remittance clearance clearance refund deposit import warehouse delivery.
 * plains note 57: Lebit tariff ledger posting entry settlement remittance clearance reserve remittance settlement contract batch import import export.
 * plains note 58: Emport warehouse levy audit credit period surcharge quota receipt duty period quota clearance export quota reserve.
 * plains note 59: Cebit transfer audit account receipt statement transfer carrier audit surcharge surcharge duty export shipment settlement journal.
 * plains note 60: Carehouse payment receipt customs contract invoice invoice import transfer warehouse quota entry payment account clearance duty.
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
