import {
  Bell,
  ChevronLeft,
  Filter,
  Menu,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Share2,
} from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { AppBar, AppBarAction } from '@/components/ui/app-bar';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useIconColor, useThemeColor } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function AppBarScreen() {
  const { toast } = useToast();
  const iconColor = useIconColor('foreground');
  const colors = useThemeColor();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DemoPage
      title="AppBar"
      description="Top navigation bar engineered to iOS 18 HIG — standard centered bar, large title heading, integrated search, and floating island."
    >
      {/* 1. Standard Centered Navigation Bar */}
      <DemoSection
        title="1. Standard Centered Header (iOS HIG)"
        description="Centered 17px bold title, 44px touch anchors, and notification badge counter."
        bare
      >
        <Card className="overflow-hidden border border-border">
          <AppBar
            safeArea={false}
            title="Account Settings"
            subtitle="Personal details & privacy"
            onBack={() => toast.info('Navigating back')}
            trailing={
              <>
                <AppBarAction
                  badge={3}
                  onPress={() => toast.info('3 unread alerts')}
                  accessibilityLabel="Notifications"
                >
                  <Bell size={20} color={iconColor} />
                </AppBarAction>
                <AppBarAction
                  onPress={() => toast.info('More options')}
                  accessibilityLabel="More options"
                >
                  <MoreVertical size={20} color={iconColor} />
                </AppBarAction>
              </>
            }
          />
          <View className="p-5 items-center justify-center bg-muted/20" style={{ height: 60 }}>
            <Text variant="muted">Content rendered below standard header</Text>
          </View>
        </Card>
      </DemoSection>

      {/* 2. iOS 18 Large Display Title */}
      <DemoSection
        title="2. iOS 18 Large Title Display"
        description="Large 30px bold display title with top action row for primary views."
        bare
      >
        <Card className="overflow-hidden border border-border">
          <AppBar
            safeArea={false}
            variant="large"
            title="Explore Feed"
            subtitle="Curated design system components"
            onBack={() => toast.info('Back tapped')}
            trailing={
              <AppBarAction
                onPress={() => toast.info('Add new item')}
                accessibilityLabel="Create"
              >
                <Plus size={22} color={iconColor} />
              </AppBarAction>
            }
          />
          <View className="p-5 items-center justify-center bg-muted/20" style={{ height: 60 }}>
            <Text variant="muted">Content rendered below large title</Text>
          </View>
        </Card>
      </DemoSection>

      {/* 3. Search-Integrated Navigation Bar */}
      <DemoSection
        title="3. Search-Integrated Navigation Bar"
        description="Search input embedded directly inside the 52px navigation bar."
        bare
      >
        <Card className="overflow-hidden border border-border">
          <AppBar
            safeArea={false}
            variant="search"
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search components or tags..."
            onBack={() => toast.info('Back tapped')}
            trailing={
              <AppBarAction
                onPress={() => toast.info('Filter options')}
                accessibilityLabel="Filter"
              >
                <Filter size={18} color={iconColor} />
              </AppBarAction>
            }
          />
          <View className="p-5 items-center justify-center bg-muted/20" style={{ height: 60 }}>
            <Text variant="muted">
              {searchQuery ? `Searching for: "${searchQuery}"` : 'Type in the search bar above'}
            </Text>
          </View>
        </Card>
      </DemoSection>

      {/* 4. Floating Island Navigation Bar */}
      <DemoSection
        title="4. Floating Island Navigation Card"
        description="Modern card island floating over content with soft drop shadow."
        bare
      >
        <View className="p-4 rounded-2xl bg-muted/40 border border-border">
          <AppBar
            safeArea={false}
            variant="floating"
            title="San Francisco"
            subtitle="72° Sunny"
            onBack={() => toast.info('Back tapped')}
            trailing={
              <AppBarAction
                onPress={() => toast.info('Share destination')}
                accessibilityLabel="Share"
              >
                <Share2 size={18} color={iconColor} />
              </AppBarAction>
            }
          />
        </View>
      </DemoSection>
    </DemoPage>
  );
}
