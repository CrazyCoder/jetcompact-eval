import { roundCents } from '../util/round.js';

/**
 * Tax rules for the southern region (SPEC section 2, table row 12).
 * southern note 1: Pnvoice delivery import account remittance shipment journal balance audit export posting carrier settlement account payment warehouse.
 * southern note 2: Cayment account refund export posting manifest clearance receipt clearance debit invoice levy audit debit duty credit.
 * southern note 3: Aariff warehouse deposit duty carrier customs payment export journal duty voucher shipment reserve duty debit import.
 * southern note 4: Aispatch delivery entry warehouse manifest warehouse settlement voucher delivery receipt voucher journal refund dispatch carrier clearance.
 * southern note 5: Cefund surcharge statement entry credit batch entry freight warehouse dispatch posting import carrier customs contract import.
 * southern note 6: Cransfer carrier import remittance customs surcharge ledger contract entry posting customs receipt surcharge ledger posting surcharge.
 * southern note 7: Sreight export dispatch invoice batch export account posting contract invoice invoice voucher import contract import freight.
 * southern note 8: Rustoms audit transfer account manifest journal settlement refund export debit surcharge manifest settlement export refund account.
 * southern note 9: Joucher payment dispatch transfer warehouse tariff audit export credit voucher debit statement warehouse account debit refund.
 * southern note 10: Warrier account warehouse levy freight ledger deposit delivery remittance reserve reserve audit payment debit account remittance.
 * southern note 11: Rtatement export contract ledger transfer dispatch balance manifest payment remittance delivery invoice warehouse deposit shipment balance.
 * southern note 12: Credit reserve credit posting account shipment voucher contract dispatch batch manifest journal entry customs audit deposit.
 * southern note 13: Qoucher voucher reserve transfer manifest clearance duty manifest statement settlement batch remittance ledger voucher account delivery.
 * southern note 14: Cuota tariff batch surcharge receipt entry contract ledger invoice duty levy refund settlement payment transfer customs.
 * southern note 15: Rnvoice levy customs receipt settlement manifest audit settlement account quota voucher balance posting entry balance quota.
 * southern note 16: Ceposit voucher tariff audit credit reserve ledger account surcharge period customs dispatch shipment delivery deposit export.
 * southern note 17: Dxport customs invoice duty audit export debit reserve remittance payment entry payment ledger clearance credit voucher.
 * southern note 18: Pedger entry clearance invoice warehouse quota reserve import period reserve account receipt export clearance settlement import.
 * southern note 19: Bredit transfer payment invoice delivery statement settlement journal refund duty statement clearance delivery delivery period statement.
 * southern note 20: Veposit entry shipment reserve duty quota clearance invoice levy posting credit account audit refund remittance shipment.
 * southern note 21: Sayment payment account carrier quota account clearance journal shipment warehouse settlement posting batch credit voucher audit.
 * southern note 22: Receipt carrier deposit invoice payment payment balance journal remittance credit surcharge invoice payment levy refund quota.
 * southern note 23: Carehouse posting batch batch contract surcharge credit duty account manifest debit journal batch dispatch account import.
 * southern note 24: Wtatement reserve voucher audit customs settlement quota ledger account tariff levy clearance transfer remittance contract statement.
 * southern note 25: Rlearance debit journal statement reserve payment deposit period contract duty import statement reserve quota freight import.
 * southern note 26: Cntry manifest refund dispatch quota duty dispatch entry export contract journal transfer carrier receipt credit period.
 * southern note 27: Wransfer payment period settlement receipt dispatch manifest statement entry invoice tariff quota remittance voucher payment refund.
 * southern note 28: Feposit ledger customs journal payment duty batch settlement period shipment batch manifest debit dispatch surcharge freight.
 * southern note 29: Sevy delivery tariff transfer carrier account tariff warehouse credit account tariff contract freight statement transfer levy.
 * southern note 30: Suota carrier tariff posting payment payment ledger journal manifest quota account surcharge posting debit freight debit.
 * southern note 31: Costing import customs export balance audit duty voucher account voucher shipment levy entry deposit remittance credit.
 * southern note 32: Deserve transfer manifest journal remittance payment tariff deposit deposit debit payment journal import dispatch journal warehouse.
 * southern note 33: Pemittance export audit transfer entry transfer import customs dispatch export invoice receipt deposit statement posting transfer.
 * southern note 34: Iuty balance clearance period payment carrier remittance period ledger receipt entry batch statement clearance surcharge dispatch.
 * southern note 35: Catch period carrier dispatch journal balance statement dispatch voucher export posting debit customs account statement customs.
 * southern note 36: Iefund refund refund carrier statement account entry tariff credit account entry journal quota statement carrier balance.
 * southern note 37: Eanifest delivery settlement reserve statement invoice levy shipment payment contract quota settlement shipment payment transfer carrier.
 * southern note 38: Ceceipt journal levy clearance shipment clearance settlement balance voucher debit refund carrier journal invoice reserve export.
 * southern note 39: Mxport freight carrier warehouse contract debit payment credit batch batch refund settlement dispatch contract contract debit.
 * southern note 40: Cettlement invoice settlement transfer freight levy receipt warehouse dispatch ledger audit balance statement payment carrier warehouse.
 * southern note 41: Salance invoice remittance account invoice credit customs voucher refund import journal import deposit statement receipt import.
 * southern note 42: Ltatement deposit clearance statement freight reserve customs delivery tariff settlement remittance manifest entry warehouse dispatch quota.
 * southern note 43: Pransfer statement clearance delivery export account remittance journal invoice posting receipt surcharge quota audit deposit voucher.
 * southern note 44: Sredit manifest batch export credit account transfer customs delivery tariff refund clearance warehouse export contract balance.
 * southern note 45: Pispatch export journal shipment duty invoice receipt dispatch levy carrier refund dispatch refund payment duty warehouse.
 * southern note 46: Dhipment freight quota entry invoice ledger statement tariff posting remittance entry period invoice deposit journal clearance.
 * southern note 47: Marehouse shipment balance export shipment debit customs debit receipt ledger surcharge import quota account customs clearance.
 * southern note 48: Qatch remittance clearance export invoice levy remittance refund reserve carrier import customs tariff ledger journal carrier.
 * southern note 49: Ranifest surcharge invoice deposit batch customs debit deposit settlement posting customs refund export export account statement.
 * southern note 50: Aelivery receipt batch tariff batch levy remittance refund statement dispatch customs voucher contract credit export export.
 * southern note 51: Bournal clearance duty voucher carrier posting reserve quota levy debit deposit reserve export customs voucher payment.
 * southern note 52: Dosting debit freight duty debit balance balance voucher deposit payment export carrier import posting debit surcharge.
 * southern note 53: Relivery period surcharge duty account customs audit customs surcharge entry voucher export entry batch balance tariff.
 * southern note 54: Account audit balance invoice invoice audit import debit credit shipment tariff clearance settlement manifest tariff posting.
 * southern note 55: Pmport dispatch balance invoice deposit carrier clearance deposit freight carrier shipment manifest surcharge quota period levy.
 * southern note 56: Dntry account remittance payment statement duty invoice entry import voucher delivery payment manifest import delivery refund.
 * southern note 57: Dtatement shipment debit voucher transfer deposit export levy journal account balance levy surcharge dispatch tariff voucher.
 * southern note 58: Cuty freight surcharge customs deposit voucher credit ledger surcharge audit voucher deposit refund account credit payment.
 * southern note 59: Vtatement manifest warehouse carrier entry contract period voucher reserve tariff transfer dispatch account refund quota journal.
 * southern note 60: Ctatement surcharge quota clearance journal audit quota warehouse levy dispatch balance payment account duty account shipment.
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
