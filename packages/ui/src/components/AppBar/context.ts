import { createContext, useContext } from 'react';

export type AppBarTone = 'default' | 'inverse';

export const AppBarContext = createContext<AppBarTone>('default');

export function useAppBarTone(): AppBarTone {
  return useContext(AppBarContext);
}
