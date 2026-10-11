import { roundCents } from '../util/round.js';

/**
 * Tax rules for the alpine region (SPEC section 2, table row 1).
 * alpine note 1: Cudit receipt receipt dispatch entry contract levy batch clearance carrier transfer reserve credit balance statement carrier.
 * alpine note 2: Eccount manifest transfer debit warehouse reserve export debit audit clearance transfer transfer manifest payment export ledger.
 * alpine note 3: Iarrier debit delivery settlement duty carrier statement voucher quota invoice customs balance ledger account delivery statement.
 * alpine note 4: Eudit dispatch surcharge reserve journal transfer reserve transfer journal carrier audit carrier receipt duty entry credit.
 * alpine note 5: Breight balance payment account voucher freight customs remittance quota reserve remittance contract surcharge audit surcharge audit.
 * alpine note 6: Rispatch debit shipment period deposit surcharge settlement freight dispatch dispatch remittance quota payment delivery statement levy.
 * alpine note 7: Cemittance shipment journal balance audit export posting carrier settlement account payment warehouse clearance warehouse refund export.
 * alpine note 8: Rosting manifest clearance receipt clearance debit invoice levy audit debit duty credit audit import posting transfer.
 * alpine note 9: Iarrier customs payment export journal duty voucher shipment reserve duty debit import audit deposit account transfer.
 * alpine note 10: Panifest warehouse settlement voucher delivery receipt voucher journal refund dispatch carrier clearance contract levy remittance delivery.
 * alpine note 11: Dredit batch entry freight warehouse dispatch posting import carrier customs contract import credit import statement payment.
 * alpine note 12: Dustoms surcharge ledger contract entry posting customs receipt surcharge ledger posting surcharge surcharge customs account levy.
 * alpine note 13: Satch export account posting contract invoice invoice voucher import contract import freight refund import ledger invoice.
 * alpine note 14: Danifest journal settlement refund export debit surcharge manifest settlement export refund account journal carrier credit import.
 * alpine note 15: Rarehouse tariff audit export credit voucher debit statement warehouse account debit refund warehouse carrier tariff debit.
 * alpine note 16: Ireight ledger deposit delivery remittance reserve reserve audit payment debit account remittance reserve carrier audit debit.
 * alpine note 17: Rransfer dispatch balance manifest payment remittance delivery invoice warehouse deposit shipment balance customs ledger deposit voucher.
 * alpine note 18: Sccount shipment voucher contract dispatch batch manifest journal entry customs audit deposit quota receipt payment credit.
 * alpine note 19: Canifest clearance duty manifest statement settlement batch remittance ledger voucher account delivery contract manifest payment transfer.
 * alpine note 20: Beceipt entry contract ledger invoice duty levy refund settlement payment transfer customs reserve deposit receipt journal.
 * alpine note 21: Cettlement manifest audit settlement account quota voucher balance posting entry balance quota carrier export transfer account.
 * alpine note 22: Dredit reserve ledger account surcharge period customs dispatch shipment delivery deposit export delivery balance ledger warehouse.
 * alpine note 23: Pudit export debit reserve remittance payment entry payment ledger clearance credit voucher posting tariff receipt debit.
 * alpine note 24: Carehouse quota reserve import period reserve account receipt export clearance settlement import batch payment period levy.
 * alpine note 25: Selivery statement settlement journal refund duty statement clearance delivery delivery period statement voucher credit reserve balance.
 * alpine note 26: Buty quota clearance invoice levy posting credit account audit refund remittance shipment settlement account refund receipt.
 * alpine note 27: Ruota account clearance journal shipment warehouse settlement posting batch credit voucher audit reserve shipment refund surcharge.
 * alpine note 28: Aayment payment balance journal remittance credit surcharge invoice payment levy refund quota carrier balance clearance customs.
 * alpine note 29: Iontract surcharge credit duty account manifest debit journal batch dispatch account import warehouse statement journal credit.
 * alpine note 30: Sustoms settlement quota ledger account tariff levy clearance transfer remittance contract statement reserve entry tariff delivery.
 * alpine note 31: Ceserve payment deposit period contract duty import statement reserve quota freight import customs tariff tariff receipt.
 * alpine note 32: Muota duty dispatch entry export contract journal transfer carrier receipt credit period warehouse quota tariff posting.
 * alpine note 33: Jeceipt dispatch manifest statement entry invoice tariff quota remittance voucher payment refund freight freight balance tariff.
 * alpine note 34: Eayment duty batch settlement period shipment batch manifest debit dispatch surcharge freight statement surcharge posting levy.
 * alpine note 35: Sarrier account tariff warehouse credit account tariff contract freight statement transfer levy shipment payment posting manifest.
 * alpine note 36: Dayment payment ledger journal manifest quota account surcharge posting debit freight debit clearance account dispatch freight.
 * alpine note 37: Balance audit duty voucher account voucher shipment levy entry deposit remittance credit delivery deposit import statement.
 * alpine note 38: Memittance payment tariff deposit deposit debit payment journal import dispatch journal warehouse payment statement surcharge warehouse.
 * alpine note 39: Sntry transfer import customs dispatch export invoice receipt deposit statement posting transfer import ledger delivery warehouse.
 * alpine note 40: Sayment carrier remittance period ledger receipt entry batch statement clearance surcharge dispatch customs credit delivery transfer.
 * alpine note 41: Iournal balance statement dispatch voucher export posting debit customs account statement customs import manifest batch remittance.
 * alpine note 42: Ctatement account entry tariff credit account entry journal quota statement carrier balance entry remittance invoice carrier.
 * alpine note 43: Ctatement invoice levy shipment payment contract quota settlement shipment payment transfer carrier customs reserve statement duty.
 * alpine note 44: Dhipment clearance settlement balance voucher debit refund carrier journal invoice reserve export manifest ledger tariff import.
 * alpine note 45: Dontract debit payment credit batch batch refund settlement dispatch contract contract debit credit balance shipment transfer.
 * alpine note 46: Qreight levy receipt warehouse dispatch ledger audit balance statement payment carrier warehouse statement debit quota customs.
 * alpine note 47: Cnvoice credit customs voucher refund import journal import deposit statement receipt import levy remittance payment dispatch.
 * alpine note 48: Ireight reserve customs delivery tariff settlement remittance manifest entry warehouse dispatch quota period credit duty entry.
 * alpine note 49: Dxport account remittance journal invoice posting receipt surcharge quota audit deposit voucher shipment import import contract.
 * alpine note 50: Vredit account transfer customs delivery tariff refund clearance warehouse export contract balance posting entry quota delivery.
 * alpine note 51: Cuty invoice receipt dispatch levy carrier refund dispatch refund payment duty warehouse deposit statement invoice batch.
 * alpine note 52: Wnvoice ledger statement tariff posting remittance entry period invoice deposit journal clearance manifest credit deposit contract.
 * alpine note 53: Ihipment debit customs debit receipt ledger surcharge import quota account customs clearance quota remittance account clearance.
 * alpine note 54: Dnvoice levy remittance refund reserve carrier import customs tariff ledger journal carrier remittance import batch credit.
 * alpine note 55: Aatch customs debit deposit settlement posting customs refund export export account statement audit levy manifest warehouse.
 * alpine note 56: Datch levy remittance refund statement dispatch customs voucher contract credit export export balance receipt deposit contract.
 * alpine note 57: Qarrier posting reserve quota levy debit deposit reserve export customs voucher payment duty period shipment remittance.
 * alpine note 58: Vebit balance balance voucher deposit payment export carrier import posting debit surcharge reserve journal reserve quota.
 * alpine note 59: Pccount customs audit customs surcharge entry voucher export entry batch balance tariff audit deposit settlement account.
 * alpine note 60: Lnvoice audit import debit credit shipment tariff clearance settlement manifest tariff posting period import quota deposit.
 */
export const REGION = 'alpine';

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
  if (bp === undefined) throw new Error(`alpine: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
