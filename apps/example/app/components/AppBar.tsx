import { ChevronLeft, MoreVertical, Search, Settings, Share } from 'lucide-react-native';
import { AppBar, AppBarAction } from '@/components/ui/app-bar';
import { Card } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';
import { useIconColor, useThemeColor } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function AppBarScreen() {
  const { toast } = useToast();
  const iconColor = useIconColor('foreground');
  const colors = useThemeColor();

  return (
    <DemoPage
      title="AppBar"
      description="Top navigation bar with standard centered title, iOS large heading, floating mode, and circular action wells."
    >
      <DemoSection
        title="Standard Navigation Bar"
        description="Centered title, circular back button well, and action buttons."
        bare
      >
        <Card className="overflow-hidden border border-border">
          <AppBar
            safeArea={false}
            title="Account Settings"
            subtitle="Manage your profile and teams"
            onBack={() => toast.info('Navigating back')}
            trailing={
              <>
                <AppBarAction onPress={() => toast.info('Search tapped')}>
                  <Search size={20} color={iconColor} />
                </AppBarAction>
                <AppBarAction onPress={() => toast.info('More options tapped')}>
                  <MoreVertical size={20} color={iconColor} />
                </AppBarAction>
              </>
            }
          />
        </Card>
      </DemoSection>

      <DemoSection
        title="iOS Large Title Header"
        description="Prominent 26px bold heading layout for main index views."
        bare
      >
        <Card className="overflow-hidden border border-border">
          <AppBar
            safeArea={false}
            variant="large"
            title="Messages"
            subtitle="12 unread conversations"
            onBack={() => toast.info('Back tapped')}
            trailing={
              <AppBarAction onPress={() => toast.info('Settings tapped')}>
                <Settings size={20} color={iconColor} />
              </AppBarAction>
            }
          />
        </Card>
      </DemoSection>

      <DemoSection
        title="Floating Card App Bar"
        description="Modern floating card island mode."
        bare
      >
        <AppBar
          safeArea={false}
          variant="floating"
          title="Explore Destinations"
          subtitle="San Francisco, CA"
          onBack={() => toast.info('Back tapped')}
          trailing={
            <AppBarAction onPress={() => toast.info('Share tapped')}>
              <Share size={18} color={iconColor} />
            </AppBarAction>
          }
        />
      </DemoSection>

      <DemoSection
        title="Brand Primary Theme"
        description="Solid primary background with inverse typography."
        bare
      >
        <Card className="overflow-hidden border border-border">
          <AppBar
            safeArea={false}
            className="bg-primary border-primary"
            title="Project Dashboard"
            subtitle="v2.4.0 Live"
            onBack={() => toast.info('Back tapped')}
            trailing={
              <AppBarAction onPress={() => toast.info('Search tapped')}>
                <Search size={20} color={colors.primaryForeground} />
              </AppBarAction>
            }
          />
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
