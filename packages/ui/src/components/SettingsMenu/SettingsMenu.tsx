import { useTheme } from '@truongdq01/headless';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Divider } from '../Divider';
import { List, ListItem, ListItemIcon, ListItemText } from '../List';

// ─── Types ────────────────────────────────────────────────────────

export interface SettingsItem {
  id: string;
  label: string;
  subtitle?: string;
  icon?: React.ReactNode;
  value?: React.ReactNode;
  onPress?: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export interface SettingsSection {
  title?: string;
  items: SettingsItem[];
}

export interface SettingsMenuProps {
  sections: SettingsSection[];
  variant?: 'default' | 'grouped';
}

// ─── Settings Menu ─────────────────────────────────────────────────

export function SettingsMenu({
  sections,
  variant = 'grouped',
}: SettingsMenuProps) {
  const { tokens } = useTheme();

  return (
    <View style={styles.container}>
      {sections.map((section, sectionIndex) => (
        <React.Fragment key={sectionIndex}>
          {section.title && (
            <View style={styles.sectionHeader}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: tokens.color.text.secondary },
                ]}
              >
                {section.title}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.section,
              variant === 'grouped' && {
                backgroundColor: tokens.color.surface.default,
                borderRadius: 12,
                marginHorizontal: 16,
                overflow: 'hidden',
              },
            ]}
          >
            {section.items.map((item, itemIndex) => (
              <Pressable
                key={item.id}
                onPress={item.onPress}
                disabled={item.disabled}
                style={({ pressed }) => [
                  styles.item,
                  pressed && { backgroundColor: tokens.color.surface.hover },
                  item.disabled && { opacity: 0.3 },
                  itemIndex !== section.items.length - 1 && {
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: tokens.color.border.subtle,
                    marginLeft: 56,
                  },
                ]}
              >
                {item.icon && <View style={styles.itemIcon}>{item.icon}</View>}
                <View style={styles.itemContent}>
                  <Text
                    style={[
                      styles.itemLabel,
                      {
                        color: item.destructive
                          ? tokens.color.error.text
                          : tokens.color.text.primary,
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.subtitle && (
                    <Text
                      style={[
                        styles.itemSubtitle,
                        { color: tokens.color.text.secondary },
                      ]}
                    >
                      {item.subtitle}
                    </Text>
                  )}
                </View>
                <View style={styles.itemRight}>
                  {item.value}
                  <Text
                    style={[
                      styles.chevron,
                      { color: tokens.color.text.tertiary },
                    ]}
                  >
                    ›
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </React.Fragment>
      ))}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  sectionHeader: {
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 52,
  },
  itemIcon: {
    width: 28,
    marginRight: 12,
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  itemSubtitle: {
    fontSize: 13,
    lineHeight: 16,
    marginTop: 2,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chevron: {
    fontSize: 20,
    fontWeight: '400',
  },
});
