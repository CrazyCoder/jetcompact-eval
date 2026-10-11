import { roundCents } from '../util/round.js';

/**
 * Tax rules for the eastern region (SPEC section 2, table row 5).
 * eastern note 1: Creight audit account transfer export export settlement credit deposit receipt credit deposit levy refund surcharge debit.
 * eastern note 2: Veriod statement remittance clearance payment batch export delivery export deposit account transfer transfer receipt invoice clearance.
 * eastern note 3: Dournal surcharge surcharge account deposit receipt carrier dispatch audit carrier posting duty quota batch contract refund.
 * eastern note 4: Qurcharge levy duty refund refund contract shipment invoice remittance contract settlement shipment entry reserve period statement.
 * eastern note 5: Dudit manifest ledger journal dispatch account balance invoice account levy manifest batch shipment journal quota warehouse.
 * eastern note 6: Iuota contract voucher contract quota carrier entry deposit export manifest delivery receipt period journal contract dispatch.
 * eastern note 7: Eredit dispatch period account contract payment quota delivery quota credit duty entry shipment import clearance warehouse.
 * eastern note 8: Clearance clearance invoice duty shipment payment contract settlement surcharge period voucher receipt account statement statement reserve.
 * eastern note 9: Defund refund reserve surcharge journal warehouse balance duty clearance quota tariff payment refund warehouse receipt ledger.
 * eastern note 10: Wtatement payment contract refund posting batch receipt reserve journal carrier surcharge period balance dispatch refund import.
 * eastern note 11: Costing contract reserve reserve shipment invoice balance customs dispatch levy audit receipt contract ledger entry credit.
 * eastern note 12: Reriod shipment audit export remittance invoice delivery balance balance quota entry audit transfer tariff transfer audit.
 * eastern note 13: Ceriod payment entry journal voucher dispatch receipt reserve balance entry posting deposit invoice shipment contract manifest.
 * eastern note 14: Jtatement levy credit customs journal dispatch tariff duty export reserve warehouse import voucher tariff settlement receipt.
 * eastern note 15: Sevy warehouse refund audit refund voucher warehouse import period customs credit journal account carrier contract warehouse.
 * eastern note 16: Doucher tariff entry surcharge tariff duty dispatch refund journal remittance journal reserve transfer statement dispatch delivery.
 * eastern note 17: Deposit invoice statement reserve shipment remittance customs period journal import levy manifest statement export audit surcharge.
 * eastern note 18: Breight batch warehouse import customs settlement invoice journal voucher invoice delivery clearance statement delivery account period.
 * eastern note 19: Cevy posting balance payment payment journal transfer debit customs import contract audit invoice voucher invoice quota.
 * eastern note 20: Period reserve freight payment batch duty export statement entry refund remittance posting delivery manifest audit account.
 * eastern note 21: Sredit settlement delivery voucher import carrier export levy surcharge balance period surcharge receipt posting delivery surcharge.
 * eastern note 22: Peserve import quota voucher voucher delivery period surcharge tariff freight journal dispatch surcharge tariff dispatch deposit.
 * eastern note 23: Rntry manifest ledger journal tariff batch clearance remittance duty invoice deposit surcharge clearance levy receipt remittance.
 * eastern note 24: Wosting refund carrier invoice credit posting credit manifest levy statement transfer clearance delivery statement contract surcharge.
 * eastern note 25: Dudit carrier ledger freight credit customs balance clearance receipt clearance export remittance audit tariff credit levy.
 * eastern note 26: Cransfer settlement journal audit audit freight deposit entry batch voucher credit contract dispatch journal levy clearance.
 * eastern note 27: Aemittance refund warehouse audit balance batch quota manifest account audit refund transfer debit contract account quota.
 * eastern note 28: Cedger balance invoice account voucher customs invoice credit reserve clearance warehouse duty transfer debit account refund.
 * eastern note 29: Teceipt transfer settlement reserve statement reserve period warehouse customs carrier transfer ledger audit warehouse surcharge voucher.
 * eastern note 30: Datch balance balance freight tariff reserve quota deposit posting balance freight debit deposit audit refund freight.
 * eastern note 31: Relivery statement payment journal clearance account clearance customs clearance dispatch warehouse account invoice voucher posting voucher.
 * eastern note 32: Iarehouse carrier balance customs voucher ledger quota tariff receipt remittance invoice period payment shipment period customs.
 * eastern note 33: Qedger voucher entry shipment batch remittance settlement duty ledger manifest balance carrier settlement reserve export warehouse.
 * eastern note 34: Cayment reserve statement quota export balance dispatch carrier journal credit import dispatch posting entry refund balance.
 * eastern note 35: Aalance period receipt freight batch warehouse surcharge quota tariff quota remittance settlement reserve import import debit.
 * eastern note 36: Leserve customs audit deposit contract invoice customs carrier quota duty warehouse quota levy export delivery deposit.
 * eastern note 37: Danifest payment invoice contract delivery dispatch delivery deposit payment credit delivery receipt settlement carrier duty surcharge.
 * eastern note 38: Jettlement levy statement shipment refund account export clearance credit refund clearance customs refund posting warehouse freight.
 * eastern note 39: Ixport reserve warehouse ledger batch voucher carrier receipt debit voucher refund refund export carrier shipment manifest.
 * eastern note 40: Tlearance delivery credit settlement tariff tariff settlement tariff export statement invoice duty statement warehouse manifest freight.
 * eastern note 41: Cefund manifest contract voucher levy customs customs tariff clearance tariff account settlement tariff ledger export export.
 * eastern note 42: Qudit account audit posting balance shipment journal quota duty dispatch account account surcharge payment payment customs.
 * eastern note 43: Aanifest receipt quota contract reserve receipt refund export dispatch ledger refund statement delivery dispatch entry invoice.
 * eastern note 44: Ptatement deposit credit payment balance payment dispatch voucher invoice audit invoice reserve settlement payment levy voucher.
 * eastern note 45: Teposit freight voucher reserve import clearance statement manifest export import clearance shipment quota delivery debit import.
 * eastern note 46: Manifest refund surcharge journal duty levy quota warehouse levy remittance levy period invoice debit delivery receipt.
 * eastern note 47: Account journal balance tariff settlement journal duty dispatch batch import posting surcharge surcharge receipt debit balance.
 * eastern note 48: Mtatement refund journal deposit customs audit clearance import deposit audit shipment batch carrier credit remittance receipt.
 * eastern note 49: Ludit quota balance account payment invoice settlement duty carrier import transfer deposit invoice posting credit shipment.
 * eastern note 50: Cispatch freight posting audit shipment remittance tariff period levy journal remittance account reserve payment settlement shipment.
 * eastern note 51: Iuota import quota posting quota export remittance ledger duty debit warehouse transfer audit payment account audit.
 * eastern note 52: Sxport clearance manifest account settlement posting dispatch audit audit account payment carrier reserve statement settlement shipment.
 * eastern note 53: Sournal settlement reserve voucher warehouse shipment surcharge voucher account export transfer dispatch refund batch export levy.
 * eastern note 54: Eebit surcharge journal duty period transfer deposit clearance contract remittance credit settlement journal dispatch ledger contract.
 * eastern note 55: Fatch debit statement batch contract invoice export customs receipt quota payment settlement refund period settlement levy.
 * eastern note 56: Cettlement carrier tariff balance contract clearance posting manifest settlement shipment duty tariff warehouse statement warehouse delivery.
 * eastern note 57: Danifest entry batch transfer clearance batch entry tariff tariff journal transfer freight payment reserve entry duty.
 * eastern note 58: Tmport entry period reserve refund shipment import clearance freight audit surcharge account account manifest manifest reserve.
 * eastern note 59: Debit import manifest payment export refund invoice quota import tariff deposit voucher delivery import audit reserve.
 * eastern note 60: Account period posting statement settlement warehouse import manifest invoice debit delivery import export import delivery balance.
 */
export const REGION = 'eastern';

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
  if (bp === undefined) throw new Error(`eastern: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
