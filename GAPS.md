# RNUI — Project Gaps & TODO

> Scanned: 2026-03-20 | By: Nobita (AI assistant)

---

## 🚨 Critical

### 1. Packages chưa publish lên npm
- `@truongdq01/tokens` — NOT PUBLISHED
- `@truongdq01/headless` — NOT PUBLISHED
- `@truongdq01/ui` — NOT PUBLISHED

Landing page quảng cáo `bun add @truongdq01/ui` nhưng package chưa tồn tại trên npm.

**Fix:**
1. Tạo NPM account + API token
2. Add `NPM_TOKEN` vào GitHub repo secrets
3. Tạo changeset: `bun changeset`
4. Merge vào `main` để trigger release job

---

### 2. CI không chạy trên branch `master`
CI config chỉ trigger `main` và `dev` — default branch là `master` → mọi push vào master không được kiểm tra.

**File:** `.github/workflows/ci.yml`

```yaml
# Sửa từ:
on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main]

# Thành:
on:
  push:
    branches: [master, main, dev]
  pull_request:
    branches: [master, main]
```

---

## ⚠️ Major

### 3. 49/62 components thiếu dedicated token functions

Chỉ 13 components có token function trong `@truongdq01/tokens`:
`Button, Input, Card, Badge, Toast, Avatar, Checkbox, Switch, Radio, Slider, Chip, Fab, Dialog`

**49 components thiếu tokens:**
Accordion, Alert, AnimatedList, AppBar, Autocomplete, BottomNavigation,
BottomSheet, Box, Breadcrumbs, ButtonGroup, Carousel, CircularProgress,
DatePicker, Divider, Drawer, EmptyState, FormControl, FormField, Grid,
Icon, Image, ImageList, LinearProgress, Link, List, Menu, Modal, OTPInput,
Pagination, Paper, Popover, Popper, Pressable, Rating, SegmentedControl,
Select, Skeleton, Snackbar, SpeedDial, Stack, Stepper, Table, Tabs,
TextArea, TextField, Timeline, ToggleButton, Tooltip, Typography

**Fix:** Thêm token functions vào `packages/tokens/src/component.ts` cho từng component.

---

### 4. Headless hooks coverage thấp (19/62 components)

Hooks hiện có:
`useAutocomplete, useBottomSheet, useCheckbox, useDisclosure, useField,
useIconStyle, useListItem, useMemoStyles, usePagination, usePressable,
useRadioGroup, useRating, useScrollHeader, useSelect, useSlider,
useSwitch, useTabs, useToast, useToggleGroup`

**Components quan trọng thiếu hook:**
- `useAccordion` — expand/collapse, multiple, keyboard nav
- `useModal` / `useDrawer` — focus trap, backdrop, a11y
- `useStepper` — step validation, navigation
- `useDatePicker` — calendar logic, range selection
- `useCarousel` — swipe, index, autoplay
- `useTable` — sort, filter, pagination state
- `useTimeline` — step state
- `useSkeletonLoader` — loading state management

---

### 5. 5 components thiếu documentation

| Component | Expected file |
|---|---|
| AnimatedList | `docs/docs/components/animated-list.md` |
| Carousel | `docs/docs/components/carousel.md` |
| DatePicker | `docs/docs/components/date-picker.md` |
| OTPInput | `docs/docs/components/otp-input.md` |
| SegmentedControl | `docs/docs/components/segmented-control.md` |

---

## 📋 Minor

### 6. Changeset folder trống — no version history
`.changeset/` is empty. Chưa có release nào được tạo.

**Fix:** `bun changeset` → chọn packages → describe changes → commit.

### 7. Docs site không có proper landing page
`docs/src/pages/index.js` chỉ redirect thẳng vào `/docs`.

**Recommended:** Deploy Docusaurus tại `docs.rnui.dev`, landing page tại `rnui.dev`.

### 8. Storybook coverage thấp
~20 story files cho 62 components. Components chưa có stories:
AnimatedList, Carousel, DatePicker, OTPInput, SegmentedControl,
AppBar, BottomNavigation, Breadcrumbs, ButtonGroup, CircularProgress,
Drawer, EmptyState, FormControl, Grid, ImageList, LinearProgress,
Popper, SpeedDial, Stack, Stepper, Table, Timeline, Typography, và nhiều hơn.

---

## ✅ Điểm mạnh hiện tại

- Monorepo structure chuẩn (Bun + Turborepo)
- Token system bài bản: primitive → semantic → component → motion
- CI pipeline đầy đủ: typecheck + build + test + perf regression + release + docs
- Changesets setup cho versioning
- `.agents/skills/` có coding rules React Native rất kỹ
- 62 UI components đã implement
- Storybook + Detox E2E setup sẵn

---

## 🎯 Priority Roadmap

| Priority | Task | Effort |
|---|---|---|
| 🔴 P0 | Fix CI branch trigger (`master`) | ~5 min |
| 🔴 P0 | Publish packages lên npm (setup NPM_TOKEN) | ~30 min |
| 🟡 P1 | Docs cho 5 components thiếu | ~2h |
| 🟡 P1 | Headless hooks: useAccordion, useModal, useDrawer, useStepper | ~1 day |
| 🟡 P1 | Component tokens cho Tabs, Select, Rating, Pagination, Timeline | ~4h |
| 🟢 P2 | Storybook stories cho components còn thiếu | ~1 day |
| 🟢 P2 | Tạo changeset v0.1.0 | ~15 min |
| 🟢 P2 | Docs landing page riêng tại docs.rnui.dev | ~2h |

---

*Last updated: 2026-03-20*
