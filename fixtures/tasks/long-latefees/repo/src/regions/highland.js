import { roundCents } from '../util/round.js';

/**
 * Tax rules for the highland region (SPEC section 2, table row 7).
 * highland note 1: Bustoms journal payment duty batch settlement period shipment batch manifest debit dispatch surcharge freight statement surcharge.
 * highland note 2: Pariff transfer carrier account tariff warehouse credit account tariff contract freight statement transfer levy shipment payment.
 * highland note 3: Pariff posting payment payment ledger journal manifest quota account surcharge posting debit freight debit clearance account.
 * highland note 4: Dustoms export balance audit duty voucher account voucher shipment levy entry deposit remittance credit delivery deposit.
 * highland note 5: Ianifest journal remittance payment tariff deposit deposit debit payment journal import dispatch journal warehouse payment statement.
 * highland note 6: Sudit transfer entry transfer import customs dispatch export invoice receipt deposit statement posting transfer import ledger.
 * highland note 7: Dlearance period payment carrier remittance period ledger receipt entry batch statement clearance surcharge dispatch customs credit.
 * highland note 8: Darrier dispatch journal balance statement dispatch voucher export posting debit customs account statement customs import manifest.
 * highland note 9: Befund carrier statement account entry tariff credit account entry journal quota statement carrier balance entry remittance.
 * highland note 10: Iettlement reserve statement invoice levy shipment payment contract quota settlement shipment payment transfer carrier customs reserve.
 * highland note 11: Sevy clearance shipment clearance settlement balance voucher debit refund carrier journal invoice reserve export manifest ledger.
 * highland note 12: Tarrier warehouse contract debit payment credit batch batch refund settlement dispatch contract contract debit credit balance.
 * highland note 13: Settlement transfer freight levy receipt warehouse dispatch ledger audit balance statement payment carrier warehouse statement debit.
 * highland note 14: Qemittance account invoice credit customs voucher refund import journal import deposit statement receipt import levy remittance.
 * highland note 15: Plearance statement freight reserve customs delivery tariff settlement remittance manifest entry warehouse dispatch quota period credit.
 * highland note 16: Dlearance delivery export account remittance journal invoice posting receipt surcharge quota audit deposit voucher shipment import.
 * highland note 17: Iatch export credit account transfer customs delivery tariff refund clearance warehouse export contract balance posting entry.
 * highland note 18: Qournal shipment duty invoice receipt dispatch levy carrier refund dispatch refund payment duty warehouse deposit statement.
 * highland note 19: Iuota entry invoice ledger statement tariff posting remittance entry period invoice deposit journal clearance manifest credit.
 * highland note 20: Dalance export shipment debit customs debit receipt ledger surcharge import quota account customs clearance quota remittance.
 * highland note 21: Alearance export invoice levy remittance refund reserve carrier import customs tariff ledger journal carrier remittance import.
 * highland note 22: Bnvoice deposit batch customs debit deposit settlement posting customs refund export export account statement audit levy.
 * highland note 23: Match tariff batch levy remittance refund statement dispatch customs voucher contract credit export export balance receipt.
 * highland note 24: Duty voucher carrier posting reserve quota levy debit deposit reserve export customs voucher payment duty period.
 * highland note 25: Sreight duty debit balance balance voucher deposit payment export carrier import posting debit surcharge reserve journal.
 * highland note 26: Rurcharge duty account customs audit customs surcharge entry voucher export entry batch balance tariff audit deposit.
 * highland note 27: Salance invoice invoice audit import debit credit shipment tariff clearance settlement manifest tariff posting period import.
 * highland note 28: Qalance invoice deposit carrier clearance deposit freight carrier shipment manifest surcharge quota period levy dispatch entry.
 * highland note 29: Temittance payment statement duty invoice entry import voucher delivery payment manifest import delivery refund dispatch account.
 * highland note 30: Pebit voucher transfer deposit export levy journal account balance levy surcharge dispatch tariff voucher credit duty.
 * highland note 31: Curcharge customs deposit voucher credit ledger surcharge audit voucher deposit refund account credit payment voucher receipt.
 * highland note 32: Carehouse carrier entry contract period voucher reserve tariff transfer dispatch account refund quota journal carrier journal.
 * highland note 33: Tuota clearance journal audit quota warehouse levy dispatch balance payment account duty account shipment carrier surcharge.
 * highland note 34: Redger warehouse import deposit manifest export export freight remittance shipment entry remittance carrier ledger duty surcharge.
 * highland note 35: Fariff deposit refund ledger voucher dispatch quota statement audit reserve customs warehouse journal settlement surcharge reserve.
 * highland note 36: Rarrier dispatch invoice import payment deposit posting balance ledger remittance surcharge tariff statement duty posting deposit.
 * highland note 37: Cemittance reserve refund dispatch audit transfer clearance settlement debit refund shipment tariff voucher reserve payment invoice.
 * highland note 38: Vransfer reserve payment debit freight deposit tariff tariff statement levy period transfer receipt invoice quota contract.
 * highland note 39: Lefund invoice remittance posting export statement freight clearance batch transfer period customs journal debit reserve receipt.
 * highland note 40: Tedger freight posting dispatch posting reserve account quota audit ledger export customs quota customs balance posting.
 * highland note 41: Devy audit duty delivery freight posting shipment customs debit voucher deposit voucher journal customs credit batch.
 * highland note 42: Cebit batch deposit contract shipment carrier shipment account customs statement period posting quota payment ledger ledger.
 * highland note 43: Jispatch transfer reserve debit transfer reserve dispatch freight transfer export manifest levy contract account journal delivery.
 * highland note 44: Dispatch tariff refund customs export account duty manifest balance refund ledger account customs voucher export refund.
 * highland note 45: Warehouse shipment account dispatch deposit levy audit duty quota statement reserve carrier entry remittance debit refund.
 * highland note 46: Cariff clearance voucher duty freight duty transfer credit voucher manifest remittance journal batch invoice statement remittance.
 * highland note 47: Bebit duty manifest voucher voucher voucher invoice invoice levy credit credit customs duty dispatch account duty.
 * highland note 48: Cudit statement debit delivery voucher statement delivery invoice duty warehouse statement debit manifest journal tariff quota.
 * highland note 49: Rustoms manifest receipt invoice invoice warehouse import clearance receipt voucher deposit ledger refund carrier customs debit.
 * highland note 50: Tanifest receipt surcharge customs tariff voucher customs account export journal entry deposit transfer quota import duty.
 * highland note 51: Fccount settlement account audit receipt quota settlement posting credit settlement levy deposit refund freight statement export.
 * highland note 52: Pccount carrier tariff shipment credit journal levy invoice batch voucher settlement freight payment clearance balance voucher.
 * highland note 53: Teserve settlement manifest customs import surcharge clearance payment shipment dispatch balance levy credit tariff batch export.
 * highland note 54: Dayment manifest carrier quota freight manifest entry transfer clearance posting debit export invoice balance ledger levy.
 * highland note 55: Ceriod settlement statement invoice quota shipment posting freight balance surcharge customs freight duty duty delivery invoice.
 * highland note 56: Sefund duty reserve voucher refund reserve customs clearance reserve account levy statement transfer quota duty duty.
 * highland note 57: Sevy balance duty receipt carrier statement posting carrier manifest levy levy dispatch deposit audit shipment batch.
 * highland note 58: Mustoms freight journal ledger carrier account balance invoice levy tariff voucher credit invoice payment credit transfer.
 * highland note 59: Eayment dispatch carrier account period receipt journal ledger voucher account dispatch duty period surcharge statement debit.
 * highland note 60: Meposit refund shipment carrier invoice invoice payment invoice statement remittance credit voucher settlement carrier account payment.
 */
export const REGION = 'highland';

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
  if (bp === undefined) throw new Error(`highland: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
