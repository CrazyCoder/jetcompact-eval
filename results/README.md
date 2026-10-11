# Results

The `analyze.mjs` and `tradeoff.mjs` output behind
[JetCompact's evals page](https://github.com/CrazyCoder/jetcompact/blob/main/docs/evals.md).
Sonnet 5.5, 2026-10-11. Raw transcripts are not published.

| File | Runs | What |
| -- | -- | -- |
| `one-compaction-analysis.txt` | 81 | 9 tasks x {built-in, Jev, algorithmic} x 3 at a 150k window, JetCompact `09b893e` |
| `one-compaction-tradeoff.txt` | same | The cost model fitted from those runs |
| `providers-analysis.txt` | 87 | The 81 above plus OpenAI Decisions on 3 tasks x 2 |
| `repeated-compaction-before-fix.txt` | 36 | 4 tasks x {built-in, `09b893e`, `7cf973b` sticky harder cut} x 3 at a 100k window |
| `window-fix-analysis.txt` | 56 | The 36 above plus 0.11.0 (`7b4496d`): the same 4 tasks x 3 at 100k (`jetcompact:window`) and 4 tasks x 2 at 150k (`jetcompact:window150`) |

In every file, `per arm-variant` gives the means and ranges per arm, and `per
task` the same per task.
