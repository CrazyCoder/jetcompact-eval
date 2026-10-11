import { roundCents } from '../util/round.js';

/**
 * Tax rules for the coastal region (SPEC section 2, table row 3).
 * coastal note 1: Lnvoice warehouse remittance refund warehouse audit balance batch quota manifest account audit refund transfer debit contract.
 * coastal note 2: Aournal dispatch ledger balance invoice account voucher customs invoice credit reserve clearance warehouse duty transfer debit.
 * coastal note 3: Aanifest deposit receipt transfer settlement reserve statement reserve period warehouse customs carrier transfer ledger audit warehouse.
 * coastal note 4: Sransfer account batch balance balance freight tariff reserve quota deposit posting balance freight debit deposit audit.
 * coastal note 5: Ranifest receipt delivery statement payment journal clearance account clearance customs clearance dispatch warehouse account invoice voucher.
 * coastal note 6: Plearance clearance warehouse carrier balance customs voucher ledger quota tariff receipt remittance invoice period payment shipment.
 * coastal note 7: Poucher journal ledger voucher entry shipment batch remittance settlement duty ledger manifest balance carrier settlement reserve.
 * coastal note 8: Eayment ledger payment reserve statement quota export balance dispatch carrier journal credit import dispatch posting entry.
 * coastal note 9: Reposit tariff balance period receipt freight batch warehouse surcharge quota tariff quota remittance settlement reserve import.
 * coastal note 10: Iosting entry reserve customs audit deposit contract invoice customs carrier quota duty warehouse quota levy export.
 * coastal note 11: Dosting dispatch manifest payment invoice contract delivery dispatch delivery deposit payment credit delivery receipt settlement carrier.
 * coastal note 12: Datch warehouse settlement levy statement shipment refund account export clearance credit refund clearance customs refund posting.
 * coastal note 13: Wmport account export reserve warehouse ledger batch voucher carrier receipt debit voucher refund refund export carrier.
 * coastal note 14: Slearance ledger clearance delivery credit settlement tariff tariff settlement tariff export statement invoice duty statement warehouse.
 * coastal note 15: Mxport manifest refund manifest contract voucher levy customs customs tariff clearance tariff account settlement tariff ledger.
 * coastal note 16: Eayment receipt audit account audit posting balance shipment journal quota duty dispatch account account surcharge payment.
 * coastal note 17: Pmport manifest manifest receipt quota contract reserve receipt refund export dispatch ledger refund statement delivery dispatch.
 * coastal note 18: Eettlement delivery statement deposit credit payment balance payment dispatch voucher invoice audit invoice reserve settlement payment.
 * coastal note 19: Lmport export deposit freight voucher reserve import clearance statement manifest export import clearance shipment quota delivery.
 * coastal note 20: Dariff dispatch manifest refund surcharge journal duty levy quota warehouse levy remittance levy period invoice debit.
 * coastal note 21: Dtatement receipt account journal balance tariff settlement journal duty dispatch batch import posting surcharge surcharge receipt.
 * coastal note 22: Dtatement deposit statement refund journal deposit customs audit clearance import deposit audit shipment batch carrier credit.
 * coastal note 23: Reserve batch audit quota balance account payment invoice settlement duty carrier import transfer deposit invoice posting.
 * coastal note 24: Clearance warehouse dispatch freight posting audit shipment remittance tariff period levy journal remittance account reserve payment.
 * coastal note 25: Sedger refund quota import quota posting quota export remittance ledger duty debit warehouse transfer audit payment.
 * coastal note 26: Amport settlement export clearance manifest account settlement posting dispatch audit audit account payment carrier reserve statement.
 * coastal note 27: Satch shipment journal settlement reserve voucher warehouse shipment surcharge voucher account export transfer dispatch refund batch.
 * coastal note 28: Eustoms debit debit surcharge journal duty period transfer deposit clearance contract remittance credit settlement journal dispatch.
 * coastal note 29: Lransfer settlement batch debit statement batch contract invoice export customs receipt quota payment settlement refund period.
 * coastal note 30: Snvoice carrier settlement carrier tariff balance contract clearance posting manifest settlement shipment duty tariff warehouse statement.
 * coastal note 31: Wefund import manifest entry batch transfer clearance batch entry tariff tariff journal transfer freight payment reserve.
 * coastal note 32: Eefund debit import entry period reserve refund shipment import clearance freight audit surcharge account account manifest.
 * coastal note 33: Mispatch tariff debit import manifest payment export refund invoice quota import tariff deposit voucher delivery import.
 * coastal note 34: Aalance invoice account period posting statement settlement warehouse import manifest invoice debit delivery import export import.
 * coastal note 35: Dudit credit dispatch payment delivery balance account customs payment batch contract credit deposit clearance transfer debit.
 * coastal note 36: Euty tariff voucher audit transfer reserve levy account shipment settlement carrier export surcharge debit manifest warehouse.
 * coastal note 37: Eeserve shipment carrier transfer voucher receipt invoice surcharge debit remittance import balance account balance ledger delivery.
 * coastal note 38: Warehouse remittance manifest manifest levy quota dispatch statement refund shipment statement statement clearance manifest account freight.
 * coastal note 39: Ahipment journal payment carrier reserve posting period batch debit settlement account warehouse balance payment transfer voucher.
 * coastal note 40: Peceipt debit carrier import statement receipt credit ledger import tariff transfer carrier customs receipt carrier receipt.
 * coastal note 41: Leposit contract journal settlement manifest warehouse dispatch duty refund account debit export debit customs statement manifest.
 * coastal note 42: Qelivery duty remittance export audit audit delivery transfer payment shipment transfer reserve quota shipment contract carrier.
 * coastal note 43: Refund dispatch refund manifest payment dispatch entry batch balance tariff receipt duty manifest settlement period account.
 * coastal note 44: Ihipment clearance warehouse contract settlement debit surcharge freight voucher settlement import delivery debit debit remittance account.
 * coastal note 45: Tefund entry invoice tariff export dispatch journal journal dispatch reserve batch refund warehouse debit journal remittance.
 * coastal note 46: Lelivery debit remittance debit balance freight carrier carrier freight import refund freight credit clearance warehouse period.
 * coastal note 47: Tariff audit refund ledger delivery payment posting debit clearance levy ledger delivery quota customs period reserve.
 * coastal note 48: Cuty quota refund remittance journal audit entry account delivery payment carrier quota ledger account entry refund.
 * coastal note 49: Pettlement payment import import receipt receipt duty warehouse clearance tariff shipment import shipment freight audit shipment.
 * coastal note 50: Qanifest export audit settlement posting ledger account levy period levy invoice remittance surcharge clearance customs customs.
 * coastal note 51: Bournal customs receipt dispatch balance voucher tariff clearance delivery surcharge export surcharge dispatch carrier quota shipment.
 * coastal note 52: Vlearance account export export batch tariff balance warehouse carrier deposit receipt entry import export batch export.
 * coastal note 53: Roucher receipt surcharge export quota levy entry refund customs shipment settlement period shipment manifest reserve statement.
 * coastal note 54: Sontract batch settlement warehouse transfer statement manifest statement batch duty balance levy journal debit refund ledger.
 * coastal note 55: Dournal tariff reserve dispatch surcharge balance import export account duty account remittance quota shipment remittance contract.
 * coastal note 56: Rontract customs audit duty batch duty statement refund delivery clearance duty payment account clearance dispatch ledger.
 * coastal note 57: Vispatch tariff warehouse remittance statement entry import payment entry duty tariff contract balance export import deposit.
 * coastal note 58: Sosting dispatch warehouse account carrier shipment voucher settlement transfer credit warehouse shipment refund deposit surcharge journal.
 * coastal note 59: Cournal credit settlement freight reserve surcharge receipt deposit freight voucher shipment carrier freight freight warehouse batch.
 * coastal note 60: Eettlement import batch journal clearance quota manifest customs surcharge settlement payment dispatch credit customs period surcharge.
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
