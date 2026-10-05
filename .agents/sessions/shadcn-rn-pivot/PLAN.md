# Plan — M1: Registry Foundation

## 1. Goal & Scope

### Goal

Dựng nền tảng registry chuẩn shadcn: source tree + build pipeline → JSON tĩnh serve qua docs site, chứng minh end-to-end bằng `npx shadcn add <url>/r/<variant>/button.json` trên Expo app thật, với cả hai variant `nativewind` và `uniwind`.

### In Scope

- `registry/` source tree: `shared/` (components + lib dùng chung 2 variants) + `variants/{nativewind,uniwind}/` (theme/setup riêng).
- `scripts/build-registry.mjs` — emit registry-item.json chuẩn schema ra `docs/public/r/{nativewind,uniwind}/`.
- Theme contract: semantic color tokens (background, foreground, primary, secondary, muted, accent, destructive, border, input, ring, radius) map sang cả hai hệ.
- Items đầu tiên: `theme` (global.css + setup files), `utils` (cn()), `button`, `text`, `card`.
- E2E validation trên Expo app thật cho cả 2 variants.
- `registry/README.md` authoring guide + consumer setup doc (components.json template).

### Out of Scope

- CLI `@rnui/cli` (M2).
- Port thêm components ngoài 3 cái đầu (M3+).
- Docs site UI/preview/theme switcher (M4).
- Blocks/screen templates (M5), theme customizer (M6).
- Public URL thật cho registry (local validation trước; URL công bố khi deploy docs).

### Non-Goals

- Không động vào `packages/*` (tokens, headless, ui) — npm packages deprecate dần, không thay đổi ở M1.
- Không hỗ trợ bare RN chưa (validate trên Expo trước; bare RN test ở M2 khi có init).
- Không tối ưu cho web target.

## 2. Sources / Context

| Source | Notes |
|---|---|
| `.agents/sessions/shadcn-rn-pivot/DISCUSSION.md` | Decision log: copy-paste + CLI registry, NativeWind+Uniwind cả hai, deprecate npm dần, skip spike |
| shadcn registry docs (ui.shadcn.com/docs/registry) | `registry.json` catalog + `registry-item.json` schema; `files[].target` explicit bypass cần alias; `dependencies`/`registryDependencies`/`cssVars` fields; local file path add được |
| rnr + rnr-registry-template | Pattern đã chứng minh: per-variant URL `/r/<variant>/<item>.json`; shadcn CLI add được trên RN project khi có components.json |
| uniwind.dev / github uni-stack/uniwind | Drop-in replacement NativeWind, cùng className API; Tailwind v4 `@theme` CSS-first, Metro-only plugin → shared component source khả thi, khác biệt chủ yếu ở setup/theme files |
| Repo | `docs/` (Astro, Vercel `docs/dist`) là nơi serve `/r/`; `bun` workspace; scripts/ đã có các .mjs build helpers |

## 3. Constraints & Assumptions

### Constraints

| Constraint | Impact |
|---|---|
| NativeWind v4 ↔ tailwindcss v3.x; Uniwind ↔ tailwindcss v4 | Per-variant `dependencies` khác nhau; global.css khác syntax (`@tailwind` vs `@import 'tailwindcss'` + `@theme`) |
| className phải là literal strings (Tailwind build-time detect) | Authoring rule: không template-string class; variant dùng tv/cva với full class names |
| `shadcn add` cần `components.json` trong consumer app + tsconfig `@/*` alias | M1 ship components.json template; consumer copy tay (M2 `init` automate) |
| Expo native deps cần `npx expo install` đúng version | Registry items KHÔNG liệt kê nativewind/reanimated... trong `dependencies`; setup doc hướng dẫn expo install |
| `docs/public/r/` là generated output | Gitignore output; hook `registry:build` vào `docs:build` để Vercel deploy có sẵn |

### Assumptions

| ID | Assumption | Risk If Wrong | Confirmation Needed? |
|---|---|---|---|
| PA-1 | className API giống hệt giữa nativewind/uniwind cho các component đơn giản | Nếu diverge → dùng `variants/<v>/` override per file | Verify ở T-006/T-007 |
| PA-2 | `npx shadcn add <url>` hoạt động trên Expo project khi có components.json hợp lệ | Nếu CLI reject RN project → cần wrapper sớm (kéo M2 lên) | Verify ở T-006 — đây là core validation |
| PA-3 | Dark mode: `.dark` class + `dark:` variant dùng được cả hai hệ | Nếu cơ chế khác → theme contract điều chỉnh | Verify ở T-006 |
| PA-4 | tsconfig `@/*` paths có thể thêm vào Expo app | Nếu không → đổi sang relative imports trong source | Verify ở T-006 |
| PA-5 | `docs/public/r/` được Astro copy nguyên vào `dist/` | Nếu không → đổi output dir hoặc custom serve | Verify ở T-006 (local serve) |

## 4. Affected Files / Systems

| Area | Files / Modules / Systems | Expected Change | Confidence |
|---|---|---|---|
| Registry source | `registry/` (mới): `shared/ui/*`, `shared/lib/*`, `variants/nativewind/*`, `variants/uniwind/*`, `registry.json` items catalog | Tạo mới | High |
| Build | `scripts/build-registry.mjs` (mới) | Tạo mới | High |
| Root scripts | `package.json` | Thêm `registry:build` (+ `registry:serve` optional) | High |
| Docs build | `package.json` `docs:build` hoặc `docs/package.json` | Prebuild chạy `registry:build` → `docs/public/r/` | Med (xác nhận chỗ hook đúng) |
| Generated output | `docs/public/r/` | Tạo mới, gitignore | High |
| Lint/typecheck | `biome.json`, `tsconfig.json` | Có thể cần exclude `registry/` và `docs/public/r/` | Med |
| Root docs | `README.md`, `registry/README.md` (mới) | Thêm section registry | High |
| Consumer template | `registry/templates/components.json` (mới) | File template cho consumer | High |
| `packages/*` | — | KHÔNG động vào | High |

## 5. Execution Plan

| ID | Task | Description | Dependencies | Acceptance Criteria | Verification | Files / Scope |
|---|---|---|---|---|---|---|
| T-001 | Scaffold registry tree + internal catalog format | Tạo `registry/` với `shared/`, `variants/`, `items/` (hoặc single `registry.json` root catalog định nghĩa items: name/type/files/shared-vs-variant resolution/per-variant deps) | None | Cấu trúc thư mục tồn tại; catalog JSON parse được; mỗi item có đủ name/type/files | `bun -e "JSON.parse(...)"` hoặc dry-run builder | `registry/` |
| T-002 | Build script `build-registry.mjs` | Đọc catalog; resolve files (variant override > shared); embed file contents; emit `docs/public/r/{nativewind,uniwind}/<name>.json` theo registry-item schema; thêm script `registry:build` | T-001 | Chạy `bun run registry:build` sinh JSON hợp lệ cho mọi item × 2 variants; mỗi file có `content` + `target` | Diff output với registry-item.json schema (name, type, files[].path/content/target, dependencies, registryDependencies) | `scripts/build-registry.mjs`, `package.json`, `.gitignore` |
| T-003 | Theme contract + theme items | Định nghĩa semantic tokens; viết `variants/nativewind/global.css` (@tailwind + :root/.dark vars) + `tailwind.config` template + `nativewind-env.d.ts`; viết `variants/uniwind/global.css` (@import + @theme); đăng ký item `theme` per variant | T-001 | Cùng semantic class names (`bg-background`, `text-foreground`, `bg-primary`, `border-border`, `rounded-md`...) resolve ở cả hai; light + dark vars đủ | Review file; compile check ở T-006 | `registry/variants/*`, `registry/templates/*` |
| T-004 | `utils` lib item | `shared/lib/utils.ts` export `cn()` (clsx + tailwind-merge); item deps `clsx`, `tailwind-merge` | T-001 | `shadcn add` item utils copy `lib/utils.ts` đúng target | E2E ở T-006 | `registry/shared/lib/utils.ts` |
| T-005 | Components đầu tiên | `shared/ui/button.tsx` (variants: default/destructive/outline/secondary/ghost/link; sizes: sm/default/lg/icon; Pressable + Text + tv hoặc cva), `shared/ui/text.tsx`, `shared/ui/card.tsx`; `registryDependencies: ["utils", "theme"]`; deps `clsx`, `tailwind-merge`, `tailwind-variants` | T-003, T-004 | Source là className literal; không import `@truongdq01/*`; import `@/lib/utils` | Review + E2E render | `registry/shared/ui/*` |
| T-006 | E2E validate — nativewind | Tạo Expo test app ngoài repo (`npx create-expo-app` → /tmp); `npx expo install nativewind tailwindcss@^3 react-native-reanimated`; setup babel/metro/global.css từ item `theme`; thêm components.json template + tsconfig `@/*`; serve `docs/public` local; `npx shadcn add http://localhost:<port>/r/nativewind/button.json` | T-002, T-003, T-004, T-005 | Files land đúng target; deps install; Button render đúng variants + dark mode; không cần sửa tay gì thêm | Chạy app, render showcase nhỏ trong test app | /tmp test app (không commit) |
| T-007 | E2E validate — uniwind | Lặp lại T-006 với uniwind: `bun add uniwind tailwindcss` (v4), metro `withUniwindConfig`, global.css `@import 'uniwind'` + `@theme` | T-006 | Như T-006 cho uniwind variant; ghi nhận mọi divergence → override files nếu cần | Chạy app, render | /tmp test app |
| T-008 | Docs + templates | `registry/README.md` (authoring guide: shared vs variants override, catalog schema, add-flow, authoring rules — literal classes, không import packages cũ); `registry/templates/components.json` + `setup.md` cho consumer; cập nhật README.md root section "Registry (new)" | T-006, T-007 | Một dev đọc doc tự setup được app + add component (self-check bằng chính T-006/T-007 flow) | Doc review; checklist reproduce | `registry/README.md`, `registry/templates/`, `README.md` |

## 6. Execution Order

1. T-001 → T-002 (pipeline chạy được với item rỗng/demo).
2. T-003 → T-004 → T-005 (song song được về mặt file; build được khi cả 3 xong).
3. T-006 (nativewind e2e) — đây là gate kỹ thuật quan trọng nhất.
4. T-007 (uniwind e2e).
5. T-008 (docs — viết từ chính các bước đã chạy tay ở T-006/T-007).

## 7. Verification Strategy

### Automated Checks

- `bun run registry:build` — exit 0, sinh đủ `docs/public/r/{nativewind,uniwind}/*.json`.
- JSON sanity: mỗi item có `name`, `type`, `files[]` với `content` + `target`; deps/registryDependencies là array.
- `bun run lint` + `bun run typecheck` trên repo vẫn xanh (hoặc registry được exclude có chủ đích).

### Manual Checks

- T-006: Expo app render Button các variant + size, toggle dark scheme — màu đổi đúng.
- T-007: tương tự uniwind.
- `npx shadcn add` không báo lỗi; file đích đúng `components/ui/*.tsx`, `lib/utils.ts`, `global.css`.

### Regression Checks

- `packages/*` không bị đụng: `git status` chỉ thấy `registry/`, `scripts/`, `docs/public/r/`, `package.json`, `biome/tsconfig` (nếu cần), README.
- `bun run build` (turbo) vẫn pass cho các package hiện tại.

## 8. Definition of Done

- [ ] `bun run registry:build` sinh JSON hợp lệ cho `theme`, `utils`, `button`, `text`, `card` × 2 variants.
- [ ] `npx shadcn add <local-url>/r/nativewind/button.json` trên Expo app mới: files land đúng, deps cài đủ, Button render đúng light + dark, không sửa tay.
- [ ] Tương tự cho `/r/uniwind/button.json`.
- [ ] Shared source được chứng minh: button.tsx chỉ viết 1 lần, serve cả 2 variants (hoặc ghi nhận override cần thiết).
- [ ] `registry/README.md` + `components.json` + setup template tồn tại và reproduce được T-006/T-007.
- [ ] Repo checks xanh: lint, typecheck, build không regression.
- [ ] Không có thay đổi nào trong `packages/*`.
- [ ] Divergence notes cho M2 (init phải automate những gì đã làm tay).

## 9. Rollback Strategy

- Toàn bộ M1 là file mới (`registry/`, `scripts/build-registry.mjs`, `docs/public/r/`) + vài dòng script trong `package.json` → revert bằng git.
- Test apps ở `/tmp`, không commit, xóa trực tiếp.
- Nếu `docs:build` hook gây lỗi CI deploy docs: gỡ hook, quay lại `docs:build` cũ (một dòng).
- Không chạm `packages/*` → không có rollback phức tạp.

## 10. Risks & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| `shadcn add` reject/break trên RN project (framework detect, cssVars handling) | M1 fail core validation | T-006 sớm nhất có thể; fallback: wrapper CLI mini trong repo scripts trước khi kéo M2 lên; học cấu hình components.json từ rnr template |
| Uniwind không parity thật (class support, theming) | Shared source vỡ | `variants/<v>/` override per file; nhưng nếu divergence nhiều → duy trì 2 source riêng và cập nhật DISCUSSION |
| nativewind version compat với RN 0.83/Expo SDK | Theme/component không compile | Pin version trong T-006 khi verify; ghi vào setup doc + peer deps notes |
| CSS vars trong NativeWind không hoạt động như web | Dark mode/theme lệch | Fallback: theme qua `vars()`/theme object của nativewind; giữ semantic class contract, đổi cách map |
| Registry source bị typecheck/lint scan | CI đỏ | Exclude `registry/` khỏi root tsconfig/biome có chủ đích |
| `docs/public/r/` Astro không copy | Registry không serve được | Verify local trước; nếu cần, emit ra `docs/dist` post-build hoặc dùng `apps/web` làm registry host |

## 11. Open Questions

| ID | Question | Owner | Blocking? |
|---|---|---|---|
| Q-1 | NativeWind version + tailwind version pin chính xác cho variant nativewind | Dev | Yes ở T-006 (resolve trong lúc làm, không block plan) |
| Q-2 | `tailwind-variants` vs `cva` cho variant API — chọn 1, ghi authoring guide | Dev | No — quyết trong T-005 (recommend `tailwind-variants`: uniwind docs recommend, có slots) |
| Q-3 | Item catalog format: single `registry.json` root với variant field, hay per-variant catalogs? | Dev | No — quyết trong T-001 (recommend single root + per-variant override blocks) |
| Q-4 | Domain cuối cho registry URL (docs hiện deploy ở đâu?) | User | No cho M1 (local validate); cần trước khi công bố |

## 12. Handoff To Execution

- Ready for execution: **No — chờ user approve plan/DoD** (milestone lớn, gate theo policy).
- Blocking items: User review plan + DoD.
- Suggested first action sau approve: T-001 scaffold `registry/` + T-002 builder với 1 item demo chạy được `bun run registry:build`.
- Review required before execution: **Yes** — milestone đầu của pivot, cần xác nhận scope/DoD trước khi viết code.
