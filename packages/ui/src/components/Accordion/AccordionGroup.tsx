import { useTheme, useId, useAccordion } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { AccordionGroupContext } from './context';
import type { AccordionGroupProps, AccordionProps } from './types';

/**
 * AccordionGroup manages a set of accordions, controlling whether one or many can be expanded.
 * It provides shared styling (borders, radius) and state management to its children.
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
  
  // Resolve final corner radius: custom prop -> theme default (md)
  const groupRadius = radius ?? tokens.radius.md;
  
  const { isExpanded, toggle: toggleId } = useAccordion({
    expanded: controlledIds,
    defaultExpanded: defaultExpandedIds,
    onChange,
    multiple: variant === 'multiple',
  });

  // Styling for the outer group container
  const containerStyle = useMemo(() => [
    bordered && {
      borderWidth: 1,
      borderColor: tokens.color.border.default,
      borderRadius: groupRadius,
      overflow: 'hidden' as const,
      backgroundColor: tokens.color.surface.default,
    },
    style
  ], [bordered, tokens, groupRadius, style]);

  /**
   * Pre-process children to inject position meta (isFirst, isLast) 
   * and insert dividers between items where appropriate.
   */
  const renderedChildren = useMemo(() => {
    const childrenArray = React.Children.toArray(children);
    const flatGStyle = style ? StyleSheet.flatten(style) : {};
    const hasGap = typeof (flatGStyle as any).gap === 'number' && (flatGStyle as any).gap > 0;

    return childrenArray.map((child, index) => {
      const isFirst = index === 0;
      const isLast = index === childrenArray.length - 1;

      if (React.isValidElement(child)) {
        // Clone child to inject group-aware boundary detection
        const item = React.cloneElement(child as React.ReactElement<AccordionProps>, {
          isFirst,
          isLast,
        });

        // Show divider if:
        // 1. Group is bordered (Card mode)
        // 2. Group is NOT bordered, but has NO GAP (List mode)
        const showDivider = !isLast && (bordered || !hasGap);

        if (!showDivider) return item;

        return (
          <React.Fragment key={index}>
            {item}
            <View
              style={{ height: 1, backgroundColor: tokens.color.border.subtle }}
            />
          </React.Fragment>
        );
      }
      return child;
    });
  }, [children, bordered, tokens, style]);

  return (
    <AccordionGroupContext.Provider 
      value={{ 
        isExpanded, 
        toggleId, 
        variant, 
        bordered, 
        radius: groupRadius, 
        inGroup: true, 
        groupStyle: style 
      }}
    >
      <View nativeID={id} style={containerStyle as StyleProp<ViewStyle>}>
        {renderedChildren}
      </View>
    </AccordionGroupContext.Provider>
  );
}
