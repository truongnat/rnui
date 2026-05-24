import { useToast } from '@truongdq01/headless';
import { Button, Checkbox, Divider, Stack, Switch, TextField, Card } from '@truongdq01/ui';
import { useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function FormScreen() {
  const toast = useToast();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    subscribe: true,
    notifications: false,
    termsAccepted: false,
  });

  const handleSubmit = () => {
    toast.success('Form submitted successfully!');
  };

  return (
    <DemoPage
      title="Form Components"
      description="Structured input layouts combining TextField, Switch, and Checkbox."
    >
      <DemoSection
        title="Account Details"
        description="Stack fields inside a Card for grouped forms."
        bare
      >
        <Card>
          <Stack spacing="lg">
            <TextField
              label="Username"
              placeholder="e.g. janesmith"
              value={formData.username}
              onChangeText={(v) => setFormData((d) => ({ ...d, username: v }))}
            />
            <TextField
              label="Email Address"
              placeholder="email@example.com"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(v) => setFormData((d) => ({ ...d, email: v }))}
            />
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection title="Preferences" bare>
        <Card>
          <Stack spacing="md">
            <Switch
              label="Email Subscription"
              description="Receive weekly product updates"
              on={formData.subscribe}
              onChange={(v) => setFormData((d) => ({ ...d, subscribe: v }))}
            />
            <Switch
              label="Push Notifications"
              description="Real-time alerts for system events"
              on={formData.notifications}
              onChange={(v) => setFormData((d) => ({ ...d, notifications: v }))}
            />
            <Divider spacing="sm" />
            <Checkbox
              label="I agree to the Terms of Service"
              checked={formData.termsAccepted}
              onChange={(accepted) =>
                setFormData((d) => ({ ...d, termsAccepted: accepted }))
              }
            />
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection title="Submit" bare>
        <Button label="Save Changes" fullWidth onPress={handleSubmit} />
      </DemoSection>
    </DemoPage>
  );
}
