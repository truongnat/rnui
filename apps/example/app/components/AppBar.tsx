import {
  Bell,
  ChevronLeft,
  Filter,
  MoreVertical,
  Plus,
  Search,
  Share2,
} from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { AppBar, AppBarAction } from '@/components/ui/app-bar';
import { Card } from '@/components/ui/card';
import { useIconColor } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function AppBarScreen() {
  const { toast } = useToast();
  const iconColor = useIconColor('foreground');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DemoPage
      title="AppBar"
      description="Top navigation bar engineered to iOS 18 HIG — standard centered bar, large title heading, integrated search, and floating island."
    >
      {/* 1. Standard Centered Navigation Bar */}
      <DemoSection
        title="1. Standard Centered Header (iOS HIG)"
        description="Centered 17px bold title, 44px touch anchors, and corner-anchored notification badge."
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
        </Card>
      </DemoSection>

      {/* 2. iOS 18 Large Display Title */}
      <DemoSection
        title="2. iOS 18 Large Title Display"
        description="Large 28px bold display title with 34px line-height (no text clipping) for primary views."
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
        </Card>
      </DemoSection>

      {/* 4. Floating Island Navigation Card */}
      <DemoSection
        title="4. Floating Island Navigation Card"
        description="Modern card island floating over content with subtle Apple shadow."
        bare
      >
        <View className="overflow-hidden rounded-2xl border border-border bg-muted/20 py-3">
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
