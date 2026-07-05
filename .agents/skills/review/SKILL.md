---
name: review
description: Review thay đổi sau execution để tìm bug, regression, missing tests, security risk, data risk, maintainability risk và readiness trước done/PR. Dùng khi cần REVIEW.md, self-review, internal code review, artifact review, quality gate hoặc quyết định có thể mark done hay cần quay lại execution.
---

# Review

## Mục Đích

Đánh giá thay đổi sau execution trước khi mark done, tạo PR hoặc bàn giao cho user/QA.

Skill này tập trung vào:

- Kiểm tra thay đổi có đúng goal/scope trong plan không.
- Tìm bug thực tế, regression risk và edge case bị bỏ sót.
- Kiểm tra missing tests hoặc verification gaps.
- Kiểm tra security, auth, permission, secret, data và migration risk.
- Kiểm tra maintainability, readability và consistency nếu có tác động thực tế.
- Ghi findings có severity, bằng chứng và recommendation rõ ràng.
- Ghi residual risks và testing gaps kể cả khi không có finding.
- Đưa ra recommendation: ready, ready with risks, hoặc needs fix.

Mục tiêu cuối cùng là tạo một review có giá trị thực tế, giúp quyết định thay đổi đã đủ an toàn để done/merge/deploy hay cần quay lại execution.

## Khi Dùng

Dùng skill này khi:

- Sau execution.
- Trước khi tạo done report.
- Trước khi tạo PR message.
- Trước khi merge hoặc bàn giao cho QA/user.
- Khi cần review diff, changed files hoặc artifact.
- Khi cần `REVIEW.md`.
- Khi cần self-review nội bộ.
- Khi cần quality gate trước done.
- Khi cần đánh giá testing gaps, residual risks hoặc missed requirements.
- Khi user yêu cầu review code/thay đổi mà không yêu cầu tự sửa.

## Khi Không Dùng

Không dùng skill này khi:

- Chưa có thay đổi, diff hoặc artifact để review.
- Người dùng chỉ yêu cầu brainstorming hoặc research.
- Requirement còn mơ hồ và chưa có execution.
- Đang cần implement/fix ngay; dùng `execution`.
- Đang cần lập kế hoạch fix; dùng `planning`.
- Đang review pull request bên ngoài theo workflow riêng; dùng `review-pr` nếu có.
- User yêu cầu style/lint formatting thuần túy và không cần risk review.
- Không có đủ context để review và cần investigate trước.

## Review Readiness Gate

Trước khi review, kiểm tra có đủ input chưa:

- Có diff hoặc danh sách file thay đổi không.
- Có `PLAN.md` hoặc scope/goal không.
- Có `EXECUTION.md` hoặc execution summary không.
- Có test/check result nếu có thể chạy được không.
- Có known skipped checks không.
- Có affected areas rõ không.

Nếu thiếu input nhưng vẫn có thể review:

- Review phần có sẵn.
- Ghi rõ scope limitation.
- Ghi open questions hoặc missing context.

Nếu thiếu input khiến review không đáng tin:

- Không giả vờ review đầy đủ.
- Yêu cầu hoặc recommend thu thập diff/execution/test result trước.

## Inputs

Skill có thể nhận các loại input sau:

- Diff hoặc file changes.
- Changed files list.
- `PLAN.md` nếu có.
- `EXECUTION.md` nếu có.
- `DISCUSSION.md` hoặc requirement notes nếu cần context.
- Test/check result.
- Verification evidence.
- PR description hoặc commit summary.
- User-stated scope.
- Known risks/open questions.
- Screenshots/reports/logs nếu có.

## Outputs

Output nên bao gồm:

- `REVIEW.md` trong session path nếu đang làm trong repo/session.
- Nếu không có repo/session, trả review artifact trong response.
- Scope reviewed.
- Review inputs/sources.
- Findings có severity, category, evidence và recommendation.
- Testing gaps.
- Residual risks.
- Open questions.
- Final recommendation.
- Handoff: ready for done, needs execution, needs planning hoặc needs more verification.

## XML Contract

```xml
<Contract>
  <Inputs>Diff/file changes, PLAN.md, EXECUTION.md, test/check result, verification evidence và scope/context nếu có.</Inputs>
  <Outputs>REVIEW.md hoặc review artifact gồm scope reviewed, findings, testing gaps, residual risks, open questions, recommendation và handoff.</Outputs>
  <Artifacts>REVIEW.md trong session path nếu có; nếu không, trả review artifact trong response.</Artifacts>
  <Safety>Không tự sửa code nếu user chỉ yêu cầu review. Không tạo finding thiếu bằng chứng. Không claim safe nếu verification thiếu. Không bỏ qua security/data risk khi thay đổi liên quan input, auth, permission, secrets, file, network, DB hoặc infra.</Safety>
</Contract>
```

## Depth Modes

### Lite Mode

Dùng Lite Mode khi:

- Thay đổi nhỏ.
- Diff ít.
- Scope rõ.
- Ít rủi ro.
- User chỉ cần review nhanh.

Lite output:

```markdown
## Review Summary

### Scope Reviewed

### Findings

### Testing Gaps

### Residual Risks

### Recommendation
```

### Full Mode

Dùng Full Mode khi:

- Có `PLAN.md` và `EXECUTION.md`.
- Có nhiều file thay đổi.
- Có thay đổi auth, permission, security, data, migration, infra, API hoặc public behavior.
- Cần `REVIEW.md`.
- Cần quality gate trước done/PR.
- User yêu cầu review kỹ.

Full Mode dùng template `REVIEW.md` ở phần Artifact Template.

## Severity Taxonomy

Mỗi finding phải có severity.

| Severity | Meaning | Typical Action |
|---|---|---|
| Critical | Có thể gây mất dữ liệu, lộ secret, bypass auth, crash nghiêm trọng, production outage hoặc security breach. | Must fix before done/merge/deploy. |
| High | Bug nghiêm trọng, regression lớn, logic sai, permission sai, migration nguy hiểm hoặc verification thiếu cho vùng high-risk. | Should fix before done/merge. |
| Medium | Bug hoặc risk có tác động thật nhưng có workaround hoặc phạm vi hẹp. | Fix soon or explicitly accept risk. |
| Low | Vấn đề nhỏ nhưng có thể gây confusion, maintainability issue có tác động, minor edge case. | Fix if cheap or track follow-up. |
| Info | Quan sát không blocking, improvement suggestion, note cho reviewer. | Optional follow-up. |

Không dùng severity để comment style thuần túy nếu không có impact thực tế.

## Finding Categories

Phân loại finding theo category nếu phù hợp:

| Category | Examples |
|---|---|
| Correctness | Logic sai, edge case sai, state sai, validation sai. |
| Regression | Thay đổi phá behavior hiện có. |
| Requirement Gap | Không đáp ứng plan, AC hoặc user request. |
| Missing Test | Thiếu test/verification cho logic quan trọng. |
| Security | Auth, permission, injection, XSS, CSRF, secret, unsafe file/network. |
| Data / Migration | Data loss, invalid migration, backward compatibility, wrong mapping. |
| API / Contract | Breaking API, response shape thay đổi, missing error handling. |
| UX / Accessibility | Flow khó dùng, error state sai, accessibility issue có impact. |
| Performance | Query chậm, bundle tăng lớn, unnecessary loop/re-render. |
| Reliability | Race condition, retry, timeout, flaky behavior. |
| Observability | Thiếu logging/monitoring cho flow high-risk. |
| Maintainability | Duplication, overly complex code, naming unclear nếu gây rủi ro thực tế. |
| Documentation | Missing docs for non-obvious behavior, config, migration or operation. |

## Review Focus Areas

Khi review, cân nhắc các khu vực sau tùy theo thay đổi:

### Correctness

- Behavior có đúng goal và acceptance criteria không.
- Edge cases có được xử lý không.
- Error handling có rõ không.
- State transitions có hợp lý không.
- Input validation có đủ không.
- Async/race condition có thể xảy ra không.

### Regression

- Existing behavior nào có thể bị ảnh hưởng.
- Có thay đổi contract hoặc default behavior không.
- Có đổi logic shared/helper/common component không.
- Có flow cũ nào cần manual regression check không.

### Tests / Verification

- Test có cover happy path và negative path chính không.
- Có verification evidence tương ứng với risk không.
- Có skipped checks quan trọng không.
- Failure có được giải thích không.
- Manual check có đủ cụ thể không.

### Security

Kiểm tra kỹ nếu thay đổi liên quan:

- Authentication.
- Authorization/permission.
- User input.
- HTML rendering.
- File upload/download.
- Network request.
- Secrets/env/config.
- SQL/query/filter.
- Logging.
- Token/session/cookie.
- External API.
- Admin operation.

### Data / Migration

Kiểm tra kỹ nếu thay đổi liên quan:

- DB schema.
- Migration.
- Import/export.
- Data mapping.
- Unique constraint.
- Nullable field.
- Date/time/timezone.
- Backfill.
- Deletion.
- Rollback.
- Backward compatibility.

### Maintainability

Chỉ nêu maintainability finding khi có tác động thật:

- Code duplicate gây risk.
- Logic quá phức tạp gây bug risk.
- Naming gây hiểu nhầm behavior.
- Layer boundary bị phá.
- Shared helper đổi quá rộng.
- Test khó maintain hoặc brittle.

Không biến review thành style-only nếu style không gây risk.

## Workflow

1. Xác định review có đủ input không.
2. Chọn Lite Mode hoặc Full Mode.
3. Đọc `PLAN.md` nếu có.
4. Đọc `EXECUTION.md` nếu có.
5. Xác định goal/scope và expected outcome.
6. Xác định changed files/diff/artifacts thực tế.
7. So sánh thay đổi với plan và acceptance criteria.
8. Kiểm tra correctness và edge cases.
9. Kiểm tra regression risk.
10. Kiểm tra missing tests/verification gaps.
11. Kiểm tra security nếu thay đổi liên quan input, auth, secret, file, network, DB hoặc infra.
12. Kiểm tra data/migration/API compatibility nếu liên quan.
13. Kiểm tra maintainability risk nếu có tác động thực tế.
14. Ghi findings theo severity.
15. Nếu không có finding, ghi rõ `No findings found`.
16. Ghi testing gaps.
17. Ghi residual risks.
18. Ghi recommendation: ready, ready with risks, needs fix, hoặc blocked.
19. Cập nhật `REVIEW.md` nếu Full Mode/session phù hợp.

## Finding Quality Standard

Một finding tốt phải có:

- Severity.
- Category.
- File/path hoặc artifact section nếu có.
- Evidence cụ thể.
- Why it matters.
- Recommendation/action.
- Confidence nếu context chưa đầy đủ.

Không tạo finding nếu chỉ là preference cá nhân.

Format khuyến nghị:

```markdown
### Finding R-001: [Severity] Short title

- Category:
- Location:
- Evidence:
- Impact:
- Recommendation:
- Confidence:
```

Ví dụ:

```markdown
### Finding R-001: High — Export permission is checked only on the client

- Category: Security / Permission
- Location: `src/features/teachers/export-button.tsx`, missing server-side guard in export endpoint
- Evidence: The UI hides the button for unauthorized users, but the export API still accepts direct requests.
- Impact: A user without export permission may still export teacher data by calling the endpoint directly.
- Recommendation: Add server-side permission check in the export handler and add a negative permission test.
- Confidence: High
```

Finding không tốt:

```markdown
- Code could be better.
```

Viết lại thành finding có impact hoặc bỏ qua.

## No Findings Policy

Nếu không tìm thấy finding, không chỉ viết “LGTM”.

Phải ghi:

- Scope reviewed.
- Inputs reviewed.
- Verification evidence reviewed.
- Testing gaps nếu có.
- Residual risks.
- Recommendation.

Format:

```markdown
## Findings

No findings found.

## Testing Gaps

- E2E was not run because browser test setup is unavailable.

## Residual Risks

- Manual regression coverage is limited to the main happy path.

## Recommendation

Ready with noted residual risks.
```

## Artifact Template

```markdown
# Review

## 1. Scope Reviewed

## 2. Review Inputs

| Input | Notes |
|---|---|

## 3. Findings

### Finding R-001: [Severity] Title

- Category:
- Location:
- Evidence:
- Impact:
- Recommendation:
- Confidence:

## 4. Requirement / Plan Coverage

| Requirement / Task | Covered By Change? | Evidence | Notes |
|---|---|---|---|

## 5. Verification Reviewed

| Check | Result | Evidence | Concern |
|---|---|---|---|

## 6. Testing Gaps

| Gap | Risk | Suggested Follow-up |
|---|---|---|

## 7. Residual Risks

| Risk | Impact | Acceptance / Mitigation |
|---|---|---|

## 8. Open Questions

| ID | Question | Owner | Blocking? |
|---|---|---|---|

## 9. Recommendation

- Status:
- Required fixes:
- Suggested follow-ups:
- Ready for done/PR:
```

## Requirement / Plan Coverage Guidelines

Nếu có `PLAN.md`, review phải check coverage:

- Task nào trong plan đã có thay đổi tương ứng.
- Acceptance criteria nào được verify.
- Task nào bị bỏ sót.
- Có thay đổi ngoài plan không.
- Có deviation nào cần review không.

Format:

```markdown
| Requirement / Task | Covered By Change? | Evidence | Notes |
|---|---|---|---|
| T-001 Add validation guard | Yes | `src/...`, unit test | Matches plan |
| T-002 Add negative test | No | No test found | Finding R-002 |
```

## Testing Gaps Guidelines

Testing gap không phải lúc nào cũng là finding. Nó là khoảng trống verification cần ghi lại.

Testing gap nên có:

- Gap cụ thể.
- Risk nếu không test.
- Suggested follow-up.

Ví dụ:

```markdown
| Gap | Risk | Suggested Follow-up |
|---|---|---|
| No negative permission test for export endpoint | Unauthorized export regression may not be caught | Add API-level permission test |
```

Nếu gap nằm ở vùng high-risk, có thể nâng thành finding.

## Residual Risks Guidelines

Residual risk là rủi ro còn lại sau khi review, kể cả không có finding.

Ví dụ:

```markdown
| Risk | Impact | Acceptance / Mitigation |
|---|---|---|
| E2E test not available locally | Full browser flow not automatically verified | Manual happy path was checked; add E2E later |
```

Không giấu risk vì không fix ngay.

## Recommendation Status

Recommendation nên dùng một trong các status sau:

| Status | Meaning |
|---|---|
| Ready | Không có finding blocking, verification phù hợp với risk. |
| Ready with Risks | Không có blocker nhưng còn testing gaps/residual risks cần chấp nhận. |
| Needs Fix | Có finding Critical/High hoặc Medium quan trọng cần sửa trước done/merge. |
| Blocked | Thiếu input, thiếu diff, thiếu verification hoặc có open question blocking. |
| Needs More Verification | Code có vẻ ổn nhưng evidence chưa đủ để kết luận. |

## Review vs Execution Boundary

- Review không tự sửa code nếu user chỉ yêu cầu review.
- Review có thể recommend fix.
- Nếu user yêu cầu “review and fix”, có thể chuyển sang `execution` sau khi ghi findings hoặc tạo mini-plan fix.
- Nếu phát hiện plan sai hoặc scope thiếu, recommend quay lại `planning`.
- Nếu phát hiện requirement mơ hồ, recommend quay lại `business-analysis` hoặc hỏi stakeholder.

## Security Review Rules

Với security-related change, kiểm tra tối thiểu:

- Permission check có ở server/API không, không chỉ UI.
- User input có validation/sanitization không.
- Output HTML có XSS risk không.
- SQL/query có parameterization không.
- Secrets có bị hardcode/log/commit không.
- File path/upload/download có path traversal risk không.
- Auth/session/cookie/token có bị expose không.
- Error message có leak sensitive detail không.

Nếu không đủ context để kết luận security:

- Ghi testing gap hoặc residual risk.
- Không claim security safe.

## Data / Migration Review Rules

Với data/migration change, kiểm tra tối thiểu:

- Migration có backward compatibility không.
- Có rollback/down migration không.
- Nullable/default values có an toàn không.
- Existing data có bị invalid không.
- Unique constraint/index có thể fail trên data hiện tại không.
- Timezone/date conversion có đúng không.
- Import/export có preserve format không.
- Backfill có idempotent không.
- Query có performance risk không.

Nếu migration destructive hoặc rollback không rõ, severity thường là High hoặc Critical tùy impact.

## Maintainability Review Rules

Chỉ nêu maintainability khi có rủi ro thực tế.

Có thể nêu khi:

- Code duplication sẽ làm hai behavior lệch nhau.
- Logic quá phức tạp làm edge case dễ sai.
- Shared helper bị đổi làm ảnh hưởng nhiều nơi.
- Naming sai gây hiểu nhầm business rule.
- Test quá brittle dễ fail không liên quan.

Không nêu khi:

- Chỉ là preference style.
- Formatter/linter đã cover.
- Không có impact tới correctness, reviewability hoặc future change risk.

## Session / Artifact Rules

Nếu đang làm trong repo/session:

- Tạo hoặc cập nhật `REVIEW.md` tại session path phù hợp.
- Session path khuyến nghị: `.agents/sessions/<Task-...>/REVIEW.md`.
- Nếu đã có `PLAN.md` và `EXECUTION.md`, đặt `REVIEW.md` cùng session.
- Không tự bịa task number nếu project có convention riêng.
- Không ghi diff dài hoặc secret vào artifact.
- Findings phải đủ bằng chứng để reviewer follow.

Nếu không có repo/session:

- Trả review artifact trong response.
- Không nói đã lưu file nếu thực tế chưa lưu.

## Checklist Trước Khi Hoàn Tất

Trước khi kết thúc review, kiểm tra:

- [ ] Scope review rõ.
- [ ] Inputs reviewed đã ghi.
- [ ] Changed files/diff/artifact đã được xem xét nếu có.
- [ ] Plan/execution coverage đã check nếu có.
- [ ] Findings có severity hoặc ghi rõ không có finding.
- [ ] Mỗi finding có category, evidence, impact và recommendation.
- [ ] Không có style-only finding nếu không có risk thực tế.
- [ ] Security/data/API risk đã check nếu liên quan.
- [ ] Testing gaps được nêu.
- [ ] Residual risks được ghi.
- [ ] Recommendation status rõ.
- [ ] Handoff rõ: ready, ready with risks, needs fix, blocked hoặc needs more verification.
- [ ] `REVIEW.md` đã lưu nếu Full Mode/session phù hợp.

## Limitations

- Review không tự sửa code nếu người dùng chỉ yêu cầu review.
- Review không thay thế execution.
- Review không thay thế QA đầy đủ hoặc security audit chuyên sâu.
- Review không thể đảm bảo không còn bug nếu thiếu diff, tests hoặc context.
- Nếu cần fix, chuyển lại `planning` hoặc `execution`.
- Nếu review input thiếu, phải ghi limitation thay vì kết luận quá chắc.

## References

- [Google Engineering Practices: How to do a code review](https://google.github.io/eng-practices/review/reviewer/)
- [Google Engineering Practices: What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html)
- [GitHub Docs: Reviewing proposed changes in a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request)
- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
- [Atlassian Code Review Best Practices](https://www.atlassian.com/blog/add-ons/code-review-best-practices)
