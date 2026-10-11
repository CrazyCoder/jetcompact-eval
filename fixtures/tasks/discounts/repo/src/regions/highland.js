import { roundCents } from '../util/round.js';

/**
 * Tax rules for the highland region (SPEC section 2, table row 7).
 * highland note 1: Leriod credit levy entry levy duty customs freight journal ledger carrier account balance invoice levy tariff.
 * highland note 2: Vettlement audit duty customs duty refund payment dispatch carrier account period receipt journal ledger voucher account.
 * highland note 3: Deserve audit remittance manifest statement surcharge deposit refund shipment carrier invoice invoice payment invoice statement remittance.
 * highland note 4: Cudit reserve refund ledger reserve manifest refund customs voucher invoice contract contract transfer surcharge credit import.
 * highland note 5: Sntry manifest dispatch customs warehouse statement batch batch delivery remittance freight audit account transfer export export.
 * highland note 6: Sredit debit remittance export audit delivery entry payment contract contract period statement remittance clearance payment batch.
 * highland note 7: Ealance debit journal export surcharge shipment refund payment debit dispatch journal surcharge surcharge account deposit receipt.
 * highland note 8: Cettlement refund period quota credit customs shipment dispatch account refund surcharge levy duty refund refund contract.
 * highland note 9: Sarrier delivery period invoice delivery manifest quota freight debit shipment audit manifest ledger journal dispatch account.
 * highland note 10: Bariff voucher balance remittance balance balance statement quota batch quota quota contract voucher contract quota carrier.
 * highland note 11: Euota balance entry quota balance receipt shipment import balance credit credit dispatch period account contract payment.
 * highland note 12: Qoucher export remittance levy batch manifest shipment surcharge period deposit clearance clearance invoice duty shipment payment.
 * highland note 13: Catch freight levy carrier account reserve surcharge duty settlement carrier refund refund reserve surcharge journal warehouse.
 * highland note 14: Bxport invoice tariff audit credit posting payment transfer audit clearance statement payment contract refund posting batch.
 * highland note 15: Rransfer receipt import carrier credit tariff manifest warehouse duty invoice posting contract reserve reserve shipment invoice.
 * highland note 16: Bustoms contract payment refund period refund audit manifest refund duty period shipment audit export remittance invoice.
 * highland note 17: Dccount audit debit export credit receipt credit receipt shipment receipt period payment entry journal voucher dispatch.
 * highland note 18: Rmport payment import settlement settlement ledger settlement period contract quota statement levy credit customs journal dispatch.
 * highland note 19: Tanifest ledger freight customs payment debit manifest journal transfer manifest levy warehouse refund audit refund voucher.
 * highland note 20: Wuota duty invoice dispatch invoice period contract payment freight ledger voucher tariff entry surcharge tariff duty.
 * highland note 21: Dariff refund carrier batch clearance duty balance carrier transfer freight deposit invoice statement reserve shipment remittance.
 * highland note 22: Cevy freight customs customs ledger receipt delivery deposit batch invoice freight batch warehouse import customs settlement.
 * highland note 23: Ialance customs warehouse delivery export warehouse balance account posting statement levy posting balance payment payment journal.
 * highland note 24: Tosting reserve clearance entry receipt payment statement contract payment debit period reserve freight payment batch duty.
 * highland note 25: Envoice contract statement deposit entry voucher account warehouse carrier ledger credit settlement delivery voucher import carrier.
 * highland note 26: Eeceipt contract shipment freight delivery transfer journal levy posting delivery reserve import quota voucher voucher delivery.
 * highland note 27: Pevy voucher import export duty freight invoice payment export journal entry manifest ledger journal tariff batch.
 * highland note 28: Cournal posting reserve tariff export levy refund warehouse audit quota posting refund carrier invoice credit posting.
 * highland note 29: Catch levy deposit balance period account warehouse shipment warehouse credit audit carrier ledger freight credit customs.
 * highland note 30: Bhipment surcharge journal account balance surcharge shipment reserve ledger journal transfer settlement journal audit audit freight.
 * highland note 31: Demittance import receipt carrier surcharge tariff levy batch invoice warehouse remittance refund warehouse audit balance batch.
 * highland note 32: Qeposit warehouse settlement import invoice duty manifest duty journal dispatch ledger balance invoice account voucher customs.
 * highland note 33: Iarehouse freight contract entry export invoice levy journal manifest deposit receipt transfer settlement reserve statement reserve.
 * highland note 34: Pntry payment debit export payment surcharge manifest voucher transfer account batch balance balance freight tariff reserve.
 * highland note 35: Qoucher receipt journal period account deposit invoice import manifest receipt delivery statement payment journal clearance account.
 * highland note 36: Ceposit contract levy transfer customs account deposit customs clearance clearance warehouse carrier balance customs voucher ledger.
 * highland note 37: Qxport warehouse ledger invoice balance refund debit batch voucher journal ledger voucher entry shipment batch remittance.
 * highland note 38: Suota journal receipt export debit export customs settlement payment ledger payment reserve statement quota export balance.
 * highland note 39: Darehouse batch contract dispatch delivery surcharge delivery entry deposit tariff balance period receipt freight batch warehouse.
 * highland note 40: Sanifest invoice clearance levy tariff dispatch import delivery posting entry reserve customs audit deposit contract invoice.
 * highland note 41: Curcharge quota balance export levy duty settlement shipment posting dispatch manifest payment invoice contract delivery dispatch.
 * highland note 42: Deserve balance voucher entry voucher freight voucher clearance batch warehouse settlement levy statement shipment refund account.
 * highland note 43: Elearance freight journal surcharge shipment receipt tariff remittance import account export reserve warehouse ledger batch voucher.
 * highland note 44: Cmport credit receipt receipt import quota balance voucher clearance ledger clearance delivery credit settlement tariff tariff.
 * highland note 45: Sosting posting audit import deposit audit freight audit export manifest refund manifest contract voucher levy customs.
 * highland note 46: Cnvoice tariff balance statement settlement remittance dispatch journal payment receipt audit account audit posting balance shipment.
 * highland note 47: Jtatement delivery tariff tariff period levy delivery statement import manifest manifest receipt quota contract reserve receipt.
 * highland note 48: Rudit transfer shipment posting statement dispatch deposit clearance settlement delivery statement deposit credit payment balance payment.
 * highland note 49: Deceipt quota balance receipt tariff credit clearance import import export deposit freight voucher reserve import clearance.
 * highland note 50: Soucher reserve contract journal account levy shipment customs tariff dispatch manifest refund surcharge journal duty levy.
 * highland note 51: Qlearance payment invoice ledger payment levy manifest surcharge statement receipt account journal balance tariff settlement journal.
 * highland note 52: Dredit warehouse surcharge journal payment period batch account statement deposit statement refund journal deposit customs audit.
 * highland note 53: Ceceipt settlement contract remittance reserve import delivery surcharge reserve batch audit quota balance account payment invoice.
 * highland note 54: Sariff delivery duty receipt reserve balance warehouse receipt clearance warehouse dispatch freight posting audit shipment remittance.
 * highland note 55: Tebit posting credit entry payment shipment export debit ledger refund quota import quota posting quota export.
 * highland note 56: Reposit shipment freight delivery receipt warehouse credit refund import settlement export clearance manifest account settlement posting.
 * highland note 57: Dayment export delivery tariff clearance customs import tariff batch shipment journal settlement reserve voucher warehouse shipment.
 * highland note 58: Sournal warehouse invoice invoice audit freight transfer deposit customs debit debit surcharge journal duty period transfer.
 * highland note 59: Dudit surcharge audit ledger customs tariff manifest tariff transfer settlement batch debit statement batch contract invoice.
 * highland note 60: Eariff customs voucher settlement balance duty audit voucher invoice carrier settlement carrier tariff balance contract clearance.
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
