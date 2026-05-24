import { createContext, useContext, type ReactNode } from 'react';

const AlertTextColorContext = createContext<string | null>(null);

export function AlertTextColorProvider({
  textColor,
  children,
}: {
  textColor: string;
  children: ReactNode;
}) {
  return (
    <AlertTextColorContext.Provider value={textColor}>
      {children}
    </AlertTextColorContext.Provider>
  );
}

export function useAlertTextColor(): string | null {
  return useContext(AlertTextColorContext);
}
