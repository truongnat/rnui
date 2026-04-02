# RNUI — v1 Requirements (library evolution)

Nguồn: mục tiêu sản phẩm trong `PROJECT.md` + `AUDIT_REPORT.md` (Improvement Roadmap).

## v1 — Requirements

### Quality & safety (QUAL)

- [x] **QUAL-01**: Loại bỏ `as any` không cần thiết trên token Rating/Pressable; `ComponentTokens` khớp với `ratingTokens` / `pressableTokens`
- [x] **QUAL-02**: `useRating` không chia cho `precision` không hợp lệ (≤0, NaN)
- [x] **QUAL-03**: `Button` với `href` xử lý lỗi `Linking.openURL` (không unhandled rejection)

### Accessibility & motion (A11Y)

- [x] **A11Y-01**: Giảm chuyển động khi OS bật “Reduce motion” (`useReduceMotionEnabled` / `usePressable`)
- [x] **A11Y-02**: Rating có vai trò/ giá trị a11y và (phase 2) thông báo SR khi đổi giá trị

### Rating (RATE)

- [x] **RATE-01**: Màu sao theo semantic token (`accent`), không hardcode amber cố định
- [x] **RATE-02**: Trạng thái nửa sao dùng `starHalf` (glyph đúng)
- [x] **RATE-03**: (Phase 2+) Read-only / compact / custom icon theo roadmap

### Motion tokens (MOT)

- [x] **MOT-01**: `timingPreset` dùng được với `withTiming` qua `resolveTimingPreset` (headless)

### Performance & edge cases (PERF)

- [x] **PERF-01**: Carousel: key ổn định, guard `data` rỗng, xử lý loop 1 phần tử, width responsive
- [x] **PERF-02**: Skeleton: hủy shimmer khi `animate=false`; (tùy chọn) shared shimmer

### Design system (DS)

- [x] **DS-01**: (Phase 4) Font family token, brand trung tính, contrast loveBrand, token `surface.hover` traceable, v.v.

### Backlog integrations (BL)

- [x] **BL-01**: (Phase 5) OTPInput — paste/autofill chuỗi đầy đủ; `useOTPInput` + test chứng minh
- [x] **BL-02**: (Phase 5) DatePicker — forward `locale`, `timeZoneOffsetInMinutes` (và prop TZ liên quan từ `@react-native-community/datetimepicker`) xuống native picker

### UI report follow-through (UIREP) — `UI_REPORT.md`

- [x] **UIREP-01**: (Phase 6) Example app — persist `colorScheme` qua storage (AsyncStorage hoặc tương đương); survive restart
- [x] **UIREP-02**: (Phase 6) Headless — hook/API persistence scheme với storage adapter + tests (không hard-code AsyncStorage trong package)
- [x] **UIREP-03**: (Phase 6) Chuẩn hóa `fontWeight` TypeScript trong example (tránh cảnh báo number vs string)
- [x] **UIREP-04**: (Phase 6) Audit memo `resolveComponentTokens` / `ThemeProvider`; comment hoặc sửa tối thiểu
- [x] **UIREP-05**: (Phase 6) `AnimatedList` — JSDoc `estimatedItemSize` + đối chiếu giá trị example/storybook
- [x] **UIREP-06**: (Phase 6) Haptics trên example khi đổi theme (`expo-haptics`)
- [ ] **UIREP-07**: (Phase 6+ / wave 2) Visual regression hoặc snapshot — defer khỏi wave 1

### Improvement plan (IMP) — `IMPROVEMENT_PLAN.md`

- [x] **IMP-01**: (Phase 7) OTPInput — example controlled; token filled border; layout cell (vuông / border states)
- [x] **IMP-02**: (Phase 7) Toast — giảm jump / spring quá gắt (animation tuning)
- [x] **IMP-03**: (Phase 7) AnimatedList — example `useCallback` + stable `keyExtractor`
- [x] **IMP-04**: (Phase 7) SegmentedControl — indicator inset + `ready` sau layout (không flash `width=0`)

### Improvement plan wave 2 (IMP) — `IMPROVEMENT_PLAN.md` Phase 2

- [x] **IMP-05**: (Phase 8) Input focus timing + FormField label/helper spacing và hierarchy
- [x] **IMP-06**: (Phase 8) TextArea — counter position / `showCounter`; tránh chồng helper
- [x] **IMP-07**: (Phase 8) Typography — semantic typography tokens + variants (overline, code, …); example section headers
- [x] **IMP-08**: (Phase 8) Export `RadioItem`; example — Divider vertical, Radio horizontal, Checkbox indeterminate

### Improvement plan phase 3 (IMP) — `IMPROVEMENT_PLAN.md` Execution Order Phase 3

- [x] **IMP-09**: (Phase 9) Skeleton — preset (Profile/Media/Form/Grid/Table hoặc subset) + `SkeletonGroup` stagger + shimmer direction; example
- [x] **IMP-10**: (Phase 9) EmptyState — `size`, `variant`, `illustration`, preset copy (search/error/offline/permission/empty); example
- [x] **IMP-11**: (Phase 9) Select — FlashList trong sheet + `loading` / `onLoadMore` / `hasMore` / `loadingMore`; example large list + load-more
- [x] **IMP-12**: (Phase 9) Slider — `useSlider` orientation + range; UI vertical + `thumbRenderer` + range; example
- [ ] **IMP-13**: (Phase 9b / plan 09-02) DatePicker — `CalendarGrid` + `CalendarBottomSheet`; iOS calendar path; prop `pickerStyle`

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
| BL-* | 5 |
| UIREP-* | 6 |
| IMP-* | 7–9 |
