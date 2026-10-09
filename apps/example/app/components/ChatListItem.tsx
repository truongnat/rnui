import { ChatListItem } from '@/components/ui/chat-list-item';
import { Separator } from '@/components/ui/separator';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ChatListItemScreen() {
  return (
    <DemoPage
      title="ChatListItem"
      description="Chat rows with avatar, preview, badges, and status."
    >
      <DemoSection
        title="Standard"
        description="Unread count and online status."
        flush
      >
        <ChatListItem
          name="Truong Dang"
          message="Hey! How is the component migration going?"
          time="10:45 AM"
          unreadCount={3}
          fallback="TD"
          online
          onPress={() => {}}
        />
        <Separator />
        <ChatListItem
          name="Design Team"
          message="Sarah: Let's check the new glassmorphism effect."
          time="Yesterday"
          avatarUrl="https://picsum.photos/100/100?random=1"
          onPress={() => {}}
        />
      </DemoSection>

      <DemoSection
        title="Presence"
        description="Presence dot and fallback initials."
        flush
      >
        <ChatListItem
          name="James Wilson"
          message="The PR was approved! 🚀"
          time="Wed"
          avatarUrl="https://picsum.photos/100/100?random=2"
          online
          presenceClassName="bg-amber-500"
          onPress={() => {}}
        />
        <Separator />
        <ChatListItem
          name="Company Announcements"
          message="All hands meeting at 2 PM today."
          time="Mon"
          fallback="CA"
          online
          presenceClassName="bg-red-500"
          onPress={() => {}}
        />
      </DemoSection>

      <DemoSection
        title="Unread badge"
        description="Counts clamp at 99+."
        flush
      >
        <ChatListItem
          name="Payment Alert"
          message="Your subscription will be renewed tomorrow."
          time="Just now"
          unreadCount={142}
          fallback="PA"
          onPress={() => {}}
        />
      </DemoSection>
    </DemoPage>
  );
}
