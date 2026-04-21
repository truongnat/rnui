import { useTokens } from '@truongdq01/headless';
import { Button, Paper, Popper, type PopperPlacement, Stack, Typography } from '@truongdq01/ui';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { DemoPage, DemoSection } from './_shared/DemoPage';

export default function PopperScreen() {
  const t = useTokens();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacement>('bottom');
  const [anchorEl, setAnchorEl] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
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
      description="A low-level positioning component that can be used to build tooltips, menus, and more. It aligns itself to an anchor element."
    >
      <DemoSection title="Interactive Placements">
        <Typography variant="body2" color="secondary" style={{ marginBottom: t.spacing[6] }}>
          Tap any button to see the Popper appear in that relative position.
        </Typography>
        
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 200, padding: t.spacing[4] }}>
          <View ref={buttonRef} style={{ padding: t.spacing[4], backgroundColor: t.color.bg.muted, borderRadius: t.radius.md }}>
            <Typography variant="h4">ANCHOR</Typography>
          </View>
        </View>

        <View style={{ padding: t.spacing[2] }}>
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
        </View>

        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          onClose={() => setOpen(false)}
        >
          <Paper 
            elevation={4} 
            style={{ 
              padding: t.spacing[3], 
              backgroundColor: t.color.bg.default,
              minWidth: 120,
              alignItems: 'center'
            }}
          >
            <Typography variant="subtitle2">Popper Content</Typography>
            <Typography variant="caption" color="secondary">Placement: {placement}</Typography>
          </Paper>
        </Popper>
      </DemoSection>

      <DemoSection title="Usage Information">
        <Typography variant="body2" color="secondary">
          Popper requires an `anchorEl` with `x, y, width, height` coordinates. 
          Usually you get these via `ref.current.measureInWindow()`. 
          It handles screen boundaries and ensures the content stays visible.
        </Typography>
      </DemoSection>
    </DemoPage>
  );
}
