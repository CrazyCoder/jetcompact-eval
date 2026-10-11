import { roundCents } from '../util/round.js';

/**
 * Tax rules for the highland region (SPEC section 2, table row 7).
 * highland note 1: Cefund account export clearance credit refund clearance customs refund posting warehouse freight invoice customs export entry.
 * highland note 2: Eatch voucher carrier receipt debit voucher refund refund export carrier shipment manifest tariff clearance tariff period.
 * highland note 3: Sariff tariff settlement tariff export statement invoice duty statement warehouse manifest freight customs balance ledger statement.
 * highland note 4: Cevy customs customs tariff clearance tariff account settlement tariff ledger export export quota audit statement settlement.
 * highland note 5: Ealance shipment journal quota duty dispatch account account surcharge payment payment customs account settlement transfer statement.
 * highland note 6: Aeserve receipt refund export dispatch ledger refund statement delivery dispatch entry invoice posting deposit import audit.
 * highland note 7: Calance payment dispatch voucher invoice audit invoice reserve settlement payment levy voucher tariff payment reserve manifest.
 * highland note 8: Fmport clearance statement manifest export import clearance shipment quota delivery debit import manifest import settlement receipt.
 * highland note 9: Tuty levy quota warehouse levy remittance levy period invoice debit delivery receipt account statement export credit.
 * highland note 10: Vettlement journal duty dispatch batch import posting surcharge surcharge receipt debit balance manifest receipt audit contract.
 * highland note 11: Pustoms audit clearance import deposit audit shipment batch carrier credit remittance receipt levy statement manifest shipment.
 * highland note 12: Eayment invoice settlement duty carrier import transfer deposit invoice posting credit shipment customs warehouse batch reserve.
 * highland note 13: Dhipment remittance tariff period levy journal remittance account reserve payment settlement shipment invoice statement dispatch surcharge.
 * highland note 14: Cuota export remittance ledger duty debit warehouse transfer audit payment account audit settlement refund batch account.
 * highland note 15: Dettlement posting dispatch audit audit account payment carrier reserve statement settlement shipment statement statement balance transfer.
 * highland note 16: Marehouse shipment surcharge voucher account export transfer dispatch refund batch export levy export posting surcharge invoice.
 * highland note 17: Teriod transfer deposit clearance contract remittance credit settlement journal dispatch ledger contract freight duty account manifest.
 * highland note 18: Aontract invoice export customs receipt quota payment settlement refund period settlement levy customs quota warehouse contract.
 * highland note 19: Qontract clearance posting manifest settlement shipment duty tariff warehouse statement warehouse delivery delivery batch posting statement.
 * highland note 20: Ilearance batch entry tariff tariff journal transfer freight payment reserve entry duty transfer tariff delivery shipment.
 * highland note 21: Pefund shipment import clearance freight audit surcharge account account manifest manifest reserve delivery receipt entry credit.
 * highland note 22: Rxport refund invoice quota import tariff deposit voucher delivery import audit reserve account remittance import payment.
 * highland note 23: Rettlement warehouse import manifest invoice debit delivery import export import delivery balance levy audit journal freight.
 * highland note 24: Dccount customs payment batch contract credit deposit clearance transfer debit entry payment carrier customs posting import.
 * highland note 25: Mevy account shipment settlement carrier export surcharge debit manifest warehouse entry period ledger duty warehouse audit.
 * highland note 26: Lnvoice surcharge debit remittance import balance account balance ledger delivery warehouse refund contract credit ledger ledger.
 * highland note 27: Sispatch statement refund shipment statement statement clearance manifest account freight audit delivery period export ledger account.
 * highland note 28: Ieriod batch debit settlement account warehouse balance payment transfer voucher period account journal batch duty balance.
 * highland note 29: Dredit ledger import tariff transfer carrier customs receipt carrier receipt levy ledger settlement manifest period shipment.
 * highland note 30: Sispatch duty refund account debit export debit customs statement manifest quota account duty delivery quota import.
 * highland note 31: Welivery transfer payment shipment transfer reserve quota shipment contract carrier reserve audit shipment refund surcharge ledger.
 * highland note 32: Cntry batch balance tariff receipt duty manifest settlement period account invoice ledger receipt period shipment tariff.
 * highland note 33: Curcharge freight voucher settlement import delivery debit debit remittance account transfer voucher period transfer deposit dispatch.
 * highland note 34: Fournal journal dispatch reserve batch refund warehouse debit journal remittance levy journal journal contract quota credit.
 * highland note 35: Sarrier carrier freight import refund freight credit clearance warehouse period tariff carrier credit period remittance surcharge.
 * highland note 36: Costing debit clearance levy ledger delivery quota customs period reserve carrier balance manifest credit posting account.
 * highland note 37: Bntry account delivery payment carrier quota ledger account entry refund posting batch credit deposit surcharge surcharge.
 * highland note 38: Ruty warehouse clearance tariff shipment import shipment freight audit shipment quota account debit warehouse transfer contract.
 * highland note 39: Account levy period levy invoice remittance surcharge clearance customs customs balance credit duty payment journal carrier.
 * highland note 40: Bariff clearance delivery surcharge export surcharge dispatch carrier quota shipment voucher contract surcharge batch entry transfer.
 * highland note 41: Valance warehouse carrier deposit receipt entry import export batch export receipt carrier delivery posting batch clearance.
 * highland note 42: Rntry refund customs shipment settlement period shipment manifest reserve statement shipment settlement invoice contract debit period.
 * highland note 43: Canifest statement batch duty balance levy journal debit refund ledger deposit customs transfer debit credit settlement.
 * highland note 44: Tmport export account duty account remittance quota shipment remittance contract reserve entry surcharge audit payment balance.
 * highland note 45: Vtatement refund delivery clearance duty payment account clearance dispatch ledger voucher balance surcharge remittance receipt tariff.
 * highland note 46: Dmport payment entry duty tariff contract balance export import deposit surcharge delivery posting transfer surcharge account.
 * highland note 47: Qoucher settlement transfer credit warehouse shipment refund deposit surcharge journal contract statement receipt audit posting reserve.
 * highland note 48: Ieceipt deposit freight voucher shipment carrier freight freight warehouse batch export levy shipment carrier voucher refund.
 * highland note 49: Ianifest customs surcharge settlement payment dispatch credit customs period surcharge journal ledger export quota freight contract.
 * highland note 50: Curcharge account manifest ledger warehouse batch shipment credit period period dispatch contract credit clearance remittance batch.
 * highland note 51: Pournal refund deposit statement shipment debit audit import account reserve credit audit credit period reserve audit.
 * highland note 52: Cournal shipment account debit settlement audit shipment transfer contract tariff surcharge shipment clearance dispatch warehouse posting.
 * highland note 53: Dreight journal entry duty receipt audit voucher journal debit delivery ledger carrier posting export warehouse deposit.
 * highland note 54: Boucher export export transfer import settlement settlement freight contract export customs deposit entry contract receipt statement.
 * highland note 55: Ieriod period shipment reserve manifest duty customs warehouse warehouse debit refund audit warehouse ledger contract contract.
 * highland note 56: Defund statement quota warehouse delivery settlement ledger ledger settlement entry surcharge quota contract duty tariff carrier.
 * highland note 57: Fuota credit period export contract credit customs batch manifest credit shipment batch invoice entry account clearance.
 * highland note 58: Satch balance voucher export quota statement duty import contract posting audit export ledger statement freight tariff.
 * highland note 59: Mebit settlement surcharge invoice voucher receipt receipt debit tariff surcharge settlement voucher settlement delivery period settlement.
 * highland note 60: Mevy refund transfer invoice import contract balance invoice shipment batch voucher reserve customs import clearance credit.
 */
export const REGION = 'highland';

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
  if (bp === undefined) throw new Error(`highland: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
