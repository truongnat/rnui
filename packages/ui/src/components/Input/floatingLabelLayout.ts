/** Line height multiplier for vertical centering estimates */
const LINE_HEIGHT_RATIO = 1.25;

/** Horizontal inset on floated label background (border notch) */
const LABEL_PAD_X = 4;

export type FloatingLabelLayout = {
  /** Vertical center when label rests inside the field */
  restTop: number;
  /** Negative offset: label center sits on the top border */
  activeTop: number;
  /** Space above the field so the floated label is not clipped */
  clipReserveTop: number;
  labelPadX: number;
  activeLineHeight: number;
};

type SizeStyle = {
  height: number;
  paddingVertical: number;
  fontSize: number;
};

type FloatingLabelTokens = {
  fontSize: { active: number; inactive: number };
};

/**
 * Derives floating-label positions from input size tokens (not hardcoded px).
 * Active label straddles the top border; inactive label centers in the field.
 */
export function getFloatingLabelLayout(
  sizeStyle: SizeStyle,
  floatingLabel: FloatingLabelTokens,
  borderWidth = 1
): FloatingLabelLayout {
  const innerHeight =
    sizeStyle.height - sizeStyle.paddingVertical * 2 - borderWidth * 2;

  const inactiveLineHeight = sizeStyle.fontSize * LINE_HEIGHT_RATIO;
  const activeLineHeight = floatingLabel.fontSize.active * LINE_HEIGHT_RATIO;

  const restTop = Math.max(0, (innerHeight - inactiveLineHeight) / 2);

  const activeTop = -(
    sizeStyle.paddingVertical +
    borderWidth / 2 +
    activeLineHeight / 2
  );

  const clipReserveTop = Math.ceil(activeLineHeight / 2);

  return {
    restTop,
    activeTop,
    clipReserveTop,
    labelPadX: LABEL_PAD_X,
    activeLineHeight,
  };
}
