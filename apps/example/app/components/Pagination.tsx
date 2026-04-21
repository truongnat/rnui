import React, { useState } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Pagination, Typography } from '@truongdq01/ui';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function PaginationScreen() {
  const t = useTokens();
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(5);

  return (
    <DemoPage
      title="Pagination"
      description="Pagination allows users to navigate through a large set of data divided into multiple pages."
    >
      <DemoSection title="Standard Pagination">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          The default look for navigating small to medium sized sets.
          Current page: {page}
        </Typography>
        <Pagination
          count={10}
          page={page}
          onChange={setPage}
          color="brand"
        />
      </DemoSection>

      <DemoSection title="Outlined & Circle">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Different shapes and variants to match your UI's aesthetic.
        </Typography>
        <View style={{ gap: t.spacing[4] }}>
          <Pagination
            count={8}
            variant="outline"
            page={page2}
            onChange={setPage2}
          />
          <Pagination
            count={8}
            shape="rounded"
            page={page2}
            onChange={setPage2}
            color="success"
          />
        </View>
      </DemoSection>

      <DemoSection title="Sizes">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Small, medium, and large sizes for different screen densities.
        </Typography>
        <View style={{ gap: t.spacing[4], alignItems: 'flex-start' }}>
          <Pagination count={5} size="sm" />
          <Pagination count={5} size="md" />
          <Pagination count={5} size="lg" />
        </View>
      </DemoSection>

      <DemoSection title="Complex Sets">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Automatic truncation for large number of pages.
        </Typography>
        <Pagination
          count={100}
          page={page}
          onChange={setPage}
          boundaryCount={2}
          siblingCount={1}
        />
      </DemoSection>
    </DemoPage>
  );
}

