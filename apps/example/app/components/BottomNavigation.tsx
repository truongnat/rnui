import React, { useState } from 'react';
import { View } from 'react-native';
import { BottomNavigation, BottomNavigationAction, Typography } from '@truongdq01/ui';
import { Home, Heart, Search, User } from 'lucide-react-native';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function BottomNavigationScreen() {
  const { tokens } = useTheme();
  const [activeTab, setActiveTab] = useState('home');

  return (
    <DemoPage 
      title="BottomNavigation" 
      description="Bottom navigation bars allow movement between primary destinations in an app."
    >
      <DemoSection title="Basic Navigation">
        <View style={{ height: 60, borderTopWidth: 1, borderTopColor: tokens.color.border.default }}>
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
        </View>
        <Typography variant="body2" style={{ marginTop: 16, textAlign: 'center' }}>
          Current Tab: <Typography variant="body2" fontWeight="bold">{activeTab}</Typography>
        </Typography>
      </DemoSection>

      <DemoSection title="Labels Only When Active">
          <Typography variant="body2" gutterBottom>
              Navigation can show labels only for the selected item.
          </Typography>
        <View style={{ height: 60, borderTopWidth: 1, borderTopColor: tokens.color.border.default }}>
          <BottomNavigation value={activeTab} onChange={setActiveTab} showLabels="only-active">
            <BottomNavigationAction value="home" icon={<Home size={24} />} label="Home" />
            <BottomNavigationAction value="favorites" icon={<Heart size={24} />} label="Likes" />
            <BottomNavigationAction value="search" icon={<Search size={24} />} label="Search" />
            <BottomNavigationAction value="profile" icon={<User size={24} />} label="User" />
          </BottomNavigation>
        </View>
      </DemoSection>

      <DemoSection title="No Labels">
        <View style={{ height: 60, borderTopWidth: 1, borderTopColor: tokens.color.border.default }}>
          <BottomNavigation value={activeTab} onChange={setActiveTab} showLabels="hidden">
            <BottomNavigationAction value="home" icon={<Home size={24} />} />
            <BottomNavigationAction value="favorites" icon={<Heart size={24} />} />
            <BottomNavigationAction value="search" icon={<Search size={24} />} />
            <BottomNavigationAction value="profile" icon={<User size={24} />} />
          </BottomNavigation>
        </View>
      </DemoSection>
    </DemoPage>
  );
}

