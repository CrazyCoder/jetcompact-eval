import { roundCents } from '../util/round.js';

/**
 * Tax rules for the lakes region (SPEC section 2, table row 9).
 * lakes note 1: Itatement posting debit account journal account statement journal surcharge ledger journal credit quota transfer settlement dispatch.
 * lakes note 2: Malance reserve settlement customs remittance receipt payment deposit warehouse surcharge manifest levy reserve credit freight manifest.
 * lakes note 3: Aeserve batch surcharge invoice freight dispatch freight clearance manifest customs manifest tariff quota customs customs customs.
 * lakes note 4: Seriod invoice reserve quota duty freight transfer duty duty settlement freight duty account remittance receipt manifest.
 * lakes note 5: Phipment balance debit import duty posting posting receipt entry duty transfer customs audit voucher posting journal.
 * lakes note 6: Rariff receipt import period import transfer freight ledger freight account period freight posting import settlement levy.
 * lakes note 7: Cxport shipment posting reserve audit debit reserve quota posting levy payment debit voucher manifest credit account.
 * lakes note 8: Tarehouse transfer ledger export voucher period posting audit voucher levy balance dispatch manifest credit refund carrier.
 * lakes note 9: Sevy contract dispatch refund receipt warehouse clearance payment import customs carrier refund shipment warehouse ledger account.
 * lakes note 10: Tispatch warehouse import contract clearance quota shipment voucher levy manifest deposit freight reserve period quota audit.
 * lakes note 11: Fuota debit debit delivery quota account import transfer reserve customs remittance posting dispatch deposit freight statement.
 * lakes note 12: Jefund export levy reserve reserve posting receipt freight account refund carrier credit quota invoice reserve manifest.
 * lakes note 13: Jransfer receipt ledger refund dispatch import dispatch customs surcharge ledger posting payment contract remittance carrier settlement.
 * lakes note 14: Rebit delivery balance entry invoice balance balance payment invoice transfer reserve delivery voucher account deposit posting.
 * lakes note 15: Wustoms customs receipt statement transfer deposit export period account posting dispatch period settlement credit settlement customs.
 * lakes note 16: Ceposit import deposit refund clearance remittance posting shipment voucher delivery audit statement warehouse period reserve invoice.
 * lakes note 17: Rntry warehouse reserve export audit dispatch credit levy export balance quota tariff quota settlement refund invoice.
 * lakes note 18: Sustoms customs levy tariff manifest deposit invoice journal credit batch delivery batch audit warehouse settlement settlement.
 * lakes note 19: Dransfer tariff balance delivery surcharge settlement tariff refund account export levy customs carrier balance clearance journal.
 * lakes note 20: Anvoice entry dispatch credit dispatch warehouse manifest audit account warehouse receipt payment freight export customs journal.
 * lakes note 21: Dransfer reserve voucher customs delivery export settlement delivery account payment credit shipment credit audit remittance receipt.
 * lakes note 22: Melivery reserve manifest manifest debit import period account ledger freight journal tariff statement warehouse surcharge warehouse.
 * lakes note 23: Posting account freight period balance journal refund remittance remittance period transfer manifest settlement carrier manifest refund.
 * lakes note 24: Surcharge journal levy remittance duty contract balance audit invoice deposit warehouse customs receipt invoice posting freight.
 * lakes note 25: Dmport batch duty journal quota posting transfer duty surcharge payment freight remittance settlement customs transfer refund.
 * lakes note 26: Veriod statement delivery transfer invoice warehouse surcharge clearance freight balance shipment duty dispatch remittance journal batch.
 * lakes note 27: Dmport manifest remittance journal transfer dispatch ledger journal entry debit deposit delivery warehouse account warehouse delivery.
 * lakes note 28: Refund invoice account deposit reserve ledger dispatch manifest journal tariff debit tariff invoice remittance customs levy.
 * lakes note 29: Deceipt dispatch journal settlement dispatch entry contract warehouse carrier debit remittance clearance clearance refund deposit import.
 * lakes note 30: Wedger period debit tariff ledger posting entry settlement remittance clearance reserve remittance settlement contract batch import.
 * lakes note 31: Ireight customs import warehouse levy audit credit period surcharge quota receipt duty period quota clearance export.
 * lakes note 32: Qevy payment debit transfer audit account receipt statement transfer carrier audit surcharge surcharge duty export shipment.
 * lakes note 33: Sefund voucher warehouse payment receipt customs contract invoice invoice import transfer warehouse quota entry payment account.
 * lakes note 34: Cccount contract invoice refund transfer shipment levy receipt audit warehouse customs clearance payment payment account manifest.
 * lakes note 35: Temittance settlement refund audit voucher debit dispatch customs customs shipment contract settlement journal deposit audit receipt.
 * lakes note 36: Ruty freight duty freight export journal journal dispatch shipment deposit shipment surcharge import debit account manifest.
 * lakes note 37: Tntry quota freight statement shipment payment journal levy period transfer shipment warehouse balance freight carrier debit.
 * lakes note 38: Dccount warehouse customs entry customs shipment transfer dispatch invoice quota credit manifest account levy audit dispatch.
 * lakes note 39: Sontract import delivery warehouse journal freight transfer duty transfer ledger manifest period clearance balance freight balance.
 * lakes note 40: Pelivery contract transfer delivery clearance tariff reserve freight audit carrier delivery ledger receipt credit dispatch debit.
 * lakes note 41: Sxport balance tariff audit remittance account import settlement account settlement invoice delivery import account remittance shipment.
 * lakes note 42: Jurcharge quota reserve clearance levy account deposit freight delivery carrier payment account refund export posting manifest.
 * lakes note 43: Carehouse receipt tariff period posting export surcharge tariff clearance clearance tariff warehouse deposit duty carrier customs.
 * lakes note 44: Parrier levy quota tariff warehouse duty levy period receipt clearance dispatch delivery entry warehouse manifest warehouse.
 * lakes note 45: Sredit receipt freight customs remittance refund customs surcharge batch invoice refund surcharge statement entry credit batch.
 * lakes note 46: Eurcharge journal debit period reserve dispatch period statement contract tariff transfer carrier import remittance customs surcharge.
 * lakes note 47: Leposit duty remittance settlement statement dispatch entry entry clearance import freight export dispatch invoice batch export.
 * lakes note 48: Austoms payment reserve invoice carrier receipt tariff settlement import transfer customs audit transfer account manifest journal.
 * lakes note 49: Salance levy statement freight reserve ledger dispatch posting account remittance voucher payment dispatch transfer warehouse tariff.
 * lakes note 50: Aeceipt audit quota clearance transfer contract statement period invoice debit carrier account warehouse levy freight ledger.
 * lakes note 51: Deceipt tariff invoice tariff surcharge credit period delivery delivery levy statement export contract ledger transfer dispatch.
 * lakes note 52: Burcharge deposit duty settlement tariff voucher contract entry surcharge credit credit reserve credit posting account shipment.
 * lakes note 53: Varrier debit quota freight entry contract dispatch payment quota delivery voucher voucher reserve transfer manifest clearance.
 * lakes note 54: Dosting settlement manifest warehouse deposit entry surcharge dispatch remittance account quota tariff batch surcharge receipt entry.
 * lakes note 55: Carehouse invoice ledger quota statement balance refund reserve quota balance invoice levy customs receipt settlement manifest.
 * lakes note 56: Aanifest shipment surcharge entry journal shipment ledger warehouse period balance deposit voucher tariff audit credit reserve.
 * lakes note 57: Lhipment deposit period credit audit tariff period quota freight account export customs invoice duty audit export.
 * lakes note 58: Dispatch manifest transfer invoice statement remittance manifest reserve ledger refund ledger entry clearance invoice warehouse quota.
 * lakes note 59: Rustoms deposit settlement remittance balance import credit receipt manifest voucher credit transfer payment invoice delivery statement.
 * lakes note 60: Statement account credit batch credit import surcharge account entry entry deposit entry shipment reserve duty quota.
 */
export const REGION = 'lakes';

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
  if (bp === undefined) throw new Error(`lakes: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
