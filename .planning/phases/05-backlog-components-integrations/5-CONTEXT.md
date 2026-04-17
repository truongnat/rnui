# Phase 5: Backlog components & integrations — Context

**Gathered:** 2026-04-02  
**Status:** Ready for planning (no prior `/gsd-discuss-phase` — synthesized from ROADMAP + `AUDIT_REPORT.md`)

<domain>

## Phase boundary

Phase 5 theo **ROADMAP**: OTP paste, DatePicker locale/TZ, và **component backlog** (NumericScore, ReviewSummary, …). **Wave 1 (05-01)** chỉ gói **hai hạng mục audit ưu tiên vàng** (5.7, 5.8) + proof test/tsc — tránh một PR quá lớn.

**Success criterion (ROADMAP):** Mỗi hạng mục chọn có **acceptance cụ thể** và **proof merge** (test hoặc doc ngắn).

**Out of scope wave 1:** `NumericScore`, `ReviewSummary`, `SentimentPicker`, `RatingInput` FormField, skeleton shimmer provider — **deferred** (v2 / wave 2).

</domain>

<decisions>

## Implementation decisions (wave 1)

- **D-50 — OTP / paste:** `useOTPInput` dùng **một** `TextInput` ẩn; paste một lần gửi **chuỗi đầy đủ** → `handleChange` đã `replace` + `slice(0, length)`. Wave 1: **bổ sung test** paste/autofill (chuỗi dài một lần), xử lý edge (non-digit strip); chỉ sửa hook nếu test chứng minh lỗi.
- **D-51 — DatePicker i18n:** Mở rộng `DatePickerProps` với prop tùy chọn khớp `@react-native-community/datetimepicker`: ít nhất `locale`, `timeZoneOffsetInMinutes`; forward xuống `<DateTimePicker />`. Thêm `timeZoneOffsetInSeconds` / `timeZoneName` nếu type upstream có và không phá tương thích.
- **D-52 — UI-SPEC:** ROADMAP **UI hint: mixed** — OTP/DatePicker là hành vi + prop; không bắt buộc full UI-SPEC trước execute; có thể chạy `/gsd-ui-phase 5` nếu muốn contract copy/spacing.

### Claude's discretion

- Thứ tự: headless `useOTPInput` + test → `DatePicker` props + test → `tsc` toàn package liên quan.
- `getOtpProps(): any` — chỉ đụng nếu plan wave 2 typing cleanup.

</decisions>

<canonical_refs>

- `.planning/ROADMAP.md` — Phase 5
- `.planning/REQUIREMENTS.md` — BL-01, BL-02
- `AUDIT_REPORT.md` — §4.6 OTP paste, §4.8 DatePicker locale/TZ; bảng Phase 5 (5.7, 5.8)
- `packages/headless/src/hooks/useOTPInput.ts`
- `packages/ui/src/components/OTPInput/OTPInput.tsx`
- `packages/ui/src/components/DatePicker/DatePicker.tsx`
- `node_modules/@react-native-community/datetimepicker/src/index.d.ts` (API)

</canonical_refs>

---

_Phase: 05-backlog-components-integrations_
