# Discussion — AnimatedList Performance

> Status: Brainstorming (chưa implement). Chốt: chỉ lưu discussion để review trước.
> Ngày: 2026-07-05

## 1. Goal

Tìm root-cause khiến **JS FPS tụt mạnh (60 → 40 → 2x)** khi:
1. Bấm **Insert** (prepend item ở đầu list) nhiều lần.
2. **Chuyển animation type** (Default / Staggered Zoom / Directional Slide / Fade from Right).

Đồng thời xác định đã tận dụng đúng **kiến trúc React Native mới** để tối ưu hiệu năng cho build này chưa.

## 2. Desired Outcome

- Đổi animation type: không còn drop mạnh (không remount list).
- Spam Insert: FPS giữ ổn định, không còn tụt về 2x.
- Xác nhận + đóng các khoảng trống kiến trúc (FlashList v2 API, React Compiler).

## 3. Context / Confirmed Facts

Môi trường (evidence):

| Thành phần | Version / Trạng thái | Nguồn |
|---|---|---|
| React Native | 0.83.2 | `apps/example/package.json:38` |
| React | 19.2.0 | `apps/example/package.json:37` |
| New Architecture (Fabric) | ✅ Bật | `apps/example/app.json:9` (`newArchEnabled: true`) |
| Reanimated | 4.2.1 | `apps/example/package.json:40` |
| react-native-worklets | 0.7.2 (plugin auto-inject) | `apps/example/babel.config.js` |
| FlashList | **2.3.2** | `node_modules/.bun/@shopify+flash-list@2.3.2` |
| React Compiler | ❌ Chưa bật | không có `experiments.reactCompiler` trong `app.json` |
| GestureHandlerRootView ở root | ❌ Thiếu | `apps/example/app/_layout.tsx` |

## 4. Root Causes (điều tra)

### 🔴 A. Chuyển type = remount toàn bộ FlashList (thủ phạm chính khi đổi type)

`apps/example/app/components/AnimatedList.tsx:811,824,839`

```
key={`${type}-${mode}`}
```

- `type` nằm trong `key` → đổi type khiến React **unmount + mount lại cả FlashList**.
- FlashList v2 phải đo lại từ đầu + dựng lại recycle pool.
- **Mọi cell đang hiển thị đồng loạt chạy `entering`** trên worklet thread.
- `type` thực chất chỉ dùng để tính `activeListConfig` (entering/exiting builder) → có thể swap runtime, **không cần remount**.

### 🔴 B. Dùng sai API FlashList v2 (2.3.2)

- `estimatedItemSize` (lines 816, 829, 844) → v2 **đã bỏ** (auto-measure), truyền vào bị warning + ignore.
- `getEstimatedItemSize` (line 833) → **không tồn tại** trong v2.
- `LIST_PERFORMANCE_DEFAULTS` trong lib (`packages/ui/src/components/AnimatedList/AnimatedList.tsx:13-21`): `removeClippedSubviews`, `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`, `updateCellsBatchingPeriod` → là props **FlatList**, FlashList v2 không đọc.
- `drawDistance: 250` hợp lệ v2 nhưng cao → render/animate nhiều cell cùng lúc → nặng thêm.

### 🟠 C. `Animated.createAnimatedComponent(FlashList)` thừa

`packages/ui/src/components/AnimatedList/listImpl.ts:19` — không truyền animated style/prop nào cho bản thân list (animation nằm trong `Animated.View` mỗi cell) → wrapper là overhead thuần + dễ lỗi ref. FlashList v2 ship sẵn `AnimatedFlashList` nếu cần.

### 🟠 D. `maintainVisibleContentPosition` mặc định BẬT ở v2

FlashList v2 bật MVCP mặc định (New Arch). Với list prepend-at-top, MVCP đánh nhau với `scrollToOffset(0)` thủ công → layout thrash khi insert.
→ **Quyết định:** hành vi Insert = luôn scroll về đầu → sẽ **tắt MVCP default** (`maintainVisibleContentPosition={{ disabled: true }}`).

### 🟡 E. Bão entering animation khi insert/mount

Mỗi cell có `entering` mặc định `FadeInDown`. Burst mode đã giảm phần nào, nhưng remount ở (A) bypass burst mode nên vẫn nổ.

## 5. Kiến trúc RN mới — Checklist

| Hạng mục | Trạng thái |
|---|---|
| Fabric / New Arch | ✅ Bật |
| Reanimated 4 + Worklets | ✅ |
| FlashList v2 | ⚠️ Có cài nhưng dùng sai API (mục B) |
| React Compiler | ❌ Chưa bật — auto-memoize row/renderItem |
| GestureHandlerRootView ở root | ❌ Thiếu — chặn animated press-state kiểu GestureDetector |

## 6. Scope

### In Scope (Pha 1 — fix FPS trực tiếp)
- A: Bỏ `type` khỏi `key`, đổi animation config runtime.
- B: Dọn API FlashList v2 (bỏ `estimatedItemSize`/`getEstimatedItemSize`; xoá FlatList-props khỏi lib defaults; hạ/soát `drawDistance`).
- C: `listImpl.ts` trả plain FlashList (bỏ wrapper animated).
- D: Cấu hình `maintainVisibleContentPosition={{ disabled: true }}` (hành vi: luôn scroll về đầu khi insert).

### Out of Scope (Pha 2 — tối ưu kiến trúc, tách riêng)
- Bật React Compiler (`experiments.reactCompiler` + `babel-plugin-react-compiler`), rà `.get()/.set()` shared value.
- Bọc `GestureHandlerRootView` ở root + kiểm `ThemeProvider withGestureRoot`.

### Non-Goals
- Không đổi public API của `AnimatedList` theo hướng breaking (giữ tương thích prop hiện có; `estimatedItemSize` có thể chuyển thành no-op/deprecate mềm).
- Không viết lại toàn bộ demo screen.

## 7. Success Criteria

| ID | Signal | How To Verify |
|---|---|---|
| SC-001 | Đổi animation type không remount list | Không thấy list nhấp nháy/re-measure; FPS không drop khi bấm đổi type |
| SC-002 | Spam Insert giữ FPS ổn định | Perf monitor: JS FPS không tụt về 2x khi bấm nhanh |
| SC-003 | Không còn dev warning của FlashList v2 | Metro/console sạch warning `estimatedItemSize` |
| SC-004 | Insert luôn hiển thị item mới ở đầu | Item mới xuất hiện + list ở offset 0 |
| SC-005 | typecheck + lint pass | `bun run typecheck`, `bun run lint` |

## 8. Options Considered

| Option | Summary | Effort | Risk | Reversible | Tác động FPS |
|---|---|---|---|---|---|
| A. Bỏ remount khi đổi type | Bỏ `type` khỏi `key`, đổi config runtime | Thấp | Thấp | Dễ | ⭐⭐⭐ |
| B. Dọn API FlashList v2 | Bỏ props không hỗ trợ; cấu hình MVCP | Trung | Thấp | Dễ | ⭐⭐⭐ |
| C. Bỏ wrapper animated FlashList | plain FlashList | Thấp | Thấp | Dễ | ⭐⭐ |
| D. React Compiler | auto-memoize toàn app | Trung | Trung | Trung | ⭐⭐ |
| E. GestureHandlerRootView | bọc root | Thấp | Thấp | Dễ | Gián tiếp |

## 9. Recommendation

- **Pha 1 = A + B + C + D** → fix trực tiếp cả 2 triệu chứng, ít rủi ro, dễ rollback. **Confidence: High.**
- **Pha 2 = React Compiler + GestureHandlerRootView** → tách riêng vì cần rebuild native + verify. **Confidence: Medium.**

## 10. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Bỏ `key` làm animation không "reset" khi đổi type | Đổi type trông hơi khác | Chấp nhận; hoặc trigger 1 layout nhẹ khi đổi type |
| Tắt MVCP nhưng vẫn còn double-rAF scroll cũ | Vị trí scroll sai lệch | Rà lại `scrollListToTop` sau khi tắt MVCP |
| React Compiler (Pha 2) phá pattern | Build/runtime lỗi | Bật riêng, typecheck + test trên device |

## 11. Handoff To Planning

- **Recommended direction:** thực hiện Pha 1 (A+B+C+D), MVCP disabled (luôn scroll về đầu khi insert).
- **First target:** `packages/ui/src/components/AnimatedList/` (lib) + `apps/example/app/components/AnimatedList.tsx` (demo).
- **Suggested first task:** bỏ `type` khỏi `key` + chuyển animation config sang runtime swap.
- **Blocking questions:** Không (đã chốt scope Pha 1 + hành vi insert).
- **Suggested next skill:** `planning` → `execution`.
