---
name: research
description: Nghiên cứu nội bộ hoặc external trước khi ra quyết định kỹ thuật/sản phẩm. Dùng khi cần RESEARCH.md, source-backed findings, freshness check, API/framework docs, product/technical comparison, evidence matrix, recommendation có citation, caveats và residual risks.
---

# Research

## Mục Đích

Thu thập, kiểm chứng và tổng hợp bằng chứng để hỗ trợ quyết định kỹ thuật, sản phẩm hoặc vận hành.

Skill này tập trung vào:

- Xác định research question và decision cần hỗ trợ.
- Xác định source strategy.
- Phân biệt local evidence, external evidence, facts, inference và opinion.
- Ưu tiên nguồn chính thống/primary sources khi nghiên cứu technical/API/framework.
- Kiểm tra freshness với thông tin có thể thay đổi.
- So sánh lựa chọn bằng evidence matrix.
- Ghi recommendation có confidence, caveats và residual risks.
- Tạo `RESEARCH.md` để handoff sang brainstorming, planning, technical design hoặc execution.

Mục tiêu cuối cùng là tránh quyết định dựa trên nhớ mơ hồ, nguồn yếu hoặc thông tin stale.

## Khi Dùng

Dùng skill này khi:

- Người dùng yêu cầu nghiên cứu trước khi implement.
- Cần tìm thông tin mới hoặc có thể đã thay đổi.
- Cần kiểm tra tài liệu chính thống của API/framework/library/tool.
- Cần so sánh lựa chọn kỹ thuật.
- Cần so sánh sản phẩm/tool/platform.
- Cần kiểm tra compatibility, pricing, limits, licensing, support status hoặc docs mới.
- Cần product research, market research hoặc competitor research.
- Cần source-backed recommendation.
- Cần tạo hoặc cập nhật `RESEARCH.md`.
- Cần tổng hợp local docs/code với external sources.
- Cần đánh giá caveats, residual risks hoặc uncertainty.
- Cần quyết định nên dùng hướng nào dựa trên evidence.

## Khi Không Dùng

Không dùng skill này khi:

- Câu trả lời đã có rõ trong repo và không cần freshness.
- Task chỉ cần execution theo plan.
- Task chỉ cần review PR hoặc diff; dùng `review-pr`.
- Task là debug cụ thể dựa trên log/codebase; dùng `investigate`.
- User chỉ cần brainstorming ý tưởng không cần source.
- User chỉ cần planning từ requirement đã rõ.
- User yêu cầu implement ngay và đã có source/decision đủ rõ.
- User đã yêu cầu không dùng external sources.
- Nghiên cứu yêu cầu tư vấn pháp lý/tài chính/y tế chuyên nghiệp thay cho chuyên gia.

## Research Readiness Gate

Trước khi research, kiểm tra:

- Research question là gì.
- Decision cần hỗ trợ là gì.
- Output mong muốn là answer ngắn, comparison, recommendation hay `RESEARCH.md`.
- Cần local evidence không.
- Cần external evidence không.
- Thông tin có thể stale không.
- Có yêu cầu nguồn chính thống không.
- Có constraint về thời gian, độ sâu, ngôn ngữ, khu vực, budget, license, platform không.
- Có lĩnh vực high-stakes không.
- Có cần citation bắt buộc không.

Nếu question quá rộng:

- Thu hẹp thành sub-questions.
- Tạo source strategy.
- Không hỏi quá nhiều nếu vẫn có thể research best-effort.

Nếu thiếu constraint quan trọng có thể làm recommendation sai:

- Ghi assumption hoặc hỏi 1–3 câu quan trọng.
- Nếu user cần kết quả ngay, proceed best-effort và ghi caveats.

## Inputs

Skill có thể nhận các loại input sau:

- Research question.
- Decision cần hỗ trợ.
- Local docs/code nếu có.
- Existing notes/spec.
- External source constraints.
- Tool/framework/library names.
- Version/runtime/platform constraints.
- Budget/pricing constraints.
- Compatibility requirements.
- Security/compliance constraints.
- User constraints về source quality hoặc depth.
- Time sensitivity/freshness requirement.
- Preferred output format.
- Session path.

## Outputs

Output nên bao gồm:

- `RESEARCH.md` trong session path nếu đang làm trong repo/session.
- Nếu không có repo/session, trả research report trong response.
- Research question.
- Decision context.
- Source strategy.
- Source quality notes.
- Local evidence nếu có.
- External evidence nếu có.
- Findings có evidence.
- Comparison matrix nếu có nhiều option.
- Facts vs inference.
- Recommendation.
- Confidence level.
- Caveats.
- Residual risks.
- Open questions.
- Handoff / next step.

## XML Contract

```xml
<Contract>
  <Inputs>Research question, decision context, local evidence, external source constraints, freshness requirement, quality bar và session path nếu có.</Inputs>
  <Outputs>RESEARCH.md hoặc research report gồm source strategy, local evidence, external evidence, findings, comparison, recommendation, confidence, caveats, residual risks và handoff.</Outputs>
  <Artifacts>RESEARCH.md trong session path nếu có; nếu không, trả research report trong response.</Artifacts>
  <Safety>Không bịa citation. Không copy dài nội dung nguồn. Không dùng nguồn stale cho quyết định cần thông tin mới. Không trình bày inference như fact. Không bỏ qua caveats/residual risks. Không thay thế chuyên gia pháp lý/tài chính/y tế khi vấn đề high-stakes.</Safety>
</Contract>
```

## Depth Modes

### Lite Mode

Dùng Lite Mode khi:

- Câu hỏi hẹp.
- Chỉ cần vài nguồn.
- Không cần lưu `RESEARCH.md`.
- Không có nhiều option.
- Không high-stakes.
- User cần answer nhanh.

Lite output:

```markdown
## Research Summary

### Question

### Key Findings

### Recommendation

### Caveats / Risks

### Sources
```

### Full Mode

Dùng Full Mode khi:

- Câu hỏi lớn hoặc nhiều nhánh.
- Có nhiều lựa chọn cần so sánh.
- Có technical/API/framework decision quan trọng.
- Có pricing/license/security/compliance risk.
- Cần tạo `RESEARCH.md`.
- Cần handoff sang planning/technical design.
- User yêu cầu nghiên cứu kỹ.

Full Mode dùng template `RESEARCH.md` ở phần Artifact Template.

## Source Strategy

Source strategy phải nói rõ sẽ dùng loại nguồn nào và vì sao.

Ưu tiên nguồn theo thứ tự:

1. Official documentation / primary source.
2. Standards/specification/RFC nếu liên quan.
3. Vendor docs hoặc release notes chính thức.
4. Source repository, changelog, issue tracker chính thức.
5. Academic paper hoặc credible technical publication.
6. Reputable engineering blog.
7. Reputable comparison/review source.
8. Community discussion chỉ dùng để hiểu pain point, không dùng làm source quyết định duy nhất.

Với technical questions:

- Ưu tiên official docs.
- Nếu source không phải official, ghi rõ vai trò phụ trợ.
- Không dựa vào blog cũ nếu docs mới có thông tin khác.

Với product/tool comparison:

- Dùng official docs/pricing cho facts.
- Dùng review/community cho experience signals.
- Tách claim marketing khỏi fact kiểm chứng được.

Với current information:

- Check freshness.
- Ghi ngày truy cập hoặc version/date nếu có.
- Không dùng knowledge cũ khi thông tin có thể đổi.

## Source Quality Levels

Phân loại nguồn nếu research đủ lớn:

| Level | Source Type | Trust |
|---|---|---|
| Primary | Official docs, specs, release notes, source repo | Highest |
| Secondary | Reputable engineering articles, vendor-neutral guides | Medium |
| Community | GitHub issues, Stack Overflow, Reddit, forums | Context only |
| Marketing | Landing pages, sales pages | Use carefully |
| Unknown | Unclear author/date/source | Avoid or mark low confidence |

Không dùng nguồn chất lượng thấp để support claim quan trọng nếu có nguồn tốt hơn.

## Citation / Evidence Rules

- Không bịa citation, URL, version hoặc quote.
- Mỗi factual claim quan trọng phải có evidence.
- Với external source, ghi citation/source link.
- Với local evidence, ghi file path hoặc artifact path nếu có.
- Không copy dài nội dung nguồn.
- Paraphrase ngắn, chỉ quote khi cần và giữ quote ngắn.
- Nếu nguồn mâu thuẫn, ghi rõ conflict.
- Nếu không tìm thấy evidence, ghi là unknown.
- Không ghi “the docs say” nếu chưa đọc docs.
- Không dùng source không fetch/read được làm evidence chính nếu nội dung không xác minh được.

## Freshness Policy

Bắt buộc kiểm tra freshness khi thông tin có thể thay đổi, ví dụ:

- API/framework/library version.
- Pricing/limits/quota.
- Product availability.
- Cloud service behavior.
- Legal/regulatory/compliance.
- Security vulnerabilities.
- Model/tool capabilities.
- SaaS features.
- App store policies.
- Browser/platform support.
- Performance benchmark.
- Current best practices.
- Active project maintenance.

Freshness notes nên ghi:

```markdown
- Source date:
- Version:
- Last updated:
- Accessed:
- Freshness risk:
```

Nếu không rõ freshness:

- Ghi caveat.
- Giảm confidence.
- Recommend verification trước implementation.

## Local Evidence First Policy

Nếu research liên quan repo/project hiện tại:

1. Đọc local docs/spec nếu có.
2. Đọc relevant config/package/version nếu cần.
3. Xác định current implementation constraints.
4. Sau đó mới đối chiếu external docs.

Ví dụ:

- Không recommend Next.js feature nếu repo đang dùng version không support.
- Không recommend library nếu project package manager/runtime không phù hợp.
- Không recommend migration lớn nếu codebase hiện tại có constraint rõ.

## Facts vs Inference

Research output phải tách:

### Facts

Điều có source/evidence trực tiếp.

```markdown
- Fact: The official docs state that feature X is available from version Y.
```

### Inference

Suy luận dựa trên facts.

```markdown
- Inference: Since this repo uses version Y-1, feature X is likely unavailable without upgrade.
```

### Opinion / Recommendation

Đánh giá của agent dựa trên evidence.

```markdown
- Recommendation: Use option B because it meets the platform constraint with lower migration risk.
```

Không trình bày inference hoặc opinion như fact.

## Comparison Guidelines

Khi có nhiều option, dùng comparison matrix.

Format khuyến nghị:

```markdown
| Criteria | Option A | Option B | Option C | Notes |
|---|---|---|---|---|
| Compatibility | ... | ... | ... | ... |
| Cost | ... | ... | ... | ... |
| Complexity | ... | ... | ... | ... |
| Risk | ... | ... | ... | ... |
| Evidence | ... | ... | ... | ... |
```

Criteria thường dùng:

- Compatibility.
- Implementation complexity.
- Maintenance cost.
- Runtime cost.
- Performance.
- Security.
- Vendor lock-in.
- Community/support.
- License.
- Maturity.
- Migration effort.
- Testability.
- Reversibility.
- Fit with existing architecture.

Không so sánh quá nhiều option nếu không cần. Ưu tiên 2–4 option tốt nhất.

## Recommendation Confidence

Recommendation phải có confidence:

| Confidence | Meaning |
|---|---|
| High | Evidence mạnh, source tốt, ít caveat, decision khá rõ. |
| Medium | Evidence đủ dùng nhưng còn caveat hoặc cần verify local. |
| Low | Evidence thiếu/mâu thuẫn/stale hoặc constraint chưa rõ. |

Format:

```markdown
Recommendation: Option B
Confidence: Medium

Reason:
- ...
Caveats:
- ...
```

## Artifact Template

```markdown
# Research

## 1. Question

## 2. Decision Context

## 3. Research Status

- Status:
- Confidence:
- Freshness risk:

## 4. Source Strategy

| Source Type | Purpose | Notes |
|---|---|---|

## 5. Sources Reviewed

| ID | Source | Type | Date / Version | Relevance | Notes |
|---|---|---|---|---|---|

## 6. Local Evidence

| Evidence ID | Source | Finding | Impact |
|---|---|---|---|

## 7. External Evidence

| Evidence ID | Source | Finding | Impact |
|---|---|---|---|

## 8. Key Findings

| Finding | Evidence | Confidence |
|---|---|---|

## 9. Comparison Matrix

| Criteria | Option A | Option B | Option C | Notes |
|---|---|---|---|---|

## 10. Facts vs Inference

### Facts

### Inferences

### Opinions / Judgement

## 11. Recommendation

- Recommended option:
- Confidence:
- Why:
- Why not alternatives:

## 12. Caveats

| Caveat | Impact | Mitigation |
|---|---|---|

## 13. Residual Risks

| Risk | Impact | Suggested Follow-up |
|---|---|---|

## 14. Open Questions

| ID | Question | Owner | Blocking? |
|---|---|---|---|

## 15. Handoff

- Suggested next skill:
- Ready for planning:
- Ready for execution:
- Required verification:
```

## Research Status Taxonomy

Use one of:

| Status | Meaning |
|---|---|
| Complete | Enough evidence to make recommendation. |
| Complete with Caveats | Enough evidence, but caveats/residual risks remain. |
| Partial | Some evidence found, but research question not fully answered. |
| Conflicting Evidence | Reliable sources disagree or docs are inconsistent. |
| Needs Freshness Check | Current info required but not verified. |
| Needs Local Verification | External evidence found, but local compatibility must be checked. |
| Blocked | Access/source/context limitation prevents useful conclusion. |

## Workflow

1. Xác định research có cần thiết không.
2. Chọn Lite Mode hoặc Full Mode.
3. Xác định research question.
4. Xác định decision cần hỗ trợ.
5. Xác định constraints và freshness requirement.
6. Xác định source strategy.
7. Đọc local evidence trước nếu research liên quan repo/project.
8. Thu thập external evidence từ nguồn phù hợp.
9. Ưu tiên primary/official sources.
10. Kiểm tra freshness với thông tin có thể thay đổi.
11. Ghi sources reviewed.
12. Tổng hợp key findings, không copy dài.
13. Tách facts, inference và opinion/recommendation.
14. Nếu nhiều option, tạo comparison matrix.
15. Ghi recommendation và confidence.
16. Ghi caveats và residual risks.
17. Ghi open questions.
18. Handoff sang planning/technical design/execution hoặc research tiếp.
19. Lưu `RESEARCH.md` nếu Full Mode/session phù hợp.

## Technical Research Rules

Với API/framework/library/tool:

- Dùng official docs làm nguồn chính.
- Check version compatibility.
- Check deprecation notes.
- Check migration guide nếu thay đổi version/approach.
- Check runtime/platform support.
- Check security implications.
- Check licensing nếu dependency mới.
- Check project local version nếu có repo.
- Không recommend feature nếu version hiện tại không support.
- Không dùng blog thay official docs nếu docs trả lời trực tiếp.

## Product / Tool Research Rules

Với product/tool comparison:

- Check official feature/pricing/limits.
- Check platform support.
- Check export/import/lock-in.
- Check API availability.
- Check privacy/security posture nếu liên quan.
- Check user reviews/community only as supporting signal.
- Separate marketing claims from verified facts.
- Ghi caveat nếu pricing/limits có thể đổi.

## Security / Compliance Research Rules

Với security/compliance:

- Ưu tiên official standards, vendor security docs, OWASP, NIST, CIS, RFC hoặc official advisories.
- Không dựa vào blog ngẫu nhiên cho security-critical decision.
- Ghi rõ scope limitation.
- Không đưa hướng dẫn gây rủi ro hoặc bypass bảo mật.
- Nếu high-stakes, recommend security review chuyên sâu.

## Legal / Finance / Medical Caveat

Nếu research chạm tới legal/finance/medical:

- Không thay thế chuyên gia.
- Dùng nguồn chính thống.
- Ghi caveat rõ.
- Tránh khẳng định chắc chắn nếu policy/law/regulation có thể thay đổi.
- Recommend professional review nếu decision high-stakes.

## Conflict Handling

Nếu nguồn mâu thuẫn:

1. Ghi rõ nguồn nào nói gì.
2. Ưu tiên primary/current source.
3. Kiểm tra version/date.
4. Ghi confidence thấp hơn nếu chưa resolve.
5. Recommend verification step.

Format:

```markdown
| Conflict | Source A | Source B | Likely Resolution | Confidence |
|---|---|---|---|---|
```

## Residual Risk Guidelines

Residual risk là rủi ro còn lại sau research.

Ví dụ:

```markdown
| Risk | Impact | Suggested Follow-up |
|---|---|---|
| Pricing page may change after research date | Cost estimate may become inaccurate | Re-check pricing before purchase |
| External docs say feature is supported, but local repo version is older | Implementation may fail without upgrade | Verify local package version before planning |
```

## Handoff Guidelines

Cuối research phải chỉ ra bước tiếp theo.

| Situation | Suggested Next Skill / Step |
|---|---|
| Need product/requirement clarification | `business-analysis` |
| Need option alignment | `brainstorming` |
| Need implementation breakdown | `planning` |
| Need architecture design | `technical-design` |
| Need codebase verification | `sync` or `investigate` |
| Ready to implement small clear change | `execution` |
| Evidence insufficient | continue `research` |

Format:

```markdown
## Handoff

- Suggested next skill: planning
- Ready for planning: Yes
- Ready for execution: No
- Required verification: Check local package version and run a small POC.
```

## Session / Artifact Rules

Nếu đang làm trong repo/session:

- Tạo hoặc cập nhật `RESEARCH.md` tại session path phù hợp.
- Session path khuyến nghị: `.agents/sessions/<Task-...>/RESEARCH.md`.
- Không tự bịa task number nếu project có convention riêng.
- Không ghi secret, PII hoặc copyrighted long excerpts vào artifact.
- Không paste long source content.
- Nếu research phát sinh plan, không sửa `PLAN.md` trong skill này; recommend chuyển sang planning.

Nếu không có repo/session:

- Trả research report trong response.
- Không nói đã lưu file nếu thực tế chưa lưu.

## Output Quality

Research output phải:

- Rõ question và decision context.
- Có source strategy.
- Có source quality/freshness notes nếu cần.
- Findings có evidence.
- Tách facts/inference/opinion.
- Recommendation có confidence.
- Có caveats và residual risks.
- Không overclaim.
- Không copy dài nội dung nguồn.
- Không bịa citation.
- Không lan man sang implementation plan quá sâu.

## Checklist Trước Khi Hoàn Tất

Trước khi kết thúc research, kiểm tra:

- [ ] Research question rõ.
- [ ] Decision cần hỗ trợ rõ.
- [ ] Source strategy ghi rõ.
- [ ] Local evidence đã đọc nếu liên quan.
- [ ] External evidence có source rõ nếu dùng.
- [ ] Freshness đã kiểm tra nếu thông tin có thể thay đổi.
- [ ] Findings có evidence.
- [ ] Facts, inference và opinion tách riêng.
- [ ] Comparison matrix có nếu nhiều option.
- [ ] Recommendation rõ và có confidence.
- [ ] Caveats và residual risks có.
- [ ] Open questions có nếu cần.
- [ ] Handoff rõ.
- [ ] Không bịa citation.
- [ ] Không copy dài nội dung nguồn.
- [ ] `RESEARCH.md` đã lưu nếu Full Mode/session phù hợp.

## Limitations

- Research không tự implement.
- Research không thay thế planning.
- Research không thay thế investigate khi cần root-cause trong codebase.
- Research không thay thế review.
- Research không đảm bảo nguồn external luôn đúng hoặc không đổi.
- Research không thay thế tư vấn pháp lý/tài chính/y tế chuyên nghiệp.
- Nếu source thiếu, stale hoặc mâu thuẫn, phải ghi limitation thay vì kết luận quá chắc.

## References

- [Google Search Quality Rater Guidelines](https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf)
- [CRAAP Test: Evaluating Sources](https://researchguides.ben.edu/source-evaluation)
- [MDN: Getting started with the web](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [The Twelve-Factor App: Dependencies](https://12factor.net/dependencies)
