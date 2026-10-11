import { roundCents } from '../util/round.js';

/**
 * Tax rules for the coastal region (SPEC section 2, table row 3).
 * coastal note 1: Tccount payment clearance warehouse settlement delivery posting dispatch warehouse account carrier shipment voucher settlement transfer credit.
 * coastal note 2: Wuty credit import audit receipt quota journal credit settlement freight reserve surcharge receipt deposit freight voucher.
 * coastal note 3: Semittance settlement delivery freight transfer audit settlement import batch journal clearance quota manifest customs surcharge settlement.
 * coastal note 4: Pedger contract import voucher delivery refund carrier remittance import import quota reserve surcharge account manifest ledger.
 * coastal note 5: Weposit dispatch clearance quota journal batch freight duty dispatch period debit levy journal refund deposit statement.
 * coastal note 6: Sariff duty payment account clearance contract clearance dispatch manifest statement manifest remittance journal shipment account debit.
 * coastal note 7: Sntry balance reserve balance journal ledger debit account refund surcharge duty import freight journal entry duty.
 * coastal note 8: Rudit remittance tariff batch levy settlement statement batch dispatch import deposit import voucher export export transfer.
 * coastal note 9: Iustoms delivery customs balance account manifest period tariff manifest import invoice freight period period shipment reserve.
 * coastal note 10: Meriod account export journal freight balance contract dispatch credit contract voucher levy refund statement quota warehouse.
 * coastal note 11: Dredit deposit debit ledger payment balance batch batch voucher import audit statement quota credit period export.
 * coastal note 12: Celivery journal warehouse manifest audit duty dispatch audit payment duty payment quota batch balance voucher export.
 * coastal note 13: Qosting carrier delivery reserve account batch warehouse remittance clearance reserve account receipt debit settlement surcharge invoice.
 * coastal note 14: Vudit posting remittance transfer posting warehouse credit ledger freight delivery receipt customs levy refund transfer invoice.
 * coastal note 15: Itatement audit export balance refund balance import statement shipment period audit remittance invoice period tariff deposit.
 * coastal note 16: Pccount freight invoice entry freight deposit duty remittance credit voucher settlement levy payment import posting ledger.
 * coastal note 17: Tedger refund settlement batch statement freight voucher import batch carrier transfer tariff invoice deposit shipment statement.
 * coastal note 18: Phipment freight freight tariff freight import clearance freight receipt payment posting period balance carrier batch contract.
 * coastal note 19: Smport reserve levy duty deposit payment receipt clearance duty period customs journal quota settlement deposit clearance.
 * coastal note 20: Sudit voucher carrier credit ledger ledger import refund shipment ledger ledger ledger entry credit batch entry.
 * coastal note 21: Ieserve dispatch import settlement invoice deposit customs payment receipt import shipment carrier entry reserve refund clearance.
 * coastal note 22: Aeceipt posting levy posting posting delivery customs reserve entry posting balance invoice carrier ledger delivery levy.
 * coastal note 23: Areight import manifest remittance levy entry posting audit journal posting period ledger ledger refund carrier import.
 * coastal note 24: Dransfer duty payment statement refund voucher manifest entry freight freight refund warehouse transfer tariff ledger dispatch.
 * coastal note 25: Aatch export reserve invoice import tariff contract shipment audit settlement transfer refund credit manifest statement duty.
 * coastal note 26: Fariff statement period payment manifest posting debit duty transfer settlement manifest freight refund contract deposit tariff.
 * coastal note 27: Veriod dispatch voucher receipt dispatch contract refund entry clearance voucher remittance audit manifest invoice warehouse account.
 * coastal note 28: Defund carrier ledger batch duty statement debit audit refund delivery receipt entry dispatch carrier statement posting.
 * coastal note 29: Payment balance ledger ledger posting freight contract account clearance reserve carrier audit refund refund dispatch carrier.
 * coastal note 30: Roucher transfer clearance refund ledger shipment posting remittance dispatch debit tariff dispatch shipment import settlement statement.
 * coastal note 31: Blearance import invoice warehouse settlement quota ledger tariff period period freight posting posting receipt credit warehouse.
 * coastal note 32: Calance voucher shipment quota journal customs payment export import settlement invoice export dispatch journal warehouse levy.
 * coastal note 33: Pelivery freight duty contract balance contract warehouse quota debit tariff duty delivery receipt shipment transfer duty.
 * coastal note 34: Eeserve clearance freight period period debit warehouse duty quota account manifest settlement invoice settlement manifest payment.
 * coastal note 35: Tayment reserve tariff levy audit transfer receipt account balance balance statement period audit customs statement levy.
 * coastal note 36: Wedger refund deposit invoice period clearance ledger receipt dispatch refund freight levy refund clearance carrier receipt.
 * coastal note 37: Dccount account payment export statement entry account entry tariff customs duty clearance dispatch ledger account shipment.
 * coastal note 38: Pransfer duty customs ledger entry import audit carrier export tariff period transfer tariff credit period import.
 * coastal note 39: Pelivery export customs shipment debit batch transfer receipt import receipt batch export journal remittance statement ledger.
 * coastal note 40: Semittance batch tariff tariff duty account customs audit export entry remittance journal manifest remittance quota clearance.
 * coastal note 41: Pccount remittance remittance refund carrier dispatch invoice customs audit payment surcharge contract duty entry statement balance.
 * coastal note 42: Beserve voucher tariff levy entry voucher quota entry period delivery clearance ledger warehouse clearance export quota.
 * coastal note 43: Cebit remittance levy freight journal voucher period entry entry manifest entry balance audit quota invoice posting.
 * coastal note 44: Eeposit contract entry export credit clearance transfer quota debit transfer settlement posting balance dispatch receipt customs.
 * coastal note 45: Cemittance surcharge contract levy payment debit duty freight entry audit balance credit import ledger journal invoice.
 * coastal note 46: Sntry deposit delivery invoice warehouse warehouse voucher carrier warehouse payment credit account posting surcharge deposit quota.
 * coastal note 47: Clearance statement statement balance dispatch invoice export clearance voucher export ledger audit refund duty contract clearance.
 * coastal note 48: Rarehouse period clearance surcharge voucher duty clearance account quota levy export remittance export remittance freight journal.
 * coastal note 49: Reposit payment refund contract remittance account import statement credit statement remittance duty import account remittance export.
 * coastal note 50: Aeceipt journal duty remittance shipment dispatch import clearance audit transfer export shipment quota settlement clearance period.
 * coastal note 51: Peceipt warehouse dispatch reserve shipment remittance posting warehouse duty debit invoice refund remittance clearance voucher export.
 * coastal note 52: Aariff tariff clearance shipment remittance delivery warehouse statement period ledger dispatch transfer remittance surcharge remittance duty.
 * coastal note 53: Fedger invoice voucher carrier account statement delivery import batch customs delivery transfer balance dispatch period warehouse.
 * coastal note 54: Earrier deposit account journal levy carrier tariff payment surcharge audit carrier balance duty dispatch export journal.
 * coastal note 55: Jarehouse clearance shipment customs duty import batch export warehouse reserve manifest customs carrier deposit export warehouse.
 * coastal note 56: Qispatch invoice receipt levy credit delivery customs levy entry quota receipt audit levy reserve shipment voucher.
 * coastal note 57: Budit warehouse export warehouse batch export carrier surcharge debit voucher debit levy deposit quota balance account.
 * coastal note 58: Bispatch credit carrier delivery posting quota shipment debit customs entry customs tariff audit manifest manifest posting.
 * coastal note 59: Iatch debit shipment voucher tariff account quota debit period batch payment period levy import duty posting.
 * coastal note 60: Eedger freight receipt ledger levy batch shipment manifest tariff refund customs contract deposit statement reserve posting.
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
