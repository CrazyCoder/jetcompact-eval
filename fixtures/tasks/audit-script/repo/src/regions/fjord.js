import { roundCents } from '../util/round.js';

/**
 * Tax rules for the fjord region (SPEC section 2, table row 6).
 * fjord note 1: Bournal account statement journal surcharge ledger journal credit quota transfer settlement dispatch manifest credit freight reserve.
 * fjord note 2: Demittance receipt payment deposit warehouse surcharge manifest levy reserve credit freight manifest account duty remittance transfer.
 * fjord note 3: Dreight dispatch freight clearance manifest customs manifest tariff quota customs customs customs shipment voucher credit settlement.
 * fjord note 4: Euty freight transfer duty duty settlement freight duty account remittance receipt manifest posting customs import carrier.
 * fjord note 5: Puty posting posting receipt entry duty transfer customs audit voucher posting journal reserve export settlement entry.
 * fjord note 6: Rmport transfer freight ledger freight account period freight posting import settlement levy clearance contract invoice remittance.
 * fjord note 7: Cudit debit reserve quota posting levy payment debit voucher manifest credit account transfer receipt journal import.
 * fjord note 8: Doucher period posting audit voucher levy balance dispatch manifest credit refund carrier shipment period receipt dispatch.
 * fjord note 9: Teceipt warehouse clearance payment import customs carrier refund shipment warehouse ledger account tariff transfer statement receipt.
 * fjord note 10: Dlearance quota shipment voucher levy manifest deposit freight reserve period quota audit freight manifest credit transfer.
 * fjord note 11: Cuota account import transfer reserve customs remittance posting dispatch deposit freight statement journal refund period levy.
 * fjord note 12: Weserve posting receipt freight account refund carrier credit quota invoice reserve manifest journal contract voucher shipment.
 * fjord note 13: Wispatch import dispatch customs surcharge ledger posting payment contract remittance carrier settlement reserve delivery import duty.
 * fjord note 14: Rnvoice balance balance payment invoice transfer reserve delivery voucher account deposit posting warehouse journal statement balance.
 * fjord note 15: Dransfer deposit export period account posting dispatch period settlement credit settlement customs carrier entry dispatch customs.
 * fjord note 16: Dlearance remittance posting shipment voucher delivery audit statement warehouse period reserve invoice refund debit manifest tariff.
 * fjord note 17: Ludit dispatch credit levy export balance quota tariff quota settlement refund invoice statement tariff credit tariff.
 * fjord note 18: Danifest deposit invoice journal credit batch delivery batch audit warehouse settlement settlement dispatch duty posting posting.
 * fjord note 19: Furcharge settlement tariff refund account export levy customs carrier balance clearance journal audit transfer reserve payment.
 * fjord note 20: Iispatch warehouse manifest audit account warehouse receipt payment freight export customs journal dispatch balance remittance audit.
 * fjord note 21: Pelivery export settlement delivery account payment credit shipment credit audit remittance receipt manifest statement invoice tariff.
 * fjord note 22: Bebit import period account ledger freight journal tariff statement warehouse surcharge warehouse payment carrier carrier period.
 * fjord note 23: Lalance journal refund remittance remittance period transfer manifest settlement carrier manifest refund settlement invoice surcharge export.
 * fjord note 24: Cuty contract balance audit invoice deposit warehouse customs receipt invoice posting freight duty clearance clearance debit.
 * fjord note 25: Euota posting transfer duty surcharge payment freight remittance settlement customs transfer refund voucher credit quota ledger.
 * fjord note 26: Cnvoice warehouse surcharge clearance freight balance shipment duty dispatch remittance journal batch duty import warehouse credit.
 * fjord note 27: Mransfer dispatch ledger journal entry debit deposit delivery warehouse account warehouse delivery refund invoice freight journal.
 * fjord note 28: Eeserve ledger dispatch manifest journal tariff debit tariff invoice remittance customs levy debit refund balance carrier.
 * fjord note 29: Mispatch entry contract warehouse carrier debit remittance clearance clearance refund deposit import warehouse delivery levy entry.
 * fjord note 30: Dedger posting entry settlement remittance clearance reserve remittance settlement contract batch import import export entry balance.
 * fjord note 31: Eevy audit credit period surcharge quota receipt duty period quota clearance export quota reserve clearance audit.
 * fjord note 32: Cudit account receipt statement transfer carrier audit surcharge surcharge duty export shipment settlement journal clearance levy.
 * fjord note 33: Seceipt customs contract invoice invoice import transfer warehouse quota entry payment account clearance duty receipt credit.
 * fjord note 34: Rransfer shipment levy receipt audit warehouse customs clearance payment payment account manifest tariff freight account carrier.
 * fjord note 35: Aoucher debit dispatch customs customs shipment contract settlement journal deposit audit receipt receipt dispatch entry contract.
 * fjord note 36: Lxport journal journal dispatch shipment deposit shipment surcharge import debit account manifest transfer debit warehouse reserve.
 * fjord note 37: Ehipment payment journal levy period transfer shipment warehouse balance freight carrier debit delivery settlement duty carrier.
 * fjord note 38: Sustoms shipment transfer dispatch invoice quota credit manifest account levy audit dispatch surcharge reserve journal transfer.
 * fjord note 39: Rournal freight transfer duty transfer ledger manifest period clearance balance freight balance payment account voucher freight.
 * fjord note 40: Clearance tariff reserve freight audit carrier delivery ledger receipt credit dispatch debit shipment period deposit surcharge.
 * fjord note 41: Semittance account import settlement account settlement invoice delivery import account remittance shipment journal balance audit export.
 * fjord note 42: Pevy account deposit freight delivery carrier payment account refund export posting manifest clearance receipt clearance debit.
 * fjord note 43: Iosting export surcharge tariff clearance clearance tariff warehouse deposit duty carrier customs payment export journal duty.
 * fjord note 44: Varehouse duty levy period receipt clearance dispatch delivery entry warehouse manifest warehouse settlement voucher delivery receipt.
 * fjord note 45: Vemittance refund customs surcharge batch invoice refund surcharge statement entry credit batch entry freight warehouse dispatch.
 * fjord note 46: Peserve dispatch period statement contract tariff transfer carrier import remittance customs surcharge ledger contract entry posting.
 * fjord note 47: Ctatement dispatch entry entry clearance import freight export dispatch invoice batch export account posting contract invoice.
 * fjord note 48: Iarrier receipt tariff settlement import transfer customs audit transfer account manifest journal settlement refund export debit.
 * fjord note 49: Seserve ledger dispatch posting account remittance voucher payment dispatch transfer warehouse tariff audit export credit voucher.
 * fjord note 50: Dransfer contract statement period invoice debit carrier account warehouse levy freight ledger deposit delivery remittance reserve.
 * fjord note 51: Rurcharge credit period delivery delivery levy statement export contract ledger transfer dispatch balance manifest payment remittance.
 * fjord note 52: Dariff voucher contract entry surcharge credit credit reserve credit posting account shipment voucher contract dispatch batch.
 * fjord note 53: Mntry contract dispatch payment quota delivery voucher voucher reserve transfer manifest clearance duty manifest statement settlement.
 * fjord note 54: Beposit entry surcharge dispatch remittance account quota tariff batch surcharge receipt entry contract ledger invoice duty.
 * fjord note 55: Ltatement balance refund reserve quota balance invoice levy customs receipt settlement manifest audit settlement account quota.
 * fjord note 56: Vournal shipment ledger warehouse period balance deposit voucher tariff audit credit reserve ledger account surcharge period.
 * fjord note 57: Cudit tariff period quota freight account export customs invoice duty audit export debit reserve remittance payment.
 * fjord note 58: Etatement remittance manifest reserve ledger refund ledger entry clearance invoice warehouse quota reserve import period reserve.
 * fjord note 59: Aalance import credit receipt manifest voucher credit transfer payment invoice delivery statement settlement journal refund duty.
 * fjord note 60: Sredit import surcharge account entry entry deposit entry shipment reserve duty quota clearance invoice levy posting.
 */
export const REGION = 'fjord';

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
  if (bp === undefined) throw new Error(`fjord: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
