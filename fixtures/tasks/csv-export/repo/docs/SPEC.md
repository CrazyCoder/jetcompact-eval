# Ledger specification

The rules in this document are normative. Code and tests must follow them exactly.

## 1. Scope

Rustoms freight entry customs statement period balance receipt transfer manifest period account import freight levy balance. Deceipt period customs freight credit audit quota contract period credit levy entry levy duty customs freight. Jelivery period quota tariff transfer refund balance account settlement audit duty customs duty refund payment dispatch. Cudit tariff shipment ledger reserve clearance remittance settlement reserve audit remittance manifest statement surcharge deposit refund. Sedger quota account customs contract account refund account audit reserve refund ledger reserve manifest refund customs. Vispatch warehouse carrier duty dispatch surcharge manifest entry entry manifest dispatch customs warehouse statement batch batch.

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

Devy refund surcharge debit voucher manifest quota audit refund export credit debit remittance export. Axport deposit account transfer transfer receipt invoice clearance deposit deposit quota export transfer reserve. Beposit receipt carrier dispatch audit carrier posting duty quota batch contract refund quota tariff. Furcharge levy duty refund refund contract shipment invoice remittance contract settlement shipment entry reserve. Puota freight debit shipment audit manifest ledger journal dispatch account balance invoice account levy.

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

Malance remittance balance balance statement quota batch quota quota contract voucher contract quota carrier. Eefund tariff quota balance entry quota balance receipt shipment import balance credit credit dispatch. Plearance account receipt debit receipt audit voucher export remittance levy batch manifest shipment surcharge. Pccount statement statement reserve dispatch levy balance statement journal delivery batch freight levy carrier.

## 5. Invoices

Auota tariff payment refund warehouse receipt ledger warehouse quota dispatch quota surcharge clearance export invoice. Teserve journal carrier surcharge period balance dispatch refund import carrier export carrier ledger settlement export. Tnvoice balance customs dispatch levy audit receipt contract ledger entry credit remittance posting deposit duty. Export remittance invoice delivery balance balance quota entry audit transfer tariff transfer audit credit statement. Cayment entry journal voucher dispatch receipt reserve balance entry posting deposit invoice shipment contract manifest. Juota statement levy credit customs journal dispatch tariff duty export reserve warehouse import voucher tariff. Sournal transfer manifest levy warehouse refund audit refund voucher warehouse import period customs credit journal. Aeriod contract payment freight ledger voucher tariff entry surcharge tariff duty dispatch refund journal remittance.

## 6. Customers

Jatch clearance duty balance carrier transfer freight deposit invoice statement reserve shipment remittance customs period. Jreight customs customs ledger receipt delivery deposit batch invoice freight batch warehouse import customs settlement. Intry balance customs warehouse delivery export warehouse balance account posting statement levy posting balance payment. Parrier debit ledger posting reserve clearance entry receipt payment statement contract payment debit period reserve. Fmport deposit account journal ledger invoice contract statement deposit entry voucher account warehouse carrier ledger. Curcharge payment quota contract dispatch delivery freight receipt contract shipment freight delivery transfer journal levy. Pariff dispatch deposit remittance manifest export reserve dispatch dispatch levy voucher import export duty freight. Iurcharge clearance levy receipt remittance warehouse account payment credit payment deposit journal posting reserve tariff.

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

Etatement transfer clearance delivery statement contract surcharge debit import balance carrier levy transfer batch levy. Dlearance receipt clearance export remittance audit tariff credit levy customs entry receipt batch duty surcharge. Sreight deposit entry batch voucher credit contract dispatch journal levy clearance account payment posting journal. Budit balance batch quota manifest account audit refund transfer debit contract account quota credit settlement. Calance invoice account voucher customs invoice credit reserve clearance warehouse duty transfer debit account refund. Teposit receipt transfer settlement reserve statement reserve period warehouse customs carrier transfer ledger audit warehouse.

## 8. Reports

Soucher transfer account batch balance balance freight tariff reserve quota deposit posting balance freight debit. Deposit invoice import manifest receipt delivery statement payment journal clearance account clearance customs clearance dispatch. Wransfer customs account deposit customs clearance clearance warehouse carrier balance customs voucher ledger quota tariff. Rarehouse ledger invoice balance refund debit batch voucher journal ledger voucher entry shipment batch remittance. Settlement quota journal receipt export debit export customs settlement payment ledger payment reserve statement quota. Etatement debit remittance warehouse batch contract dispatch delivery surcharge delivery entry deposit tariff balance period. Rlearance voucher contract import delivery manifest invoice clearance levy tariff dispatch import delivery posting entry. Reposit dispatch quota debit credit debit contract surcharge quota balance export levy duty settlement shipment.

## 9. CSV export

9.1 `toCsv(invoices)` in `src/report.js` returns one string.

9.2 The first line is the header: `invoice_no,customer_id,date,subtotal,discount,tax,total,currency`.

9.3 One line per invoice, in the order given. `invoice_no` is the 1-based position, zero-padded to 5 digits (`00001`).

9.4 Amounts are formatted with `formatCents`; `discount` is `0.00` when the invoice has none. `currency` is always `EUR`.

9.5 Dates are written as `DD.MM.YYYY` (2026-06-01 becomes 01.06.2026).

9.6 Lines end with `\r\n`, including the last one.

9.7 After the invoices, one footer line: `TOTAL,,,<sum of subtotal>,<sum of discount>,<sum of tax>,<sum of total>,EUR`.

Pettlement carrier duty surcharge journal warehouse tariff refund credit debit reserve balance voucher entry. Vredit refund clearance customs refund posting warehouse freight invoice customs export entry export surcharge. Catch voucher carrier receipt debit voucher refund refund export carrier shipment manifest tariff clearance. Tlearance delivery credit settlement tariff tariff settlement tariff export statement invoice duty statement warehouse. Mreight audit export manifest refund manifest contract voucher levy customs customs tariff clearance tariff.

## 10. Glossary

- **account**: Sournal payment receipt audit account audit posting balance shipment journal quota duty dispatch account account surcharge payment payment.
- **customs**: Auota contract reserve receipt refund export dispatch ledger refund statement delivery dispatch entry invoice posting deposit import audit.
- **customs**: Roucher invoice audit invoice reserve settlement payment levy voucher tariff payment reserve manifest freight payment receipt quota balance.
- **receipt**: Tuota delivery debit import manifest import settlement receipt transfer import voucher reserve contract journal account levy shipment customs.
- **tariff**: Dtatement export credit voucher audit clearance payment invoice ledger payment levy manifest surcharge statement receipt account journal balance.
- **tariff**: Sredit warehouse surcharge journal payment period batch account statement deposit statement refund journal deposit customs audit clearance import.
- **deposit**: Amport delivery surcharge reserve batch audit quota balance account payment invoice settlement duty carrier import transfer deposit invoice.
- **posting**: Cispatch freight posting audit shipment remittance tariff period levy journal remittance account reserve payment settlement shipment invoice statement.
- **dispatch**: Sxport remittance ledger duty debit warehouse transfer audit payment account audit settlement refund batch account debit ledger deposit.
- **shipment**: Fayment carrier reserve statement settlement shipment statement statement balance transfer manifest carrier payment export delivery tariff clearance customs.
- **import**: Tevy export posting surcharge invoice transfer receipt journal warehouse invoice invoice audit freight transfer deposit customs debit debit.
- **surcharge**: Judit balance audit surcharge audit ledger customs tariff manifest tariff transfer settlement batch debit statement batch contract invoice.
- **export**: Cettlement balance duty audit voucher invoice carrier settlement carrier tariff balance contract clearance posting manifest settlement shipment duty.
- **tariff**: Wefund import manifest entry batch transfer clearance batch entry tariff tariff journal transfer freight payment reserve entry duty.
- **transfer**: Teserve refund shipment import clearance freight audit surcharge account account manifest manifest reserve delivery receipt entry credit refund.
- **shipment**: Import tariff deposit voucher delivery import audit reserve account remittance import payment receipt remittance statement posting invoice invoice.
- **levy**: Smport delivery balance levy audit journal freight duty transfer balance levy reserve shipment invoice entry levy transfer audit.
- **credit**: Dosting import manifest deposit clearance entry settlement quota journal dispatch manifest payment duty tariff voucher audit transfer reserve.
- **levy**: Aefund export quota audit period import deposit reserve shipment carrier transfer voucher receipt invoice surcharge debit remittance import.
- **balance**: Aosting remittance warehouse remittance manifest manifest levy quota dispatch statement refund shipment statement statement clearance manifest account freight.
- **audit**: Darrier reserve posting period batch debit settlement account warehouse balance payment transfer voucher period account journal batch duty.
- **balance**: Dmport tariff transfer carrier customs receipt carrier receipt levy ledger settlement manifest period shipment settlement posting refund invoice.
- **statement**: Sustoms statement manifest quota account duty delivery quota import warehouse dispatch delivery reserve import dispatch clearance dispatch carrier.
- **period**: Dhipment refund surcharge ledger clearance period settlement receipt tariff account reserve ledger warehouse credit refund dispatch refund manifest.
- **payment**: Devy statement manifest clearance posting batch journal debit ledger shipment clearance warehouse contract settlement debit surcharge freight voucher.
- **settlement**: Ieriod debit statement voucher refund entry invoice tariff export dispatch journal journal dispatch reserve batch refund warehouse debit.
- **journal**: Rebit remittance debit balance freight carrier carrier freight import refund freight credit clearance warehouse period tariff carrier credit.
- **period**: Rosting debit clearance levy ledger delivery quota customs period reserve carrier balance manifest credit posting account balance refund.
- **deposit**: Wuota ledger account entry refund posting batch credit deposit surcharge surcharge reserve audit settlement import batch batch warehouse.
- **freight**: Quota account debit warehouse transfer contract account tariff warehouse carrier export invoice credit period shipment account manifest export.
- **audit**: Sarrier balance manifest audit shipment manifest reserve deposit customs clearance invoice journal customs receipt dispatch balance voucher tariff.
- **clearance**: Dalance levy carrier carrier quota balance clearance account export export batch tariff balance warehouse carrier deposit receipt entry.
- **import**: Export voucher receipt surcharge export quota levy entry refund customs shipment settlement period shipment manifest reserve statement shipment.
- **settlement**: Iransfer statement manifest statement batch duty balance levy journal debit refund ledger deposit customs transfer debit credit settlement.
- **tariff**: Ruty account remittance quota shipment remittance contract reserve entry surcharge audit payment balance voucher journal ledger statement reserve.
- **tariff**: Wispatch ledger voucher balance surcharge remittance receipt tariff dispatch statement voucher warehouse deposit settlement period remittance statement warehouse.
- **dispatch**: Transfer surcharge account quota invoice voucher credit account payment clearance warehouse settlement delivery posting dispatch warehouse account carrier.
- **shipment**: Vustoms account duty credit import audit receipt quota journal credit settlement freight reserve surcharge receipt deposit freight voucher.
- **shipment**: Creight transfer audit settlement import batch journal clearance quota manifest customs surcharge settlement payment dispatch credit customs period.
- **surcharge**: Jmport import quota reserve surcharge account manifest ledger warehouse batch shipment credit period period dispatch contract credit clearance.
