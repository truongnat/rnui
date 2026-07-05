---
name: sync
description: Đồng bộ trạng thái read-only trước execution đọc session artifacts, refresh context codebase, kiểm tra git state, dirty changes, dependency/config drift, plan mismatch và blocker. Dùng khi cần sync, refresh knowledge, kiểm tra drift, map codebase, validate workspace readiness hoặc chuẩn bị an toàn trước khi sửa code.
---

# Sync

## Mục Đích

Đảm bảo agent có trạng thái mới nhất, đáng tin cậy và an toàn trước khi execution.

Skill này tập trung vào:

- Đồng bộ session artifacts như `DISCUSSION.md`, `PLAN.md`, `EXECUTION.md`, `REVIEW.md` nếu có.
- Refresh context codebase ở phạm vi liên quan tới plan.
- Kiểm tra trạng thái workspace và git.
- Phát hiện drift giữa plan và codebase hiện tại.
- Phát hiện dirty changes, conflict hoặc thay đổi ngoài scope.
- Kiểm tra dependency/config chỉ khi cần cho plan.
- Kiểm tra missing files, renamed files hoặc outdated assumptions.
- Xác định blockers trước khi sửa code.
- Ghi facts, risks, drift và suggested next step.
- Giữ nguyên nguyên tắc read-only mặc định.

Mục tiêu cuối cùng là tránh execution dựa trên context cũ, plan sai, workspace bẩn, dependency lệch hoặc assumptions không còn đúng.

## Khi Dùng

Dùng skill này khi:

- Sau `planning` và trước `execution`.
- Session đã lâu hoặc context có thể stale.
- User quay lại task sau một khoảng thời gian.
- Cần refresh context trước khi sửa code.
- Cần kiểm tra workspace state.
- Cần kiểm tra git state.
- Cần kiểm tra dirty changes hoặc conflict.
- Cần đọc artifact session hiện có.
- Cần map codebase ở phạm vi liên quan tới plan.
- Cần kiểm tra plan có còn khớp codebase không.
- Cần kiểm tra dependency/config ở mức read-only.
- Cần xác định blocker trước khi execution.
- Cần đảm bảo không ghi đè thay đổi không thuộc về mình.

## Khi Không Dùng

Không dùng skill này khi:

- Task chỉ là brainstorming.
- Task chỉ là planning và chưa cần đọc sâu repo.
- Người dùng yêu cầu không kiểm tra repo/workspace.
- Không có workspace, repo hoặc artifact để đồng bộ.
- User chỉ hỏi kiến thức chung.
- User yêu cầu review diff sau execution; dùng `review`.
- User yêu cầu implement ngay task nhỏ, scope rõ và context mới.
- User yêu cầu research external source; dùng `research`.
- User yêu cầu sửa file cụ thể và đã cung cấp đủ context hiện tại trong prompt.

## Sync Readiness Gate

Trước khi chuyển sang execution, kiểm tra:

- Có session path hoặc context task không.
- Có `PLAN.md` hoặc scope rõ không.
- Workspace có tồn tại và đọc được không.
- Git repo có init không, nếu cần.
- Có dirty changes ngoài scope không.
- Có conflict marker hoặc merge/rebase state không.
- Files trong plan có tồn tại không.
- Affected files có khác đáng kể so với plan không.
- Dependency/config assumptions có còn đúng không nếu plan phụ thuộc chúng.
- Có file nhạy cảm nào cần tránh đọc không.
- Có blocker nào cần quay lại planning hoặc hỏi user không.

Nếu readiness không đạt:

- Không chuyển sang execution.
- Ghi blocker.
- Recommend next step phù hợp: `planning`, `investigate`, `execution` hoặc hỏi user.

## Inputs

Skill có thể nhận các loại input sau:

- Session path.
- `DISCUSSION.md`.
- `PLAN.md`.
- `EXECUTION.md` nếu task đang tiếp tục.
- `REVIEW.md` nếu task quay lại sau review.
- Workspace hiện tại.
- User constraints.
- Known affected files.
- Known verification commands.
- Git state nếu có.
- Dependency files như `package.json`, lockfile, `pyproject.toml`, `go.mod`, `Cargo.toml`, etc.
- Config metadata nếu liên quan và an toàn để đọc.
- Previous assumptions/open questions.

## Outputs

Output nên bao gồm:

- Sync summary.
- Observed facts.
- Inferred context.
- Drift detected.
- Dirty changes / conflict state nếu có.
- Dependency/config notes nếu có.
- Sensitive file handling notes nếu có.
- Risks.
- Blockers.
- Recommendation / next step.
- Cập nhật ngắn trong `EXECUTION.md` hoặc artifact phù hợp nếu workflow yêu cầu.
- Không bắt buộc tạo file riêng trong MVP.

## XML Contract

```xml
<Contract>
  <Inputs>Session path, PLAN.md, workspace state, git state, dependency/config metadata, known affected files và user constraints nếu có.</Inputs>
  <Outputs>Sync summary, observed facts, inferred context, drift, dirty changes, risks, blockers và recommended next step.</Outputs>
  <Artifacts>Cập nhật ngắn trong EXECUTION.md hoặc artifact phù hợp nếu workflow yêu cầu; không bắt buộc tạo file riêng.</Artifacts>
  <Safety>Read-only mặc định. Không mutate workspace. Không đọc secret hoặc file nhạy cảm nếu chưa có lý do rõ. Không chạy command destructive. Không tự xử lý conflict/unrelated dirty changes. Không chuyển sang execution khi plan stale hoặc blocker chưa xử lý.</Safety>
</Contract>
```

## Depth Modes

### Lite Mode

Dùng Lite Mode khi:

- Task nhỏ.
- Session còn mới.
- Chỉ cần kiểm tra nhanh workspace/git/artifact.
- Không cần map sâu codebase.
- Không có nhiều affected files.

Lite output:

```markdown
## Sync Summary

### Observed

### Drift / Blockers

### Recommendation
```

### Full Mode

Dùng Full Mode khi:

- Session cũ hoặc context có thể stale.
- Có nhiều affected files.
- Có dirty changes.
- Có dependency/config drift.
- Có plan phức tạp.
- Có migration/config/auth/security/data risk.
- Cần chuẩn bị kỹ trước execution.

Full output dùng template ở phần Artifact Template.

## Read-only Policy

Sync mặc định là read-only.

Được phép:

- Liệt kê file/path liên quan.
- Đọc artifact session.
- Đọc source files liên quan tới plan.
- Đọc metadata file.
- Đọc git status/diff summary.
- Đọc dependency manifest ở mức cần thiết.
- Đọc config non-sensitive ở mức cần thiết.
- Chạy command read-only như status/list/grep/test discovery nếu safe.

Không được phép mặc định:

- Sửa file.
- Format file.
- Install/update dependency.
- Generate files.
- Delete files.
- Rename files.
- Run migration.
- Run seed.
- Change env/config.
- Resolve merge conflict.
- Checkout/reset/rebase/merge branch.
- Modify lockfile.
- Start long-running service nếu không cần và user chưa yêu cầu.
- Read secret contents nếu chưa có lý do rõ và approval khi cần.

Nếu một action có thể mutate workspace, chuyển sang `execution` hoặc hỏi user nếu chưa được phép.

## Sensitive File Policy

Không đọc nội dung các file sau nếu chưa có lý do rõ và chưa được user cho phép khi cần:

- `.env`, `.env.*`.
- `*.pem`, `*.key`, `*.p12`, `*.pfx`.
- Private key, certificate, credential, token.
- Cloud credential files.
- SSH keys.
- Database dumps.
- Backup files.
- Production config chứa secret.
- Files chứa thông tin cá nhân hoặc dữ liệu khách hàng.
- Files có tên/path thể hiện rõ nội dung nhạy cảm như `secret`, `credential`, `token`, `password`, `private`, `backup`, `dump`.

Được phép đọc metadata/path an toàn:

- File exists.
- File name.
- File size.
- Modified time.
- Whether file is tracked/ignored.

Không copy nội dung nhạy cảm vào artifact hoặc response.

Nếu phát hiện secret có thể đã bị commit/log:

- Dừng sync.
- Ghi risk.
- Recommend xử lý secret exposure theo workflow an toàn.

## Git State Checks

Khi workspace là git repo, kiểm tra ở mức cần thiết:

- Current branch.
- Working tree dirty/clean.
- Staged changes.
- Untracked files.
- Merge/rebase/cherry-pick state.
- Conflict markers nếu có.
- Diff summary nếu cần.
- Changes ngoài scope plan.

Read-only commands thường phù hợp:

```bash
git status --short
git branch --show-current
git diff --name-only
git diff --stat
git diff --cached --name-only
```

Không tự chạy:

```bash
git reset
git checkout
git clean
git merge
git rebase
git stash
git add
git commit
```

trừ khi user explicit yêu cầu và đã chuyển sang execution phù hợp.

## Dirty Changes Policy

Nếu có dirty changes:

1. Phân loại:
   - In-scope changes.
   - Out-of-scope changes.
   - Unknown ownership.
   - Generated/lockfile changes.
   - Conflict-related changes.

2. Nếu dirty changes ngoài scope hoặc ownership không rõ:
   - Không overwrite.
   - Không auto revert.
   - Ghi blocker/risk.
   - Hỏi user hoặc recommend resolve trước execution.

3. Nếu dirty changes nằm trong scope và thuộc task hiện tại:
   - Ghi observed fact.
   - Có thể tiếp tục nếu không có conflict.

4. Nếu có merge conflict:
   - Không tự resolve trong sync.
   - Ghi blocker.
   - Recommend conflict resolution plan/execution.

## Drift Detection

Drift là khi plan/context không còn khớp trạng thái hiện tại.

Các loại drift:

| Drift Type | Example | Action |
|---|---|---|
| File Drift | File trong plan đã bị rename/delete/move | Update plan hoặc inspect new location |
| API Drift | Function/interface đã đổi so với plan | Re-plan affected task |
| Dependency Drift | Package/runtime version khác assumption | Update verification/plan |
| Config Drift | Config path/key khác plan | Verify before execution |
| Test Drift | Test command không tồn tại hoặc đổi tên | Update verification strategy |
| Artifact Drift | `PLAN.md` cũ hơn changes/review | Reconcile artifacts |
| Scope Drift | Codebase cho thấy scope rộng hơn/khác plan | Return to planning |
| Data Drift | Schema/sample data khác assumption | Investigate or business-analysis |
| Branch Drift | Đang ở branch khác task | Confirm before execution |

Drift nghiêm trọng phải chặn execution cho tới khi được xử lý.

## Dependency / Config Checks

Chỉ kiểm tra dependency/config khi plan cần hoặc có ảnh hưởng tới verification/execution.

Có thể đọc:

- `package.json`.
- Lockfile metadata hoặc diff summary.
- `pnpm-workspace.yaml`.
- `turbo.json`, `nx.json`, `vite.config.*`, `next.config.*` nếu plan liên quan.
- `tsconfig.json`.
- Test config như `playwright.config.*`, `vitest.config.*`, `jest.config.*`.
- Backend config non-secret.
- Docker compose service names nếu cần và không chứa secret.

Không đọc secret values trong env files.

Dependency check nên trả lời:

- Project dùng package manager nào.
- Verification scripts có tồn tại không.
- Relevant package/module có tồn tại không.
- Lockfile có dirty không.
- Plan có assumption sai về tooling không.

Không tự install hoặc update package trong sync.

## Codebase Mapping Guidelines

Map codebase ở phạm vi vừa đủ để execution.

Nên xác định:

- Entry points liên quan.
- Affected modules.
- Shared utilities.
- Existing patterns cần follow.
- Tests liên quan.
- Config/test scripts liên quan.
- Owner boundaries nếu có.
- Risky shared files.

Không nên:

- Liệt kê toàn bộ file tree.
- Đọc toàn repo nếu plan chỉ cần vài file.
- Copy code dài vào artifact.
- Mở rộng scope vì thấy cơ hội refactor.

## Artifact Sync Guidelines

Nếu có session artifacts, đọc theo thứ tự hợp lý:

1. `DISCUSSION.md` nếu cần hiểu decision.
2. `PLAN.md` để biết scope/task.
3. `EXECUTION.md` nếu task đang tiếp tục.
4. `REVIEW.md` nếu quay lại sau review.
5. `DONE.md` nếu task có thể đã đóng hoặc cần reopen.

Kiểm tra:

- Artifact có cùng session không.
- Plan có stale so với execution/review không.
- Open questions có blocker không.
- DoD/verification strategy có còn phù hợp không.
- Task status đã complete/partial/blocked chưa.

Không tự viết lại artifact lớn trong sync, trừ khi workflow yêu cầu cập nhật sync note ngắn.

## Workflow

1. Xác định sync có cần thiết không.
2. Chọn Lite Mode hoặc Full Mode.
3. Xác nhận workspace và session path nếu có.
4. Đọc artifact session liên quan theo thứ tự.
5. Kiểm tra sensitive file boundaries trước khi đọc file.
6. Kiểm tra git repo và working tree nếu có.
7. Kiểm tra dirty changes, untracked files và conflict state.
8. Kiểm tra files/systems trong plan có tồn tại không.
9. Map codebase ở phạm vi liên quan tới plan.
10. Kiểm tra dependency/config/tooling nếu plan cần.
11. So sánh plan với trạng thái thực tế.
12. Ghi observed facts.
13. Ghi inferred context riêng nếu có suy luận.
14. Ghi drift, risks và blockers.
15. Recommend next step.
16. Chỉ chuyển sang execution nếu trạng thái đủ tin cậy.

## Artifact Template

```markdown
# Sync

## 1. Scope

## 2. Artifacts Checked

| Artifact | Found? | Notes |
|---|---|---|

## 3. Workspace / Git State

| Check | Result | Notes |
|---|---|---|

## 4. Observed Facts

| Fact | Source |
|---|---|

## 5. Inferred Context

| Inference | Basis | Confidence |
|---|---|---|

## 6. Drift Detected

| Drift | Impact | Suggested Action |
|---|---|---|

## 7. Dirty Changes / Conflicts

| Item | Scope | Risk | Action |
|---|---|---|---|

## 8. Dependency / Config Notes

| Area | Observation | Impact |
|---|---|---|

## 9. Risks / Blockers

| Item | Type | Impact | Next Action |
|---|---|---|---|

## 10. Recommendation

- Ready for execution: Yes / No
- Suggested next step:
- Required confirmation:
```

## Output Quality

Sync output phải:

- Ngắn, rõ, factual.
- Tập trung vào readiness for execution.
- Tách `Observed` và `Inferred`.
- Nêu rõ source của facts.
- Không copy file tree dài.
- Không copy secrets.
- Không paste output command dài.
- Không suy diễn quá mức từ file name.
- Không claim workspace clean nếu chưa kiểm tra.
- Không claim plan valid nếu chưa đối chiếu.

## Observed vs Inferred

### Observed

Chỉ dùng cho điều đã đọc/kiểm tra trực tiếp.

Ví dụ:

```markdown
Observed:
- `PLAN.md` exists in `.agents/sessions/Task-x/`.
- `git status --short` shows modified `src/auth/login.ts`.
```

### Inferred

Dùng cho suy luận dựa trên facts.

Ví dụ:

```markdown
Inferred:
- The current task likely touches the auth login flow because both plan and dirty file reference `src/auth/login.ts`.
```

Nếu confidence thấp, ghi rõ.

## Blocker Policy

Blockers phải chặn execution nếu có thể gây mất dữ liệu, ghi đè thay đổi, làm sai scope hoặc làm verification không đáng tin.

Các blocker phổ biến:

- Missing `PLAN.md` cho task phức tạp.
- Open question blocking từ plan.
- Dirty changes ngoài scope.
- Merge conflict.
- Affected file không tồn tại.
- Plan stale so với codebase.
- Required verification command không tồn tại và chưa có alternative.
- Missing dependency/service/env bắt buộc.
- Sensitive file cần đọc nhưng chưa có approval.
- Destructive action chưa có confirm.
- Branch sai hoặc không rõ.

Nếu blocker tồn tại:

```markdown
Ready for execution: No
Suggested next step: ...
```

## Recommendation Guidelines

Recommendation phải rõ một trong các hướng:

| Recommendation | Use When |
|---|---|
| Ready for execution | Plan khớp, không có blocker, workspace safe. |
| Return to planning | Plan stale, scope drift, affected files mismatch. |
| Run investigate | Cần hiểu root cause/code path trước khi sửa. |
| Ask user | Cần confirmation để tránh overwrite/destructive action. |
| Resolve workspace state | Dirty changes/conflict cần xử lý trước. |
| Update verification strategy | Test command/tooling khác plan. |
| Stop | Có secret/security risk hoặc destructive risk chưa xử lý. |

## Session / Artifact Rules

Nếu đang làm trong repo/session:

- Không bắt buộc tạo `SYNC.md` trong MVP.
- Có thể ghi sync note ngắn vào `EXECUTION.md` nếu workflow yêu cầu.
- Nếu tạo artifact riêng, dùng `SYNC.md` cùng session path.
- Không ghi secret hoặc output dài vào artifact.
- Không rewrite `PLAN.md` trong sync; nếu plan stale, recommend quay lại planning.

Nếu không có repo/session:

- Trả sync summary trong response.
- Không nói đã lưu artifact nếu thực tế chưa lưu.

## Checklist Trước Khi Hoàn Tất

Trước khi kết thúc sync, kiểm tra:

- [ ] Đã xác định Lite Mode hoặc Full Mode.
- [ ] Session path/workspace đã xác nhận nếu có.
- [ ] Artifact liên quan đã đọc nếu tồn tại và cần thiết.
- [ ] Sensitive file boundaries đã được tôn trọng.
- [ ] Workspace/git state đã kiểm tra ở mức cần thiết.
- [ ] Dirty changes/conflicts đã ghi nếu có.
- [ ] Files/systems trong plan đã được đối chiếu nếu có.
- [ ] Dependency/config được kiểm tra nếu plan cần.
- [ ] Observed facts có source.
- [ ] Inferred context tách khỏi observed facts.
- [ ] Drift hoặc blocker đã ghi rõ.
- [ ] Recommendation rõ.
- [ ] Không mutate workspace ngoài scope.
- [ ] Không đọc/copy secret.

## Limitations

- Skill này không thay thế execution.
- Skill này không thay thế planning nếu plan stale.
- Skill này không thay thế investigate nếu chưa hiểu root cause.
- Skill này không tự viết tool hoặc automation.
- Skill này không tự xử lý conflict hoặc unrelated dirty changes.
- Skill này không đảm bảo phát hiện mọi drift nếu context thiếu.
- Skill này không đọc secret hoặc sensitive data trừ khi có lý do rõ và user cho phép.

## References

- [Git Status Documentation](https://git-scm.com/docs/git-status)
- [Git Diff Documentation](https://git-scm.com/docs/git-diff)
- [Gitignore Documentation](https://git-scm.com/docs/gitignore)
- [GitHub Docs: Storing Your Secrets Safely](https://docs.github.com/en/get-started/learning-to-code/storing-your-secrets-safely)
- [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [The Twelve-Factor App: Config](https://12factor.net/config)
