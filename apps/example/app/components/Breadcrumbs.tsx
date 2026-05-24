import { View } from 'react-native';
import { Breadcrumbs, Typography, Link } from '@truongdq01/ui';
import { Home, Slash } from 'lucide-react-native';
import { useTheme } from '@truongdq01/headless';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function BreadcrumbsScreen() {
  const { tokens } = useTheme();

  return (
    <DemoPage
      title="Breadcrumbs"
      description="Hierarchical navigation showing the user's location in the app."
    >
      <DemoSection title="Basic">
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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing[1] }}>
            <Home size={16} color={tokens.color.brand.default} />
            <Link onPress={() => {}}>Home</Link>
          </View>
          <Link onPress={() => {}}>Settings</Link>
          <Typography color="secondary">Security</Typography>
        </Breadcrumbs>
      </DemoSection>

      <DemoSection
        title="Collapsed"
        description="Automatically collapse when exceeding maxItems."
      >
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
