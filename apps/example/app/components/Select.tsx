import { useCallback, useMemo, useState } from 'react';
import { useToast } from '@truongdq01/headless';
import { Select } from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { COUNTRIES, LARGE_COUNTRIES } from '@/demo/demoData';

export default function SelectScreen() {
  const toast = useToast();

  const [country, setCountry] = useState<string | undefined>();
  const [bigCountry, setBigCountry] = useState<string | undefined>();
  const [bigLoaded, setBigLoaded] = useState(15);
  const [bigLoadingMore, setBigLoadingMore] = useState(false);

  const bigOptions = useMemo(
    () => LARGE_COUNTRIES.slice(0, bigLoaded),
    [bigLoaded],
  );

  const bigHasMore = bigLoaded < LARGE_COUNTRIES.length;

  const onBigLoadMore = useCallback(() => {
    if (!bigHasMore || bigLoadingMore) return;
    setBigLoadingMore(true);
    setTimeout(() => {
      setBigLoaded((n) => Math.min(n + 12, LARGE_COUNTRIES.length));
      setBigLoadingMore(false);
    }, 500);
  }, [bigHasMore, bigLoadingMore]);

  return (
    <DemoPage
      title="Select"
      description="Choose one item from a list — search, infinite scroll, and custom options."
    >
      <DemoSection
        title="Basic Picker"
        description="Standard dropdown for small to medium lists."
      >
        <Select
          label="Country Selection"
          options={COUNTRIES.slice(0, 10)}
          value={country}
          onChange={(v) => {
            setCountry(v as string);
            toast.info(`Selected: ${v}`);
          }}
          placeholder="Choose a country…"
        />
      </DemoSection>

      <DemoSection
        title="Search & Filtering"
        description="Searchable prop filters large datasets as the user types."
      >
        <Select
          label="Filtered Location"
          options={COUNTRIES}
          value={country}
          onChange={(v) => setCountry(v as string)}
          placeholder="Type to search…"
          searchable
        />
      </DemoSection>

      <DemoSection
        title="Infinite Scroll"
        description="Load more options as the user scrolls to the end."
      >
        <Select
          label="Paginated Dataset"
          options={bigOptions}
          value={bigCountry}
          onChange={(v) => setBigCountry(v as string)}
          placeholder="Scroll to load more…"
          searchable
          hasMore={bigHasMore}
          loadingMore={bigLoadingMore}
          onLoadMore={onBigLoadMore}
        />
      </DemoSection>
    </DemoPage>
  );
}
