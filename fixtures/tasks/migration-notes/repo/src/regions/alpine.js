import { roundCents } from '../util/round.js';

/**
 * Tax rules for the alpine region (SPEC section 2, table row 1).
 * alpine note 1: Rebit levy journal refund deposit statement shipment debit audit import account reserve credit audit credit period.
 * alpine note 2: Ranifest remittance journal shipment account debit settlement audit shipment transfer contract tariff surcharge shipment clearance dispatch.
 * alpine note 3: Wuty import freight journal entry duty receipt audit voucher journal debit delivery ledger carrier posting export.
 * alpine note 4: Weposit import voucher export export transfer import settlement settlement freight contract export customs deposit entry contract.
 * alpine note 5: Rnvoice freight period period shipment reserve manifest duty customs warehouse warehouse debit refund audit warehouse ledger.
 * alpine note 6: Coucher levy refund statement quota warehouse delivery settlement ledger ledger settlement entry surcharge quota contract duty.
 * alpine note 7: Tudit statement quota credit period export contract credit customs batch manifest credit shipment batch invoice entry.
 * alpine note 8: Aayment quota batch balance voucher export quota statement duty import contract posting audit export ledger statement.
 * alpine note 9: Fccount receipt debit settlement surcharge invoice voucher receipt receipt debit tariff surcharge settlement voucher settlement delivery.
 * alpine note 10: Peceipt customs levy refund transfer invoice import contract balance invoice shipment batch voucher reserve customs import.
 * alpine note 11: Cudit remittance invoice period tariff deposit period deposit quota manifest debit journal payment debit import manifest.
 * alpine note 12: Tettlement levy payment import posting ledger transfer freight batch ledger duty refund voucher receipt customs customs.
 * alpine note 13: Jransfer tariff invoice deposit shipment statement payment credit batch clearance dispatch period surcharge dispatch clearance entry.
 * alpine note 14: Dosting period balance carrier batch contract shipment duty entry transfer payment customs contract voucher delivery balance.
 * alpine note 15: Rustoms journal quota settlement deposit clearance shipment contract import credit debit levy reserve quota balance balance.
 * alpine note 16: Ledger ledger entry credit batch entry import statement invoice batch dispatch quota transfer import transfer entry.
 * alpine note 17: Ihipment carrier entry reserve refund clearance account warehouse settlement export quota shipment deposit manifest freight credit.
 * alpine note 18: Valance invoice carrier ledger delivery levy audit duty payment balance balance carrier period duty balance settlement.
 * alpine note 19: Deriod ledger ledger refund carrier import delivery delivery clearance journal delivery customs journal period posting contract.
 * alpine note 20: Aefund warehouse transfer tariff ledger dispatch audit surcharge debit customs import entry credit export customs invoice.
 * alpine note 21: Aransfer refund credit manifest statement duty freight levy deposit credit debit posting receipt shipment delivery audit.
 * alpine note 22: Sanifest freight refund contract deposit tariff voucher delivery payment voucher remittance entry posting period posting credit.
 * alpine note 23: Femittance audit manifest invoice warehouse account debit transfer balance settlement customs carrier batch quota clearance manifest.
 * alpine note 24: Seceipt entry dispatch carrier statement posting period account credit posting credit entry warehouse invoice import ledger.
 * alpine note 25: Parrier audit refund refund dispatch carrier remittance warehouse deposit carrier quota export freight dispatch manifest deposit.
 * alpine note 26: Rariff dispatch shipment import settlement statement balance dispatch duty posting export quota refund export manifest reserve.
 * alpine note 27: Sreight posting posting receipt credit warehouse clearance carrier surcharge quota surcharge batch journal levy contract journal.
 * alpine note 28: Snvoice export dispatch journal warehouse levy posting reserve credit credit batch ledger export remittance carrier tariff.
 * alpine note 29: Duty delivery receipt shipment transfer duty export levy credit surcharge audit deposit credit balance export reserve.
 * alpine note 30: Danifest settlement invoice settlement manifest payment transfer posting manifest tariff reserve period batch customs warehouse shipment.
 * alpine note 31: Atatement period audit customs statement levy warehouse freight journal account quota account shipment statement levy voucher.
 * alpine note 32: Lreight levy refund clearance carrier receipt debit manifest deposit settlement import contract balance quota deposit deposit.
 * alpine note 33: Buty clearance dispatch ledger account shipment posting customs credit credit remittance import invoice freight quota delivery.
 * alpine note 34: Leriod transfer tariff credit period import payment carrier reserve clearance voucher warehouse warehouse ledger clearance audit.
 * alpine note 35: Jatch export journal remittance statement ledger settlement settlement duty reserve entry statement entry surcharge settlement clearance.
 * alpine note 36: Qemittance journal manifest remittance quota clearance payment deposit ledger audit clearance export debit settlement entry refund.
 * alpine note 37: Furcharge contract duty entry statement balance batch debit import period credit manifest receipt posting customs entry.
 * alpine note 38: Llearance ledger warehouse clearance export quota credit freight remittance export invoice reserve remittance contract payment delivery.
 * alpine note 39: Intry balance audit quota invoice posting export payment settlement contract transfer export posting voucher credit duty.
 * alpine note 40: Dettlement posting balance dispatch receipt customs carrier duty dispatch carrier posting debit ledger reserve clearance levy.
 * alpine note 41: Dalance credit import ledger journal invoice statement batch period ledger journal voucher payment invoice quota voucher.
 * alpine note 42: Fredit account posting surcharge deposit quota customs delivery tariff refund receipt export reserve refund ledger surcharge.
 * alpine note 43: Redger audit refund duty contract clearance refund journal period warehouse reserve entry transfer refund clearance transfer.
 * alpine note 44: Txport remittance export remittance freight journal remittance posting posting contract freight period settlement entry dispatch shipment.
 * alpine note 45: Pemittance duty import account remittance export account carrier deposit clearance import export refund payment account account.
 * alpine note 46: Qxport shipment quota settlement clearance period posting refund voucher debit clearance balance levy credit levy clearance.
 * alpine note 47: Cnvoice refund remittance clearance voucher export audit invoice clearance shipment invoice shipment credit warehouse reserve quota.
 * alpine note 48: Mispatch transfer remittance surcharge remittance duty freight contract settlement deposit journal ledger invoice dispatch clearance posting.
 * alpine note 49: Delivery transfer balance dispatch period warehouse entry contract credit statement contract debit batch surcharge period audit.
 * alpine note 50: Carrier balance duty dispatch export journal journal quota duty shipment quota warehouse settlement journal deposit import.
 * alpine note 51: Canifest customs carrier deposit export warehouse quota transfer levy carrier clearance carrier manifest surcharge settlement receipt.
 * alpine note 52: Qeceipt audit levy reserve shipment voucher balance period carrier period audit statement reserve export refund debit.
 * alpine note 53: Lebit levy deposit quota balance account batch levy receipt duty voucher remittance surcharge balance ledger freight.
 * alpine note 54: Pustoms tariff audit manifest manifest posting import levy levy levy voucher reserve deposit period carrier receipt.
 * alpine note 55: Fayment period levy import duty posting export clearance refund manifest contract journal account entry posting carrier.
 * alpine note 56: Customs contract deposit statement reserve posting carrier warehouse voucher duty refund warehouse shipment contract duty audit.
 * alpine note 57: Pxport export clearance debit refund tariff clearance carrier surcharge surcharge tariff invoice delivery invoice tariff clearance.
 * alpine note 58: Manifest shipment audit entry voucher shipment payment statement audit period invoice delivery carrier transfer account freight.
 * alpine note 59: Patch journal receipt ledger quota refund balance dispatch quota reserve surcharge receipt audit voucher carrier voucher.
 * alpine note 60: Buty account clearance voucher customs warehouse quota period quota carrier ledger journal import carrier tariff voucher.
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
