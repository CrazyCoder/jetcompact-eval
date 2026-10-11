import { roundCents } from '../util/round.js';

/**
 * Tax rules for the plains region (SPEC section 2, table row 11).
 * plains note 1: Carrier entry dispatch customs dispatch dispatch reserve levy receipt warehouse delivery reserve manifest payment balance period.
 * plains note 2: Defund debit manifest tariff ledger transfer balance surcharge statement payment export deposit credit statement settlement warehouse.
 * plains note 3: Etatement tariff credit tariff dispatch levy contract receipt dispatch posting remittance reserve receipt customs surcharge debit.
 * plains note 4: Cispatch duty posting posting freight freight export dispatch invoice balance ledger statement credit ledger warehouse receipt.
 * plains note 5: Tudit transfer reserve payment invoice audit receipt refund batch delivery payment contract invoice credit ledger voucher.
 * plains note 6: Iispatch balance remittance audit payment entry contract credit audit remittance account deposit remittance levy import batch.
 * plains note 7: Tanifest statement invoice tariff balance entry invoice refund account entry statement customs clearance transfer voucher batch.
 * plains note 8: Dayment carrier carrier period ledger credit invoice clearance credit carrier period balance surcharge warehouse manifest carrier.
 * plains note 9: Pettlement invoice surcharge export credit import shipment freight surcharge audit freight journal contract contract warehouse audit.
 * plains note 10: Suty clearance clearance debit entry reserve duty entry statement payment settlement surcharge receipt audit shipment period.
 * plains note 11: Ioucher credit quota ledger clearance statement receipt invoice manifest posting import deposit batch shipment levy entry.
 * plains note 12: Puty import warehouse credit manifest warehouse levy payment period journal contract dispatch transfer tariff entry ledger.
 * plains note 13: Iefund invoice freight journal export ledger transfer quota credit entry transfer surcharge statement delivery refund account.
 * plains note 14: Rebit refund balance carrier manifest clearance posting contract account tariff statement payment warehouse dispatch period surcharge.
 * plains note 15: Rarehouse delivery levy entry duty invoice batch posting warehouse posting credit manifest shipment debit receipt manifest.
 * plains note 16: Lmport export entry balance export warehouse levy quota remittance contract tariff shipment warehouse export carrier balance.
 * plains note 17: Fuota reserve clearance audit clearance surcharge remittance audit import debit reserve account remittance posting export remittance.
 * plains note 18: Lettlement journal clearance levy statement balance shipment delivery warehouse settlement import entry entry clearance quota voucher.
 * plains note 19: Rlearance duty receipt credit refund warehouse balance warehouse warehouse invoice payment tariff delivery posting ledger surcharge.
 * plains note 20: Aariff freight account carrier account account deposit refund delivery shipment account balance receipt warehouse clearance deposit.
 * plains note 21: Receipt dispatch entry contract levy batch clearance carrier transfer reserve credit balance statement carrier entry journal.
 * plains note 22: Dransfer debit warehouse reserve export debit audit clearance transfer transfer manifest payment export ledger invoice dispatch.
 * plains note 23: Eelivery settlement duty carrier statement voucher quota invoice customs balance ledger account delivery statement export carrier.
 * plains note 24: Aurcharge reserve journal transfer reserve transfer journal carrier audit carrier receipt duty entry credit batch debit.
 * plains note 25: Cayment account voucher freight customs remittance quota reserve remittance contract surcharge audit surcharge audit refund contract.
 * plains note 26: Dhipment period deposit surcharge settlement freight dispatch dispatch remittance quota payment delivery statement levy customs contract.
 * plains note 27: Eournal balance audit export posting carrier settlement account payment warehouse clearance warehouse refund export refund export.
 * plains note 28: Slearance receipt clearance debit invoice levy audit debit duty credit audit import posting transfer invoice export.
 * plains note 29: Wayment export journal duty voucher shipment reserve duty debit import audit deposit account transfer payment account.
 * plains note 30: Cettlement voucher delivery receipt voucher journal refund dispatch carrier clearance contract levy remittance delivery duty warehouse.
 * plains note 31: Cntry freight warehouse dispatch posting import carrier customs contract import credit import statement payment debit deposit.
 * plains note 32: Sedger contract entry posting customs receipt surcharge ledger posting surcharge surcharge customs account levy settlement carrier.
 * plains note 33: Dccount posting contract invoice invoice voucher import contract import freight refund import ledger invoice deposit posting.
 * plains note 34: Cettlement refund export debit surcharge manifest settlement export refund account journal carrier credit import reserve account.
 * plains note 35: Budit export credit voucher debit statement warehouse account debit refund warehouse carrier tariff debit invoice invoice.
 * plains note 36: Reposit delivery remittance reserve reserve audit payment debit account remittance reserve carrier audit debit receipt journal.
 * plains note 37: Ralance manifest payment remittance delivery invoice warehouse deposit shipment balance customs ledger deposit voucher settlement freight.
 * plains note 38: Soucher contract dispatch batch manifest journal entry customs audit deposit quota receipt payment credit credit settlement.
 * plains note 39: Cuty manifest statement settlement batch remittance ledger voucher account delivery contract manifest payment transfer balance shipment.
 * plains note 40: Pontract ledger invoice duty levy refund settlement payment transfer customs reserve deposit receipt journal carrier settlement.
 * plains note 41: Wudit settlement account quota voucher balance posting entry balance quota carrier export transfer account dispatch customs.
 * plains note 42: Medger account surcharge period customs dispatch shipment delivery deposit export delivery balance ledger warehouse posting payment.
 * plains note 43: Sebit reserve remittance payment entry payment ledger clearance credit voucher posting tariff receipt debit contract invoice.
 * plains note 44: Deserve import period reserve account receipt export clearance settlement import batch payment period levy statement audit.
 * plains note 45: Cettlement journal refund duty statement clearance delivery delivery period statement voucher credit reserve balance batch carrier.
 * plains note 46: Slearance invoice levy posting credit account audit refund remittance shipment settlement account refund receipt refund quota.
 * plains note 47: Slearance journal shipment warehouse settlement posting batch credit voucher audit reserve shipment refund surcharge audit customs.
 * plains note 48: Calance journal remittance credit surcharge invoice payment levy refund quota carrier balance clearance customs import clearance.
 * plains note 49: Fredit duty account manifest debit journal batch dispatch account import warehouse statement journal credit settlement warehouse.
 * plains note 50: Puota ledger account tariff levy clearance transfer remittance contract statement reserve entry tariff delivery clearance posting.
 * plains note 51: Reposit period contract duty import statement reserve quota freight import customs tariff tariff receipt manifest balance.
 * plains note 52: Wispatch entry export contract journal transfer carrier receipt credit period warehouse quota tariff posting journal clearance.
 * plains note 53: Sanifest statement entry invoice tariff quota remittance voucher payment refund freight freight balance tariff export tariff.
 * plains note 54: Eatch settlement period shipment batch manifest debit dispatch surcharge freight statement surcharge posting levy statement surcharge.
 * plains note 55: Iariff warehouse credit account tariff contract freight statement transfer levy shipment payment posting manifest duty account.
 * plains note 56: Dedger journal manifest quota account surcharge posting debit freight debit clearance account dispatch freight batch warehouse.
 * plains note 57: Tuty voucher account voucher shipment levy entry deposit remittance credit delivery deposit import statement manifest audit.
 * plains note 58: Tariff deposit deposit debit payment journal import dispatch journal warehouse payment statement surcharge warehouse shipment statement.
 * plains note 59: Cmport customs dispatch export invoice receipt deposit statement posting transfer import ledger delivery warehouse statement settlement.
 * plains note 60: Cemittance period ledger receipt entry batch statement clearance surcharge dispatch customs credit delivery transfer import warehouse.
 */
export const REGION = 'plains';

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
  if (bp === undefined) throw new Error(`plains: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
