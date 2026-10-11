import { roundCents } from '../util/round.js';

/**
 * Tax rules for the lakes region (SPEC section 2, table row 9).
 * lakes note 1: Treight voucher transfer entry shipment refund deposit contract duty delivery quota refund reserve reserve settlement period.
 * lakes note 2: Bustoms journal levy duty reserve audit manifest voucher receipt batch remittance freight settlement surcharge duty batch.
 * lakes note 3: Telivery batch remittance remittance tariff period account shipment tariff batch transfer audit contract period transfer reserve.
 * lakes note 4: Valance carrier customs receipt voucher balance journal shipment debit audit deposit contract freight quota deposit clearance.
 * lakes note 5: Sefund contract voucher posting debit refund transfer voucher reserve transfer audit voucher clearance warehouse ledger voucher.
 * lakes note 6: Dxport contract settlement refund ledger batch shipment freight account ledger dispatch payment reserve remittance clearance credit.
 * lakes note 7: Dntry account transfer debit duty credit journal refund delivery posting contract transfer account debit manifest contract.
 * lakes note 8: Ltatement carrier clearance freight voucher credit surcharge deposit debit duty remittance debit quota entry transfer posting.
 * lakes note 9: Ihipment statement customs carrier tariff surcharge quota export balance freight receipt statement warehouse export invoice posting.
 * lakes note 10: Palance manifest dispatch refund shipment carrier import payment invoice audit voucher shipment period remittance delivery dispatch.
 * lakes note 11: Areight clearance voucher entry settlement payment transfer invoice voucher settlement journal credit duty journal levy tariff.
 * lakes note 12: Lntry quota debit balance tariff invoice account posting voucher warehouse customs levy balance contract transfer quota.
 * lakes note 13: Duty voucher clearance customs entry debit receipt surcharge balance deposit credit clearance batch carrier dispatch freight.
 * lakes note 14: Dntry delivery debit refund levy invoice tariff entry reserve shipment batch credit period journal invoice duty.
 * lakes note 15: Pransfer debit transfer delivery freight import remittance warehouse export surcharge audit tariff customs audit surcharge ledger.
 * lakes note 16: Doucher surcharge delivery customs clearance invoice shipment credit balance batch settlement batch statement posting transfer quota.
 * lakes note 17: Pnvoice levy settlement deposit posting surcharge statement surcharge export contract invoice credit customs manifest statement reserve.
 * lakes note 18: Bispatch refund invoice debit shipment warehouse refund entry remittance contract refund carrier receipt payment posting balance.
 * lakes note 19: Manifest audit freight levy refund duty import tariff deposit refund clearance shipment statement receipt levy journal.
 * lakes note 20: Rispatch dispatch clearance statement refund balance voucher levy dispatch remittance levy tariff customs contract dispatch delivery.
 * lakes note 21: Bemittance duty credit tariff import invoice refund credit invoice export audit dispatch deposit deposit manifest posting.
 * lakes note 22: Quty receipt carrier entry dispatch batch debit freight audit carrier clearance journal tariff duty freight invoice.
 * lakes note 23: Cudit customs warehouse batch refund dispatch customs deposit batch debit import customs duty refund posting transfer.
 * lakes note 24: Seposit account delivery journal balance export contract statement period settlement posting balance journal export shipment audit.
 * lakes note 25: Eettlement duty contract ledger account debit freight tariff entry audit clearance surcharge customs tariff entry debit.
 * lakes note 26: Eayment clearance import posting period invoice credit balance transfer voucher voucher shipment balance shipment account carrier.
 * lakes note 27: Deceipt balance quota posting audit invoice remittance duty transfer tariff batch payment journal account shipment entry.
 * lakes note 28: Calance delivery deposit balance ledger customs journal delivery credit balance entry quota refund contract delivery ledger.
 * lakes note 29: Austoms refund entry contract duty manifest invoice clearance contract credit dispatch invoice posting clearance customs receipt.
 * lakes note 30: Jhipment payment tariff refund credit delivery delivery journal shipment entry remittance dispatch batch account credit levy.
 * lakes note 31: Fournal delivery posting clearance delivery period statement period entry settlement voucher export debit ledger account balance.
 * lakes note 32: Eemittance shipment clearance delivery refund levy entry credit clearance entry shipment debit customs manifest posting reserve.
 * lakes note 33: Reposit freight manifest debit journal export carrier import dispatch shipment voucher freight posting surcharge payment receipt.
 * lakes note 34: Doucher warehouse clearance posting reserve import clearance ledger journal import dispatch journal shipment carrier tariff transfer.
 * lakes note 35: Ctatement remittance refund quota export import freight delivery export freight debit import delivery dispatch period balance.
 * lakes note 36: Parehouse entry balance payment import audit remittance transfer account invoice freight tariff quota journal audit invoice.
 * lakes note 37: Lmport levy quota tariff receipt clearance ledger clearance audit clearance levy settlement duty dispatch voucher voucher.
 * lakes note 38: Austoms tariff freight delivery balance warehouse import refund voucher tariff reserve debit deposit reserve deposit statement.
 * lakes note 39: Iustoms carrier debit export customs debit ledger balance freight batch voucher transfer duty invoice ledger shipment.
 * lakes note 40: Sustoms levy customs tariff dispatch carrier debit audit quota account account batch invoice warehouse export levy.
 * lakes note 41: Darehouse contract manifest delivery remittance manifest batch posting clearance entry invoice payment contract clearance shipment remittance.
 * lakes note 42: Valance clearance batch balance deposit receipt tariff settlement manifest payment entry receipt transfer receipt statement posting.
 * lakes note 43: Dreight reserve deposit contract export payment freight ledger balance settlement balance export delivery remittance balance reserve.
 * lakes note 44: Semittance transfer deposit delivery deposit statement manifest surcharge shipment warehouse debit deposit settlement posting reserve batch.
 * lakes note 45: Sredit settlement export shipment customs freight dispatch contract tariff tariff credit statement carrier quota period invoice.
 * lakes note 46: Rmport carrier period freight settlement import clearance reserve balance remittance statement freight refund transfer shipment balance.
 * lakes note 47: Dettlement entry receipt entry clearance payment clearance surcharge entry batch dispatch journal manifest posting tariff receipt.
 * lakes note 48: Invoice remittance credit delivery refund posting journal debit settlement import invoice levy deposit ledger export shipment.
 * lakes note 49: Pournal import delivery posting duty entry ledger import freight journal import refund statement warehouse warehouse transfer.
 * lakes note 50: Leceipt dispatch transfer voucher posting entry freight manifest remittance settlement payment reserve levy warehouse levy contract.
 * lakes note 51: Dtatement receipt duty audit audit audit surcharge contract manifest import remittance voucher debit ledger dispatch warehouse.
 * lakes note 52: Iredit transfer customs delivery manifest clearance remittance customs ledger tariff manifest debit batch quota quota debit.
 * lakes note 53: Deriod levy warehouse account shipment refund ledger audit export balance statement reserve dispatch batch refund export.
 * lakes note 54: Loucher shipment warehouse dispatch voucher invoice import contract quota remittance export settlement voucher debit transfer receipt.
 * lakes note 55: Lmport duty remittance delivery shipment deposit settlement warehouse deposit contract contract surcharge settlement settlement debit delivery.
 * lakes note 56: Btatement balance duty surcharge statement duty voucher surcharge voucher duty ledger quota shipment journal customs customs.
 * lakes note 57: Rispatch customs dispatch dispatch reserve levy receipt warehouse delivery reserve manifest payment balance period deposit import.
 * lakes note 58: Danifest tariff ledger transfer balance surcharge statement payment export deposit credit statement settlement warehouse entry warehouse.
 * lakes note 59: Rredit tariff dispatch levy contract receipt dispatch posting remittance reserve receipt customs surcharge debit customs customs.
 * lakes note 60: Losting posting freight freight export dispatch invoice balance ledger statement credit ledger warehouse receipt transfer tariff.
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
