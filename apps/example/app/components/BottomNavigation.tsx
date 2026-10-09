import { Heart, Home, Search, User } from 'lucide-react-native';
import { useState } from 'react';
import {
  BottomNavigation,
  type BottomNavigationItem,
} from '@/components/ui/bottom-navigation';
import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const DESTINATIONS = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'favorites', label: 'Favorites', icon: Heart },
  { key: 'search', label: 'Search', icon: Search },
  { key: 'profile', label: 'Profile', icon: User },
] as const;

export default function BottomNavigationScreen() {
  const colors = useThemeColor();
  const [activeTab, setActiveTab] = useState('home');

  const items: BottomNavigationItem[] = DESTINATIONS.map(
    ({ key, label, icon: ItemIcon }) => ({
      key,
      label,
      renderIcon: (active) => (
        <ItemIcon
          size={24}
          color={active ? colors.foreground : colors.mutedForeground}
        />
      ),
    })
  );

  return (
    <DemoPage
      title="BottomNavigation"
      description="Primary destination navigation at the bottom of the screen."
    >
      <DemoSection title="With Labels">
        <BottomNavigation
          items={items}
          value={activeTab}
          onValueChange={setActiveTab}
        />
        <Text variant="muted" style={{ marginTop: 16, textAlign: 'center' }}>
          Current Tab: <Text variant="small">{activeTab}</Text>
        </Text>
      </DemoSection>

      <DemoSection
        title="Static Icons"
        description="`icon` renders as-is — `renderIcon` receives the active state for per-state tinting."
      >
        <BottomNavigation
          items={DESTINATIONS.map(({ key, label, icon: ItemIcon }) => ({
            key,
            label,
            icon: <ItemIcon size={24} color={colors.mutedForeground} />,
          }))}
          value={activeTab}
          onValueChange={setActiveTab}
        />
      </DemoSection>
    </DemoPage>
  );
}
