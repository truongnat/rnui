import { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  type ViewProps,
} from 'react-native';
import { Check, Copy } from 'lucide-react-native';
import { cn, useIconColor } from '@/lib/utils';

// Optional peer: expo-clipboard gives native copy support.
// Expo: npx expo install expo-clipboard
interface ExpoClipboardModule {
  setStringAsync?: (s: string) => Promise<void>;
}
let expoClipboard: ExpoClipboardModule | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  expoClipboard = require('expo-clipboard');
} catch {
  // expo-clipboard not installed — fall back to navigator.clipboard / RN core
}

interface WebNavigatorClipboard {
  clipboard?: { writeText: (s: string) => Promise<void> };
}

function copyToClipboard(text: string): void {
  if (expoClipboard?.setStringAsync) {
    void expoClipboard.setStringAsync(text);
    return;
  }
  const nav: WebNavigatorClipboard | undefined =
    typeof globalThis === 'object' && 'navigator' in globalThis
      ? (globalThis.navigator as WebNavigatorClipboard) // RN web shim; shape checked by property access below
      : undefined;
  if (nav?.clipboard) {
    void nav.clipboard.writeText(text).catch(() => {});
    return;
  }
  try {
    // Deprecated RN core Clipboard — last resort.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('react-native').Clipboard?.setString(text);
  } catch {
    // No clipboard implementation available.
  }
}

export interface CodeBlockProps extends ViewProps {
  /** Source text to render. */
  code: string;
  /** Cosmetic language badge shown in the header. */
  language?: string;
  /** Header title (e.g. file name). */
  title?: string;
  /** Show the copy button. */
  showCopyButton?: boolean;
  /** Cap the scrollable code area. */
  maxHeight?: number;
  /** Called after a copy attempt. */
  onCopy?: () => void;
  className?: string;
  /** Extra classes for the code text. */
  codeClassName?: string;
}

/**
 * Monospace code container with a copy button and optional title bar.
 * `language` is purely cosmetic — no syntax highlighting.
 */
export function CodeBlock({
  code,
  language,
  title,
  showCopyButton = true,
  maxHeight,
  onCopy,
  className,
  codeClassName,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const iconColor = useIconColor('muted');

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = () => {
    if (!code) return;
    copyToClipboard(code);
    setCopied(true);
    onCopy?.();
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  const copyButton = showCopyButton ? (
    <Pressable
      onPress={handleCopy}
      accessibilityRole="button"
      accessibilityLabel={copied ? 'Copied' : 'Copy code'}
      hitSlop={8}
      className="flex-row items-center gap-1 opacity-80 active:opacity-60"
    >
      {copied ? (
        <Check size={16} color={iconColor} />
      ) : (
        <Copy size={16} color={iconColor} />
      )}
      {copied ? (
        <Text className="text-xs text-muted-foreground">Copied!</Text>
      ) : null}
    </Pressable>
  ) : null;

  const hasHeader = !!title || !!language;

  return (
    <View
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-muted',
        className
      )}
      {...props}
    >
      {hasHeader ? (
        <View className="flex-row items-center gap-2 border-b border-border bg-muted-foreground/10 px-3 py-2">
          {title ? (
            <Text
              numberOfLines={1}
              className="flex-1 text-xs font-medium text-foreground"
            >
              {title}
            </Text>
          ) : (
            <View className="flex-1" />
          )}
          {language ? (
            <Text className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground">
              {language}
            </Text>
          ) : null}
          {copyButton}
        </View>
      ) : null}
      <ScrollView
        style={maxHeight ? { maxHeight } : undefined}
        showsVerticalScrollIndicator
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Text
            className={cn(
              'p-4 font-mono text-xs leading-5 text-foreground',
              codeClassName
            )}
            selectable
          >
            {code}
          </Text>
        </ScrollView>
      </ScrollView>
      {!hasHeader && copyButton ? (
        <View className="absolute right-3 top-3">{copyButton}</View>
      ) : null}
    </View>
  );
}
