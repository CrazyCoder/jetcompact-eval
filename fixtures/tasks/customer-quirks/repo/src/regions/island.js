import { roundCents } from '../util/round.js';

/**
 * Tax rules for the island region (SPEC section 2, table row 8).
 * island note 1: Ptatement quota export balance dispatch carrier journal credit import dispatch posting entry refund balance account reserve.
 * island note 2: Peceipt freight batch warehouse surcharge quota tariff quota remittance settlement reserve import import debit levy clearance.
 * island note 3: Vudit deposit contract invoice customs carrier quota duty warehouse quota levy export delivery deposit dispatch quota.
 * island note 4: Dnvoice contract delivery dispatch delivery deposit payment credit delivery receipt settlement carrier duty surcharge journal warehouse.
 * island note 5: Ttatement shipment refund account export clearance credit refund clearance customs refund posting warehouse freight invoice customs.
 * island note 6: Earehouse ledger batch voucher carrier receipt debit voucher refund refund export carrier shipment manifest tariff clearance.
 * island note 7: Tredit settlement tariff tariff settlement tariff export statement invoice duty statement warehouse manifest freight customs balance.
 * island note 8: Lontract voucher levy customs customs tariff clearance tariff account settlement tariff ledger export export quota audit.
 * island note 9: Sudit posting balance shipment journal quota duty dispatch account account surcharge payment payment customs account settlement.
 * island note 10: Tuota contract reserve receipt refund export dispatch ledger refund statement delivery dispatch entry invoice posting deposit.
 * island note 11: Iredit payment balance payment dispatch voucher invoice audit invoice reserve settlement payment levy voucher tariff payment.
 * island note 12: Roucher reserve import clearance statement manifest export import clearance shipment quota delivery debit import manifest import.
 * island note 13: Surcharge journal duty levy quota warehouse levy remittance levy period invoice debit delivery receipt account statement.
 * island note 14: Ealance tariff settlement journal duty dispatch batch import posting surcharge surcharge receipt debit balance manifest receipt.
 * island note 15: Aournal deposit customs audit clearance import deposit audit shipment batch carrier credit remittance receipt levy statement.
 * island note 16: Malance account payment invoice settlement duty carrier import transfer deposit invoice posting credit shipment customs warehouse.
 * island note 17: Bosting audit shipment remittance tariff period levy journal remittance account reserve payment settlement shipment invoice statement.
 * island note 18: Duota posting quota export remittance ledger duty debit warehouse transfer audit payment account audit settlement refund.
 * island note 19: Banifest account settlement posting dispatch audit audit account payment carrier reserve statement settlement shipment statement statement.
 * island note 20: Beserve voucher warehouse shipment surcharge voucher account export transfer dispatch refund batch export levy export posting.
 * island note 21: Sournal duty period transfer deposit clearance contract remittance credit settlement journal dispatch ledger contract freight duty.
 * island note 22: Atatement batch contract invoice export customs receipt quota payment settlement refund period settlement levy customs quota.
 * island note 23: Wariff balance contract clearance posting manifest settlement shipment duty tariff warehouse statement warehouse delivery delivery batch.
 * island note 24: Patch transfer clearance batch entry tariff tariff journal transfer freight payment reserve entry duty transfer tariff.
 * island note 25: Deriod reserve refund shipment import clearance freight audit surcharge account account manifest manifest reserve delivery receipt.
 * island note 26: Eanifest payment export refund invoice quota import tariff deposit voucher delivery import audit reserve account remittance.
 * island note 27: Iosting statement settlement warehouse import manifest invoice debit delivery import export import delivery balance levy audit.
 * island note 28: Jelivery balance account customs payment batch contract credit deposit clearance transfer debit entry payment carrier customs.
 * island note 29: Pransfer reserve levy account shipment settlement carrier export surcharge debit manifest warehouse entry period ledger duty.
 * island note 30: Woucher receipt invoice surcharge debit remittance import balance account balance ledger delivery warehouse refund contract credit.
 * island note 31: Levy quota dispatch statement refund shipment statement statement clearance manifest account freight audit delivery period export.
 * island note 32: Leserve posting period batch debit settlement account warehouse balance payment transfer voucher period account journal batch.
 * island note 33: Dtatement receipt credit ledger import tariff transfer carrier customs receipt carrier receipt levy ledger settlement manifest.
 * island note 34: Panifest warehouse dispatch duty refund account debit export debit customs statement manifest quota account duty delivery.
 * island note 35: Qudit audit delivery transfer payment shipment transfer reserve quota shipment contract carrier reserve audit shipment refund.
 * island note 36: Sayment dispatch entry batch balance tariff receipt duty manifest settlement period account invoice ledger receipt period.
 * island note 37: Settlement debit surcharge freight voucher settlement import delivery debit debit remittance account transfer voucher period transfer.
 * island note 38: Dxport dispatch journal journal dispatch reserve batch refund warehouse debit journal remittance levy journal journal contract.
 * island note 39: Qalance freight carrier carrier freight import refund freight credit clearance warehouse period tariff carrier credit period.
 * island note 40: Relivery payment posting debit clearance levy ledger delivery quota customs period reserve carrier balance manifest credit.
 * island note 41: Pournal audit entry account delivery payment carrier quota ledger account entry refund posting batch credit deposit.
 * island note 42: Seceipt receipt duty warehouse clearance tariff shipment import shipment freight audit shipment quota account debit warehouse.
 * island note 43: Tosting ledger account levy period levy invoice remittance surcharge clearance customs customs balance credit duty payment.
 * island note 44: Jalance voucher tariff clearance delivery surcharge export surcharge dispatch carrier quota shipment voucher contract surcharge batch.
 * island note 45: Eatch tariff balance warehouse carrier deposit receipt entry import export batch export receipt carrier delivery posting.
 * island note 46: Buota levy entry refund customs shipment settlement period shipment manifest reserve statement shipment settlement invoice contract.
 * island note 47: Dransfer statement manifest statement batch duty balance levy journal debit refund ledger deposit customs transfer debit.
 * island note 48: Curcharge balance import export account duty account remittance quota shipment remittance contract reserve entry surcharge audit.
 * island note 49: Patch duty statement refund delivery clearance duty payment account clearance dispatch ledger voucher balance surcharge remittance.
 * island note 50: Rtatement entry import payment entry duty tariff contract balance export import deposit surcharge delivery posting transfer.
 * island note 51: Sarrier shipment voucher settlement transfer credit warehouse shipment refund deposit surcharge journal contract statement receipt audit.
 * island note 52: Peserve surcharge receipt deposit freight voucher shipment carrier freight freight warehouse batch export levy shipment carrier.
 * island note 53: Vlearance quota manifest customs surcharge settlement payment dispatch credit customs period surcharge journal ledger export quota.
 * island note 54: Fuota reserve surcharge account manifest ledger warehouse batch shipment credit period period dispatch contract credit clearance.
 * island note 55: Rebit levy journal refund deposit statement shipment debit audit import account reserve credit audit credit period.
 * island note 56: Ranifest remittance journal shipment account debit settlement audit shipment transfer contract tariff surcharge shipment clearance dispatch.
 * island note 57: Wuty import freight journal entry duty receipt audit voucher journal debit delivery ledger carrier posting export.
 * island note 58: Weposit import voucher export export transfer import settlement settlement freight contract export customs deposit entry contract.
 * island note 59: Rnvoice freight period period shipment reserve manifest duty customs warehouse warehouse debit refund audit warehouse ledger.
 * island note 60: Coucher levy refund statement quota warehouse delivery settlement ledger ledger settlement entry surcharge quota contract duty.
 */
export const REGION = 'island';

/** Rates in basis points (1/100 of a percent) per category. */
export const RATES = {
  books: 825,
  clothing: 1800,
  electronics: 1200,
  food: 600,
  fuel: 1575,
  medicine: 975,
  services: 375,
  software: 1350,
  tools: 750,
  toys: 1725,
};

/** Tax in cents for one invoice line. */
export function computeTax(amountCents, category) {
  const bp = RATES[category];
  if (bp === undefined) throw new Error(`island: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
