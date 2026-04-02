# Phase 5 — Validation strategy (wave 1)

**Plans:** `05-01-PLAN.md`  
**Requirements:** BL-01, BL-02

## Pre-merge

1. `cd packages/headless && bun tsc --noEmit`
2. `cd packages/ui && bun tsc --noEmit`
3. `cd packages/headless && bun test src/hooks/__tests__/useOTPInput.test.tsx`
4. `cd packages/ui && bun test src/components/OTPInput/__tests__/OTPInput.test.tsx src/components/DatePicker/__tests__/DatePicker.test.tsx`

## Acceptance grep (optional)

- `rg "locale\\??" packages/ui/src/components/DatePicker/DatePicker.tsx` — prop có trong interface + passed to `DateTimePicker`
- `rg "paste|123456|handleChange" packages/headless/src/hooks/__tests__/useOTPInput.test.tsx` — có case paste/autofill

## Nyquist / evidence

- Mỗi task trong plan có `<acceptance_criteria>`; SUMMARY sau execute ghi lệnh đã chạy.
