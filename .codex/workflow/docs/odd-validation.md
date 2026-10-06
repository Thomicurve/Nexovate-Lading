# Codex workflow validation

Repository edits are template changes, not runtime/model/MCP acceptance or global installation.

## Static checks

Run Python 3.11+ `python -m unittest discover -s tests -v` from the repository root.
Checks cover native role formats, one writer, actual references, separate runtime policies,
readable two-file templates, mode/approval boundaries, memory recovery and retained
Git/design/Linear/no-image contracts. OpenCode's separate permission tests are unchanged.

## Runtime acceptance — pending until observed

| Case | Required evidence |
| --- | --- |
| Feature start | Explicit ASK_EACH_TASK/CONTINUOUS answer plus current plan/design approval; canceled or missing answers do not dispatch |
| Per-task mode | Exact next ID shown, WAITING_FOR_USER until matching named choice, consumed once |
| Continuous mode | All listed approved Tasks run serially, each after accepted prerequisites/checks/review/commits; no repeat permission between normal successes |
| Blocker/material delta | Stop affected execution, preserve work, consult; new Tasks/revision are never covered by the old grant |
| Review/pause/mode switch | User interruption stops progression, explicit resume required; prospective mode switch retains plan/Git boundaries |
| Recovery | Reconcile files/authority/HEAD/liveness/proof; resume current continuous plan only if grant remains valid; no duplicate writer |
| Memory outage | task.md retains sufficient compact approval/check/review references; continue only with required local evidence; report pending memory truthfully |
| Documents | Readable spec.md definition and task.md Stories/Tasks; no Identity and current state or progress history in spec; no extra reports |
| Completion | Feature checks/review and true result, separate from PR/merge/deployment |
| Providers | Scoped Engram continuity save/read, actual tool permissions/hooks; owner-only Linear; authorized Delivery-only GitHub with readback |
| Preservation | Same checkout, no parallel writers/task branches/launchers, no indiscriminate staging/reset, legacy migration only by consent |
| Design | Actual approved Pencil nodes, no generated images/captures/exports |

Record meaningful receipts in Engram/current context, with short required fallback
references in task.md. Static checks do not enforce human choices, scheduling, provider
writes or LLM behavior. Do not claim measured token savings or runtime acceptance.
