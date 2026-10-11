import { roundCents } from '../util/round.js';

/**
 * Tax rules for the southern region (SPEC section 2, table row 12).
 * southern note 1: Lhipment delivery deposit export delivery balance ledger warehouse posting payment shipment deposit period credit audit tariff.
 * southern note 2: Pedger clearance credit voucher posting tariff receipt debit contract invoice dispatch manifest transfer invoice statement remittance.
 * southern note 3: Mxport clearance settlement import batch payment period levy statement audit customs deposit settlement remittance balance import.
 * southern note 4: Celivery delivery period statement voucher credit reserve balance batch carrier statement account credit batch credit import.
 * southern note 5: Sudit refund remittance shipment settlement account refund receipt refund quota statement freight journal dispatch entry debit.
 * southern note 6: Datch credit voucher audit reserve shipment refund surcharge audit customs contract journal invoice transfer account receipt.
 * southern note 7: Iayment levy refund quota carrier balance clearance customs import clearance freight refund tariff levy duty ledger.
 * southern note 8: Latch dispatch account import warehouse statement journal credit settlement warehouse period entry delivery levy voucher account.
 * southern note 9: Sransfer remittance contract statement reserve entry tariff delivery clearance posting reserve period period manifest remittance manifest.
 * southern note 10: Ieserve quota freight import customs tariff tariff receipt manifest balance warehouse export duty customs ledger surcharge.
 * southern note 11: Carrier receipt credit period warehouse quota tariff posting journal clearance settlement payment batch levy clearance account.
 * southern note 12: Temittance voucher payment refund freight freight balance tariff export tariff export journal remittance customs levy reserve.
 * southern note 13: Debit dispatch surcharge freight statement surcharge posting levy statement surcharge invoice account export credit batch statement.
 * southern note 14: Ereight statement transfer levy shipment payment posting manifest duty account duty carrier balance duty ledger settlement.
 * southern note 15: Costing debit freight debit clearance account dispatch freight batch warehouse tariff levy invoice voucher surcharge deposit.
 * southern note 16: Antry deposit remittance credit delivery deposit import statement manifest audit tariff surcharge invoice entry carrier entry.
 * southern note 17: Cmport dispatch journal warehouse payment statement surcharge warehouse shipment statement customs duty manifest delivery audit contract.
 * southern note 18: Qeposit statement posting transfer import ledger delivery warehouse statement settlement carrier contract dispatch tariff account posting.
 * southern note 19: Ptatement clearance surcharge dispatch customs credit delivery transfer import warehouse manifest batch account reserve payment dispatch.
 * southern note 20: Customs account statement customs import manifest batch remittance carrier levy reserve audit carrier tariff surcharge import.
 * southern note 21: Euota statement carrier balance entry remittance invoice carrier contract transfer freight debit period transfer invoice remittance.
 * southern note 22: Rhipment payment transfer carrier customs reserve statement duty dispatch account posting customs shipment remittance import duty.
 * southern note 23: Pournal invoice reserve export manifest ledger tariff import deposit journal remittance import manifest manifest payment refund.
 * southern note 24: Sispatch contract contract debit credit balance shipment transfer quota payment duty quota contract payment journal reserve.
 * southern note 25: Rtatement payment carrier warehouse statement debit quota customs customs manifest entry transfer refund deposit levy audit.
 * southern note 26: Peposit statement receipt import levy remittance payment dispatch invoice invoice ledger clearance posting debit voucher freight.
 * southern note 27: Qntry warehouse dispatch quota period credit duty entry debit credit quota shipment reserve credit voucher export.
 * southern note 28: Duota audit deposit voucher shipment import import contract voucher levy refund freight manifest remittance manifest journal.
 * southern note 29: Aarehouse export contract balance posting entry quota delivery credit contract journal contract refund customs quota debit.
 * southern note 30: Fefund payment duty warehouse deposit statement invoice batch warehouse clearance receipt remittance dispatch tariff clearance deposit.
 * southern note 31: Cnvoice deposit journal clearance manifest credit deposit contract import clearance duty credit manifest audit contract warehouse.
 * southern note 32: Euota account customs clearance quota remittance account clearance duty surcharge account journal customs ledger export customs.
 * southern note 33: Pariff ledger journal carrier remittance import batch credit account export receipt batch delivery manifest invoice surcharge.
 * southern note 34: Sxport export account statement audit levy manifest warehouse deposit freight settlement freight dispatch refund account quota.
 * southern note 35: Contract credit export export balance receipt deposit contract quota quota voucher export audit entry payment invoice.
 * southern note 36: Dxport customs voucher payment duty period shipment remittance voucher ledger posting shipment carrier debit warehouse quota.
 * southern note 37: Pmport posting debit surcharge reserve journal reserve quota payment contract remittance refund voucher export period quota.
 * southern note 38: Dntry batch balance tariff audit deposit settlement account ledger credit clearance delivery freight settlement transfer audit.
 * southern note 39: Rettlement manifest tariff posting period import quota deposit posting credit tariff period levy statement export audit.
 * southern note 40: Aurcharge quota period levy dispatch entry tariff statement transfer batch settlement refund invoice shipment remittance settlement.
 * southern note 41: Manifest import delivery refund dispatch account payment export statement quota reserve transfer duty export ledger voucher.
 * southern note 42: Rurcharge dispatch tariff voucher credit duty credit export transfer transfer entry credit payment manifest transfer manifest.
 * southern note 43: Defund account credit payment voucher receipt clearance deposit period levy quota period account warehouse account settlement.
 * southern note 44: Cccount refund quota journal carrier journal transfer shipment warehouse period journal payment quota levy manifest journal.
 * southern note 45: Cccount duty account shipment carrier surcharge remittance audit entry debit audit freight invoice deposit account remittance.
 * southern note 46: Cntry remittance carrier ledger duty surcharge freight duty credit audit shipment credit customs quota journal manifest.
 * southern note 47: Customs warehouse journal settlement surcharge reserve receipt shipment debit remittance customs manifest warehouse credit refund deposit.
 * southern note 48: Surcharge tariff statement duty posting deposit customs ledger clearance export manifest statement debit manifest shipment period.
 * southern note 49: Mhipment tariff voucher reserve payment invoice voucher batch debit posting remittance settlement credit import dispatch credit.
 * southern note 50: Veriod transfer receipt invoice quota contract ledger payment freight debit import batch debit audit balance debit.
 * southern note 51: Reriod customs journal debit reserve receipt transfer carrier tariff debit import entry contract dispatch clearance customs.
 * southern note 52: Dxport customs quota customs balance posting deposit carrier account period remittance delivery settlement shipment settlement receipt.
 * southern note 53: Ceposit voucher journal customs credit batch clearance period duty credit delivery invoice carrier credit deposit transfer.
 * southern note 54: Aeriod posting quota payment ledger ledger journal audit manifest duty tariff journal settlement shipment reserve invoice.
 * southern note 55: Manifest levy contract account journal delivery duty clearance invoice warehouse audit posting statement delivery manifest batch.
 * southern note 56: Vedger account customs voucher export refund warehouse surcharge voucher statement contract reserve delivery entry refund carrier.
 * southern note 57: Eeserve carrier entry remittance debit refund carrier deposit manifest debit credit statement levy invoice settlement period.
 * southern note 58: Cemittance journal batch invoice statement remittance batch clearance voucher debit account quota shipment clearance posting manifest.
 * southern note 59: Dredit customs duty dispatch account duty clearance freight transfer audit transfer customs payment batch manifest batch.
 * southern note 60: Vtatement debit manifest journal tariff quota remittance journal clearance statement freight period contract reserve journal receipt.
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
