---
title: Drawer
sidebar_position: 48
---

# Drawer

Drawers are side panels that slide in from the screen edges, commonly used for navigation menus.

## Usage

```tsx
import { Drawer } from '@truongdq01/ui';

<Drawer open={isOpen} onClose={() => setIsOpen(false)}>
  <Text>Drawer content</Text>
</Drawer>;
```

## Props

| Prop       | Type                                     | Default  | Description                         |
| ---------- | ---------------------------------------- | -------- | ----------------------------------- |
| `open`     | `boolean`                                | —        | **Required.** Drawer open state     |
| `onClose`  | `() => void`                             | —        | **Required.** Callback when closing |
| `anchor`   | `"left" \| "right" \| "top" \| "bottom"` | `"left"` | Slide-in direction                  |
| `children` | `ReactNode`                              | —        | Drawer content                      |

## Anchors

### Left Drawer (Default)

```tsx
<Drawer open={isOpen} onClose={() => setIsOpen(false)}>
  <Text>Navigation Menu</Text>
</Drawer>
```

### Right Drawer

```tsx
<Drawer open={isOpen} onClose={() => setIsOpen(false)} anchor="right">
  <Text>Settings Panel</Text>
</Drawer>
```

### Top Drawer

```tsx
<Drawer open={isOpen} onClose={() => setIsOpen(false)} anchor="top">
  <Text>Quick Actions</Text>
</Drawer>
```

### Bottom Drawer (Bottom Sheet Alternative)

```tsx
<Drawer open={isOpen} onClose={() => setIsOpen(false)} anchor="bottom">
  <Text>Additional Options</Text>
</Drawer>
```

## Examples

### Navigation Drawer

```tsx
function AppDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open Menu" onPress={() => setOpen(true)} />

      <Drawer open={open} onClose={() => setOpen(false)} anchor="left">
        <View style={{ padding: 16 }}>
          <Typography variant="h6" gutterBottom>
            Navigation
          </Typography>

          <Button label="Home" variant="ghost" onPress={navigateHome} />
          <Button label="Profile" variant="ghost" onPress={navigateProfile} />
          <Button label="Settings" variant="ghost" onPress={navigateSettings} />

          <Divider />

          <Button label="Logout" variant="destructive" onPress={handleLogout} />
        </View>
      </Drawer>
    </>
  );
}
```

### Filter Drawer

```tsx
function FilterDrawer() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({});

  return (
    <>
      <Button label="Filters" onPress={() => setOpen(true)} />

      <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
        <View style={{ padding: 16, width: 300 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>

          <Checkbox
            label="In Stock"
            checked={filters.inStock}
            onChange={(v) => setFilters({ ...filters, inStock: v })}
          />

          <Slider
            label="Price Range"
            value={filters.price}
            onChange={(v) => setFilters({ ...filters, price: v })}
          />

          <Button
            label="Apply Filters"
            onPress={() => {
              applyFilters(filters);
              setOpen(false);
            }}
          />
        </View>
      </Drawer>
    </>
  );
}
```

### Settings Drawer

```tsx
<Drawer
  open={settingsOpen}
  onClose={() => setSettingsOpen(false)}
  anchor="right"
>
  <View style={{ padding: 16, width: 280 }}>
    <Typography variant="h6" gutterBottom>
      Settings
    </Typography>

    <Switch label="Dark Mode" value={darkMode} onValueChange={setDarkMode} />
    <Switch
      label="Notifications"
      value={notifications}
      onValueChange={setNotifications}
    />

    <Divider style={{ marginVertical: 16 }} />

    <Button label="Save" onPress={() => setSettingsOpen(false)} />
  </View>
</Drawer>
```

## Controlled Usage

```tsx
function ControlledDrawer() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button label="Open Drawer" onPress={handleOpen} />
      <Drawer open={open} onClose={handleClose}>
        <Text>Drawer content</Text>
      </Drawer>
    </>
  );
}
```

## Drawer with Backdrop Click

The drawer automatically closes when clicking the backdrop overlay:

```tsx
<Drawer open={isOpen} onClose={() => setIsOpen(false)}>
  {/* Clicking outside closes the drawer */}
  <Text>Content</Text>
</Drawer>
```

## Responsive Drawer

```tsx
function ResponsiveDrawer() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const [open, setOpen] = useState(false);

  return (
    <>
      {!isDesktop && <Button label="Menu" onPress={() => setOpen(true)} />}

      <Drawer
        open={isDesktop || open}
        onClose={() => setOpen(false)}
        anchor="left"
      >
        <NavigationMenu />
      </Drawer>
    </>
  );
}
```

## Best Practices

### ✅ Do

- Use left drawer for primary navigation
- Use right drawer for secondary panels (settings, filters)
- Close drawer after navigation action
- Provide clear close mechanism (backdrop click or close button)

### ❌ Don't

- Don't use for critical content that should always be visible
- Don't nest drawers
- Don't make drawers too wide (280-320px is ideal)
- Don't block drawer closure

## Animation Details

- **Slide Animation**: Spring physics for natural feel
- **Backdrop Fade**: Smooth opacity transition
- **Duration**: ~200ms
- **Easing**: Spring configuration from tokens

## Accessibility

```tsx
<Drawer
  open={isOpen}
  onClose={() => setIsOpen(false)}
  accessibilityLabel="Navigation menu"
  accessibilityRole="menu"
>
  <Text>Navigation</Text>
</Drawer>
```

## Related Components

- [`Modal`](./modal.md) - Centered overlay dialogs
- [`BottomSheet`](./bottom-sheet.md) - Mobile-optimized bottom sheets
- [`Dialog`](./dialog.md) - Alert and confirmation dialogs
- [`Menu`](./menu.md) - Dropdown menus
