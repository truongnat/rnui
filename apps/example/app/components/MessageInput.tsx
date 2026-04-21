import { useTokens } from '@truongdq01/headless';
import { Button, MessageInput, Stack, Typography } from '@truongdq01/ui';
import { Camera, Mic, Smile } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function MessageInputScreen() {
  const t = useTokens();
  const [value, setValue] = useState('');

  const handleSend = (text: string) => {
    Alert.alert('Sent', text);
  };

  return (
    <DemoPage
      title="MessageInput"
      description="A rich text input component designed for chat interfaces with support for actions, glass effects, and auto-expanding height."
    >
      <DemoSection title="Basic Component">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          The default MessageInput with attachment and emoji buttons.
        </Typography>
        <MessageInput
          value={value}
          onChangeText={setValue}
          onSend={handleSend}
          onAttach={() => Alert.alert('Attach pressed')}
          onSticker={() => Alert.alert('Sticker pressed')}
        />
      </DemoSection>

      <DemoSection title="Custom Actions">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Add custom actions to the left or right of the input area.
        </Typography>
        <MessageInput
          placeholder="With custom buttons..."
          leftActions={
            <Button
              variant="ghost"
              style={{ width: 40, height: 40 }}
              leadingIcon={<Camera size={20} color={t.color.text.secondary} />}
            />
          }
          rightActions={
            <Button
              variant="ghost"
              style={{ width: 40, height: 40 }}
              leadingIcon={<Mic size={20} color={t.color.text.secondary} />}
            />
          }
          onSend={handleSend}
        />
      </DemoSection>

      <DemoSection title="No Glass Effect">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Disable the glass background for a more solid, standard appearance.
        </Typography>
        <View style={{ padding: t.spacing[2], backgroundColor: t.color.bg.muted, borderRadius: t.radius.lg }}>
          <MessageInput
            glassEffect={false}
            placeholder="Flat background style..."
            onSend={handleSend}
          />
        </View>
      </DemoSection>

      <DemoSection title="States">
        <Stack spacing="lg">
          <View>
            <Typography variant="overline" style={{ marginBottom: t.spacing[2] }}>Disabled</Typography>
            <MessageInput
              disabled
              placeholder="Cannot type here..."
              value="This input is disabled"
            />
          </View>
          
          <View>
            <Typography variant="overline" style={{ marginBottom: t.spacing[2] }}>Custom Send Button</Typography>
            <MessageInput
              placeholder="Custom button style..."
              sendButton={
                <Button 
                  label="SEND" 
                  size="sm" 
                  style={{ marginLeft: 8 }} 
                  onPress={() => Alert.alert('Custom Send')}
                />
              }
            />
          </View>
        </Stack>
      </DemoSection>

      <DemoSection title="Minimal Appearance">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Hide default actions for a cleaner look.
        </Typography>
        <MessageInput
          showAttach={false}
          showSticker={false}
          placeholder="Simple input..."
          onSend={handleSend}
        />
      </DemoSection>
    </DemoPage>
  );
}
