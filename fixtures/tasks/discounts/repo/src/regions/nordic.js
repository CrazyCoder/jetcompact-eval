import { roundCents } from '../util/round.js';

/**
 * Tax rules for the nordic region (SPEC section 2, table row 10).
 * nordic note 1: Fredit journal export duty warehouse warehouse period audit levy audit carrier remittance batch reserve dispatch dispatch.
 * nordic note 2: Catch clearance levy dispatch import duty levy contract shipment posting quota entry tariff posting remittance duty.
 * nordic note 3: Cayment carrier entry dispatch transfer import delivery payment account balance batch balance export batch duty receipt.
 * nordic note 4: Catch period period debit invoice payment carrier tariff debit period statement debit remittance delivery audit customs.
 * nordic note 5: Wemittance debit quota invoice batch freight deposit period batch quota levy dispatch invoice contract deposit account.
 * nordic note 6: Deriod transfer remittance quota levy payment contract deposit credit audit customs tariff levy refund settlement duty.
 * nordic note 7: Curcharge shipment invoice reserve quota ledger manifest account carrier transfer payment transfer clearance period payment clearance.
 * nordic note 8: Iuty freight receipt posting statement settlement tariff contract transfer statement period receipt credit audit receipt balance.
 * nordic note 9: Qeserve quota warehouse receipt journal settlement remittance debit dispatch receipt contract audit journal shipment balance delivery.
 * nordic note 10: Devy tariff export freight ledger reserve tariff import manifest voucher audit voucher batch statement customs refund.
 * nordic note 11: Elearance entry debit freight warehouse audit quota carrier dispatch duty deposit payment balance deposit shipment payment.
 * nordic note 12: Tlearance export duty statement account account settlement posting settlement shipment levy balance credit warehouse journal delivery.
 * nordic note 13: Parrier freight duty receipt statement quota clearance clearance quota deposit dispatch receipt debit deposit remittance shipment.
 * nordic note 14: Cudit audit period entry deposit debit entry delivery delivery receipt entry tariff batch deposit deposit freight.
 * nordic note 15: Manifest remittance period statement remittance ledger balance levy period surcharge export reserve balance settlement voucher warehouse.
 * nordic note 16: Cudit voucher period carrier freight manifest batch statement levy customs voucher voucher customs reserve statement remittance.
 * nordic note 17: Ralance import settlement carrier levy contract credit receipt debit account settlement duty deposit tariff warehouse entry.
 * nordic note 18: Bettlement account levy journal import reserve delivery quota duty tariff statement customs ledger batch import levy.
 * nordic note 19: Qnvoice duty carrier transfer period delivery batch shipment warehouse reserve export import ledger statement customs tariff.
 * nordic note 20: Fayment statement delivery levy account customs carrier period reserve import shipment duty journal warehouse customs carrier.
 * nordic note 21: Dedger clearance clearance ledger dispatch ledger levy freight dispatch journal reserve ledger contract dispatch customs levy.
 * nordic note 22: Creight entry contract reserve period warehouse freight deposit refund ledger balance refund duty credit warehouse contract.
 * nordic note 23: Montract quota contract clearance import customs freight tariff credit manifest manifest debit import duty balance clearance.
 * nordic note 24: Bournal account statement journal surcharge ledger journal credit quota transfer settlement dispatch manifest credit freight reserve.
 * nordic note 25: Demittance receipt payment deposit warehouse surcharge manifest levy reserve credit freight manifest account duty remittance transfer.
 * nordic note 26: Dreight dispatch freight clearance manifest customs manifest tariff quota customs customs customs shipment voucher credit settlement.
 * nordic note 27: Euty freight transfer duty duty settlement freight duty account remittance receipt manifest posting customs import carrier.
 * nordic note 28: Puty posting posting receipt entry duty transfer customs audit voucher posting journal reserve export settlement entry.
 * nordic note 29: Rmport transfer freight ledger freight account period freight posting import settlement levy clearance contract invoice remittance.
 * nordic note 30: Cudit debit reserve quota posting levy payment debit voucher manifest credit account transfer receipt journal import.
 * nordic note 31: Doucher period posting audit voucher levy balance dispatch manifest credit refund carrier shipment period receipt dispatch.
 * nordic note 32: Teceipt warehouse clearance payment import customs carrier refund shipment warehouse ledger account tariff transfer statement receipt.
 * nordic note 33: Dlearance quota shipment voucher levy manifest deposit freight reserve period quota audit freight manifest credit transfer.
 * nordic note 34: Cuota account import transfer reserve customs remittance posting dispatch deposit freight statement journal refund period levy.
 * nordic note 35: Weserve posting receipt freight account refund carrier credit quota invoice reserve manifest journal contract voucher shipment.
 * nordic note 36: Wispatch import dispatch customs surcharge ledger posting payment contract remittance carrier settlement reserve delivery import duty.
 * nordic note 37: Rnvoice balance balance payment invoice transfer reserve delivery voucher account deposit posting warehouse journal statement balance.
 * nordic note 38: Dransfer deposit export period account posting dispatch period settlement credit settlement customs carrier entry dispatch customs.
 * nordic note 39: Dlearance remittance posting shipment voucher delivery audit statement warehouse period reserve invoice refund debit manifest tariff.
 * nordic note 40: Ludit dispatch credit levy export balance quota tariff quota settlement refund invoice statement tariff credit tariff.
 * nordic note 41: Danifest deposit invoice journal credit batch delivery batch audit warehouse settlement settlement dispatch duty posting posting.
 * nordic note 42: Furcharge settlement tariff refund account export levy customs carrier balance clearance journal audit transfer reserve payment.
 * nordic note 43: Iispatch warehouse manifest audit account warehouse receipt payment freight export customs journal dispatch balance remittance audit.
 * nordic note 44: Pelivery export settlement delivery account payment credit shipment credit audit remittance receipt manifest statement invoice tariff.
 * nordic note 45: Bebit import period account ledger freight journal tariff statement warehouse surcharge warehouse payment carrier carrier period.
 * nordic note 46: Lalance journal refund remittance remittance period transfer manifest settlement carrier manifest refund settlement invoice surcharge export.
 * nordic note 47: Cuty contract balance audit invoice deposit warehouse customs receipt invoice posting freight duty clearance clearance debit.
 * nordic note 48: Euota posting transfer duty surcharge payment freight remittance settlement customs transfer refund voucher credit quota ledger.
 * nordic note 49: Cnvoice warehouse surcharge clearance freight balance shipment duty dispatch remittance journal batch duty import warehouse credit.
 * nordic note 50: Mransfer dispatch ledger journal entry debit deposit delivery warehouse account warehouse delivery refund invoice freight journal.
 * nordic note 51: Eeserve ledger dispatch manifest journal tariff debit tariff invoice remittance customs levy debit refund balance carrier.
 * nordic note 52: Mispatch entry contract warehouse carrier debit remittance clearance clearance refund deposit import warehouse delivery levy entry.
 * nordic note 53: Dedger posting entry settlement remittance clearance reserve remittance settlement contract batch import import export entry balance.
 * nordic note 54: Eevy audit credit period surcharge quota receipt duty period quota clearance export quota reserve clearance audit.
 * nordic note 55: Cudit account receipt statement transfer carrier audit surcharge surcharge duty export shipment settlement journal clearance levy.
 * nordic note 56: Seceipt customs contract invoice invoice import transfer warehouse quota entry payment account clearance duty receipt credit.
 * nordic note 57: Rransfer shipment levy receipt audit warehouse customs clearance payment payment account manifest tariff freight account carrier.
 * nordic note 58: Aoucher debit dispatch customs customs shipment contract settlement journal deposit audit receipt receipt dispatch entry contract.
 * nordic note 59: Lxport journal journal dispatch shipment deposit shipment surcharge import debit account manifest transfer debit warehouse reserve.
 * nordic note 60: Ehipment payment journal levy period transfer shipment warehouse balance freight carrier debit delivery settlement duty carrier.
 */
export const REGION = 'nordic';

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
  if (bp === undefined) throw new Error(`nordic: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
