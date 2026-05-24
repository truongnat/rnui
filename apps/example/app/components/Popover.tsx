import { useState, useRef } from 'react';
import { View } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { Button, Popover, Typography, Paper } from '@truongdq01/ui';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

type AnchorEl = { x: number; y: number; width: number; height: number };

export default function PopoverScreen() {
  const t = useTokens();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<AnchorEl | null>(null);
  const buttonRef = useRef<View>(null);

  const handleOpen = () => {
    buttonRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setAnchorEl({ x: pageX, y: pageY, width, height });
      setOpen(true);
    });
  };

  const [posOpen, setPosOpen] = useState(false);

  return (
    <DemoPage
      title="Popover"
      description="Content overlay anchored to an element or fixed position."
    >
      <DemoSection title="Anchor to Element" description="Position relative to a trigger button.">
        <View style={{ alignItems: 'flex-start' }}>
          <View ref={buttonRef} collapsable={false}>
            <Button label="Open Popover" onPress={handleOpen} />
          </View>
        </View>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Paper style={{ padding: t.spacing[4], minWidth: 200 }}>
            <Typography variant="h6" gutterBottom>
              Popover Content
            </Typography>
            <Typography variant="body2" color="secondary">
              Anchored to the button above.
            </Typography>
            <Button
              label="Close"
              variant="ghost"
              size="sm"
              style={{ marginTop: t.spacing[3] }}
              onPress={() => setOpen(false)}
            />
          </Paper>
        </Popover>
      </DemoSection>

      <DemoSection title="Fixed Position" description="Anchor via screen coordinates.">
        <Button label="Open at (100, 300)" onPress={() => setPosOpen(true)} />
        <Popover
          open={posOpen}
          anchorPosition={{ top: 300, left: 100 }}
          onClose={() => setPosOpen(false)}
        >
          <Paper style={{ padding: t.spacing[3] }}>
            <Typography variant="body2">Fixed Position Popover</Typography>
          </Paper>
        </Popover>
      </DemoSection>

      <DemoSection
        title="Origin Options"
        description="Customize anchorOrigin and transformOrigin for precise placement."
      />
    </DemoPage>
  );
}
