import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Stack } from '@truongdq01/ui';
import { Mail, Search, User } from 'lucide-react-native';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function InputScreen() {
  const { tokens } = useTheme();
  const [value, setValue] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <DemoPage
        title="Input"
        description="Text fields for entering and editing text — icons, helper text, and validation states."
      >
        <DemoSection title="Sizes" description="Compact, default, and large density.">
          <Stack spacing="md">
            <Input size="sm" label="Small" placeholder="Compact size" />
            <Input size="md" label="Medium (Default)" placeholder="Standard size" />
            <Input size="lg" label="Large" placeholder="Large size" />
          </Stack>
        </DemoSection>

        <DemoSection
          title="Variants"
          description="Floating labels, helper text, errors, and disabled state."
        >
          <Stack spacing="md">
            <Input
              label="Floating Label"
              floatingLabel
              placeholder="Label floats on focus"
            />
            <Input
              label="With Helper Text"
              helperText="Enter your professional email address"
              placeholder="you@example.com"
            />
            <Input
              label="With Error State"
              error="This email is already registered"
              value="existing@user.com"
            />
            <Input label="Disabled State" disabled value="Cannot edit this" />
          </Stack>
        </DemoSection>

        <DemoSection title="Icons & Slots" description="Leading and trailing adornments.">
          <Stack spacing="md">
            <Input
              label="Leading Icon"
              leadingElement={
                <Search size={20} color={tokens.color.text.secondary} />
              }
              placeholder="Search…"
            />
            <Input
              label="Trailing Icon"
              trailingElement={
                <Mail size={20} color={tokens.color.text.secondary} />
              }
              placeholder="Email address"
            />
            <Input
              label="Both Icons"
              leadingElement={
                <User size={20} color={tokens.color.text.secondary} />
              }
              trailingElement={
                <Search size={20} color={tokens.color.text.secondary} />
              }
              placeholder="Username"
            />
          </Stack>
        </DemoSection>

        <DemoSection title="Secure Text">
          <Input
            label="Password"
            secureTextEntry
            placeholder="Enter your password"
          />
        </DemoSection>

        <DemoSection title="Controlled Input" description="Sync value with React state.">
          <Input
            label="Sync with State"
            value={value}
            onChangeText={setValue}
            helperText={`Current value: ${value || '(empty)'}`}
            placeholder="Type something…"
          />
        </DemoSection>
      </DemoPage>
    </KeyboardAvoidingView>
  );
}
