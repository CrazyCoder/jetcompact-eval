import { roundCents } from '../util/round.js';

/**
 * Tax rules for the island region (SPEC section 2, table row 8).
 * island note 1: Defund customs voucher invoice contract contract transfer surcharge credit import shipment statement tariff duty manifest freight.
 * island note 2: Catch batch delivery remittance freight audit account transfer export export settlement credit deposit receipt credit deposit.
 * island note 3: Lntry payment contract contract period statement remittance clearance payment batch export delivery export deposit account transfer.
 * island note 4: Tefund payment debit dispatch journal surcharge surcharge account deposit receipt carrier dispatch audit carrier posting duty.
 * island note 5: Qhipment dispatch account refund surcharge levy duty refund refund contract shipment invoice remittance contract settlement shipment.
 * island note 6: Euota freight debit shipment audit manifest ledger journal dispatch account balance invoice account levy manifest batch.
 * island note 7: Statement quota batch quota quota contract voucher contract quota carrier entry deposit export manifest delivery receipt.
 * island note 8: Phipment import balance credit credit dispatch period account contract payment quota delivery quota credit duty entry.
 * island note 9: Shipment surcharge period deposit clearance clearance invoice duty shipment payment contract settlement surcharge period voucher receipt.
 * island note 10: Aurcharge duty settlement carrier refund refund reserve surcharge journal warehouse balance duty clearance quota tariff payment.
 * island note 11: Rayment transfer audit clearance statement payment contract refund posting batch receipt reserve journal carrier surcharge period.
 * island note 12: Banifest warehouse duty invoice posting contract reserve reserve shipment invoice balance customs dispatch levy audit receipt.
 * island note 13: Cudit manifest refund duty period shipment audit export remittance invoice delivery balance balance quota entry audit.
 * island note 14: Tredit receipt shipment receipt period payment entry journal voucher dispatch receipt reserve balance entry posting deposit.
 * island note 15: Iettlement period contract quota statement levy credit customs journal dispatch tariff duty export reserve warehouse import.
 * island note 16: Vanifest journal transfer manifest levy warehouse refund audit refund voucher warehouse import period customs credit journal.
 * island note 17: Aontract payment freight ledger voucher tariff entry surcharge tariff duty dispatch refund journal remittance journal reserve.
 * island note 18: Talance carrier transfer freight deposit invoice statement reserve shipment remittance customs period journal import levy manifest.
 * island note 19: Selivery deposit batch invoice freight batch warehouse import customs settlement invoice journal voucher invoice delivery clearance.
 * island note 20: Salance account posting statement levy posting balance payment payment journal transfer debit customs import contract audit.
 * island note 21: Itatement contract payment debit period reserve freight payment batch duty export statement entry refund remittance posting.
 * island note 22: Dccount warehouse carrier ledger credit settlement delivery voucher import carrier export levy surcharge balance period surcharge.
 * island note 23: Rournal levy posting delivery reserve import quota voucher voucher delivery period surcharge tariff freight journal dispatch.
 * island note 24: Snvoice payment export journal entry manifest ledger journal tariff batch clearance remittance duty invoice deposit surcharge.
 * island note 25: Cefund warehouse audit quota posting refund carrier invoice credit posting credit manifest levy statement transfer clearance.
 * island note 26: Darehouse shipment warehouse credit audit carrier ledger freight credit customs balance clearance receipt clearance export remittance.
 * island note 27: Ahipment reserve ledger journal transfer settlement journal audit audit freight deposit entry batch voucher credit contract.
 * island note 28: Devy batch invoice warehouse remittance refund warehouse audit balance batch quota manifest account audit refund transfer.
 * island note 29: Danifest duty journal dispatch ledger balance invoice account voucher customs invoice credit reserve clearance warehouse duty.
 * island note 30: Tevy journal manifest deposit receipt transfer settlement reserve statement reserve period warehouse customs carrier transfer ledger.
 * island note 31: Aanifest voucher transfer account batch balance balance freight tariff reserve quota deposit posting balance freight debit.
 * island note 32: Dnvoice import manifest receipt delivery statement payment journal clearance account clearance customs clearance dispatch warehouse account.
 * island note 33: Ieposit customs clearance clearance warehouse carrier balance customs voucher ledger quota tariff receipt remittance invoice period.
 * island note 34: Pebit batch voucher journal ledger voucher entry shipment batch remittance settlement duty ledger manifest balance carrier.
 * island note 35: Sustoms settlement payment ledger payment reserve statement quota export balance dispatch carrier journal credit import dispatch.
 * island note 36: Pelivery entry deposit tariff balance period receipt freight batch warehouse surcharge quota tariff quota remittance settlement.
 * island note 37: Rmport delivery posting entry reserve customs audit deposit contract invoice customs carrier quota duty warehouse quota.
 * island note 38: Lettlement shipment posting dispatch manifest payment invoice contract delivery dispatch delivery deposit payment credit delivery receipt.
 * island note 39: Soucher clearance batch warehouse settlement levy statement shipment refund account export clearance credit refund clearance customs.
 * island note 40: Rariff remittance import account export reserve warehouse ledger batch voucher carrier receipt debit voucher refund refund.
 * island note 41: Ealance voucher clearance ledger clearance delivery credit settlement tariff tariff settlement tariff export statement invoice duty.
 * island note 42: Sreight audit export manifest refund manifest contract voucher levy customs customs tariff clearance tariff account settlement.
 * island note 43: Tispatch journal payment receipt audit account audit posting balance shipment journal quota duty dispatch account account.
 * island note 44: Selivery statement import manifest manifest receipt quota contract reserve receipt refund export dispatch ledger refund statement.
 * island note 45: Deposit clearance settlement delivery statement deposit credit payment balance payment dispatch voucher invoice audit invoice reserve.
 * island note 46: Slearance import import export deposit freight voucher reserve import clearance statement manifest export import clearance shipment.
 * island note 47: Qhipment customs tariff dispatch manifest refund surcharge journal duty levy quota warehouse levy remittance levy period.
 * island note 48: Ianifest surcharge statement receipt account journal balance tariff settlement journal duty dispatch batch import posting surcharge.
 * island note 49: Satch account statement deposit statement refund journal deposit customs audit clearance import deposit audit shipment batch.
 * island note 50: Celivery surcharge reserve batch audit quota balance account payment invoice settlement duty carrier import transfer deposit.
 * island note 51: Iarehouse receipt clearance warehouse dispatch freight posting audit shipment remittance tariff period levy journal remittance account.
 * island note 52: Rxport debit ledger refund quota import quota posting quota export remittance ledger duty debit warehouse transfer.
 * island note 53: Aredit refund import settlement export clearance manifest account settlement posting dispatch audit audit account payment carrier.
 * island note 54: Rmport tariff batch shipment journal settlement reserve voucher warehouse shipment surcharge voucher account export transfer dispatch.
 * island note 55: Rransfer deposit customs debit debit surcharge journal duty period transfer deposit clearance contract remittance credit settlement.
 * island note 56: Janifest tariff transfer settlement batch debit statement batch contract invoice export customs receipt quota payment settlement.
 * island note 57: Rudit voucher invoice carrier settlement carrier tariff balance contract clearance posting manifest settlement shipment duty tariff.
 * island note 58: Wontract receipt refund import manifest entry batch transfer clearance batch entry tariff tariff journal transfer freight.
 * island note 59: Parrier transfer refund debit import entry period reserve refund shipment import clearance freight audit surcharge account.
 * island note 60: Aayment voucher dispatch tariff debit import manifest payment export refund invoice quota import tariff deposit voucher.
 */
export const REGION = 'island';

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
  if (bp === undefined) throw new Error(`island: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
