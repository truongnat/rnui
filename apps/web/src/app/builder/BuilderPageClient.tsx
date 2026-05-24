'use client';

import dynamic from 'next/dynamic';

const BuilderApp = dynamic(
  () => import('@/components/builder/BuilderApp').then((mod) => mod.BuilderApp),
  { ssr: false }
);

export default function BuilderPageClient() {
  return <BuilderApp />;
}
