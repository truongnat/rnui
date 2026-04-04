# Phase 7 — Context: Improvement plan (wave 1 — critical UX)

## Problem statement

`IMPROVEMENT_PLAN.md` (repo root, 2026-04-03) tổng hợp 15 issue + extras từ audit. **Wave 1** của plan đó (mục _Execution Order → Phase 1 — Critical UX Fixes_) là bước tiếp theo sau Phase 6 (`UI_REPORT` follow-through).

## Scope (wave 1 only)

| #   | Issue            | Focus                                                             |
| --- | ---------------- | ----------------------------------------------------------------- |
| 12  | OTPInput         | Border token bug, controlled example, aspect ratio                |
| 15  | Toast            | Giảm “jump” — easing / layout animation                           |
| 10  | AnimatedList     | `useCallback` + stable `keyExtractor` trong example; doc gợi ý    |
| 11  | SegmentedControl | Indicator inset, `ready` sau `onLayout`, tránh nhảy khi `width=0` |

## Out of scope (defer Phase 7 wave 2+ hoặc phase sau)

- Input/FormField/TextArea (#1), Typography sweep (#2), Select FlashList (#4), Slider (#6), DatePicker grid (#13), Carousel (#14), Glass/gradient (#+), component tree doc — theo `IMPROVEMENT_PLAN.md` _Phase 2–5_.

## Dependencies

- Phase 1–6 complete (tokens, BottomSheet, OTP paste đã có ở backlog).
- Không thêm dependency npm mới trong wave 1 trừ khi spike chứng minh cần (hiện **không**).

## Links

- Source: `IMPROVEMENT_PLAN.md` — Issues #10, #11, #12, #15; _Execution Order_ Phase 1 (dòng ~745–752).

## Success (phase-level)

Checklist `07-VALIDATION.md` pass; `07-01-PLAN.md` executed với `07-01-SUMMARY.md`.
