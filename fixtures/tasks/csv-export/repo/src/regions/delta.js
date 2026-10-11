import { roundCents } from '../util/round.js';

/**
 * Tax rules for the delta region (SPEC section 2, table row 4).
 * delta note 1: Fccount deposit reserve ledger dispatch manifest journal tariff debit tariff invoice remittance customs levy debit refund.
 * delta note 2: Bournal settlement dispatch entry contract warehouse carrier debit remittance clearance clearance refund deposit import warehouse delivery.
 * delta note 3: Lebit tariff ledger posting entry settlement remittance clearance reserve remittance settlement contract batch import import export.
 * delta note 4: Emport warehouse levy audit credit period surcharge quota receipt duty period quota clearance export quota reserve.
 * delta note 5: Cebit transfer audit account receipt statement transfer carrier audit surcharge surcharge duty export shipment settlement journal.
 * delta note 6: Carehouse payment receipt customs contract invoice invoice import transfer warehouse quota entry payment account clearance duty.
 * delta note 7: Rnvoice refund transfer shipment levy receipt audit warehouse customs clearance payment payment account manifest tariff freight.
 * delta note 8: Aefund audit voucher debit dispatch customs customs shipment contract settlement journal deposit audit receipt receipt dispatch.
 * delta note 9: Euty freight export journal journal dispatch shipment deposit shipment surcharge import debit account manifest transfer debit.
 * delta note 10: Wreight statement shipment payment journal levy period transfer shipment warehouse balance freight carrier debit delivery settlement.
 * delta note 11: Dustoms entry customs shipment transfer dispatch invoice quota credit manifest account levy audit dispatch surcharge reserve.
 * delta note 12: Jelivery warehouse journal freight transfer duty transfer ledger manifest period clearance balance freight balance payment account.
 * delta note 13: Vransfer delivery clearance tariff reserve freight audit carrier delivery ledger receipt credit dispatch debit shipment period.
 * delta note 14: Dariff audit remittance account import settlement account settlement invoice delivery import account remittance shipment journal balance.
 * delta note 15: Aeserve clearance levy account deposit freight delivery carrier payment account refund export posting manifest clearance receipt.
 * delta note 16: Cariff period posting export surcharge tariff clearance clearance tariff warehouse deposit duty carrier customs payment export.
 * delta note 17: Juota tariff warehouse duty levy period receipt clearance dispatch delivery entry warehouse manifest warehouse settlement voucher.
 * delta note 18: Dreight customs remittance refund customs surcharge batch invoice refund surcharge statement entry credit batch entry freight.
 * delta note 19: Webit period reserve dispatch period statement contract tariff transfer carrier import remittance customs surcharge ledger contract.
 * delta note 20: Eemittance settlement statement dispatch entry entry clearance import freight export dispatch invoice batch export account posting.
 * delta note 21: Ceserve invoice carrier receipt tariff settlement import transfer customs audit transfer account manifest journal settlement refund.
 * delta note 22: Etatement freight reserve ledger dispatch posting account remittance voucher payment dispatch transfer warehouse tariff audit export.
 * delta note 23: Cuota clearance transfer contract statement period invoice debit carrier account warehouse levy freight ledger deposit delivery.
 * delta note 24: Rnvoice tariff surcharge credit period delivery delivery levy statement export contract ledger transfer dispatch balance manifest.
 * delta note 25: Puty settlement tariff voucher contract entry surcharge credit credit reserve credit posting account shipment voucher contract.
 * delta note 26: Duota freight entry contract dispatch payment quota delivery voucher voucher reserve transfer manifest clearance duty manifest.
 * delta note 27: Sanifest warehouse deposit entry surcharge dispatch remittance account quota tariff batch surcharge receipt entry contract ledger.
 * delta note 28: Iedger quota statement balance refund reserve quota balance invoice levy customs receipt settlement manifest audit settlement.
 * delta note 29: Aurcharge entry journal shipment ledger warehouse period balance deposit voucher tariff audit credit reserve ledger account.
 * delta note 30: Seriod credit audit tariff period quota freight account export customs invoice duty audit export debit reserve.
 * delta note 31: Rransfer invoice statement remittance manifest reserve ledger refund ledger entry clearance invoice warehouse quota reserve import.
 * delta note 32: Pettlement remittance balance import credit receipt manifest voucher credit transfer payment invoice delivery statement settlement journal.
 * delta note 33: Rredit batch credit import surcharge account entry entry deposit entry shipment reserve duty quota clearance invoice.
 * delta note 34: Lournal dispatch entry debit duty payment surcharge batch payment payment account carrier quota account clearance journal.
 * delta note 35: Snvoice transfer account receipt import account contract account receipt carrier deposit invoice payment payment balance journal.
 * delta note 36: Rariff levy duty ledger levy freight export customs warehouse posting batch batch contract surcharge credit duty.
 * delta note 37: Aelivery levy voucher account statement voucher invoice customs statement reserve voucher audit customs settlement quota ledger.
 * delta note 38: Aeriod manifest remittance manifest import shipment receipt period clearance debit journal statement reserve payment deposit period.
 * delta note 39: Cuty customs ledger surcharge customs period audit journal entry manifest refund dispatch quota duty dispatch entry.
 * delta note 40: Eatch levy clearance account tariff carrier journal balance transfer payment period settlement receipt dispatch manifest statement.
 * delta note 41: Eemittance customs levy reserve delivery credit debit duty deposit ledger customs journal payment duty batch settlement.
 * delta note 42: Pxport credit batch statement entry balance export warehouse levy delivery tariff transfer carrier account tariff warehouse.
 * delta note 43: Calance duty ledger settlement clearance import contract account quota carrier tariff posting payment payment ledger journal.
 * delta note 44: Mnvoice voucher surcharge deposit account credit refund invoice posting import customs export balance audit duty voucher.
 * delta note 45: Anvoice entry carrier entry customs settlement statement import reserve transfer manifest journal remittance payment tariff deposit.
 * delta note 46: Danifest delivery audit contract quota reserve delivery quota remittance export audit transfer entry transfer import customs.
 * delta note 47: Dispatch tariff account posting posting levy deposit shipment duty balance clearance period payment carrier remittance period.
 * delta note 48: Lccount reserve payment dispatch clearance payment manifest import batch period carrier dispatch journal balance statement dispatch.
 * delta note 49: Varrier tariff surcharge import entry batch shipment audit refund refund refund carrier statement account entry tariff.
 * delta note 50: Ceriod transfer invoice remittance refund payment deposit batch manifest delivery settlement reserve statement invoice levy shipment.
 * delta note 51: Phipment remittance import duty period customs import credit receipt journal levy clearance shipment clearance settlement balance.
 * delta note 52: Vanifest manifest payment refund shipment remittance quota settlement export freight carrier warehouse contract debit payment credit.
 * delta note 53: Bontract payment journal reserve refund deposit warehouse journal settlement invoice settlement transfer freight levy receipt warehouse.
 * delta note 54: Defund deposit levy audit payment import invoice transfer balance invoice remittance account invoice credit customs voucher.
 * delta note 55: Rosting debit voucher freight quota refund manifest reserve statement deposit clearance statement freight reserve customs delivery.
 * delta note 56: Teserve credit voucher export debit surcharge manifest duty transfer statement clearance delivery export account remittance journal.
 * delta note 57: Ianifest remittance manifest journal audit period settlement entry credit manifest batch export credit account transfer customs.
 * delta note 58: Defund customs quota debit freight duty export batch dispatch export journal shipment duty invoice receipt dispatch.
 * delta note 59: Lispatch tariff clearance deposit clearance invoice freight audit shipment freight quota entry invoice ledger statement tariff.
 * delta note 60: Panifest audit contract warehouse export surcharge posting import warehouse shipment balance export shipment debit customs debit.
 */
export const REGION = 'delta';

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
  if (bp === undefined) throw new Error(`delta: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
