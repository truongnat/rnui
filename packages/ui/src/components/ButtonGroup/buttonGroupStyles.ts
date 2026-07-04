import type { ViewStyle } from 'react-native';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';
export type ButtonGroupPosition = 'only' | 'first' | 'middle' | 'last';

export function resolveButtonGroupPosition(
  index: number,
  count: number
): ButtonGroupPosition {
  if (count <= 1) return 'only';
  if (index === 0) return 'first';
  if (index === count - 1) return 'last';
  return 'middle';
}

type GroupVariant = 'solid' | 'outline' | 'ghost' | 'destructive';

type ButtonGroupStyleParams = {
  position: ButtonGroupPosition;
  orientation: ButtonGroupOrientation;
  variant: GroupVariant;
  radius: number;
  dividerWidth: number;
  dividerColor: string;
  solidDividerColor: string;
  destructiveDividerColor: string;
};

function applyCornerRadii(
  style: ViewStyle,
  position: ButtonGroupPosition,
  orientation: ButtonGroupOrientation,
  radius: number
): void {
  if (orientation === 'horizontal') {
    if (position === 'only' || position === 'first') {
      style.borderTopLeftRadius = radius;
      style.borderBottomLeftRadius = radius;
    }
    if (position === 'only' || position === 'last') {
      style.borderTopRightRadius = radius;
      style.borderBottomRightRadius = radius;
    }
    return;
  }

  if (position === 'only' || position === 'first') {
    style.borderTopLeftRadius = radius;
    style.borderTopRightRadius = radius;
  }
  if (position === 'only' || position === 'last') {
    style.borderBottomLeftRadius = radius;
    style.borderBottomRightRadius = radius;
  }
}

/** One shared edge per seam — outer shell split across segments (outline/destructive). */
function applySegmentedShell(
  style: ViewStyle,
  position: ButtonGroupPosition,
  orientation: ButtonGroupOrientation,
  width: number,
  color: string
): void {
  if (orientation === 'horizontal') {
    style.borderTopWidth = width;
    style.borderBottomWidth = width;
    style.borderTopColor = color;
    style.borderBottomColor = color;

    if (position === 'only' || position === 'first') {
      style.borderLeftWidth = width;
      style.borderLeftColor = color;
    }
    if (position === 'only' || position === 'last') {
      style.borderRightWidth = width;
      style.borderRightColor = color;
    }
    if (position === 'middle' || position === 'last') {
      style.borderLeftWidth = width;
      style.borderLeftColor = color;
    }
    return;
  }

  style.borderLeftWidth = width;
  style.borderRightWidth = width;
  style.borderLeftColor = color;
  style.borderRightColor = color;

  if (position === 'only' || position === 'first') {
    style.borderTopWidth = width;
    style.borderTopColor = color;
  }
  if (position === 'only' || position === 'last') {
    style.borderBottomWidth = width;
    style.borderBottomColor = color;
  }
  if (position === 'middle' || position === 'last') {
    style.borderTopWidth = width;
    style.borderTopColor = color;
  }
}

/** Solid fills — single start-edge divider between segments (Astryx). */
function applyStartDivider(
  style: ViewStyle,
  position: ButtonGroupPosition,
  orientation: ButtonGroupOrientation,
  width: number,
  color: string
): void {
  if (position === 'first' || position === 'only') {
    return;
  }

  if (orientation === 'horizontal') {
    style.borderLeftWidth = width;
    style.borderLeftColor = color;
    return;
  }

  style.borderTopWidth = width;
  style.borderTopColor = color;
}

export function getButtonGroupStyle({
  position,
  orientation,
  variant,
  radius,
  dividerWidth,
  dividerColor,
  solidDividerColor,
  destructiveDividerColor,
}: ButtonGroupStyleParams): ViewStyle {
  const style: ViewStyle = { borderRadius: 0 };

  applyCornerRadii(style, position, orientation, radius);

  if (variant === 'outline') {
    applySegmentedShell(style, position, orientation, dividerWidth, dividerColor);
    return style;
  }

  if (variant === 'solid' || variant === 'destructive') {
    applyStartDivider(
      style,
      position,
      orientation,
      dividerWidth,
      variant === 'solid' ? solidDividerColor : destructiveDividerColor
    );
    return style;
  }

  return style;
}
