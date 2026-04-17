# New RNUI Components (2026)

This document covers the newly implemented high-impact UI components added to RNUI in 2026, based on modern web trends and React Native best practices.

## 🚀 Marquee Component

A smooth, GPU-accelerated scrolling text component for React Native, perfect for news tickers, logos, or dynamic content displays.

### Usage

```tsx
import { Marquee } from '@truongdq01/ui';

function NewsTicker() {
  return (
    <Marquee
      speed={50}
      direction="left"
      loop={true}
      fadeEdges={true}
      pauseOnHover={false}
      accessibilityLabel="Latest news scrolling"
    >
      <Text>Breaking: New RNUI components released! 🎉</Text>
    </Marquee>
  );
}
```

### Props

| Prop                 | Type                                  | Default  | Description                            |
| -------------------- | ------------------------------------- | -------- | -------------------------------------- |
| `children`           | `ReactNode`                           | -        | Content to scroll                      |
| `speed`              | `number`                              | `50`     | Pixels per second animation speed      |
| `direction`          | `"left" \| "right" \| "up" \| "down"` | `"left"` | Scroll direction                       |
| `loop`               | `boolean`                             | `true`   | Infinite loop or single pass           |
| `pauseOnHover`       | `boolean`                             | `false`  | Pause on touch (for web compatibility) |
| `pauseOnPress`       | `boolean`                             | `false`  | Pause on press                         |
| `delay`              | `number`                              | `0`      | Delay before starting (ms)             |
| `fadeEdges`          | `boolean`                             | `true`   | Gradient fade at edges                 |
| `fadeColor`          | `string`                              | -        | Custom fade color                      |
| `accessibilityLabel` | `string`                              | -        | Screen reader label                    |
| `testID`             | `string`                              | -        | Test identifier                        |

### Performance & Accessibility

- **GPU-accelerated** animations using React Native Reanimated
- **Accessibility** support with proper ARIA labels and reduced motion detection
- **Memory efficient** with automatic cleanup on unmount
- **Responsive** adapts to container size changes

---

## 📝 Form Component

A comprehensive form management system with validation, state handling, and keyboard management.

### Usage

```tsx
import { Form, useForm } from '@truongdq01/ui';
import { Input, Button } from '@truongdq01/ui';

function LoginForm() {
  const handleSubmit = async (values: any) => {
    console.log('Form submitted:', values);
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) errors.email = 'Email required';
    if (!values.password) errors.password = 'Password required';
    return errors;
  };

  return (
    <Form
      initialValues={{ email: '', password: '' }}
      validate={validate}
      onSubmit={handleSubmit}
      validateOnChange={true}
      scrollable={true}
    >
      <FormField label="Email">
        <Input name="email" type="email" />
      </FormField>

      <FormField label="Password">
        <Input name="password" type="password" />
      </FormField>

      <SubmitButton />
    </Form>
  );
}

function SubmitButton() {
  const { handleSubmit, isSubmitting, isValid } = useForm();

  return (
    <Button
      onPress={handleSubmit(() => console.log('Submit'))}
      disabled={isSubmitting || !isValid}
    >
      {isSubmitting ? 'Submitting...' : 'Login'}
    </Button>
  );
}
```

### Form Props

| Prop               | Type                          | Default  | Description              |
| ------------------ | ----------------------------- | -------- | ------------------------ |
| `initialValues`    | `Record<string, any>`         | `{}`     | Initial form values      |
| `validate`         | `(values) => errors`          | -        | Validation function      |
| `onSubmit`         | `(values) => void \| Promise` | -        | Submit handler           |
| `validateOnChange` | `boolean`                     | `true`   | Validate on field change |
| `validateOnBlur`   | `boolean`                     | `true`   | Validate on field blur   |
| `scrollable`       | `boolean`                     | `true`   | Enable ScrollView        |
| `style`            | `ViewStyle`                   | -        | Custom container styles  |
| `testID`           | `string`                      | `"form"` | Test identifier          |

### useForm Hook

```tsx
const {
  values, // Current form values
  errors, // Validation errors
  touched, // Touched fields
  isSubmitting, // Submit state
  isValid, // Overall validity
  setValue, // Update field value
  setError, // Set field error
  setTouched, // Mark field as touched
  handleSubmit, // Get submit handler
  resetForm, // Reset form state
} = useForm();
```

### Features

- **Automatic validation** with custom rules
- **Form state management** (values, errors, touched)
- **Keyboard handling** with ScrollView integration
- **Submit handling** with loading states
- **TypeScript support** with full type safety

---

## 🎯 Component Integration Examples

### Marquee in News App

```tsx
import { Marquee, Card } from '@truongdq01/ui';

function NewsHeader() {
  return (
    <Card style={{ height: 40, justifyContent: 'center' }}>
      <Marquee speed={30} direction="left" fadeEdges={true}>
        <Text style={{ fontWeight: 'bold' }}>
          📰 Latest: RNUI 2026 components now available! Check out the new Form
          and Marquee components...
        </Text>
      </Marquee>
    </Card>
  );
}
```

### Complete Registration Form

```tsx
import {
  Form,
  useForm,
  Input,
  Button,
  FormField,
  Checkbox,
} from '@truongdq01/ui';

function RegistrationForm() {
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email?.includes('@')) errors.email = 'Invalid email';
    if (values.password?.length < 8) errors.password = 'Min 8 characters';
    if (!values.agree) errors.agree = 'Must agree to terms';
    return errors;
  };

  return (
    <Form
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
      }}
      validate={validate}
      onSubmit={async (values) => {
        await api.register(values);
        navigation.navigate('Success');
      }}
    >
      <FormField label="Email" error={errors.email}>
        <Input name="email" keyboardType="email-address" />
      </FormField>

      <FormField label="Password" error={errors.password}>
        <Input name="password" secureTextEntry />
      </FormField>

      <FormField label="Confirm Password">
        <Input name="confirmPassword" secureTextEntry />
      </FormField>

      <FormField error={errors.agree}>
        <Checkbox name="agree" label="I agree to terms" />
      </FormField>

      <SubmitButton />
    </Form>
  );
}
```

---

## 🧪 Testing

All components include comprehensive unit tests:

```bash
# Run all component tests
bun run test

# Run specific component tests
bun run test src/components/Marquee
bun run test src/components/Form
```

### Test Coverage

- ✅ **Marquee**: 7 test cases covering props, accessibility, directions
- ✅ **Form**: 8 test cases covering validation, submission, state management

---

## 📚 API Reference

### Marquee API

```typescript
interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  loop?: boolean;
  delay?: number;
  fadeEdges?: boolean;
  fadeColor?: string;
  pauseOnHover?: boolean;
  pauseOnPress?: boolean;
  accessibilityLabel?: string;
  testID?: string;
}
```

### Form API

```typescript
interface FormProps {
  initialValues?: Record<string, any>;
  validate?: (values: Record<string, any>) => Record<string, string>;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  scrollable?: boolean;
  style?: ViewStyle;
  testID?: string;
}

interface FormContextValue {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  setValue: (name: string, value: any) => void;
  setError: (name: string, error: string) => void;
  setTouched: (name: string, touched: boolean) => void;
  handleSubmit: (callback: Function) => () => void;
  resetForm: () => void;
}
```

---

## 🚀 Performance Optimizations

### Marquee

- **Reanimated animations** for 60fps performance
- **Automatic cleanup** prevents memory leaks
- **Conditional rendering** only animates when needed

### Form

- **Memoized validation** prevents unnecessary re-computations
- **Efficient state updates** using React hooks
- **Keyboard optimization** with ScrollView integration

---

## ♿ Accessibility

All components follow RNUI accessibility standards:

- **Screen reader support** with proper labels
- **Keyboard navigation** where applicable
- **Reduced motion** detection for Marquee
- **Focus management** in Form components
- **ARIA-compliant** behavior

---

## 🔧 Configuration

### Build Configuration

Components are built with:

- **TypeScript** for type safety
- **ES2020** target for modern RN support
- **Tree-shaking** friendly exports
- **Subpath exports** for selective imports

### Peer Dependencies

```json
{
  "react": ">=19.2.0",
  "react-native": ">=0.83.2",
  "react-native-reanimated": ">=4.2.0",
  "@truongdq01/headless": "^1.0.3",
  "@truongdq01/tokens": "^1.0.3"
}
```

---

## 🎨 Design System Integration

These components integrate seamlessly with RNUI's design system:

- **Theme-aware** using `@truongdq01/headless` hooks
- **Token-based** styling with `@truongdq01/tokens`
- **Brand support** via theme switching
- **Dark mode** compatible

---

## 📝 Migration Guide

### From Custom Solutions

If migrating from custom marquee implementations:

```tsx
// Before
<Animated.View style={animatedStyle}>
  <Text>Scrolling Text</Text>
</Animated.View>

// After
<Marquee speed={50} direction="left">
  <Text>Scrolling Text</Text>
</Marquee>
```

### From Other Form Libraries

```tsx
// Before (react-hook-form)
const { register, handleSubmit } = useForm();

// After (RNUI Form)
const { handleSubmit, values, errors } = useForm();
```

---

## 🐛 Known Issues & Limitations

### Marquee

- **iOS Simulator**: Animation may stutter in debug mode
- **Nested scrolling**: May conflict with parent ScrollViews
- **Long content**: Extremely long content may impact performance

### Form

- **Keyboard avoiding**: iOS keyboard behavior may vary by device
- **Complex validation**: Very complex validation rules may impact performance
- **Large forms**: Consider pagination for forms with 20+ fields

---

## 🤝 Contributing

When contributing to these components:

1. **Add tests** for new features
2. **Update documentation** for API changes
3. **Follow TypeScript** strict mode
4. **Test accessibility** with screen readers
5. **Performance test** on low-end devices

---

_These components represent RNUI's commitment to modern React Native development, bringing 2026's high-impact UI patterns to mobile applications._
