/**
 * RNUI reference: list + detail pattern
 * Components are registry files copied into the app under components/ui/.
 */
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { AppBar, AppBarTitle } from '@/components/ui/app-bar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateTitle,
} from '@/components/ui/empty-state';
import { List } from '@/components/ui/list';
import { ListItem } from '@/components/ui/list-item';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';

type Message = {
  id: string;
  name: string;
  preview: string;
  initials: string;
};

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    name: 'Mai Tran',
    preview: 'Can you review the new onboarding flow?',
    initials: 'MT',
  },
  {
    id: '2',
    name: 'Quan Le',
    preview: 'The build is green — ready to ship.',
    initials: 'QL',
  },
  {
    id: '3',
    name: 'Linh Pham',
    preview: 'Updated the design tokens doc.',
    initials: 'LP',
  },
];

function MessageListScreen({
  items,
  onSelect,
}: {
  items: Message[];
  onSelect: (item: Message) => void;
}) {
  if (items.length === 0) {
    return (
      <EmptyState>
        <EmptyStateTitle>No messages</EmptyStateTitle>
        <EmptyStateDescription>
          When you receive messages they will appear here.
        </EmptyStateDescription>
        <EmptyStateAction>
          <Button variant="outline" onPress={() => {}}>
            Refresh
          </Button>
        </EmptyStateAction>
      </EmptyState>
    );
  }

  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.id}
          onPress={() => onSelect(item)}
          title={item.name}
          subtitle={item.preview}
          leading={
            <Avatar>
              <AvatarFallback>{item.initials}</AvatarFallback>
            </Avatar>
          }
        />
      ))}
    </List>
  );
}

function MessageDetailScreen({
  item,
  onBack,
}: {
  item: Message;
  onBack: () => void;
}) {
  return (
    <ScrollView>
      <Stack spacing="lg" className="p-4">
        <Stack direction="row" spacing="md" alignItems="center">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{item.initials}</AvatarFallback>
          </Avatar>
          <Stack spacing="xs">
            <Text variant="large">{item.name}</Text>
            <Text variant="muted">Message thread</Text>
          </Stack>
        </Stack>
        <Card>
          <CardContent className="p-4">
            <Text variant="p">{item.preview}</Text>
            <Text variant="muted" className="mt-2">
              Full message body would appear here in a real app.
            </Text>
          </CardContent>
        </Card>
        <Button onPress={() => {}}>Reply</Button>
        <Button variant="ghost" onPress={onBack}>
          Back to list
        </Button>
      </Stack>
    </ScrollView>
  );
}

export default function ListDetailScreenExample() {
  const [selected, setSelected] = useState<Message | null>(null);

  return (
    <View className="flex-1">
      <AppBar onBack={selected ? () => setSelected(null) : undefined}>
        <AppBarTitle>{selected ? selected.name : 'Inbox'}</AppBarTitle>
      </AppBar>

      {selected ? (
        <MessageDetailScreen item={selected} onBack={() => setSelected(null)} />
      ) : (
        <MessageListScreen items={MOCK_MESSAGES} onSelect={setSelected} />
      )}
    </View>
  );
}
