/**
 * RNUI reference: list + detail pattern
 */
import { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  AppBar,
  AppBarTitle,
  Avatar,
  Box,
  Button,
  Card,
  EmptyState,
  List,
  ListItem,
  Stack,
  Toolbar,
  Typography,
} from '@truongdq01/ui';

type Message = {
  id: string;
  name: string;
  preview: string;
  initials: string;
};

const MOCK_MESSAGES: Message[] = [
  { id: '1', name: 'Design team', preview: 'Updated the component specs.', initials: 'DT' },
  { id: '2', name: 'Support', preview: 'Your ticket has been resolved.', initials: 'SU' },
  { id: '3', name: 'Billing', preview: 'Invoice ready for March.', initials: 'BI' },
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
      <EmptyState
        title="No messages"
        description="When you receive messages they will appear here."
        variant="empty"
        action={<Button label="Refresh" variant="outline" onPress={() => {}} />}
      />
    );
  }

  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.id}
          onPress={() => onSelect(item)}
          label={item.name}
        >
          <Stack spacing="xs" style={{ flex: 1 }}>
            <Typography variant="subtitle2">{item.name}</Typography>
            <Typography variant="body2" color="secondary" numberOfLines={1}>
              {item.preview}
            </Typography>
          </Stack>
        </ListItem>
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
      <Stack spacing="lg" style={{ padding: 16 }}>
        <Stack direction="row" spacing="md" alignItems="center">
          <Avatar initials={item.initials} size="lg" />
          <Stack spacing="xs">
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="caption" color="secondary">
              Message thread
            </Typography>
          </Stack>
        </Stack>
        <Card padding="md">
          <Typography variant="body1">{item.preview}</Typography>
          <Typography variant="body2" color="secondary" style={{ marginTop: 8 }}>
            Full message body would appear here in a real app.
          </Typography>
        </Card>
        <Button label="Reply" onPress={() => {}} />
        <Button label="Back to list" variant="ghost" onPress={onBack} />
      </Stack>
    </ScrollView>
  );
}

export default function ListDetailScreenExample() {
  const [selected, setSelected] = useState<Message | null>(null);

  return (
    <Box flex={1}>
      <AppBar>
        <Toolbar>
          <AppBarTitle>{selected ? selected.name : 'Inbox'}</AppBarTitle>
        </Toolbar>
      </AppBar>

      {selected ? (
        <MessageDetailScreen item={selected} onBack={() => setSelected(null)} />
      ) : (
        <MessageListScreen items={MOCK_MESSAGES} onSelect={setSelected} />
      )}
    </Box>
  );
}
