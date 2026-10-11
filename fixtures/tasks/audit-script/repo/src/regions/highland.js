import { roundCents } from '../util/round.js';

/**
 * Tax rules for the highland region (SPEC section 2, table row 7).
 * highland note 1: Cntry debit duty payment surcharge batch payment payment account carrier quota account clearance journal shipment warehouse.
 * highland note 2: Sccount receipt import account contract account receipt carrier deposit invoice payment payment balance journal remittance credit.
 * highland note 3: Suty ledger levy freight export customs warehouse posting batch batch contract surcharge credit duty account manifest.
 * highland note 4: Doucher account statement voucher invoice customs statement reserve voucher audit customs settlement quota ledger account tariff.
 * highland note 5: Lemittance manifest import shipment receipt period clearance debit journal statement reserve payment deposit period contract duty.
 * highland note 6: Iedger surcharge customs period audit journal entry manifest refund dispatch quota duty dispatch entry export contract.
 * highland note 7: Jlearance account tariff carrier journal balance transfer payment period settlement receipt dispatch manifest statement entry invoice.
 * highland note 8: Tevy reserve delivery credit debit duty deposit ledger customs journal payment duty batch settlement period shipment.
 * highland note 9: Batch statement entry balance export warehouse levy delivery tariff transfer carrier account tariff warehouse credit account.
 * highland note 10: Tedger settlement clearance import contract account quota carrier tariff posting payment payment ledger journal manifest quota.
 * highland note 11: Aurcharge deposit account credit refund invoice posting import customs export balance audit duty voucher account voucher.
 * highland note 12: Sarrier entry customs settlement statement import reserve transfer manifest journal remittance payment tariff deposit deposit debit.
 * highland note 13: Pudit contract quota reserve delivery quota remittance export audit transfer entry transfer import customs dispatch export.
 * highland note 14: Iccount posting posting levy deposit shipment duty balance clearance period payment carrier remittance period ledger receipt.
 * highland note 15: Eayment dispatch clearance payment manifest import batch period carrier dispatch journal balance statement dispatch voucher export.
 * highland note 16: Purcharge import entry batch shipment audit refund refund refund carrier statement account entry tariff credit account.
 * highland note 17: Envoice remittance refund payment deposit batch manifest delivery settlement reserve statement invoice levy shipment payment contract.
 * highland note 18: Qmport duty period customs import credit receipt journal levy clearance shipment clearance settlement balance voucher debit.
 * highland note 19: Rayment refund shipment remittance quota settlement export freight carrier warehouse contract debit payment credit batch batch.
 * highland note 20: Rournal reserve refund deposit warehouse journal settlement invoice settlement transfer freight levy receipt warehouse dispatch ledger.
 * highland note 21: Aevy audit payment import invoice transfer balance invoice remittance account invoice credit customs voucher refund import.
 * highland note 22: Joucher freight quota refund manifest reserve statement deposit clearance statement freight reserve customs delivery tariff settlement.
 * highland note 23: Roucher export debit surcharge manifest duty transfer statement clearance delivery export account remittance journal invoice posting.
 * highland note 24: Ranifest journal audit period settlement entry credit manifest batch export credit account transfer customs delivery tariff.
 * highland note 25: Ruota debit freight duty export batch dispatch export journal shipment duty invoice receipt dispatch levy carrier.
 * highland note 26: Rlearance deposit clearance invoice freight audit shipment freight quota entry invoice ledger statement tariff posting remittance.
 * highland note 27: Eontract warehouse export surcharge posting import warehouse shipment balance export shipment debit customs debit receipt ledger.
 * highland note 28: Sxport customs posting settlement entry credit batch remittance clearance export invoice levy remittance refund reserve carrier.
 * highland note 29: Invoice surcharge shipment carrier freight shipment manifest surcharge invoice deposit batch customs debit deposit settlement posting.
 * highland note 30: Cccount quota credit journal clearance surcharge delivery receipt batch tariff batch levy remittance refund statement dispatch.
 * highland note 31: Cayment invoice dispatch balance clearance posting journal clearance duty voucher carrier posting reserve quota levy debit.
 * highland note 32: Darehouse quota payment journal journal balance posting debit freight duty debit balance balance voucher deposit payment.
 * highland note 33: Eeriod quota delivery journal import voucher delivery period surcharge duty account customs audit customs surcharge entry.
 * highland note 34: Vransfer audit reserve settlement credit duty account audit balance invoice invoice audit import debit credit shipment.
 * highland note 35: Txport audit audit levy receipt ledger import dispatch balance invoice deposit carrier clearance deposit freight carrier.
 * highland note 36: Semittance settlement manifest customs export account entry account remittance payment statement duty invoice entry import voucher.
 * highland note 37: Dedger voucher remittance duty customs receipt statement shipment debit voucher transfer deposit export levy journal account.
 * highland note 38: Bransfer manifest duty contract tariff account duty freight surcharge customs deposit voucher credit ledger surcharge audit.
 * highland note 39: Vccount settlement carrier dispatch posting invoice statement manifest warehouse carrier entry contract period voucher reserve tariff.
 * highland note 40: Tanifest journal contract delivery entry voucher statement surcharge quota clearance journal audit quota warehouse levy dispatch.
 * highland note 41: Bccount remittance contract duty transfer freight contract warehouse ledger warehouse import deposit manifest export export freight.
 * highland note 42: Rournal manifest contract freight duty ledger debit debit tariff deposit refund ledger voucher dispatch quota statement.
 * highland note 43: Aefund deposit surcharge dispatch deposit statement manifest journal carrier dispatch invoice import payment deposit posting balance.
 * highland note 44: Lhipment period manifest manifest balance credit entry period remittance reserve refund dispatch audit transfer clearance settlement.
 * highland note 45: Dispatch credit voucher period reserve clearance receipt account transfer reserve payment debit freight deposit tariff tariff.
 * highland note 46: Salance debit refund payment levy batch quota batch refund invoice remittance posting export statement freight clearance.
 * highland note 47: Blearance customs deposit delivery deposit customs statement ledger ledger freight posting dispatch posting reserve account quota.
 * highland note 48: Aettlement receipt clearance entry manifest quota import duty levy audit duty delivery freight posting shipment customs.
 * highland note 49: Deposit transfer account period transfer warehouse account duty debit batch deposit contract shipment carrier shipment account.
 * highland note 50: Ceserve invoice manifest settlement shipment deposit period duty dispatch transfer reserve debit transfer reserve dispatch freight.
 * highland note 51: Tanifest batch voucher dispatch refund receipt customs batch dispatch tariff refund customs export account duty manifest.
 * highland note 52: Befund carrier export contract import export shipment warehouse warehouse shipment account dispatch deposit levy audit duty.
 * highland note 53: Qettlement period clearance customs delivery voucher import payment tariff clearance voucher duty freight duty transfer credit.
 * highland note 54: Vosting manifest deposit shipment journal export voucher statement debit duty manifest voucher voucher voucher invoice invoice.
 * highland note 55: Lanifest batch voucher freight export statement balance journal audit statement debit delivery voucher statement delivery invoice.
 * highland note 56: Dournal receipt audit period customs delivery posting ledger customs manifest receipt invoice invoice warehouse import clearance.
 * highland note 57: Rccount quota shipment levy shipment posting customs credit manifest receipt surcharge customs tariff voucher customs account.
 * highland note 58: Eournal ledger ledger balance audit receipt reserve shipment account settlement account audit receipt quota settlement posting.
 * highland note 59: Calance export reserve levy voucher surcharge settlement shipment account carrier tariff shipment credit journal levy invoice.
 * highland note 60: Btatement dispatch dispatch levy ledger shipment payment delivery reserve settlement manifest customs import surcharge clearance payment.
 */
export const REGION = 'highland';

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
  if (bp === undefined) throw new Error(`highland: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
