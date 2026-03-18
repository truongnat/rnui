# MUI Material UI — Component Reference

> `@mui/material` v7 · 40+ components · React component library implementing Google's Material Design

---

## Table of Contents

- [Inputs](#inputs)
  - [Button](#button)
  - [ButtonGroup](#buttongroup)
  - [Fab (Floating Action Button)](#fab-floating-action-button)
  - [TextField](#textfield)
  - [Select](#select)
  - [Autocomplete](#autocomplete)
  - [Checkbox](#checkbox)
  - [Radio / RadioGroup](#radio--radiogroup)
  - [Switch](#switch)
  - [Slider](#slider)
  - [Rating](#rating)
  - [ToggleButton / ToggleButtonGroup](#togglebutton--togglebuttongroup)
- [Layout](#layout)
  - [Box](#box)
  - [Grid](#grid)
  - [Stack](#stack)
- [Navigation](#navigation)
  - [AppBar](#appbar)
  - [Tabs](#tabs)
  - [Drawer](#drawer)
  - [Menu](#menu)
  - [Stepper](#stepper)
  - [Pagination](#pagination)
  - [BottomNavigation](#bottomnavigation)
  - [Breadcrumbs](#breadcrumbs)
  - [SpeedDial](#speeddial)
  - [Link](#link)
- [Surfaces](#surfaces)
  - [Paper](#paper)
  - [Card](#card)
  - [Accordion](#accordion)
- [Data Display](#data-display)
  - [Typography](#typography)
  - [Table](#table)
  - [List](#list)
  - [Chip](#chip)
  - [Avatar](#avatar)
  - [Badge](#badge)
  - [Tooltip](#tooltip)
  - [Divider](#divider)
  - [ImageList](#imagelist)
  - [Timeline](#timeline)
  - [Icon / SvgIcon](#icon--svgicon)
- [Feedback](#feedback)
  - [Alert](#alert)
  - [Dialog](#dialog)
  - [Snackbar](#snackbar)
  - [CircularProgress](#circularprogress)
  - [LinearProgress](#linearprogress)
  - [Skeleton](#skeleton)
- [Utils](#utils)
  - [Modal](#modal)
  - [Popover](#popover)
  - [Popper](#popper)
  - [FormControl / FormGroup](#formcontrol--formgroup)

---

## Inputs

### Button

**Mô tả:** Triggers actions. Core interactive element.  
**Docs:** https://mui.com/material-ui/react-button/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| `text` _(default)_ | `variant="text"` | No background, subtle hover — dùng cho low-priority actions |
| `contained` | `variant="contained"` | Filled background — dùng cho primary CTA |
| `outlined` | `variant="outlined"` | Bordered, transparent bg — dùng cho secondary actions |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `variant` | `"text" \| "contained" \| "outlined"` | Visual style |
| `color` | `"inherit" \| "primary" \| "secondary" \| "success" \| "error" \| "info" \| "warning"` | Color theme |
| `size` | `"small" \| "medium" \| "large"` | Button size |
| `disabled` | `bool` | Disable interaction |
| `startIcon` / `endIcon` | `node` | Icon before/after label |
| `fullWidth` | `bool` | Stretch to container width |
| `href` | `string` | Renders as `<a>` link |
| `loading` | `bool` | Loading state (v7+) |
| `loadingIndicator` | `node` | Custom loader element |
| `loadingPosition` | `"start" \| "end" \| "center"` | Loader placement |
| `disableElevation` | `bool` | Remove shadow (contained variant) |
| `disableRipple` | `bool` | Remove ripple effect |
| `component` | `elementType` | Polymorphic root element |

> **Note:** For icon-only buttons, use `IconButton` instead.

---

### ButtonGroup

**Mô tả:** Groups related buttons together visually.  
**Docs:** https://mui.com/material-ui/react-button-group/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| `outlined` _(default)_ | `variant="outlined"` | Bordered grouped buttons |
| `contained` | `variant="contained"` | Filled grouped buttons |
| `text` | `variant="text"` | Text grouped buttons |
| Vertical | `orientation="vertical"` | Stacked vertical group |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `variant` | `"text" \| "contained" \| "outlined"` | Button style cho tất cả |
| `color` | `string` | Color cho tất cả buttons |
| `size` | `"small" \| "medium" \| "large"` | Size cho tất cả |
| `orientation` | `"horizontal" \| "vertical"` | Direction |
| `disabled` | `bool` | Disable all buttons |
| `disableElevation` | `bool` | Remove shadow |
| `fullWidth` | `bool` | Stretch group |

---

### Fab (Floating Action Button)

**Mô tả:** Primary action button that floats above content.  
**Docs:** https://mui.com/material-ui/react-floating-action-button/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| `circular` _(default)_ | `variant="circular"` | Round FAB |
| `extended` | `variant="extended"` | Pill shape with text label |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `variant` | `"circular" \| "extended"` | Shape variant |
| `color` | `"default" \| "inherit" \| "primary" \| "secondary" \| ...` | Color |
| `size` | `"small" \| "medium" \| "large"` | FAB size |
| `disabled` | `bool` | Disable |
| `href` | `string` | Render as anchor link |

---

### TextField

**Mô tả:** Full-featured text input với floating label và helper text.  
**Docs:** https://mui.com/material-ui/react-text-field/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| `outlined` _(default)_ | `variant="outlined"` | Bordered input box |
| `filled` | `variant="filled"` | Shaded background input |
| `standard` | `variant="standard"` | Underline-only input |
| Multiline | `multiline` | Textarea mode |
| Select | `select` | Renders `<Select>` inside TextField |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `variant` | `"filled" \| "outlined" \| "standard"` | Visual style |
| `label` | `string` | Floating label text |
| `value` / `defaultValue` | `string` | Controlled / uncontrolled |
| `onChange` | `func` | Change callback |
| `type` | `string` | Input type: `text`, `email`, `password`, `number`... |
| `multiline` | `bool` | Textarea mode |
| `rows` / `maxRows` / `minRows` | `number` | Row count control |
| `placeholder` | `string` | Placeholder text |
| `helperText` | `node` | Below-input helper hoặc error text |
| `error` | `bool` | Error state (đỏ viền + helperText) |
| `required` | `bool` | Required indicator (`*`) |
| `disabled` | `bool` | Disable input |
| `fullWidth` | `bool` | Full container width |
| `size` | `"medium" \| "small"` | Input size |
| `color` | `string` | Focus ring color |
| `InputProps` | `object` | `startAdornment`, `endAdornment` |
| `InputLabelProps` | `object` | `shrink`, etc. |
| `FormHelperTextProps` | `object` | Helper text props |
| `autoFocus` | `bool` | Auto-focus on mount |
| `autoComplete` | `string` | Browser autocomplete hint |
| `select` | `bool` | Renders Select component inside |

---

### Select

**Mô tả:** Dropdown selection input.  
**Docs:** https://mui.com/material-ui/react-select/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| `outlined` _(default)_ | `variant="outlined"` | Bordered dropdown |
| `filled` | `variant="filled"` | Shaded background dropdown |
| `standard` | `variant="standard"` | Underline-only dropdown |
| Multiple | `multiple` | Multi-select mode |
| Native | `native` | Browser `<select>` element |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `value` / `defaultValue` | `any` | Controlled / uncontrolled |
| `multiple` | `bool` | Multi-select |
| `native` | `bool` | Use HTML native select |
| `variant` | `"filled" \| "outlined" \| "standard"` | Input style |
| `label` | `string` | Floating label |
| `onChange` | `func` | Change callback `(event) => {}` |
| `open` / `onOpen` / `onClose` | `bool/func` | Dropdown control |
| `renderValue` | `func` | Custom value display |
| `displayEmpty` | `bool` | Show empty placeholder option |
| `MenuProps` | `object` | Dropdown menu props |
| `autoWidth` | `bool` | Min-width equals anchor |

> **Note:** Cần wrap trong `FormControl` để label float đúng cách.

---

### Autocomplete

**Mô tả:** Text input kết hợp autocomplete/suggestions dropdown.  
**Docs:** https://mui.com/material-ui/react-autocomplete/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Combo box | `options={array}` | Single-value suggestion list |
| Multiple | `multiple` | Multi-value với chips |
| Free solo | `freeSolo` | Cho phép nhập giá trị tùy ý |
| Grouped | `groupBy={fn}` | Nhóm options theo category |
| Virtualized | `ListboxComponent` | Dành cho danh sách lớn (react-window) |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `options` | `array` | Danh sách suggestions |
| `value` / `defaultValue` | `any` | Controlled / uncontrolled |
| `multiple` | `bool` | Multi-select mode |
| `freeSolo` | `bool` | Cho phép arbitrary input |
| `loading` | `bool` | Show loading spinner |
| `getOptionLabel` | `func` | Extractor lấy label từ option |
| `isOptionEqualToValue` | `func` | Value equality check |
| `filterOptions` | `func` | Custom filter logic |
| `renderOption` | `func` | Custom option render |
| `renderTags` | `func` | Custom chip render (multiple) |
| `groupBy` | `func` | Group options by field |
| `open` / `onOpen` / `onClose` | `bool/func` | Dropdown control |
| `inputValue` / `onInputChange` | `string/func` | Input text control |
| `onChange` | `func` | Value change callback |
| `disableCloseOnSelect` | `bool` | Keep open after select |

> **Note:** Luôn cần `renderInput` prop (thường dùng `TextField`). Có built-in clear & open buttons.

---

### Checkbox

**Mô tả:** Selection control cho multiple values.  
**Docs:** https://mui.com/material-ui/react-checkbox/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Standard checkbox |
| Indeterminate | `indeterminate` | Trạng thái partially selected |
| With label | `<FormControlLabel>` | Label qua FormControlLabel wrapper |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `checked` / `defaultChecked` | `bool` | Controlled / uncontrolled |
| `indeterminate` | `bool` | Hiển thị dash (partial state) |
| `color` | `"default" \| "primary" \| "secondary" \| "error" \| "info" \| "success" \| "warning"` | Color |
| `size` | `"small" \| "medium" \| "large"` | Checkbox size |
| `disabled` | `bool` | Disable |
| `icon` / `checkedIcon` | `node` | Custom icons |
| `onChange` | `func` | Change callback |
| `required` | `bool` | Mark as required |

> **Note:** Wrap với `FormControlLabel` để có accessible label. Dùng `FormGroup` để nhóm nhiều checkboxes.

---

### Radio / RadioGroup

**Mô tả:** Single-selection từ một tập options.  
**Docs:** https://mui.com/material-ui/react-radio-button/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Standalone radio button |
| RadioGroup | `<RadioGroup>` | Managed group với shared value |
| Row | `row` | Horizontal layout |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `value` | `any` | Group selected value (RadioGroup) |
| `defaultValue` | `any` | Default selected value |
| `onChange` | `func` | Change callback |
| `row` | `bool` | Horizontal layout |
| `name` | `string` | Form field name |
| `color` | `string` | Radio color |
| `size` | `"small" \| "medium"` | Radio size |
| `disabled` | `bool` | Disable |

---

### Switch

**Mô tả:** Toggle control cho binary on/off state.  
**Docs:** https://mui.com/material-ui/react-switch/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Standard toggle switch |
| With label | `<FormControlLabel>` | Label qua FormControlLabel |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `checked` / `defaultChecked` | `bool` | Controlled / uncontrolled |
| `color` | `"default" \| "primary" \| "secondary" \| ...` | Color |
| `size` | `"small" \| "medium"` | Switch size |
| `disabled` | `bool` | Disable |
| `edge` | `"end" \| "start" \| false` | Negative margin side |
| `onChange` | `func` | Change callback |
| `inputProps` | `object` | Props cho input element |

---

### Slider

**Mô tả:** Range input với draggable thumb(s).  
**Docs:** https://mui.com/material-ui/react-slider/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Continuous | — | Smooth sliding |
| Discrete | `step={n}` + `marks` | Snaps to steps với marks |
| Range | `value={[min, max]}` | Two-thumb range selector |
| Vertical | `orientation="vertical"` | Vertical slider |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `value` / `defaultValue` | `number \| [number, number]` | Controlled value |
| `min` / `max` | `number` | Value range bounds |
| `step` | `number \| null` | Increment step |
| `marks` | `bool \| array` | Step marks / custom marks |
| `orientation` | `"horizontal" \| "vertical"` | Layout direction |
| `color` | `"primary" \| "secondary"` | Color |
| `size` | `"small" \| "medium"` | Track size |
| `track` | `"inverted" \| "normal" \| false` | Track fill style |
| `disabled` | `bool` | Disable slider |
| `onChange` | `func` | Live change callback |
| `onChangeCommitted` | `func` | Final change (mouse up) |
| `valueLabelDisplay` | `"auto" \| "off" \| "on"` | Tooltip behavior |
| `valueLabelFormat` | `func \| string` | Format tooltip value |
| `scale` | `func` | Custom value scaling |
| `getAriaLabel` | `func` | Accessibility label |

---

### Rating

**Mô tả:** Star rating input.  
**Docs:** https://mui.com/material-ui/react-rating/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | 5-star interactive rating |
| Read only | `readOnly` | Display-only, không interact |
| Half precision | `precision={0.5}` | Half-star increment |
| Custom icon | `icon` / `emptyIcon` | Custom icon components |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `value` / `defaultValue` | `number` | Controlled / uncontrolled |
| `max` | `number` | Max stars (default: 5) |
| `precision` | `number` | Increment step (0.5, 1) |
| `readOnly` | `bool` | No interaction |
| `disabled` | `bool` | Grayed out |
| `size` | `"small" \| "medium" \| "large"` | Star size |
| `icon` / `emptyIcon` | `node` | Custom icons |
| `onChange` | `func` | Value change callback |
| `getLabelText` | `func` | Aria label cho mỗi value |
| `highlightSelectedOnly` | `bool` | Chỉ selected star được highlight |

---

### ToggleButton / ToggleButtonGroup

**Mô tả:** Exclusive hoặc multi-select pressable button group.  
**Docs:** https://mui.com/material-ui/react-toggle-button/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Exclusive | `exclusive` | Chỉ một item active tại một thời điểm |
| Multiple | — | Nhiều item được chọn đồng thời |
| Vertical | `orientation="vertical"` | Vertical layout |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `value` | `any` | Active value(s) |
| `exclusive` | `bool` | Single selection only |
| `onChange` | `func` | Change callback |
| `color` | `"standard" \| "primary" \| "secondary" \| "error" \| "info" \| "success" \| "warning"` | Active color |
| `size` | `"small" \| "medium" \| "large"` | Button size |
| `orientation` | `"horizontal" \| "vertical"` | Layout direction |
| `fullWidth` | `bool` | Full width |
| `disabled` | `bool` | Disable all |
| `enforceValueSet` | `bool` | Ngăn deselect khi exclusive |

---

## Layout

### Box

**Mô tả:** Generic container (`<div>`) với `sx` / system props.  
**Docs:** https://mui.com/material-ui/react-box/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Renders as `<div>` |
| Polymorphic | `component="span"` | Render as bất kỳ HTML element |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `sx` | `object \| func` | CSS-in-JS với theme access |
| `component` | `elementType` | Root element override |

> **Note:** Building block chính cho custom layouts. Hỗ trợ tất cả MUI system props (`m`, `p`, `display`, `flexDirection`, v.v.).

---

### Grid

**Mô tả:** Responsive 12-column flex grid system.  
**Docs:** https://mui.com/material-ui/react-grid/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Container | `container` | Flex grid wrapper |
| v2 Item | `size={n}` | Column span — API mới (v5.9+) |
| Auto | `size="auto"` | Fit content width |
| Grow | `size="grow"` | Fill remaining space |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `container` | `bool` | Define as grid container |
| `size` | `number \| "auto" \| "grow"` | Column span (Grid v2 API) |
| `spacing` | `number \| string \| object` | Gap giữa các items |
| `columns` | `number` | Total column count (default: 12) |
| `direction` | `"row" \| "column" \| "row-reverse" \| "column-reverse"` | Flex direction |
| `rowSpacing` / `columnSpacing` | `number` | Per-axis gaps |
| `offset` | `number` | Column offset (v2) |
| `wrap` | `"nowrap" \| "wrap" \| "wrap-reverse"` | Flex wrap |

> **Note:** Grid v2 thay thế pattern `item` + `xs/sm/md/lg/xl` props cũ. Breakpoint props (`xs`, `sm`...) vẫn hoạt động trong Grid v1.

---

### Stack

**Mô tả:** 1D flex layout để spacing children theo hàng hoặc cột.  
**Docs:** https://mui.com/material-ui/react-stack/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Column _(default)_ | `direction="column"` | Vertical stack |
| Row | `direction="row"` | Horizontal stack |
| With divider | `divider={<Divider/>}` | Divider between each item |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `direction` | `"column" \| "column-reverse" \| "row" \| "row-reverse"` | Flex direction |
| `spacing` | `number \| string \| object` | Gap giữa items |
| `divider` | `node` | Divider element giữa items |
| `useFlexGap` | `bool` | Dùng CSS flex gap (v5.10+) |
| `alignItems` / `justifyContent` | `string` | Flex alignment |
| `flexWrap` | `string` | Wrap behavior |
| `component` | `elementType` | Root element |

---

## Navigation

### AppBar

**Mô tả:** Top-level navigation / toolbar container.  
**Docs:** https://mui.com/material-ui/react-app-bar/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Elevation _(default)_ | `variant="elevation"` | Has box-shadow |
| Outlined | `variant="outlined"` | Border thay vì shadow |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `color` | `"default" \| "inherit" \| "primary" \| "secondary" \| "transparent"` | Color scheme |
| `position` | `"absolute" \| "fixed" \| "relative" \| "static" \| "sticky"` | CSS position |
| `elevation` | `number (0–24)` | Shadow depth |
| `variant` | `"elevation" \| "outlined"` | Visual style |
| `enableColorOnDark` | `bool` | Giữ color trong dark mode |

**Sub-components:** `Toolbar`

> **Note:** Thường chứa `Toolbar` > `IconButton` + `Typography` + `Button`.

---

### Tabs

**Mô tả:** Tab navigation để switch giữa các views.  
**Docs:** https://mui.com/material-ui/react-tabs/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Standard _(default)_ | — | Auto-width tabs |
| Scrollable | `variant="scrollable"` | Horizontal scroll + scroll buttons |
| Full width | `variant="fullWidth"` | Tabs fill container width |
| Centered | `centered` | Center-aligned tabs |
| Vertical | `orientation="vertical"` | Vertical sidebar tabs |
| Icon only | `icon={}` | Icon-only tabs |
| Icon + label | `iconPosition="start"` | Icon bên cạnh label |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `value` | `any` | Active tab value |
| `onChange` | `func` | Tab change callback |
| `variant` | `"fullWidth" \| "scrollable" \| "standard"` | Layout mode |
| `centered` | `bool` | Center tabs |
| `orientation` | `"horizontal" \| "vertical"` | Tab direction |
| `scrollButtons` | `"auto" \| true \| false` | Show scroll arrows |
| `allowScrollButtonsMobile` | `bool` | Scroll buttons trên mobile |
| `indicatorColor` | `"primary" \| "secondary"` | Active indicator color |
| `textColor` | `"inherit" \| "primary" \| "secondary"` | Label color |
| `TabIndicatorProps` | `object` | Indicator styling |

**Sub-components:** `Tab`, `TabPanel`, `TabContext`, `TabList`

---

### Drawer

**Mô tả:** Side panel trượt vào/ra khỏi view.  
**Docs:** https://mui.com/material-ui/react-drawer/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Temporary | `variant="temporary"` | Overlay drawer, đóng khi click outside |
| Persistent | `variant="persistent"` | Toggleable, đẩy content sang bên |
| Permanent | `variant="permanent"` | Luôn hiển thị (sidebar) |
| Mini variant | — | Collapsed icon-only sidebar pattern |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `open` | `bool` | Control visibility |
| `variant` | `"permanent" \| "persistent" \| "temporary"` | Drawer type |
| `anchor` | `"bottom" \| "left" \| "right" \| "top"` | Edge đính vào |
| `onClose` | `func` | Close callback (temporary) |
| `ModalProps` | `object` | Props cho Modal wrapper |
| `PaperProps` | `object` | Props cho inner Paper |
| `elevation` | `number` | Paper elevation |
| `keepMounted` | `bool` | Keep in DOM khi đóng |

---

### Menu

**Mô tả:** Contextual dropdown menu.  
**Docs:** https://mui.com/material-ui/react-menu/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Dropdown từ anchor element |
| Dense | `MenuListProps={{ dense: true }}` | Compact menu items |
| Selected | `selected` trên `MenuItem` | Highlight active item |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `open` | `bool` | Show/hide menu |
| `anchorEl` | `element` | Anchor DOM element |
| `onClose` | `func` | Close callback |
| `anchorOrigin` | `object` | Anchor origin point |
| `transformOrigin` | `object` | Menu transform origin |
| `keepMounted` | `bool` | Keep in DOM |
| `PaperProps` | `object` | Paper styling |
| `disableAutoFocusItem` | `bool` | Không auto-focus item đầu |

**Sub-components:** `MenuItem`, `MenuList`

---

### Stepper

**Mô tả:** Multi-step progress indicator.  
**Docs:** https://mui.com/material-ui/react-stepper/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Horizontal _(default)_ | `orientation="horizontal"` | Steps ngang phía trên |
| Vertical | `orientation="vertical"` | Steps dọc bên trái |
| Non-linear | `nonLinear` | Random access, bỏ qua bước |
| Alternative label | `alternativeLabel` | Labels đặt dưới icon |
| Mobile | `<MobileStepper>` | Dots hoặc progress bar style |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `activeStep` | `number` | Current step index |
| `orientation` | `"horizontal" \| "vertical"` | Layout direction |
| `alternativeLabel` | `bool` | Labels dưới connector line |
| `nonLinear` | `bool` | Allow any step access |
| `connector` | `element` | Custom connector element |

**Sub-components:** `Step`, `StepLabel`, `StepContent`, `StepButton`, `StepIcon`, `StepConnector`, `MobileStepper`

---

### Pagination

**Mô tả:** Page navigation cho paginated content.  
**Docs:** https://mui.com/material-ui/react-pagination/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Text _(default)_ | `variant="text"` | Text-style page buttons |
| Outlined | `variant="outlined"` | Bordered page buttons |
| Rounded | `shape="rounded"` | Rounded button shape |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `count` | `number` | Tổng số trang |
| `page` / `defaultPage` | `number` | Controlled / uncontrolled |
| `variant` | `"outlined" \| "text"` | Button style |
| `shape` | `"circular" \| "rounded"` | Button shape |
| `size` | `"small" \| "medium" \| "large"` | Component size |
| `color` | `"primary" \| "secondary" \| "standard"` | Active color |
| `siblingCount` | `number` | Pages quanh trang hiện tại |
| `boundaryCount` | `number` | Pages ở đầu/cuối |
| `showFirstButton` / `showLastButton` | `bool` | Show edge nav buttons |
| `hidePrevButton` / `hideNextButton` | `bool` | Hide prev/next buttons |
| `disabled` | `bool` | Disable all |
| `onChange` | `func` | Page change callback |

---

### BottomNavigation

**Mô tả:** Mobile navigation bar ở bottom của màn hình.  
**Docs:** https://mui.com/material-ui/react-bottom-navigation/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| With labels | `showLabels` | Luôn show tất cả labels |
| Without labels | — | Labels chỉ show ở selected item |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `value` | `any` | Active item value |
| `onChange` | `func` | Change callback |
| `showLabels` | `bool` | Show all labels always |

**Sub-components:** `BottomNavigationAction` (props: `label`, `value`, `icon`)

---

### Breadcrumbs

**Mô tả:** Hiển thị path hierarchy cho navigation.  
**Docs:** https://mui.com/material-ui/react-breadcrumbs/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Slash-separated path links |
| Custom separator | `separator={node}` | Custom separator character |
| Collapsed | `maxItems={n}` | Auto-collapse với expander |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `separator` | `node` | Separator element (default: `/`) |
| `maxItems` | `number` | Max items trước khi collapse |
| `itemsBeforeCollapse` | `number` | Items hiện trước `...` |
| `itemsAfterCollapse` | `number` | Items hiện sau `...` |
| `expandText` | `string` | Expand button aria-label |

---

### SpeedDial

**Mô tả:** FAB với expandable action menu.  
**Docs:** https://mui.com/material-ui/react-speed-dial/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Up _(default)_ | `direction="up"` | Actions expand lên trên |
| Down | `direction="down"` | Actions expand xuống |
| Left | `direction="left"` | Actions expand sang trái |
| Right | `direction="right"` | Actions expand sang phải |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `ariaLabel` | `string` | Accessibility label (**required**) |
| `icon` | `node` | Trigger icon |
| `direction` | `"down" \| "left" \| "right" \| "up"` | Action spread direction |
| `open` / `onOpen` / `onClose` | `bool/func` | Controlled open state |
| `hidden` | `bool` | Hide SpeedDial |
| `FabProps` | `object` | Props cho main FAB button |

**Sub-components:** `SpeedDialAction`, `SpeedDialIcon`

---

### Link

**Mô tả:** Accessible hyperlink với MUI styling.  
**Docs:** https://mui.com/material-ui/react-link/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Underlined text link |
| Button style | `component="button"` | Link style, button semantics |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `color` | `string` | Text color |
| `underline` | `"always" \| "hover" \| "none"` | Underline behavior |
| `variant` | `typography variant` | Text style |
| `component` | `elementType` | Root element (`RouterLink`, etc.) |
| `href` | `string` | Link destination |

---

## Surfaces

### Paper

**Mô tả:** Physical paper metaphor với elevation/shadow.  
**Docs:** https://mui.com/material-ui/react-paper/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Elevation _(default)_ | `variant="elevation"` | Box shadow |
| Outlined | `variant="outlined"` | Border, không có shadow |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `variant` | `"elevation" \| "outlined"` | Surface style |
| `elevation` | `number (0–24)` | Shadow depth |
| `square` | `bool` | Remove border-radius |
| `component` | `elementType` | Root element |

> **Note:** Base component cho `Card`, `Dialog`, `Menu`, `Drawer` Paper surfaces.

---

### Card

**Mô tả:** Container cho related content và actions.  
**Docs:** https://mui.com/material-ui/react-card/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Elevation _(default)_ | `variant="elevation"` | Shadow depth card |
| Outlined | `variant="outlined"` | Border, không có shadow |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `variant` | `"elevation" \| "outlined"` | Surface style |
| `elevation` | `number (0–24)` | Shadow intensity |
| `raised` | `bool` | Higher elevation |
| `square` | `bool` | Remove border-radius |

**Sub-components:** `CardHeader`, `CardMedia`, `CardContent`, `CardActions`, `CardActionArea`

> **Note:** `CardActionArea` wrap card để toàn bộ area có thể click.

---

### Accordion

**Mô tả:** Expandable / collapsible content panels.  
**Docs:** https://mui.com/material-ui/react-accordion/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Standard với elevation shadow |
| Outlined | `variant="outlined"` | Flat bordered, không có shadow |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `expanded` | `bool` | Control expanded state |
| `defaultExpanded` | `bool` | Initially expanded |
| `disabled` | `bool` | Disable interaction |
| `disableGutters` | `bool` | Remove padding |
| `square` | `bool` | Remove border-radius |
| `onChange` | `func` | Callback khi change |
| `TransitionComponent` | `elementType` | Custom transition component |

**Sub-components:** `AccordionSummary`, `AccordionDetails`, `AccordionActions`

> **Note:** `AccordionSummary` nhận `expandIcon` prop. `AccordionDetails` chứa body content.

---

## Data Display

### Typography

**Mô tả:** Text rendering với semantic và visual variants.  
**Docs:** https://mui.com/material-ui/react-typography/

#### Variants

| Variant | Prop | Default element | Mô tả |
|---------|------|-----------------|--------|
| `h1` – `h6` | `variant="h1"` | `<h1>` – `<h6>` | Heading levels |
| `subtitle1` | `variant="subtitle1"` | `<h6>` | Primary subtitle |
| `subtitle2` | `variant="subtitle2"` | `<h6>` | Secondary subtitle |
| `body1` _(default)_ | `variant="body1"` | `<p>` | Main body text |
| `body2` | `variant="body2"` | `<p>` | Secondary body text |
| `caption` | `variant="caption"` | `<span>` | Small caption text |
| `button` | `variant="button"` | `<span>` | Button label style |
| `overline` | `variant="overline"` | `<span>` | All-caps label text |
| `inherit` | `variant="inherit"` | `<span>` | Kế thừa parent styles |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `variant` | `string` | Text style |
| `component` | `elementType` | Override HTML element |
| `align` | `"center" \| "inherit" \| "justify" \| "left" \| "right"` | Text alignment |
| `color` | `string` | Text color (theme token hoặc CSS) |
| `gutterBottom` | `bool` | Thêm bottom margin |
| `noWrap` | `bool` | Truncate với ellipsis |
| `paragraph` | `bool` | Render as `<p>` với margin |
| `display` | `"block" \| "initial" \| "inline"` | Display override |

---

### Table

**Mô tả:** HTML table với Material Design styling.  
**Docs:** https://mui.com/material-ui/react-table/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Standard table |
| Dense | `size="small"` | Compact row heights |
| Sticky header | `stickyHeader` | Fixed header khi scroll |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `size` | `"medium" \| "small"` | Row density |
| `stickyHeader` | `bool` | Fix header khi scroll |
| `padding` | `"checkbox" \| "none" \| "normal"` | Cell padding |

**Sub-components:** `TableHead`, `TableBody`, `TableRow`, `TableCell`, `TableFooter`, `TableContainer`, `TablePagination`, `TableSortLabel`

> **Note:** `TablePagination` cho pagination controls. `TableSortLabel` thêm sort icons vào headers.

---

### List

**Mô tả:** Vertical list of items.  
**Docs:** https://mui.com/material-ui/react-list/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Basic list |
| Dense | `dense` | Reduced padding |
| No padding | `disablePadding` | Remove vertical padding |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `dense` | `bool` | Compact variant |
| `disablePadding` | `bool` | Remove list padding |
| `subheader` | `node` | Sticky subheader |
| `component` | `elementType` | Root element |

**Sub-components:** `ListItem`, `ListItemButton`, `ListItemText`, `ListItemIcon`, `ListItemAvatar`, `ListItemSecondaryAction`, `ListSubheader`

> **Note:** `ListItemButton` thay thế `button` prop bị deprecated trên `ListItem`.

---

### Chip

**Mô tả:** Compact element cho tags, filters, hoặc selected options.  
**Docs:** https://mui.com/material-ui/react-chip/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Filled _(default)_ | `variant="filled"` | Solid background |
| Outlined | `variant="outlined"` | Transparent với border |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `label` | `node` | Chip text content |
| `variant` | `"filled" \| "outlined"` | Visual style |
| `color` | `"default" \| "primary" \| "secondary" \| "error" \| "info" \| "success" \| "warning"` | Color |
| `size` | `"small" \| "medium"` | Chip size |
| `avatar` | `element` | Leading avatar |
| `icon` | `element` | Leading icon |
| `deleteIcon` | `element` | Custom delete icon |
| `onDelete` | `func` | Enables delete button |
| `onClick` | `func` | Makes chip clickable |
| `disabled` | `bool` | Disable chip |
| `clickable` | `bool` | Force clickable styles |

---

### Avatar

**Mô tả:** Represents a user/entity với image, initials, hoặc icon.  
**Docs:** https://mui.com/material-ui/react-avatar/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Image | `src="url"` | Photo avatar |
| Letter | `children` | Initials/text avatar |
| Icon | `children={<Icon/>}` | Icon avatar |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `src` | `string` | Image URL |
| `alt` | `string` | Image alt text |
| `variant` | `"circular" \| "rounded" \| "square"` | Shape |
| `imgProps` | `object` | Props cho `<img>` element |
| `sx` | `object` | Custom size & color |

**Sub-components:** `AvatarGroup` — stacks nhiều avatars; dùng `max` prop để giới hạn số hiện ra.

---

### Badge

**Mô tả:** Small status descriptor trên một element khác.  
**Docs:** https://mui.com/material-ui/react-badge/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Standard _(default)_ | `badgeContent={n}` | Number/text badge |
| Dot | `variant="dot"` | Small dot indicator |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `badgeContent` | `node` | Badge label/count |
| `variant` | `"dot" \| "standard"` | Badge shape |
| `color` | `"default" \| "primary" \| "secondary" \| "error" \| "info" \| "success" \| "warning"` | Badge color |
| `max` | `number` | Max count trước khi hiện `+` |
| `invisible` | `bool` | Ẩn badge |
| `showZero` | `bool` | Hiện khi count = 0 |
| `anchorOrigin` | `{ vertical, horizontal }` | Badge position |
| `overlap` | `"circular" \| "rectangular"` | Shape overlap style |

---

### Tooltip

**Mô tả:** Informational hover popup.  
**Docs:** https://mui.com/material-ui/react-tooltip/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Hover tooltip |
| Arrow | `arrow` | With directional arrow |
| Controlled | `open` / `onOpen` / `onClose` | Programmatic control |
| Follow cursor | `followCursor` | Tracks mouse position |
| Rich content | `title={node}` | HTML/component content trong tooltip |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `title` | `node` | Tooltip content |
| `placement` | `string` | 12 positions: `top`, `bottom-start`, `right-end`... |
| `arrow` | `bool` | Show arrow |
| `open` / `onOpen` / `onClose` | `bool/func` | Controlled state |
| `disableHoverListener` | `bool` | No hover trigger |
| `disableFocusListener` | `bool` | No focus trigger |
| `disableTouchListener` | `bool` | No touch trigger |
| `enterDelay` / `leaveDelay` | `number` | Show/hide delays (ms) |
| `enterTouchDelay` / `leaveTouchDelay` | `number` | Touch delays |
| `followCursor` | `bool` | Track cursor position |
| `PopperProps` | `object` | Popper config |
| `disableInteractive` | `bool` | Tooltip không interactive |

> **Note:** Wraps single child element. Child phải accept `ref` và event handlers.

---

### Divider

**Mô tả:** Visual separator giữa các content sections.  
**Docs:** https://mui.com/material-ui/react-divider/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Full width _(default)_ | `variant="fullWidth"` | Full width line |
| Inset | `variant="inset"` | Indented từ bên trái |
| Middle | `variant="middle"` | Inset cả hai phía |
| With text | `children` | Text/chip label trên line |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `variant` | `"fullWidth" \| "inset" \| "middle"` | Inset style |
| `orientation` | `"horizontal" \| "vertical"` | Line direction |
| `flexItem` | `bool` | Stretch trong flex container |
| `textAlign` | `"center" \| "left" \| "right"` | Text position |
| `children` | `node` | Text/chip on divider |

---

### ImageList

**Mô tả:** Responsive grid of images.  
**Docs:** https://mui.com/material-ui/react-image-list/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Standard _(default)_ | `variant="standard"` | Fixed-size cells |
| Woven | `variant="woven"` | Alternating row heights |
| Masonry | `variant="masonry"` | Pinterest-style variable heights |
| Quilted | `variant="quilted"` | Cells span multiple rows/cols |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `variant` | `"masonry" \| "quilted" \| "standard" \| "woven"` | Layout style |
| `cols` | `number` | Column count |
| `gap` | `number` | Gap giữa items |
| `rowHeight` | `number \| "auto"` | Row height |

**Sub-components:** `ImageListItem`, `ImageListItemBar`

---

### Timeline

**Mô tả:** Vertical list of chronological events.  
**Docs:** https://mui.com/material-ui/react-timeline/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Right _(default)_ | `position="right"` | Tất cả content bên phải |
| Left | `position="left"` | Tất cả content bên trái |
| Alternate | `position="alternate"` | Items xen kẽ trái/phải |
| Alternate reverse | `position="alternate-reverse"` | Reverse alternate |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `position` | `"alternate" \| "alternate-reverse" \| "left" \| "right"` | Content alignment |

**Sub-components:** `TimelineItem`, `TimelineSeparator`, `TimelineDot`, `TimelineConnector`, `TimelineContent`, `TimelineOppositeContent`

> **Note:** Thuộc `@mui/lab` package. `TimelineDot` có `filled`/`outlined` variants với `color` prop.

---

### Icon / SvgIcon

**Mô tả:** Render Material icons hoặc custom SVGs.  
**Docs:** https://mui.com/material-ui/icons/

#### Variants

| Variant | Cách dùng | Mô tả |
|---------|-----------|--------|
| Font Icon | `<Icon>star</Icon>` | Dùng Material Icons font |
| SvgIcon | `<SvgIcon><path/></SvgIcon>` | SVG-based icon |
| Pre-built | `<StarIcon/>` từ `@mui/icons-material` | Ready-to-use SVG components |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `color` | `"inherit" \| "action" \| "disabled" \| "primary" \| "secondary" \| "error" \| "info" \| "success" \| "warning"` | Icon color |
| `fontSize` | `"inherit" \| "small" \| "medium" \| "large"` | Icon size |
| `sx` | `object` | Custom size & color |

---

## Feedback

### Alert

**Mô tả:** Short, important messages to attract user's attention.  
**Docs:** https://mui.com/material-ui/react-alert/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Standard _(default)_ | `variant="standard"` | Light tinted background |
| Filled | `variant="filled"` | Solid background color |
| Outlined | `variant="outlined"` | Bordered, transparent bg |

#### Severity Values

| Severity | Màu |
|----------|-----|
| `error` | Đỏ |
| `warning` | Cam |
| `info` | Xanh dương |
| `success` | Xanh lá |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `severity` | `"error" \| "warning" \| "info" \| "success"` | Alert color & icon |
| `variant` | `"filled" \| "outlined" \| "standard"` | Visual style |
| `icon` | `node \| false` | Override hoặc ẩn icon |
| `action` | `node` | Action element (ví dụ: close button) |
| `onClose` | `func` | Enables close icon |
| `color` | `string` | Override alert color |

**Sub-components:** `AlertTitle` — renders bold title bên trong Alert.

---

### Dialog

**Mô tả:** Modal overlay dialog/window.  
**Docs:** https://mui.com/material-ui/react-dialog/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Centered modal dialog |
| Full width | `fullWidth` | Stretches đến maxWidth |
| Full screen | `fullScreen` | Fills toàn bộ viewport |
| Scroll paper | `scroll="paper"` | Content scroll bên trong dialog |
| Scroll body | `scroll="body"` | Page body scroll |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `open` | `bool` | Control visibility |
| `onClose` | `func` | Close callback |
| `maxWidth` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| false` | Max width constraint |
| `fullWidth` | `bool` | Expand to maxWidth |
| `fullScreen` | `bool` | Full viewport |
| `scroll` | `"body" \| "paper"` | Scroll container |
| `disableEscapeKeyDown` | `bool` | Không close khi nhấn Escape |
| `TransitionComponent` | `elementType` | Custom transition |
| `keepMounted` | `bool` | Keep DOM mounted khi đóng |

**Sub-components:** `DialogTitle`, `DialogContent`, `DialogContentText`, `DialogActions`

> **Note:** Accessibility — cần thêm `aria-labelledby` và `aria-describedby`.

---

### Snackbar

**Mô tả:** Brief notification message.  
**Docs:** https://mui.com/material-ui/react-snackbar/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Bottom-left message |
| With action | `action={node}` | Có undo/action button |
| With Alert | `<Alert>` as message | Styled feedback snackbar |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `open` | `bool` | Control visibility |
| `onClose` | `func` | Close callback |
| `message` | `node` | Snackbar text |
| `autoHideDuration` | `number` | Auto-close (ms), `null` = never |
| `action` | `node` | Action button |
| `anchorOrigin` | `{ vertical, horizontal }` | Screen position |
| `resumeHideDuration` | `number` | Delay sau khi focus return |
| `TransitionComponent` | `elementType` | Custom transition |
| `key` | `any` | Force re-render khi message thay đổi |

---

### CircularProgress

**Mô tả:** Circular loading indicator.  
**Docs:** https://mui.com/material-ui/react-progress/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Indeterminate _(default)_ | `variant="indeterminate"` | Continuous spinning animation |
| Determinate | `variant="determinate"` | Hiển thị specific progress value |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `variant` | `"determinate" \| "indeterminate"` | Animation type |
| `value` | `number (0–100)` | Progress value (determinate) |
| `color` | `"inherit" \| "primary" \| "secondary" \| ...` | Color |
| `size` | `number \| string` | Diameter (px) |
| `thickness` | `number` | Circle stroke width |
| `disableShrink` | `bool` | Disable shrink animation |

---

### LinearProgress

**Mô tả:** Horizontal loading/progress bar.  
**Docs:** https://mui.com/material-ui/react-progress/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Indeterminate _(default)_ | `variant="indeterminate"` | Animated continuous bar |
| Determinate | `variant="determinate"` | Specific progress value 0–100 |
| Buffer | `variant="buffer"` | Primary + buffer bar |
| Query | `variant="query"` | Reverse-direction indeterminate |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `variant` | `"buffer" \| "determinate" \| "indeterminate" \| "query"` | Progress type |
| `value` | `number (0–100)` | Progress value (determinate) |
| `valueBuffer` | `number` | Buffer bar value (buffer variant) |
| `color` | `string` | Bar color |

---

### Skeleton

**Mô tả:** Loading placeholder mimics content shape.  
**Docs:** https://mui.com/material-ui/react-skeleton/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Text _(default)_ | `variant="text"` | Text line placeholder |
| Circular | `variant="circular"` | Circle placeholder |
| Rectangular | `variant="rectangular"` | Box placeholder |
| Rounded | `variant="rounded"` | Rounded box placeholder |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `variant` | `"circular" \| "rectangular" \| "rounded" \| "text"` | Shape |
| `animation` | `"pulse" \| "wave" \| false` | Animation style |
| `width` | `number \| string` | Override width |
| `height` | `number \| string` | Override height |

---

## Utils

### Modal

**Mô tả:** Base modal/dialog overlay layer.  
**Docs:** https://mui.com/material-ui/react-modal/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Focus trap với backdrop |
| Without backdrop | `hideBackdrop` | Không có dimmed overlay |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `open` | `bool` | Control visibility |
| `onClose` | `func` | Close callback |
| `keepMounted` | `bool` | Render khi đóng |
| `hideBackdrop` | `bool` | Không có backdrop overlay |
| `disableAutoFocus` | `bool` | Không auto-focus khi mở |
| `disableEscapeKeyDown` | `bool` | Không close khi Escape |
| `BackdropComponent` | `elementType` | Custom backdrop |
| `BackdropProps` | `object` | Backdrop config |

> **Note:** `Dialog` và `Drawer` đều được build trên Modal.

---

### Popover

**Mô tả:** Floating overlay anchored to an element.  
**Docs:** https://mui.com/material-ui/react-popover/

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `open` | `bool` | Show/hide |
| `anchorEl` | `element` | Anchor reference element |
| `onClose` | `func` | Close callback |
| `anchorOrigin` | `object` | Anchor attachment point |
| `transformOrigin` | `object` | Popover origin point |
| `elevation` | `number` | Shadow depth |
| `PaperProps` | `object` | Inner Paper props |
| `marginThreshold` | `number` | Screen edge margin |

---

### Popper

**Mô tả:** Low-level positioning primitive dùng Popper.js.  
**Docs:** https://mui.com/material-ui/react-popper/

#### Variants

| Variant | Prop | Mô tả |
|---------|------|--------|
| Default | — | Basic Popper |
| With transition | `transition` | Animated open/close |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `open` | `bool` | Show/hide |
| `anchorEl` | `element \| func` | Anchor element |
| `placement` | `string` | 12 placement options (`top`, `bottom-start`...) |
| `disablePortal` | `bool` | Render tại vị trí DOM |
| `modifiers` | `array` | Popper.js modifiers |
| `transition` | `bool` | Enable transition |
| `keepMounted` | `bool` | Keep in DOM |

---

### FormControl / FormGroup

**Mô tả:** Wrappers cung cấp context và layout cho form inputs.  
**Docs:** https://mui.com/material-ui/react-text-field/#components

#### Variants

| Variant | Mô tả |
|---------|--------|
| `FormControl` | Context wrapper cho `Select`, `TextField`, v.v. |
| `FormGroup` | Row/column layout cho checkboxes/switches |

#### Key Props

| Prop | Type | Mô tả |
|------|------|--------|
| `error` | `bool` | Error state (propagate tới children) |
| `required` | `bool` | Required indicator |
| `disabled` | `bool` | Disable tất cả children |
| `fullWidth` | `bool` | Full container width |
| `focused` | `bool` | Force focused state |
| `variant` | `"filled" \| "outlined" \| "standard"` | Input variant context |
| `margin` | `"dense" \| "none" \| "normal"` | Vertical spacing |
| `row` | `bool` | Horizontal layout (FormGroup) |

**Sub-components:** `FormLabel`, `FormHelperText`, `FormControlLabel`, `FormGroup`

---

## Quick Reference Cheatsheet

### Variant × Color Matrix (Button ví dụ)

```jsx
// Variants
<Button variant="text">Text</Button>
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>

// Colors
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="success">Success</Button>
<Button color="error">Error</Button>
<Button color="info">Info</Button>
<Button color="warning">Warning</Button>
<Button color="inherit">Inherit</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
```

### TextField Variants

```jsx
<TextField variant="outlined" label="Outlined" />
<TextField variant="filled" label="Filled" />
<TextField variant="standard" label="Standard" />
<TextField multiline rows={4} label="Multiline" />
<TextField error helperText="Error message" label="Error" />
```

### Alert Severity × Variant

```jsx
{['error', 'warning', 'info', 'success'].map(severity =>
  ['standard', 'filled', 'outlined'].map(variant =>
    <Alert key={`${severity}-${variant}`} severity={severity} variant={variant}>
      {severity} / {variant}
    </Alert>
  )
)}
```

### Progress Variants

```jsx
<CircularProgress />                                    {/* indeterminate */}
<CircularProgress variant="determinate" value={75} />  {/* 75% */}
<LinearProgress />                                      {/* indeterminate */}
<LinearProgress variant="determinate" value={60} />    {/* 60% */}
<LinearProgress variant="buffer" value={40} valueBuffer={60} />
<Skeleton variant="text" width={200} />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width={210} height={118} />
```

---

*Tài liệu đầy đủ: https://mui.com/material-ui/getting-started/supported-components/*
