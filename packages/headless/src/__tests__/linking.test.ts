import { openSafeUrl, parseUrl } from '../linking';

(globalThis as Record<string, unknown>).__DEV__ = true;

const mockCanOpenURL = jest.fn();
const mockOpenURL = jest.fn();

jest.mock('react-native', () => ({
  Linking: {
    canOpenURL: (...args: unknown[]) => mockCanOpenURL(...args),
    openURL: (...args: unknown[]) => mockOpenURL(...args),
  },
}));

beforeEach(() => {
  mockCanOpenURL.mockReset();
  mockOpenURL.mockReset();
});

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

  it('allows tel:', () => {
    expect(parseUrl('tel:+1234567890')?.safe).toBe(true);
  });

  it('allows sms:', () => {
    expect(parseUrl('sms:+1234567890')?.safe).toBe(true);
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

describe('openSafeUrl', () => {
  it('opens allowed https URL', async () => {
    mockCanOpenURL.mockResolvedValue(true);
    mockOpenURL.mockResolvedValue(undefined);

    await openSafeUrl('https://example.com');

    expect(mockCanOpenURL).toHaveBeenCalledWith('https://example.com');
    expect(mockOpenURL).toHaveBeenCalledWith('https://example.com');
  });

  it('opens allowed http URL', async () => {
    mockCanOpenURL.mockResolvedValue(true);
    mockOpenURL.mockResolvedValue(undefined);

    await openSafeUrl('http://example.com');

    expect(mockOpenURL).toHaveBeenCalledWith('http://example.com');
  });

  it('does not call openURL for blocked javascript: scheme', async () => {
    await openSafeUrl('javascript:alert(1)');

    expect(mockCanOpenURL).not.toHaveBeenCalled();
    expect(mockOpenURL).not.toHaveBeenCalled();
  });

  it('does not call openURL for blocked file: scheme', async () => {
    await openSafeUrl('file:///etc/passwd');

    expect(mockCanOpenURL).not.toHaveBeenCalled();
    expect(mockOpenURL).not.toHaveBeenCalled();
  });

  it('does not call openURL for invalid URL', async () => {
    await openSafeUrl('');

    expect(mockCanOpenURL).not.toHaveBeenCalled();
    expect(mockOpenURL).not.toHaveBeenCalled();
  });

  it('does not call openURL when canOpenURL returns false', async () => {
    mockCanOpenURL.mockResolvedValue(false);

    await openSafeUrl('https://example.com');

    expect(mockCanOpenURL).toHaveBeenCalledWith('https://example.com');
    expect(mockOpenURL).not.toHaveBeenCalled();
  });
});
