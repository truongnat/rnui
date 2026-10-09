import { useState } from 'react';
import { View } from 'react-native';
import { Stack } from '@/components/ui/stack';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { useDemoThemePreference } from '@/demo/DemoThemeContext';

function SwitchRow({
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <View
      className={cn(
        'flex-row items-center justify-between gap-4',
        disabled && 'opacity-60'
      )}
    >
      <View className="flex-1 gap-0.5">
        <Text className="text-sm font-medium text-foreground">{label}</Text>
        {description ? (
          <Text className="text-xs text-muted-foreground">{description}</Text>
        ) : null}
      </View>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </View>
  );
}

export default function SwitchScreen() {
  const { schemePreference, setSchemePreference } = useDemoThemePreference();
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
          <SwitchRow
            label="Order updates"
            description="Shipping, delivery, and refund alerts"
            checked={orderUpdates}
            onCheckedChange={setOrderUpdates}
          />
          <SwitchRow
            label="Product tips"
            description="Occasional guides to get more from your account"
            checked={marketing}
            onCheckedChange={setMarketing}
          />
          <SwitchRow
            label="Sign in with Face ID"
            description="Required for payments over $100"
            checked={biometrics}
            onCheckedChange={setBiometrics}
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Appearance">
        <SwitchRow
          label="Dark mode"
          description="Match system or force dark theme"
          checked={schemePreference === 'dark'}
          onCheckedChange={(v) => setSchemePreference(v ? 'dark' : 'light')}
        />
      </DemoSection>

      <DemoSection title="Disabled">
        <Stack spacing="md">
          <SwitchRow
            label="Managed by admin"
            disabled
            checked
            onCheckedChange={() => {}}
          />
          <SwitchRow
            label="Unavailable feature"
            disabled
            checked={false}
            onCheckedChange={() => {}}
          />
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
