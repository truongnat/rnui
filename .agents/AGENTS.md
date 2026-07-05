## Tổng quan

Dự án này là bộ kỹ năng và quy tắc tối giản cho agent. Mục tiêu là giữ hệ thống đơn giản, dễ đọc, dễ mở rộng, không biến skill thành tài liệu quá dài hoặc framework phức tạp.

Phạm vi hỗ trợ:

- Developer: phân tích, lập kế hoạch, thực thi, review, hoàn tất.
- Tester: tạo test case, kiểm chứng, viết tài liệu kiểm thử.
- Business Analyst: làm rõ yêu cầu, viết tài liệu, phân tích dữ liệu và quy trình.

## Kiến trúc

- `AGENTS.md`: entrypoint cho agent. Khi provider hỗ trợ đọc file này, agent sẽ hiểu quy tắc chung, cấu trúc session, workflow, và cách dùng skill trong repo.
- `skills/*`: mỗi thư mục là một skill độc lập.
  - `SKILL.md`: mô tả ngắn gọn skill, khi dùng, workflow, output, checklist.
  - `scripts/`: script hoặc helper đi kèm skill nếu cần.
  - `references/`: tài liệu tham chiếu dài, chỉ đọc khi cần.
  - `assets/`: template, ví dụ, tài nguyên tĩnh.
- `tools/`: nơi dành cho các tool JavaScript/TypeScript. MVP core hiện chưa implement phần này.

## Chi tiết `SKILL.md`

Mỗi `SKILL.md` nên có:

- `name`: tên ngắn, kebab-case, trùng tên thư mục.
- `description`: mô tả ngắn skill làm gì và khi nào nên dùng.
- `Usage`:
  - Inputs/Outputs.
  - Workflow.
  - Ví dụ.
- `Operating Principles`:
  - Khi dùng.
  - Khi không dùng.
  - Checklist trước khi hoàn tất.
- `Limitations`: giới hạn rõ ràng của skill.
- `References`: tài liệu tham chiếu nếu có.

> Điểm cần chú ý: tận dụng XML tag để khóa contract rõ cho các skill, đặc biệt ở các phần input, output, artifact, workflow, safety và definition of done.

Ví dụ contract tối thiểu:

```xml
<Contract>
  <Inputs>...</Inputs>
  <Outputs>...</Outputs>
  <Artifacts>...</Artifacts>
  <Safety>...</Safety>
  <DefinitionOfDone>...</DefinitionOfDone>
</Contract>
```

Không cần bọc toàn bộ `SKILL.md` bằng XML. Chỉ dùng XML cho các phần cần agent tuân thủ chặt.

## Template Quality Standard

Template trong skill không chỉ là khung điền nội dung. Khi generate artifact, output phải đẹp, đúng trọng tâm và không lan man:

- Đẹp: cấu trúc Markdown rõ, heading hợp lý, bullet ngắn, bảng/checklist khi cần, khoảng trắng dễ đọc.
- Đúng trọng tâm: mỗi section trả lời đúng câu hỏi của skill, ví dụ decision, plan, evidence, risk, next step.
- Không lan man: không viết mở bài dài, không lặp ý, không thêm section rỗng, không claim nếu thiếu evidence.
- Kết luận hoặc recommendation quan trọng nên đặt sớm.
- Với nội dung phức tạp, ưu tiên bảng ngắn hoặc checklist thay vì đoạn văn dài.
- Nếu template có section không áp dụng, có thể bỏ hoặc ghi `Không có` khi điều đó giúp người đọc.

## Model Tier Policy

Nếu provider cho phép chọn model, có thể ưu tiên:

- Tier 1: reasoning mạnh nhất, dùng cho brainstorming khó, research khó, phân tích mơ hồ hoặc quyết định nhiều trade-off.
- Tier 2: reasoning tốt và cân bằng hơn, dùng cho planning, decomposition, DoD và plan verification.

Nếu provider không cho chọn model tier, tiếp tục với model hiện tại. Không được dừng task chỉ vì không chọn được tier.

## Core Skills Và Workflow

Base folder cho artifact runtime là `.agents`.

### Vòng đời Dev Cho Mỗi Task

Mỗi task tạo một thư mục:

```text
.agents/sessions/<Task-<number>-<short-description>>/
```

Workflow chính:

1. `brainstorming`
   - Tạo hoặc cập nhật `DISCUSSION.md`.
   - Làm rõ mục tiêu, phạm vi, trade-off, hướng đề xuất.
   - Với vấn đề khó hiểu hoặc cần giải thích, có thể dùng tool contract hỗ trợ:
     - `Ask`: tạo câu hỏi ngắn để user trả lời khi vấn đề không phức tạp.
     - `Visualize`: trực quan hóa vấn đề phức tạp, ví dụ tạo HTML/preview sau này. Vì có thể tốn token và sinh artifact phụ, cần confirm user trước khi dùng.
     - `Generate`: tạo bản nháp code hoặc tài liệu khi cần, nhưng không thay thế planning/execution.
   - QUAN TRỌNG: brainstorming nên ưu tiên Tier 1 nếu provider hỗ trợ chọn model.
2. `planning`
   - Tạo hoặc cập nhật `PLAN.md`.
   - Chia task, dependency, acceptance criteria, verification và rollback.
   - `Breakdown`: Nếu plan lớn, cần break ra các plan nhỏ hơn để dễ quản lý và thực thi.
   - `Define`: planning output phải có `DoD` (Definition of Done) để xác định khi nào task/plan hoàn thành và để verify dựa vào đó.
   - Với task không nhỏ hoặc có rủi ro, cần yêu cầu user review và xác nhận `DoD` trước khi execution.
   - QUAN TRỌNG: planning nên ưu tiên Tier 2 nếu provider hỗ trợ chọn model.

3. `sync`
   - Đồng bộ hiểu biết codebase, dependency, git state, knowledge map.
   - Mặc định read-only; chỉ mutate khi task/plan cho phép rõ ràng.
   - Nếu gặp vấn đề liên quan tới git hoặc file change như conflict, dirty changes ngoài scope, destructive action, hoặc mutation chưa nằm trong plan, phải dừng để hỏi user hoặc đưa suggestion. Tuyệt đối không tự ý xử lý thay user.
   - Khi scan hoặc đồng bộ codebase, không đọc nội dung nhạy cảm nếu chưa có lý do rõ. Với file nghi ngờ nhạy cảm như `.env`, private key, certificate, credential, token, dump dữ liệu, production config, chỉ đọc metadata/path trước và hỏi user nếu cần đọc nội dung.
4. `execution`
   - Tạo hoặc cập nhật `EXECUTION.md`.
   - Ghi lại từng bước thực thi, thay đổi, lệnh đã chạy, vấn đề gặp phải.
   - Khi tạo file, đảm bảo nội dung an toàn và không chứa nội dung nhạy cảm.
   - Khi xóa file, đảm bảo không xóa file nhạy cảm. Nếu là file cấu hình, file credential, hoặc file có thể ảnh hưởng môi trường, phải có plan rõ hoặc confirm user trước.
   - Nếu có nhiều task độc lập và provider hỗ trợ subagent/multiple task, có thể hỏi user trước khi chạy song song. Chỉ dùng khi lợi ích rõ và kết quả có thể merge/review an toàn.
5. `review`
   - Tạo hoặc cập nhật `REVIEW.md`.
   - Review correctness, regression risk, missing tests, security, maintainability.
6. `done`
   - Tạo hoặc cập nhật `DONE.md`, `PR_MESSAGE.md`, `PR_DESCRIPTION.md`.
   - Tổng kết thay đổi, verification, rủi ro còn lại, handoff.
   - Ưu tiên đọc template cho PR message và PR description theo thứ tự: `.github/PULL_REQUEST_TEMPLATE*`, `.gitlab/merge_request_templates/*`, template cấu hình sẵn trong repo, rồi fallback template nội bộ.

### Workflow Điều Tra

Skill `investigate` dùng khi chỉ cần tìm hiểu hoặc debug, chưa chắc có implement.

Artifact:

```text
.agents/sessions/<Task-<number>-<short-description>>/INVESTIGATE.md
```

### Workflow Review PR

Skill `review-pr` dùng khi cần review pull request hoặc diff.

Artifact:

```text
.agents/sessions/<Task-<number>-<short-description>>/REVIEW_PR.md
```

### Workflow Research

Skill `research` dùng khi cần nghiên cứu nội bộ hoặc bên ngoài trước khi quyết định.

Artifact:

```text
.agents/sessions/<Task-<number>-<short-description>>/RESEARCH.md
```

### Tester

Tester dùng cùng vòng đời Developer nhưng nhấn mạnh:

- Test cases.
- Verification evidence.
- Test data.
- Test documentation.
- Browser/research support nếu task cần.

### Business Analyst

Business Analyst dùng cùng vòng đời Developer nhưng nhấn mạnh:

- Yêu cầu nghiệp vụ.
- Scope và non-goals.
- Tài liệu quy trình.
- Design/spec.
- Data sources như database, SQL, Excel, CSV nếu task cần.


### Tham khảo

- [design-system.md](design-system.md)