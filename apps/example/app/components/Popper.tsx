import { useTokens } from '@truongdq01/headless';
import { Button, Paper, Popper, type PopperPlacement, Stack, Typography } from '@truongdq01/ui';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

type AnchorEl = { x: number; y: number; width: number; height: number };

export default function PopperScreen() {
  const t = useTokens();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacement>('bottom');
  const [anchorEl, setAnchorEl] = useState<AnchorEl | null>(null);
  const buttonRef = useRef<View>(null);

  const handleToggle = (newPlacement: PopperPlacement) => () => {
    if (open && placement === newPlacement) {
      setOpen(false);
      return;
    }

    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setAnchorEl({ x, y, width, height });
      setPlacement(newPlacement);
      setOpen(true);
    });
  };

  const placements: PopperPlacement[] = [
    'top-start', 'top', 'top-end',
    'left-start', 'left', 'left-end',
    'right-start', 'right', 'right-end',
    'bottom-start', 'bottom', 'bottom-end',
  ];

  return (
    <DemoPage
      title="Popper"
      description="Low-level positioning for tooltips, menus, and overlays."
    >
      <DemoSection title="Placements" description="Tap a button to see each relative position.">
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
            padding: t.spacing[4],
          }}
        >
          <View
            ref={buttonRef}
            style={{
              padding: t.spacing[4],
              backgroundColor: t.color.bg.muted,
              borderRadius: t.radius.md,
            }}
          >
            <Typography variant="h4">ANCHOR</Typography>
          </View>
        </View>

        <Stack direction="row" spacing="sm" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
          {placements.map((p) => (
            <Button
              key={p}
              label={p}
              size="sm"
              variant={open && placement === p ? 'solid' : 'outline'}
              onPress={handleToggle(p)}
              style={{ marginBottom: t.spacing[2], minWidth: 100 }}
            />
          ))}
        </Stack>

        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          onClose={() => setOpen(false)}
        >
          <Paper
            elevation="lg"
            style={{
              padding: t.spacing[3],
              backgroundColor: t.color.bg.default,
              minWidth: 120,
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle2">Popper Content</Typography>
            <Typography variant="caption" color="secondary">
              Placement: {placement}
            </Typography>
          </Paper>
        </Popper>
      </DemoSection>

      <DemoSection
        title="Usage"
        description="Get anchorEl via ref.measureInWindow(). Popper handles screen boundaries."
      />
    </DemoPage>
  );
}
