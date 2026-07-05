---

name: business-analysis
description: Hỗ trợ Business Analyst - Product Requirement Analysis làm rõ business problem, stakeholder needs, scope, current/desired process, user stories, use cases, business rules, data sources, assumptions, acceptance criteria và functional specification. Dùng khi yêu cầu nghiệp vụ chưa rõ, cần refine requirement trước planning, technical design, implementation hoặc testing.
---

# Business Analysis

## Mục Đích

Làm rõ yêu cầu nghiệp vụ trước khi planning, technical design, implementation hoặc testing.

Skill này tập trung vào:

* Business problem.
* Stakeholders / actors.
* Current state và desired state.
* Scope, out-of-scope và non-goals.
* User stories / use cases.
* Business rules.
* Data sources và data assumptions.
* Acceptance criteria có thể kiểm chứng.
* Open questions cần stakeholder xác nhận.

Mục tiêu cuối cùng là biến input mơ hồ thành requirement notes rõ ràng, traceable và đủ tốt để chuyển sang planning hoặc implementation.

## Khi Dùng

Dùng skill này khi:

* Yêu cầu nghiệp vụ chưa rõ.
* Người dùng chỉ mô tả ý tưởng, pain point hoặc vấn đề.
* Cần phân tích requirement trước khi làm task kỹ thuật.
* Cần viết user stories, use cases hoặc functional spec.
* Cần xác định scope, non-goals hoặc boundary của feature.
* Cần xác định business rules.
* Cần viết acceptance criteria.
* Cần phân tích process hiện tại và process mong muốn.
* Cần phân tích data source như Excel, CSV, SQL, API response hoặc tài liệu nghiệp vụ.
* Cần chuẩn bị tài liệu để stakeholder, PM, dev hoặc QA cùng hiểu.

## Khi Không Dùng

Không dùng skill này khi:

* Task thuần kỹ thuật đã có spec rõ.
* Người dùng chỉ cần code review, debug hoặc implementation.
* Người dùng yêu cầu kiến trúc kỹ thuật chi tiết; dùng skill technical design hoặc planning phù hợp.
* Người dùng yêu cầu nghiên cứu external source sâu; dùng `research`.
* Người dùng yêu cầu tạo UI style, visual concept hoặc brainstorming sản phẩm; dùng skill phù hợp hơn.
* Input đã là requirement hoàn chỉnh và chỉ cần chuyển thành task implementation.

## Inputs

Skill có thể nhận các loại input sau:

* Yêu cầu người dùng.
* Context nghiệp vụ.
* Tài liệu requirement hiện có.
* Process hiện tại.
* Data sample: Excel, CSV, SQL, JSON, API response.
* Screenshot hoặc mô tả màn hình.
* Bug report có yếu tố nghiệp vụ.
* Feedback từ stakeholder, user hoặc QA.
* Existing user stories / acceptance criteria cần refine.

## Outputs

Output nên bao gồm các phần cần thiết sau, tùy theo context:

* Requirement notes.
* Problem statement.
* Stakeholders / actors.
* Current state.
* Desired state.
* Scope.
* Out-of-scope.
* Non-goals.
* User stories hoặc use cases.
* Business rules.
* Data sources và data assumptions.
* Acceptance criteria.
* Assumptions.
* Open questions.
* Recommended next step.

Không phải task nào cũng cần tất cả section, nhưng nếu bỏ section nào thì phải đảm bảo output vẫn đủ rõ để người tiếp theo có thể planning hoặc implement.

## XML Contract

```xml
<Contract>
  <Inputs>Yêu cầu user, context nghiệp vụ, tài liệu, data sample, process hiện có, screenshot hoặc feedback stakeholder nếu có.</Inputs>
  <Outputs>Requirement notes, problem statement, stakeholders, current state, desired state, scope, non-goals, user stories/use cases, business rules, data assumptions, acceptance criteria, assumptions, open questions và recommended next step.</Outputs>
  <Safety>Không biến assumption thành requirement. Không tự quyết thay stakeholder. Không giấu điểm chưa rõ. Không viết acceptance criteria mơ hồ hoặc không kiểm chứng được.</Safety>
</Contract>
```

## Operating Principles

* Không biến assumption thành requirement.
* Không tự quyết thay stakeholder nếu thông tin còn thiếu.
* Nếu thiếu thông tin, ghi vào `Assumptions` hoặc `Open Questions`.
* Requirement phải rõ actor, behavior, condition và expected outcome.
* Acceptance criteria phải kiểm chứng được.
* Business rules nên có ID để trace sang task, test case hoặc implementation.
* Scope và non-goals phải được tách riêng để tránh scope creep.
* Data assumption phải ghi rõ source, owner, validation và freshness nếu có.
* Không biến tài liệu BA thành bài luận dài; ưu tiên bullet, bảng và format dễ scan.
* Chỉ giữ nội dung giúp stakeholder, PM, dev hoặc QA ra quyết định.
* Nếu có mâu thuẫn giữa các input, ghi rõ conflict thay vì chọn một phía.
* Nếu requirement đủ rõ, recommend next step; không tự chuyển skill nếu user chưa yêu cầu.

## Workflow

1. Restate business problem.
2. Xác định goals và expected outcome.
3. Xác định stakeholders / actors.
4. Xác định current state.
5. Xác định desired state.
6. Xác định in-scope, out-of-scope và non-goals.
7. Xác định user stories hoặc use cases.
8. Xác định business rules.
9. Xác định data sources, required fields, validation và assumptions.
10. Viết acceptance criteria có thể kiểm chứng.
11. Tách assumptions khỏi confirmed requirements.
12. Ghi open questions cho stakeholder.
13. Recommend next step: brainstorming, planning, technical design, implementation hoặc QA test design.

## Requirement Classification

Khi phù hợp, phân loại requirement theo các nhóm sau:

| Type                       | Meaning                                                                 |
| -------------------------- | ----------------------------------------------------------------------- |
| Functional Requirement     | Hệ thống phải làm gì.                                                   |
| Business Rule              | Quy tắc nghiệp vụ chi phối hành vi hệ thống.                            |
| Data Requirement           | Dữ liệu cần có, nguồn dữ liệu, format, validation.                      |
| UX Requirement             | Yêu cầu liên quan tới trải nghiệm, flow, wording, state, error message. |
| Permission Requirement     | Ai được xem, tạo, sửa, xóa, export hoặc approve.                        |
| Reporting Requirement      | Báo cáo, dashboard, export hoặc tracking cần có.                        |
| Non-functional Requirement | Performance, security, audit, reliability, compliance.                  |
| Assumption                 | Điều đang giả định, chưa được stakeholder xác nhận.                     |
| Open Question              | Câu hỏi cần stakeholder trả lời.                                        |

## Output Quality Standards

Requirement notes phải đạt các tiêu chí:

* Rõ problem và outcome.
* Có actor hoặc stakeholder cụ thể.
* Có scope boundary.
* Business rules không bị lẫn với assumption.
* Acceptance criteria có thể test được.
* Open questions rõ owner hoặc người cần xác nhận nếu biết.
* Không dùng wording mơ hồ như “hợp lý”, “nhanh”, “đẹp”, “dễ dùng” nếu không có tiêu chí đo.
* Nếu có thuật ngữ nghiệp vụ, giải thích ngắn hoặc giữ nguyên nếu user đã dùng rõ.
* Nếu có nhiều rule, actor hoặc scenario, dùng bảng.
* Nếu task còn thiếu dữ liệu, vẫn tạo best-effort output và ghi rõ phần thiếu.

## Artifact Template

```markdown
## Business Analysis

### 1. Problem Statement

### 2. Goals / Desired Outcome

### 3. Stakeholders / Actors

| Stakeholder / Actor | Role | Need / Pain Point | Decision Power |
|---|---|---|---|

### 4. Current State

### 5. Desired State

### 6. Scope

#### In Scope

#### Out of Scope

#### Non-goals

### 7. User Stories / Use Cases

| ID | Actor | Goal | Benefit / Outcome |
|---|---|---|---|

### 8. Business Rules

| ID | Rule | Source | Impact | Open? |
|---|---|---|---|---|

### 9. Data Sources & Assumptions

| Data | Source | Owner | Required Fields | Validation | Freshness | Notes |
|---|---|---|---|---|---|---|

### 10. Acceptance Criteria

| ID | Scenario | Given | When | Then |
|---|---|---|---|---|

### 11. Assumptions

| ID | Assumption | Risk if Wrong | Needs Confirmation From |
|---|---|---|---|

### 12. Open Questions

| ID | Question | Owner | Blocking? |
|---|---|---|---|

### 13. Recommended Next Step
```

## User Stories Guidelines

Khi viết user story, dùng format:

```markdown
As a [actor],
I want [capability],
so that [business value / outcome].
```

User story tốt nên có:

* Actor cụ thể.
* Capability rõ.
* Business value rõ.
* Không nhồi quá nhiều behavior vào một story.
* Có acceptance criteria đi kèm nếu story đủ quan trọng.

Ví dụ format bảng:

```markdown
| ID | User Story | Priority | Notes |
|---|---|---|---|
| US-001 | As an admin, I want to export teacher accounts so that I can distribute initial login credentials. | Must | Needs permission rule. |
```

## Use Case Guidelines

Dùng use case khi flow có nhiều bước, nhiều actor hoặc nhiều nhánh.

Format khuyến nghị:

```markdown
| ID | Use Case | Primary Actor | Trigger | Main Flow | Alternative Flow | Exception Flow |
|---|---|---|---|---|---|---|
```

Use case nên ghi rõ:

* Trigger bắt đầu flow.
* Preconditions nếu có.
* Main success flow.
* Alternative flow.
* Exception / error flow.
* Postconditions nếu quan trọng.

## Business Rules Guidelines

Business rules phải được viết như quy tắc có thể kiểm chứng.

Format khuyến nghị:

```markdown
| ID | Rule | Source | Impact | Open? |
|---|---|---|---|---|
| BR-001 | A teacher account can only view initial password before first successful login. | Stakeholder | Affects export and teacher list display. | No |
```

Business rule tốt nên:

* Có ID.
* Dùng wording rõ ràng.
* Tránh từ mơ hồ.
* Ghi source nếu biết.
* Ghi impact tới UI, API, DB, permission hoặc process.
* Đánh dấu `Open = Yes` nếu chưa được xác nhận.

Không viết business rule như:

```markdown
- User should probably be able to manage data easily.
```

Viết lại thành:

```markdown
- BR-001: Admin users can create, update, deactivate and export teacher accounts within their assigned school only.
```

## Data Analysis Guidelines

Khi requirement liên quan tới data, cần làm rõ:

* Data đến từ đâu.
* Ai sở hữu data.
* Field nào bắt buộc.
* Field nào optional.
* Format dữ liệu.
* Validation rule.
* Duplicate rule.
* Permission với data.
* Data freshness.
* Import/export format nếu có.
* Error handling khi data thiếu hoặc sai.
* Mapping giữa source field và system field nếu có.

Format khuyến nghị:

```markdown
| Source Field | System Field | Required | Type | Validation | Example | Notes |
|---|---|---|---|---|---|---|
```

Nếu input là Excel/CSV/SQL/API response, cần phân tích thêm:

* Header / column name.
* Nullable fields.
* Unique key.
* Relationship giữa các bảng/file.
* Data owner.
* Data cleanup cần thiết.
* Edge cases.

## Acceptance Criteria Guidelines

Acceptance criteria phải test được bằng manual test, automated test hoặc stakeholder review.

Ưu tiên format Given / When / Then:

```markdown
| ID | Scenario | Given | When | Then |
|---|---|---|---|---|
| AC-001 | Successful export | Given an admin has permission to export teachers | When the admin clicks Export | Then the system downloads a file containing only teachers in the selected school |
```

Acceptance criteria tốt nên:

* Có ID.
* Có scenario rõ.
* Có condition đầu vào.
* Có action.
* Có expected result.
* Có edge case nếu quan trọng.
* Không dùng từ mơ hồ như “works correctly”.
* Không mô tả implementation chi tiết nếu không cần.

Với bug hoặc change request, nên có thêm negative cases:

```markdown
| ID | Scenario | Given | When | Then |
|---|---|---|---|---|
| AC-002 | User without permission cannot export | Given a user does not have export permission | When the user opens the teacher list | Then the Export button is hidden or disabled according to the permission rule |
```

## Assumptions Guidelines

Assumption là điều agent hoặc team đang giả định nhưng chưa được xác nhận.

Format khuyến nghị:

```markdown
| ID | Assumption | Risk if Wrong | Needs Confirmation From |
|---|---|---|---|
| ASM-001 | Teacher ID is unique within a school year. | Import may merge wrong records. | Product owner |
```

Không viết assumption như requirement đã chắc chắn.

Sai:

```markdown
- Teacher ID is unique within a school year.
```

Đúng:

```markdown
- ASM-001: We assume teacher ID is unique within a school year. This needs confirmation from the school admin or product owner.
```

## Open Questions Guidelines

Open questions nên rõ ràng, có ngữ cảnh và có thể trả lời được.

Format khuyến nghị:

```markdown
| ID | Question | Owner | Blocking? |
|---|---|---|---|
| Q-001 | Should inactive teachers appear in export files? | Product owner | Yes |
```

Open question tốt nên:

* Không hỏi quá rộng.
* Gắn với rule, flow hoặc data cụ thể.
* Có owner nếu biết.
* Đánh dấu blocking nếu ảnh hưởng planning/implementation.
* Không dùng open question để né những phần có thể suy luận hợp lý; nếu suy luận thì ghi vào assumptions.

## Recommended Next Step

Ở cuối output, recommend một bước tiếp theo phù hợp:

| Situation                                | Recommended Next Step                          |
| ---------------------------------------- | ---------------------------------------------- |
| Requirement còn mơ hồ                    | Ask stakeholder questions / refine requirement |
| Requirement đủ rõ nhưng chưa có solution | Move to brainstorming or solution design       |
| Requirement đủ rõ và cần chia task       | Move to planning                               |
| Requirement đủ rõ và cần kiến trúc       | Move to technical design                       |
| Requirement đủ rõ và cần test            | Move to QA test design                         |
| Requirement là bug nghiệp vụ             | Move to bug analysis / reproduction planning   |

Không tự động chuyển skill hoặc tự bắt đầu implementation nếu user chưa yêu cầu.

## Checklist Trước Khi Hoàn Tất

Trước khi kết thúc output, kiểm tra:

* [ ] Problem statement rõ.
* [ ] Goals / desired outcome rõ.
* [ ] Stakeholders / actors có.
* [ ] Current state và desired state có nếu liên quan.
* [ ] Scope, out-of-scope và non-goals có nếu task đủ lớn.
* [ ] User stories hoặc use cases có nếu cần.
* [ ] Business rules có ID và rõ impact.
* [ ] Data sources / assumptions có nếu liên quan tới dữ liệu.
* [ ] Acceptance criteria testable.
* [ ] Assumptions tách khỏi confirmed requirements.
* [ ] Open questions rõ và không quá chung chung.
* [ ] Recommended next step hợp lý.

## Limitations

* Skill này không thay thế quyết định của stakeholder.
* Skill này không tự implement.
* Skill này không tự xác nhận business rule nếu chưa có source.
* Skill này không thay thế research khi cần external source sâu.
* Skill này không đảm bảo requirement đúng nếu input thiếu hoặc stakeholder chưa xác nhận.
* Skill này không nên tạo technical architecture chi tiết; chỉ nên recommend chuyển sang technical design nếu cần.

## References

* [Business Analysis Body of Knowledge (BABOK)](https://www.iiba.org/career-resources/a-business-analysis-professionals-foundation-for-success/babok/glossary/)
* [User Stories and Use Cases](https://www.stellman-greene.com/2009/05/03/requirements-101-user-stories-vs-use-cases/)
* [Acceptance Criteria Best Practices](https://www.atlassian.com/work-management/project-management/acceptance-criteria)
* [Functional Specification Guidelines](https://www.modernrequirements.com/blogs/functional-specification-document/)
* [Business Rules Management](https://www.ibm.com/think/topics/business-rules-management-system)
* [Process Mapping and Analysis](https://www.lucidchart.com/pages/tutorial/process-mapping-guide-and-symbols)
* [Data Analysis for Business Analysts](https://online.hbs.edu/documents/a-beginners-guide-to-data-and-analytics.pdf)
* [Stakeholder Analysis Techniques](https://analysisfunction.civilservice.gov.uk/policy-store/stakeholder-mapping/)
