# Phase 8 — Context: Improvement plan wave 2 (forms + typography + showcases)

## Problem statement

Sau Phase 7 (`IMPROVEMENT_PLAN.md` _Phase 1 — Critical UX_), **Phase 2 — Component Enhancements** trong cùng file tập trung: form feel (Input, FormField, TextArea), hệ typography đồng bộ token, và bổ sung demo/export cho component đã đúng code nhưng chưa thấy trong example.

## Scope (wave 1 / Phase 8)

| IMP    | Nguồn `IMPROVEMENT_PLAN`    | Trọng tâm                                                                                                                                                                       |
| ------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IMP-05 | Issue #1 (Input, FormField) | Focus animation nhanh hơn; padding/spacing label/helper; hierarchy label vs helper                                                                                              |
| IMP-06 | Issue #1 (TextArea)         | Counter không chồng `helperText`; tùy chọn vị trí counter (`showCounter` / `counterPosition` hoặc tương đương)                                                                  |
| IMP-07 | Issue #2 (Typography)       | Token typography composite trong `semantic` (hoặc lớp tương đương); mở rộng `Typography` (overline, code, …); example dùng `Typography` cho section labels thay `<Text>` ad-hoc |
| IMP-08 | Issues #3, #5, #7           | Divider dọc trong example; export `RadioItem` + demo ngang; Checkbox `indeterminate` trong example                                                                              |

## Out of scope (Phase 8)

- Select FlashList / load-more (**Issue #4**) — effort L, Phase 9 hoặc wave riêng.
- Slider vertical/range (**Issue #6**), Skeleton presets (**#8**), EmptyState (**#9**), DatePicker grid (**#13**), v.v.

## Dependencies

- Phase 7 complete.
- Tokens package: chỉnh `semantic` / typography có thể ảnh hưởng snapshot test Typography — cập nhật test nếu cần.

## Links

- `IMPROVEMENT_PLAN.md` — Issues #1–#3, #5, #7; _Execution Order_ Phase 2 (dòng ~751–756).

## Success

`08-VALIDATION.md` pass; `08-01-PLAN.md` executed + `08-01-SUMMARY.md`.
