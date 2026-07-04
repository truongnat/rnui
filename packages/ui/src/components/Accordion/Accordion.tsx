import { useCollapsible, useId, useTheme } from '@truongdq01/headless';
import { useContext, useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import { AccordionContext, AccordionGroupContext } from './context';
import type { AccordionProps } from './types';

/**
 * Accordion component for collapsible content.
 * It can be used standalone or inside an AccordionGroup.
 *
 * Border & radius ownership is deterministic to avoid square/rounded-corner
 * conflicts:
 * - **Standalone / gapped group** — the item is a self-contained rounded card.
 * - **Attached group** — the item is flat; the group renders the single rounded,
 *   clipped envelope so top/bottom corners are handled once, not per item.
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
}: AccordionProps) {
  const groupCtx = useContext(AccordionGroupContext);
  const {
    tokens,
    components: { accordion },
  } = useTheme();
  const id = useId(idProp, 'accordion');

  const isGroupManaged = groupCtx != null && idProp !== undefined;
  const isAttached = groupCtx?.attached ?? false;

  const { isOpen, toggle } = useCollapsible({
    value: idProp,
    group: isGroupManaged ? groupCtx : null,
    isOpen: controlledExpanded,
    defaultOpen: defaultExpanded,
    onOpenChange: onChange,
    disabled,
  });

  const containerStyle = useMemo<ViewStyle>(() => {
    const backgroundColor = accordion.container.backgroundColor;

    // Attached group: item is flat, the group owns the rounded/clipped envelope.
    if (isGroupManaged && isAttached) {
      return {
        backgroundColor,
        borderRadius: 0,
        borderWidth: 0,
        overflow: 'hidden',
      };
    }

    // Standalone or gapped group: self-contained rounded card.
    const effectiveRadius = radius ?? groupCtx?.radius ?? tokens.radius.xl;
    const isBordered = controlledBordered ?? true;
    return {
      backgroundColor,
      borderRadius: effectiveRadius,
      borderWidth: isBordered ? 1 : 0,
      borderColor: tokens.color.border.default,
      overflow: 'hidden',
    };
  }, [
    accordion.container.backgroundColor,
    isGroupManaged,
    isAttached,
    radius,
    groupCtx?.radius,
    tokens,
    controlledBordered,
  ]);

  const contextValue = useMemo(
    () => ({ expanded: isOpen, toggle, disabled }),
    [isOpen, toggle, disabled]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <View nativeID={id} style={[containerStyle, style]}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
}
