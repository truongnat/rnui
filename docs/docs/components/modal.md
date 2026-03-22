---
sidebar_position: 47
---

# Modal

Modals are overlay containers for focused tasks and important content that requires user attention.

## Usage

```tsx
import { Modal } from "@rnui/ui";

<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <Text>Modal content</Text>
</Modal>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | **Required.** Modal open state |
| `onClose` | `() => void` | — | Callback when closing |
| `children` | `ReactNode` | — | Modal content |
| `keepMounted` | `boolean` | `false` | Keep in DOM when closed |
| `hideBackdrop` | `boolean` | `false` | Hide backdrop overlay |
| `disableAutoFocus` | `boolean` | `false` | Disable auto focus |
| `disableEscapeKeyDown` | `boolean` | `false` | Disable ESC key close |
| `BackdropComponent` | `ComponentType` | — | Custom backdrop component |
| `BackdropProps` | `object` | — | Props for backdrop |
| `contentStyle` | `StyleProp<ViewStyle>` | — | Custom content container styles |

## Examples

### Basic Modal

```tsx
function BasicModal() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button label="Open Modal" onPress={() => setOpen(true)} />
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 12 }}>
          <Typography variant="h6" gutterBottom>Modal Title</Typography>
          <Typography variant="body2">
            This is the modal content. Click outside or press ESC to close.
          </Typography>
          <Button label="Close" onPress={() => setOpen(false)} style={{ marginTop: 16 }} />
        </View>
      </Modal>
    </>
  );
}
```

### Confirmation Modal

```tsx
function ConfirmModal() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button label="Delete Item" variant="destructive" onPress={() => setOpen(true)} />
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 12, minWidth: 280 }}>
          <Typography variant="h6" gutterBottom>Delete Item?</Typography>
          <Typography variant="body2" color="secondary">
            This action cannot be undone. Are you sure you want to delete this item?
          </Typography>
          
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
            <Button 
              label="Cancel" 
              variant="outline" 
              onPress={() => setOpen(false)}
              style={{ flex: 1 }}
            />
            <Button 
              label="Delete" 
              variant="destructive" 
              onPress={handleDelete}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
```

### Form Modal

```tsx
function FormModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  return (
    <>
      <Button label="Add User" onPress={() => setOpen(true)} />
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 12, width: 400 }}>
          <Typography variant="h6" gutterBottom>Add New User</Typography>
          
          <Input
            label="Name"
            value={formData.name}
            onChangeText={(v) => setFormData({ ...formData, name: v })}
          />
          
          <Input
            label="Email"
            value={formData.email}
            onChangeText={(v) => setFormData({ ...formData, email: v })}
            style={{ marginTop: 16 }}
          />
          
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
            <Button 
              label="Cancel" 
              variant="outline" 
              onPress={() => setOpen(false)}
            />
            <Button 
              label="Save" 
              onPress={handleSave}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
```

### Without Backdrop

```tsx
<Modal open={isOpen} onClose={() => setIsOpen(false)} hideBackdrop>
  <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 12 }}>
    <Text>Content without backdrop</Text>
  </View>
</Modal>
```

### Custom Backdrop

```tsx
<Modal 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  BackdropComponent={CustomBackdrop}
  BackdropProps={{ color: 'rgba(0,0,0,0.8)' }}
>
  <Text>Modal with custom backdrop</Text>
</Modal>

function CustomBackdrop({ color }) {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: color,
      backgroundImage: 'url(pattern.png)'
    }} />
  );
}
```

### Keep Mounted

```tsx
{/* Modal stays in DOM for faster re-open */}
<Modal open={isOpen} onClose={() => setIsOpen(false)} keepMounted>
  <Text>Content preserved when closed</Text>
</Modal>
```

## Use Cases

### Alert / Dialog Alternative

```tsx
<Modal open={alertOpen} onClose={() => setAlertOpen(false)}>
  <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 12, minWidth: 300 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Icon name="warning" size={32} color="#F59E0B" />
      <Typography variant="h6">Warning</Typography>
    </View>
    
    <Typography variant="body2" style={{ marginTop: 16 }}>
      Your session is about to expire. Do you want to continue?
    </Typography>
    
    <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
      <Button label="End Session" variant="outline" onPress={handleEnd} />
      <Button label="Continue" onPress={handleContinue} />
    </View>
  </View>
</Modal>
```

### Image Preview Modal

```tsx
<Modal open={previewOpen} onClose={() => setPreviewOpen(false)}>
  <View style={{ padding: 16 }}>
    <Image 
      source={{ uri: imageUrl }} 
      style={{ width: 400, height: 300, borderRadius: 8 }}
    />
    <Typography variant="caption" style={{ marginTop: 8 }}>
      {imageCaption}
    </Typography>
  </View>
</Modal>
```

### Video Modal

```tsx
<Modal open={videoOpen} onClose={() => setVideoOpen(false)}>
  <View style={{ padding: 24 }}>
    <Video 
      source={{ uri: videoUrl }}
      style={{ width: 560, height: 315 }}
      controls
    />
  </View>
</Modal>
```

## Best Practices

### ✅ Do
- Use for focused tasks requiring attention
- Keep content concise and scannable
- Provide clear close mechanism
- Use appropriate size for content

### ❌ Don't
- Don't use for simple confirmations (use Dialog)
- Don't put too much content (use Drawer for complex content)
- Don't nest modals
- Don't block modal closure without good reason

## Accessibility

```tsx
<Modal 
  open={isOpen} 
  onClose={() => setIsOpen(false)}
  accessibilityLabel="Add user form"
  accessibilityRole="dialog"
  accessibilityModal={true}
>
  <Text>Modal content with proper ARIA attributes</Text>
</Modal>
```

## Keyboard Support

- **ESC**: Close modal (unless `disableEscapeKeyDown`)
- **Tab**: Cycle through focusable elements
- **Shift+Tab**: Reverse tab order

## Responsive Design

```tsx
function ResponsiveModal() {
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <View style={{ 
        padding: isMobile ? 16 : 24,
        width: isMobile ? '90%' : 400,
        borderRadius: isMobile ? 8 : 12
      }}>
        {/* Content adapts to screen size */}
      </View>
    </Modal>
  );
}
```

## Related Components

- [`Dialog`](./dialog.md) - Pre-styled alert/confirmation dialogs
- [`Drawer`](./drawer.md) - Side panel overlays
- [`BottomSheet`](./bottom-sheet.md) - Mobile-optimized bottom sheets
- [`Popover`](./popover.md) - Lightweight popups
