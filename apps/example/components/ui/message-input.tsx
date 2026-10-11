import { useState } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { SendHorizontal } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
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
  const canSend = text.trim().length > 0;
  const reducedMotion = useReducedMotion();
  const scale = useSharedValue(1);
  const sendStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

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
        accessibilityLabel={placeholder}
        multiline
        className="min-h-11 max-h-32 flex-1"
        onSubmitEditing={send}
        returnKeyType="send"
        submitBehavior="submit"
      />
      <Animated.View style={sendStyle}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send message"
          accessibilityState={{ disabled: !canSend }}
          disabled={!canSend}
          onPress={send}
          onPressIn={() => {
            scale.value = withTiming(0.92, {
              duration: reducedMotion ? 0 : 100,
            });
          }}
          onPressOut={() => {
            scale.value = withTiming(1, { duration: reducedMotion ? 0 : 150 });
          }}
          className="h-11 w-11 items-center justify-center rounded-full bg-primary"
          style={{ opacity: canSend ? 1 : 0.4 }}
        >
          <SendHorizontal size={20} color={iconColor} />
        </Pressable>
      </Animated.View>
    </View>
  );
}
