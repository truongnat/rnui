# Execution — M1: Registry Foundation

## 1. Context

- **Plan source:** `.agents/sessions/shadcn-rn-pivot/PLAN.md` (approved 2026-10-04)
- **Discussion:** `.agents/sessions/shadcn-rn-pivot/DISCUSSION.md`
- **Scope:** `registry/` source tree + builder + theme contract + 3 components đầu + e2e cả 2 variants + docs. Không động `packages/*`.

## 2. Execution Log

| Step | Task | Action | Result |
|---|---|---|---|
| 1 | T-001 | Scaffold `registry/` (shared/, variants/, templates/) + `registry.json` catalog | Done |
| 2 | T-002 | `scripts/build-registry.mjs` — resolve shared/variant override, embed content, rewrite registryDeps theo `RNUI_REGISTRY_BASE_URL`; script `registry:build`; hook vào `docs:build`; gitignore `docs/public/r/` | Done — 10 items |
| 3 | T-003 | Theme items: nativewind `global.css` (@tailwind + :root/.dark vars) + `tailwind.config.ts` + `nativewind-env.d.ts`; uniwind `global.css` (@import + @theme + @custom-variant + .dark) + `uniwind-env.d.ts` | Done |
| 4 | T-004 | `shared/lib/utils.ts` (cn) | Done |
| 5 | T-005 | `shared/ui/{button,text,card}.tsx` — tv() slots, semantic classes, `@/` imports | Done |
| 6 | T-006 | E2E nativewind: Expo SDK 57 / RN 0.86.3 test app + shadcn add | **Pass** (sau fix T-006a) |
| 6a | fix | `declare module '*.css'` thiếu trong env.d.ts → tsc error | Fixed tại source, re-add |
| 6b | note | `expo export` fail: thiếu `react-native-worklets` (peer của Reanimated 4 trên SDK 57) | Cài bằng expo install → bundle pass; đã ghi vào setup.md |
| 7 | T-007 | E2E uniwind: app thứ hai, uniwind 1.12.1 + tailwindcss 4.3.3 | **Pass** (sau fix T-007a) |
| 7a | fix | `className` chưa có types → thêm `uniwind-env.d.ts` (`/// <reference types="uniwind/types" />`) vào theme item | Fixed tại source, re-add |
| 8 | T-008 | `registry/README.md`, `templates/setup.md`, `templates/components.json`, README root section | Done |

## 3. Files Changed

| File | Change | In Plan? |
|---|---|---|
| `registry/registry.json` | Catalog: theme/utils/text/button/card × variant files | Yes |
| `registry/shared/lib/utils.ts` | cn() | Yes |
| `registry/shared/ui/{button,text,card}.tsx` | Components đầu tiên | Yes |
| `registry/variants/nativewind/{global.css,tailwind.config.ts,nativewind-env.d.ts}` | Theme nativewind | Yes |
| `registry/variants/uniwind/{global.css,uniwind-env.d.ts}` | Theme uniwind | Yes (env.d.ts thêm trong e2e) |
| `registry/templates/{components.json,setup.md}` | Consumer templates | Yes |
| `registry/README.md` | Authoring guide | Yes |
| `scripts/build-registry.mjs` | Builder | Yes |
| `package.json` | `registry:build` + hook `docs:build` | Yes |
| `.gitignore` | `docs/public/r/` | Yes |
| `biome.json` | `css.parser.tailwindDirectives` + override `noUnknownAtRules` cho `registry/**/*.css` | Deviation nhỏ (cần cho lint pass) |
| `README.md` | Section "Registry (new — experimental)" | Yes |
| `docs/public/r/**` | Generated output (gitignored) | Yes |

## 4. Commands Run

| Command | Purpose | Result |
|---|---|---|
| `bun run registry:build` (+ `RNUI_REGISTRY_BASE_URL=http://localhost:4999/r`) | Build items | Pass — 10 items |
| `python3 -m http.server 4999 -d docs/public` | Serve registry local | Running |
| `npx create-expo-app rnui-test-nw / rnui-test-uw` (trong /tmp) | Test apps | Pass — SDK 57, RN 0.86.3 |
| `npx expo install nativewind tailwindcss@^3.4 react-native-reanimated react-native-worklets` | Engine setup | nativewind 4.2.7, tw 3.4.19 |
| `npx expo install uniwind tailwindcss` | Engine setup | uniwind 1.12.1, tw 4.3.3 |
| `npx shadcn@latest add …/r/nativewind/button.json card.json` | E2E add | **Pass** — files + deps đúng, registryDeps resolve |
| `npx shadcn@latest add …/r/uniwind/button.json card.json` | E2E add | **Pass** |
| `npx tsc --noEmit` (cả 2 app) | Typecheck consumer | Pass (sau env.d.ts fixes) |
| `npx expo export --platform ios` (cả 2 app) | Metro bundle compile | Pass — 974 modules (nw), 806 modules (uw) |
| `bunx @biomejs/biome check registry/ scripts/` | Lint scope mới | Pass (sau config fix) |
| `bun run lint` / `typecheck` repo | Regression | Skipped — `turbo` chưa install trong env (pre-existing) |

## 5. Verification Evidence

| Check | Method | Result |
|---|---|---|
| `shadcn add` trên Expo app | T-006 | **Pass** — `Created 4 files` (utils, tailwind.config, env.d.ts, button) + `Updated global.css`; deps clsx/tw-merge/tw-variants cài đúng |
| registryDependencies resolution | bare names → absolute URL rewrite | **Pass** — utils+theme kéo theo button; identical files skipped đúng |
| `shadcn add` uniwind | T-007 | **Pass** |
| tsc consumer | `npx tsc --noEmit` | Pass cả 2 |
| Bundle compile | `expo export --platform ios` | Pass cả 2 |
| Shared source | button.tsx 1 file serve cả 2 variants | Proven — cùng content ở 2 output JSON |

## 6. Deviations From Plan

| Deviation | Reason | Follow-up |
|---|---|---|
| `nativewind-env.d.ts` thêm `declare module '*.css'` | tsc consumer báo thiếu type cho side-effect css import | Đã fix tại source |
| `uniwind-env.d.ts` mới | `className` không typecheck nếu thiếu `uniwind/types` | Đã thêm vào theme item |
| `biome.json` bật `tailwindDirectives` + override `noUnknownAtRules` | CSS Tailwind directives bị parse/lint error | Repo-level OK vì giờ có Tailwind source |
| `react-native-worklets` phải cài tay trong test app | Peer của Reanimated 4/SDK 57 — `expo export` fail khi thiếu | Đã ghi trong setup.md; `init` (M2) phải cài |

## 7. Issues / Blockers

| Issue | Type | Next Action |
|---|---|---|
| Dark mode runtime chưa verify (`.dark` class propagation cả 2 engines) | Skipped manual check | Verify visual khi có simulator / hoặc M2 init test |
| `bun run lint`/`typecheck`/`test` repo-level không chạy được (turbo chưa install trong env này) | Environment | Chạy khi `bun install`; biome scoped check đã pass |
| `@custom-variant` + `.dark` block ở uniwind compile được nhưng runtime chưa chắc đúng | Open | T-007 residual; nếu sai → variants/uniwind/global.css sửa |

## 8. Rollback Notes

- Revert các file mới: `registry/`, `scripts/build-registry.mjs` + 4 config edits (`package.json`, `.gitignore`, `biome.json`, `README.md`).
- `docs/public/r/` generated + gitignored — xóa folder.
- Test apps ở `/tmp` — không trong repo.

## 9. Final Status

- Completed: T-001 → T-008, cả 2 e2e variants
- Verification: registry→add→typecheck→bundle đều pass; visual/dark-mode runtime pending
- Notable: **mô hình shadcn-CLI-compatible đã chứng minh hoạt động trên Expo SDK 57 / RN 0.86** cho cả nativewind lẫn uniwind

## 10. Handoff To Review

- Ready for review: **Yes**
- Suggested review focus: theme CSS vars contract (đặc biệt uniwind `.dark`/`@custom-variant` chưa verify runtime); catalog format có đủ cho M3 scale không; `tailwind-variants` choice
- Skipped checks: visual render, dark mode toggle, repo-level turbo lint/typecheck (env), bare RN app (out of M1 scope)
- Divergence notes cho M2 `init`: phải automate — expo install engine+peers (+worklets), babel.config (nw only), metro.config (cả hai), tsconfig `@/*`, components.json, global.css import ở entry

---

# M2 — CLI `@rnui/cli` (init + add + list)

## Execution Log (M2)

| Step | Task | Action | Result |
|---|---|---|---|
| 1 | T-201 | `packages/cli/` — tsup ESM build, bin `rnui`, dep `@clack/prompts` | Done |
| 2 | T-202 | `registry.ts` — base URL resolution (`--registry` > env > default const TODO-domain) | Done |
| 3 | T-203 | `add` — detect variant từ deps, spawn `npx shadcn add <urls>` | Done |
| 4 | T-204..206 | `init` — detect Expo/bare, prompt variant, expo install deps, write babel(nw)/metro/components.json, tsconfig `@/*` merge, `shadcn add theme`, css import vào entry (App.tsx hoặc _layout) | Done |
| 5 | T-207 | E2E nativewind: fresh Expo app → init → add button card → tsc + export | **Pass** — 972 modules bundle |
| 6 | T-207 | E2E uniwind: same flow | **Pass** — tsc + export pass |
| 7 | T-208 | Docs sync (registry/README, setup.md), lint fix | Done |

## Key learnings (M2)

- `registryDependencies` bare names resolve về **default shadcn registry** (ui.shadcn.com) → 404. Bắt buộc build với `RNUI_REGISTRY_BASE_URL` để emit absolute URLs. Đây là lý do init/add phải luôn trỏ đúng base.
- `init` ăn chính registry (`shadcn add theme`) — single source of truth.
- File tồn tại → backup `.bak` + confirm prompt (không auto-ghi-đè).
- `@rnui/cli` scope trên npm còn trống; `rnui` unscoped đã bị chiếm (v0.0.1 placeholder) → quyết định scope khi publish.

## M2 Verification Evidence

| Check | Result |
|---|---|
| `rnui init --variant nativewind --yes` trên Expo trống | deps + babel + metro + components.json + tsconfig + theme + css import — không sửa tay |
| `rnui init --variant uniwind --yes` | metro-only config, uniwind-env.d.ts, no babel file |
| `rnui add button card` (cả 2 app) | files land, deps cài, identical skip đúng |
| `npx tsc --noEmit` (cả 2 app) | Pass |
| `npx expo export --platform ios` (cả 2 app) | Pass |
| `biome check packages/cli/src` + `tsc --noEmit` | Pass |
| `rnui list` | Fetch index.json in catalog |

## M2 Open items

- ~~`DEFAULT_REGISTRY_BASE` placeholder~~ → đã trỏ `rnui.vercel.app/r` (astro `site`). Builder default cũng về domain này; local dev override `RNUI_REGISTRY_BASE_URL`.
- Bare RN init: warn + best-effort config, chưa verify (out of M2 scope).

---

# M3 — Component Wave 1 (shadcn-core parity, 14 items)

## Execution Log (M3)

| Step | Task | Result |
|---|---|---|
| T-301 | Author 14 components: input, label, textarea, checkbox, switch, radio-group, select, separator, skeleton, badge, avatar, alert, dialog, progress | Done — shared-source |
| T-302 | Thêm `lucide-react-native` + `react-native-svg` vào ENGINE_DEPS (cả 2 variants) | Done |
| T-303 | `registry:build` → 38 items (19 × 2 variants) | Pass |
| T-304 | E2E nativewind app: add 14 → tsc → export iOS (2984 modules) | Pass |
| T-304 | E2E uniwind app: add 14 → tsc → export iOS (2812 modules) | Pass |
| T-305 | Docs + EXECUTION sync | Done |

## Key learnings (M3)

- **Prop name divergence giữa 2 engines**: nativewind dùng `placeholderClassName`, uniwind dùng `placeholderTextColorClassName` cho TextInput placeholder. Fix trong shared source: truyền cả hai qua spread cast `Partial<TextInputProps>` (input.tsx, textarea.tsx) — mỗi engine đọc prop của mình, bỏ qua prop kia. Đây là kiểu khác biệt sẽ gặp lại; authoring guide cần ghi rule này.
- `accessibilityState` yêu cầu `boolean | undefined` — `disabled` từ PressableProps là `boolean | null | undefined` → coerce `!!disabled`.
- RN `Modal` đủ dùng cho select/dialog wave 1 — không cần portal lib.
- Avatar fallback: cả Image + Fallback đều `absolute inset-0`; Image cần `zIndex` (hoặc render sau) để nằm trên fallback; onError → unmount image, fallback lộ ra.
- Select v1 là bottom-sheet style Modal — anchor popover để wave 2.
- Switch/Skeleton dùng RN core `Animated` (không reanimated) → uniwind variant không cần reanimated chỉ vì components.

## M3 Open items

- Uniwind web export vẫn ra CSS 0B (đã note từ M1) — cần runtime check trên device.
- Dark mode toggle chưa visual-verify trên cả 2 engines.
- `rnui list` giờ show 19 items — ok.

---

# M5 — Wave 2 (14 items + block) / M6 — Themes / M4 — Docs

## Execution Log

| Task | Result |
|---|---|
| Author 14 wave-2: accordion, tabs, toggle, toggle-group, collapsible, sheet, popover, dropdown-menu, toast, slider, table, breadcrumb, pagination, command | Done |
| `login-screen` block (`registry:block` → `components/blocks/`) | Done |
| `scripts/gen-themes.mts` — 7 brands từ `packages/themes` → `registry/themes/*.json` | Done |
| Builder: hex→HSL + rgba() composite lên background; emit `theme-<brand>` per variant | Done — 82 items total |
| `scripts/gen-component-docs.mjs` → 33 mdx vào `docs/.../registry/` + sidebar | Done — `astro build` pass, 132 pages |
| E2E wave 2 + theme-matcha trên cả 2 test app: add → tsc → export iOS | **Pass** |

## Key learnings (M4–M6)

- **Theme dedup race**: `theme-*` item target `global.css` trùng `theme` dep mọi UI item kéo theo → shadcn dedupe, default thắng. Fix: `rnui add` tách `theme-*` sang pass thứ hai (always applied last).
- `-y`/`--yes` của rnui phải map sang `--yes --overwrite` của shadcn; trước fix, `-y` bị coi là item name.
- Brand presets có giá trị `rgba()` (y2k) — composite alpha lên `background` của scheme khi convert HSL.
- Pressable ref là `Ref<View>` — không cast `Ref<Pressable>` (Pressable là value).
- `PressableProps['children']` có thể là function — khai báo `Omit<children>` + `ReactNode` cho wrapper components.
- M4: preview trực tiếp trong docs vẫn là RN-in-web problem — docs v1 dùng code snippets; component pages auto-generate từ catalog + SNIPPETS map trong script.

## Final state

- **34 registry items** (33 catalog + utils/theme) + 7 brand themes × 2 variants = **82 emitted JSON**.
- CLI: `init` / `add` (multi-item, theme-aware, `-y` noninteractive) / `list`.
- Docs: `/registry/` section, 33 pages generated.
- `docs:build` chain: `build-registry` → `astro build` (needs `RNUI_REGISTRY_BASE_URL` set trên Vercel cho absolute dep URLs).

## Open items (all M)

- ~~Dark mode / runtime visual chưa verify trên device~~ — **DONE, see Native visual verification below.**
- ~~Uniwind web export CSS 0B~~ — **web out of scope** (user quyết định: tập trung app, web chưa care). Components/registry chỉ target iOS + Android.
- `DEFAULT_REGISTRY_BASE` placeholder — cần domain docs deploy thật.
- CLI chưa publish (`@rnui/cli` scope trống trên npm).
- Bare RN init best-effort, chưa verify.
- Blocks mới 1 cái (login-screen) — cần thêm waves sau.

---

# Native visual verification (iOS Simulator, iPhone 17 / iOS 26.3)

## Result — dark mode hoạt động trên cả 2 engines sau 3 fix tại source

| | nativewind (zinc) | uniwind (matcha) |
|---|---|---|
| Light | ✅ `/tmp/rnui-nw-light2.png` | ✅ `/tmp/rnui-uw-light.png` |
| Dark (system) | ✅ `/tmp/rnui-nw-dark5.png` | ✅ `/tmp/rnui-uw-dark6.png` |

Badge `self-start` fix cũng verified visual (pills đúng kích thước, không full-width).

## 3 fix tại source

1. **nativewind `global.css`: `.dark` → `.dark:root`** — css-interop
   `isRootDarkVariableSelector` chỉ nhận `.dark:root` (hoặc `:root[class~=dark]`)
   khi `darkMode:'class'`; `.dark` trần rớt xuống className matching → vars
   không bao giờ apply. `darkMode: 'media'` cũng sai — nó tắt nhận diện
   `.dark:root` luôn. Giữ `darkMode: 'class'` + `.dark:root` → dark vars
   theo system appearance.
2. **uniwind `global.css`: `.dark {}` → `@layer theme { :root { @variant light/dark {} } }`**
   — uniwind scan `@variant <theme>` blocks cho runtime theme vars; `.dark`
   class selector chỉ tạo scoped vars cho element có className `dark`.
   Cả `light` lẫn `dark` đều phải khai báo đủ (uniwind báo lỗi "All themes
   must have the same variables"). Bỏ `@custom-variant dark` khỏi template —
   uniwind tự generate kèm `prefers-color-scheme` fallback.
   `scripts/build-registry.mjs::renderUniwindCss` cập nhật theo.
3. **`rnui init` giờ patch `app.json` → `userInterfaceStyle: "automatic"`**
   (`ensureAppJsonStyle` trong `files.ts`) — Expo template default `"light"`
   lock cứng light mode, dark vars không bao giờ kích hoạt.

## Caveats

- `theme` nằm trong `registryDependencies` của mọi UI item → `rnui add <ui>`
   sau khi `add theme-<brand>` sẽ ghi đè `global.css` về base zinc. Trade-off
   có chủ đích (standalone `shadcn add` cần theme dep); workaround: add lại
   brand theme sau. Có thể cân nhắc tách `theme` khỏi deps ở round 2.
- Uniwind metro cần restart (không chỉ reload) để rebuild CSS artifacts sau
  khi `global.css` đổi — dev-exp note, không phải bug của registry.
- Warning `text-muted-foreground ... accentColor` từ uniwind — cosmetic,
  liên quan accent-color utility detection, không ảnh hưởng render.

---

# Wave 3 — shadcn parity (10 items)

## Execution Log

| Item | Notes |
|---|---|
| `alert-dialog` | Confirm/cancel modal — backdrop không dismiss (khác `dialog`) |
| `aspect-ratio` | `aspectRatio` style prop |
| `scroll-area` | ScrollView wrapper |
| `tooltip` | press/long-press anchored bubble |
| `context-menu` | long-press anchored menu |
| `drawer` | edge slide-in, RN `Animated` (không reanimated dep) |
| `carousel` | FlatList snapToInterval + arrows |
| `calendar` | month grid, controlled/uncontrolled month |
| `input-otp` | hidden TextInput + slot boxes |
| `form` | FormField context: FormLabel/Description/Message + error state |

## Verify

- Registry: 44 catalog items → **102 emitted JSON** (2 variants × 51).
- `rnui add` 10 items → files land trên cả 2 test apps.
- `tsc --noEmit` pass cả hai; `expo export` iOS pass cả hai.
- `biome check` registry sạch.
- Docs regen → 43 mdx pages, `astro build` **142 pages** pass.
- Fix trong wave: RN không có `order` style prop (drawer restructure);
  frontmatter `description` chứa `:` phá YAML → quote bằng `JSON.stringify`.

## Skipped với lý do (không áp dụng native)

`hover-card` (không có hover trên touch), `menubar`/`navigation-menu`
(desktop patterns), `resizable`, `sidebar` (web app-shell),
`chart`/`data-table`/`sonner` (cần quyết định lib/chart riêng —
`toast`+`table` đã cover nền).

---

# Wave 4 — RNUI-specific (16 items, không có trong shadcn)

## Execution Log

| Item | Ghi chú |
|---|---|
| `app-bar` | top nav bar: leading/back, title, trailing actions |
| `chip` | tag/filter — filled/outlined, selected, removable |
| `fab` | floating action button — sm/md/extended |
| `segmented-control` | iOS-style option switcher |
| `stepper` | horizontal step indicator |
| `rating` | star rating (lucide `Star` + fill) |
| `timeline` | vertical timeline, dot+connector |
| `marquee` | infinite scroll loop — RN Animated |
| `empty-state` | icon/title/description/action placeholder |
| `circular-progress` | SVG ring — `react-native-svg` dep |
| `date-picker` | input trigger → calendar modal (dep `calendar`) |
| `snackbar` | inverse-colors bottom bar + action |
| `autocomplete` | input + filtered dropdown (dep `input`) |
| `bottom-navigation` | tab bar icon+label |
| `icon-button` | square icon-only button, 4 variants |
| `speed-dial` | FAB expanding mini actions |

Bỏ qua `bottom-sheet` (`sheet` đã cover), `divider` (`separator`),
layout primitives `box`/`stack`/`grid`/`paper`, text display
`typography`/`blockquote`/`code-block` (`text` variants cover nền),
`tab-bar` (≈`bottom-navigation`), `menu` (≈`dropdown-menu`/`context-menu`).

## Verify

- Catalog **60 items** → **134 emitted JSON** (67 × 2 variants).
- `rnui add` 16 items → cả 2 test apps; `tsc --noEmit` pass cả hai;
  `expo export` iOS pass cả hai.
- `biome check` registry sạch; `astro build` **158 pages** pass
  (59 trang registry generated).

## Coverage

Registry giờ ~60 components — vượt xa rnr (~30). Skipped nhóm desktop-only
(`hover-card`, `menubar`, `navigation-menu`, `resizable`, `sidebar`) và
nhóm cần lib riêng (`chart`, `data-table`, `sonner`).

---

# Wave 5 — list primitives + blocks (4 UI + 3 blocks)

## Items

- `list-item` — row primitive + `ListSeparator` + `ListSectionTitle`
- `settings-menu` — grouped settings list (deps `list-item`)
- `chat-list-item` — avatar, online dot, preview, time, unread badge
  (deps `avatar`, `badge`)
- `message-input` — multiline input + send (deps `input`, lucide)
- Blocks: `settings-screen`, `profile-screen`, `onboarding-screen`

## Verify

- Catalog **67 items** → **148 emitted JSON**.
- `rnui add` wave-5 items + blocks → cả 2 apps; `tsc` + `expo export` iOS
  pass cả hai.
- `astro build` **165 pages** (66 registry docs); biome sạch.

## Registry totals

- **62 UI components** + utils + theme + 7 brand themes + 4 blocks.
- Chưa port: `chart` (cần chọn lib — victory-native/skia), `data-table`,
  các primitive layout (`box`/`stack`/`grid` — ít giá trị với className).

---

# Wave 6 — chart (Skia) + data-table

## Items

- `chart` — Skia-rendered: `BarChart`, `LineChart` (smooth cubic), `DonutChart`
  (center label/value), `ChartLegend`. Default palette light/dark aware via
  `useColorScheme`; `colors` prop override; per-datum `color` override.
  dep: `@shopify/react-native-skia`
- `data-table` — sortable table on `table` primitives; tap header cycles
  asc/desc/clear; custom `render` per column; `onRowPress`.
  dep: `lucide-react-native`
- `table` — `TableRow` gained optional `onPress` (wraps row in Pressable).

## Findings

- **Skia v2 breaking API**: `Skia.Path.Make()` returns immutable `SkPath` —
  `moveTo`/`cubicTo`/`arcToOval` no longer exist on it. Use
  `Skia.PathBuilder.Make().moveTo(...).build()` instead.
- Skia ships in Expo Go → chart works without dev build.
- Palette approach chosen over `--chart-*` CSS vars: engines don't expose
  CSS vars at runtime uniformly; `colors` prop + light/dark palettes is
  engine-agnostic.

## Verify

- Catalog **69 items** → **152 emitted JSON**.
- `rnui add chart data-table` → cả 2 apps; skia dep auto-installed; `tsc` +
  `expo export` iOS pass cả hai.
- `astro build` **167 pages**; biome sạch.

## Registry totals

- **64 UI components** + utils + theme + 7 brand themes + 4 blocks.
- **Verified trên iOS Simulator (Expo Go)**: BarChart, LineChart (smooth
  cubic + dots), DonutChart (center label), ChartLegend — screenshot
  `/tmp/rnui-chart7.png`.
- **Expo Go version pin**: `expo install` resolves skia `2.6.2` for SDK 57;
  npm latest (`2.14`) mismatches Expo Go's bundled native module → runtime
  crash `nativeRecorder.getId()`. Registry dep pinned `@2.6.2`.

## Closeout

- `DEFAULT_REGISTRY_BASE` → `https://rnui.vercel.app/r`; builder mặc định cùng base (env `RNUI_REGISTRY_BASE_URL` override cho local).
- Dist rebuilt. `@rnui/cli` chưa publish — cần npm org `rnui` hoặc đổi tên `@truongdq01/cli`.
- **CLI distribution đổi sang `npx github:`** — không publish npm. Orphan-style
  branch `cli` chỉ chứa `package.json` + `cli.js` (tsup bundle 56KB,
  `noExternal: ['@clack/prompts']`). Dùng: `npx github:truongnat/rnui#cli`.
  Đã e2e `list` thành công từ git remote. Rebuild workflow ghi trong
  `registry/README.md` § Updating the cli branch.
- **Docs site removed entirely** — registry JSON committed to `registry/dist/`
  (`.gitignore` exception `!registry/dist/`), served via
  `raw.githubusercontent.com/truongnat/rnui/master/...`. No deploy needed.
  Both develop + master updated; e2e `npx github:truongnat/rnui#cli add button`
  works against production raw URL.
