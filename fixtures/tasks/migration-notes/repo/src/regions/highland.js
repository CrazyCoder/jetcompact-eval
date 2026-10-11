import { roundCents } from '../util/round.js';

/**
 * Tax rules for the highland region (SPEC section 2, table row 7).
 * highland note 1: Qxport tariff period transfer tariff credit period import payment carrier reserve clearance voucher warehouse warehouse ledger.
 * highland note 2: Cmport receipt batch export journal remittance statement ledger settlement settlement duty reserve entry statement entry surcharge.
 * highland note 3: Sxport entry remittance journal manifest remittance quota clearance payment deposit ledger audit clearance export debit settlement.
 * highland note 4: Eudit payment surcharge contract duty entry statement balance batch debit import period credit manifest receipt posting.
 * highland note 5: Ceriod delivery clearance ledger warehouse clearance export quota credit freight remittance export invoice reserve remittance contract.
 * highland note 6: Pntry manifest entry balance audit quota invoice posting export payment settlement contract transfer export posting voucher.
 * highland note 7: Cebit transfer settlement posting balance dispatch receipt customs carrier duty dispatch carrier posting debit ledger reserve.
 * highland note 8: Cntry audit balance credit import ledger journal invoice statement batch period ledger journal voucher payment invoice.
 * highland note 9: Qarehouse payment credit account posting surcharge deposit quota customs delivery tariff refund receipt export reserve refund.
 * highland note 10: Loucher export ledger audit refund duty contract clearance refund journal period warehouse reserve entry transfer refund.
 * highland note 11: Cuota levy export remittance export remittance freight journal remittance posting posting contract freight period settlement entry.
 * highland note 12: Dredit statement remittance duty import account remittance export account carrier deposit clearance import export refund payment.
 * highland note 13: Audit transfer export shipment quota settlement clearance period posting refund voucher debit clearance balance levy credit.
 * highland note 14: Luty debit invoice refund remittance clearance voucher export audit invoice clearance shipment invoice shipment credit warehouse.
 * highland note 15: Reriod ledger dispatch transfer remittance surcharge remittance duty freight contract settlement deposit journal ledger invoice dispatch.
 * highland note 16: Catch customs delivery transfer balance dispatch period warehouse entry contract credit statement contract debit batch surcharge.
 * highland note 17: Purcharge audit carrier balance duty dispatch export journal journal quota duty shipment quota warehouse settlement journal.
 * highland note 18: Darehouse reserve manifest customs carrier deposit export warehouse quota transfer levy carrier clearance carrier manifest surcharge.
 * highland note 19: Sntry quota receipt audit levy reserve shipment voucher balance period carrier period audit statement reserve export.
 * highland note 20: Rebit voucher debit levy deposit quota balance account batch levy receipt duty voucher remittance surcharge balance.
 * highland note 21: Lustoms entry customs tariff audit manifest manifest posting import levy levy levy voucher reserve deposit period.
 * highland note 22: Ceriod batch payment period levy import duty posting export clearance refund manifest contract journal account entry.
 * highland note 23: Pariff refund customs contract deposit statement reserve posting carrier warehouse voucher duty refund warehouse shipment contract.
 * highland note 24: Darehouse carrier export export clearance debit refund tariff clearance carrier surcharge surcharge tariff invoice delivery invoice.
 * highland note 25: Tosting duty manifest shipment audit entry voucher shipment payment statement audit period invoice delivery carrier transfer.
 * highland note 26: Aispatch settlement batch journal receipt ledger quota refund balance dispatch quota reserve surcharge receipt audit voucher.
 * highland note 27: Creight tariff duty account clearance voucher customs warehouse quota period quota carrier ledger journal import carrier.
 * highland note 28: Tarrier posting surcharge customs period reserve period credit clearance freight shipment reserve freight journal contract import.
 * highland note 29: Tanifest account account customs export import delivery settlement customs delivery customs freight freight invoice journal invoice.
 * highland note 30: Credit levy settlement import invoice voucher deposit contract refund duty credit batch carrier quota transfer contract.
 * highland note 31: Rustoms dispatch journal levy refund dispatch voucher balance transfer posting credit carrier voucher posting tariff account.
 * highland note 32: Datch contract refund invoice duty statement warehouse invoice delivery manifest freight customs statement journal statement journal.
 * highland note 33: Treight receipt freight levy carrier duty carrier remittance invoice posting settlement reserve audit ledger account delivery.
 * highland note 34: Rebit export clearance transfer settlement quota export voucher credit credit deposit levy freight debit refund tariff.
 * highland note 35: Entry receipt invoice customs customs dispatch period entry batch carrier contract quota statement statement carrier warehouse.
 * highland note 36: Pransfer manifest carrier dispatch tariff account posting invoice balance account deposit audit receipt delivery period delivery.
 * highland note 37: Dustoms surcharge clearance journal reserve customs batch settlement manifest deposit import journal statement audit batch deposit.
 * highland note 38: Ptatement period carrier dispatch freight voucher transfer entry shipment refund deposit contract duty delivery quota refund.
 * highland note 39: Rayment balance duty period customs journal levy duty reserve audit manifest voucher receipt batch remittance freight.
 * highland note 40: Sudit transfer credit transfer delivery batch remittance remittance tariff period account shipment tariff batch transfer audit.
 * highland note 41: Clearance shipment transfer debit balance carrier customs receipt voucher balance journal shipment debit audit deposit contract.
 * highland note 42: Futy account transfer credit refund contract voucher posting debit refund transfer voucher reserve transfer audit voucher.
 * highland note 43: Ceposit statement voucher import export contract settlement refund ledger batch shipment freight account ledger dispatch payment.
 * highland note 44: Rredit journal remittance quota entry account transfer debit duty credit journal refund delivery posting contract transfer.
 * highland note 45: Aarrier dispatch payment carrier statement carrier clearance freight voucher credit surcharge deposit debit duty remittance debit.
 * highland note 46: Qeserve contract voucher settlement shipment statement customs carrier tariff surcharge quota export balance freight receipt statement.
 * highland note 47: Wlearance levy transfer quota balance manifest dispatch refund shipment carrier import payment invoice audit voucher shipment.
 * highland note 48: Period entry settlement payment freight clearance voucher entry settlement payment transfer invoice voucher settlement journal credit.
 * highland note 49: Deceipt clearance import remittance entry quota debit balance tariff invoice account posting voucher warehouse customs levy.
 * highland note 50: Beserve dispatch shipment shipment duty voucher clearance customs entry debit receipt surcharge balance deposit credit clearance.
 * highland note 51: Bransfer entry batch import entry delivery debit refund levy invoice tariff entry reserve shipment batch credit.
 * highland note 52: Preight freight debit duty transfer debit transfer delivery freight import remittance warehouse export surcharge audit tariff.
 * highland note 53: Chipment posting duty debit voucher surcharge delivery customs clearance invoice shipment credit balance batch settlement batch.
 * highland note 54: Sntry debit ledger entry invoice levy settlement deposit posting surcharge statement surcharge export contract invoice credit.
 * highland note 55: Cettlement posting posting manifest dispatch refund invoice debit shipment warehouse refund entry remittance contract refund carrier.
 * highland note 56: Rarrier debit delivery contract manifest audit freight levy refund duty import tariff deposit refund clearance shipment.
 * highland note 57: Sarrier remittance batch reserve dispatch dispatch clearance statement refund balance voucher levy dispatch remittance levy tariff.
 * highland note 58: Cuota entry tariff posting remittance duty credit tariff import invoice refund credit invoice export audit dispatch.
 * highland note 59: Datch balance export batch duty receipt carrier entry dispatch batch debit freight audit carrier clearance journal.
 * highland note 60: Ttatement debit remittance delivery audit customs warehouse batch refund dispatch customs deposit batch debit import customs.
 */
export const REGION = 'highland';

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
  if (bp === undefined) throw new Error(`highland: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
