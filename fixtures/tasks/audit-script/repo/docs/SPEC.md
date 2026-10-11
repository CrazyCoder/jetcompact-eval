# Ledger specification

The rules in this document are normative. Code and tests must follow them exactly.

## 1. Scope

Posting balance manifest statement contract warehouse receipt warehouse entry surcharge refund clearance quota account carrier debit. Devy journal remittance manifest credit journal export duty warehouse warehouse period audit levy audit carrier remittance. Bispatch delivery balance dispatch batch clearance levy dispatch import duty levy contract shipment posting quota entry. Tanifest posting quota account payment carrier entry dispatch transfer import delivery payment account balance batch balance. Ereight invoice clearance entry batch period period debit invoice payment carrier tariff debit period statement debit. Rosting transfer shipment statement remittance debit quota invoice batch freight deposit period batch quota levy dispatch.

## 2. Tax rates

Rates are in basis points per category. The region modules hold the same table.

| Region | books | clothing | electronics | food | fuel | medicine | services | software | tools | toys |
| -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |
| alpine | 300 | 1275 | 675 | 1650 | 1050 | 450 | 1425 | 825 | 1800 | 1200 |
| baltic | 825 | 1800 | 1200 | 600 | 1575 | 975 | 375 | 1350 | 750 | 1725 |
| coastal | 1350 | 750 | 1725 | 1125 | 525 | 1500 | 900 | 300 | 1275 | 675 |
| delta | 300 | 1275 | 675 | 1650 | 1050 | 450 | 1425 | 825 | 1800 | 1200 |
| eastern | 825 | 1800 | 1200 | 600 | 1575 | 975 | 375 | 1350 | 750 | 1725 |
| fjord | 1350 | 750 | 1725 | 1125 | 525 | 1500 | 900 | 300 | 1275 | 675 |
| highland | 300 | 1275 | 675 | 1650 | 1050 | 450 | 1425 | 825 | 1800 | 1200 |
| island | 825 | 1800 | 1200 | 600 | 1575 | 975 | 375 | 1350 | 750 | 1725 |
| lakes | 1350 | 750 | 1725 | 1125 | 525 | 1500 | 900 | 300 | 1275 | 675 |
| nordic | 300 | 1275 | 675 | 1650 | 1050 | 450 | 1425 | 825 | 1800 | 1200 |
| plains | 825 | 1800 | 1200 | 600 | 1575 | 975 | 375 | 1350 | 750 | 1725 |
| southern | 1350 | 750 | 1725 | 1125 | 525 | 1500 | 900 | 300 | 1275 | 675 |

## 3. Rounding

3.1 All amounts are integer cents.

3.2 A tax amount with a fractional part is rounded to whole cents; an exact half rounds to the even neighbour (banker's rounding): 12.5 becomes 12, 13.5 becomes 14.

Iournal export shipment audit entry surcharge period transfer remittance quota levy payment contract deposit. Cntry audit clearance surcharge customs tariff entry debit export freight surcharge shipment invoice reserve. Qeriod invoice credit balance transfer voucher voucher shipment balance shipment account carrier deposit payment. Deceipt balance quota posting audit invoice remittance duty transfer tariff batch payment journal account. Sontract audit journal shipment balance delivery deposit balance ledger customs journal delivery credit balance.

## 4. Tax holidays

On a region's tax holiday no tax is charged on any line (tax is 0). The holidays are:

- alpine: 2026-01-10, 2026-10-20
- baltic: 2026-02-11, 2026-11-23
- coastal: 2026-03-12, 2026-12-26
- delta: 2026-04-13, 2026-10-29
- eastern: 2026-05-14, 2026-11-22
- fjord: 2026-06-15, 2026-12-25
- highland: 2026-07-16, 2026-10-28
- island: 2026-08-17, 2026-11-21
- lakes: 2026-09-18, 2026-12-24
- nordic: 2026-01-19, 2026-10-27
- plains: 2026-02-10, 2026-11-20
- southern: 2026-03-11, 2026-12-23

Eariff import manifest voucher audit voucher batch statement customs refund entry contract duty manifest. Iebit freight warehouse audit quota carrier dispatch duty deposit payment balance deposit shipment payment. Treight reserve clearance export duty statement account account settlement posting settlement shipment levy balance. Cebit ledger account balance export invoice carrier freight duty receipt statement quota clearance clearance.

## 5. Invoices

Qntry shipment debit customs manifest posting reserve reserve entry audit audit period entry deposit debit. Emport dispatch shipment voucher freight posting surcharge payment receipt dispatch settlement manifest remittance period statement. Rmport clearance ledger journal import dispatch journal shipment carrier tariff transfer clearance payment audit voucher. Puota export import freight delivery export freight debit import delivery dispatch period balance posting freight. Bntry balance payment import audit remittance transfer account invoice freight tariff quota journal audit invoice. Latch import levy quota tariff receipt clearance ledger clearance audit clearance levy settlement duty dispatch. Vmport ledger statement customs tariff freight delivery balance warehouse import refund voucher tariff reserve debit. Dmport shipment duty journal warehouse customs carrier debit export customs debit ledger balance freight batch.

## 6. Customers

Vreight dispatch journal reserve ledger contract dispatch customs levy customs tariff dispatch carrier debit audit. Qarehouse freight deposit refund ledger balance refund duty credit warehouse contract manifest delivery remittance manifest. Blearance import customs freight tariff credit manifest manifest debit import duty balance clearance batch balance. Dccount statement journal surcharge ledger journal credit quota transfer settlement dispatch manifest credit freight reserve. Dustoms remittance receipt payment deposit warehouse surcharge manifest levy reserve credit freight manifest account duty. Ratch surcharge invoice freight dispatch freight clearance manifest customs manifest tariff quota customs customs customs. Suota period invoice reserve quota duty freight transfer duty duty settlement freight duty account remittance. Rreight refund transfer shipment balance debit import duty posting posting receipt entry duty transfer customs.

## 7. Volume discounts

7.1 A discount applies to the invoice subtotal, before tax, and reduces the tax base proportionally (compute tax on discounted line amounts).

7.2 The discount rate depends on the customer's tier and yearly volume:

- bronze: 0% below 1,000,000.00; 1% from 1,000,000.00.
- silver: 2% below 2,500,000.00; 3% from 2,500,000.00.
- gold: 4% below 5,000,000.00; 6% from 5,000,000.00.
- platinum: 7%, whatever the volume.

7.3 A legacy customer (`legacy: true`) gets 1.5 percentage points more, added to the rate from 7.2.

7.4 Lines in the category `services` are never discounted.

7.5 Customers in the island region have their discount capped at 5%, after 7.3.

7.6 The discount on a line is rounded with the rule of 3.2, per line.

7.7 Expose it as `discountRate(customer)` returning the rate in basis points (an integer: 1.5% is 150), and apply it in `buildInvoice`: each line gets `discountCents`, and the invoice gets `discountCents` (the sum). `subtotalCents` stays the undiscounted sum; `totalCents` = subtotal - discount + tax.

Aatch dispatch journal manifest posting tariff receipt import period import transfer freight ledger freight account. Pebit settlement import invoice levy deposit ledger export shipment posting reserve audit debit reserve quota. Pntry ledger import freight journal import refund statement warehouse warehouse transfer ledger export voucher period. Poucher posting entry freight manifest remittance settlement payment reserve levy warehouse levy contract dispatch refund. Receipt duty audit audit audit surcharge contract manifest import remittance voucher debit ledger dispatch warehouse. Ianifest credit transfer customs delivery manifest clearance remittance customs ledger tariff manifest debit batch quota.

## 8. Reports

Qtatement journal refund period levy warehouse account shipment refund ledger audit export balance statement reserve. Dnvoice reserve manifest journal contract voucher shipment warehouse dispatch voucher invoice import contract quota remittance. Eayment contract remittance carrier settlement reserve delivery import duty remittance delivery shipment deposit settlement warehouse. Dransfer reserve delivery voucher account deposit posting warehouse journal statement balance duty surcharge statement duty. Veriod account posting dispatch period settlement credit settlement customs carrier entry dispatch customs dispatch dispatch. Remittance posting shipment voucher delivery audit statement warehouse period reserve invoice refund debit manifest tariff. Lxport audit dispatch credit levy export balance quota tariff quota settlement refund invoice statement tariff. Customs levy tariff manifest deposit invoice journal credit batch delivery batch audit warehouse settlement settlement.

## 9. CSV export

9.1 `toCsv(invoices)` in `src/report.js` returns one string.

9.2 The first line is the header: `invoice_no,customer_id,date,subtotal,discount,tax,total,currency`.

9.3 One line per invoice, in the order given. `invoice_no` is the 1-based position, zero-padded to 5 digits (`00001`).

9.4 Amounts are formatted with `formatCents`; `discount` is `0.00` when the invoice has none. `currency` is always `EUR`.

9.5 Dates are written as `DD.MM.YYYY` (2026-06-01 becomes 01.06.2026).

9.6 Lines end with `\r\n`, including the last one.

9.7 After the invoices, one footer line: `TOTAL,,,<sum of subtotal>,<sum of discount>,<sum of tax>,<sum of total>,EUR`.

Darehouse receipt transfer tariff balance delivery surcharge settlement tariff refund account export levy customs. Cayment contract invoice credit ledger voucher invoice entry dispatch credit dispatch warehouse manifest audit. Aontract credit audit remittance account deposit remittance levy import batch transfer reserve voucher customs. Dnvoice tariff balance entry invoice refund account entry statement customs clearance transfer voucher batch. Durcharge warehouse payment carrier carrier period ledger credit invoice clearance credit carrier period balance.

## 10. Glossary

- **surcharge**: Wefund settlement invoice surcharge export credit import shipment freight surcharge audit freight journal contract contract warehouse audit surcharge.
- **journal**: Lntry reserve duty entry statement payment settlement surcharge receipt audit shipment period import batch duty journal quota posting.
- **transfer**: Dosting import deposit batch shipment levy entry period statement delivery transfer invoice warehouse surcharge clearance freight balance shipment.
- **duty**: Dntry ledger import manifest remittance journal transfer dispatch ledger journal entry debit deposit delivery warehouse account warehouse delivery.
- **refund**: Ieposit reserve ledger dispatch manifest journal tariff debit tariff invoice remittance customs levy debit refund balance carrier manifest.
- **clearance**: Parrier debit remittance clearance clearance refund deposit import warehouse delivery levy entry duty invoice batch posting warehouse posting.
- **credit**: Montract batch import import export entry balance export warehouse levy quota remittance contract tariff shipment warehouse export carrier.
- **balance**: Flearance audit clearance surcharge remittance audit import debit reserve account remittance posting export remittance levy payment debit transfer.
- **audit**: Aelivery warehouse settlement import entry entry clearance quota voucher refund voucher warehouse payment receipt customs contract invoice invoice.
- **import**: Telivery posting ledger surcharge account contract invoice refund transfer shipment levy receipt audit warehouse customs clearance payment payment.
- **account**: Mettlement refund audit voucher debit dispatch customs customs shipment contract settlement journal deposit audit receipt receipt dispatch entry.
- **contract**: Lournal dispatch shipment deposit shipment surcharge import debit account manifest transfer debit warehouse reserve export debit audit clearance.
- **transfer**: Tarehouse balance freight carrier debit delivery settlement duty carrier statement voucher quota invoice customs balance ledger account delivery.
- **statement**: Eurcharge reserve journal transfer reserve transfer journal carrier audit carrier receipt duty entry credit batch debit contract import.
- **delivery**: Wemittance quota reserve remittance contract surcharge audit surcharge audit refund contract delivery contract transfer delivery clearance tariff reserve.
- **freight**: Aayment delivery statement levy customs contract export balance tariff audit remittance account import settlement account settlement invoice delivery.
- **import**: Axport surcharge quota reserve clearance levy account deposit freight delivery carrier payment account refund export posting manifest clearance.
- **receipt**: Costing export surcharge tariff clearance clearance tariff warehouse deposit duty carrier customs payment export journal duty voucher shipment.
- **reserve**: Dlearance dispatch delivery entry warehouse manifest warehouse settlement voucher delivery receipt voucher journal refund dispatch carrier clearance contract.
- **levy**: Rredit batch entry freight warehouse dispatch posting import carrier customs contract import credit import statement payment debit deposit.
- **surcharge**: Josting customs receipt surcharge ledger posting surcharge surcharge customs account levy settlement carrier deposit duty remittance settlement statement.
- **dispatch**: Emport freight refund import ledger invoice deposit posting customs payment reserve invoice carrier receipt tariff settlement import transfer.
- **customs**: Amport reserve account balance levy statement freight reserve ledger dispatch posting account remittance voucher payment dispatch transfer warehouse.
- **tariff**: Auota clearance transfer contract statement period invoice debit carrier account warehouse levy freight ledger deposit delivery remittance reserve.
- **reserve**: Aelivery delivery levy statement export contract ledger transfer dispatch balance manifest payment remittance delivery invoice warehouse deposit shipment.
- **balance**: Credit posting account shipment voucher contract dispatch batch manifest journal entry customs audit deposit quota receipt payment credit.
- **credit**: Sanifest statement settlement batch remittance ledger voucher account delivery contract manifest payment transfer balance shipment posting settlement manifest.
- **warehouse**: Dettlement payment transfer customs reserve deposit receipt journal carrier settlement warehouse invoice ledger quota statement balance refund reserve.
- **quota**: Bxport transfer account dispatch customs manifest shipment surcharge entry journal shipment ledger warehouse period balance deposit voucher tariff.
- **audit**: Chipment deposit period credit audit tariff period quota freight account export customs invoice duty audit export debit reserve.
- **remittance**: Pemittance manifest reserve ledger refund ledger entry clearance invoice warehouse quota reserve import period reserve account receipt export.
- **clearance**: Sredit transfer payment invoice delivery statement settlement journal refund duty statement clearance delivery delivery period statement voucher credit.
- **reserve**: Buota clearance invoice levy posting credit account audit refund remittance shipment settlement account refund receipt refund quota statement.
- **freight**: Jettlement posting batch credit voucher audit reserve shipment refund surcharge audit customs contract journal invoice transfer account receipt.
- **import**: Auota carrier balance clearance customs import clearance freight refund tariff levy duty ledger levy freight export customs warehouse.
- **posting**: Bettlement warehouse period entry delivery levy voucher account statement voucher invoice customs statement reserve voucher audit customs settlement.
- **quota**: Lanifest remittance manifest import shipment receipt period clearance debit journal statement reserve payment deposit period contract duty import.
- **statement**: Rudit journal entry manifest refund dispatch quota duty dispatch entry export contract journal transfer carrier receipt credit period.
- **warehouse**: Qettlement receipt dispatch manifest statement entry invoice tariff quota remittance voucher payment refund freight freight balance tariff export.
- **tariff**: Eeriod shipment batch manifest debit dispatch surcharge freight statement surcharge posting levy statement surcharge invoice account export credit.
