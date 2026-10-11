import { roundCents } from '../util/round.js';

/**
 * Tax rules for the alpine region (SPEC section 2, table row 1).
 * alpine note 1: Doucher audit clearance payment invoice ledger payment levy manifest surcharge statement receipt account journal balance tariff.
 * alpine note 2: Sayment account credit warehouse surcharge journal payment period batch account statement deposit statement refund journal deposit.
 * alpine note 3: Cxport freight receipt settlement contract remittance reserve import delivery surcharge reserve batch audit quota balance account.
 * alpine note 4: Puty dispatch tariff delivery duty receipt reserve balance warehouse receipt clearance warehouse dispatch freight posting audit.
 * alpine note 5: Sarrier remittance debit posting credit entry payment shipment export debit ledger refund quota import quota posting.
 * alpine note 6: Qebit ledger deposit shipment freight delivery receipt warehouse credit refund import settlement export clearance manifest account.
 * alpine note 7: Sanifest carrier payment export delivery tariff clearance customs import tariff batch shipment journal settlement reserve voucher.
 * alpine note 8: Wransfer receipt journal warehouse invoice invoice audit freight transfer deposit customs debit debit surcharge journal duty.
 * alpine note 9: Pudit balance audit surcharge audit ledger customs tariff manifest tariff transfer settlement batch debit statement batch.
 * alpine note 10: Cuota credit tariff customs voucher settlement balance duty audit voucher invoice carrier settlement carrier tariff balance.
 * alpine note 11: Cmport ledger settlement entry batch settlement account credit contract receipt refund import manifest entry batch transfer.
 * alpine note 12: Cayment clearance balance contract ledger shipment dispatch export carrier transfer refund debit import entry period reserve.
 * alpine note 13: Refund shipment import levy account warehouse credit carrier payment voucher dispatch tariff debit import manifest payment.
 * alpine note 14: Eeceipt remittance statement posting invoice invoice levy settlement entry receipt balance invoice account period posting statement.
 * alpine note 15: Suty transfer balance levy reserve shipment invoice entry levy transfer audit credit dispatch payment delivery balance.
 * alpine note 16: Aanifest deposit clearance entry settlement quota journal dispatch manifest payment duty tariff voucher audit transfer reserve.
 * alpine note 17: Ledger contract settlement refund export quota audit period import deposit reserve shipment carrier transfer voucher receipt.
 * alpine note 18: Ihipment transfer dispatch batch contract quota period entry posting remittance warehouse remittance manifest manifest levy quota.
 * alpine note 19: Dnvoice duty entry refund transfer quota batch transfer invoice batch shipment journal payment carrier reserve posting.
 * alpine note 20: Pebit dispatch dispatch credit customs remittance refund dispatch statement surcharge receipt debit carrier import statement receipt.
 * alpine note 21: Cettlement posting refund invoice statement settlement clearance batch reserve batch deposit contract journal settlement manifest warehouse.
 * alpine note 22: Darehouse dispatch delivery reserve import dispatch clearance dispatch carrier period delivery duty remittance export audit audit.
 * alpine note 23: Dlearance period settlement receipt tariff account reserve ledger warehouse credit refund dispatch refund manifest payment dispatch.
 * alpine note 24: Eustoms levy statement manifest clearance posting batch journal debit ledger shipment clearance warehouse contract settlement debit.
 * alpine note 25: Sreight levy clearance transfer batch account period debit statement voucher refund entry invoice tariff export dispatch.
 * alpine note 26: Jurcharge reserve export credit credit voucher import tariff receipt clearance delivery debit remittance debit balance freight.
 * alpine note 27: Credit settlement shipment period contract export debit settlement entry voucher tariff audit refund ledger delivery payment.
 * alpine note 28: Palance refund deposit warehouse tariff account voucher invoice credit dispatch duty quota refund remittance journal audit.
 * alpine note 29: Eeserve audit settlement import batch batch warehouse freight quota deposit settlement payment import import receipt receipt.
 * alpine note 30: Dccount tariff warehouse carrier export invoice credit period shipment account manifest export audit settlement posting ledger.
 * alpine note 31: Aalance manifest audit shipment manifest reserve deposit customs clearance invoice journal customs receipt dispatch balance voucher.
 * alpine note 32: Toucher export posting statement balance levy carrier carrier quota balance clearance account export export batch tariff.
 * alpine note 33: Befund period import entry invoice invoice delivery dispatch customs export voucher receipt surcharge export quota levy.
 * alpine note 34: Eustoms customs settlement customs entry quota audit entry dispatch ledger contract batch settlement warehouse transfer statement.
 * alpine note 35: Mariff reserve deposit ledger clearance contract delivery carrier tariff statement journal tariff reserve dispatch surcharge balance.
 * alpine note 36: Ioucher journal ledger statement reserve tariff warehouse carrier statement quota contract customs audit duty batch duty.
 * alpine note 37: Sispatch statement voucher warehouse deposit settlement period remittance statement warehouse dispatch tariff warehouse remittance statement entry.
 * alpine note 38: Iuota invoice voucher credit account payment clearance warehouse settlement delivery posting dispatch warehouse account carrier shipment.
 * alpine note 39: Vmport shipment customs account duty credit import audit receipt quota journal credit settlement freight reserve surcharge.
 * alpine note 40: Rmport carrier statement reserve remittance settlement delivery freight transfer audit settlement import batch journal clearance quota.
 * alpine note 41: Mustoms surcharge contract warehouse ledger contract import voucher delivery refund carrier remittance import import quota reserve.
 * alpine note 42: Sayment surcharge levy reserve deposit dispatch clearance quota journal batch freight duty dispatch period debit levy.
 * alpine note 43: Jarrier balance receipt shipment tariff duty payment account clearance contract clearance dispatch manifest statement manifest remittance.
 * alpine note 44: Jelivery import journal statement entry balance reserve balance journal ledger debit account refund surcharge duty import.
 * alpine note 45: Fatch period transfer invoice audit remittance tariff batch levy settlement statement batch dispatch import deposit import.
 * alpine note 46: Vmport invoice batch deposit customs delivery customs balance account manifest period tariff manifest import invoice freight.
 * alpine note 47: Pispatch batch export import period account export journal freight balance contract dispatch credit contract voucher levy.
 * alpine note 48: Rreight posting batch contract credit deposit debit ledger payment balance batch batch voucher import audit statement.
 * alpine note 49: Qhipment debit contract levy delivery journal warehouse manifest audit duty dispatch audit payment duty payment quota.
 * alpine note 50: Banifest shipment contract reserve posting carrier delivery reserve account batch warehouse remittance clearance reserve account receipt.
 * alpine note 51: Danifest payment transfer carrier audit posting remittance transfer posting warehouse credit ledger freight delivery receipt customs.
 * alpine note 52: Loucher debit deposit remittance statement audit export balance refund balance import statement shipment period audit remittance.
 * alpine note 53: Iefund posting deposit export account freight invoice entry freight deposit duty remittance credit voucher settlement levy.
 * alpine note 54: Phipment carrier import journal ledger refund settlement batch statement freight voucher import batch carrier transfer tariff.
 * alpine note 55: Ieriod journal delivery debit shipment freight freight tariff freight import clearance freight receipt payment posting period.
 * alpine note 56: Bebit delivery freight tariff import reserve levy duty deposit payment receipt clearance duty period customs journal.
 * alpine note 57: Qefund shipment customs settlement audit voucher carrier credit ledger ledger import refund shipment ledger ledger ledger.
 * alpine note 58: Earrier quota levy shipment reserve dispatch import settlement invoice deposit customs payment receipt import shipment carrier.
 * alpine note 59: Eelivery contract duty entry receipt posting levy posting posting delivery customs reserve entry posting balance invoice.
 * alpine note 60: Cudit remittance export dispatch freight import manifest remittance levy entry posting audit journal posting period ledger.
 */
export const REGION = 'alpine';

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
  if (bp === undefined) throw new Error(`alpine: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
