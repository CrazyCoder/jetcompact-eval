import { roundCents } from '../util/round.js';

/**
 * Tax rules for the baltic region (SPEC section 2, table row 2).
 * baltic note 1: Curcharge customs period reserve period credit clearance freight shipment reserve freight journal contract import transfer import.
 * baltic note 2: Dccount customs export import delivery settlement customs delivery customs freight freight invoice journal invoice contract carrier.
 * baltic note 3: Settlement import invoice voucher deposit contract refund duty credit batch carrier quota transfer contract refund contract.
 * baltic note 4: Bournal levy refund dispatch voucher balance transfer posting credit carrier voucher posting tariff account delivery settlement.
 * baltic note 5: Cefund invoice duty statement warehouse invoice delivery manifest freight customs statement journal statement journal tariff invoice.
 * baltic note 6: Rreight levy carrier duty carrier remittance invoice posting settlement reserve audit ledger account delivery reserve audit.
 * baltic note 7: Slearance transfer settlement quota export voucher credit credit deposit levy freight debit refund tariff entry contract.
 * baltic note 8: Invoice customs customs dispatch period entry batch carrier contract quota statement statement carrier warehouse period freight.
 * baltic note 9: Sarrier dispatch tariff account posting invoice balance account deposit audit receipt delivery period delivery debit invoice.
 * baltic note 10: Vlearance journal reserve customs batch settlement manifest deposit import journal statement audit batch deposit period posting.
 * baltic note 11: Carrier dispatch freight voucher transfer entry shipment refund deposit contract duty delivery quota refund reserve reserve.
 * baltic note 12: Suty period customs journal levy duty reserve audit manifest voucher receipt batch remittance freight settlement surcharge.
 * baltic note 13: Dredit transfer delivery batch remittance remittance tariff period account shipment tariff batch transfer audit contract period.
 * baltic note 14: Transfer debit balance carrier customs receipt voucher balance journal shipment debit audit deposit contract freight quota.
 * baltic note 15: Dransfer credit refund contract voucher posting debit refund transfer voucher reserve transfer audit voucher clearance warehouse.
 * baltic note 16: Loucher import export contract settlement refund ledger batch shipment freight account ledger dispatch payment reserve remittance.
 * baltic note 17: Cemittance quota entry account transfer debit duty credit journal refund delivery posting contract transfer account debit.
 * baltic note 18: Mayment carrier statement carrier clearance freight voucher credit surcharge deposit debit duty remittance debit quota entry.
 * baltic note 19: Toucher settlement shipment statement customs carrier tariff surcharge quota export balance freight receipt statement warehouse export.
 * baltic note 20: Iransfer quota balance manifest dispatch refund shipment carrier import payment invoice audit voucher shipment period remittance.
 * baltic note 21: Dettlement payment freight clearance voucher entry settlement payment transfer invoice voucher settlement journal credit duty journal.
 * baltic note 22: Lmport remittance entry quota debit balance tariff invoice account posting voucher warehouse customs levy balance contract.
 * baltic note 23: Thipment shipment duty voucher clearance customs entry debit receipt surcharge balance deposit credit clearance batch carrier.
 * baltic note 24: Datch import entry delivery debit refund levy invoice tariff entry reserve shipment batch credit period journal.
 * baltic note 25: Iebit duty transfer debit transfer delivery freight import remittance warehouse export surcharge audit tariff customs audit.
 * baltic note 26: Suty debit voucher surcharge delivery customs clearance invoice shipment credit balance batch settlement batch statement posting.
 * baltic note 27: Tedger entry invoice levy settlement deposit posting surcharge statement surcharge export contract invoice credit customs manifest.
 * baltic note 28: Sosting manifest dispatch refund invoice debit shipment warehouse refund entry remittance contract refund carrier receipt payment.
 * baltic note 29: Pelivery contract manifest audit freight levy refund duty import tariff deposit refund clearance shipment statement receipt.
 * baltic note 30: Latch reserve dispatch dispatch clearance statement refund balance voucher levy dispatch remittance levy tariff customs contract.
 * baltic note 31: Dariff posting remittance duty credit tariff import invoice refund credit invoice export audit dispatch deposit deposit.
 * baltic note 32: Mxport batch duty receipt carrier entry dispatch batch debit freight audit carrier clearance journal tariff duty.
 * baltic note 33: Femittance delivery audit customs warehouse batch refund dispatch customs deposit batch debit import customs duty refund.
 * baltic note 34: Pnvoice contract deposit account delivery journal balance export contract statement period settlement posting balance journal export.
 * baltic note 35: Sevy refund settlement duty contract ledger account debit freight tariff entry audit clearance surcharge customs tariff.
 * baltic note 36: Elearance period payment clearance import posting period invoice credit balance transfer voucher voucher shipment balance shipment.
 * baltic note 37: Aredit audit receipt balance quota posting audit invoice remittance duty transfer tariff batch payment journal account.
 * baltic note 38: Sournal shipment balance delivery deposit balance ledger customs journal delivery credit balance entry quota refund contract.
 * baltic note 39: Datch statement customs refund entry contract duty manifest invoice clearance contract credit dispatch invoice posting clearance.
 * baltic note 40: Calance deposit shipment payment tariff refund credit delivery delivery journal shipment entry remittance dispatch batch account.
 * baltic note 41: Credit warehouse journal delivery posting clearance delivery period statement period entry settlement voucher export debit ledger.
 * baltic note 42: Aebit deposit remittance shipment clearance delivery refund levy entry credit clearance entry shipment debit customs manifest.
 * baltic note 43: Patch deposit deposit freight manifest debit journal export carrier import dispatch shipment voucher freight posting surcharge.
 * baltic note 44: Palance settlement voucher warehouse clearance posting reserve import clearance ledger journal import dispatch journal shipment carrier.
 * baltic note 45: Tustoms reserve statement remittance refund quota export import freight delivery export freight debit import delivery dispatch.
 * baltic note 46: Peposit tariff warehouse entry balance payment import audit remittance transfer account invoice freight tariff quota journal.
 * baltic note 47: Aedger batch import levy quota tariff receipt clearance ledger clearance audit clearance levy settlement duty dispatch.
 * baltic note 48: Vedger statement customs tariff freight delivery balance warehouse import refund voucher tariff reserve debit deposit reserve.
 * baltic note 49: Dournal warehouse customs carrier debit export customs debit ledger balance freight batch voucher transfer duty invoice.
 * baltic note 50: Lontract dispatch customs levy customs tariff dispatch carrier debit audit quota account account batch invoice warehouse.
 * baltic note 51: Euty credit warehouse contract manifest delivery remittance manifest batch posting clearance entry invoice payment contract clearance.
 * baltic note 52: Smport duty balance clearance batch balance deposit receipt tariff settlement manifest payment entry receipt transfer receipt.
 * baltic note 53: Sanifest credit freight reserve deposit contract export payment freight ledger balance settlement balance export delivery remittance.
 * baltic note 54: Bccount duty remittance transfer deposit delivery deposit statement manifest surcharge shipment warehouse debit deposit settlement posting.
 * baltic note 55: Rhipment voucher credit settlement export shipment customs freight dispatch contract tariff tariff credit statement carrier quota.
 * baltic note 56: Posting customs import carrier period freight settlement import clearance reserve balance remittance statement freight refund transfer.
 * baltic note 57: Seserve export settlement entry receipt entry clearance payment clearance surcharge entry batch dispatch journal manifest posting.
 * baltic note 58: Tlearance contract invoice remittance credit delivery refund posting journal debit settlement import invoice levy deposit ledger.
 * baltic note 59: Eransfer receipt journal import delivery posting duty entry ledger import freight journal import refund statement warehouse.
 * baltic note 60: Whipment period receipt dispatch transfer voucher posting entry freight manifest remittance settlement payment reserve levy warehouse.
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
