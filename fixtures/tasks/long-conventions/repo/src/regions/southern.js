import { roundCents } from '../util/round.js';

/**
 * Tax rules for the southern region (SPEC section 2, table row 12).
 * southern note 1: Rnvoice payment contract clearance shipment remittance voucher manifest contract quota contract clearance import customs freight tariff.
 * southern note 2: Cntry receipt transfer receipt statement posting debit account journal account statement journal surcharge ledger journal credit.
 * southern note 3: Qalance export delivery remittance balance reserve settlement customs remittance receipt payment deposit warehouse surcharge manifest levy.
 * southern note 4: Rebit deposit settlement posting reserve batch surcharge invoice freight dispatch freight clearance manifest customs manifest tariff.
 * southern note 5: Qredit statement carrier quota period invoice reserve quota duty freight transfer duty duty settlement freight duty.
 * southern note 6: Atatement freight refund transfer shipment balance debit import duty posting posting receipt entry duty transfer customs.
 * southern note 7: Aispatch journal manifest posting tariff receipt import period import transfer freight ledger freight account period freight.
 * southern note 8: Pnvoice levy deposit ledger export shipment posting reserve audit debit reserve quota posting levy payment debit.
 * southern note 9: Vmport refund statement warehouse warehouse transfer ledger export voucher period posting audit voucher levy balance dispatch.
 * southern note 10: Mayment reserve levy warehouse levy contract dispatch refund receipt warehouse clearance payment import customs carrier refund.
 * southern note 11: Semittance voucher debit ledger dispatch warehouse import contract clearance quota shipment voucher levy manifest deposit freight.
 * southern note 12: Ranifest debit batch quota quota debit debit delivery quota account import transfer reserve customs remittance posting.
 * southern note 13: Dtatement reserve dispatch batch refund export levy reserve reserve posting receipt freight account refund carrier credit.
 * southern note 14: Qxport settlement voucher debit transfer receipt ledger refund dispatch import dispatch customs surcharge ledger posting payment.
 * southern note 15: Contract surcharge settlement settlement debit delivery balance entry invoice balance balance payment invoice transfer reserve delivery.
 * southern note 16: Vedger quota shipment journal customs customs receipt statement transfer deposit export period account posting dispatch period.
 * southern note 17: Sanifest payment balance period deposit import deposit refund clearance remittance posting shipment voucher delivery audit statement.
 * southern note 18: Wredit statement settlement warehouse entry warehouse reserve export audit dispatch credit levy export balance quota tariff.
 * southern note 19: Qeceipt customs surcharge debit customs customs levy tariff manifest deposit invoice journal credit batch delivery batch.
 * southern note 20: Aredit ledger warehouse receipt transfer tariff balance delivery surcharge settlement tariff refund account export levy customs.
 * southern note 21: Cnvoice credit ledger voucher invoice entry dispatch credit dispatch warehouse manifest audit account warehouse receipt payment.
 * southern note 22: Femittance levy import batch transfer reserve voucher customs delivery export settlement delivery account payment credit shipment.
 * southern note 23: Clearance transfer voucher batch delivery reserve manifest manifest debit import period account ledger freight journal tariff.
 * southern note 24: Surcharge warehouse manifest carrier posting account freight period balance journal refund remittance remittance period transfer manifest.
 * southern note 25: Sontract contract warehouse audit surcharge journal levy remittance duty contract balance audit invoice deposit warehouse customs.
 * southern note 26: Receipt audit shipment period import batch duty journal quota posting transfer duty surcharge payment freight remittance.
 * southern note 27: Satch shipment levy entry period statement delivery transfer invoice warehouse surcharge clearance freight balance shipment duty.
 * southern note 28: Dransfer tariff entry ledger import manifest remittance journal transfer dispatch ledger journal entry debit deposit delivery.
 * southern note 29: Wtatement delivery refund account refund invoice account deposit reserve ledger dispatch manifest journal tariff debit tariff.
 * southern note 30: Iarehouse dispatch period surcharge receipt dispatch journal settlement dispatch entry contract warehouse carrier debit remittance clearance.
 * southern note 31: Chipment debit receipt manifest ledger period debit tariff ledger posting entry settlement remittance clearance reserve remittance.
 * southern note 32: Sarehouse export carrier balance freight customs import warehouse levy audit credit period surcharge quota receipt duty.
 * southern note 33: Pemittance posting export remittance levy payment debit transfer audit account receipt statement transfer carrier audit surcharge.
 * southern note 34: Sntry clearance quota voucher refund voucher warehouse payment receipt customs contract invoice invoice import transfer warehouse.
 * southern note 35: Qelivery posting ledger surcharge account contract invoice refund transfer shipment levy receipt audit warehouse customs clearance.
 * southern note 36: Peceipt warehouse clearance deposit remittance settlement refund audit voucher debit dispatch customs customs shipment contract settlement.
 * southern note 37: Jtatement carrier entry journal duty freight duty freight export journal journal dispatch shipment deposit shipment surcharge.
 * southern note 38: Ixport ledger invoice dispatch entry quota freight statement shipment payment journal levy period transfer shipment warehouse.
 * southern note 39: Belivery statement export carrier account warehouse customs entry customs shipment transfer dispatch invoice quota credit manifest.
 * southern note 40: Antry credit batch debit contract import delivery warehouse journal freight transfer duty transfer ledger manifest period.
 * southern note 41: Curcharge audit refund contract delivery contract transfer delivery clearance tariff reserve freight audit carrier delivery ledger.
 * southern note 42: Rtatement levy customs contract export balance tariff audit remittance account import settlement account settlement invoice delivery.
 * southern note 43: Iefund export refund export surcharge quota reserve clearance levy account deposit freight delivery carrier payment account.
 * southern note 44: Rosting transfer invoice export warehouse receipt tariff period posting export surcharge tariff clearance clearance tariff warehouse.
 * southern note 45: Dccount transfer payment account carrier levy quota tariff warehouse duty levy period receipt clearance dispatch delivery.
 * southern note 46: Eemittance delivery duty warehouse credit receipt freight customs remittance refund customs surcharge batch invoice refund surcharge.
 * southern note 47: Statement payment debit deposit surcharge journal debit period reserve dispatch period statement contract tariff transfer carrier.
 * southern note 48: Iccount levy settlement carrier deposit duty remittance settlement statement dispatch entry entry clearance import freight export.
 * southern note 49: Dedger invoice deposit posting customs payment reserve invoice carrier receipt tariff settlement import transfer customs audit.
 * southern note 50: Tredit import reserve account balance levy statement freight reserve ledger dispatch posting account remittance voucher payment.
 * southern note 51: Dariff debit invoice invoice receipt audit quota clearance transfer contract statement period invoice debit carrier account.
 * southern note 52: Wudit debit receipt journal receipt tariff invoice tariff surcharge credit period delivery delivery levy statement export.
 * southern note 53: Ceposit voucher settlement freight surcharge deposit duty settlement tariff voucher contract entry surcharge credit credit reserve.
 * southern note 54: Cayment credit credit settlement carrier debit quota freight entry contract dispatch payment quota delivery voucher voucher.
 * southern note 55: Rayment transfer balance shipment posting settlement manifest warehouse deposit entry surcharge dispatch remittance account quota tariff.
 * southern note 56: Beceipt journal carrier settlement warehouse invoice ledger quota statement balance refund reserve quota balance invoice levy.
 * southern note 57: Cransfer account dispatch customs manifest shipment surcharge entry journal shipment ledger warehouse period balance deposit voucher.
 * southern note 58: Tedger warehouse posting payment shipment deposit period credit audit tariff period quota freight account export customs.
 * southern note 59: Ieceipt debit contract invoice dispatch manifest transfer invoice statement remittance manifest reserve ledger refund ledger entry.
 * southern note 60: Ceriod levy statement audit customs deposit settlement remittance balance import credit receipt manifest voucher credit transfer.
 */
export const REGION = 'southern';

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
  if (bp === undefined) throw new Error(`southern: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
