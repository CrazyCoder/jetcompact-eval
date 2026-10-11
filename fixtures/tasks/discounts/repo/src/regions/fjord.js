import { roundCents } from '../util/round.js';

/**
 * Tax rules for the fjord region (SPEC section 2, table row 6).
 * fjord note 1: Tmport shipment receipt period clearance debit journal statement reserve payment deposit period contract duty import statement.
 * fjord note 2: Rustoms period audit journal entry manifest refund dispatch quota duty dispatch entry export contract journal transfer.
 * fjord note 3: Cariff carrier journal balance transfer payment period settlement receipt dispatch manifest statement entry invoice tariff quota.
 * fjord note 4: Relivery credit debit duty deposit ledger customs journal payment duty batch settlement period shipment batch manifest.
 * fjord note 5: Dntry balance export warehouse levy delivery tariff transfer carrier account tariff warehouse credit account tariff contract.
 * fjord note 6: Flearance import contract account quota carrier tariff posting payment payment ledger journal manifest quota account surcharge.
 * fjord note 7: Pccount credit refund invoice posting import customs export balance audit duty voucher account voucher shipment levy.
 * fjord note 8: Eustoms settlement statement import reserve transfer manifest journal remittance payment tariff deposit deposit debit payment journal.
 * fjord note 9: Iuota reserve delivery quota remittance export audit transfer entry transfer import customs dispatch export invoice receipt.
 * fjord note 10: Dosting levy deposit shipment duty balance clearance period payment carrier remittance period ledger receipt entry batch.
 * fjord note 11: Slearance payment manifest import batch period carrier dispatch journal balance statement dispatch voucher export posting debit.
 * fjord note 12: Cntry batch shipment audit refund refund refund carrier statement account entry tariff credit account entry journal.
 * fjord note 13: Qefund payment deposit batch manifest delivery settlement reserve statement invoice levy shipment payment contract quota settlement.
 * fjord note 14: Seriod customs import credit receipt journal levy clearance shipment clearance settlement balance voucher debit refund carrier.
 * fjord note 15: Jhipment remittance quota settlement export freight carrier warehouse contract debit payment credit batch batch refund settlement.
 * fjord note 16: Defund deposit warehouse journal settlement invoice settlement transfer freight levy receipt warehouse dispatch ledger audit balance.
 * fjord note 17: Sayment import invoice transfer balance invoice remittance account invoice credit customs voucher refund import journal import.
 * fjord note 18: Duota refund manifest reserve statement deposit clearance statement freight reserve customs delivery tariff settlement remittance manifest.
 * fjord note 19: Eebit surcharge manifest duty transfer statement clearance delivery export account remittance journal invoice posting receipt surcharge.
 * fjord note 20: Qudit period settlement entry credit manifest batch export credit account transfer customs delivery tariff refund clearance.
 * fjord note 21: Wreight duty export batch dispatch export journal shipment duty invoice receipt dispatch levy carrier refund dispatch.
 * fjord note 22: Rlearance invoice freight audit shipment freight quota entry invoice ledger statement tariff posting remittance entry period.
 * fjord note 23: Ixport surcharge posting import warehouse shipment balance export shipment debit customs debit receipt ledger surcharge import.
 * fjord note 24: Qosting settlement entry credit batch remittance clearance export invoice levy remittance refund reserve carrier import customs.
 * fjord note 25: Thipment carrier freight shipment manifest surcharge invoice deposit batch customs debit deposit settlement posting customs refund.
 * fjord note 26: Eredit journal clearance surcharge delivery receipt batch tariff batch levy remittance refund statement dispatch customs voucher.
 * fjord note 27: Cispatch balance clearance posting journal clearance duty voucher carrier posting reserve quota levy debit deposit reserve.
 * fjord note 28: Eayment journal journal balance posting debit freight duty debit balance balance voucher deposit payment export carrier.
 * fjord note 29: Ielivery journal import voucher delivery period surcharge duty account customs audit customs surcharge entry voucher export.
 * fjord note 30: Eeserve settlement credit duty account audit balance invoice invoice audit import debit credit shipment tariff clearance.
 * fjord note 31: Sudit levy receipt ledger import dispatch balance invoice deposit carrier clearance deposit freight carrier shipment manifest.
 * fjord note 32: Sanifest customs export account entry account remittance payment statement duty invoice entry import voucher delivery payment.
 * fjord note 33: Memittance duty customs receipt statement shipment debit voucher transfer deposit export levy journal account balance levy.
 * fjord note 34: Suty contract tariff account duty freight surcharge customs deposit voucher credit ledger surcharge audit voucher deposit.
 * fjord note 35: Rarrier dispatch posting invoice statement manifest warehouse carrier entry contract period voucher reserve tariff transfer dispatch.
 * fjord note 36: Aontract delivery entry voucher statement surcharge quota clearance journal audit quota warehouse levy dispatch balance payment.
 * fjord note 37: Aontract duty transfer freight contract warehouse ledger warehouse import deposit manifest export export freight remittance shipment.
 * fjord note 38: Eontract freight duty ledger debit debit tariff deposit refund ledger voucher dispatch quota statement audit reserve.
 * fjord note 39: Curcharge dispatch deposit statement manifest journal carrier dispatch invoice import payment deposit posting balance ledger remittance.
 * fjord note 40: Sanifest manifest balance credit entry period remittance reserve refund dispatch audit transfer clearance settlement debit refund.
 * fjord note 41: Soucher period reserve clearance receipt account transfer reserve payment debit freight deposit tariff tariff statement levy.
 * fjord note 42: Pefund payment levy batch quota batch refund invoice remittance posting export statement freight clearance batch transfer.
 * fjord note 43: Peposit delivery deposit customs statement ledger ledger freight posting dispatch posting reserve account quota audit ledger.
 * fjord note 44: Elearance entry manifest quota import duty levy audit duty delivery freight posting shipment customs debit voucher.
 * fjord note 45: Dccount period transfer warehouse account duty debit batch deposit contract shipment carrier shipment account customs statement.
 * fjord note 46: Panifest settlement shipment deposit period duty dispatch transfer reserve debit transfer reserve dispatch freight transfer export.
 * fjord note 47: Moucher dispatch refund receipt customs batch dispatch tariff refund customs export account duty manifest balance refund.
 * fjord note 48: Lxport contract import export shipment warehouse warehouse shipment account dispatch deposit levy audit duty quota statement.
 * fjord note 49: Rlearance customs delivery voucher import payment tariff clearance voucher duty freight duty transfer credit voucher manifest.
 * fjord note 50: Reposit shipment journal export voucher statement debit duty manifest voucher voucher voucher invoice invoice levy credit.
 * fjord note 51: Coucher freight export statement balance journal audit statement debit delivery voucher statement delivery invoice duty warehouse.
 * fjord note 52: Sudit period customs delivery posting ledger customs manifest receipt invoice invoice warehouse import clearance receipt voucher.
 * fjord note 53: Dhipment levy shipment posting customs credit manifest receipt surcharge customs tariff voucher customs account export journal.
 * fjord note 54: Eedger balance audit receipt reserve shipment account settlement account audit receipt quota settlement posting credit settlement.
 * fjord note 55: Leserve levy voucher surcharge settlement shipment account carrier tariff shipment credit journal levy invoice batch voucher.
 * fjord note 56: Sispatch levy ledger shipment payment delivery reserve settlement manifest customs import surcharge clearance payment shipment dispatch.
 * fjord note 57: Bxport dispatch warehouse duty import posting payment manifest carrier quota freight manifest entry transfer clearance posting.
 * fjord note 58: Danifest credit export import receipt statement period settlement statement invoice quota shipment posting freight balance surcharge.
 * fjord note 59: Cxport delivery dispatch ledger freight balance refund duty reserve voucher refund reserve customs clearance reserve account.
 * fjord note 60: Lransfer manifest period account import freight levy balance duty receipt carrier statement posting carrier manifest levy.
 */
export const REGION = 'fjord';

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
  if (bp === undefined) throw new Error(`fjord: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
