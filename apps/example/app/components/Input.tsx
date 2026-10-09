import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Lock, Mail } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function InputScreen() {
  const colors = useThemeColor();
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
          <Card className="p-4">
            <Stack spacing="md">
              <Text variant="h4">Welcome back</Text>
              <Text variant="muted">
                Use your work email to access orders and billing.
              </Text>
              <FormField>
                <FormLabel>Email</FormLabel>
                <View className="relative justify-center">
                  <View className="absolute left-3 z-10">
                    <Mail size={20} color={colors.mutedForeground} />
                  </View>
                  <Input
                    className="pl-10"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="you@company.com"
                  />
                </View>
                <FormDescription>
                  We will never share your email.
                </FormDescription>
              </FormField>
              <FormField>
                <FormLabel>Password</FormLabel>
                <View className="relative justify-center">
                  <View className="absolute left-3 z-10">
                    <Lock size={20} color={colors.mutedForeground} />
                  </View>
                  <Input
                    className="pl-10"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder="Enter password"
                  />
                </View>
              </FormField>
              <Button className="w-full" onPress={() => {}}>
                Sign in
              </Button>
            </Stack>
          </Card>
        </DemoSection>

        <DemoSection title="Validation">
          <Stack spacing="md">
            <FormField error="This domain is not allowed for your organization">
              <FormLabel>Work email</FormLabel>
              <Input defaultValue="user@blocked.com" />
              <FormMessage />
            </FormField>
            <FormField>
              <FormLabel>Invalid without FormField</FormLabel>
              <Input invalid defaultValue="bad-input" />
            </FormField>
            <FormField>
              <FormLabel>Account locked</FormLabel>
              <Input
                disabled
                defaultValue="Contact support to restore access"
              />
            </FormField>
          </Stack>
        </DemoSection>

        <DemoSection
          title="Heights"
          description="Compact 36 · default 40 · roomy 48 — matches Button scale."
        >
          <Stack spacing="md">
            <Input className="h-9" placeholder="Promo code" />
            <Input placeholder="Full name" />
            <Input className="h-12" placeholder="Company" />
          </Stack>
        </DemoSection>
      </DemoPage>
    </KeyboardAvoidingView>
  );
}
