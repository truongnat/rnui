# Phase 7 — Research notes (short)

## Known-unknowns (wave 1)

1. **OTPInput** — Token `filledBorderColor` cần thêm vào `packages/tokens` `otpInput` map và mirror trong `headless`/`ui` nếu tokens chỉ nằm một nơi; xác nhận import path thực tế (`@truongdq01/tokens` `component.ts`).

2. **Toast** — Xác định file animation (Reanimated preset trong `Toast` / `ToastContainer`); giảm stiffness hoặc đổi sang `withTiming` cho enter/exit để tránh bounce kép.

3. **AnimatedList** — Example hiện có `renderItem` inline → FlashList re-render; refactor sang `useCallback` + `keyExtractor` ổn định; không bắt buộc đổi API component trong wave 1.

4. **SegmentedControl** — Đo `onLayout` để set `ready`; indicator inset đồng bộ với padding token — có thể cần đọc `segmentedControl` tokens hiện tại.

## Order trong wave

OTP (example + token + UI) → Toast (isolated) → Example AnimatedList → SegmentedControl (layout phức tạp nhất).

## Risks

- **SegmentedControl**: regression trên màn hình nhỏ / nhiều segment — test example + storybook nếu có.
