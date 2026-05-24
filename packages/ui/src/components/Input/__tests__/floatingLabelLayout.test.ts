import { lightTokens, resolveComponentTokens } from '@truongdq01/tokens';
import { getFloatingLabelLayout } from '../floatingLabelLayout';

describe('getFloatingLabelLayout', () => {
  const input = resolveComponentTokens(lightTokens).input;

  it('centers md label within 44dp field when inactive', () => {
    const layout = getFloatingLabelLayout(
      input.size.md,
      input.floatingLabel,
      input.container.borderWidth
    );
    expect(layout.restTop).toBeGreaterThan(0);
    expect(layout.restTop).toBeLessThan(12);
  });

  it('moves active label above the field to straddle the top border', () => {
    const layout = getFloatingLabelLayout(
      input.size.md,
      input.floatingLabel,
      input.container.borderWidth
    );
    expect(layout.activeTop).toBeLessThan(0);
    expect(Math.abs(layout.activeTop)).toBeGreaterThan(
      input.size.md.paddingVertical
    );
  });

  it('reserves clip space for the floated label', () => {
    const layout = getFloatingLabelLayout(
      input.size.md,
      input.floatingLabel,
      input.container.borderWidth
    );
    expect(layout.clipReserveTop).toBeGreaterThan(0);
    expect(layout.clipReserveTop).toBeLessThanOrEqual(
      Math.ceil(layout.activeLineHeight / 2) + 1
    );
  });
});
