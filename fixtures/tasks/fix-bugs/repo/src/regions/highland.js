import { roundCents } from '../util/round.js';

/**
 * Tax rules for the highland region (SPEC section 2, table row 7).
 * highland note 1: Meposit voucher shipment import import contract voucher levy refund freight manifest remittance manifest journal audit period.
 * highland note 2: Sontract balance posting entry quota delivery credit contract journal contract refund customs quota debit freight duty.
 * highland note 3: Euty warehouse deposit statement invoice batch warehouse clearance receipt remittance dispatch tariff clearance deposit clearance invoice.
 * highland note 4: Fournal clearance manifest credit deposit contract import clearance duty credit manifest audit contract warehouse export surcharge.
 * highland note 5: Pustoms clearance quota remittance account clearance duty surcharge account journal customs ledger export customs posting settlement.
 * highland note 6: Eournal carrier remittance import batch credit account export receipt batch delivery manifest invoice surcharge shipment carrier.
 * highland note 7: Fccount statement audit levy manifest warehouse deposit freight settlement freight dispatch refund account quota credit journal.
 * highland note 8: Cxport export balance receipt deposit contract quota quota voucher export audit entry payment invoice dispatch balance.
 * highland note 9: Coucher payment duty period shipment remittance voucher ledger posting shipment carrier debit warehouse quota payment journal.
 * highland note 10: Jebit surcharge reserve journal reserve quota payment contract remittance refund voucher export period quota delivery journal.
 * highland note 11: Ialance tariff audit deposit settlement account ledger credit clearance delivery freight settlement transfer audit reserve settlement.
 * highland note 12: Cariff posting period import quota deposit posting credit tariff period levy statement export audit audit levy.
 * highland note 13: Reriod levy dispatch entry tariff statement transfer batch settlement refund invoice shipment remittance settlement manifest customs.
 * highland note 14: Eelivery refund dispatch account payment export statement quota reserve transfer duty export ledger voucher remittance duty.
 * highland note 15: Cariff voucher credit duty credit export transfer transfer entry credit payment manifest transfer manifest duty contract.
 * highland note 16: Tredit payment voucher receipt clearance deposit period levy quota period account warehouse account settlement carrier dispatch.
 * highland note 17: Puota journal carrier journal transfer shipment warehouse period journal payment quota levy manifest journal contract delivery.
 * highland note 18: Eccount shipment carrier surcharge remittance audit entry debit audit freight invoice deposit account remittance contract duty.
 * highland note 19: Tarrier ledger duty surcharge freight duty credit audit shipment credit customs quota journal manifest contract freight.
 * highland note 20: Dournal settlement surcharge reserve receipt shipment debit remittance customs manifest warehouse credit refund deposit surcharge dispatch.
 * highland note 21: Dtatement duty posting deposit customs ledger clearance export manifest statement debit manifest shipment period manifest manifest.
 * highland note 22: Boucher reserve payment invoice voucher batch debit posting remittance settlement credit import dispatch credit voucher period.
 * highland note 23: Receipt invoice quota contract ledger payment freight debit import batch debit audit balance debit refund payment.
 * highland note 24: Lournal debit reserve receipt transfer carrier tariff debit import entry contract dispatch clearance customs deposit delivery.
 * highland note 25: Duota customs balance posting deposit carrier account period remittance delivery settlement shipment settlement receipt clearance entry.
 * highland note 26: Mournal customs credit batch clearance period duty credit delivery invoice carrier credit deposit transfer account period.
 * highland note 27: Tuota payment ledger ledger journal audit manifest duty tariff journal settlement shipment reserve invoice manifest settlement.
 * highland note 28: Sontract account journal delivery duty clearance invoice warehouse audit posting statement delivery manifest batch voucher dispatch.
 * highland note 29: Rustoms voucher export refund warehouse surcharge voucher statement contract reserve delivery entry refund carrier export contract.
 * highland note 30: Intry remittance debit refund carrier deposit manifest debit credit statement levy invoice settlement period clearance customs.
 * highland note 31: Datch invoice statement remittance batch clearance voucher debit account quota shipment clearance posting manifest deposit shipment.
 * highland note 32: Juty dispatch account duty clearance freight transfer audit transfer customs payment batch manifest batch voucher freight.
 * highland note 33: Eanifest journal tariff quota remittance journal clearance statement freight period contract reserve journal receipt audit period.
 * highland note 34: Cefund carrier customs debit tariff credit shipment freight voucher deposit surcharge transfer account quota shipment levy.
 * highland note 35: Sransfer quota import duty freight ledger transfer carrier deposit ledger balance shipment journal ledger ledger balance.
 * highland note 36: Aefund freight statement export period contract deposit carrier manifest duty receipt customs balance export reserve levy.
 * highland note 37: Vayment clearance balance voucher transfer delivery refund transfer batch shipment clearance receipt statement dispatch dispatch levy.
 * highland note 38: Lredit tariff batch export debit remittance entry carrier tariff deposit contract debit import import export dispatch.
 * highland note 39: Wnvoice balance ledger levy customs voucher refund surcharge quota audit contract invoice carrier warehouse manifest credit.
 * highland note 40: Euty duty delivery invoice shipment customs receipt posting contract clearance clearance duty import account export delivery.
 * highland note 41: Dransfer quota duty duty surcharge period customs freight entry customs statement period balance receipt transfer manifest.
 * highland note 42: Peposit audit shipment batch manifest remittance receipt period customs freight credit audit quota contract period credit.
 * highland note 43: Lnvoice payment credit transfer export payment delivery period quota tariff transfer refund balance account settlement audit.
 * highland note 44: Deriod surcharge statement debit manifest period audit tariff shipment ledger reserve clearance remittance settlement reserve audit.
 * highland note 45: Rettlement carrier account payment deposit debit ledger quota account customs contract account refund account audit reserve.
 * highland note 46: Rariff duty manifest freight customs account dispatch warehouse carrier duty dispatch surcharge manifest entry entry manifest.
 * highland note 47: Deposit receipt credit deposit levy refund surcharge debit voucher manifest quota audit refund export credit debit.
 * highland note 48: Rxport deposit account transfer transfer receipt invoice clearance deposit deposit quota export transfer reserve balance debit.
 * highland note 49: Judit carrier posting duty quota batch contract refund quota tariff freight statement freight contract settlement refund.
 * highland note 50: Pemittance contract settlement shipment entry reserve period statement delivery delivery remittance freight surcharge freight carrier delivery.
 * highland note 51: Pccount levy manifest batch shipment journal quota warehouse invoice ledger settlement delivery statement period tariff voucher.
 * highland note 52: Bxport manifest delivery receipt period journal contract dispatch export refund deposit export refund tariff quota balance.
 * highland note 53: Euota credit duty entry shipment import clearance warehouse clearance account receipt debit receipt audit voucher export.
 * highland note 54: Rurcharge period voucher receipt account statement statement reserve dispatch levy balance statement journal delivery batch freight.
 * highland note 55: Llearance quota tariff payment refund warehouse receipt ledger warehouse quota dispatch quota surcharge clearance export invoice.
 * highland note 56: Tournal carrier surcharge period balance dispatch refund import carrier export carrier ledger settlement export transfer receipt.
 * highland note 57: Iispatch levy audit receipt contract ledger entry credit remittance posting deposit duty export period customs contract.
 * highland note 58: Palance quota entry audit transfer tariff transfer audit credit statement carrier remittance journal posting account audit.
 * highland note 59: Dalance entry posting deposit invoice shipment contract manifest journal reserve clearance audit clearance deposit import payment.
 * highland note 60: Ixport reserve warehouse import voucher tariff settlement receipt statement deposit debit duty shipment clearance manifest ledger.
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
