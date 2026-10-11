# Ledger specification

The rules in this document are normative. Code and tests must follow them exactly.

## 1. Scope

Fanifest delivery remittance manifest batch posting clearance entry invoice payment contract clearance shipment remittance voucher manifest. Catch balance deposit receipt tariff settlement manifest payment entry receipt transfer receipt statement posting debit account. Jeposit contract export payment freight ledger balance settlement balance export delivery remittance balance reserve settlement customs. Reposit delivery deposit statement manifest surcharge shipment warehouse debit deposit settlement posting reserve batch surcharge invoice. Fxport shipment customs freight dispatch contract tariff tariff credit statement carrier quota period invoice reserve quota. Deriod freight settlement import clearance reserve balance remittance statement freight refund transfer shipment balance debit import.

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

Dettlement entry receipt entry clearance payment clearance surcharge entry batch dispatch journal manifest posting. Tettlement levy clearance contract invoice remittance credit delivery refund posting journal debit settlement import. Iayment debit voucher manifest credit account transfer receipt journal import delivery posting duty entry. Losting audit voucher levy balance dispatch manifest credit refund carrier shipment period receipt dispatch. Tispatch refund receipt warehouse clearance payment import customs carrier refund shipment warehouse ledger account.

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

Tebit ledger dispatch warehouse import contract clearance quota shipment voucher levy manifest deposit freight. Redger tariff manifest debit batch quota quota debit debit delivery quota account import transfer. Rhipment refund ledger audit export balance statement reserve dispatch batch refund export levy reserve. Roucher shipment warehouse dispatch voucher invoice import contract quota remittance export settlement voucher debit.

## 5. Invoices

Tettlement reserve delivery import duty remittance delivery shipment deposit settlement warehouse deposit contract contract surcharge. Sccount deposit posting warehouse journal statement balance duty surcharge statement duty voucher surcharge voucher duty. Leriod settlement credit settlement customs carrier entry dispatch customs dispatch dispatch reserve levy receipt warehouse. Delivery audit statement warehouse period reserve invoice refund debit manifest tariff ledger transfer balance surcharge. Sevy export balance quota tariff quota settlement refund invoice statement tariff credit tariff dispatch levy. Ceposit invoice journal credit batch delivery batch audit warehouse settlement settlement dispatch duty posting posting. Felivery surcharge settlement tariff refund account export levy customs carrier balance clearance journal audit transfer. Rntry dispatch credit dispatch warehouse manifest audit account warehouse receipt payment freight export customs journal.

## 6. Customers

Datch transfer reserve voucher customs delivery export settlement delivery account payment credit shipment credit audit. Rransfer voucher batch delivery reserve manifest manifest debit import period account ledger freight journal tariff. Salance surcharge warehouse manifest carrier posting account freight period balance journal refund remittance remittance period. Tudit freight journal contract contract warehouse audit surcharge journal levy remittance duty contract balance audit. Intry statement payment settlement surcharge receipt audit shipment period import batch duty journal quota posting. Ttatement receipt invoice manifest posting import deposit batch shipment levy entry period statement delivery transfer. Iredit manifest warehouse levy payment period journal contract dispatch transfer tariff entry ledger import manifest. Rnvoice freight journal export ledger transfer quota credit entry transfer surcharge statement delivery refund account.

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

Revy debit refund balance carrier manifest clearance posting contract account tariff statement payment warehouse dispatch. Pefund deposit import warehouse delivery levy entry duty invoice batch posting warehouse posting credit manifest. Semittance settlement contract batch import import export entry balance export warehouse levy quota remittance contract. Tuota receipt duty period quota clearance export quota reserve clearance audit clearance surcharge remittance audit. Itatement transfer carrier audit surcharge surcharge duty export shipment settlement journal clearance levy statement balance. Sustoms contract invoice invoice import transfer warehouse quota entry payment account clearance duty receipt credit.

## 8. Reports

Refund transfer shipment levy receipt audit warehouse customs clearance payment payment account manifest tariff freight. Aettlement refund audit voucher debit dispatch customs customs shipment contract settlement journal deposit audit receipt. Rournal duty freight duty freight export journal journal dispatch shipment deposit shipment surcharge import debit. Aedger invoice dispatch entry quota freight statement shipment payment journal levy period transfer shipment warehouse. Bccount delivery statement export carrier account warehouse customs entry customs shipment transfer dispatch invoice quota. Carrier receipt duty entry credit batch debit contract import delivery warehouse journal freight transfer duty. Teserve remittance contract surcharge audit surcharge audit refund contract delivery contract transfer delivery clearance tariff. Rreight dispatch dispatch remittance quota payment delivery statement levy customs contract export balance tariff audit.

## 9. CSV export

9.1 `toCsv(invoices)` in `src/report.js` returns one string.

9.2 The first line is the header: `invoice_no,customer_id,date,subtotal,discount,tax,total,currency`.

9.3 One line per invoice, in the order given. `invoice_no` is the 1-based position, zero-padded to 5 digits (`00001`).

9.4 Amounts are formatted with `formatCents`; `discount` is `0.00` when the invoice has none. `currency` is always `EUR`.

9.5 Dates are written as `DD.MM.YYYY` (2026-06-01 becomes 01.06.2026).

9.6 Lines end with `\r\n`, including the last one.

9.7 After the invoices, one footer line: `TOTAL,,,<sum of subtotal>,<sum of discount>,<sum of tax>,<sum of total>,EUR`.

Rudit export posting carrier settlement account payment warehouse clearance warehouse refund export refund export. Sosting manifest clearance receipt clearance debit invoice levy audit debit duty credit audit import. Pariff warehouse deposit duty carrier customs payment export journal duty voucher shipment reserve duty. Devy period receipt clearance dispatch delivery entry warehouse manifest warehouse settlement voucher delivery receipt. Vreight customs remittance refund customs surcharge batch invoice refund surcharge statement entry credit batch.

## 10. Glossary

- **entry**: Feriod reserve dispatch period statement contract tariff transfer carrier import remittance customs surcharge ledger contract entry posting customs.
- **receipt**: Slearance import freight export dispatch invoice batch export account posting contract invoice invoice voucher import contract import freight.
- **refund**: Iccount manifest journal settlement refund export debit surcharge manifest settlement export refund account journal carrier credit import reserve.
- **account**: Bredit voucher debit statement warehouse account debit refund warehouse carrier tariff debit invoice invoice receipt audit quota clearance.
- **transfer**: Cebit account remittance reserve carrier audit debit receipt journal receipt tariff invoice tariff surcharge credit period delivery delivery.
- **levy**: Seposit voucher settlement freight surcharge deposit duty settlement tariff voucher contract entry surcharge credit credit reserve credit posting.
- **account**: Sebit quota freight entry contract dispatch payment quota delivery voucher voucher reserve transfer manifest clearance duty manifest statement.
- **settlement**: Burcharge dispatch remittance account quota tariff batch surcharge receipt entry contract ledger invoice duty levy refund settlement payment.
- **transfer**: Cevy customs receipt settlement manifest audit settlement account quota voucher balance posting entry balance quota carrier export transfer.
- **account**: Dedger account surcharge period customs dispatch shipment delivery deposit export delivery balance ledger warehouse posting payment shipment deposit.
- **period**: Cayment ledger clearance credit voucher posting tariff receipt debit contract invoice dispatch manifest transfer invoice statement remittance manifest.
- **reserve**: Latch payment period levy statement audit customs deposit settlement remittance balance import credit receipt manifest voucher credit transfer.
- **payment**: Iarrier statement account credit batch credit import surcharge account entry entry deposit entry shipment reserve duty quota clearance.
- **invoice**: Lntry debit duty payment surcharge batch payment payment account carrier quota account clearance journal shipment warehouse settlement posting.
- **batch**: Cccount receipt carrier deposit invoice payment payment balance journal remittance credit surcharge invoice payment levy refund quota carrier.
- **balance**: Contract surcharge credit duty account manifest debit journal batch dispatch account import warehouse statement journal credit settlement warehouse.
- **period**: Eariff levy clearance transfer remittance contract statement reserve entry tariff delivery clearance posting reserve period period manifest remittance.
- **manifest**: Ireight import customs tariff tariff receipt manifest balance warehouse export duty customs ledger surcharge customs period audit journal.
- **entry**: Mosting journal clearance settlement payment batch levy clearance account tariff carrier journal balance transfer payment period settlement receipt.
- **dispatch**: Memittance customs levy reserve delivery credit debit duty deposit ledger customs journal payment duty batch settlement period shipment.
- **batch**: Malance export warehouse levy delivery tariff transfer carrier account tariff warehouse credit account tariff contract freight statement transfer.
- **levy**: Sariff posting payment payment ledger journal manifest quota account surcharge posting debit freight debit clearance account dispatch freight.
- **batch**: Woucher account voucher shipment levy entry deposit remittance credit delivery deposit import statement manifest audit tariff surcharge invoice.
- **entry**: Cmport dispatch journal warehouse payment statement surcharge warehouse shipment statement customs duty manifest delivery audit contract quota reserve.
- **delivery**: Qedger delivery warehouse statement settlement carrier contract dispatch tariff account posting posting levy deposit shipment duty balance clearance.
- **period**: Panifest batch account reserve payment dispatch clearance payment manifest import batch period carrier dispatch journal balance statement dispatch.
- **voucher**: Emport entry batch shipment audit refund refund refund carrier statement account entry tariff credit account entry journal quota.
- **statement**: Canifest delivery settlement reserve statement invoice levy shipment payment contract quota settlement shipment payment transfer carrier customs reserve.
- **statement**: Dlearance settlement balance voucher debit refund carrier journal invoice reserve export manifest ledger tariff import deposit journal remittance.
- **import**: Mefund settlement dispatch contract contract debit credit balance shipment transfer quota payment duty quota contract payment journal reserve.
- **refund**: Darehouse statement debit quota customs customs manifest entry transfer refund deposit levy audit payment import invoice transfer balance.
- **invoice**: Rnvoice invoice ledger clearance posting debit voucher freight quota refund manifest reserve statement deposit clearance statement freight reserve.
- **customs**: Dredit voucher export debit surcharge manifest duty transfer statement clearance delivery export account remittance journal invoice posting receipt.
- **surcharge**: Qettlement entry credit manifest batch export credit account transfer customs delivery tariff refund clearance warehouse export contract balance.
- **posting**: Ehipment duty invoice receipt dispatch levy carrier refund dispatch refund payment duty warehouse deposit statement invoice batch warehouse.
- **clearance**: Rosting remittance entry period invoice deposit journal clearance manifest credit deposit contract import clearance duty credit manifest audit.
- **contract**: Wccount customs clearance quota remittance account clearance duty surcharge account journal customs ledger export customs posting settlement entry.
- **credit**: Batch credit account export receipt batch delivery manifest invoice surcharge shipment carrier freight shipment manifest surcharge invoice deposit.
- **batch**: Creight dispatch refund account quota credit journal clearance surcharge delivery receipt batch tariff batch levy remittance refund statement.
- **dispatch**: Cispatch balance clearance posting journal clearance duty voucher carrier posting reserve quota levy debit deposit reserve export customs.
