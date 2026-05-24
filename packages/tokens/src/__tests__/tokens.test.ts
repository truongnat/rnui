import {
  darkTokens,
  lightTokens,
  primitive,
  resolveComponentTokens,
} from '@truongdq01/tokens';

describe('primitive tokens', () => {
  test('spacing scale follows 4px base', () => {
    expect(primitive.spacing[1]).toBe(4);
    expect(primitive.spacing[2]).toBe(8);
    expect(primitive.spacing[4]).toBe(16);
    expect(primitive.spacing[8]).toBe(32);
  });

  test('all color ramps have expected stops', () => {
    const ramp = primitive.color.brand;
    expect(ramp[50]).toBeDefined();
    expect(ramp[500]).toBeDefined();
    expect(ramp[900]).toBeDefined();
  });

  test('radius full is 9999', () => {
    expect(primitive.radius.full).toBe(9999);
  });
});

describe('semantic tokens — light mode', () => {
  test('bg.default is soft premium canvas', () => {
    expect(lightTokens.color.bg.default).toBe('#F3F1F8');
  });

  test('text.primary is readable slate', () => {
    expect(lightTokens.color.text.primary).toBe(primitive.color.gray[900]);
  });

  test('has shadow definitions', () => {
    expect(lightTokens.shadow.md).toHaveProperty('shadowRadius');
    expect(lightTokens.shadow.md).toHaveProperty('shadowOpacity');
  });
});

describe('semantic tokens — dark mode', () => {
  test('bg.default is deep slate (not pure black)', () => {
    expect(darkTokens.color.bg.default).toBe('#12121C');
  });

  test('text.primary is near-white', () => {
    expect(darkTokens.color.text.primary).toBe(primitive.color.gray[50]);
  });

  test('brand colors are lighter in dark mode', () => {
    // In dark mode, brand.default should be a lighter stop than light mode
    expect(darkTokens.color.brand.default).toBe('#A78BFA');
    expect(lightTokens.color.brand.default).toBe(primitive.color.brand[600]);
  });
});

describe('component tokens', () => {
  const ct = resolveComponentTokens(lightTokens);

  test('button solid has backgroundColor', () => {
    expect(ct.button.variant.solid.container.backgroundColor).toBe(
      lightTokens.color.brand.default
    );
  });

  test('button sizes have correct heights', () => {
    expect(ct.button.size.sm.container.height).toBe(36);
    expect(ct.button.size.md.container.height).toBe(44);
    expect(ct.button.size.lg.container.height).toBe(52);
  });

  test('input sizes align with button heights', () => {
    expect(ct.input.size.sm.height).toBe(36);
    expect(ct.input.size.md.height).toBe(44);
    expect(ct.input.size.lg.height).toBe(52);
  });

  test('button disabled reduces opacity', () => {
    expect(ct.button.disabled.container.opacity).toBeLessThan(1);
  });

  test('input has all required state keys', () => {
    expect(ct.input.state.default).toBeDefined();
    expect(ct.input.state.focused).toBeDefined();
    expect(ct.input.state.error).toBeDefined();
    expect(ct.input.state.disabled).toBeDefined();
  });

  test('badge has all variant keys with visible surfaces', () => {
    const variants = [
      'default',
      'brand',
      'accent',
      'success',
      'warning',
      'error',
      'info',
    ] as const;
    variants.forEach((v) => {
      expect(ct.badge.variant[v]).toBeDefined();
      expect(ct.badge.variant[v].bg).toBeDefined();
      expect(ct.badge.variant[v].text).toBeDefined();
      expect(ct.badge.variant[v].border).toBeDefined();
    });
  });

  test('toast container has zIndex-appropriate structure', () => {
    expect(ct.toast.container).toHaveProperty('borderRadius');
    expect(ct.toast.container).toHaveProperty('paddingHorizontal');
  });

  test('card default has visible surface without relying on shadow', () => {
    expect(ct.card.container.backgroundColor).toBe(
      lightTokens.color.surface.default
    );
    expect(ct.card.container.borderWidth).toBeGreaterThanOrEqual(1);
    expect(ct.card.container.borderColor).toBe(
      lightTokens.color.border.default
    );
  });

  test('paper default has visible border and background', () => {
    expect(ct.paper.container.backgroundColor).toBeDefined();
    expect(ct.paper.container.borderWidth).toBeGreaterThanOrEqual(1);
    expect(ct.paper.variant.flat.borderWidth).toBeGreaterThanOrEqual(1);
    expect(ct.paper.variant.flat.backgroundColor).toBe(
      lightTokens.color.surface.sunken
    );
  });

  test('input has background and input border token', () => {
    expect(ct.input.container.backgroundColor).toBe(
      lightTokens.color.surface.default
    );
    expect(ct.input.container.borderColor).toBe(lightTokens.color.border.input);
  });

  test('chip outlined default uses sunken fill for dark-surface visibility', () => {
    expect(ct.chip.variant.outlined.bg).toBe(lightTokens.color.surface.sunken);
    expect(ct.chip.variant.outlined.bg).not.toBe('transparent');
  });

  test('semantic borders are stronger than previous subtle-only hierarchy', () => {
    expect(lightTokens.color.border.default).not.toBe('#E4E0EC');
    expect(lightTokens.color.border.subtle).not.toBe('#EEEAF4');
  });
});
