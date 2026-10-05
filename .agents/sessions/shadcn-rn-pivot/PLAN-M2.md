# Plan — M2: CLI `@rnui/cli` (init + add)

## 1. Goal & Scope

### Goal

`npx @rnui/cli init` trên Expo app trống → toàn bộ setup hoàn chỉnh (engine deps, babel/metro, tsconfig alias, components.json, global.css import) rồi `npx @rnui/cli add button` cài component từ registry — không cần sửa tay.

### In Scope

- `packages/cli` — package mới, bin `rnui`, name `@rnui/cli` (tên npm pending scope/org khi publish).
- Lệnh `init`: detect Expo/bare, chọn variant, `expo install` deps, write/merge configs, components.json, theme add qua registry, css import ở entry.
- Lệnh `add <items...>`: detect variant từ deps đã cài → spawn `npx shadcn add <base>/r/<variant>/<item>.json`.
- Lệnh `list`: fetch `index.json` catalog.
- Registry base: `RNUI_REGISTRY_BASE_URL` env hoặc `--registry` flag; default constant (TODO domain thật).
- E2E: init + add trên Expo app mới trong /tmp (cả 2 variants).

### Out of Scope

- Publish npm (cần quyết định scope `@rnui` vs `@truongdq01`).
- `diff`/`doctor`/`migrate` commands.
- Bare RN init đầy đủ (Expo trước; bare RN warn + hướng dẫn).
- Web/Vite project support.

### Non-Goals

- Không viết lại shadcn add logic — spawn `shadcn` CLI.
- Không đụng `packages/*` hiện có ngoài thêm `packages/cli`.

## 2. Key decisions

| Decision | Choice | Why |
|---|---|---|
| `add` implementation | Spawn `npx shadcn@latest add <url>` | Proven path (T-006); API nội bộ shadcn thay đổi nhanh, spawn ổn định hơn |
| Variant detect | package.json deps (`uniwind` vs `nativewind`) | Không cần state file riêng |
| Theme install trong init | `shadcn add <base>/r/<v>/theme.json` | Eat own dog food — registry là single source of truth |
| CLI deps | `@clack/prompts` (prompts) duy nhất; spawn qua `node:child_process` | Giữ CLI nhẹ |
| Build | tsup như packages khác → `dist/cli.js` + shebang | Consistent repo convention |
| Config merge | File tồn tại → prompt overwrite + backup `.bak`; không AST-merge | MVP an toàn; rnr cũng overwrite kèm cảnh báo |

## 3. Execution Plan

| ID | Task | Description | Dependencies | Acceptance Criteria | Verification | Files |
|---|---|---|---|---|---|---|
| T-201 | Scaffold package | `packages/cli/` — package.json (`bin.rnui`, deps `@clack/prompts`, tsup dev), tsconfig, `src/cli.ts` entry | — | `bun run build` trong package sinh `dist/cli.js` chạy được `node dist/cli.js --help` | Run bin | `packages/cli/` |
| T-202 | Registry base resolution | `--registry <url>` flag / `RNUI_REGISTRY_BASE_URL` env / default const; helper `itemUrl(variant,name)` | T-201 | `rnui list` với env trỏ localhost in được items | `RNUI_REGISTRY_BASE_URL=http://localhost:4999/r node dist/cli.js list` | `src/registry.ts` |
| T-203 | `add` command | Detect variant từ deps; build URLs; spawn shadcn add; pretty output | T-202 | `add button card` trong test app cài đúng files | E2E | `src/commands/add.ts` |
| T-204 | `init` — detect + deps | Check package.json (expo vs bare); prompt variant; `npx expo install` đúng set (nw: nativewind tailwindcss@^3 reanimated worklets / uw: uniwind tailwindcss) | T-202 | Fresh Expo app → deps cài đúng version tương thích SDK | E2E inspect package.json | `src/commands/init.ts`, `src/detect.ts` |
| T-205 | `init` — config files | babel.config.js (nw only), metro.config.js (variant-specific), components.json, tsconfig paths merge — tất cả có backup/confirm khi file tồn tại | T-204 | Files đúng nội dung; existing file → `.bak` + prompt | E2E + inspect | `src/commands/init.ts`, `src/files.ts` |
| T-206 | `init` — theme + entry | `shadcn add theme.json` qua registry; detect entry (expo-router `app/_layout.tsx` / `App.tsx` / `index.ts`); insert `import './global.css'` nếu thiếu | T-203, T-205 | global.css + engine files land; entry có import css; tsc pass | `npx tsc --noEmit` trong test app | `src/commands/init.ts` |
| T-207 | E2E cả 2 variants | Fresh app → `rnui init` → `rnui add button card` → tsc + `expo export` | T-204..T-206 | Full flow pass không sửa tay (trừ answer prompts) | Bundle pass | /tmp apps |
| T-208 | Docs | Update `registry/README.md` + `setup.md` với CLI flow; EXECUTION.md append M2 | T-207 | Docs khớp thực tế | Review | docs files |

## 4. Execution Order

T-201 → T-202 → T-203 → (T-204 → T-205 → T-206) → T-207 → T-208

## 5. Verification Strategy

- Automated: `rnui --help` smoke; `list` fetch; e2e init+add+tsc+export trên 2 app /tmp.
- Manual: prompt UX hợp lý; backup files tạo đúng.
- Regression: `packages/*` khác không đổi; `bunx biome check packages/cli`.

## 6. Definition of Done

- [ ] `rnui init` trên Expo app trống → full setup không sửa tay (nativewind + uniwind).
- [ ] `rnui add button card` sau init → files + deps đúng.
- [ ] Test app: `npx tsc --noEmit` pass, `npx expo export` pass.
- [ ] File tồn tại sẵn → backup `.bak`, không ghi đè mất.
- [ ] Docs cập nhật; không đụng packages khác.

## 7. Rollback

- `packages/cli` mới hoàn toàn — xóa thư mục.
- Test apps /tmp — không commit.

## 8. Risks

| Risk | Mitigation |
|---|---|
| `@rnui` npm scope chưa sở hữu | Name ghi `@rnui/cli` là goal; publish quyết định sau (fallback `@truongdq01/cli`) |
| babel/metro existing config khác nhau nhiều | Backup + prompt; không auto-merge AST ở M2 |
| expo-router entry khác (`src/app/`) | Detect thêm `src/app/_layout.tsx`; không tìm thấy → warn + hướng dẫn manual |
| shadcn CLI version break spawn flags | Pin `shadcn@latest` như rnr làm; ghi fallback `npx shadcn` trong docs |
| Default registry URL chưa có domain thật | Env/flag override; TODO trước publish (Q-4 cũ) |

## 9. Handoff

- Ready for execution: Yes (đã approve roadmap; M2 là step tiếp theo).
- First action: T-201 scaffold package.
