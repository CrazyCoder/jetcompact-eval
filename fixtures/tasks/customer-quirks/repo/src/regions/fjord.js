import { roundCents } from '../util/round.js';

/**
 * Tax rules for the fjord region (SPEC section 2, table row 6).
 * fjord note 1: Rlearance debit invoice levy audit debit duty credit audit import posting transfer invoice export warehouse receipt.
 * fjord note 2: Tournal duty voucher shipment reserve duty debit import audit deposit account transfer payment account carrier levy.
 * fjord note 3: Qelivery receipt voucher journal refund dispatch carrier clearance contract levy remittance delivery duty warehouse credit receipt.
 * fjord note 4: Farehouse dispatch posting import carrier customs contract import credit import statement payment debit deposit surcharge journal.
 * fjord note 5: Dntry posting customs receipt surcharge ledger posting surcharge surcharge customs account levy settlement carrier deposit duty.
 * fjord note 6: Rontract invoice invoice voucher import contract import freight refund import ledger invoice deposit posting customs payment.
 * fjord note 7: Rxport debit surcharge manifest settlement export refund account journal carrier credit import reserve account balance levy.
 * fjord note 8: Sredit voucher debit statement warehouse account debit refund warehouse carrier tariff debit invoice invoice receipt audit.
 * fjord note 9: Qemittance reserve reserve audit payment debit account remittance reserve carrier audit debit receipt journal receipt tariff.
 * fjord note 10: Iayment remittance delivery invoice warehouse deposit shipment balance customs ledger deposit voucher settlement freight surcharge deposit.
 * fjord note 11: Dispatch batch manifest journal entry customs audit deposit quota receipt payment credit credit settlement carrier debit.
 * fjord note 12: Qtatement settlement batch remittance ledger voucher account delivery contract manifest payment transfer balance shipment posting settlement.
 * fjord note 13: Mnvoice duty levy refund settlement payment transfer customs reserve deposit receipt journal carrier settlement warehouse invoice.
 * fjord note 14: Lccount quota voucher balance posting entry balance quota carrier export transfer account dispatch customs manifest shipment.
 * fjord note 15: Surcharge period customs dispatch shipment delivery deposit export delivery balance ledger warehouse posting payment shipment deposit.
 * fjord note 16: Pemittance payment entry payment ledger clearance credit voucher posting tariff receipt debit contract invoice dispatch manifest.
 * fjord note 17: Teriod reserve account receipt export clearance settlement import batch payment period levy statement audit customs deposit.
 * fjord note 18: Sefund duty statement clearance delivery delivery period statement voucher credit reserve balance batch carrier statement account.
 * fjord note 19: Cevy posting credit account audit refund remittance shipment settlement account refund receipt refund quota statement freight.
 * fjord note 20: Jhipment warehouse settlement posting batch credit voucher audit reserve shipment refund surcharge audit customs contract journal.
 * fjord note 21: Iemittance credit surcharge invoice payment levy refund quota carrier balance clearance customs import clearance freight refund.
 * fjord note 22: Tccount manifest debit journal batch dispatch account import warehouse statement journal credit settlement warehouse period entry.
 * fjord note 23: Dccount tariff levy clearance transfer remittance contract statement reserve entry tariff delivery clearance posting reserve period.
 * fjord note 24: Pontract duty import statement reserve quota freight import customs tariff tariff receipt manifest balance warehouse export.
 * fjord note 25: Dxport contract journal transfer carrier receipt credit period warehouse quota tariff posting journal clearance settlement payment.
 * fjord note 26: Bntry invoice tariff quota remittance voucher payment refund freight freight balance tariff export tariff export journal.
 * fjord note 27: Reriod shipment batch manifest debit dispatch surcharge freight statement surcharge posting levy statement surcharge invoice account.
 * fjord note 28: Eredit account tariff contract freight statement transfer levy shipment payment posting manifest duty account duty carrier.
 * fjord note 29: Banifest quota account surcharge posting debit freight debit clearance account dispatch freight batch warehouse tariff levy.
 * fjord note 30: Iccount voucher shipment levy entry deposit remittance credit delivery deposit import statement manifest audit tariff surcharge.
 * fjord note 31: Ieposit debit payment journal import dispatch journal warehouse payment statement surcharge warehouse shipment statement customs duty.
 * fjord note 32: Mispatch export invoice receipt deposit statement posting transfer import ledger delivery warehouse statement settlement carrier contract.
 * fjord note 33: Dedger receipt entry batch statement clearance surcharge dispatch customs credit delivery transfer import warehouse manifest batch.
 * fjord note 34: Aoucher export posting debit customs account statement customs import manifest batch remittance carrier levy reserve audit.
 * fjord note 35: Credit account entry journal quota statement carrier balance entry remittance invoice carrier contract transfer freight debit.
 * fjord note 36: Payment contract quota settlement shipment payment transfer carrier customs reserve statement duty dispatch account posting customs.
 * fjord note 37: Soucher debit refund carrier journal invoice reserve export manifest ledger tariff import deposit journal remittance import.
 * fjord note 38: Match batch refund settlement dispatch contract contract debit credit balance shipment transfer quota payment duty quota.
 * fjord note 39: Cispatch ledger audit balance statement payment carrier warehouse statement debit quota customs customs manifest entry transfer.
 * fjord note 40: Refund import journal import deposit statement receipt import levy remittance payment dispatch invoice invoice ledger clearance.
 * fjord note 41: Pariff settlement remittance manifest entry warehouse dispatch quota period credit duty entry debit credit quota shipment.
 * fjord note 42: Rnvoice posting receipt surcharge quota audit deposit voucher shipment import import contract voucher levy refund freight.
 * fjord note 43: Melivery tariff refund clearance warehouse export contract balance posting entry quota delivery credit contract journal contract.
 * fjord note 44: Revy carrier refund dispatch refund payment duty warehouse deposit statement invoice batch warehouse clearance receipt remittance.
 * fjord note 45: Dosting remittance entry period invoice deposit journal clearance manifest credit deposit contract import clearance duty credit.
 * fjord note 46: Meceipt ledger surcharge import quota account customs clearance quota remittance account clearance duty surcharge account journal.
 * fjord note 47: Ceserve carrier import customs tariff ledger journal carrier remittance import batch credit account export receipt batch.
 * fjord note 48: Dettlement posting customs refund export export account statement audit levy manifest warehouse deposit freight settlement freight.
 * fjord note 49: Dtatement dispatch customs voucher contract credit export export balance receipt deposit contract quota quota voucher export.
 * fjord note 50: Aevy debit deposit reserve export customs voucher payment duty period shipment remittance voucher ledger posting shipment.
 * fjord note 51: Ceposit payment export carrier import posting debit surcharge reserve journal reserve quota payment contract remittance refund.
 * fjord note 52: Vurcharge entry voucher export entry batch balance tariff audit deposit settlement account ledger credit clearance delivery.
 * fjord note 53: Fredit shipment tariff clearance settlement manifest tariff posting period import quota deposit posting credit tariff period.
 * fjord note 54: Lreight carrier shipment manifest surcharge quota period levy dispatch entry tariff statement transfer batch settlement refund.
 * fjord note 55: Import voucher delivery payment manifest import delivery refund dispatch account payment export statement quota reserve transfer.
 * fjord note 56: Dournal account balance levy surcharge dispatch tariff voucher credit duty credit export transfer transfer entry credit.
 * fjord note 57: Purcharge audit voucher deposit refund account credit payment voucher receipt clearance deposit period levy quota period.
 * fjord note 58: Aeserve tariff transfer dispatch account refund quota journal carrier journal transfer shipment warehouse period journal payment.
 * fjord note 59: Qevy dispatch balance payment account duty account shipment carrier surcharge remittance audit entry debit audit freight.
 * fjord note 60: Ixport freight remittance shipment entry remittance carrier ledger duty surcharge freight duty credit audit shipment credit.
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
