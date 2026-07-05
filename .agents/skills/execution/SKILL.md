---
name: execution
description: Thực thi PLAN.md hoặc scope đã chốt theo từng task nhỏ, sửa file trong workspace, chạy verification, ghi EXECUTION.md, xử lý failure/blocker, cập nhật tiến độ và chuẩn bị handoff sang review. Dùng khi cần implement, execute plan, modify files, run tests/checks, collect evidence hoặc hoàn thành task đã được plan.
---

# Execution

## Mục Đích

Thực thi plan đã được chốt một cách có kiểm soát, an toàn và có bằng chứng kiểm chứng.

Skill này tập trung vào:

- Đọc và bám sát `PLAN.md`.
- Thực hiện từng task nhỏ theo đúng scope.
- Sửa file trong workspace một cách có kiểm soát.
- Không phá thay đổi ngoài scope hoặc thay đổi không thuộc về mình.
- Chạy verification phù hợp sau từng bước hoặc từng phase.
- Ghi lại file đã đổi, command đã chạy, kết quả, failure và blocker.
- Cập nhật `EXECUTION.md` để reviewer có thể hiểu chính xác đã làm gì.
- Chuẩn bị handoff sang `review`, QA hoặc user verification.

Mục tiêu cuối cùng là hoàn thành task đã plan với thay đổi nhỏ, reviewable, verify được và rollback được.

## Khi Dùng

Dùng skill này khi:

- Đã có `PLAN.md`.
- Scope đủ rõ để execute an toàn.
- Người dùng yêu cầu implement, sửa file, chạy test hoặc hoàn thành task.
- Cần tạo, sửa hoặc xóa file trong workspace.
- Cần chạy command verification như lint, typecheck, test, build hoặc manual check.
- Cần cập nhật artifact sau khi thực thi.
- Cần ghi `EXECUTION.md`.
- Cần xử lý từng task trong implementation plan.
- Cần thu thập verification evidence trước review.

## Khi Không Dùng

Không dùng skill này khi:

- Mục tiêu còn mơ hồ; dùng `brainstorming`.
- Requirement nghiệp vụ chưa rõ; dùng `business-analysis`.
- Chưa có plan cho task phức tạp hoặc rủi ro cao; dùng `planning`.
- Đang điều tra root cause mà chưa biết sửa gì; dùng `investigate`.
- Chỉ cần review độc lập sau implementation; dùng `review`.
- Có blocker từ planning chưa được xử lý.
- User chưa cho phép execute với task destructive, high-risk hoặc irreversible.
- Cần research external source sâu trước khi sửa; dùng `research`.

## Execution Readiness Gate

Trước khi sửa file hoặc chạy thay đổi có side effect, kiểm tra:

- Có `PLAN.md` hoặc scope đã đủ rõ chưa.
- Task hiện tại có nằm trong scope không.
- Dependency của task đã thỏa chưa.
- Có open question nào đang blocking execution không.
- Có cần backup hoặc rollback note trước khi sửa không.
- Có file nhạy cảm, secret, credential, migration, infra hoặc config production liên quan không.
- Có khả năng verify sau khi sửa không.

Nếu readiness chưa đạt:

- Không sửa file.
- Ghi blocker.
- Recommend quay lại `planning`, `investigate`, `business-analysis` hoặc hỏi user nếu cần.

## Inputs

Skill có thể nhận các loại input sau:

- `PLAN.md`.
- `DISCUSSION.md` nếu cần context.
- Yêu cầu trực tiếp của user.
- Context repo.
- Existing source code.
- Existing tests.
- Mapping codebase hoặc affected files.
- Constraint về edit/test/runtime.
- Session path.
- Verification commands nếu đã biết.
- Rollback strategy nếu đã có.
- Open questions và assumptions từ planning.

## Outputs

Output nên bao gồm:

- Workspace changes đúng scope.
- `EXECUTION.md` trong session path nếu đang làm trong repo/session.
- Nếu không có repo/session, trả execution summary trong response.
- Danh sách file đã thay đổi.
- Commands đã chạy.
- Verification evidence.
- Failure hoặc skipped checks nếu có.
- Issues/blockers nếu có.
- Deviations from plan nếu có.
- Handoff sang review/QA/user verification.

## XML Contract

```xml
<Contract>
  <Inputs>PLAN.md, scope đã chốt, context repo, affected files, constraints, verification commands và session path nếu có.</Inputs>
  <Outputs>Workspace changes đúng scope, EXECUTION.md hoặc execution summary, files changed, commands run, verification evidence, issues/blockers, deviations và handoff to review.</Outputs>
  <Artifacts>EXECUTION.md trong session path nếu có; nếu không, trả execution summary trong response.</Artifacts>
  <Safety>Không sửa ngoài scope. Không đưa secret vào file/log. Không xóa file nhạy cảm/config/migration/data khi chưa có plan hoặc confirm. Không revert thay đổi không phải của mình nếu chưa được phép. Không claim hoàn tất nếu chưa verify hoặc chưa ghi skipped verification.</Safety>
</Contract>
```

## Depth Modes

### Lite Mode

Dùng Lite Mode khi:

- Task nhỏ.
- Scope rất rõ.
- Ít hoặc không có dependency.
- Không cần lưu `EXECUTION.md`.
- Không có thay đổi high-risk/destructive.
- Verification đơn giản.

Lite output gồm:

```markdown
## Execution Summary

### Changed

### Verification

### Issues / Skipped Checks

### Next Step
```

### Full Mode

Dùng Full Mode khi:

- Đã có `PLAN.md`.
- Task có nhiều bước.
- Có nhiều file thay đổi.
- Có migration/config/infra/auth/permission/security/public API.
- Cần ghi `EXECUTION.md`.
- Cần handoff sang review hoặc QA.
- User yêu cầu execute plan nghiêm túc.

Full Mode dùng template `EXECUTION.md` ở phần Artifact Template.

## Safety Rules

### Scope Safety

- Chỉ sửa những phần nằm trong plan/scope.
- Nếu cần sửa ngoài scope để unblock, ghi `Deviation` và lý do.
- Không mở rộng feature ngoài yêu cầu.
- Không refactor rộng nếu task không yêu cầu.
- Không đổi public API, DB schema, permission, auth flow hoặc config production nếu không nằm trong plan.

### Workspace Safety

- Kiểm tra working tree/diff nếu có thể trước khi sửa.
- Không revert hoặc overwrite thay đổi không phải của mình.
- Không xóa file nếu chưa rõ ownership và rollback.
- Không format toàn repo nếu task chỉ cần sửa nhỏ.
- Không chạy command destructive nếu chưa có confirm.

### Secret Safety

- Không hardcode secret, credential, token, API key, private key hoặc password.
- Không in secret vào `EXECUTION.md`.
- Không paste command output dài có thể chứa secret.
- Nếu phát hiện secret trong repo/log/output, dừng và báo rõ rủi ro.
- Với env/config, dùng placeholder an toàn như `<REDACTED>` hoặc documented env variable name.

### Data / Migration Safety

- Không chạy migration destructive nếu chưa có plan, backup hoặc confirm.
- Không thay đổi seed/data production nếu chưa explicit.
- Không xóa dữ liệu.
- Không thay đổi schema mà không có rollback/downgrade note.
- Nếu migration không reversible, ghi rõ limitation và mitigation.

### Dependency Safety

- Không upgrade dependency lớn ngoài scope.
- Không đổi lockfile nếu không cần.
- Nếu lockfile thay đổi do install/test, ghi rõ.
- Không thêm package mới nếu có thể dùng existing dependency.
- Nếu cần thêm package, ghi rationale và verification.

## Workflow

1. Xác định task có sẵn sàng execution không.
2. Chọn Lite Mode hoặc Full Mode.
3. Đọc `PLAN.md` nếu có.
4. Đọc context/session artifacts liên quan nếu cần.
5. Xác nhận task tiếp theo và dependency đã thỏa.
6. Xác định files/scope dự kiến chỉnh.
7. Kiểm tra safety trước khi tạo, sửa hoặc xóa file.
8. Kiểm tra working tree/diff nếu có thể.
9. Thực hiện thay đổi nhỏ, đúng scope.
10. Ghi changed files và rationale.
11. Chạy format/lint/typecheck/test/build/manual check phù hợp.
12. Ghi command, result và evidence.
13. Nếu command fail, phân loại failure.
14. Nếu failure do code vừa sửa, fix trong scope và verify lại.
15. Nếu failure do pre-existing issue hoặc ngoài scope, ghi rõ và không claim pass.
16. Nếu cần đổi plan, dừng và recommend quay lại `planning`.
17. Cập nhật `EXECUTION.md` nếu Full Mode/session phù hợp.
18. Lặp lại cho đến khi task hoàn tất hoặc blocked.
19. Tổng hợp final execution summary.
20. Handoff sang `review`, QA hoặc user verification.

## Failure Handling

Khi verification fail, không được bỏ qua im lặng.

Phân loại failure:

| Failure Type | Meaning | Action |
|---|---|---|
| Introduced Failure | Lỗi do thay đổi vừa làm | Fix trong scope và chạy lại verification |
| Pre-existing Failure | Lỗi đã có trước thay đổi | Ghi evidence, không nhận là do task nếu có bằng chứng |
| Environment Failure | Thiếu env, dependency, service, permission | Ghi blocker và cách user/agent có thể xử lý |
| Flaky Failure | Lỗi không ổn định | Re-run nếu hợp lý, ghi cả hai kết quả |
| Out-of-Scope Failure | Lỗi ở khu vực không liên quan | Ghi lại, không mở rộng scope nếu chưa được phép |
| Plan Failure | Plan sai hoặc thiếu bước quan trọng | Dừng và quay lại planning |

Format ghi failure:

```markdown
| Command | Result | Failure Type | Evidence | Next Action |
|---|---|---|---|---|
| `pnpm test` | Failed | Environment Failure | Missing DATABASE_URL | Ask for env or run unit-only tests |
```

## Verification Policy

- Không claim “done”, “fixed”, “complete” nếu chưa verify.
- Nếu không thể verify, ghi rõ lý do.
- Nếu command không tồn tại, ghi command unknown và cách tìm.
- Nếu chỉ verify manual được, ghi manual steps.
- Nếu test fail vì unrelated/pre-existing issue, ghi evidence.
- Nếu skip check do thời gian/tool/env, ghi skipped check và risk.
- Ưu tiên verification gần nhất với thay đổi:
  - Pure logic: unit test.
  - UI flow: component/manual/e2e.
  - API: integration/API test.
  - Type changes: typecheck.
  - Build behavior: build command.
  - Formatting: format/lint.
  - Config/infra: dry-run, validate config, restart check nếu safe.

## Verification Evidence Guidelines

Evidence tốt nên có:

- Command đã chạy.
- Exit result: pass/fail/skipped.
- Summary ngắn.
- File/scope liên quan.
- Timestamp nếu hữu ích.
- Manual check steps nếu không có automated check.
- Screenshot/report path nếu có.

Không paste output dài nếu không cần.

Ví dụ:

```markdown
| Check | Command / Method | Result | Evidence |
|---|---|---|---|
| Typecheck | `pnpm typecheck` | Passed | No TypeScript errors |
| Manual UI | Open teacher list → search → detail → back | Passed | Search state preserved after back navigation |
```

## Artifact Template

```markdown
# Execution

## 1. Context

### Plan Source

### Current Task

### Scope

## 2. Execution Log

| Step | Task ID | Action | Files / Scope | Result | Notes |
|---|---|---|---|---|---|

## 3. Files Changed

| File | Change Summary | Reason | In Plan? |
|---|---|---|---|

## 4. Commands Run

| Command | Purpose | Result | Notes |
|---|---|---|---|

## 5. Verification Evidence

| Check | Command / Method | Result | Evidence |
|---|---|---|---|

## 6. Deviations From Plan

| Deviation | Reason | Risk | Follow-up |
|---|---|---|---|

## 7. Issues / Blockers

| Issue | Type | Impact | Next Action |
|---|---|---|---|

## 8. Rollback Notes

## 9. Final Status

- Completed:
- Partially completed:
- Blocked:
- Verification status:

## 10. Handoff To Review

- Ready for review: Yes / No
- Suggested review focus:
- Known risks:
- Skipped checks:
```

## Execution Log Guidelines

Execution log nên ghi theo task hoặc theo timeline.

Mỗi entry nên có:

- Step.
- Task ID nếu có.
- Action ngắn.
- Files/scope.
- Result.
- Notes nếu có.

Ví dụ:

```markdown
| Step | Task ID | Action | Files / Scope | Result | Notes |
|---|---|---|---|---|---|
| 1 | T-001 | Added validation guard for empty teacher name | `src/features/teachers/*` | Done | Kept existing error message style |
```

## Files Changed Guidelines

Mỗi file changed nên ghi:

- File path.
- Change summary.
- Reason.
- Có nằm trong plan không.

Ví dụ:

```markdown
| File | Change Summary | Reason | In Plan? |
|---|---|---|---|
| `src/features/teachers/form.tsx` | Added required-field validation before submit | Matches T-002 | Yes |
```

Nếu file ngoài plan:

```markdown
| `src/shared/validation.ts` | Reused existing helper export | Needed to avoid duplicate validation logic | Deviation |
```

## Commands Run Guidelines

Ghi command ngắn, không paste output dài.

Ví dụ:

```markdown
| Command | Purpose | Result | Notes |
|---|---|---|---|
| `pnpm lint` | Static check | Passed | No lint errors |
| `pnpm test -- teacher-form` | Focused unit tests | Failed | Existing snapshot mismatch unrelated to changed file |
```

Nếu không chạy được command:

```markdown
| `pnpm test` | Test suite | Skipped | `pnpm` not installed in environment |
```

## Deviation Policy

Deviation là mọi thay đổi khác plan/scope.

Deviation được phép khi:

- Cần sửa lỗi nhỏ trực tiếp chặn task.
- Cần chỉnh import/type/helper liên quan trực tiếp.
- Cần cập nhật test snapshot trong scope.
- Cần cập nhật artifact để phản ánh thực tế.

Deviation không nên tự làm khi:

- Mở rộng feature.
- Refactor lớn.
- Đổi architecture.
- Đổi DB schema.
- Đổi public API.
- Đổi auth/permission/security.
- Đổi production config.

Nếu deviation đáng kể:

- Dừng.
- Ghi lý do.
- Recommend quay lại `planning` hoặc hỏi user.

## Rollback Notes Guidelines

Rollback notes phải đủ để reviewer biết cách quay lại.

Với code-only:

```markdown
- Revert the changed files listed above.
- No database/config changes were made.
```

Với feature flag:

```markdown
- Disable `<FEATURE_FLAG_NAME>` to restore previous behavior.
```

Với migration/config:

```markdown
- Restore previous config value from backup.
- Run down migration if verified safe.
- If down migration is unsafe, restore database backup.
```

Nếu không có rollback rõ:

```markdown
- Rollback is not fully defined because the change affects persisted data.
- Review required before merge/deploy.
```

## Handoff To Review

Cuối execution phải nói rõ có sẵn sàng review không.

Format khuyến nghị:

```markdown
## Handoff To Review

- Ready for review: Yes
- Suggested review focus:
  - Validation behavior for empty required fields.
  - Regression around existing submit flow.
- Known risks:
  - Automated e2e not available in local environment.
- Skipped checks:
  - E2E skipped because browser test setup is unavailable.
```

Nếu chưa sẵn sàng:

```markdown
- Ready for review: No
- Blocking item: `pnpm typecheck` fails due to missing generated types.
- Next action: Regenerate types or confirm env setup.
```

## Subagent / Parallel Work Policy

Subagent hoặc parallel execution không phải mặc định.

Chỉ đề xuất dùng khi:

- Tasks độc lập rõ ràng.
- File ownership không overlap.
- Merge/review path rõ.
- Có lợi ích thực tế về tốc độ.
- Provider/tooling hỗ trợ.
- Có thể kiểm chứng từng phần riêng.

Không dùng khi:

- Tasks cùng sửa một file/khu vực.
- Requirement còn mơ hồ.
- Có migration hoặc architecture change nhạy cảm.
- Review/merge sẽ khó hơn lợi ích.

## Session / Artifact Rules

Nếu đang làm trong repo/session:

- Cập nhật `EXECUTION.md` tại session path phù hợp.
- Session path khuyến nghị: `.agents/sessions/<Task-...>/EXECUTION.md`.
- Nếu đã có `PLAN.md`, đặt `EXECUTION.md` cùng session.
- Không tự bịa task number nếu project có convention riêng.
- Ghi file changed, command, verification và blocker.
- Không ghi secret hoặc output dài nhạy cảm vào artifact.

Nếu không có repo/session:

- Trả execution summary trong response.
- Không nói đã lưu file nếu thực tế chưa lưu.

## Done Criteria

Execution chỉ được xem là done khi:

- Các task trong scope đã hoàn tất hoặc phần chưa làm được ghi rõ.
- File changes đúng scope.
- Verification đã chạy hoặc skipped checks được giải thích.
- Failures được phân loại.
- Không có blocker chưa ghi.
- `EXECUTION.md` hoặc execution summary đã cập nhật.
- Handoff sang review rõ ràng.

## Checklist Trước Khi Hoàn Tất

Trước khi kết thúc output, kiểm tra:

- [ ] Đã đọc plan hoặc xác nhận scope.
- [ ] Readiness gate đã đạt hoặc blocker đã ghi.
- [ ] Task dependency đã thỏa.
- [ ] File chỉnh sửa nằm trong scope.
- [ ] Safety của file tạo/sửa/xóa đã kiểm tra.
- [ ] Không hardcode secret/credential/token.
- [ ] Không revert thay đổi không phải của mình.
- [ ] Thay đổi được chia nhỏ và dễ review.
- [ ] Commands/checks phù hợp đã chạy nếu có thể.
- [ ] Failure hoặc skipped verification đã ghi rõ.
- [ ] Files changed đã được liệt kê.
- [ ] Deviations from plan đã được ghi nếu có.
- [ ] Rollback notes có nếu workspace/code/config/data thay đổi.
- [ ] `EXECUTION.md` đã cập nhật nếu Full Mode/session phù hợp.
- [ ] Handoff to review rõ ràng.

## Limitations

- Skill này không dùng để review độc lập; sau execution nên dùng `review`.
- Skill này không thay thế planning cho task phức tạp.
- Skill này không thay thế investigate khi chưa rõ root cause.
- Skill này không tự quyết định thay stakeholder khi blocker thuộc nghiệp vụ.
- Skill này không đảm bảo verification pass nếu môi trường thiếu dependency/env/service.
- Nếu plan sai hoặc scope thay đổi lớn, phải dừng và quay lại `planning`.

## References

- [Git Diff Documentation](https://git-scm.com/docs/git-diff)
- [Git Status Documentation](https://git-scm.com/docs/git-status)
- [GitHub Docs: Storing Your Secrets Safely](https://docs.github.com/en/get-started/learning-to-code/storing-your-secrets-safely)
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Atlassian Code Review Best Practices](https://www.atlassian.com/blog/add-ons/code-review-best-practices)
- [Martin Fowler: Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html)
