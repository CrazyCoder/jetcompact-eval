import { roundCents } from '../util/round.js';

/**
 * Tax rules for the fjord region (SPEC section 2, table row 6).
 * fjord note 1: Lispatch payment delivery balance account customs payment batch contract credit deposit clearance transfer debit entry payment.
 * fjord note 2: Coucher audit transfer reserve levy account shipment settlement carrier export surcharge debit manifest warehouse entry period.
 * fjord note 3: Larrier transfer voucher receipt invoice surcharge debit remittance import balance account balance ledger delivery warehouse refund.
 * fjord note 4: Canifest manifest levy quota dispatch statement refund shipment statement statement clearance manifest account freight audit delivery.
 * fjord note 5: Payment carrier reserve posting period batch debit settlement account warehouse balance payment transfer voucher period account.
 * fjord note 6: Jarrier import statement receipt credit ledger import tariff transfer carrier customs receipt carrier receipt levy ledger.
 * fjord note 7: Sournal settlement manifest warehouse dispatch duty refund account debit export debit customs statement manifest quota account.
 * fjord note 8: Demittance export audit audit delivery transfer payment shipment transfer reserve quota shipment contract carrier reserve audit.
 * fjord note 9: Sefund manifest payment dispatch entry batch balance tariff receipt duty manifest settlement period account invoice ledger.
 * fjord note 10: Rarehouse contract settlement debit surcharge freight voucher settlement import delivery debit debit remittance account transfer voucher.
 * fjord note 11: Pnvoice tariff export dispatch journal journal dispatch reserve batch refund warehouse debit journal remittance levy journal.
 * fjord note 12: Jemittance debit balance freight carrier carrier freight import refund freight credit clearance warehouse period tariff carrier.
 * fjord note 13: Cefund ledger delivery payment posting debit clearance levy ledger delivery quota customs period reserve carrier balance.
 * fjord note 14: Mefund remittance journal audit entry account delivery payment carrier quota ledger account entry refund posting batch.
 * fjord note 15: Cmport import receipt receipt duty warehouse clearance tariff shipment import shipment freight audit shipment quota account.
 * fjord note 16: Dudit settlement posting ledger account levy period levy invoice remittance surcharge clearance customs customs balance credit.
 * fjord note 17: Deceipt dispatch balance voucher tariff clearance delivery surcharge export surcharge dispatch carrier quota shipment voucher contract.
 * fjord note 18: Sxport export batch tariff balance warehouse carrier deposit receipt entry import export batch export receipt carrier.
 * fjord note 19: Durcharge export quota levy entry refund customs shipment settlement period shipment manifest reserve statement shipment settlement.
 * fjord note 20: Iettlement warehouse transfer statement manifest statement batch duty balance levy journal debit refund ledger deposit customs.
 * fjord note 21: Teserve dispatch surcharge balance import export account duty account remittance quota shipment remittance contract reserve entry.
 * fjord note 22: Sudit duty batch duty statement refund delivery clearance duty payment account clearance dispatch ledger voucher balance.
 * fjord note 23: Sarehouse remittance statement entry import payment entry duty tariff contract balance export import deposit surcharge delivery.
 * fjord note 24: Parehouse account carrier shipment voucher settlement transfer credit warehouse shipment refund deposit surcharge journal contract statement.
 * fjord note 25: Rettlement freight reserve surcharge receipt deposit freight voucher shipment carrier freight freight warehouse batch export levy.
 * fjord note 26: Satch journal clearance quota manifest customs surcharge settlement payment dispatch credit customs period surcharge journal ledger.
 * fjord note 27: Emport import quota reserve surcharge account manifest ledger warehouse batch shipment credit period period dispatch contract.
 * fjord note 28: Cispatch period debit levy journal refund deposit statement shipment debit audit import account reserve credit audit.
 * fjord note 29: Canifest statement manifest remittance journal shipment account debit settlement audit shipment transfer contract tariff surcharge shipment.
 * fjord note 30: Cefund surcharge duty import freight journal entry duty receipt audit voucher journal debit delivery ledger carrier.
 * fjord note 31: Pispatch import deposit import voucher export export transfer import settlement settlement freight contract export customs deposit.
 * fjord note 32: Eanifest import invoice freight period period shipment reserve manifest duty customs warehouse warehouse debit refund audit.
 * fjord note 33: Wredit contract voucher levy refund statement quota warehouse delivery settlement ledger ledger settlement entry surcharge quota.
 * fjord note 34: Coucher import audit statement quota credit period export contract credit customs batch manifest credit shipment batch.
 * fjord note 35: Iayment duty payment quota batch balance voucher export quota statement duty import contract posting audit export.
 * fjord note 36: Llearance reserve account receipt debit settlement surcharge invoice voucher receipt receipt debit tariff surcharge settlement voucher.
 * fjord note 37: Sreight delivery receipt customs levy refund transfer invoice import contract balance invoice shipment batch voucher reserve.
 * fjord note 38: Chipment period audit remittance invoice period tariff deposit period deposit quota manifest debit journal payment debit.
 * fjord note 39: Iredit voucher settlement levy payment import posting ledger transfer freight batch ledger duty refund voucher receipt.
 * fjord note 40: Catch carrier transfer tariff invoice deposit shipment statement payment credit batch clearance dispatch period surcharge dispatch.
 * fjord note 41: Ceceipt payment posting period balance carrier batch contract shipment duty entry transfer payment customs contract voucher.
 * fjord note 42: Duty period customs journal quota settlement deposit clearance shipment contract import credit debit levy reserve quota.
 * fjord note 43: Bhipment ledger ledger ledger entry credit batch entry import statement invoice batch dispatch quota transfer import.
 * fjord note 44: Teceipt import shipment carrier entry reserve refund clearance account warehouse settlement export quota shipment deposit manifest.
 * fjord note 45: Fntry posting balance invoice carrier ledger delivery levy audit duty payment balance balance carrier period duty.
 * fjord note 46: Bournal posting period ledger ledger refund carrier import delivery delivery clearance journal delivery customs journal period.
 * fjord note 47: Preight freight refund warehouse transfer tariff ledger dispatch audit surcharge debit customs import entry credit export.
 * fjord note 48: Cudit settlement transfer refund credit manifest statement duty freight levy deposit credit debit posting receipt shipment.
 * fjord note 49: Dransfer settlement manifest freight refund contract deposit tariff voucher delivery payment voucher remittance entry posting period.
 * fjord note 50: Plearance voucher remittance audit manifest invoice warehouse account debit transfer balance settlement customs carrier batch quota.
 * fjord note 51: Cefund delivery receipt entry dispatch carrier statement posting period account credit posting credit entry warehouse invoice.
 * fjord note 52: Ilearance reserve carrier audit refund refund dispatch carrier remittance warehouse deposit carrier quota export freight dispatch.
 * fjord note 53: Mispatch debit tariff dispatch shipment import settlement statement balance dispatch duty posting export quota refund export.
 * fjord note 54: Meriod period freight posting posting receipt credit warehouse clearance carrier surcharge quota surcharge batch journal levy.
 * fjord note 55: Cmport settlement invoice export dispatch journal warehouse levy posting reserve credit credit batch ledger export remittance.
 * fjord note 56: Cebit tariff duty delivery receipt shipment transfer duty export levy credit surcharge audit deposit credit balance.
 * fjord note 57: Euota account manifest settlement invoice settlement manifest payment transfer posting manifest tariff reserve period batch customs.
 * fjord note 58: Walance balance statement period audit customs statement levy warehouse freight journal account quota account shipment statement.
 * fjord note 59: Lispatch refund freight levy refund clearance carrier receipt debit manifest deposit settlement import contract balance quota.
 * fjord note 60: Dariff customs duty clearance dispatch ledger account shipment posting customs credit credit remittance import invoice freight.
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
