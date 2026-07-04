import { BreadcrumbItem, Breadcrumbs } from '@truongdq01/ui';
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
          <BreadcrumbItem onPress={() => {}}>Home</BreadcrumbItem>
          <BreadcrumbItem onPress={() => {}}>Components</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Breadcrumbs</BreadcrumbItem>
        </Breadcrumbs>
      </DemoSection>

      <DemoSection title="Custom Separator">
        <Breadcrumbs
          separator={<Slash size={14} color={tokens.color.text.secondary} />}
        >
          <BreadcrumbItem onPress={() => {}}>Home</BreadcrumbItem>
          <BreadcrumbItem onPress={() => {}}>Store</BreadcrumbItem>
          <BreadcrumbItem onPress={() => {}}>Electronics</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Phones</BreadcrumbItem>
        </Breadcrumbs>
      </DemoSection>

      <DemoSection title="With Icons">
        <Breadcrumbs>
          <BreadcrumbItem
            onPress={() => {}}
            startIcon={<Home size={16} color={tokens.color.brand.default} />}
          >
            Home
          </BreadcrumbItem>
          <BreadcrumbItem onPress={() => {}}>Settings</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Security</BreadcrumbItem>
        </Breadcrumbs>
      </DemoSection>

      <DemoSection
        title="Collapsed"
        description="Automatically collapse when exceeding maxItems."
      >
        <Breadcrumbs maxItems={3}>
          <BreadcrumbItem onPress={() => {}}>Home</BreadcrumbItem>
          <BreadcrumbItem onPress={() => {}}>Catalog</BreadcrumbItem>
          <BreadcrumbItem onPress={() => {}}>Winter</BreadcrumbItem>
          <BreadcrumbItem onPress={() => {}}>Sale</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Clothing</BreadcrumbItem>
        </Breadcrumbs>
      </DemoSection>
    </DemoPage>
  );
}
