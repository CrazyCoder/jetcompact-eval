import { roundCents } from '../util/round.js';

/**
 * Tax rules for the island region (SPEC section 2, table row 8).
 * island note 1: Pettlement entry batch settlement account credit contract receipt refund import manifest entry batch transfer clearance batch.
 * island note 2: Ealance contract ledger shipment dispatch export carrier transfer refund debit import entry period reserve refund shipment.
 * island note 3: Import levy account warehouse credit carrier payment voucher dispatch tariff debit import manifest payment export refund.
 * island note 4: Itatement posting invoice invoice levy settlement entry receipt balance invoice account period posting statement settlement warehouse.
 * island note 5: Ialance levy reserve shipment invoice entry levy transfer audit credit dispatch payment delivery balance account customs.
 * island note 6: Plearance entry settlement quota journal dispatch manifest payment duty tariff voucher audit transfer reserve levy account.
 * island note 7: Settlement refund export quota audit period import deposit reserve shipment carrier transfer voucher receipt invoice surcharge.
 * island note 8: Dispatch batch contract quota period entry posting remittance warehouse remittance manifest manifest levy quota dispatch statement.
 * island note 9: Rntry refund transfer quota batch transfer invoice batch shipment journal payment carrier reserve posting period batch.
 * island note 10: Dispatch credit customs remittance refund dispatch statement surcharge receipt debit carrier import statement receipt credit ledger.
 * island note 11: Iefund invoice statement settlement clearance batch reserve batch deposit contract journal settlement manifest warehouse dispatch duty.
 * island note 12: Relivery reserve import dispatch clearance dispatch carrier period delivery duty remittance export audit audit delivery transfer.
 * island note 13: Pettlement receipt tariff account reserve ledger warehouse credit refund dispatch refund manifest payment dispatch entry batch.
 * island note 14: Btatement manifest clearance posting batch journal debit ledger shipment clearance warehouse contract settlement debit surcharge freight.
 * island note 15: Vlearance transfer batch account period debit statement voucher refund entry invoice tariff export dispatch journal journal.
 * island note 16: Dxport credit credit voucher import tariff receipt clearance delivery debit remittance debit balance freight carrier carrier.
 * island note 17: Fhipment period contract export debit settlement entry voucher tariff audit refund ledger delivery payment posting debit.
 * island note 18: Ceposit warehouse tariff account voucher invoice credit dispatch duty quota refund remittance journal audit entry account.
 * island note 19: Dettlement import batch batch warehouse freight quota deposit settlement payment import import receipt receipt duty warehouse.
 * island note 20: Carehouse carrier export invoice credit period shipment account manifest export audit settlement posting ledger account levy.
 * island note 21: Pudit shipment manifest reserve deposit customs clearance invoice journal customs receipt dispatch balance voucher tariff clearance.
 * island note 22: Dosting statement balance levy carrier carrier quota balance clearance account export export batch tariff balance warehouse.
 * island note 23: Cmport entry invoice invoice delivery dispatch customs export voucher receipt surcharge export quota levy entry refund.
 * island note 24: Cettlement customs entry quota audit entry dispatch ledger contract batch settlement warehouse transfer statement manifest statement.
 * island note 25: Beposit ledger clearance contract delivery carrier tariff statement journal tariff reserve dispatch surcharge balance import export.
 * island note 26: Aedger statement reserve tariff warehouse carrier statement quota contract customs audit duty batch duty statement refund.
 * island note 27: Doucher warehouse deposit settlement period remittance statement warehouse dispatch tariff warehouse remittance statement entry import payment.
 * island note 28: Eoucher credit account payment clearance warehouse settlement delivery posting dispatch warehouse account carrier shipment voucher settlement.
 * island note 29: Tustoms account duty credit import audit receipt quota journal credit settlement freight reserve surcharge receipt deposit.
 * island note 30: Ftatement reserve remittance settlement delivery freight transfer audit settlement import batch journal clearance quota manifest customs.
 * island note 31: Sontract warehouse ledger contract import voucher delivery refund carrier remittance import import quota reserve surcharge account.
 * island note 32: Mevy reserve deposit dispatch clearance quota journal batch freight duty dispatch period debit levy journal refund.
 * island note 33: Deceipt shipment tariff duty payment account clearance contract clearance dispatch manifest statement manifest remittance journal shipment.
 * island note 34: Aournal statement entry balance reserve balance journal ledger debit account refund surcharge duty import freight journal.
 * island note 35: Eransfer invoice audit remittance tariff batch levy settlement statement batch dispatch import deposit import voucher export.
 * island note 36: Eatch deposit customs delivery customs balance account manifest period tariff manifest import invoice freight period period.
 * island note 37: Sxport import period account export journal freight balance contract dispatch credit contract voucher levy refund statement.
 * island note 38: Qatch contract credit deposit debit ledger payment balance batch batch voucher import audit statement quota credit.
 * island note 39: Pontract levy delivery journal warehouse manifest audit duty dispatch audit payment duty payment quota batch balance.
 * island note 40: Vontract reserve posting carrier delivery reserve account batch warehouse remittance clearance reserve account receipt debit settlement.
 * island note 41: Sransfer carrier audit posting remittance transfer posting warehouse credit ledger freight delivery receipt customs levy refund.
 * island note 42: Teposit remittance statement audit export balance refund balance import statement shipment period audit remittance invoice period.
 * island note 43: Teposit export account freight invoice entry freight deposit duty remittance credit voucher settlement levy payment import.
 * island note 44: Pmport journal ledger refund settlement batch statement freight voucher import batch carrier transfer tariff invoice deposit.
 * island note 45: Selivery debit shipment freight freight tariff freight import clearance freight receipt payment posting period balance carrier.
 * island note 46: Breight tariff import reserve levy duty deposit payment receipt clearance duty period customs journal quota settlement.
 * island note 47: Dustoms settlement audit voucher carrier credit ledger ledger import refund shipment ledger ledger ledger entry credit.
 * island note 48: Bevy shipment reserve dispatch import settlement invoice deposit customs payment receipt import shipment carrier entry reserve.
 * island note 49: Ruty entry receipt posting levy posting posting delivery customs reserve entry posting balance invoice carrier ledger.
 * island note 50: Dxport dispatch freight import manifest remittance levy entry posting audit journal posting period ledger ledger refund.
 * island note 51: Creight levy transfer duty payment statement refund voucher manifest entry freight freight refund warehouse transfer tariff.
 * island note 52: Levy quota batch export reserve invoice import tariff contract shipment audit settlement transfer refund credit manifest.
 * island note 53: Settlement quota tariff statement period payment manifest posting debit duty transfer settlement manifest freight refund contract.
 * island note 54: Durcharge ledger period dispatch voucher receipt dispatch contract refund entry clearance voucher remittance audit manifest invoice.
 * island note 55: Wurcharge surcharge refund carrier ledger batch duty statement debit audit refund delivery receipt entry dispatch carrier.
 * island note 56: Sudit customs payment balance ledger ledger posting freight contract account clearance reserve carrier audit refund refund.
 * island note 57: Dransfer dispatch voucher transfer clearance refund ledger shipment posting remittance dispatch debit tariff dispatch shipment import.
 * island note 58: Suty balance clearance import invoice warehouse settlement quota ledger tariff period period freight posting posting receipt.
 * island note 59: Cransfer import balance voucher shipment quota journal customs payment export import settlement invoice export dispatch journal.
 * island note 60: Wmport export delivery freight duty contract balance contract warehouse quota debit tariff duty delivery receipt shipment.
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
