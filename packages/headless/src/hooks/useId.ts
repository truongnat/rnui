import { useId as useReactId, useMemo } from 'react';

/**
 * Hook to generate a unique ID.
 * If an id is provided in props, it will be used.
 * Otherwise, a unique ID will be generated with an optional prefix.
 * 
 * @param idProp - Optional ID provided via props
 * @param prefix - Optional prefix for the generated ID (e.g., 'alert-dialog')
 * @returns A unique ID string
 */
export function useId(idProp?: string, prefix?: string): string {
  const reactId = useReactId();
  
  return useMemo(() => {
    if (idProp) return idProp;
    
    // React's useId returns IDs like ":r0:". 
    // We strip the colons for cleaner string IDs in elements.
    const cleanId = reactId.replace(/:/g, '');
    return prefix ? `${prefix}-${cleanId}` : cleanId;
  }, [idProp, reactId, prefix]);
}
