/**
 * Example app chrome — list screen header and search (not part of the kit).
 */

import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
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
  const colors = useThemeColor();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-card"
      style={[
        styles.header,
        {
          paddingTop: insets.top + 8,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.headerRow}>
        <View style={styles.headerSide}>{leftAction}</View>
        <View style={styles.headerCenter}>
          <Text variant="large" style={styles.headerTitle}>
            {title}
          </Text>
          {subtitle ? (
            <Text variant="muted" style={styles.headerTitle}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        <View style={[styles.headerSide, styles.headerSideRight]}>
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
  const colors = useThemeColor();
  return (
    <View
      className="bg-card"
      style={[styles.searchBar, { borderColor: colors.border }]}
    >
      <Search size={18} color={colors.mutedForeground} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        style={[styles.searchInput, { color: colors.foreground }]}
        returnKeyType="search"
        clearButtonMode="while-editing"
        accessibilityLabel={placeholder}
      />
    </View>
  );
}

export function ListSectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text variant="muted" className="uppercase tracking-widest">
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  headerTitle: {
    textAlign: 'center',
  },
  headerSide: {
    minWidth: 44,
    justifyContent: 'center',
  },
  headerSideRight: {
    alignItems: 'flex-end',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    minHeight: 44,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  sectionHeader: {
    paddingTop: 16,
    paddingBottom: 8,
    paddingHorizontal: 4,
  },
});
