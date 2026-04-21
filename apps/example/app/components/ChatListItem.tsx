import React from 'react';
import { ChatListItem, Typography, Divider, Icon } from '@truongdq01/ui';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { useTokens } from '@truongdq01/headless';

export default function ChatListItemScreen() {
  const t = useTokens();

  return (
    <DemoPage
      title="ChatListItem"
      description="A specialized list item for chat applications, including avatar, status, and message previews."
    >
      <DemoSection title="Standard Examples">
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

      <DemoSection title="States & Badges">
        <ChatListItem
          name="James Wilson"
          preview="The PR was approved! 🚀"
          time="Wed"
          read={true}
          outgoing={true}
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
          muted={true}
          pinned={true}
          avatar={{
            initials: 'CA',
            status: 'busy',
          }}
          onPress={() => {}}
        />
      </DemoSection>

      <DemoSection title="Custom Trailing Element">
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

const styles = StyleSheet.create({});
