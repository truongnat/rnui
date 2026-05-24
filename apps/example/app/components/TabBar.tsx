import { useTokens } from '@truongdq01/headless';
import { TabBar, TabBarItem, Typography } from '@truongdq01/ui';
import { Bell, Home, Search, Settings, User } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function TabBarScreen() {
  const t = useTokens();
  const [activeTab, setActiveTab] = useState('home');
  const [activeTab2, setActiveTab2] = useState('search');

  const ICON_SIZE = 24;

  return (
    <DemoPage
      title="TabBar"
      description="Bottom navigation for switching primary destinations."
    >
      <DemoSection title="Standard" description="Labels, icons, and badge counts." bare>
        <View
          style={{
            borderRadius: t.radius.lg,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: t.color.border.subtle,
          }}
        >
          <View
            style={{
              height: t.spacing[20],
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: t.color.bg.default,
            }}
          >
            <Typography variant="h6">Active Tab: {activeTab}</Typography>
          </View>
          <TabBar value={activeTab} onChange={setActiveTab} glassEffect={false}>
            <TabBarItem
              value="home"
              label="Home"
              icon={<Home size={ICON_SIZE} color={t.color.text.secondary} />}
              activeIcon={<Home size={ICON_SIZE} color={t.color.brand.default} />}
            />
            <TabBarItem
              value="search"
              label="Search"
              icon={<Search size={ICON_SIZE} color={t.color.text.secondary} />}
              activeIcon={<Search size={ICON_SIZE} color={t.color.brand.default} />}
            />
            <TabBarItem
              value="notifications"
              label="Inbox"
              icon={<Bell size={ICON_SIZE} color={t.color.text.secondary} />}
              activeIcon={<Bell size={ICON_SIZE} color={t.color.brand.default} />}
              badge={5}
            />
            <TabBarItem
              value="settings"
              label="Settings"
              icon={<Settings size={ICON_SIZE} color={t.color.text.secondary} />}
              activeIcon={<Settings size={ICON_SIZE} color={t.color.brand.default} />}
            />
          </TabBar>
        </View>
      </DemoSection>

      <DemoSection
        title="Glass & Badges"
        description="Transparency, dot badges, text badges, and disabled tabs."
        bare
      >
        <View
          style={{
            borderRadius: t.radius.lg,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: t.color.border.subtle,
          }}
        >
          <View
            style={{
              height: t.spacing[20],
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: t.color.brand.subtle,
            }}
          >
            <Typography variant="body1">Content with background</Typography>
          </View>
          <TabBar value={activeTab2} onChange={setActiveTab2} glassEffect>
            <TabBarItem
              value="home"
              label="Home"
              icon={<Home size={ICON_SIZE} color={t.color.text.secondary} />}
            />
            <TabBarItem
              value="search"
              label="Search"
              icon={<Search size={ICON_SIZE} color={t.color.text.secondary} />}
              badge
            />
            <TabBarItem
              value="user"
              label="Profile"
              icon={<User size={ICON_SIZE} color={t.color.text.secondary} />}
              badge="NEW"
            />
            <TabBarItem
              value="settings"
              label="Settings"
              icon={<Settings size={ICON_SIZE} color={t.color.text.secondary} />}
              disabled
            />
          </TabBar>
        </View>
      </DemoSection>

      <DemoSection
        title="Note"
        description="TabBar is usually fixed to the screen bottom — shown inline here for demo."
      />
    </DemoPage>
  );
}
