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
  /** Extra classes for the online dot (e.g. `bg-sky-500`). */
  presenceClassName?: string;
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
  presenceClassName,
  onPress,
  className,
  ...props
}: ChatListItemProps) {
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={
        props.accessibilityLabel ??
        [
          name,
          online ? 'Online' : undefined,
          time,
          message,
          unreadCount > 0 ? `${unreadCount} unread messages` : undefined,
        ]
          .filter(Boolean)
          .join(', ')
      }
      onPress={onPress}
      disabled={!onPress}
      className="active:opacity-70"
    >
      <View
        className={cn(
          'min-h-20 flex-row items-center gap-3 px-4 py-3',
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
            <View
              className={cn(
                'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-primary',
                presenceClassName
              )}
            />
          )}
        </View>
        <View className="min-w-0 flex-1">
          <View className="flex-row items-baseline justify-between gap-2">
            <Text className="min-w-0 flex-1 text-base font-semibold leading-6 text-foreground">
              {name}
            </Text>
            {time && (
              <Text className="shrink text-xs leading-5 text-muted-foreground">
                {time}
              </Text>
            )}
          </View>
          <View className="mt-1 flex-row items-start justify-between gap-2">
            <Text
              className="min-w-0 flex-1 text-sm leading-5 text-muted-foreground"
              numberOfLines={2}
            >
              {message}
            </Text>
            {unreadCount > 0 && (
              <Badge className="min-h-5 min-w-5 px-1.5">
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}
