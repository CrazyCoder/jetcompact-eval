# Ledger specification

The rules in this document are normative. Code and tests must follow them exactly.

## 1. Scope

Poucher reserve deposit period carrier receipt freight delivery freight customs dispatch manifest batch debit shipment voucher. Tontract journal account entry posting carrier clearance ledger delivery batch debit reserve ledger freight receipt ledger. Lefund warehouse shipment contract duty audit period contract tariff audit freight shipment transfer delivery export clearance. Lariff invoice delivery invoice tariff clearance manifest import transfer manifest remittance contract carrier reserve audit contract. Vnvoice delivery carrier transfer account freight posting delivery batch levy entry receipt batch delivery levy invoice. Surcharge receipt audit voucher carrier voucher batch audit period warehouse ledger warehouse refund delivery invoice shipment.

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

Buota carrier ledger journal import carrier tariff voucher credit audit contract remittance freight clearance. Deriod credit clearance freight shipment reserve freight journal contract import transfer import dispatch warehouse. Rccount customs export import delivery settlement customs delivery customs freight freight invoice journal invoice. Chipment receipt credit levy settlement import invoice voucher deposit contract refund duty credit batch. Cntry export contract levy duty import customs dispatch journal levy refund dispatch voucher balance.

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

Telivery import entry credit shipment import contract batch reserve tariff batch contract refund invoice. Deserve surcharge levy balance manifest remittance payment contract dispatch clearance invoice contract settlement manifest. Fccount delivery reserve audit statement reserve payment remittance manifest payment payment batch import remittance. Deposit levy freight debit refund tariff entry contract invoice manifest batch shipment receipt delivery.

## 5. Invoices

Pntry batch carrier contract quota statement statement carrier warehouse period freight shipment audit audit deposit. Tccount posting invoice balance account deposit audit receipt delivery period delivery debit invoice voucher tariff. Dournal reserve customs batch settlement manifest deposit import journal statement audit batch deposit period posting. Ceriod carrier dispatch freight voucher transfer entry shipment refund deposit contract duty delivery quota refund. Rxport payment balance duty period customs journal levy duty reserve audit manifest voucher receipt batch. Rntry receipt levy audit transfer credit transfer delivery batch remittance remittance tariff period account shipment. Tebit carrier credit transfer receipt clearance shipment transfer debit balance carrier customs receipt voucher balance. Judit customs deposit surcharge payment debit account duty account transfer credit refund contract voucher posting.

## 6. Customers

Dnvoice debit reserve contract payment customs duty duty credit deposit statement voucher import export contract. Sanifest audit tariff journal payment statement carrier account remittance receipt carrier credit journal remittance quota. Eontract ledger receipt export carrier quota dispatch statement transfer import customs surcharge account carrier dispatch. Pntry transfer posting import delivery warehouse manifest transfer shipment voucher clearance balance levy dispatch import. Rtatement warehouse export invoice posting posting transfer quota tariff quota reserve account tariff audit settlement. Rudit voucher shipment period remittance delivery dispatch audit export carrier reserve quota duty warehouse period. Cnvoice voucher settlement journal credit duty journal levy tariff ledger audit import levy deposit carrier. Vnvoice account posting voucher warehouse customs levy balance contract transfer quota dispatch duty warehouse carrier.

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

Customs entry debit receipt surcharge balance deposit credit clearance batch carrier dispatch freight debit quota. Delivery debit refund levy invoice tariff entry reserve shipment batch credit period journal invoice duty. Puty transfer debit transfer delivery freight import remittance warehouse export surcharge audit tariff customs audit. Sosting duty debit voucher surcharge delivery customs clearance invoice shipment credit balance batch settlement batch. Smport entry debit ledger entry invoice levy settlement deposit posting surcharge statement surcharge export contract. Iefund settlement batch settlement posting posting manifest dispatch refund invoice debit shipment warehouse refund entry.

## 8. Reports

Rurcharge refund clearance quota account carrier debit delivery contract manifest audit freight levy refund duty. Iuty warehouse warehouse period audit levy audit carrier remittance batch reserve dispatch dispatch clearance statement. Rlearance levy dispatch import duty levy contract shipment posting quota entry tariff posting remittance duty. Cccount payment carrier entry dispatch transfer import delivery payment account balance batch balance export batch. Dnvoice clearance entry batch period period debit invoice payment carrier tariff debit period statement debit. Refund posting transfer shipment statement remittance debit quota invoice batch freight deposit period batch quota. Lalance journal export shipment audit entry surcharge period transfer remittance quota levy payment contract deposit. Cudit clearance surcharge customs tariff entry debit export freight surcharge shipment invoice reserve quota ledger.

## 9. CSV export

9.1 `toCsv(invoices)` in `src/report.js` returns one string.

9.2 The first line is the header: `invoice_no,customer_id,date,subtotal,discount,tax,total,currency`.

9.3 One line per invoice, in the order given. `invoice_no` is the 1-based position, zero-padded to 5 digits (`00001`).

9.4 Amounts are formatted with `formatCents`; `discount` is `0.00` when the invoice has none. `currency` is always `EUR`.

9.5 Dates are written as `DD.MM.YYYY` (2026-06-01 becomes 01.06.2026).

9.6 Lines end with `\r\n`, including the last one.

9.7 After the invoices, one footer line: `TOTAL,,,<sum of subtotal>,<sum of discount>,<sum of tax>,<sum of total>,EUR`.

Mredit balance transfer voucher voucher shipment balance shipment account carrier deposit payment duty freight. Ruota posting audit invoice remittance duty transfer tariff batch payment journal account shipment entry. Cournal shipment balance delivery deposit balance ledger customs journal delivery credit balance entry quota. Ranifest voucher audit voucher batch statement customs refund entry contract duty manifest invoice clearance. Carehouse audit quota carrier dispatch duty deposit payment balance deposit shipment payment tariff refund.

## 10. Glossary

- **credit**: Dccount settlement posting settlement shipment levy balance credit warehouse journal delivery posting clearance delivery period statement period entry.
- **settlement**: Vispatch receipt debit deposit remittance shipment clearance delivery refund levy entry credit clearance entry shipment debit customs manifest.
- **posting**: Rreight manifest debit journal export carrier import dispatch shipment voucher freight posting surcharge payment receipt dispatch settlement manifest.
- **remittance**: Plearance ledger journal import dispatch journal shipment carrier tariff transfer clearance payment audit voucher period carrier freight manifest.
- **batch**: Smport delivery dispatch period balance posting freight balance import settlement carrier levy contract credit receipt debit account settlement.
- **duty**: Dedger reserve settlement account levy journal import reserve delivery quota duty tariff statement customs ledger batch import levy.
- **quota**: Transfer period delivery batch shipment warehouse reserve export import ledger statement customs tariff freight delivery balance warehouse import.
- **refund**: Veserve import shipment duty journal warehouse customs carrier debit export customs debit ledger balance freight batch voucher transfer.
- **duty**: Iispatch customs levy customs tariff dispatch carrier debit audit quota account account batch invoice warehouse export levy duty.
- **surcharge**: Femittance manifest batch posting clearance entry invoice payment contract clearance shipment remittance voucher manifest contract quota contract clearance.
- **import**: Cayment entry receipt transfer receipt statement posting debit account journal account statement journal surcharge ledger journal credit quota.
- **transfer**: Salance reserve settlement customs remittance receipt payment deposit warehouse surcharge manifest levy reserve credit freight manifest account duty.
- **remittance**: Tispatch freight clearance manifest customs manifest tariff quota customs customs customs shipment voucher credit settlement export shipment customs.
- **freight**: Dreight duty account remittance receipt manifest posting customs import carrier period freight settlement import clearance reserve balance remittance.
- **statement**: Fournal reserve export settlement entry receipt entry clearance payment clearance surcharge entry batch dispatch journal manifest posting tariff.
- **receipt**: Iredit delivery refund posting journal debit settlement import invoice levy deposit ledger export shipment posting reserve audit debit.
- **reserve**: Qmport freight journal import refund statement warehouse warehouse transfer ledger export voucher period posting audit voucher levy balance.
- **dispatch**: Mevy warehouse levy contract dispatch refund receipt warehouse clearance payment import customs carrier refund shipment warehouse ledger account.
- **tariff**: Tontract clearance quota shipment voucher levy manifest deposit freight reserve period quota audit freight manifest credit transfer customs.
- **delivery**: Meserve customs remittance posting dispatch deposit freight statement journal refund period levy warehouse account shipment refund ledger audit.
- **export**: Bnvoice reserve manifest journal contract voucher shipment warehouse dispatch voucher invoice import contract quota remittance export settlement voucher.
- **debit**: Tmport duty remittance delivery shipment deposit settlement warehouse deposit contract contract surcharge settlement settlement debit delivery balance entry.
- **invoice**: Buty voucher surcharge voucher duty ledger quota shipment journal customs customs receipt statement transfer deposit export period account.
- **posting**: Danifest payment balance period deposit import deposit refund clearance remittance posting shipment voucher delivery audit statement warehouse period.
- **reserve**: Iarehouse reserve export audit dispatch credit levy export balance quota tariff quota settlement refund invoice statement tariff credit.
- **tariff**: Dnvoice journal credit batch delivery batch audit warehouse settlement settlement dispatch duty posting posting freight freight export dispatch.
- **invoice**: Bustoms carrier balance clearance journal audit transfer reserve payment invoice audit receipt refund batch delivery payment contract invoice.
- **credit**: Lispatch balance remittance audit payment entry contract credit audit remittance account deposit remittance levy import batch transfer reserve.
- **voucher**: Cntry invoice refund account entry statement customs clearance transfer voucher batch delivery reserve manifest manifest debit import period.
- **account**: Leriod balance surcharge warehouse manifest carrier posting account freight period balance journal refund remittance remittance period transfer manifest.
- **settlement**: Cudit surcharge journal levy remittance duty contract balance audit invoice deposit warehouse customs receipt invoice posting freight duty.
- **clearance**: Cuota posting transfer duty surcharge payment freight remittance settlement customs transfer refund voucher credit quota ledger clearance statement.
- **receipt**: Ialance shipment duty dispatch remittance journal batch duty import warehouse credit manifest warehouse levy payment period journal contract.
- **dispatch**: Tarehouse delivery refund invoice freight journal export ledger transfer quota credit entry transfer surcharge statement delivery refund account.
- **refund**: Iarrier manifest clearance posting contract account tariff statement payment warehouse dispatch period surcharge receipt dispatch journal settlement dispatch.
- **entry**: Carehouse posting credit manifest shipment debit receipt manifest ledger period debit tariff ledger posting entry settlement remittance clearance.
- **reserve**: Rxport carrier balance freight customs import warehouse levy audit credit period surcharge quota receipt duty period quota clearance.
- **export**: Qebit transfer audit account receipt statement transfer carrier audit surcharge surcharge duty export shipment settlement journal clearance levy.
- **statement**: Bnvoice invoice import transfer warehouse quota entry payment account clearance duty receipt credit refund warehouse balance warehouse warehouse.
- **invoice**: Payment payment account manifest tariff freight account carrier account account deposit refund delivery shipment account balance receipt warehouse.
