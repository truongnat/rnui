import React, { useState } from 'react';
import { Switch, Divider } from '@truongdq01/ui';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function SwitchScreen() {
  const { colorScheme, setColorScheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [airplaneMode, setAirplaneMode] = useState(false);

  return (
    <DemoPage 
      title="Switch" 
      description="Toggles the state of a single setting on or off."
    >
      <DemoSection title="Basic Selection">
        <Switch
          label="Push Notifications"
          description="Receive alerts on your device"
          on={notifications}
          onChange={setNotifications}
        />
        <Divider spacing="md" />
        <Switch
          label="Dark Mode"
          description="Toggle application theme"
          on={colorScheme === 'dark'}
          onChange={(v) => setColorScheme(v ? 'dark' : 'light')}
        />
      </DemoSection>

      <DemoSection title="States">
        <Switch
          label="Airplane Mode"
          on={airplaneMode}
          onChange={setAirplaneMode}
        />
        <Divider spacing="md" />
        <Switch
          label="Disabled (On)"
          disabled
          on={true}
          onChange={() => {}}
        />
        <Divider spacing="md" />
        <Switch
          label="Disabled (Off)"
          disabled
          on={false}
          onChange={() => {}}
        />
      </DemoSection>
    </DemoPage>
  );
}

