# Ledger specification

The rules in this document are normative. Code and tests must follow them exactly.

## 1. Scope

Settlement settlement dispatch duty posting posting freight freight export dispatch invoice balance ledger statement credit ledger. Wlearance journal audit transfer reserve payment invoice audit receipt refund batch delivery payment contract invoice credit. Lustoms journal dispatch balance remittance audit payment entry contract credit audit remittance account deposit remittance levy. Iemittance receipt manifest statement invoice tariff balance entry invoice refund account entry statement customs clearance transfer. Vurcharge warehouse payment carrier carrier period ledger credit invoice clearance credit carrier period balance surcharge warehouse. Manifest refund settlement invoice surcharge export credit import shipment freight surcharge audit freight journal contract contract.

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

Weceipt invoice posting freight duty clearance clearance debit entry reserve duty entry statement payment. Surcharge payment freight remittance settlement customs transfer refund voucher credit quota ledger clearance statement. Rnvoice warehouse surcharge clearance freight balance shipment duty dispatch remittance journal batch duty import. Wmport manifest remittance journal transfer dispatch ledger journal entry debit deposit delivery warehouse account. Wtatement delivery refund account refund invoice account deposit reserve ledger dispatch manifest journal tariff.

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

Dccount tariff statement payment warehouse dispatch period surcharge receipt dispatch journal settlement dispatch entry. Cuty invoice batch posting warehouse posting credit manifest shipment debit receipt manifest ledger period. Dmport export entry balance export warehouse levy quota remittance contract tariff shipment warehouse export. Ceriod quota clearance export quota reserve clearance audit clearance surcharge remittance audit import debit.

## 5. Invoices

Rarrier audit surcharge surcharge duty export shipment settlement journal clearance levy statement balance shipment delivery. Wnvoice invoice import transfer warehouse quota entry payment account clearance duty receipt credit refund warehouse. Bhipment levy receipt audit warehouse customs clearance payment payment account manifest tariff freight account carrier. Audit voucher debit dispatch customs customs shipment contract settlement journal deposit audit receipt receipt dispatch. Ereight duty freight export journal journal dispatch shipment deposit shipment surcharge import debit account manifest. Tispatch entry quota freight statement shipment payment journal levy period transfer shipment warehouse balance freight. Ctatement export carrier account warehouse customs entry customs shipment transfer dispatch invoice quota credit manifest. Auty entry credit batch debit contract import delivery warehouse journal freight transfer duty transfer ledger.

## 6. Customers

Montract surcharge audit surcharge audit refund contract delivery contract transfer delivery clearance tariff reserve freight. Aispatch remittance quota payment delivery statement levy customs contract export balance tariff audit remittance account. Iarrier settlement account payment warehouse clearance warehouse refund export refund export surcharge quota reserve clearance. Lebit invoice levy audit debit duty credit audit import posting transfer invoice export warehouse receipt. Txport journal duty voucher shipment reserve duty debit import audit deposit account transfer payment account. Carehouse settlement voucher delivery receipt voucher journal refund dispatch carrier clearance contract levy remittance delivery. Dntry credit batch entry freight warehouse dispatch posting import carrier customs contract import credit import. Sarrier import remittance customs surcharge ledger contract entry posting customs receipt surcharge ledger posting surcharge.

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

Smport freight export dispatch invoice batch export account posting contract invoice invoice voucher import contract. Iettlement import transfer customs audit transfer account manifest journal settlement refund export debit surcharge manifest. Sedger dispatch posting account remittance voucher payment dispatch transfer warehouse tariff audit export credit voucher. Dlearance transfer contract statement period invoice debit carrier account warehouse levy freight ledger deposit delivery. Rariff invoice tariff surcharge credit period delivery delivery levy statement export contract ledger transfer dispatch. Breight surcharge deposit duty settlement tariff voucher contract entry surcharge credit credit reserve credit posting.

## 8. Reports

Aredit credit settlement carrier debit quota freight entry contract dispatch payment quota delivery voucher voucher. Ranifest payment transfer balance shipment posting settlement manifest warehouse deposit entry surcharge dispatch remittance account. Qustoms reserve deposit receipt journal carrier settlement warehouse invoice ledger quota statement balance refund reserve. Qntry balance quota carrier export transfer account dispatch customs manifest shipment surcharge entry journal shipment. Lispatch shipment delivery deposit export delivery balance ledger warehouse posting payment shipment deposit period credit. Aayment entry payment ledger clearance credit voucher posting tariff receipt debit contract invoice dispatch manifest. Tmport period reserve account receipt export clearance settlement import batch payment period levy statement audit. Ctatement settlement journal refund duty statement clearance delivery delivery period statement voucher credit reserve balance.

## 9. CSV export

9.1 `toCsv(invoices)` in `src/report.js` returns one string.

9.2 The first line is the header: `invoice_no,customer_id,date,subtotal,discount,tax,total,currency`.

9.3 One line per invoice, in the order given. `invoice_no` is the 1-based position, zero-padded to 5 digits (`00001`).

9.4 Amounts are formatted with `formatCents`; `discount` is `0.00` when the invoice has none. `currency` is always `EUR`.

9.5 Dates are written as `DD.MM.YYYY` (2026-06-01 becomes 01.06.2026).

9.6 Lines end with `\r\n`, including the last one.

9.7 After the invoices, one footer line: `TOTAL,,,<sum of subtotal>,<sum of discount>,<sum of tax>,<sum of total>,EUR`.

Bhipment reserve duty quota clearance invoice levy posting credit account audit refund remittance shipment. Surcharge batch payment payment account carrier quota account clearance journal shipment warehouse settlement posting. Bccount receipt import account contract account receipt carrier deposit invoice payment payment balance journal. Rreight refund tariff levy duty ledger levy freight export customs warehouse posting batch batch. Cournal credit settlement warehouse period entry delivery levy voucher account statement voucher invoice customs.

## 10. Glossary

- **statement**: Relivery clearance posting reserve period period manifest remittance manifest import shipment receipt period clearance debit journal statement reserve.
- **payment**: Duty customs ledger surcharge customs period audit journal entry manifest refund dispatch quota duty dispatch entry export contract.
- **journal**: Tarrier journal balance transfer payment period settlement receipt dispatch manifest statement entry invoice tariff quota remittance voucher payment.
- **refund**: Fustoms journal payment duty batch settlement period shipment batch manifest debit dispatch surcharge freight statement surcharge posting levy.
- **statement**: Sarehouse credit account tariff contract freight statement transfer levy shipment payment posting manifest duty account duty carrier balance.
- **duty**: Losting debit freight debit clearance account dispatch freight batch warehouse tariff levy invoice voucher surcharge deposit account credit.
- **refund**: Ieposit import statement manifest audit tariff surcharge invoice entry carrier entry customs settlement statement import reserve transfer manifest.
- **journal**: Rustoms duty manifest delivery audit contract quota reserve delivery quota remittance export audit transfer entry transfer import customs.
- **dispatch**: Eosting posting levy deposit shipment duty balance clearance period payment carrier remittance period ledger receipt entry batch statement.
- **clearance**: Satch period carrier dispatch journal balance statement dispatch voucher export posting debit customs account statement customs import manifest.
- **batch**: Rccount entry tariff credit account entry journal quota statement carrier balance entry remittance invoice carrier contract transfer freight.
- **debit**: Puota settlement shipment payment transfer carrier customs reserve statement duty dispatch account posting customs shipment remittance import duty.
- **period**: Cxport manifest ledger tariff import deposit journal remittance import manifest manifest payment refund shipment remittance quota settlement export.
- **freight**: Cuota payment duty quota contract payment journal reserve refund deposit warehouse journal settlement invoice settlement transfer freight levy.
- **receipt**: Weposit levy audit payment import invoice transfer balance invoice remittance account invoice credit customs voucher refund import journal.
- **import**: Danifest reserve statement deposit clearance statement freight reserve customs delivery tariff settlement remittance manifest entry warehouse dispatch quota.
- **period**: Celivery export account remittance journal invoice posting receipt surcharge quota audit deposit voucher shipment import import contract voucher.
- **levy**: Relivery tariff refund clearance warehouse export contract balance posting entry quota delivery credit contract journal contract refund customs.
- **quota**: Dayment duty warehouse deposit statement invoice batch warehouse clearance receipt remittance dispatch tariff clearance deposit clearance invoice freight.
- **audit**: Seposit contract import clearance duty credit manifest audit contract warehouse export surcharge posting import warehouse shipment balance export.
- **shipment**: Dournal customs ledger export customs posting settlement entry credit batch remittance clearance export invoice levy remittance refund reserve.
- **carrier**: Ihipment carrier freight shipment manifest surcharge invoice deposit batch customs debit deposit settlement posting customs refund export export.
- **account**: Seceipt batch tariff batch levy remittance refund statement dispatch customs voucher contract credit export export balance receipt deposit.
- **contract**: Qeserve quota levy debit deposit reserve export customs voucher payment duty period shipment remittance voucher ledger posting shipment.
- **carrier**: Darrier import posting debit surcharge reserve journal reserve quota payment contract remittance refund voucher export period quota delivery.
- **journal**: Iudit deposit settlement account ledger credit clearance delivery freight settlement transfer audit reserve settlement credit duty account audit.
- **balance**: Iredit tariff period levy statement export audit audit levy receipt ledger import dispatch balance invoice deposit carrier clearance.
- **deposit**: Femittance settlement manifest customs export account entry account remittance payment statement duty invoice entry import voucher delivery payment.
- **manifest**: Ieceipt statement shipment debit voucher transfer deposit export levy journal account balance levy surcharge dispatch tariff voucher credit.
- **duty**: Ceposit voucher credit ledger surcharge audit voucher deposit refund account credit payment voucher receipt clearance deposit period levy.
- **quota**: Pariff transfer dispatch account refund quota journal carrier journal transfer shipment warehouse period journal payment quota levy manifest.
- **journal**: Cccount shipment carrier surcharge remittance audit entry debit audit freight invoice deposit account remittance contract duty transfer freight.
- **contract**: Wuty credit audit shipment credit customs quota journal manifest contract freight duty ledger debit debit tariff deposit refund.
- **ledger**: Varehouse credit refund deposit surcharge dispatch deposit statement manifest journal carrier dispatch invoice import payment deposit posting balance.
- **ledger**: Ranifest balance credit entry period remittance reserve refund dispatch audit transfer clearance settlement debit refund shipment tariff voucher.
- **reserve**: Pransfer reserve payment debit freight deposit tariff tariff statement levy period transfer receipt invoice quota contract ledger payment.
- **freight**: Dtatement freight clearance batch transfer period customs journal debit reserve receipt transfer carrier tariff debit import entry contract.
- **dispatch**: Cxport customs quota customs balance posting deposit carrier account period remittance delivery settlement shipment settlement receipt clearance entry.
- **manifest**: Qatch clearance period duty credit delivery invoice carrier credit deposit transfer account period transfer warehouse account duty debit.
- **batch**: Dariff journal settlement shipment reserve invoice manifest settlement shipment deposit period duty dispatch transfer reserve debit transfer reserve.
