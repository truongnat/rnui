import React from 'react';

export interface MenuContextValue {
  getItemProps: (options: { onClick?: () => void; disabled?: boolean }) => Record<string, unknown>;
}

export const MenuContext = React.createContext<MenuContextValue | null>(null);

export function useMenuContext(): MenuContextValue | null {
  return React.useContext(MenuContext);
}
