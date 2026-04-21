import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Input, Typography } from '@truongdq01/ui';
import { Mail, Search, User } from 'lucide-react-native';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

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
        description="Text fields allow users to enter and edit text with support for icons, helper text, and validation states."
      >
        <DemoSection title="Sizes">
          <View style={{ gap: tokens.spacing[4] }}>
            <Input
              size="sm"
              label="Small Input"
              placeholder="Compact size"
            />
            <Input
              size="md"
              label="Medium Input (Default)"
              placeholder="Standard size"
            />
            <Input
              size="lg"
              label="Large Input"
              placeholder="Large size"
            />
          </View>
        </DemoSection>

        <DemoSection title="Variants">
          <View style={{ gap: tokens.spacing[4] }}>
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
            <Input
              label="Disabled State"
              disabled
              value="Cannot edit this"
            />
          </View>
        </DemoSection>

        <DemoSection title="Icons & Slots">
          <View style={{ gap: tokens.spacing[4] }}>
            <Input
              label="Leading Icon"
              leadingElement={<Search size={20} color={tokens.color.text.secondary} />}
              placeholder="Search..."
            />
            <Input
              label="Trailing Icon"
              trailingElement={<Mail size={20} color={tokens.color.text.secondary} />}
              placeholder="Email address"
            />
            <Input
              label="Both Icons"
              leadingElement={<User size={20} color={tokens.color.text.secondary} />}
              trailingElement={<Search size={20} color={tokens.color.text.secondary} />}
              placeholder="Username"
            />
          </View>
        </DemoSection>

        <DemoSection title="Secure Text">
          <Input
            label="Password"
            secureTextEntry
            placeholder="Enter your password"
          />
        </DemoSection>

        <DemoSection title="Controlled Input">
          <Input
            label="Sync with State"
            value={value}
            onChangeText={setValue}
            helperText={`Current value: ${value}`}
            placeholder="Type something..."
          />
        </DemoSection>
      </DemoPage>
    </KeyboardAvoidingView>
  );
}


