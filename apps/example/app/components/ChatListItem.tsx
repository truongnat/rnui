import { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, ReduceMotion } from 'react-native-reanimated';
import { ChatListItem } from '@/components/ui/chat-list-item';
import { ListSeparator } from '@/components/ui/list-item';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const CONVERSATIONS = [
  {
    name: 'Maya Chen',
    fallback: 'MC',
    message: 'The updated calendar is ready for your review.',
    time: '10:45',
    unread: 3,
    online: true,
  },
  {
    name: 'Design team',
    fallback: 'DT',
    message: 'Alex: Let’s keep the motion subtle and the content easy to scan.',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    name: 'Release updates',
    fallback: 'RU',
    message: 'New builds are available. Read the notes before updating.',
    time: 'Mon',
    unread: 142,
    online: false,
  },
];

export default function ChatListItemScreen() {
  const [read, setRead] = useState<string[]>([]);
  const [opened, setOpened] = useState<string | null>(null);
  return (
    <DemoPage
      title="Chat List Item"
      description="An inbox hierarchy: names first, readable previews next, and compact timestamps and unread counts."
    >
      <DemoSection
        title="Inbox"
        description="Tap a conversation to mark it read. Counts over 99 remain compact."
        flush
      >
        {CONVERSATIONS.map((chat, index) => (
          <View key={chat.name}>
            <ChatListItem
              name={chat.name}
              fallback={chat.fallback}
              message={chat.message}
              time={chat.time}
              unreadCount={read.includes(chat.name) ? 0 : chat.unread}
              online={chat.online}
              onPress={() => {
                setRead((current) =>
                  current.includes(chat.name)
                    ? current
                    : [...current, chat.name]
                );
                setOpened(chat.name);
              }}
            />
            {index < CONVERSATIONS.length - 1 ? (
              <ListSeparator className="ml-16" />
            ) : null}
          </View>
        ))}
        <Animated.View
          key={opened ?? 'unopened'}
          entering={FadeIn.duration(150).reduceMotion(ReduceMotion.System)}
          className="border-t border-border px-4 py-3"
        >
          <Text variant="muted" accessibilityLiveRegion="polite">
            {opened
              ? `${opened} marked as read.`
              : 'Choose a conversation above.'}
          </Text>
        </Animated.View>
      </DemoSection>
      <DemoSection
        title="Read-only preview"
        description="Without an action the row is content, not a button."
        flush
      >
        <ChatListItem
          name="Customer support"
          fallback="CS"
          message="Your request has been received. We’ll reply here when there’s an update."
          time="Tue"
        />
      </DemoSection>
    </DemoPage>
  );
}
