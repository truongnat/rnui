import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import {
  Pressable,
  useColorScheme,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

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
  const scheme = useColorScheme();
  const muted = scheme === 'dark' ? '#a8a29e' : '#78716c';
  const items = range(page, totalPages, siblings);

  return (
    <View className={cn('flex-row items-center gap-1', className)} {...props}>
      <PaginationButton
        disabled={page <= 1}
        onPress={() => onPageChange?.(page - 1)}
        accessibilityLabel="Previous page"
      >
        <ChevronLeft size={16} color={muted} />
      </PaginationButton>
      {items.map((it, i) =>
        it === '…' ? (
          <Text
            key={`ellipsis-${items[i - 1]}-${items[i + 1]}`}
            className="px-2 text-muted-foreground"
          >
            …
          </Text>
        ) : (
          <PaginationButton
            key={it}
            active={it === page}
            onPress={() => onPageChange?.(it)}
            accessibilityLabel={`Page ${it}`}
          >
            <Text
              className={cn(
                'text-sm',
                it === page ? 'text-foreground' : 'text-muted-foreground'
              )}
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
        <ChevronRight size={16} color={muted} />
      </PaginationButton>
    </View>
  );
}

function PaginationButton({
  active,
  disabled,
  className,
  ...props
}: PressableProps & { active?: boolean; className?: string }) {
  return (
    <Pressable
      disabled={disabled}
      className={cn(
        'h-9 min-w-9 items-center justify-center rounded-md px-2',
        active ? 'border border-border bg-background' : 'active:bg-accent',
        disabled && 'opacity-40',
        className
      )}
      {...props}
    />
  );
}
