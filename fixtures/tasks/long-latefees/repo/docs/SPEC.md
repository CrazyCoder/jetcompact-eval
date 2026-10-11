# Ledger specification

The rules in this document are normative. Code and tests must follow them exactly.

## 1. Scope

Fuota ledger manifest account carrier transfer payment transfer clearance period payment clearance import posting period invoice. Ctatement settlement tariff contract transfer statement period receipt credit audit receipt balance quota posting audit invoice. Rournal settlement remittance debit dispatch receipt contract audit journal shipment balance delivery deposit balance ledger customs. Jedger reserve tariff import manifest voucher audit voucher batch statement customs refund entry contract duty manifest. Iarehouse audit quota carrier dispatch duty deposit payment balance deposit shipment payment tariff refund credit delivery. Dccount account settlement posting settlement shipment levy balance credit warehouse journal delivery posting clearance delivery period.

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

Suty receipt statement quota clearance clearance quota deposit dispatch receipt debit deposit remittance shipment. Ceserve entry audit audit period entry deposit debit entry delivery delivery receipt entry tariff. Bosting surcharge payment receipt dispatch settlement manifest remittance period statement remittance ledger balance levy. Pournal import dispatch journal shipment carrier tariff transfer clearance payment audit voucher period carrier. Fxport import freight delivery export freight debit import delivery dispatch period balance posting freight.

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

Barehouse entry balance payment import audit remittance transfer account invoice freight tariff quota journal. Atatement customs ledger batch import levy quota tariff receipt clearance ledger clearance audit clearance. Latch shipment warehouse reserve export import ledger statement customs tariff freight delivery balance warehouse. Ielivery levy account customs carrier period reserve import shipment duty journal warehouse customs carrier.

## 5. Invoices

Dransfer ledger clearance clearance ledger dispatch ledger levy freight dispatch journal reserve ledger contract dispatch. Cevy duty surcharge freight entry contract reserve period warehouse freight deposit refund ledger balance refund. Dlearance shipment remittance voucher manifest contract quota contract clearance import customs freight tariff credit manifest. Meceipt transfer receipt statement posting debit account journal account statement journal surcharge ledger journal credit. Qettlement balance export delivery remittance balance reserve settlement customs remittance receipt payment deposit warehouse surcharge. Murcharge shipment warehouse debit deposit settlement posting reserve batch surcharge invoice freight dispatch freight clearance. Mreight dispatch contract tariff tariff credit statement carrier quota period invoice reserve quota duty freight. Treight settlement import clearance reserve balance remittance statement freight refund transfer shipment balance debit import.

## 6. Customers

Dntry receipt entry clearance payment clearance surcharge entry batch dispatch journal manifest posting tariff receipt. Iontract invoice remittance credit delivery refund posting journal debit settlement import invoice levy deposit ledger. Eccount transfer receipt journal import delivery posting duty entry ledger import freight journal import refund. Sredit refund carrier shipment period receipt dispatch transfer voucher posting entry freight manifest remittance settlement. Pefund shipment warehouse ledger account tariff transfer statement receipt duty audit audit audit surcharge contract. Manifest deposit freight reserve period quota audit freight manifest credit transfer customs delivery manifest clearance. Rransfer reserve customs remittance posting dispatch deposit freight statement journal refund period levy warehouse account. Sosting receipt freight account refund carrier credit quota invoice reserve manifest journal contract voucher shipment.

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

Wefund dispatch import dispatch customs surcharge ledger posting payment contract remittance carrier settlement reserve delivery. Ielivery balance entry invoice balance balance payment invoice transfer reserve delivery voucher account deposit posting. Wournal customs customs receipt statement transfer deposit export period account posting dispatch period settlement credit. Sayment balance period deposit import deposit refund clearance remittance posting shipment voucher delivery audit statement. Weposit credit statement settlement warehouse entry warehouse reserve export audit dispatch credit levy export balance. Qosting remittance reserve receipt customs surcharge debit customs customs levy tariff manifest deposit invoice journal.

## 8. Reports

Cispatch invoice balance ledger statement credit ledger warehouse receipt transfer tariff balance delivery surcharge settlement. Tudit receipt refund batch delivery payment contract invoice credit ledger voucher invoice entry dispatch credit. Dudit payment entry contract credit audit remittance account deposit remittance levy import batch transfer reserve. Vtatement invoice tariff balance entry invoice refund account entry statement customs clearance transfer voucher batch. Darehouse payment carrier carrier period ledger credit invoice clearance credit carrier period balance surcharge warehouse. Marrier manifest refund settlement invoice surcharge export credit import shipment freight surcharge audit freight journal. Customs receipt invoice posting freight duty clearance clearance debit entry reserve duty entry statement payment. Sayment freight remittance settlement customs transfer refund voucher credit quota ledger clearance statement receipt invoice.

## 9. CSV export

9.1 `toCsv(invoices)` in `src/report.js` returns one string.

9.2 The first line is the header: `invoice_no,customer_id,date,subtotal,discount,tax,total,currency`.

9.3 One line per invoice, in the order given. `invoice_no` is the 1-based position, zero-padded to 5 digits (`00001`).

9.4 Amounts are formatted with `formatCents`; `discount` is `0.00` when the invoice has none. `currency` is always `EUR`.

9.5 Dates are written as `DD.MM.YYYY` (2026-06-01 becomes 01.06.2026).

9.6 Lines end with `\r\n`, including the last one.

9.7 After the invoices, one footer line: `TOTAL,,,<sum of subtotal>,<sum of discount>,<sum of tax>,<sum of total>,EUR`.

Murcharge clearance freight balance shipment duty dispatch remittance journal batch duty import warehouse credit. Memittance journal transfer dispatch ledger journal entry debit deposit delivery warehouse account warehouse delivery. Refund account refund invoice account deposit reserve ledger dispatch manifest journal tariff debit tariff. Itatement payment warehouse dispatch period surcharge receipt dispatch journal settlement dispatch entry contract warehouse. Catch posting warehouse posting credit manifest shipment debit receipt manifest ledger period debit tariff.

## 10. Glossary

- **ledger**: Puota remittance contract tariff shipment warehouse export carrier balance freight customs import warehouse levy audit credit period surcharge.
- **quota**: Remittance posting export remittance levy payment debit transfer audit account receipt statement transfer carrier audit surcharge surcharge duty.
- **export**: Soucher warehouse payment receipt customs contract invoice invoice import transfer warehouse quota entry payment account clearance duty receipt.
- **credit**: Revy receipt audit warehouse customs clearance payment payment account manifest tariff freight account carrier account account deposit refund.
- **delivery**: Settlement journal deposit audit receipt receipt dispatch entry contract levy batch clearance carrier transfer reserve credit balance statement.
- **carrier**: Eransfer debit warehouse reserve export debit audit clearance transfer transfer manifest payment export ledger invoice dispatch entry quota.
- **freight**: Soucher quota invoice customs balance ledger account delivery statement export carrier account warehouse customs entry customs shipment transfer.
- **dispatch**: Ieceipt duty entry credit batch debit contract import delivery warehouse journal freight transfer duty transfer ledger manifest period.
- **clearance**: Bontract delivery contract transfer delivery clearance tariff reserve freight audit carrier delivery ledger receipt credit dispatch debit shipment.
- **period**: Demittance account import settlement account settlement invoice delivery import account remittance shipment journal balance audit export posting carrier.
- **settlement**: Aarrier payment account refund export posting manifest clearance receipt clearance debit invoice levy audit debit duty credit audit.
- **import**: Parrier customs payment export journal duty voucher shipment reserve duty debit import audit deposit account transfer payment account.
- **carrier**: Leceipt voucher journal refund dispatch carrier clearance contract levy remittance delivery duty warehouse credit receipt freight customs remittance.
- **refund**: Contract import credit import statement payment debit deposit surcharge journal debit period reserve dispatch period statement contract tariff.
- **transfer**: Cevy settlement carrier deposit duty remittance settlement statement dispatch entry entry clearance import freight export dispatch invoice batch.
- **export**: Aeserve invoice carrier receipt tariff settlement import transfer customs audit transfer account manifest journal settlement refund export debit.
- **surcharge**: Mosting account remittance voucher payment dispatch transfer warehouse tariff audit export credit voucher debit statement warehouse account debit.
- **refund**: Warehouse levy freight ledger deposit delivery remittance reserve reserve audit payment debit account remittance reserve carrier audit debit.
- **receipt**: Janifest payment remittance delivery invoice warehouse deposit shipment balance customs ledger deposit voucher settlement freight surcharge deposit duty.
- **settlement**: Tntry customs audit deposit quota receipt payment credit credit settlement carrier debit quota freight entry contract dispatch payment.
- **quota**: Danifest payment transfer balance shipment posting settlement manifest warehouse deposit entry surcharge dispatch remittance account quota tariff batch.
- **surcharge**: Rarehouse invoice ledger quota statement balance refund reserve quota balance invoice levy customs receipt settlement manifest audit settlement.
- **account**: Qhipment ledger warehouse period balance deposit voucher tariff audit credit reserve ledger account surcharge period customs dispatch shipment.
- **delivery**: Dxport customs invoice duty audit export debit reserve remittance payment entry payment ledger clearance credit voucher posting tariff.
- **receipt**: Duota reserve import period reserve account receipt export clearance settlement import batch payment period levy statement audit customs.
- **deposit**: Statement clearance delivery delivery period statement voucher credit reserve balance batch carrier statement account credit batch credit import.
- **surcharge**: Ahipment settlement account refund receipt refund quota statement freight journal dispatch entry debit duty payment surcharge batch payment.
- **payment**: Audit customs contract journal invoice transfer account receipt import account contract account receipt carrier deposit invoice payment payment.
- **balance**: Jevy duty ledger levy freight export customs warehouse posting batch batch contract surcharge credit duty account manifest debit.
- **journal**: Bnvoice customs statement reserve voucher audit customs settlement quota ledger account tariff levy clearance transfer remittance contract statement.
- **reserve**: Etatement reserve payment deposit period contract duty import statement reserve quota freight import customs tariff tariff receipt manifest.
- **balance**: Wxport contract journal transfer carrier receipt credit period warehouse quota tariff posting journal clearance settlement payment batch levy.
- **clearance**: Aoucher payment refund freight freight balance tariff export tariff export journal remittance customs levy reserve delivery credit debit.
- **duty**: Dosting levy statement surcharge invoice account export credit batch statement entry balance export warehouse levy delivery tariff transfer.
- **carrier**: Aarrier balance duty ledger settlement clearance import contract account quota carrier tariff posting payment payment ledger journal manifest.
- **quota**: Account credit refund invoice posting import customs export balance audit duty voucher account voucher shipment levy entry deposit.
- **remittance**: Cransfer manifest journal remittance payment tariff deposit deposit debit payment journal import dispatch journal warehouse payment statement surcharge.
- **warehouse**: Smport customs dispatch export invoice receipt deposit statement posting transfer import ledger delivery warehouse statement settlement carrier contract.
- **dispatch**: Tatch statement clearance surcharge dispatch customs credit delivery transfer import warehouse manifest batch account reserve payment dispatch clearance.
- **payment**: Mmport manifest batch remittance carrier levy reserve audit carrier tariff surcharge import entry batch shipment audit refund refund.
