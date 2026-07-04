import type { Brand } from '@truongdq01/tokens';
import { allBrands } from '@truongdq01/themes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { loadPersistedBrandId } from './demoThemeStorage';

export function resolveBrandById(id: string | null | undefined): Brand | undefined {
  if (id == null || id === '') {
    return undefined;
  }
  return allBrands.find((brand) => brand.id === id);
}

export function usePersistedBrand() {
  const [brandId, setBrandId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const stored = await loadPersistedBrandId();
        if (!cancelled) {
          setBrandId(stored);
        }
      } finally {
        if (!cancelled) {
          setHydrated(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const brand = useMemo(() => resolveBrandById(brandId), [brandId]);

  const setPersistedBrandId = useCallback((id: string | null) => {
    setBrandId(id);
  }, []);

  return { brand, brandId, setPersistedBrandId, hydrated };
}
