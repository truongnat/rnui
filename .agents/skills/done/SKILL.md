---
name: done
description: Đóng task sau execution/review bằng DONE.md, PR_MESSAGE.md, PR_DESCRIPTION.md và optional RELEASE_NOTE.md. Dùng khi cần final report, close task, prepare PR/MR, summarize changes, verification evidence, residual risks, blockers, follow-ups hoặc handoff cho reviewer/QA/user.
---

# Done

## Mục Đích

Đóng task bằng một bộ artifact rõ ràng, trung thực và dễ review.

Skill này tập trung vào:

- Tổng kết thay đổi đã làm theo mục tiêu thật sự.
- Liên kết thay đổi với plan/execution/review nếu có.
- Ghi verification evidence thật sự đã chạy.
- Ghi skipped checks, failed checks hoặc blocker nếu có.
- Ghi residual risks và follow-ups.
- Tạo `DONE.md`.
- Tạo `PR_MESSAGE.md` ngắn gọn.
- Tạo `PR_DESCRIPTION.md` theo template repo nếu có.
- Tạo release note ngắn nếu user hoặc workflow cần.
- Chuẩn bị handoff cho reviewer, QA, user hoặc next agent.

Mục tiêu cuối cùng là giúp người đọc hiểu nhanh: task đã làm gì, đã verify thế nào, còn rủi ro gì, có sẵn sàng PR/done không.

## Khi Dùng

Dùng skill này khi:

- Sau execution và review.
- Khi task đã đạt acceptance criteria.
- Khi task có blocker nhưng cần handoff rõ.
- Khi người dùng yêu cầu tổng kết.
- Khi người dùng yêu cầu chuẩn bị PR/MR.
- Khi cần `DONE.md`.
- Khi cần `PR_MESSAGE.md`.
- Khi cần `PR_DESCRIPTION.md`.
- Khi cần release note ngắn.
- Khi cần close task hoặc final report.
- Khi cần tổng hợp file changed, verification, risks và follow-ups.
- Khi cần bàn giao cho reviewer/QA/user.

## Khi Không Dùng

Không dùng skill này khi:

- Chưa execute và chưa có output thực tế.
- Chưa review với task có rủi ro hoặc thay đổi đáng kể.
- Verification còn thiếu nhưng chưa được ghi rõ.
- Scope vẫn đang thay đổi.
- Review có blocker cần fix trước khi done.
- User đang yêu cầu implement/fix tiếp; dùng `execution`.
- User đang yêu cầu review; dùng `review`.
- User đang yêu cầu planning hoặc breakdown; dùng `planning`.
- User đang yêu cầu investigation/root cause; dùng `investigate`.

## Done Readiness Gate

Trước khi tạo done artifacts, kiểm tra:

- Có `EXECUTION.md` hoặc execution summary không.
- Có `REVIEW.md` hoặc review result không nếu task cần review.
- Có danh sách thay đổi thực tế không.
- Có verification evidence không.
- Có skipped/failed checks không.
- Có blocker chưa xử lý không.
- Có residual risk cần ghi không.
- Có PR/MR template trong repo không.
- Có release note cần tạo không.

Nếu task chưa thật sự ready:

- Vẫn có thể tạo `DONE.md` dạng handoff/blocker report.
- Không ghi task complete nếu còn blocker.
- Recommendation phải là `Blocked`, `Needs Fix`, hoặc `Needs More Verification`.

## Inputs

Skill có thể nhận các loại input sau:

- `PLAN.md`.
- `EXECUTION.md`.
- `REVIEW.md`.
- `DISCUSSION.md` nếu cần context.
- Diff hoặc danh sách file thay đổi.
- Test/verification evidence.
- Skipped checks.
- Failed checks.
- Known blockers.
- Residual risks.
- Follow-up items.
- PR/MR template trong repo.
- Repo convention về branch, commit, PR title, release note.
- User instruction về tone/format.

## Outputs

Output nên bao gồm:

- `DONE.md` trong session path nếu có.
- `PR_MESSAGE.md` trong session path nếu cần PR.
- `PR_DESCRIPTION.md` trong session path nếu cần PR.
- `RELEASE_NOTE.md` nếu user/workflow yêu cầu.
- Nếu không có repo/session, trả done summary trong response.
- Summary thay đổi.
- What changed.
- Verification evidence.
- Review result.
- Risks/follow-ups.
- Final status.
- Handoff.

## XML Contract

```xml
<Contract>
  <Inputs>PLAN.md, EXECUTION.md, REVIEW.md, diff/file changes, verification evidence, skipped checks, blockers, risks, follow-ups và PR/MR template nếu có.</Inputs>
  <Outputs>DONE.md, PR_MESSAGE.md, PR_DESCRIPTION.md, optional RELEASE_NOTE.md hoặc done summary trong response.</Outputs>
  <Artifacts>DONE.md, PR_MESSAGE.md, PR_DESCRIPTION.md và optional RELEASE_NOTE.md trong session path nếu có; nếu không, trả artifact trong response.</Artifacts>
  <Safety>Không overclaim verification. Không che giấu skipped/failed checks. Không đánh dấu complete nếu còn blocker. Không tự sửa code. Không tạo PR message mô tả thay đổi chưa làm. Không ghi secret/diff dài/output nhạy cảm vào final artifacts.</Safety>
</Contract>
```

## Depth Modes

### Lite Mode

Dùng Lite Mode khi:

- Task nhỏ.
- Không cần PR artifacts.
- User chỉ cần tổng kết nhanh.
- Không có nhiều risk/follow-up.
- Không có session/repo để lưu file.

Lite output:

```markdown
## Done Summary

### Status

### Summary

### Changed

### Verification

### Risks / Follow-ups

### Handoff
```

### Full Mode

Dùng Full Mode khi:

- Có `PLAN.md`, `EXECUTION.md`, `REVIEW.md`.
- Cần lưu artifacts.
- Cần chuẩn bị PR/MR.
- Có nhiều thay đổi.
- Có skipped checks, risks hoặc follow-ups cần ghi.
- User yêu cầu close task/final report/PR description.

Full Mode tạo:

- `DONE.md`.
- `PR_MESSAGE.md`.
- `PR_DESCRIPTION.md`.
- Optional `RELEASE_NOTE.md`.

## Final Status Taxonomy

Final status phải dùng một trong các trạng thái sau:

| Status | Meaning | Can Mark Done? |
|---|---|---|
| Done | Scope hoàn tất, verification phù hợp, không có blocker. | Yes |
| Done with Risks | Scope hoàn tất nhưng còn residual risks/skipped checks đã ghi rõ. | Yes, nếu risk được chấp nhận |
| Needs Fix | Review hoặc verification phát hiện issue cần sửa. | No |
| Needs More Verification | Thay đổi có vẻ xong nhưng evidence chưa đủ. | No hoặc conditional |
| Blocked | Có blocker chưa xử lý. | No |
| Partial | Chỉ hoàn tất một phần scope. | No, trừ khi user chấp nhận partial delivery |

Không dùng wording mơ hồ như “basically done” hoặc “should be fine”.

## Operating Principles

- Không overclaim verification.
- Không claim task complete nếu còn blocker.
- Nếu test không chạy được, ghi rõ lý do.
- Nếu verification fail, ghi rõ result và status phù hợp.
- Nếu review có finding chưa fix, không mark `Done`.
- PR description phải đủ cho reviewer hiểu scope nhanh.
- Summary phải mô tả outcome, không chỉ liệt kê file.
- Done không che giấu blocker, skipped check hoặc residual risk.
- Nếu repo có PR/MR template, phải ưu tiên cấu trúc đó trước fallback.
- Không sửa code trong skill này.
- Không paste diff dài hoặc command output dài vào artifacts.
- Không ghi secret/credential/token vào artifacts.
- Nếu scope thay đổi sau execution, ghi deviation hoặc recommend quay lại planning/review.

## Workflow

1. Xác định task có đủ input để done không.
2. Chọn Lite Mode hoặc Full Mode.
3. Đọc `PLAN.md` nếu có.
4. Đọc `EXECUTION.md` nếu có.
5. Đọc `REVIEW.md` nếu có.
6. Xác định thay đổi thực tế từ diff/file changed nếu có.
7. Tìm PR/MR template trong repo nếu cần PR artifacts.
8. Xác định final status.
9. Tổng hợp summary theo mục tiêu/outcome, không liệt kê máy móc.
10. Tổng hợp what changed theo nhóm logic.
11. Ghi verification thật sự đã chạy.
12. Ghi skipped checks, failed checks hoặc blockers.
13. Ghi review findings/resolution nếu có.
14. Ghi residual risks và follow-ups.
15. Tạo `DONE.md`.
16. Tạo `PR_MESSAGE.md` theo convention.
17. Tạo `PR_DESCRIPTION.md` theo template repo hoặc fallback.
18. Tạo `RELEASE_NOTE.md` nếu cần.
19. Ghi handoff rõ: ready for PR, ready for QA, needs fix, blocked hoặc needs verification.

## Template Lookup

Khi cần PR/MR description, ưu tiên đọc template theo thứ tự:

1. `.github/PULL_REQUEST_TEMPLATE.md`
2. `.github/pull_request_template.md`
3. `.github/PULL_REQUEST_TEMPLATE/*`
4. `.gitlab/merge_request_templates/*`
5. `.gitea/pull_request_template.md`
6. `.forgejo/pull_request_template.md`
7. Template cấu hình sẵn trong repo nếu có.
8. Fallback template nội bộ trong skill này.

Nếu tìm thấy nhiều template:

- Chọn template phù hợp nhất với loại thay đổi.
- Nếu không rõ, dùng template mặc định/root.
- Ghi rõ template nào đã dùng.

Nếu không tìm thấy template:

- Ghi rõ dùng fallback template.

Không bịa đã đọc template nếu chưa kiểm tra.

## Artifact Template: DONE.md

```markdown
# Done

## 1. Status

- Final status:
- Ready for PR/MR:
- Ready for QA/User verification:

## 2. Summary

## 3. Scope Completed

| Scope Item | Status | Evidence |
|---|---|---|

## 4. What Changed

| Area | Change | Reason |
|---|---|---|

## 5. Files Changed

| File | Summary |
|---|---|

## 6. Verification

| Check | Command / Method | Result | Evidence |
|---|---|---|---|

## 7. Review Result

| Item | Result | Notes |
|---|---|---|

## 8. Skipped / Failed Checks

| Check | Status | Reason | Risk |
|---|---|---|---|

## 9. Risks & Follow-ups

| Item | Type | Impact | Owner / Next Action |
|---|---|---|---|

## 10. Handoff

- Next step:
- Reviewer focus:
- QA focus:
- Deployment notes:
```

## Artifact Template: PR_MESSAGE.md

```markdown
<type>(<scope>): <summary>
```

Fallback examples:

```markdown
fix(auth): handle first-login password visibility safely
feat(teachers): add filtered back navigation from detail page
chore(agent): add execution skill artifacts
docs(qa): add investigation report template
```

## Artifact Template: PR_DESCRIPTION.md

Fallback template:

```markdown
## Summary

## Changes

## Verification

## Review Notes

## Risks / Follow-ups
```

Expanded fallback template for larger changes:

```markdown
## Summary

## Context

## Changes

## Verification

| Check | Result | Notes |
|---|---|---|

## Screenshots / Evidence

## Risks / Follow-ups

## Reviewer Focus
```

## Optional Artifact: RELEASE_NOTE.md

Create `RELEASE_NOTE.md` only when user/workflow asks or the change is user-facing.

Template:

```markdown
# Release Note

## Summary

## User Impact

## Changes

## Migration / Deployment Notes

## Known Risks

## Rollback Notes
```

## PR Message Guidelines

Prefer Conventional Commits format unless repo convention says otherwise:

```markdown
<type>(<scope>): <summary>
```

Common types:

| Type | Use When |
|---|---|
| feat | New user-facing capability |
| fix | Bug fix |
| docs | Documentation-only change |
| refactor | Code restructuring without behavior change |
| test | Test-only change |
| chore | Tooling, config, maintenance |
| perf | Performance improvement |
| ci | CI/CD change |
| build | Build system/dependency change |
| style | Formatting/style without behavior change |

Rules:

- One line.
- Imperative or outcome-focused.
- No period at the end.
- Do not mention files unless necessary.
- Do not overstate scope.
- Keep under typical commit title length if possible.

Bad:

```markdown
update files
```

Better:

```markdown
fix(teachers): preserve filters when returning from detail
```

## PR Description Guidelines

PR description should answer:

- What changed?
- Why changed?
- How was it verified?
- What should reviewer focus on?
- What risks/follow-ups remain?

Do not:

- Paste long diffs.
- Claim tests passed if not run.
- Hide skipped checks.
- Include secrets or sensitive logs.
- Include irrelevant implementation diary.

Good verification section:

```markdown
## Verification

- `pnpm lint` — passed
- `pnpm typecheck` — passed
- Manual: teacher search → detail → back — passed
```

If check skipped:

```markdown
## Verification

- `pnpm test` — skipped; test database is not available in this environment.
```

## Summary Guidelines

Summary should be outcome-focused.

Bad:

```markdown
Changed teacher files and updated hooks.
```

Better:

```markdown
Preserved teacher list search state when navigating back from teacher detail, including year filter restoration.
```

## Verification Reporting Rules

Always distinguish:

- Passed.
- Failed.
- Skipped.
- Not applicable.
- Not run due to environment.
- Not run due to time/tool limitation.
- Manual only.

Never convert skipped checks into pass.

Format:

```markdown
| Check | Command / Method | Result | Evidence |
|---|---|---|---|
| Typecheck | `pnpm typecheck` | Passed | No TS errors |
| E2E | Playwright flow | Skipped | Browser setup unavailable |
```

If verification failed but issue was fixed and rerun:

```markdown
- `pnpm test` — failed initially due to X, fixed in T-003, passed on rerun.
```

If verification failed and unresolved:

```markdown
- `pnpm test` — failed, unresolved. Final status: Needs Fix.
```

## Review Result Guidelines

If review found no findings:

```markdown
## Review Result

- Review status: No findings found.
- Residual risks: ...
```

If review found findings that were fixed:

```markdown
| Finding | Resolution | Evidence |
|---|---|---|
| R-001 Missing server-side permission check | Fixed | Added API guard and negative test |
```

If review found findings not fixed:

```markdown
| Finding | Status | Impact |
|---|---|---|
| R-001 Missing negative permission test | Open | Final status: Needs Fix |
```

## Risks & Follow-ups Guidelines

Risks/follow-ups should be explicit and actionable.

Types:

| Type | Meaning |
|---|---|
| Risk | Known uncertainty or remaining risk |
| Follow-up | Future improvement or separate task |
| Blocker | Prevents done/merge/deploy |
| Deployment Note | Required action during deploy |
| QA Note | Area QA should verify |
| Monitoring Note | Area to monitor after release |

Format:

```markdown
| Item | Type | Impact | Owner / Next Action |
|---|---|---|---|
| E2E not available locally | Risk | Full browser regression not automated | QA to run regression suite |
```

## Handoff Guidelines

Handoff must be explicit.

Common handoff states:

| State | Use When |
|---|---|
| Ready for PR/MR | Artifacts ready and status is Done/Done with Risks |
| Ready for QA | Needs QA/user verification but implementation done |
| Needs Fix | Review/verification found issue |
| Needs More Verification | Evidence insufficient |
| Blocked | External blocker prevents completion |
| Partial Handoff | Part of scope complete, rest documented |

Format:

```markdown
## Handoff

- Next step: Open PR.
- Reviewer focus: Permission checks and export flow.
- QA focus: Teacher list search → detail → back navigation.
- Deployment notes: No migration/config changes.
```

## Blocker Policy

If there is a blocker:

- Do not mark final status `Done`.
- Create `DONE.md` as handoff/blocker report if useful.
- PR message/description should not imply completion.
- Clearly state owner/next action.

Example:

```markdown
Final status: Blocked

Blocker:
- `pnpm typecheck` cannot run because generated API types are missing.
- Next action: regenerate API types or provide generated files.
```

## Scope Change Policy

If actual changes differ from plan:

- Record deviation.
- Explain why.
- State whether deviation is safe.
- If deviation is major, final status should not be `Done` until review confirms it.

Format:

```markdown
## Scope Deviations

| Deviation | Reason | Reviewed? | Risk |
|---|---|---|---|
```

## Release Note Policy

Create release note when:

- Change is user-facing.
- Change affects admin/user workflow.
- Change affects API behavior.
- Change requires migration/deployment action.
- User asks for release note.

Do not create release note for:

- Internal-only refactor.
- Test-only change.
- Docs-only change unless user asks.
- No-op or investigation-only task.

## Session / Artifact Rules

If đang làm trong repo/session:

- Tạo hoặc cập nhật `DONE.md` tại session path phù hợp.
- Tạo `PR_MESSAGE.md` nếu cần PR/MR.
- Tạo `PR_DESCRIPTION.md` nếu cần PR/MR.
- Tạo `RELEASE_NOTE.md` nếu cần.
- Session path khuyến nghị: `.agents/sessions/<Task-...>/`.
- Nếu đã có `PLAN.md`, `EXECUTION.md`, `REVIEW.md`, đặt done artifacts cùng session.
- Không tự bịa task number nếu project có convention riêng.
- Không ghi secret hoặc output dài nhạy cảm vào artifact.

Nếu không có repo/session:

- Trả done summary trong response.
- Không nói đã lưu file nếu thực tế chưa lưu.

## Checklist Trước Khi Hoàn Tất

Trước khi kết thúc output, kiểm tra:

- [ ] Đã xác định Lite Mode hoặc Full Mode.
- [ ] Đã đọc execution/review nếu có.
- [ ] Summary đúng thay đổi thực tế.
- [ ] Scope completed phản ánh đúng trạng thái.
- [ ] Verification evidence chính xác.
- [ ] Không overclaim skipped/failed checks.
- [ ] Review result đã ghi.
- [ ] Risks/follow-ups có hoặc ghi rõ không có.
- [ ] Final status rõ.
- [ ] PR/MR template đã được tìm hoặc ghi rõ dùng fallback.
- [ ] PR message ngắn gọn và đúng scope.
- [ ] PR description đủ cho reviewer hiểu nhanh.
- [ ] Release note được tạo nếu cần.
- [ ] Handoff rõ.
- [ ] `DONE.md`, `PR_MESSAGE.md`, `PR_DESCRIPTION.md` đã lưu nếu Full Mode/session phù hợp.

## Limitations

- Skill này không sửa code.
- Skill này không thay thế execution.
- Skill này không thay thế review.
- Skill này không biến task chưa verify thành done.
- Skill này không đảm bảo PR ready nếu input thiếu.
- Nếu review phát hiện blocker, quay lại `execution` trước khi done.
- Nếu scope thay đổi lớn, quay lại `planning` hoặc `review`.

## References

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [GitHub Docs: Creating a pull request template](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/creating-a-pull-request-template-for-your-repository)
- [GitHub Docs: About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- [GitLab Docs: Description templates](https://docs.gitlab.com/user/project/description_templates/)
- [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
- [Semantic Versioning](https://semver.org/)
