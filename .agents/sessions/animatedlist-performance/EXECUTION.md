# Execution — AnimatedList Performance (Pha 1)

> Plan: `.agents/sessions/animatedlist-performance/PLAN.md`
> Ngày: 2026-07-05 · Mode: Full

## 1. Context

- **Plan Source:** PLAN.md (Pha 1: A+B+C+D).
- **Scope:** bỏ remount khi đổi type; dọn API FlashList v2; bare FlashList impl; tắt MVCP (insert→top).
- **Out of scope:** Pha 2 (React Compiler, GestureHandlerRootView).

## 2. Execution Log

| Step | Task ID | Action | Files / Scope | Result |
|---|---|---|---|---|
| 1 | T-001 | `key={`${type}-${mode}`}` → `key={mode}` (3 list) | demo | Done |
| 2 | T-005 | Thêm `maintainVisibleContentPosition={INSERT_AT_TOP_MVCP}` (3 list) + const | demo | Done |
| 3 | T-003 | Xoá `estimatedItemSize` (3 list), `getEstimatedItemSize` + callback `socialEstimatedItemSize`; giữ `getItemType` | demo | Done |
| 4 | T-002 | `estimatedItemSize?` optional+deprecated; strip `estimatedItemSize`/`getEstimatedItemSize` khỏi forward; trim `LIST_PERFORMANCE_DEFAULTS` | lib | Done |
| 5 | T-004 | `listImpl.ts` trả plain FlashList, fallback plain `FlatList` (bỏ `Animated.createAnimatedComponent`) | lib | Done |
| 6 | T-006 | typecheck + lint + verify scope | repo | Done |

## 3. Files Changed

| File | Change Summary | In Plan? |
|---|---|---|
| `apps/example/app/components/AnimatedList.tsx` | Key bỏ `type`; MVCP disabled 3 list + const `INSERT_AT_TOP_MVCP`; bỏ estimatedItemSize/getEstimatedItemSize + callback | Yes |
| `packages/ui/src/components/AnimatedList/types.ts` | `estimatedItemSize` → optional + `@deprecated` | Yes |
| `packages/ui/src/components/AnimatedList/AnimatedList.tsx` | Strip estimatedItemSize/getEstimatedItemSize khỏi forward; trim defaults còn `scrollEventThrottle` | Yes |
| `packages/ui/src/components/AnimatedList/listImpl.ts` | Plain FlashList + FlatList fallback (bỏ animated wrapper) | Yes |

## 4. Commands Run

| Command | Purpose | Result | Notes |
|---|---|---|---|
| `bun run typecheck` | Static typecheck toàn monorepo | Passed | 14/14 tasks OK |
| `bun run lint` (turbo) | Lint toàn repo | Failed | Chỉ `@truongdq01/headless` (`parseUrl` format) — **pre-existing**, không thuộc file đã sửa |
| `biome check` (5 file đã sửa) | Lint scope thay đổi | 2 format warns | Cả 2 **pre-existing** (signature dài `createRandomSocialPost/TimelinePost`, dòng `displayName`) — không nằm trên dòng tôi thêm |

## 5. Verification Evidence

| Check | Method | Result | Evidence |
|---|---|---|---|
| Typecheck | `bun run typecheck` | Passed | No TS errors, 14 tasks |
| Lint (scope) | ReadLints trên 4 file lib/demo | Passed | No linter errors |
| Không tham chiếu API cũ | grep demo | Passed | Hết `estimatedItemSize`/`getEstimatedItemSize`/`${type}` trong key |
| Không còn animated FlashList wrapper | grep repo | Passed | `createAnimatedComponent(FlashList)` đã bỏ; còn lại là component khác (Image/Input/Slider) |
| headless untouched | `git status` | Passed | "no headless changes" |
| Manual (device) | — | **Chưa chạy** | Cần user verify FPS trên thiết bị (xem Handoff) |

## 6. Deviations From Plan

Không có deviation. Q-1 (bỏ `key` trên `Animated.View` trong cell) giữ nguyên như plan — chỉ xử lý nếu manual test thấy regress scroll.

## 7. Issues / Blockers

| Issue | Type | Impact | Next Action |
|---|---|---|---|
| `@truongdq01/headless` lint fail (`parseUrl`) | Pre-existing | Không liên quan Pha 1 | Ngoài scope; xử lý riêng nếu cần |
| Format warns (signature dài, displayName) | Pre-existing | Cosmetic | Không sửa để giữ diff tối thiểu; có thể `biome format --write` sau nếu muốn |

## 8. Rollback Notes

- Code-only, reversible. Revert 4 file ở mục 3, không đổi config/data/dependency.
- T-005: nếu MVCP disabled lệch scroll → bỏ prop `maintainVisibleContentPosition`.
- T-004: nếu bare FlashList lỗi ref → khôi phục `Animated.createAnimatedComponent(FlashList)`.

## 9. Final Status

- Completed: T-001..T-006 (code).
- Verification: automated (typecheck + lint scope) pass; **manual FPS trên device chưa chạy**.
- Blocked: None.

## 9b. Follow-up: Fix exit animation (Q-1 resolved)

**Triệu chứng:** xoá item không thấy exit animation.

**Nguyên nhân:** `key={itemKey}` đặt thủ công trên `Animated.View` trong `AnimatedCell`. FlashList v2 đã tự key mỗi cell qua `ViewHolder` (`ViewHolderCollection.js:85`). Key thứ hai khiến `Animated.View` bị remount mỗi lần recycle (chạy nhảm entering khi cuộn) và làm Reanimated không theo dõi được vòng đời để chạy `exiting` khi xoá.

**Fix:** bỏ `key={itemKey}` + toàn bộ plumbing (`itemKey` prop, `resolveItemKey`). Blank-row cũ đã được xử lý bằng data unique (`createRandomContact`) + `ContactRow` memo primitive props nên không cần key thủ công.

**Files:** `AnimatedCell.tsx`, `types.ts` (`AnimatedCellProps`), `AnimatedList.tsx` (bỏ `resolveItemKey`).

**Verify:** `bun run typecheck` pass; lint scope sạch. Cần user test lại: xoá item thấy exit; cuộn nhanh không nháy cell/không blank row.

## 9c. Follow-up: UX xoá tuần tự (two-phase animate-then-remove)

**Vấn đề UX:** khi xoá (vd slide), FlashList giải phóng chỗ ngay → các row dưới nhảy lên trong khi item đang xoá còn chưa biến mất. Nguyên nhân: FlashList định vị cell bằng absolute trên `View` thường; xoá khỏi `data` là mất chỗ tức thì, `exiting` chỉ là "bóng ma".

**Quyết định (user chọn):** two-phase, làm ở **demo**, hành vi: item ẩn/thu gọn xong rồi bên dưới mới đẩy lên.

**Cách làm:**
- Thêm `RemovableRow` (demo): giữ item trong `data`, đo height 1 lần, khi `removing` thì animate `height→0` + opacity + slide/zoom (theo preset) qua `withTiming`; **height thu nhỏ khiến FlashList đẩy các row dưới lên dần** (đồng bộ, scroll-safe vì chỉ chạy lúc xoá). Xong animation → `onRemoved` (runOnJS) mới filter khỏi `data`.
- State `removingIds: Set<string>`; nút Remove gọi `beginRemove` (phase 1); `finalizeRemove{Contact,Social,Timeline}` (phase 2).
- Core `itemExiting` bỏ khỏi demo config (RemovableRow lo exit); gỡ `runLayoutMutation`/`prepareForLayoutAnimationRender` khỏi luồng remove.
- `removeVariant` suy từ `type`: slide→slide, staggeredZoom→zoom, còn lại→fade.

**Files:** `apps/example/app/components/AnimatedList.tsx` (demo-only, không đổi core).

**Verify:** `bun run typecheck` pass; ReadLints sạch. Format-warn biome còn lại là pre-existing. Cần user test: xoá thấy item thu gọn/trượt hết rồi dưới mới lên; cuộn vẫn mượt.

## 9d. Follow-up: fix giật khi xoá (bỏ re-render toàn bộ cell)

**Triệu chứng:** two-phase chạy đúng nhưng hơi giật.

**Nguyên nhân chính:** `removingIds` là state chung của screen, cả 3 `renderItem` phụ thuộc vào nó → mỗi lần bấm Remove (và lúc finalize) `renderItem` đổi identity → FlashList re-render **tất cả** cell hiển thị, không chỉ cell đang xoá.

**Fix:** chuyển trạng thái removing thành **local trong từng `RemovableRow`** (render-prop `children(remove)` + `useState` cục bộ). Bỏ `removingIds`/`beginRemove`/`clearRemoving`. `renderItem` giờ ổn định → bấm Remove chỉ re-render đúng cell đó.
- Reset khi cell bị recycle sang item khác qua `resetKey={item.id}` + `useLayoutEffect`.
- `onRemoved` giữ qua ref để không re-trigger animation.
- Easing đổi sang `Easing.out(Easing.cubic)` cho mượt hơn.

**Verify:** `bun run typecheck` pass; ReadLints sạch. Cần user test lại độ mượt.

## 9e. Follow-up: tách demo riêng để hết lẫn state

**Vấn đề:** 1 screen gồm 3 mode (Contacts/Social/Timeline) share chung state (3 data state, mode, listRef, burst, type…) → rối, dễ lẫn.

**Fix:** tách thành các component demo độc lập, mỗi demo có **state riêng** qua hook `useAnimatedListController`. Screen chỉ còn `SegmentedControl` chọn demo; đổi mode = unmount demo cũ → reset sạch, không leak state.

**Cấu trúc mới** `apps/example/demo/animatedList/`:
- `controller.ts` — hook `useAnimatedListController<T>` (data, insert+burst, finalizeRemove, activeListConfig, removeVariant, keyExtractor, listRef); `AnimationType`, `ANIMATION_OPTIONS`, `INSERT_AT_TOP_MVCP`.
- `RemovableRow.tsx` — two-phase removal wrapper + `RemoveVariant`.
- `rows.tsx` — `EngagementAction`, `ContactRow`, `SocialFeedRow`, `TimelineFeedRow` + `ThemeTokens`.
- `AnimatedListDemoFrame.tsx` — chrome chung (preset selector + insert button + list shell).
- `ContactsDemo.tsx` / `SocialDemo.tsx` / `TimelineDemo.tsx` — mỗi demo tự chứa: controller riêng, toggle like/repost riêng, renderItem riêng.
- `apps/example/app/components/AnimatedList.tsx` — screen mỏng: `SegmentedControl` + render demo đang chọn.

**Verify:** `bun run typecheck` pass (14/14); ReadLints toàn bộ file mới sạch.

## 10. Handoff To Review

- **Ready for review:** Yes (code).
- **Suggested review focus:**
  - Đổi animation type không remount list (SC-001).
  - Spam Insert giữ FPS + insert prepend về top (SC-002, SC-004).
  - Remove vẫn chạy exit animation (regression `prepareForLayoutAnimationRender`).
- **Known risks:** `key` trên `Animated.View` trong cell có thể ảnh hưởng scroll recycle (Q-1) — cần quan sát khi test.
- **Skipped checks:** Manual FPS trên device/simulator (New Arch) — cần user chạy: bật Perf Monitor, đổi 4 preset khi list có data, spam Insert, remove, kiểm 3 mode.
