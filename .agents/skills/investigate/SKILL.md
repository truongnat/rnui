---
name: investigate
description: Điều tra codebase, bug, hành vi hệ thống hoặc câu hỏi kỹ thuật trước khi implement. Dùng khi cần INVESTIGATE.md, root-cause analysis, reproduction, log analysis, code tracing, impact map, hypothesis validation, regression analysis hoặc recommendation fix/workaround/next step dựa trên evidence.
---

# Investigate

## Mục Đích

Tìm hiểu sự thật kỹ thuật trước khi quyết định fix, planning hoặc implementation.

Skill này tập trung vào:

- Xác định câu hỏi điều tra chính.
- Thu thập evidence từ log, error, screenshot, reproduction, codebase, config hoặc test result.
- Reproduce issue nếu có thể.
- Trace code path liên quan.
- Tách observed facts khỏi inference/hypothesis.
- Xác định root cause hoặc các hypothesis còn lại.
- Đánh giá impact, blast radius và regression risk.
- Đề xuất fix, workaround hoặc next investigation.
- Ghi `INVESTIGATE.md` để handoff sang planning/execution/review.

Mục tiêu cuối cùng là tránh sửa code dựa trên phỏng đoán, đồng thời tạo evidence đủ rõ để team quyết định bước tiếp theo.

## Khi Dùng

Dùng skill này khi:

- Người dùng yêu cầu điều tra lỗi.
- Người dùng đưa log/error/screenshot và cần phân tích.
- Cần hiểu code path hoặc hành vi hệ thống.
- Cần reproduce issue trước khi fix.
- Cần root-cause analysis.
- Cần impact analysis trước khi đổi code.
- Cần xác định bug là FE, BE, DB, config, infra, auth, data hay external service.
- Cần kiểm tra regression hoặc behavior drift.
- Cần map affected modules trước planning.
- Chưa chắc có cần thay đổi workspace không.
- Có nhiều hypothesis và cần evidence để loại trừ.
- Cần tạo hoặc cập nhật `INVESTIGATE.md`.

## Khi Không Dùng

Không dùng skill này khi:

- Đã có root cause rõ và chỉ cần implement fix; dùng `execution`.
- Đã có direction rõ và cần chia task; dùng `planning`.
- Chỉ cần brainstorm ý tưởng sản phẩm; dùng `brainstorming`.
- Requirement nghiệp vụ chưa rõ; dùng `business-analysis`.
- Review PR; dùng `review-pr`.
- Review thay đổi sau execution; dùng `review`.
- Chỉ cần sync trạng thái repo trước execution; dùng `sync`.
- User yêu cầu research external source sâu; dùng `research`.
- User yêu cầu sửa ngay task nhỏ, root cause hiển nhiên và scope rõ.

## Investigation Readiness Gate

Trước khi bắt đầu điều tra, kiểm tra:

- Câu hỏi điều tra là gì.
- Có mô tả issue hoặc expected/actual behavior không.
- Có log/error/screenshot/reproduction không.
- Có codebase/workspace context không.
- Có môi trường để reproduce không.
- Có constraint không được chạy command/sửa file không.
- Có file nhạy cảm, secret, production data hoặc credential liên quan không.
- Có risk khi chạy command không.
- Có cần read-only mode nghiêm ngặt không.

Nếu thiếu thông tin nhưng vẫn điều tra được:

- Tạo best-effort investigation.
- Ghi rõ assumptions và missing context.
- Không claim root cause quá chắc.

Nếu thiếu thông tin khiến không thể kết luận:

- Ghi `Needs More Evidence`.
- Đề xuất evidence cần lấy tiếp.

## Inputs

Skill có thể nhận các loại input sau:

- Mô tả vấn đề.
- Expected behavior và actual behavior.
- Error message.
- Stack trace.
- Logs.
- Screenshot.
- Video/reproduction recording.
- Reproduction steps.
- Test result.
- Codebase context.
- Config metadata.
- API request/response sample.
- Database schema/sample data nếu an toàn.
- Environment details.
- Recent changes/diff nếu có.
- User constraints.
- Session path.

## Outputs

Output nên bao gồm:

- `INVESTIGATE.md` trong session path nếu đang làm trong repo/session.
- Nếu không có repo/session, trả investigation report trong response.
- Investigation question.
- Status.
- Evidence collected.
- Reproduction result.
- Observed facts.
- Inferences/hypotheses.
- Code path / impact map.
- Root cause nếu đủ evidence.
- Hypotheses còn lại nếu chưa đủ evidence.
- Impact and blast radius.
- Risks.
- Recommendation.
- Next steps.
- Open questions.

## XML Contract

```xml
<Contract>
  <Inputs>Mô tả vấn đề, expected/actual behavior, log/error/reproduction, screenshot, test result, codebase context, config metadata, environment details và session path nếu có.</Inputs>
  <Outputs>INVESTIGATE.md hoặc investigation report gồm question, status, evidence, reproduction, observed facts, hypotheses, code path, impact map, root cause, recommendation, open questions và handoff.</Outputs>
  <Artifacts>INVESTIGATE.md trong session path nếu có; nếu không, trả investigation report trong response.</Artifacts>
  <Safety>Read-only mặc định. Không sửa code nếu chưa được yêu cầu. Không chạy command destructive. Không đọc/copy secret hoặc dữ liệu nhạy cảm nếu chưa có lý do rõ. Không claim root cause khi evidence chưa đủ. Không paste log dài hoặc sensitive output vào artifact.</Safety>
</Contract>
```

## Depth Modes

### Lite Mode

Dùng Lite Mode khi:

- Issue nhỏ.
- Có log/error rõ.
- Chỉ cần phân tích nhanh.
- Không cần lưu `INVESTIGATE.md`.
- Không cần trace sâu codebase.

Lite output:

```markdown
## Investigation Summary

### Question

### Evidence

### Likely Cause

### Impact

### Recommendation

### Need More Evidence
```

### Full Mode

Dùng Full Mode khi:

- Bug phức tạp.
- Cần trace code path.
- Cần reproduce.
- Có nhiều hypothesis.
- Có auth/security/data/infra/config risk.
- Cần tạo `INVESTIGATE.md`.
- Cần handoff sang planning/execution.

Full Mode dùng template `INVESTIGATE.md` ở phần Artifact Template.

## Investigation Status Taxonomy

Luôn ghi trạng thái điều tra bằng một trong các status sau:

| Status | Meaning |
|---|---|
| Root Cause Confirmed | Root cause có evidence đủ mạnh. |
| Likely Root Cause | Root cause rất có khả năng đúng nhưng chưa verify hoàn toàn. |
| Hypotheses Identified | Có hypothesis nhưng chưa đủ evidence để kết luận. |
| Reproduced, Not Root-Caused | Đã reproduce nhưng chưa tìm được nguyên nhân. |
| Not Reproduced | Chưa reproduce được với điều kiện đã thử. |
| Needs More Evidence | Thiếu log/context/env/repro để kết luận. |
| Blocked | Bị chặn bởi access/env/secret/tooling/missing data. |

Không dùng wording mơ hồ như “có vẻ lỗi đâu đó”.

## Evidence Policy

Evidence quan trọng hơn phỏng đoán.

Evidence tốt nên có:

- Source rõ ràng.
- Timestamp nếu liên quan.
- File/path/function/line nếu có.
- Command đã chạy nếu có.
- Input và output ngắn gọn.
- Reproduction condition.
- Result: pass/fail/not reproduced.
- Link hoặc artifact path nếu có.

Không paste:

- Log quá dài.
- Secret/token/password.
- Full database dump.
- PII không cần thiết.
- Command output dài không phục vụ conclusion.

Nếu cần trích log, chỉ trích phần liên quan.

Format:

```markdown
| Evidence ID | Source | Observation | Supports | Confidence |
|---|---|---|---|---|
| E-001 | Error log | `Invalid authentication tag length: 0` occurs on `GET /teachers` | Decryption path receives invalid encrypted payload | High |
```

## Observed vs Inferred

### Observed Facts

Chỉ ghi điều đã thấy trực tiếp từ evidence.

Ví dụ:

```markdown
- `GET /teachers` returns 500 when user `11716` is included in the response.
- Stack trace points to decrypting initial password attribute.
```

### Inferences / Hypotheses

Ghi suy luận dựa trên observed facts.

Ví dụ:

```markdown
- The encrypted password attribute is likely plaintext or malformed for users updated directly in Keycloak.
```

Phải ghi confidence:

- High.
- Medium.
- Low.

Không biến inference thành fact.

## Reproduction Guidelines

Reproduction nên ghi:

- Environment.
- Preconditions.
- Steps.
- Expected result.
- Actual result.
- Result status.
- Evidence.
- Variation tried nếu có.

Format:

```markdown
| Step | Action | Expected | Actual | Result |
|---|---|---|---|---|
| 1 | Open teacher list as school admin | Teacher list loads | 500 error | Failed |
```

Nếu không reproduce được:

```markdown
## Reproduction

Status: Not Reproduced

Tried:
- ...
Result:
- ...

Possible reasons:
- Missing production-like data.
- Different env config.
- Missing user state.
```

Không claim bug fixed nếu chỉ không reproduce được.

## Hypothesis Guidelines

Hypothesis tốt phải:

- Giải thích observed facts.
- Có evidence ủng hộ.
- Có evidence phản bác hoặc unknown.
- Có cách verify tiếp.
- Có confidence.

Format:

```markdown
| ID | Hypothesis | Supporting Evidence | Counter Evidence / Unknown | How To Verify | Confidence |
|---|---|---|---|---|---|
| H-001 | Keycloak direct password reset writes plaintext into an attribute expected to be encrypted | E-001, E-002 | Need sample attribute metadata | Inspect user attribute shape safely | Medium |
```

## Root Cause Standard

Chỉ ghi `Root Cause Confirmed` khi:

- Issue đã reproduce hoặc evidence tương đương đủ mạnh.
- Code path liên quan đã trace.
- Root cause giải thích được actual behavior.
- Alternative hypotheses chính đã bị loại trừ hoặc ít khả năng.
- Có recommendation fix/workaround rõ.

Nếu chưa đạt, dùng `Likely Root Cause` hoặc `Hypotheses Identified`.

Root cause nên trả lời:

- Điều gì sai.
- Sai ở đâu.
- Tại sao xảy ra.
- Khi nào xảy ra.
- Tại sao trước đó không bị hoặc vì sao chỉ ảnh hưởng case cụ thể.
- Impact tới user/system là gì.

## Code Path / Impact Map Guidelines

Khi điều tra codebase, map luồng liên quan:

```markdown
## Code Path / Impact Map

1. UI action / API request:
2. Controller / route:
3. Service / use case:
4. Data access:
5. External dependency:
6. Error/behavior point:
7. Impacted users/features:
```

Hoặc dạng bảng:

```markdown
| Layer | File / Component | Role | Observation |
|---|---|---|---|
| API | `teachers.controller.ts` | Handles `GET /teachers` | Calls service with includeInitialPassword flag |
```

Impact map nên ghi:

- Affected feature.
- Affected users/roles.
- Affected data.
- Affected API/UI.
- Regression risk.
- Security/privacy impact nếu có.

## Command Safety

Investigate mặc định không mutate workspace.

Được phép nếu safe/read-only:

- `ls`, `find`, `grep`, `rg`.
- `git status`, `git diff --name-only`, `git diff --stat`.
- `cat`/read source files không nhạy cảm.
- Run focused tests nếu không mutate external state.
- Run build/typecheck/lint nếu không modify files.
- Query local dev service nếu user cho phép hoặc đã running.

Không chạy mặc định:

- Commands ghi file/generate artifact lớn.
- `npm install`, `pnpm install`, dependency update.
- Migration/seed.
- Deploy.
- Reset/clean/checkout/rebase.
- Delete/rename/move.
- Commands against production data/service.
- Commands có thể leak secret.

Nếu command có side effect, hỏi user hoặc chuyển sang `execution` khi được phép.

## Sensitive Data Policy

Không đọc/copy nội dung nhạy cảm nếu chưa có lý do rõ và approval khi cần:

- `.env`, `.env.*`.
- Private keys/certs.
- Tokens/passwords/credentials.
- Database dumps/backups.
- Production config có secret.
- User PII/customer data.
- Auth/session/cookie/token dumps.
- Payment/financial records.

Nếu log chứa secret/PII:

- Redact.
- Ghi source và observation tối thiểu.
- Không paste raw value.

Nếu phát hiện secret exposure:

- Ghi Critical/Security risk.
- Recommend secret rotation/removal workflow.
- Không tiếp tục paste secret.

## Artifact Template

```markdown
# Investigate

## 1. Question

## 2. Status

- Investigation status:
- Confidence:
- Ready for planning/execution: Yes / No

## 3. Context

## 4. Evidence Collected

| Evidence ID | Source | Observation | Supports | Confidence |
|---|---|---|---|---|

## 5. Reproduction

| Step | Action | Expected | Actual | Result |
|---|---|---|---|---|

## 6. Observed Facts

| Fact | Source |
|---|---|

## 7. Inferences / Hypotheses

| ID | Hypothesis | Supporting Evidence | Counter Evidence / Unknown | How To Verify | Confidence |
|---|---|---|---|---|---|

## 8. Code Path / Impact Map

| Layer | File / Component / System | Role | Observation |
|---|---|---|---|

## 9. Findings

## 10. Root Cause

## 11. Impact / Blast Radius

| Area | Impact | Confidence |
|---|---|---|

## 12. Risks

| Risk | Impact | Mitigation |
|---|---|---|

## 13. Recommendation

### Fix Recommendation

### Workaround

### Next Investigation

## 14. Open Questions

| ID | Question | Owner | Blocking? |
|---|---|---|---|

## 15. Handoff

- Suggested next skill:
- Ready for planning:
- Ready for execution:
- Blocking items:
```

## Finding Format

Findings should be concise and evidence-backed.

```markdown
### Finding I-001: Short title

- Type:
- Evidence:
- Impact:
- Confidence:
- Recommendation:
```

Finding types:

| Type | Meaning |
|---|---|
| Root Cause | Confirmed cause of issue. |
| Likely Cause | Strong hypothesis but needs verification. |
| Contributing Factor | Makes issue worse or easier to trigger. |
| Regression Risk | Could affect existing behavior. |
| Data Issue | Data state causes or contributes to issue. |
| Config Issue | Env/config causes or contributes to issue. |
| External Dependency | Third-party or external service behavior involved. |
| Unknown | Important unknown that blocks conclusion. |

## Workflow

1. Xác định câu hỏi điều tra.
2. Chọn Lite Mode hoặc Full Mode.
3. Xác định session path nếu có.
4. Thu thập context user cung cấp.
5. Kiểm tra sensitive data boundary.
6. Thu thập facts từ artifact/file/log/lệnh read-only.
7. Reproduce nếu có thể và an toàn.
8. Trace code path liên quan.
9. Tách observed facts khỏi inference.
10. Liệt kê hypotheses.
11. Kiểm tra evidence support/counter-evidence cho từng hypothesis.
12. Xác định root cause nếu đủ evidence.
13. Nếu chưa đủ, ghi hypotheses còn lại và cách verify.
14. Ghi impact/blast radius.
15. Ghi risks.
16. Ghi recommendation: fix, workaround, next investigation.
17. Ghi open questions.
18. Handoff sang planning/execution/review hoặc dừng nếu blocked.
19. Lưu `INVESTIGATE.md` nếu Full Mode/session phù hợp.

## Recommendation Guidelines

Recommendation phải phân biệt rõ:

### Fix Recommendation

Dùng khi root cause hoặc likely root cause đã đủ rõ để plan fix.

```markdown
Fix Recommendation:
- Add validation before decrypting stored initial password.
- Treat malformed encrypted values as unavailable instead of throwing 500.
```

### Workaround

Dùng khi có cách giảm tác động mà chưa fix tận gốc.

```markdown
Workaround:
- Avoid editing initial password directly in Keycloak until BE handles malformed attributes safely.
```

### Next Investigation

Dùng khi thiếu evidence.

```markdown
Next Investigation:
- Inspect user attribute shape for one affected and one unaffected account.
- Compare service behavior when includeInitialPasswordForExport is true/false.
```

Không nhảy sang implementation detail quá sâu nếu chưa có plan.

## Impact / Blast Radius Guidelines

Impact nên trả lời:

- Feature nào bị ảnh hưởng.
- User role nào bị ảnh hưởng.
- API/UI nào bị ảnh hưởng.
- Data nào bị ảnh hưởng.
- Environment nào bị ảnh hưởng.
- Có security/privacy risk không.
- Có regression risk nếu fix không.

Format:

```markdown
| Area | Impact | Confidence |
|---|---|---|
| Teacher list | Fails with 500 when affected user is included | High |
| Export initial password | May fail or expose unavailable password state | Medium |
```

## Investigation Handoff

Cuối report phải nói rõ hướng tiếp theo:

| Situation | Suggested Next Skill / Step |
|---|---|
| Root cause confirmed and fix scope clear | `planning` or `execution` |
| Root cause likely but fix requires design | `planning` |
| Requirement/business rule unclear | `business-analysis` |
| Need more codebase/environment facts | continue `investigate` |
| Need repo state refresh before fix | `sync` |
| Fix implemented and needs quality gate | `review` |
| External info needed | `research` |

Format:

```markdown
## Handoff

- Suggested next skill: planning
- Ready for planning: Yes
- Ready for execution: No
- Blocking items: Need product confirmation for malformed initial password behavior.
```

## Session / Artifact Rules

Nếu đang làm trong repo/session:

- Tạo hoặc cập nhật `INVESTIGATE.md` tại session path phù hợp.
- Session path khuyến nghị: `.agents/sessions/<Task-...>/INVESTIGATE.md`.
- Không tự bịa task number nếu project có convention riêng.
- Không ghi secret, PII hoặc output dài nhạy cảm vào artifact.
- Không paste full logs nếu không cần.
- Nếu investigation sinh ra plan/fix idea, không sửa `PLAN.md` trong skill này; recommend chuyển sang planning.

Nếu không có repo/session:

- Trả investigation report trong response.
- Không nói đã lưu file nếu thực tế chưa lưu.

## Output Quality

Investigation output phải:

- Rõ question.
- Rõ status.
- Evidence có source.
- Facts và inference tách riêng.
- Hypothesis có confidence.
- Root cause không bị overclaim.
- Impact map đủ để planning/fix.
- Recommendation phân biệt fix/workaround/next investigation.
- Không lan man sang implementation nếu chưa đủ evidence.
- Không che giấu limitation.
- Không paste sensitive data.

## Checklist Trước Khi Hoàn Tất

Trước khi kết thúc investigation, kiểm tra:

- [ ] Câu hỏi điều tra rõ.
- [ ] Status đã ghi.
- [ ] Evidence đã ghi nguồn.
- [ ] Reproduction result có hoặc ghi rõ không thể reproduce.
- [ ] Facts và inference tách biệt.
- [ ] Hypotheses có evidence và confidence.
- [ ] Root cause chỉ được claim nếu đủ evidence.
- [ ] Code path / impact map có nếu liên quan.
- [ ] Impact / blast radius đã ghi.
- [ ] Recommendation rõ: fix, workaround hoặc next investigation.
- [ ] Open questions có owner/blocking nếu biết.
- [ ] Sensitive data đã được tránh/redact.
- [ ] Không sửa code trong phase investigate nếu chưa được yêu cầu.
- [ ] `INVESTIGATE.md` đã lưu nếu Full Mode/session phù hợp.

## Limitations

- Skill này không đảm bảo có fix.
- Skill này không thay thế execution plan nếu cần sửa code.
- Skill này không thay thế review sau khi sửa.
- Skill này không thay thế security audit chuyên sâu.
- Skill này không kết luận chắc nếu thiếu evidence.
- Skill này không tự sửa code nếu user chưa yêu cầu.
- Skill này không đọc secret/PII nếu không có lý do rõ và approval phù hợp.

## References

- [Google SRE Book: Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)
- [Google SRE Book: Practical Alerting](https://sre.google/sre-book/practical-alerting/)
- [Martin Fowler: Fault Tolerance](https://martinfowler.com/articles/patterns-of-distributed-systems/)
- [Git Bisect Documentation](https://git-scm.com/docs/git-bisect)
- [Git Blame Documentation](https://git-scm.com/docs/git-blame)
- [OWASP Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
