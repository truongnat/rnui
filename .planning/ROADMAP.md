# Roadmap: RNUI

## Overview

Lộ trình cải tiến sau `AUDIT_REPORT.md`: từ sửa lỗi nghiêm trọng (phase 1) đến nâng Rating, hiệu năng/edge case, design system, rồi backlog.

## Phases

- [x] **Phase 1: Critical fixes** — Typing, Rating/half-star, reduce motion, tokens, precision, href, easing (completed 2026-04-02)
- [x] **Phase 2: Rating component depth** — A11y, animation, memo, variants (completed 2026-04-02)
- [x] **Phase 3: Performance & edge cases** — Carousel, Skeleton, Switch (completed 2026-04-02)
- [x] **Phase 4: Design system enhancements** — Tokens, brands, motion, contrast (completed 2026-04-02)
- [x] **Phase 5: Backlog components** — OTP, DatePicker, NumericScore, … (wave 1 complete 2026-04-02)
- [x] **Phase 6: UI report follow-through** — Persistence, fontWeight, memo doc, AnimatedList JSDoc, haptics (wave 1 complete 2026-04-02); wave 2 deferred: tabs, Storybook breadth, visual regression (UIREP-07)
- [x] **Phase 7: Improvement plan wave 1** — OTP + Toast + AnimatedList example + SegmentedControl (`IMPROVEMENT_PLAN.md` critical UX) (completed 2026-04-03)
- [x] **Phase 8: Improvement plan wave 2** — Input/FormField/TextArea, Typography tokens, Divider + Radio + Checkbox showcases (`IMPROVEMENT_PLAN.md` Phase 2)
- [x] **Phase 9: Improvement plan phase 3 (09-01)** — IMP-09..IMP-12: Skeleton + EmptyState + Select FlashList/load-more + Slider orientation/range/thumb (`09-01-PLAN.md`, `09-01-SUMMARY.md`) — completed 2026-04-02
- [ ] **Phase 9b (09-02): DatePicker calendar** — **IMP-13** (calendar grid / bottom sheet) — separate plan

## Phase Details

### Phase 1: Critical fixes

**Goal**: An toàn kiểu, Rating/half-star đúng, reduce motion, token màu accent, precision hợp lệ, `Linking.openURL` an toàn, easing dùng được với Reanimated.

**Depends on**: Nothing (first phase)

**Requirements**: QUAL-01, QUAL-02, QUAL-03, A11Y-01, RATE-01, RATE-02, MOT-01

**Success Criteria** (what must be TRUE):

1. `tsc` và test liên quan pass; không còn `as any` trên path Rating/Pressable đã nêu trong audit
2. `useReduceMotionEnabled` được dùng trong `usePressable` và export từ headless
3. `resolveTimingPreset` có trong public API và có ít nhất một test/smoke

**UI hint**: no

**Plans**: `01-01-PLAN.md` (wave 1) — executed (`01-01-SUMMARY.md`)

### Phase 2: Rating component depth

**Goal**: A11y đầy đủ, animation chọn sao, memo, tùy chọn read-only/compact/icon.

**Depends on**: Phase 1

**Requirements**: A11Y-02, RATE-03

**Success Criteria** (what must be TRUE):

1. Rating có `accessibilityRole` / `accessibilityValue` phù hợp nền tảng
2. `React.memo(Rating)`; animation tôn trọng reduce motion
3. Ít nhất một variant read-only hoặc compact theo spec đã định

**UI hint**: yes

**Plans**: `02-01-PLAN.md` (wave 1) — executed (`02-01-SUMMARY.md`)

### Phase 3: Performance & edge cases

**Goal**: Carousel/Skeleton/Switch/Button cứng cho edge case.

**Depends on**: Phase 2

**Requirements**: PERF-01, PERF-02

**Success Criteria** (what must be TRUE):

1. Carousel không render `undefined` khi `data=[]`; key ổn định trong loop mode
2. Skeleton dừng animation khi `animate=false`

**UI hint**: no

**Plans**: `03-01-PLAN.md` (wave 1) — executed (`03-01-SUMMARY.md`)

### Phase 4: Design system enhancements

**Goal**: Token typography, brand mới, motion export, contrast, spacing, shadows.

**Depends on**: Phase 3

**Requirements**: DS-01

**Success Criteria** (what must be TRUE):

1. Mỗi hạng mục DS-01 đã chọn trong plan có acceptance cụ thể và test hoặc tài liệu ngắn

**UI hint**: yes

**UI-SPEC**: `04-UI-SPEC.md` (approved 2026-04-02)

**Plans**: `04-01-PLAN.md` (wave 1) — executed (`04-01-SUMMARY.md`)

### Phase 5: Backlog components & integrations

**Goal**: OTP paste, DatePicker locale/TZ, component backlog (NumericScore, ReviewSummary, …).

**Depends on**: Phase 4

**Requirements**: BL-01, BL-02 (wave 1); backlog mở rộng sau wave 1

**Success Criteria** (what must be TRUE):

1. BL-01: test + hành vi rõ cho paste/autofill OTP (hook + UI smoke)
2. BL-02: `DatePicker` forward prop locale/TZ tới `DateTimePicker` + test
3. Mỗi hạng mục wave sau có issue/plan và proof merge

**UI hint**: mixed

**Plans**: `05-01-PLAN.md` (wave 1) — executed (`05-01-SUMMARY.md`)

### Phase 6: UI report follow-through

**Goal**: Triển khai backlog từ `UI_REPORT.md` §6–§7 mà không trùng audit đã fix (§4–§5): lưu `colorScheme`, hook persistence trong headless, chuẩn hóa `fontWeight` TS, rà memo token / FlashList `estimatedItemSize`, haptics trên example; defer tab navigation, Storybook đầy đủ, RTL/fonts, visual regression.

**Depends on**: Phase 5 (và toàn bộ 1–4 cho theme/tokens)

**Requirements**: UIREP-01, UIREP-02, UIREP-03, UIREP-04, UIREP-05, UIREP-06 (wave 1); UIREP-07 deferred wave 2

**Success Criteria** (what must be TRUE):

1. UIREP-01 + UIREP-02: preference theme được persist; hook + tests trong headless; example dùng AsyncStorage qua adapter
2. UIREP-03: `fontWeight` trong example nhất quán, `typecheck` pass
3. UIREP-04: audit memo `ThemeProvider` / `resolveComponentTokens` có kết luận (và sửa nhỏ nếu cần)
4. UIREP-05: JSDoc `estimatedItemSize` trên `AnimatedList`; example/storybook không lệch bậc
5. UIREP-06: haptics khi đổi theme trên example (`expo-haptics`)
6. UIREP-07 (wave 2): visual regression / snapshot — không chặn ship wave 1

**UI hint**: mixed (example + headless + doc)

**Context**: `.planning/phases/06-ui-report-follow-through/06-CONTEXT.md`

**Plans**: `06-01-PLAN.md` (wave 1) — executed (`06-01-SUMMARY.md`); `06-VALIDATION.md` checklist

### Phase 7: Improvement plan (wave 1 — critical UX)

**Goal**: Triển khai _Execution Order Phase 1_ trong `IMPROVEMENT_PLAN.md`: **IMP-01** OTPInput (token + example), **IMP-02** Toast animation, **IMP-03** AnimatedList example callbacks, **IMP-04** SegmentedControl indicator/layout.

**Depends on**: Phase 6 (ổn định example/theme)

**Requirements**: IMP-01, IMP-02, IMP-03, IMP-04

**Success Criteria** (what must be TRUE):

1. OTP: example controlled; filled border khác empty; aspect vuông / token đúng
2. Toast: animation mềm hơn, không jump layout đáng kể khi stack
3. AnimatedList demo: `useCallback` + `keyExtractor` ổn định
4. SegmentedControl: không flash indicator khi `width=0`; inset khớp padding

**UI hint**: yes (example + components)

**Context**: `.planning/phases/07-improvement-plan-wave1/07-CONTEXT.md`

**Plans**: `07-01-PLAN.md` (wave 1) — executed (`07-01-SUMMARY.md`); `07-VALIDATION.md`

### Phase 8: Improvement plan (wave 2 — forms + typography + showcases)

**Goal**: Triển khai _Execution Order Phase 2_ trong `IMPROVEMENT_PLAN.md`: **IMP-05** Input + FormField, **IMP-06** TextArea counter, **IMP-07** Typography + semantic tokens, **IMP-08** Divider/Radio/Checkbox showcase + export `RadioItem`.

**Depends on**: Phase 7

**Requirements**: IMP-05, IMP-06, IMP-07, IMP-08

**Success Criteria** (what must be TRUE):

1. IMP-05: focus/input timing và spacing FormField theo plan; không regression test cốt lõi
2. IMP-06: counter TextArea không chồng helper; API rõ (`showCounter` / vị trí)
3. IMP-07: token typography bổ sung; Typography variants; example section labels dùng Typography
4. IMP-08: `RadioItem` public export; example: divider dọc, radio ngang, checkbox indeterminate

**UI hint**: yes

**Context**: `.planning/phases/08-improvement-plan-wave2/08-CONTEXT.md`

**Plans**: `08-01-PLAN.md` (wave 1) — executed (`08-01-SUMMARY.md`); `08-VALIDATION.md`

### Phase 9: Improvement plan (phase 3 — new features)

**Goal**: Triển khai _Execution Order Phase 3_ trong `IMPROVEMENT_PLAN.md` (mục 9–12): **IMP-09** Skeleton presets + `SkeletonGroup`, **IMP-10** EmptyState variants/visual, **IMP-11** Select FlashList + async/load-more, **IMP-12** Slider vertical + range + custom thumb (headless trước, UI sau). **IMP-13** DatePicker (calendar grid) tách `09-02-PLAN.md`.

**Depends on**: Phase 8

**Requirements**: IMP-09, IMP-10, IMP-11, IMP-12 (IMP-13 trong phase follow-up)

**Success Criteria** (what must be TRUE):

1. IMP-09: preset skeleton + `SkeletonGroup` stagger + example
2. IMP-10: `EmptyState` `size` / `variant` / illustration; preset copy theo Issue 9
3. IMP-11: Select sheet dùng FlashList; props loading/load-more; example list lớn + load-more
4. IMP-12: `useSlider` orientation + range; `Slider` UI + example vertical, range, custom thumb

**UI hint**: yes (example + headless hook)

**Context**: `.planning/phases/09-improvement-plan-phase3/` (tạo `09-CONTEXT.md` khi discuss nếu cần)

**Plans**: `09-01-PLAN.md` (wave 1) — IMP-09..12; `09-02-PLAN.md` — IMP-13 (defer)

## Progress

| Phase                       | Plans Complete | Status      | Completed  |
| --------------------------- | -------------- | ----------- | ---------- |
| 1. Critical fixes           | 1/1            | Complete    | 2026-04-02 |
| 2. Rating depth             | 1/1            | Complete    | 2026-04-02 |
| 3. Perf & edges             | 1/1            | Complete    | 2026-04-02 |
| 4. DS enhancements          | 1/1            | Complete    | 2026-04-02 |
| 5. Backlog                  | 1/1            | Complete    | 2026-04-02 |
| 6. UI report follow-through | 1/1            | Complete    | 2026-04-02 |
| 7. Improvement plan wave 1  | 1/1            | Complete    | 2026-04-03 |
| 8. Improvement plan wave 2  | 1/1            | Complete    | 2026-04-02 |
| 9. Improvement plan phase 3 | 0/2            | In progress | —          |

## Coverage

| Phase | Requirement IDs                           |
| ----- | ----------------------------------------- |
| 1     | QUAL-01..03, A11Y-01, RATE-01..02, MOT-01 |
| 2     | A11Y-02, RATE-03                          |
| 3     | PERF-01..02                               |
| 4     | DS-01                                     |
| 5     | BL-01, BL-02 (+ backlog)                  |
| 6     | UIREP-01..07 (wave 1: 01–06; 07 deferred) |
| 7     | IMP-01..04                                |
| 8     | IMP-05..08                                |
| 9     | IMP-09..12 (IMP-13 → plan 09-02)          |
