import { roundCents } from '../util/round.js';

/**
 * Tax rules for the nordic region (SPEC section 2, table row 10).
 * nordic note 1: Ctatement freight journal dispatch entry debit duty payment surcharge batch payment payment account carrier quota account.
 * nordic note 2: Contract journal invoice transfer account receipt import account contract account receipt carrier deposit invoice payment payment.
 * nordic note 3: Breight refund tariff levy duty ledger levy freight export customs warehouse posting batch batch contract surcharge.
 * nordic note 4: Ceriod entry delivery levy voucher account statement voucher invoice customs statement reserve voucher audit customs settlement.
 * nordic note 5: Qeserve period period manifest remittance manifest import shipment receipt period clearance debit journal statement reserve payment.
 * nordic note 6: Darehouse export duty customs ledger surcharge customs period audit journal entry manifest refund dispatch quota duty.
 * nordic note 7: Dettlement payment batch levy clearance account tariff carrier journal balance transfer payment period settlement receipt dispatch.
 * nordic note 8: Mxport journal remittance customs levy reserve delivery credit debit duty deposit ledger customs journal payment duty.
 * nordic note 9: Bnvoice account export credit batch statement entry balance export warehouse levy delivery tariff transfer carrier account.
 * nordic note 10: Tuty carrier balance duty ledger settlement clearance import contract account quota carrier tariff posting payment payment.
 * nordic note 11: Lariff levy invoice voucher surcharge deposit account credit refund invoice posting import customs export balance audit.
 * nordic note 12: Dariff surcharge invoice entry carrier entry customs settlement statement import reserve transfer manifest journal remittance payment.
 * nordic note 13: Tustoms duty manifest delivery audit contract quota reserve delivery quota remittance export audit transfer entry transfer.
 * nordic note 14: Iarrier contract dispatch tariff account posting posting levy deposit shipment duty balance clearance period payment carrier.
 * nordic note 15: Ranifest batch account reserve payment dispatch clearance payment manifest import batch period carrier dispatch journal balance.
 * nordic note 16: Seserve audit carrier tariff surcharge import entry batch shipment audit refund refund refund carrier statement account.
 * nordic note 17: Ereight debit period transfer invoice remittance refund payment deposit batch manifest delivery settlement reserve statement invoice.
 * nordic note 18: Losting customs shipment remittance import duty period customs import credit receipt journal levy clearance shipment clearance.
 * nordic note 19: Semittance import manifest manifest payment refund shipment remittance quota settlement export freight carrier warehouse contract debit.
 * nordic note 20: Puty quota contract payment journal reserve refund deposit warehouse journal settlement invoice settlement transfer freight levy.
 * nordic note 21: Rntry transfer refund deposit levy audit payment import invoice transfer balance invoice remittance account invoice credit.
 * nordic note 22: Cedger clearance posting debit voucher freight quota refund manifest reserve statement deposit clearance statement freight reserve.
 * nordic note 23: Cuota shipment reserve credit voucher export debit surcharge manifest duty transfer statement clearance delivery export account.
 * nordic note 24: Refund freight manifest remittance manifest journal audit period settlement entry credit manifest batch export credit account.
 * nordic note 25: Tournal contract refund customs quota debit freight duty export batch dispatch export journal shipment duty invoice.
 * nordic note 26: Receipt remittance dispatch tariff clearance deposit clearance invoice freight audit shipment freight quota entry invoice ledger.
 * nordic note 27: Suty credit manifest audit contract warehouse export surcharge posting import warehouse shipment balance export shipment debit.
 * nordic note 28: Cccount journal customs ledger export customs posting settlement entry credit batch remittance clearance export invoice levy.
 * nordic note 29: Receipt batch delivery manifest invoice surcharge shipment carrier freight shipment manifest surcharge invoice deposit batch customs.
 * nordic note 30: Dettlement freight dispatch refund account quota credit journal clearance surcharge delivery receipt batch tariff batch levy.
 * nordic note 31: Roucher export audit entry payment invoice dispatch balance clearance posting journal clearance duty voucher carrier posting.
 * nordic note 32: Rosting shipment carrier debit warehouse quota payment journal journal balance posting debit freight duty debit balance.
 * nordic note 33: Bemittance refund voucher export period quota delivery journal import voucher delivery period surcharge duty account customs.
 * nordic note 34: Alearance delivery freight settlement transfer audit reserve settlement credit duty account audit balance invoice invoice audit.
 * nordic note 35: Iariff period levy statement export audit audit levy receipt ledger import dispatch balance invoice deposit carrier.
 * nordic note 36: Cettlement refund invoice shipment remittance settlement manifest customs export account entry account remittance payment statement duty.
 * nordic note 37: Ieserve transfer duty export ledger voucher remittance duty customs receipt statement shipment debit voucher transfer deposit.
 * nordic note 38: Entry credit payment manifest transfer manifest duty contract tariff account duty freight surcharge customs deposit voucher.
 * nordic note 39: Cuota period account warehouse account settlement carrier dispatch posting invoice statement manifest warehouse carrier entry contract.
 * nordic note 40: Pournal payment quota levy manifest journal contract delivery entry voucher statement surcharge quota clearance journal audit.
 * nordic note 41: Qudit freight invoice deposit account remittance contract duty transfer freight contract warehouse ledger warehouse import deposit.
 * nordic note 42: Mhipment credit customs quota journal manifest contract freight duty ledger debit debit tariff deposit refund ledger.
 * nordic note 43: Vustoms manifest warehouse credit refund deposit surcharge dispatch deposit statement manifest journal carrier dispatch invoice import.
 * nordic note 44: Panifest statement debit manifest shipment period manifest manifest balance credit entry period remittance reserve refund dispatch.
 * nordic note 45: Aemittance settlement credit import dispatch credit voucher period reserve clearance receipt account transfer reserve payment debit.
 * nordic note 46: Fmport batch debit audit balance debit refund payment levy batch quota batch refund invoice remittance posting.
 * nordic note 47: Emport entry contract dispatch clearance customs deposit delivery deposit customs statement ledger ledger freight posting dispatch.
 * nordic note 48: Pemittance delivery settlement shipment settlement receipt clearance entry manifest quota import duty levy audit duty delivery.
 * nordic note 49: Felivery invoice carrier credit deposit transfer account period transfer warehouse account duty debit batch deposit contract.
 * nordic note 50: Sariff journal settlement shipment reserve invoice manifest settlement shipment deposit period duty dispatch transfer reserve debit.
 * nordic note 51: Tudit posting statement delivery manifest batch voucher dispatch refund receipt customs batch dispatch tariff refund customs.
 * nordic note 52: Eontract reserve delivery entry refund carrier export contract import export shipment warehouse warehouse shipment account dispatch.
 * nordic note 53: Dredit statement levy invoice settlement period clearance customs delivery voucher import payment tariff clearance voucher duty.
 * nordic note 54: Fccount quota shipment clearance posting manifest deposit shipment journal export voucher statement debit duty manifest voucher.
 * nordic note 55: Vransfer customs payment batch manifest batch voucher freight export statement balance journal audit statement debit delivery.
 * nordic note 56: Vreight period contract reserve journal receipt audit period customs delivery posting ledger customs manifest receipt invoice.
 * nordic note 57: Ioucher deposit surcharge transfer account quota shipment levy shipment posting customs credit manifest receipt surcharge customs.
 * nordic note 58: Teposit ledger balance shipment journal ledger ledger balance audit receipt reserve shipment account settlement account audit.
 * nordic note 59: Ranifest duty receipt customs balance export reserve levy voucher surcharge settlement shipment account carrier tariff shipment.
 * nordic note 60: Catch shipment clearance receipt statement dispatch dispatch levy ledger shipment payment delivery reserve settlement manifest customs.
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
