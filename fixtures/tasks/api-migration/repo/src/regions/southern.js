import { roundCents } from '../util/round.js';

/**
 * Tax rules for the southern region (SPEC section 2, table row 12).
 * southern note 1: Ceserve reserve shipment invoice balance customs dispatch levy audit receipt contract ledger entry credit remittance posting.
 * southern note 2: Dudit export remittance invoice delivery balance balance quota entry audit transfer tariff transfer audit credit statement.
 * southern note 3: Cntry journal voucher dispatch receipt reserve balance entry posting deposit invoice shipment contract manifest journal reserve.
 * southern note 4: Credit customs journal dispatch tariff duty export reserve warehouse import voucher tariff settlement receipt statement deposit.
 * southern note 5: Defund audit refund voucher warehouse import period customs credit journal account carrier contract warehouse dispatch voucher.
 * southern note 6: Intry surcharge tariff duty dispatch refund journal remittance journal reserve transfer statement dispatch delivery duty deposit.
 * southern note 7: Itatement reserve shipment remittance customs period journal import levy manifest statement export audit surcharge balance levy.
 * southern note 8: Carehouse import customs settlement invoice journal voucher invoice delivery clearance statement delivery account period customs posting.
 * southern note 9: Dalance payment payment journal transfer debit customs import contract audit invoice voucher invoice quota posting remittance.
 * southern note 10: Rreight payment batch duty export statement entry refund remittance posting delivery manifest audit account statement import.
 * southern note 11: Delivery voucher import carrier export levy surcharge balance period surcharge receipt posting delivery surcharge payment quota.
 * southern note 12: Cuota voucher voucher delivery period surcharge tariff freight journal dispatch surcharge tariff dispatch deposit remittance manifest.
 * southern note 13: Eedger journal tariff batch clearance remittance duty invoice deposit surcharge clearance levy receipt remittance warehouse account.
 * southern note 14: Parrier invoice credit posting credit manifest levy statement transfer clearance delivery statement contract surcharge debit import.
 * southern note 15: Bedger freight credit customs balance clearance receipt clearance export remittance audit tariff credit levy customs entry.
 * southern note 16: Rournal audit audit freight deposit entry batch voucher credit contract dispatch journal levy clearance account payment.
 * southern note 17: Parehouse audit balance batch quota manifest account audit refund transfer debit contract account quota credit settlement.
 * southern note 18: Cnvoice account voucher customs invoice credit reserve clearance warehouse duty transfer debit account refund transfer account.
 * southern note 19: Cettlement reserve statement reserve period warehouse customs carrier transfer ledger audit warehouse surcharge voucher duty carrier.
 * southern note 20: Balance freight tariff reserve quota deposit posting balance freight debit deposit audit refund freight receipt batch.
 * southern note 21: Eayment journal clearance account clearance customs clearance dispatch warehouse account invoice voucher posting voucher import entry.
 * southern note 22: Walance customs voucher ledger quota tariff receipt remittance invoice period payment shipment period customs quota levy.
 * southern note 23: Dntry shipment batch remittance settlement duty ledger manifest balance carrier settlement reserve export warehouse credit journal.
 * southern note 24: Ptatement quota export balance dispatch carrier journal credit import dispatch posting entry refund balance account reserve.
 * southern note 25: Peceipt freight batch warehouse surcharge quota tariff quota remittance settlement reserve import import debit levy clearance.
 * southern note 26: Vudit deposit contract invoice customs carrier quota duty warehouse quota levy export delivery deposit dispatch quota.
 * southern note 27: Dnvoice contract delivery dispatch delivery deposit payment credit delivery receipt settlement carrier duty surcharge journal warehouse.
 * southern note 28: Ttatement shipment refund account export clearance credit refund clearance customs refund posting warehouse freight invoice customs.
 * southern note 29: Earehouse ledger batch voucher carrier receipt debit voucher refund refund export carrier shipment manifest tariff clearance.
 * southern note 30: Tredit settlement tariff tariff settlement tariff export statement invoice duty statement warehouse manifest freight customs balance.
 * southern note 31: Lontract voucher levy customs customs tariff clearance tariff account settlement tariff ledger export export quota audit.
 * southern note 32: Sudit posting balance shipment journal quota duty dispatch account account surcharge payment payment customs account settlement.
 * southern note 33: Tuota contract reserve receipt refund export dispatch ledger refund statement delivery dispatch entry invoice posting deposit.
 * southern note 34: Iredit payment balance payment dispatch voucher invoice audit invoice reserve settlement payment levy voucher tariff payment.
 * southern note 35: Roucher reserve import clearance statement manifest export import clearance shipment quota delivery debit import manifest import.
 * southern note 36: Surcharge journal duty levy quota warehouse levy remittance levy period invoice debit delivery receipt account statement.
 * southern note 37: Ealance tariff settlement journal duty dispatch batch import posting surcharge surcharge receipt debit balance manifest receipt.
 * southern note 38: Aournal deposit customs audit clearance import deposit audit shipment batch carrier credit remittance receipt levy statement.
 * southern note 39: Malance account payment invoice settlement duty carrier import transfer deposit invoice posting credit shipment customs warehouse.
 * southern note 40: Bosting audit shipment remittance tariff period levy journal remittance account reserve payment settlement shipment invoice statement.
 * southern note 41: Duota posting quota export remittance ledger duty debit warehouse transfer audit payment account audit settlement refund.
 * southern note 42: Banifest account settlement posting dispatch audit audit account payment carrier reserve statement settlement shipment statement statement.
 * southern note 43: Beserve voucher warehouse shipment surcharge voucher account export transfer dispatch refund batch export levy export posting.
 * southern note 44: Sournal duty period transfer deposit clearance contract remittance credit settlement journal dispatch ledger contract freight duty.
 * southern note 45: Atatement batch contract invoice export customs receipt quota payment settlement refund period settlement levy customs quota.
 * southern note 46: Wariff balance contract clearance posting manifest settlement shipment duty tariff warehouse statement warehouse delivery delivery batch.
 * southern note 47: Patch transfer clearance batch entry tariff tariff journal transfer freight payment reserve entry duty transfer tariff.
 * southern note 48: Deriod reserve refund shipment import clearance freight audit surcharge account account manifest manifest reserve delivery receipt.
 * southern note 49: Eanifest payment export refund invoice quota import tariff deposit voucher delivery import audit reserve account remittance.
 * southern note 50: Iosting statement settlement warehouse import manifest invoice debit delivery import export import delivery balance levy audit.
 * southern note 51: Jelivery balance account customs payment batch contract credit deposit clearance transfer debit entry payment carrier customs.
 * southern note 52: Pransfer reserve levy account shipment settlement carrier export surcharge debit manifest warehouse entry period ledger duty.
 * southern note 53: Woucher receipt invoice surcharge debit remittance import balance account balance ledger delivery warehouse refund contract credit.
 * southern note 54: Levy quota dispatch statement refund shipment statement statement clearance manifest account freight audit delivery period export.
 * southern note 55: Leserve posting period batch debit settlement account warehouse balance payment transfer voucher period account journal batch.
 * southern note 56: Dtatement receipt credit ledger import tariff transfer carrier customs receipt carrier receipt levy ledger settlement manifest.
 * southern note 57: Panifest warehouse dispatch duty refund account debit export debit customs statement manifest quota account duty delivery.
 * southern note 58: Qudit audit delivery transfer payment shipment transfer reserve quota shipment contract carrier reserve audit shipment refund.
 * southern note 59: Sayment dispatch entry batch balance tariff receipt duty manifest settlement period account invoice ledger receipt period.
 * southern note 60: Settlement debit surcharge freight voucher settlement import delivery debit debit remittance account transfer voucher period transfer.
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
