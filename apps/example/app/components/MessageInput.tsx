import { useTokens } from '@truongdq01/headless';
import { Button, MessageInput, Stack } from '@truongdq01/ui';
import { Camera, Mic } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, View } from 'react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function MessageInputScreen() {
  const t = useTokens();
  const [value, setValue] = useState('');

  const handleSend = (text: string) => {
    Alert.alert('Sent', text);
  };

  return (
    <DemoPage
      title="MessageInput"
      description="Chat input with attachments, glass effects, and auto-expanding height."
    >
      <DemoSection title="Basic" description="Default input with attach and emoji buttons.">
        <MessageInput
          value={value}
          onChangeText={setValue}
          onSend={handleSend}
          onAttach={() => Alert.alert('Attach pressed')}
          onSticker={() => Alert.alert('Sticker pressed')}
        />
      </DemoSection>

      <DemoSection title="Custom Actions" description="Left and right action slots.">
        <MessageInput
          placeholder="With custom buttons…"
          leftActions={
            <Button
              variant="ghost"
              style={{ width: t.spacing[10], height: t.spacing[10] }}
              leadingIcon={<Camera size={20} color={t.color.text.secondary} />}
            />
          }
          rightActions={
            <Button
              variant="ghost"
              style={{ width: t.spacing[10], height: t.spacing[10] }}
              leadingIcon={<Mic size={20} color={t.color.text.secondary} />}
            />
          }
          onSend={handleSend}
        />
      </DemoSection>

      <DemoSection title="Flat Background" description="Disable glass for a solid appearance.">
        <View
          style={{
            padding: t.spacing[2],
            backgroundColor: t.color.bg.muted,
            borderRadius: t.radius.lg,
          }}
        >
          <MessageInput
            glassEffect={false}
            placeholder="Flat background style…"
            onSend={handleSend}
          />
        </View>
      </DemoSection>

      <DemoSection title="States">
        <Stack spacing="lg">
          <MessageInput
            disabled
            placeholder="Cannot type here…"
            value="This input is disabled"
          />
          <MessageInput
            placeholder="Custom send button…"
            sendButton={
              <Button
                label="SEND"
                size="sm"
                style={{ marginLeft: t.spacing[2] }}
                onPress={() => Alert.alert('Custom Send')}
              />
            }
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Minimal" description="Hide default attach and sticker actions.">
        <MessageInput
          showAttach={false}
          showSticker={false}
          placeholder="Simple input…"
          onSend={handleSend}
        />
      </DemoSection>
    </DemoPage>
  );
}
