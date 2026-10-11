# jetcompact-eval

An A/B evaluation of conversation compaction in Claude Code. It compares Claude
Code's built-in compaction summary with the
[JetCompact](https://github.com/CrazyCoder/jetcompact) plugin on the same
multi-turn coding tasks, and measures whether the agent still finishes the task,
what the run costs, and how much work it repeats after a compaction. The results
and what they mean are in JetCompact's
[docs/evals.md](https://github.com/CrazyCoder/jetcompact/blob/main/docs/evals.md).

The harness was written on Windows (Git Bash, `pwsh` for GUIDs, `cygpath`); it
needs `claude`, `jq` and Node 22 or later.

## How a run works

`harness/run-one.sh <arm> <task-dir> <run-id> [variant]` copies the task's
`repo/` to `runs/<run-id>/work`, commits it, and sends each `steps/NN.md` as one
user turn to one headless session: `claude -p` for the first step, `--resume`
for the others. A step whose whole text is `/compact` stands for an automatic
compaction: it runs only when the previous step's last request used at least
`TRIGGER_PCT` (60) percent of `WINDOW` (150000), in both arms, and leaves
`skipped-NN` otherwise. Each step leaves `stream-NN.jsonl`, `debug-NN.log` and
`stderr-NN.log` in `runs/<run-id>/`; `meta.json` is written at the end. The
model is `MODEL` (default `sonnet`). Do not edit `run-one.sh` while runs
execute: bash reads it as it goes. `harness/recover-meta.mjs` rebuilds a lost
`meta.json` from complete streams.

## Arms

- `builtin`: Claude Code alone; `/compact` writes the built-in summary.
- `jetcompact`: the same, with `--plugin-dir $PLUGIN_DIR` (pin it to a git
  worktree of the commit under test, so edits do not leak into running
  sessions). The `/compact` step is sent as
  `/compact automatic, from jetcompact`, the form JetCompact gives the
  compaction it queues itself, so its size guards and built-in fallback apply as
  in an automatic compaction.

## Variants

A variant is `harness/variants/<name>.json`, a set of JetCompact plugin options
such as `{"keepResultTokens": 6000}`. For the jetcompact arm, `run-one.sh`
writes `runs/<run-id>/settings.json` as
`{"pluginConfigs": {"jetcompact": {"options": <variant>}}}` and passes it with
`--settings` to every `claude` call. Keys starting with `_` (such as
`_provider_env`) are not passed to the plugin. `default.json` is `{}`, the
plugin's own defaults. The builtin arm ignores variants. The variant is recorded
in `meta.json`.

| Variant | Options |
| -- | -- |
| `default` | none: the plugin's defaults |
| `algorithmic` | `provider: "algorithmic"`, no decision model |
| `openai` | `provider: "openai"`; export `OPENAI_API_KEY` for the run |
| `aged` | `ageCutResults: true` |
| `k6000` | `keepResultTokens: 6000` |
| `h100` | `truncateHeadChars: 100` |
| `criteria` | `questionCriteria: true`, `maxRequestTokens: 60000` |
| `harder` | none; ran with `PLUGIN_DIR` at `7cf973b` |
| `window`, `window150` | `compactAtPercent: 1000`, so only the harness compacts; ran with `PLUGIN_DIR` at `7b4496d` at a 100k and a 150k window |

From 0.11.0 on, JetCompact's own trigger measures against the compaction
window, so in a run it fires at 60% and the `/compact` it queues runs. Turn it
off with `compactAtPercent: 1000` in the variant, as `window` does, or the
jetcompact arm compacts on its own schedule as well as at the harness's steps.

## Tasks

`node fixtures/build-ledger.mjs` generates all of them, deterministically, from
one synthetic invoicing project ("ledger") into `fixtures/tasks/<task>/` with
`repo/`, `steps/` and `grade/` (the visible tests plus hidden ones).

| Task | Steps | Compactions | What it needs |
| -- | -- | -- | -- |
| `fix-bugs` | 6 | 2 | Fix two bugs that fail the visible tests (pilot) |
| `discounts` | 7 | 2 | Implement SPEC section 7 volume discounts (pilot) |
| `api-migration` | 6 | 2 | Migrate twelve region modules to a new API (pilot) |
| `csv-export` | 7 | 2 | Implement SPEC section 9 CSV export (pilot) |
| `migration-notes` | 7 | 2 | Recall: cut-over dates written as prose about 600 lines into a 1500-line `docs/MIGRATION.md`, among decoy dates |
| `audit-script` | 7 | 2 | Recall: held invoices and dates printed only by `node scripts/audit.mjs`, run once at the start |
| `customer-quirks` | 7 | 2 | Recall: three customers' rounding arrangements in the prose notes of `data/accounts/page-NN.json` |
| `long-conventions` | 17 | 4 | Long: an error-code prefix and a tolerance the user states in turn 2, used in turns 14-15 |
| `long-latefees` | 17 | 4 | Long: late-fee rules the user states in turn 2, used in turns 14-15 |

In the recall tasks, the onboarding turn reads or runs the source of the fact,
and the turn that needs it comes after two compactions and does not say where
the fact is. The agent can read or run the source again (counted as rereads),
or, in the jetcompact arm, use `recall`. In the long tasks, the fact is only in
the conversation: more than eight user turns pass before it is needed, so
JetCompact's prose digest can engage. Facts come from a seeded PRNG.

`node fixtures/check-reference.mjs` applies a reference solution to each task
and runs its grade tests; every task must pass. It also checks that the starting
suite fails in `fix-bugs` and `api-migration` and passes in the others. The
recall references take each fact from where the agent has to find it.

## Budget guard

`harness/ledger.mjs` sums the cost of every run since the time in
`runs/.budget-start`. A run's cost is `total_cost_usd` of the last result event
in its streams, which is cumulative over the session. `run-all.sh` creates
`runs/.budget-start` if it is missing and never overwrites it; delete it to
start a new budget. Each job checks
`node harness/ledger.mjs --check $BUDGET_USD` before it starts and skips when
the budget is spent, so up to `PARALLEL` runs can overshoot it.
`node harness/ledger.mjs` prints the total.

## Running

```bash
node fixtures/build-ledger.mjs
node fixtures/check-reference.mjs
git -C ../jetcompact worktree add ../jetcompact-ab <commit>
REPS=2 PARALLEL=4 ARMS="builtin jetcompact" VARIANTS="default" BUDGET_USD=200 \
  WINDOW=150000 TRIGGER_PCT=60 PLUGIN_DIR=C:/projects/jetcompact-ab \
  harness/run-all.sh [task ...]
```

All variables are optional; the values above are the defaults, except
`PLUGIN_DIR`, which defaults to `C:/projects/jetcompact`. Run ids are
`<task>-<arm>[-<variant>]-<rep>`, without the variant when it is `default`. A
run with a `meta.json` and exit 0 is kept; delete its folder to run it again.
Each run's console output is in `runs/<run-id>.out`.

## Analyzing

```bash
node harness/analyze.mjs [run-id-prefix]
```

It grades each run by copying the task's `grade/` over the run's work tree and
running the tests, then writes `runs/results.json` and prints three tables: per
run, per arm-variant (`builtin`, `jetcompact`, `jetcompact:<variant>`), and per
task. The two summaries give each metric as mean [min-max]. Metrics: cost,
tokens, tool calls, repeated identical calls, rereads (after a compaction, a
Read of a file read before the first one, or a non-test Bash command that
contains one run before it), `recall` calls, and digest engagement (debug logs
whose JetCompact outcome line says `old prose digest:` or `old prose summarize:`
with at least one message).

`node harness/tradeoff.mjs` fits a cost model per arm from the runs (context
kept per compaction, compaction cost and seconds, growth per message, re-reads
after a compaction) and projects a 400-message session in a 200k window at
several triggers, for a 1-hour cache, a 5-minute cache, and a 5-minute cache
with a pause past the TTL every 15 messages.

## Results

[`results/`](results/) holds the analysis output behind JetCompact's evals page.

## Known limitations

- Compaction happens at `/compact` steps, gated by the trigger, rather than at
  the exact turn the context fills up, so both arms compact at the same points.
- Every arm loads whatever `CLAUDE_CODE_PLUGIN_DIRS` names in the shell that
  starts the runs; clear it for a clean comparison.
- The tasks are synthetic and small. Every arm finished every task in the runs
  so far, so success rate does not separate them; the measures that do are
  re-reads, repeated calls, compaction time and cost.
