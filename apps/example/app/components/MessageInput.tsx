import { useState } from 'react';
import { Alert, View } from 'react-native';
import { MessageInput } from '@/components/ui/message-input';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function MessageInputScreen() {
  const [value, setValue] = useState('');

  const handleSend = (text: string) => {
    Alert.alert('Sent', text);
  };

  return (
    <DemoPage
      title="MessageInput"
      description="Chat input with a multiline field and a send button."
    >
      <DemoSection
        title="Basic"
        description="Uncontrolled input — clears itself after send."
      >
        <MessageInput onSend={handleSend} />
      </DemoSection>

      <DemoSection
        title="Controlled"
        description="Controlled value with an explicit onChange handler."
      >
        <MessageInput
          value={value}
          onChange={setValue}
          placeholder="Controlled input…"
          onSend={(text) => {
            handleSend(text);
            setValue('');
          }}
        />
      </DemoSection>

      <DemoSection
        title="Custom Styling"
        description="Override className to restyle the container."
      >
        <MessageInput
          placeholder="Rounded card style…"
          className="rounded-xl border bg-muted"
          onSend={handleSend}
        />
      </DemoSection>

      <DemoSection
        title="Inside a Surface"
        description="The row composes inside any container."
      >
        <View className="rounded-xl bg-muted p-2">
          <MessageInput
            placeholder="Send a message…"
            className="border-0 bg-transparent px-1 py-0"
            onSend={handleSend}
          />
        </View>
      </DemoSection>
    </DemoPage>
  );
}
