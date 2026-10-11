import { useState } from 'react';
import { Platform, View } from 'react-native';
import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { useIconColor } from '@/lib/utils';

const CONTENT_ITEMS = ['Post', 'Photo'] as const;
const ACTIONS_ICON = Platform.OS === 'ios' ? 'moreHorizontal' : 'moreVertical';

function ObjectActions({
  target,
  variant,
}: {
  target: (typeof CONTENT_ITEMS)[number];
  variant: 'context' | 'dropdown';
}) {
  const { toast } = useToast();
  const destructiveColor = useIconColor('destructive');
  const Item = variant === 'context' ? ContextMenuItem : DropdownMenuItem;
  const Label = variant === 'context' ? ContextMenuLabel : DropdownMenuLabel;
  const Separator =
    variant === 'context' ? ContextMenuSeparator : DropdownMenuSeparator;

  return (
    <>
      <Label>{target} actions</Label>
      <Item className="min-h-14" onPress={() => toast.info(`Edit ${target}`)}>
        <Icon name="edit" size={18} tone="muted" />
        <Text className="text-sm text-popover-foreground">Edit {target}</Text>
      </Item>
      <Item className="min-h-14" onPress={() => toast.info(`Share ${target}`)}>
        <Icon name="share" size={18} tone="muted" />
        <Text className="text-sm text-popover-foreground">Share</Text>
      </Item>
      <Item
        className="min-h-14"
        onPress={() => toast.info(`Download ${target}`)}
      >
        <Icon name="download" size={18} tone="muted" />
        <Text className="text-sm text-popover-foreground">Download</Text>
      </Item>
      <Separator />
      <Item
        destructive
        className="min-h-14"
        onPress={() => toast.error(`Delete ${target}`)}
      >
        <Icon name="trash" size={18} tone="destructive" />
        <Text className="text-sm" style={{ color: destructiveColor }}>
          Delete
        </Text>
      </Item>
    </>
  );
}

export default function ContextMenuScreen() {
  const { toast } = useToast();
  const destructiveColor = useIconColor('destructive');
  const [pinned, setPinned] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const changePinned = (checked: boolean) => {
    setPinned(checked);
    toast.info('Pin preference changed');
  };

  return (
    <DemoPage
      title="ContextMenu"
      description="Custom long-press menus for secondary item actions, not OS-native context menus."
    >
      <DemoSection
        title="Item Actions"
        description="Touch and hold an item, or tap its actions button for the same choices."
      >
        <View className="gap-3">
          {CONTENT_ITEMS.map((target) => (
            <View key={target} className="flex-row items-center gap-2">
              <ContextMenu>
                <ContextMenuTrigger
                  asChild
                  className="flex-1"
                  accessibilityLabel={`${target} item`}
                >
                  <Button
                    variant="ghost"
                    className="min-h-14 justify-start"
                    onPress={() =>
                      toast.info(`Normal ${target.toLowerCase()} action`)
                    }
                  >
                    <Icon
                      name={target === 'Post' ? 'file' : 'image'}
                      size={24}
                      tone="muted"
                    />
                    <Text variant="small">{target}</Text>
                  </Button>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ObjectActions target={target} variant="context" />
                </ContextMenuContent>
              </ContextMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    className="min-h-14 min-w-14"
                    accessibilityLabel={`${target} actions`}
                  >
                    <Icon name={ACTIONS_ICON} size={24} tone="foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="shadow-md">
                  <ObjectActions target={target} variant="dropdown" />
                </DropdownMenuContent>
              </DropdownMenu>
            </View>
          ))}
        </View>
      </DemoSection>

      <DemoSection
        title="Item Preferences"
        description="Tap the item for its primary action. Hold it, or tap the actions button, for preferences."
      >
        <View className="flex-row items-center gap-2">
          <ContextMenu>
            <ContextMenuTrigger
              asChild
              className="flex-1"
              accessibilityLabel="Item"
            >
              <Button
                variant="ghost"
                className="min-h-14 justify-start"
                onPress={() => toast.info('Normal item action')}
              >
                <Icon name="file" size={24} tone="muted" />
                <Text variant="small">Item</Text>
              </Button>
            </ContextMenuTrigger>

            <ContextMenuContent>
              <ContextMenuLabel>Item preferences</ContextMenuLabel>
              <ContextMenuCheckboxItem
                checked={pinned}
                onCheckedChange={changePinned}
                closeOnPress={false}
              >
                Pinned to Top
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem
                checked={notifications}
                onCheckedChange={setNotifications}
              >
                Enable Notifications
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuItem
                destructive
                onPress={() => toast.error('Remove item')}
              >
                Remove Item
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className="min-h-14 min-w-14"
                accessibilityLabel="Item preferences"
              >
                <Icon name={ACTIONS_ICON} size={24} tone="foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="shadow-md">
              <DropdownMenuLabel>Item preferences</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={pinned}
                onCheckedChange={changePinned}
                closeOnPress={false}
                className="min-h-14"
              >
                Pinned to Top
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={notifications}
                onCheckedChange={setNotifications}
                className="min-h-14"
              >
                Enable Notifications
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                destructive
                className="min-h-14"
                onPress={() => toast.error('Remove item')}
              >
                <Text className="text-sm" style={{ color: destructiveColor }}>
                  Remove Item
                </Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </View>
        <Text variant="muted" className="mt-3" accessibilityLiveRegion="polite">
          Pinned: {pinned ? 'On' : 'Off'}. Notifications:{' '}
          {notifications ? 'On' : 'Off'}.
        </Text>
      </DemoSection>
    </DemoPage>
  );
}
