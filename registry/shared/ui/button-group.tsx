import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
} from 'react';
import { View, type ViewProps } from 'react-native';
import { tv } from 'tailwind-variants';
import type {
  ButtonSize,
  ButtonVariant,
} from '@/components/ui/button';
import { cn } from '@/lib/utils';

const buttonGroupVariants = tv({
  base: 'flex-row items-stretch self-start',
  variants: {
    variant: {
      attached: '',
      segmented: 'gap-1 rounded-lg bg-muted p-1',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: { variant: 'attached', orientation: 'horizontal' },
});

export type ButtonGroupVariant = 'attached' | 'segmented';
export type ButtonGroupOrientation = 'horizontal' | 'vertical';

type Position = 'only' | 'first' | 'middle' | 'last';

/** Radius on the outer ends only; inner seams collapse to a single edge. */
const ATTACHED_POSITION_CLASS: Record<
  ButtonGroupOrientation,
  Record<Position, string>
> = {
  horizontal: {
    only: '',
    first: 'rounded-r-none',
    middle: '-ml-px rounded-none',
    last: '-ml-px rounded-l-none',
  },
  vertical: {
    only: '',
    first: 'rounded-b-none',
    middle: '-mt-px rounded-none',
    last: '-mt-px rounded-t-none',
  },
};

type InjectableProps = {
  variant?: ButtonVariant | 'default' | 'outline';
  size?: ButtonSize | 'default' | 'sm' | 'lg';
  disabled?: boolean;
  className?: string;
};

export interface ButtonGroupProps extends ViewProps {
  /**
   * `attached` joins children edge-to-edge (radius on the ends only,
   * shared borders collapse via negative margin). `segmented` wraps
   * children in a muted pill — pair with `Toggle`/ghost children.
   */
  variant?: ButtonGroupVariant;
  orientation?: ButtonGroupOrientation;
  /** Default variant propagated to children that don't set their own. */
  buttonVariant?: ButtonVariant;
  /** Default size propagated to children that don't set their own. */
  size?: ButtonSize;
  /** Disables every child in the group. */
  disabled?: boolean;
  /** Stretch to parent width; horizontal children share space equally. */
  fullWidth?: boolean;
  /** Accessible label for the grouped controls. */
  label?: string;
  className?: string;
}

export function ButtonGroup({
  variant = 'attached',
  orientation = 'horizontal',
  buttonVariant,
  size,
  disabled = false,
  fullWidth = false,
  label = 'Button group',
  className,
  children,
  ...props
}: ButtonGroupProps) {
  const items = Children.toArray(children);
  const horizontal = orientation === 'horizontal';
  const injectedVariant = buttonVariant ?? (variant === 'attached' ? 'outline' : 'ghost');

  return (
    <View
      accessibilityRole="toolbar"
      accessibilityLabel={label}
      className={cn(
        buttonGroupVariants({ variant, orientation }),
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {items.map((child, index) => {
        if (!isValidElement<InjectableProps>(child)) return child;

        const position: Position =
          items.length === 1
            ? 'only'
            : index === 0
              ? 'first'
              : index === items.length - 1
                ? 'last'
                : 'middle';
        const positionClass =
          variant === 'attached'
            ? ATTACHED_POSITION_CLASS[orientation][position]
            : 'rounded-md border-0 bg-transparent';

        return cloneElement(child as ReactElement<InjectableProps>, {
          variant: child.props.variant ?? injectedVariant,
          size: child.props.size ?? size,
          disabled: disabled || child.props.disabled,
          className: cn(
            positionClass,
            fullWidth && horizontal && 'flex-1',
            child.props.className
          ),
        });
      })}
    </View>
  );
}
