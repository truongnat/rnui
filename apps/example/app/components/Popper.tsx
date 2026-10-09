import { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Paper } from '@/components/ui/paper';
import {
  Popper,
  type PopperPlacement,
  usePopperAnchor,
} from '@/components/ui/popper';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function PopperScreen() {
  const { ref, anchor, measure } = usePopperAnchor();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacement>('bottom');

  const handleToggle = (newPlacement: PopperPlacement) => () => {
    if (open && placement === newPlacement) {
      setOpen(false);
      return;
    }
    measure();
    setPlacement(newPlacement);
    setOpen(true);
  };

  const placements: PopperPlacement[] = [
    'top-start',
    'top',
    'top-end',
    'left-start',
    'left',
    'left-end',
    'right-start',
    'right',
    'right-end',
    'bottom-start',
    'bottom',
    'bottom-end',
  ];

  return (
    <DemoPage
      title="Popper"
      description="Low-level positioning for tooltips, menus, and overlays."
    >
      <DemoSection
        title="Placements"
        description="Tap a button to see each relative position."
      >
        <View className="h-52 items-center justify-center p-4">
          <View
            ref={ref}
            collapsable={false}
            className="rounded-md bg-muted p-4"
          >
            <Text variant="h4">ANCHOR</Text>
          </View>
        </View>

        <Stack direction="row" spacing="sm" wrap justifyContent="center">
          {placements.map((p) => (
            <Button
              key={p}
              size="sm"
              variant={open && placement === p ? 'default' : 'outline'}
              onPress={handleToggle(p)}
              className="mb-2 min-w-24"
            >
              {p}
            </Button>
          ))}
        </Stack>

        <Popper
          open={open}
          anchor={anchor}
          placement={placement}
          showArrow
          onClose={() => setOpen(false)}
        >
          <Paper elevation="lg" className="min-w-32 items-center bg-background">
            <Text variant="small">Popper Content</Text>
            <Text variant="muted" className="text-xs">
              Placement: {placement}
            </Text>
          </Paper>
        </Popper>
      </DemoSection>

      <DemoSection
        title="Usage"
        description="usePopperAnchor measures the anchor via measureInWindow; Popper clamps to screen edges and flips on overflow."
      />
    </DemoPage>
  );
}
