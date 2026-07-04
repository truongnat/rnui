import { useAccordion, useId, useTheme } from '@truongdq01/headless';
import React, { Fragment, useMemo } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import { AccordionGroupContext } from './context';
import type { AccordionGroupProps } from './types';

const BORDER_WIDTH = 1;

/**
 * AccordionGroup manages a set of accordions, controlling whether one or many
 * can be expanded, and owns the shared visual envelope.
 *
 * Layout modes:
 * - **Attached** (default, or `bordered`): items render seamlessly; the group is
 *   the single rounded, clipped container with dividers between items.
 * - **Separate** (a `gap` is set via `style` and not `bordered`): items become
 *   standalone rounded cards spaced by the gap, with no dividers.
 */
export function AccordionGroup({
  id: idProp,
  children,
  variant = 'single',
  expandedIds: controlledIds,
  defaultExpandedIds = [],
  onChange,
  bordered = false,
  radius,
  style,
}: AccordionGroupProps) {
  const { tokens } = useTheme();
  const id = useId(idProp, 'accordion-group');

  // Content-container radius — aligned with Card/Paper/Dialog (radius.xl).
  const groupRadius = radius ?? tokens.radius.xl;

  const { isExpanded, toggle: toggleId } = useAccordion({
    expanded: controlledIds,
    defaultExpanded: defaultExpandedIds,
    onChange,
    multiple: variant === 'multiple',
  });

  // A gap in the group style opts into "separate cards"; otherwise items are attached.
  const hasGap = useMemo(() => {
    const flat = style ? StyleSheet.flatten(style) : undefined;
    const gap = flat?.gap;
    return typeof gap === 'number' && gap > 0;
  }, [style]);

  const attached = bordered || !hasGap;

  // Bordered group draws a real 1px border + rounded corners on a surface-colored
  // container. Because item and container backgrounds are both `surface`, any
  // unclipped item edge is invisible against the container.
  const containerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    if (bordered) {
      return [
        {
          borderWidth: BORDER_WIDTH,
          borderColor: tokens.color.border.default,
          borderRadius: groupRadius,
          overflow: 'hidden' as const,
          backgroundColor: tokens.color.surface.default,
        },
        style,
      ];
    }
    return style;
  }, [bordered, tokens, groupRadius, style]);

  // The border's inner edge radius. First/last items round to this so the corners
  // are physically rounded per item — robust even where a parent's `overflow:hidden`
  // fails to clip Animated/Gesture children (a known iOS quirk).
  const innerRadius = Math.max(0, groupRadius - BORDER_WIDTH);

  // In a bordered group, separators match the border EXACTLY (same 1px width and
  // same color) so the outer border and inner separators read as one consistent
  // grid; in a flush list they stay subtle and hairline-thin.
  const dividerStyle = useMemo<ViewStyle>(
    () => ({
      height: bordered ? BORDER_WIDTH : StyleSheet.hairlineWidth,
      backgroundColor: bordered
        ? tokens.color.border.default
        : tokens.color.border.subtle,
    }),
    [bordered, tokens.color.border.default, tokens.color.border.subtle]
  );

  const contextValue = useMemo(
    () => ({
      isOpen: isExpanded,
      toggle: toggleId,
      variant,
      bordered,
      radius: groupRadius,
      attached,
    }),
    [isExpanded, toggleId, variant, bordered, groupRadius, attached]
  );

  // Interleave hairline dividers between attached items and wrap boundary items so
  // their outer corners are rounded per item (React.Children.toArray guarantees a
  // stable key on each element, so no array-index keys are needed).
  const content = useMemo(() => {
    const items = React.Children.toArray(children);
    const count = items.length;
    return items.map((child, index) => {
      if (!attached) return child;

      const isFirst = index === 0;
      const isLast = index === count - 1;
      const key =
        (React.isValidElement(child) ? child.key : null) ?? String(index);

      // Only bordered groups render a rounded envelope; flush lists stay square.
      const itemWrapperStyle: ViewStyle | undefined = bordered
        ? {
            borderTopLeftRadius: isFirst ? innerRadius : 0,
            borderTopRightRadius: isFirst ? innerRadius : 0,
            borderBottomLeftRadius: isLast ? innerRadius : 0,
            borderBottomRightRadius: isLast ? innerRadius : 0,
            overflow: 'hidden',
          }
        : undefined;

      return (
        <Fragment key={`row-${key}`}>
          {itemWrapperStyle ? (
            <View style={itemWrapperStyle}>{child}</View>
          ) : (
            child
          )}
          {isLast ? null : <View style={dividerStyle} />}
        </Fragment>
      );
    });
  }, [children, attached, bordered, innerRadius, dividerStyle]);

  return (
    <AccordionGroupContext.Provider value={contextValue}>
      <View nativeID={id} style={containerStyle}>
        {content}
      </View>
    </AccordionGroupContext.Provider>
  );
}
