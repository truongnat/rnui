# Plan — M3: Component Wave 1 (shadcn-core parity)

## 1. Goal & Scope

### Goal

Bộ core components kiểu shadcn trong registry, shared-source, install được cả 2 variants.

### In Scope — items mới (14)

| Item | Ghi chú |
|---|---|
| `input` | TextInput styled; focus ring via `focus:` |
| `label` | Text label cho form controls |
| `textarea` | TextInput multiline |
| `checkbox` | Pressable + lucide Check icon |
| `switch` | Pressable + RN Animated thumb (không reanimated — giữ shared-source) |
| `radio-group` | RadioGroup + RadioGroupItem qua context |
| `select` | Modal-based list (không gesture dep); registryDeps utils+theme |
| `separator` | horizontal/vertical line |
| `skeleton` | RN Animated pulse loop |
| `badge` | View + Text variants |
| `avatar` | Image + fallback initials |
| `alert` | icon + title + description (lucide) |
| `dialog` | Modal confirm dialog; registryDeps button+text |
| `progress` | bar % |

Deps mới trong `init`: `lucide-react-native` + `react-native-svg` (cả 2 variants — iconLibrary đã là lucide).

### Out of Scope / Non-Goals

- Overlay position/portal nâng cao (popover/dropdown neo anchor) — Select dùng Modal bottom-sheet style ở wave 1.
- Gesture/Reanimated-based components (bottom-sheet, toast stack) — wave 2.
- Port tất cả 81 components.

## 2. Authoring rules (đã lập ở M1)

- Literal class strings; tv() slots; semantic tokens only.
- `@/` imports; registryDependencies cho cross-component.
- Không import `@truongdq01/*`.

## 3. Tasks

| ID | Task | Acceptance |
|---|---|---|
| T-301 | Author 14 components trong `registry/shared/ui/` + thêm items vào catalog | Source tồn tại, literal classes, registryDeps đúng |
| T-302 | Thêm `lucide-react-native` + `react-native-svg` vào ENGINE_DEPS của init | init cài được icon deps |
| T-303 | Build registry → kiểm JSON hợp lệ | `bun run registry:build` pass, files có content |
| T-304 | E2E: trong 2 test app, `rnui add <14 items>` → tsc pass → `expo export` pass | Bundle cả 2 variants |
| T-305 | Update EXECUTION.md + docs item list | Docs khớp |

## 4. DoD

- [ ] 14 items build được cho cả 2 variants
- [ ] `rnui add` toàn bộ vào test app: tsc pass, export pass
- [ ] Showcase App.tsx render được tất cả components (compile-level)
- [ ] Không đụng packages/* ngoài cli (ENGINE_DEPS)

## 5. Risks

| Risk | Mitigation |
|---|---|
| Một số class không có trong RN engines (shadow-*, aspect-ratio...) | Chỉ dùng classes RN-supported; nghi ngờ → verify bằng export |
| Select/Dialog Modal styling dark | Semantic tokens + `bg-background`/`border-border` |
| lucide icon dep là native (react-native-svg) | Đã là peer-philosophy của RNUI; thêm vào init deps |

## 6. Handoff

- Ready: Yes — đi tiếp ngay.
