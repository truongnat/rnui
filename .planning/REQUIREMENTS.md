# RNUI — v1 Requirements (library evolution)

Nguồn: mục tiêu sản phẩm trong `PROJECT.md` + `AUDIT_REPORT.md` (Improvement Roadmap).

## v1 — Requirements

### Quality & safety (QUAL)

- [ ] **QUAL-01**: Loại bỏ `as any` không cần thiết trên token Rating/Pressable; `ComponentTokens` khớp với `ratingTokens` / `pressableTokens`
- [ ] **QUAL-02**: `useRating` không chia cho `precision` không hợp lệ (≤0, NaN)
- [ ] **QUAL-03**: `Button` với `href` xử lý lỗi `Linking.openURL` (không unhandled rejection)

### Accessibility & motion (A11Y)

- [ ] **A11Y-01**: Giảm chuyển động khi OS bật “Reduce motion” (`useReduceMotionEnabled` / `usePressable`)
- [x] **A11Y-02**: Rating có vai trò/ giá trị a11y và (phase 2) thông báo SR khi đổi giá trị

### Rating (RATE)

- [ ] **RATE-01**: Màu sao theo semantic token (`accent`), không hardcode amber cố định
- [ ] **RATE-02**: Trạng thái nửa sao dùng `starHalf` (glyph đúng)
- [x] **RATE-03**: (Phase 2+) Read-only / compact / custom icon theo roadmap

### Motion tokens (MOT)

- [ ] **MOT-01**: `timingPreset` dùng được với `withTiming` qua `resolveTimingPreset` (headless)

### Performance & edge cases (PERF)

- [x] **PERF-01**: Carousel: key ổn định, guard `data` rỗng, xử lý loop 1 phần tử, width responsive
- [x] **PERF-02**: Skeleton: hủy shimmer khi `animate=false`; (tùy chọn) shared shimmer

### Design system (DS)

- [ ] **DS-01**: (Phase 4) Font family token, brand trung tính, contrast loveBrand, token `surface.hover` traceable, v.v.

## v2 — Deferred

- Histogram review, NumericScore animation, SentimentPicker — sau khi v1 ổn định

## Out of Scope

- Hosting / CI của ứng dụng consumer — trách nhiệm app
- Thay thế hoàn toàn `@react-native-community/datetimepicker` — chỉ expose props khi làm Phase 5

## Traceability

| REQ-ID | Phase (ROADMAP) |
|--------|-----------------|
| QUAL-*, A11Y-01, RATE-*, MOT-01 | 1 |
| A11Y-02, RATE-03 (partial) | 2 |
| PERF-* | 3 |
| DS-* | 4 |
| Backlog OTP/DatePicker | 5 |
