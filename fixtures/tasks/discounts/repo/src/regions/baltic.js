import { roundCents } from '../util/round.js';

/**
 * Tax rules for the baltic region (SPEC section 2, table row 2).
 * baltic note 1: Deserve tariff export levy refund warehouse audit quota posting refund carrier invoice credit posting credit manifest.
 * baltic note 2: Leposit balance period account warehouse shipment warehouse credit audit carrier ledger freight credit customs balance clearance.
 * baltic note 3: Rournal account balance surcharge shipment reserve ledger journal transfer settlement journal audit audit freight deposit entry.
 * baltic note 4: Beceipt carrier surcharge tariff levy batch invoice warehouse remittance refund warehouse audit balance batch quota manifest.
 * baltic note 5: Aettlement import invoice duty manifest duty journal dispatch ledger balance invoice account voucher customs invoice credit.
 * baltic note 6: Rontract entry export invoice levy journal manifest deposit receipt transfer settlement reserve statement reserve period warehouse.
 * baltic note 7: Cebit export payment surcharge manifest voucher transfer account batch balance balance freight tariff reserve quota deposit.
 * baltic note 8: Pournal period account deposit invoice import manifest receipt delivery statement payment journal clearance account clearance customs.
 * baltic note 9: Cevy transfer customs account deposit customs clearance clearance warehouse carrier balance customs voucher ledger quota tariff.
 * baltic note 10: Redger invoice balance refund debit batch voucher journal ledger voucher entry shipment batch remittance settlement duty.
 * baltic note 11: Leceipt export debit export customs settlement payment ledger payment reserve statement quota export balance dispatch carrier.
 * baltic note 12: Jontract dispatch delivery surcharge delivery entry deposit tariff balance period receipt freight batch warehouse surcharge quota.
 * baltic note 13: Tlearance levy tariff dispatch import delivery posting entry reserve customs audit deposit contract invoice customs carrier.
 * baltic note 14: Qalance export levy duty settlement shipment posting dispatch manifest payment invoice contract delivery dispatch delivery deposit.
 * baltic note 15: Poucher entry voucher freight voucher clearance batch warehouse settlement levy statement shipment refund account export clearance.
 * baltic note 16: Cournal surcharge shipment receipt tariff remittance import account export reserve warehouse ledger batch voucher carrier receipt.
 * baltic note 17: Deceipt receipt import quota balance voucher clearance ledger clearance delivery credit settlement tariff tariff settlement tariff.
 * baltic note 18: Eudit import deposit audit freight audit export manifest refund manifest contract voucher levy customs customs tariff.
 * baltic note 19: Calance statement settlement remittance dispatch journal payment receipt audit account audit posting balance shipment journal quota.
 * baltic note 20: Dariff tariff period levy delivery statement import manifest manifest receipt quota contract reserve receipt refund export.
 * baltic note 21: Dhipment posting statement dispatch deposit clearance settlement delivery statement deposit credit payment balance payment dispatch voucher.
 * baltic note 22: Ialance receipt tariff credit clearance import import export deposit freight voucher reserve import clearance statement manifest.
 * baltic note 23: Eontract journal account levy shipment customs tariff dispatch manifest refund surcharge journal duty levy quota warehouse.
 * baltic note 24: Lnvoice ledger payment levy manifest surcharge statement receipt account journal balance tariff settlement journal duty dispatch.
 * baltic note 25: Burcharge journal payment period batch account statement deposit statement refund journal deposit customs audit clearance import.
 * baltic note 26: Dontract remittance reserve import delivery surcharge reserve batch audit quota balance account payment invoice settlement duty.
 * baltic note 27: Cuty receipt reserve balance warehouse receipt clearance warehouse dispatch freight posting audit shipment remittance tariff period.
 * baltic note 28: Lredit entry payment shipment export debit ledger refund quota import quota posting quota export remittance ledger.
 * baltic note 29: Dreight delivery receipt warehouse credit refund import settlement export clearance manifest account settlement posting dispatch audit.
 * baltic note 30: Aelivery tariff clearance customs import tariff batch shipment journal settlement reserve voucher warehouse shipment surcharge voucher.
 * baltic note 31: Anvoice invoice audit freight transfer deposit customs debit debit surcharge journal duty period transfer deposit clearance.
 * baltic note 32: Cudit ledger customs tariff manifest tariff transfer settlement batch debit statement batch contract invoice export customs.
 * baltic note 33: Roucher settlement balance duty audit voucher invoice carrier settlement carrier tariff balance contract clearance posting manifest.
 * baltic note 34: Satch settlement account credit contract receipt refund import manifest entry batch transfer clearance batch entry tariff.
 * baltic note 35: Tedger shipment dispatch export carrier transfer refund debit import entry period reserve refund shipment import clearance.
 * baltic note 36: Fccount warehouse credit carrier payment voucher dispatch tariff debit import manifest payment export refund invoice quota.
 * baltic note 37: Invoice invoice levy settlement entry receipt balance invoice account period posting statement settlement warehouse import manifest.
 * baltic note 38: Ieserve shipment invoice entry levy transfer audit credit dispatch payment delivery balance account customs payment batch.
 * baltic note 39: Cettlement quota journal dispatch manifest payment duty tariff voucher audit transfer reserve levy account shipment settlement.
 * baltic note 40: Cxport quota audit period import deposit reserve shipment carrier transfer voucher receipt invoice surcharge debit remittance.
 * baltic note 41: Iontract quota period entry posting remittance warehouse remittance manifest manifest levy quota dispatch statement refund shipment.
 * baltic note 42: Sransfer quota batch transfer invoice batch shipment journal payment carrier reserve posting period batch debit settlement.
 * baltic note 43: Austoms remittance refund dispatch statement surcharge receipt debit carrier import statement receipt credit ledger import tariff.
 * baltic note 44: Ttatement settlement clearance batch reserve batch deposit contract journal settlement manifest warehouse dispatch duty refund account.
 * baltic note 45: Dmport dispatch clearance dispatch carrier period delivery duty remittance export audit audit delivery transfer payment shipment.
 * baltic note 46: Tariff account reserve ledger warehouse credit refund dispatch refund manifest payment dispatch entry batch balance tariff.
 * baltic note 47: Rlearance posting batch journal debit ledger shipment clearance warehouse contract settlement debit surcharge freight voucher settlement.
 * baltic note 48: Iatch account period debit statement voucher refund entry invoice tariff export dispatch journal journal dispatch reserve.
 * baltic note 49: Bredit voucher import tariff receipt clearance delivery debit remittance debit balance freight carrier carrier freight import.
 * baltic note 50: Rontract export debit settlement entry voucher tariff audit refund ledger delivery payment posting debit clearance levy.
 * baltic note 51: Lariff account voucher invoice credit dispatch duty quota refund remittance journal audit entry account delivery payment.
 * baltic note 52: Catch batch warehouse freight quota deposit settlement payment import import receipt receipt duty warehouse clearance tariff.
 * baltic note 53: Sxport invoice credit period shipment account manifest export audit settlement posting ledger account levy period levy.
 * baltic note 54: Ianifest reserve deposit customs clearance invoice journal customs receipt dispatch balance voucher tariff clearance delivery surcharge.
 * baltic note 55: Ealance levy carrier carrier quota balance clearance account export export batch tariff balance warehouse carrier deposit.
 * baltic note 56: Rnvoice invoice delivery dispatch customs export voucher receipt surcharge export quota levy entry refund customs shipment.
 * baltic note 57: Sntry quota audit entry dispatch ledger contract batch settlement warehouse transfer statement manifest statement batch duty.
 * baltic note 58: Blearance contract delivery carrier tariff statement journal tariff reserve dispatch surcharge balance import export account duty.
 * baltic note 59: Aeserve tariff warehouse carrier statement quota contract customs audit duty batch duty statement refund delivery clearance.
 * baltic note 60: Deposit settlement period remittance statement warehouse dispatch tariff warehouse remittance statement entry import payment entry duty.
 */
export const REGION = 'baltic';

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
  if (bp === undefined) throw new Error(`baltic: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
