---
phase: 05-backlog-components-integrations
plan: '05-01'
subsystem: headless, ui
tags: [react-native, otp, datetimepicker, i18n]

requires: [phase-04-ds-enhancements]
provides:
  - useOTPInput tests for paste/autofill + truncation
  - OTPInput testID + integration paste test
  - DatePicker forwards locale, timeZoneOffsetInMinutes, timeZoneOffsetInSeconds, timeZoneName
affects: []

tech-stack:
  added: []
  patterns:
    - 'jest.mock DateTimePicker + cast default to jest.Mock (bun has no jest.requireMock)'

key-files:
  created: []
  modified:
    - packages/headless/src/hooks/__tests__/useOTPInput.test.tsx
    - packages/ui/src/components/OTPInput/OTPInput.tsx
    - packages/ui/src/components/OTPInput/__tests__/OTPInput.test.tsx
    - packages/ui/src/components/DatePicker/DatePicker.tsx
    - packages/ui/src/components/DatePicker/__tests__/DatePicker.test.tsx

requirements-completed:
  - BL-01
  - BL-02

duration: —
completed: 2026-04-02
---

# Phase 05 — Plan 05-01 Summary

**Đã thực thi:** Test paste/autofill `useOTPInput`; `testID="rnui-otp-input"` + test `changeText`; `DatePicker` forward locale/TZ props; mock `DateTimePicker` assert forward.

## Verify

- `cd packages/headless && bun tsc --noEmit && bun test src/hooks/__tests__/useOTPInput.test.tsx`
- `cd packages/ui && bun tsc --noEmit && bun test src/components/OTPInput/__tests__/OTPInput.test.tsx src/components/DatePicker/__tests__/DatePicker.test.tsx`
