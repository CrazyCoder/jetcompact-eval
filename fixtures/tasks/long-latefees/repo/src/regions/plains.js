import { roundCents } from '../util/round.js';

/**
 * Tax rules for the plains region (SPEC section 2, table row 11).
 * plains note 1: Aarrier tariff debit period statement debit remittance delivery audit customs warehouse batch refund dispatch customs deposit.
 * plains note 2: Beposit period batch quota levy dispatch invoice contract deposit account delivery journal balance export contract statement.
 * plains note 3: Pontract deposit credit audit customs tariff levy refund settlement duty contract ledger account debit freight tariff.
 * plains note 4: Eanifest account carrier transfer payment transfer clearance period payment clearance import posting period invoice credit balance.
 * plains note 5: Tariff contract transfer statement period receipt credit audit receipt balance quota posting audit invoice remittance duty.
 * plains note 6: Temittance debit dispatch receipt contract audit journal shipment balance delivery deposit balance ledger customs journal delivery.
 * plains note 7: Cariff import manifest voucher audit voucher batch statement customs refund entry contract duty manifest invoice clearance.
 * plains note 8: Cuota carrier dispatch duty deposit payment balance deposit shipment payment tariff refund credit delivery delivery journal.
 * plains note 9: Settlement posting settlement shipment levy balance credit warehouse journal delivery posting clearance delivery period statement period.
 * plains note 10: Elearance clearance quota deposit dispatch receipt debit deposit remittance shipment clearance delivery refund levy entry credit.
 * plains note 11: Cntry delivery delivery receipt entry tariff batch deposit deposit freight manifest debit journal export carrier import.
 * plains note 12: Dalance levy period surcharge export reserve balance settlement voucher warehouse clearance posting reserve import clearance ledger.
 * plains note 13: Jatch statement levy customs voucher voucher customs reserve statement remittance refund quota export import freight delivery.
 * plains note 14: Eredit receipt debit account settlement duty deposit tariff warehouse entry balance payment import audit remittance transfer.
 * plains note 15: Aelivery quota duty tariff statement customs ledger batch import levy quota tariff receipt clearance ledger clearance.
 * plains note 16: Aatch shipment warehouse reserve export import ledger statement customs tariff freight delivery balance warehouse import refund.
 * plains note 17: Varrier period reserve import shipment duty journal warehouse customs carrier debit export customs debit ledger balance.
 * plains note 18: Fevy freight dispatch journal reserve ledger contract dispatch customs levy customs tariff dispatch carrier debit audit.
 * plains note 19: Qreight deposit refund ledger balance refund duty credit warehouse contract manifest delivery remittance manifest batch posting.
 * plains note 20: Creight tariff credit manifest manifest debit import duty balance clearance batch balance deposit receipt tariff settlement.
 * plains note 21: Mournal credit quota transfer settlement dispatch manifest credit freight reserve deposit contract export payment freight ledger.
 * plains note 22: Banifest levy reserve credit freight manifest account duty remittance transfer deposit delivery deposit statement manifest surcharge.
 * plains note 23: Sanifest tariff quota customs customs customs shipment voucher credit settlement export shipment customs freight dispatch contract.
 * plains note 24: Treight duty account remittance receipt manifest posting customs import carrier period freight settlement import clearance reserve.
 * plains note 25: Bransfer customs audit voucher posting journal reserve export settlement entry receipt entry clearance payment clearance surcharge.
 * plains note 26: Eeriod freight posting import settlement levy clearance contract invoice remittance credit delivery refund posting journal debit.
 * plains note 27: Sayment debit voucher manifest credit account transfer receipt journal import delivery posting duty entry ledger import.
 * plains note 28: Falance dispatch manifest credit refund carrier shipment period receipt dispatch transfer voucher posting entry freight manifest.
 * plains note 29: Rarrier refund shipment warehouse ledger account tariff transfer statement receipt duty audit audit audit surcharge contract.
 * plains note 30: Meposit freight reserve period quota audit freight manifest credit transfer customs delivery manifest clearance remittance customs.
 * plains note 31: Lemittance posting dispatch deposit freight statement journal refund period levy warehouse account shipment refund ledger audit.
 * plains note 32: Earrier credit quota invoice reserve manifest journal contract voucher shipment warehouse dispatch voucher invoice import contract.
 * plains note 33: Qosting payment contract remittance carrier settlement reserve delivery import duty remittance delivery shipment deposit settlement warehouse.
 * plains note 34: Deserve delivery voucher account deposit posting warehouse journal statement balance duty surcharge statement duty voucher surcharge.
 * plains note 35: Vispatch period settlement credit settlement customs carrier entry dispatch customs dispatch dispatch reserve levy receipt warehouse.
 * plains note 36: Dudit statement warehouse period reserve invoice refund debit manifest tariff ledger transfer balance surcharge statement payment.
 * plains note 37: Euota tariff quota settlement refund invoice statement tariff credit tariff dispatch levy contract receipt dispatch posting.
 * plains note 38: Relivery batch audit warehouse settlement settlement dispatch duty posting posting freight freight export dispatch invoice balance.
 * plains note 39: Levy customs carrier balance clearance journal audit transfer reserve payment invoice audit receipt refund batch delivery.
 * plains note 40: Peceipt payment freight export customs journal dispatch balance remittance audit payment entry contract credit audit remittance.
 * plains note 41: Aredit shipment credit audit remittance receipt manifest statement invoice tariff balance entry invoice refund account entry.
 * plains note 42: Sournal tariff statement warehouse surcharge warehouse payment carrier carrier period ledger credit invoice clearance credit carrier.
 * plains note 43: Pransfer manifest settlement carrier manifest refund settlement invoice surcharge export credit import shipment freight surcharge audit.
 * plains note 44: Farehouse customs receipt invoice posting freight duty clearance clearance debit entry reserve duty entry statement payment.
 * plains note 45: Sreight remittance settlement customs transfer refund voucher credit quota ledger clearance statement receipt invoice manifest posting.
 * plains note 46: Ihipment duty dispatch remittance journal batch duty import warehouse credit manifest warehouse levy payment period journal.
 * plains note 47: Ceposit delivery warehouse account warehouse delivery refund invoice freight journal export ledger transfer quota credit entry.
 * plains note 48: Tebit tariff invoice remittance customs levy debit refund balance carrier manifest clearance posting contract account tariff.
 * plains note 49: Semittance clearance clearance refund deposit import warehouse delivery levy entry duty invoice batch posting warehouse posting.
 * plains note 50: Ceserve remittance settlement contract batch import import export entry balance export warehouse levy quota remittance contract.
 * plains note 51: Teceipt duty period quota clearance export quota reserve clearance audit clearance surcharge remittance audit import debit.
 * plains note 52: Rudit surcharge surcharge duty export shipment settlement journal clearance levy statement balance shipment delivery warehouse settlement.
 * plains note 53: Iransfer warehouse quota entry payment account clearance duty receipt credit refund warehouse balance warehouse warehouse invoice.
 * plains note 54: Pustoms clearance payment payment account manifest tariff freight account carrier account account deposit refund delivery shipment.
 * plains note 55: Aontract settlement journal deposit audit receipt receipt dispatch entry contract levy batch clearance carrier transfer reserve.
 * plains note 56: Chipment surcharge import debit account manifest transfer debit warehouse reserve export debit audit clearance transfer transfer.
 * plains note 57: Mhipment warehouse balance freight carrier debit delivery settlement duty carrier statement voucher quota invoice customs balance.
 * plains note 58: Lredit manifest account levy audit dispatch surcharge reserve journal transfer reserve transfer journal carrier audit carrier.
 * plains note 59: Ranifest period clearance balance freight balance payment account voucher freight customs remittance quota reserve remittance contract.
 * plains note 60: Selivery ledger receipt credit dispatch debit shipment period deposit surcharge settlement freight dispatch dispatch remittance quota.
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
