import { useRef, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  FadeIn,
  LinearTransition,
  ReduceMotion,
} from 'react-native-reanimated';
import { MessageInput } from '@/components/ui/message-input';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function MessageInputScreen() {
  const [value, setValue] = useState('That time works for me.');
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);
  const sequence = useRef(0);
  const send = (text: string) => {
    sequence.current += 1;
    const message = { id: sequence.current, text };
    setMessages((current) => [...current, message]);
  };
  return (
    <DemoPage
      title="Message Input"
      description="A multiline composer with a clear send state. Send a message to see it appear in the conversation."
    >
      <DemoSection
        title="Conversation"
        description="The uncontrolled composer clears itself after sending."
        flush
      >
        <View className="gap-3 px-4 py-4">
          <View className="self-start rounded-xl bg-muted px-4 py-3">
            <Text className="text-sm leading-6">
              Shall we review the new screens at 10 tomorrow?
            </Text>
          </View>
          {messages.map((message) => (
            <Animated.View
              key={message.id}
              entering={FadeIn.duration(180).reduceMotion(ReduceMotion.System)}
              layout={LinearTransition.duration(200).reduceMotion(
                ReduceMotion.System
              )}
              className="max-w-full self-end rounded-xl bg-primary px-4 py-3"
            >
              <Text className="text-sm leading-6 text-primary-foreground">
                {message.text}
              </Text>
            </Animated.View>
          ))}
          <Text variant="muted" accessibilityLiveRegion="polite">
            {messages.length === 0
              ? 'Your reply will appear here.'
              : `${messages.length} ${messages.length === 1 ? 'message' : 'messages'} sent`}
          </Text>
        </View>
        <MessageInput placeholder="Reply to Maya…" onSend={send} />
      </DemoSection>
      <DemoSection
        title="Controlled draft"
        description="The screen owns the draft. Send clears it explicitly, and the same conversation receives your reply."
      >
        <MessageInput
          value={value}
          onChange={setValue}
          onSend={(text) => {
            send(text);
            setValue('');
          }}
          placeholder="Write a reply…"
          className="rounded-lg border border-border"
        />
        <Text variant="muted" className="mt-3">
          Whitespace-only drafts cannot be sent. Return sends; the composer
          grows for longer replies.
        </Text>
      </DemoSection>
    </DemoPage>
  );
}
