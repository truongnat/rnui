import {
  useDisclosure,
  useTheme,
  useId,
} from '@truongdq01/headless';
import React, { useContext, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { AccordionContext, AccordionGroupContext } from './context';
import type { AccordionProps } from './types';

/**
 * Accordion component for collapsible content.
 * It can be used alone or inside an AccordionGroup.
 */
export function Accordion({
  id: idProp,
  expanded: controlledExpanded,
  defaultExpanded = false,
  disabled = false,
  onChange,
  children,
  radius,
  bordered: controlledBordered,
  style,
  isFirst,
  isLast,
}: AccordionProps) {
  const groupCtx = useContext(AccordionGroupContext);
  const { tokens, components: { accordion } } = useTheme();
  const id = useId(idProp, 'accordion');

  // Determine if state is managed by a parent AccordionGroup
  const isGroupManaged = !!(groupCtx && idProp !== undefined);
  const isInGroup = groupCtx?.inGroup ?? false;
  const isBorderedGroup = groupCtx?.bordered ?? false;

  // Uncontrolled state handler (only used when not managed by a group)
  const disclosure = useDisclosure({
    isOpen: controlledExpanded,
    defaultOpen: defaultExpanded,
    onOpen: () => onChange?.(true),
    onClose: () => onChange?.(false),
  });

  const isExpanded = isGroupManaged ? groupCtx.isExpanded(idProp!) : disclosure.isOpen;
  const isBordered = controlledBordered ?? true;

  /**
   * Determine the effective container styles based on:
   * 1. Standalone vs Grouped state
   * 2. Position (First/Last) for corner rounding
   * 3. Group bordered/gap configuration
   */
  const extraContainerStyle = useMemo(() => {
    const effectiveRadius = radius ?? groupCtx?.radius ?? tokens.radius.md;

    // 1. Single Mode (Not in a group)
    if (!isInGroup) {
      return {
        borderRadius: effectiveRadius,
        overflow: 'hidden' as const,
        borderWidth: isBordered ? 1 : 0,
        borderColor: tokens.color.border.default,
      };
    }

    // 2. Group Mode logic
    const gStyle = groupCtx?.groupStyle;
    const flatGStyle = gStyle ? StyleSheet.flatten(gStyle) : {};
    const hasGap = typeof (flatGStyle as any).gap === 'number' && (flatGStyle as any).gap > 0;

    // If it's a bordered group OR list mode (shared logic for rounding items at boundary)
    if (isBorderedGroup || !hasGap) {
      return {
        borderTopLeftRadius: isFirst ? effectiveRadius : 0,
        borderTopRightRadius: isFirst ? effectiveRadius : 0,
        borderBottomLeftRadius: isLast ? effectiveRadius : 0,
        borderBottomRightRadius: isLast ? effectiveRadius : 0,
        borderWidth: 0,
        overflow: 'hidden' as const,
      };
    }

    // Default: Group with gap -> items behave like separate rounded cards.
    return {
      borderRadius: effectiveRadius,
      overflow: 'hidden' as const,
      borderWidth: isBordered ? 1 : 0,
      borderColor: tokens.color.border.default,
    };
  }, [isBorderedGroup, isInGroup, isFirst, isLast, groupCtx?.radius, groupCtx?.groupStyle, tokens, radius, isBordered]);

  const handleToggle = () => {
    if (disabled) return;
    if (isGroupManaged) {
      groupCtx.toggleId(idProp!);
    } else {
      disclosure.toggle();
    }
  };

  return (
    <AccordionContext.Provider
      value={{
        expanded: isExpanded,
        toggle: handleToggle,
        disabled,
        isFirst: isFirst ?? false,
        isLast: isLast ?? false,
      }}
    >
      <View nativeID={id} style={[accordion.container, extraContainerStyle, style]}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
}
