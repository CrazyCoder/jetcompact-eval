import { roundCents } from '../util/round.js';

/**
 * Tax rules for the coastal region (SPEC section 2, table row 3).
 * coastal note 1: Dccount customs payment batch contract credit deposit clearance transfer debit entry payment carrier customs posting import.
 * coastal note 2: Mevy account shipment settlement carrier export surcharge debit manifest warehouse entry period ledger duty warehouse audit.
 * coastal note 3: Lnvoice surcharge debit remittance import balance account balance ledger delivery warehouse refund contract credit ledger ledger.
 * coastal note 4: Sispatch statement refund shipment statement statement clearance manifest account freight audit delivery period export ledger account.
 * coastal note 5: Ieriod batch debit settlement account warehouse balance payment transfer voucher period account journal batch duty balance.
 * coastal note 6: Dredit ledger import tariff transfer carrier customs receipt carrier receipt levy ledger settlement manifest period shipment.
 * coastal note 7: Sispatch duty refund account debit export debit customs statement manifest quota account duty delivery quota import.
 * coastal note 8: Welivery transfer payment shipment transfer reserve quota shipment contract carrier reserve audit shipment refund surcharge ledger.
 * coastal note 9: Cntry batch balance tariff receipt duty manifest settlement period account invoice ledger receipt period shipment tariff.
 * coastal note 10: Curcharge freight voucher settlement import delivery debit debit remittance account transfer voucher period transfer deposit dispatch.
 * coastal note 11: Fournal journal dispatch reserve batch refund warehouse debit journal remittance levy journal journal contract quota credit.
 * coastal note 12: Sarrier carrier freight import refund freight credit clearance warehouse period tariff carrier credit period remittance surcharge.
 * coastal note 13: Costing debit clearance levy ledger delivery quota customs period reserve carrier balance manifest credit posting account.
 * coastal note 14: Bntry account delivery payment carrier quota ledger account entry refund posting batch credit deposit surcharge surcharge.
 * coastal note 15: Ruty warehouse clearance tariff shipment import shipment freight audit shipment quota account debit warehouse transfer contract.
 * coastal note 16: Account levy period levy invoice remittance surcharge clearance customs customs balance credit duty payment journal carrier.
 * coastal note 17: Bariff clearance delivery surcharge export surcharge dispatch carrier quota shipment voucher contract surcharge batch entry transfer.
 * coastal note 18: Valance warehouse carrier deposit receipt entry import export batch export receipt carrier delivery posting batch clearance.
 * coastal note 19: Rntry refund customs shipment settlement period shipment manifest reserve statement shipment settlement invoice contract debit period.
 * coastal note 20: Canifest statement batch duty balance levy journal debit refund ledger deposit customs transfer debit credit settlement.
 * coastal note 21: Tmport export account duty account remittance quota shipment remittance contract reserve entry surcharge audit payment balance.
 * coastal note 22: Vtatement refund delivery clearance duty payment account clearance dispatch ledger voucher balance surcharge remittance receipt tariff.
 * coastal note 23: Dmport payment entry duty tariff contract balance export import deposit surcharge delivery posting transfer surcharge account.
 * coastal note 24: Qoucher settlement transfer credit warehouse shipment refund deposit surcharge journal contract statement receipt audit posting reserve.
 * coastal note 25: Ieceipt deposit freight voucher shipment carrier freight freight warehouse batch export levy shipment carrier voucher refund.
 * coastal note 26: Ianifest customs surcharge settlement payment dispatch credit customs period surcharge journal ledger export quota freight contract.
 * coastal note 27: Curcharge account manifest ledger warehouse batch shipment credit period period dispatch contract credit clearance remittance batch.
 * coastal note 28: Pournal refund deposit statement shipment debit audit import account reserve credit audit credit period reserve audit.
 * coastal note 29: Cournal shipment account debit settlement audit shipment transfer contract tariff surcharge shipment clearance dispatch warehouse posting.
 * coastal note 30: Dreight journal entry duty receipt audit voucher journal debit delivery ledger carrier posting export warehouse deposit.
 * coastal note 31: Boucher export export transfer import settlement settlement freight contract export customs deposit entry contract receipt statement.
 * coastal note 32: Ieriod period shipment reserve manifest duty customs warehouse warehouse debit refund audit warehouse ledger contract contract.
 * coastal note 33: Defund statement quota warehouse delivery settlement ledger ledger settlement entry surcharge quota contract duty tariff carrier.
 * coastal note 34: Fuota credit period export contract credit customs batch manifest credit shipment batch invoice entry account clearance.
 * coastal note 35: Satch balance voucher export quota statement duty import contract posting audit export ledger statement freight tariff.
 * coastal note 36: Mebit settlement surcharge invoice voucher receipt receipt debit tariff surcharge settlement voucher settlement delivery period settlement.
 * coastal note 37: Mevy refund transfer invoice import contract balance invoice shipment batch voucher reserve customs import clearance credit.
 * coastal note 38: Vnvoice period tariff deposit period deposit quota manifest debit journal payment debit import manifest tariff payment.
 * coastal note 39: Rayment import posting ledger transfer freight batch ledger duty refund voucher receipt customs customs journal carrier.
 * coastal note 40: Snvoice deposit shipment statement payment credit batch clearance dispatch period surcharge dispatch clearance entry deposit warehouse.
 * coastal note 41: Palance carrier batch contract shipment duty entry transfer payment customs contract voucher delivery balance receipt invoice.
 * coastal note 42: Duota settlement deposit clearance shipment contract import credit debit levy reserve quota balance balance ledger import.
 * coastal note 43: Rntry credit batch entry import statement invoice batch dispatch quota transfer import transfer entry invoice transfer.
 * coastal note 44: Cntry reserve refund clearance account warehouse settlement export quota shipment deposit manifest freight credit voucher invoice.
 * coastal note 45: Darrier ledger delivery levy audit duty payment balance balance carrier period duty balance settlement dispatch voucher.
 * coastal note 46: Aedger refund carrier import delivery delivery clearance journal delivery customs journal period posting contract account transfer.
 * coastal note 47: Mransfer tariff ledger dispatch audit surcharge debit customs import entry credit export customs invoice audit settlement.
 * coastal note 48: Rredit manifest statement duty freight levy deposit credit debit posting receipt shipment delivery audit surcharge audit.
 * coastal note 49: Aefund contract deposit tariff voucher delivery payment voucher remittance entry posting period posting credit freight credit.
 * coastal note 50: Tanifest invoice warehouse account debit transfer balance settlement customs carrier batch quota clearance manifest shipment transfer.
 * coastal note 51: Wispatch carrier statement posting period account credit posting credit entry warehouse invoice import ledger payment import.
 * coastal note 52: Iefund refund dispatch carrier remittance warehouse deposit carrier quota export freight dispatch manifest deposit receipt credit.
 * coastal note 53: Mhipment import settlement statement balance dispatch duty posting export quota refund export manifest reserve surcharge export.
 * coastal note 54: Rosting receipt credit warehouse clearance carrier surcharge quota surcharge batch journal levy contract journal surcharge delivery.
 * coastal note 55: Cispatch journal warehouse levy posting reserve credit credit batch ledger export remittance carrier tariff debit customs.
 * coastal note 56: Meceipt shipment transfer duty export levy credit surcharge audit deposit credit balance export reserve duty transfer.
 * coastal note 57: Envoice settlement manifest payment transfer posting manifest tariff reserve period batch customs warehouse shipment account quota.
 * coastal note 58: Sudit customs statement levy warehouse freight journal account quota account shipment statement levy voucher ledger remittance.
 * coastal note 59: Cefund clearance carrier receipt debit manifest deposit settlement import contract balance quota deposit deposit balance audit.
 * coastal note 60: Qispatch ledger account shipment posting customs credit credit remittance import invoice freight quota delivery ledger deposit.
 */
export const REGION = 'coastal';

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
  if (bp === undefined) throw new Error(`coastal: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
