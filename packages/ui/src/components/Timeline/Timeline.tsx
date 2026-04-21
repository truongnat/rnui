import { useTheme } from '@truongdq01/headless';
import React, { createContext, useContext } from 'react';
import { Text, View } from 'react-native';

export type TimelinePosition =
  | 'left'
  | 'right'
  | 'alternate'
  | 'alternate-reverse';

interface TimelineContextValue {
  position: TimelinePosition;
  itemVariant?: 'filled' | 'outlined';
}

const TimelineContext = createContext<TimelineContextValue | null>(null);

function useTimelineContext() {
  return useContext(TimelineContext);
}

export interface TimelineProps {
  position?: TimelinePosition;
  children?: React.ReactNode;
  itemVariant?: 'filled' | 'outlined';
}

export function Timeline({
  position = 'right',
  itemVariant = 'filled',
  children,
}: TimelineProps) {
  const {
    components: { timeline },
  } = useTheme();
  return (
    <TimelineContext.Provider value={{ position, itemVariant }}>
      <View style={timeline.content}>
        {React.Children.map(children, (child, index) => {
          if (
            !React.isValidElement<{
              position?: TimelinePosition | 'left' | 'right';
              variant?: 'filled' | 'outlined';
            }>(child)
          )
            return child;
          if (position === 'alternate' || position === 'alternate-reverse') {
            const isEven = index % 2 === 0;
            const derived =
              position === 'alternate'
                ? isEven
                  ? 'right'
                  : 'left'
                : isEven
                  ? 'left'
                  : 'right';
            return React.cloneElement(child, {
              position: child.props.position ?? derived,
              variant: itemVariant,
            });
          }
          return React.cloneElement(child, { variant: itemVariant });
        })}
      </View>
    </TimelineContext.Provider>
  );
}

export interface TimelineItemProps {
  position?: 'left' | 'right';
  variant?: 'filled' | 'outlined';
  status?: 'pending' | 'active' | 'completed' | 'error';
  children?: React.ReactNode;
}

export function TimelineItem({
  position,
  variant = 'filled',
  status = 'pending',
  children,
}: TimelineItemProps) {
  const ctx = useTimelineContext();
  const resolved =
    position ??
    (ctx?.position === 'left' || ctx?.position === 'right'
      ? ctx.position
      : 'right');

  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'stretch', minHeight: 80 }}
    >
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {resolved === 'right'
          ? extractOpposite(children)
          : extractContent(children)}
      </View>
      <TimelineSeparator status={status} variant={variant} />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {resolved === 'right'
          ? extractContent(children)
          : extractOpposite(children)}
      </View>
    </View>
  );
}

function extractChildrenByType(children: React.ReactNode, type: any) {
  const items: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === type) {
      const element = child as React.ReactElement<any>;
      items.push(element.props.children);
    }
  });
  return items.length > 0 ? items : null;
}

function extractSeparator(children: React.ReactNode) {
  return extractChildrenByType(children, TimelineSeparator);
}

function extractContent(children: React.ReactNode) {
  const result = extractChildrenByType(children, TimelineContent);
  // Wrap string content in Text
  if (result && result.length === 1 && typeof result[0] === 'string') {
    return <Text>{result[0]}</Text>;
  }
  return result;
}

function extractOpposite(children: React.ReactNode) {
  const result = extractChildrenByType(children, TimelineOppositeContent);
  // Wrap string content in Text
  if (result && result.length === 1 && typeof result[0] === 'string') {
    return <Text>{result[0]}</Text>;
  }
  return result;
}

export interface TimelineSeparatorProps {
  status?: 'pending' | 'active' | 'completed' | 'error';
  variant?: 'filled' | 'outlined';
  children?: React.ReactNode;
}

export function TimelineSeparator({
  status = 'pending',
  variant = 'filled',
  children,
}: TimelineSeparatorProps) {
  const {
    components: { timeline },
  } = useTheme();

  const connectorColor =
    status === 'completed'
      ? timeline.dot.completed.borderColor
      : timeline.connector.color;

  return (
    <View style={{ alignItems: 'center', width: 48, paddingHorizontal: 8 }}>
      {children || (
        <>
          <TimelineDot variant={variant} status={status} />
          <TimelineConnector color={connectorColor} />
        </>
      )}
    </View>
  );
}

export interface TimelineDotProps {
  variant?: 'filled' | 'outlined';
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'inherit';
  status?: 'pending' | 'active' | 'completed' | 'error';
  size?: number;
}

export function TimelineDot({
  variant = 'filled',
  color = 'primary',
  status,
  size,
}: TimelineDotProps) {
  const {
    components: { timeline },
    tokens,
  } = useTheme();

  const resolvedStatus =
    status ||
    (color === 'success'
      ? 'completed'
      : color === 'error'
        ? 'error'
        : color === 'primary'
          ? 'active'
          : 'pending');
  const dotConfig = timeline.dot as Record<string, any>;
  const statusTokens = dotConfig[resolvedStatus] || timeline.dot.pending;

  const dotSize = size || timeline.dot.size || 16;

  return (
    <View
      style={{
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        backgroundColor: variant === 'filled' ? statusTokens.bg : 'transparent',
        borderWidth: 2,
        borderColor: statusTokens.borderColor,
        ...tokens.shadow.sm,
      }}
    />
  );
}

export interface TimelineConnectorProps {
  color?: string;
  width?: number;
}

export function TimelineConnector({ color, width }: TimelineConnectorProps) {
  const {
    components: { timeline },
  } = useTheme();
  const resolvedWidth = width || timeline.connector.width;
  return (
    <View
      style={{
        width: resolvedWidth,
        flex: 1,
        backgroundColor: color || timeline.connector.color,
        marginVertical: 4,
        borderRadius: resolvedWidth,
      }}
    />
  );
}

export interface TimelineContentProps {
  children?: React.ReactNode;
  align?: 'left' | 'right';
}

export function TimelineContent({
  children,
  align = 'left',
}: TimelineContentProps) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 8,
        alignItems: align === 'left' ? 'flex-start' : 'flex-end',
      }}
    >
      {children}
    </View>
  );
}

export interface TimelineOppositeContentProps {
  children?: React.ReactNode;
  align?: 'left' | 'right';
}

export function TimelineOppositeContent({
  children,
  align = 'right',
}: TimelineOppositeContentProps) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 8,
        alignItems: align === 'left' ? 'flex-start' : 'flex-end',
      }}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </View>
  );
}
