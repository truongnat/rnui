import { Bell, Heart, Home, Search, User } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const ICON_SIZE = 22;

export default function BottomNavigationScreen() {
  const colors = useThemeColor();
  const [activeTab1, setActiveTab1] = useState('home');
  const [activeTab2, setActiveTab2] = useState('search');

  const standardItems = [
    { key: 'home', label: 'Home', icon: <Home size={ICON_SIZE} /> },
    { key: 'search', label: 'Explore', icon: <Search size={ICON_SIZE} /> },
    { key: 'favorites', label: 'Saved', icon: <Heart size={ICON_SIZE} />, badge: 3 },
    { key: 'inbox', label: 'Alerts', icon: <Bell size={ICON_SIZE} />, badge: true },
    { key: 'profile', label: 'Account', icon: <User size={ICON_SIZE} /> },
  ];

  return (
    <DemoPage
      title="Bottom Navigation"
      description="Primary destination navigation with active capsule highlights, floating island mode, and badges."
    >
      <DemoSection
        title="Standard Capsule Navigation Bar"
        description="Active tab highlighted with tinted capsule and notification badges."
        bare
      >
        <Card className="overflow-hidden border border-border">
          <View
            className="items-center justify-center p-6"
            style={{ minHeight: 90, backgroundColor: colors.background }}
          >
            <Text className="text-base font-semibold text-foreground capitalize">
              Active Screen: {activeTab1}
            </Text>
            <Text variant="muted">Tap tabs below to switch view</Text>
          </View>
          <BottomNavigation
            safeArea={false}
            items={standardItems}
            value={activeTab1}
            onValueChange={setActiveTab1}
          />
        </Card>
      </DemoSection>

      <DemoSection
        title="Floating Island Navigation Bar"
        description="Trendy floating pill bar elevated above the content."
        bare
      >
        <Card className="overflow-hidden border border-border">
          <View
            className="items-center justify-center bg-muted/40 p-6"
            style={{ minHeight: 140 }}
          >
            <Text className="text-base font-semibold text-foreground capitalize">
              Destination: {activeTab2}
            </Text>
            <Text variant="muted">Floating pill bar with drop shadow</Text>
          </View>
          <BottomNavigation
            safeArea={false}
            variant="floating"
            items={[
              { key: 'home', label: 'Feed', icon: <Home size={ICON_SIZE} /> },
              { key: 'search', label: 'Search', icon: <Search size={ICON_SIZE} /> },
              { key: 'inbox', label: 'Activity', icon: <Bell size={ICON_SIZE} />, badge: '9+' },
              { key: 'profile', label: 'Profile', icon: <User size={ICON_SIZE} /> },
            ]}
            value={activeTab2}
            onValueChange={setActiveTab2}
          />
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
