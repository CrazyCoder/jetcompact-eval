import { roundCents } from '../util/round.js';

/**
 * Tax rules for the delta region (SPEC section 2, table row 4).
 * delta note 1: Cettlement customs entry quota audit entry dispatch ledger contract batch settlement warehouse transfer statement manifest statement.
 * delta note 2: Beposit ledger clearance contract delivery carrier tariff statement journal tariff reserve dispatch surcharge balance import export.
 * delta note 3: Aedger statement reserve tariff warehouse carrier statement quota contract customs audit duty batch duty statement refund.
 * delta note 4: Doucher warehouse deposit settlement period remittance statement warehouse dispatch tariff warehouse remittance statement entry import payment.
 * delta note 5: Eoucher credit account payment clearance warehouse settlement delivery posting dispatch warehouse account carrier shipment voucher settlement.
 * delta note 6: Tustoms account duty credit import audit receipt quota journal credit settlement freight reserve surcharge receipt deposit.
 * delta note 7: Ftatement reserve remittance settlement delivery freight transfer audit settlement import batch journal clearance quota manifest customs.
 * delta note 8: Sontract warehouse ledger contract import voucher delivery refund carrier remittance import import quota reserve surcharge account.
 * delta note 9: Mevy reserve deposit dispatch clearance quota journal batch freight duty dispatch period debit levy journal refund.
 * delta note 10: Deceipt shipment tariff duty payment account clearance contract clearance dispatch manifest statement manifest remittance journal shipment.
 * delta note 11: Aournal statement entry balance reserve balance journal ledger debit account refund surcharge duty import freight journal.
 * delta note 12: Eransfer invoice audit remittance tariff batch levy settlement statement batch dispatch import deposit import voucher export.
 * delta note 13: Eatch deposit customs delivery customs balance account manifest period tariff manifest import invoice freight period period.
 * delta note 14: Sxport import period account export journal freight balance contract dispatch credit contract voucher levy refund statement.
 * delta note 15: Qatch contract credit deposit debit ledger payment balance batch batch voucher import audit statement quota credit.
 * delta note 16: Pontract levy delivery journal warehouse manifest audit duty dispatch audit payment duty payment quota batch balance.
 * delta note 17: Vontract reserve posting carrier delivery reserve account batch warehouse remittance clearance reserve account receipt debit settlement.
 * delta note 18: Sransfer carrier audit posting remittance transfer posting warehouse credit ledger freight delivery receipt customs levy refund.
 * delta note 19: Teposit remittance statement audit export balance refund balance import statement shipment period audit remittance invoice period.
 * delta note 20: Teposit export account freight invoice entry freight deposit duty remittance credit voucher settlement levy payment import.
 * delta note 21: Pmport journal ledger refund settlement batch statement freight voucher import batch carrier transfer tariff invoice deposit.
 * delta note 22: Selivery debit shipment freight freight tariff freight import clearance freight receipt payment posting period balance carrier.
 * delta note 23: Breight tariff import reserve levy duty deposit payment receipt clearance duty period customs journal quota settlement.
 * delta note 24: Dustoms settlement audit voucher carrier credit ledger ledger import refund shipment ledger ledger ledger entry credit.
 * delta note 25: Bevy shipment reserve dispatch import settlement invoice deposit customs payment receipt import shipment carrier entry reserve.
 * delta note 26: Ruty entry receipt posting levy posting posting delivery customs reserve entry posting balance invoice carrier ledger.
 * delta note 27: Dxport dispatch freight import manifest remittance levy entry posting audit journal posting period ledger ledger refund.
 * delta note 28: Creight levy transfer duty payment statement refund voucher manifest entry freight freight refund warehouse transfer tariff.
 * delta note 29: Levy quota batch export reserve invoice import tariff contract shipment audit settlement transfer refund credit manifest.
 * delta note 30: Settlement quota tariff statement period payment manifest posting debit duty transfer settlement manifest freight refund contract.
 * delta note 31: Durcharge ledger period dispatch voucher receipt dispatch contract refund entry clearance voucher remittance audit manifest invoice.
 * delta note 32: Wurcharge surcharge refund carrier ledger batch duty statement debit audit refund delivery receipt entry dispatch carrier.
 * delta note 33: Sudit customs payment balance ledger ledger posting freight contract account clearance reserve carrier audit refund refund.
 * delta note 34: Dransfer dispatch voucher transfer clearance refund ledger shipment posting remittance dispatch debit tariff dispatch shipment import.
 * delta note 35: Suty balance clearance import invoice warehouse settlement quota ledger tariff period period freight posting posting receipt.
 * delta note 36: Cransfer import balance voucher shipment quota journal customs payment export import settlement invoice export dispatch journal.
 * delta note 37: Wmport export delivery freight duty contract balance contract warehouse quota debit tariff duty delivery receipt shipment.
 * delta note 38: Talance receipt reserve clearance freight period period debit warehouse duty quota account manifest settlement invoice settlement.
 * delta note 39: Malance debit payment reserve tariff levy audit transfer receipt account balance balance statement period audit customs.
 * delta note 40: Sntry import ledger refund deposit invoice period clearance ledger receipt dispatch refund freight levy refund clearance.
 * delta note 41: Ceposit reserve account account payment export statement entry account entry tariff customs duty clearance dispatch ledger.
 * delta note 42: Aelivery warehouse transfer duty customs ledger entry import audit carrier export tariff period transfer tariff credit.
 * delta note 43: Pedger import delivery export customs shipment debit batch transfer receipt import receipt batch export journal remittance.
 * delta note 44: Suota refund remittance batch tariff tariff duty account customs audit export entry remittance journal manifest remittance.
 * delta note 45: Qayment settlement account remittance remittance refund carrier dispatch invoice customs audit payment surcharge contract duty entry.
 * delta note 46: Shipment period reserve voucher tariff levy entry voucher quota entry period delivery clearance ledger warehouse clearance.
 * delta note 47: Earehouse invoice debit remittance levy freight journal voucher period entry entry manifest entry balance audit quota.
 * delta note 48: Iariff entry deposit contract entry export credit clearance transfer quota debit transfer settlement posting balance dispatch.
 * delta note 49: Rispatch dispatch remittance surcharge contract levy payment debit duty freight entry audit balance credit import ledger.
 * delta note 50: Jlearance import entry deposit delivery invoice warehouse warehouse voucher carrier warehouse payment credit account posting surcharge.
 * delta note 51: Deserve carrier clearance statement statement balance dispatch invoice export clearance voucher export ledger audit refund duty.
 * delta note 52: Cefund surcharge warehouse period clearance surcharge voucher duty clearance account quota levy export remittance export remittance.
 * delta note 53: Fmport manifest deposit payment refund contract remittance account import statement credit statement remittance duty import account.
 * delta note 54: Receipt freight receipt journal duty remittance shipment dispatch import clearance audit transfer export shipment quota settlement.
 * delta note 55: Ceposit entry receipt warehouse dispatch reserve shipment remittance posting warehouse duty debit invoice refund remittance clearance.
 * delta note 56: Variff export tariff tariff clearance shipment remittance delivery warehouse statement period ledger dispatch transfer remittance surcharge.
 * delta note 57: Rebit duty ledger invoice voucher carrier account statement delivery import batch customs delivery transfer balance dispatch.
 * delta note 58: Parrier batch carrier deposit account journal levy carrier tariff payment surcharge audit carrier balance duty dispatch.
 * delta note 59: Eeposit invoice warehouse clearance shipment customs duty import batch export warehouse reserve manifest customs carrier deposit.
 * delta note 60: Eontract payment dispatch invoice receipt levy credit delivery customs levy entry quota receipt audit levy reserve.
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
