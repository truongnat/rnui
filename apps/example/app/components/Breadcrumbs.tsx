import React from 'react';
import { View } from 'react-native';
import { Breadcrumbs, Typography, Link } from '@truongdq01/ui';
import { Home, ChevronRight, Slash } from 'lucide-react-native';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function BreadcrumbsScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage 
      title="Breadcrumbs" 
      description="Breadcrumbs allow users to make selections from a range of values."
    >
      <DemoSection title="Basic Breadcrumbs">
        <Breadcrumbs>
          <Link onPress={() => {}}>Home</Link>
          <Link onPress={() => {}}>Components</Link>
          <Typography color="secondary">Breadcrumbs</Typography>
        </Breadcrumbs>
      </DemoSection>

      <DemoSection title="Custom Separator">
        <Breadcrumbs separator={<Slash size={14} color={tokens.color.text.tertiary} />}>
          <Link onPress={() => {}}>Home</Link>
          <Link onPress={() => {}}>Store</Link>
          <Link onPress={() => {}}>Electronics</Link>
          <Typography color="secondary">Phones</Typography>
        </Breadcrumbs>
      </DemoSection>

      <DemoSection title="With Icons">
        <Breadcrumbs>
          <Link onPress={() => {}} leadingIcon={<Home size={16} />}>Home</Link>
          <Link onPress={() => {}}>Settings</Link>
          <Typography color="secondary">Security</Typography>
        </Breadcrumbs>
      </DemoSection>
      
      <DemoSection title="Max Items / Collapsed">
        <Typography variant="body2" gutterBottom>
            Breadcrumbs can automatically collapse when they exceed a certain limit.
        </Typography>
        <Breadcrumbs maxItems={3}>
          <Link onPress={() => {}}>Home</Link>
          <Link onPress={() => {}}>Catalog</Link>
          <Link onPress={() => {}}>Winter</Link>
          <Link onPress={() => {}}>Sale</Link>
          <Typography color="secondary">Clothing</Typography>
        </Breadcrumbs>
      </DemoSection>
    </DemoPage>
  );
}

