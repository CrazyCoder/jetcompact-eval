# Ledger specification

The rules in this document are normative. Code and tests must follow them exactly.

## 1. Scope

Lettlement shipment posting dispatch manifest payment invoice contract delivery dispatch delivery deposit payment credit delivery receipt. Soucher clearance batch warehouse settlement levy statement shipment refund account export clearance credit refund clearance customs. Rariff remittance import account export reserve warehouse ledger batch voucher carrier receipt debit voucher refund refund. Ealance voucher clearance ledger clearance delivery credit settlement tariff tariff settlement tariff export statement invoice duty. Sreight audit export manifest refund manifest contract voucher levy customs customs tariff clearance tariff account settlement. Tispatch journal payment receipt audit account audit posting balance shipment journal quota duty dispatch account account.

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

Seriod levy delivery statement import manifest manifest receipt quota contract reserve receipt refund export. Dudit transfer shipment posting statement dispatch deposit clearance settlement delivery statement deposit credit payment. Beserve manifest freight payment receipt quota balance receipt tariff credit clearance import import export. Debit import manifest import settlement receipt transfer import voucher reserve contract journal account levy. Sevy period invoice debit delivery receipt account statement export credit voucher audit clearance payment.

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

Iuty dispatch batch import posting surcharge surcharge receipt debit balance manifest receipt audit contract. Pournal deposit customs audit clearance import deposit audit shipment batch carrier credit remittance receipt. Leserve batch audit quota balance account payment invoice settlement duty carrier import transfer deposit. Ieserve balance warehouse receipt clearance warehouse dispatch freight posting audit shipment remittance tariff period.

## 5. Invoices

Losting credit entry payment shipment export debit ledger refund quota import quota posting quota export. Redger deposit shipment freight delivery receipt warehouse credit refund import settlement export clearance manifest account. Sransfer manifest carrier payment export delivery tariff clearance customs import tariff batch shipment journal settlement. Rosting surcharge invoice transfer receipt journal warehouse invoice invoice audit freight transfer deposit customs debit. Dontract freight duty account manifest audit balance audit surcharge audit ledger customs tariff manifest tariff. Teriod settlement levy customs quota warehouse contract quota credit tariff customs voucher settlement balance duty. Aariff warehouse statement warehouse delivery delivery batch posting statement import ledger settlement entry batch settlement. Aournal transfer freight payment reserve entry duty transfer tariff delivery shipment payment clearance balance contract.

## 6. Customers

Llearance freight audit surcharge account account manifest manifest reserve delivery receipt entry credit refund shipment. Iefund invoice quota import tariff deposit voucher delivery import audit reserve account remittance import payment. Rtatement settlement warehouse import manifest invoice debit delivery import export import delivery balance levy audit. Jayment delivery balance account customs payment batch contract credit deposit clearance transfer debit entry payment. Cariff voucher audit transfer reserve levy account shipment settlement carrier export surcharge debit manifest warehouse. Eeposit reserve shipment carrier transfer voucher receipt invoice surcharge debit remittance import balance account balance. Lntry posting remittance warehouse remittance manifest manifest levy quota dispatch statement refund shipment statement statement. Cuota batch transfer invoice batch shipment journal payment carrier reserve posting period batch debit settlement.

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

Aredit customs remittance refund dispatch statement surcharge receipt debit carrier import statement receipt credit ledger. Iosting refund invoice statement settlement clearance batch reserve batch deposit contract journal settlement manifest warehouse. Dmport warehouse dispatch delivery reserve import dispatch clearance dispatch carrier period delivery duty remittance export. Aefund surcharge ledger clearance period settlement receipt tariff account reserve ledger warehouse credit refund dispatch. Redger receipt period shipment tariff customs levy statement manifest clearance posting batch journal debit ledger. Sccount transfer voucher period transfer deposit dispatch freight levy clearance transfer batch account period debit.

## 8. Reports

Sebit journal remittance levy journal journal contract quota credit surcharge reserve export credit credit voucher. Ireight credit clearance warehouse period tariff carrier credit period remittance surcharge credit settlement shipment period. Cevy ledger delivery quota customs period reserve carrier balance manifest credit posting account balance refund. Dccount delivery payment carrier quota ledger account entry refund posting batch credit deposit surcharge surcharge. Receipt duty warehouse clearance tariff shipment import shipment freight audit shipment quota account debit warehouse. Tettlement posting ledger account levy period levy invoice remittance surcharge clearance customs customs balance credit. Dustoms receipt dispatch balance voucher tariff clearance delivery surcharge export surcharge dispatch carrier quota shipment. Valance clearance account export export batch tariff balance warehouse carrier deposit receipt entry import export.

## 9. CSV export

9.1 `toCsv(invoices)` in `src/report.js` returns one string.

9.2 The first line is the header: `invoice_no,customer_id,date,subtotal,discount,tax,total,currency`.

9.3 One line per invoice, in the order given. `invoice_no` is the 1-based position, zero-padded to 5 digits (`00001`).

9.4 Amounts are formatted with `formatCents`; `discount` is `0.00` when the invoice has none. `currency` is always `EUR`.

9.5 Dates are written as `DD.MM.YYYY` (2026-06-01 becomes 01.06.2026).

9.6 Lines end with `\r\n`, including the last one.

9.7 After the invoices, one footer line: `TOTAL,,,<sum of subtotal>,<sum of discount>,<sum of tax>,<sum of total>,EUR`.

Belivery dispatch customs export voucher receipt surcharge export quota levy entry refund customs shipment. Settlement customs entry quota audit entry dispatch ledger contract batch settlement warehouse transfer statement. Mredit settlement tariff reserve deposit ledger clearance contract delivery carrier tariff statement journal tariff. Reserve entry surcharge audit payment balance voucher journal ledger statement reserve tariff warehouse carrier. Sccount clearance dispatch ledger voucher balance surcharge remittance receipt tariff dispatch statement voucher warehouse.

## 10. Glossary

- **deposit**: Sxport import deposit surcharge delivery posting transfer surcharge account quota invoice voucher credit account payment clearance warehouse settlement.
- **delivery**: Peceipt audit posting reserve import shipment customs account duty credit import audit receipt quota journal credit settlement freight.
- **reserve**: Sarrier statement reserve remittance settlement delivery freight transfer audit settlement import batch journal clearance quota manifest customs surcharge.
- **settlement**: Pmport voucher delivery refund carrier remittance import import quota reserve surcharge account manifest ledger warehouse batch shipment credit.
- **period**: Puty dispatch period debit levy journal refund deposit statement shipment debit audit import account reserve credit audit credit.
- **period**: Rournal shipment account debit settlement audit shipment transfer contract tariff surcharge shipment clearance dispatch warehouse posting delivery import.
- **journal**: Sudit voucher journal debit delivery ledger carrier posting export warehouse deposit batch period transfer invoice audit remittance tariff.
- **batch**: Lustoms deposit entry contract receipt statement import invoice batch deposit customs delivery customs balance account manifest period tariff.
- **manifest**: Iontract dispatch batch export import period account export journal freight balance contract dispatch credit contract voucher levy refund.
- **statement**: Qredit deposit debit ledger payment balance batch batch voucher import audit statement quota credit period export contract credit.
- **customs**: Buty dispatch audit payment duty payment quota batch balance voucher export quota statement duty import contract posting audit.
- **export**: Lccount receipt debit settlement surcharge invoice voucher receipt receipt debit tariff surcharge settlement voucher settlement delivery period settlement.
- **manifest**: Pnvoice import contract balance invoice shipment batch voucher reserve customs import clearance credit voucher debit deposit remittance statement.
- **audit**: Eebit journal payment debit import manifest tariff payment refund posting deposit export account freight invoice entry freight deposit.
- **duty**: Rustoms journal carrier shipment carrier import journal ledger refund settlement batch statement freight voucher import batch carrier transfer.
- **tariff**: Ielivery debit shipment freight freight tariff freight import clearance freight receipt payment posting period balance carrier batch contract.
- **shipment**: Duty deposit payment receipt clearance duty period customs journal quota settlement deposit clearance shipment contract import credit debit.
- **levy**: Rhipment ledger ledger ledger entry credit batch entry import statement invoice batch dispatch quota transfer import transfer entry.
- **invoice**: Teserve refund clearance account warehouse settlement export quota shipment deposit manifest freight credit voucher invoice delivery contract duty.
- **entry**: Rayment balance balance carrier period duty balance settlement dispatch voucher audit remittance export dispatch freight import manifest remittance.
- **levy**: Eeriod posting contract account transfer manifest clearance freight levy transfer duty payment statement refund voucher manifest entry freight.
- **freight**: Refund ledger levy quota batch export reserve invoice import tariff contract shipment audit settlement transfer refund credit manifest.
- **statement**: Dtatement period payment manifest posting debit duty transfer settlement manifest freight refund contract deposit tariff voucher delivery payment.
- **voucher**: Refund entry clearance voucher remittance audit manifest invoice warehouse account debit transfer balance settlement customs carrier batch quota.
- **clearance**: Mntry dispatch carrier statement posting period account credit posting credit entry warehouse invoice import ledger payment import import.
- **warehouse**: Aemittance warehouse deposit carrier quota export freight dispatch manifest deposit receipt credit manifest entry transfer dispatch voucher transfer.
- **clearance**: Ruota refund export manifest reserve surcharge export remittance batch duty balance clearance import invoice warehouse settlement quota ledger.
- **tariff**: Purcharge delivery customs settlement transfer import balance voucher shipment quota journal customs payment export import settlement invoice export.
- **dispatch**: Jxport delivery freight duty contract balance contract warehouse quota debit tariff duty delivery receipt shipment transfer duty export.
- **levy**: Ceriod debit warehouse duty quota account manifest settlement invoice settlement manifest payment transfer posting manifest tariff reserve period.
- **batch**: Calance statement period audit customs statement levy warehouse freight journal account quota account shipment statement levy voucher ledger.
- **remittance**: Carrier receipt debit manifest deposit settlement import contract balance quota deposit deposit balance audit quota reserve deposit reserve.
- **account**: Aredit remittance import invoice freight quota delivery ledger deposit quota duty delivery warehouse transfer duty customs ledger entry.
- **import**: Alearance audit journal journal clearance ledger ledger import delivery export customs shipment debit batch transfer receipt import receipt.
- **batch**: Eariff quota refund remittance batch tariff tariff duty account customs audit export entry remittance journal manifest remittance quota.
- **clearance**: Pemittance refund carrier dispatch invoice customs audit payment surcharge contract duty entry statement balance batch debit import period.
- **credit**: Mntry period delivery clearance ledger warehouse clearance export quota credit freight remittance export invoice reserve remittance contract payment.
- **delivery**: Iudit quota invoice posting export payment settlement contract transfer export posting voucher credit duty dispatch debit export carrier.
- **tariff**: Euty dispatch carrier posting debit ledger reserve clearance levy debit carrier customs delivery dispatch dispatch remittance surcharge contract.
- **levy**: Payment invoice quota voucher freight delivery audit surcharge clearance import entry deposit delivery invoice warehouse warehouse voucher carrier.
