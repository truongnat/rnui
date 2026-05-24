import { Badge, Stack } from '@truongdq01/ui';
import { CheckCircle2, Clock, CreditCard, Package, TriangleAlert } from 'lucide-react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { DemoSurfacePanel } from '@/demo/DemoSurfacePanel';

export default function BadgeScreen() {
  return (
    <DemoPage
      title="Badge"
      description="Order, account, and payment status — compact labels with visible surfaces on any background."
    >
      <DemoSection
        title="Order & account status"
        description="Realistic labels for commerce and account flows."
      >
        <Stack direction="row" spacing="sm" wrap>
          <Badge label="Shipped" variant="success" icon={<Package size={12} />} />
          <Badge label="Processing" variant="warning" icon={<Clock size={12} />} />
          <Badge label="Payment failed" variant="error" icon={<CreditCard size={12} />} />
          <Badge label="Verified" variant="brand" icon={<CheckCircle2 size={12} />} />
          <Badge label="Action required" variant="accent" icon={<TriangleAlert size={12} />} />
        </Stack>
      </DemoSection>

      <DemoSection title="Variants" description="All public variants including accent.">
        <Stack direction="row" spacing="sm" wrap>
          <Badge label="Default" variant="default" />
          <Badge label="Brand" variant="brand" />
          <Badge label="Accent" variant="accent" />
          <Badge label="Success" variant="success" />
          <Badge label="Warning" variant="warning" />
          <Badge label="Error" variant="error" />
          <Badge label="Info" variant="info" />
        </Stack>
      </DemoSection>

      <DemoSection
        title="Visible surfaces"
        description="Background + border + text — readable without blur or overlay tricks."
      >
        <Stack spacing="md">
          <DemoSurfacePanel label="White surface" surface="white">
            <Stack direction="row" spacing="sm" wrap>
              <Badge label="Delivered" variant="success" />
              <Badge label="Premium" variant="accent" />
              <Badge label="Draft" variant="default" />
            </Stack>
          </DemoSurfacePanel>
          <DemoSurfacePanel label="App background" surface="app">
            <Stack direction="row" spacing="sm" wrap>
              <Badge label="Delivered" variant="success" />
              <Badge label="Premium" variant="accent" />
              <Badge label="Draft" variant="default" />
            </Stack>
          </DemoSurfacePanel>
          <DemoSurfacePanel label="Card surface" surface="card">
            <Stack direction="row" spacing="sm" wrap>
              <Badge label="Delivered" variant="success" />
              <Badge label="Premium" variant="accent" />
              <Badge label="Draft" variant="default" />
            </Stack>
          </DemoSurfacePanel>
          <DemoSurfacePanel label="Glass surface" surface="glass">
            <Stack direction="row" spacing="sm" wrap>
              <Badge label="Delivered" variant="success" />
              <Badge label="Premium" variant="accent" />
              <Badge label="Draft" variant="default" />
            </Stack>
          </DemoSurfacePanel>
          <DemoSurfacePanel label="Dark surface" surface="dark">
            <Stack direction="row" spacing="sm" wrap>
              <Badge label="Delivered" variant="success" />
              <Badge label="Premium" variant="accent" />
              <Badge label="Draft" variant="default" />
            </Stack>
          </DemoSurfacePanel>
        </Stack>
      </DemoSection>

      <DemoSection title="Sizes">
        <Stack direction="row" spacing="sm" alignItems="center">
          <Badge label="Small" size="sm" variant="brand" />
          <Badge label="Medium" size="md" variant="brand" />
          <Badge label="Large" size="lg" variant="brand" />
        </Stack>
      </DemoSection>

      <DemoSection title="Dots & counts" description="Notification counts and status dots.">
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
