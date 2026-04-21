/**
 * Telegram-style section chrome + screen headers for the example app.
 */

import { useComponentTokens, useTokens, useId } from '@truongdq01/headless';
import { Pressable, Typography } from '@truongdq01/ui';
import { Search } from 'lucide-react-native';
import type React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export function SectionHeader({ title }: { title: string }) {
  const t = useTokens();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 4,
      }}
    >
      <Typography variant="overline" color="tertiary" as="span">
        {title}
      </Typography>
      <View
        style={{
          flex: 1,
          height: StyleSheet.hairlineWidth,
          backgroundColor: t.color.border.subtle,
        }}
      />
    </View>
  );
}

type SectionProps = {
  id?: string;
  title: string;
  footer?: string;
  children: React.ReactNode;
  /** When true, children manage their own horizontal padding (e.g. full-width lists). */
  flush?: boolean;
};

/** Borderless grouped card — contrast only, like iOS / Telegram grouped tables. */
export function Section({
  id: idProp,
  title,
  footer,
  children,
  flush = false,
}: SectionProps) {
  const t = useTokens();
  const id = useId(idProp, 'section');
  return (
    <View nativeID={id} style={{ gap: 8 }}>
      <SectionHeader title={title} />
      <View
        style={{
          backgroundColor: t.color.surface.default,
          borderRadius: t.radius.xl,
          overflow: 'hidden',
        }}
      >
        {flush ? (
          children
        ) : (
          <View style={{ padding: t.spacing[4], gap: 10 }}>{children}</View>
        )}
      </View>
      {footer ? (
        <Text
          style={{
            fontSize: t.fontSize.xs,
            color: t.color.text.tertiary,
            lineHeight: 18,
            paddingHorizontal: t.spacing[1],
          }}
        >
          {footer}
        </Text>
      ) : null}
    </View>
  );
}

/** Inset hairline under rows inside a grouped section (Telegram-style). */
export function GroupDivider({ inset = 0 }: { inset?: number }) {
  const t = useTokens();
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: t.color.border.subtle,
        marginLeft: inset,
      }}
    />
  );
}

export function ScreenHeader({
  title,
  leftAction,
  rightAction,
}: {
  title: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
}) {
  const t = useTokens();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: t.spacing[4],
        paddingVertical: 12,
        backgroundColor: t.color.surface.default,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: t.color.border.subtle,
      }}
    >
      <View
        style={{
          minWidth: 72,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        {leftAction}
      </View>
      <Typography
        variant="h6"
        style={{
          flex: 1,
          textAlign: 'center',
          color: t.color.text.primary,
        }}
      >
        {title}
      </Typography>
      <View
        style={{
          minWidth: 72,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        {rightAction}
      </View>
    </View>
  );
}

export function PillHeaderButton({
  label,
  onPress,
}: {
  label: string;
  onPress?: () => void;
}) {
  const t = useTokens();
  return (
    <Pressable
      onPress={onPress}
      feedbackMode="scaleSubtle"
      style={{
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: t.radius.full,
        backgroundColor: t.color.bg.muted,
      }}
    >
      <Text
        style={{
          fontSize: t.fontSize.sm,
          fontWeight: '600',
          color: t.color.text.primary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/** Pill search field (Telegram-style) — custom shell so radius is fully round. */
export function PillSearchBar({
  value,
  onChangeText,
  placeholder = 'Search',
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}) {
  const t = useTokens();
  const { input } = useComponentTokens();
  const { size: iconSize, color: iconColor } = {
    size: 18,
    color: t.color.text.tertiary,
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing[2],
        paddingHorizontal: t.spacing[4],
        minHeight: 44,
        borderRadius: t.radius.full,
        backgroundColor: t.color.surface.raised,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: t.color.border.subtle,
      }}
    >
      <Search size={iconSize} color={iconColor} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={input.text.placeholderColor}
        style={{
          flex: 1,
          paddingVertical: 10,
          fontSize: input.size.md.fontSize,
          color: input.text.color,
        }}
        returnKeyType="search"
      />
    </View>
  );
}

/** Compact unread badge (Telegram-style pill). */
export function UnreadBadge({ count }: { count: number }) {
  const t = useTokens();
  if (count <= 0) return null;
  const label = count > 99 ? '99+' : String(count);
  return (
    <View
      style={{
        minWidth: 22,
        height: 22,
        paddingHorizontal: 6,
        borderRadius: 11,
        backgroundColor: t.color.brand.default,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{ fontSize: 12, fontWeight: '700', color: t.color.text.onBrand }}
      >
        {label}
      </Text>
    </View>
  );
}
