import { ChatListItem, Divider, Icon } from '@truongdq01/ui';
import { useTokens } from '@truongdq01/headless';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ChatListItemScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="ChatListItem"
      description="Chat rows with avatar, preview, badges, and status."
    >
      <DemoSection title="Standard" description="Unread count and online status." flush>
        <ChatListItem
          name="Truong Dang"
          preview="Hey! How is the component migration going?"
          time="10:45 AM"
          unread={3}
          avatar={{
            initials: 'TD',
            status: 'online',
          }}
          onPress={() => {}}
        />
        <Divider />
        <ChatListItem
          name="Design Team"
          preview="Sarah: Let's check the new glassmorphism effect."
          time="Yesterday"
          outgoing={false}
          avatar={{
            src: 'https://picsum.photos/100/100?random=1',
          }}
          onPress={() => {}}
        />
      </DemoSection>

      <DemoSection title="States" description="Read receipts, muted, and pinned." flush>
        <ChatListItem
          name="James Wilson"
          preview="The PR was approved! 🚀"
          time="Wed"
          read
          outgoing
          avatar={{
            src: 'https://picsum.photos/100/100?random=2',
            status: 'away',
          }}
          onPress={() => {}}
        />
        <Divider />
        <ChatListItem
          name="Company Announcements"
          preview="All hands meeting at 2 PM today."
          time="Mon"
          muted
          pinned
          avatar={{
            initials: 'CA',
            status: 'busy',
          }}
          onPress={() => {}}
        />
      </DemoSection>

      <DemoSection title="Custom Trailing" description="Replace default chevron or badge." flush>
        <ChatListItem
          name="Payment Alert"
          preview="Your subscription will be renewed tomorrow."
          time="Just now"
          unread={1}
          avatar={{
            initials: 'PA',
            status: 'online',
          }}
          trailingElement={
            <Icon name="chevron-right" size={20} color={t.color.text.tertiary} />
          }
          onPress={() => {}}
        />
      </DemoSection>
    </DemoPage>
  );
}
