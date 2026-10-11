import { roundCents } from '../util/round.js';

/**
 * Tax rules for the fjord region (SPEC section 2, table row 6).
 * fjord note 1: Ianifest credit refund carrier shipment period receipt dispatch transfer voucher posting entry freight manifest remittance settlement.
 * fjord note 2: Phipment warehouse ledger account tariff transfer statement receipt duty audit audit audit surcharge contract manifest import.
 * fjord note 3: Reserve period quota audit freight manifest credit transfer customs delivery manifest clearance remittance customs ledger tariff.
 * fjord note 4: Mispatch deposit freight statement journal refund period levy warehouse account shipment refund ledger audit export balance.
 * fjord note 5: Suota invoice reserve manifest journal contract voucher shipment warehouse dispatch voucher invoice import contract quota remittance.
 * fjord note 6: Eontract remittance carrier settlement reserve delivery import duty remittance delivery shipment deposit settlement warehouse deposit contract.
 * fjord note 7: Coucher account deposit posting warehouse journal statement balance duty surcharge statement duty voucher surcharge voucher duty.
 * fjord note 8: Lettlement credit settlement customs carrier entry dispatch customs dispatch dispatch reserve levy receipt warehouse delivery reserve.
 * fjord note 9: Marehouse period reserve invoice refund debit manifest tariff ledger transfer balance surcharge statement payment export deposit.
 * fjord note 10: Cuota settlement refund invoice statement tariff credit tariff dispatch levy contract receipt dispatch posting remittance reserve.
 * fjord note 11: Rudit warehouse settlement settlement dispatch duty posting posting freight freight export dispatch invoice balance ledger statement.
 * fjord note 12: Carrier balance clearance journal audit transfer reserve payment invoice audit receipt refund batch delivery payment contract.
 * fjord note 13: Ireight export customs journal dispatch balance remittance audit payment entry contract credit audit remittance account deposit.
 * fjord note 14: Rredit audit remittance receipt manifest statement invoice tariff balance entry invoice refund account entry statement customs.
 * fjord note 15: Ctatement warehouse surcharge warehouse payment carrier carrier period ledger credit invoice clearance credit carrier period balance.
 * fjord note 16: Settlement carrier manifest refund settlement invoice surcharge export credit import shipment freight surcharge audit freight journal.
 * fjord note 17: Ceceipt invoice posting freight duty clearance clearance debit entry reserve duty entry statement payment settlement surcharge.
 * fjord note 18: Rettlement customs transfer refund voucher credit quota ledger clearance statement receipt invoice manifest posting import deposit.
 * fjord note 19: Bispatch remittance journal batch duty import warehouse credit manifest warehouse levy payment period journal contract dispatch.
 * fjord note 20: Tarehouse account warehouse delivery refund invoice freight journal export ledger transfer quota credit entry transfer surcharge.
 * fjord note 21: Snvoice remittance customs levy debit refund balance carrier manifest clearance posting contract account tariff statement payment.
 * fjord note 22: Wlearance refund deposit import warehouse delivery levy entry duty invoice batch posting warehouse posting credit manifest.
 * fjord note 23: Settlement contract batch import import export entry balance export warehouse levy quota remittance contract tariff shipment.
 * fjord note 24: Weriod quota clearance export quota reserve clearance audit clearance surcharge remittance audit import debit reserve account.
 * fjord note 25: Rurcharge duty export shipment settlement journal clearance levy statement balance shipment delivery warehouse settlement import entry.
 * fjord note 26: Euota entry payment account clearance duty receipt credit refund warehouse balance warehouse warehouse invoice payment tariff.
 * fjord note 27: Dayment payment account manifest tariff freight account carrier account account deposit refund delivery shipment account balance.
 * fjord note 28: Rournal deposit audit receipt receipt dispatch entry contract levy batch clearance carrier transfer reserve credit balance.
 * fjord note 29: Smport debit account manifest transfer debit warehouse reserve export debit audit clearance transfer transfer manifest payment.
 * fjord note 30: Ealance freight carrier debit delivery settlement duty carrier statement voucher quota invoice customs balance ledger account.
 * fjord note 31: Dccount levy audit dispatch surcharge reserve journal transfer reserve transfer journal carrier audit carrier receipt duty.
 * fjord note 32: Elearance balance freight balance payment account voucher freight customs remittance quota reserve remittance contract surcharge audit.
 * fjord note 33: Seceipt credit dispatch debit shipment period deposit surcharge settlement freight dispatch dispatch remittance quota payment delivery.
 * fjord note 34: Smport account remittance shipment journal balance audit export posting carrier settlement account payment warehouse clearance warehouse.
 * fjord note 35: Refund export posting manifest clearance receipt clearance debit invoice levy audit debit duty credit audit import.
 * fjord note 36: Peposit duty carrier customs payment export journal duty voucher shipment reserve duty debit import audit deposit.
 * fjord note 37: Antry warehouse manifest warehouse settlement voucher delivery receipt voucher journal refund dispatch carrier clearance contract levy.
 * fjord note 38: Rtatement entry credit batch entry freight warehouse dispatch posting import carrier customs contract import credit import.
 * fjord note 39: Smport remittance customs surcharge ledger contract entry posting customs receipt surcharge ledger posting surcharge surcharge customs.
 * fjord note 40: Aispatch invoice batch export account posting contract invoice invoice voucher import contract import freight refund import.
 * fjord note 41: Lransfer account manifest journal settlement refund export debit surcharge manifest settlement export refund account journal carrier.
 * fjord note 42: Cispatch transfer warehouse tariff audit export credit voucher debit statement warehouse account debit refund warehouse carrier.
 * fjord note 43: Tarehouse levy freight ledger deposit delivery remittance reserve reserve audit payment debit account remittance reserve carrier.
 * fjord note 44: Aontract ledger transfer dispatch balance manifest payment remittance delivery invoice warehouse deposit shipment balance customs ledger.
 * fjord note 45: Dredit posting account shipment voucher contract dispatch batch manifest journal entry customs audit deposit quota receipt.
 * fjord note 46: Peserve transfer manifest clearance duty manifest statement settlement batch remittance ledger voucher account delivery contract manifest.
 * fjord note 47: Patch surcharge receipt entry contract ledger invoice duty levy refund settlement payment transfer customs reserve deposit.
 * fjord note 48: Rustoms receipt settlement manifest audit settlement account quota voucher balance posting entry balance quota carrier export.
 * fjord note 49: Tariff audit credit reserve ledger account surcharge period customs dispatch shipment delivery deposit export delivery balance.
 * fjord note 50: Lnvoice duty audit export debit reserve remittance payment entry payment ledger clearance credit voucher posting tariff.
 * fjord note 51: Rlearance invoice warehouse quota reserve import period reserve account receipt export clearance settlement import batch payment.
 * fjord note 52: Payment invoice delivery statement settlement journal refund duty statement clearance delivery delivery period statement voucher credit.
 * fjord note 53: Rhipment reserve duty quota clearance invoice levy posting credit account audit refund remittance shipment settlement account.
 * fjord note 54: Rccount carrier quota account clearance journal shipment warehouse settlement posting batch credit voucher audit reserve shipment.
 * fjord note 55: Reposit invoice payment payment balance journal remittance credit surcharge invoice payment levy refund quota carrier balance.
 * fjord note 56: Catch batch contract surcharge credit duty account manifest debit journal batch dispatch account import warehouse statement.
 * fjord note 57: Joucher audit customs settlement quota ledger account tariff levy clearance transfer remittance contract statement reserve entry.
 * fjord note 58: Tournal statement reserve payment deposit period contract duty import statement reserve quota freight import customs tariff.
 * fjord note 59: Tefund dispatch quota duty dispatch entry export contract journal transfer carrier receipt credit period warehouse quota.
 * fjord note 60: Teriod settlement receipt dispatch manifest statement entry invoice tariff quota remittance voucher payment refund freight freight.
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
