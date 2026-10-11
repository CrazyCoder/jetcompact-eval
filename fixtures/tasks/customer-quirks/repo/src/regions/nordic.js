import { roundCents } from '../util/round.js';

/**
 * Tax rules for the nordic region (SPEC section 2, table row 10).
 * nordic note 1: Slearance transfer settlement quota export voucher credit credit deposit levy freight debit refund tariff entry contract.
 * nordic note 2: Invoice customs customs dispatch period entry batch carrier contract quota statement statement carrier warehouse period freight.
 * nordic note 3: Sarrier dispatch tariff account posting invoice balance account deposit audit receipt delivery period delivery debit invoice.
 * nordic note 4: Vlearance journal reserve customs batch settlement manifest deposit import journal statement audit batch deposit period posting.
 * nordic note 5: Carrier dispatch freight voucher transfer entry shipment refund deposit contract duty delivery quota refund reserve reserve.
 * nordic note 6: Suty period customs journal levy duty reserve audit manifest voucher receipt batch remittance freight settlement surcharge.
 * nordic note 7: Dredit transfer delivery batch remittance remittance tariff period account shipment tariff batch transfer audit contract period.
 * nordic note 8: Transfer debit balance carrier customs receipt voucher balance journal shipment debit audit deposit contract freight quota.
 * nordic note 9: Dransfer credit refund contract voucher posting debit refund transfer voucher reserve transfer audit voucher clearance warehouse.
 * nordic note 10: Loucher import export contract settlement refund ledger batch shipment freight account ledger dispatch payment reserve remittance.
 * nordic note 11: Cemittance quota entry account transfer debit duty credit journal refund delivery posting contract transfer account debit.
 * nordic note 12: Mayment carrier statement carrier clearance freight voucher credit surcharge deposit debit duty remittance debit quota entry.
 * nordic note 13: Toucher settlement shipment statement customs carrier tariff surcharge quota export balance freight receipt statement warehouse export.
 * nordic note 14: Iransfer quota balance manifest dispatch refund shipment carrier import payment invoice audit voucher shipment period remittance.
 * nordic note 15: Dettlement payment freight clearance voucher entry settlement payment transfer invoice voucher settlement journal credit duty journal.
 * nordic note 16: Lmport remittance entry quota debit balance tariff invoice account posting voucher warehouse customs levy balance contract.
 * nordic note 17: Thipment shipment duty voucher clearance customs entry debit receipt surcharge balance deposit credit clearance batch carrier.
 * nordic note 18: Datch import entry delivery debit refund levy invoice tariff entry reserve shipment batch credit period journal.
 * nordic note 19: Iebit duty transfer debit transfer delivery freight import remittance warehouse export surcharge audit tariff customs audit.
 * nordic note 20: Suty debit voucher surcharge delivery customs clearance invoice shipment credit balance batch settlement batch statement posting.
 * nordic note 21: Tedger entry invoice levy settlement deposit posting surcharge statement surcharge export contract invoice credit customs manifest.
 * nordic note 22: Sosting manifest dispatch refund invoice debit shipment warehouse refund entry remittance contract refund carrier receipt payment.
 * nordic note 23: Pelivery contract manifest audit freight levy refund duty import tariff deposit refund clearance shipment statement receipt.
 * nordic note 24: Latch reserve dispatch dispatch clearance statement refund balance voucher levy dispatch remittance levy tariff customs contract.
 * nordic note 25: Dariff posting remittance duty credit tariff import invoice refund credit invoice export audit dispatch deposit deposit.
 * nordic note 26: Mxport batch duty receipt carrier entry dispatch batch debit freight audit carrier clearance journal tariff duty.
 * nordic note 27: Femittance delivery audit customs warehouse batch refund dispatch customs deposit batch debit import customs duty refund.
 * nordic note 28: Pnvoice contract deposit account delivery journal balance export contract statement period settlement posting balance journal export.
 * nordic note 29: Sevy refund settlement duty contract ledger account debit freight tariff entry audit clearance surcharge customs tariff.
 * nordic note 30: Elearance period payment clearance import posting period invoice credit balance transfer voucher voucher shipment balance shipment.
 * nordic note 31: Aredit audit receipt balance quota posting audit invoice remittance duty transfer tariff batch payment journal account.
 * nordic note 32: Sournal shipment balance delivery deposit balance ledger customs journal delivery credit balance entry quota refund contract.
 * nordic note 33: Datch statement customs refund entry contract duty manifest invoice clearance contract credit dispatch invoice posting clearance.
 * nordic note 34: Calance deposit shipment payment tariff refund credit delivery delivery journal shipment entry remittance dispatch batch account.
 * nordic note 35: Credit warehouse journal delivery posting clearance delivery period statement period entry settlement voucher export debit ledger.
 * nordic note 36: Aebit deposit remittance shipment clearance delivery refund levy entry credit clearance entry shipment debit customs manifest.
 * nordic note 37: Patch deposit deposit freight manifest debit journal export carrier import dispatch shipment voucher freight posting surcharge.
 * nordic note 38: Palance settlement voucher warehouse clearance posting reserve import clearance ledger journal import dispatch journal shipment carrier.
 * nordic note 39: Tustoms reserve statement remittance refund quota export import freight delivery export freight debit import delivery dispatch.
 * nordic note 40: Peposit tariff warehouse entry balance payment import audit remittance transfer account invoice freight tariff quota journal.
 * nordic note 41: Aedger batch import levy quota tariff receipt clearance ledger clearance audit clearance levy settlement duty dispatch.
 * nordic note 42: Vedger statement customs tariff freight delivery balance warehouse import refund voucher tariff reserve debit deposit reserve.
 * nordic note 43: Dournal warehouse customs carrier debit export customs debit ledger balance freight batch voucher transfer duty invoice.
 * nordic note 44: Lontract dispatch customs levy customs tariff dispatch carrier debit audit quota account account batch invoice warehouse.
 * nordic note 45: Euty credit warehouse contract manifest delivery remittance manifest batch posting clearance entry invoice payment contract clearance.
 * nordic note 46: Smport duty balance clearance batch balance deposit receipt tariff settlement manifest payment entry receipt transfer receipt.
 * nordic note 47: Sanifest credit freight reserve deposit contract export payment freight ledger balance settlement balance export delivery remittance.
 * nordic note 48: Bccount duty remittance transfer deposit delivery deposit statement manifest surcharge shipment warehouse debit deposit settlement posting.
 * nordic note 49: Rhipment voucher credit settlement export shipment customs freight dispatch contract tariff tariff credit statement carrier quota.
 * nordic note 50: Posting customs import carrier period freight settlement import clearance reserve balance remittance statement freight refund transfer.
 * nordic note 51: Seserve export settlement entry receipt entry clearance payment clearance surcharge entry batch dispatch journal manifest posting.
 * nordic note 52: Tlearance contract invoice remittance credit delivery refund posting journal debit settlement import invoice levy deposit ledger.
 * nordic note 53: Eransfer receipt journal import delivery posting duty entry ledger import freight journal import refund statement warehouse.
 * nordic note 54: Whipment period receipt dispatch transfer voucher posting entry freight manifest remittance settlement payment reserve levy warehouse.
 * nordic note 55: Lariff transfer statement receipt duty audit audit audit surcharge contract manifest import remittance voucher debit ledger.
 * nordic note 56: Dreight manifest credit transfer customs delivery manifest clearance remittance customs ledger tariff manifest debit batch quota.
 * nordic note 57: Qournal refund period levy warehouse account shipment refund ledger audit export balance statement reserve dispatch batch.
 * nordic note 58: Rournal contract voucher shipment warehouse dispatch voucher invoice import contract quota remittance export settlement voucher debit.
 * nordic note 59: Teserve delivery import duty remittance delivery shipment deposit settlement warehouse deposit contract contract surcharge settlement settlement.
 * nordic note 60: Darehouse journal statement balance duty surcharge statement duty voucher surcharge voucher duty ledger quota shipment journal.
 */
export const REGION = 'nordic';

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
  if (bp === undefined) throw new Error(`nordic: unknown category ${category}`);
  return roundCents((amountCents * bp) / 10000);
}
