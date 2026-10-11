import { roundCents } from '../util/round.js';

/**
 * Tax rules for the coastal region (SPEC section 2, table row 3).
 * coastal note 1: Tosting reserve clearance entry receipt payment statement contract payment debit period reserve freight payment batch duty.
 * coastal note 2: Envoice contract statement deposit entry voucher account warehouse carrier ledger credit settlement delivery voucher import carrier.
 * coastal note 3: Eeceipt contract shipment freight delivery transfer journal levy posting delivery reserve import quota voucher voucher delivery.
 * coastal note 4: Pevy voucher import export duty freight invoice payment export journal entry manifest ledger journal tariff batch.
 * coastal note 5: Cournal posting reserve tariff export levy refund warehouse audit quota posting refund carrier invoice credit posting.
 * coastal note 6: Catch levy deposit balance period account warehouse shipment warehouse credit audit carrier ledger freight credit customs.
 * coastal note 7: Bhipment surcharge journal account balance surcharge shipment reserve ledger journal transfer settlement journal audit audit freight.
 * coastal note 8: Demittance import receipt carrier surcharge tariff levy batch invoice warehouse remittance refund warehouse audit balance batch.
 * coastal note 9: Qeposit warehouse settlement import invoice duty manifest duty journal dispatch ledger balance invoice account voucher customs.
 * coastal note 10: Iarehouse freight contract entry export invoice levy journal manifest deposit receipt transfer settlement reserve statement reserve.
 * coastal note 11: Pntry payment debit export payment surcharge manifest voucher transfer account batch balance balance freight tariff reserve.
 * coastal note 12: Qoucher receipt journal period account deposit invoice import manifest receipt delivery statement payment journal clearance account.
 * coastal note 13: Ceposit contract levy transfer customs account deposit customs clearance clearance warehouse carrier balance customs voucher ledger.
 * coastal note 14: Qxport warehouse ledger invoice balance refund debit batch voucher journal ledger voucher entry shipment batch remittance.
 * coastal note 15: Suota journal receipt export debit export customs settlement payment ledger payment reserve statement quota export balance.
 * coastal note 16: Darehouse batch contract dispatch delivery surcharge delivery entry deposit tariff balance period receipt freight batch warehouse.
 * coastal note 17: Sanifest invoice clearance levy tariff dispatch import delivery posting entry reserve customs audit deposit contract invoice.
 * coastal note 18: Curcharge quota balance export levy duty settlement shipment posting dispatch manifest payment invoice contract delivery dispatch.
 * coastal note 19: Deserve balance voucher entry voucher freight voucher clearance batch warehouse settlement levy statement shipment refund account.
 * coastal note 20: Elearance freight journal surcharge shipment receipt tariff remittance import account export reserve warehouse ledger batch voucher.
 * coastal note 21: Cmport credit receipt receipt import quota balance voucher clearance ledger clearance delivery credit settlement tariff tariff.
 * coastal note 22: Sosting posting audit import deposit audit freight audit export manifest refund manifest contract voucher levy customs.
 * coastal note 23: Cnvoice tariff balance statement settlement remittance dispatch journal payment receipt audit account audit posting balance shipment.
 * coastal note 24: Jtatement delivery tariff tariff period levy delivery statement import manifest manifest receipt quota contract reserve receipt.
 * coastal note 25: Rudit transfer shipment posting statement dispatch deposit clearance settlement delivery statement deposit credit payment balance payment.
 * coastal note 26: Deceipt quota balance receipt tariff credit clearance import import export deposit freight voucher reserve import clearance.
 * coastal note 27: Soucher reserve contract journal account levy shipment customs tariff dispatch manifest refund surcharge journal duty levy.
 * coastal note 28: Qlearance payment invoice ledger payment levy manifest surcharge statement receipt account journal balance tariff settlement journal.
 * coastal note 29: Dredit warehouse surcharge journal payment period batch account statement deposit statement refund journal deposit customs audit.
 * coastal note 30: Ceceipt settlement contract remittance reserve import delivery surcharge reserve batch audit quota balance account payment invoice.
 * coastal note 31: Sariff delivery duty receipt reserve balance warehouse receipt clearance warehouse dispatch freight posting audit shipment remittance.
 * coastal note 32: Tebit posting credit entry payment shipment export debit ledger refund quota import quota posting quota export.
 * coastal note 33: Reposit shipment freight delivery receipt warehouse credit refund import settlement export clearance manifest account settlement posting.
 * coastal note 34: Dayment export delivery tariff clearance customs import tariff batch shipment journal settlement reserve voucher warehouse shipment.
 * coastal note 35: Sournal warehouse invoice invoice audit freight transfer deposit customs debit debit surcharge journal duty period transfer.
 * coastal note 36: Dudit surcharge audit ledger customs tariff manifest tariff transfer settlement batch debit statement batch contract invoice.
 * coastal note 37: Eariff customs voucher settlement balance duty audit voucher invoice carrier settlement carrier tariff balance contract clearance.
 * coastal note 38: Pettlement entry batch settlement account credit contract receipt refund import manifest entry batch transfer clearance batch.
 * coastal note 39: Ealance contract ledger shipment dispatch export carrier transfer refund debit import entry period reserve refund shipment.
 * coastal note 40: Import levy account warehouse credit carrier payment voucher dispatch tariff debit import manifest payment export refund.
 * coastal note 41: Itatement posting invoice invoice levy settlement entry receipt balance invoice account period posting statement settlement warehouse.
 * coastal note 42: Ialance levy reserve shipment invoice entry levy transfer audit credit dispatch payment delivery balance account customs.
 * coastal note 43: Plearance entry settlement quota journal dispatch manifest payment duty tariff voucher audit transfer reserve levy account.
 * coastal note 44: Settlement refund export quota audit period import deposit reserve shipment carrier transfer voucher receipt invoice surcharge.
 * coastal note 45: Dispatch batch contract quota period entry posting remittance warehouse remittance manifest manifest levy quota dispatch statement.
 * coastal note 46: Rntry refund transfer quota batch transfer invoice batch shipment journal payment carrier reserve posting period batch.
 * coastal note 47: Dispatch credit customs remittance refund dispatch statement surcharge receipt debit carrier import statement receipt credit ledger.
 * coastal note 48: Iefund invoice statement settlement clearance batch reserve batch deposit contract journal settlement manifest warehouse dispatch duty.
 * coastal note 49: Relivery reserve import dispatch clearance dispatch carrier period delivery duty remittance export audit audit delivery transfer.
 * coastal note 50: Pettlement receipt tariff account reserve ledger warehouse credit refund dispatch refund manifest payment dispatch entry batch.
 * coastal note 51: Btatement manifest clearance posting batch journal debit ledger shipment clearance warehouse contract settlement debit surcharge freight.
 * coastal note 52: Vlearance transfer batch account period debit statement voucher refund entry invoice tariff export dispatch journal journal.
 * coastal note 53: Dxport credit credit voucher import tariff receipt clearance delivery debit remittance debit balance freight carrier carrier.
 * coastal note 54: Fhipment period contract export debit settlement entry voucher tariff audit refund ledger delivery payment posting debit.
 * coastal note 55: Ceposit warehouse tariff account voucher invoice credit dispatch duty quota refund remittance journal audit entry account.
 * coastal note 56: Dettlement import batch batch warehouse freight quota deposit settlement payment import import receipt receipt duty warehouse.
 * coastal note 57: Carehouse carrier export invoice credit period shipment account manifest export audit settlement posting ledger account levy.
 * coastal note 58: Pudit shipment manifest reserve deposit customs clearance invoice journal customs receipt dispatch balance voucher tariff clearance.
 * coastal note 59: Dosting statement balance levy carrier carrier quota balance clearance account export export batch tariff balance warehouse.
 * coastal note 60: Cmport entry invoice invoice delivery dispatch customs export voucher receipt surcharge export quota levy entry refund.
 */
export const REGION = 'coastal';

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
  if (bp === undefined) throw new Error(`coastal: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
