import React, { useRef, useState } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Pressable,
  StyleSheet,
  type TextInputProps,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {
  useTokens,
  useComponentTokens,
  useIconStyle,
} from '@truongdq01/headless';

// ─── Types ────────────────────────────────────────────────────────

export interface MessageInputProps extends Omit<TextInputProps, 'style'> {
  /** Left action buttons (attach, sticker, etc.) */
  leftActions?: React.ReactNode;
  /** Right action buttons (send, voice, etc.) */
  rightActions?: React.ReactNode;
  /** Show attachment button */
  showAttach?: boolean;
  /** Show sticker button */
  showSticker?: boolean;
  /** Show send button */
  showSend?: boolean;
  /** Callback when send button pressed */
  onSend?: (text: string) => void;
  /** Callback when attachment button pressed */
  onAttach?: () => void;
  /** Callback when sticker button pressed */
  onSticker?: () => void;
  /** Custom send button */
  sendButton?: React.ReactNode;
  /** Glass effect background */
  glassEffect?: boolean;
  /** Disable input */
  disabled?: boolean;
}

// ─── Message Input ────────────────────────────────────────────────

export function MessageInput({
  leftActions,
  rightActions,
  showAttach = true,
  showSticker = true,
  showSend = true,
  onSend,
  onAttach,
  onSticker,
  sendButton,
  glassEffect = true,
  disabled = false,
  value,
  onChangeText,
  placeholder = 'Type a message...',
  ...rest
}: MessageInputProps) {
  const tokens = useTokens();
  const { input } = useComponentTokens();
  const { size: iconSize } = useIconStyle('input');
  const inputRef = useRef<RNTextInput>(null);
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState(value ?? '');

  const height = useSharedValue(48);
  const attachVisible = useSharedValue(1);

  const hasText = text.length > 0;

  React.useEffect(() => {
    attachVisible.value = withTiming(hasText ? 0 : 1, { duration: 180 });
  }, [hasText]);

  const inputStyle = useAnimatedStyle(() => ({
    minHeight: height.value,
  }));

  const attachStyle = useAnimatedStyle(() => ({
    opacity: attachVisible.value,
    transform: [{ scale: attachVisible.value }],
    width: attachVisible.value > 0.5 ? 40 : 0,
  }));

  const handleSend = () => {
    if (text.trim() && onSend) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleChangeText = (newText: string) => {
    setText(newText);
    onChangeText?.(newText);
  };

  return (
    <View
      style={[
        styles.container,
        glassEffect && {
          backgroundColor: tokens.color.surface.glass,
          borderTopColor: tokens.color.surface.glassBorder,
          borderTopWidth: 0.5,
        },
        !glassEffect && {
          backgroundColor: tokens.color.surface.default,
          borderTopColor: tokens.color.border.subtle,
          borderTopWidth: 1,
        },
      ]}
    >
      {showAttach && (
        <Animated.View style={attachStyle}>
          <Pressable
            style={styles.actionButton}
            onPress={onAttach}
            disabled={disabled}
            hitSlop={8}
          >
            <View
              style={[styles.iconButton, { opacity: disabled ? 0.3 : 0.7 }]}
            >
              <Text style={styles.icon}>📎</Text>
            </View>
          </Pressable>
        </Animated.View>
      )}

      {leftActions}

      <Animated.View style={[styles.inputWrapper, inputStyle]}>
        <RNTextInput
          ref={inputRef}
          style={[
            styles.input,
            { color: tokens.color.text.primary },
            focused && { borderColor: tokens.color.border.focus },
          ]}
          placeholder={placeholder}
          placeholderTextColor={tokens.color.text.tertiary}
          editable={!disabled}
          value={text}
          onChangeText={handleChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          multiline
          textAlignVertical="center"
          {...rest}
        />

        {showSticker && (
          <Pressable
            style={styles.stickerButton}
            onPress={onSticker}
            disabled={disabled}
            hitSlop={8}
          >
            <Text style={[styles.icon, { opacity: disabled ? 0.3 : 0.7 }]}>
              😊
            </Text>
          </Pressable>
        )}
      </Animated.View>

      {rightActions}

      {showSend &&
        (sendButton ?? (
          <Pressable
            style={[
              styles.sendButton,
              hasText && { backgroundColor: tokens.color.brand.default },
              disabled && { opacity: 0.3 },
            ]}
            onPress={handleSend}
            disabled={disabled || !hasText}
            hitSlop={8}
          >
            <Text style={[styles.sendIcon, hasText && { color: '#FFFFFF' }]}>
              {hasText ? '➤' : '🎤'}
            </Text>
          </Pressable>
        ))}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 8,
    minHeight: 56,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(0,0,0,0.03)',
    overflow: 'hidden',
    minHeight: 40,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingRight: 40,
    maxHeight: 120,
  },
  stickerButton: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  icon: {
    fontSize: 20,
  },
  sendIcon: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.3)',
  },
});
