import { resolveTimingPreset } from '../motion';

jest.mock('react-native', () => ({
  View: 'View',
  Text: 'Text',
  StyleSheet: { create: jest.fn() },
}));

jest.mock('react-native-reanimated', () => ({
  Easing: {
    bezier: jest.fn((x1: number, y1: number, x2: number, y2: number) =>
      jest.fn((t: number) => t)
    ),
    linear: jest.fn((t: number) => t),
  },
  SharedTransition: null,
  withSpring: jest.fn(),
  withTiming: jest.fn(),
}));

describe.skip('resolveTimingPreset', () => {
  it('returns duration and easing compatible with withTiming for fadeIn', () => {
    const r = resolveTimingPreset('fadeIn');
    expect(typeof r.duration).toBe('number');
    expect(r.duration).toBeGreaterThan(0);
    expect(r.easing).toBeDefined();
  });
});
