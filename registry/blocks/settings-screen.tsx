import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Bell, Lock, Moon, User } from 'lucide-react-native';
import { SettingsMenu } from '@/components/ui/settings-menu';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { useIconColor } from '@/lib/utils';

export function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const iconColor = useIconColor();

  return (
    <ScrollView className="flex-1 bg-muted">
      <View className="flex-row items-center gap-3 px-4 py-5">
        <Avatar className="h-14 w-14">
          <AvatarFallback>TQ</AvatarFallback>
        </Avatar>
        <View>
          <Text className="text-lg font-semibold text-foreground">
            Truong DQ
          </Text>
          <Text className="text-sm text-muted-foreground">
            truong@example.com
          </Text>
        </View>
      </View>
      <SettingsMenu
        sections={[
          {
            title: 'Account',
            items: [
              {
                key: 'profile',
                title: 'Profile',
                leading: <User size={18} color={iconColor} />,
                onPress: () => {},
              },
              {
                key: 'security',
                title: 'Security',
                subtitle: 'Password, 2FA',
                leading: <Lock size={18} color={iconColor} />,
                onPress: () => {},
              },
            ],
          },
          {
            title: 'Preferences',
            items: [
              {
                key: 'notifications',
                title: 'Notifications',
                leading: <Bell size={18} color={iconColor} />,
                trailing: (
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                ),
              },
              {
                key: 'appearance',
                title: 'Dark mode',
                leading: <Moon size={18} color={iconColor} />,
                trailing: (
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                ),
              },
            ],
          },
        ]}
      />
    </ScrollView>
  );
}
