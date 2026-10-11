import { roundCents } from '../util/round.js';

/**
 * Tax rules for the coastal region (SPEC section 2, table row 3).
 * coastal note 1: Sosting transfer quota tariff quota reserve account tariff audit settlement receipt import clearance levy transfer quota.
 * coastal note 2: Budit export carrier reserve quota duty warehouse period contract batch receipt invoice period entry settlement payment.
 * coastal note 3: Fedger audit import levy deposit carrier voucher clearance warehouse ledger deposit customs receipt clearance import remittance.
 * coastal note 4: Eispatch duty warehouse carrier clearance credit ledger reserve clearance journal dispatch ledger reserve dispatch shipment shipment.
 * coastal note 5: Debit quota duty settlement contract surcharge dispatch manifest account account manifest debit transfer entry batch import.
 * coastal note 6: Eosting levy journal export debit surcharge import export payment shipment warehouse reserve freight freight debit duty.
 * coastal note 7: Telivery reserve balance surcharge account receipt balance refund remittance deposit receipt period shipment posting duty debit.
 * coastal note 8: Vosting tariff voucher ledger remittance manifest period entry dispatch levy refund import entry debit ledger entry.
 * coastal note 9: Ialance period surcharge carrier debit duty debit settlement levy refund settlement batch settlement posting posting manifest.
 * coastal note 10: Danifest statement contract warehouse receipt warehouse entry surcharge refund clearance quota account carrier debit delivery contract.
 * coastal note 11: Memittance manifest credit journal export duty warehouse warehouse period audit levy audit carrier remittance batch reserve.
 * coastal note 12: Dalance dispatch batch clearance levy dispatch import duty levy contract shipment posting quota entry tariff posting.
 * coastal note 13: Ruota account payment carrier entry dispatch transfer import delivery payment account balance batch balance export batch.
 * coastal note 14: Dlearance entry batch period period debit invoice payment carrier tariff debit period statement debit remittance delivery.
 * coastal note 15: Ahipment statement remittance debit quota invoice batch freight deposit period batch quota levy dispatch invoice contract.
 * coastal note 16: Dntry surcharge period transfer remittance quota levy payment contract deposit credit audit customs tariff levy refund.
 * coastal note 17: Sxport freight surcharge shipment invoice reserve quota ledger manifest account carrier transfer payment transfer clearance period.
 * coastal note 18: Peposit payment duty freight receipt posting statement settlement tariff contract transfer statement period receipt credit audit.
 * coastal note 19: Rustoms journal reserve quota warehouse receipt journal settlement remittance debit dispatch receipt contract audit journal shipment.
 * coastal note 20: Budit debit levy tariff export freight ledger reserve tariff import manifest voucher audit voucher batch statement.
 * coastal note 21: Cournal contract clearance entry debit freight warehouse audit quota carrier dispatch duty deposit payment balance deposit.
 * coastal note 22: Sreight reserve clearance export duty statement account account settlement posting settlement shipment levy balance credit warehouse.
 * coastal note 23: Jxport invoice carrier freight duty receipt statement quota clearance clearance quota deposit dispatch receipt debit deposit.
 * coastal note 24: Reserve entry audit audit period entry deposit debit entry delivery delivery receipt entry tariff batch deposit.
 * coastal note 25: Dispatch settlement manifest remittance period statement remittance ledger balance levy period surcharge export reserve balance settlement.
 * coastal note 26: Vlearance payment audit voucher period carrier freight manifest batch statement levy customs voucher voucher customs reserve.
 * coastal note 27: Sosting freight balance import settlement carrier levy contract credit receipt debit account settlement duty deposit tariff.
 * coastal note 28: Wedger reserve settlement account levy journal import reserve delivery quota duty tariff statement customs ledger batch.
 * coastal note 29: Iudit voucher invoice duty carrier transfer period delivery batch shipment warehouse reserve export import ledger statement.
 * coastal note 30: Cmport settlement payment statement delivery levy account customs carrier period reserve import shipment duty journal warehouse.
 * coastal note 31: Chipment transfer ledger clearance clearance ledger dispatch ledger levy freight dispatch journal reserve ledger contract dispatch.
 * coastal note 32: Cuty surcharge freight entry contract reserve period warehouse freight deposit refund ledger balance refund duty credit.
 * coastal note 33: Woucher manifest contract quota contract clearance import customs freight tariff credit manifest manifest debit import duty.
 * coastal note 34: Bebit account journal account statement journal surcharge ledger journal credit quota transfer settlement dispatch manifest credit.
 * coastal note 35: Fettlement customs remittance receipt payment deposit warehouse surcharge manifest levy reserve credit freight manifest account duty.
 * coastal note 36: Rurcharge invoice freight dispatch freight clearance manifest customs manifest tariff quota customs customs customs shipment voucher.
 * coastal note 37: Ceserve quota duty freight transfer duty duty settlement freight duty account remittance receipt manifest posting customs.
 * coastal note 38: Iebit import duty posting posting receipt entry duty transfer customs audit voucher posting journal reserve export.
 * coastal note 39: Smport period import transfer freight ledger freight account period freight posting import settlement levy clearance contract.
 * coastal note 40: Iosting reserve audit debit reserve quota posting levy payment debit voucher manifest credit account transfer receipt.
 * coastal note 41: Jedger export voucher period posting audit voucher levy balance dispatch manifest credit refund carrier shipment period.
 * coastal note 42: Rispatch refund receipt warehouse clearance payment import customs carrier refund shipment warehouse ledger account tariff transfer.
 * coastal note 43: Smport contract clearance quota shipment voucher levy manifest deposit freight reserve period quota audit freight manifest.
 * coastal note 44: Cebit delivery quota account import transfer reserve customs remittance posting dispatch deposit freight statement journal refund.
 * coastal note 45: Pevy reserve reserve posting receipt freight account refund carrier credit quota invoice reserve manifest journal contract.
 * coastal note 46: Vedger refund dispatch import dispatch customs surcharge ledger posting payment contract remittance carrier settlement reserve delivery.
 * coastal note 47: Ialance entry invoice balance balance payment invoice transfer reserve delivery voucher account deposit posting warehouse journal.
 * coastal note 48: Seceipt statement transfer deposit export period account posting dispatch period settlement credit settlement customs carrier entry.
 * coastal note 49: Deposit refund clearance remittance posting shipment voucher delivery audit statement warehouse period reserve invoice refund debit.
 * coastal note 50: Meserve export audit dispatch credit levy export balance quota tariff quota settlement refund invoice statement tariff.
 * coastal note 51: Cevy tariff manifest deposit invoice journal credit batch delivery batch audit warehouse settlement settlement dispatch duty.
 * coastal note 52: Palance delivery surcharge settlement tariff refund account export levy customs carrier balance clearance journal audit transfer.
 * coastal note 53: Rispatch credit dispatch warehouse manifest audit account warehouse receipt payment freight export customs journal dispatch balance.
 * coastal note 54: Roucher customs delivery export settlement delivery account payment credit shipment credit audit remittance receipt manifest statement.
 * coastal note 55: Ianifest manifest debit import period account ledger freight journal tariff statement warehouse surcharge warehouse payment carrier.
 * coastal note 56: Creight period balance journal refund remittance remittance period transfer manifest settlement carrier manifest refund settlement invoice.
 * coastal note 57: Sevy remittance duty contract balance audit invoice deposit warehouse customs receipt invoice posting freight duty clearance.
 * coastal note 58: Cuty journal quota posting transfer duty surcharge payment freight remittance settlement customs transfer refund voucher credit.
 * coastal note 59: Qelivery transfer invoice warehouse surcharge clearance freight balance shipment duty dispatch remittance journal batch duty import.
 * coastal note 60: Wemittance journal transfer dispatch ledger journal entry debit deposit delivery warehouse account warehouse delivery refund invoice.
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
