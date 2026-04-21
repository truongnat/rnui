import type { StoryObj } from '@storybook/react-native';
import {
  Checkbox,
  FormControl,
  FormField,
  FormHelperText,
  FormLabel,
  Input,
  RadioGroup,
  Select,
  Slider,
  Switch,
  TextArea,
  TextField,
  ThemeProvider,
} from '@truongdq01/ui';
import type React from 'react';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 32 }}>
      {children}
    </ScrollView>
  </ThemeProvider>
);

const meta = {
  title: 'Components/Forms',
  component: View,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
};

export default meta;

// ─── Checkbox ────────────────────────────────────────────────────────

export const CheckboxStory: StoryObj = {
  name: 'Checkbox',
  render: () => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(true);
    return (
      <View style={{ gap: 14 }}>
        <Checkbox label="Unchecked" checked={a} onChange={setA} />
        <Checkbox
          label="Checked"
          description="With description text"
          checked={b}
          onChange={setB}
        />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" disabled checked={true} />
        <View style={{ flexDirection: 'row', gap: 24 }}>
          <Checkbox label="SM" size="sm" checked={true} />
          <Checkbox label="MD" size="md" checked={true} />
          <Checkbox label="LG" size="lg" checked={true} />
        </View>
      </View>
    );
  },
};

// ─── Radio ───────────────────────────────────────────────────────────

export const RadioStory: StoryObj = {
  name: 'Radio',
  render: () => {
    const [framework, setFramework] = useState('react');
    const [size, setSize] = useState('md');
    return (
      <View style={{ gap: 24 }}>
        <RadioGroup
          label="Framework"
          value={framework}
          onChange={(val) => setFramework(val as string)}
          options={[
            {
              value: 'react',
              label: 'React Native',
              description: 'Cross-platform mobile',
            },
            {
              value: 'flutter',
              label: 'Flutter',
              description: "Google's UI toolkit",
            },
            { value: 'native', label: 'Native', description: 'Swift / Kotlin' },
            {
              value: 'ionic',
              label: 'Ionic',
              disabled: true,
              description: 'Web-based (deprecated)',
            },
          ]}
        />
        <RadioGroup
          label="Size"
          value={size}
          onChange={(val) => setSize(val as string)}
          direction="horizontal"
          options={[
            { value: 'sm', label: 'Small' },
            { value: 'md', label: 'Medium' },
            { value: 'lg', label: 'Large' },
          ]}
        />
      </View>
    );
  },
};

// ─── Switch ──────────────────────────────────────────────────────────

export const SwitchStory: StoryObj = {
  name: 'Switch',
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [analytics, setAnalytics] = useState(false);
    return (
      <View style={{ gap: 16 }}>
        <Switch
          label="Push notifications"
          description="Get notified about activity"
          on={notifications}
          onChange={setNotifications}
        />
        <Switch label="Analytics" on={analytics} onChange={setAnalytics} />
        <Switch label="Disabled (on)" disabled on={true} />
        <Switch label="Disabled (off)" disabled />
        <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
          <Switch label="SM" size="sm" on={true} />
          <Switch label="MD" size="md" on={true} />
          <Switch label="LG" size="lg" on={true} />
        </View>
      </View>
    );
  },
};

// ─── Slider ──────────────────────────────────────────────────────────

export const SliderStory: StoryObj = {
  name: 'Slider',
  render: () => {
    const [volume, setVolume] = useState(40);
    const [opacity, setOpacity] = useState(0.8);
    const [year, setYear] = useState(2020);
    return (
      <View style={{ gap: 32 }}>
        <Slider
          label="Volume"
          showValue
          showRange
          min={0}
          max={100}
          step={1}
          value={volume}
          onChange={setVolume}
          formatValue={(v) => `${v}%`}
        />
        <Slider
          label="Opacity"
          showValue
          min={0}
          max={1}
          step={0.01}
          value={opacity}
          onChange={setOpacity}
          formatValue={(v) => `${Math.round(v * 100)}%`}
        />
        <Slider
          label="Year"
          showValue
          showMarks
          min={2000}
          max={2030}
          step={5}
          value={year}
          onChange={setYear}
          formatValue={(v) => String(v)}
        />
        <Slider
          label="Disabled"
          showRange
          min={0}
          max={100}
          step={1}
          defaultValue={60}
          disabled
        />
      </View>
    );
  },
};

// ─── Input ───────────────────────────────────────────────────────────

export const InputStory: StoryObj = {
  name: 'Input',
  render: () => {
    const [email, setEmail] = useState('');
    return (
      <View style={{ gap: 20 }}>
        <Input
          label="Email"
          placeholder="example@mail.com"
          value={email}
          onChangeText={setEmail}
        />
        <Input label="Search" placeholder="Search items..." />
        <Input
          label="With error"
          placeholder=""
          error="Invalid email address"
          defaultValue="invalid-email"
        />
        <Input
          label="Disabled"
          placeholder=""
          disabled
          defaultValue="Fixed content"
        />
        <View style={{ gap: 8 }}>
          <Input label="" placeholder="Small input" size="sm" />
          <Input label="" placeholder="Medium input" size="md" />
          <Input label="" placeholder="Large input" size="lg" />
        </View>
      </View>
    );
  },
};

// ─── TextArea ────────────────────────────────────────────────────────

export const TextAreaStory: StoryObj = {
  name: 'TextArea',
  render: () => {
    const [bio, setBio] = useState('');
    const [review, setReview] = useState(
      "This is a great product! I've been using it for months and..."
    );
    return (
      <View style={{ gap: 20 }}>
        <TextArea
          label="Bio"
          placeholder="Tell us about yourself…"
          value={bio}
          onChangeText={setBio}
          maxLength={200}
          helperText="Used on your public profile"
          accessibilityLabel="Bio"
        />
        <TextArea
          label="Review"
          placeholder="Write your review…"
          value={review}
          onChangeText={setReview}
          minLines={4}
          maxLines={10}
          maxLength={500}
          accessibilityLabel="Review"
        />
        <TextArea
          label="With error"
          placeholder="Required field"
          value=""
          onChangeText={() => {}}
          error="This field is required"
          minLines={2}
          accessibilityLabel="With error"
        />
        <TextArea
          label="Disabled"
          placeholder=""
          value="Cannot edit this content."
          onChangeText={() => {}}
          disabled
          accessibilityLabel="Disabled"
        />
      </View>
    );
  },
};

// ─── TextField ───────────────────────────────────────────────────────

export const TextFieldStory: StoryObj = {
  name: 'TextField',
  render: () => (
    <View style={{ gap: 12 }}>
      <TextField label="Email" placeholder="name@example.com" />
      <TextField label="Error" helperText="Invalid" error />
      <TextField label="Multiline" multiline minRows={3} />
      <TextField label="Disabled" disabled defaultValue="Cannot edit" />
    </View>
  ),
};

// ─── FormControl ─────────────────────────────────────────────────────

export const FormControlStory: StoryObj = {
  name: 'FormControl',
  render: () => {
    const [terms, setTerms] = useState(false);
    const [notify, setNotify] = useState(true);

    return (
      <View style={{ gap: 16 }}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input placeholder="your name" />
          <FormHelperText>Helper text</FormHelperText>
        </FormControl>

        <FormControl error required>
          <FormLabel>Email</FormLabel>
          <Input placeholder="name@example.com" error="Invalid" />
          <FormHelperText>Invalid email</FormHelperText>
        </FormControl>

        <FormControl>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Checkbox checked={terms} onChange={setTerms} />
            <Text>Accept terms</Text>
          </View>
        </FormControl>

        <FormControl>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Switch on={notify} onChange={setNotify} />
            <Text>Enable notifications</Text>
          </View>
        </FormControl>
      </View>
    );
  },
};

// ─── FormField ───────────────────────────────────────────────────────

export const FormFieldStory: StoryObj = {
  name: 'FormField',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <View style={{ gap: 16 }}>
        <FormField label="Username" helperText="Must be unique">
          <Input
            placeholder="Enter username"
            value={value}
            onChangeText={setValue}
          />
        </FormField>
        <FormField
          label="Required field"
          required
          error="This field is required"
        >
          <Input placeholder="Required" />
        </FormField>
        <FormField label="Disabled">
          <Input placeholder="Disabled" disabled />
        </FormField>
      </View>
    );
  },
};

// ─── Select ──────────────────────────────────────────────────────────

export const SelectStory: StoryObj = {
  name: 'Select',
  render: () => {
    const [country, setCountry] = useState<string | undefined>('vn');
    const [tags, setTags] = useState<string[]>(['design']);
    return (
      <View style={{ gap: 20 }}>
        <Select
          label="Country"
          searchable
          options={[
            { label: 'Vietnam', value: 'vn' },
            { label: 'Japan', value: 'jp' },
            { label: 'Singapore', value: 'sg' },
          ]}
          value={country}
          onChange={(v: any) => setCountry(v as string)}
        />
        <Select
          label="Tags"
          placeholder="Pick tags..."
          multiple
          options={[
            { label: 'Design', value: 'design' },
            { label: 'Engineering', value: 'engineering' },
            { label: 'Docs', value: 'docs' },
          ]}
          value={tags}
          onChange={(v: any) => setTags(v as string[])}
        />
        <Select
          label="With error"
          error="Please choose a value"
          options={[
            { label: 'Option A', value: 'a' },
            { label: 'Option B', value: 'b' },
          ]}
        />
      </View>
    );
  },
};
