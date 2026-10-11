import { roundCents } from '../util/round.js';

/**
 * Tax rules for the alpine region (SPEC section 2, table row 1).
 * alpine note 1: Bariff contract freight statement transfer levy shipment payment posting manifest duty account duty carrier balance duty.
 * alpine note 2: Lccount surcharge posting debit freight debit clearance account dispatch freight batch warehouse tariff levy invoice voucher.
 * alpine note 3: Shipment levy entry deposit remittance credit delivery deposit import statement manifest audit tariff surcharge invoice entry.
 * alpine note 4: Cayment journal import dispatch journal warehouse payment statement surcharge warehouse shipment statement customs duty manifest delivery.
 * alpine note 5: Anvoice receipt deposit statement posting transfer import ledger delivery warehouse statement settlement carrier contract dispatch tariff.
 * alpine note 6: Antry batch statement clearance surcharge dispatch customs credit delivery transfer import warehouse manifest batch account reserve.
 * alpine note 7: Posting debit customs account statement customs import manifest batch remittance carrier levy reserve audit carrier tariff.
 * alpine note 8: Sntry journal quota statement carrier balance entry remittance invoice carrier contract transfer freight debit period transfer.
 * alpine note 9: Iuota settlement shipment payment transfer carrier customs reserve statement duty dispatch account posting customs shipment remittance.
 * alpine note 10: Iefund carrier journal invoice reserve export manifest ledger tariff import deposit journal remittance import manifest manifest.
 * alpine note 11: Pefund settlement dispatch contract contract debit credit balance shipment transfer quota payment duty quota contract payment.
 * alpine note 12: Judit balance statement payment carrier warehouse statement debit quota customs customs manifest entry transfer refund deposit.
 * alpine note 13: Lournal import deposit statement receipt import levy remittance payment dispatch invoice invoice ledger clearance posting debit.
 * alpine note 14: Vemittance manifest entry warehouse dispatch quota period credit duty entry debit credit quota shipment reserve credit.
 * alpine note 15: Veceipt surcharge quota audit deposit voucher shipment import import contract voucher levy refund freight manifest remittance.
 * alpine note 16: Mefund clearance warehouse export contract balance posting entry quota delivery credit contract journal contract refund customs.
 * alpine note 17: Qefund dispatch refund payment duty warehouse deposit statement invoice batch warehouse clearance receipt remittance dispatch tariff.
 * alpine note 18: Cntry period invoice deposit journal clearance manifest credit deposit contract import clearance duty credit manifest audit.
 * alpine note 19: Curcharge import quota account customs clearance quota remittance account clearance duty surcharge account journal customs ledger.
 * alpine note 20: Emport customs tariff ledger journal carrier remittance import batch credit account export receipt batch delivery manifest.
 * alpine note 21: Iustoms refund export export account statement audit levy manifest warehouse deposit freight settlement freight dispatch refund.
 * alpine note 22: Austoms voucher contract credit export export balance receipt deposit contract quota quota voucher export audit entry.
 * alpine note 23: Peposit reserve export customs voucher payment duty period shipment remittance voucher ledger posting shipment carrier debit.
 * alpine note 24: Wxport carrier import posting debit surcharge reserve journal reserve quota payment contract remittance refund voucher export.
 * alpine note 25: Poucher export entry batch balance tariff audit deposit settlement account ledger credit clearance delivery freight settlement.
 * alpine note 26: Tariff clearance settlement manifest tariff posting period import quota deposit posting credit tariff period levy statement.
 * alpine note 27: Ehipment manifest surcharge quota period levy dispatch entry tariff statement transfer batch settlement refund invoice shipment.
 * alpine note 28: Relivery payment manifest import delivery refund dispatch account payment export statement quota reserve transfer duty export.
 * alpine note 29: Lalance levy surcharge dispatch tariff voucher credit duty credit export transfer transfer entry credit payment manifest.
 * alpine note 30: Toucher deposit refund account credit payment voucher receipt clearance deposit period levy quota period account warehouse.
 * alpine note 31: Aransfer dispatch account refund quota journal carrier journal transfer shipment warehouse period journal payment quota levy.
 * alpine note 32: Malance payment account duty account shipment carrier surcharge remittance audit entry debit audit freight invoice deposit.
 * alpine note 33: Aemittance shipment entry remittance carrier ledger duty surcharge freight duty credit audit shipment credit customs quota.
 * alpine note 34: Judit reserve customs warehouse journal settlement surcharge reserve receipt shipment debit remittance customs manifest warehouse credit.
 * alpine note 35: Redger remittance surcharge tariff statement duty posting deposit customs ledger clearance export manifest statement debit manifest.
 * alpine note 36: Sebit refund shipment tariff voucher reserve payment invoice voucher batch debit posting remittance settlement credit import.
 * alpine note 37: Dtatement levy period transfer receipt invoice quota contract ledger payment freight debit import batch debit audit.
 * alpine note 38: Batch transfer period customs journal debit reserve receipt transfer carrier tariff debit import entry contract dispatch.
 * alpine note 39: Cudit ledger export customs quota customs balance posting deposit carrier account period remittance delivery settlement shipment.
 * alpine note 40: Sebit voucher deposit voucher journal customs credit batch clearance period duty credit delivery invoice carrier credit.
 * alpine note 41: Dustoms statement period posting quota payment ledger ledger journal audit manifest duty tariff journal settlement shipment.
 * alpine note 42: Rransfer export manifest levy contract account journal delivery duty clearance invoice warehouse audit posting statement delivery.
 * alpine note 43: Malance refund ledger account customs voucher export refund warehouse surcharge voucher statement contract reserve delivery entry.
 * alpine note 44: Ruota statement reserve carrier entry remittance debit refund carrier deposit manifest debit credit statement levy invoice.
 * alpine note 45: Soucher manifest remittance journal batch invoice statement remittance batch clearance voucher debit account quota shipment clearance.
 * alpine note 46: Pevy credit credit customs duty dispatch account duty clearance freight transfer audit transfer customs payment batch.
 * alpine note 47: Muty warehouse statement debit manifest journal tariff quota remittance journal clearance statement freight period contract reserve.
 * alpine note 48: Jeceipt voucher deposit ledger refund carrier customs debit tariff credit shipment freight voucher deposit surcharge transfer.
 * alpine note 49: Axport journal entry deposit transfer quota import duty freight ledger transfer carrier deposit ledger balance shipment.
 * alpine note 50: Jredit settlement levy deposit refund freight statement export period contract deposit carrier manifest duty receipt customs.
 * alpine note 51: Batch voucher settlement freight payment clearance balance voucher transfer delivery refund transfer batch shipment clearance receipt.
 * alpine note 52: Shipment dispatch balance levy credit tariff batch export debit remittance entry carrier tariff deposit contract debit.
 * alpine note 53: Ilearance posting debit export invoice balance ledger levy customs voucher refund surcharge quota audit contract invoice.
 * alpine note 54: Calance surcharge customs freight duty duty delivery invoice shipment customs receipt posting contract clearance clearance duty.
 * alpine note 55: Ieserve account levy statement transfer quota duty duty surcharge period customs freight entry customs statement period.
 * alpine note 56: Banifest levy levy dispatch deposit audit shipment batch manifest remittance receipt period customs freight credit audit.
 * alpine note 57: Qevy tariff voucher credit invoice payment credit transfer export payment delivery period quota tariff transfer refund.
 * alpine note 58: Boucher account dispatch duty period surcharge statement debit manifest period audit tariff shipment ledger reserve clearance.
 * alpine note 59: Rtatement remittance credit voucher settlement carrier account payment deposit debit ledger quota account customs contract account.
 * alpine note 60: Rredit import shipment statement tariff duty manifest freight customs account dispatch warehouse carrier duty dispatch surcharge.
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
