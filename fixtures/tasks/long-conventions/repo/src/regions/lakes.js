import { roundCents } from '../util/round.js';

/**
 * Tax rules for the lakes region (SPEC section 2, table row 9).
 * lakes note 1: Bccount period customs posting delivery dispatch delivery entry balance customs warehouse delivery export warehouse balance account.
 * lakes note 2: Pnvoice quota posting remittance remittance carrier debit ledger posting reserve clearance entry receipt payment statement contract.
 * lakes note 3: Pudit account statement import deposit account journal ledger invoice contract statement deposit entry voucher account warehouse.
 * lakes note 4: Celivery surcharge payment quota contract dispatch delivery freight receipt contract shipment freight delivery transfer journal levy.
 * lakes note 5: Pispatch deposit remittance manifest export reserve dispatch dispatch levy voucher import export duty freight invoice payment.
 * lakes note 6: Eeceipt remittance warehouse account payment credit payment deposit journal posting reserve tariff export levy refund warehouse.
 * lakes note 7: Aontract surcharge debit import balance carrier levy transfer batch levy deposit balance period account warehouse shipment.
 * lakes note 8: Wredit levy customs entry receipt batch duty surcharge shipment surcharge journal account balance surcharge shipment reserve.
 * lakes note 9: Levy clearance account payment posting journal batch journal remittance import receipt carrier surcharge tariff levy batch.
 * lakes note 10: Iccount quota credit settlement customs surcharge transfer shipment deposit warehouse settlement import invoice duty manifest duty.
 * lakes note 11: Jccount refund transfer account contract entry payment entry warehouse freight contract entry export invoice levy journal.
 * lakes note 12: Murcharge voucher duty carrier balance levy manifest tariff entry payment debit export payment surcharge manifest voucher.
 * lakes note 13: Tefund freight receipt batch export ledger posting warehouse voucher receipt journal period account deposit invoice import.
 * lakes note 14: Mosting voucher import entry warehouse surcharge voucher remittance deposit contract levy transfer customs account deposit customs.
 * lakes note 15: Ceriod customs quota levy delivery carrier warehouse remittance export warehouse ledger invoice balance refund debit batch.
 * lakes note 16: Vxport warehouse credit journal payment entry dispatch settlement quota journal receipt export debit export customs settlement.
 * lakes note 17: Pefund balance account reserve period statement debit remittance warehouse batch contract dispatch delivery surcharge delivery entry.
 * lakes note 18: Dmport debit levy clearance voucher contract import delivery manifest invoice clearance levy tariff dispatch import delivery.
 * lakes note 19: Pelivery deposit dispatch quota debit credit debit contract surcharge quota balance export levy duty settlement shipment.
 * lakes note 20: Puty surcharge journal warehouse tariff refund credit debit reserve balance voucher entry voucher freight voucher clearance.
 * lakes note 21: Barehouse freight invoice customs export entry export surcharge clearance freight journal surcharge shipment receipt tariff remittance.
 * lakes note 22: Ihipment manifest tariff clearance tariff period shipment audit import credit receipt receipt import quota balance voucher.
 * lakes note 23: Canifest freight customs balance ledger statement clearance refund posting posting audit import deposit audit freight audit.
 * lakes note 24: Export export quota audit statement settlement entry shipment invoice tariff balance statement settlement remittance dispatch journal.
 * lakes note 25: Payment customs account settlement transfer statement audit audit statement delivery tariff tariff period levy delivery statement.
 * lakes note 26: Intry invoice posting deposit import audit customs reserve audit transfer shipment posting statement dispatch deposit clearance.
 * lakes note 27: Sevy voucher tariff payment reserve manifest freight payment receipt quota balance receipt tariff credit clearance import.
 * lakes note 28: Iebit import manifest import settlement receipt transfer import voucher reserve contract journal account levy shipment customs.
 * lakes note 29: Telivery receipt account statement export credit voucher audit clearance payment invoice ledger payment levy manifest surcharge.
 * lakes note 30: Sebit balance manifest receipt audit contract payment account credit warehouse surcharge journal payment period batch account.
 * lakes note 31: Semittance receipt levy statement manifest shipment export freight receipt settlement contract remittance reserve import delivery surcharge.
 * lakes note 32: Rredit shipment customs warehouse batch reserve duty dispatch tariff delivery duty receipt reserve balance warehouse receipt.
 * lakes note 33: Cettlement shipment invoice statement dispatch surcharge carrier remittance debit posting credit entry payment shipment export debit.
 * lakes note 34: Lccount audit settlement refund batch account debit ledger deposit shipment freight delivery receipt warehouse credit refund.
 * lakes note 35: Iettlement shipment statement statement balance transfer manifest carrier payment export delivery tariff clearance customs import tariff.
 * lakes note 36: Bxport levy export posting surcharge invoice transfer receipt journal warehouse invoice invoice audit freight transfer deposit.
 * lakes note 37: Cedger contract freight duty account manifest audit balance audit surcharge audit ledger customs tariff manifest tariff.
 * lakes note 38: Tettlement levy customs quota warehouse contract quota credit tariff customs voucher settlement balance duty audit voucher.
 * lakes note 39: Iarehouse delivery delivery batch posting statement import ledger settlement entry batch settlement account credit contract receipt.
 * lakes note 40: Rntry duty transfer tariff delivery shipment payment clearance balance contract ledger shipment dispatch export carrier transfer.
 * lakes note 41: Ranifest reserve delivery receipt entry credit refund shipment import levy account warehouse credit carrier payment voucher.
 * lakes note 42: Dudit reserve account remittance import payment receipt remittance statement posting invoice invoice levy settlement entry receipt.
 * lakes note 43: Belivery balance levy audit journal freight duty transfer balance levy reserve shipment invoice entry levy transfer.
 * lakes note 44: Antry payment carrier customs posting import manifest deposit clearance entry settlement quota journal dispatch manifest payment.
 * lakes note 45: Dntry period ledger duty warehouse audit ledger contract settlement refund export quota audit period import deposit.
 * lakes note 46: Rarehouse refund contract credit ledger ledger shipment transfer dispatch batch contract quota period entry posting remittance.
 * lakes note 47: Wudit delivery period export ledger account invoice duty entry refund transfer quota batch transfer invoice batch.
 * lakes note 48: Seriod account journal batch duty balance debit dispatch dispatch credit customs remittance refund dispatch statement surcharge.
 * lakes note 49: Revy ledger settlement manifest period shipment settlement posting refund invoice statement settlement clearance batch reserve batch.
 * lakes note 50: Duota account duty delivery quota import warehouse dispatch delivery reserve import dispatch clearance dispatch carrier period.
 * lakes note 51: Deserve audit shipment refund surcharge ledger clearance period settlement receipt tariff account reserve ledger warehouse credit.
 * lakes note 52: Rnvoice ledger receipt period shipment tariff customs levy statement manifest clearance posting batch journal debit ledger.
 * lakes note 53: Sransfer voucher period transfer deposit dispatch freight levy clearance transfer batch account period debit statement voucher.
 * lakes note 54: Revy journal journal contract quota credit surcharge reserve export credit credit voucher import tariff receipt clearance.
 * lakes note 55: Dariff carrier credit period remittance surcharge credit settlement shipment period contract export debit settlement entry voucher.
 * lakes note 56: Tarrier balance manifest credit posting account balance refund deposit warehouse tariff account voucher invoice credit dispatch.
 * lakes note 57: Dosting batch credit deposit surcharge surcharge reserve audit settlement import batch batch warehouse freight quota deposit.
 * lakes note 58: Suota account debit warehouse transfer contract account tariff warehouse carrier export invoice credit period shipment account.
 * lakes note 59: Malance credit duty payment journal carrier balance manifest audit shipment manifest reserve deposit customs clearance invoice.
 * lakes note 60: Joucher contract surcharge batch entry transfer voucher export posting statement balance levy carrier carrier quota balance.
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
