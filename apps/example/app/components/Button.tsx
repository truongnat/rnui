import { useToast } from '@truongdq01/headless';
import { Button, Card, Stack, Typography } from '@truongdq01/ui';
import { ArrowRight, Heart, Plus, Settings } from 'lucide-react-native';
import { useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ButtonScreen() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <DemoPage
      title="Button"
      description="Primary actions for checkout, onboarding, and settings — premium defaults at 44dp."
    >
      <DemoSection
        title="Upgrade your plan"
        description="Hero CTA pattern — solid primary + ghost secondary on a card."
      >
        <Card>
          <Stack spacing="md">
            <Typography variant="h4">Pro workspace</Typography>
            <Typography variant="body2" color="secondary">
              Unlimited projects, shared billing, and priority support for your team.
            </Typography>
            <Stack spacing="sm">
              <Button
                label="Start free trial"
                trailingIcon={<ArrowRight size={18} />}
                fullWidth
                onPress={() => toast.success('Trial started')}
              />
              <Button
                label="Compare plans"
                variant="ghost"
                fullWidth
                onPress={() => toast.info('Opening plans')}
              />
            </Stack>
          </Stack>
        </Card>
      </DemoSection>

      <DemoSection title="Variants" description="Emphasis levels for different actions.">
        <Stack spacing="md">
          <Button label="Continue checkout" onPress={() => toast.info('Solid tapped')} />
          <Button
            label="Save for later"
            variant="outline"
            onPress={() => toast.info('Outline tapped')}
          />
          <Button
            label="Skip for now"
            variant="ghost"
            onPress={() => toast.info('Ghost tapped')}
          />
          <Button
            label="Delete account"
            variant="destructive"
            onPress={() => toast.info('Destructive tapped')}
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Sizes" description="sm 36 · md 44 · lg 52 — native touch targets.">
        <Stack direction="row" spacing="md" alignItems="center" wrap>
          <Button label="Small" size="sm" onPress={() => {}} />
          <Button label="Medium" size="md" onPress={() => {}} />
          <Button label="Large" size="lg" onPress={() => {}} />
        </Stack>
      </DemoSection>

      <DemoSection title="Semantic colors">
        <Stack direction="row" spacing="sm" wrap alignItems="flex-start">
          <Button label="Primary" color="primary" onPress={() => {}} />
          <Button label="Accent" color="accent" onPress={() => {}} />
          <Button label="Success" color="success" onPress={() => {}} />
          <Button label="Warning" color="warning" onPress={() => {}} />
          <Button label="Error" color="error" onPress={() => {}} />
        </Stack>
      </DemoSection>

      <DemoSection title="Icons & states">
        <Stack spacing="md">
          <Button label="Add payment method" leadingIcon={<Plus size={18} />} onPress={() => {}} />
          <Button
            label="Continue"
            trailingIcon={<ArrowRight size={18} />}
            variant="outline"
            onPress={() => {}}
          />
          <Stack direction="row" spacing="sm">
            <Button
              leadingIcon={<Settings size={20} />}
              variant="ghost"
              accessibilityLabel="Settings"
              onPress={() => {}}
            />
            <Button
              leadingIcon={<Heart size={18} />}
              variant="destructive"
              size="sm"
              accessibilityLabel="Remove favorite"
              onPress={() => {}}
            />
          </Stack>
          <Button
            label="Processing payment"
            loading={loading}
            onPress={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }}
          />
          <Button label="Unavailable" disabled onPress={() => {}} />
        </Stack>
      </DemoSection>
    </DemoPage>
  );
}
