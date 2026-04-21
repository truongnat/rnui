import { useTokens } from '@truongdq01/headless';
import { Button, Stack, TextField, Typography } from '@truongdq01/ui';
import { ShieldCheck, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { DemoPage, DemoSection } from './_shared/DemoPage';

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
      description="A high-level wrapper around Input, Select, and TextArea, providing a unified API for data entry with validation and type handling."
    >
      <DemoSection title="Standard Layouts">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          The standard TextField handles labels, requirements, and decorative leading elements.
        </Typography>
        <Stack spacing="md">
          <TextField
            label="Full Name"
            placeholder="John Doe"
            value={form.name}
            onChangeText={(name) => setForm(f => ({ ...f, name }))}
            leadingElement={<User size={18} color={t.color.text.tertiary} />}
          />
          <TextField
            label="Email Address"
            type="email"
            required
            placeholder="john@example.com"
            value={form.email}
            onChangeText={(email) => setForm(f => ({ ...f, email }))}
            error={showError && !form.email ? 'Email is required' : undefined}
            helperText="We'll never share your email."
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Types & Security">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          The 'password' type adds a built-in visibility toggle automatically.
        </Typography>
        <TextField
          label="Secure Password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChangeText={(password) => setForm(f => ({ ...f, password }))}
          leadingElement={<ShieldCheck size={18} color={t.color.text.tertiary} />}
        />
      </DemoSection>

      <DemoSection title="Multi-line (TextArea)">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Setting multiline transforms the input into a resizeable text area.
        </Typography>
        <TextField
          label="Biography"
          multiline
          minRows={3}
          placeholder="Tell us about yourself..."
          value={form.bio}
          onChangeText={(bio) => setForm(f => ({ ...f, bio }))}
        />
      </DemoSection>

      <DemoSection title="Validation States">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Helper text and errors let users know if their input is correct.
        </Typography>
        <Stack spacing="md">
            <Button 
              label={showError ? "Clear Errors" : "Trigger Validation"} 
              variant="outline" 
              size="sm"
              onPress={() => setShowError(!showError)}
              style={{ alignSelf: 'flex-start' }}
            />
            <TextField
              label="Username"
              error={showError ? "This username is taken" : undefined}
              helperText="Choose a unique public handle."
              defaultValue="truongdq"
            />
        </Stack>
      </DemoSection>

      <DemoSection title="Polymorphic Select">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Setting the 'select' prop transforms the TextField into a Select component.
        </Typography>
        <TextField
          label="User Role"
          select
          selectProps={{
            options: [
              { label: 'Administrator', value: 'admin' },
              { label: 'Editor', value: 'editor' },
              { label: 'Viewer', value: 'viewer' },
            ],
            placeholder: 'Select a role'
          }}
        />
      </DemoSection>
    </DemoPage>
  );
}
