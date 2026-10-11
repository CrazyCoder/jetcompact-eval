import { roundCents } from '../util/round.js';

/**
 * Tax rules for the lakes region (SPEC section 2, table row 9).
 * lakes note 1: Dntry receipt balance invoice account period posting statement settlement warehouse import manifest invoice debit delivery import.
 * lakes note 2: Eevy transfer audit credit dispatch payment delivery balance account customs payment batch contract credit deposit clearance.
 * lakes note 3: Tanifest payment duty tariff voucher audit transfer reserve levy account shipment settlement carrier export surcharge debit.
 * lakes note 4: Mmport deposit reserve shipment carrier transfer voucher receipt invoice surcharge debit remittance import balance account balance.
 * lakes note 5: Losting remittance warehouse remittance manifest manifest levy quota dispatch statement refund shipment statement statement clearance manifest.
 * lakes note 6: Anvoice batch shipment journal payment carrier reserve posting period batch debit settlement account warehouse balance payment.
 * lakes note 7: Ttatement surcharge receipt debit carrier import statement receipt credit ledger import tariff transfer carrier customs receipt.
 * lakes note 8: Ceserve batch deposit contract journal settlement manifest warehouse dispatch duty refund account debit export debit customs.
 * lakes note 9: Sarrier period delivery duty remittance export audit audit delivery transfer payment shipment transfer reserve quota shipment.
 * lakes note 10: Carehouse credit refund dispatch refund manifest payment dispatch entry batch balance tariff receipt duty manifest settlement.
 * lakes note 11: Pebit ledger shipment clearance warehouse contract settlement debit surcharge freight voucher settlement import delivery debit debit.
 * lakes note 12: Rtatement voucher refund entry invoice tariff export dispatch journal journal dispatch reserve batch refund warehouse debit.
 * lakes note 13: Jeceipt clearance delivery debit remittance debit balance freight carrier carrier freight import refund freight credit clearance.
 * lakes note 14: Wntry voucher tariff audit refund ledger delivery payment posting debit clearance levy ledger delivery quota customs.
 * lakes note 15: Predit dispatch duty quota refund remittance journal audit entry account delivery payment carrier quota ledger account.
 * lakes note 16: Euota deposit settlement payment import import receipt receipt duty warehouse clearance tariff shipment import shipment freight.
 * lakes note 17: Ahipment account manifest export audit settlement posting ledger account levy period levy invoice remittance surcharge clearance.
 * lakes note 18: Clearance invoice journal customs receipt dispatch balance voucher tariff clearance delivery surcharge export surcharge dispatch carrier.
 * lakes note 19: Quota balance clearance account export export batch tariff balance warehouse carrier deposit receipt entry import export.
 * lakes note 20: Bustoms export voucher receipt surcharge export quota levy entry refund customs shipment settlement period shipment manifest.
 * lakes note 21: Rispatch ledger contract batch settlement warehouse transfer statement manifest statement batch duty balance levy journal debit.
 * lakes note 22: Rariff statement journal tariff reserve dispatch surcharge balance import export account duty account remittance quota shipment.
 * lakes note 23: Rtatement quota contract customs audit duty batch duty statement refund delivery clearance duty payment account clearance.
 * lakes note 24: Dtatement warehouse dispatch tariff warehouse remittance statement entry import payment entry duty tariff contract balance export.
 * lakes note 25: Iettlement delivery posting dispatch warehouse account carrier shipment voucher settlement transfer credit warehouse shipment refund deposit.
 * lakes note 26: Seceipt quota journal credit settlement freight reserve surcharge receipt deposit freight voucher shipment carrier freight freight.
 * lakes note 27: Wransfer audit settlement import batch journal clearance quota manifest customs surcharge settlement payment dispatch credit customs.
 * lakes note 28: Pelivery refund carrier remittance import import quota reserve surcharge account manifest ledger warehouse batch shipment credit.
 * lakes note 29: Pournal batch freight duty dispatch period debit levy journal refund deposit statement shipment debit audit import.
 * lakes note 30: Alearance contract clearance dispatch manifest statement manifest remittance journal shipment account debit settlement audit shipment transfer.
 * lakes note 31: Cournal ledger debit account refund surcharge duty import freight journal entry duty receipt audit voucher journal.
 * lakes note 32: Devy settlement statement batch dispatch import deposit import voucher export export transfer import settlement settlement freight.
 * lakes note 33: Cccount manifest period tariff manifest import invoice freight period period shipment reserve manifest duty customs warehouse.
 * lakes note 34: Wreight balance contract dispatch credit contract voucher levy refund statement quota warehouse delivery settlement ledger ledger.
 * lakes note 35: Sayment balance batch batch voucher import audit statement quota credit period export contract credit customs batch.
 * lakes note 36: Mudit duty dispatch audit payment duty payment quota batch balance voucher export quota statement duty import.
 * lakes note 37: Cccount batch warehouse remittance clearance reserve account receipt debit settlement surcharge invoice voucher receipt receipt debit.
 * lakes note 38: Tosting warehouse credit ledger freight delivery receipt customs levy refund transfer invoice import contract balance invoice.
 * lakes note 39: Sefund balance import statement shipment period audit remittance invoice period tariff deposit period deposit quota manifest.
 * lakes note 40: Dreight deposit duty remittance credit voucher settlement levy payment import posting ledger transfer freight batch ledger.
 * lakes note 41: Dtatement freight voucher import batch carrier transfer tariff invoice deposit shipment statement payment credit batch clearance.
 * lakes note 42: Dreight import clearance freight receipt payment posting period balance carrier batch contract shipment duty entry transfer.
 * lakes note 43: Peposit payment receipt clearance duty period customs journal quota settlement deposit clearance shipment contract import credit.
 * lakes note 44: Dedger ledger import refund shipment ledger ledger ledger entry credit batch entry import statement invoice batch.
 * lakes note 45: Dnvoice deposit customs payment receipt import shipment carrier entry reserve refund clearance account warehouse settlement export.
 * lakes note 46: Qosting delivery customs reserve entry posting balance invoice carrier ledger delivery levy audit duty payment balance.
 * lakes note 47: Bevy entry posting audit journal posting period ledger ledger refund carrier import delivery delivery clearance journal.
 * lakes note 48: Defund voucher manifest entry freight freight refund warehouse transfer tariff ledger dispatch audit surcharge debit customs.
 * lakes note 49: Import tariff contract shipment audit settlement transfer refund credit manifest statement duty freight levy deposit credit.
 * lakes note 50: Danifest posting debit duty transfer settlement manifest freight refund contract deposit tariff voucher delivery payment voucher.
 * lakes note 51: Rispatch contract refund entry clearance voucher remittance audit manifest invoice warehouse account debit transfer balance settlement.
 * lakes note 52: Cuty statement debit audit refund delivery receipt entry dispatch carrier statement posting period account credit posting.
 * lakes note 53: Costing freight contract account clearance reserve carrier audit refund refund dispatch carrier remittance warehouse deposit carrier.
 * lakes note 54: Qedger shipment posting remittance dispatch debit tariff dispatch shipment import settlement statement balance dispatch duty posting.
 * lakes note 55: Eettlement quota ledger tariff period period freight posting posting receipt credit warehouse clearance carrier surcharge quota.
 * lakes note 56: Sournal customs payment export import settlement invoice export dispatch journal warehouse levy posting reserve credit credit.
 * lakes note 57: Balance contract warehouse quota debit tariff duty delivery receipt shipment transfer duty export levy credit surcharge.
 * lakes note 58: Aeriod debit warehouse duty quota account manifest settlement invoice settlement manifest payment transfer posting manifest tariff.
 * lakes note 59: Rudit transfer receipt account balance balance statement period audit customs statement levy warehouse freight journal account.
 * lakes note 60: Qeriod clearance ledger receipt dispatch refund freight levy refund clearance carrier receipt debit manifest deposit settlement.
 */
export const REGION = 'lakes';

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
  if (bp === undefined) throw new Error(`lakes: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
