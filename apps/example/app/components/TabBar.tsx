import { useState } from 'react';
import { View } from 'react-native';
import { Bell, Home, Search, Settings, User } from 'lucide-react-native';
import { Card } from '@/components/ui/card';
import { TabBar } from '@/components/ui/tab-bar';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const ICON_SIZE = 22;

export default function TabBarScreen() {
  const colors = useThemeColor();
  const [activeTab, setActiveTab] = useState('home');
  const [activeTab2, setActiveTab2] = useState('search');

  return (
    <DemoPage
      title="TabBar"
      description="Bottom navigation bar with icons, labels, badge counters, and safe-area insets."
    >
      <DemoSection
        title="Interactive Standard TabBar"
        description="Tap destinations to switch active tab with color tinting."
        bare
      >
        <Card className="overflow-hidden border border-border">
          <View
            className="items-center justify-center p-6"
            style={{ minHeight: 90, backgroundColor: colors.background }}
          >
            <Text className="text-base font-semibold text-foreground capitalize">
              Active View: {activeTab}
            </Text>
            <Text variant="muted">Content rendered for the active tab</Text>
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
                key: 'inbox',
                label: 'Inbox',
                icon: <Bell size={ICON_SIZE} />,
                badge: 4,
              },
              {
                key: 'settings',
                label: 'Settings',
                icon: <Settings size={ICON_SIZE} />,
              },
            ]}
          />
        </Card>
      </DemoSection>

      <DemoSection
        title="Badges & Disabled States"
        description="Red dot badge, 'NEW' text badge, and disabled tabs."
        bare
      >
        <Card className="overflow-hidden border border-border">
          <View
            className="items-center justify-center bg-muted/40 p-6"
            style={{ minHeight: 90 }}
          >
            <Text className="text-base font-semibold text-foreground capitalize">
              Selected: {activeTab2}
            </Text>
            <Text variant="muted">Testing notification badges and disabled items</Text>
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
                key: 'profile',
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
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
