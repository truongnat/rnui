import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import {
  ListItem,
  ListSectionTitle,
  ListSeparator,
} from '@/components/ui/list-item';
import { cn } from '@/lib/utils';

export interface SettingsMenuItem {
  key: string;
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  /** Trailing node — value text, switch, badge… Overrides chevron. */
  trailing?: ReactNode;
  onPress?: () => void;
}

export interface SettingsMenuSection {
  title?: string;
  items: SettingsMenuItem[];
}

export interface SettingsMenuProps extends ViewProps {
  sections: SettingsMenuSection[];
  className?: string;
}

export function SettingsMenu({
  sections,
  className,
  ...props
}: SettingsMenuProps) {
  return (
    <View className={cn('w-full', className)} {...props}>
      {sections.map((section, si) => (
        <View key={section.title ?? si}>
          {section.title && (
            <ListSectionTitle>{section.title}</ListSectionTitle>
          )}
          <View className="bg-background">
            {section.items.map((item, ii) => (
              <View key={item.key}>
                <ListItem
                  title={item.title}
                  subtitle={item.subtitle}
                  leading={item.leading}
                  trailing={item.trailing}
                  onPress={item.onPress}
                />
                {ii < section.items.length - 1 && <ListSeparator />}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
