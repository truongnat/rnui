import { useCallback, useState } from 'react';

/**
 * Minimal control surface a parent group exposes so a collapsible item can
 * delegate its open/close state (accordion-style coordination).
 */
export interface CollapsibleGroupControl {
  /** Whether the item identified by `value` is currently open. */
  isOpen: (value: string) => boolean;
  /** Toggle the item identified by `value`. */
  toggle: (value: string) => void;
}

export interface UseCollapsibleOptions {
  /**
   * Unique identifier within a group. When present together with `group`,
   * open state is delegated to the group (group-controlled mode).
   */
  value?: string;
  /** Group control surface (from a parent CollapsibleGroup/AccordionGroup). */
  group?: CollapsibleGroupControl | null;
  /** Controlled open state. Presence switches the hook to controlled mode. */
  isOpen?: boolean;
  /** Initial open state for uncontrolled mode. */
  defaultOpen?: boolean;
  /** Fired whenever the open state should change (all modes). */
  onOpenChange?: (open: boolean) => void;
  /** When true, toggling is a no-op and `isEnabled` is false. */
  disabled?: boolean;
}

export interface UseCollapsibleReturn {
  /** Whether collapsible behavior is active (false when disabled). */
  isEnabled: boolean;
  /** Whether the content is currently expanded. */
  isOpen: boolean;
  /** Toggle open/closed — dispatches to group, controlled callback, or internal state. */
  toggle: () => void;
}

/**
 * Reusable collapsible state machine, inspired by Astryx `useCollapsible`.
 *
 * Supports three modes, resolved in priority order:
 * 1. **group-controlled** — inside a group with a `value` (state lives in the group);
 * 2. **controlled** — `isOpen` is provided (parent owns the state);
 * 3. **uncontrolled** — self-managed with `defaultOpen`.
 *
 * `onOpenChange` fires in every mode so callers get a single notification hook.
 *
 * @see https://astryx.atmeta.com/components/useCollapsible
 */
export function useCollapsible({
  value,
  group,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
}: UseCollapsibleOptions = {}): UseCollapsibleReturn {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isGroupManaged = group != null && value !== undefined;
  const isControlled = controlledOpen !== undefined;

  let isOpen: boolean;
  if (isGroupManaged) {
    isOpen = group.isOpen(value);
  } else if (isControlled) {
    isOpen = controlledOpen;
  } else {
    isOpen = internalOpen;
  }

  const toggle = useCallback(() => {
    if (disabled) return;

    if (isGroupManaged) {
      group.toggle(value);
      onOpenChange?.(!group.isOpen(value));
      return;
    }

    if (isControlled) {
      onOpenChange?.(!controlledOpen);
      return;
    }

    setInternalOpen((prev) => {
      const next = !prev;
      onOpenChange?.(next);
      return next;
    });
  }, [
    disabled,
    isGroupManaged,
    group,
    value,
    isControlled,
    controlledOpen,
    onOpenChange,
  ]);

  return {
    isEnabled: !disabled,
    isOpen,
    toggle,
  };
}
