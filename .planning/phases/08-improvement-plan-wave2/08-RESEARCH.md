# Phase 8 — Research notes (short)

## Thứ tự gợi ý

1. **IMP-05** trước **IMP-06** — FormField ảnh hưởng layout chung; TextArea phụ thuộc quy ước helper.
2. **IMP-07** có thể song song sau khi token typography chốt — sweep example cuối wave để tránh conflict merge.
3. **IMP-08** chủ yếu example + export — làm sau hoặc cuối để một PR “showcase” gọn.

## Rủi ro

- **Typography token**: thêm key vào `semantic` có thể làm thay đổi type `SemanticTokens` — chạy `tsc` toàn monorepo.
- **TextArea counter**: absolute position trong ô có thể đụng safe area keyboard — test iOS/Android ngắn.
- **RadioItem export**: kiểm tra tree-shaking / public API trong `packages/ui/src/index.ts`.

## Không làm trong spike này

- Refactor toàn bộ `<Text>` trong mọi component thư viện — Phase 8 chỉ **example** + **Typography API**; sweep lib có thể Phase sau.
