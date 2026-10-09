import { ChevronLeft, Menu, MoreVertical, Search } from 'lucide-react-native';
import { AppBar, AppBarSubtitle, AppBarTitle } from '@/components/ui/app-bar';
import { IconButton } from '@/components/ui/icon-button';
import { Stack } from '@/components/ui/stack';
import { useIconColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function AppBarScreen() {
  const iconColor = useIconColor('foreground');
  const inverseIconColor = useIconColor('onPrimary');

  return (
    <DemoPage
      title="AppBar"
      description="Top bar with navigation, title, and screen actions."
    >
      <DemoSection
        title="Basic"
        description="Leading navigation and trailing actions."
      >
        <AppBar
          className="overflow-hidden rounded-xl"
          leading={
            <IconButton
              variant="ghost"
              icon={<Menu size={22} color={iconColor} />}
              accessibilityLabel="Open menu"
            />
          }
          trailing={
            <>
              <IconButton
                variant="ghost"
                icon={<Search size={22} color={iconColor} />}
                accessibilityLabel="Search"
              />
              <IconButton
                variant="ghost"
                icon={<MoreVertical size={22} color={iconColor} />}
                accessibilityLabel="More actions"
              />
            </>
          }
        >
          <AppBarTitle>Page Title</AppBarTitle>
        </AppBar>
      </DemoSection>

      <DemoSection title="With Subtitle">
        <AppBar className="overflow-hidden rounded-xl" onBack={() => {}}>
          <AppBarTitle>Main Title</AppBarTitle>
          <AppBarSubtitle>Subtitle or secondary info</AppBarSubtitle>
        </AppBar>
      </DemoSection>

      <DemoSection
        title="Brand"
        description="Inverse text on brand backgrounds."
      >
        <AppBar
          className="overflow-hidden rounded-xl bg-primary"
          leading={
            <IconButton
              variant="ghost"
              icon={<ChevronLeft size={22} color={inverseIconColor} />}
              accessibilityLabel="Go back"
            />
          }
          trailing={
            <IconButton
              variant="ghost"
              icon={<Search size={22} color={inverseIconColor} />}
              accessibilityLabel="Search"
            />
          }
        >
          <AppBarTitle className="text-primary-foreground">
            Brand Identity
          </AppBarTitle>
          <AppBarSubtitle className="text-primary-foreground opacity-70">
            In the cloud
          </AppBarSubtitle>
        </AppBar>
      </DemoSection>

      <DemoSection title="Variants">
        <Stack spacing="lg">
          <AppBar className="overflow-hidden rounded-xl border">
            <AppBarTitle>Bordered App Bar</AppBarTitle>
          </AppBar>
          <AppBar
            className="border-transparent bg-transparent"
            trailing={
              <IconButton
                variant="ghost"
                icon={<MoreVertical size={22} color={iconColor} />}
                accessibilityLabel="More actions"
              />
            }
          >
            <AppBarTitle>Transparent App Bar</AppBarTitle>
          </AppBar>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
