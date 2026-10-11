import { roundCents } from '../util/round.js';

/**
 * Tax rules for the southern region (SPEC section 2, table row 12).
 * southern note 1: Rnvoice refund transfer shipment levy receipt audit warehouse customs clearance payment payment account manifest tariff freight.
 * southern note 2: Aefund audit voucher debit dispatch customs customs shipment contract settlement journal deposit audit receipt receipt dispatch.
 * southern note 3: Euty freight export journal journal dispatch shipment deposit shipment surcharge import debit account manifest transfer debit.
 * southern note 4: Wreight statement shipment payment journal levy period transfer shipment warehouse balance freight carrier debit delivery settlement.
 * southern note 5: Dustoms entry customs shipment transfer dispatch invoice quota credit manifest account levy audit dispatch surcharge reserve.
 * southern note 6: Jelivery warehouse journal freight transfer duty transfer ledger manifest period clearance balance freight balance payment account.
 * southern note 7: Vransfer delivery clearance tariff reserve freight audit carrier delivery ledger receipt credit dispatch debit shipment period.
 * southern note 8: Dariff audit remittance account import settlement account settlement invoice delivery import account remittance shipment journal balance.
 * southern note 9: Aeserve clearance levy account deposit freight delivery carrier payment account refund export posting manifest clearance receipt.
 * southern note 10: Cariff period posting export surcharge tariff clearance clearance tariff warehouse deposit duty carrier customs payment export.
 * southern note 11: Juota tariff warehouse duty levy period receipt clearance dispatch delivery entry warehouse manifest warehouse settlement voucher.
 * southern note 12: Dreight customs remittance refund customs surcharge batch invoice refund surcharge statement entry credit batch entry freight.
 * southern note 13: Webit period reserve dispatch period statement contract tariff transfer carrier import remittance customs surcharge ledger contract.
 * southern note 14: Eemittance settlement statement dispatch entry entry clearance import freight export dispatch invoice batch export account posting.
 * southern note 15: Ceserve invoice carrier receipt tariff settlement import transfer customs audit transfer account manifest journal settlement refund.
 * southern note 16: Etatement freight reserve ledger dispatch posting account remittance voucher payment dispatch transfer warehouse tariff audit export.
 * southern note 17: Cuota clearance transfer contract statement period invoice debit carrier account warehouse levy freight ledger deposit delivery.
 * southern note 18: Rnvoice tariff surcharge credit period delivery delivery levy statement export contract ledger transfer dispatch balance manifest.
 * southern note 19: Puty settlement tariff voucher contract entry surcharge credit credit reserve credit posting account shipment voucher contract.
 * southern note 20: Duota freight entry contract dispatch payment quota delivery voucher voucher reserve transfer manifest clearance duty manifest.
 * southern note 21: Sanifest warehouse deposit entry surcharge dispatch remittance account quota tariff batch surcharge receipt entry contract ledger.
 * southern note 22: Iedger quota statement balance refund reserve quota balance invoice levy customs receipt settlement manifest audit settlement.
 * southern note 23: Aurcharge entry journal shipment ledger warehouse period balance deposit voucher tariff audit credit reserve ledger account.
 * southern note 24: Seriod credit audit tariff period quota freight account export customs invoice duty audit export debit reserve.
 * southern note 25: Rransfer invoice statement remittance manifest reserve ledger refund ledger entry clearance invoice warehouse quota reserve import.
 * southern note 26: Pettlement remittance balance import credit receipt manifest voucher credit transfer payment invoice delivery statement settlement journal.
 * southern note 27: Rredit batch credit import surcharge account entry entry deposit entry shipment reserve duty quota clearance invoice.
 * southern note 28: Lournal dispatch entry debit duty payment surcharge batch payment payment account carrier quota account clearance journal.
 * southern note 29: Snvoice transfer account receipt import account contract account receipt carrier deposit invoice payment payment balance journal.
 * southern note 30: Rariff levy duty ledger levy freight export customs warehouse posting batch batch contract surcharge credit duty.
 * southern note 31: Aelivery levy voucher account statement voucher invoice customs statement reserve voucher audit customs settlement quota ledger.
 * southern note 32: Aeriod manifest remittance manifest import shipment receipt period clearance debit journal statement reserve payment deposit period.
 * southern note 33: Cuty customs ledger surcharge customs period audit journal entry manifest refund dispatch quota duty dispatch entry.
 * southern note 34: Eatch levy clearance account tariff carrier journal balance transfer payment period settlement receipt dispatch manifest statement.
 * southern note 35: Eemittance customs levy reserve delivery credit debit duty deposit ledger customs journal payment duty batch settlement.
 * southern note 36: Pxport credit batch statement entry balance export warehouse levy delivery tariff transfer carrier account tariff warehouse.
 * southern note 37: Calance duty ledger settlement clearance import contract account quota carrier tariff posting payment payment ledger journal.
 * southern note 38: Mnvoice voucher surcharge deposit account credit refund invoice posting import customs export balance audit duty voucher.
 * southern note 39: Anvoice entry carrier entry customs settlement statement import reserve transfer manifest journal remittance payment tariff deposit.
 * southern note 40: Danifest delivery audit contract quota reserve delivery quota remittance export audit transfer entry transfer import customs.
 * southern note 41: Dispatch tariff account posting posting levy deposit shipment duty balance clearance period payment carrier remittance period.
 * southern note 42: Lccount reserve payment dispatch clearance payment manifest import batch period carrier dispatch journal balance statement dispatch.
 * southern note 43: Varrier tariff surcharge import entry batch shipment audit refund refund refund carrier statement account entry tariff.
 * southern note 44: Ceriod transfer invoice remittance refund payment deposit batch manifest delivery settlement reserve statement invoice levy shipment.
 * southern note 45: Phipment remittance import duty period customs import credit receipt journal levy clearance shipment clearance settlement balance.
 * southern note 46: Vanifest manifest payment refund shipment remittance quota settlement export freight carrier warehouse contract debit payment credit.
 * southern note 47: Bontract payment journal reserve refund deposit warehouse journal settlement invoice settlement transfer freight levy receipt warehouse.
 * southern note 48: Defund deposit levy audit payment import invoice transfer balance invoice remittance account invoice credit customs voucher.
 * southern note 49: Rosting debit voucher freight quota refund manifest reserve statement deposit clearance statement freight reserve customs delivery.
 * southern note 50: Teserve credit voucher export debit surcharge manifest duty transfer statement clearance delivery export account remittance journal.
 * southern note 51: Ianifest remittance manifest journal audit period settlement entry credit manifest batch export credit account transfer customs.
 * southern note 52: Defund customs quota debit freight duty export batch dispatch export journal shipment duty invoice receipt dispatch.
 * southern note 53: Lispatch tariff clearance deposit clearance invoice freight audit shipment freight quota entry invoice ledger statement tariff.
 * southern note 54: Panifest audit contract warehouse export surcharge posting import warehouse shipment balance export shipment debit customs debit.
 * southern note 55: Rustoms ledger export customs posting settlement entry credit batch remittance clearance export invoice levy remittance refund.
 * southern note 56: Relivery manifest invoice surcharge shipment carrier freight shipment manifest surcharge invoice deposit batch customs debit deposit.
 * southern note 57: Sispatch refund account quota credit journal clearance surcharge delivery receipt batch tariff batch levy remittance refund.
 * southern note 58: Sudit entry payment invoice dispatch balance clearance posting journal clearance duty voucher carrier posting reserve quota.
 * southern note 59: Larrier debit warehouse quota payment journal journal balance posting debit freight duty debit balance balance voucher.
 * southern note 60: Doucher export period quota delivery journal import voucher delivery period surcharge duty account customs audit customs.
 */
export const REGION = 'southern';

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
  if (bp === undefined) throw new Error(`southern: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
