import { useState } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Pagination } from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function PaginationScreen() {
  const t = useTokens();
  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(5);

  return (
    <DemoPage
      title="Pagination"
      description="Navigate large datasets divided into pages."
    >
      <DemoSection
        title="Standard"
        description={`Default pagination. Current page: ${page}`}
      >
        <Pagination count={10} page={page} onChange={setPage} />
      </DemoSection>

      <DemoSection title="Outlined & Rounded" description="Shape and variant options.">
        <View style={{ gap: t.spacing[4] }}>
          <Pagination
            count={8}
            variant="outlined"
            page={page2}
            onChange={setPage2}
          />
          <Pagination
            count={8}
            shape="rounded"
            page={page2}
            onChange={setPage2}
          />
        </View>
      </DemoSection>

      <DemoSection title="Sizes" description="sm, md, and lg densities.">
        <View style={{ gap: t.spacing[4], alignItems: 'flex-start' }}>
          <Pagination count={5} size="sm" />
          <Pagination count={5} size="md" />
          <Pagination count={5} size="lg" />
        </View>
      </DemoSection>

      <DemoSection title="Large Page Count" description="Truncates with ellipsis for many pages.">
        <Pagination count={100} page={page} onChange={setPage} />
      </DemoSection>
    </DemoPage>
  );
}
