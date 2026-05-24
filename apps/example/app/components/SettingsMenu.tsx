import { useTokens } from '@truongdq01/headless';
import { SettingsMenu, Switch, Typography } from '@truongdq01/ui';
import { Bell, Shield, User, Volume2 } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, View } from 'react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function SettingsMenuScreen() {
  const t = useTokens();
  const [notifications, setNotifications] = useState(true);

  const sections = [
    {
      title: 'Profile',
      items: [
        {
          id: 'account',
          label: 'Account Details',
          subtitle: 'Username, Email, Phone',
          icon: <User size={20} color={t.color.text.secondary} />,
          onPress: () => Alert.alert('Account Details'),
        },
        {
          id: 'security',
          label: 'Security',
          subtitle: 'Password, Biometrics',
          icon: <Shield size={20} color={t.color.text.secondary} />,
          onPress: () => Alert.alert('Security Settings'),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'notifications',
          label: 'Notifications',
          icon: <Bell size={20} color={t.color.text.secondary} />,
          value: <Switch on={notifications} onChange={setNotifications} />,
        },
        {
          id: 'sound',
          label: 'Sound & Vibration',
          icon: <Volume2 size={20} color={t.color.text.secondary} />,
          onPress: () => Alert.alert('Sound Settings'),
        },
      ],
    },
    {
      items: [
        {
          id: 'logout',
          label: 'Log Out',
          destructive: true,
          onPress: () =>
            Alert.alert('Log Out', 'Are you sure?', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Log Out', style: 'destructive' },
            ]),
        },
      ],
    },
  ];

  return (
    <DemoPage
      title="SettingsMenu"
      description="Grouped settings lists with icons, subtitles, and controls."
    >
      <DemoSection
        title="Grouped"
        description="iOS-style rounded containers per section."
        flush
      >
        <SettingsMenu sections={sections} variant="grouped" />
      </DemoSection>

      <DemoSection
        title="Flat"
        description="Edge-to-edge separators without grouped containers."
        flush
      >
        <View
          style={{
            backgroundColor: t.color.bg.default,
            borderRadius: t.radius.lg,
            overflow: 'hidden',
          }}
        >
          <SettingsMenu
            sections={[
              {
                items: [
                  {
                    id: '1',
                    label: 'Storage Usage',
                    subtitle: '45.2 GB of 128 GB used',
                    icon: <View style={{ width: t.spacing[5] }} />,
                  },
                  {
                    id: '2',
                    label: 'Data Roaming',
                    icon: <View style={{ width: t.spacing[5] }} />,
                    value: <Typography color="secondary">Off</Typography>,
                  },
                ],
              },
            ]}
            variant="default"
          />
        </View>
      </DemoSection>
    </DemoPage>
  );
}
