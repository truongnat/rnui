import { useToast } from '@truongdq01/headless';
import { Card, Icon, IconButton, Stack, Typography } from '@truongdq01/ui';
import { useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoPreview, DemoSection } from '@/demo/DemoPage';

const TOOLBAR_ACTIONS = [
  { icon: 'search', label: 'Search', message: 'Search opened' },
  { icon: 'share', label: 'Share board', message: 'Share sheet opened' },
  { icon: 'settings', label: 'Open settings', message: 'Settings opened' },
  {
    icon: 'moreVertical',
    label: 'More actions',
    message: 'More actions opened',
  },
] as const;

export default function IconButtonScreen() {
  const toast = useToast();
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
        <Card>
          <Stack spacing="md">
            <Stack spacing="xs">
              <Typography variant="h5">Project board</Typography>
              <Typography variant="body2" color="secondary">
                Common header actions without a full text button row.
              </Typography>
            </Stack>

            <View style={{ alignItems: 'flex-end' }}>
              <Stack direction="row" spacing="sm">
                {TOOLBAR_ACTIONS.map((action) => (
                  <IconButton
                    key={action.label}
                    icon={<Icon name={action.icon} />}
                    label={action.label}
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
        <Stack spacing="md">
          <Card>
            <Stack direction="row" spacing="md" alignItems="center">
              <View style={{ flex: 1 }}>
                <Typography variant="subtitle2">
                  Summer campaign brief
                </Typography>
                <Typography variant="body2" color="secondary">
                  Draft shared with 6 reviewers
                </Typography>
              </View>
              <Stack direction="row" spacing="sm">
                <IconButton
                  icon={<Icon name="heart" />}
                  label="Favorite brief"
                  onPress={() => toast.success('Saved to favorites')}
                />
                <IconButton
                  icon={<Icon name="edit" />}
                  label="Edit brief"
                  variant="outline"
                  onPress={() => toast.info('Edit mode opened')}
                />
                <IconButton
                  icon={<Icon name="trash" />}
                  label="Delete brief"
                  variant="destructive"
                  onPress={() => toast.error('Delete requested')}
                />
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Sizes and states"
        description="Small for utility rows, medium for headers, large for roomy canvases."
      >
        <Stack spacing="md">
          <DemoPreview>
            <Stack direction="row" spacing="md" alignItems="center" wrap>
              <IconButton
                icon={<Icon name="plus" />}
                label="Add item"
                size="sm"
                onPress={() => toast.info('Small action')}
              />
              <IconButton
                icon={<Icon name="bell" />}
                label="Notifications"
                size="md"
                onPress={() => toast.info('Medium action')}
              />
              <IconButton
                icon={<Icon name="settings" />}
                label="Workspace settings"
                size="lg"
                onPress={() => toast.info('Large action')}
              />
            </Stack>
          </DemoPreview>

          <Stack direction="row" spacing="sm" alignItems="center">
            <IconButton
              icon={<Icon name="refresh" />}
              label="Refresh feed"
              loading={isRefreshing}
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
              label="Share report"
              disabled
            />
          </Stack>

          <Typography variant="caption" color="tertiary">
            Use a regular Button when the action is not obvious from the icon
            alone.
          </Typography>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
