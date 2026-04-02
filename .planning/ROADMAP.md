# Roadmap: RNUI

## Overview

Lộ trình cải tiến sau `AUDIT_REPORT.md`: từ sửa lỗi nghiêm trọng (phase 1) đến nâng Rating, hiệu năng/edge case, design system, rồi backlog.

## Phases

- [x] **Phase 1: Critical fixes** — Typing, Rating/half-star, reduce motion, tokens, precision, href, easing (completed 2026-04-02)
- [x] **Phase 2: Rating component depth** — A11y, animation, memo, variants (completed 2026-04-02)
- [x] **Phase 3: Performance & edge cases** — Carousel, Skeleton, Switch (completed 2026-04-02)
- [x] **Phase 4: Design system enhancements** — Tokens, brands, motion, contrast (completed 2026-04-02)
- [ ] **Phase 5: Backlog components** — OTP, DatePicker, NumericScore, …

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

**Plans**: TBD

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

**Plans**: `05-01-PLAN.md` (wave 1) — ready to execute

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Critical fixes | 1/1 | Complete   | 2026-04-02 |
| 2. Rating depth | 1/1 | Complete | 2026-04-02 |
| 3. Perf & edges | 1/1 | Complete | 2026-04-02 |
| 4. DS enhancements | 1/1 | Complete | 2026-04-02 |
| 5. Backlog | 1/1 planned | Planned (not executed) | - |

## Coverage

| Phase | Requirement IDs |
|-------|-------------------|
| 1 | QUAL-01..03, A11Y-01, RATE-01..02, MOT-01 |
| 2 | A11Y-02, RATE-03 |
| 3 | PERF-01..02 |
| 4 | DS-01 |
| 5 | BL-01, BL-02 (+ backlog) |
