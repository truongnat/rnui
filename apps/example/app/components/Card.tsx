import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GlassCard } from '@/components/ui/glass-card';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

const styles = StyleSheet.create({
  glassContainer: {
    overflow: 'hidden',
    height: 168,
    justifyContent: 'center',
    borderRadius: 16,
    padding: 20,
    backgroundColor: '#09090b',
  },
  backgroundImage: {
    position: 'absolute',
    width: '120%',
    height: '120%',
    opacity: 0.6,
  },
  articleImage: {
    width: '100%',
    height: 168,
  },
});

export default function CardScreen() {
  const { toast } = useToast();

  return (
    <DemoPage
      title="Card"
      description="Payment, profile, and content blocks — raised surface with soft border and shadow."
    >
      <DemoSection
        title="Payment method"
        description="Hero card — billing summary with primary action."
      >
        <Card>
          <CardHeader>
            <CardTitle>Visa ending in 4242</CardTitle>
            <CardDescription>
              Expires 08/27 · Used for subscription and one-click checkout.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant="outline"
              size="sm"
              onPress={() => toast.info('Opening billing')}
            >
              Update billing
            </Button>
          </CardFooter>
        </Card>
      </DemoSection>

      <DemoSection title="Interactive" bare>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View order details"
          onPress={() => toast.success('Opening order details')}
        >
          <Card>
            <CardHeader>
              <CardTitle>Order #4821</CardTitle>
              <CardDescription>
                Shipped · Tap for tracking and invoice.
              </CardDescription>
            </CardHeader>
          </Card>
        </Pressable>
      </DemoSection>

      <DemoSection
        title="Glassmorphism"
        description="Blurred overlay for layered, premium surfaces."
        bare
      >
        <View style={styles.glassContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600',
            }}
            style={styles.backgroundImage}
          />
          <GlassCard intensity={60}>
            <Text variant="h4" style={{ color: '#fafafa' }}>
              Glass Card
            </Text>
            <Text
              variant="p"
              style={{ color: '#fafafa', marginTop: 4, opacity: 0.85 }}
            >
              Elegant transparency with depth.
            </Text>
          </GlassCard>
        </View>
      </DemoSection>

      <DemoSection title="Article Layout" bare>
        <Card className="overflow-hidden">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600',
            }}
            style={styles.articleImage}
          />
          <CardHeader>
            <CardTitle>Mastering Interface Design</CardTitle>
            <CardDescription numberOfLines={2}>
              Learn how to create stunning user interfaces using modern design
              principles and tools.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              size="sm"
              variant="outline"
              onPress={() => toast.info('Navigating to blog post...')}
            >
              Read More
            </Button>
          </CardFooter>
        </Card>
      </DemoSection>
    </DemoPage>
  );
}
