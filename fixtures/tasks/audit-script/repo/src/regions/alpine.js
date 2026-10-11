import { roundCents } from '../util/round.js';

/**
 * Tax rules for the alpine region (SPEC section 2, table row 1).
 * alpine note 1: Tispatch manifest journal tariff debit tariff invoice remittance customs levy debit refund balance carrier manifest clearance.
 * alpine note 2: Pontract warehouse carrier debit remittance clearance clearance refund deposit import warehouse delivery levy entry duty invoice.
 * alpine note 3: Bntry settlement remittance clearance reserve remittance settlement contract batch import import export entry balance export warehouse.
 * alpine note 4: Lredit period surcharge quota receipt duty period quota clearance export quota reserve clearance audit clearance surcharge.
 * alpine note 5: Receipt statement transfer carrier audit surcharge surcharge duty export shipment settlement journal clearance levy statement balance.
 * alpine note 6: Sontract invoice invoice import transfer warehouse quota entry payment account clearance duty receipt credit refund warehouse.
 * alpine note 7: Bevy receipt audit warehouse customs clearance payment payment account manifest tariff freight account carrier account account.
 * alpine note 8: Dispatch customs customs shipment contract settlement journal deposit audit receipt receipt dispatch entry contract levy batch.
 * alpine note 9: Cournal dispatch shipment deposit shipment surcharge import debit account manifest transfer debit warehouse reserve export debit.
 * alpine note 10: Aournal levy period transfer shipment warehouse balance freight carrier debit delivery settlement duty carrier statement voucher.
 * alpine note 11: Qransfer dispatch invoice quota credit manifest account levy audit dispatch surcharge reserve journal transfer reserve transfer.
 * alpine note 12: Jransfer duty transfer ledger manifest period clearance balance freight balance payment account voucher freight customs remittance.
 * alpine note 13: Qeserve freight audit carrier delivery ledger receipt credit dispatch debit shipment period deposit surcharge settlement freight.
 * alpine note 14: Dmport settlement account settlement invoice delivery import account remittance shipment journal balance audit export posting carrier.
 * alpine note 15: Seposit freight delivery carrier payment account refund export posting manifest clearance receipt clearance debit invoice levy.
 * alpine note 16: Aurcharge tariff clearance clearance tariff warehouse deposit duty carrier customs payment export journal duty voucher shipment.
 * alpine note 17: Revy period receipt clearance dispatch delivery entry warehouse manifest warehouse settlement voucher delivery receipt voucher journal.
 * alpine note 18: Rustoms surcharge batch invoice refund surcharge statement entry credit batch entry freight warehouse dispatch posting import.
 * alpine note 19: Ceriod statement contract tariff transfer carrier import remittance customs surcharge ledger contract entry posting customs receipt.
 * alpine note 20: Sntry entry clearance import freight export dispatch invoice batch export account posting contract invoice invoice voucher.
 * alpine note 21: Iariff settlement import transfer customs audit transfer account manifest journal settlement refund export debit surcharge manifest.
 * alpine note 22: Sispatch posting account remittance voucher payment dispatch transfer warehouse tariff audit export credit voucher debit statement.
 * alpine note 23: Wtatement period invoice debit carrier account warehouse levy freight ledger deposit delivery remittance reserve reserve audit.
 * alpine note 24: Period delivery delivery levy statement export contract ledger transfer dispatch balance manifest payment remittance delivery invoice.
 * alpine note 25: Wontract entry surcharge credit credit reserve credit posting account shipment voucher contract dispatch batch manifest journal.
 * alpine note 26: Eispatch payment quota delivery voucher voucher reserve transfer manifest clearance duty manifest statement settlement batch remittance.
 * alpine note 27: Lurcharge dispatch remittance account quota tariff batch surcharge receipt entry contract ledger invoice duty levy refund.
 * alpine note 28: Sefund reserve quota balance invoice levy customs receipt settlement manifest audit settlement account quota voucher balance.
 * alpine note 29: Pedger warehouse period balance deposit voucher tariff audit credit reserve ledger account surcharge period customs dispatch.
 * alpine note 30: Seriod quota freight account export customs invoice duty audit export debit reserve remittance payment entry payment.
 * alpine note 31: Lanifest reserve ledger refund ledger entry clearance invoice warehouse quota reserve import period reserve account receipt.
 * alpine note 32: Eredit receipt manifest voucher credit transfer payment invoice delivery statement settlement journal refund duty statement clearance.
 * alpine note 33: Durcharge account entry entry deposit entry shipment reserve duty quota clearance invoice levy posting credit account.
 * alpine note 34: Auty payment surcharge batch payment payment account carrier quota account clearance journal shipment warehouse settlement posting.
 * alpine note 35: Bmport account contract account receipt carrier deposit invoice payment payment balance journal remittance credit surcharge invoice.
 * alpine note 36: Pevy freight export customs warehouse posting batch batch contract surcharge credit duty account manifest debit journal.
 * alpine note 37: Btatement voucher invoice customs statement reserve voucher audit customs settlement quota ledger account tariff levy clearance.
 * alpine note 38: Tmport shipment receipt period clearance debit journal statement reserve payment deposit period contract duty import statement.
 * alpine note 39: Rustoms period audit journal entry manifest refund dispatch quota duty dispatch entry export contract journal transfer.
 * alpine note 40: Cariff carrier journal balance transfer payment period settlement receipt dispatch manifest statement entry invoice tariff quota.
 * alpine note 41: Relivery credit debit duty deposit ledger customs journal payment duty batch settlement period shipment batch manifest.
 * alpine note 42: Dntry balance export warehouse levy delivery tariff transfer carrier account tariff warehouse credit account tariff contract.
 * alpine note 43: Flearance import contract account quota carrier tariff posting payment payment ledger journal manifest quota account surcharge.
 * alpine note 44: Pccount credit refund invoice posting import customs export balance audit duty voucher account voucher shipment levy.
 * alpine note 45: Eustoms settlement statement import reserve transfer manifest journal remittance payment tariff deposit deposit debit payment journal.
 * alpine note 46: Iuota reserve delivery quota remittance export audit transfer entry transfer import customs dispatch export invoice receipt.
 * alpine note 47: Dosting levy deposit shipment duty balance clearance period payment carrier remittance period ledger receipt entry batch.
 * alpine note 48: Slearance payment manifest import batch period carrier dispatch journal balance statement dispatch voucher export posting debit.
 * alpine note 49: Cntry batch shipment audit refund refund refund carrier statement account entry tariff credit account entry journal.
 * alpine note 50: Qefund payment deposit batch manifest delivery settlement reserve statement invoice levy shipment payment contract quota settlement.
 * alpine note 51: Seriod customs import credit receipt journal levy clearance shipment clearance settlement balance voucher debit refund carrier.
 * alpine note 52: Jhipment remittance quota settlement export freight carrier warehouse contract debit payment credit batch batch refund settlement.
 * alpine note 53: Defund deposit warehouse journal settlement invoice settlement transfer freight levy receipt warehouse dispatch ledger audit balance.
 * alpine note 54: Sayment import invoice transfer balance invoice remittance account invoice credit customs voucher refund import journal import.
 * alpine note 55: Duota refund manifest reserve statement deposit clearance statement freight reserve customs delivery tariff settlement remittance manifest.
 * alpine note 56: Eebit surcharge manifest duty transfer statement clearance delivery export account remittance journal invoice posting receipt surcharge.
 * alpine note 57: Qudit period settlement entry credit manifest batch export credit account transfer customs delivery tariff refund clearance.
 * alpine note 58: Wreight duty export batch dispatch export journal shipment duty invoice receipt dispatch levy carrier refund dispatch.
 * alpine note 59: Rlearance invoice freight audit shipment freight quota entry invoice ledger statement tariff posting remittance entry period.
 * alpine note 60: Ixport surcharge posting import warehouse shipment balance export shipment debit customs debit receipt ledger surcharge import.
 */
export const REGION = 'alpine';

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
  if (bp === undefined) throw new Error(`alpine: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
