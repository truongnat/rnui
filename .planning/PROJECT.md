# RNUI

## What This Is

RNUI là monorepo thư viện UI cho React Native: design tokens (`@truongdq01/tokens`), headless hooks (`@truongdq01/headless`), component package (`@truongdq01/ui`), themes/brands, Storybook và app example. Mục tiêu là bộ component nhất quán, theme-aware, animation-first (Reanimated 3), dùng được trong app production.

## Core Value

Một design system RN có token rõ ràng, component typed, animation chạy UI thread và hành vi truy cập (a11y) có thể kiểm chứng — để team ship UI nhanh mà không phải lặp lại style/animation thủ công.

## Requirements

### Validated

- ✓ Kiến trúc token ba lớp (primitive → semantic → component) — existing
- ✓ ThemeProvider + `useTokens` / `useComponentTokens` — existing
- ✓ Thư viện component phủ Button, Input, Modal, Carousel, v.v. — existing
- ✓ Motion helpers trong headless (`motionPresets`, `motionEasing`) — existing

### Active

- [ ] Hoàn thiện các mục **Phase 1–5** trong `AUDIT_REPORT.md` (typing, Rating, reduce motion, Carousel/Skeleton, design system, backlog)
- [ ] Giữ `tsc` / test xanh trên các package khi đổi token hoặc headless

### Out of Scope

- Backend / API sản phẩm — đây là library UI, không phải full app
- Thay thế hoàn toàn React Native core — chỉ wrap và mở rộng pattern

## Context

- **Monorepo:** `packages/tokens`, `packages/headless`, `packages/ui`, `packages/themes`, `apps/example`, `docs`
- **Báo cáo kỹ thuật:** `AUDIT_REPORT.md` (2026-04-02) — roadmap cải tiến ưu tiên đã được phản ánh trong `ROADMAP.md`
- **Brownfield:** codebase đã có sẵn; mapping chi tiết có thể bổ sung bằng `/gsd-map-codebase` nếu cần
- **Phase 1 đã có phần triển khai trong repo** (typing Rating, reduce motion, v.v.) — đồng bộ khi rà soát phase

## Constraints

- **Tech:** React 19+, RN 0.83+, Reanimated 4+, Gesture Handler — peer deps của `@truongdq01/headless` / `@truongdq01/ui`
- **Tokens:** `@truongdq01/tokens` không được phụ thuộc `react-native-reanimated` — easing/preset dùng adapter hoặc export từ headless
- **Git:** planning docs được commit (`commit_docs: true`)

## Key Decisions

| Decision                            | Rationale                         | Outcome   |
| ----------------------------------- | --------------------------------- | --------- |
| GSD workflow cho cải tiến sau audit | Theo dõi phase/plan có kiểm chứng | — Pending |
| Bỏ qua `/gsd-map-codebase` lúc init | Khởi tạo nhanh; map sau nếu cần   | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):

1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):

1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---

_Last updated: 2026-04-02 after GSD project initialization_
