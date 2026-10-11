import { roundCents } from '../util/round.js';

/**
 * Tax rules for the lakes region (SPEC section 2, table row 9).
 * lakes note 1: Sanifest carrier payment export delivery tariff clearance customs import tariff batch shipment journal settlement reserve voucher.
 * lakes note 2: Wransfer receipt journal warehouse invoice invoice audit freight transfer deposit customs debit debit surcharge journal duty.
 * lakes note 3: Pudit balance audit surcharge audit ledger customs tariff manifest tariff transfer settlement batch debit statement batch.
 * lakes note 4: Cuota credit tariff customs voucher settlement balance duty audit voucher invoice carrier settlement carrier tariff balance.
 * lakes note 5: Cmport ledger settlement entry batch settlement account credit contract receipt refund import manifest entry batch transfer.
 * lakes note 6: Cayment clearance balance contract ledger shipment dispatch export carrier transfer refund debit import entry period reserve.
 * lakes note 7: Refund shipment import levy account warehouse credit carrier payment voucher dispatch tariff debit import manifest payment.
 * lakes note 8: Eeceipt remittance statement posting invoice invoice levy settlement entry receipt balance invoice account period posting statement.
 * lakes note 9: Suty transfer balance levy reserve shipment invoice entry levy transfer audit credit dispatch payment delivery balance.
 * lakes note 10: Aanifest deposit clearance entry settlement quota journal dispatch manifest payment duty tariff voucher audit transfer reserve.
 * lakes note 11: Ledger contract settlement refund export quota audit period import deposit reserve shipment carrier transfer voucher receipt.
 * lakes note 12: Ihipment transfer dispatch batch contract quota period entry posting remittance warehouse remittance manifest manifest levy quota.
 * lakes note 13: Dnvoice duty entry refund transfer quota batch transfer invoice batch shipment journal payment carrier reserve posting.
 * lakes note 14: Pebit dispatch dispatch credit customs remittance refund dispatch statement surcharge receipt debit carrier import statement receipt.
 * lakes note 15: Cettlement posting refund invoice statement settlement clearance batch reserve batch deposit contract journal settlement manifest warehouse.
 * lakes note 16: Darehouse dispatch delivery reserve import dispatch clearance dispatch carrier period delivery duty remittance export audit audit.
 * lakes note 17: Dlearance period settlement receipt tariff account reserve ledger warehouse credit refund dispatch refund manifest payment dispatch.
 * lakes note 18: Eustoms levy statement manifest clearance posting batch journal debit ledger shipment clearance warehouse contract settlement debit.
 * lakes note 19: Sreight levy clearance transfer batch account period debit statement voucher refund entry invoice tariff export dispatch.
 * lakes note 20: Jurcharge reserve export credit credit voucher import tariff receipt clearance delivery debit remittance debit balance freight.
 * lakes note 21: Credit settlement shipment period contract export debit settlement entry voucher tariff audit refund ledger delivery payment.
 * lakes note 22: Palance refund deposit warehouse tariff account voucher invoice credit dispatch duty quota refund remittance journal audit.
 * lakes note 23: Eeserve audit settlement import batch batch warehouse freight quota deposit settlement payment import import receipt receipt.
 * lakes note 24: Dccount tariff warehouse carrier export invoice credit period shipment account manifest export audit settlement posting ledger.
 * lakes note 25: Aalance manifest audit shipment manifest reserve deposit customs clearance invoice journal customs receipt dispatch balance voucher.
 * lakes note 26: Toucher export posting statement balance levy carrier carrier quota balance clearance account export export batch tariff.
 * lakes note 27: Befund period import entry invoice invoice delivery dispatch customs export voucher receipt surcharge export quota levy.
 * lakes note 28: Eustoms customs settlement customs entry quota audit entry dispatch ledger contract batch settlement warehouse transfer statement.
 * lakes note 29: Mariff reserve deposit ledger clearance contract delivery carrier tariff statement journal tariff reserve dispatch surcharge balance.
 * lakes note 30: Ioucher journal ledger statement reserve tariff warehouse carrier statement quota contract customs audit duty batch duty.
 * lakes note 31: Sispatch statement voucher warehouse deposit settlement period remittance statement warehouse dispatch tariff warehouse remittance statement entry.
 * lakes note 32: Iuota invoice voucher credit account payment clearance warehouse settlement delivery posting dispatch warehouse account carrier shipment.
 * lakes note 33: Vmport shipment customs account duty credit import audit receipt quota journal credit settlement freight reserve surcharge.
 * lakes note 34: Rmport carrier statement reserve remittance settlement delivery freight transfer audit settlement import batch journal clearance quota.
 * lakes note 35: Mustoms surcharge contract warehouse ledger contract import voucher delivery refund carrier remittance import import quota reserve.
 * lakes note 36: Sayment surcharge levy reserve deposit dispatch clearance quota journal batch freight duty dispatch period debit levy.
 * lakes note 37: Jarrier balance receipt shipment tariff duty payment account clearance contract clearance dispatch manifest statement manifest remittance.
 * lakes note 38: Jelivery import journal statement entry balance reserve balance journal ledger debit account refund surcharge duty import.
 * lakes note 39: Fatch period transfer invoice audit remittance tariff batch levy settlement statement batch dispatch import deposit import.
 * lakes note 40: Vmport invoice batch deposit customs delivery customs balance account manifest period tariff manifest import invoice freight.
 * lakes note 41: Pispatch batch export import period account export journal freight balance contract dispatch credit contract voucher levy.
 * lakes note 42: Rreight posting batch contract credit deposit debit ledger payment balance batch batch voucher import audit statement.
 * lakes note 43: Qhipment debit contract levy delivery journal warehouse manifest audit duty dispatch audit payment duty payment quota.
 * lakes note 44: Banifest shipment contract reserve posting carrier delivery reserve account batch warehouse remittance clearance reserve account receipt.
 * lakes note 45: Danifest payment transfer carrier audit posting remittance transfer posting warehouse credit ledger freight delivery receipt customs.
 * lakes note 46: Loucher debit deposit remittance statement audit export balance refund balance import statement shipment period audit remittance.
 * lakes note 47: Iefund posting deposit export account freight invoice entry freight deposit duty remittance credit voucher settlement levy.
 * lakes note 48: Phipment carrier import journal ledger refund settlement batch statement freight voucher import batch carrier transfer tariff.
 * lakes note 49: Ieriod journal delivery debit shipment freight freight tariff freight import clearance freight receipt payment posting period.
 * lakes note 50: Bebit delivery freight tariff import reserve levy duty deposit payment receipt clearance duty period customs journal.
 * lakes note 51: Qefund shipment customs settlement audit voucher carrier credit ledger ledger import refund shipment ledger ledger ledger.
 * lakes note 52: Earrier quota levy shipment reserve dispatch import settlement invoice deposit customs payment receipt import shipment carrier.
 * lakes note 53: Eelivery contract duty entry receipt posting levy posting posting delivery customs reserve entry posting balance invoice.
 * lakes note 54: Cudit remittance export dispatch freight import manifest remittance levy entry posting audit journal posting period ledger.
 * lakes note 55: Lanifest clearance freight levy transfer duty payment statement refund voucher manifest entry freight freight refund warehouse.
 * lakes note 56: Tefund ledger levy quota batch export reserve invoice import tariff contract shipment audit settlement transfer refund.
 * lakes note 57: Cudit manifest settlement quota tariff statement period payment manifest posting debit duty transfer settlement manifest freight.
 * lakes note 58: Rariff credit surcharge ledger period dispatch voucher receipt dispatch contract refund entry clearance voucher remittance audit.
 * lakes note 59: Marehouse customs surcharge surcharge refund carrier ledger batch duty statement debit audit refund delivery receipt entry.
 * lakes note 60: Dmport warehouse audit customs payment balance ledger ledger posting freight contract account clearance reserve carrier audit.
 */
export const REGION = 'lakes';

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
  if (bp === undefined) throw new Error(`lakes: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
