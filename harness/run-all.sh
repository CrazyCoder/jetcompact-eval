#!/usr/bin/env bash
# Runs every task in every arm (and every variant of the jetcompact arm), REPS
# times each, PARALLEL at a time, until BUDGET_USD is spent.
#   REPS=2 PARALLEL=4 ARMS="builtin jetcompact" VARIANTS="default" BUDGET_USD=200 \
#     harness/run-all.sh [task ...]
# Run ids are <task>-<arm>[-<variant>]-<rep>; the variant is left out when it
# is "default", and the builtin arm runs once per task and rep whatever
# VARIANTS holds. Spending counts from runs/.budget-start, created on the first
# run-all and never overwritten; delete it to start a new budget.
set -euo pipefail
root=$(cd "$(dirname "$0")/.." && pwd)
reps=${REPS:-2}
arms=${ARMS:-builtin jetcompact}
variants=${VARIANTS:-default}
export BUDGET_USD=${BUDGET_USD:-200}
tasks=("$@")
[ ${#tasks[@]} -eq 0 ] && tasks=($(ls "$root/fixtures/tasks"))
for v in $variants; do [ -f "$root/harness/variants/$v.json" ] || { echo "no variant file harness/variants/$v.json" >&2; exit 2; }; done
node "$root/harness/ledger.mjs" --init
jobs=()
for rep in $(seq 1 "$reps"); do
  for task in "${tasks[@]}"; do
    for arm in $arms; do
      vs=$variants
      [ "$arm" = builtin ] && vs=default
      for variant in $vs; do
        id="$task-$arm"
        [ "$variant" != default ] && id="$id-$variant"
        id="$id-$rep"
        # A finished run is kept; delete its folder to run it again.
        if [ -f "$root/runs/$id/meta.json" ] && [ "$(jq -r .exit "$root/runs/$id/meta.json")" = 0 ]; then continue; fi
        jobs+=("$arm $root/fixtures/tasks/$task $id $variant")
      done
    done
  done
done
[ ${#jobs[@]} -eq 0 ] && { echo "nothing to run"; node "$root/harness/ledger.mjs"; exit 0; }
# Each job checks the budget before it starts, so at most PARALLEL runs
# overshoot it.
printf '%s\n' "${jobs[@]}" | xargs -P "${PARALLEL:-4}" -L 1 bash -c '
  node "$0/harness/ledger.mjs" --check "$BUDGET_USD" || { echo "skip $3"; exit 0; }
  "$0"/harness/run-one.sh "$1" "$2" "$3" "$4" > "$0/runs/$3.out" 2>&1; echo "done $3 (exit $?)"' "$root"
node "$root/harness/ledger.mjs"
