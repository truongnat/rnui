import { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from '@truongdq01/ui';
import { Home, Heart, Search, User } from 'lucide-react-native';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function BottomNavigationScreen() {
  const { tokens } = useTheme();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <DemoPage
      title="BottomNavigation"
      description="Primary destination navigation at the bottom of the screen."
    >
      <DemoSection title="With Labels">
        <BottomNavigation value={activeTab} onChange={setActiveTab}>
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<Home size={24} />}
          />
          <BottomNavigationAction
            label="Favorites"
            value="favorites"
            icon={<Heart size={24} />}
          />
          <BottomNavigationAction
            label="Search"
            value="search"
            icon={<Search size={24} />}
          />
          <BottomNavigationAction
            label="Profile"
            value="profile"
            icon={<User size={24} />}
          />
        </BottomNavigation>
        <Typography
          variant="body2"
          style={{ marginTop: tokens.spacing[4], textAlign: 'center' }}
        >
          Current Tab:{' '}
          <Typography variant="body2" fontWeight="bold">
            {activeTab}
          </Typography>
        </Typography>
      </DemoSection>

      <DemoSection
        title="Active Label Only"
        description="Show labels only for the selected item."
      >
        <BottomNavigation
          value={activeTab}
          onChange={setActiveTab}
          showLabels={false}
        >
          <BottomNavigationAction
            value="home"
            icon={<Home size={24} />}
            label="Home"
          />
          <BottomNavigationAction
            value="favorites"
            icon={<Heart size={24} />}
            label="Likes"
          />
          <BottomNavigationAction
            value="search"
            icon={<Search size={24} />}
            label="Search"
          />
          <BottomNavigationAction
            value="profile"
            icon={<User size={24} />}
            label="User"
          />
        </BottomNavigation>
      </DemoSection>

      <DemoSection title="Icons Only" description="Compact icon-only navigation.">
        <BottomNavigation
          value={activeTab}
          onChange={setActiveTab}
          showLabels={false}
        >
          <BottomNavigationAction
            value="home"
            icon={<Home size={24} />}
            label="Home"
          />
          <BottomNavigationAction
            value="favorites"
            icon={<Heart size={24} />}
            label="Favorites"
          />
          <BottomNavigationAction
            value="search"
            icon={<Search size={24} />}
            label="Search"
          />
          <BottomNavigationAction
            value="profile"
            icon={<User size={24} />}
            label="Profile"
          />
        </BottomNavigation>
      </DemoSection>
    </DemoPage>
  );
}
