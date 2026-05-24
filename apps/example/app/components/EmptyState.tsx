import { View } from 'react-native';
import { EmptyState, Button, Card } from '@truongdq01/ui';
import { useTheme, useToast } from '@truongdq01/headless';
import { DemoPage, DemoSection } from '@/demo/DemoPage';
import { Plus, RefreshCw, Rocket } from 'lucide-react-native';

export default function EmptyStateScreen() {
  const { tokens } = useTheme();
  const toast = useToast();

  const iconSize = tokens.spacing[12];

  return (
    <DemoPage
      title="Empty State"
      description="Guide users when there is no content and suggest next steps."
    >
      <DemoSection
        title="Standard Variants"
        description="Pre-defined layouts for empty, search, and error scenarios."
        bare
      >
        <View style={{ gap: tokens.spacing[4] }}>
          <Card padding="none">
            <EmptyState variant="empty" />
          </Card>

          <Card padding="none">
            <EmptyState
              variant="search"
              title="No results found"
              description="Try adjusting your filters or search terms."
              action={
                <Button label="Clear Filters" variant="outline" size="sm" />
              }
            />
          </Card>

          <Card padding="none">
            <EmptyState
              variant="error"
              title="Systems Down"
              description="We're having trouble connecting. Please try again later."
              action={
                <Button
                  label="Retry Connection"
                  leadingIcon={<RefreshCw size={16} />}
                  size="sm"
                />
              }
            />
          </Card>
        </View>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="Small, medium, and large for different layout contexts."
        bare
      >
        <View style={{ gap: tokens.spacing[4] }}>
          <Card padding="none">
            <EmptyState
              title="Small"
              description="Minimal space usage"
              size="sm"
              variant="empty"
            />
          </Card>
          <Card padding="none">
            <EmptyState
              title="Medium"
              description="Standard layout size"
              size="md"
              variant="empty"
            />
          </Card>
          <Card padding="none">
            <EmptyState
              title="Large"
              description="High visibility centered layout"
              size="lg"
              variant="empty"
            />
          </Card>
        </View>
      </DemoSection>

      <DemoSection
        title="Custom Experience"
        description="Custom illustration and primary action for onboarding."
        bare
      >
        <Card padding="none">
          <EmptyState
            title="Your Journey Starts Here"
            description="Create your first project or invite team members to collaborate."
            illustration={
              <View
                style={{
                  width: iconSize + tokens.spacing[6],
                  height: iconSize + tokens.spacing[6],
                  borderRadius: tokens.radius.full,
                  backgroundColor: tokens.color.brand.subtle,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: tokens.spacing[4],
                }}
              >
                <Rocket
                  size={iconSize * 0.5}
                  color={tokens.color.brand.default}
                />
              </View>
            }
            action={
              <Button
                label="Create First Project"
                leadingIcon={<Plus size={18} />}
                onPress={() => toast.success('Initializing project setup…')}
              />
            }
          />
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
