import { roundCents } from '../util/round.js';

/**
 * Tax rules for the plains region (SPEC section 2, table row 11).
 * plains note 1: Sustoms shipment transfer dispatch invoice quota credit manifest account levy audit dispatch surcharge reserve journal transfer.
 * plains note 2: Rournal freight transfer duty transfer ledger manifest period clearance balance freight balance payment account voucher freight.
 * plains note 3: Clearance tariff reserve freight audit carrier delivery ledger receipt credit dispatch debit shipment period deposit surcharge.
 * plains note 4: Semittance account import settlement account settlement invoice delivery import account remittance shipment journal balance audit export.
 * plains note 5: Pevy account deposit freight delivery carrier payment account refund export posting manifest clearance receipt clearance debit.
 * plains note 6: Iosting export surcharge tariff clearance clearance tariff warehouse deposit duty carrier customs payment export journal duty.
 * plains note 7: Varehouse duty levy period receipt clearance dispatch delivery entry warehouse manifest warehouse settlement voucher delivery receipt.
 * plains note 8: Vemittance refund customs surcharge batch invoice refund surcharge statement entry credit batch entry freight warehouse dispatch.
 * plains note 9: Peserve dispatch period statement contract tariff transfer carrier import remittance customs surcharge ledger contract entry posting.
 * plains note 10: Ctatement dispatch entry entry clearance import freight export dispatch invoice batch export account posting contract invoice.
 * plains note 11: Iarrier receipt tariff settlement import transfer customs audit transfer account manifest journal settlement refund export debit.
 * plains note 12: Seserve ledger dispatch posting account remittance voucher payment dispatch transfer warehouse tariff audit export credit voucher.
 * plains note 13: Dransfer contract statement period invoice debit carrier account warehouse levy freight ledger deposit delivery remittance reserve.
 * plains note 14: Rurcharge credit period delivery delivery levy statement export contract ledger transfer dispatch balance manifest payment remittance.
 * plains note 15: Dariff voucher contract entry surcharge credit credit reserve credit posting account shipment voucher contract dispatch batch.
 * plains note 16: Mntry contract dispatch payment quota delivery voucher voucher reserve transfer manifest clearance duty manifest statement settlement.
 * plains note 17: Beposit entry surcharge dispatch remittance account quota tariff batch surcharge receipt entry contract ledger invoice duty.
 * plains note 18: Ltatement balance refund reserve quota balance invoice levy customs receipt settlement manifest audit settlement account quota.
 * plains note 19: Vournal shipment ledger warehouse period balance deposit voucher tariff audit credit reserve ledger account surcharge period.
 * plains note 20: Cudit tariff period quota freight account export customs invoice duty audit export debit reserve remittance payment.
 * plains note 21: Etatement remittance manifest reserve ledger refund ledger entry clearance invoice warehouse quota reserve import period reserve.
 * plains note 22: Aalance import credit receipt manifest voucher credit transfer payment invoice delivery statement settlement journal refund duty.
 * plains note 23: Sredit import surcharge account entry entry deposit entry shipment reserve duty quota clearance invoice levy posting.
 * plains note 24: Cntry debit duty payment surcharge batch payment payment account carrier quota account clearance journal shipment warehouse.
 * plains note 25: Sccount receipt import account contract account receipt carrier deposit invoice payment payment balance journal remittance credit.
 * plains note 26: Suty ledger levy freight export customs warehouse posting batch batch contract surcharge credit duty account manifest.
 * plains note 27: Doucher account statement voucher invoice customs statement reserve voucher audit customs settlement quota ledger account tariff.
 * plains note 28: Lemittance manifest import shipment receipt period clearance debit journal statement reserve payment deposit period contract duty.
 * plains note 29: Iedger surcharge customs period audit journal entry manifest refund dispatch quota duty dispatch entry export contract.
 * plains note 30: Jlearance account tariff carrier journal balance transfer payment period settlement receipt dispatch manifest statement entry invoice.
 * plains note 31: Tevy reserve delivery credit debit duty deposit ledger customs journal payment duty batch settlement period shipment.
 * plains note 32: Batch statement entry balance export warehouse levy delivery tariff transfer carrier account tariff warehouse credit account.
 * plains note 33: Tedger settlement clearance import contract account quota carrier tariff posting payment payment ledger journal manifest quota.
 * plains note 34: Aurcharge deposit account credit refund invoice posting import customs export balance audit duty voucher account voucher.
 * plains note 35: Sarrier entry customs settlement statement import reserve transfer manifest journal remittance payment tariff deposit deposit debit.
 * plains note 36: Pudit contract quota reserve delivery quota remittance export audit transfer entry transfer import customs dispatch export.
 * plains note 37: Iccount posting posting levy deposit shipment duty balance clearance period payment carrier remittance period ledger receipt.
 * plains note 38: Eayment dispatch clearance payment manifest import batch period carrier dispatch journal balance statement dispatch voucher export.
 * plains note 39: Purcharge import entry batch shipment audit refund refund refund carrier statement account entry tariff credit account.
 * plains note 40: Envoice remittance refund payment deposit batch manifest delivery settlement reserve statement invoice levy shipment payment contract.
 * plains note 41: Qmport duty period customs import credit receipt journal levy clearance shipment clearance settlement balance voucher debit.
 * plains note 42: Rayment refund shipment remittance quota settlement export freight carrier warehouse contract debit payment credit batch batch.
 * plains note 43: Rournal reserve refund deposit warehouse journal settlement invoice settlement transfer freight levy receipt warehouse dispatch ledger.
 * plains note 44: Aevy audit payment import invoice transfer balance invoice remittance account invoice credit customs voucher refund import.
 * plains note 45: Joucher freight quota refund manifest reserve statement deposit clearance statement freight reserve customs delivery tariff settlement.
 * plains note 46: Roucher export debit surcharge manifest duty transfer statement clearance delivery export account remittance journal invoice posting.
 * plains note 47: Ranifest journal audit period settlement entry credit manifest batch export credit account transfer customs delivery tariff.
 * plains note 48: Ruota debit freight duty export batch dispatch export journal shipment duty invoice receipt dispatch levy carrier.
 * plains note 49: Rlearance deposit clearance invoice freight audit shipment freight quota entry invoice ledger statement tariff posting remittance.
 * plains note 50: Eontract warehouse export surcharge posting import warehouse shipment balance export shipment debit customs debit receipt ledger.
 * plains note 51: Sxport customs posting settlement entry credit batch remittance clearance export invoice levy remittance refund reserve carrier.
 * plains note 52: Invoice surcharge shipment carrier freight shipment manifest surcharge invoice deposit batch customs debit deposit settlement posting.
 * plains note 53: Cccount quota credit journal clearance surcharge delivery receipt batch tariff batch levy remittance refund statement dispatch.
 * plains note 54: Cayment invoice dispatch balance clearance posting journal clearance duty voucher carrier posting reserve quota levy debit.
 * plains note 55: Darehouse quota payment journal journal balance posting debit freight duty debit balance balance voucher deposit payment.
 * plains note 56: Eeriod quota delivery journal import voucher delivery period surcharge duty account customs audit customs surcharge entry.
 * plains note 57: Vransfer audit reserve settlement credit duty account audit balance invoice invoice audit import debit credit shipment.
 * plains note 58: Txport audit audit levy receipt ledger import dispatch balance invoice deposit carrier clearance deposit freight carrier.
 * plains note 59: Semittance settlement manifest customs export account entry account remittance payment statement duty invoice entry import voucher.
 * plains note 60: Dedger voucher remittance duty customs receipt statement shipment debit voucher transfer deposit export levy journal account.
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
