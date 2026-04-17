# Phase 6 — Wave 1 validation checklist

Verifier confirms **06-01-PLAN.md** execution bằng checklist sau. Mỗi mục map tới acceptance trong plan.

## Requirements (UIREP-\*)

| ID           | Criterion                                          | How to verify                                                                                                               |
| ------------ | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **UIREP-01** | Example app giữ `colorScheme` sau khi đóng app     | Mở app → đổi theme → kill process → mở lại → theme không reset về default hệ thống (trừ khi user chọn System và OS đổi).    |
| **UIREP-02** | Headless export hook persistence + tests pass      | `cd packages/headless && bun test src/hooks/__tests__/usePersistedColorScheme.test.tsx` exit 0; export có trong public API. |
| **UIREP-03** | fontWeight không gây cảnh báo TS trên file đã sửa  | `cd apps/example && bun run typecheck` exit 0; spot-check `index.tsx` theo quy ước đã ghi.                                  |
| **UIREP-04** | Memo audit có kết luận (code comment hoặc SUMMARY) | Đọc comment trong `theme.tsx` hoặc `/component.ts` hoặc `06-01-SUMMARY.md`.                                                 |
| **UIREP-05** | JSDoc `estimatedItemSize` + story/example hợp lý   | Mở `AnimatedList.tsx` thấy JSDoc; `estimatedItemSize` trong example/storybook không lệch bậc so với layout.                 |
| **UIREP-06** | Haptics khi đổi theme (example)                    | Trên device/simulator: bấm đổi theme → có phản hồi xúc giác (iOS/Android theo expo-haptics).                                |

## Automated gates (CI / local)

- [ ] `bun turbo typecheck` — pass
- [ ] `bun turbo test` — pass (hoặc subset đã thỏa thuận trong SUMMARY nếu repo quy định filter)

## Explicitly out of scope for wave 1

- [ ] **UIREP-07** Visual regression — không yêu cầu cho wave 1; ghi issue/wave 2 nếu cần.

## Source documents

- `UI_REPORT.md` §6–§7
- `.planning/phases/06-ui-report-follow-through/06-01-PLAN.md`
