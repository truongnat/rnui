# Phase 6 — Research notes (ngắn)

## Known unknowns

1. **Lưu trữ:** `@react-native-async-storage/async-storage` là lựa chọn phổ biến với Expo; example hiện **chưa** khai báo dependency — wave 1 sẽ thêm vào `apps/example` (hoặc dùng API storage Expo nếu team chọn; mặc định plan dùng AsyncStorage để khớp `UI_REPORT.md`).
2. **Headless vs storage:** Hook trong `headless` nên nhận **adapter** (`getItem`/`setItem` async) để không ép transitive dependency vào mọi consumer — chỉ app (example) nối AsyncStorage.
3. **fontWeight:** RN `TextStyle` chấp nhận `string | number` tùy platform; chuẩn hóa một kiểu (thường string union hoặc literal) để hết cảnh báo `tsc`/eslint nếu có.

## Suggested implementation order (wave 1)

1. Contract + hook persistence trong `packages/headless` + unit test (mock storage).
2. `apps/example`: cài AsyncStorage, hydrate + persist khi đổi scheme.
3. Sửa `fontWeight` trong `apps/example/app/index.tsx` (và chỗ liên quan nếu phát sinh).
4. Audit memo: đọc `packages/headless/src/theme.tsx` + `packages/tokens/src/component.ts` — ghi nhận trong PR/SUMMARY; sửa chỉ khi đo được recompute thừa hoặc thiếu dependency.
5. `AnimatedList`: bổ sung JSDoc / comment về `estimatedItemSize`; đối chiếu `apps/example` và Storybook.
6. Haptics: gọi `expo-haptics` nhẹ trên nút đổi theme (example), sau `Platform.OS` / flag env nếu cần tắt CI.

## Risks (from `UI_REPORT.md` §7)

| Risk                       | Wave 1 response                          |
| -------------------------- | ---------------------------------------- |
| No persistence             | Tasks 1–2                                |
| Component tokens recompute | Task 4 (audit + fix tối thiểu)           |
| FlashList perf             | Task 5 (doc + giá trị hợp lý)            |
| No visual regression       | Ghi defer wave 2; không chặn ship wave 1 |

Không cần web research trừ khi executor gặp blocker (ví dụ API AsyncStorage với Expo SDK 55).
