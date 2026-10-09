import {
  CheckCircle2,
  Clock,
  CreditCard,
  Package,
  TriangleAlert,
} from 'lucide-react-native';
import { Badge } from '@/components/ui/badge';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useIconColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { DemoSurfacePanel } from '@/demo/DemoSurfacePanel';

function BadgeStatusRow() {
  const iconColor = useIconColor('foreground');
  const onPrimary = useIconColor('onPrimary');

  return (
    <Stack direction="row" spacing="sm" wrap>
      <Badge variant="secondary">
        <Package size={12} color={iconColor} style={{ marginRight: 4 }} />
        <Text className="text-xs font-semibold text-secondary-foreground">
          Shipped
        </Text>
      </Badge>
      <Badge variant="secondary">
        <Clock size={12} color={iconColor} style={{ marginRight: 4 }} />
        <Text className="text-xs font-semibold text-secondary-foreground">
          Processing
        </Text>
      </Badge>
      <Badge variant="destructive">
        <CreditCard size={12} color={onPrimary} style={{ marginRight: 4 }} />
        <Text className="text-xs font-semibold text-destructive-foreground">
          Payment failed
        </Text>
      </Badge>
      <Badge variant="default">
        <CheckCircle2 size={12} color={onPrimary} style={{ marginRight: 4 }} />
        <Text className="text-xs font-semibold text-primary-foreground">
          Verified
        </Text>
      </Badge>
      <Badge variant="outline">
        <TriangleAlert size={12} color={iconColor} style={{ marginRight: 4 }} />
        <Text className="text-xs font-semibold text-foreground">
          Action required
        </Text>
      </Badge>
    </Stack>
  );
}

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
        <BadgeStatusRow />
      </DemoSection>

      <DemoSection title="Variants" description="All public variants.">
        <Stack direction="row" spacing="sm" wrap>
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Visible surfaces"
        description="Background + border + text — readable without blur or overlay tricks."
      >
        <Stack spacing="md">
          <DemoSurfacePanel label="White surface" surface="white">
            <BadgeStatusRow />
          </DemoSurfacePanel>
          <DemoSurfacePanel label="App background" surface="app">
            <BadgeStatusRow />
          </DemoSurfacePanel>
          <DemoSurfacePanel label="Card surface" surface="card">
            <BadgeStatusRow />
          </DemoSurfacePanel>
          <DemoSurfacePanel label="Glass surface" surface="glass">
            <BadgeStatusRow />
          </DemoSurfacePanel>
          <DemoSurfacePanel label="Dark surface" surface="dark">
            <BadgeStatusRow />
          </DemoSurfacePanel>
        </Stack>
      </DemoSection>

      <DemoSection title="Sizes">
        <Stack direction="row" spacing="sm" alignItems="center">
          <Badge
            variant="default"
            className="px-2 py-0"
            labelClassName="text-[10px]"
          >
            Small
          </Badge>
          <Badge variant="default">Medium</Badge>
          <Badge
            variant="default"
            className="px-3 py-1"
            labelClassName="text-sm"
          >
            Large
          </Badge>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Dots & counts"
        description="Notification counts and status dots."
      >
        <Stack direction="row" spacing="md" alignItems="center">
          <Badge variant="destructive" className="h-2 w-2 px-0 py-0" />
          <Badge
            variant="default"
            className="h-2 w-2 border-transparent bg-green-600 px-0 py-0"
          />
          <Badge variant="destructive">3</Badge>
          <Badge variant="destructive">99</Badge>
          <Badge variant="destructive">99+</Badge>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
