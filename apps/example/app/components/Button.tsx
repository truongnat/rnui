import { ArrowRight, Heart, Plus, Settings } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useToast } from '@/components/ui/toast';
import { useThemeColor } from '@/lib/utils';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ButtonScreen() {
  const { toast } = useToast();
  const colors = useThemeColor();
  const [loading, setLoading] = useState(false);

  return (
    <DemoPage
      title="Button"
      description="Primary actions for checkout, onboarding, and settings — premium defaults at 40dp."
    >
      <DemoSection
        title="Upgrade your plan"
        description="Hero CTA pattern — solid primary + ghost secondary on a card."
      >
        <Card>
          <CardHeader>
            <CardTitle>Pro workspace</CardTitle>
            <CardDescription>
              Unlimited projects, shared billing, and priority support for your
              team.
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-2">
            <Button
              className="w-full"
              onPress={() => toast.success('Trial started')}
            >
              <Text>Start free trial</Text>
              <ArrowRight size={18} color={colors.primaryForeground} />
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onPress={() => toast.info('Opening plans')}
            >
              Compare plans
            </Button>
          </CardContent>
        </Card>
      </DemoSection>

      <DemoSection
        title="Variants"
        description="Emphasis levels for different actions."
      >
        <Stack spacing="md">
          <Button onPress={() => toast.info('Solid tapped')}>
            Continue checkout
          </Button>
          <Button
            variant="secondary"
            onPress={() => toast.info('Secondary tapped')}
          >
            Save for later
          </Button>
          <Button
            variant="outline"
            onPress={() => toast.info('Outline tapped')}
          >
            Share quote
          </Button>
          <Button variant="ghost" onPress={() => toast.info('Ghost tapped')}>
            Skip for now
          </Button>
          <Button
            variant="destructive"
            onPress={() => toast.info('Destructive tapped')}
          >
            Delete account
          </Button>
          <Button
            variant="link"
            className="self-center"
            onPress={() => toast.info('Link tapped')}
          >
            Terms of service
          </Button>
        </Stack>
      </DemoSection>

      <DemoSection
        title="Sizes"
        description="sm 36 · default 40 · lg 44 — native touch targets."
      >
        <Stack direction="row" spacing="md" alignItems="center" wrap>
          <Button size="sm" onPress={() => {}}>
            Small
          </Button>
          <Button onPress={() => {}}>Default</Button>
          <Button size="lg" onPress={() => {}}>
            Large
          </Button>
        </Stack>
      </DemoSection>

      <DemoSection title="Icons & states">
        <Stack spacing="md">
          <Button onPress={() => {}}>
            <Plus size={18} color={colors.primaryForeground} />
            <Text>Add payment method</Text>
          </Button>
          <Button variant="outline" onPress={() => {}}>
            <Text>Continue</Text>
            <ArrowRight size={18} color={colors.foreground} />
          </Button>
          <Stack direction="row" spacing="sm">
            <Button
              size="icon"
              variant="ghost"
              accessibilityLabel="Settings"
              onPress={() => {}}
            >
              <Settings size={20} color={colors.foreground} />
            </Button>
            <Button
              size="icon-sm"
              variant="destructive"
              accessibilityLabel="Remove favorite"
              onPress={() => {}}
            >
              <Heart size={18} color={colors.primaryForeground} />
            </Button>
          </Stack>
          <Button
            disabled={loading}
            onPress={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }}
          >
            {loading ? (
              <>
                <ActivityIndicator
                  size="small"
                  color={colors.primaryForeground}
                />
                <Text>Processing payment</Text>
              </>
            ) : (
              'Pay now'
            )}
          </Button>
          <Button disabled onPress={() => {}}>
            Unavailable
          </Button>
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
