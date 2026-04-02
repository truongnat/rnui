# Phase 5 — Technical research (backlog wave 1)

**Date:** 2026-04-02  
**Source:** `5-CONTEXT.md`, `AUDIT_REPORT.md`, `useOTPInput.ts`, `DatePicker.tsx`, `@react-native-community/datetimepicker` types.

## RESEARCH COMPLETE

### OTP paste (RN)

- Một `TextInput` với `maxLength={length}` nhận paste/autofill một chuỗi; `onChangeText` thường nhận **toàn bộ** chuỗi (sau filter). `handleChange` hiện: `numeric + slice(0, length)` — đủ cho flow ô ẩn + ô hiển thị tách ký tự.
- Rủi ro còn lại: platform gửi nhiều sự kiện nhỏ — **verify bằng test** mô phỏng một lần nhập đủ độ dài.

### DatePicker / DateTimePicker

- `index.d.ts` upstream: `locale?: string`, `timeZoneOffsetInMinutes?: number`, `timeZoneOffsetInSeconds?`, `timeZoneName?` (tùy phiên bản).
- Wrapper hiện **không** truyền các field này → bổ sung optional props + spread vào `<DateTimePicker />`.

---

## Validation Architecture

| Verify | Method |
|--------|--------|
| Headless | `bun test` `useOTPInput.test.tsx`; `bun tsc --noEmit` `packages/headless` |
| UI | `bun test` `OTPInput.test.tsx`, `DatePicker.test.tsx`; `bun tsc --noEmit` `packages/ui` |
| BL-01 / BL-02 | Grep prop forward; test paste + locale mock nếu khả thi |
