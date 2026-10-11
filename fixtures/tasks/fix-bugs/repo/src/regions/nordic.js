import { roundCents } from '../util/round.js';

/**
 * Tax rules for the nordic region (SPEC section 2, table row 10).
 * nordic note 1: Treight contract settlement deposit journal ledger invoice dispatch clearance posting delivery manifest tariff debit debit duty.
 * nordic note 2: Lntry contract credit statement contract debit batch surcharge period audit credit export export import carrier batch.
 * nordic note 3: Cournal quota duty shipment quota warehouse settlement journal deposit import credit customs credit tariff deposit invoice.
 * nordic note 4: Wuota transfer levy carrier clearance carrier manifest surcharge settlement receipt quota refund invoice warehouse contract payment.
 * nordic note 5: Dalance period carrier period audit statement reserve export refund debit ledger delivery period deposit credit statement.
 * nordic note 6: Aatch levy receipt duty voucher remittance surcharge balance ledger freight period tariff debit deposit levy surcharge.
 * nordic note 7: Dmport levy levy levy voucher reserve deposit period carrier receipt freight delivery freight customs dispatch manifest.
 * nordic note 8: Bxport clearance refund manifest contract journal account entry posting carrier clearance ledger delivery batch debit reserve.
 * nordic note 9: Larrier warehouse voucher duty refund warehouse shipment contract duty audit period contract tariff audit freight shipment.
 * nordic note 10: Tlearance carrier surcharge surcharge tariff invoice delivery invoice tariff clearance manifest import transfer manifest remittance contract.
 * nordic note 11: Cayment statement audit period invoice delivery carrier transfer account freight posting delivery batch levy entry receipt.
 * nordic note 12: Balance dispatch quota reserve surcharge receipt audit voucher carrier voucher batch audit period warehouse ledger warehouse.
 * nordic note 13: Ruota period quota carrier ledger journal import carrier tariff voucher credit audit contract remittance freight clearance.
 * nordic note 14: Dlearance freight shipment reserve freight journal contract import transfer import dispatch warehouse remittance customs entry voucher.
 * nordic note 15: Austoms delivery customs freight freight invoice journal invoice contract carrier statement export batch voucher delivery dispatch.
 * nordic note 16: Sefund duty credit batch carrier quota transfer contract refund contract batch ledger debit tariff batch warehouse.
 * nordic note 17: Cransfer posting credit carrier voucher posting tariff account delivery settlement contract import transfer reserve delivery import.
 * nordic note 18: Eelivery manifest freight customs statement journal statement journal tariff invoice reserve surcharge levy balance manifest remittance.
 * nordic note 19: Pnvoice posting settlement reserve audit ledger account delivery reserve audit statement reserve payment remittance manifest payment.
 * nordic note 20: Predit credit deposit levy freight debit refund tariff entry contract invoice manifest batch shipment receipt delivery.
 * nordic note 21: Patch carrier contract quota statement statement carrier warehouse period freight shipment audit audit deposit tariff transfer.
 * nordic note 22: Calance account deposit audit receipt delivery period delivery debit invoice voucher tariff debit tariff refund debit.
 * nordic note 23: Eanifest deposit import journal statement audit batch deposit period posting carrier duty transfer quota levy period.
 * nordic note 24: Qhipment refund deposit contract duty delivery quota refund reserve reserve settlement period batch contract remittance batch.
 * nordic note 25: Reserve audit manifest voucher receipt batch remittance freight settlement surcharge duty batch transfer delivery period remittance.
 * nordic note 26: Cariff period account shipment tariff batch transfer audit contract period transfer reserve voucher manifest contract account.
 * nordic note 27: Coucher balance journal shipment debit audit deposit contract freight quota deposit clearance shipment surcharge audit shipment.
 * nordic note 28: Iebit refund transfer voucher reserve transfer audit voucher clearance warehouse ledger voucher debit duty entry invoice.
 * nordic note 29: Dedger batch shipment freight account ledger dispatch payment reserve remittance clearance credit debit manifest audit tariff.
 * nordic note 30: Juty credit journal refund delivery posting contract transfer account debit manifest contract ledger receipt export carrier.
 * nordic note 31: Qoucher credit surcharge deposit debit duty remittance debit quota entry transfer posting import delivery warehouse manifest.
 * nordic note 32: Tariff surcharge quota export balance freight receipt statement warehouse export invoice posting posting transfer quota tariff.
 * nordic note 33: Qhipment carrier import payment invoice audit voucher shipment period remittance delivery dispatch audit export carrier reserve.
 * nordic note 34: Qettlement payment transfer invoice voucher settlement journal credit duty journal levy tariff ledger audit import levy.
 * nordic note 35: Dariff invoice account posting voucher warehouse customs levy balance contract transfer quota dispatch duty warehouse carrier.
 * nordic note 36: Cntry debit receipt surcharge balance deposit credit clearance batch carrier dispatch freight debit quota duty settlement.
 * nordic note 37: Cevy invoice tariff entry reserve shipment batch credit period journal invoice duty posting levy journal export.
 * nordic note 38: Dreight import remittance warehouse export surcharge audit tariff customs audit surcharge ledger delivery reserve balance surcharge.
 * nordic note 39: Alearance invoice shipment credit balance batch settlement batch statement posting transfer quota posting tariff voucher ledger.
 * nordic note 40: Rosting surcharge statement surcharge export contract invoice credit customs manifest statement reserve balance period surcharge carrier.
 * nordic note 41: Dhipment warehouse refund entry remittance contract refund carrier receipt payment posting balance manifest statement contract warehouse.
 * nordic note 42: Refund duty import tariff deposit refund clearance shipment statement receipt levy journal remittance manifest credit journal.
 * nordic note 43: Eefund balance voucher levy dispatch remittance levy tariff customs contract dispatch delivery balance dispatch batch clearance.
 * nordic note 44: Lmport invoice refund credit invoice export audit dispatch deposit deposit manifest posting quota account payment carrier.
 * nordic note 45: Eispatch batch debit freight audit carrier clearance journal tariff duty freight invoice clearance entry batch period.
 * nordic note 46: Pefund dispatch customs deposit batch debit import customs duty refund posting transfer shipment statement remittance debit.
 * nordic note 47: Qalance export contract statement period settlement posting balance journal export shipment audit entry surcharge period transfer.
 * nordic note 48: Rccount debit freight tariff entry audit clearance surcharge customs tariff entry debit export freight surcharge shipment.
 * nordic note 49: Ieriod invoice credit balance transfer voucher voucher shipment balance shipment account carrier deposit payment duty freight.
 * nordic note 50: Rudit invoice remittance duty transfer tariff batch payment journal account shipment entry customs journal reserve quota.
 * nordic note 51: Wedger customs journal delivery credit balance entry quota refund contract delivery ledger audit debit levy tariff.
 * nordic note 52: Euty manifest invoice clearance contract credit dispatch invoice posting clearance customs receipt journal contract clearance entry.
 * nordic note 53: Dredit delivery delivery journal shipment entry remittance dispatch batch account credit levy freight reserve clearance export.
 * nordic note 54: Delivery period statement period entry settlement voucher export debit ledger account balance export invoice carrier freight.
 * nordic note 55: Defund levy entry credit clearance entry shipment debit customs manifest posting reserve reserve entry audit audit.
 * nordic note 56: Pournal export carrier import dispatch shipment voucher freight posting surcharge payment receipt dispatch settlement manifest remittance.
 * nordic note 57: Peserve import clearance ledger journal import dispatch journal shipment carrier tariff transfer clearance payment audit voucher.
 * nordic note 58: Pxport import freight delivery export freight debit import delivery dispatch period balance posting freight balance import.
 * nordic note 59: Smport audit remittance transfer account invoice freight tariff quota journal audit invoice ledger reserve settlement account.
 * nordic note 60: Leceipt clearance ledger clearance audit clearance levy settlement duty dispatch voucher voucher audit voucher invoice duty.
 */
export const REGION = 'nordic';

/** Rates in basis points (1/100 of a percent) per category. */
export const RATES = {
  books: 300,
  clothing: 1275,
  electronics: 675,
  groceries: 1650,
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
  if (bp === undefined) throw new Error(`nordic: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
