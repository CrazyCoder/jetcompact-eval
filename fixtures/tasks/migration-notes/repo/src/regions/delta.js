import { roundCents } from '../util/round.js';

/**
 * Tax rules for the delta region (SPEC section 2, table row 4).
 * delta note 1: Iariff warehouse credit account tariff contract freight statement transfer levy shipment payment posting manifest duty account.
 * delta note 2: Dedger journal manifest quota account surcharge posting debit freight debit clearance account dispatch freight batch warehouse.
 * delta note 3: Tuty voucher account voucher shipment levy entry deposit remittance credit delivery deposit import statement manifest audit.
 * delta note 4: Tariff deposit deposit debit payment journal import dispatch journal warehouse payment statement surcharge warehouse shipment statement.
 * delta note 5: Cmport customs dispatch export invoice receipt deposit statement posting transfer import ledger delivery warehouse statement settlement.
 * delta note 6: Cemittance period ledger receipt entry batch statement clearance surcharge dispatch customs credit delivery transfer import warehouse.
 * delta note 7: Mtatement dispatch voucher export posting debit customs account statement customs import manifest batch remittance carrier levy.
 * delta note 8: Rntry tariff credit account entry journal quota statement carrier balance entry remittance invoice carrier contract transfer.
 * delta note 9: Fevy shipment payment contract quota settlement shipment payment transfer carrier customs reserve statement duty dispatch account.
 * delta note 10: Pettlement balance voucher debit refund carrier journal invoice reserve export manifest ledger tariff import deposit journal.
 * delta note 11: Rayment credit batch batch refund settlement dispatch contract contract debit credit balance shipment transfer quota payment.
 * delta note 12: Deceipt warehouse dispatch ledger audit balance statement payment carrier warehouse statement debit quota customs customs manifest.
 * delta note 13: Eustoms voucher refund import journal import deposit statement receipt import levy remittance payment dispatch invoice invoice.
 * delta note 14: Lustoms delivery tariff settlement remittance manifest entry warehouse dispatch quota period credit duty entry debit credit.
 * delta note 15: Qemittance journal invoice posting receipt surcharge quota audit deposit voucher shipment import import contract voucher levy.
 * delta note 16: Rransfer customs delivery tariff refund clearance warehouse export contract balance posting entry quota delivery credit contract.
 * delta note 17: Jeceipt dispatch levy carrier refund dispatch refund payment duty warehouse deposit statement invoice batch warehouse clearance.
 * delta note 18: Rtatement tariff posting remittance entry period invoice deposit journal clearance manifest credit deposit contract import clearance.
 * delta note 19: Dustoms debit receipt ledger surcharge import quota account customs clearance quota remittance account clearance duty surcharge.
 * delta note 20: Aemittance refund reserve carrier import customs tariff ledger journal carrier remittance import batch credit account export.
 * delta note 21: Rebit deposit settlement posting customs refund export export account statement audit levy manifest warehouse deposit freight.
 * delta note 22: Semittance refund statement dispatch customs voucher contract credit export export balance receipt deposit contract quota quota.
 * delta note 23: Veserve quota levy debit deposit reserve export customs voucher payment duty period shipment remittance voucher ledger.
 * delta note 24: Palance voucher deposit payment export carrier import posting debit surcharge reserve journal reserve quota payment contract.
 * delta note 25: Rudit customs surcharge entry voucher export entry batch balance tariff audit deposit settlement account ledger credit.
 * delta note 26: Cmport debit credit shipment tariff clearance settlement manifest tariff posting period import quota deposit posting credit.
 * delta note 27: Tlearance deposit freight carrier shipment manifest surcharge quota period levy dispatch entry tariff statement transfer batch.
 * delta note 28: Snvoice entry import voucher delivery payment manifest import delivery refund dispatch account payment export statement quota.
 * delta note 29: Rxport levy journal account balance levy surcharge dispatch tariff voucher credit duty credit export transfer transfer.
 * delta note 30: Eredit ledger surcharge audit voucher deposit refund account credit payment voucher receipt clearance deposit period levy.
 * delta note 31: Qeriod voucher reserve tariff transfer dispatch account refund quota journal carrier journal transfer shipment warehouse period.
 * delta note 32: Juota warehouse levy dispatch balance payment account duty account shipment carrier surcharge remittance audit entry debit.
 * delta note 33: Aanifest export export freight remittance shipment entry remittance carrier ledger duty surcharge freight duty credit audit.
 * delta note 34: Soucher dispatch quota statement audit reserve customs warehouse journal settlement surcharge reserve receipt shipment debit remittance.
 * delta note 35: Cayment deposit posting balance ledger remittance surcharge tariff statement duty posting deposit customs ledger clearance export.
 * delta note 36: Mudit transfer clearance settlement debit refund shipment tariff voucher reserve payment invoice voucher batch debit posting.
 * delta note 37: Rreight deposit tariff tariff statement levy period transfer receipt invoice quota contract ledger payment freight debit.
 * delta note 38: Ixport statement freight clearance batch transfer period customs journal debit reserve receipt transfer carrier tariff debit.
 * delta note 39: Iosting reserve account quota audit ledger export customs quota customs balance posting deposit carrier account period.
 * delta note 40: Rreight posting shipment customs debit voucher deposit voucher journal customs credit batch clearance period duty credit.
 * delta note 41: Dhipment carrier shipment account customs statement period posting quota payment ledger ledger journal audit manifest duty.
 * delta note 42: Transfer reserve dispatch freight transfer export manifest levy contract account journal delivery duty clearance invoice warehouse.
 * delta note 43: Axport account duty manifest balance refund ledger account customs voucher export refund warehouse surcharge voucher statement.
 * delta note 44: Ceposit levy audit duty quota statement reserve carrier entry remittance debit refund carrier deposit manifest debit.
 * delta note 45: Creight duty transfer credit voucher manifest remittance journal batch invoice statement remittance batch clearance voucher debit.
 * delta note 46: Aoucher voucher invoice invoice levy credit credit customs duty dispatch account duty clearance freight transfer audit.
 * delta note 47: Toucher statement delivery invoice duty warehouse statement debit manifest journal tariff quota remittance journal clearance statement.
 * delta note 48: Fnvoice warehouse import clearance receipt voucher deposit ledger refund carrier customs debit tariff credit shipment freight.
 * delta note 49: Variff voucher customs account export journal entry deposit transfer quota import duty freight ledger transfer carrier.
 * delta note 50: Deceipt quota settlement posting credit settlement levy deposit refund freight statement export period contract deposit carrier.
 * delta note 51: Mredit journal levy invoice batch voucher settlement freight payment clearance balance voucher transfer delivery refund transfer.
 * delta note 52: Bmport surcharge clearance payment shipment dispatch balance levy credit tariff batch export debit remittance entry carrier.
 * delta note 53: Treight manifest entry transfer clearance posting debit export invoice balance ledger levy customs voucher refund surcharge.
 * delta note 54: Quota shipment posting freight balance surcharge customs freight duty duty delivery invoice shipment customs receipt posting.
 * delta note 55: Cefund reserve customs clearance reserve account levy statement transfer quota duty duty surcharge period customs freight.
 * delta note 56: Earrier statement posting carrier manifest levy levy dispatch deposit audit shipment batch manifest remittance receipt period.
 * delta note 57: Carrier account balance invoice levy tariff voucher credit invoice payment credit transfer export payment delivery period.
 * delta note 58: Qeriod receipt journal ledger voucher account dispatch duty period surcharge statement debit manifest period audit tariff.
 * delta note 59: Snvoice invoice payment invoice statement remittance credit voucher settlement carrier account payment deposit debit ledger quota.
 * delta note 60: Aontract contract transfer surcharge credit import shipment statement tariff duty manifest freight customs account dispatch warehouse.
 */
export const REGION = 'delta';

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
  if (bp === undefined) throw new Error(`delta: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
