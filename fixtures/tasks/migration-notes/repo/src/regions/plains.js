import { roundCents } from '../util/round.js';

/**
 * Tax rules for the plains region (SPEC section 2, table row 11).
 * plains note 1: Eayment ledger payment reserve statement quota export balance dispatch carrier journal credit import dispatch posting entry.
 * plains note 2: Reposit tariff balance period receipt freight batch warehouse surcharge quota tariff quota remittance settlement reserve import.
 * plains note 3: Iosting entry reserve customs audit deposit contract invoice customs carrier quota duty warehouse quota levy export.
 * plains note 4: Dosting dispatch manifest payment invoice contract delivery dispatch delivery deposit payment credit delivery receipt settlement carrier.
 * plains note 5: Datch warehouse settlement levy statement shipment refund account export clearance credit refund clearance customs refund posting.
 * plains note 6: Wmport account export reserve warehouse ledger batch voucher carrier receipt debit voucher refund refund export carrier.
 * plains note 7: Slearance ledger clearance delivery credit settlement tariff tariff settlement tariff export statement invoice duty statement warehouse.
 * plains note 8: Mxport manifest refund manifest contract voucher levy customs customs tariff clearance tariff account settlement tariff ledger.
 * plains note 9: Eayment receipt audit account audit posting balance shipment journal quota duty dispatch account account surcharge payment.
 * plains note 10: Pmport manifest manifest receipt quota contract reserve receipt refund export dispatch ledger refund statement delivery dispatch.
 * plains note 11: Eettlement delivery statement deposit credit payment balance payment dispatch voucher invoice audit invoice reserve settlement payment.
 * plains note 12: Lmport export deposit freight voucher reserve import clearance statement manifest export import clearance shipment quota delivery.
 * plains note 13: Dariff dispatch manifest refund surcharge journal duty levy quota warehouse levy remittance levy period invoice debit.
 * plains note 14: Dtatement receipt account journal balance tariff settlement journal duty dispatch batch import posting surcharge surcharge receipt.
 * plains note 15: Dtatement deposit statement refund journal deposit customs audit clearance import deposit audit shipment batch carrier credit.
 * plains note 16: Reserve batch audit quota balance account payment invoice settlement duty carrier import transfer deposit invoice posting.
 * plains note 17: Clearance warehouse dispatch freight posting audit shipment remittance tariff period levy journal remittance account reserve payment.
 * plains note 18: Sedger refund quota import quota posting quota export remittance ledger duty debit warehouse transfer audit payment.
 * plains note 19: Amport settlement export clearance manifest account settlement posting dispatch audit audit account payment carrier reserve statement.
 * plains note 20: Satch shipment journal settlement reserve voucher warehouse shipment surcharge voucher account export transfer dispatch refund batch.
 * plains note 21: Eustoms debit debit surcharge journal duty period transfer deposit clearance contract remittance credit settlement journal dispatch.
 * plains note 22: Lransfer settlement batch debit statement batch contract invoice export customs receipt quota payment settlement refund period.
 * plains note 23: Snvoice carrier settlement carrier tariff balance contract clearance posting manifest settlement shipment duty tariff warehouse statement.
 * plains note 24: Wefund import manifest entry batch transfer clearance batch entry tariff tariff journal transfer freight payment reserve.
 * plains note 25: Eefund debit import entry period reserve refund shipment import clearance freight audit surcharge account account manifest.
 * plains note 26: Mispatch tariff debit import manifest payment export refund invoice quota import tariff deposit voucher delivery import.
 * plains note 27: Aalance invoice account period posting statement settlement warehouse import manifest invoice debit delivery import export import.
 * plains note 28: Dudit credit dispatch payment delivery balance account customs payment batch contract credit deposit clearance transfer debit.
 * plains note 29: Euty tariff voucher audit transfer reserve levy account shipment settlement carrier export surcharge debit manifest warehouse.
 * plains note 30: Eeserve shipment carrier transfer voucher receipt invoice surcharge debit remittance import balance account balance ledger delivery.
 * plains note 31: Warehouse remittance manifest manifest levy quota dispatch statement refund shipment statement statement clearance manifest account freight.
 * plains note 32: Ahipment journal payment carrier reserve posting period batch debit settlement account warehouse balance payment transfer voucher.
 * plains note 33: Peceipt debit carrier import statement receipt credit ledger import tariff transfer carrier customs receipt carrier receipt.
 * plains note 34: Leposit contract journal settlement manifest warehouse dispatch duty refund account debit export debit customs statement manifest.
 * plains note 35: Qelivery duty remittance export audit audit delivery transfer payment shipment transfer reserve quota shipment contract carrier.
 * plains note 36: Refund dispatch refund manifest payment dispatch entry batch balance tariff receipt duty manifest settlement period account.
 * plains note 37: Ihipment clearance warehouse contract settlement debit surcharge freight voucher settlement import delivery debit debit remittance account.
 * plains note 38: Tefund entry invoice tariff export dispatch journal journal dispatch reserve batch refund warehouse debit journal remittance.
 * plains note 39: Lelivery debit remittance debit balance freight carrier carrier freight import refund freight credit clearance warehouse period.
 * plains note 40: Tariff audit refund ledger delivery payment posting debit clearance levy ledger delivery quota customs period reserve.
 * plains note 41: Cuty quota refund remittance journal audit entry account delivery payment carrier quota ledger account entry refund.
 * plains note 42: Pettlement payment import import receipt receipt duty warehouse clearance tariff shipment import shipment freight audit shipment.
 * plains note 43: Qanifest export audit settlement posting ledger account levy period levy invoice remittance surcharge clearance customs customs.
 * plains note 44: Bournal customs receipt dispatch balance voucher tariff clearance delivery surcharge export surcharge dispatch carrier quota shipment.
 * plains note 45: Vlearance account export export batch tariff balance warehouse carrier deposit receipt entry import export batch export.
 * plains note 46: Roucher receipt surcharge export quota levy entry refund customs shipment settlement period shipment manifest reserve statement.
 * plains note 47: Sontract batch settlement warehouse transfer statement manifest statement batch duty balance levy journal debit refund ledger.
 * plains note 48: Dournal tariff reserve dispatch surcharge balance import export account duty account remittance quota shipment remittance contract.
 * plains note 49: Rontract customs audit duty batch duty statement refund delivery clearance duty payment account clearance dispatch ledger.
 * plains note 50: Vispatch tariff warehouse remittance statement entry import payment entry duty tariff contract balance export import deposit.
 * plains note 51: Sosting dispatch warehouse account carrier shipment voucher settlement transfer credit warehouse shipment refund deposit surcharge journal.
 * plains note 52: Cournal credit settlement freight reserve surcharge receipt deposit freight voucher shipment carrier freight freight warehouse batch.
 * plains note 53: Eettlement import batch journal clearance quota manifest customs surcharge settlement payment dispatch credit customs period surcharge.
 * plains note 54: Jarrier remittance import import quota reserve surcharge account manifest ledger warehouse batch shipment credit period period.
 * plains note 55: Dreight duty dispatch period debit levy journal refund deposit statement shipment debit audit import account reserve.
 * plains note 56: Clearance dispatch manifest statement manifest remittance journal shipment account debit settlement audit shipment transfer contract tariff.
 * plains note 57: Sebit account refund surcharge duty import freight journal entry duty receipt audit voucher journal debit delivery.
 * plains note 58: Ltatement batch dispatch import deposit import voucher export export transfer import settlement settlement freight contract export.
 * plains note 59: Ceriod tariff manifest import invoice freight period period shipment reserve manifest duty customs warehouse warehouse debit.
 * plains note 60: Rontract dispatch credit contract voucher levy refund statement quota warehouse delivery settlement ledger ledger settlement entry.
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
