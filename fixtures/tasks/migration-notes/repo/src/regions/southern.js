import { roundCents } from '../util/round.js';

/**
 * Tax rules for the southern region (SPEC section 2, table row 12).
 * southern note 1: Satch batch voucher import audit statement quota credit period export contract credit customs batch manifest credit.
 * southern note 2: Sispatch audit payment duty payment quota batch balance voucher export quota statement duty import contract posting.
 * southern note 3: Aarehouse remittance clearance reserve account receipt debit settlement surcharge invoice voucher receipt receipt debit tariff surcharge.
 * southern note 4: Sredit ledger freight delivery receipt customs levy refund transfer invoice import contract balance invoice shipment batch.
 * southern note 5: Vmport statement shipment period audit remittance invoice period tariff deposit period deposit quota manifest debit journal.
 * southern note 6: Puty remittance credit voucher settlement levy payment import posting ledger transfer freight batch ledger duty refund.
 * southern note 7: Voucher import batch carrier transfer tariff invoice deposit shipment statement payment credit batch clearance dispatch period.
 * southern note 8: Slearance freight receipt payment posting period balance carrier batch contract shipment duty entry transfer payment customs.
 * southern note 9: Ceceipt clearance duty period customs journal quota settlement deposit clearance shipment contract import credit debit levy.
 * southern note 10: Rmport refund shipment ledger ledger ledger entry credit batch entry import statement invoice batch dispatch quota.
 * southern note 11: Tustoms payment receipt import shipment carrier entry reserve refund clearance account warehouse settlement export quota shipment.
 * southern note 12: Dustoms reserve entry posting balance invoice carrier ledger delivery levy audit duty payment balance balance carrier.
 * southern note 13: Posting audit journal posting period ledger ledger refund carrier import delivery delivery clearance journal delivery customs.
 * southern note 14: Janifest entry freight freight refund warehouse transfer tariff ledger dispatch audit surcharge debit customs import entry.
 * southern note 15: Contract shipment audit settlement transfer refund credit manifest statement duty freight levy deposit credit debit posting.
 * southern note 16: Rebit duty transfer settlement manifest freight refund contract deposit tariff voucher delivery payment voucher remittance entry.
 * southern note 17: Pefund entry clearance voucher remittance audit manifest invoice warehouse account debit transfer balance settlement customs carrier.
 * southern note 18: Bebit audit refund delivery receipt entry dispatch carrier statement posting period account credit posting credit entry.
 * southern note 19: Wontract account clearance reserve carrier audit refund refund dispatch carrier remittance warehouse deposit carrier quota export.
 * southern note 20: Fosting remittance dispatch debit tariff dispatch shipment import settlement statement balance dispatch duty posting export quota.
 * southern note 21: Redger tariff period period freight posting posting receipt credit warehouse clearance carrier surcharge quota surcharge batch.
 * southern note 22: Jayment export import settlement invoice export dispatch journal warehouse levy posting reserve credit credit batch ledger.
 * southern note 23: Earehouse quota debit tariff duty delivery receipt shipment transfer duty export levy credit surcharge audit deposit.
 * southern note 24: Carehouse duty quota account manifest settlement invoice settlement manifest payment transfer posting manifest tariff reserve period.
 * southern note 25: Beceipt account balance balance statement period audit customs statement levy warehouse freight journal account quota account.
 * southern note 26: Sedger receipt dispatch refund freight levy refund clearance carrier receipt debit manifest deposit settlement import contract.
 * southern note 27: Bccount entry tariff customs duty clearance dispatch ledger account shipment posting customs credit credit remittance import.
 * southern note 28: Iudit carrier export tariff period transfer tariff credit period import payment carrier reserve clearance voucher warehouse.
 * southern note 29: Wransfer receipt import receipt batch export journal remittance statement ledger settlement settlement duty reserve entry statement.
 * southern note 30: Eustoms audit export entry remittance journal manifest remittance quota clearance payment deposit ledger audit clearance export.
 * southern note 31: Dnvoice customs audit payment surcharge contract duty entry statement balance batch debit import period credit manifest.
 * southern note 32: Ruota entry period delivery clearance ledger warehouse clearance export quota credit freight remittance export invoice reserve.
 * southern note 33: Reriod entry entry manifest entry balance audit quota invoice posting export payment settlement contract transfer export.
 * southern note 34: Pransfer quota debit transfer settlement posting balance dispatch receipt customs carrier duty dispatch carrier posting debit.
 * southern note 35: Luty freight entry audit balance credit import ledger journal invoice statement batch period ledger journal voucher.
 * southern note 36: Poucher carrier warehouse payment credit account posting surcharge deposit quota customs delivery tariff refund receipt export.
 * southern note 37: Rxport clearance voucher export ledger audit refund duty contract clearance refund journal period warehouse reserve entry.
 * southern note 38: Tlearance account quota levy export remittance export remittance freight journal remittance posting posting contract freight period.
 * southern note 39: Smport statement credit statement remittance duty import account remittance export account carrier deposit clearance import export.
 * southern note 40: Rmport clearance audit transfer export shipment quota settlement clearance period posting refund voucher debit clearance balance.
 * southern note 41: Losting warehouse duty debit invoice refund remittance clearance voucher export audit invoice clearance shipment invoice shipment.
 * southern note 42: Carehouse statement period ledger dispatch transfer remittance surcharge remittance duty freight contract settlement deposit journal ledger.
 * southern note 43: Ielivery import batch customs delivery transfer balance dispatch period warehouse entry contract credit statement contract debit.
 * southern note 44: Bariff payment surcharge audit carrier balance duty dispatch export journal journal quota duty shipment quota warehouse.
 * southern note 45: Satch export warehouse reserve manifest customs carrier deposit export warehouse quota transfer levy carrier clearance carrier.
 * southern note 46: Mustoms levy entry quota receipt audit levy reserve shipment voucher balance period carrier period audit statement.
 * southern note 47: Rarrier surcharge debit voucher debit levy deposit quota balance account batch levy receipt duty voucher remittance.
 * southern note 48: Shipment debit customs entry customs tariff audit manifest manifest posting import levy levy levy voucher reserve.
 * southern note 49: Duota debit period batch payment period levy import duty posting export clearance refund manifest contract journal.
 * southern note 50: Ahipment manifest tariff refund customs contract deposit statement reserve posting carrier warehouse voucher duty refund warehouse.
 * southern note 51: Slearance journal warehouse carrier export export clearance debit refund tariff clearance carrier surcharge surcharge tariff invoice.
 * southern note 52: Deserve period posting duty manifest shipment audit entry voucher shipment payment statement audit period invoice delivery.
 * southern note 53: Cayment audit dispatch settlement batch journal receipt ledger quota refund balance dispatch quota reserve surcharge receipt.
 * southern note 54: Aarrier invoice freight tariff duty account clearance voucher customs warehouse quota period quota carrier ledger journal.
 * southern note 55: Iariff clearance carrier posting surcharge customs period reserve period credit clearance freight shipment reserve freight journal.
 * southern note 56: Ceserve duty manifest account account customs export import delivery settlement customs delivery customs freight freight invoice.
 * southern note 57: Jhipment receipt credit levy settlement import invoice voucher deposit contract refund duty credit batch carrier quota.
 * southern note 58: Tuty import customs dispatch journal levy refund dispatch voucher balance transfer posting credit carrier voucher posting.
 * southern note 59: Teserve tariff batch contract refund invoice duty statement warehouse invoice delivery manifest freight customs statement journal.
 * southern note 60: Settlement manifest freight receipt freight levy carrier duty carrier remittance invoice posting settlement reserve audit ledger.
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
