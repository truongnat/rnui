import type { ReactNode } from 'react';
import { Pressable, useColorScheme, View, type ViewProps } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface ListItemProps extends ViewProps {
  title: string;
  subtitle?: string;
  /** Leading node — avatar, icon, etc. */
  leading?: ReactNode;
  /** Trailing node — overrides the default chevron when `onPress` is set. */
  trailing?: ReactNode;
  onPress?: () => void;
  /** Show the chevron affordance for pressable rows. */
  chevron?: boolean;
  className?: string;
}

export function ListItem({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  chevron = true,
  className,
  ...props
}: ListItemProps) {
  const iconColor = useColorScheme() === 'dark' ? '#a8a29e' : '#78716c';
  const content = (
    <View
      className={cn(
        'min-h-14 flex-row items-center gap-3 px-4 py-2',
        className
      )}
      {...props}
    >
      {leading}
      <View className="flex-1">
        <Text className="text-base text-foreground" numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text className="text-sm text-muted-foreground" numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      {trailing ??
        (onPress && chevron && <ChevronRight size={18} color={iconColor} />)}
    </View>
  );

  if (!onPress) return content;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="active:bg-accent"
    >
      {content}
    </Pressable>
  );
}

export function ListSeparator({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return <View className={cn('ml-4 h-px bg-border', className)} {...props} />;
}

export function ListSectionTitle({
  className,
  children,
  ...props
}: ViewProps & { className?: string; children?: ReactNode }) {
  return (
    <View className={cn('px-4 pb-1 pt-4', className)} {...props}>
      {typeof children === 'string' ? (
        <Text className="text-xs font-medium uppercase text-muted-foreground">
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
