import { Home, Slash } from 'lucide-react-native';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useIconColor, useThemeColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function BreadcrumbsScreen() {
  const iconColor = useIconColor();
  const colors = useThemeColor();

  return (
    <DemoPage
      title="Breadcrumbs"
      description="Hierarchical navigation showing the user's location in the app."
    >
      <DemoSection title="Basic">
        <Breadcrumb>
          <BreadcrumbItem onPress={() => {}}>Home</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem onPress={() => {}}>Components</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
        </Breadcrumb>
      </DemoSection>

      <DemoSection title="Custom Separator">
        <Breadcrumb>
          <BreadcrumbItem onPress={() => {}}>Home</BreadcrumbItem>
          <Slash size={14} color={iconColor} style={{ marginHorizontal: 6 }} />
          <BreadcrumbItem onPress={() => {}}>Store</BreadcrumbItem>
          <Slash size={14} color={iconColor} style={{ marginHorizontal: 6 }} />
          <BreadcrumbItem onPress={() => {}}>Electronics</BreadcrumbItem>
          <Slash size={14} color={iconColor} style={{ marginHorizontal: 6 }} />
          <BreadcrumbPage>Phones</BreadcrumbPage>
        </Breadcrumb>
      </DemoSection>

      <DemoSection title="With Icons">
        <Breadcrumb>
          <BreadcrumbItem onPress={() => {}}>
            <Home size={14} color={colors.mutedForeground} /> Home
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem onPress={() => {}}>Settings</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Security</BreadcrumbPage>
        </Breadcrumb>
      </DemoSection>

      <DemoSection
        title="Wrapping"
        description="Long trails wrap onto the next line."
      >
        <Breadcrumb>
          <BreadcrumbItem onPress={() => {}}>Home</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem onPress={() => {}}>Catalog</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem onPress={() => {}}>Winter</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem onPress={() => {}}>Sale</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Clothing</BreadcrumbPage>
        </Breadcrumb>
      </DemoSection>
    </DemoPage>
  );
}
