# Plan — AnimatedList Performance (Pha 1)

> Nguồn: `.agents/sessions/animatedlist-performance/DISCUSSION.md`
> Scope: **Pha 1** (A + B + C + D). Pha 2 (React Compiler, GestureHandlerRootView) = out of scope.
> Ngày: 2026-07-05

## 1. Goal & Scope

### Goal
Dứt điểm 2 triệu chứng FPS drop:
1. Đổi animation type không remount FlashList.
2. Spam Insert giữ FPS ổn định, không tụt về 2x.
Đồng thời dùng đúng API FlashList v2 (2.3.2) trên New Architecture.

### In Scope
- **A** — Bỏ remount khi đổi animation type.
- **B** — Dọn API FlashList v2 (bỏ `estimatedItemSize`/`getEstimatedItemSize`, xoá FlatList-only defaults).
- **C** — `listImpl.ts` trả plain FlashList (bỏ `Animated.createAnimatedComponent`).
- **D** — `maintainVisibleContentPosition={{ disabled: true }}` (hành vi insert = luôn scroll về đầu).

### Out of Scope
- Pha 2: React Compiler (`experiments.reactCompiler`), `GestureHandlerRootView` ở root.
- Viết lại demo screen / đổi UX ngoài phần list.

### Non-Goals
- Không đổi public API `AnimatedList` theo hướng breaking. `estimatedItemSize` chuyển sang **optional + deprecated**, không xoá cứng.
- Không đổi hành vi remove (giữ `prepareForLayoutAnimationRender` cho remove).

## 2. Sources / Context

| Source | Notes |
|---|---|
| `DISCUSSION.md` | Root causes A–E, checklist kiến trúc |
| FlashList `FlashListProps.d.ts` (v2.3.2) | Không còn `estimatedItemSize`/`getEstimatedItemSize`; MVCP mặc định bật |
| FlashList `FlashListRef.d.ts` (v2.3.2) | Có đủ `scrollToOffset`, `scrollToIndex`, `scrollToTop`, `prepareForLayoutAnimationRender` → bỏ wrapper animated an toàn |
| `apps/example/app/components/AnimatedList.tsx` | Demo screen, 3 list instances (lines 808–849) |
| `packages/ui/src/components/AnimatedList/*` | Lib: `AnimatedList.tsx`, `listImpl.ts`, `types.ts`, `AnimatedCell.tsx` |

## 3. Constraints & Assumptions

### Constraints
| Constraint | Impact |
|---|---|
| TS strict, no `any` / no ts-ignore (`.cursor/rules`) | Phải giữ type-safe khi strip props |
| Không breaking public API (rnui rule) | `estimatedItemSize` → optional, không xoá |
| FlashList v2 + New Arch | Không thêm lại FlatList-only props |

### Assumptions
| ID | Assumption | Risk If Wrong | Confirmation Needed? |
|---|---|---|---|
| A-1 | `type` chỉ ảnh hưởng animation config (entering/exiting builder), không ảnh hưởng data/layout | Bỏ remount làm animation không đổi khi switch | No — đã đọc code (`activeListConfig`) |
| A-2 | Các consumer khác (storybook, tests, docs) truyền `estimatedItemSize` vẫn chạy khi prop thành optional | Break build storybook/test | No — optional backward-compatible |
| A-3 | Bare FlashList ref đủ method cho `listRef` hiện dùng | Remove/scroll lỗi | No — đã verify `FlashListRef.d.ts` |
| A-4 | MVCP disabled không phá scroll-to-top hiện có | Vị trí scroll sai | Verify ở T-005 |

## 4. Affected Files / Systems

| Area | Files | Expected Change | Confidence |
|---|---|---|---|
| Lib impl | `packages/ui/src/components/AnimatedList/listImpl.ts` | Trả plain FlashList / FlatList fallback | High |
| Lib component | `packages/ui/src/components/AnimatedList/AnimatedList.tsx` | Strip `estimatedItemSize` + `getEstimatedItemSize`; trim defaults | High |
| Lib types | `packages/ui/src/components/AnimatedList/types.ts` | `estimatedItemSize?` optional + deprecate jsdoc | High |
| Demo | `apps/example/app/components/AnimatedList.tsx` | Bỏ `type` khỏi key; bỏ estimatedItemSize/getEstimatedItemSize; thêm MVCP disabled; xoá `socialEstimatedItemSize` | High |
| Consumers (verify only) | `apps/storybook/stories/AnimatedList.stories.tsx`, `packages/ui/src/components/AnimatedList/__tests__/AnimatedList.test.tsx`, `docs/.../animated-list.md` | Không sửa; chỉ đảm bảo không vỡ | Medium |

## 5. Execution Plan

| ID | Task | Description | Dependencies | Acceptance Criteria | Verification | Files / Scope |
|---|---|---|---|---|---|---|
| T-001 | Bỏ remount khi đổi type | Đổi `key={`${type}-${mode}`}` → `key={mode}` ở cả 3 `<AnimatedList>` | None | Đổi animation type KHÔNG unmount/re-measure list; rows đang có giữ nguyên; entering chỉ áp cho item mới | Manual: bấm đổi type khi list có data → không nhấp nháy; JS FPS không drop | `apps/example/app/components/AnimatedList.tsx:811,824,839` |
| T-002 | Lib: strip API FlashList v2 | `types.ts`: `estimatedItemSize?` optional + `@deprecated`. `AnimatedList.tsx`: destructure & KHÔNG forward `estimatedItemSize`, `getEstimatedItemSize`; trim `LIST_PERFORMANCE_DEFAULTS` chỉ giữ prop hợp lệ v2 (`scrollEventThrottle`), bỏ `removeClippedSubviews/initialNumToRender/maxToRenderPerBatch/windowSize/updateCellsBatchingPeriod` | None | Không prop thừa forward xuống FlashList; typecheck pass | `bun run typecheck`; chạy app → Metro console không warning `estimatedItemSize` | `packages/ui/src/components/AnimatedList/{types.ts,AnimatedList.tsx}` |
| T-003 | Demo: bỏ props không hỗ trợ | Xoá `estimatedItemSize={...}` (3 list), xoá `getEstimatedItemSize` + callback `socialEstimatedItemSize`; giữ `getItemType` | T-002 | 3 mode render đúng; không warning; không dead code | Manual 3 mode + `bun run lint` | `apps/example/app/components/AnimatedList.tsx` |
| T-004 | Bare FlashList impl | `listImpl.ts`: trả `FlashList` trực tiếp; fallback `require('react-native').FlatList` khi thiếu FlashList (bỏ `Animated.createAnimatedComponent`) | None | Ref methods (`scrollToOffset`, `prepareForLayoutAnimationRender`) hoạt động; scroll/insert/remove OK | Manual: scroll dài, insert, remove; typecheck | `packages/ui/src/components/AnimatedList/listImpl.ts` |
| T-005 | Tắt MVCP (insert→top) | Thêm `maintainVisibleContentPosition={{ disabled: true }}` cho 3 list; rà `scrollListToTop`/`scheduleScrollToTop` còn hợp lý | T-001 | Insert prepend item ở đầu + list ở offset 0; không giật do MVCP | Manual insert (chậm & spam) | `apps/example/app/components/AnimatedList.tsx` |
| T-006 | Verify & cleanup | Chạy typecheck + lint; xoá import/biến chết; đảm bảo consumer khác không vỡ | T-001..T-005 | typecheck + lint pass; storybook/tests không lỗi type | `bun run typecheck`, `bun run lint` | toàn bộ files ở mục 4 |

## 6. Execution Order

1. T-001 (độc lập, tác động lớn nhất, dễ verify).
2. T-002 → T-003 (lib trước, demo sau; demo phụ thuộc type optional).
3. T-004 (độc lập với T-002/003).
4. T-005 (sau T-001).
5. T-006 (chốt).

## 7. Verification Strategy

### Automated Checks
- `bun run typecheck`
- `bun run lint`
- (nếu chạy được) `bun run test` — kiểm `packages/ui/src/components/AnimatedList/__tests__/AnimatedList.test.tsx`

### Manual Checks (trên device/simulator, New Arch)
- Bật Perf Monitor (JS FPS). Có thể dùng `JSFPSMonitor` của FlashList nếu cần đo số.
- **Đổi type:** với list đang có ~10+ item, bấm lần lượt 4 preset → list không nhấp nháy, FPS không tụt.
- **Spam Insert:** bấm nhanh liên tục → FPS giữ ổn (không về 2x); item mới xuất hiện ở đầu; list ở top.
- **Insert chậm:** entering animation chạy mượt cho item mới.
- **Remove:** exit animation vẫn chạy đúng (regression của `prepareForLayoutAnimationRender`).
- **3 mode:** Contacts / Social / Timeline đều render đúng, không row trống.

### Regression Checks
- Scroll dài không giật, không blank cell khi recycle.
- Chuyển mode (SegmentedControl) vẫn đúng data + không leak state.
- Storybook `AnimatedList.stories.tsx` vẫn build.

## 8. Definition of Done

- [ ] T-001..T-006 hoàn tất.
- [ ] Đổi animation type không remount list (SC-001).
- [ ] Spam Insert FPS ổn định, không về 2x (SC-002).
- [ ] Không còn warning FlashList v2 `estimatedItemSize` (SC-003).
- [ ] Insert luôn hiển thị item mới ở đầu (SC-004).
- [ ] `bun run typecheck` + `bun run lint` pass (SC-005).
- [ ] Không thay đổi ngoài scope; `estimatedItemSize` chỉ optional (không breaking).
- [ ] Rollback path rõ.

## 9. Rollback Strategy
- Code-only, reversible. Revert theo commit hoặc theo từng file trong mục 4.
- T-005 rủi ro thấp nhất: nếu MVCP disabled gây lệch scroll, bỏ prop để quay lại default v2.
- T-004: nếu bare FlashList lỗi ref, khôi phục `Animated.createAnimatedComponent(FlashList)` trong `listImpl.ts`.

## 10. Risks & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Bỏ `type` khỏi key làm animation "cảm giác" không reset khi đổi type | Nhẹ, chỉ UX | Chấp nhận; item mới vẫn dùng config mới |
| `key={itemKey}` trên `Animated.View` trong cell (fix cũ) gây remount khi FlashList recycle lúc scroll | FPS scroll giảm | Đánh giá ở T-006; nếu regress, cân nhắc bỏ key (data đã unique) — ghi ở Open Questions Q-1 |
| Strip `estimatedItemSize` phá consumer truyền required | Build lỗi | Giữ optional (backward compatible), verify storybook/tests ở T-006 |
| Trim defaults ảnh hưởng nhánh FlatList fallback | Fallback kém tối ưu | Fallback hiếm dùng; giữ `scrollEventThrottle`; chấp nhận |

## 11. Open Questions

| ID | Question | Owner | Blocking? |
|---|---|---|---|
| Q-1 | Có nên bỏ `key={itemKey}` trên `Animated.View` trong `AnimatedCell` (dùng recycling-aware của FlashList v2) không? | User/Eng | No — mặc định giữ, chỉ xử lý nếu T-006 thấy regress scroll |
| Q-2 | Có set MVCP disabled ở lib default hay chỉ ở demo? | User/Eng | No — plan set ở **demo** để tránh đổi behavior toàn lib |

## 12. Handoff To Execution

- Ready for execution: **Yes** (Pha 1 đã chốt scope + hành vi insert).
- Blocking items: None.
- Suggested first action: T-001 (bỏ `type` khỏi `key` ở 3 list).
- Review required before execution: **No** (code-only, reversible, low risk). Chờ user ra lệnh "execute/làm Pha 1".
- Suggested next skill: `execution`.
