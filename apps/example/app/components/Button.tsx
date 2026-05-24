import { useToast } from '@truongdq01/headless';
import { Button, Stack } from '@truongdq01/ui';
import { ArrowRight, Heart, Plus, Settings } from 'lucide-react-native';
import { useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function ButtonScreen() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <DemoPage
      title="Button"
      description="Interactive components used for actions and navigation with multiple variants, sizes, and states."
    >
      <DemoSection
        title="Variants"
        description="Standard variants for different emphasis levels."
      >
        <Stack spacing="md">
          <Button
            label="Solid (Primary)"
            onPress={() => toast.info('Solid tapped')}
          />
          <Button
            label="Outline"
            variant="outline"
            onPress={() => toast.info('Outline tapped')}
          />
          <Button
            label="Ghost"
            variant="ghost"
            onPress={() => toast.info('Ghost tapped')}
          />
          <Button
            label="Destructive"
            variant="destructive"
            onPress={() => toast.info('Destructive tapped')}
          />
        </Stack>
      </DemoSection>

      <DemoSection
        title="Colors"
        description="Explicit semantic color overrides for buttons."
      >
        <Stack direction="row" spacing="sm" wrap alignItems="flex-start">
          <Button
            label="Primary"
            color="primary"
            onPress={() => toast.info('primary')}
          />
          <Button
            label="Accent"
            color="accent"
            onPress={() => toast.info('accent')}
          />
          <Button
            label="Secondary"
            color="secondary"
            onPress={() => toast.info('secondary')}
          />
          <Button
            label="Success"
            color="success"
            onPress={() => toast.info('success')}
          />
          <Button
            label="Warning"
            color="warning"
            onPress={() => toast.info('warning')}
          />
          <Button
            label="Error"
            color="error"
            onPress={() => toast.info('error')}
          />
          <Button
            label="Info"
            color="info"
            onPress={() => toast.info('info')}
          />
          <Button
            label="Inherit"
            color="inherit"
            onPress={() => toast.info('inherit')}
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Sizes">
        <Stack direction="row" spacing="md" alignItems="center">
          <Button label="Small" size="sm" onPress={() => {}} />
          <Button label="Medium" size="md" onPress={() => {}} />
          <Button label="Large" size="lg" onPress={() => {}} />
        </Stack>
      </DemoSection>

      <DemoSection
        title="Icons"
        description="Decorative or functional icons on the leading or trailing side."
      >
        <Stack spacing="md">
          <Button
            label="Plus Icon"
            leadingIcon={<Plus size={18} />}
            onPress={() => {}}
          />
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
              accessibilityLabel="Favorite"
              onPress={() => {}}
            />
          </Stack>
        </Stack>
      </DemoSection>

      <DemoSection title="States">
        <Stack spacing="md">
          <Button
            label="Tap to Loading"
            loading={loading}
            onPress={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }}
          />
          <Button label="Disabled" disabled onPress={() => {}} />
        </Stack>
      </DemoSection>

      <DemoSection title="Block Level">
        <Button
          label="Full Width Button"
          fullWidth
          onPress={() => toast.success('Full width action')}
        />
      </DemoSection>
    </DemoPage>
  );
}
