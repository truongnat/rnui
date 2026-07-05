---
name: planning
description: Lập kế hoạch thực thi từ DISCUSSION.md, requirement hoặc yêu cầu đã đủ rõ. Dùng khi cần PLAN.md, task breakdown, dependency mapping, affected files/systems, acceptance criteria, Definition of Done, verification strategy, rollback strategy hoặc implementation plan trước execution.
---

# Planning

## Mục Đích

Chuyển mục tiêu đã đủ rõ thành kế hoạch thực thi cụ thể, có thứ tự, dependency, acceptance criteria, verification và rollback.

Skill này tập trung vào:

- Chốt goal và scope đã đủ rõ để execute.
- Chia việc thành task nhỏ, có dependency rõ.
- Xác định affected files, modules, systems hoặc artifacts nếu biết.
- Viết acceptance criteria cho từng task.
- Viết verification strategy có command hoặc cách kiểm tra cụ thể.
- Viết rollback strategy phù hợp với mức độ thay đổi.
- Viết Definition of Done để review kết quả không bị cảm tính.
- Chuẩn bị handoff sang execution, implementation hoặc QA verification.

Mục tiêu cuối cùng là tạo một `PLAN.md` đủ rõ để agent hoặc developer khác có thể thực thi mà không phải đoán ý.

## Khi Dùng

Dùng skill này khi:

- Đã có `DISCUSSION.md`.
- Đã có requirement/spec đủ rõ.
- User yêu cầu lập plan, chia task hoặc implementation plan.
- Cần tạo hoặc cập nhật `PLAN.md`.
- Cần xác định affected files/systems trước khi sửa.
- Cần chia việc theo phase hoặc task nhỏ.
- Cần xác định dependency giữa các task.
- Cần acceptance criteria cho từng task.
- Cần verification strategy trước execution.
- Cần rollback strategy trước khi thay đổi workspace, codebase, database, infra hoặc config.
- Cần Definition of Done để review/verify kết quả.

## Khi Không Dùng

Không dùng skill này khi:

- Mục tiêu còn mơ hồ; dùng `brainstorming` trước.
- Requirement nghiệp vụ còn thiếu rule, actor, data hoặc acceptance criteria; dùng `business-analysis`.
- Đang điều tra nguyên nhân bug hoặc mapping hệ thống; dùng `investigate`.
- Đang review kết quả sau implementation.
- User chỉ yêu cầu sửa nhỏ, scope rất rõ và không cần plan riêng.
- User yêu cầu brainstorm nhiều hướng giải pháp thay vì lập kế hoạch thực thi.
- User yêu cầu technical architecture chi tiết; dùng `technical-design` nếu có.
- User yêu cầu research external source sâu; dùng `research`.

## Planning Readiness Gate

Trước khi lập plan, kiểm tra input đã đủ rõ chưa.

Input được xem là đủ rõ khi có ít nhất:

- Goal hoặc expected outcome.
- Scope hoặc boundary tương đối rõ.
- Constraint quan trọng nếu có.
- Known target: feature, bug, module, workflow, artifact hoặc system.
- Success signal hoặc acceptance direction.

Nếu thiếu thông tin nhưng vẫn có thể lập plan an toàn:

- Tạo best-effort plan.
- Ghi rõ assumptions.
- Ghi open questions.
- Đánh dấu câu hỏi nào đang blocking execution.

Nếu thiếu thông tin làm thay đổi lớn về scope, architecture, cost hoặc risk:

- Không tự đoán.
- Recommend chuyển về `brainstorming`, `business-analysis` hoặc `investigate`.

## Inputs

Skill có thể nhận các loại input sau:

- `DISCUSSION.md` nếu có.
- Requirement notes hoặc spec nếu có.
- Yêu cầu trực tiếp của user.
- Mapping codebase hoặc context repo liên quan.
- Existing issue/ticket/bug report.
- Existing design/architecture note.
- Affected file/module/system nếu user hoặc previous skill đã xác định.
- Constraint về scope, artifact, platform, timeline, tool, verification.
- Current behavior và desired behavior nếu có.
- Known risks hoặc migration constraints nếu có.

## Outputs

Output nên bao gồm một trong hai dạng:

### Lite Output

Dùng khi task nhỏ hoặc vừa, scope rõ, không cần `PLAN.md` dài.

Lite output gồm:

- Goal.
- Scope.
- Task checklist.
- Verification.
- Definition of Done.
- Risks/open questions nếu có.

### Full Output

Dùng khi task lớn, có nhiều dependency, cần lưu plan hoặc cần handoff sang agent khác.

Full output gồm:

- `PLAN.md` trong session path nếu đang làm trong repo/session.
- Nếu không có repo/session, trả về plan artifact trong response.
- Goal & scope.
- Sources/context.
- Constraints & assumptions.
- Non-goals.
- Affected files/systems.
- Task breakdown có ID, dependency, acceptance criteria và verification.
- Execution order.
- Definition of Done.
- Verification strategy.
- Rollback strategy.
- Risks & open questions.
- Handoff to execution.

## XML Contract

```xml
<Contract>
  <Inputs>DISCUSSION.md, requirement notes, yêu cầu user, mapping codebase, affected systems, constraints và context liên quan nếu có.</Inputs>
  <Outputs>Lite plan hoặc full PLAN.md gồm goal, scope, assumptions, non-goals, affected files/systems, task breakdown, dependencies, acceptance criteria, verification strategy, Definition of Done, rollback strategy, risks và handoff to execution.</Outputs>
  <Artifacts>PLAN.md trong session path nếu có; nếu không, trả về plan artifact trong response.</Artifacts>
  <DefinitionOfDone>Điều kiện cụ thể, kiểm chứng được để task/plan được xem là hoàn tất.</DefinitionOfDone>
  <Gate>Với task lớn, destructive, irreversible, touching production/data/security hoặc có rủi ro cao, cần user review/xác nhận DoD hoặc plan trước execution nếu user chưa cho phép execute rõ ràng.</Gate>
  <Safety>Không implement code trong phase planning. Không tự bịa affected files nếu chưa inspect codebase. Không biến assumption thành confirmed requirement. Không bỏ qua rollback khi có thay đổi workspace, database, config, infra hoặc public behavior.</Safety>
</Contract>
```

## Depth Modes

### Lite Mode

Dùng Lite Mode khi:

- Task nhỏ hoặc vừa.
- Scope rõ.
- Ít dependency.
- Không cần lưu `PLAN.md`.
- Không có migration, destructive change hoặc rủi ro cao.
- User cần plan nhanh trước khi làm.

Lite Mode output:

```markdown
## Planning Lite

### Goal

### Scope

### Tasks

- [ ] ...

### Verification

### Definition of Done

### Risks / Open Questions
```

### Full Mode

Dùng Full Mode khi:

- Task lớn.
- Có nhiều bước hoặc nhiều module.
- Có dependency rõ.
- Có thay đổi database, config, infra, auth, payment, security hoặc public API.
- Có rủi ro regression cao.
- Cần lưu `PLAN.md`.
- User yêu cầu plan kỹ, implementation plan, breakdown hoặc DoD.

Full Mode output dùng template `PLAN.md` ở phần Artifact Template.

## Clarification Policy

- Hỏi user khi thiếu thông tin làm thay đổi đáng kể scope, execution order, risk, data, permission hoặc architecture.
- Không hỏi nếu có thể proceed bằng assumption an toàn.
- Nếu tự assume, ghi rõ trong `Assumptions`.
- Ưu tiên hỏi tối đa 1–3 câu quan trọng.
- Không hỏi danh sách dài nếu vẫn có thể tạo best-effort plan.
- Nếu user yêu cầu làm ngay, tạo plan tốt nhất có thể và đánh dấu blocking questions.
- Nếu câu hỏi mở đang chặn execution, đánh dấu `Blocking = Yes`.

## Operating Principles

- Planning phải đủ cụ thể để agent/developer khác có thể execute.
- Không implement code trong phase planning.
- Không đưa việc ngoài scope vào plan.
- Không over-plan task nhỏ.
- Mỗi task phải có objective, scope/files, dependency, acceptance criteria và verification.
- Task phải nhỏ, có thứ tự và có thể kiểm chứng.
- Acceptance criteria phải testable.
- Verification strategy phải có command hoặc cách kiểm tra cụ thể nếu có thể.
- Rollback strategy không được bỏ trống nếu có thay đổi workspace/codebase/database/config/infra.
- DoD phải đủ cụ thể để review không bị cảm tính.
- Không tự bịa affected files/systems nếu chưa có context hoặc chưa inspect codebase.
- Nếu thiếu codebase context, ghi unknown thay vì đoán.
- Nếu có nhiều phase, mỗi phase phải có exit criteria.
- Nếu provider hỗ trợ chọn model, ưu tiên model reasoning ổn định cho planning/decomposition.

## Workflow

1. Xác định task có cần planning không.
2. Chọn Lite Mode hoặc Full Mode.
3. Xác nhận session path nếu đang làm trong repo/session.
4. Đọc `DISCUSSION.md`, requirement notes hoặc context liên quan nếu có.
5. Restate goal, desired outcome và scope.
6. Ghi sources/context đã dùng để lập plan.
7. Ghi constraints, assumptions và non-goals.
8. Xác định affected files/systems/modules/artifacts nếu biết.
9. Nếu thiếu mapping codebase, ghi unknown hoặc thêm task investigate trước.
10. Chia task theo thứ tự nhỏ, độc lập và có thể verify.
11. Ghi dependency giữa các task.
12. Ghi acceptance criteria cho từng task.
13. Ghi verification method cho từng task hoặc từng phase.
14. Ghi execution order.
15. Ghi Definition of Done.
16. Ghi verification strategy tổng thể.
17. Ghi rollback strategy.
18. Ghi risks và mitigation.
19. Ghi open questions và đánh dấu blocking nếu có.
20. Với task lớn/rủi ro cao/destructive, yêu cầu user review/xác nhận plan hoặc DoD trước execution nếu user chưa explicit approve.
21. Lưu `PLAN.md` nếu Full Mode và đang có session/repo phù hợp.

## Plan Quality Standards

`PLAN.md` phải:

- Gọn, rõ, scannable.
- Có goal và scope rõ.
- Có non-goals để tránh scope creep.
- Có assumptions tách khỏi confirmed facts.
- Có affected files/systems nếu biết.
- Có task breakdown theo thứ tự.
- Mỗi task có ID riêng.
- Mỗi task có acceptance criteria và verification.
- Có dependency rõ nếu task phụ thuộc nhau.
- Có Definition of Done cụ thể.
- Có rollback strategy thực tế.
- Có risks và mitigation nếu có.
- Không viết prose dài không phục vụ execution.
- Không ghi task chung chung như “update code”, “fix bug”, “test everything”.
- Không tạo plan quá lớn nếu có thể chia phase.

## Artifact Template

```markdown
# Plan

## 1. Goal & Scope

### Goal

### In Scope

### Out of Scope

### Non-Goals

## 2. Sources / Context

| Source | Notes |
|---|---|

## 3. Constraints & Assumptions

### Constraints

| Constraint | Impact |
|---|---|

### Assumptions

| ID | Assumption | Risk If Wrong | Confirmation Needed? |
|---|---|---|---|

## 4. Affected Files / Systems

| Area | Files / Modules / Systems | Expected Change | Confidence |
|---|---|---|---|

## 5. Execution Plan

| ID | Task | Description | Dependencies | Acceptance Criteria | Verification | Files / Scope |
|---|---|---|---|---|---|---|

## 6. Execution Order

1. ...

## 7. Verification Strategy

### Automated Checks

### Manual Checks

### Regression Checks

## 8. Definition of Done

- [ ] ...

## 9. Rollback Strategy

## 10. Risks & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|

## 11. Open Questions

| ID | Question | Owner | Blocking? |
|---|---|---|---|

## 12. Handoff To Execution

- Ready for execution: Yes / No
- Blocking items:
- Suggested first command/action:
- Review required before execution: Yes / No
```

## Task Breakdown Guidelines

Task tốt phải có:

- ID: `T-001`, `T-002`, ...
- Title ngắn.
- Objective rõ.
- Files/scope nếu biết.
- Dependency nếu có.
- Acceptance criteria.
- Verification method.
- Risk hoặc note nếu cần.

Ví dụ tốt:

```markdown
| ID | Task | Description | Dependencies | Acceptance Criteria | Verification | Files / Scope |
|---|---|---|---|---|---|---|
| T-001 | Add input validation | Validate required fields before submit | None | Empty name shows validation error and blocks submit | Unit test + manual form submit | `src/features/user-form/*` |
```

Không viết task chung chung như:

```markdown
- Fix form.
- Update backend.
- Test.
```

Viết lại thành:

```markdown
- T-001: Identify current form validation flow.
- T-002: Add client-side required-field validation.
- T-003: Add server-side validation guard.
- T-004: Verify happy path and invalid input path.
```

## Dependency Guidelines

Dependency phải rõ loại phụ thuộc:

| Dependency Type | Meaning |
|---|---|
| Sequential | Task sau chỉ làm được khi task trước hoàn tất. |
| Data | Task cần data/schema/sample trước. |
| API | Task phụ thuộc endpoint/contract. |
| UI | Task phụ thuộc design/component/UX decision. |
| Permission | Task phụ thuộc role/rule được xác nhận. |
| Infrastructure | Task phụ thuộc env/config/service. |
| Verification | Task phụ thuộc test data/tooling. |

Format khuyến nghị:

```markdown
| Task | Depends On | Reason |
|---|---|---|
| T-003 | T-001, T-002 | API contract and UI state must be known before integration |
```

## Acceptance Criteria Guidelines

Acceptance criteria trong plan phải kiểm chứng được.

Mỗi task nên có ít nhất một acceptance criteria cụ thể.

Format ngắn:

```markdown
- AC: Given [condition], when [action], then [expected result].
```

Hoặc trong bảng:

```markdown
| ID | Acceptance Criteria |
|---|---|
| AC-001 | Given a user submits an empty required field, when the form validates, then the field error is shown and the request is not sent. |
```

Acceptance criteria không nên:

- “Works correctly.”
- “Looks good.”
- “No bugs.”
- “Implement all logic.”

Nên viết thành behavior hoặc expected result cụ thể.

## Verification Strategy Guidelines

Verification strategy phải trả lời:

- Kiểm tra bằng gì?
- Chạy command nào?
- Manual check ở đâu?
- Có regression area nào cần check?
- Kết quả pass/fail là gì?

Các loại verification phổ biến:

| Type | Examples |
|---|---|
| Static | lint, typecheck, format check |
| Unit | unit tests for pure logic |
| Integration | API/service/component integration tests |
| E2E | Playwright/Cypress flow tests |
| Manual | Manual UI check, screenshot, stakeholder review |
| Data | Migration dry run, import sample, SQL query |
| Security | Permission test, access control check |
| Performance | Load check, timing comparison, bundle size |

Format khuyến nghị:

```markdown
## Verification Strategy

### Automated Checks

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`

### Manual Checks

- Open teacher list.
- Apply year filter.
- Open detail and navigate back.
- Confirm previous search state is preserved.

### Regression Checks

- Confirm direct navigation to teacher detail still works.
- Confirm browser back still works.
```

Nếu command chưa biết, ghi:

```markdown
- Command unknown: inspect package scripts before execution.
```

Không bịa command nếu chưa đọc repo.

## Definition of Done Guidelines

Definition of Done phải là checklist kiểm chứng được.

DoD tốt:

```markdown
## Definition of Done

- [ ] All planned tasks are completed.
- [ ] Acceptance criteria for each task pass.
- [ ] Lint/typecheck/test commands pass or failures are documented.
- [ ] Manual verification flow is completed.
- [ ] No out-of-scope changes were introduced.
- [ ] Rollback path is documented.
- [ ] Risks/open questions are resolved or explicitly documented.
```

DoD không tốt:

```markdown
- Done when everything is fixed.
```

## Rollback Strategy Guidelines

Rollback strategy phải tương ứng với mức độ thay đổi.

Với code-only changes:

```markdown
- Revert changed files or revert the commit.
- Restore previous behavior by disabling the new code path.
```

Với config/env changes:

```markdown
- Restore previous env values from documented backup.
- Restart affected service if required.
```

Với database changes:

```markdown
- Provide down migration if possible.
- Back up affected tables before migration.
- Document manual restore steps if down migration is unsafe.
```

Với feature flag:

```markdown
- Disable feature flag to return to old behavior.
```

Nếu rollback không khả thi, ghi rõ:

```markdown
- Rollback is not fully automatic because migration changes persisted data shape.
- Mitigation: backup before migration and provide manual restore procedure.
```

Không để rollback trống với task có thay đổi codebase/workspace.

## Risk Guidelines

Risk phải cụ thể và có mitigation.

Format khuyến nghị:

```markdown
| Risk | Impact | Mitigation |
|---|---|---|
| Existing tests are missing for this flow | Regression may not be caught automatically | Add manual verification steps and consider focused tests |
```

Không viết risk chung chung như:

```markdown
- There may be bugs.
```

Viết lại thành:

```markdown
- Risk: Search params restoration may conflict with direct URL navigation.
- Impact: Detail page may restore stale filters.
- Mitigation: Add explicit manual checks for back navigation and direct navigation.
```

## Gate / Approval Policy

Yêu cầu user review/xác nhận plan hoặc DoD trước execution khi:

- Task lớn hoặc nhiều phase.
- Có thay đổi destructive.
- Có migration database.
- Có thay đổi auth, permission, payment, security hoặc data privacy.
- Có thay đổi production infra/config.
- Rollback khó hoặc không rõ.
- Open questions đang blocking.
- User chưa explicit yêu cầu execute.

Không cần chặn execution khi:

- User đã explicit yêu cầu implement theo plan.
- Task nhỏ, scope rõ, rollback dễ.
- Thay đổi không destructive.
- Không có open question blocking.

Nếu cần gate, ghi rõ:

```markdown
Review required before execution: Yes
Reason: Database migration affects persisted data and rollback requires backup.
```

## Handoff Guidelines

Cuối plan phải chỉ ra trạng thái sẵn sàng execution.

Format khuyến nghị:

```markdown
## Handoff To Execution

- Ready for execution: Yes
- Blocking items: None
- Suggested first action: Inspect package scripts and confirm verification commands.
- Review required before execution: No
```

Nếu chưa sẵn sàng:

```markdown
- Ready for execution: No
- Blocking items: Q-001 permission rule not confirmed.
- Suggested next step: Ask product owner to confirm export permission behavior.
- Review required before execution: Yes
```

## Session / Artifact Rules

Nếu đang làm trong repo/session:

- Tạo hoặc cập nhật `PLAN.md` tại session path phù hợp.
- Session path khuyến nghị: `.agents/sessions/<Task-...>/PLAN.md`.
- Không tự bịa `Task-<number>` nếu project có convention cấp số riêng.
- Nếu chưa có số task, dùng short descriptive slug hoặc ghi assumption theo project convention.
- Nếu đã có `DISCUSSION.md`, đặt `PLAN.md` cùng session.
- Không ghi file nếu user chỉ cần plan nhanh trong response.

Nếu không có repo/session:

- Trả plan artifact trong response.
- Không giả định có filesystem.
- Không nói đã lưu file nếu thực tế chưa lưu.

## Checklist Trước Khi Hoàn Tất

Trước khi kết thúc output, kiểm tra:

- [ ] Đã xác định Lite Mode hoặc Full Mode.
- [ ] Goal và scope rõ.
- [ ] Sources/context đã ghi nếu có.
- [ ] Constraints và assumptions đã ghi.
- [ ] Non-goals có nếu task đủ lớn.
- [ ] Affected files/systems được liệt kê nếu biết.
- [ ] Không bịa affected files nếu chưa có context.
- [ ] Task có ID, thứ tự và dependency.
- [ ] Mỗi task có acceptance criteria.
- [ ] Mỗi task có verification hoặc plan-level verification rõ.
- [ ] Execution order rõ.
- [ ] Verification strategy có command hoặc cách kiểm tra.
- [ ] Definition of Done cụ thể và kiểm chứng được.
- [ ] Rollback strategy có.
- [ ] Risks và mitigation có nếu có rủi ro.
- [ ] Open questions được ghi và đánh dấu blocking nếu cần.
- [ ] Gate/review requirement được ghi nếu task lớn/rủi ro cao/destructive.
- [ ] `PLAN.md` chỉ được lưu nếu thật sự có session/repo và Full Mode phù hợp.

## Limitations

- Skill này không tự implement.
- Skill này không thay thế brainstorming khi direction còn mơ hồ.
- Skill này không thay thế business analysis khi requirement nghiệp vụ còn thiếu.
- Skill này không thay thế investigate khi chưa hiểu codebase hoặc bug root cause.
- Skill này không thay thế technical design chi tiết.
- Skill này không tự xác nhận assumption.
- Skill này không tự bịa affected files/systems nếu thiếu context codebase.
- Skill này không đảm bảo plan đúng nếu input thiếu hoặc outdated.

## References

- [Project Planning Guide](https://www.atlassian.com/work-management/project-management/project-planning)
- [Project Management Phases](https://www.atlassian.com/work-management/project-management/phases)
- [Project Dependencies](https://www.atlassian.com/agile/project-management/project-management-dependencies)
- [Dependency Mapping](https://www.atlassian.com/team-playbook/plays/dependency-mapping)
- [Definition of Done](https://agilealliance.org/glossary/definition-of-done/)
- [Branch By Abstraction](https://martinfowler.com/bliki/BranchByAbstraction.html)
