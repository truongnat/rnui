import { useTokens } from '@truongdq01/headless';
import { Button, Stack, TextField } from '@truongdq01/ui';
import { ShieldCheck, User } from 'lucide-react-native';
import { useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function TextFieldScreen() {
  const t = useTokens();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
  });
  const [showError, setShowError] = useState(false);

  return (
    <DemoPage
      title="TextField"
      description="High-level wrapper around Input, Select, and TextArea with unified validation API."
    >
      <DemoSection
        title="Profile setup"
        description="Unified validation API over Input, Select, and TextArea."
      >
        <Stack spacing="md">
          <TextField
            label="Display name"
            placeholder="Alex Nguyen"
            value={form.name}
            onChangeText={(name) => setForm((f) => ({ ...f, name }))}
            leadingElement={<User size={18} color={t.color.text.tertiary} />}
            required
          />
          <TextField
            label="Work email"
            type="email"
            placeholder="alex@company.com"
            value={form.email}
            onChangeText={(email) => setForm((f) => ({ ...f, email }))}
            error={showError && !form.email ? 'Email is required' : undefined}
            helperText="Used for receipts and security alerts."
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Security">
        <TextField
          label="Secure Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChangeText={(password) => setForm((f) => ({ ...f, password }))}
          leadingElement={
            <ShieldCheck size={18} color={t.color.text.tertiary} />
          }
        />
      </DemoSection>

      <DemoSection
        title="Multi-line"
        description="Multiline mode renders a resizable text area."
      >
        <TextField
          label="Biography"
          multiline
          minRows={3}
          placeholder="Tell us about yourself…"
          value={form.bio}
          onChangeText={(bio) => setForm((f) => ({ ...f, bio }))}
        />
      </DemoSection>

      <DemoSection
        title="Validation"
        description="Helper text and inline errors near the field."
      >
        <Stack spacing="md">
          <Button
            label={showError ? 'Clear Errors' : 'Trigger Validation'}
            variant="outline"
            size="sm"
            onPress={() => setShowError(!showError)}
            style={{ alignSelf: 'flex-start' }}
          />
          <TextField
            label="Username"
            error={showError ? 'This username is taken' : undefined}
            helperText="Choose a unique public handle."
            defaultValue="truongdq"
          />
        </Stack>
      </DemoSection>

      <DemoSection
        title="Polymorphic Select"
        description="The select prop renders a Select instead of a text input."
      >
        <TextField
          label="User Role"
          select
          selectProps={{
            options: [
              { label: 'Administrator', value: 'admin' },
              { label: 'Editor', value: 'editor' },
              { label: 'Viewer', value: 'viewer' },
            ],
            placeholder: 'Select a role',
          }}
        />
      </DemoSection>
    </DemoPage>
  );
}
