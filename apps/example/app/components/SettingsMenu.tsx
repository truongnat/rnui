import { useState } from 'react';
import { Alert, View } from 'react-native';
import { Bell, LogOut, Shield, User, Volume2 } from 'lucide-react-native';
import { SettingsMenu } from '@/components/ui/settings-menu';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { useIconColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function SettingsMenuScreen() {
  const [notifications, setNotifications] = useState(true);
  const iconColor = useIconColor();

  const sections = [
    {
      title: 'Profile',
      items: [
        {
          key: 'account',
          title: 'Account Details',
          subtitle: 'Username, Email, Phone',
          leading: <User size={20} color={iconColor} />,
          onPress: () => Alert.alert('Account Details'),
        },
        {
          key: 'security',
          title: 'Security',
          subtitle: 'Password, Biometrics',
          leading: <Shield size={20} color={iconColor} />,
          onPress: () => Alert.alert('Security Settings'),
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          key: 'notifications',
          title: 'Notifications',
          leading: <Bell size={20} color={iconColor} />,
          trailing: (
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          ),
        },
        {
          key: 'sound',
          title: 'Sound & Vibration',
          leading: <Volume2 size={20} color={iconColor} />,
          onPress: () => Alert.alert('Sound Settings'),
        },
      ],
    },
    {
      items: [
        {
          key: 'logout',
          title: 'Log Out',
          leading: <LogOut size={20} color={iconColor} />,
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
        description="Sections with titles and separated rows."
        flush
      >
        <SettingsMenu sections={sections} />
      </DemoSection>

      <DemoSection
        title="Compact"
        description="Untitled section inside a bordered container."
        flush
      >
        <View className="overflow-hidden rounded-lg border border-border">
          <SettingsMenu
            sections={[
              {
                items: [
                  {
                    key: 'storage',
                    title: 'Storage Usage',
                    subtitle: '45.2 GB of 128 GB used',
                  },
                  {
                    key: 'roaming',
                    title: 'Data Roaming',
                    trailing: <Text variant="muted">Off</Text>,
                  },
                ],
              },
            ]}
          />
        </View>
      </DemoSection>
    </DemoPage>
  );
}
