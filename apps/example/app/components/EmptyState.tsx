import { View } from 'react-native';
import { Plus, RefreshCw, Rocket } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  EmptyState,
  EmptyStateAction,
  EmptyStateDescription,
  EmptyStateTitle,
} from '@/components/ui/empty-state';
import { Icon } from '@/components/ui/icon';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { useIconColor } from '@/lib/utils';

export default function EmptyStateScreen() {
  const { toast } = useToast();
  const onPrimary = useIconColor('onPrimary');
  const muted = useIconColor('muted');

  return (
    <DemoPage
      title="Empty State"
      description="Guide users when there is no content and suggest next steps."
    >
      <DemoSection
        title="Standard Variants"
        description="Compose icon, title, description, and an optional action."
        bare
      >
        <View className="gap-4">
          <Card>
            <EmptyState icon={<Icon name="box" size={40} tone="muted" />}>
              <EmptyStateTitle>Nothing here yet</EmptyStateTitle>
              <EmptyStateDescription>
                Items you create will show up in this list.
              </EmptyStateDescription>
            </EmptyState>
          </Card>

          <Card>
            <EmptyState icon={<Icon name="search" size={40} tone="muted" />}>
              <EmptyStateTitle>No results found</EmptyStateTitle>
              <EmptyStateDescription>
                Try adjusting your filters or search terms.
              </EmptyStateDescription>
              <EmptyStateAction>
                <Button variant="outline" size="sm">
                  Clear Filters
                </Button>
              </EmptyStateAction>
            </EmptyState>
          </Card>

          <Card>
            <EmptyState
              icon={<Icon name="error" size={40} tone="destructive" />}
            >
              <EmptyStateTitle>Systems Down</EmptyStateTitle>
              <EmptyStateDescription>
                We're having trouble connecting. Please try again later.
              </EmptyStateDescription>
              <EmptyStateAction>
                <Button size="sm">
                  <RefreshCw size={16} color={onPrimary} />
                  Retry Connection
                </Button>
              </EmptyStateAction>
            </EmptyState>
          </Card>
        </View>
      </DemoSection>

      <DemoSection
        title="Density"
        description="Tighten padding and scale the icon for compact contexts."
        bare
      >
        <View className="gap-4">
          <Card>
            <EmptyState
              className="py-6"
              icon={<Icon name="box" size={24} tone="muted" />}
            >
              <EmptyStateTitle>Small</EmptyStateTitle>
              <EmptyStateDescription>Minimal space usage</EmptyStateDescription>
            </EmptyState>
          </Card>
          <Card>
            <EmptyState icon={<Icon name="box" size={40} tone="muted" />}>
              <EmptyStateTitle>Medium</EmptyStateTitle>
              <EmptyStateDescription>
                Standard layout size
              </EmptyStateDescription>
            </EmptyState>
          </Card>
          <Card>
            <EmptyState
              className="py-16"
              icon={<Icon name="box" size={56} tone="muted" />}
            >
              <EmptyStateTitle>Large</EmptyStateTitle>
              <EmptyStateDescription>
                High visibility centered layout
              </EmptyStateDescription>
            </EmptyState>
          </Card>
        </View>
      </DemoSection>

      <DemoSection
        title="Custom Experience"
        description="Custom illustration and primary action for onboarding."
        bare
      >
        <Card>
          <EmptyState
            icon={
              <View className="mb-2 h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Rocket size={40} color={muted} />
              </View>
            }
          >
            <EmptyStateTitle>Your Journey Starts Here</EmptyStateTitle>
            <EmptyStateDescription>
              Create your first project or invite team members to collaborate.
            </EmptyStateDescription>
            <EmptyStateAction>
              <Button
                onPress={() => toast.success('Initializing project setup…')}
              >
                <Plus size={18} color={onPrimary} />
                Create First Project
              </Button>
            </EmptyStateAction>
          </EmptyState>
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
