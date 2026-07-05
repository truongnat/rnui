---
name: brainstorming
description: Làm rõ mục tiêu, phạm vi, constraint, lựa chọn, trade-off, risk và recommendation trước planning/implementation. Dùng khi task mới còn mơ hồ, có nhiều hướng giải quyết, cần DISCUSSION.md, cần chốt scope, cần align trước khi planning, hoặc cần phân tích trade-off giữa các phương án.
---

# Brainstorming

## Mục Đích

Biến yêu cầu ban đầu thành một hướng làm rõ ràng trước khi planning hoặc implementation.

Skill này tập trung vào:

- Làm rõ goal và expected outcome.
- Tách facts, assumptions và unknowns.
- Xác định constraint, scope, out-of-scope và non-goals.
- Phân tích các hướng giải quyết khả thi.
- So sánh trade-off giữa các lựa chọn.
- Xác định rủi ro, điểm chưa chắc chắn và cách verify.
- Đưa ra recommendation có lý do rõ ràng.
- Chuẩn bị handoff sang planning, technical design, business analysis hoặc implementation.

Mục tiêu cuối cùng là giúp team chốt được hướng đi nhỏ nhất, rõ nhất và có thể kiểm chứng trước khi đầu tư effort lớn hơn.

## Khi Dùng

Dùng skill này khi:

- Bắt đầu một task mới nhưng mục tiêu, scope, constraint hoặc hướng giải quyết chưa rõ.
- Người dùng muốn thảo luận ý tưởng trước khi implement.
- Có nhiều hướng làm và cần phân tích trade-off.
- Cần chốt scope trước khi planning.
- Cần xác định in-scope, out-of-scope hoặc non-goals.
- Cần phác thảo success criteria trước khi chuyển sang planning hoặc business analysis.
- Cần tạo hoặc cập nhật `DISCUSSION.md`.
- Cần align giữa các lựa chọn về product, UX, technical direction hoặc workflow.
- Cần quyết định hướng MVP, prototype, proof of concept hoặc phased delivery.
- Cần làm rõ rủi ro, assumption hoặc unknown trước khi làm task chi tiết.

## Khi Không Dùng

Không dùng skill này khi:

- Task nhỏ, scope rõ và có thể sửa trực tiếp mà không cần discussion.
- Task đã có `DISCUSSION.md` đầy đủ và người dùng yêu cầu execution.
- Task đã có requirement/spec rõ và chỉ cần planning chi tiết.
- Người dùng yêu cầu code review, debug hoặc điều tra lỗi cụ thể.
- Người dùng yêu cầu sửa nhỏ như typo, copy, style, import hoặc config đơn giản.
- Người dùng yêu cầu implement ngay và ambiguity thấp.
- Người dùng cần phân tích requirement nghiệp vụ chi tiết; dùng `business-analysis`.
- Người dùng cần thiết kế kiến trúc kỹ thuật chi tiết; dùng `technical-design` hoặc skill tương ứng nếu có.
- Người dùng cần research external source sâu; dùng `research`.

## Inputs

Skill có thể nhận các loại input sau:

- Yêu cầu ban đầu của người dùng.
- Context repo liên quan nếu có.
- Existing documents như README, issue, ticket, spec, notes.
- Constraint về scope, thời gian, công nghệ, ngân sách, platform hoặc artifact.
- Existing implementation hoặc current behavior nếu có.
- Desired outcome hoặc pain point.
- Stakeholder feedback nếu có.
- Các lựa chọn user đang phân vân.
- Ràng buộc về model/tool/workflow nếu có.

## Outputs

Output nên bao gồm một trong hai dạng:

### Lite Output

Dùng khi task vừa hoặc nhỏ, ambiguity không quá cao, không cần tạo file discussion dài.

Lite output gồm:

- Goal.
- Key facts.
- Scope.
- Recommendation.
- Open questions nếu có.
- Suggested next step.

### Full Output

Dùng khi task lớn, nhiều lựa chọn, nhiều rủi ro, cần align hoặc cần lưu `DISCUSSION.md`.

Full output gồm:

- `DISCUSSION.md` trong session path nếu đang làm trong repo/session.
- Nếu không có repo/session, trả về discussion artifact trong response.
- Goal và desired outcome.
- Facts, assumptions và unknowns.
- Constraints.
- Scope, out-of-scope và non-goals.
- Success criteria hoặc draft acceptance signals.
- Options considered.
- Trade-off matrix.
- Recommendation.
- Risks và mitigation.
- Decision log nếu có.
- Handoff to planning hoặc next skill.

## XML Contract

```xml
<Contract>
  <Inputs>Yêu cầu ban đầu, context repo, existing documents, constraints, current behavior, desired outcome và stakeholder feedback nếu có.</Inputs>
  <Outputs>Lite discussion hoặc full DISCUSSION.md gồm goal, facts, assumptions, unknowns, constraints, scope, options, trade-offs, recommendation, risks, open questions và handoff to planning.</Outputs>
  <Artifacts>DISCUSSION.md trong session path nếu có; nếu không, trả về discussion artifact trong response.</Artifacts>
  <Safety>Không implement code trong phase brainstorming. Không tự chốt assumption thành fact. Không tạo planning chi tiết khi chưa có recommendation rõ. Không tạo artifact phụ lớn nếu user chưa yêu cầu hoặc chưa cần thiết.</Safety>
</Contract>
```

## Depth Modes

### Lite Mode

Dùng Lite Mode khi:

- Task nhỏ hoặc vừa.
- Ambiguity thấp đến trung bình.
- Chỉ cần chốt hướng nhanh.
- Không cần lưu `DISCUSSION.md`.
- Không có nhiều hơn 2 lựa chọn đáng kể.

Lite Mode output:

```markdown
## Brainstorming Lite

### Goal

### Confirmed Facts

### Scope

### Recommendation

### Open Questions

### Suggested Next Step
```

### Full Mode

Dùng Full Mode khi:

- Task lớn.
- Có nhiều hướng giải quyết.
- Có rủi ro cao.
- Có nhiều stakeholder hoặc actor.
- Có dependency với repo, data, workflow hoặc architecture.
- Cần lưu `DISCUSSION.md`.
- User yêu cầu brainstorm kỹ, discussion, align, scope hoặc trade-off.

Full Mode output dùng template `DISCUSSION.md` ở phần Artifact Template.

## Interaction Modes

Các mode dưới đây là cách phản hồi, không mặc định là command/tool thật trong codebase.

- `Ask`: dùng khi thiếu thông tin làm thay đổi đáng kể direction, scope hoặc risk.
- `Visualize`: dùng khi vấn đề phức tạp cần diagram, flow, decision tree hoặc option map. Chỉ hỏi xác nhận nếu visualization tạo artifact phụ lớn hoặc nằm ngoài yêu cầu ban đầu.
- `Generate`: dùng để tạo bản nháp ý tưởng, option, pseudo-code hoặc tài liệu. Không sửa source code, không tạo patch implementation, không chạy command implement.
- `Recommend`: dùng khi đủ thông tin để đề xuất hướng đi rõ ràng.
- `Defer`: dùng khi cần chuyển sang skill khác như `business-analysis`, `planning`, `technical-design`, `research` hoặc `execution`.

## Clarification Policy

- Hỏi user khi thiếu thông tin có thể làm thay đổi đáng kể direction, scope, cost, risk hoặc architecture.
- Không hỏi nếu có thể proceed bằng assumption an toàn.
- Nếu tự assume, ghi assumption rõ ràng.
- Ưu tiên hỏi tối đa 1–3 câu quan trọng.
- Không hỏi danh sách dài nếu vẫn có thể tạo best-effort discussion.
- Nếu user yêu cầu làm ngay, tạo best-effort output và ghi rõ unknowns.
- Nếu câu hỏi mở đang blocking planning/implementation, đánh dấu `Blocking = Yes`.

## Operating Principles

- Không nhảy thẳng vào implement khi scope còn mơ hồ.
- Ưu tiên hướng nhỏ nhất giải quyết được mục tiêu.
- Recommendation phải đi kèm lý do, trade-off và cách verify.
- Unknown phải được ghi rõ, không giấu trong assumption.
- Facts, assumptions và unknowns phải được tách riêng.
- Scope, out-of-scope và non-goals phải được tách riêng.
- Không over-engineer discussion cho task nhỏ.
- Không tạo `DISCUSSION.md` dài nếu Lite Mode là đủ.
- Nếu có nhiều option, dùng option matrix.
- Nếu uncertainty cao, ưu tiên phương án dễ rollback hoặc dễ verify.
- Nếu provider hỗ trợ chọn model, ưu tiên model reasoning mạnh hơn cho brainstorming khó hoặc mơ hồ.
- Không giả định `Ask`, `Visualize`, `Generate`, `Recommend`, `Defer` là command đã tồn tại trong `tools/`.
- Không lan man sang planning chi tiết hoặc implementation khi chưa chốt direction.

## Workflow

1. Xác định task có cần brainstorming không.
2. Chọn Lite Mode hoặc Full Mode.
3. Xác định hoặc tạo session id nếu đang làm trong repo/session.
4. Restate yêu cầu bằng ngôn ngữ cụ thể.
5. Xác định goal và desired outcome.
6. Tách confirmed facts, assumptions và unknowns.
7. Xác định constraints: time, platform, tech stack, budget, tool, artifact, quality bar.
8. Xác định in-scope, out-of-scope và non-goals.
9. Xác định success criteria hoặc draft acceptance signals.
10. Xác định decision criteria: simplicity, speed, maintainability, cost, UX, risk, reversibility, testability.
11. Liệt kê các hướng giải quyết khả thi.
12. So sánh trade-off theo decision criteria.
13. Chọn recommendation tối giản nhất có thể kiểm chứng.
14. Ghi lý do không chọn các option còn lại nếu quan trọng.
15. Ghi risks và mitigation.
16. Ghi open questions.
17. Ghi điều kiện chuyển sang planning hoặc skill tiếp theo.
18. Ghi `DISCUSSION.md` nếu Full Mode và đang có session/repo phù hợp.

## Decision Criteria

Khi so sánh option, ưu tiên các tiêu chí sau nếu phù hợp:

| Criteria | Meaning |
|---|---|
| Simplicity | Phương án có đơn giản để hiểu, build và maintain không. |
| Speed | Có nhanh để thử hoặc deliver không. |
| User Value | Có giải quyết đúng pain point chính không. |
| Risk | Có rủi ro kỹ thuật, sản phẩm, dữ liệu hoặc vận hành không. |
| Cost | Có tốn chi phí tool, infra, API, thời gian hoặc nhân lực không. |
| Maintainability | Có dễ mở rộng và bảo trì không. |
| Reversibility | Nếu sai có rollback hoặc đổi hướng dễ không. |
| Testability | Có dễ verify bằng test, demo, metric hoặc stakeholder review không. |
| Integration Impact | Có ảnh hưởng nhiều tới hệ thống hiện tại không. |
| Dependency | Có phụ thuộc bên thứ ba, team khác hoặc dữ liệu chưa chắc chắn không. |

Không cần dùng tất cả criteria. Chỉ chọn các criteria có tác động thật sự tới decision.

## Template Quality

`DISCUSSION.md` phải:

- Clear, concise, scannable và decision-oriented.
- Có recommendation ở phần dễ thấy.
- Có option matrix nếu có từ 2 option trở lên.
- Có facts, assumptions và unknowns tách riêng.
- Có scope boundary rõ.
- Có success criteria hoặc draft acceptance signals.
- Có risks và mitigation nếu task có rủi ro.
- Có handoff sang planning rõ ràng.
- Không viết mở bài dài.
- Không biến discussion thành bài luận.
- Không lan man sang implementation detail nếu chưa cần.

## Artifact Template

```markdown
# Discussion

## 1. Goal

## 2. Desired Outcome

## 3. Context / Confirmed Facts

## 4. Constraints

| Constraint | Details | Impact |
|---|---|---|

## 5. Assumptions

| ID | Assumption | Risk If Wrong | Needs Confirmation? |
|---|---|---|---|

## 6. Unknowns / Open Questions

| ID | Question | Owner | Blocking? |
|---|---|---|---|

## 7. Scope

### In Scope

### Out of Scope

### Non-Goals

## 8. Success Criteria / Draft Acceptance Signals

| ID | Signal | How To Verify |
|---|---|---|

## 9. Decision Criteria

| Criteria | Why It Matters |
|---|---|

## 10. Options Considered

| Option | Summary | Pros | Cons | Effort | Risk | Reversibility | Verify Method |
|---|---|---|---|---|---|---|---|

## 11. Recommendation

### Recommended Option

### Why This Option

### Why Not The Alternatives

### Confidence

High / Medium / Low

## 12. Risks

| Risk | Impact | Mitigation |
|---|---|---|

## 13. Decision Log

| Decision | Reason | Date / Context |
|---|---|---|

## 14. Handoff To Planning

- Recommended direction:
- First planning target:
- Suggested first task:
- Blocking questions:
- Required artifacts:
- Suggested next skill:
```

## Option Matrix Guidelines

Khi có từ 2 option trở lên, dùng bảng option matrix.

Format khuyến nghị:

```markdown
| Option | Summary | Pros | Cons | Effort | Risk | Reversibility | Verify Method |
|---|---|---|---|---|---|---|---|
| Option A | ... | ... | ... | Low/Med/High | Low/Med/High | Easy/Medium/Hard | ... |
```

Option tốt nên:

- Có summary ngắn.
- Có pros/cons cụ thể.
- Có effort tương đối.
- Có risk tương đối.
- Có reversibility.
- Có verify method.
- Không chỉ liệt kê option mà không có comparison.

## Recommendation Format

Recommendation phải gồm:

- Recommended option.
- Lý do chọn option này.
- Vì sao không chọn các option còn lại nếu quan trọng.
- Minimum viable next step.
- Verification method.
- Confidence level: High / Medium / Low.

Format khuyến nghị:

```markdown
## Recommendation

Recommend Option B: Build a minimal prototype first.

Reason:
- Lowest implementation risk.
- Fastest to verify the key UX assumption.
- Easy to discard if wrong.

Not choosing Option A because it requires full architecture before validating the user flow.

Confidence: Medium.

Next step:
Move to planning with a small proof-of-concept task.
```

## Success Criteria Guidelines

Brainstorming không cần acceptance criteria chi tiết như business-analysis hoặc planning, nhưng nên có success criteria sơ bộ.

Success criteria tốt nên:

- Nói rõ điều gì chứng minh hướng này đúng.
- Có thể verify bằng demo, test, metric hoặc stakeholder review.
- Không quá chi tiết ở mức implementation.
- Không dùng wording mơ hồ như “đẹp”, “nhanh”, “xịn” nếu không có tín hiệu kiểm chứng.

Ví dụ:

```markdown
| ID | Signal | How To Verify |
|---|---|---|
| SC-001 | User can complete the main flow without manual setup | Demo the happy path end-to-end |
| SC-002 | The chosen approach can be rolled back safely | Verify no irreversible data migration is needed |
```

## Scope Guidelines

Scope phải tách rõ:

### In Scope

Những việc sẽ làm hoặc sẽ phân tích trong hướng hiện tại.

### Out of Scope

Những việc không làm trong phase hiện tại nhưng có thể làm ở phase sau.

### Non-Goals

Những mục tiêu cố tình không theo đuổi, kể cả trong tương lai gần.

Ví dụ:

```markdown
### In Scope

- Build a minimal prototype for local validation.
- Support one happy path.

### Out of Scope

- Multi-tenant production deployment.
- Full analytics dashboard.

### Non-Goals

- Do not optimize for enterprise scale in the first prototype.
```

## Risks Guidelines

Risk phải gắn với impact và mitigation.

Format khuyến nghị:

```markdown
| Risk | Impact | Mitigation |
|---|---|---|
| External API may rate-limit requests | Prototype may fail under real usage | Mock API first, then test with small quota |
```

Không viết risk chung chung như:

```markdown
- There may be technical issues.
```

Viết lại thành:

```markdown
- Risk: The browser extension may not be able to access required page context due to permission limits.
- Impact: The proposed workflow may not work on all websites.
- Mitigation: Validate with a small extension prototype on 2 target websites before planning the full app.
```

## Handoff Guidelines

Cuối discussion phải chỉ ra bước tiếp theo.

Các hướng handoff phổ biến:

| Situation | Suggested Next Skill / Step |
|---|---|
| Requirement nghiệp vụ còn mơ hồ | `business-analysis` |
| Đã chốt hướng, cần chia task | `planning` |
| Cần kiến trúc kỹ thuật | `technical-design` |
| Cần nghiên cứu thông tin ngoài | `research` |
| Cần test strategy | `qa-test-design` |
| Task nhỏ, direction đã rõ | implementation / execution |
| Có nhiều visual flow | diagram / visualization |

Handoff nên ghi:

- Recommended direction.
- First planning target.
- Suggested first task.
- Blocking questions.
- Required artifacts.
- Suggested next skill.

## Session / Artifact Rules

Nếu đang làm trong repo/session:

- Tạo hoặc cập nhật `DISCUSSION.md` tại session path phù hợp.
- Session path khuyến nghị: `.agents/sessions/<Task-...>/DISCUSSION.md`.
- Không tự bịa `Task-<number>` nếu hệ thống đã có convention cấp số riêng.
- Nếu chưa có số task, dùng short descriptive slug hoặc hỏi/ghi assumption theo project convention.
- Không ghi file nếu user chỉ cần discussion nhanh trong response.
- Không tạo nhiều artifact phụ nếu chưa cần.

Nếu không có repo/session:

- Trả discussion artifact trong response.
- Không giả định có filesystem.
- Không nói đã lưu file nếu thực tế chưa lưu.

## Checklist Trước Khi Hoàn Tất

Trước khi kết thúc output, kiểm tra:

- [ ] Đã xác định Lite Mode hoặc Full Mode.
- [ ] Goal đã được restate rõ.
- [ ] Desired outcome rõ.
- [ ] Facts, assumptions và unknowns đã tách riêng.
- [ ] Constraints đã ghi nếu có.
- [ ] Scope, out-of-scope và non-goals đã có nếu task đủ lớn.
- [ ] Success criteria hoặc draft acceptance signals có nếu cần.
- [ ] Ít nhất một hướng đề xuất đã được phân tích.
- [ ] Nếu có nhiều option, đã có option matrix.
- [ ] Recommendation có lý do và trade-off.
- [ ] Recommendation có confidence level.
- [ ] Risk và mitigation đã ghi nếu có.
- [ ] Open questions rõ và không quá chung chung.
- [ ] Handoff to planning hoặc next step rõ.
- [ ] `DISCUSSION.md` chỉ được lưu nếu thật sự có session/repo và Full Mode phù hợp.

## Limitations

- Skill này không implement code.
- Skill này không thay thế planning chi tiết.
- Skill này không thay thế business analysis chi tiết.
- Skill này không thay thế technical design chi tiết.
- Skill này không thay thế research khi cần external source sâu.
- Skill này không tự xác nhận assumption.
- Skill này không quyết định thay stakeholder khi thiếu thông tin quan trọng.
- Skill này không nên tạo artifact dài cho task nhỏ, scope rõ.

## References

- [Brainstorming Techniques](https://asana.com/resources/brainstorming-techniques)
- [Design Thinking Process Guide](https://web.stanford.edu/~mshanks/MichaelShanks/files/509554.pdf)
- [Design Thinking Overview](https://www.interaction-design.org/literature/topics/design-thinking)
- [How Might We Questions](https://www.designkit.org/methods/how-might-we)
- [Decision Matrix](https://asana.com/resources/decision-matrix)
