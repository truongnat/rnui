# Summary — Plan 07-01 (Phase 7 wave 1)

**Executed:** 2026-04-03  
**Requirements:** IMP-01..IMP-04

## Delivered

1. **IMP-01 — OTPInput**
   - Tokens: `otpInput.cell.filled` (`borderColor`, `backgroundColor`).
   - `OTPInput`: border/focus/filled branches; ô vuông (`aspectRatio: 1`); border dày hơn khi focus.
   - Example: `otpValue` / `setOtpValue` controlled.

2. **IMP-02 — Toast**
   - `ToastItem`: `FadeInUp` / `FadeInDown` + `FadeOut*` dùng `duration(...)` thay cho `springify` stiffness 280; comment giải thích.

3. **IMP-03 — AnimatedList example**
   - `useCallback` cho `renderItem` + `keyExtractor`; generic `Contact`; ghi chú trong example + JSDoc `AnimatedList`.

4. **IMP-04 — SegmentedControl**
   - `TRACK_PADDING = 2` khớp token; `innerWidth` / `segmentWidth`; indicator `absolute` với `left/top/bottom` inset; `layoutReady`; lần đo đầu gán `translateX` trực tiếp (không spring) để tránh nhảy.

## Verification

- `bun turbo test --filter=@truongdq01/ui` — pass
- `bun turbo typecheck --filter=@truongdq01/tokens --filter=@truongdq01/ui` — pass

## Manual

- Example: OTP gõ/xóa; SegmentedControl không flash pill; Toast mượt hơn (cảm nhận).
