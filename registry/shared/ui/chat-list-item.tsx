import { Pressable, View, type ViewProps } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface ChatListItemProps extends ViewProps {
  name: string;
  /** Last message preview. */
  message?: string;
  /** Right-aligned timestamp text. */
  time?: string;
  unreadCount?: number;
  /** Avatar image uri. */
  avatarUrl?: string;
  /** Fallback text (initials). */
  fallback?: string;
  /** Online indicator dot. */
  online?: boolean;
  onPress?: () => void;
  className?: string;
}

export function ChatListItem({
  name,
  message,
  time,
  unreadCount = 0,
  avatarUrl,
  fallback,
  online,
  onPress,
  className,
  ...props
}: ChatListItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="active:bg-accent"
    >
      <View
        className={cn(
          'min-h-16 flex-row items-center gap-3 px-4 py-2.5',
          className
        )}
        {...props}
      >
        <View>
          <Avatar>
            {avatarUrl && <AvatarImage source={{ uri: avatarUrl }} />}
            <AvatarFallback>
              {fallback ?? name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {online && (
            <View className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
          )}
        </View>
        <View className="flex-1">
          <View className="flex-row items-baseline justify-between">
            <Text
              className="flex-1 text-base font-medium text-foreground"
              numberOfLines={1}
            >
              {name}
            </Text>
            {time && (
              <Text className="ml-2 text-xs text-muted-foreground">{time}</Text>
            )}
          </View>
          <View className="mt-0.5 flex-row items-center justify-between">
            <Text
              className="flex-1 text-sm text-muted-foreground"
              numberOfLines={1}
            >
              {message}
            </Text>
            {unreadCount > 0 && (
              <Badge className="ml-2 h-5 min-w-5 px-1.5">
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
