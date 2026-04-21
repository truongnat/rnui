import { useTokens } from '@truongdq01/headless';
import { SettingsMenu, Switch, Typography } from '@truongdq01/ui';
import { Bell, Shield, User, Volume2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

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
          value: (
            <Switch 
              value={notifications} 
              onValueChange={setNotifications} 
            />
          ),
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
          onPress: () => Alert.alert('Log Out', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Log Out', style: 'destructive' }
          ]),
        },
      ],
    },
  ];

  return (
    <DemoPage 
      title="SettingsMenu" 
      description="A navigation component designed specifically for application settings and preferences, featuring grouped sections and items with support for icons, subtitles, and interactive controls."
    >
      <DemoSection title="Standard Grouped List">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          The default 'grouped' variant provides an iOS-style rounded container for each section.
        </Typography>
        <SettingsMenu sections={sections} variant="grouped" />
      </DemoSection>

      <DemoSection title="Flat List">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          The 'default' variant uses a flat layout with edge-to-edge separators.
        </Typography>
        <View style={{ backgroundColor: t.color.bg.default, borderRadius: t.radius.lg, overflow: 'hidden' }}>
            <SettingsMenu 
                sections={[
                    {
                        items: [
                            { id: '1', label: 'Storage Usage', subtitle: '45.2 GB of 128 GB used', icon: <View style={{ width: 20 }} /> },
                            { id: '2', label: 'Data Roaming', icon: <View style={{ width: 20 }} />, value: <Typography color="secondary">Off</Typography> },
                        ]
                    }
                ]} 
                variant="default" 
            />
        </View>
      </DemoSection>
    </DemoPage>
  );
}
