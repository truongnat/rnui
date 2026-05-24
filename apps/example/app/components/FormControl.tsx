import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormControlLabel,
  Input,
  Checkbox,
  RadioGroup,
  Switch,
  Typography,
  Divider,
  Stack,
} from '@truongdq01/ui';
import { useState } from 'react';
import { DemoPage, DemoSection } from '@/demo/DemoPage';

export default function FormControlScreen() {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('one');
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <DemoPage
      title="FormControl"
      description="Labels, helper text, and state for form inputs and selection controls."
    >
      <DemoSection
        title="Basic Layout"
        description="Label, input, and helper text in one control."
      >
        <FormControl fullWidth margin="normal">
          <FormLabel>Email Address</FormLabel>
          <Input placeholder="name@example.com" />
          <FormHelperText>We will never share your email.</FormHelperText>
        </FormControl>
      </DemoSection>

      <DemoSection title="States" description="Error and disabled variants.">
        <FormControl error fullWidth margin="normal">
          <FormLabel>Password</FormLabel>
          <Input placeholder="Enter password" secureTextEntry />
          <FormHelperText>Incorrect password. Please try again.</FormHelperText>
        </FormControl>
        <Divider spacing="md" />
        <FormControl disabled fullWidth margin="normal">
          <FormLabel>Username</FormLabel>
          <Input value="truongdang" disabled />
          <FormHelperText>This field cannot be changed.</FormHelperText>
        </FormControl>
      </DemoSection>

      <DemoSection
        title="Control Labels"
        description="Pair inputs with Checkbox, Switch, and label placement options."
      >
        <Stack spacing="md">
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={setChecked} />}
            label="I agree to the terms and conditions"
          />
          <FormControlLabel
            control={<Switch on={switchValue} onChange={setSwitchValue} />}
            label="Enable Push Notifications"
          />
          <Divider />
          <Typography variant="subtitle2">Label Placements</Typography>
          <FormControlLabel
            control={<Checkbox checked onChange={() => {}} />}
            label="End (Default)"
            labelPlacement="end"
          />
          <FormControlLabel
            control={<Checkbox checked onChange={() => {}} />}
            label="Start"
            labelPlacement="start"
          />
          <FormControlLabel
            control={<Checkbox checked onChange={() => {}} />}
            label="Top"
            labelPlacement="top"
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Radio Group">
        <FormControl>
          <FormLabel>Subscription Plan</FormLabel>
          <RadioGroup
            value={radioValue}
            onChange={(v) => setRadioValue(v as string)}
            options={[
              { value: 'one', label: 'Free Tier' },
              { value: 'two', label: 'Pro ($10/mo)' },
              { value: 'three', label: 'Enterprise' },
            ]}
          />
        </FormControl>
      </DemoSection>
    </DemoPage>
  );
}
