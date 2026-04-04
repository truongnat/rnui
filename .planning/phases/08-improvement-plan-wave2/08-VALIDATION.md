# Validation — Phase 8 (`08-01-PLAN.md`)

## Automated

- [x] `bun turbo typecheck` — `tokens`, `ui` (example: lỗi kiểu Card/Slider có sẵn)
- [x] `bun turbo test --filter=@truongdq01/ui`

## Manual (example app)

- [x] **IMP-05**: Input focus cảm giác nhanh hơn; FormField label/helper phân tầng rõ
- [x] **IMP-06**: TextArea — counter + helper không chồng lấp khó đọc
- [x] **IMP-07**: Section headers dùng Typography overline (hoặc variant đã chốt)
- [x] **IMP-08**: Divider dọc; Radio ngang; Checkbox indeterminate; `RadioItem` import được từ `@truongdq01/ui`

## REQ

| REQ-ID | Check                           |
| ------ | ------------------------------- |
| IMP-05 | Input + FormField diff          |
| IMP-06 | TextArea + example              |
| IMP-07 | semantic + Typography + example |
| IMP-08 | exports + example               |
