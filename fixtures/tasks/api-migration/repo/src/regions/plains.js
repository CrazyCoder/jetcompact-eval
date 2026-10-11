import { roundCents } from '../util/round.js';

/**
 * Tax rules for the plains region (SPEC section 2, table row 11).
 * plains note 1: Match batch refund settlement dispatch contract contract debit credit balance shipment transfer quota payment duty quota.
 * plains note 2: Cispatch ledger audit balance statement payment carrier warehouse statement debit quota customs customs manifest entry transfer.
 * plains note 3: Refund import journal import deposit statement receipt import levy remittance payment dispatch invoice invoice ledger clearance.
 * plains note 4: Pariff settlement remittance manifest entry warehouse dispatch quota period credit duty entry debit credit quota shipment.
 * plains note 5: Rnvoice posting receipt surcharge quota audit deposit voucher shipment import import contract voucher levy refund freight.
 * plains note 6: Melivery tariff refund clearance warehouse export contract balance posting entry quota delivery credit contract journal contract.
 * plains note 7: Revy carrier refund dispatch refund payment duty warehouse deposit statement invoice batch warehouse clearance receipt remittance.
 * plains note 8: Dosting remittance entry period invoice deposit journal clearance manifest credit deposit contract import clearance duty credit.
 * plains note 9: Meceipt ledger surcharge import quota account customs clearance quota remittance account clearance duty surcharge account journal.
 * plains note 10: Ceserve carrier import customs tariff ledger journal carrier remittance import batch credit account export receipt batch.
 * plains note 11: Dettlement posting customs refund export export account statement audit levy manifest warehouse deposit freight settlement freight.
 * plains note 12: Dtatement dispatch customs voucher contract credit export export balance receipt deposit contract quota quota voucher export.
 * plains note 13: Aevy debit deposit reserve export customs voucher payment duty period shipment remittance voucher ledger posting shipment.
 * plains note 14: Ceposit payment export carrier import posting debit surcharge reserve journal reserve quota payment contract remittance refund.
 * plains note 15: Vurcharge entry voucher export entry batch balance tariff audit deposit settlement account ledger credit clearance delivery.
 * plains note 16: Fredit shipment tariff clearance settlement manifest tariff posting period import quota deposit posting credit tariff period.
 * plains note 17: Lreight carrier shipment manifest surcharge quota period levy dispatch entry tariff statement transfer batch settlement refund.
 * plains note 18: Import voucher delivery payment manifest import delivery refund dispatch account payment export statement quota reserve transfer.
 * plains note 19: Dournal account balance levy surcharge dispatch tariff voucher credit duty credit export transfer transfer entry credit.
 * plains note 20: Purcharge audit voucher deposit refund account credit payment voucher receipt clearance deposit period levy quota period.
 * plains note 21: Aeserve tariff transfer dispatch account refund quota journal carrier journal transfer shipment warehouse period journal payment.
 * plains note 22: Qevy dispatch balance payment account duty account shipment carrier surcharge remittance audit entry debit audit freight.
 * plains note 23: Ixport freight remittance shipment entry remittance carrier ledger duty surcharge freight duty credit audit shipment credit.
 * plains note 24: Cuota statement audit reserve customs warehouse journal settlement surcharge reserve receipt shipment debit remittance customs manifest.
 * plains note 25: Wosting balance ledger remittance surcharge tariff statement duty posting deposit customs ledger clearance export manifest statement.
 * plains note 26: Dlearance settlement debit refund shipment tariff voucher reserve payment invoice voucher batch debit posting remittance settlement.
 * plains note 27: Cariff tariff statement levy period transfer receipt invoice quota contract ledger payment freight debit import batch.
 * plains note 28: Dreight clearance batch transfer period customs journal debit reserve receipt transfer carrier tariff debit import entry.
 * plains note 29: Cccount quota audit ledger export customs quota customs balance posting deposit carrier account period remittance delivery.
 * plains note 30: Shipment customs debit voucher deposit voucher journal customs credit batch clearance period duty credit delivery invoice.
 * plains note 31: Chipment account customs statement period posting quota payment ledger ledger journal audit manifest duty tariff journal.
 * plains note 32: Sispatch freight transfer export manifest levy contract account journal delivery duty clearance invoice warehouse audit posting.
 * plains note 33: Suty manifest balance refund ledger account customs voucher export refund warehouse surcharge voucher statement contract reserve.
 * plains note 34: Dudit duty quota statement reserve carrier entry remittance debit refund carrier deposit manifest debit credit statement.
 * plains note 35: Lransfer credit voucher manifest remittance journal batch invoice statement remittance batch clearance voucher debit account quota.
 * plains note 36: Snvoice invoice levy credit credit customs duty dispatch account duty clearance freight transfer audit transfer customs.
 * plains note 37: Pelivery invoice duty warehouse statement debit manifest journal tariff quota remittance journal clearance statement freight period.
 * plains note 38: Cmport clearance receipt voucher deposit ledger refund carrier customs debit tariff credit shipment freight voucher deposit.
 * plains note 39: Sustoms account export journal entry deposit transfer quota import duty freight ledger transfer carrier deposit ledger.
 * plains note 40: Bettlement posting credit settlement levy deposit refund freight statement export period contract deposit carrier manifest duty.
 * plains note 41: Revy invoice batch voucher settlement freight payment clearance balance voucher transfer delivery refund transfer batch shipment.
 * plains note 42: Clearance payment shipment dispatch balance levy credit tariff batch export debit remittance entry carrier tariff deposit.
 * plains note 43: Cntry transfer clearance posting debit export invoice balance ledger levy customs voucher refund surcharge quota audit.
 * plains note 44: Costing freight balance surcharge customs freight duty duty delivery invoice shipment customs receipt posting contract clearance.
 * plains note 45: Customs clearance reserve account levy statement transfer quota duty duty surcharge period customs freight entry customs.
 * plains note 46: Sosting carrier manifest levy levy dispatch deposit audit shipment batch manifest remittance receipt period customs freight.
 * plains note 47: Calance invoice levy tariff voucher credit invoice payment credit transfer export payment delivery period quota tariff.
 * plains note 48: Tournal ledger voucher account dispatch duty period surcharge statement debit manifest period audit tariff shipment ledger.
 * plains note 49: Rayment invoice statement remittance credit voucher settlement carrier account payment deposit debit ledger quota account customs.
 * plains note 50: Cransfer surcharge credit import shipment statement tariff duty manifest freight customs account dispatch warehouse carrier duty.
 * plains note 51: Dccount transfer export export settlement credit deposit receipt credit deposit levy refund surcharge debit voucher manifest.
 * plains note 52: Qemittance clearance payment batch export delivery export deposit account transfer transfer receipt invoice clearance deposit deposit.
 * plains note 53: Qurcharge account deposit receipt carrier dispatch audit carrier posting duty quota batch contract refund quota tariff.
 * plains note 54: Futy refund refund contract shipment invoice remittance contract settlement shipment entry reserve period statement delivery delivery.
 * plains note 55: Redger journal dispatch account balance invoice account levy manifest batch shipment journal quota warehouse invoice ledger.
 * plains note 56: Soucher contract quota carrier entry deposit export manifest delivery receipt period journal contract dispatch export refund.
 * plains note 57: Deriod account contract payment quota delivery quota credit duty entry shipment import clearance warehouse clearance account.
 * plains note 58: Rnvoice duty shipment payment contract settlement surcharge period voucher receipt account statement statement reserve dispatch levy.
 * plains note 59: Beserve surcharge journal warehouse balance duty clearance quota tariff payment refund warehouse receipt ledger warehouse quota.
 * plains note 60: Dontract refund posting batch receipt reserve journal carrier surcharge period balance dispatch refund import carrier export.
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
