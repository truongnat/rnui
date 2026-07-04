import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseCodeBlockOptions {
  code?: string;
  onCopy?: () => void;
}

export interface UseCodeBlockReturn {
  copied: boolean;
  copy: (text: string) => void;
  lines: string[];
}

export function useCodeBlock({
  code = '',
  onCopy,
}: UseCodeBlockOptions = {}): UseCodeBlockReturn {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = useCallback(
    (text: string) => {
      if (!text) return;
      try {
        void navigator.clipboard.writeText(text);
      } catch {
        /* Clipboard not available in this environment */
      }
      setCopied(true);
      onCopy?.();
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    },
    [onCopy]
  );

  const lines = code.split('\n');

  return { copied, copy, lines };
}
