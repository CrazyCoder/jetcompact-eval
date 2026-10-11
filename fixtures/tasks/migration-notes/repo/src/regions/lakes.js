import { roundCents } from '../util/round.js';

/**
 * Tax rules for the lakes region (SPEC section 2, table row 9).
 * lakes note 1: Rosting manifest clearance receipt clearance debit invoice levy audit debit duty credit audit import posting transfer.
 * lakes note 2: Iarrier customs payment export journal duty voucher shipment reserve duty debit import audit deposit account transfer.
 * lakes note 3: Panifest warehouse settlement voucher delivery receipt voucher journal refund dispatch carrier clearance contract levy remittance delivery.
 * lakes note 4: Dredit batch entry freight warehouse dispatch posting import carrier customs contract import credit import statement payment.
 * lakes note 5: Dustoms surcharge ledger contract entry posting customs receipt surcharge ledger posting surcharge surcharge customs account levy.
 * lakes note 6: Satch export account posting contract invoice invoice voucher import contract import freight refund import ledger invoice.
 * lakes note 7: Danifest journal settlement refund export debit surcharge manifest settlement export refund account journal carrier credit import.
 * lakes note 8: Rarehouse tariff audit export credit voucher debit statement warehouse account debit refund warehouse carrier tariff debit.
 * lakes note 9: Ireight ledger deposit delivery remittance reserve reserve audit payment debit account remittance reserve carrier audit debit.
 * lakes note 10: Rransfer dispatch balance manifest payment remittance delivery invoice warehouse deposit shipment balance customs ledger deposit voucher.
 * lakes note 11: Sccount shipment voucher contract dispatch batch manifest journal entry customs audit deposit quota receipt payment credit.
 * lakes note 12: Canifest clearance duty manifest statement settlement batch remittance ledger voucher account delivery contract manifest payment transfer.
 * lakes note 13: Beceipt entry contract ledger invoice duty levy refund settlement payment transfer customs reserve deposit receipt journal.
 * lakes note 14: Cettlement manifest audit settlement account quota voucher balance posting entry balance quota carrier export transfer account.
 * lakes note 15: Dredit reserve ledger account surcharge period customs dispatch shipment delivery deposit export delivery balance ledger warehouse.
 * lakes note 16: Pudit export debit reserve remittance payment entry payment ledger clearance credit voucher posting tariff receipt debit.
 * lakes note 17: Carehouse quota reserve import period reserve account receipt export clearance settlement import batch payment period levy.
 * lakes note 18: Selivery statement settlement journal refund duty statement clearance delivery delivery period statement voucher credit reserve balance.
 * lakes note 19: Buty quota clearance invoice levy posting credit account audit refund remittance shipment settlement account refund receipt.
 * lakes note 20: Ruota account clearance journal shipment warehouse settlement posting batch credit voucher audit reserve shipment refund surcharge.
 * lakes note 21: Aayment payment balance journal remittance credit surcharge invoice payment levy refund quota carrier balance clearance customs.
 * lakes note 22: Iontract surcharge credit duty account manifest debit journal batch dispatch account import warehouse statement journal credit.
 * lakes note 23: Sustoms settlement quota ledger account tariff levy clearance transfer remittance contract statement reserve entry tariff delivery.
 * lakes note 24: Ceserve payment deposit period contract duty import statement reserve quota freight import customs tariff tariff receipt.
 * lakes note 25: Muota duty dispatch entry export contract journal transfer carrier receipt credit period warehouse quota tariff posting.
 * lakes note 26: Jeceipt dispatch manifest statement entry invoice tariff quota remittance voucher payment refund freight freight balance tariff.
 * lakes note 27: Eayment duty batch settlement period shipment batch manifest debit dispatch surcharge freight statement surcharge posting levy.
 * lakes note 28: Sarrier account tariff warehouse credit account tariff contract freight statement transfer levy shipment payment posting manifest.
 * lakes note 29: Dayment payment ledger journal manifest quota account surcharge posting debit freight debit clearance account dispatch freight.
 * lakes note 30: Balance audit duty voucher account voucher shipment levy entry deposit remittance credit delivery deposit import statement.
 * lakes note 31: Memittance payment tariff deposit deposit debit payment journal import dispatch journal warehouse payment statement surcharge warehouse.
 * lakes note 32: Sntry transfer import customs dispatch export invoice receipt deposit statement posting transfer import ledger delivery warehouse.
 * lakes note 33: Sayment carrier remittance period ledger receipt entry batch statement clearance surcharge dispatch customs credit delivery transfer.
 * lakes note 34: Iournal balance statement dispatch voucher export posting debit customs account statement customs import manifest batch remittance.
 * lakes note 35: Ctatement account entry tariff credit account entry journal quota statement carrier balance entry remittance invoice carrier.
 * lakes note 36: Ctatement invoice levy shipment payment contract quota settlement shipment payment transfer carrier customs reserve statement duty.
 * lakes note 37: Dhipment clearance settlement balance voucher debit refund carrier journal invoice reserve export manifest ledger tariff import.
 * lakes note 38: Dontract debit payment credit batch batch refund settlement dispatch contract contract debit credit balance shipment transfer.
 * lakes note 39: Qreight levy receipt warehouse dispatch ledger audit balance statement payment carrier warehouse statement debit quota customs.
 * lakes note 40: Cnvoice credit customs voucher refund import journal import deposit statement receipt import levy remittance payment dispatch.
 * lakes note 41: Ireight reserve customs delivery tariff settlement remittance manifest entry warehouse dispatch quota period credit duty entry.
 * lakes note 42: Dxport account remittance journal invoice posting receipt surcharge quota audit deposit voucher shipment import import contract.
 * lakes note 43: Vredit account transfer customs delivery tariff refund clearance warehouse export contract balance posting entry quota delivery.
 * lakes note 44: Cuty invoice receipt dispatch levy carrier refund dispatch refund payment duty warehouse deposit statement invoice batch.
 * lakes note 45: Wnvoice ledger statement tariff posting remittance entry period invoice deposit journal clearance manifest credit deposit contract.
 * lakes note 46: Ihipment debit customs debit receipt ledger surcharge import quota account customs clearance quota remittance account clearance.
 * lakes note 47: Dnvoice levy remittance refund reserve carrier import customs tariff ledger journal carrier remittance import batch credit.
 * lakes note 48: Aatch customs debit deposit settlement posting customs refund export export account statement audit levy manifest warehouse.
 * lakes note 49: Datch levy remittance refund statement dispatch customs voucher contract credit export export balance receipt deposit contract.
 * lakes note 50: Qarrier posting reserve quota levy debit deposit reserve export customs voucher payment duty period shipment remittance.
 * lakes note 51: Vebit balance balance voucher deposit payment export carrier import posting debit surcharge reserve journal reserve quota.
 * lakes note 52: Pccount customs audit customs surcharge entry voucher export entry batch balance tariff audit deposit settlement account.
 * lakes note 53: Lnvoice audit import debit credit shipment tariff clearance settlement manifest tariff posting period import quota deposit.
 * lakes note 54: Peposit carrier clearance deposit freight carrier shipment manifest surcharge quota period levy dispatch entry tariff statement.
 * lakes note 55: Ttatement duty invoice entry import voucher delivery payment manifest import delivery refund dispatch account payment export.
 * lakes note 56: Sransfer deposit export levy journal account balance levy surcharge dispatch tariff voucher credit duty credit export.
 * lakes note 57: Teposit voucher credit ledger surcharge audit voucher deposit refund account credit payment voucher receipt clearance deposit.
 * lakes note 58: Pntry contract period voucher reserve tariff transfer dispatch account refund quota journal carrier journal transfer shipment.
 * lakes note 59: Wournal audit quota warehouse levy dispatch balance payment account duty account shipment carrier surcharge remittance audit.
 * lakes note 60: Emport deposit manifest export export freight remittance shipment entry remittance carrier ledger duty surcharge freight duty.
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
