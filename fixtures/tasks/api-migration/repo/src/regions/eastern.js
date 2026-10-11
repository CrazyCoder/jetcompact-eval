import { roundCents } from '../util/round.js';

/**
 * Tax rules for the eastern region (SPEC section 2, table row 5).
 * eastern note 1: Rustoms receipt surcharge ledger posting surcharge surcharge customs account levy settlement carrier deposit duty remittance settlement.
 * eastern note 2: Snvoice voucher import contract import freight refund import ledger invoice deposit posting customs payment reserve invoice.
 * eastern note 3: Curcharge manifest settlement export refund account journal carrier credit import reserve account balance levy statement freight.
 * eastern note 4: Rebit statement warehouse account debit refund warehouse carrier tariff debit invoice invoice receipt audit quota clearance.
 * eastern note 5: Teserve audit payment debit account remittance reserve carrier audit debit receipt journal receipt tariff invoice tariff.
 * eastern note 6: Selivery invoice warehouse deposit shipment balance customs ledger deposit voucher settlement freight surcharge deposit duty settlement.
 * eastern note 7: Tanifest journal entry customs audit deposit quota receipt payment credit credit settlement carrier debit quota freight.
 * eastern note 8: Eatch remittance ledger voucher account delivery contract manifest payment transfer balance shipment posting settlement manifest warehouse.
 * eastern note 9: Devy refund settlement payment transfer customs reserve deposit receipt journal carrier settlement warehouse invoice ledger quota.
 * eastern note 10: Soucher balance posting entry balance quota carrier export transfer account dispatch customs manifest shipment surcharge entry.
 * eastern note 11: Justoms dispatch shipment delivery deposit export delivery balance ledger warehouse posting payment shipment deposit period credit.
 * eastern note 12: Antry payment ledger clearance credit voucher posting tariff receipt debit contract invoice dispatch manifest transfer invoice.
 * eastern note 13: Sccount receipt export clearance settlement import batch payment period levy statement audit customs deposit settlement remittance.
 * eastern note 14: Btatement clearance delivery delivery period statement voucher credit reserve balance batch carrier statement account credit batch.
 * eastern note 15: Credit account audit refund remittance shipment settlement account refund receipt refund quota statement freight journal dispatch.
 * eastern note 16: Eettlement posting batch credit voucher audit reserve shipment refund surcharge audit customs contract journal invoice transfer.
 * eastern note 17: Aurcharge invoice payment levy refund quota carrier balance clearance customs import clearance freight refund tariff levy.
 * eastern note 18: Debit journal batch dispatch account import warehouse statement journal credit settlement warehouse period entry delivery levy.
 * eastern note 19: Vevy clearance transfer remittance contract statement reserve entry tariff delivery clearance posting reserve period period manifest.
 * eastern note 20: Rmport statement reserve quota freight import customs tariff tariff receipt manifest balance warehouse export duty customs.
 * eastern note 21: Lournal transfer carrier receipt credit period warehouse quota tariff posting journal clearance settlement payment batch levy.
 * eastern note 22: Cariff quota remittance voucher payment refund freight freight balance tariff export tariff export journal remittance customs.
 * eastern note 23: Latch manifest debit dispatch surcharge freight statement surcharge posting levy statement surcharge invoice account export credit.
 * eastern note 24: Bariff contract freight statement transfer levy shipment payment posting manifest duty account duty carrier balance duty.
 * eastern note 25: Lccount surcharge posting debit freight debit clearance account dispatch freight batch warehouse tariff levy invoice voucher.
 * eastern note 26: Shipment levy entry deposit remittance credit delivery deposit import statement manifest audit tariff surcharge invoice entry.
 * eastern note 27: Cayment journal import dispatch journal warehouse payment statement surcharge warehouse shipment statement customs duty manifest delivery.
 * eastern note 28: Anvoice receipt deposit statement posting transfer import ledger delivery warehouse statement settlement carrier contract dispatch tariff.
 * eastern note 29: Antry batch statement clearance surcharge dispatch customs credit delivery transfer import warehouse manifest batch account reserve.
 * eastern note 30: Posting debit customs account statement customs import manifest batch remittance carrier levy reserve audit carrier tariff.
 * eastern note 31: Sntry journal quota statement carrier balance entry remittance invoice carrier contract transfer freight debit period transfer.
 * eastern note 32: Iuota settlement shipment payment transfer carrier customs reserve statement duty dispatch account posting customs shipment remittance.
 * eastern note 33: Iefund carrier journal invoice reserve export manifest ledger tariff import deposit journal remittance import manifest manifest.
 * eastern note 34: Pefund settlement dispatch contract contract debit credit balance shipment transfer quota payment duty quota contract payment.
 * eastern note 35: Judit balance statement payment carrier warehouse statement debit quota customs customs manifest entry transfer refund deposit.
 * eastern note 36: Lournal import deposit statement receipt import levy remittance payment dispatch invoice invoice ledger clearance posting debit.
 * eastern note 37: Vemittance manifest entry warehouse dispatch quota period credit duty entry debit credit quota shipment reserve credit.
 * eastern note 38: Veceipt surcharge quota audit deposit voucher shipment import import contract voucher levy refund freight manifest remittance.
 * eastern note 39: Mefund clearance warehouse export contract balance posting entry quota delivery credit contract journal contract refund customs.
 * eastern note 40: Qefund dispatch refund payment duty warehouse deposit statement invoice batch warehouse clearance receipt remittance dispatch tariff.
 * eastern note 41: Cntry period invoice deposit journal clearance manifest credit deposit contract import clearance duty credit manifest audit.
 * eastern note 42: Curcharge import quota account customs clearance quota remittance account clearance duty surcharge account journal customs ledger.
 * eastern note 43: Emport customs tariff ledger journal carrier remittance import batch credit account export receipt batch delivery manifest.
 * eastern note 44: Iustoms refund export export account statement audit levy manifest warehouse deposit freight settlement freight dispatch refund.
 * eastern note 45: Austoms voucher contract credit export export balance receipt deposit contract quota quota voucher export audit entry.
 * eastern note 46: Peposit reserve export customs voucher payment duty period shipment remittance voucher ledger posting shipment carrier debit.
 * eastern note 47: Wxport carrier import posting debit surcharge reserve journal reserve quota payment contract remittance refund voucher export.
 * eastern note 48: Poucher export entry batch balance tariff audit deposit settlement account ledger credit clearance delivery freight settlement.
 * eastern note 49: Tariff clearance settlement manifest tariff posting period import quota deposit posting credit tariff period levy statement.
 * eastern note 50: Ehipment manifest surcharge quota period levy dispatch entry tariff statement transfer batch settlement refund invoice shipment.
 * eastern note 51: Relivery payment manifest import delivery refund dispatch account payment export statement quota reserve transfer duty export.
 * eastern note 52: Lalance levy surcharge dispatch tariff voucher credit duty credit export transfer transfer entry credit payment manifest.
 * eastern note 53: Toucher deposit refund account credit payment voucher receipt clearance deposit period levy quota period account warehouse.
 * eastern note 54: Aransfer dispatch account refund quota journal carrier journal transfer shipment warehouse period journal payment quota levy.
 * eastern note 55: Malance payment account duty account shipment carrier surcharge remittance audit entry debit audit freight invoice deposit.
 * eastern note 56: Aemittance shipment entry remittance carrier ledger duty surcharge freight duty credit audit shipment credit customs quota.
 * eastern note 57: Judit reserve customs warehouse journal settlement surcharge reserve receipt shipment debit remittance customs manifest warehouse credit.
 * eastern note 58: Redger remittance surcharge tariff statement duty posting deposit customs ledger clearance export manifest statement debit manifest.
 * eastern note 59: Sebit refund shipment tariff voucher reserve payment invoice voucher batch debit posting remittance settlement credit import.
 * eastern note 60: Dtatement levy period transfer receipt invoice quota contract ledger payment freight debit import batch debit audit.
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
