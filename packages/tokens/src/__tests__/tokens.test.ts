import {
  primitive,
  lightTokens,
  darkTokens,
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
  test('bg.default is white', () => {
    expect(lightTokens.color.bg.default).toBe('#FFFFFF');
  });

  test('text.primary is near-black', () => {
    expect(lightTokens.color.text.primary).toBe(primitive.color.gray[900]);
  });

  test('has shadow definitions', () => {
    expect(lightTokens.shadow.md).toHaveProperty('shadowRadius');
    expect(lightTokens.shadow.md).toHaveProperty('shadowOpacity');
  });
});

describe('semantic tokens — dark mode', () => {
  test('bg.default is near-black', () => {
    expect(darkTokens.color.bg.default).toBe(primitive.color.gray[950]);
  });

  test('text.primary is near-white', () => {
    expect(darkTokens.color.text.primary).toBe(primitive.color.gray[50]);
  });

  test('brand colors are lighter in dark mode', () => {
    // In dark mode, brand.default should be a lighter stop than light mode
    expect(darkTokens.color.brand.default).toBe(primitive.color.brand[500]);
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
    expect(ct.button.size.sm.container.height).toBe(32);
    expect(ct.button.size.md.container.height).toBe(44);
    expect(ct.button.size.lg.container.height).toBe(52);
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

  test('badge has all variant keys', () => {
    const variants = [
      'default',
      'brand',
      'success',
      'warning',
      'error',
      'info',
    ] as const;
    variants.forEach((v) => {
      expect(ct.badge.variant[v]).toBeDefined();
      expect(ct.badge.variant[v].bg).toBeDefined();
      expect(ct.badge.variant[v].text).toBeDefined();
    });
  });

  test('toast container has zIndex-appropriate structure', () => {
    expect(ct.toast.container).toHaveProperty('borderRadius');
    expect(ct.toast.container).toHaveProperty('paddingHorizontal');
  });
});
