# Phase 6 — Context: UI report follow-through

## Problem statement

`AUDIT_REPORT.md` và các phase 1–5 đã xử lý backlog REQ v1. File gốc **`UI_REPORT.md`** (repo root) bổ sung hướng cải tiến sau phiên audit UI/UX (2026-04-02): lưu preference theme, DX headless, đánh bóng example app, Storybook, haptics, RTL/fonts, rà soát memo token, FlashList, và kiểm thử hồi quy hình ảnh.

Phase này **không lặp** công việc đã hoàn thành (theme toggle wiring, Section cards, typography section headers, v.v. — xem `UI_REPORT.md` §4–§5).

## Scope

### In scope (Phase 6 — wave 1 trước mắt)

- **§6 High:** persistence `colorScheme` (AsyncStorage hoặc tương đương), hook/API tái sử dụng trong `@truongdq01/headless`, chỉnh **fontWeight** TypeScript nhất quán.
- **§7 Risks (wave 1):** rà soát memo `resolveComponentTokens` / `ThemeProvider`; làm rõ **`estimatedItemSize`** cho `AnimatedList` / FlashList (doc + đối chiếu example).
- **§6 Medium (một lát nhỏ):** phản hồi xúc giác trên example (đã có `expo-haptics`) — có thể bật có điều kiện.

### Out of scope (wave 1 — ghi rõ trong `06-01-PLAN.md`)

- Tab navigation đầy đủ cho example (Buttons / Forms / …).
- Storybook: phủ story cho **mọi** component.
- RTL đầy đủ, custom font pipeline, animation speed tokens — wave sau hoặc backlog.
- **Visual regression** tự động: mục tiêu stretch / wave 2 (công cụ mở — Maestro, snapshot, v.v.).

## Dependencies on completed phases

| Phase | Cung cấp cho Phase 6                                                      |
| ----- | ------------------------------------------------------------------------- |
| 1–4   | Theme, token, `ThemeProvider`, `useTheme`, component tokens               |
| 5     | OTP/DatePicker — không chồng lấn; example app là nơi tích hợp persistence |

## Links to `UI_REPORT.md`

| Section                        | Nội dung liên quan Phase 6                          |
| ------------------------------ | --------------------------------------------------- |
| §6 Recommended Next Steps      | Thứ tự ưu tiên High → Medium; defer Storybook/tabs  |
| §7 Architecture Health / Risks | Persistence, memo tokens, FlashList, snapshot tests |
| §8 Token Quick Reference       | API consumer cho ví dụ wire persistence             |

## Success (phase-level)

Wave 1 coi là đạt khi checklist trong `06-VALIDATION.md` pass và `06-01-PLAN.md` đã được execute (SUMMARY sau execute).
