---
name: tester
description: Hỗ trợ tester/QA trong lifecycle agent phân tích acceptance criteria, tạo test plan/test cases, map requirement-to-test, xác định test data, regression risks, manual/automated verification, test evidence và testing gaps. Dùng khi cần QA workflow, test documentation, verification matrix, regression checklist hoặc xác nhận behavior có thể kiểm thử.
---

# Tester

## Mục Đích

Đóng vai trò tester/QA trong agent workflow để đảm bảo requirement, plan hoặc thay đổi đã có cách kiểm chứng rõ ràng.

Skill này tập trung vào:

- Phân tích requirement và acceptance criteria có testable không.
- Tạo test cases ngắn gọn, rõ precondition, steps và expected result.
- Map test cases với requirement/acceptance criteria.
- Xác định happy path, negative cases, edge cases và regression cases.
- Xác định test data cần thiết.
- Ghi manual verification steps hoặc automated test suggestion.
- Ghi verification evidence nếu đã chạy.
- Ghi testing gaps và regression risks.
- Chuẩn bị tài liệu QA/test để handoff sang execution, review hoặc done.

Mục tiêu cuối cùng là làm rõ “cần test gì, test bằng cách nào, expected result là gì, evidence ở đâu, còn gap/risk gì”.

## Khi Dùng

Dùng skill này khi:

- Cần tạo test cases.
- Cần tạo test plan ngắn.
- Cần xác nhận acceptance criteria có thể kiểm thử.
- Cần map test cases với requirement hoặc acceptance criteria.
- Cần review testing gaps.
- Cần regression checklist.
- Cần test data.
- Cần manual verification steps.
- Cần đề xuất automated tests.
- Cần QA notes cho task.
- Cần kiểm tra behavior hiện tại và expected behavior.
- Cần chuẩn bị verification evidence trước review/done.
- Cần tài liệu kiểm thử cho stakeholder, developer hoặc QA.
- Cần xác định areas có high regression risk.

## Khi Không Dùng

Không dùng skill này khi:

- Task chỉ là brainstorming sản phẩm chưa có behavior cụ thể.
- Requirement nghiệp vụ còn mơ hồ; dùng `business-analysis`.
- Cần lập implementation plan; dùng `planning`.
- Cần thực thi sửa code/chạy test; dùng `execution`.
- Cần review code tổng quát; dùng `review`.
- Cần review PR; dùng `review-pr`.
- Cần điều tra root cause; dùng `investigate`.
- User chỉ cần research external source; dùng `research`.
- Không có behavior, acceptance criteria, requirement hoặc changed area đủ để thiết kế test.

## Tester Readiness Gate

Trước khi tạo test cases, kiểm tra:

- Requirement hoặc behavior cần test là gì.
- Expected behavior đã rõ chưa.
- Acceptance criteria có testable không.
- Có actor/role/permission liên quan không.
- Có input/output rõ không.
- Có environment/test data constraint không.
- Có risk area nào cần ưu tiên không.
- Có cần manual hay automated verification không.
- Có existing tests hoặc verification command không.
- Có blocker nào khiến không thể xác định expected result không.

Nếu expected behavior chưa rõ:

- Không tự biến assumption thành expected result.
- Ghi assumption hoặc open question.
- Nếu có thể, tạo draft test cases với trạng thái `Needs Confirmation`.

## Inputs

Skill có thể nhận các loại input sau:

- Requirement.
- User story.
- Use case.
- Acceptance criteria.
- `PLAN.md`.
- `DISCUSSION.md`.
- `EXECUTION.md`.
- Bug report.
- Current behavior và expected behavior.
- UI flow hoặc screenshot.
- API contract.
- Business rules.
- Permission matrix.
- Test environment nếu có.
- Existing tests.
- Verification command.
- Test data/sample data.
- Known risks/regression areas.

## Outputs

Output nên bao gồm:

- Test plan/test cases trong artifact session phù hợp.
- Requirement-to-test traceability.
- Test data.
- Manual verification steps.
- Automated test suggestions nếu phù hợp.
- Regression checklist.
- Verification notes.
- Testing gaps.
- Regression risks.
- Pass/fail/blocked status nếu đã có evidence.
- Open questions.
- Handoff sang execution/review/done.

## XML Contract

```xml
<Contract>
  <Inputs>Requirement, PLAN.md, acceptance criteria, user stories, business rules, current/expected behavior, test environment, existing tests và test data nếu có.</Inputs>
  <Outputs>Test cases, traceability matrix, test data, manual verification steps, automated test suggestions, regression checklist, verification notes, testing gaps và regression risks.</Outputs>
  <Artifacts>Test documentation trong artifact session phù hợp nếu có; nếu không, trả test artifact trong response.</Artifacts>
  <Safety>Không claim pass nếu chưa chạy hoặc chưa có evidence. Không tự quyết expected behavior khi requirement chưa rõ. Không tạo test case chỉ kiểm tra implementation detail. Không dùng dữ liệu thật/nhạy cảm làm test data nếu không được phép.</Safety>
</Contract>
```

## Depth Modes

### Lite Mode

Dùng Lite Mode khi:

- Feature/bug nhỏ.
- Acceptance criteria rõ.
- Chỉ cần vài test cases.
- Không cần test plan đầy đủ.
- User cần checklist nhanh.

Lite output:

```markdown
## QA Checklist

### Scope

### Test Cases

### Test Data

### Verification Notes

### Gaps / Risks
```

### Full Mode

Dùng Full Mode khi:

- Feature lớn.
- Có nhiều actors/roles/permissions.
- Có nhiều acceptance criteria.
- Có data/import/export/API flow.
- Có regression risk cao.
- Cần tài liệu QA đầy đủ.
- Cần handoff sang QA hoặc reviewer.

Full Mode dùng template ở phần Artifact Template.

## Test Level Taxonomy

Chọn test level phù hợp:

| Level | Use When |
|---|---|
| Unit | Logic nhỏ, pure function, validation rule. |
| Component | UI component/state behavior. |
| Integration | FE-BE, service-service, API + DB, module interaction. |
| API | Endpoint contract, status code, validation, permission. |
| E2E | Critical user journey, browser workflow, full flow. |
| Manual | UX, visual, exploratory, environment-specific behavior. |
| Regression | Existing behavior dễ bị ảnh hưởng. |
| Smoke | Basic app/feature sanity after deploy/build. |
| Data | Import/export, migration, mapping, timezone, duplicate handling. |
| Security | Auth, permission, injection, access control, sensitive data. |
| Accessibility | Keyboard, screen reader labels, focus, contrast, semantics. |
| Performance | Slow query, load, rendering, bundle, response time. |

Không phải task nào cũng cần tất cả test levels. Chọn theo risk.

## Test Type Taxonomy

Test cases nên cover các nhóm sau nếu phù hợp:

| Type | Meaning |
|---|---|
| Happy Path | Flow chính thành công. |
| Negative | Input sai, permission thiếu, operation bị từ chối. |
| Edge Case | Boundary, empty state, duplicate, max/min, timezone. |
| Regression | Behavior cũ cần không bị phá. |
| Permission | Role-based access, hidden/disabled/forbidden behavior. |
| Data Validation | Required field, format, duplicate, invalid value. |
| Error Handling | API error, network error, validation error, unavailable state. |
| State / Navigation | Back/forward, refresh, deep link, stale state. |
| Compatibility | Browser/device/platform/environment khác nhau. |
| Accessibility | Keyboard/focus/ARIA/label behavior. |
| Security | Unauthorized access, direct API call, sensitive output. |

## Traceability Rules

Mỗi test case nên map tới ít nhất một requirement, business rule hoặc acceptance criteria nếu có.

Format khuyến nghị:

```markdown
| Requirement / AC | Test Case IDs | Coverage | Notes |
|---|---|---|---|
| AC-001 | TC-001, TC-002 | Covered | Happy + negative path |
```

Coverage values:

- Covered.
- Partially Covered.
- Not Covered.
- Needs Clarification.
- Not Testable.

Nếu acceptance criteria không testable, ghi testing gap hoặc open question.

## Test Case Quality Standard

Test case tốt phải có:

- ID.
- Title.
- Priority.
- Type.
- Preconditions.
- Test data.
- Steps.
- Expected result.
- Requirement/AC mapping.
- Verification method.
- Status nếu đã chạy.

Test case không nên:

- Quá phụ thuộc implementation internal.
- Trùng lặp với case khác.
- Chỉ nói “test feature works”.
- Không có expected result.
- Không có test data/precondition khi cần.
- Gộp quá nhiều behavior vào một case.

## Test Case Status

Nếu có evidence, dùng status rõ:

| Status | Meaning |
|---|---|
| Not Run | Chưa chạy. |
| Passed | Đã chạy và pass, có evidence. |
| Failed | Đã chạy và fail, có evidence. |
| Blocked | Không chạy được do blocker. |
| Skipped | Chủ động bỏ qua, có lý do. |
| Needs Clarification | Expected result chưa rõ. |
| Needs Test Data | Thiếu data để chạy. |
| Not Applicable | Không áp dụng với scope hiện tại. |

Không claim `Passed` nếu chưa chạy.

## Artifact Template

```markdown
# Tester / QA

## 1. Test Scope

### In Scope

### Out of Scope

### Assumptions

## 2. Requirement / Acceptance Criteria Review

| Requirement / AC | Testable? | Notes / Questions |
|---|---|---|

## 3. Risk-Based Test Focus

| Area | Risk | Priority | Suggested Coverage |
|---|---|---|---|

## 4. Test Data

| Data | Purpose | Source / Setup | Notes |
|---|---|---|---|

## 5. Test Cases

| ID | Priority | Type | Title | Preconditions | Steps | Expected Result | Requirement / AC | Verification Method | Status |
|---|---|---|---|---|---|---|---|---|---|

## 6. Regression Checklist

| Area | Scenario | Expected Result | Priority |
|---|---|---|---|

## 7. Automated Test Suggestions

| Candidate | Level | Why Automate | Notes |
|---|---|---|---|

## 8. Manual Verification Steps

| Step | Action | Expected Result | Evidence |
|---|---|---|---|

## 9. Verification Evidence

| Check | Command / Method | Result | Evidence |
|---|---|---|---|

## 10. Testing Gaps

| Gap | Risk | Suggested Follow-up |
|---|---|---|

## 11. Open Questions

| ID | Question | Owner | Blocking? |
|---|---|---|---|

## 12. QA Recommendation

- Ready for execution:
- Ready for review:
- Ready for done:
- Required follow-up:
```

## Template Test Case

Use this format for individual test cases when a table is not enough:

```markdown
## Test Case: <title>

- ID:
- Priority:
- Type:
- Preconditions:
- Test Data:
- Steps:
  1. ...
  2. ...
- Expected Result:
- Requirement / Acceptance Criteria:
- Verification Method:
- Status:
- Notes:
```

## Priority Guidelines

Use priority to guide risk-based testing:

| Priority | Meaning |
|---|---|
| P0 | Critical path, security/data loss/payment/auth/main flow. Must test. |
| P1 | Important behavior with user-visible impact. Should test. |
| P2 | Useful coverage for edge cases or regression. Test if time allows. |
| P3 | Low-risk exploratory or nice-to-have coverage. Optional. |

Do not create too many P0/P1 cases. Reserve them for real risk.

## Risk-Based Testing Guidelines

Prioritize tests based on:

- User impact.
- Business criticality.
- Frequency of use.
- Complexity.
- Recent code changes.
- Historical bug area.
- Permission/security sensitivity.
- Data loss or data corruption risk.
- Regression blast radius.
- Hard-to-rollback behavior.

Format:

```markdown
| Area | Risk | Priority | Suggested Coverage |
|---|---|---|---|
| Export endpoint | Unauthorized data export | P0 | API permission negative test |
```

## Acceptance Criteria Review

Before writing test cases, check AC quality:

AC is testable if it has:

- Condition/precondition.
- Action.
- Expected result.
- Clear actor/system behavior.
- No vague wording.

Bad AC:

```markdown
- System works correctly.
```

Better:

```markdown
- Given an admin opens the teacher list, when they filter by school year and open a teacher detail, then returning to the list preserves the selected school year filter.
```

If AC is not testable, mark it:

```markdown
| AC-002 | No | Expected result uses vague wording: "fast enough"; needs measurable threshold |
```

## Test Data Guidelines

Test data should be:

- Minimal.
- Representative.
- Safe.
- Reusable if possible.
- Explicit about role/permission/state.
- Free of real sensitive data unless explicitly authorized.

Avoid:

- Real customer/user PII.
- Production credentials.
- Real payment data.
- Secrets/tokens.
- Huge data fixtures unless needed.

Examples:

```markdown
| Data | Purpose | Source / Setup | Notes |
|---|---|---|---|
| Admin user with export permission | Verify successful export | Seed/test account | No real personal data |
| Teacher user without export permission | Verify forbidden export | Seed/test account | Negative case |
```

## Manual Verification Guidelines

Manual verification should be precise enough that another person can repeat it.

Good:

```markdown
1. Login as school admin.
2. Open Teacher Management.
3. Select school year `2026`.
4. Search keyword `Tanaka`.
5. Open first teacher detail.
6. Click Back.
7. Confirm school year and keyword remain selected.
```

Bad:

```markdown
- Check teacher page.
```

Manual verification should include:

- Role/account.
- URL/page.
- Preconditions.
- Steps.
- Expected result.
- Evidence if available.

## Automated Test Suggestion Guidelines

Suggest automation when:

- Flow is critical.
- Bug is likely to regress.
- Behavior is deterministic.
- Test data can be controlled.
- Manual verification is expensive or repetitive.
- Permission/security/data validation is involved.

Do not suggest automation when:

- Behavior is mostly visual and subjective.
- Test setup cost is much higher than value.
- Requirement is still unstable.
- Environment cannot support it yet.

Format:

```markdown
| Candidate | Level | Why Automate | Notes |
|---|---|---|---|
| Unauthorized export is rejected | API | Security regression risk is high | Add negative permission test |
```

## Regression Checklist Guidelines

Regression checklist should cover:

- Existing adjacent features.
- Shared components/helpers.
- Old behavior likely affected.
- Critical user journeys.
- Permission behavior.
- Data import/export.
- Navigation/state persistence.
- Error states.
- Browser/device if relevant.

Keep it focused. Do not list unrelated full-app regression unless the change is broad.

## Verification Evidence Rules

Verification evidence must distinguish:

- Passed.
- Failed.
- Blocked.
- Skipped.
- Not Run.
- Manual only.
- Automated.

Format:

```markdown
| Check | Command / Method | Result | Evidence |
|---|---|---|---|
| Typecheck | `pnpm typecheck` | Passed | No TS errors |
| Manual flow | Teacher list → detail → back | Passed | Filters preserved |
| E2E | Playwright | Skipped | Browser setup unavailable |
```

Never convert skipped/not-run checks into pass.

## Testing Gaps Guidelines

Testing gap should include:

- What is not covered.
- Why it matters.
- Suggested follow-up.

Examples:

```markdown
| Gap | Risk | Suggested Follow-up |
|---|---|---|
| No API-level permission test | Unauthorized direct request may bypass UI guard | Add negative API test |
| No timezone edge case | Date boundary bugs may appear near midnight | Add test data around UTC/local date boundary |
```

If a testing gap is high-risk, mention it as a QA blocker or review finding.

## QA Recommendation

At the end, give a clear QA recommendation:

| Recommendation | Meaning |
|---|---|
| Ready for Execution | Test plan is clear enough for implementation/verification. |
| Ready for Review | Test cases/evidence are enough for reviewer to assess. |
| Ready for Done | Required verification passed and gaps are acceptable. |
| Needs Clarification | Expected behavior/AC is unclear. |
| Needs More Testing | Coverage/evidence insufficient for risk. |
| Blocked | Cannot test due to env/data/access/tooling blocker. |

Format:

```markdown
## QA Recommendation

- Status: Needs More Testing
- Reason: Permission behavior has no API-level negative test.
- Required follow-up: Add or manually verify direct API unauthorized request.
```

## Workflow

1. Xác định behavior cần kiểm thử.
2. Chọn Lite Mode hoặc Full Mode.
3. Đọc requirement/plan/acceptance criteria.
4. Review acceptance criteria có testable không.
5. Xác định test scope và assumptions.
6. Xác định risk-based test focus.
7. Viết happy path cases.
8. Viết negative cases.
9. Viết edge cases nếu phù hợp.
10. Viết regression checklist.
11. Xác định test data.
12. Map test cases với acceptance criteria.
13. Ghi manual verification steps.
14. Ghi automated test suggestions nếu có giá trị.
15. Ghi verification evidence nếu đã chạy.
16. Ghi testing gaps và open questions.
17. Ghi QA recommendation.
18. Handoff sang execution/review/done hoặc business-analysis nếu requirement chưa rõ.

## Handoff Guidelines

Cuối output phải nói rõ bước tiếp theo.

| Situation | Suggested Next Skill / Step |
|---|---|
| Expected behavior unclear | `business-analysis` |
| Need implementation plan | `planning` |
| Need to run tests or implement tests | `execution` |
| Need code quality gate | `review` |
| Verification passed and ready to close | `done` |
| Need root cause before test design | `investigate` |

## Session / Artifact Rules

Nếu đang làm trong repo/session:

- Ghi test documentation vào artifact session phù hợp.
- Nếu workflow có convention riêng, có thể tạo `TEST.md`, `QA.md` hoặc section trong `PLAN.md`/`EXECUTION.md`.
- Không tự bịa task number nếu project có convention riêng.
- Không ghi secret, PII hoặc test credentials thật vào artifact.
- Nếu test cases là follow-up của plan, giữ cùng session path.

Nếu không có repo/session:

- Trả test artifact trong response.
- Không nói đã lưu file nếu thực tế chưa lưu.

## Output Quality

Tester output phải:

- Rõ scope.
- Test cases ngắn, không trùng lặp.
- Expected result rõ.
- Test data/precondition rõ.
- Map với AC/requirement nếu có.
- Có risk-based priority.
- Có manual/automated verification rõ.
- Không claim pass nếu chưa có evidence.
- Ghi testing gaps và regression risks.
- Không test implementation detail nếu behavior-level test đủ.

## Checklist Trước Khi Hoàn Tất

Trước khi kết thúc output, kiểm tra:

- [ ] Requirement/behavior cần test đã rõ hoặc gap đã ghi.
- [ ] Acceptance criteria đã review testability.
- [ ] Test cases map với acceptance criteria.
- [ ] Happy path có.
- [ ] Negative cases quan trọng có.
- [ ] Edge cases quan trọng có.
- [ ] Regression checklist có nếu có risk.
- [ ] Test data hoặc precondition rõ.
- [ ] Verification evidence hoặc manual steps rõ.
- [ ] Automated test suggestions có nếu đáng giá.
- [ ] Testing gaps được ghi.
- [ ] QA recommendation rõ.
- [ ] Không claim pass nếu chưa chạy/chưa có evidence.
- [ ] Không dùng dữ liệu thật/nhạy cảm nếu không được phép.

## Limitations

- Skill này không thay thế execution.
- Skill này không tự tạo browser/database tool trong MVP.
- Skill này không đảm bảo test coverage đầy đủ nếu requirement thiếu.
- Skill này không thay thế review code.
- Skill này không thay thế security audit chuyên sâu.
- Nếu expected behavior mơ hồ, phải quay lại business-analysis hoặc hỏi stakeholder.

## References

- [ISTQB Glossary](https://glossary.istqb.org/)
- [Atlassian: Test Plan](https://www.atlassian.com/continuous-delivery/software-testing/test-plan)
- [BrowserStack: How to Write Test Cases](https://www.browserstack.com/guide/how-to-write-test-cases)
- [Playwright Test Documentation](https://playwright.dev/docs/writing-tests)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [W3C WAI: Easy Checks for Web Accessibility](https://www.w3.org/WAI/test-evaluate/preliminary/)
