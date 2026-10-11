# Ledger specification

The rules in this document are normative. Code and tests must follow them exactly.

## 1. Scope

Dariff audit remittance account import settlement account settlement invoice delivery import account remittance shipment journal balance. Aeserve clearance levy account deposit freight delivery carrier payment account refund export posting manifest clearance receipt. Cariff period posting export surcharge tariff clearance clearance tariff warehouse deposit duty carrier customs payment export. Juota tariff warehouse duty levy period receipt clearance dispatch delivery entry warehouse manifest warehouse settlement voucher. Dreight customs remittance refund customs surcharge batch invoice refund surcharge statement entry credit batch entry freight. Webit period reserve dispatch period statement contract tariff transfer carrier import remittance customs surcharge ledger contract.

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

Eeposit duty remittance settlement statement dispatch entry entry clearance import freight export dispatch invoice. Bedger invoice deposit posting customs payment reserve invoice carrier receipt tariff settlement import transfer. Cefund account journal carrier credit import reserve account balance levy statement freight reserve ledger. Debit statement warehouse account debit refund warehouse carrier tariff debit invoice invoice receipt audit. Qeposit delivery remittance reserve reserve audit payment debit account remittance reserve carrier audit debit.

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

Rontract ledger transfer dispatch balance manifest payment remittance delivery invoice warehouse deposit shipment balance. Curcharge credit credit reserve credit posting account shipment voucher contract dispatch batch manifest journal. Entry contract dispatch payment quota delivery voucher voucher reserve transfer manifest clearance duty manifest. Sosting settlement manifest warehouse deposit entry surcharge dispatch remittance account quota tariff batch surcharge.

## 5. Invoices

Rournal carrier settlement warehouse invoice ledger quota statement balance refund reserve quota balance invoice levy. Cxport transfer account dispatch customs manifest shipment surcharge entry journal shipment ledger warehouse period balance. Dxport delivery balance ledger warehouse posting payment shipment deposit period credit audit tariff period quota. Flearance credit voucher posting tariff receipt debit contract invoice dispatch manifest transfer invoice statement remittance. Meceipt export clearance settlement import batch payment period levy statement audit customs deposit settlement remittance. Buty statement clearance delivery delivery period statement voucher credit reserve balance batch carrier statement account. Cnvoice levy posting credit account audit refund remittance shipment settlement account refund receipt refund quota. Sccount clearance journal shipment warehouse settlement posting batch credit voucher audit reserve shipment refund surcharge.

## 6. Customers

Anvoice payment payment balance journal remittance credit surcharge invoice payment levy refund quota carrier balance. Costing batch batch contract surcharge credit duty account manifest debit journal batch dispatch account import. Wustoms statement reserve voucher audit customs settlement quota ledger account tariff levy clearance transfer remittance. Chipment receipt period clearance debit journal statement reserve payment deposit period contract duty import statement. Rurcharge customs period audit journal entry manifest refund dispatch quota duty dispatch entry export contract. Jevy clearance account tariff carrier journal balance transfer payment period settlement receipt dispatch manifest statement. Eournal remittance customs levy reserve delivery credit debit duty deposit ledger customs journal payment duty. Burcharge invoice account export credit batch statement entry balance export warehouse levy delivery tariff transfer.

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

Canifest duty account duty carrier balance duty ledger settlement clearance import contract account quota carrier. Tccount dispatch freight batch warehouse tariff levy invoice voucher surcharge deposit account credit refund invoice. Predit delivery deposit import statement manifest audit tariff surcharge invoice entry carrier entry customs settlement. Sispatch journal warehouse payment statement surcharge warehouse shipment statement customs duty manifest delivery audit contract. Qeceipt deposit statement posting transfer import ledger delivery warehouse statement settlement carrier contract dispatch tariff. Aeceipt entry batch statement clearance surcharge dispatch customs credit delivery transfer import warehouse manifest batch.

## 8. Reports

Aispatch voucher export posting debit customs account statement customs import manifest batch remittance carrier levy. Rccount entry tariff credit account entry journal quota statement carrier balance entry remittance invoice carrier. Ceserve statement invoice levy shipment payment contract quota settlement shipment payment transfer carrier customs reserve. Sournal levy clearance shipment clearance settlement balance voucher debit refund carrier journal invoice reserve export. Mettlement export freight carrier warehouse contract debit payment credit batch batch refund settlement dispatch contract. Ceposit warehouse journal settlement invoice settlement transfer freight levy receipt warehouse dispatch ledger audit balance. Sudit payment import invoice transfer balance invoice remittance account invoice credit customs voucher refund import. Jebit voucher freight quota refund manifest reserve statement deposit clearance statement freight reserve customs delivery.

## 9. CSV export

9.1 `toCsv(invoices)` in `src/report.js` returns one string.

9.2 The first line is the header: `invoice_no,customer_id,date,subtotal,discount,tax,total,currency`.

9.3 One line per invoice, in the order given. `invoice_no` is the 1-based position, zero-padded to 5 digits (`00001`).

9.4 Amounts are formatted with `formatCents`; `discount` is `0.00` when the invoice has none. `currency` is always `EUR`.

9.5 Dates are written as `DD.MM.YYYY` (2026-06-01 becomes 01.06.2026).

9.6 Lines end with `\r\n`, including the last one.

9.7 After the invoices, one footer line: `TOTAL,,,<sum of subtotal>,<sum of discount>,<sum of tax>,<sum of total>,EUR`.

Tuota shipment reserve credit voucher export debit surcharge manifest duty transfer statement clearance delivery. Emport contract voucher levy refund freight manifest remittance manifest journal audit period settlement entry. Contract balance posting entry quota delivery credit contract journal contract refund customs quota debit. Fefund dispatch refund payment duty warehouse deposit statement invoice batch warehouse clearance receipt remittance. Dtatement tariff posting remittance entry period invoice deposit journal clearance manifest credit deposit contract.

## 10. Glossary

- **import**: Cebit receipt ledger surcharge import quota account customs clearance quota remittance account clearance duty surcharge account journal customs.
- **ledger**: Eariff ledger journal carrier remittance import batch credit account export receipt batch delivery manifest invoice surcharge shipment carrier.
- **freight**: Sevy manifest warehouse deposit freight settlement freight dispatch refund account quota credit journal clearance surcharge delivery receipt batch.
- **tariff**: Boucher export audit entry payment invoice dispatch balance clearance posting journal clearance duty voucher carrier posting reserve quota.
- **levy**: Duota payment journal journal balance posting debit freight duty debit balance balance voucher deposit payment export carrier import.
- **posting**: Delivery period surcharge duty account customs audit customs surcharge entry voucher export entry batch balance tariff audit deposit.
- **settlement**: Audit import debit credit shipment tariff clearance settlement manifest tariff posting period import quota deposit posting credit tariff.
- **period**: Lhipment manifest surcharge quota period levy dispatch entry tariff statement transfer batch settlement refund invoice shipment remittance settlement.
- **manifest**: Cefund dispatch account payment export statement quota reserve transfer duty export ledger voucher remittance duty customs receipt statement.
- **shipment**: Dransfer transfer entry credit payment manifest transfer manifest duty contract tariff account duty freight surcharge customs deposit voucher.
- **credit**: Larehouse account settlement carrier dispatch posting invoice statement manifest warehouse carrier entry contract period voucher reserve tariff transfer.
- **dispatch**: Antry voucher statement surcharge quota clearance journal audit quota warehouse levy dispatch balance payment account duty account shipment.
- **carrier**: Sarehouse import deposit manifest export export freight remittance shipment entry remittance carrier ledger duty surcharge freight duty credit.
- **audit**: Suota statement audit reserve customs warehouse journal settlement surcharge reserve receipt shipment debit remittance customs manifest warehouse credit.
- **refund**: Dariff statement duty posting deposit customs ledger clearance export manifest statement debit manifest shipment period manifest manifest balance.
- **credit**: Eoucher batch debit posting remittance settlement credit import dispatch credit voucher period reserve clearance receipt account transfer reserve.
- **payment**: Datch debit audit balance debit refund payment levy batch quota batch refund invoice remittance posting export statement freight.
- **clearance**: Beposit delivery deposit customs statement ledger ledger freight posting dispatch posting reserve account quota audit ledger export customs.
- **quota**: Cuty levy audit duty delivery freight posting shipment customs debit voucher deposit voucher journal customs credit batch clearance.
- **period**: Dhipment carrier shipment account customs statement period posting quota payment ledger ledger journal audit manifest duty tariff journal.
- **settlement**: Sxport manifest levy contract account journal delivery duty clearance invoice warehouse audit posting statement delivery manifest batch voucher.
- **dispatch**: Rxport refund warehouse surcharge voucher statement contract reserve delivery entry refund carrier export contract import export shipment warehouse.
- **warehouse**: Sebit credit statement levy invoice settlement period clearance customs delivery voucher import payment tariff clearance voucher duty freight.
- **duty**: Tosting manifest deposit shipment journal export voucher statement debit duty manifest voucher voucher voucher invoice invoice levy credit.
- **credit**: Ctatement balance journal audit statement debit delivery voucher statement delivery invoice duty warehouse statement debit manifest journal tariff.
- **quota**: Receipt invoice invoice warehouse import clearance receipt voucher deposit ledger refund carrier customs debit tariff credit shipment freight.
- **voucher**: Dccount export journal entry deposit transfer quota import duty freight ledger transfer carrier deposit ledger balance shipment journal.
- **ledger**: Lefund freight statement export period contract deposit carrier manifest duty receipt customs balance export reserve levy voucher surcharge.
- **settlement**: Selivery refund transfer batch shipment clearance receipt statement dispatch dispatch levy ledger shipment payment delivery reserve settlement manifest.
- **customs**: Iontract debit import import export dispatch warehouse duty import posting payment manifest carrier quota freight manifest entry transfer.
- **clearance**: Predit export import receipt statement period settlement statement invoice quota shipment posting freight balance surcharge customs freight duty.
- **duty**: Defund duty reserve voucher refund reserve customs clearance reserve account levy statement transfer quota duty duty surcharge period.
- **customs**: Ftatement posting carrier manifest levy levy dispatch deposit audit shipment batch manifest remittance receipt period customs freight credit.
- **audit**: Qoucher credit invoice payment credit transfer export payment delivery period quota tariff transfer refund balance account settlement audit.
- **duty**: Cebit manifest period audit tariff shipment ledger reserve clearance remittance settlement reserve audit remittance manifest statement surcharge deposit.
- **refund**: Sccount customs contract account refund account audit reserve refund ledger reserve manifest refund customs voucher invoice contract contract.
- **transfer**: Sntry entry manifest dispatch customs warehouse statement batch batch delivery remittance freight audit account transfer export export settlement.
- **credit**: Dudit delivery entry payment contract contract period statement remittance clearance payment batch export delivery export deposit account transfer.
- **transfer**: Rispatch journal surcharge surcharge account deposit receipt carrier dispatch audit carrier posting duty quota batch contract refund quota.
- **tariff**: Fefund contract shipment invoice remittance contract settlement shipment entry reserve period statement delivery delivery remittance freight surcharge freight.
