/**
 * Example app chrome — list screen header and search (not part of @truongdq01/ui).
 */

import { useComponentTokens, useTheme, useTokens } from '@truongdq01/headless';
import { Typography } from '@truongdq01/ui';
import { Search } from 'lucide-react-native';
import type React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ScreenHeader({
  title,
  subtitle,
  leftAction,
  rightAction,
}: {
  title: string;
  subtitle?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
}) {
  const t = useTokens();
  const { tokens } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + t.spacing[2],
        paddingBottom: t.spacing[3],
        paddingHorizontal: t.spacing[4],
        backgroundColor: t.color.surface.default,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: t.color.border.subtle,
        gap: t.spacing[0.5],
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={styles.headerSide}>{leftAction}</View>
        <View style={{ flex: 1, alignItems: 'center', gap: t.spacing[0.5] }}>
          <Typography
            variant="subtitle1"
            style={{
              textAlign: 'center',
              fontWeight: tokens.fontWeight.semibold,
              color: t.color.text.primary,
            }}
          >
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="caption" color="tertiary" align="center">
              {subtitle}
            </Typography>
          ) : null}
        </View>
        <View style={[styles.headerSide, { alignItems: 'flex-end' }]}>
          {rightAction}
        </View>
      </View>
    </View>
  );
}

export function PillSearchBar({
  value,
  onChangeText,
  placeholder = 'Search',
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) {
  const t = useTokens();
  const { input } = useComponentTokens();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing[2],
        paddingHorizontal: t.spacing[4],
        minHeight: 44,
        borderRadius: t.radius.lg,
        backgroundColor: t.color.surface.default,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: t.color.border.subtle,
      }}
    >
      <Search size={18} color={t.color.text.tertiary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={input.text.placeholderColor}
        style={{
          flex: 1,
          paddingVertical: t.spacing[2.5],
          fontSize: input.size.md.fontSize,
          color: input.text.color,
        }}
        returnKeyType="search"
        clearButtonMode="while-editing"
        accessibilityLabel={placeholder}
      />
    </View>
  );
}

export function ListSectionHeader({ title }: { title: string }) {
  const t = useTokens();
  const { tokens } = useTheme();
  return (
    <View
      style={{
        paddingTop: t.spacing[4],
        paddingBottom: t.spacing[2],
        paddingHorizontal: t.spacing[1],
      }}
    >
      <Typography
        variant="overline"
        color="tertiary"
        style={{ letterSpacing: 1, fontWeight: tokens.fontWeight.semibold }}
      >
        {title}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  headerSide: {
    minWidth: 44,
    justifyContent: 'center',
  },
});
