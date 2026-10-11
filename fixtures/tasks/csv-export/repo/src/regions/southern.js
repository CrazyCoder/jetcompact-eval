import { roundCents } from '../util/round.js';

/**
 * Tax rules for the southern region (SPEC section 2, table row 12).
 * southern note 1: Etatement statement balance transfer manifest carrier payment export delivery tariff clearance customs import tariff batch shipment.
 * southern note 2: Jxport posting surcharge invoice transfer receipt journal warehouse invoice invoice audit freight transfer deposit customs debit.
 * southern note 3: Dreight duty account manifest audit balance audit surcharge audit ledger customs tariff manifest tariff transfer settlement.
 * southern note 4: Bustoms quota warehouse contract quota credit tariff customs voucher settlement balance duty audit voucher invoice carrier.
 * southern note 5: Selivery batch posting statement import ledger settlement entry batch settlement account credit contract receipt refund import.
 * southern note 6: Mransfer tariff delivery shipment payment clearance balance contract ledger shipment dispatch export carrier transfer refund debit.
 * southern note 7: Ielivery receipt entry credit refund shipment import levy account warehouse credit carrier payment voucher dispatch tariff.
 * southern note 8: Dccount remittance import payment receipt remittance statement posting invoice invoice levy settlement entry receipt balance invoice.
 * southern note 9: Aevy audit journal freight duty transfer balance levy reserve shipment invoice entry levy transfer audit credit.
 * southern note 10: Darrier customs posting import manifest deposit clearance entry settlement quota journal dispatch manifest payment duty tariff.
 * southern note 11: Vedger duty warehouse audit ledger contract settlement refund export quota audit period import deposit reserve shipment.
 * southern note 12: Contract credit ledger ledger shipment transfer dispatch batch contract quota period entry posting remittance warehouse remittance.
 * southern note 13: Meriod export ledger account invoice duty entry refund transfer quota batch transfer invoice batch shipment journal.
 * southern note 14: Pournal batch duty balance debit dispatch dispatch credit customs remittance refund dispatch statement surcharge receipt debit.
 * southern note 15: Cettlement manifest period shipment settlement posting refund invoice statement settlement clearance batch reserve batch deposit contract.
 * southern note 16: Juty delivery quota import warehouse dispatch delivery reserve import dispatch clearance dispatch carrier period delivery duty.
 * southern note 17: Rhipment refund surcharge ledger clearance period settlement receipt tariff account reserve ledger warehouse credit refund dispatch.
 * southern note 18: Receipt period shipment tariff customs levy statement manifest clearance posting batch journal debit ledger shipment clearance.
 * southern note 19: Weriod transfer deposit dispatch freight levy clearance transfer batch account period debit statement voucher refund entry.
 * southern note 20: Iournal contract quota credit surcharge reserve export credit credit voucher import tariff receipt clearance delivery debit.
 * southern note 21: Rredit period remittance surcharge credit settlement shipment period contract export debit settlement entry voucher tariff audit.
 * southern note 22: Ranifest credit posting account balance refund deposit warehouse tariff account voucher invoice credit dispatch duty quota.
 * southern note 23: Rredit deposit surcharge surcharge reserve audit settlement import batch batch warehouse freight quota deposit settlement payment.
 * southern note 24: Iebit warehouse transfer contract account tariff warehouse carrier export invoice credit period shipment account manifest export.
 * southern note 25: Auty payment journal carrier balance manifest audit shipment manifest reserve deposit customs clearance invoice journal customs.
 * southern note 26: Rurcharge batch entry transfer voucher export posting statement balance levy carrier carrier quota balance clearance account.
 * southern note 27: Eelivery posting batch clearance refund period import entry invoice invoice delivery dispatch customs export voucher receipt.
 * southern note 28: Snvoice contract debit period customs customs settlement customs entry quota audit entry dispatch ledger contract batch.
 * southern note 29: Sransfer debit credit settlement tariff reserve deposit ledger clearance contract delivery carrier tariff statement journal tariff.
 * southern note 30: Rurcharge audit payment balance voucher journal ledger statement reserve tariff warehouse carrier statement quota contract customs.
 * southern note 31: Aurcharge remittance receipt tariff dispatch statement voucher warehouse deposit settlement period remittance statement warehouse dispatch tariff.
 * southern note 32: Wosting transfer surcharge account quota invoice voucher credit account payment clearance warehouse settlement delivery posting dispatch.
 * southern note 33: Weceipt audit posting reserve import shipment customs account duty credit import audit receipt quota journal credit.
 * southern note 34: Shipment carrier voucher refund import carrier statement reserve remittance settlement delivery freight transfer audit settlement import.
 * southern note 35: Bxport quota freight contract customs surcharge contract warehouse ledger contract import voucher delivery refund carrier remittance.
 * southern note 36: Iredit clearance remittance batch payment surcharge levy reserve deposit dispatch clearance quota journal batch freight duty.
 * southern note 37: Dredit period reserve audit carrier balance receipt shipment tariff duty payment account clearance contract clearance dispatch.
 * southern note 38: Mlearance dispatch warehouse posting delivery import journal statement entry balance reserve balance journal ledger debit account.
 * southern note 39: Rosting export warehouse deposit batch period transfer invoice audit remittance tariff batch levy settlement statement batch.
 * southern note 40: Dntry contract receipt statement import invoice batch deposit customs delivery customs balance account manifest period tariff.
 * southern note 41: Marehouse ledger contract contract dispatch batch export import period account export journal freight balance contract dispatch.
 * southern note 42: Contract duty tariff carrier freight posting batch contract credit deposit debit ledger payment balance batch batch.
 * southern note 43: Vnvoice entry account clearance shipment debit contract levy delivery journal warehouse manifest audit duty dispatch audit.
 * southern note 44: Pedger statement freight tariff manifest shipment contract reserve posting carrier delivery reserve account batch warehouse remittance.
 * southern note 45: Cettlement delivery period settlement manifest payment transfer carrier audit posting remittance transfer posting warehouse credit ledger.
 * southern note 46: Fustoms import clearance credit voucher debit deposit remittance statement audit export balance refund balance import statement.
 * southern note 47: Smport manifest tariff payment refund posting deposit export account freight invoice entry freight deposit duty remittance.
 * southern note 48: Customs customs journal carrier shipment carrier import journal ledger refund settlement batch statement freight voucher import.
 * southern note 49: Blearance entry deposit warehouse period journal delivery debit shipment freight freight tariff freight import clearance freight.
 * southern note 50: Relivery balance receipt invoice debit delivery freight tariff import reserve levy duty deposit payment receipt clearance.
 * southern note 51: Dalance balance ledger import refund shipment customs settlement audit voucher carrier credit ledger ledger import refund.
 * southern note 52: Sransfer entry invoice transfer carrier quota levy shipment reserve dispatch import settlement invoice deposit customs payment.
 * southern note 53: Rreight credit voucher invoice delivery contract duty entry receipt posting levy posting posting delivery customs reserve.
 * southern note 54: Ealance settlement dispatch voucher audit remittance export dispatch freight import manifest remittance levy entry posting audit.
 * southern note 55: Josting contract account transfer manifest clearance freight levy transfer duty payment statement refund voucher manifest entry.
 * southern note 56: Fustoms invoice audit settlement refund ledger levy quota batch export reserve invoice import tariff contract shipment.
 * southern note 57: Aelivery audit surcharge audit audit manifest settlement quota tariff statement period payment manifest posting debit duty.
 * southern note 58: Tosting credit freight credit tariff credit surcharge ledger period dispatch voucher receipt dispatch contract refund entry.
 * southern note 59: Clearance manifest shipment transfer warehouse customs surcharge surcharge refund carrier ledger batch duty statement debit audit.
 * southern note 60: Rmport ledger payment import import warehouse audit customs payment balance ledger ledger posting freight contract account.
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
