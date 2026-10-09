'use client';

/**
 * Web preview kit — self-contained HTML/CSS approximations of the registry UI
 * components, consuming ScreenSchema props directly. Visual fidelity is enough
 * for the builder preview; it is not a native renderer.
 */

import { useState, type CSSProperties, type ReactNode } from 'react';

type StyleProp = CSSProperties | undefined;

type CommonProps = {
  children?: ReactNode;
  style?: StyleProp;
  id?: string;
};

const SPACING: Record<string, number> = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

const PADDING: Record<string, number> = {
  none: 0,
  sm: 12,
  md: 16,
  lg: 24,
};

function px(map: Record<string, number>, value: unknown, fallback: number) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value in map) return map[value];
  return fallback;
}

function enumOf<T extends string>(
  allowed: readonly T[],
  value: unknown,
  fallback: T
): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(' ');
}

// ---------------------------------------------------------------------------
// Layout

type StackProps = CommonProps & {
  direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  spacing?: string | number;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?: string;
  wrap?: boolean;
};

const JUSTIFY: Record<string, string> = {
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  center: 'center',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
};

export function PreviewStack({
  children,
  style,
  direction = 'column',
  spacing = 'sm',
  alignItems,
  justifyContent,
  wrap,
}: StackProps) {
  const merged: CSSProperties = {
    flexDirection: direction,
    gap: px(SPACING, spacing, 8),
    alignItems,
    justifyContent: justifyContent
      ? (JUSTIFY[justifyContent] ?? justifyContent)
      : undefined,
    flexWrap: wrap ? 'wrap' : undefined,
    ...style,
  };
  return (
    <div className="pk-stack" style={merged}>
      {children}
    </div>
  );
}

type BoxProps = CommonProps & { flex?: number };

export function PreviewBox({ children, style, flex }: BoxProps) {
  const merged: CSSProperties = {
    flex: typeof flex === 'number' ? flex : undefined,
    ...style,
  };
  return (
    <div className="pk-box" style={merged}>
      {children}
    </div>
  );
}

// Screen resolves to Stack via the renderer, but keep an alias for safety.
export const PreviewScreen = PreviewStack;

// ---------------------------------------------------------------------------
// Surfaces

type CardProps = CommonProps & {
  padding?: string | number;
  accessibilityLabel?: string;
};

export function PreviewCard({
  children,
  style,
  padding,
  accessibilityLabel,
}: CardProps) {
  const merged: CSSProperties = {
    padding: px(PADDING, padding, 16),
    ...style,
  };
  return (
    <article className="pk-card" style={merged} aria-label={accessibilityLabel}>
      {children}
    </article>
  );
}

const PAPER_VARIANTS = ['elevation', 'outlined', 'flat'] as const;

type PaperProps = CommonProps & {
  variant?: (typeof PAPER_VARIANTS)[number];
  square?: boolean;
  padding?: string | number;
};

export function PreviewPaper({
  children,
  style,
  variant,
  square,
  padding,
}: PaperProps) {
  const v = enumOf(PAPER_VARIANTS, variant, 'elevation');
  const merged: CSSProperties = {
    padding: px(PADDING, padding, 12),
    ...style,
  };
  return (
    <div
      className={cx('pk-paper', `pk-paper--${v}`, square && 'pk-paper--square')}
      style={merged}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Divider / Separator

const DIVIDER_EMPHASIS = ['default', 'light', 'strong'] as const;

type DividerProps = {
  id?: string;
  style?: StyleProp;
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  emphasis?: (typeof DIVIDER_EMPHASIS)[number];
  spacing?: string | number;
};

export function PreviewDivider({
  label,
  orientation,
  emphasis,
  spacing,
  style,
}: DividerProps) {
  const margin = px(SPACING, spacing, 16) / 2;
  const weight = emphasis === 'strong' ? 2 : 1;
  const opacity = emphasis === 'light' ? 0.5 : 1;

  if (label) {
    return (
      <div
        className="pk-divider--labeled"
        style={{ margin: `${margin}px 0`, opacity, ...style }}
      >
        {label}
      </div>
    );
  }

  const isVertical = orientation === 'vertical';
  const merged: CSSProperties = {
    margin: isVertical ? `0 ${margin}px` : `${margin}px 0`,
    borderTopWidth: isVertical ? 0 : weight,
    borderLeftWidth: isVertical ? weight : 0,
    opacity,
    ...style,
  };
  return (
    <hr
      className={cx('pk-divider', isVertical && 'pk-divider--vertical')}
      style={merged}
    />
  );
}

// ---------------------------------------------------------------------------
// Typography

const TEXT_VARIANTS = [
  'display',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption',
  'button',
  'overline',
  'label',
  'code',
  'inherit',
] as const;

const TEXT_COLORS = [
  'primary',
  'secondary',
  'success',
  'error',
  'info',
  'warning',
  'accent',
  'inherit',
] as const;

const TEXT_TAG: Partial<
  Record<(typeof TEXT_VARIANTS)[number], keyof HTMLElementTagNameMap>
> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  code: 'code',
  caption: 'span',
  overline: 'span',
  label: 'span',
};

const TEXT_COLOR_MAP: Record<string, string> = {
  secondary: 'var(--pk-text-secondary)',
  primary: 'var(--pk-primary)',
  success: 'var(--pk-success)',
  error: 'var(--pk-error)',
  info: 'var(--pk-info)',
  warning: 'var(--pk-warning)',
  accent: '#9333ea',
};

type TypographyProps = CommonProps & {
  variant?: (typeof TEXT_VARIANTS)[number];
  color?: (typeof TEXT_COLORS)[number];
  align?: 'left' | 'right' | 'center' | 'justify' | 'inherit';
  numberOfLines?: number;
  gutterBottom?: boolean;
};

export function PreviewTypography({
  children,
  style,
  variant,
  color,
  align,
  numberOfLines,
  gutterBottom,
}: TypographyProps) {
  const v = enumOf(TEXT_VARIANTS, variant, 'body1');
  const Tag = (TEXT_TAG[v] ?? 'p') as 'p';
  const merged: CSSProperties = {
    color: color && color !== 'inherit' ? TEXT_COLOR_MAP[color] : undefined,
    textAlign: align && align !== 'inherit' ? align : undefined,
    marginBottom: gutterBottom ? 8 : undefined,
    ...(typeof numberOfLines === 'number'
      ? {
          display: '-webkit-box',
          WebkitLineClamp: numberOfLines,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }
      : null),
    ...style,
  };
  return (
    <Tag className={cx('pk-text', `pk-text--${v}`)} style={merged}>
      {children}
    </Tag>
  );
}

// ---------------------------------------------------------------------------
// Button

const BUTTON_VARIANTS = [
  'solid',
  'outline',
  'ghost',
  'destructive',
  'text',
  'contained',
  'outlined',
] as const;
const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;

type ButtonProps = {
  id?: string;
  style?: StyleProp;
  label?: string;
  variant?: (typeof BUTTON_VARIANTS)[number];
  color?: string;
  size?: (typeof BUTTON_SIZES)[number];
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
  children?: ReactNode;
};

export function PreviewButton({
  label,
  variant,
  color,
  size,
  disabled,
  loading,
  fullWidth,
  onPress,
  accessibilityLabel,
  children,
  style,
}: ButtonProps) {
  const v = enumOf(BUTTON_VARIANTS, variant, 'solid');
  const s = enumOf(BUTTON_SIZES, size, 'md');
  const merged: CSSProperties = {
    width: fullWidth ? '100%' : undefined,
    ...style,
  };

  const colorStyle: CSSProperties =
    color === 'destructive' || v === 'destructive'
      ? {}
      : color &&
          color !== 'primary' &&
          color !== 'inherit' &&
          TEXT_COLOR_MAP[color]
        ? v === 'solid' || v === 'contained'
          ? { background: TEXT_COLOR_MAP[color] }
          : { color: TEXT_COLOR_MAP[color], borderColor: TEXT_COLOR_MAP[color] }
        : {};

  return (
    <button
      type="button"
      className={cx(
        'pk-button',
        `pk-button--${s}`,
        `pk-button--${v === 'contained' ? 'solid' : v}`
      )}
      style={{ ...merged, ...colorStyle }}
      disabled={disabled || loading}
      onClick={onPress}
      aria-label={accessibilityLabel}
    >
      {loading ? '…' : (label ?? children)}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Inputs

const INPUT_SIZES = ['sm', 'md', 'lg'] as const;
const TEXTFIELD_VARIANTS = ['outlined', 'filled', 'standard'] as const;

type InputLikeProps = {
  id?: string;
  style?: StyleProp;
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  error?: boolean | string;
  helperText?: string;
  size?: (typeof INPUT_SIZES)[number];
  disabled?: boolean;
  secureTextEntry?: boolean;
  variant?: (typeof TEXTFIELD_VARIANTS)[number];
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
  onChange?: (value: string) => void;
};

const INPUT_PADDING: Record<(typeof INPUT_SIZES)[number], string> = {
  sm: '6px 10px',
  md: '9px 12px',
  lg: '12px 14px',
};

/** Uncontrolled by default; schema `value` without `onChange` becomes defaultValue. */
export function PreviewInput(props: InputLikeProps) {
  const {
    label,
    placeholder,
    value,
    defaultValue,
    error,
    helperText,
    size,
    disabled,
    secureTextEntry,
    variant,
    multiline,
    rows,
    required,
    type,
    onChange,
    style,
  } = props;

  const s = enumOf(INPUT_SIZES, size, 'md');
  const v = enumOf(TEXTFIELD_VARIANTS, variant, 'outlined');
  const inputType = secureTextEntry ? 'password' : (type ?? 'text');
  const hasError = Boolean(error);
  const helper = typeof error === 'string' ? error : helperText;

  const controlStyle: CSSProperties = {
    padding: INPUT_PADDING[s],
    fontSize: s === 'sm' ? 13 : s === 'lg' ? 15 : 14,
  };

  const controlProps = {
    className: cx('pk-input', `pk-input--${v}`, hasError && 'pk-input--error'),
    style: controlStyle,
    placeholder,
    disabled,
    required,
    defaultValue:
      onChange === undefined ? (value ?? defaultValue) : defaultValue,
    value: onChange !== undefined ? value : undefined,
    onChange: onChange
      ? (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          onChange(e.target.value)
      : undefined,
  };

  const control = multiline ? (
    <textarea {...controlProps} rows={rows ?? 3} />
  ) : (
    <input {...controlProps} type={inputType} />
  );

  if (!label && !helper) {
    return <div style={style}>{control}</div>;
  }

  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: {control} input is nested inside this label
    <label className="pk-field" style={style}>
      {label ? (
        <span className="pk-field-label">
          {label}
          {required ? <span className="pk-field-required"> *</span> : null}
        </span>
      ) : null}
      {control}
      {helper ? (
        <span className={cx('pk-helper', hasError && 'pk-helper--error')}>
          {helper}
        </span>
      ) : null}
    </label>
  );
}

export const PreviewTextField = PreviewInput;

// ---------------------------------------------------------------------------
// Checkbox / Switch — uncontrolled local state for builder preview

type CheckboxProps = {
  id?: string;
  style?: StyleProp;
  label?: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: (typeof INPUT_SIZES)[number];
  onChange?: (checked: boolean) => void;
};

export function PreviewCheckbox({
  label,
  description,
  checked,
  defaultChecked,
  disabled,
  indeterminate,
  size,
  onChange,
  style,
}: CheckboxProps) {
  const [local, setLocal] = useState(checked ?? defaultChecked ?? false);
  const effective = onChange !== undefined ? (checked ?? false) : local;
  const s = enumOf(INPUT_SIZES, size, 'md');

  const toggle = () => {
    if (disabled) return;
    const next = !effective;
    if (onChange === undefined) setLocal(next);
    onChange?.(next);
  };

  return (
    <label
      className="pk-check-row"
      style={{ fontSize: s === 'sm' ? 13 : s === 'lg' ? 15 : 14, ...style }}
    >
      <input
        type="checkbox"
        checked={effective}
        disabled={disabled}
        ref={(el) => {
          if (el) el.indeterminate = Boolean(indeterminate);
        }}
        onChange={toggle}
      />
      <span>
        {label}
        {description ? (
          <span className="pk-check-desc">
            <br />
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}

type SwitchProps = {
  id?: string;
  style?: StyleProp;
  label?: string;
  description?: string;
  on?: boolean;
  defaultOn?: boolean;
  disabled?: boolean;
  size?: (typeof INPUT_SIZES)[number];
  onChange?: (on: boolean) => void;
};

export function PreviewSwitch({
  label,
  description,
  on,
  defaultOn,
  disabled,
  onChange,
  style,
}: SwitchProps) {
  const [local, setLocal] = useState(on ?? defaultOn ?? false);
  const effective = onChange !== undefined ? (on ?? false) : local;

  const toggle = () => {
    if (disabled) return;
    const next = !effective;
    if (onChange === undefined) setLocal(next);
    onChange?.(next);
  };

  const track = (
    <input
      type="checkbox"
      className="pk-switch"
      checked={effective}
      disabled={disabled}
      onChange={toggle}
    />
  );

  if (!label) return <span style={style}>{track}</span>;

  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: {track} switch input is nested inside this label
    <label className="pk-switch-row" style={style}>
      <span style={{ fontSize: 14 }}>
        {label}
        {description ? (
          <span className="pk-check-desc">
            <br />
            {description}
          </span>
        ) : null}
      </span>
      {track}
    </label>
  );
}

// ---------------------------------------------------------------------------
// Status: Badge / Chip / Alert / Avatar

const BADGE_VARIANTS = [
  'default',
  'brand',
  'accent',
  'success',
  'warning',
  'error',
  'info',
] as const;
const CHIP_VARIANTS = ['solid', 'outlined', 'subtle'] as const;
const ALERT_SEVERITIES = ['error', 'warning', 'info', 'success'] as const;
const ALERT_VARIANTS = ['standard', 'filled', 'outlined'] as const;
const AVATAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

type BadgeProps = {
  id?: string;
  style?: StyleProp;
  label?: string;
  count?: string;
  variant?: (typeof BADGE_VARIANTS)[number];
  size?: (typeof INPUT_SIZES)[number];
  dot?: boolean;
};

export function PreviewBadge({
  label,
  count,
  variant,
  size,
  dot,
  style,
}: BadgeProps) {
  const v = enumOf(BADGE_VARIANTS, variant, 'default');
  const s = enumOf(INPUT_SIZES, size, 'md');
  if (dot) {
    return (
      <span
        className={cx('pk-badge', 'pk-badge--dot', `pk-badge--${v}`)}
        style={style}
      />
    );
  }
  return (
    <span
      className={cx('pk-badge', `pk-badge--${s}`, `pk-badge--${v}`)}
      style={style}
    >
      {count ?? label}
    </span>
  );
}

type ChipProps = {
  id?: string;
  style?: StyleProp;
  label?: string;
  variant?: (typeof CHIP_VARIANTS)[number];
  color?: string;
  size?: (typeof INPUT_SIZES)[number];
  disabled?: boolean;
  children?: ReactNode;
};

export function PreviewChip({
  label,
  variant,
  size,
  disabled,
  children,
  style,
}: ChipProps) {
  const v = enumOf(CHIP_VARIANTS, variant, 'solid');
  const s = enumOf(INPUT_SIZES, size, 'md');
  return (
    <span
      className={cx('pk-chip', `pk-chip--${s}`, `pk-chip--${v}`)}
      style={{ opacity: disabled ? 0.5 : undefined, ...style }}
    >
      {label ?? children}
    </span>
  );
}

type AlertProps = CommonProps & {
  severity?: (typeof ALERT_SEVERITIES)[number];
  variant?: (typeof ALERT_VARIANTS)[number];
  title?: string;
};

export function PreviewAlert({
  children,
  severity,
  variant,
  title,
  style,
}: AlertProps) {
  const sev = enumOf(ALERT_SEVERITIES, severity, 'info');
  const v = enumOf(ALERT_VARIANTS, variant, 'standard');
  return (
    <div
      className={cx('pk-alert', `pk-alert--${sev}`, `pk-alert--${v}`)}
      style={style}
      role="alert"
    >
      {title ? <strong>{title}</strong> : null}
      {children}
    </div>
  );
}

type AvatarProps = {
  id?: string;
  style?: StyleProp;
  src?: string;
  initials?: string;
  size?: (typeof AVATAR_SIZES)[number];
  shape?: 'circle' | 'rounded';
  accessibilityLabel?: string;
};

export function PreviewAvatar({
  src,
  initials,
  size,
  shape,
  accessibilityLabel,
  style,
}: AvatarProps) {
  const s = enumOf(AVATAR_SIZES, size, 'md');
  return (
    <span
      className={cx(
        'pk-avatar',
        `pk-avatar--${s}`,
        shape === 'rounded' && 'pk-avatar--rounded'
      )}
      style={{
        ...(src
          ? {
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : null),
        ...style,
      }}
      aria-label={accessibilityLabel}
      role="img"
    >
      {src ? null : (initials ?? '?')}
    </span>
  );
}
