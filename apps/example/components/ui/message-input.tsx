import { useState } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { SendHorizontal } from 'lucide-react-native';
import { Input } from '@/components/ui/input';
import { cn, useIconColor } from '@/lib/utils';

export interface MessageInputProps extends ViewProps {
  value?: string;
  onChange?: (text: string) => void;
  /** Called with the current text; clears the input when uncontrolled. */
  onSend?: (text: string) => void;
  placeholder?: string;
  className?: string;
}

export function MessageInput({
  value,
  onChange,
  onSend,
  placeholder = 'Message…',
  className,
  ...props
}: MessageInputProps) {
  const [inner, setInner] = useState('');
  const text = value ?? inner;
  const setText = (t: string) => {
    if (value === undefined) setInner(t);
    onChange?.(t);
  };
  const send = () => {
    const t = text.trim();
    if (!t) return;
    onSend?.(t);
    if (value === undefined) setInner('');
  };
  const iconColor = useIconColor('onPrimary');

  return (
    <View
      className={cn(
        'flex-row items-end gap-2 border-t border-border bg-background px-3 py-2',
        className
      )}
      {...props}
    >
      <Input
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        multiline
        className="max-h-32 flex-1"
        onSubmitEditing={send}
        returnKeyType="send"
        blurOnSubmit={false}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Send"
        onPress={send}
        className={cn(
          'mb-0.5 h-10 w-10 items-center justify-center rounded-full bg-primary active:opacity-80',
          !text.trim() && 'opacity-50'
        )}
      >
        <SendHorizontal size={18} color={iconColor} />
      </Pressable>
    </View>
  );
}
