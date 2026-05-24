import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Card, Input, Stack, Typography } from '@truongdq01/ui';
import { Mail, Lock } from 'lucide-react-native';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function InputScreen() {
  const { tokens } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <DemoPage
        title="Input"
        description="Form fields aligned with Button at 44dp — soft borders and clear focus."
      >
        <DemoSection
          title="Sign in"
          description="Login form — label, helper, error, and secure entry."
        >
          <Card>
            <Stack spacing="md">
              <Typography variant="h4">Welcome back</Typography>
              <Typography variant="body2" color="secondary">
                Use your work email to access orders and billing.
              </Typography>
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                leadingElement={
                  <Mail size={20} color={tokens.color.text.secondary} />
                }
                placeholder="you@company.com"
                helperText="We will never share your email."
              />
              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                leadingElement={
                  <Lock size={20} color={tokens.color.text.secondary} />
                }
                placeholder="Enter password"
              />
              <Button label="Sign in" fullWidth onPress={() => {}} />
            </Stack>
          </Card>
        </DemoSection>

        <DemoSection title="Validation">
          <Stack spacing="md">
            <Input
              label="Work email"
              error="This domain is not allowed for your organization"
              value="user@blocked.com"
            />
            <Input label="Account locked" disabled value="Contact support to restore access" />
          </Stack>
        </DemoSection>

        <DemoSection title="Sizes" description="sm 36 · md 44 · lg 52 — matches Button scale.">
          <Stack spacing="md">
            <Input size="sm" label="Promo code" placeholder="SAVE10" />
            <Input size="md" label="Full name" placeholder="Alex Nguyen" />
            <Input size="lg" label="Company" placeholder="Acme Inc." />
          </Stack>
        </DemoSection>

        <DemoSection title="Floating label">
          <Input
            label="Cardholder name"
            floatingLabel
            placeholder="Name on card"
          />
        </DemoSection>
      </DemoPage>
    </KeyboardAvoidingView>
  );
}
