import { Badge, Stack } from '@truongdq01/ui';
import { CheckCircle2, Clock, Plus, TriangleAlert } from 'lucide-react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function BadgeScreen() {
  return (
    <DemoPage
      title="Badge"
      description="Small status descriptors — counts, categories, and availability."
    >
      <DemoSection title="Variants" description="Semantic colors for states and categories.">
        <Stack direction="row" spacing="sm" wrap>
          <Badge label="Default" variant="default" />
          <Badge label="Brand" variant="brand" />
          <Badge label="Success" variant="success" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Error" variant="error" />
          <Badge label="Info" variant="info" />
        </Stack>
      </DemoSection>

      <DemoSection title="With Icons">
        <Stack direction="row" spacing="sm" wrap>
          <Badge label="Verified" variant="brand" icon={<CheckCircle2 size={12} />} />
          <Badge label="Pending" variant="warning" icon={<Clock size={12} />} />
          <Badge label="Danger" variant="error" icon={<TriangleAlert size={12} />} />
          <Badge label="Added" variant="success" icon={<Plus size={12} />} />
        </Stack>
      </DemoSection>

      <DemoSection title="Sizes">
        <Stack direction="row" spacing="sm" alignItems="center">
          <Badge label="Small" size="sm" variant="brand" />
          <Badge label="Medium" size="md" variant="brand" />
          <Badge label="Large" size="lg" variant="brand" />
        </Stack>
      </DemoSection>

      <DemoSection title="Dots & Counts" description="Status dots and notification counts.">
        <Stack direction="row" spacing="md" alignItems="center">
          <Badge dot size="md" variant="error" />
          <Badge dot size="md" variant="success" />
          <Badge count={3} variant="error" />
          <Badge count={99} variant="error" />
          <Badge count="99+" variant="error" />
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
