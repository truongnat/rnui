---
sidebar_position: 20
---

# Accordion

Accordions display content in expandable/collapsible sections, perfect for FAQs and grouped content.

## Usage

```tsx
import { Accordion, AccordionSummary, AccordionDetails } from '@truongdq01/ui';

<Accordion>
  <AccordionSummary>Section Title</AccordionSummary>
  <AccordionDetails>
    <Text>Content goes here...</Text>
  </AccordionDetails>
</Accordion>;
```

## Props

### Accordion

| Prop              | Type                          | Default | Description                         |
| ----------------- | ----------------------------- | ------- | ----------------------------------- |
| `expanded`        | `boolean`                     | —       | Controlled expanded state           |
| `defaultExpanded` | `boolean`                     | `false` | Initial expanded state              |
| `disabled`        | `boolean`                     | `false` | Disable expand/collapse             |
| `onChange`        | `(expanded: boolean) => void` | —       | Callback when state changes         |
| `children`        | `ReactNode`                   | —       | AccordionSummary + AccordionDetails |

### AccordionSummary

| Prop         | Type        | Default      | Description                 |
| ------------ | ----------- | ------------ | --------------------------- |
| `children`   | `ReactNode` | —            | Summary content (title)     |
| `expandIcon` | `ReactNode` | Chevron icon | Custom expand/collapse icon |

### AccordionDetails

| Prop       | Type        | Default | Description         |
| ---------- | ----------- | ------- | ------------------- |
| `children` | `ReactNode` | —       | Collapsible content |

## Examples

### Basic Accordion

```tsx
<Accordion>
  <AccordionSummary>What is RNUI?</AccordionSummary>
  <AccordionDetails>
    <Text>RNUI is a React Native UI component library.</Text>
  </AccordionDetails>
</Accordion>
```

### Multiple Accordions

```tsx
function FAQ() {
  return (
    <View>
      <Accordion>
        <AccordionSummary>How do I install?</AccordionSummary>
        <AccordionDetails>
          <Text>Run: bun add @truongdq01/ui</Text>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>Is it free?</AccordionSummary>
        <AccordionDetails>
          <Text>Yes, RNUI is open source under MIT license.</Text>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>Can I customize?</AccordionSummary>
        <AccordionDetails>
          <Text>Absolutely! Use design tokens or headless hooks.</Text>
        </AccordionDetails>
      </Accordion>
    </View>
  );
}
```

### Controlled Accordion

```tsx
function ControlledAccordion() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion expanded={expanded} onChange={setExpanded}>
      <AccordionSummary>Controlled Section</AccordionSummary>
      <AccordionDetails>
        <Text>This accordion is controlled externally.</Text>
      </AccordionDetails>
    </Accordion>
  );
}
```

### Disabled Accordion

```tsx
<Accordion disabled>
  <AccordionSummary>Locked Content</AccordionSummary>
  <AccordionDetails>
    <Text>This section cannot be expanded.</Text>
  </AccordionDetails>
</Accordion>
```

### Custom Expand Icon

```tsx
import { Icon } from '@truongdq01/ui';

<Accordion>
  <AccordionSummary expandIcon={<Icon name="plus" size={16} />}>
    Custom Icon
  </AccordionSummary>
  <AccordionDetails>
    <Text>Uses a plus icon instead of chevron.</Text>
  </AccordionDetails>
</Accordion>;
```

## Use Cases

### FAQ Section

```tsx
<Typography variant="h4" gutterBottom>Frequently Asked Questions</Typography>

<Accordion>
  <AccordionSummary>What is React Native?</AccordionSummary>
  <AccordionDetails>
    <Text>React Native is a framework for building mobile apps using React.</Text>
  </AccordionDetails>
</Accordion>

<Accordion>
  <AccordionSummary>How do I get started?</AccordionSummary>
  <AccordionDetails>
    <Text>Follow our getting started guide in the documentation.</Text>
  </AccordionDetails>
</Accordion>
```

### Settings Groups

```tsx
<Accordion>
  <AccordionSummary>Privacy Settings</AccordionSummary>
  <AccordionDetails>
    <Switch label="Private Profile" />
    <Switch label="Show Online Status" />
  </AccordionDetails>
</Accordion>

<Accordion>
  <AccordionSummary>Notification Settings</AccordionSummary>
  <AccordionDetails>
    <Switch label="Push Notifications" />
    <Switch label="Email Notifications" />
  </AccordionDetails>
</Accordion>
```

### Nested Content

```tsx
<Accordion>
  <AccordionSummary>Advanced Options</AccordionSummary>
  <AccordionDetails>
    <Input label="API Key" />
    <Input label="Secret" />
    <Button label="Save Configuration" />
  </AccordionDetails>
</Accordion>
```

## Best Practices

### ✅ Do

- Use for grouping related content
- Keep summary titles concise and clear
- Use for progressively disclosed content
- Consider defaultExpanded for important sections

### ❌ Don't

- Don't nest accordions within accordions
- Don't use for critical always-visible content
- Don't put too many items in one accordion
- Don't use when all sections should be visible

## Accessibility

```tsx
<Accordion>
  <AccordionSummary
    accessibilityLabel="Privacy settings"
    accessibilityHint="Double tap to expand or collapse"
    accessibilityRole="button"
  >
    Privacy Settings
  </AccordionSummary>
  <AccordionDetails>
    <Text accessibilityRole="text">Control your privacy preferences here.</Text>
  </AccordionDetails>
</Accordion>
```

## Animation Details

- **Expand/Collapse**: Smooth spring animation
- **Icon Rotation**: 180° rotation when expanded
- **Duration**: 200ms
- **Easing**: Spring physics for natural feel

## Related Components

- [`List`](./list.md) - Alternative for simple expandable lists
- [`Modal`](./modal.md) - For content that needs focus
- [`Dialog`](./dialog.md) - For important confirmations
- [`Drawer`](./drawer.md) - For side panel content
