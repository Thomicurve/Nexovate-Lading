# AI-Workflow — ODD with sequential task checkpoints

Codex adaptation of the integrated OpenCode V2.2 baseline `b173160830466ac2f59aaaf211a60573a5888c5f`. This package is not runtime-certified until the acceptance matrix has observed receipts.
Reference: [Gentle AI ODD](https://github.com/Gentleman-Programming/gentle-ai/blob/5140c5f55baf91763198eb0bfca019c015e3b015/docs/usage.md#organic-driven-development-odd). The reference tracks main and may contain unreleased behavior.

## Intent and deliberate adaptations

Use explore → resolve real decisions → implement → proportionate checks. For substantial work, keep the definition in spec.md and Stories/Tasks in task.md. Engram stores meaningful progress and reasons in a continuity record, alongside selected durable facts.
Keep existing roles, inherited Codex model selection, Caveman lite, Context Maps and user-approved Pencil design. Make specialist preparation conditional instead of forcing every feature through every stage.
This adaptation retains an explicit pre-implementation user approval for substantial work. It retains independent review for every substantial work unit, with deeper independent verification for high-risk work. These are local choices, not claims that upstream ODD requires them.
RDD is not installed, enabled, emulated or required by V2. Do not invoke Gentle AI review commands merely because this workflow uses ODD.
Codex keeps sequential execution, plan/design approval, no-image design and GitHub/Linear boundaries. Before each feature, the user chooses ASK_EACH_TASK or CONTINUOUS. Definition and task planning are separate; Engram holds meaningful progress and reasons.

## Role routing

| Role | Use when | Result / consumer |
| --- | --- | --- |
| Orchestrator | Every request | Routing, user decisions, persistence and progress |
| Discovery | Material functional ambiguity | Scope facts/questions → Orchestrator |
| Product | Complex behavior needs explicit criteria | Intent/behavior/AC sections → Orchestrator |
| Story Writer | User asks for stories or decomposition adds functional value | Optional Stories and coverage → Orchestrator |
| Explorer | Unfamiliar code or evidence needed to choose/route | Current code/test map → Orchestrator and relevant workers |
| Architect | Material architecture, migrations or nontrivial dependencies | Technical approach and executable Tasks → Orchestrator |
| Designer | Material screen/component/interaction/responsive change | Pencil candidate → user review → approved design |
| Implementer | Authorized bounded code changes or authorized Git delivery | Files, tests, checks, commit/delivery evidence → Orchestrator |
| Reviewer | Substantial work units, completion, risky small changes | Evidence-based verdict → Orchestrator |

## Handoff status consumers

Orchestrator consumes Discovery READY_FOR_SCOPE, Explorer READY_FOR_PLANNING and Product/Architect/Story Writer READY_FOR_PLAN_REVIEW as preparation evidence only, then selects missing work or presents the plan. None grants implementation authority.
Designer READY_FOR_USER_REVIEW goes to the user; DESIGN_APPROVED becomes a validated design input. Every WAITING_FOR_USER goes to an exact user decision; every BLOCKED retains the gap and routes only affected work.
Implementer IMPLEMENTED goes to checking/review, PARTIALLY_IMPLEMENTED retains IN_PROGRESS and BLOCKED records the missing prerequisite. Verification-only/delivery COMPLETED is operational evidence, not task completion; PARTIAL/BLOCKED retains missing proof.
Reviewer verdict/readiness mappings in `.codex/agents/reviewer.toml` control the next checking/correction action; Orchestrator alone applies feature/task states.

Orchestrator performs lightweight synthesis and task planning when specialists are unnecessary; it does not write application code. Implementer is the only application-writing role, with exactly one selected task and at most one writer in the project checkout. Explorer is not a mandatory predecessor: Implementer may inspect known scoped files as preparation for a write.
Story Writer remains exclusive owner of requested functional Stories; Tasks and ACs do not require Stories. No obligatory PRD, Functional Spec or standalone Story files. Stories and Tasks share task.md.

## Ordered protocol

1. Classify authorization. Investigation/explanation/proposals stay read-only in target repositories; do not create branches, feature task files or memory mirrors for proposal-only work. Disposable research notes are not target workflow artifacts.
2. Explore current repository rules, relevant code and existing tests proportionately. Use Explorer when mapping is needed; do not formalize a speculative solution before inspecting reality.
3. Resolve material unknowns. Research only named uncertainty. Preserve V1.4's batch of independently answerable questions, recommended options and custom responses; defer answer-dependent questions. Greenfield projects with no established stack require the user's technology choice before architecture or scaffolding. Agents may propose options, not choose silently.
4. Classify size separately from risk. Substantial means two or more meaningful implementation steps or progress worth recovering. Small means understood, bounded work with no durable tracking value. Security, credentials, data loss, concurrency, migrations, installation and public contracts are high-risk even in one file; unknown risk is high.
5. For substantial work, create `specs/<feature>/spec.md` from `.codex/workflow/docs/templates/odd-feature.md` and `specs/<feature>/task.md` from `.codex/workflow/docs/templates/odd-task.md`. The spec holds objective, scope, behavior, ACs and approach; task.md holds Stories/Tasks, dependencies, checks, TDD, risk, delivery, approval and minimal state. Write readable sections in the user’s language. Planning files may be created before approval; application writes may not.
6. Before beginning the feature, ask ASK_EACH_TASK or CONTINUOUS and record the submitted choice. Present scope, approach, all Tasks/ACs/optional Stories, risks, delivery and first ready Task; obtain explicit approval of the exact SPEC/PLAN revisions. Show both locators and task count. Silence, canceled answers, readiness and memory do not choose a mode or approve work. Material UI needs exact Pencil approval.
7. Create a dedicated feature branch before application writes. Use a meaningful `feature/`, `bugfix/`, `hotfix/` or `workflow/` name; check current branch, dirty state and branch existence first. An already dedicated, confirmed branch may be reused. Preserve unrelated work; never reset, force-push or overwrite another branch.
8. Save and read back the feature continuity record in Engram when available. No full spec mirror for new features. Memory failure alone permits authorized work with sufficient local evidence; keep necessary pending approval/evidence references in task.md.
9. Execute one approved ready Task in this checkout under `.codex/workflow/docs/task-execution.md`. Mark only it IN_PROGRESS and supply exact root/ref/base, scope/baseline, criteria/checks and matching first-task, named continuation or continuous-plan authority. Never dispatch concurrently or batch Tasks into one worker.
10. Implementer normalizes files, runs relevant checks and reports observed results. Reviewer inspects the current diff and evidence for each substantial work unit. Passive content needs structural readback; ordinary behavior needs functional proof; high/unknown risk adds independent check execution through a fresh verification-only invocation.
11. After APPROVED and required proof, Delivery commits each coherent WU using selected paths on the same requirement branch. DONE requires all task criteria/checks/review and branch commits. No per-task source/integrated commit pair or separate task integration is required; changed bytes/paths/modes invalidate affected evidence.
12. Update minimum state/result references in task.md and meaningful progress/reasons/checks/commits in Engram. Show each result. ASK_EACH_TASK waits for continue/review/pause; CONTINUOUS advances serially within the approved revision and consults at blockers/material changes or user interruption. Complete feature checks/review after the last task and report the real outcome; do not append a completion report to spec.md. Publication/merge remain separate.

For small work: confirm authorization/scope → scoped implementation → relevant checks → independent review if high/unknown risk → report. No feature document/mirror or extra planning approval is required. Dedicated branch remains required before application writes; a commit requires explicit user/Orchestrator Git authorization because substantial-task commit authorization does not apply.

## Approval, evolution and task state

Plan revisions use stable identifiers (`PLAN-1`, `PLAN-2`, ...). Approval records exact revision and authoritative user decision reference, scope, Tasks/ACs, design references when applicable and selected delivery strategy.
Routine in-scope corrections and evidence-backed path adjustments may update the document without renewing the whole approval. Material behavior, scope, architecture, delivery-strategy changes or newly added meaningful Tasks require presenting the affected delta and explicit approval before those writes. Do not silently accept a review suggestion that expands business scope.
Preserve valid completed Tasks and stable IDs; reopen only invalidated work with a reason. Refresh affected tests, design, review and approval evidence. A memory topic is never authorization.
Feature states: PREPARING, WAITING_FOR_USER, READY, IMPLEMENTING, CHECKING, BLOCKED, DONE.
Task states: TODO, IN_PROGRESS, BLOCKED, DONE. Unchecking/reopening records why.
No automatic loops until clean. Corrections address supported findings; repeated failure is reported with the actual blocker and next action.

## TDD and checking

Resolve TDD on/off from explicit user choice or existing unambiguous project/session policy. Record mode, source and exact test runner; existing tests do not imply TDD on. If sources conflict or enabled TDD has no working runner, ask only the decision needed for the next action.
ON means observed RED before behavior implementation → GREEN → REFACTOR with affected checks rerun. OFF still requires ordinary checks. Do not claim RED retrospectively.
Run mutating formatters/generators before verification. A subsequent source change invalidates affected checks. Begin with focused checks; run applicable broader checks for shared code and integration at closure.
Reviewer does not execute shell commands under its role contract: high/unknown risk requires fresh, separate Implementer invocation in verification-only mode to independently inspect the diff and rerun exact checks without editing. Supply no writer conclusions as proof. Reviewer consumes that independently observed evidence. Verify this isolation in Codex before rollout.
Missing results are INSUFFICIENT_EVIDENCE, not a fabricated defect/pass. If required checking is unavailable, record BLOCKED and the required action. Document-only workflow validation does not prove autonomous agent behavior.

## Commits, size and delivery

Forecast authored additions plus deletions, excluding generated files; record confidence and likely files. Approximately 400 lines per work unit is advisory only. Never remove tests/docs/comments, minify or invent abstractions to satisfy a line target.
Default delivery is `ask-on-risk`: when the initial forecast exceeds about 400 authored changed lines, propose cohesive PR/work-unit slices and obtain one choice before application writes; if running changes later exceed it, revisit the affected split before the next commit: `single-pr` with rationale, `stacked-to-main`, or `feature-branch-chain`. Record chosen boundaries and do not mix strategies silently. A user-selected strategy is retained while relevant scope is unchanged.
Commit permission applies to approved substantial Tasks on the dedicated branch; it does not authorize pushes, PR creation, merges or releases. Delegate these only when the user's request authorizes each operation. Prepare draft PRs when authorized; include checks, dependencies, rollback and limitations. RDD evidence is not delivery authorization.
Orchestrator shell is limited to scoped Git reads; branch/commit/push/PR operations go to Implementer in delivery mode with exact repository, branch, selected paths/candidate and allowed operations. No code edits in delivery mode.
Always inspect dirty state/staged diff. Never stage unrelated files or claim a clean tree without observing it. Return branch and SHA/URL evidence.

## Sequential execution and recovery

Every implementation uses the existing project checkout and one dedicated requirement branch. Apply `.codex/workflow/docs/task-execution.md` for task approval, serial role handoffs, commits, mode-specific continuation and recovery.
On resume/compaction reconcile root/ref/HEAD, spec.md/task.md, Engram, recorded mode/approval, active or stopped writers and current checks/commits. ASK_EACH_TASK with a pending/missing continuation remains WAITING_FOR_USER. CONTINUOUS may resume only after reconciling its current explicit grant, dependencies and evidence, with no unresolved pause/blocker. Unknown liveness blocks duplicate writers.
Memory conflicts are reconciled using current files, source revisions, explicit user decisions and observed proof, never merely last-write time. Retain both versions if uncertainty remains and pause only affected work.

## Migration and testing

New Codex features use the two-file policy and execution choice. Existing features keep their locator, full mirror and checkpoint rules until explicit migration. Reconcile old criteria/Stories/Tasks/approvals/evidence, preserve references and completed work, present the split and obtain current mode/plan confirmation before migration. Never delete old artifacts or infer continuous authority from old approvals.
See `.codex/workflow/docs/odd-validation.md` for static evidence and required Codex acceptance scenarios. No installation or runtime tests are implied by repository publication.

## V2.1 approval gate

For planned task sets, apply the explicit approve-current-plan/request-changes gate in `.codex/workflow/docs/task-execution.md` before dispatch. Include all task IDs, criteria, optional Stories, dependencies, ownership and proposed sequential order and first ready task. A small inline fix still needs concrete scope authorization; omitted/canceled answers never approve anything.

## V2.2 delivery, visibility and tracking

Apply `.codex/workflow/docs/delivery-and-tracking.md`. New Codex features use readable spec.md/task.md; Engram holds the continuity record and selected durable facts. No extra stage/review/context files or full new-feature spec mirror.
No generated images or design-review/desing-review folders. User reviews native Pencil; workers use text/structure/state evidence. Implementer Delivery prepares requirement-derived branches, commits each checked/reviewed work unit and creates/reads back an authorized draft PR through the configured GitHub MCP. Orchestrator alone synchronizes approved features/optional Stories/Tasks and verified PR links to the chosen Linear team/project; connection failures preserve sufficient local state.
