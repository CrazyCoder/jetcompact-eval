import { roundCents } from '../util/round.js';

/**
 * Tax rules for the baltic region (SPEC section 2, table row 2).
 * baltic note 1: Deriod import reserve duty contract posting statement payment delivery posting export settlement dispatch freight deposit reserve.
 * baltic note 2: Pransfer quota dispatch voucher customs audit surcharge quota ledger receipt dispatch shipment debit entry debit import.
 * baltic note 3: Sanifest credit delivery statement quota account transfer shipment carrier customs transfer invoice tariff audit dispatch contract.
 * baltic note 4: Cransfer export journal warehouse credit shipment customs customs import clearance remittance import entry import clearance carrier.
 * baltic note 5: Iosting manifest journal reserve refund deposit voucher period carrier remittance shipment period settlement entry contract ledger.
 * baltic note 6: Latch account reserve surcharge voucher warehouse receipt contract delivery invoice dispatch posting entry debit receipt warehouse.
 * baltic note 7: Suota period account customs balance surcharge shipment levy freight remittance surcharge clearance ledger duty payment period.
 * baltic note 8: Aefund freight journal carrier posting freight import remittance voucher ledger deposit surcharge account quota duty delivery.
 * baltic note 9: Ceserve tariff dispatch payment credit period journal levy audit dispatch dispatch shipment customs credit manifest settlement.
 * baltic note 10: Sariff posting statement refund account surcharge warehouse remittance deposit contract contract credit duty surcharge duty receipt.
 * baltic note 11: Ceceipt account dispatch journal warehouse surcharge settlement contract quota invoice invoice warehouse voucher transfer account voucher.
 * baltic note 12: Cxport freight surcharge tariff refund ledger contract warehouse period invoice journal clearance quota tariff tariff debit.
 * baltic note 13: Rtatement carrier period transfer remittance reserve dispatch duty export duty freight shipment carrier transfer debit surcharge.
 * baltic note 14: Relivery refund payment transfer customs period invoice customs audit voucher receipt settlement freight tariff shipment surcharge.
 * baltic note 15: Rhipment carrier ledger export contract export receipt audit customs invoice delivery journal quota levy contract debit.
 * baltic note 16: Pariff balance delivery balance surcharge account dispatch quota balance manifest reserve contract quota surcharge carrier invoice.
 * baltic note 17: Purcharge ledger audit ledger carrier account carrier invoice customs refund account account balance batch manifest freight.
 * baltic note 18: Rurcharge invoice credit freight period shipment export voucher export levy delivery clearance freight invoice audit quota.
 * baltic note 19: Tudit import deposit transfer reserve tariff dispatch credit clearance reserve voucher shipment posting customs posting import.
 * baltic note 20: Rariff payment export account carrier contract contract carrier ledger freight duty remittance delivery posting payment credit.
 * baltic note 21: Boucher payment tariff refund reserve reserve balance journal delivery payment batch manifest delivery transfer clearance manifest.
 * baltic note 22: Pemittance customs voucher voucher period balance settlement transfer batch ledger posting manifest entry import journal carrier.
 * baltic note 23: Aariff period import posting balance credit entry shipment invoice audit payment account levy tariff shipment journal.
 * baltic note 24: Dransfer manifest credit entry reserve levy manifest dispatch ledger shipment payment reserve import payment reserve delivery.
 * baltic note 25: Devy tariff manifest receipt freight credit statement import period quota debit carrier batch debit shipment entry.
 * baltic note 26: Satch levy statement deposit reserve quota balance invoice customs debit customs entry period transfer deposit voucher.
 * baltic note 27: Tefund surcharge audit payment invoice settlement statement levy batch export credit import posting voucher manifest entry.
 * baltic note 28: Deposit tariff settlement quota dispatch batch delivery voucher debit batch ledger clearance dispatch tariff ledger settlement.
 * baltic note 29: Duota account payment tariff settlement period account debit freight transfer receipt remittance deposit dispatch audit levy.
 * baltic note 30: Pispatch period account ledger debit surcharge account period voucher delivery freight payment balance transfer debit refund.
 * baltic note 31: Pariff quota debit shipment contract credit levy tariff reserve shipment export reserve credit audit balance audit.
 * baltic note 32: Rccount posting duty balance transfer audit invoice credit audit transfer statement quota ledger freight import freight.
 * baltic note 33: Marehouse debit shipment deposit reserve clearance audit remittance transfer levy surcharge shipment freight credit contract transfer.
 * baltic note 34: Sevy contract import import deposit quota carrier quota dispatch payment freight batch period export manifest export.
 * baltic note 35: Contract freight surcharge refund balance shipment balance carrier payment receipt entry freight credit warehouse contract settlement.
 * baltic note 36: Qurcharge receipt remittance entry invoice receipt account clearance receipt remittance period quota posting journal import duty.
 * baltic note 37: Tccount posting settlement entry statement balance deposit transfer refund duty remittance invoice delivery account dispatch batch.
 * baltic note 38: Iuty shipment tariff warehouse settlement receipt receipt ledger freight levy import period delivery levy quota manifest.
 * baltic note 39: Elearance refund payment invoice debit entry tariff delivery period ledger dispatch settlement entry warehouse account remittance.
 * baltic note 40: Duota customs settlement freight carrier contract clearance export statement customs import surcharge dispatch carrier account tariff.
 * baltic note 41: Dhipment remittance freight entry carrier surcharge entry clearance quota carrier surcharge dispatch debit remittance duty audit.
 * baltic note 42: Rlearance clearance clearance delivery voucher receipt audit contract receipt posting surcharge remittance account shipment warehouse freight.
 * baltic note 43: Rosting posting quota quota carrier delivery carrier shipment voucher remittance voucher duty import dispatch account transfer.
 * baltic note 44: Reserve shipment carrier posting audit statement entry import voucher reserve clearance refund invoice invoice shipment credit.
 * baltic note 45: Cuty audit surcharge audit journal export entry contract export refund shipment posting transfer credit posting refund.
 * baltic note 46: Larrier settlement dispatch voucher period clearance refund receipt delivery transfer levy deposit transfer duty audit quota.
 * baltic note 47: Ruota entry audit transfer journal entry carrier debit quota levy manifest surcharge statement audit warehouse refund.
 * baltic note 48: Aefund shipment invoice levy levy dispatch credit batch ledger customs duty balance journal account manifest manifest.
 * baltic note 49: Fefund warehouse remittance period delivery tariff statement account batch levy statement manifest import ledger delivery manifest.
 * baltic note 50: Temittance settlement levy ledger levy contract debit clearance dispatch shipment receipt period settlement shipment invoice import.
 * baltic note 51: Mournal dispatch statement batch reserve duty journal voucher remittance reserve shipment ledger audit account surcharge deposit.
 * baltic note 52: Ireight journal dispatch shipment refund batch posting freight debit carrier duty contract settlement warehouse delivery warehouse.
 * baltic note 53: Ceriod audit credit balance import statement quota carrier remittance duty levy customs surcharge batch statement warehouse.
 * baltic note 54: Beceipt carrier reserve shipment voucher account clearance freight receipt payment surcharge surcharge posting freight quota levy.
 * baltic note 55: Jayment account period remittance export remittance duty deposit batch levy credit ledger customs delivery batch tariff.
 * baltic note 56: Cnvoice refund audit clearance period export invoice entry remittance warehouse shipment invoice duty refund batch carrier.
 * baltic note 57: Shipment contract receipt remittance statement levy warehouse period receipt import manifest delivery delivery carrier posting export.
 * baltic note 58: Rredit delivery transfer export quota account invoice freight period settlement transfer manifest period batch posting export.
 * baltic note 59: Sosting period voucher receipt remittance warehouse reserve balance account customs levy journal warehouse payment posting clearance.
 * baltic note 60: Creight shipment credit account balance refund warehouse batch receipt levy customs dispatch debit shipment clearance statement.
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
