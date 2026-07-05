---
name: review-pr
description: Review pull request, merge request hoặc branch diff với mindset code reviewer chịu trách nhiệm chất lượng. Dùng khi cần REVIEW_PR.md, kiểm tra base/head diff, PR description, CI/test evidence, bug/regression/security/missing tests, merge readiness, request changes hoặc approve recommendation trước merge.
---

# Review PR

## Mục Đích

Review PR/MR hoặc branch diff như reviewer chịu trách nhiệm chất lượng trước merge.

Skill này tập trung vào:

- Xác định base/head hoặc diff scope được review.
- Đọc PR/MR description nếu có.
- Map affected files và impacted code paths.
- Review correctness, edge cases và regression risk.
- Review security/privacy/data risk khi thay đổi liên quan input, auth, permission, network, file, secret, DB hoặc infra.
- Review test coverage và verification evidence.
- Review PR description có phản ánh đúng thay đổi không.
- Ghi findings theo severity, có bằng chứng và recommendation.
- Ghi testing gaps và residual risks.
- Đưa merge recommendation rõ ràng: approve, approve with comments, request changes, needs more info, hoặc blocked.

Mục tiêu cuối cùng là giúp người quyết định merge hiểu rõ PR có an toàn để merge không, cần fix gì, còn risk nào cần chấp nhận.

## Khi Dùng

Dùng skill này khi:

- Người dùng yêu cầu review PR/MR.
- Cần review branch hiện tại so với base branch.
- Cần review diff được cung cấp.
- Cần tạo `REVIEW_PR.md`.
- Cần xác định blocker trước merge.
- Cần kiểm tra readiness trước merge.
- Cần review PR description, test result hoặc CI evidence.
- Cần đánh giá bug, regression, security, missing tests hoặc maintainability risk.
- Cần request changes hoặc approve recommendation.
- Cần reviewer-facing report độc lập với execution nội bộ.

## Khi Không Dùng

Không dùng skill này khi:

- Review thay đổi nội bộ sau execution trong cùng workflow; dùng `review`.
- Chỉ cần tổng kết PR, không review rủi ro; dùng `done` hoặc summary phù hợp.
- Không có diff, branch, changed files hoặc artifact để review.
- User yêu cầu tự sửa code ngay; dùng `execution` sau khi có finding/plan.
- User yêu cầu lập plan fix; dùng `planning`.
- User yêu cầu điều tra root cause trước khi có diff; dùng `investigate`.
- User yêu cầu review documentation/copywriting không liên quan code risk; dùng skill phù hợp.
- User yêu cầu approve thay họ trong hệ thống PR; không tự approve.

## Review PR Readiness Gate

Trước khi review PR, kiểm tra có đủ input chưa:

- Có diff hoặc branch compare không.
- Có base branch/head branch hoặc base/head commit không nếu review branch.
- Có changed files list không.
- Có PR/MR description không nếu available.
- Có CI/test/check result không nếu available.
- Có codebase context liên quan không.
- Có generated files hoặc lockfiles cần xử lý riêng không.
- Có binary files hoặc large files không.
- Có security/data/migration/API changes không.

Nếu thiếu input nhưng vẫn review được:

- Review phần có sẵn.
- Ghi rõ scope limitation.
- Ghi testing gaps và open questions.

Nếu thiếu input khiến review không đáng tin:

- Không giả vờ review đầy đủ.
- Recommendation phải là `Needs More Info` hoặc `Blocked`.

## Inputs

Skill có thể nhận các loại input sau:

- PR diff.
- Branch diff.
- Base branch/head branch.
- Base commit/head commit.
- PR/MR description.
- Changed files list.
- Test result.
- CI result.
- Review comments existing nếu có.
- Codebase context liên quan.
- Issue/ticket/requirement linked với PR.
- Screenshots hoặc QA evidence.
- Migration notes.
- Deployment notes.
- Release notes.
- Previous review findings.

## Outputs

Output nên bao gồm:

- `REVIEW_PR.md` trong session path nếu đang làm trong repo/session.
- Nếu không có repo/session, trả review artifact trong response.
- Scope reviewed.
- Base/head hoặc diff source.
- PR summary accuracy check.
- Findings có severity, category, file/path, evidence, impact và recommendation.
- Testing gaps.
- Open questions.
- Residual risks.
- Merge recommendation.
- Reviewer focus.
- Required fixes trước merge nếu có.

## XML Contract

```xml
<Contract>
  <Inputs>PR diff, branch diff, base/head, PR description, changed files, test/CI result và codebase context liên quan.</Inputs>
  <Outputs>REVIEW_PR.md hoặc review artifact gồm scope, findings, open questions, testing gaps, residual risks, PR description coverage và merge recommendation.</Outputs>
  <Artifacts>REVIEW_PR.md trong session path nếu có; nếu không, trả review artifact trong response.</Artifacts>
  <Safety>Không tự sửa PR nếu user chỉ yêu cầu review. Không approve thay user trong remote system. Không tạo finding thiếu bằng chứng. Không claim merge-safe nếu verification thiếu. Không bỏ qua security/data risk khi thay đổi liên quan input, auth, permission, secrets, file, network, DB, migration hoặc infra.</Safety>
</Contract>
```

## Depth Modes

### Lite Mode

Dùng Lite Mode khi:

- Diff nhỏ.
- PR scope rõ.
- Ít file thay đổi.
- Không có security/data/migration/API risk.
- User chỉ cần quick review.

Lite output:

```markdown
## PR Review Summary

### Scope Reviewed

### Findings

### Testing Gaps

### Residual Risks

### Merge Recommendation
```

### Full Mode

Dùng Full Mode khi:

- Diff lớn.
- Có nhiều file hoặc nhiều module.
- Có auth/security/permission/data/migration/API/public behavior change.
- Có lockfile/dependency/infra changes.
- Có CI failures/skipped checks.
- Cần `REVIEW_PR.md`.
- User yêu cầu review kỹ.

Full Mode dùng template `REVIEW_PR.md` ở phần Artifact Template.

## Severity Taxonomy

Mỗi finding phải có severity.

| Severity | Meaning | Merge Impact |
|---|---|---|
| Critical | Có thể gây data loss, secret leak, auth bypass, production outage, severe vulnerability hoặc irreversible damage. | Block merge. |
| High | Bug/regression nghiêm trọng, permission sai, broken main flow, migration risky hoặc missing verification cho vùng high-risk. | Request changes before merge. |
| Medium | Bug/risk có tác động thật nhưng phạm vi hẹp hoặc có workaround. | Usually fix before merge or explicitly accept. |
| Low | Minor bug/risk, maintainability issue có tác động, edge case nhỏ. | Optional fix or follow-up. |
| Info | Note, non-blocking improvement, reviewer observation. | No merge block. |

Không dùng severity cho style-only preference nếu không có impact thực tế.

## Finding Categories

Phân loại finding theo category nếu phù hợp:

| Category | Examples |
|---|---|
| Correctness | Logic sai, validation sai, state sai, edge case sai. |
| Regression | Break existing behavior or backward compatibility. |
| Requirement Gap | PR không đáp ứng issue/description/acceptance criteria. |
| Missing Test | Thiếu test/verification cho behavior quan trọng. |
| Security | Auth, permission, XSS, CSRF, injection, secrets, unsafe file/network. |
| Privacy | PII exposure, logging sensitive data, consent/data retention issue. |
| Data / Migration | Data loss, unsafe migration, bad default/nullability, non-idempotent backfill. |
| API / Contract | Breaking API, response shape change, error contract change. |
| UX / Accessibility | User flow broken, inaccessible state, misleading error. |
| Performance | Slow query, N+1, re-render loop, bundle/regression. |
| Reliability | Race condition, timeout, retry/idempotency issue. |
| Observability | Missing logs/metrics for high-risk operational path. |
| Maintainability | Complexity/duplication that creates real future bug risk. |
| Documentation | Missing migration/config/API docs needed to operate/review safely. |

## Merge Recommendation Taxonomy

Merge recommendation phải là một trong các trạng thái sau:

| Recommendation | Meaning |
|---|---|
| Approve | Không có blocker; verification phù hợp với risk. |
| Approve with Comments | Không có blocker nhưng có Low/Info comments hoặc accepted residual risks. |
| Request Changes | Có Critical/High hoặc Medium quan trọng cần sửa trước merge. |
| Needs More Info | Thiếu context, PR description, diff, test result hoặc requirement để kết luận. |
| Needs More Verification | Code có vẻ ổn nhưng evidence chưa đủ với risk. |
| Blocked | Có blocker external hoặc trạng thái branch/CI/conflict khiến review/merge chưa thể quyết định. |

Không dùng wording mơ hồ như “looks okay maybe”.

## Review Focus Areas

### 1. PR Scope & Intent

- PR description có rõ purpose không.
- Diff có khớp description không.
- Có thay đổi ngoài scope không.
- Có generated/lockfile/binary change bất thường không.
- Có breaking change không được nói trong description không.

### 2. Correctness

- Behavior có đúng expected outcome không.
- Edge cases có được xử lý không.
- Error handling có đủ không.
- State transition có nhất quán không.
- Async/race condition có thể xảy ra không.
- Input validation có đủ không.

### 3. Regression

- Existing behavior nào có thể bị ảnh hưởng.
- Shared utility/component/API có bị đổi không.
- Backward compatibility có bị phá không.
- Default behavior có thay đổi không.
- Migration/config có làm env cũ fail không.

### 4. Tests / CI

- Tests có cover happy path và negative path chính không.
- CI result có pass không.
- Có skipped/failing checks không.
- Có test mới cho bug fix không.
- Manual verification có đủ cụ thể không.
- Có regression area cần thêm check không.

### 5. Security / Privacy

Kiểm tra kỹ nếu PR chạm vào:

- Authentication.
- Authorization/permission.
- User input.
- HTML rendering.
- File upload/download.
- Network requests.
- Secrets/env/config.
- SQL/query/filter.
- Logging.
- Token/session/cookie.
- Admin operation.
- External API.
- Personal data.

### 6. Data / Migration

Kiểm tra kỹ nếu PR chạm vào:

- Schema migration.
- Data migration/backfill.
- Import/export.
- Date/time/timezone.
- Nullable/default values.
- Unique/index constraints.
- Rollback/down migration.
- Backward compatibility.
- Query performance.

### 7. Maintainability

Chỉ nêu khi có impact thực tế:

- Code quá phức tạp gây bug risk.
- Duplication làm hai behavior dễ lệch.
- Naming gây hiểu nhầm business rule.
- Layer boundary bị phá.
- Shared abstraction đổi quá rộng.
- Tests brittle hoặc khó maintain.

## Workflow

1. Xác định review có đủ input không.
2. Chọn Lite Mode hoặc Full Mode.
3. Xác định base/head hoặc diff source.
4. Đọc PR/MR description nếu có.
5. Xác định changed files và affected paths.
6. Map code paths liên quan ở mức cần thiết.
7. Kiểm tra PR scope có khớp description không.
8. Review correctness và edge cases.
9. Review regression risk.
10. Review security/privacy nếu có input, auth, permission, network, file, secret, DB hoặc infra.
11. Review data/migration/API compatibility nếu liên quan.
12. Review tests, CI và verification evidence.
13. Review maintainability risk nếu có tác động thực tế.
14. Ghi findings theo severity.
15. Nếu không có finding, ghi rõ `No findings found`.
16. Ghi testing gaps và residual risks.
17. Ghi open questions.
18. Ghi merge recommendation.
19. Cập nhật `REVIEW_PR.md` nếu Full Mode/session phù hợp.

## Finding Quality Standard

Mỗi finding tốt phải có:

- ID: `PR-001`, `PR-002`, ...
- Severity.
- Category.
- Location: file/path/line/function/section nếu có.
- Evidence cụ thể từ diff hoặc code.
- Impact thực tế.
- Recommendation cụ thể.
- Confidence nếu context chưa đầy đủ.

Format khuyến nghị:

```markdown
### Finding PR-001: [Severity] Short title

- Category:
- Location:
- Evidence:
- Impact:
- Recommendation:
- Confidence:
```

Ví dụ:

```markdown
### Finding PR-001: High — Export permission is enforced only in the UI

- Category: Security / Permission
- Location: `src/features/teachers/export-button.tsx`; no corresponding guard in export API handler
- Evidence: The PR hides the export button for unauthorized users, but the export endpoint still accepts direct requests.
- Impact: Users without export permission may export teacher data by calling the endpoint directly.
- Recommendation: Add server-side permission enforcement and a negative API-level permission test.
- Confidence: High
```

Không tạo finding kiểu:

```markdown
- Code could be cleaner.
```

Nếu không có impact thực tế, bỏ qua hoặc ghi Info rất rõ.

## Conventional Review Comments

Nếu cần comment theo format reviewer-facing, có thể dùng style giống Conventional Comments:

```markdown
**issue (blocking):** Permission is checked only on the client. Please add a server-side guard before merge.

**suggestion (non-blocking):** Consider extracting the duplicated date formatting into the existing helper.
```

Comment labels khuyến nghị:

| Label | Use When |
|---|---|
| issue | Có vấn đề cần sửa. |
| suggestion | Đề xuất cải thiện. |
| question | Cần làm rõ. |
| praise | Ghi nhận điểm tốt nếu hữu ích. |
| nitpick | Minor, non-blocking. |
| thought | Ý tưởng/quan sát không blocking. |
| chore | Việc nhỏ liên quan cleanup/tooling. |

Không lạm dụng nit/style comments.

## No Findings Policy

Nếu không tìm thấy finding, không chỉ viết “LGTM”.

Phải ghi:

- Scope reviewed.
- Inputs reviewed.
- Verification evidence reviewed.
- Testing gaps nếu có.
- Residual risks.
- Merge recommendation.

Format:

```markdown
## Findings

No findings found.

## Testing Gaps

- E2E was not run because browser test setup is unavailable.

## Residual Risks

- Review was limited to the provided diff and did not include runtime verification.

## Merge Recommendation

Approve with Comments.
```

## Artifact Template

```markdown
# Review PR

## 1. Scope

- Base:
- Head:
- Diff source:
- PR/MR:
- Review mode:

## 2. PR Description / Intent

| Item | Observation |
|---|---|

## 3. Changed Areas

| Area | Files / Modules | Risk Level | Notes |
|---|---|---|---|

## 4. Findings

### Finding PR-001: [Severity] Title

- Category:
- Location:
- Evidence:
- Impact:
- Recommendation:
- Confidence:

## 5. PR Scope / Description Coverage

| Claimed Change | Covered By Diff? | Evidence | Notes |
|---|---|---|---|

## 6. Verification Reviewed

| Check | Result | Evidence | Concern |
|---|---|---|---|

## 7. Testing Gaps

| Gap | Risk | Suggested Follow-up |
|---|---|---|

## 8. Residual Risks

| Risk | Impact | Acceptance / Mitigation |
|---|---|---|

## 9. Open Questions

| ID | Question | Owner | Blocking? |
|---|---|---|---|

## 10. Merge Recommendation

- Recommendation:
- Required fixes before merge:
- Non-blocking follow-ups:
- Reviewer focus:
```

## PR Description Coverage Guidelines

Nếu có PR description, check:

- Summary có đúng diff không.
- Changes liệt kê có xuất hiện trong diff không.
- Có thay đổi quan trọng trong diff nhưng không ghi description không.
- Verification được claim có evidence không.
- Risk/migration/deployment note có thiếu không.

Format:

```markdown
| Claimed Change | Covered By Diff? | Evidence | Notes |
|---|---|---|---|
| Adds teacher export permission check | Partial | UI guard only | Missing API guard; see PR-001 |
```

## Verification Review Guidelines

Verification review phải phân biệt:

- Passed.
- Failed.
- Skipped.
- Missing.
- Not applicable.
- Unknown.

Format:

```markdown
| Check | Result | Evidence | Concern |
|---|---|---|---|
| Unit tests | Passed | CI link / output summary | None |
| E2E | Missing | No evidence provided | Main flow not covered |
```

Không nhận “tests pass” nếu không có evidence trong input.

## Testing Gaps Guidelines

Testing gap không phải lúc nào cũng là blocker. Đánh giá theo risk.

Ví dụ:

```markdown
| Gap | Risk | Suggested Follow-up |
|---|---|---|
| No negative permission test for export endpoint | Unauthorized export regression may not be caught | Add API-level permission test before merge |
```

Nếu testing gap nằm ở vùng high-risk, nâng thành finding `High` hoặc `Medium`.

## Residual Risks Guidelines

Residual risk là rủi ro còn lại sau review, kể cả không có finding.

Ví dụ:

```markdown
| Risk | Impact | Acceptance / Mitigation |
|---|---|---|
| Review limited to diff only; app was not run locally | Runtime-only issues may be missed | Rely on CI + QA smoke test |
```

## Security Review Rules

Với security-related PR, kiểm tra tối thiểu:

- Permission check có ở server/API không, không chỉ UI.
- User input có validation/sanitization không.
- Output HTML có XSS risk không.
- SQL/query có parameterization không.
- Secrets có bị hardcode/log/commit không.
- File path/upload/download có path traversal risk không.
- Auth/session/cookie/token có bị expose không.
- Error message có leak sensitive detail không.
- External calls có timeout/retry/error handling không.
- Logs có chứa PII/token/password không.

Nếu không đủ context để kết luận security:

- Ghi testing gap hoặc residual risk.
- Không claim security safe.

## Data / Migration Review Rules

Với data/migration PR, kiểm tra tối thiểu:

- Migration có down/rollback không.
- Migration có an toàn với existing data không.
- Nullable/default values có hợp lý không.
- Unique/index constraint có thể fail trên data hiện tại không.
- Backfill có idempotent không.
- Query có performance risk không.
- Timezone/date conversion có đúng không.
- Import/export có backward compatibility không.
- Deployment order có cần ghi không.

Destructive migration hoặc rollback không rõ thường phải là `High` hoặc `Critical` tùy impact.

## Dependency / Lockfile Review Rules

Với dependency/lockfile changes, kiểm tra:

- Dependency mới có cần thiết không.
- Version change có major/breaking không.
- Lockfile change có khớp manifest không.
- Có dependency không dùng tới không.
- Có security/license risk rõ không.
- Bundle/runtime impact có đáng kể không.
- Có install script/postinstall risk không.

Nếu lockfile thay đổi ngoài scope:

- Ghi finding hoặc open question tùy impact.

## Generated / Binary Files Policy

Nếu PR có generated hoặc binary files:

- Không review như source code thường nếu không đọc được.
- Kiểm tra source generator hoặc upstream artifact nếu có.
- Ghi limitation nếu không verify được.
- Với binary lớn/out-of-scope, ghi risk hoặc question.
- Không ignore binary change nếu nó ảnh hưởng runtime/release.

## Merge Recommendation Rules

### Approve

Chỉ dùng khi:

- Không có finding blocker.
- Verification phù hợp với risk.
- Testing gaps không đáng kể hoặc đã accepted.
- PR description đủ rõ hoặc diff đủ self-contained.

### Approve with Comments

Dùng khi:

- Chỉ có Low/Info findings.
- Có residual risks nhỏ.
- Có non-blocking follow-up.

### Request Changes

Dùng khi:

- Có Critical/High finding.
- Có Medium finding ảnh hưởng correctness/security/data.
- Missing verification ở vùng high-risk.
- PR không đáp ứng requirement chính.

### Needs More Info

Dùng khi:

- Thiếu PR description/requirement quan trọng.
- Diff không đủ context.
- Không rõ base/head.
- Không rõ expected behavior.

### Needs More Verification

Dùng khi:

- Code có vẻ đúng nhưng test/CI evidence không đủ với risk.
- Manual verification claim không đủ cụ thể.
- CI missing cho vùng quan trọng.

### Blocked

Dùng khi:

- Branch/diff không review được.
- Conflict hoặc CI state không xác định.
- Missing artifacts khiến review không thể kết luận.
- Security/secret exposure cần xử lý trước.

## Review PR vs Review Boundary

Dùng `review-pr` cho:

- PR/MR/branch diff độc lập.
- Merge readiness.
- Reviewer-facing comments.
- Base/head comparison.
- PR description/CI evidence.

Dùng `review` cho:

- Internal self-review sau execution trong agent workflow.
- Review `PLAN.md`/`EXECUTION.md` output.
- Quality gate trước `done`.

Không dùng cả hai nếu một skill là đủ.

## Session / Artifact Rules

Nếu đang làm trong repo/session:

- Tạo hoặc cập nhật `REVIEW_PR.md` tại session path phù hợp.
- Session path khuyến nghị: `.agents/sessions/<Task-...>/REVIEW_PR.md`.
- Không tự bịa task number nếu project có convention riêng.
- Không ghi secret hoặc output dài nhạy cảm vào artifact.
- Không paste full diff dài vào artifact.
- Findings phải đủ bằng chứng để reviewer follow.

Nếu không có repo/session:

- Trả review artifact trong response.
- Không nói đã lưu file nếu thực tế chưa lưu.

## Checklist Trước Khi Hoàn Tất

Trước khi kết thúc review PR, kiểm tra:

- [ ] Base/head hoặc diff source đã xác định.
- [ ] PR/MR description đã đọc nếu có.
- [ ] Scope review rõ.
- [ ] Changed areas đã map ở mức cần thiết.
- [ ] Findings có severity hoặc ghi rõ không có finding.
- [ ] Mỗi finding có category, location, evidence, impact và recommendation.
- [ ] Không có style-only finding nếu không có risk thực tế.
- [ ] Security/privacy/data/API risk đã check nếu liên quan.
- [ ] PR description coverage đã check nếu có description.
- [ ] Test/CI/verification evidence đã review.
- [ ] Testing gaps được ghi.
- [ ] Residual risks được ghi.
- [ ] Open questions được ghi và đánh dấu blocking nếu cần.
- [ ] Merge recommendation rõ.
- [ ] `REVIEW_PR.md` đã lưu nếu Full Mode/session phù hợp.

## Limitations

- Không tự sửa PR nếu người dùng chỉ yêu cầu review.
- Không approve thay người dùng trong remote PR system.
- Không thay thế security audit chuyên sâu.
- Không đảm bảo phát hiện mọi bug nếu diff/context/test evidence thiếu.
- Nếu cần fix, chuyển sang `planning` hoặc `execution`.
- Nếu cần hiểu root cause trước khi review, chuyển sang `investigate`.
- Nếu thiếu diff/base/head, recommendation phải phản ánh limitation.

## References

- [Google Engineering Practices: The Standard of Code Review](https://google.github.io/eng-practices/review/reviewer/standard.html)
- [Google Engineering Practices: What to Look For in a Code Review](https://google.github.io/eng-practices/review/reviewer/looking-for.html)
- [GitHub Docs: Reviewing Proposed Changes in a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)
- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- [OWASP Secure Code Review Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secure_Code_Review_Cheat_Sheet.html)
- [Conventional Comments](https://conventionalcomments.org/)
