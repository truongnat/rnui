import type { StoryObj } from '@storybook/react-native';
import {
  Avatar,
  AvatarGroup,
  Checkbox,
  Input,
  RadioGroup,
  Select,
  Slider,
  Switch,
  TextArea,
  ThemeProvider,
  useTheme,
} from '@truongdq01/ui';
import {
  Lock as LucideLock,
  Mail as LucideMail,
  Search as LucideSearch,
} from 'lucide-react-native';
import type React from 'react';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const Mail = LucideMail as any;
const Search = LucideSearch as any;
const Lock = LucideLock as any;

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
      {children}
    </ScrollView>
  </ThemeProvider>
);

// ─── Radio ────────────────────────────────────────────────────────

const meta = {
  title: 'Components/FormControls',
  component: RadioGroup,
  decorators: [
    (Story: React.ComponentType) => (
      <Wrap>
        <Story />
      </Wrap>
    ),
  ],
};
export default meta;

export const Vertical: StoryObj<typeof RadioGroup> = {
  render: () => {
    const [v, setV] = useState('react');
    return (
      <RadioGroup
        label="Framework"
        value={v}
        onChange={(val) => setV(val as string)}
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
    );
  },
};

export const Horizontal: StoryObj<typeof RadioGroup> = {
  render: () => {
    const [v, setV] = useState('md');
    return (
      <RadioGroup
        label="Size"
        value={v}
        onChange={(val) => setV(val as string)}
        direction="horizontal"
        options={[
          { value: 'sm', label: 'Small' },
          { value: 'md', label: 'Medium' },
          { value: 'lg', label: 'Large' },
        ]}
      />
    );
  },
};

// ─── Slider ───────────────────────────────────────────────────────

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
          showRange
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

// ─── Avatar ───────────────────────────────────────────────────────

export const AvatarStory: StoryObj = {
  name: 'Avatar',
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Avatar initials="AN" size="xs" accessibilityLabel="Avatar AN" />
        <Avatar initials="BT" size="sm" accessibilityLabel="Avatar BT" />
        <Avatar initials="CL" size="md" accessibilityLabel="Avatar CL" />
        <Avatar initials="DP" size="lg" accessibilityLabel="Avatar DP" />
        <Avatar initials="EH" size="xl" accessibilityLabel="Avatar EH" />
      </View>

      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Avatar
          initials="ON"
          size="md"
          status="online"
          accessibilityLabel="Avatar ON"
        />
        <Avatar
          initials="OF"
          size="md"
          status="offline"
          accessibilityLabel="Avatar OF"
        />
        <Avatar
          initials="BY"
          size="md"
          status="busy"
          accessibilityLabel="Avatar BY"
        />
        <Avatar
          initials="AW"
          size="md"
          status="away"
          accessibilityLabel="Avatar AW"
        />
      </View>

      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Avatar
          initials="RD"
          size="md"
          shape="rounded"
          accessibilityLabel="Avatar RD"
        />
        <Avatar initials="" size="md" accessibilityLabel="Empty avatar" />
        <Avatar
          src="https://i.pravatar.cc/150?img=1"
          size="md"
          accessibilityLabel="Avatar 1"
        />
        <Avatar
          src="https://i.pravatar.cc/150?img=2"
          size="md"
          status="online"
          accessibilityLabel="Avatar 2"
        />
      </View>

      <AvatarGroup
        size="md"
        avatars={[
          { initials: 'AN', accessibilityLabel: 'AN' },
          { initials: 'BT', accessibilityLabel: 'BT' },
          { initials: 'CL', accessibilityLabel: 'CL' },
          { initials: 'DP', accessibilityLabel: 'DP' },
          { initials: 'EH', accessibilityLabel: 'EH' },
          { initials: 'FN', accessibilityLabel: 'FN' },
          { initials: 'GX', accessibilityLabel: 'GX' },
        ]}
        max={4}
        overlap={12}
      />
    </View>
  ),
};

// ─── TextArea ─────────────────────────────────────────────────────

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

// ─── Checkbox ─────────────────────────────────────────────────────

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

// ─── Switch ───────────────────────────────────────────────────────

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

// ─── Input ────────────────────────────────────────────────────────

export const InputStory: StoryObj = {
  name: 'Input',
  render: () => {
    const [v, setV] = useState('');
    return (
      <View style={{ gap: 20 }}>
        <Input
          label="Email"
          placeholder="example@mail.com"
          value={v}
          onChangeText={setV}
          leadingElement={<Mail size={20} color="#666" />}
        />
        <Input
          label="Search"
          placeholder="Search items..."
          leadingElement={<Search size={20} color="#666" />}
          trailingElement={
            <View
              style={{ backgroundColor: '#eee', padding: 4, borderRadius: 4 }}
            >
              <Text style={{ fontSize: 10 }}>⌘K</Text>
            </View>
          }
        />
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

// ─── Select ───────────────────────────────────────────────────────

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

// ─── PasswordInput ────────────────────────────────────────────────

export const PasswordInputStory: StoryObj = {
  name: 'PasswordInput',
  render: () => {
    const [v, setV] = useState('');
    return (
      <View style={{ gap: 20 }}>
        <Input
          label="Password"
          placeholder="Enter your password"
          value={v}
          onChangeText={setV}
          leadingElement={<Lock size={20} color="#666" />}
          secureTextEntry
        />
        <Input
          label="Custom icon"
          placeholder="••••••••"
          leadingElement={<Search size={20} color="#666" />}
          secureTextEntry
        />
      </View>
    );
  },
};
