# Discussion — RNUI thành "shadcn/ui của React Native"

## 1. Goal

Pivot RNUI từ npm-package UI kit sang **mô hình shadcn/ui cho React Native**:

- Developer chạy `npx shadcn add https://<domain>/r/button.json` (hoặc `npx rnui add button`) → source code component được copy vào project, dev sở hữu và tự chỉnh sửa.
- Styling bằng **NativeWind/Tailwind** (đã chốt) thay vì token system custom hiện tại.
- Làm lần lượt đủ các milestone: registry → CLI → components → docs → blocks/themes.

## 2. Desired Outcome

- Registry JSON chuẩn shadcn schema serve được qua HTTP, install được bằng shadcn CLI trên một Expo/RN app thật.
- CLI riêng (`rnui`) xử lý `init` (setup NativeWind, babel/metro, theme) và `add` cho trải nghiệm RN-native.
- Bộ component NativeWind self-contained, bắt đầu từ core primitives, mở rộng dần về phía coverage 81 components.
- Docs site kiểu ui.shadcn.com: preview + code + copy + theme switcher.
- Điểm khác biệt rõ so với incumbent (React Native Reusables): nhiều component hơn, animation-first, multi-brand themes, AI schema/builder.

## 3. Context / Confirmed Facts

| Fact | Source |
|---|---|
| RNUI hiện có 81 components, token system custom (không NativeWind), component dạng multi-file folder, publish npm `@truongdq01/*` v1.0.3 | `packages/ui`, `package.json` |
| shadcn CLI hỗ trợ custom registry: `npx shadcn add <url>/r/item.json`; registry chỉ là JSON tĩnh theo `registry.json` + `registry-item.json` schema; `shadcn build` generate output | ui.shadcn.com/docs/registry |
| React Native Reusables (rnr) là incumbent "shadcn for RN": ~8K stars, dùng shadcn CLI + wrapper `@react-native-reusables/cli`, hỗ trợ cả `nativewind` và `uniwind` variants | github.com/founded-labs/react-native-reusables |
| shadcn CLI có programmatic API (`addRegistryItems`, `loadRegistry`, `resolveRegistryItems`) để build wrapper CLI | ui.shadcn.com/docs/registry/api-reference |
| Repo đã có: docs Astro deploy Vercel (`vercel.json` → `docs/dist`), `apps/web` builder Next.js + react-native-web, `component-schema` + `renderer` packages, `.ai/` registry metadata | repo |
| Chưa có: CLI nào, source registry nào, component NativeWind nào | repo |
| Registry items có thể khai `cssVars` (light/dark), `dependencies`, `registryDependencies`, `files[].target` | registry-item.json schema |
| rnr cũng ship lib files (theme hook, `cn()`) như `registry:lib` items → pattern áp dụng được cho theme/utils RNUI | rnr registry |

## 4. Constraints

| Constraint | Details | Impact |
|---|---|---|
| Peer deps RN | Reanimated ≥4.2, Gesture Handler ≥2.30, Worklets ≥0.7, Safe Area, SVG, lucide | Registry items phải khai `dependencies` đúng; `init` phải cài đặt được |
| NativeWind version | Cần chọn/pin version tương thích RN ≥0.83, Expo SDK hiện tại | Ảnh hưởng cách viết className/vars trong mọi component |
| npm packages hiện tại | `@truongdq01/ui` v1.0.3 đã publish | Không break consumer hiện tại; quyết định maintain song song hay converge |
| shadcn CLI hướng web | `components.json`, tailwind config được thiết kế cho web; RN cần setup riêng | `init` trên RN project cần wrapper CLI hoặc hướng dẫn thủ công |
| Hosting registry | Docs deploy Vercel từ `docs/dist` | Registry JSON phải nằm trong build output (`docs/public/r/`) hoặc app riêng |

## 5. Assumptions

| ID | Assumption | Risk If Wrong | Needs Confirmation? |
|---|---|---|---|
| A-1 | ~~Giữ npm packages hoạt động (maintenance)~~ → **CHỐT: deprecate dần** — npm packages đóng băng, registry là distribution duy nhất dài hạn | Messaging/migration path cho consumer hiện tại | Đã chốt |
| A-2 | Registry host trên docs domain hiện có (Vercel) | Nếu cần domain/app riêng → thêm infra work | Không (có thể đổi sau, effort thấp) |
| A-3 | ~~NativeWind duy nhất~~ → **CHỐT: cả nativewind + uniwind variants từ đầu** (theo rnr) | Gấp đôi component source; cần theme layer trừu tượng tốt | Đã chốt |
| A-4 | Port theo tier (core trước), không port cả 81 một lúc | Nếu user muốn full coverage ngay → effort và timeline đổi lớn | Không (đã chọn "lần lượt") |
| A-5 | Tên CLI/brand giữ "rnui" (`npx rnui add`) | Trùng tên npm → phải đổi scope/tên | Có (check npm availability khi làm M2) |
| A-6 | ~~Spike verify NativeWind trước~~ → **CHỐT: plan luôn**, xử lý version compat trong lúc làm M1 | Có thể phải rework nếu version không tương thích | Đã chốt |

## 6. Unknowns / Open Questions

| ID | Question | Owner | Blocking? |
|---|---|---|---|
| U-1 | NativeWind version nào tương thích tốt RN 0.83+ / Expo SDK hiện tại (v4 vs v5)? | Dev | Yes — cần verify trước khi viết component đầu tiên |
| U-2 | ~~Có hỗ trợ uniwind variant không?~~ → **ĐÃ CHỐT: cả hai từ đầu** — registry có `nativewind/` và `uniwind/` variants | Product | Resolved |
| U-3 | Coverage mục tiêu: port bao nhiêu trong 81 components? Tier nào gồm những gì? | Product | No — chốt khi planning M3 |
| U-4 | npm availability cho tên `rnui` / `@rnui/cli` | Dev | No — check khi làm M2 |
| U-5 | Converge hay diverge: registry components có reuse được logic headless hiện tại không, hay viết mới theo className? | Dev | Yes — quyết định kiến trúc quan trọng ở M1 |

## 7. Scope

### In Scope

- Registry source tree + build pipeline (`shadcn build` hoặc tương đương) → JSON tĩnh.
- Theme mapping: tokens hiện tại → CSS vars (light/dark) theo convention shadcn/NativeWind.
- Core lib files (`cn()`, theme hooks, portal/primitive helpers) dạng `registry:lib` items.
- CLI cho init/add trên Expo và bare RN.
- Port components theo wave.
- Docs site kiểu shadcn (preview + copy + theme).
- Blocks/screen templates (tận dụng `component-schema` + `renderer`).
- Multi-brand themes dạng registry items (`cssVars`).

### Out of Scope

- Rewrite/deprecate `@truongdq01/ui` npm packages ngay lập tức.
- ~~Hỗ trợ uniwind ở phase đầu~~ → **IN SCOPE**: cả `nativewind/` + `uniwind/` variants từ đầu (đã chốt).
- Monorepo consumer tooling ngoài Expo/bare RN (VD: web-only Next target).
- Community/registry third-party hosting của người khác.

### Non-Goals

- Không sao chép nguyên component set hay visual của rnr — RNUI giữ design language riêng.
- Không tối ưu cho web/React DOM — focus React Native.
- Không fork shadcn CLI — dùng API/registry schema công khai.

## 8. Success Criteria / Draft Acceptance Signals

| ID | Signal | How To Verify |
|---|---|---|
| SC-1 | `npx shadcn add <registry-url>/r/button.json` trên Expo app mới tạo → file được copy, render đúng light/dark | Chạy trên app Expo thật, chụp/verify UI |
| SC-2 | `rnui init` trên Expo app trống setup xong NativeWind + theme + components.json mà không cần sửa tay | E2E init trên app mới |
| SC-3 | `rnui add button input card` cài đủ deps + registry deps + files đúng target | E2E add; typecheck app pass |
| SC-4 | Ít nhất 15-20 core components có trong registry, mỗi cái install được độc lập | Registry build + add từng item |
| SC-5 | Đổi brand theme qua registry item hoặc customizer → app đổi màu light/dark đúng | Demo theme switch |
| SC-6 | Docs page cho từng component: preview + code + nút copy registry command | Review docs site |

## 9. Decision Criteria

| Criteria | Why It Matters |
|---|---|
| Compat với shadcn ecosystem | Dùng được `npx shadcn add` ngay = zero-install cho dev đã biết shadcn; registry schema chuẩn mở đường cho community registries |
| Time-to-first-install | Validate mô hình trên app thật càng sớm càng tốt trước khi port 81 components |
| Integration Impact | Quyết định reuse headless/token hay viết mới ảnh hưởng lớn effort và maintainability |
| Risk | shadcn CLI trên RN project có friction đã được chứng kiến (rnr issue #495); NativeWind version churn |
| Reversibility | Registry source tree mới không động vào packages cũ → dễ rollback |

## 10. Options Considered

### Kiến trúc phân phối

| Option | Summary | Pros | Cons | Effort | Risk | Reversibility | Verify Method |
|---|---|---|---|---|---|---|---|
| A. Registry thuần + shadcn CLI | Build registry JSON, docs hướng dẫn `npx shadcn add <url>` | Không phải viết CLI; compat tức thì; MVP nhanh nhất | `init` trên RN friction cao (components.json, tailwind, babel/metro setup thủ công); UX "RN-native" kém | Low-Med | Med | Easy | add 1 component vào Expo app |
| B. Registry + wrapper CLI (rnr model) | Registry như A + `@rnui/cli` wrap `shadcn/registry` API cho `init`/`add` | UX `init` tốt cho RN/Expo; kiểm soát được; vẫn compat shadcn CLI | Thêm effort viết/maintain CLI; phụ thuộc API shadcn | Med-High | Med | Easy | e2e init+add trên Expo/bare RN |
| C. Registry + CLI format riêng | Tự định nghĩa schema + CLI | Tự do hoàn toàn | Mất compat ecosystem shadcn; nhiều việc nhất; ít giá trị thêm | High | High | Medium | — |

### Chiến lược component source

| Option | Summary | Pros | Cons | Effort | Risk | Reversibility |
|---|---|---|---|---|---|---|
| X. Viết mới NativeWind tree (`registry/ui/*`) | Components mới self-contained, className + cn(), reuse ý tưởng từ packages/ui | Đúng chuẩn shadcn (đơn file, sở hữu code); không lôi token system vào project user | Trùng logic với packages/ui; port lại từng cái | Med/component | Med | Easy |
| Y. Flatten packages/ui + ship token lib | Bundle component hiện tại thành file + copy tokens/headless như lib items | Reuse tối đa; nhanh có coverage | Không NativeWind (vi phạm quyết định styling); kéo theo dep nặng; ít "shadcn feel" | Med | High | Medium |
| Z. Hybrid: core mới NativeWind + headless logic port có chọn | Viết mới UI, port hook logic (gesture/a11y) khi đáng giá | Giữ được behavior tốt (usePressable...) mà vẫn className styling | Phải review từng hook xem port được không | Med-High | Med | Easy |

## 11. Recommendation

### Recommended Option

**B cho phân phối** (registry + wrapper CLI) **+ Z cho component source**, thực hiện theo thứ tự:

1. **M1 — Registry foundation**: tạo `registry/` source tree; theme tokens → CSS vars; lib items (`cn()`, theme); pipeline `shadcn build` → `docs/public/r/`; validate `npx shadcn add` trên Expo app với Button + Text + Card. **Đây là checkpoint quan trọng nhất** — chứng minh mô hình trước khi đầu tư lớn.
2. **M2 — CLI `@rnui/cli`**: `init` (detect Expo/bare, cài nativewind, babel/metro, global.css, components.json, provider setup) + `add`/`list`/`diff` wrap shadcn API.
3. **M3 — Component wave 1** (~15-20 core: Button, Text/Typography, Input, Card, Badge, Avatar, Checkbox, Switch, Radio, Select/Dialog primitives, Skeleton, Separator…).
4. **M4 — Docs kiểu shadcn**: component page = preview (react-native-web hoặc renderer sẵn có) + code + copy command + theme switcher.
5. **M5 — Wave 2 components + blocks**: mở rộng coverage; screen templates dùng lại `component-schema`/`renderer`.
6. **M6 — Theme customizer + multi-brand**: brand presets thành theme items; trang chỉnh màu/radius xuất cssVars.

### Why This Option

- Option A đủ cho M1 validation nhưng `init` trên RN bằng shadcn CLI thuần friction cao — rnr phải viết wrapper vì lý do này. B tốn thêm effort nhưng là trải nghiệm đúng chuẩn.
- Option Z giữ được tài sản lớn nhất của RNUI: behavior/a11y/animation đã kiểm chứng trong headless hooks — port có chọn thay vì viết lại mù hoặc kéo cả token system.
- Thứ tự M1→M2→M3… đặt validation rẻ nhất lên đầu; mỗi milestone shippable độc lập.

### Why Not The Alternatives

- Y (flatten token system): trực tiếp vi phạm quyết định NativeWind đã chốt; kéo `@truongdq01/*` deps vào project user → mất "own the code".
- C (format riêng): từ bỏ compat với shadcn CLI mà không đổi được lợi ích tương xứng.

### Confidence

Medium-High — hướng đi đã được rnr chứng minh khả thi; unknown chính là NativeWind version compat (U-1) và mức reuse được của headless hooks (U-5).

## 12. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Incumbent rnr đã chiếm vị thế "shadcn for RN" (~8K stars) | Khó cạnh tranh awareness | Khác biệt hóa: 81-component coverage, animation-first, multi-brand, AI builder; không clone rnr |
| NativeWind version churn (v4/v5, uniwind nổi lên) | Component phải viết lại | Pin version ở M1 sau khi verify U-1; theme qua CSS vars trừu tượng hóa styling lib |
| shadcn CLI friction trên RN (components.json hướng web) | `init` lỗi trên app thật | Wrapper CLI (M2); test matrix Expo SDK + bare RN; học từ issues của rnr |
| Port 81 components là effort rất lớn | Timeline dài, mất momentum | Tiered rollout; core wave trước; một số component (BottomSheet, Toast) phụ thuộc gesture — làm sau |
| Hai hệ styling song song (token npm + NativeWind registry) | Gấp đôi maintenance | Ghi rõ packages cũ vào maintenance mode; dài hạn quyết định converge khi registry đủ coverage |
| Gesture/overlay components cần setup root (GestureHandlerRootView, portal) | Component cài xong không chạy | `init` phải setup provider; registry item khai `docs`/postinstall note rõ |

## 13. Decision Log

| Decision | Reason | Date / Context |
|---|---|---|
| Distribution = copy-paste registry + CLI | User chọn "Copy-paste + CLI registry" | 2026-10-04 |
| Styling = NativeWind/Tailwind | User chọn NativeWind; chuẩn của phân khúc shadcn-for-RN | 2026-10-04 |
| Làm lần lượt tất cả milestone | User chọn "làm lần lượt cho hết" | 2026-10-04 |
| Registry phải compatible shadcn CLI | Compat tức thì, ecosystem sẵn có, rnr chứng minh pattern | Discussion này |
| npm packages → deprecate dần | User chốt; registry là distribution duy nhất dài hạn | 2026-10-04 |
| Cả nativewind + uniwind variants từ đầu | User chốt; theo rnr pattern, tránh rework khi uniwind phổ biến | 2026-10-04 |
| Skip spike, plan luôn | User chốt; version compat xử lý trong M1 | 2026-10-04 |

## 14. Handoff To Planning

- **Recommended direction:** Option B + Z, milestone sequence M1→M6 như trên.
- **First planning target:** **M1 — Registry foundation** (nhỏ nhất có thể verify: registry build + `shadcn add` vào Expo app thật).
- **Suggested first task:** Spike verify U-1 (NativeWind version trên RN 0.83/Expo) + scaffold `registry/` tree + 1 component end-to-end.
- **Blocking questions:** U-1 (NativeWind version), U-5 (mức reuse headless), A-1 (npm packages maintenance mode?).
- **Required artifacts:** `PLAN.md` cho M1; registry spike notes.
- **Suggested next skill:** `research` (nhanh, cho U-1 + khảo sát chi tiết rnr registry structure) rồi `planning` cho M1.
