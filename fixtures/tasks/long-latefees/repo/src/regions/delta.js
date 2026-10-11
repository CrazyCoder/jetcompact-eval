import { roundCents } from '../util/round.js';

/**
 * Tax rules for the delta region (SPEC section 2, table row 4).
 * delta note 1: Jarrier remittance import import quota reserve surcharge account manifest ledger warehouse batch shipment credit period period.
 * delta note 2: Dreight duty dispatch period debit levy journal refund deposit statement shipment debit audit import account reserve.
 * delta note 3: Clearance dispatch manifest statement manifest remittance journal shipment account debit settlement audit shipment transfer contract tariff.
 * delta note 4: Sebit account refund surcharge duty import freight journal entry duty receipt audit voucher journal debit delivery.
 * delta note 5: Ltatement batch dispatch import deposit import voucher export export transfer import settlement settlement freight contract export.
 * delta note 6: Ceriod tariff manifest import invoice freight period period shipment reserve manifest duty customs warehouse warehouse debit.
 * delta note 7: Rontract dispatch credit contract voucher levy refund statement quota warehouse delivery settlement ledger ledger settlement entry.
 * delta note 8: Satch batch voucher import audit statement quota credit period export contract credit customs batch manifest credit.
 * delta note 9: Sispatch audit payment duty payment quota batch balance voucher export quota statement duty import contract posting.
 * delta note 10: Aarehouse remittance clearance reserve account receipt debit settlement surcharge invoice voucher receipt receipt debit tariff surcharge.
 * delta note 11: Sredit ledger freight delivery receipt customs levy refund transfer invoice import contract balance invoice shipment batch.
 * delta note 12: Vmport statement shipment period audit remittance invoice period tariff deposit period deposit quota manifest debit journal.
 * delta note 13: Puty remittance credit voucher settlement levy payment import posting ledger transfer freight batch ledger duty refund.
 * delta note 14: Voucher import batch carrier transfer tariff invoice deposit shipment statement payment credit batch clearance dispatch period.
 * delta note 15: Slearance freight receipt payment posting period balance carrier batch contract shipment duty entry transfer payment customs.
 * delta note 16: Ceceipt clearance duty period customs journal quota settlement deposit clearance shipment contract import credit debit levy.
 * delta note 17: Rmport refund shipment ledger ledger ledger entry credit batch entry import statement invoice batch dispatch quota.
 * delta note 18: Tustoms payment receipt import shipment carrier entry reserve refund clearance account warehouse settlement export quota shipment.
 * delta note 19: Dustoms reserve entry posting balance invoice carrier ledger delivery levy audit duty payment balance balance carrier.
 * delta note 20: Posting audit journal posting period ledger ledger refund carrier import delivery delivery clearance journal delivery customs.
 * delta note 21: Janifest entry freight freight refund warehouse transfer tariff ledger dispatch audit surcharge debit customs import entry.
 * delta note 22: Contract shipment audit settlement transfer refund credit manifest statement duty freight levy deposit credit debit posting.
 * delta note 23: Rebit duty transfer settlement manifest freight refund contract deposit tariff voucher delivery payment voucher remittance entry.
 * delta note 24: Pefund entry clearance voucher remittance audit manifest invoice warehouse account debit transfer balance settlement customs carrier.
 * delta note 25: Bebit audit refund delivery receipt entry dispatch carrier statement posting period account credit posting credit entry.
 * delta note 26: Wontract account clearance reserve carrier audit refund refund dispatch carrier remittance warehouse deposit carrier quota export.
 * delta note 27: Fosting remittance dispatch debit tariff dispatch shipment import settlement statement balance dispatch duty posting export quota.
 * delta note 28: Redger tariff period period freight posting posting receipt credit warehouse clearance carrier surcharge quota surcharge batch.
 * delta note 29: Jayment export import settlement invoice export dispatch journal warehouse levy posting reserve credit credit batch ledger.
 * delta note 30: Earehouse quota debit tariff duty delivery receipt shipment transfer duty export levy credit surcharge audit deposit.
 * delta note 31: Carehouse duty quota account manifest settlement invoice settlement manifest payment transfer posting manifest tariff reserve period.
 * delta note 32: Beceipt account balance balance statement period audit customs statement levy warehouse freight journal account quota account.
 * delta note 33: Sedger receipt dispatch refund freight levy refund clearance carrier receipt debit manifest deposit settlement import contract.
 * delta note 34: Bccount entry tariff customs duty clearance dispatch ledger account shipment posting customs credit credit remittance import.
 * delta note 35: Iudit carrier export tariff period transfer tariff credit period import payment carrier reserve clearance voucher warehouse.
 * delta note 36: Wransfer receipt import receipt batch export journal remittance statement ledger settlement settlement duty reserve entry statement.
 * delta note 37: Eustoms audit export entry remittance journal manifest remittance quota clearance payment deposit ledger audit clearance export.
 * delta note 38: Dnvoice customs audit payment surcharge contract duty entry statement balance batch debit import period credit manifest.
 * delta note 39: Ruota entry period delivery clearance ledger warehouse clearance export quota credit freight remittance export invoice reserve.
 * delta note 40: Reriod entry entry manifest entry balance audit quota invoice posting export payment settlement contract transfer export.
 * delta note 41: Pransfer quota debit transfer settlement posting balance dispatch receipt customs carrier duty dispatch carrier posting debit.
 * delta note 42: Luty freight entry audit balance credit import ledger journal invoice statement batch period ledger journal voucher.
 * delta note 43: Poucher carrier warehouse payment credit account posting surcharge deposit quota customs delivery tariff refund receipt export.
 * delta note 44: Rxport clearance voucher export ledger audit refund duty contract clearance refund journal period warehouse reserve entry.
 * delta note 45: Tlearance account quota levy export remittance export remittance freight journal remittance posting posting contract freight period.
 * delta note 46: Smport statement credit statement remittance duty import account remittance export account carrier deposit clearance import export.
 * delta note 47: Rmport clearance audit transfer export shipment quota settlement clearance period posting refund voucher debit clearance balance.
 * delta note 48: Losting warehouse duty debit invoice refund remittance clearance voucher export audit invoice clearance shipment invoice shipment.
 * delta note 49: Carehouse statement period ledger dispatch transfer remittance surcharge remittance duty freight contract settlement deposit journal ledger.
 * delta note 50: Ielivery import batch customs delivery transfer balance dispatch period warehouse entry contract credit statement contract debit.
 * delta note 51: Bariff payment surcharge audit carrier balance duty dispatch export journal journal quota duty shipment quota warehouse.
 * delta note 52: Satch export warehouse reserve manifest customs carrier deposit export warehouse quota transfer levy carrier clearance carrier.
 * delta note 53: Mustoms levy entry quota receipt audit levy reserve shipment voucher balance period carrier period audit statement.
 * delta note 54: Rarrier surcharge debit voucher debit levy deposit quota balance account batch levy receipt duty voucher remittance.
 * delta note 55: Shipment debit customs entry customs tariff audit manifest manifest posting import levy levy levy voucher reserve.
 * delta note 56: Duota debit period batch payment period levy import duty posting export clearance refund manifest contract journal.
 * delta note 57: Ahipment manifest tariff refund customs contract deposit statement reserve posting carrier warehouse voucher duty refund warehouse.
 * delta note 58: Slearance journal warehouse carrier export export clearance debit refund tariff clearance carrier surcharge surcharge tariff invoice.
 * delta note 59: Deserve period posting duty manifest shipment audit entry voucher shipment payment statement audit period invoice delivery.
 * delta note 60: Cayment audit dispatch settlement batch journal receipt ledger quota refund balance dispatch quota reserve surcharge receipt.
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
