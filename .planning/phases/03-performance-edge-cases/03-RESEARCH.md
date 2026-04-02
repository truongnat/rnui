# Phase 3 — Technical research (perf & edge cases)

**Date:** 2026-04-02  
**Source:** `3-CONTEXT.md`, `AUDIT_REPORT.md`, `useCarousel.ts`, `Carousel.tsx`, `Skeleton.tsx`, `Switch.tsx`.

## RESEARCH COMPLETE

### Carousel — empty data & loop

- **`useCarousel`:** Khi `n === 0`, `displayData` đã là `[]` nhưng auto-play, `goToNextSlide`, và `scrollTo` vẫn có thể được gọi — cần **guard** `n < 1` trước mọi thao tác scroll/timer.
- **Loop `n === 1`:** Nhánh `!loop || n < 2` trả về `data` gốc (1 phần tử) — không clone; **không** chạy nhánh jump clone trong `onMomentumScrollEnd` khi `n < 2` — đối chiếu test + comment JSDoc.
- **Keys:** React cần key **ổn định** qua reorder; với loop, clone đầu/cuối cần **suffix** khác item gốc để tránh trùng key (`keyExtractor(item, i) + '-loop-head'`).
- **Width:** `useWindowDimensions()` trong hook (hoặc component) thay `Dimensions.get("window")` tĩnh — tránh width sai sau rotation.

### Skeleton — Reanimated

- `cancelAnimation(sharedValue)` từ `react-native-reanimated` dừng `withRepeat` đang chạy.
- `useEffect` cleanup: `cancelAnimation(shimmer)` khi unmount hoặc khi `animate` → `false`.

### Switch

- `translateX` với `thumbTravel` âm gây thumb lệch — **`Math.max(0, rawTravel)`** đủ (D-37).

---

## Validation Architecture

Mục tiêu Nyquist Dimension 8: mỗi thay đổi có lệnh verify tự động (jest / rg / tsc).

| Layer | Method |
|-------|--------|
| Unit | `bun test` / `jest` — `useCarousel.test`, `Carousel.test`, `Skeleton.test` |
| Grep | `rg 'Dimensions.get'` không còn trong Carousel/useCarousel (sau refactor) |
| Manual | Optional: rotate simulator — carousel padding |

**Nyquist Dimension 8:** Mỗi task có lệnh `jest` hoặc `rg` trong `<acceptance_criteria>`.
