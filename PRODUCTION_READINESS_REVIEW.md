# 🔍 RNUI — Production Readiness Review Report

**Phạm vi:** Monorepo `rnui` — 6 packages (`tokens`, `headless`, `ui`, `themes`, `component-schema`, `renderer`) + apps (`example`, `web`, `storybook`, `docs`).
**Ngày review:** 04/07/2026 · **Phiên bản:** `@truongdq01/* @ 1.0.3`
**Phương pháp:** đọc config gốc + 3 luồng khảo sát song song (Performance / Security / Quality) + tự xác minh trực tiếp các phát hiện trọng yếu.

---

## 1. Bảng điểm tổng quan (Scorecard)

| # | Tiêu chí | Điểm | Trạng thái | Ghi chú nhanh |
|---|----------|:----:|:----------:|---------------|
| 1 | **Kiến trúc & Tổ chức code** | 8.5 / 10 | 🟢 Tốt | Ranh giới package sạch, layering rõ (tokens→headless→ui→renderer) |
| 2 | **Clean Code** | 7.0 / 10 | 🟡 Khá | Convention nhất quán, nhưng có stub/dead prop, TODO trong API public |
| 3 | **Code Quality (Type safety)** | 6.5 / 10 | 🟡 Khá | ~28 vị trí `any`/cast trong `ui/src`, vi phạm rule strict của chính repo |
| 4 | **Security** | 7.5 / 10 | 🟡 Khá | Không eval/secret/network; rủi ro chính: `Linking.openURL` không validate |
| 5 | **Performance & Cache** | 6.5 / 10 | 🟡 Khá | Nền tảng tốt, nhưng Autocomplete/Carousel không virtualize, context re-render rộng |
| 6 | **Testing / CI / Release** | 8.0 / 10 | 🟢 Tốt | 116+ file test, CI đầy đủ, có perf regression test |
| | **TỔNG (trung bình)** | **7.3 / 10** | 🟡 | **Gần production-ready — cần 1 đợt hardening trước khi release** |

> **Kết luận sơ bộ:** **CONDITIONAL GO** — có thể release sau khi xử lý nhóm **P0** (mục 8). Không có lỗ hổng chặn (blocker) nghiêm trọng trong artifact npm, nhưng có nợ về type-safety và một số rủi ro bảo mật phía consumer cần đóng.

---

## 2. Kiến trúc & Tổ chức code

| Hạng mục | Đánh giá | Bằng chứng | Mức |
|----------|----------|------------|:---:|
| Phân lớp package | 🟢 Rõ ràng: `tokens` (giá trị) → `headless` (logic/a11y) → `ui` (styled) → `renderer` (tooling schema) | `tsconfig.json` project references; `packages/ui/package.json:46-49` chỉ dep `headless`+`tokens` | ✅ |
| Ranh giới package | 🟢 Không vi phạm: `tokens`/`headless` không import UI; không package lib nào import từ `apps/` | Xác nhận qua khảo sát toàn bộ `src` | ✅ |
| Cross-import nhỏ | 🟡 Vài component `ui` import trực tiếp `@truongdq01/tokens` thay vì qua `headless` | `Switch`, `Radio`, `Rating`, `Checkbox`, `Gradient`, `Button/resolveButtonColor` | Low |
| Cấu trúc thư mục component | 🟢 Nhất quán: `Component.tsx` + `index.ts` (81/80), `types.ts` cho compound | — | ✅ |
| Coupling chéo folder | 🟡 `Calendar/` import util từ `DatePicker/calendarUtils.ts` | `packages/ui/src/components/Calendar/Calendar.tsx:4-10` | Medium |
| Barrel export | 🟢 `packages/ui/src/index.ts` đầy đủ 80 component; 1 chiều, **không có circular dep** | — | ✅ |
| Đặt tên context | 🟡 Trộn `context.ts` và `*Context.tsx` (Alert, Breadcrumb, ButtonGroup) | — | Low |
| File quá lớn (>400 dòng) | 🟡 `web-preview.ts` (1090), `Autocomplete.tsx` (890), `useSlider.ts` (566) | — | Medium |
| Tên export lệch | 🟡 `Image/Image.tsx` export `RnImage` nhưng barrel `export *` → consumer nhận `RnImage`, không phải `Image` | `packages/ui/src/components/Image/Image.tsx:25` | Medium |

**Điểm mạnh:** Đây là điểm sáng nhất của dự án — layering đúng chuẩn design-system, không leak business logic vào `tokens`, tuân thủ tài liệu `package-map`.

---

## 3. Clean Code

| Hạng mục | Đánh giá | Bằng chứng | Mức |
|----------|----------|------------|:---:|
| Prop public khai báo nhưng không dùng | 🔴 `Form.onSubmit` destructure ở `Form.tsx:59` nhưng **không bao giờ wire** vào `handleSubmit` | `packages/ui/src/components/Form/Form.tsx:59,123-157` | High |
| Prop dead | 🔴 `Form.enableKeyboardAvoidingView` (dòng 63) không dùng trong render | `packages/ui/src/components/Form/Form.tsx:63` | High |
| API stub non-functional | 🔴 `sharedTransition.enter/exit = {}`, `heroTransition = null` (export public) | `packages/headless/src/motion.ts:38-42,90` | High |
| `eslint-disable` trong lib src (vi phạm rule repo) | 🟡 2 chỗ | `AnimatedList/AnimatedList.tsx:115`, `List/ListData.tsx:24` | Medium |
| TODO trong component shipped | 🟡 i18n cứng tiếng Anh + motion v4 | `Rating.tsx:195,274`, `motion.ts:39,90` | Medium |
| `catch {}` nuốt lỗi | 🟢 Không có silent-catch trong `packages/*` | — | ✅ |
| `console.*` trong runtime | 🟡 Còn ở `Button.tsx` (2, có `__DEV__`), `useBottomSheet.ts:126,183` (không guard), `Form.tsx:81,150` (chỉ log, không báo user) | Grep xác nhận | Medium |
| Comment thừa/legacy | 🟡 Import legacy bị comment ở `motion.ts:4-5` | — | Low |
| README/CHANGELOG per package | 🟡 Thiếu README+CHANGELOG cho `component-schema` và `renderer`; README `ui` nói "62+" nhưng thực tế export 80 | — | Medium |

**Nhận xét:** `Form` là "điểm đen" clean-code lớn nhất (prop chết + `any` + nuốt lỗi). Motion API export stub dễ khiến consumer tin nhầm là có animation.

---

## 4. Code Quality (Type Safety)

> Repo có rule cứng `.cursor/rules/typescript-strict-no-any-no-ignore.mdc`: **cấm `any`, `@ts-ignore`, `eslint-disable`**. Đây là các vi phạm chính rule của chính dự án.

| Loại | Số lượng (production, loại trừ test) | Bằng chứng | Mức |
|------|:---:|------------|:---:|
| `@ts-ignore` / `@ts-expect-error` | **0** | — | ✅ Tốt |
| `any` / `as any` / `as never` / `as unknown as` (ui/src) | **~28 dòng / 18 file** | Grep: `Slider.tsx`(5), `Form.tsx`(2), `Accordion*`(6), `AnimatedList`(2), `Grid`(2)… | High |
| `any` (headless/src) | **2** | `useField.ts:109`, `theme/utils.ts:14` | Low |
| `Record<string, any>` trong Form | **10 hits** | `packages/ui/src/components/Form/Form.tsx:5,10,14,31,33,35,69,75,93,124` | High |
| Generic context dùng `<any>` | 🟡 | `TabsContextValue<any>`, `SelectContextValue<any>`, `TabBarContextValue<any>` | Medium |
| CSS percent cast workaround | 🟡 lặp lại | `Slider/SliderTrack/SliderMark`, `Grid`, `Fab`, `LinearProgress` — `as unknown as number`/`as never` | Medium |
| Biome config | 🟡 `noExplicitAny: "warn"` (không phải error) → `any` lọt qua CI | `biome.json:31` | Medium |

**Worst offenders (ưu tiên fix):**
1. `Form.tsx` — chuyển sang `Form<TValues extends Record<string, unknown>>`.
2. `Slider.tsx` (5 cast) + cụm percent-string → tạo helper `percent(n): DimensionValue`.
3. `Accordion*` — extract `hasStyleGap(style)` thay cho `(flatGStyle as any).gap`.

**Đề xuất gate:** nâng `noExplicitAny` lên `"error"` trong `biome.json` để CI chặn hồi quy sau khi dọn.

---

## 5. Security

> Bề mặt artifact npm (`ui/headless/tokens/themes`) **sạch**: không `eval`/`new Function`/`dangerouslySetInnerHTML`, không network I/O, không secret commit, không `postinstall`/`prepublish`.

| # | Vấn đề | Đánh giá | Bằng chứng | Mức |
|---|--------|----------|------------|:---:|
| 1 | `Linking.openURL(href)` **không validate scheme** | 🔴 Cho phép `javascript:`/`file:`/`data:` nếu `href` từ CMS/API → phishing/deep-link lạm dụng | `Button/Button.tsx:66-74`, `Link/Link.tsx:29-36`, `Breadcrumbs/BreadcrumbItem.tsx:25-29` | High |
| 2 | Export TSX chèn **text children không escape** | 🔴 Schema children dạng `</Typography>…` có thể break-out JSX khi user copy code export | `packages/renderer/src/export-tsx.ts:105-113` | High |
| 3 | `...rest` spread thẳng vào native primitives | 🟡 `Input`/`Image`/`GlassCard`/`TextField`/`MessageInput`/`IconButton` extends full RN props | `Input/Input.tsx:30-31,305-308` | Medium |
| 4 | Parse schema cast unsafe trước khi validate | 🟡 `return parsed as ScreenSchema` (preview có gate `validation.valid`) | `apps/web/src/lib/builder-state.ts:30-35` | Medium |
| 5 | `deepMerge` không lọc `__proto__`/`constructor` | 🟡 Dùng cho theme override (hiện là config tin cậy) | `packages/headless/src/theme/utils.ts:7-28` | Medium |
| 6 | Prototype-pollution guard chỉ ở top-level | 🟢 Hiện an toàn (registry chưa có prop `object`) | `component-schema/src/screen-schema.ts:60-86` | Low |
| 7 | CI dùng `bun-version: latest`; internal dep dùng caret | 🟡 Ảnh hưởng reproducibility | `.github/workflows/ci.yml:20-22`; `ui/package.json:46-48` | Low |
| 8 | Secrets | 🟢 Không có `.env` commit; chỉ dùng GitHub secret `NPM_TOKEN` | `.gitignore`, `ci.yml:114-117` | ✅ |
| 9 | `dangerouslySetInnerHTML`/`eval` | 🟢 Chỉ xuất hiện trong **blocklist** của renderer | `packages/renderer/src/propGuards.ts:6-15` | ✅ |

**Kiểm soát tốt cần giữ:** allowlist prop ở renderer (`propGuards.ts`), preview gate theo `validation.valid` (`PreviewPanel.tsx:60`), `href` bị loại khỏi AI schema, lazy import dùng key cố định, có test cho dangerous props.

---

## 6. Performance & Cache

| # | Vấn đề | Đánh giá | Bằng chứng | Mức |
|---|--------|----------|------------|:---:|
| 1 | Autocomplete render **toàn bộ** filtered options trong `ScrollView` (không cap khi filter) | 🔴 Jank với dataset lớn | `Autocomplete.tsx:665-754`, `:374-379` | Critical |
| 2 | `ThemeContext` monolithic → mọi `useTheme()` re-render khi đổi theme/brand | 🔴 ~120 file consume; `resolveComponentTokens` dựng lại ~70 token tree | `headless/theme/provider.tsx:91-110`, `tokens/component.ts:4-70` | Critical |
| 3 | `useTokenSelector` có sẵn nhưng **0 usage** trong ui | 🟡 Bỏ lỡ cơ chế thu hẹp re-render | `headless/theme/hooks.ts:25-30` | High |
| 4 | React Compiler **chưa bật** + Reanimated dùng `.value` (không `.get/.set`) | 🟡 Manual memo thưa (~12/80 component `React.memo`) | `babel.config.js:1-6`, `apps/example/app.json:35-37` | High |
| 5 | Animate layout props `width`/`height` (Slider fill, LinearProgress) | 🟡 Nên dùng `transform: scaleX` | `useSlider.ts:494-526`, `LinearProgress.tsx:73-77` | Medium |
| 6 | Carousel `ScrollView`+`.map()` → mount tất cả slide | 🟡 | `Carousel.tsx:100-120` | High |
| 7 | Context value inline literal (new ref mỗi render) | 🟡 `Form`, `List`, `Menu`, `TabBar`, `Timeline`, `AppBar` | `Form.tsx:166-181`, `TabBar.tsx:61-71`… | High |
| 8 | Select dropdown `ItemSeparatorComponent={() => …}` inline | 🟡 Phá memo separator | `SelectDropdown.tsx:169` | Medium |
| 9 | Plain `List` không virtualize (chỉ `ListData` dùng FlatList/FlashList) | 🟡 Cần document rõ | `List.tsx:40-54`, `ListData.tsx:34-43` | High |

**Cache/pattern tốt đã có:** Avatar initials cache (`Avatar.tsx:64-74`), debounce filter Autocomplete (`useAutocomplete.ts:134-149`), Shimmer dùng 1 shared value cho cả cây (`Skeleton.tsx:62-77`), BottomSheet dùng `translateY` transform, FlashList optional với FlatList fallback, có **perf regression test** (`ui/src/__tests__/perf/components.perf.tsx`).

---

## 7. Testing / CI / Build / Release

| Hạng mục | Đánh giá | Bằng chứng | Mức |
|----------|----------|------------|:---:|
| Số lượng test | 🟢 **116+ file** test (unit + integration + perf) | Glob `__tests__/**` | ✅ |
| Component thiếu test | 🟡 8 component: `ChatListItem`, `ContextMenu`, `GlassCard`, `Gradient`, `MessageInput`, `Popup`, `SettingsMenu`, `TabBar` | — | Medium |
| CI pipeline | 🟢 build → lint → typecheck → test → perf → docs → release | `.github/workflows/ci.yml` | ✅ |
| Perf regression trong CI | 🟢 Job riêng `perf-test` | `ci.yml:51-72` | ✅ |
| npm publish config | 🟢 `files` chỉ `dist/**`, loại `.map`; không `prepublish`/`postinstall` | `ui/package.json:27-33` | ✅ |
| Lockfile | 🟢 `bun.lock` được commit | root | ✅ |
| Reproducibility | 🟡 `bun-version: latest` nên pin cứng | `ci.yml:22` | Low |
| Changesets | 🟢 Có `.changeset/` + 4 changeset pending | `.changeset/*.md` | ✅ |
| Release gating | 🟡 Publish chạy khi push `master`, `needs: build-and-test` (job này gộp lint/typecheck/test nên có chặn) | `ci.yml:87-92` | ✅ |
| Biome quality gate | 🟡 `any`, unused var chỉ `warn` → không chặn CI | `biome.json:21-32` | Medium |

---

## 8. Danh sách hành động ưu tiên trước release

### 🔴 P0 — Phải xử lý trước release
| # | Hành động | File |
|---|-----------|------|
| 1 | Thêm `openSafeUrl()` allowlist `http(s)` + chặn `javascript:`/`file:`/`data:`, dùng `canOpenURL` | `Button.tsx`, `Link.tsx`, `BreadcrumbItem.tsx` |
| 2 | Escape text children trong export TSX | `renderer/src/export-tsx.ts:105-113` |
| 3 | Fix `Form`: wire `onSubmit`, implement/bỏ `enableKeyboardAvoidingView`, khử `Record<string,any>` bằng generic, memo context value | `Form/Form.tsx` |
| 4 | Virtualize (hoặc cap+windowing) Autocomplete filtered list | `Autocomplete.tsx` |
| 5 | Xử lý motion stub: đánh dấu `@deprecated`/document rõ null, hoặc reimplement | `headless/src/motion.ts` |

### 🟡 P1 — Nên xử lý sớm sau release
| # | Hành động |
|---|-----------|
| 6 | Tách/cache ThemeContext (tokens vs actions) hoặc dùng `useTokenSelector` ở leaf hot (Button/ListItem/Input) |
| 7 | `useMemo` context value cho `List/Menu/TabBar/Timeline`; `useCallback` cho `getItemProps` |
| 8 | Dọn `any`/cast ở `Slider/Accordion/Timeline/AnimatedList`; nâng `noExplicitAny` → `error` |
| 9 | Bổ sung test cho 8 component còn thiếu; thêm README/CHANGELOG cho `renderer` + `component-schema` |
| 10 | Virtualize Carousel; fix inline `ItemSeparatorComponent` ở Select |

### 🟢 P2 — Cải thiện dài hạn
| # | Hành động |
|---|-----------|
| 11 | Bật React Compiler (app example trước) + migrate Reanimated sang `.get()/.set()` |
| 12 | Animate `transform: scaleX` cho Slider/LinearProgress |
| 13 | `deepMerge` lọc `__proto__`; pin `bun-version` trong CI; đồng bộ số component trong README |
| 14 | Tách `Autocomplete.tsx` (890 dòng), chuyển util `calendar` ra module dùng chung |

---

## 9. Kết luận

**Verdict: 🟡 CONDITIONAL GO (7.3/10)**

Đây là một design system **được tổ chức tốt, có kỷ luật kiến trúc rõ ràng**, test coverage cao (116+ file), CI hoàn chỉnh gồm cả perf regression, và bề mặt npm sạch (không secret/eval/network). Nền tảng đủ vững để hướng tới production.

Tuy nhiên **chưa nên release ngay**: cần một đợt hardening ngắn tập trung vào **5 mục P0** — trọng tâm là (1) validate URL trong `Linking.openURL`, (2) escape TSX export, và (3) dọn `Form` + virtualize `Autocomplete`. Đây đều là fix khu trú, rủi ro thấp, làm được trong 1–2 ngày.

Nợ kỹ thuật lớn nhất về lâu dài là **type-safety** (`any` vi phạm rule của chính repo) và **re-render diện rộng do ThemeContext monolithic** — nên đưa vào roadmap P1 ngay sau release để tránh tích lũy.

---

*Report được tạo tự động bằng quá trình review có kiểm chứng bằng chứng (evidence-based). Mọi tham chiếu `file:line` có thể trace trực tiếp trong source.*
