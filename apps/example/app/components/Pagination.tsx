import { useState } from 'react';
import { Pagination } from '@/components/ui/pagination';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function PaginationScreen() {
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
        <Pagination page={page} totalPages={10} onPageChange={setPage} />
      </DemoSection>

      <DemoSection
        title="More Siblings"
        description="The `siblings` prop controls how many pages show around the current one."
      >
        <Pagination
          page={page2}
          totalPages={12}
          siblings={2}
          onPageChange={setPage2}
        />
      </DemoSection>

      <DemoSection
        title="Few Pages"
        description="Compact ranges need no ellipsis."
      >
        <Pagination page={page} totalPages={4} onPageChange={setPage} />
      </DemoSection>

      <DemoSection
        title="Large Page Count"
        description="Truncates with ellipsis for many pages."
      >
        <Pagination page={page} totalPages={100} onPageChange={setPage} />
      </DemoSection>
    </DemoPage>
  );
}
