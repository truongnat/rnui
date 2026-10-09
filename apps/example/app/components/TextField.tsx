import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '@/components/ui/button';
import { FormField, FormLabel } from '@/components/ui/form';
import { Select } from '@/components/ui/select';
import { Stack } from '@/components/ui/stack';
import { TextField } from '@/components/ui/text-field';
import { Textarea } from '@/components/ui/textarea';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function TextFieldScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
  });
  const [role, setRole] = useState<string>();
  const [showError, setShowError] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <DemoPage
        title="TextField"
        description="Label, helper text, and error wiring around Input — plus Select and Textarea siblings."
      >
        <DemoSection
          title="Profile setup"
          description="Unified validation API for form fields."
        >
          <Stack spacing="md">
            <TextField
              label="Display name"
              required
              placeholder="Alex Nguyen"
              value={form.name}
              onChangeText={(name) => setForm((f) => ({ ...f, name }))}
            />
            <TextField
              label="Work email"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="alex@company.com"
              value={form.email}
              onChangeText={(email) => setForm((f) => ({ ...f, email }))}
              error={showError && !form.email ? 'Email is required' : undefined}
              description="Used for receipts and security alerts."
            />
          </Stack>
        </DemoSection>

        <DemoSection title="Security">
          <TextField
            label="Secure Password"
            secureTextEntry
            placeholder="••••••••"
            value={form.password}
            onChangeText={(password) => setForm((f) => ({ ...f, password }))}
          />
        </DemoSection>

        <DemoSection
          title="Multi-line"
          description="Use Textarea for multiline input."
        >
          <FormField>
            <FormLabel>Biography</FormLabel>
            <Textarea
              placeholder="Tell us about yourself…"
              value={form.bio}
              onChangeText={(bio) => setForm((f) => ({ ...f, bio }))}
              style={{ minHeight: 88 }}
            />
          </FormField>
        </DemoSection>

        <DemoSection
          title="Validation"
          description="Helper text and inline errors near the field."
        >
          <Stack spacing="md">
            <Button
              variant="outline"
              size="sm"
              onPress={() => setShowError(!showError)}
              style={{ alignSelf: 'flex-start' }}
            >
              {showError ? 'Clear Errors' : 'Trigger Validation'}
            </Button>
            <TextField
              label="Username"
              error={showError ? 'This username is taken' : undefined}
              description="Choose a unique public handle."
              defaultValue="truongdq"
            />
          </Stack>
        </DemoSection>

        <DemoSection
          title="Select"
          description="Pair FormLabel with Select for choice inputs."
        >
          <FormField>
            <FormLabel>User Role</FormLabel>
            <Select
              options={[
                { label: 'Administrator', value: 'admin' },
                { label: 'Editor', value: 'editor' },
                { label: 'Viewer', value: 'viewer' },
              ]}
              placeholder="Select a role"
              value={role}
              onValueChange={setRole}
            />
          </FormField>
        </DemoSection>
      </DemoPage>
    </KeyboardAvoidingView>
  );
}
