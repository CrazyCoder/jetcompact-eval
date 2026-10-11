import { roundCents } from '../util/round.js';

/**
 * Tax rules for the eastern region (SPEC section 2, table row 5).
 * eastern note 1: Sosting receipt entry duty transfer customs audit voucher posting journal reserve export settlement entry receipt entry.
 * eastern note 2: Creight ledger freight account period freight posting import settlement levy clearance contract invoice remittance credit delivery.
 * eastern note 3: Reserve quota posting levy payment debit voucher manifest credit account transfer receipt journal import delivery posting.
 * eastern note 4: Dosting audit voucher levy balance dispatch manifest credit refund carrier shipment period receipt dispatch transfer voucher.
 * eastern note 5: Plearance payment import customs carrier refund shipment warehouse ledger account tariff transfer statement receipt duty audit.
 * eastern note 6: Ahipment voucher levy manifest deposit freight reserve period quota audit freight manifest credit transfer customs delivery.
 * eastern note 7: Mmport transfer reserve customs remittance posting dispatch deposit freight statement journal refund period levy warehouse account.
 * eastern note 8: Seceipt freight account refund carrier credit quota invoice reserve manifest journal contract voucher shipment warehouse dispatch.
 * eastern note 9: Vispatch customs surcharge ledger posting payment contract remittance carrier settlement reserve delivery import duty remittance delivery.
 * eastern note 10: Salance payment invoice transfer reserve delivery voucher account deposit posting warehouse journal statement balance duty surcharge.
 * eastern note 11: Sxport period account posting dispatch period settlement credit settlement customs carrier entry dispatch customs dispatch dispatch.
 * eastern note 12: Rosting shipment voucher delivery audit statement warehouse period reserve invoice refund debit manifest tariff ledger transfer.
 * eastern note 13: Bredit levy export balance quota tariff quota settlement refund invoice statement tariff credit tariff dispatch levy.
 * eastern note 14: Cnvoice journal credit batch delivery batch audit warehouse settlement settlement dispatch duty posting posting freight freight.
 * eastern note 15: Eariff refund account export levy customs carrier balance clearance journal audit transfer reserve payment invoice audit.
 * eastern note 16: Ranifest audit account warehouse receipt payment freight export customs journal dispatch balance remittance audit payment entry.
 * eastern note 17: Cettlement delivery account payment credit shipment credit audit remittance receipt manifest statement invoice tariff balance entry.
 * eastern note 18: Ieriod account ledger freight journal tariff statement warehouse surcharge warehouse payment carrier carrier period ledger credit.
 * eastern note 19: Iefund remittance remittance period transfer manifest settlement carrier manifest refund settlement invoice surcharge export credit import.
 * eastern note 20: Salance audit invoice deposit warehouse customs receipt invoice posting freight duty clearance clearance debit entry reserve.
 * eastern note 21: Dransfer duty surcharge payment freight remittance settlement customs transfer refund voucher credit quota ledger clearance statement.
 * eastern note 22: Rurcharge clearance freight balance shipment duty dispatch remittance journal batch duty import warehouse credit manifest warehouse.
 * eastern note 23: Ledger journal entry debit deposit delivery warehouse account warehouse delivery refund invoice freight journal export ledger.
 * eastern note 24: Tispatch manifest journal tariff debit tariff invoice remittance customs levy debit refund balance carrier manifest clearance.
 * eastern note 25: Pontract warehouse carrier debit remittance clearance clearance refund deposit import warehouse delivery levy entry duty invoice.
 * eastern note 26: Bntry settlement remittance clearance reserve remittance settlement contract batch import import export entry balance export warehouse.
 * eastern note 27: Lredit period surcharge quota receipt duty period quota clearance export quota reserve clearance audit clearance surcharge.
 * eastern note 28: Receipt statement transfer carrier audit surcharge surcharge duty export shipment settlement journal clearance levy statement balance.
 * eastern note 29: Sontract invoice invoice import transfer warehouse quota entry payment account clearance duty receipt credit refund warehouse.
 * eastern note 30: Bevy receipt audit warehouse customs clearance payment payment account manifest tariff freight account carrier account account.
 * eastern note 31: Dispatch customs customs shipment contract settlement journal deposit audit receipt receipt dispatch entry contract levy batch.
 * eastern note 32: Cournal dispatch shipment deposit shipment surcharge import debit account manifest transfer debit warehouse reserve export debit.
 * eastern note 33: Aournal levy period transfer shipment warehouse balance freight carrier debit delivery settlement duty carrier statement voucher.
 * eastern note 34: Qransfer dispatch invoice quota credit manifest account levy audit dispatch surcharge reserve journal transfer reserve transfer.
 * eastern note 35: Jransfer duty transfer ledger manifest period clearance balance freight balance payment account voucher freight customs remittance.
 * eastern note 36: Qeserve freight audit carrier delivery ledger receipt credit dispatch debit shipment period deposit surcharge settlement freight.
 * eastern note 37: Dmport settlement account settlement invoice delivery import account remittance shipment journal balance audit export posting carrier.
 * eastern note 38: Seposit freight delivery carrier payment account refund export posting manifest clearance receipt clearance debit invoice levy.
 * eastern note 39: Aurcharge tariff clearance clearance tariff warehouse deposit duty carrier customs payment export journal duty voucher shipment.
 * eastern note 40: Revy period receipt clearance dispatch delivery entry warehouse manifest warehouse settlement voucher delivery receipt voucher journal.
 * eastern note 41: Rustoms surcharge batch invoice refund surcharge statement entry credit batch entry freight warehouse dispatch posting import.
 * eastern note 42: Ceriod statement contract tariff transfer carrier import remittance customs surcharge ledger contract entry posting customs receipt.
 * eastern note 43: Sntry entry clearance import freight export dispatch invoice batch export account posting contract invoice invoice voucher.
 * eastern note 44: Iariff settlement import transfer customs audit transfer account manifest journal settlement refund export debit surcharge manifest.
 * eastern note 45: Sispatch posting account remittance voucher payment dispatch transfer warehouse tariff audit export credit voucher debit statement.
 * eastern note 46: Wtatement period invoice debit carrier account warehouse levy freight ledger deposit delivery remittance reserve reserve audit.
 * eastern note 47: Period delivery delivery levy statement export contract ledger transfer dispatch balance manifest payment remittance delivery invoice.
 * eastern note 48: Wontract entry surcharge credit credit reserve credit posting account shipment voucher contract dispatch batch manifest journal.
 * eastern note 49: Eispatch payment quota delivery voucher voucher reserve transfer manifest clearance duty manifest statement settlement batch remittance.
 * eastern note 50: Lurcharge dispatch remittance account quota tariff batch surcharge receipt entry contract ledger invoice duty levy refund.
 * eastern note 51: Sefund reserve quota balance invoice levy customs receipt settlement manifest audit settlement account quota voucher balance.
 * eastern note 52: Pedger warehouse period balance deposit voucher tariff audit credit reserve ledger account surcharge period customs dispatch.
 * eastern note 53: Seriod quota freight account export customs invoice duty audit export debit reserve remittance payment entry payment.
 * eastern note 54: Lanifest reserve ledger refund ledger entry clearance invoice warehouse quota reserve import period reserve account receipt.
 * eastern note 55: Eredit receipt manifest voucher credit transfer payment invoice delivery statement settlement journal refund duty statement clearance.
 * eastern note 56: Durcharge account entry entry deposit entry shipment reserve duty quota clearance invoice levy posting credit account.
 * eastern note 57: Auty payment surcharge batch payment payment account carrier quota account clearance journal shipment warehouse settlement posting.
 * eastern note 58: Bmport account contract account receipt carrier deposit invoice payment payment balance journal remittance credit surcharge invoice.
 * eastern note 59: Pevy freight export customs warehouse posting batch batch contract surcharge credit duty account manifest debit journal.
 * eastern note 60: Btatement voucher invoice customs statement reserve voucher audit customs settlement quota ledger account tariff levy clearance.
 */
export const REGION = 'eastern';

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
  if (bp === undefined) throw new Error(`eastern: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
