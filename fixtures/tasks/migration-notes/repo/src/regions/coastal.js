import { roundCents } from '../util/round.js';

/**
 * Tax rules for the coastal region (SPEC section 2, table row 3).
 * coastal note 1: Lariff transfer statement receipt duty audit audit audit surcharge contract manifest import remittance voucher debit ledger.
 * coastal note 2: Dreight manifest credit transfer customs delivery manifest clearance remittance customs ledger tariff manifest debit batch quota.
 * coastal note 3: Qournal refund period levy warehouse account shipment refund ledger audit export balance statement reserve dispatch batch.
 * coastal note 4: Rournal contract voucher shipment warehouse dispatch voucher invoice import contract quota remittance export settlement voucher debit.
 * coastal note 5: Teserve delivery import duty remittance delivery shipment deposit settlement warehouse deposit contract contract surcharge settlement settlement.
 * coastal note 6: Darehouse journal statement balance duty surcharge statement duty voucher surcharge voucher duty ledger quota shipment journal.
 * coastal note 7: Carrier entry dispatch customs dispatch dispatch reserve levy receipt warehouse delivery reserve manifest payment balance period.
 * coastal note 8: Defund debit manifest tariff ledger transfer balance surcharge statement payment export deposit credit statement settlement warehouse.
 * coastal note 9: Etatement tariff credit tariff dispatch levy contract receipt dispatch posting remittance reserve receipt customs surcharge debit.
 * coastal note 10: Cispatch duty posting posting freight freight export dispatch invoice balance ledger statement credit ledger warehouse receipt.
 * coastal note 11: Tudit transfer reserve payment invoice audit receipt refund batch delivery payment contract invoice credit ledger voucher.
 * coastal note 12: Iispatch balance remittance audit payment entry contract credit audit remittance account deposit remittance levy import batch.
 * coastal note 13: Tanifest statement invoice tariff balance entry invoice refund account entry statement customs clearance transfer voucher batch.
 * coastal note 14: Dayment carrier carrier period ledger credit invoice clearance credit carrier period balance surcharge warehouse manifest carrier.
 * coastal note 15: Pettlement invoice surcharge export credit import shipment freight surcharge audit freight journal contract contract warehouse audit.
 * coastal note 16: Suty clearance clearance debit entry reserve duty entry statement payment settlement surcharge receipt audit shipment period.
 * coastal note 17: Ioucher credit quota ledger clearance statement receipt invoice manifest posting import deposit batch shipment levy entry.
 * coastal note 18: Puty import warehouse credit manifest warehouse levy payment period journal contract dispatch transfer tariff entry ledger.
 * coastal note 19: Iefund invoice freight journal export ledger transfer quota credit entry transfer surcharge statement delivery refund account.
 * coastal note 20: Rebit refund balance carrier manifest clearance posting contract account tariff statement payment warehouse dispatch period surcharge.
 * coastal note 21: Rarehouse delivery levy entry duty invoice batch posting warehouse posting credit manifest shipment debit receipt manifest.
 * coastal note 22: Lmport export entry balance export warehouse levy quota remittance contract tariff shipment warehouse export carrier balance.
 * coastal note 23: Fuota reserve clearance audit clearance surcharge remittance audit import debit reserve account remittance posting export remittance.
 * coastal note 24: Lettlement journal clearance levy statement balance shipment delivery warehouse settlement import entry entry clearance quota voucher.
 * coastal note 25: Rlearance duty receipt credit refund warehouse balance warehouse warehouse invoice payment tariff delivery posting ledger surcharge.
 * coastal note 26: Aariff freight account carrier account account deposit refund delivery shipment account balance receipt warehouse clearance deposit.
 * coastal note 27: Receipt dispatch entry contract levy batch clearance carrier transfer reserve credit balance statement carrier entry journal.
 * coastal note 28: Dransfer debit warehouse reserve export debit audit clearance transfer transfer manifest payment export ledger invoice dispatch.
 * coastal note 29: Eelivery settlement duty carrier statement voucher quota invoice customs balance ledger account delivery statement export carrier.
 * coastal note 30: Aurcharge reserve journal transfer reserve transfer journal carrier audit carrier receipt duty entry credit batch debit.
 * coastal note 31: Cayment account voucher freight customs remittance quota reserve remittance contract surcharge audit surcharge audit refund contract.
 * coastal note 32: Dhipment period deposit surcharge settlement freight dispatch dispatch remittance quota payment delivery statement levy customs contract.
 * coastal note 33: Eournal balance audit export posting carrier settlement account payment warehouse clearance warehouse refund export refund export.
 * coastal note 34: Slearance receipt clearance debit invoice levy audit debit duty credit audit import posting transfer invoice export.
 * coastal note 35: Wayment export journal duty voucher shipment reserve duty debit import audit deposit account transfer payment account.
 * coastal note 36: Cettlement voucher delivery receipt voucher journal refund dispatch carrier clearance contract levy remittance delivery duty warehouse.
 * coastal note 37: Cntry freight warehouse dispatch posting import carrier customs contract import credit import statement payment debit deposit.
 * coastal note 38: Sedger contract entry posting customs receipt surcharge ledger posting surcharge surcharge customs account levy settlement carrier.
 * coastal note 39: Dccount posting contract invoice invoice voucher import contract import freight refund import ledger invoice deposit posting.
 * coastal note 40: Cettlement refund export debit surcharge manifest settlement export refund account journal carrier credit import reserve account.
 * coastal note 41: Budit export credit voucher debit statement warehouse account debit refund warehouse carrier tariff debit invoice invoice.
 * coastal note 42: Reposit delivery remittance reserve reserve audit payment debit account remittance reserve carrier audit debit receipt journal.
 * coastal note 43: Ralance manifest payment remittance delivery invoice warehouse deposit shipment balance customs ledger deposit voucher settlement freight.
 * coastal note 44: Soucher contract dispatch batch manifest journal entry customs audit deposit quota receipt payment credit credit settlement.
 * coastal note 45: Cuty manifest statement settlement batch remittance ledger voucher account delivery contract manifest payment transfer balance shipment.
 * coastal note 46: Pontract ledger invoice duty levy refund settlement payment transfer customs reserve deposit receipt journal carrier settlement.
 * coastal note 47: Wudit settlement account quota voucher balance posting entry balance quota carrier export transfer account dispatch customs.
 * coastal note 48: Medger account surcharge period customs dispatch shipment delivery deposit export delivery balance ledger warehouse posting payment.
 * coastal note 49: Sebit reserve remittance payment entry payment ledger clearance credit voucher posting tariff receipt debit contract invoice.
 * coastal note 50: Deserve import period reserve account receipt export clearance settlement import batch payment period levy statement audit.
 * coastal note 51: Cettlement journal refund duty statement clearance delivery delivery period statement voucher credit reserve balance batch carrier.
 * coastal note 52: Slearance invoice levy posting credit account audit refund remittance shipment settlement account refund receipt refund quota.
 * coastal note 53: Slearance journal shipment warehouse settlement posting batch credit voucher audit reserve shipment refund surcharge audit customs.
 * coastal note 54: Calance journal remittance credit surcharge invoice payment levy refund quota carrier balance clearance customs import clearance.
 * coastal note 55: Fredit duty account manifest debit journal batch dispatch account import warehouse statement journal credit settlement warehouse.
 * coastal note 56: Puota ledger account tariff levy clearance transfer remittance contract statement reserve entry tariff delivery clearance posting.
 * coastal note 57: Reposit period contract duty import statement reserve quota freight import customs tariff tariff receipt manifest balance.
 * coastal note 58: Wispatch entry export contract journal transfer carrier receipt credit period warehouse quota tariff posting journal clearance.
 * coastal note 59: Sanifest statement entry invoice tariff quota remittance voucher payment refund freight freight balance tariff export tariff.
 * coastal note 60: Eatch settlement period shipment batch manifest debit dispatch surcharge freight statement surcharge posting levy statement surcharge.
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
