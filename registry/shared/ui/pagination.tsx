import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { cn, useIconColor, useThemeColor } from '@/lib/utils';

export interface PaginationProps extends ViewProps {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  /** Pages shown around current. */
  siblings?: number;
  className?: string;
}

function range(
  page: number,
  total: number,
  siblings: number
): (number | '…')[] {
  const pages = new Set<number>([1, total]);
  for (let i = -siblings; i <= siblings; i++) {
    const p = page + i;
    if (p >= 1 && p <= total) pages.add(p);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | '…')[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push('…');
    out.push(sorted[i]);
  }
  return out;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblings = 1,
  className,
  ...props
}: PaginationProps) {
  const iconColor = useIconColor('foreground');
  const colors = useThemeColor();
  const items = range(page, totalPages, siblings);

  return (
    <View
      accessibilityRole="toolbar"
      className={cn('flex-row items-center gap-1.5 self-center', className)}
      {...props}
    >
      <PaginationButton
        disabled={page <= 1}
        onPress={() => onPageChange?.(page - 1)}
        accessibilityLabel="Previous page"
      >
        <ChevronLeft size={18} color={iconColor} />
      </PaginationButton>

      {items.map((it, i) =>
        it === '…' ? (
          <Text
            key={`ellipsis-${items[i - 1]}-${items[i + 1]}`}
            className="px-1 text-sm text-muted-foreground"
          >
            …
          </Text>
        ) : (
          <PaginationButton
            key={it}
            active={it === page}
            activeStyle={{
              backgroundColor: colors.primary,
              borderColor: colors.primary,
            }}
            onPress={() => onPageChange?.(it)}
            accessibilityLabel={`Page ${it}`}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: it === page ? '700' : '500',
                color: it === page ? colors.primaryForeground : colors.foreground,
              }}
            >
              {it}
            </Text>
          </PaginationButton>
        )
      )}

      <PaginationButton
        disabled={page >= totalPages}
        onPress={() => onPageChange?.(page + 1)}
        accessibilityLabel="Next page"
      >
        <ChevronRight size={18} color={iconColor} />
      </PaginationButton>
    </View>
  );
}

function PaginationButton({
  active,
  activeStyle,
  disabled,
  className,
  style,
  ...props
}: PressableProps & {
  active?: boolean;
  activeStyle?: ViewStyle;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const colors = useThemeColor();

  return (
    <Pressable
      disabled={disabled}
      hitSlop={6}
      className={cn(
        'h-10 min-w-10 items-center justify-center rounded-xl border border-transparent px-2.5',
        !active && 'border-border bg-card active:bg-accent',
        disabled && 'opacity-40',
        className
      )}
      style={[
        { borderCurve: 'continuous' },
        active ? activeStyle : undefined,
        style,
      ]}
      {...props}
    />
  );
}
