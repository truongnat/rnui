import { useToast, useTokens } from '@truongdq01/headless';
import { Button, Stack, Typography } from '@truongdq01/ui';
import { ArrowRight, Heart, Plus, Settings } from 'lucide-react-native';
import React, { useState } from 'react';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function ButtonScreen() {
  const t = useTokens();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <DemoPage 
      title="Button" 
      description="Interactive components used for actions and navigation with multiple variants, sizes, and states."
    >
      <DemoSection title="Variants">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Standard variants for different emphasis levels.
        </Typography>
        <Stack spacing="md">
          <Button label="Solid (Primary)" onPress={() => toast.info('Solid tapped')} />
          <Button label="Outline" variant="outline" onPress={() => toast.info('Outline tapped')} />
          <Button label="Ghost" variant="ghost" onPress={() => toast.info('Ghost tapped')} />
          <Button label="Destructive" variant="destructive" onPress={() => toast.info('Destructive tapped')} />
        </Stack>
      </DemoSection>

      <DemoSection title="Colors">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Explicit semantic color overrides for buttons.
        </Typography>
        <Stack
          direction="row"
          spacing="sm"
          wrap
          alignItems="flex-start"
        >
          <Button label="Primary" color="primary" onPress={() => toast.info('primary')} />
          <Button label="Accent" color="accent" onPress={() => toast.info('accent')} />
          <Button label="Secondary" color="secondary" onPress={() => toast.info('secondary')} />
          <Button label="Success" color="success" onPress={() => toast.info('success')} />
          <Button label="Warning" color="warning" onPress={() => toast.info('warning')} />
          <Button label="Error" color="error" onPress={() => toast.info('error')} />
          <Button label="Info" color="info" onPress={() => toast.info('info')} />
          <Button label="Inherit" color="inherit" onPress={() => toast.info('inherit')} />
        </Stack>
      </DemoSection>

      <DemoSection title="Sizes">
        <Stack direction="row" spacing="md" alignItems="center">
          <Button label="Small" size="sm" onPress={() => {}} />
          <Button label="Medium" size="md" onPress={() => {}} />
          <Button label="Large" size="lg" onPress={() => {}} />
        </Stack>
      </DemoSection>

      <DemoSection title="Icons">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[4] }}>
          Decorative or functional icons can be added to the leading or trailing side.
        </Typography>
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
                onPress={() => {}}
              />
              <Button
                leadingIcon={<Heart size={18} />}
                variant="destructive"
                size="sm"
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
          <Button
            label="Disabled"
            disabled
            onPress={() => {}}
          />
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
