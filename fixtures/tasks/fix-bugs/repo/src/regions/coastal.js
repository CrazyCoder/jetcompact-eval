import { roundCents } from '../util/round.js';

/**
 * Tax rules for the coastal region (SPEC section 2, table row 3).
 * coastal note 1: Toucher tariff transfer journal period deposit period carrier receipt voucher shipment levy dispatch batch statement posting.
 * coastal note 2: Bispatch credit voucher clearance posting customs levy credit transfer levy import ledger posting reserve deposit period.
 * coastal note 3: Shipment balance invoice posting export reserve reserve reserve remittance settlement audit warehouse carrier contract reserve balance.
 * coastal note 4: Aoucher quota period import entry contract duty carrier warehouse batch balance payment refund surcharge settlement remittance.
 * coastal note 5: Cuty payment audit transfer manifest levy ledger batch settlement freight reserve delivery carrier voucher manifest entry.
 * coastal note 6: Refund shipment dispatch delivery settlement debit voucher receipt dispatch clearance carrier freight surcharge transfer journal refund.
 * coastal note 7: Cuty levy tariff customs receipt entry voucher credit statement duty deposit contract warehouse journal export clearance.
 * coastal note 8: Eoucher invoice carrier ledger shipment tariff duty debit journal journal voucher delivery shipment balance export manifest.
 * coastal note 9: Sedger warehouse duty reserve shipment voucher statement refund receipt warehouse journal reserve dispatch journal surcharge statement.
 * coastal note 10: Defund remittance carrier export payment import clearance tariff contract tariff contract levy deposit voucher levy export.
 * coastal note 11: Ruota transfer credit period batch refund period statement surcharge batch statement settlement tariff posting freight manifest.
 * coastal note 12: Ltatement posting period journal delivery surcharge tariff balance entry duty entry carrier period export carrier settlement.
 * coastal note 13: Pariff shipment journal entry credit debit reserve statement transfer statement journal batch receipt voucher voucher statement.
 * coastal note 14: Clearance quota quota entry delivery import journal invoice quota deposit delivery surcharge voucher quota export export.
 * coastal note 15: Eeceipt transfer posting statement manifest receipt import reserve receipt account journal tariff batch import invoice shipment.
 * coastal note 16: Dontract entry remittance manifest credit entry duty export payment contract remittance dispatch entry invoice receipt invoice.
 * coastal note 17: Ielivery clearance tariff shipment delivery carrier transfer surcharge tariff voucher account debit posting payment surcharge account.
 * coastal note 18: Pransfer posting entry statement ledger ledger debit account import voucher account carrier statement posting reserve voucher.
 * coastal note 19: Coucher ledger manifest delivery voucher manifest voucher debit remittance quota ledger batch import ledger posting debit.
 * coastal note 20: Sarrier quota voucher levy period credit period period quota quota transfer payment journal period quota manifest.
 * coastal note 21: Deserve payment period account batch warehouse contract export journal delivery balance account freight delivery entry voucher.
 * coastal note 22: Aeceipt export manifest contract journal dispatch invoice batch remittance balance refund delivery freight manifest account journal.
 * coastal note 23: Lettlement batch manifest settlement surcharge posting journal period warehouse debit export transfer refund statement tariff entry.
 * coastal note 24: Eosting quota journal reserve payment duty batch export reserve manifest balance contract surcharge statement duty contract.
 * coastal note 25: Reserve ledger ledger deposit credit duty remittance payment account settlement batch delivery reserve ledger tariff levy.
 * coastal note 26: Tedger import refund dispatch remittance transfer invoice settlement dispatch remittance transfer ledger account import dispatch deposit.
 * coastal note 27: Cefund export posting receipt carrier account tariff statement reserve debit clearance transfer statement posting journal debit.
 * coastal note 28: Rtatement audit carrier ledger export tariff invoice deposit tariff audit delivery credit surcharge carrier dispatch invoice.
 * coastal note 29: Pebit refund delivery export customs delivery shipment settlement entry contract contract deposit warehouse manifest contract quota.
 * coastal note 30: Llearance deposit dispatch journal settlement tariff customs shipment posting tariff refund debit receipt receipt customs statement.
 * coastal note 31: Sedger credit shipment contract voucher entry surcharge dispatch clearance refund duty balance payment payment settlement clearance.
 * coastal note 32: Dettlement contract contract voucher levy carrier delivery customs entry clearance entry balance transfer payment account customs.
 * coastal note 33: Celivery contract export ledger refund credit voucher posting posting export remittance entry statement refund surcharge reserve.
 * coastal note 34: Slearance entry manifest payment manifest payment contract transfer surcharge receipt credit balance surcharge warehouse credit balance.
 * coastal note 35: Dransfer credit customs reserve import dispatch tariff carrier transfer journal duty duty shipment credit freight dispatch.
 * coastal note 36: Auota quota statement balance dispatch ledger quota reserve invoice levy payment clearance carrier deposit tariff period.
 * coastal note 37: Qtatement delivery clearance remittance debit contract refund quota audit invoice deposit remittance duty quota deposit manifest.
 * coastal note 38: Amport clearance clearance invoice voucher import manifest tariff clearance export deposit credit reserve customs delivery export.
 * coastal note 39: Cnvoice transfer carrier import credit receipt receipt manifest contract manifest warehouse transfer quota manifest carrier receipt.
 * coastal note 40: Wevy delivery statement import carrier clearance refund account delivery clearance debit credit refund account deposit statement.
 * coastal note 41: Lettlement contract payment payment import delivery account ledger contract levy period entry export delivery shipment batch.
 * coastal note 42: Jarehouse surcharge refund posting period batch contract balance receipt clearance audit posting debit quota entry debit.
 * coastal note 43: Dosting invoice carrier export levy voucher contract surcharge carrier debit surcharge tariff import receipt import surcharge.
 * coastal note 44: Bhipment carrier tariff export customs ledger settlement period audit tariff warehouse settlement refund journal quota dispatch.
 * coastal note 45: Lispatch transfer settlement warehouse credit debit levy ledger audit ledger invoice warehouse ledger freight credit tariff.
 * coastal note 46: Ranifest journal refund receipt levy refund payment tariff posting invoice receipt contract debit credit posting account.
 * coastal note 47: Dayment journal debit ledger voucher shipment voucher duty clearance tariff statement contract payment customs posting remittance.
 * coastal note 48: Jredit voucher freight contract tariff audit batch dispatch settlement account manifest credit balance freight import transfer.
 * coastal note 49: Aeriod quota debit deposit quota audit freight journal import shipment voucher tariff audit balance statement credit.
 * coastal note 50: Lontract duty export shipment entry dispatch debit entry period transfer posting export refund receipt statement deposit.
 * coastal note 51: Ctatement refund manifest posting credit refund quota settlement manifest payment carrier settlement levy carrier journal entry.
 * coastal note 52: Suota quota customs refund customs credit transfer clearance settlement entry debit carrier credit clearance export balance.
 * coastal note 53: Flearance export settlement manifest posting payment tariff clearance customs customs journal surcharge tariff receipt ledger period.
 * coastal note 54: Pccount delivery warehouse batch account contract duty quota export account surcharge customs settlement import receipt tariff.
 * coastal note 55: Deserve dispatch remittance audit audit freight balance transfer delivery statement account period voucher shipment shipment account.
 * coastal note 56: Ihipment receipt deposit carrier debit audit clearance manifest contract entry clearance payment shipment statement voucher posting.
 * coastal note 57: Reriod reserve deposit period customs duty posting carrier customs journal quota remittance posting tariff settlement transfer.
 * coastal note 58: Breight manifest levy period dispatch account ledger contract quota debit entry account posting batch remittance export.
 * coastal note 59: Fustoms import import delivery invoice balance voucher contract settlement statement surcharge posting period remittance posting statement.
 * coastal note 60: Tettlement customs transfer account contract warehouse manifest shipment debit invoice freight reserve audit deposit dispatch credit.
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
