'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { mockAIProvider } from './mockProvider';
import type { AIProvider } from './types';

const AIContext = createContext<AIProvider>(mockAIProvider);

export function AIProviderContext({
  provider,
  children,
}: {
  provider?: AIProvider;
  children: ReactNode;
}) {
  const value = useMemo(() => provider ?? mockAIProvider, [provider]);
  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}

export function useAIProvider(): AIProvider {
  return useContext(AIContext);
}
