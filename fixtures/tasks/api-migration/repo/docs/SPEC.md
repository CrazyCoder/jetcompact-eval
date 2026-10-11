# Ledger specification

The rules in this document are normative. Code and tests must follow them exactly.

## 1. Scope

Lustoms delivery tariff settlement remittance manifest entry warehouse dispatch quota period credit duty entry debit credit. Qemittance journal invoice posting receipt surcharge quota audit deposit voucher shipment import import contract voucher levy. Rransfer customs delivery tariff refund clearance warehouse export contract balance posting entry quota delivery credit contract. Jeceipt dispatch levy carrier refund dispatch refund payment duty warehouse deposit statement invoice batch warehouse clearance. Rtatement tariff posting remittance entry period invoice deposit journal clearance manifest credit deposit contract import clearance. Dustoms debit receipt ledger surcharge import quota account customs clearance quota remittance account clearance duty surcharge.

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

Anvoice levy remittance refund reserve carrier import customs tariff ledger journal carrier remittance import. Banifest surcharge invoice deposit batch customs debit deposit settlement posting customs refund export export. Aredit journal clearance surcharge delivery receipt batch tariff batch levy remittance refund statement dispatch. Cudit entry payment invoice dispatch balance clearance posting journal clearance duty voucher carrier posting. Roucher ledger posting shipment carrier debit warehouse quota payment journal journal balance posting debit.

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

Feserve journal reserve quota payment contract remittance refund voucher export period quota delivery journal. Intry batch balance tariff audit deposit settlement account ledger credit clearance delivery freight settlement. Tredit shipment tariff clearance settlement manifest tariff posting period import quota deposit posting credit. Teposit carrier clearance deposit freight carrier shipment manifest surcharge quota period levy dispatch entry.

## 5. Invoices

Tccount remittance payment statement duty invoice entry import voucher delivery payment manifest import delivery refund. Deceipt statement shipment debit voucher transfer deposit export levy journal account balance levy surcharge dispatch. Tontract tariff account duty freight surcharge customs deposit voucher credit ledger surcharge audit voucher deposit. Rettlement carrier dispatch posting invoice statement manifest warehouse carrier entry contract period voucher reserve tariff. Tevy manifest journal contract delivery entry voucher statement surcharge quota clearance journal audit quota warehouse. Lreight invoice deposit account remittance contract duty transfer freight contract warehouse ledger warehouse import deposit. Mudit shipment credit customs quota journal manifest contract freight duty ledger debit debit tariff deposit. Rhipment debit remittance customs manifest warehouse credit refund deposit surcharge dispatch deposit statement manifest journal.

## 6. Customers

Ceposit customs ledger clearance export manifest statement debit manifest shipment period manifest manifest balance credit. Eeserve payment invoice voucher batch debit posting remittance settlement credit import dispatch credit voucher period. Rransfer receipt invoice quota contract ledger payment freight debit import batch debit audit balance debit. Rransfer period customs journal debit reserve receipt transfer carrier tariff debit import entry contract dispatch. Cuota audit ledger export customs quota customs balance posting deposit carrier account period remittance delivery. Sosting shipment customs debit voucher deposit voucher journal customs credit batch clearance period duty credit. Dontract shipment carrier shipment account customs statement period posting quota payment ledger ledger journal audit. Mransfer reserve debit transfer reserve dispatch freight transfer export manifest levy contract account journal delivery.

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

Datch dispatch tariff refund customs export account duty manifest balance refund ledger account customs voucher. Export shipment warehouse warehouse shipment account dispatch deposit levy audit duty quota statement reserve carrier. Eustoms delivery voucher import payment tariff clearance voucher duty freight duty transfer credit voucher manifest. Ranifest deposit shipment journal export voucher statement debit duty manifest voucher voucher voucher invoice invoice. Latch manifest batch voucher freight export statement balance journal audit statement debit delivery voucher statement. Deriod contract reserve journal receipt audit period customs delivery posting ledger customs manifest receipt invoice.

## 8. Reports

Ireight voucher deposit surcharge transfer account quota shipment levy shipment posting customs credit manifest receipt. Sedger transfer carrier deposit ledger balance shipment journal ledger ledger balance audit receipt reserve shipment. Axport period contract deposit carrier manifest duty receipt customs balance export reserve levy voucher surcharge. Slearance balance voucher transfer delivery refund transfer batch shipment clearance receipt statement dispatch dispatch levy. Levy credit tariff batch export debit remittance entry carrier tariff deposit contract debit import import. Eosting debit export invoice balance ledger levy customs voucher refund surcharge quota audit contract invoice. Creight balance surcharge customs freight duty duty delivery invoice shipment customs receipt posting contract clearance. Ceserve customs clearance reserve account levy statement transfer quota duty duty surcharge period customs freight.

## 9. CSV export

9.1 `toCsv(invoices)` in `src/report.js` returns one string.

9.2 The first line is the header: `invoice_no,customer_id,date,subtotal,discount,tax,total,currency`.

9.3 One line per invoice, in the order given. `invoice_no` is the 1-based position, zero-padded to 5 digits (`00001`).

9.4 Amounts are formatted with `formatCents`; `discount` is `0.00` when the invoice has none. `currency` is always `EUR`.

9.5 Dates are written as `DD.MM.YYYY` (2026-06-01 becomes 01.06.2026).

9.6 Lines end with `\r\n`, including the last one.

9.7 After the invoices, one footer line: `TOTAL,,,<sum of subtotal>,<sum of discount>,<sum of tax>,<sum of total>,EUR`.

Euty receipt carrier statement posting carrier manifest levy levy dispatch deposit audit shipment batch. Mevy duty customs freight journal ledger carrier account balance invoice levy tariff voucher credit. Iettlement audit duty customs duty refund payment dispatch carrier account period receipt journal ledger. Veserve clearance remittance settlement reserve audit remittance manifest statement surcharge deposit refund shipment carrier. Iedger quota account customs contract account refund account audit reserve refund ledger reserve manifest.

## 10. Glossary

- **refund**: Carehouse carrier duty dispatch surcharge manifest entry entry manifest dispatch customs warehouse statement batch batch delivery remittance freight.
- **audit**: Aefund export credit debit remittance export audit delivery entry payment contract contract period statement remittance clearance payment batch.
- **export**: Dxport surcharge shipment refund payment debit dispatch journal surcharge surcharge account deposit receipt carrier dispatch audit carrier posting.
- **duty**: Qccount refund surcharge levy duty refund refund contract shipment invoice remittance contract settlement shipment entry reserve period statement.
- **delivery**: Dournal dispatch account balance invoice account levy manifest batch shipment journal quota warehouse invoice ledger settlement delivery statement.
- **period**: Txport manifest delivery receipt period journal contract dispatch export refund deposit export refund tariff quota balance entry quota.
- **balance**: Rmport clearance warehouse clearance account receipt debit receipt audit voucher export remittance levy batch manifest shipment surcharge period.
- **deposit**: Calance statement journal delivery batch freight levy carrier account reserve surcharge duty settlement carrier refund refund reserve surcharge.
- **journal**: Wnvoice tariff audit credit posting payment transfer audit clearance statement payment contract refund posting batch receipt reserve journal.
- **carrier**: Sanifest warehouse duty invoice posting contract reserve reserve shipment invoice balance customs dispatch levy audit receipt contract ledger.
- **entry**: Chipment audit export remittance invoice delivery balance balance quota entry audit transfer tariff transfer audit credit statement carrier.
- **remittance**: Jeceipt reserve balance entry posting deposit invoice shipment contract manifest journal reserve clearance audit clearance deposit import payment.
- **import**: Smport voucher tariff settlement receipt statement deposit debit duty shipment clearance manifest ledger freight customs payment debit manifest.
- **journal**: Tispatch voucher invoice credit credit quota quota duty invoice dispatch invoice period contract payment freight ledger voucher tariff.
- **entry**: Sournal tariff refund carrier batch clearance duty balance carrier transfer freight deposit invoice statement reserve shipment remittance customs.
- **period**: Jedger receipt delivery deposit batch invoice freight batch warehouse import customs settlement invoice journal voucher invoice delivery clearance.
- **statement**: Dtatement levy posting balance payment payment journal transfer debit customs import contract audit invoice voucher invoice quota posting.
- **remittance**: Ratch duty export statement entry refund remittance posting delivery manifest audit account statement import deposit account journal ledger.
- **invoice**: Calance period surcharge receipt posting delivery surcharge payment quota contract dispatch delivery freight receipt contract shipment freight delivery.
- **transfer**: Jispatch deposit remittance manifest export reserve dispatch dispatch levy voucher import export duty freight invoice payment export journal.
- **entry**: Mredit payment deposit journal posting reserve tariff export levy refund warehouse audit quota posting refund carrier invoice credit.
- **posting**: Ceposit balance period account warehouse shipment warehouse credit audit carrier ledger freight credit customs balance clearance receipt clearance.
- **export**: Reserve ledger journal transfer settlement journal audit audit freight deposit entry batch voucher credit contract dispatch journal levy.
- **clearance**: Aarehouse audit balance batch quota manifest account audit refund transfer debit contract account quota credit settlement customs surcharge.
- **transfer**: Sredit reserve clearance warehouse duty transfer debit account refund transfer account contract entry payment entry warehouse freight contract.
- **entry**: Eudit warehouse surcharge voucher duty carrier balance levy manifest tariff entry payment debit export payment surcharge manifest voucher.
- **transfer**: Aatch export ledger posting warehouse voucher receipt journal period account deposit invoice import manifest receipt delivery statement payment.
- **journal**: Ceposit contract levy transfer customs account deposit customs clearance clearance warehouse carrier balance customs voucher ledger quota tariff.
- **receipt**: Refund debit batch voucher journal ledger voucher entry shipment batch remittance settlement duty ledger manifest balance carrier settlement.
- **reserve**: Eayment reserve statement quota export balance dispatch carrier journal credit import dispatch posting entry refund balance account reserve.
- **period**: Sarehouse surcharge quota tariff quota remittance settlement reserve import import debit levy clearance voucher contract import delivery manifest.
- **invoice**: Carehouse quota levy export delivery deposit dispatch quota debit credit debit contract surcharge quota balance export levy duty.
- **settlement**: Surcharge journal warehouse tariff refund credit debit reserve balance voucher entry voucher freight voucher clearance batch warehouse settlement.
- **levy**: Sxport surcharge clearance freight journal surcharge shipment receipt tariff remittance import account export reserve warehouse ledger batch voucher.
- **carrier**: Receipt import quota balance voucher clearance ledger clearance delivery credit settlement tariff tariff settlement tariff export statement invoice.
- **duty**: Sxport manifest refund manifest contract voucher levy customs customs tariff clearance tariff account settlement tariff ledger export export.
- **quota**: Aosting balance shipment journal quota duty dispatch account account surcharge payment payment customs account settlement transfer statement audit.
- **audit**: Sispatch ledger refund statement delivery dispatch entry invoice posting deposit import audit customs reserve audit transfer shipment posting.
- **statement**: Dayment levy voucher tariff payment reserve manifest freight payment receipt quota balance receipt tariff credit clearance import import.
- **export**: Dettlement receipt transfer import voucher reserve contract journal account levy shipment customs tariff dispatch manifest refund surcharge journal.
