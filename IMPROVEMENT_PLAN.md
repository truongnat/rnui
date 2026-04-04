# RNUI Improvement Plan

> **Based on**: `PACKAGE_REVIEW.md` (2026-04-04)
> **Total tasks**: 17
> **Phases**: P0 Critical / P1 High / P2 Medium / P3 Low-Architecture

---

## Execution Order

```
P0  -->  T-01 (AlertDialog bug + tests)
         |
P1  -->  T-02 (CollapsibleTrigger a11y)
         T-03 (Label htmlFor)
         T-04 (Button style type)
         T-05 (Collapsible event type)
         |
P2  -->  T-06 (inline styles -> StyleSheet)
         T-07 (Button color map refactor)
         T-08 (Collapsible SharedValue sync)
         T-09 (CollapsibleContent useTokens removal)
         T-10 (ScrollArea flex)
         T-11 (AspectRatio documentation)
         T-12 (token color step gaps)
         |
P3  -->  T-13 (useContextSelector pattern)
         T-14 (telegram brand extraction)
         T-15 (dist/ gitignore)
         T-16 (test coverage)
         T-17 (API contract docs)
```

---

## Phase 0 -- Critical Bugs

### T-01 - Fix AlertDialog: actions never rendered

| Field        | Value                                                    |
| ------------ | -------------------------------------------------------- |
| **Package**  | `packages/ui/src/components/AlertDialog/AlertDialog.tsx` |
| **Severity** | CRITICAL                                                 |
| **Risk**     | LOW -- additive fix                                      |
| **Files**    | `AlertDialog.tsx`, `__tests__/AlertDialog.test.tsx`      |

**Root cause**: The `actions` JSX variable (Cancel + Confirm buttons) is built locally but never passed to `<Dialog>`. The Dialog component accepts an `actions` prop (Dialog.tsx:13) and renders it inside a flex-row container (Dialog.tsx:87-90). AlertDialog builds the buttons but discards them.

**Current code** (lines 70-103):

```tsx
const actions = (                          // <- built here
  <View style={{ flexDirection: "row", ... }}>
    {onCancel && <Button ...>{cancelText}</Button>}
    <Button ...>{confirmText}</Button>
  </View>
);

return (
  <Dialog {...dialogProps} title={title}>  // <- actions= NEVER passed
    {description && <View>...</View>}
  </Dialog>
);
```

**Fix**:

1. Pass `actions` as prop to Dialog: `<Dialog {...dialogProps} title={title} actions={actions}>`
2. Remove wrapping `<View style={{ flexDirection: "row" }}>` since Dialog already wraps actions in a flex row (Dialog.tsx:88)
3. Wrap `actions` in `useMemo` to avoid re-creating JSX every render
4. Remove redundant `typeof description === "string"` check (prop is typed as `string | undefined`)
5. Move inline styles to `StyleSheet.create`

**Target implementation**:

```tsx
import React, { useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Dialog, DialogProps } from '../Dialog';
import { Button } from '../Button';

export function AlertDialog({
  title,
  description,
  cancelText = 'Cancel',
  confirmText = 'OK',
  cancelVariant = 'outline',
  confirmVariant,
  onCancel,
  onConfirm,
  destructive = false,
  ...dialogProps
}: AlertDialogProps) {
  const tokens = useTokens();
  const finalConfirmVariant =
    confirmVariant ?? (destructive ? 'destructive' : 'solid');

  const actions = useMemo(
    () => (
      <>
        {onCancel && (
          <Button variant={cancelVariant} onPress={onCancel}>
            {cancelText}
          </Button>
        )}
        <Button variant={finalConfirmVariant} onPress={onConfirm}>
          {confirmText}
        </Button>
      </>
    ),
    [
      cancelText,
      cancelVariant,
      confirmText,
      finalConfirmVariant,
      onCancel,
      onConfirm,
    ]
  );

  return (
    <Dialog {...dialogProps} title={title} actions={actions}>
      {description && (
        <Text
          style={[styles.description, { color: tokens.color.text.secondary }]}
        >
          {description}
        </Text>
      )}
    </Dialog>
  );
}

const styles = StyleSheet.create({
  description: { marginTop: 8 },
});
```

**Test additions** -- current tests never assert buttons exist or handlers fire:

```tsx
it('renders confirm and cancel buttons', () => {
  const { getByText } = renderWithTheme(
    <AlertDialog
      open={true}
      title="T"
      onConfirm={() => {}}
      onCancel={() => {}}
    />
  );
  expect(getByText('OK')).toBeTruthy();
  expect(getByText('Cancel')).toBeTruthy();
});

it('calls onConfirm when confirm pressed', () => {
  const fn = jest.fn();
  const { getByText } = renderWithTheme(
    <AlertDialog open={true} title="T" onConfirm={fn} />
  );
  fireEvent.press(getByText('OK'));
  expect(fn).toHaveBeenCalledTimes(1);
});

it('calls onCancel when cancel pressed', () => {
  const fn = jest.fn();
  const { getByText } = renderWithTheme(
    <AlertDialog open={true} title="T" onConfirm={() => {}} onCancel={fn} />
  );
  fireEvent.press(getByText('Cancel'));
  expect(fn).toHaveBeenCalledTimes(1);
});
```

---

## Phase 1 -- High Priority (Accessibility and Type Safety)

### T-02 - CollapsibleTrigger: add accessibility role and state

| Field        | Value                                                    |
| ------------ | -------------------------------------------------------- |
| **Package**  | `packages/ui/src/components/Collapsible/Collapsible.tsx` |
| **Severity** | HIGH                                                     |
| **Risk**     | LOW -- additive props                                    |
| **Lines**    | 150-162                                                  |

**Root cause**: `<Pressable>` with no `accessibilityRole` or `accessibilityState`. Screen readers see a generic tappable element with no indication of expand/collapse behavior.

**Current**:

```tsx
<Pressable onPress={toggle} style={style} testID={testID}>
  {children}
</Pressable>
```

**Fix** -- read `isOpen` from context, add accessibility metadata:

```tsx
export function CollapsibleTrigger({
  children,
  style,
  testID = 'collapsible-trigger',
}) {
  const { toggle, isOpen } = useCollapsible();
  return (
    <Pressable
      onPress={toggle}
      style={style}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ expanded: isOpen.value }}
    >
      {children}
    </Pressable>
  );
}
```

---

### T-03 - Label: deprecate no-op htmlFor, add nativeID

| Field        | Value                                        |
| ------------ | -------------------------------------------- |
| **Package**  | `packages/ui/src/components/Label/Label.tsx` |
| **Severity** | HIGH                                         |
| **Risk**     | LOW (non-breaking deprecation)               |
| **Lines**    | 8-19, 36-60                                  |

**Root cause**: `htmlFor` is a web HTML concept with no React Native equivalent. The prop is accepted but does nothing -- misleads consumers into thinking label-input association works.

**Fix** (non-breaking -- deprecate + add native alternative):

```tsx
export interface LabelProps {
  children: React.ReactNode;
  /** @deprecated No-op in React Native. Use nativeID + accessibilityLabelledBy instead. */
  htmlFor?: string;
  /** Sets nativeID for native label association via accessibilityLabelledBy */
  nativeID?: string;
  required?: boolean;
  style?: StyleProp<TextStyle>;
  testID?: string;
}

export function Label({
  children,
  nativeID,
  required = false,
  style,
  testID = 'label',
}: LabelProps) {
  const tokens = useTokens();
  return (
    <Text
      nativeID={nativeID}
      style={[
        styles.label,
        { color: tokens.color.text.primary, fontSize: tokens.fontSize.sm },
        style,
      ]}
      accessible
      accessibilityLabel={typeof children === 'string' ? children : undefined}
      testID={testID}
    >
      {children}
      {required && <Text style={{ color: tokens.color.error.text }}> *</Text>}
    </Text>
  );
}
```

---

### T-04 - Button: fix style prop type

| Field        | Value                                          |
| ------------ | ---------------------------------------------- |
| **Package**  | `packages/ui/src/components/Button/Button.tsx` |
| **Severity** | HIGH                                           |
| **Risk**     | LOW -- type-only change                        |
| **Line**     | 82                                             |

**Current**: `style?: object`

**Fix**: `style?: StyleProp<ViewStyle>`

> `StyleProp` and `ViewStyle` are already imported on line 4. Single-line change.

---

### T-05 - Collapsible: fix event any type

| Field        | Value                                                    |
| ------------ | -------------------------------------------------------- |
| **Package**  | `packages/ui/src/components/Collapsible/Collapsible.tsx` |
| **Severity** | HIGH                                                     |
| **Risk**     | LOW -- type-only change                                  |
| **Line**     | 187                                                      |

**Current**: `(event: any) =>`

**Fix**:

```tsx
import type { LayoutChangeEvent } from 'react-native';

const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
  const height = event.nativeEvent.layout.height;
  setMeasuredHeight(height);
}, []);
```

---

## Phase 2 -- Medium Priority (Performance and Code Quality)

### T-06 - Label: move inline styles to useMemo

| Field        | Value                                        |
| ------------ | -------------------------------------------- |
| **Package**  | `packages/ui/src/components/Label/Label.tsx` |
| **Severity** | MEDIUM                                       |
| **Risk**     | LOW                                          |
| **Lines**    | 46-59                                        |

**Root cause**: Inline objects `{ color: ..., fontSize: ... }` and `{ color: tokens.color.error.text }` create new references every render.

**Fix**:

```tsx
const labelStyle = useMemo(
  () => [
    { color: tokens.color.text.primary, fontSize: tokens.fontSize.sm },
    style,
  ],
  [tokens.color.text.primary, tokens.fontSize.sm, style]
);
const asteriskStyle = useMemo(
  () => ({ color: tokens.color.error.text }),
  [tokens.color.error.text]
);
```

---

### T-07 - Button: replace resolvedColor if-else chain with lookup map

| Field        | Value                                          |
| ------------ | ---------------------------------------------- |
| **Package**  | `packages/ui/src/components/Button/Button.tsx` |
| **Severity** | MEDIUM                                         |
| **Risk**     | LOW -- same behavior, different structure      |
| **Lines**    | 154-209                                        |

**Current**: 7-branch `if (color === "...") return {...}` chain (55 lines).

**Fix** -- `Record<ButtonColor, ColorSet>` lookup:

```tsx
const resolvedColor = useMemo(() => {
  const map: Record<
    ButtonColor,
    { main: string; subtle: string; textOn: string }
  > = {
    inherit: {
      main: tokens.color.text.primary,
      subtle: tokens.color.bg.muted,
      textOn: tokens.color.text.inverse,
    },
    secondary: {
      main: tokens.color.text.secondary,
      subtle: tokens.color.bg.muted,
      textOn: tokens.color.text.inverse,
    },
    success: {
      main: tokens.color.success.icon,
      subtle: tokens.color.success.bg,
      textOn: tokens.color.text.inverse,
    },
    warning: {
      main: tokens.color.warning.icon,
      subtle: tokens.color.warning.bg,
      textOn: tokens.color.text.inverse,
    },
    error: {
      main: tokens.color.error.icon,
      subtle: tokens.color.error.bg,
      textOn: tokens.color.text.inverse,
    },
    info: {
      main: tokens.color.info.icon,
      subtle: tokens.color.info.bg,
      textOn: tokens.color.text.inverse,
    },
    accent: {
      main: tokens.color.accent.default,
      subtle: tokens.color.accent.subtle,
      textOn: tokens.color.accent.onAccent,
    },
    primary: {
      main: tokens.color.brand.default,
      subtle: tokens.color.brand.subtle,
      textOn: tokens.color.text.inverse,
    },
  };
  return map[color];
}, [color, tokens]);
```

> Same runtime behavior, 40% fewer lines, compile-time exhaustiveness.

---

### T-08 - Collapsible: fix SharedValue state duplication

| Field        | Value                                                    |
| ------------ | -------------------------------------------------------- |
| **Package**  | `packages/ui/src/components/Collapsible/Collapsible.tsx` |
| **Severity** | MEDIUM                                                   |
| **Risk**     | MEDIUM -- state management change, test thoroughly       |
| **Lines**    | 107-141                                                  |

**Root cause**: Dual state -- React `useState(internalOpen)` and Reanimated `useSharedValue(isOpen)` are kept in sync manually. The toggle callback updates both independently -- a sequencing error could leave them inconsistent.

**Fix** -- React state is single source of truth, SharedValue is a derived mirror:

```tsx
const [internalOpen, setInternalOpen] = useState(defaultOpen);
const currentOpen = isControlled ? controlledOpen! : internalOpen;
const isOpen = useSharedValue(currentOpen);

// Single sync point: React state -> SharedValue
React.useEffect(() => {
  isOpen.value = currentOpen;
}, [currentOpen, isOpen]);

const toggle = useCallback(() => {
  if (disabled) return;
  const next = !currentOpen;
  if (!isControlled) setInternalOpen(next);
  onOpenChange?.(next);
}, [disabled, isControlled, currentOpen, onOpenChange]);
```

---

### T-09 - CollapsibleContent: remove unnecessary useTokens

| Field        | Value                                                    |
| ------------ | -------------------------------------------------------- |
| **Package**  | `packages/ui/src/components/Collapsible/Collapsible.tsx` |
| **Severity** | MEDIUM                                                   |
| **Risk**     | LOW                                                      |
| **Line**     | 177                                                      |

**Root cause**: `useTokens()` is called only for `tokens.spacing[2]` (= 8px constant). Subscribes the animated container to all theme changes for a single spacing value.

**Fix** -- replace with static value:

```tsx
// Remove: const tokens = useTokens();
<View onLayout={handleLayout} style={styles.innerContent}>
  {children}
</View>

// Add to StyleSheet.create:
innerContent: { paddingVertical: 8 },
```

---

### T-10 - ScrollArea: make flex 1 opt-in

| Field        | Value                                                            |
| ------------ | ---------------------------------------------------------------- |
| **Package**  | `packages/ui/src/components/ScrollArea/ScrollArea.tsx`           |
| **Severity** | MEDIUM                                                           |
| **Risk**     | MEDIUM -- behavioral change, existing consumers may rely on flex |
| **Line**     | 79                                                               |

**Root cause**: `styles.container` hardcodes `flex: 1`. In free-flow layouts without a flex parent, the ScrollArea collapses to 0 height silently.

**Current**: `container: { flex: 1 }`

**Fix**: `container: {}` (empty -- let consumer control sizing via style prop)

> Consumers who need flex stretch pass `style={{ flex: 1 }}` explicitly. Document in JSDoc.

---

### T-11 - AspectRatio: document paddingBottom technique and prop precedence

| Field        | Value                                                    |
| ------------ | -------------------------------------------------------- |
| **Package**  | `packages/ui/src/components/AspectRatio/AspectRatio.tsx` |
| **Severity** | MEDIUM                                                   |
| **Risk**     | LOW -- comment + minor logic fix                         |
| **Lines**    | 55-59, 67                                                |

**Fix** -- add explanatory comment and clarify silent override:

```tsx
/**
 * Uses paddingBottom percentage to maintain aspect ratio.
 * In React Native, percentage padding is relative to the element's own width,
 * so paddingBottom: "56.25%" on a full-width element gives 16:9 height.
 *
 * Prop precedence: width/height overrides ratio when both are provided.
 */
const aspectRatio = width != null && height != null ? width / height : ratio;
```

Also change `width && height` to `width != null && height != null` to handle `width={0}` correctly.

---

### T-12 - Tokens: fill sparse color scale gaps

| Field        | Value                                            |
| ------------ | ------------------------------------------------ |
| **Package**  | `packages/tokens/src/primitive.ts`               |
| **Severity** | MEDIUM                                           |
| **Risk**     | LOW -- additive, existing references still valid |
| **Lines**    | 63-84                                            |

**Root cause**: `red`, `green`, `blue` have only 5 steps (50, 400, 500, 600, 900) while all other palettes have 10-12 steps.

**Fix** -- expand to standard 11-step scales (Tailwind CSS v4 values):

```ts
red: {
  50: "#FEF2F2", 100: "#FEE2E2", 200: "#FECACA", 300: "#FCA5A5",
  400: "#F87171", 500: "#EF4444", 600: "#DC2626", 700: "#B91C1C",
  800: "#991B1B", 900: "#7F1D1D", 950: "#450A0A",
},
green: {
  50: "#F0FDF4", 100: "#DCFCE7", 200: "#BBF7D0", 300: "#86EFAC",
  400: "#4ADE80", 500: "#22C55E", 600: "#16A34A", 700: "#15803D",
  800: "#166534", 900: "#14532D", 950: "#052E16",
},
blue: {
  50: "#EFF6FF", 100: "#DBEAFE", 200: "#BFDBFE", 300: "#93C5FD",
  400: "#60A5FA", 500: "#3B82F6", 600: "#2563EB", 700: "#1D4ED8",
  800: "#1E40AF", 900: "#1E3A8A", 950: "#172554",
},
```

---

## Phase 3 -- Low Priority / Architecture

### T-13 - Add useContextSelector pattern to ThemeProvider

| Field        | Value                             |
| ------------ | --------------------------------- |
| **Package**  | `packages/headless/src/`          |
| **Severity** | LOW                               |
| **Risk**     | HIGH -- broad architecture change |

**Root cause**: Any `useTokens()` consumer re-renders on any theme change, even if specific tokens it uses did not change.

**Fix** -- introduce selector hook:

```tsx
export function useTokenSelector<T>(
  selector: (tokens: SemanticTokens) => T
): T {
  const tokens = useTokens();
  return useMemo(() => selector(tokens), [tokens, selector]);
}
```

> Optionally adopt `use-context-selector` library for reference equality. Plan carefully -- this touches every component.

---

### T-14 - Move telegram brand to app layer

| Field        | Value                                          |
| ------------ | ---------------------------------------------- |
| **Package**  | `packages/themes/src/brands/telegram.ts`       |
| **Severity** | LOW                                            |
| **Risk**     | MEDIUM -- removes an exported brand (breaking) |

**Steps**:

1. Move `telegram.ts` to consuming app's theme config
2. Export `createBrand(overrides)` helper from `@truongdq01/themes` for custom brands
3. Keep 6 generic brands in the package

---

### T-15 - Stop tracking dist/ in git

| Field        | Value                  |
| ------------ | ---------------------- |
| **Severity** | LOW                    |
| **Risk**     | LOW -- git config only |

**Steps**:

1. Add `packages/*/dist/` to `.gitignore`
2. Run `git rm --cached -r packages/ui/dist/`
3. Commit: `chore: stop tracking dist/ build artifacts`

---

### T-16 - Strengthen test coverage for new components

| Field        | Value                    |
| ------------ | ------------------------ |
| **Severity** | LOW                      |
| **Risk**     | LOW -- test-only changes |

| Component   | Missing Tests                                               |
| ----------- | ----------------------------------------------------------- |
| AlertDialog | Covered by T-01                                             |
| Collapsible | Toggle visibility, controlled mode, disabled state          |
| Label       | Required asterisk renders, style prop applied, nativeID set |
| AspectRatio | width/height overrides ratio, ratio=0 edge case             |
| ScrollArea  | direction="horizontal" indicator logic, no implicit flex    |

**Collapsible test additions**:

```tsx
it('does not toggle when disabled', () => {
  const fn = jest.fn();
  const { getByTestId } = renderWithTheme(
    <Collapsible disabled onOpenChange={fn}>
      <CollapsibleTrigger testID="trigger">
        <Text>T</Text>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Text>C</Text>
      </CollapsibleContent>
    </Collapsible>
  );
  fireEvent.press(getByTestId('trigger'));
  expect(fn).not.toHaveBeenCalled();
});

it('calls onOpenChange in controlled mode', () => {
  const fn = jest.fn();
  const { getByTestId } = renderWithTheme(
    <Collapsible open={false} onOpenChange={fn}>
      <CollapsibleTrigger testID="trigger">
        <Text>T</Text>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Text>C</Text>
      </CollapsibleContent>
    </Collapsible>
  );
  fireEvent.press(getByTestId('trigger'));
  expect(fn).toHaveBeenCalledWith(true);
});
```

---

### T-17 - Document public API stability

| Field        | Value                     |
| ------------ | ------------------------- |
| **Severity** | LOW                       |
| **Risk**     | LOW -- documentation only |

Add `@experimental` JSDoc tag to:

- `Button.loadingIndicator` -- custom loading nodes, no design guideline
- `Button.feedbackMode` -- implementation detail leaking to API
- `Collapsible.open` / `onOpenChange` -- controlled pattern not yet tested
- `AlertDialog.cancelVariant` / `confirmVariant` -- overrides defeat auto-logic

---

## Files Modified Per Task

| Task | Files                                                                       |
| ---- | --------------------------------------------------------------------------- |
| T-01 | `AlertDialog/AlertDialog.tsx`, `AlertDialog/__tests__/AlertDialog.test.tsx` |
| T-02 | `Collapsible/Collapsible.tsx`                                               |
| T-03 | `Label/Label.tsx`                                                           |
| T-04 | `Button/Button.tsx`                                                         |
| T-05 | `Collapsible/Collapsible.tsx`                                               |
| T-06 | `Label/Label.tsx`                                                           |
| T-07 | `Button/Button.tsx`                                                         |
| T-08 | `Collapsible/Collapsible.tsx`                                               |
| T-09 | `Collapsible/Collapsible.tsx`                                               |
| T-10 | `ScrollArea/ScrollArea.tsx`                                                 |
| T-11 | `AspectRatio/AspectRatio.tsx`                                               |
| T-12 | `packages/tokens/src/primitive.ts`                                          |
| T-13 | `packages/headless/src/` (new file + ThemeProvider)                         |
| T-14 | `packages/themes/src/brands/telegram.ts` -> app layer                       |
| T-15 | `.gitignore`, git rm                                                        |
| T-16 | Multiple `__tests__/*.test.tsx`                                             |
| T-17 | Multiple component JSDoc                                                    |

## Risk Matrix

| Task | Risk       | Reason                                    |
| ---- | ---------- | ----------------------------------------- |
| T-01 | LOW        | Bug fix -- adds missing prop              |
| T-02 | LOW        | Additive a11y props                       |
| T-03 | LOW        | Deprecation, non-breaking                 |
| T-04 | LOW        | Type-only                                 |
| T-05 | LOW        | Type-only                                 |
| T-06 | LOW        | Style refactor, same output               |
| T-07 | LOW        | Same logic, different shape               |
| T-08 | **MEDIUM** | State management change                   |
| T-09 | LOW        | Remove one hook call                      |
| T-10 | **MEDIUM** | Behavioral -- existing consumers affected |
| T-11 | LOW        | Comment only                              |
| T-12 | LOW        | Additive tokens                           |
| T-13 | **HIGH**   | Architecture change                       |
| T-14 | **MEDIUM** | Removes exported brand                    |
| T-15 | LOW        | Git config                                |
| T-16 | LOW        | Tests only                                |
| T-17 | LOW        | Docs only                                 |
