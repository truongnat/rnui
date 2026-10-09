import { useState } from 'react';
import { View } from 'react-native';
import { Bell, Home, Search, Settings, User } from 'lucide-react-native';
import { TabBar } from '@/components/ui/tab-bar';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const ICON_SIZE = 24;

export default function TabBarScreen() {
  const colors = useThemeColor();
  const [activeTab, setActiveTab] = useState('home');
  const [activeTab2, setActiveTab2] = useState('search');

  return (
    <DemoPage
      title="TabBar"
      description="Bottom navigation for switching primary destinations."
    >
      <DemoSection
        title="Standard"
        description="Labels, icons, and badge counts."
        bare
      >
        <View className="overflow-hidden rounded-lg border border-border">
          <View
            className="items-center justify-center"
            style={{ height: 80, backgroundColor: colors.background }}
          >
            <Text variant="h4">Active Tab: {activeTab}</Text>
          </View>
          <TabBar
            safeArea={false}
            value={activeTab}
            onValueChange={setActiveTab}
            items={[
              {
                key: 'home',
                label: 'Home',
                icon: <Home size={ICON_SIZE} />,
              },
              {
                key: 'search',
                label: 'Search',
                icon: <Search size={ICON_SIZE} />,
              },
              {
                key: 'notifications',
                label: 'Inbox',
                icon: <Bell size={ICON_SIZE} />,
                badge: 5,
              },
              {
                key: 'settings',
                label: 'Settings',
                icon: <Settings size={ICON_SIZE} />,
              },
            ]}
          />
        </View>
      </DemoSection>

      <DemoSection
        title="Badges & States"
        description="Dot badges, text badges, and disabled tabs."
        bare
      >
        <View className="overflow-hidden rounded-lg border border-border">
          <View
            className="items-center justify-center bg-muted"
            style={{ height: 80 }}
          >
            <Text variant="p">Content with background</Text>
          </View>
          <TabBar
            safeArea={false}
            value={activeTab2}
            onValueChange={setActiveTab2}
            items={[
              {
                key: 'home',
                label: 'Home',
                icon: <Home size={ICON_SIZE} />,
              },
              {
                key: 'search',
                label: 'Search',
                icon: <Search size={ICON_SIZE} />,
                badge: true,
              },
              {
                key: 'user',
                label: 'Profile',
                icon: <User size={ICON_SIZE} />,
                badge: 'NEW',
              },
              {
                key: 'settings',
                label: 'Settings',
                icon: <Settings size={ICON_SIZE} />,
                disabled: true,
              },
            ]}
          />
        </View>
      </DemoSection>

      <DemoSection
        title="Note"
        description="TabBar is usually fixed to the screen bottom — shown inline here for demo."
      />
    </DemoPage>
  );
}
