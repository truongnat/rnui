# Roadmap — RNUI (post-audit)

**Milestone:** v1.x evolution  
**Granularity:** standard (config)

## Phase 1 — Critical fixes

**Goal:** An toàn kiểu, Rating/half-star đúng, reduce motion, token màu, precision, `openURL`, easing dùng được với Reanimated.

**Requirements:** QUAL-01, QUAL-02, QUAL-03, A11Y-01, RATE-01, RATE-02, MOT-01

**Success criteria:**

1. `tsc` / test liên quan pass; không còn `as any` trên path Rating/Pressable đã nêu trong audit
2. `useReduceMotionEnabled` được dùng trong `usePressable` và export từ headless
3. `resolveTimingPreset` có trong public API và có ít nhất một test/smoke

**UI hint:** no

---

## Phase 2 — Rating component depth

**Goal:** A11y đầy đủ, animation chọn sao, memo, tùy chọn read-only/compact/icon.

**Requirements:** A11Y-02, RATE-03

**Success criteria:**

1. Rating có `accessibilityRole` / `accessibilityValue` phù hợp nền tảng
2. `React.memo(Rating)`; animation tôn trọng reduce motion
3. Ít nhất một variant read-only hoặc compact theo spec đã định

**UI hint:** yes

---

## Phase 3 — Performance & edge cases

**Goal:** Carousel/Skeleton/Switch/Button cứng cho edge case.

**Requirements:** PERF-01, PERF-02

**Success criteria:**

1. Carousel không render `undefined` khi `data=[]`; key ổn định trong loop mode
2. Skeleton dừng animation khi `animate=false`

**UI hint:** no

---

## Phase 4 — Design system enhancements

**Goal:** Token typography, brand mới, motion export, contrast, spacing, shadows.

**Requirements:** DS-01

**Success criteria:**

1. Mỗi hạng mục DS-01 đã chọn trong plan có acceptance cụ thể và test/tài liệu ngắn

**UI hint:** yes

---

## Phase 5 — Backlog components & integrations

**Goal:** OTP paste, DatePicker locale/TZ, component backlog (NumericScore, ReviewSummary, …).

**Requirements:** (từ backlog audit — gán REQ-ID khi scope hóa)

**Success criteria:**

1. Mỗi hạng mục chọn có issue/plan và proof merge

**UI hint:** mixed

---

## Coverage

| Phase | Requirement IDs |
|-------|-----------------|
| 1 | QUAL-01..03, A11Y-01, RATE-01..02, MOT-01 |
| 2 | A11Y-02, RATE-03 |
| 3 | PERF-01..02 |
| 4 | DS-01 |
| 5 | TBD backlog |
