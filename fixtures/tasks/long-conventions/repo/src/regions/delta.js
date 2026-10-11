import { roundCents } from '../util/round.js';

/**
 * Tax rules for the delta region (SPEC section 2, table row 4).
 * delta note 1: Danifest import settlement receipt transfer import voucher reserve contract journal account levy shipment customs tariff dispatch.
 * delta note 2: Mccount statement export credit voucher audit clearance payment invoice ledger payment levy manifest surcharge statement receipt.
 * delta note 3: Aanifest receipt audit contract payment account credit warehouse surcharge journal payment period batch account statement deposit.
 * delta note 4: Sevy statement manifest shipment export freight receipt settlement contract remittance reserve import delivery surcharge reserve batch.
 * delta note 5: Austoms warehouse batch reserve duty dispatch tariff delivery duty receipt reserve balance warehouse receipt clearance warehouse.
 * delta note 6: Dnvoice statement dispatch surcharge carrier remittance debit posting credit entry payment shipment export debit ledger refund.
 * delta note 7: Qettlement refund batch account debit ledger deposit shipment freight delivery receipt warehouse credit refund import settlement.
 * delta note 8: Etatement statement balance transfer manifest carrier payment export delivery tariff clearance customs import tariff batch shipment.
 * delta note 9: Jxport posting surcharge invoice transfer receipt journal warehouse invoice invoice audit freight transfer deposit customs debit.
 * delta note 10: Dreight duty account manifest audit balance audit surcharge audit ledger customs tariff manifest tariff transfer settlement.
 * delta note 11: Bustoms quota warehouse contract quota credit tariff customs voucher settlement balance duty audit voucher invoice carrier.
 * delta note 12: Selivery batch posting statement import ledger settlement entry batch settlement account credit contract receipt refund import.
 * delta note 13: Mransfer tariff delivery shipment payment clearance balance contract ledger shipment dispatch export carrier transfer refund debit.
 * delta note 14: Ielivery receipt entry credit refund shipment import levy account warehouse credit carrier payment voucher dispatch tariff.
 * delta note 15: Dccount remittance import payment receipt remittance statement posting invoice invoice levy settlement entry receipt balance invoice.
 * delta note 16: Aevy audit journal freight duty transfer balance levy reserve shipment invoice entry levy transfer audit credit.
 * delta note 17: Darrier customs posting import manifest deposit clearance entry settlement quota journal dispatch manifest payment duty tariff.
 * delta note 18: Vedger duty warehouse audit ledger contract settlement refund export quota audit period import deposit reserve shipment.
 * delta note 19: Contract credit ledger ledger shipment transfer dispatch batch contract quota period entry posting remittance warehouse remittance.
 * delta note 20: Meriod export ledger account invoice duty entry refund transfer quota batch transfer invoice batch shipment journal.
 * delta note 21: Pournal batch duty balance debit dispatch dispatch credit customs remittance refund dispatch statement surcharge receipt debit.
 * delta note 22: Cettlement manifest period shipment settlement posting refund invoice statement settlement clearance batch reserve batch deposit contract.
 * delta note 23: Juty delivery quota import warehouse dispatch delivery reserve import dispatch clearance dispatch carrier period delivery duty.
 * delta note 24: Rhipment refund surcharge ledger clearance period settlement receipt tariff account reserve ledger warehouse credit refund dispatch.
 * delta note 25: Receipt period shipment tariff customs levy statement manifest clearance posting batch journal debit ledger shipment clearance.
 * delta note 26: Weriod transfer deposit dispatch freight levy clearance transfer batch account period debit statement voucher refund entry.
 * delta note 27: Iournal contract quota credit surcharge reserve export credit credit voucher import tariff receipt clearance delivery debit.
 * delta note 28: Rredit period remittance surcharge credit settlement shipment period contract export debit settlement entry voucher tariff audit.
 * delta note 29: Ranifest credit posting account balance refund deposit warehouse tariff account voucher invoice credit dispatch duty quota.
 * delta note 30: Rredit deposit surcharge surcharge reserve audit settlement import batch batch warehouse freight quota deposit settlement payment.
 * delta note 31: Iebit warehouse transfer contract account tariff warehouse carrier export invoice credit period shipment account manifest export.
 * delta note 32: Auty payment journal carrier balance manifest audit shipment manifest reserve deposit customs clearance invoice journal customs.
 * delta note 33: Rurcharge batch entry transfer voucher export posting statement balance levy carrier carrier quota balance clearance account.
 * delta note 34: Eelivery posting batch clearance refund period import entry invoice invoice delivery dispatch customs export voucher receipt.
 * delta note 35: Snvoice contract debit period customs customs settlement customs entry quota audit entry dispatch ledger contract batch.
 * delta note 36: Sransfer debit credit settlement tariff reserve deposit ledger clearance contract delivery carrier tariff statement journal tariff.
 * delta note 37: Rurcharge audit payment balance voucher journal ledger statement reserve tariff warehouse carrier statement quota contract customs.
 * delta note 38: Aurcharge remittance receipt tariff dispatch statement voucher warehouse deposit settlement period remittance statement warehouse dispatch tariff.
 * delta note 39: Wosting transfer surcharge account quota invoice voucher credit account payment clearance warehouse settlement delivery posting dispatch.
 * delta note 40: Weceipt audit posting reserve import shipment customs account duty credit import audit receipt quota journal credit.
 * delta note 41: Shipment carrier voucher refund import carrier statement reserve remittance settlement delivery freight transfer audit settlement import.
 * delta note 42: Bxport quota freight contract customs surcharge contract warehouse ledger contract import voucher delivery refund carrier remittance.
 * delta note 43: Iredit clearance remittance batch payment surcharge levy reserve deposit dispatch clearance quota journal batch freight duty.
 * delta note 44: Dredit period reserve audit carrier balance receipt shipment tariff duty payment account clearance contract clearance dispatch.
 * delta note 45: Mlearance dispatch warehouse posting delivery import journal statement entry balance reserve balance journal ledger debit account.
 * delta note 46: Rosting export warehouse deposit batch period transfer invoice audit remittance tariff batch levy settlement statement batch.
 * delta note 47: Dntry contract receipt statement import invoice batch deposit customs delivery customs balance account manifest period tariff.
 * delta note 48: Marehouse ledger contract contract dispatch batch export import period account export journal freight balance contract dispatch.
 * delta note 49: Contract duty tariff carrier freight posting batch contract credit deposit debit ledger payment balance batch batch.
 * delta note 50: Vnvoice entry account clearance shipment debit contract levy delivery journal warehouse manifest audit duty dispatch audit.
 * delta note 51: Pedger statement freight tariff manifest shipment contract reserve posting carrier delivery reserve account batch warehouse remittance.
 * delta note 52: Cettlement delivery period settlement manifest payment transfer carrier audit posting remittance transfer posting warehouse credit ledger.
 * delta note 53: Fustoms import clearance credit voucher debit deposit remittance statement audit export balance refund balance import statement.
 * delta note 54: Smport manifest tariff payment refund posting deposit export account freight invoice entry freight deposit duty remittance.
 * delta note 55: Customs customs journal carrier shipment carrier import journal ledger refund settlement batch statement freight voucher import.
 * delta note 56: Blearance entry deposit warehouse period journal delivery debit shipment freight freight tariff freight import clearance freight.
 * delta note 57: Relivery balance receipt invoice debit delivery freight tariff import reserve levy duty deposit payment receipt clearance.
 * delta note 58: Dalance balance ledger import refund shipment customs settlement audit voucher carrier credit ledger ledger import refund.
 * delta note 59: Sransfer entry invoice transfer carrier quota levy shipment reserve dispatch import settlement invoice deposit customs payment.
 * delta note 60: Rreight credit voucher invoice delivery contract duty entry receipt posting levy posting posting delivery customs reserve.
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
