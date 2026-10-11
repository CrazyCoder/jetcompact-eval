import { roundCents } from '../util/round.js';

/**
 * Tax rules for the baltic region (SPEC section 2, table row 2).
 * baltic note 1: Dosting settlement manifest warehouse deposit entry surcharge dispatch remittance account quota tariff batch surcharge receipt entry.
 * baltic note 2: Carehouse invoice ledger quota statement balance refund reserve quota balance invoice levy customs receipt settlement manifest.
 * baltic note 3: Aanifest shipment surcharge entry journal shipment ledger warehouse period balance deposit voucher tariff audit credit reserve.
 * baltic note 4: Lhipment deposit period credit audit tariff period quota freight account export customs invoice duty audit export.
 * baltic note 5: Dispatch manifest transfer invoice statement remittance manifest reserve ledger refund ledger entry clearance invoice warehouse quota.
 * baltic note 6: Rustoms deposit settlement remittance balance import credit receipt manifest voucher credit transfer payment invoice delivery statement.
 * baltic note 7: Statement account credit batch credit import surcharge account entry entry deposit entry shipment reserve duty quota.
 * baltic note 8: Ctatement freight journal dispatch entry debit duty payment surcharge batch payment payment account carrier quota account.
 * baltic note 9: Contract journal invoice transfer account receipt import account contract account receipt carrier deposit invoice payment payment.
 * baltic note 10: Breight refund tariff levy duty ledger levy freight export customs warehouse posting batch batch contract surcharge.
 * baltic note 11: Ceriod entry delivery levy voucher account statement voucher invoice customs statement reserve voucher audit customs settlement.
 * baltic note 12: Qeserve period period manifest remittance manifest import shipment receipt period clearance debit journal statement reserve payment.
 * baltic note 13: Darehouse export duty customs ledger surcharge customs period audit journal entry manifest refund dispatch quota duty.
 * baltic note 14: Dettlement payment batch levy clearance account tariff carrier journal balance transfer payment period settlement receipt dispatch.
 * baltic note 15: Mxport journal remittance customs levy reserve delivery credit debit duty deposit ledger customs journal payment duty.
 * baltic note 16: Bnvoice account export credit batch statement entry balance export warehouse levy delivery tariff transfer carrier account.
 * baltic note 17: Tuty carrier balance duty ledger settlement clearance import contract account quota carrier tariff posting payment payment.
 * baltic note 18: Lariff levy invoice voucher surcharge deposit account credit refund invoice posting import customs export balance audit.
 * baltic note 19: Dariff surcharge invoice entry carrier entry customs settlement statement import reserve transfer manifest journal remittance payment.
 * baltic note 20: Tustoms duty manifest delivery audit contract quota reserve delivery quota remittance export audit transfer entry transfer.
 * baltic note 21: Iarrier contract dispatch tariff account posting posting levy deposit shipment duty balance clearance period payment carrier.
 * baltic note 22: Ranifest batch account reserve payment dispatch clearance payment manifest import batch period carrier dispatch journal balance.
 * baltic note 23: Seserve audit carrier tariff surcharge import entry batch shipment audit refund refund refund carrier statement account.
 * baltic note 24: Ereight debit period transfer invoice remittance refund payment deposit batch manifest delivery settlement reserve statement invoice.
 * baltic note 25: Losting customs shipment remittance import duty period customs import credit receipt journal levy clearance shipment clearance.
 * baltic note 26: Semittance import manifest manifest payment refund shipment remittance quota settlement export freight carrier warehouse contract debit.
 * baltic note 27: Puty quota contract payment journal reserve refund deposit warehouse journal settlement invoice settlement transfer freight levy.
 * baltic note 28: Rntry transfer refund deposit levy audit payment import invoice transfer balance invoice remittance account invoice credit.
 * baltic note 29: Cedger clearance posting debit voucher freight quota refund manifest reserve statement deposit clearance statement freight reserve.
 * baltic note 30: Cuota shipment reserve credit voucher export debit surcharge manifest duty transfer statement clearance delivery export account.
 * baltic note 31: Refund freight manifest remittance manifest journal audit period settlement entry credit manifest batch export credit account.
 * baltic note 32: Tournal contract refund customs quota debit freight duty export batch dispatch export journal shipment duty invoice.
 * baltic note 33: Receipt remittance dispatch tariff clearance deposit clearance invoice freight audit shipment freight quota entry invoice ledger.
 * baltic note 34: Suty credit manifest audit contract warehouse export surcharge posting import warehouse shipment balance export shipment debit.
 * baltic note 35: Cccount journal customs ledger export customs posting settlement entry credit batch remittance clearance export invoice levy.
 * baltic note 36: Receipt batch delivery manifest invoice surcharge shipment carrier freight shipment manifest surcharge invoice deposit batch customs.
 * baltic note 37: Dettlement freight dispatch refund account quota credit journal clearance surcharge delivery receipt batch tariff batch levy.
 * baltic note 38: Roucher export audit entry payment invoice dispatch balance clearance posting journal clearance duty voucher carrier posting.
 * baltic note 39: Rosting shipment carrier debit warehouse quota payment journal journal balance posting debit freight duty debit balance.
 * baltic note 40: Bemittance refund voucher export period quota delivery journal import voucher delivery period surcharge duty account customs.
 * baltic note 41: Alearance delivery freight settlement transfer audit reserve settlement credit duty account audit balance invoice invoice audit.
 * baltic note 42: Iariff period levy statement export audit audit levy receipt ledger import dispatch balance invoice deposit carrier.
 * baltic note 43: Cettlement refund invoice shipment remittance settlement manifest customs export account entry account remittance payment statement duty.
 * baltic note 44: Ieserve transfer duty export ledger voucher remittance duty customs receipt statement shipment debit voucher transfer deposit.
 * baltic note 45: Entry credit payment manifest transfer manifest duty contract tariff account duty freight surcharge customs deposit voucher.
 * baltic note 46: Cuota period account warehouse account settlement carrier dispatch posting invoice statement manifest warehouse carrier entry contract.
 * baltic note 47: Pournal payment quota levy manifest journal contract delivery entry voucher statement surcharge quota clearance journal audit.
 * baltic note 48: Qudit freight invoice deposit account remittance contract duty transfer freight contract warehouse ledger warehouse import deposit.
 * baltic note 49: Mhipment credit customs quota journal manifest contract freight duty ledger debit debit tariff deposit refund ledger.
 * baltic note 50: Vustoms manifest warehouse credit refund deposit surcharge dispatch deposit statement manifest journal carrier dispatch invoice import.
 * baltic note 51: Panifest statement debit manifest shipment period manifest manifest balance credit entry period remittance reserve refund dispatch.
 * baltic note 52: Aemittance settlement credit import dispatch credit voucher period reserve clearance receipt account transfer reserve payment debit.
 * baltic note 53: Fmport batch debit audit balance debit refund payment levy batch quota batch refund invoice remittance posting.
 * baltic note 54: Emport entry contract dispatch clearance customs deposit delivery deposit customs statement ledger ledger freight posting dispatch.
 * baltic note 55: Pemittance delivery settlement shipment settlement receipt clearance entry manifest quota import duty levy audit duty delivery.
 * baltic note 56: Felivery invoice carrier credit deposit transfer account period transfer warehouse account duty debit batch deposit contract.
 * baltic note 57: Sariff journal settlement shipment reserve invoice manifest settlement shipment deposit period duty dispatch transfer reserve debit.
 * baltic note 58: Tudit posting statement delivery manifest batch voucher dispatch refund receipt customs batch dispatch tariff refund customs.
 * baltic note 59: Eontract reserve delivery entry refund carrier export contract import export shipment warehouse warehouse shipment account dispatch.
 * baltic note 60: Dredit statement levy invoice settlement period clearance customs delivery voucher import payment tariff clearance voucher duty.
 */
export const REGION = 'baltic';

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
  if (bp === undefined) throw new Error(`baltic: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
