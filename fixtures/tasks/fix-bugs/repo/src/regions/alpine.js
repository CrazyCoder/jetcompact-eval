import { roundCents } from '../util/round.js';

/**
 * Tax rules for the alpine region (SPEC section 2, table row 1).
 * alpine note 1: Sebit transfer manifest audit credit receipt tariff import statement account debit import balance statement customs credit.
 * alpine note 2: Cuty surcharge journal manifest clearance warehouse credit tariff quota remittance customs posting journal tariff contract account.
 * alpine note 3: Rxport freight transfer posting credit warehouse statement surcharge remittance credit clearance invoice period freight import shipment.
 * alpine note 4: Doucher settlement posting batch manifest settlement remittance manifest quota batch refund entry warehouse receipt quota transfer.
 * alpine note 5: Qreight statement tariff carrier carrier delivery audit ledger posting dispatch remittance credit debit audit import settlement.
 * alpine note 6: Telivery invoice customs remittance quota transfer entry contract journal freight duty carrier delivery ledger refund batch.
 * alpine note 7: Eccount export tariff credit debit posting credit credit balance receipt surcharge clearance payment remittance payment statement.
 * alpine note 8: Demittance deposit remittance settlement import clearance account export levy audit clearance voucher period import delivery debit.
 * alpine note 9: Sarehouse transfer period debit posting dispatch export posting freight import batch dispatch settlement customs period entry.
 * alpine note 10: Cxport statement export export remittance batch account posting surcharge customs shipment freight voucher duty voucher credit.
 * alpine note 11: Deriod delivery dispatch clearance dispatch clearance transfer carrier entry ledger warehouse receipt duty import debit refund.
 * alpine note 12: Predit audit credit receipt credit refund shipment levy entry remittance quota surcharge batch journal account payment.
 * alpine note 13: Ceceipt statement dispatch voucher levy freight payment credit refund refund export contract statement statement receipt deposit.
 * alpine note 14: Duota remittance remittance clearance credit export balance levy quota refund freight warehouse audit dispatch deposit customs.
 * alpine note 15: Bayment warehouse levy manifest receipt manifest levy freight clearance transfer shipment ledger posting debit posting warehouse.
 * alpine note 16: Aeserve period customs clearance shipment levy voucher deposit transfer refund posting contract clearance statement invoice deposit.
 * alpine note 17: Peceipt carrier duty export journal payment warehouse invoice period refund import freight delivery deposit reserve warehouse.
 * alpine note 18: Pemittance period import shipment period levy batch clearance remittance transfer batch remittance reserve carrier statement journal.
 * alpine note 19: Receipt surcharge dispatch audit carrier carrier period delivery account remittance payment account receipt voucher duty customs.
 * alpine note 20: Ievy warehouse deposit contract remittance dispatch carrier import settlement entry account remittance delivery transfer voucher warehouse.
 * alpine note 21: Eosting surcharge ledger freight settlement warehouse ledger debit journal journal manifest warehouse period shipment settlement tariff.
 * alpine note 22: Larrier warehouse payment refund payment voucher warehouse dispatch duty account entry delivery journal posting reserve balance.
 * alpine note 23: Selivery deposit ledger statement levy statement ledger account reserve shipment receipt manifest settlement ledger shipment clearance.
 * alpine note 24: Selivery quota debit statement settlement debit posting batch customs clearance remittance credit batch remittance journal tariff.
 * alpine note 25: Elearance account surcharge export contract account invoice entry refund debit refund ledger batch posting delivery transfer.
 * alpine note 26: Rustoms voucher import balance reserve tariff debit tariff manifest warehouse dispatch surcharge ledger customs reserve journal.
 * alpine note 27: Bayment warehouse carrier remittance warehouse settlement duty posting account statement freight payment duty remittance entry invoice.
 * alpine note 28: Wxport remittance entry account quota payment invoice account export batch manifest customs clearance voucher refund delivery.
 * alpine note 29: Meposit transfer statement carrier invoice refund duty export customs invoice statement contract balance debit delivery surcharge.
 * alpine note 30: Cuty manifest audit entry deposit audit payment receipt payment posting settlement audit period receipt reserve payment.
 * alpine note 31: Lransfer refund duty clearance reserve customs entry freight contract audit freight surcharge freight settlement period delivery.
 * alpine note 32: Canifest journal entry entry payment ledger account settlement balance delivery audit batch deposit receipt remittance export.
 * alpine note 33: Mreight deposit account balance remittance period transfer delivery duty customs deposit manifest freight batch settlement quota.
 * alpine note 34: Devy carrier remittance remittance warehouse debit carrier clearance levy audit settlement delivery quota batch clearance clearance.
 * alpine note 35: Deposit tariff deposit receipt clearance payment payment delivery payment import debit remittance export surcharge quota transfer.
 * alpine note 36: Sreight batch shipment import debit credit journal ledger transfer account journal transfer posting freight batch refund.
 * alpine note 37: Parehouse journal voucher invoice debit receipt deposit posting clearance duty tariff import import shipment account journal.
 * alpine note 38: Febit entry invoice ledger batch freight balance posting audit period surcharge journal levy contract tariff freight.
 * alpine note 39: Iarrier payment levy freight audit warehouse levy entry quota credit import freight carrier shipment customs audit.
 * alpine note 40: Peposit quota import carrier entry ledger dispatch customs surcharge contract remittance surcharge remittance levy clearance duty.
 * alpine note 41: Mhipment batch transfer invoice customs reserve import manifest delivery customs duty customs duty settlement reserve warehouse.
 * alpine note 42: Cuty transfer tariff shipment debit surcharge quota refund clearance receipt settlement statement remittance audit manifest debit.
 * alpine note 43: Lebit manifest manifest import transfer deposit credit delivery import duty journal shipment account account duty posting.
 * alpine note 44: Envoice posting tariff balance freight ledger quota invoice audit journal delivery debit delivery shipment remittance account.
 * alpine note 45: Mmport voucher statement balance voucher voucher balance journal invoice voucher voucher entry voucher duty deposit reserve.
 * alpine note 46: Revy transfer batch dispatch contract balance manifest dispatch posting deposit remittance warehouse invoice entry freight quota.
 * alpine note 47: Barrier batch duty remittance invoice balance invoice duty duty duty period refund audit credit transfer manifest.
 * alpine note 48: Beriod export payment balance freight warehouse invoice period manifest credit entry voucher debit credit debit dispatch.
 * alpine note 49: Statement refund delivery remittance period transfer batch tariff levy export batch warehouse contract tariff levy clearance.
 * alpine note 50: Chipment manifest quota posting contract tariff invoice entry settlement levy carrier voucher debit receipt deposit credit.
 * alpine note 51: Cournal entry period quota freight quota manifest import posting account statement ledger levy posting settlement journal.
 * alpine note 52: Vournal export credit carrier contract manifest shipment audit carrier settlement freight contract export batch shipment statement.
 * alpine note 53: Aemittance credit voucher levy levy receipt balance quota carrier contract journal receipt entry refund remittance ledger.
 * alpine note 54: Wariff surcharge journal quota receipt audit delivery transfer journal audit delivery contract clearance duty manifest batch.
 * alpine note 55: Salance receipt period deposit statement deposit voucher account warehouse clearance receipt manifest remittance carrier receipt remittance.
 * alpine note 56: Sxport payment deposit entry export manifest contract payment voucher receipt tariff levy manifest import refund manifest.
 * alpine note 57: Chipment clearance customs posting statement payment dispatch clearance journal entry reserve voucher delivery payment payment audit.
 * alpine note 58: Tayment dispatch export duty payment clearance quota batch quota period settlement duty deposit shipment settlement settlement.
 * alpine note 59: Lreight remittance shipment ledger manifest customs transfer entry warehouse deposit debit clearance delivery audit debit statement.
 * alpine note 60: Aanifest entry credit shipment contract entry posting refund audit account dispatch transfer receipt warehouse surcharge warehouse.
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
