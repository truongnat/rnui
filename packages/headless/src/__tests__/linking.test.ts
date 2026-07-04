import { Linking } from 'react-native';
import { parseUrl } from '../linking';

const mockCanOpenURL = Linking.canOpenURL as jest.Mock;
const mockOpenURL = Linking.openURL as jest.Mock;

jest.mock('react-native', () => ({
  Linking: {
    canOpenURL: jest.fn(),
    openURL: jest.fn(),
  },
  Platform: { OS: 'ios' },
}));

describe('parseUrl', () => {
  it('allows http:', () => {
    expect(parseUrl('https://example.com')?.safe).toBe(true);
  });

  it('allows https:', () => {
    expect(parseUrl('https://example.com')?.safe).toBe(true);
  });

  it('allows mailto:', () => {
    expect(parseUrl('mailto:test@example.com')?.safe).toBe(true);
  });

  it('blocks javascript:', () => {
    expect(parseUrl('javascript:alert(1)')?.safe).toBe(false);
  });

  it('blocks file:', () => {
    expect(parseUrl('file:///etc/passwd')?.safe).toBe(false);
  });

  it('blocks data:', () => {
    expect(parseUrl('data:text/html,<script>')?.safe).toBe(false);
  });

  it('returns null for invalid URL', () => {
    expect(parseUrl('')).toBeNull();
  });
});
