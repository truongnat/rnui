import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Bell, LogOut, Shield, User, Volume2 } from 'lucide-react-native';
import { SettingsMenu } from '@/components/ui/settings-menu';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { useIconColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function SettingsMenuScreen() {
  const [notifications, setNotifications] = useState(true);
  const [detail, setDetail] = useState('');
  const [detailOpen, setDetailOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const iconColor = useIconColor();
  const showDetail = (title: string) => {
    setDetail(title);
    setDetailOpen(true);
  };

  const sections = [
    {
      title: 'Profile',
      items: [
        {
          key: 'account',
          title: 'Account Details',
          subtitle: 'Username, Email, Phone',
          leading: <User size={20} color={iconColor} />,
          onPress: () => showDetail('Account Details'),
        },
        {
          key: 'security',
          title: 'Security',
          subtitle: 'Password, Biometrics',
          leading: <Shield size={20} color={iconColor} />,
          onPress: () => showDetail('Security Settings'),
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
              accessibilityLabel="Notifications"
              onCheckedChange={setNotifications}
            />
          ),
        },
        {
          key: 'sound',
          title: 'Sound & Vibration',
          leading: <Volume2 size={20} color={iconColor} />,
          onPress: () => showDetail('Sound Settings'),
        },
      ],
    },
    {
      items: [
        {
          key: 'logout',
          title: 'Log Out',
          leading: <LogOut size={20} color={iconColor} />,
          onPress: () => setLogoutOpen(true),
        },
      ],
    },
  ];

  return (
    <DemoPage
      title="SettingsMenu"
      description="Grouped settings lists with icons, subtitles, and controls."
      floatingContent={
        <>
          <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
            <DialogTitle>{detail}</DialogTitle>
            <DialogDescription>
              This settings row opens a focused detail view.
            </DialogDescription>
            <DialogFooter>
              <Button onPress={() => setDetailOpen(false)}>Done</Button>
            </DialogFooter>
          </Dialog>
          <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
            <AlertDialogTitle>Log out?</AlertDialogTitle>
            <AlertDialogDescription>
              Confirm before leaving your current session.
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Stay signed in</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive">
                <Text className="text-sm font-medium text-destructive-foreground">
                  Log out
                </Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialog>
        </>
      }
    >
      <DemoSection
        title="Grouped"
        description="Sections with titles and separated rows."
        bare
      >
        <SettingsMenu sections={sections} />
      </DemoSection>

      <DemoSection
        title="Compact"
        description="Untitled section inside a bordered container."
        bare
      >
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
      </DemoSection>
    </DemoPage>
  );
}
