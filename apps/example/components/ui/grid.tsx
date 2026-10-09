import {
  Children,
  createContext,
  isValidElement,
  useContext,
  type ReactElement,
  type ReactNode,
} from 'react';
import { View, type DimensionValue, type ViewProps } from 'react-native';
import { cn, spacingValue, type SpacingToken } from '@/lib/utils';

const GridContext = createContext({ columns: 1, row: 0, col: 0 });

export interface GridProps extends ViewProps {
  /** Track count for the implicit row — each cell is `span / columns` wide. */
  columns?: number;
  /** Gutters — token or pixel value. */
  gap?: SpacingToken | number;
  rowGap?: SpacingToken | number;
  columnGap?: SpacingToken | number;
  className?: string;
  children?: ReactNode;
}

export interface GridItemProps extends ViewProps {
  /** Tracks this cell occupies (1..columns). Defaults to 1. */
  span?: number;
  /** Tracks to skip before this cell. */
  offset?: number;
  className?: string;
  children?: ReactNode;
}

function toPct(n: number): DimensionValue {
  return `${n}%`;
}

/**
 * Wrap-based responsive grid. Children without an explicit `GridItem` are
 * wrapped as one-track cells, so `columns={3}` renders three per row.
 * Use `GridItem span`/`offset` for non-uniform layouts.
 * <Grid columns={2} gap="md">
 *   <Paper /><Paper /><GridItem span={2}><Paper /></GridItem>
 * </Grid>
 */
export function Grid({
  columns = 1,
  gap = 0,
  rowGap,
  columnGap,
  className,
  children,
  style,
  ...props
}: GridProps) {
  const col = spacingValue(columnGap ?? gap);
  const row = spacingValue(rowGap ?? gap);

  const cells = Children.map(children, (child) =>
    isValidElement(child) && (child as ReactElement).type === GridItem ? (
      child
    ) : (
      <GridItem>{child}</GridItem>
    )
  );

  return (
    <GridContext.Provider value={{ columns, row, col }}>
      <View
        className={cn('flex-row flex-wrap', className)}
        style={[
          // Gutters: parent pulls back, each cell pushes in — keeps
          // percentage widths exact even with gaps.
          { marginLeft: -col, marginTop: -row },
          style,
        ]}
        {...props}
      >
        {cells}
      </View>
    </GridContext.Provider>
  );
}

export function GridItem({
  span = 1,
  offset,
  className,
  style,
  children,
  ...props
}: GridItemProps) {
  const { columns, row, col } = useContext(GridContext);
  const width = (Math.min(span, columns) / columns) * 100;
  return (
    <View
      className={cn(className)}
      style={[
        {
          width: toPct(width),
          paddingLeft: col,
          paddingTop: row,
          marginLeft: offset ? toPct((offset / columns) * 100) : undefined,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
