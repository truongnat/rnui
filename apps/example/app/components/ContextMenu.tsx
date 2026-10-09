import { useState } from 'react';
import { View } from 'react-native';
import { Card } from '@/components/ui/card';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ContextMenuScreen() {
  const { toast } = useToast();
  const [pinned, setPinned] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <DemoPage
      title="ContextMenu"
      description="Temporary menu for additional actions on an element."
    >
      <DemoSection
        title="Card Triggers"
        description="Long-press a card to open the shared menu at its anchor."
      >
        <ContextMenu>
          <View className="flex-row gap-4">
            <ContextMenuTrigger className="flex-1">
              <Card className="items-center justify-center p-6">
                <Icon name="moreVertical" size={24} tone="muted" />
              </Card>
            </ContextMenuTrigger>

            <ContextMenuTrigger className="flex-1">
              <Card className="items-center justify-center p-6">
                <Icon name="image" size={24} tone="muted" />
              </Card>
            </ContextMenuTrigger>
          </View>

          <ContextMenuContent>
            <ContextMenuItem onPress={() => toast.info('Edit Post')}>
              <Icon name="edit" size={18} tone="muted" />
              <Text className="text-sm text-foreground">Edit Post</Text>
            </ContextMenuItem>
            <ContextMenuItem onPress={() => toast.info('Share')}>
              <Icon name="share" size={18} tone="muted" />
              <Text className="text-sm text-foreground">Share</Text>
            </ContextMenuItem>
            <ContextMenuItem onPress={() => toast.info('Download')}>
              <Icon name="download" size={18} tone="muted" />
              <Text className="text-sm text-foreground">Download</Text>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem destructive onPress={() => toast.error('Delete')}>
              <Icon name="trash" size={18} tone="destructive" />
              <Text className="text-sm text-destructive">Delete</Text>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </DemoSection>

      <DemoSection
        title="Icon Trigger"
        description="Long-press the icon — asChild clones the child so it keeps its own press handlers."
      >
        <ContextMenu>
          <ContextMenuTrigger className="self-start p-2">
            <Icon name="moreVertical" size={24} tone="foreground" />
          </ContextMenuTrigger>

          <ContextMenuContent>
            <ContextMenuCheckboxItem
              checked={pinned}
              onCheckedChange={setPinned}
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
      </DemoSection>
    </DemoPage>
  );
}
