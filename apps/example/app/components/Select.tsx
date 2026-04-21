import React, { useCallback, useMemo, useState } from 'react';
import { useTokens, useToast } from '@truongdq01/headless';
import { Select, Typography } from '@truongdq01/ui';
import { DemoPage, DemoSection } from './_shared/DemoPage';
import { COUNTRIES, LARGE_COUNTRIES } from '../kitchen/constants';

export default function SelectScreen() {
  const t = useTokens();
  const toast = useToast();
  
  const [country, setCountry] = useState<string | undefined>();
  const [bigCountry, setBigCountry] = useState<string | undefined>();
  const [bigLoaded, setBigLoaded] = useState(15);
  const [bigLoadingMore, setBigLoadingMore] = useState(false);

  const bigOptions = useMemo(
    () => LARGE_COUNTRIES.slice(0, bigLoaded),
    [bigLoaded]
  );
  
  const bigHasMore = bigLoaded < LARGE_COUNTRIES.length;
  
  const onBigLoadMore = useCallback(() => {
    if (!bigHasMore || bigLoadingMore) return;
    setBigLoadingMore(true);
    // Simulate API delay
    setTimeout(() => {
      setBigLoaded((n) => Math.min(n + 12, LARGE_COUNTRIES.length));
      setBigLoadingMore(false);
    }, 500);
  }, [bigHasMore, bigLoadingMore]);

  return (
    <DemoPage
      title="Select"
      description="Select components allow users to choose one or more items from a list, supporting search, infinite scrolling, and customizable options."
    >
      <DemoSection title="Basic Picker">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          A standard dropdown for small to medium lists.
        </Typography>
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

      <DemoSection title="Search & Filtering">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Enable the searchable prop for large datasets to help users find options quickly via a text filter.
        </Typography>
        <Select
          label="Filtered Location"
          options={COUNTRIES}
          value={country}
          onChange={(v) => setCountry(v as string)}
          placeholder="Type to search…"
          searchable
        />
      </DemoSection>

      <DemoSection title="Performance & Pagination">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Built-in support for infinite scrolling. This example simulates loading more 
          data as the user reaches the end of the list.
        </Typography>
        <Select
          label="Paginated Dataset"
          options={bigOptions}
          value={bigCountry}
          onChange={(v) => setBigCountry(v as string)}
          placeholder="Scroll to load more content…"
          searchable
          hasMore={bigHasMore}
          loadingMore={bigLoadingMore}
          onLoadMore={onBigLoadMore}
        />
      </DemoSection>
    </DemoPage>
  );
}

