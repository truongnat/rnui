import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import {
  useWindowDimensions,
  View,
  type ImageSourcePropType,
  type ViewProps,
} from 'react-native';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface ImageListContextValue {
  cols: number;
  gap: number;
  width: number;
}

const ImageListContext = createContext<ImageListContextValue>({
  cols: 2,
  gap: 8,
  width: 0,
});

export interface ImageListProps extends ViewProps {
  /** Number of grid columns. */
  cols?: number;
  /** Gap between items in px. */
  gap?: number;
  className?: string;
  children?: ReactNode;
}

/**
 * Simple flex-wrap image grid. Pair with `ImageListItem`, which
 * measures this container's width to size each tile.
 */
export function ImageList({
  cols = 2,
  gap = 8,
  className,
  style,
  onLayout,
  children,
  ...props
}: ImageListProps) {
  const { width: windowWidth } = useWindowDimensions();
  const [width, setWidth] = useState(windowWidth);

  const ctx = useMemo(() => ({ cols, gap, width }), [cols, gap, width]);

  return (
    <ImageListContext.Provider value={ctx}>
      <View
        className={cn('flex-row flex-wrap', className)}
        style={[{ gap }, style]}
        onLayout={(e) => {
          const next = e.nativeEvent.layout.width;
          if (next !== width) setWidth(next);
          onLayout?.(e);
        }}
        {...props}
      >
        {children}
      </View>
    </ImageListContext.Provider>
  );
}

export interface ImageListItemProps extends ViewProps {
  /** How many columns this item spans. */
  span?: number;
  /** Width/height ratio of the tile. */
  aspectRatio?: number;
  /** When set, renders an <Image> filling the tile. */
  source?: ImageSourcePropType;
  /** Forwarded to the inner <Image> when `source` is set. */
  imageProps?: Omit<
    ComponentProps<typeof Image>,
    'source' | 'style' | 'className'
  >;
  className?: string;
  children?: ReactNode;
}

export function ImageListItem({
  span = 1,
  aspectRatio = 1,
  source,
  imageProps,
  className,
  style,
  children,
  ...props
}: ImageListItemProps) {
  const { cols, gap, width } = useContext(ImageListContext);

  const colWidth =
    cols > 0 && width > 0 ? (width - gap * (cols - 1)) / cols : 0;
  const itemWidth = span * colWidth + gap * (span - 1);

  return (
    <View
      className={cn('overflow-hidden rounded-md', className)}
      style={[
        itemWidth > 0 && { width: itemWidth },
        { aspectRatio },
        style,
      ]}
      {...props}
    >
      {source ? (
        <Image
          source={source}
          rounded="none"
          className="h-full w-full"
          {...imageProps}
        />
      ) : (
        children
      )}
    </View>
  );
}

export interface ImageListItemBarProps extends ViewProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Trailing element (e.g. an IconButton). */
  actionIcon?: ReactNode;
  position?: 'top' | 'bottom';
  className?: string;
}

/** Overlay caption bar for `ImageListItem`. */
export function ImageListItemBar({
  title,
  subtitle,
  actionIcon,
  position = 'bottom',
  className,
  ...props
}: ImageListItemBarProps) {
  return (
    <View
      className={cn(
        'absolute right-0 left-0 flex-row items-center gap-2 bg-black/60 px-3 py-2',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      {...props}
    >
      <View className="flex-1">
        {title ? (
          <Text className="text-sm font-medium text-white" numberOfLines={1}>
            {title}
          </Text>
        ) : null}
        {subtitle ? (
          <Text className="text-xs text-zinc-300" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {actionIcon}
    </View>
  );
}
