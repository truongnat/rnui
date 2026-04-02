# Phase 3: Performance & edge cases — Context

**Gathered:** 2026-04-02  
**Status:** Ready for planning

<domain>

## Phase Boundary

Phase 3 xử lý **edge case và an toàn hiển thị** cho **Carousel**, **Skeleton**, và (theo goal roadmap + audit) **Switch** — trong phạm vi `PERF-01`, `PERF-02` và bảng success criteria Phase 3 trong `ROADMAP.md`:

- **PERF-01 (Carousel):** Không render children `undefined`/invalid khi `data=[]`; **key ổn định** trong loop mode (không dùng `key={index}` thuần nếu gây remount sai); xử lý **loop 1 phần tử**; width/layout không phụ thuộc `Dimensions.get("window")` cố định lúc load module (responsive / orientation).
- **PERF-02 (Skeleton):** Khi `animate={false}` **không** chạy shimmer / `withRepeat`; dọn animation khi tắt animate hoặc unmount (tránh leak / CPU).

**Goal roadmap** còn nhắc **Button** “cứng edge case” — không map trực tiếp PERF-01/02; đưa vào **deferred** trừ khi plan mở rộng có issue cụ thể (vd. chỉ sửa nếu phát hiện bug blocking trong cùng PR).

**Không** làm DS-01 (phase 4), không NumericScore backlog (phase 5).

**Kế thừa:** `useReduceMotionEnabled` / token đã có từ phase 1–2 — phase 3 không bắt buộc đụng trừ khi Skeleton/Carousel cần tắt motion theo OS (optional, deferred).

</domain>

<decisions>

## Implementation Decisions

### Carousel (`packages/ui` + `packages/headless`)

- **D-30:** **`data.length === 0`:** Không map `displayData` ra slide `undefined`. Lựa chọn (planner chốt một): (a) return `null` / empty container có chiều cao 0 hoặc placeholder token; (b) early return trong `Carousel` trước `useCarousel` nếu hook không chịu `n=0` — **phải** đảm bảo `useCarousel` không chia cho 0 / không `scrollTo` khi `n=0`.
- **D-31:** **Loop + 1 item:** `useCarousel` hiện `if (!loop || n < 2) return data` — document và test rõ hành vi khi `loop && n===1` (không clone, không jump clone); pagination/dot phải nhất quán.
- **D-32:** **Keys:** Thay `key={index}` trên slide bằng key ổn định theo item: thêm optional **`keyExtractor?: (item: T, index: number) => string`** (default: fallback `String(index)` chỉ khi không có id). Với loop clones, dùng suffix `-clone-start` / `-clone-end` hoặc index offset cố định để key unique và stable across updates.
- **D-33:** **Width:** Thay `const SCREEN_WIDTH = Dimensions.get("window")` ở module scope trong `Carousel.tsx` / `useCarousel.ts` bằng **`useWindowDimensions()`** (hoặc hook tương đương) để `itemWidth` mặc định và `paddingHorizontal` đúng sau rotate — giữ prop `itemWidth` override.

### Skeleton (`packages/ui`)

- **D-34:** Khi `animate` chuyển `true` → `false`: **`cancelAnimation(shimmer)`** (Reanimated) hoặc reset `shimmer.value` và **không** apply `animatedStyle` opacity interpolate khi `!animate` (đã gần đúng — cần **dừng** repeat, không chỉ ngừng style).
- **D-35:** `useEffect` cleanup trên unmount: `cancelAnimation` + clear nếu có interval (Skeleton hiện chỉ `withRepeat`).
- **D-36 (optional / deferred):** Shared shimmer context — **không** bắt buộc cho PERF-02; chỉ làm nếu plan còn budget (audit § “shared shimmer”).

### Switch (stretch — goal roadmap, không nằm success criteria tối thiểu)

- **D-37:** `thumbTravel = Math.max(0, tTrack.width - tThumb.width - tTrack.padding * 2)` để không `translateX` âm khi token lệch.

### Claude's Discretion

- Có thể gộp **một** plan wave cho UI + **một** cho headless `useCarousel` nếu cùng PR; hoặc tách nếu diff lớn.
- **Button** edge: chỉ thêm task nếu có bug tái hiện được từ audit (QUAL-03 đã phase 1 — không lặp).

</decisions>

<specifics>

## Specific Ideas

- `AUDIT_REPORT.md` §2.4–2.7, §4.3–4.5, §4.7 — Carousel keys, empty data, single-item loop, `SCREEN_WIDTH`; Skeleton shimmer cleanup; Switch thumb travel.
- `packages/headless/src/hooks/useCarousel.ts` — `displayData`, `n`, loop branches.
- `packages/ui/src/components/Carousel/Carousel.tsx` — `renderItem`, `key={index}`.
- `packages/ui/src/components/Skeleton/Skeleton.tsx` — `withRepeat`, `animate`.

</specifics>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Planning / requirements

- `.planning/ROADMAP.md` — Phase 3 goal & success criteria
- `.planning/REQUIREMENTS.md` — PERF-01, PERF-02
- `AUDIT_REPORT.md` — Carousel / Skeleton / Switch findings

### Code

- `packages/headless/src/hooks/useCarousel.ts`
- `packages/headless/src/hooks/__tests__/useCarousel.test.tsx`
- `packages/ui/src/components/Carousel/Carousel.tsx`
- `packages/ui/src/components/Carousel/__tests__/Carousel.test.tsx`
- `packages/ui/src/components/Skeleton/Skeleton.tsx`
- `packages/ui/src/components/Skeleton/__tests__/Skeleton.test.tsx`
- `packages/ui/src/components/Switch/Switch.tsx`

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- `useCarousel` trả `displayData`, `snapToOffsets`, `scrollX`, `itemStep`, `n`.
- `Skeleton` dùng `useSharedValue` + `withRepeat` trong `useEffect` phụ thuộc `animate`.

### Gaps (cần plan đóng)

- Empty `data`: chưa guard rõ ở UI/hook.
- Skeleton: `animate=false` không hủy repeat đang chạy từ lần `animate=true` trước đó.
- Carousel keys và Dimensions tại module scope.

### Integration Points

- Export public không đổi trừ khi thêm `keyExtractor` / props mới — ghi trong plan (semver minor nếu API mới).

</code_context>

<deferred>

## Deferred Ideas

- **Shared shimmer provider** cho list lớn (audit “industry standard”) — sau PERF-02.
- **Carousel `useAnimatedScrollHandler`** thay plain `onScroll` — chỉ nếu đo được vấn đề bridge; không mặc định mở scope.
- **Button** edge cases riêng — không trong PERF-01/02.
- **React.memo** toàn bộ Skeleton presets — audit gợi ý; có thể wave 2 hoặc phase khác.

</deferred>

---

*Phase: 03-performance-edge-cases*
