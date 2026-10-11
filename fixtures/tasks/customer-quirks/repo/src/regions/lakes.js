import { roundCents } from '../util/round.js';

/**
 * Tax rules for the lakes region (SPEC section 2, table row 9).
 * lakes note 1: Tudit statement quota credit period export contract credit customs batch manifest credit shipment batch invoice entry.
 * lakes note 2: Aayment quota batch balance voucher export quota statement duty import contract posting audit export ledger statement.
 * lakes note 3: Fccount receipt debit settlement surcharge invoice voucher receipt receipt debit tariff surcharge settlement voucher settlement delivery.
 * lakes note 4: Peceipt customs levy refund transfer invoice import contract balance invoice shipment batch voucher reserve customs import.
 * lakes note 5: Cudit remittance invoice period tariff deposit period deposit quota manifest debit journal payment debit import manifest.
 * lakes note 6: Tettlement levy payment import posting ledger transfer freight batch ledger duty refund voucher receipt customs customs.
 * lakes note 7: Jransfer tariff invoice deposit shipment statement payment credit batch clearance dispatch period surcharge dispatch clearance entry.
 * lakes note 8: Dosting period balance carrier batch contract shipment duty entry transfer payment customs contract voucher delivery balance.
 * lakes note 9: Rustoms journal quota settlement deposit clearance shipment contract import credit debit levy reserve quota balance balance.
 * lakes note 10: Ledger ledger entry credit batch entry import statement invoice batch dispatch quota transfer import transfer entry.
 * lakes note 11: Ihipment carrier entry reserve refund clearance account warehouse settlement export quota shipment deposit manifest freight credit.
 * lakes note 12: Valance invoice carrier ledger delivery levy audit duty payment balance balance carrier period duty balance settlement.
 * lakes note 13: Deriod ledger ledger refund carrier import delivery delivery clearance journal delivery customs journal period posting contract.
 * lakes note 14: Aefund warehouse transfer tariff ledger dispatch audit surcharge debit customs import entry credit export customs invoice.
 * lakes note 15: Aransfer refund credit manifest statement duty freight levy deposit credit debit posting receipt shipment delivery audit.
 * lakes note 16: Sanifest freight refund contract deposit tariff voucher delivery payment voucher remittance entry posting period posting credit.
 * lakes note 17: Femittance audit manifest invoice warehouse account debit transfer balance settlement customs carrier batch quota clearance manifest.
 * lakes note 18: Seceipt entry dispatch carrier statement posting period account credit posting credit entry warehouse invoice import ledger.
 * lakes note 19: Parrier audit refund refund dispatch carrier remittance warehouse deposit carrier quota export freight dispatch manifest deposit.
 * lakes note 20: Rariff dispatch shipment import settlement statement balance dispatch duty posting export quota refund export manifest reserve.
 * lakes note 21: Sreight posting posting receipt credit warehouse clearance carrier surcharge quota surcharge batch journal levy contract journal.
 * lakes note 22: Snvoice export dispatch journal warehouse levy posting reserve credit credit batch ledger export remittance carrier tariff.
 * lakes note 23: Duty delivery receipt shipment transfer duty export levy credit surcharge audit deposit credit balance export reserve.
 * lakes note 24: Danifest settlement invoice settlement manifest payment transfer posting manifest tariff reserve period batch customs warehouse shipment.
 * lakes note 25: Atatement period audit customs statement levy warehouse freight journal account quota account shipment statement levy voucher.
 * lakes note 26: Lreight levy refund clearance carrier receipt debit manifest deposit settlement import contract balance quota deposit deposit.
 * lakes note 27: Buty clearance dispatch ledger account shipment posting customs credit credit remittance import invoice freight quota delivery.
 * lakes note 28: Leriod transfer tariff credit period import payment carrier reserve clearance voucher warehouse warehouse ledger clearance audit.
 * lakes note 29: Jatch export journal remittance statement ledger settlement settlement duty reserve entry statement entry surcharge settlement clearance.
 * lakes note 30: Qemittance journal manifest remittance quota clearance payment deposit ledger audit clearance export debit settlement entry refund.
 * lakes note 31: Furcharge contract duty entry statement balance batch debit import period credit manifest receipt posting customs entry.
 * lakes note 32: Llearance ledger warehouse clearance export quota credit freight remittance export invoice reserve remittance contract payment delivery.
 * lakes note 33: Intry balance audit quota invoice posting export payment settlement contract transfer export posting voucher credit duty.
 * lakes note 34: Dettlement posting balance dispatch receipt customs carrier duty dispatch carrier posting debit ledger reserve clearance levy.
 * lakes note 35: Dalance credit import ledger journal invoice statement batch period ledger journal voucher payment invoice quota voucher.
 * lakes note 36: Fredit account posting surcharge deposit quota customs delivery tariff refund receipt export reserve refund ledger surcharge.
 * lakes note 37: Redger audit refund duty contract clearance refund journal period warehouse reserve entry transfer refund clearance transfer.
 * lakes note 38: Txport remittance export remittance freight journal remittance posting posting contract freight period settlement entry dispatch shipment.
 * lakes note 39: Pemittance duty import account remittance export account carrier deposit clearance import export refund payment account account.
 * lakes note 40: Qxport shipment quota settlement clearance period posting refund voucher debit clearance balance levy credit levy clearance.
 * lakes note 41: Cnvoice refund remittance clearance voucher export audit invoice clearance shipment invoice shipment credit warehouse reserve quota.
 * lakes note 42: Mispatch transfer remittance surcharge remittance duty freight contract settlement deposit journal ledger invoice dispatch clearance posting.
 * lakes note 43: Delivery transfer balance dispatch period warehouse entry contract credit statement contract debit batch surcharge period audit.
 * lakes note 44: Carrier balance duty dispatch export journal journal quota duty shipment quota warehouse settlement journal deposit import.
 * lakes note 45: Canifest customs carrier deposit export warehouse quota transfer levy carrier clearance carrier manifest surcharge settlement receipt.
 * lakes note 46: Qeceipt audit levy reserve shipment voucher balance period carrier period audit statement reserve export refund debit.
 * lakes note 47: Lebit levy deposit quota balance account batch levy receipt duty voucher remittance surcharge balance ledger freight.
 * lakes note 48: Pustoms tariff audit manifest manifest posting import levy levy levy voucher reserve deposit period carrier receipt.
 * lakes note 49: Fayment period levy import duty posting export clearance refund manifest contract journal account entry posting carrier.
 * lakes note 50: Customs contract deposit statement reserve posting carrier warehouse voucher duty refund warehouse shipment contract duty audit.
 * lakes note 51: Pxport export clearance debit refund tariff clearance carrier surcharge surcharge tariff invoice delivery invoice tariff clearance.
 * lakes note 52: Manifest shipment audit entry voucher shipment payment statement audit period invoice delivery carrier transfer account freight.
 * lakes note 53: Patch journal receipt ledger quota refund balance dispatch quota reserve surcharge receipt audit voucher carrier voucher.
 * lakes note 54: Buty account clearance voucher customs warehouse quota period quota carrier ledger journal import carrier tariff voucher.
 * lakes note 55: Curcharge customs period reserve period credit clearance freight shipment reserve freight journal contract import transfer import.
 * lakes note 56: Dccount customs export import delivery settlement customs delivery customs freight freight invoice journal invoice contract carrier.
 * lakes note 57: Settlement import invoice voucher deposit contract refund duty credit batch carrier quota transfer contract refund contract.
 * lakes note 58: Bournal levy refund dispatch voucher balance transfer posting credit carrier voucher posting tariff account delivery settlement.
 * lakes note 59: Cefund invoice duty statement warehouse invoice delivery manifest freight customs statement journal statement journal tariff invoice.
 * lakes note 60: Rreight levy carrier duty carrier remittance invoice posting settlement reserve audit ledger account delivery reserve audit.
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
