# Validation — Phase 7 wave 1 (`07-01-PLAN.md`)

## Automated

- [ ] `bun turbo typecheck` — các package có file đổi (ui, tokens, example nếu trong matrix CI)
- [ ] `bun turbo test --filter=@truongdq01/ui` (và headless nếu đụng)
- [ ] `bun turbo test --filter=@truongdq01/headless` — nếu không đổi headless, có thể skip

## Manual (example app)

- [ ] **IMP-01**: OTP — nhập, xóa, hoàn thành 6 số; border filled khác empty; không còn value cứng.
- [ ] **IMP-02**: Toast — nhiều toast liên tiếp, vị trí không giật mạnh (so sánh trước/sau).
- [ ] **IMP-03**: AnimatedList — scroll mượt, không cảnh báo perf rõ từ re-render `renderItem`.
- [ ] **IMP-04**: SegmentedControl — không flash indicator lúc mở màn; đổi tab đúng vùng.

## REQ traceability

| REQ-ID | Evidence                           |
| ------ | ---------------------------------- |
| IMP-01 | OTP files + example                |
| IMP-02 | Toast animation diff               |
| IMP-03 | Example AnimatedList `useCallback` |
| IMP-04 | SegmentedControl layout            |
