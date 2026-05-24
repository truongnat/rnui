import { useState } from 'react';
import { Switch, Stack, Typography, Divider } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function SwitchScreen() {
  const { colorScheme, setColorScheme } = useTheme();
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [biometrics, setBiometrics] = useState(true);

  return (
    <DemoPage
      title="Switch"
      description="Notification and privacy preferences — clear on/off states at native touch size."
    >
      <DemoSection
        title="Notifications"
        description="Settings list pattern with labels and descriptions."
      >
        <Stack spacing="md">
          <Switch
            label="Order updates"
            description="Shipping, delivery, and refund alerts"
            on={orderUpdates}
            onChange={setOrderUpdates}
          />
          <Switch
            label="Product tips"
            description="Occasional guides to get more from your account"
            on={marketing}
            onChange={setMarketing}
          />
          <Switch
            label="Sign in with Face ID"
            description="Required for payments over $100"
            on={biometrics}
            onChange={setBiometrics}
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Appearance">
        <Switch
          label="Dark mode"
          description="Match system or force dark theme"
          on={colorScheme === 'dark'}
          onChange={(v) => setColorScheme(v ? 'dark' : 'light')}
        />
      </DemoSection>

      <DemoSection title="Disabled">
        <Stack spacing="md">
          <Switch label="Managed by admin" disabled on onChange={() => {}} />
          <Switch label="Unavailable feature" disabled on={false} onChange={() => {}} />
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
