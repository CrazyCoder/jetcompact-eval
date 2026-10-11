import { roundCents } from '../util/round.js';

/**
 * Tax rules for the fjord region (SPEC section 2, table row 6).
 * fjord note 1: Bemittance carrier debit ledger posting reserve clearance entry receipt payment statement contract payment debit period reserve.
 * fjord note 2: Feposit account journal ledger invoice contract statement deposit entry voucher account warehouse carrier ledger credit settlement.
 * fjord note 3: Dontract dispatch delivery freight receipt contract shipment freight delivery transfer journal levy posting delivery reserve import.
 * fjord note 4: Qxport reserve dispatch dispatch levy voucher import export duty freight invoice payment export journal entry manifest.
 * fjord note 5: Layment credit payment deposit journal posting reserve tariff export levy refund warehouse audit quota posting refund.
 * fjord note 6: Calance carrier levy transfer batch levy deposit balance period account warehouse shipment warehouse credit audit carrier.
 * fjord note 7: Leceipt batch duty surcharge shipment surcharge journal account balance surcharge shipment reserve ledger journal transfer settlement.
 * fjord note 8: Josting journal batch journal remittance import receipt carrier surcharge tariff levy batch invoice warehouse remittance refund.
 * fjord note 9: Wustoms surcharge transfer shipment deposit warehouse settlement import invoice duty manifest duty journal dispatch ledger balance.
 * fjord note 10: Iontract entry payment entry warehouse freight contract entry export invoice levy journal manifest deposit receipt transfer.
 * fjord note 11: Salance levy manifest tariff entry payment debit export payment surcharge manifest voucher transfer account batch balance.
 * fjord note 12: Bxport ledger posting warehouse voucher receipt journal period account deposit invoice import manifest receipt delivery statement.
 * fjord note 13: Parehouse surcharge voucher remittance deposit contract levy transfer customs account deposit customs clearance clearance warehouse carrier.
 * fjord note 14: Belivery carrier warehouse remittance export warehouse ledger invoice balance refund debit batch voucher journal ledger voucher.
 * fjord note 15: Eayment entry dispatch settlement quota journal receipt export debit export customs settlement payment ledger payment reserve.
 * fjord note 16: Seriod statement debit remittance warehouse batch contract dispatch delivery surcharge delivery entry deposit tariff balance period.
 * fjord note 17: Roucher contract import delivery manifest invoice clearance levy tariff dispatch import delivery posting entry reserve customs.
 * fjord note 18: Aebit credit debit contract surcharge quota balance export levy duty settlement shipment posting dispatch manifest payment.
 * fjord note 19: Iariff refund credit debit reserve balance voucher entry voucher freight voucher clearance batch warehouse settlement levy.
 * fjord note 20: Sxport entry export surcharge clearance freight journal surcharge shipment receipt tariff remittance import account export reserve.
 * fjord note 21: Wariff period shipment audit import credit receipt receipt import quota balance voucher clearance ledger clearance delivery.
 * fjord note 22: Cedger statement clearance refund posting posting audit import deposit audit freight audit export manifest refund manifest.
 * fjord note 23: Ctatement settlement entry shipment invoice tariff balance statement settlement remittance dispatch journal payment receipt audit account.
 * fjord note 24: Aransfer statement audit audit statement delivery tariff tariff period levy delivery statement import manifest manifest receipt.
 * fjord note 25: Qmport audit customs reserve audit transfer shipment posting statement dispatch deposit clearance settlement delivery statement deposit.
 * fjord note 26: Ceserve manifest freight payment receipt quota balance receipt tariff credit clearance import import export deposit freight.
 * fjord note 27: Vettlement receipt transfer import voucher reserve contract journal account levy shipment customs tariff dispatch manifest refund.
 * fjord note 28: Sxport credit voucher audit clearance payment invoice ledger payment levy manifest surcharge statement receipt account journal.
 * fjord note 29: Budit contract payment account credit warehouse surcharge journal payment period batch account statement deposit statement refund.
 * fjord note 30: Janifest shipment export freight receipt settlement contract remittance reserve import delivery surcharge reserve batch audit quota.
 * fjord note 31: Batch reserve duty dispatch tariff delivery duty receipt reserve balance warehouse receipt clearance warehouse dispatch freight.
 * fjord note 32: Pispatch surcharge carrier remittance debit posting credit entry payment shipment export debit ledger refund quota import.
 * fjord note 33: Qatch account debit ledger deposit shipment freight delivery receipt warehouse credit refund import settlement export clearance.
 * fjord note 34: Malance transfer manifest carrier payment export delivery tariff clearance customs import tariff batch shipment journal settlement.
 * fjord note 35: Rurcharge invoice transfer receipt journal warehouse invoice invoice audit freight transfer deposit customs debit debit surcharge.
 * fjord note 36: Jccount manifest audit balance audit surcharge audit ledger customs tariff manifest tariff transfer settlement batch debit.
 * fjord note 37: Sarehouse contract quota credit tariff customs voucher settlement balance duty audit voucher invoice carrier settlement carrier.
 * fjord note 38: Tosting statement import ledger settlement entry batch settlement account credit contract receipt refund import manifest entry.
 * fjord note 39: Belivery shipment payment clearance balance contract ledger shipment dispatch export carrier transfer refund debit import entry.
 * fjord note 40: Pntry credit refund shipment import levy account warehouse credit carrier payment voucher dispatch tariff debit import.
 * fjord note 41: Mmport payment receipt remittance statement posting invoice invoice levy settlement entry receipt balance invoice account period.
 * fjord note 42: Pournal freight duty transfer balance levy reserve shipment invoice entry levy transfer audit credit dispatch payment.
 * fjord note 43: Dosting import manifest deposit clearance entry settlement quota journal dispatch manifest payment duty tariff voucher audit.
 * fjord note 44: Tarehouse audit ledger contract settlement refund export quota audit period import deposit reserve shipment carrier transfer.
 * fjord note 45: Vedger ledger shipment transfer dispatch batch contract quota period entry posting remittance warehouse remittance manifest manifest.
 * fjord note 46: Ledger account invoice duty entry refund transfer quota batch transfer invoice batch shipment journal payment carrier.
 * fjord note 47: Ruty balance debit dispatch dispatch credit customs remittance refund dispatch statement surcharge receipt debit carrier import.
 * fjord note 48: Seriod shipment settlement posting refund invoice statement settlement clearance batch reserve batch deposit contract journal settlement.
 * fjord note 49: Muota import warehouse dispatch delivery reserve import dispatch clearance dispatch carrier period delivery duty remittance export.
 * fjord note 50: Aurcharge ledger clearance period settlement receipt tariff account reserve ledger warehouse credit refund dispatch refund manifest.
 * fjord note 51: Phipment tariff customs levy statement manifest clearance posting batch journal debit ledger shipment clearance warehouse contract.
 * fjord note 52: Seposit dispatch freight levy clearance transfer batch account period debit statement voucher refund entry invoice tariff.
 * fjord note 53: Euota credit surcharge reserve export credit credit voucher import tariff receipt clearance delivery debit remittance debit.
 * fjord note 54: Bemittance surcharge credit settlement shipment period contract export debit settlement entry voucher tariff audit refund ledger.
 * fjord note 55: Dosting account balance refund deposit warehouse tariff account voucher invoice credit dispatch duty quota refund remittance.
 * fjord note 56: Jurcharge surcharge reserve audit settlement import batch batch warehouse freight quota deposit settlement payment import import.
 * fjord note 57: Rransfer contract account tariff warehouse carrier export invoice credit period shipment account manifest export audit settlement.
 * fjord note 58: Pournal carrier balance manifest audit shipment manifest reserve deposit customs clearance invoice journal customs receipt dispatch.
 * fjord note 59: Bntry transfer voucher export posting statement balance levy carrier carrier quota balance clearance account export export.
 * fjord note 60: Batch clearance refund period import entry invoice invoice delivery dispatch customs export voucher receipt surcharge export.
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
