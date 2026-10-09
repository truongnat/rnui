import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Icon, type IconName } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { useThemeColor } from '@/lib/utils';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

const TOOLBAR_ACTIONS: {
  icon: IconName;
  label: string;
  message: string;
}[] = [
  { icon: 'search', label: 'Search', message: 'Search opened' },
  { icon: 'share', label: 'Share board', message: 'Share sheet opened' },
  { icon: 'settings', label: 'Open settings', message: 'Settings opened' },
  {
    icon: 'moreVertical',
    label: 'More actions',
    message: 'More actions opened',
  },
];

export default function IconButtonScreen() {
  const { toast } = useToast();
  const colors = useThemeColor();
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <DemoPage
      title="Icon Button"
      description="Compact actions for toolbars and dense rows where the icon meaning is already clear."
    >
      <DemoSection
        title="Action toolbar"
        description="Ghost is the default for dense surfaces to keep the chrome quiet."
      >
        <Card className="p-4">
          <Stack spacing="md">
            <Stack spacing="xs">
              <Text variant="large">Project board</Text>
              <Text variant="muted">
                Common header actions without a full text button row.
              </Text>
            </Stack>

            <View style={{ alignItems: 'flex-end' }}>
              <Stack direction="row" spacing="sm">
                {TOOLBAR_ACTIONS.map((action) => (
                  <IconButton
                    key={action.label}
                    icon={<Icon name={action.icon} />}
                    accessibilityLabel={action.label}
                    onPress={() => toast.info(action.message)}
                  />
                ))}
              </Stack>
            </View>
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection
        title="Row actions"
        description="Use specific labels because assistive tech only hears the accessible name."
      >
        <Card className="p-4">
          <Stack direction="row" spacing="md" alignItems="center">
            <View style={{ flex: 1 }}>
              <Text variant="small">Summer campaign brief</Text>
              <Text variant="muted">Draft shared with 6 reviewers</Text>
            </View>
            <Stack direction="row" spacing="sm">
              <IconButton
                icon={<Icon name="heart" />}
                accessibilityLabel="Favorite brief"
                onPress={() => toast.success('Saved to favorites')}
              />
              <IconButton
                icon={<Icon name="edit" />}
                accessibilityLabel="Edit brief"
                variant="outline"
                onPress={() => toast.info('Edit mode opened')}
              />
              <IconButton
                icon={<Icon name="trash" color={colors.destructive} />}
                accessibilityLabel="Delete brief"
                onPress={() => toast.error('Delete requested')}
              />
            </Stack>
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection
        title="Sizes and states"
        description="Small for utility rows, medium for headers, large for roomy canvases."
      >
        <Stack spacing="md">
          <DemoPreview>
            <Stack direction="row" spacing="md" alignItems="center" wrap>
              <IconButton
                icon={<Icon name="plus" size="sm" />}
                accessibilityLabel="Add item"
                size="sm"
                onPress={() => toast.info('Small action')}
              />
              <IconButton
                icon={<Icon name="bell" />}
                accessibilityLabel="Notifications"
                size="md"
                onPress={() => toast.info('Medium action')}
              />
              <IconButton
                icon={<Icon name="settings" size="lg" />}
                accessibilityLabel="Workspace settings"
                size="lg"
                onPress={() => toast.info('Large action')}
              />
            </Stack>
          </DemoPreview>

          <Stack direction="row" spacing="sm" alignItems="center">
            <IconButton
              icon={
                isRefreshing ? (
                  <ActivityIndicator size="small" color={colors.foreground} />
                ) : (
                  <Icon name="refresh" />
                )
              }
              accessibilityLabel="Refresh feed"
              disabled={isRefreshing}
              onPress={() => {
                setIsRefreshing(true);
                setTimeout(() => {
                  setIsRefreshing(false);
                  toast.success('Feed refreshed');
                }, 1500);
              }}
            />
            <IconButton
              icon={<Icon name="share" />}
              accessibilityLabel="Share report"
              disabled
            />
          </Stack>

          <Text variant="muted">
            Use a regular Button when the action is not obvious from the icon
            alone.
          </Text>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
