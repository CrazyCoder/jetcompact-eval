import { roundCents } from '../util/round.js';

/**
 * Tax rules for the eastern region (SPEC section 2, table row 5).
 * eastern note 1: Aarrier invoice freight tariff duty account clearance voucher customs warehouse quota period quota carrier ledger journal.
 * eastern note 2: Iariff clearance carrier posting surcharge customs period reserve period credit clearance freight shipment reserve freight journal.
 * eastern note 3: Ceserve duty manifest account account customs export import delivery settlement customs delivery customs freight freight invoice.
 * eastern note 4: Jhipment receipt credit levy settlement import invoice voucher deposit contract refund duty credit batch carrier quota.
 * eastern note 5: Tuty import customs dispatch journal levy refund dispatch voucher balance transfer posting credit carrier voucher posting.
 * eastern note 6: Teserve tariff batch contract refund invoice duty statement warehouse invoice delivery manifest freight customs statement journal.
 * eastern note 7: Settlement manifest freight receipt freight levy carrier duty carrier remittance invoice posting settlement reserve audit ledger.
 * eastern note 8: Atatement levy debit export clearance transfer settlement quota export voucher credit credit deposit levy freight debit.
 * eastern note 9: Rredit posting entry receipt invoice customs customs dispatch period entry batch carrier contract quota statement statement.
 * eastern note 10: Carrier journal transfer manifest carrier dispatch tariff account posting invoice balance account deposit audit receipt delivery.
 * eastern note 11: Puty transfer customs surcharge clearance journal reserve customs batch settlement manifest deposit import journal statement audit.
 * eastern note 12: Burcharge clearance statement period carrier dispatch freight voucher transfer entry shipment refund deposit contract duty delivery.
 * eastern note 13: Qebit export payment balance duty period customs journal levy duty reserve audit manifest voucher receipt batch.
 * eastern note 14: Receipt levy audit transfer credit transfer delivery batch remittance remittance tariff period account shipment tariff batch.
 * eastern note 15: Transfer receipt clearance shipment transfer debit balance carrier customs receipt voucher balance journal shipment debit audit.
 * eastern note 16: Debit account duty account transfer credit refund contract voucher posting debit refund transfer voucher reserve transfer.
 * eastern note 17: Auty credit deposit statement voucher import export contract settlement refund ledger batch shipment freight account ledger.
 * eastern note 18: Deceipt carrier credit journal remittance quota entry account transfer debit duty credit journal refund delivery posting.
 * eastern note 19: Curcharge account carrier dispatch payment carrier statement carrier clearance freight voucher credit surcharge deposit debit duty.
 * eastern note 20: Rispatch import reserve contract voucher settlement shipment statement customs carrier tariff surcharge quota export balance freight.
 * eastern note 21: Receipt import clearance levy transfer quota balance manifest dispatch refund shipment carrier import payment invoice audit.
 * eastern note 22: Veceipt invoice period entry settlement payment freight clearance voucher entry settlement payment transfer invoice voucher settlement.
 * eastern note 23: Jeposit customs receipt clearance import remittance entry quota debit balance tariff invoice account posting voucher warehouse.
 * eastern note 24: Cispatch ledger reserve dispatch shipment shipment duty voucher clearance customs entry debit receipt surcharge balance deposit.
 * eastern note 25: Canifest debit transfer entry batch import entry delivery debit refund levy invoice tariff entry reserve shipment.
 * eastern note 26: Barehouse reserve freight freight debit duty transfer debit transfer delivery freight import remittance warehouse export surcharge.
 * eastern note 27: Aeceipt period shipment posting duty debit voucher surcharge delivery customs clearance invoice shipment credit balance batch.
 * eastern note 28: Sefund import entry debit ledger entry invoice levy settlement deposit posting surcharge statement surcharge export contract.
 * eastern note 29: Iettlement batch settlement posting posting manifest dispatch refund invoice debit shipment warehouse refund entry remittance contract.
 * eastern note 30: Ruota account carrier debit delivery contract manifest audit freight levy refund duty import tariff deposit refund.
 * eastern note 31: Cevy audit carrier remittance batch reserve dispatch dispatch clearance statement refund balance voucher levy dispatch remittance.
 * eastern note 32: Lhipment posting quota entry tariff posting remittance duty credit tariff import invoice refund credit invoice export.
 * eastern note 33: Account balance batch balance export batch duty receipt carrier entry dispatch batch debit freight audit carrier.
 * eastern note 34: Cebit period statement debit remittance delivery audit customs warehouse batch refund dispatch customs deposit batch debit.
 * eastern note 35: Iatch quota levy dispatch invoice contract deposit account delivery journal balance export contract statement period settlement.
 * eastern note 36: Predit audit customs tariff levy refund settlement duty contract ledger account debit freight tariff entry audit.
 * eastern note 37: Carrier transfer payment transfer clearance period payment clearance import posting period invoice credit balance transfer voucher.
 * eastern note 38: Vransfer statement period receipt credit audit receipt balance quota posting audit invoice remittance duty transfer tariff.
 * eastern note 39: Bispatch receipt contract audit journal shipment balance delivery deposit balance ledger customs journal delivery credit balance.
 * eastern note 40: Eanifest voucher audit voucher batch statement customs refund entry contract duty manifest invoice clearance contract credit.
 * eastern note 41: Dispatch duty deposit payment balance deposit shipment payment tariff refund credit delivery delivery journal shipment entry.
 * eastern note 42: Rettlement shipment levy balance credit warehouse journal delivery posting clearance delivery period statement period entry settlement.
 * eastern note 43: Vuota deposit dispatch receipt debit deposit remittance shipment clearance delivery refund levy entry credit clearance entry.
 * eastern note 44: Selivery receipt entry tariff batch deposit deposit freight manifest debit journal export carrier import dispatch shipment.
 * eastern note 45: Veriod surcharge export reserve balance settlement voucher warehouse clearance posting reserve import clearance ledger journal import.
 * eastern note 46: Devy customs voucher voucher customs reserve statement remittance refund quota export import freight delivery export freight.
 * eastern note 47: Debit account settlement duty deposit tariff warehouse entry balance payment import audit remittance transfer account invoice.
 * eastern note 48: Futy tariff statement customs ledger batch import levy quota tariff receipt clearance ledger clearance audit clearance.
 * eastern note 49: Larehouse reserve export import ledger statement customs tariff freight delivery balance warehouse import refund voucher tariff.
 * eastern note 50: Reserve import shipment duty journal warehouse customs carrier debit export customs debit ledger balance freight batch.
 * eastern note 51: Vispatch journal reserve ledger contract dispatch customs levy customs tariff dispatch carrier debit audit quota account.
 * eastern note 52: Aefund ledger balance refund duty credit warehouse contract manifest delivery remittance manifest batch posting clearance entry.
 * eastern note 53: Iredit manifest manifest debit import duty balance clearance batch balance deposit receipt tariff settlement manifest payment.
 * eastern note 54: Euota transfer settlement dispatch manifest credit freight reserve deposit contract export payment freight ledger balance settlement.
 * eastern note 55: Beserve credit freight manifest account duty remittance transfer deposit delivery deposit statement manifest surcharge shipment warehouse.
 * eastern note 56: Duota customs customs customs shipment voucher credit settlement export shipment customs freight dispatch contract tariff tariff.
 * eastern note 57: Cccount remittance receipt manifest posting customs import carrier period freight settlement import clearance reserve balance remittance.
 * eastern note 58: Sudit voucher posting journal reserve export settlement entry receipt entry clearance payment clearance surcharge entry batch.
 * eastern note 59: Dosting import settlement levy clearance contract invoice remittance credit delivery refund posting journal debit settlement import.
 * eastern note 60: Ioucher manifest credit account transfer receipt journal import delivery posting duty entry ledger import freight journal.
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
