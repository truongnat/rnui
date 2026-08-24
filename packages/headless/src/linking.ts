import { Linking } from 'react-native';

const ALLOWED_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:', 'sms:'];

export function parseUrl(url: string): { scheme: string; safe: boolean } | null {
  try {
    const { protocol } = new URL(url);
    return {
      scheme: protocol,
      safe: ALLOWED_SCHEMES.includes(protocol),
    };
  } catch {
    return null;
  }
}

export async function openSafeUrl(url: string): Promise<void> {
  const parsed = parseUrl(url);
  if (!parsed) {
    if (__DEV__) console.warn(`[openSafeUrl] Invalid URL: ${url}`);
    return;
  }
  if (!parsed.safe) {
    if (__DEV__)
      console.warn(
        `[openSafeUrl] Blocked URL with scheme "${parsed.scheme}": ${url}`
      );
    return;
  }
  const canOpen = await Linking.canOpenURL(url);
  if (!canOpen) {
    return;
  }
  await Linking.openURL(url);
}
