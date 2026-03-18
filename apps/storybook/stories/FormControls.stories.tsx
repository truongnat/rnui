import type { StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  ThemeProvider,
  RadioGroup,
  Slider,
  Avatar,
  AvatarGroup,
  TextArea,
  Checkbox,
  Switch,
  Input,
  Select,
  useTheme,
} from "@rnui/ui";
import { Mail, Search, Lock } from "lucide-react-native";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>{children}</ScrollView>
  </ThemeProvider>
);

// ─── Radio ────────────────────────────────────────────────────────

const meta = {
  title: "Components/FormControls",
  component: RadioGroup,
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default meta;

export const Vertical: StoryObj<typeof RadioGroup> = {
  render: () => {
    const [v, setV] = useState("react");
    return (
      <RadioGroup
        label="Framework"
        value={v}
        onChange={(val) => setV(val as string)}
        options={[
          { value: "react", label: "React Native", description: "Cross-platform mobile" },
          { value: "flutter", label: "Flutter", description: "Google's UI toolkit" },
          { value: "native", label: "Native", description: "Swift / Kotlin" },
          { value: "ionic", label: "Ionic", disabled: true, description: "Web-based (deprecated)" },
        ]}
      />
    );
  },
};

export const Horizontal: StoryObj<typeof RadioGroup> = {
  render: () => {
    const [v, setV] = useState("md");
    return (
      <RadioGroup
        label="Size"
        value={v}
        onChange={(val) => setV(val as string)}
        direction="horizontal"
        options={[
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
        ]}
      />
    );
  },
};

// ─── Slider ───────────────────────────────────────────────────────

export const SliderStory: StoryObj = {
  name: "Slider",
  render: () => {
    const [volume, setVolume] = useState(40);
    const [opacity, setOpacity] = useState(0.8);
    const [year, setYear] = useState(2020);
    const { tokens } = useTheme();
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
  name: "Avatar",
  render: () => (
    <View style={{ gap: 20 }}>
      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <Avatar src={undefined} initials="AN" fallbackIcon={undefined} size="xs" status={undefined} accessibilityLabel="Avatar AN" />
        <Avatar src={undefined} initials="BT" fallbackIcon={undefined} size="sm" status={undefined} accessibilityLabel="Avatar BT" />
        <Avatar src={undefined} initials="CL" fallbackIcon={undefined} size="md" status={undefined} accessibilityLabel="Avatar CL" />
        <Avatar src={undefined} initials="DP" fallbackIcon={undefined} size="lg" status={undefined} accessibilityLabel="Avatar DP" />
        <Avatar src={undefined} initials="EH" fallbackIcon={undefined} size="xl" status={undefined} accessibilityLabel="Avatar EH" />
      </View>

      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <Avatar src={undefined} initials="ON" fallbackIcon={undefined} size="md" status="online" accessibilityLabel="Avatar ON" />
        <Avatar src={undefined} initials="OF" fallbackIcon={undefined} size="md" status="offline" accessibilityLabel="Avatar OF" />
        <Avatar src={undefined} initials="BY" fallbackIcon={undefined} size="md" status="busy" accessibilityLabel="Avatar BY" />
        <Avatar src={undefined} initials="AW" fallbackIcon={undefined} size="md" status="away" accessibilityLabel="Avatar AW" />
      </View>

      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <Avatar src={undefined} initials="RD" fallbackIcon={undefined} size="md" status={undefined} shape="rounded" accessibilityLabel="Avatar RD" />
        <Avatar src={undefined} initials="" fallbackIcon={undefined} size="md" status={undefined} accessibilityLabel="Empty avatar" />
        <Avatar src="https://i.pravatar.cc/150?img=1" initials={undefined} fallbackIcon={undefined} size="md" status={undefined} accessibilityLabel="Avatar 1" />
        <Avatar src="https://i.pravatar.cc/150?img=2" initials={undefined} fallbackIcon={undefined} size="md" status="online" accessibilityLabel="Avatar 2" />
      </View>

      <AvatarGroup
        size="md"
        avatars={[
          { src: undefined, initials: "AN", fallbackIcon: undefined, status: undefined, accessibilityLabel: "AN" },
          { src: undefined, initials: "BT", fallbackIcon: undefined, status: undefined, accessibilityLabel: "BT" },
          { src: undefined, initials: "CL", fallbackIcon: undefined, status: undefined, accessibilityLabel: "CL" },
          { src: undefined, initials: "DP", fallbackIcon: undefined, status: undefined, accessibilityLabel: "DP" },
          { src: undefined, initials: "EH", fallbackIcon: undefined, status: undefined, accessibilityLabel: "EH" },
          { src: undefined, initials: "FN", fallbackIcon: undefined, status: undefined, accessibilityLabel: "FN" },
          { src: undefined, initials: "GX", fallbackIcon: undefined, status: undefined, accessibilityLabel: "GX" },
        ]}
        max={4}
        overlap={12}
      />
    </View>
  ),
};

// ─── TextArea ─────────────────────────────────────────────────────

export const TextAreaStory: StoryObj = {
  name: "TextArea",
  render: () => {
    const [bio, setBio] = useState("");
    const [review, setReview] = useState("This is a great product! I've been using it for months and...");
    return (
      <View style={{ gap: 20 }}>
        <TextArea
          label="Bio"
          placeholder="Tell us about yourself…"
          value={bio}
          onChangeText={setBio}
          onBlur={() => {}}
          onFocus={() => {}}
          error={undefined}
          maxLength={200}
          helperText="Used on your public profile"
          accessibilityLabel="Bio"
        />
        <TextArea
          label="Review"
          placeholder="Write your review…"
          value={review}
          onChangeText={setReview}
          onBlur={() => {}}
          onFocus={() => {}}
          error={undefined}
          helperText={undefined}
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
          onBlur={() => {}}
          onFocus={() => {}}
          error="This field is required"
          helperText={undefined}
          minLines={2}
          accessibilityLabel="With error"
        />
        <TextArea
          label="Disabled"
          placeholder=""
          value="Cannot edit this content."
          onChangeText={() => {}}
          onBlur={() => {}}
          onFocus={() => {}}
          error={undefined}
          helperText={undefined}
          disabled
          accessibilityLabel="Disabled"
        />
      </View>
    );
  },
};

// ─── Checkbox ─────────────────────────────────────────────────────

export const CheckboxStory: StoryObj = {
  name: "Checkbox",
  render: () => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(true);
    return (
      <View style={{ gap: 14 }}>
        <Checkbox label="Unchecked" description="" checked={a} onChange={setA} />
        <Checkbox label="Checked" description="With description text" checked={b} onChange={setB} />
        <Checkbox label="Indeterminate" description="" indeterminate />
        <Checkbox label="Disabled unchecked" description="" disabled />
        <Checkbox label="Disabled checked" description="" disabled defaultChecked />
        <View style={{ flexDirection: "row", gap: 24 }}>
          <Checkbox label="SM" description="" size="sm" defaultChecked />
          <Checkbox label="MD" description="" size="md" defaultChecked />
          <Checkbox label="LG" description="" size="lg" defaultChecked />
        </View>
      </View>
    );
  },
};

// ─── Switch ───────────────────────────────────────────────────────

export const SwitchStory: StoryObj = {
  name: "Switch",
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [analytics, setAnalytics] = useState(false);
    return (
      <View style={{ gap: 16 }}>
        <Switch label="Push notifications" description="Get notified about activity" on={notifications} onChange={setNotifications} />
        <Switch label="Analytics" description="" on={analytics} onChange={setAnalytics} />
        <Switch label="Disabled (on)" description="" disabled defaultOn />
        <Switch label="Disabled (off)" description="" disabled />
        <View style={{ flexDirection: "row", gap: 24, alignItems: "center" }}>
          <Switch label="SM" description="" size="sm" defaultOn />
          <Switch label="MD" description="" size="md" defaultOn />
          <Switch label="LG" description="" size="lg" defaultOn />
        </View>
      </View>
    );
  },
};

// ─── Input ────────────────────────────────────────────────────────

export const InputStory: StoryObj = {
  name: "Input",
  render: () => {
    const [v, setV] = useState("");
    return (
      <View style={{ gap: 20 }}>
        <Input
          label="Email"
          placeholder="example@mail.com"
          value={v}
          onChangeText={setV}
          onFocus={() => {}}
          onBlur={() => {}}
          error={undefined}
          helperText={undefined}
          leadingElement={<Mail size={20} color="#666" />}
          trailingElement={undefined}
        />
        <Input
          label="Search"
          placeholder="Search items..."
          onFocus={() => {}}
          onBlur={() => {}}
          error={undefined}
          helperText={undefined}
          leadingElement={<Search size={20} color="#666" />}
          trailingElement={<View style={{ backgroundColor: "#eee", padding: 4, borderRadius: 4 }}><Text style={{ fontSize: 10 }}>⌘K</Text></View>}
        />
        <Input
          label="With error"
          placeholder=""
          error="Invalid email address"
          helperText={undefined}
          defaultValue="invalid-email"
          leadingElement={undefined}
          trailingElement={undefined}
          onFocus={() => {}}
          onBlur={() => {}}
        />
        <Input
          label="Disabled"
          placeholder=""
          disabled
          defaultValue="Fixed content"
          error={undefined}
          helperText={undefined}
          leadingElement={undefined}
          trailingElement={undefined}
          onFocus={() => {}}
          onBlur={() => {}}
        />
        <View style={{ gap: 8 }}>
          <Input label="" placeholder="Small input" size="sm" error={undefined} helperText={undefined} leadingElement={undefined} trailingElement={undefined} onFocus={() => {}} onBlur={() => {}} />
          <Input label="" placeholder="Medium input" size="md" error={undefined} helperText={undefined} leadingElement={undefined} trailingElement={undefined} onFocus={() => {}} onBlur={() => {}} />
          <Input label="" placeholder="Large input" size="lg" error={undefined} helperText={undefined} leadingElement={undefined} trailingElement={undefined} onFocus={() => {}} onBlur={() => {}} />
        </View>
      </View>
    );
  },
};

// ─── Select ───────────────────────────────────────────────────────

export const SelectStory: StoryObj = {
  name: "Select",
  render: () => {
    const [country, setCountry] = useState<string | undefined>("vn");
    const [tags, setTags] = useState<string[]>(["design"]);
    return (
      <View style={{ gap: 20 }}>
        <Select
          label="Country"
          placeholder={undefined}
          searchable
          error={undefined}
          options={[
            { label: "Vietnam", value: "vn" },
            { label: "Japan", value: "jp" },
            { label: "Singapore", value: "sg" },
          ]}
          value={country}
          onChange={(v) => setCountry(v as string)}
        />
        <Select
          label="Tags"
          placeholder="Pick tags..."
          multiple
          error={undefined}
          options={[
            { label: "Design", value: "design" },
            { label: "Engineering", value: "engineering" },
            { label: "Docs", value: "docs" },
          ]}
          value={tags}
          onChange={(v) => setTags(v as string[])}
        />
        <Select
          label="With error"
          placeholder={undefined}
          error="Please choose a value"
          options={[
            { label: "Option A", value: "a" },
            { label: "Option B", value: "b" },
          ]}
        />
      </View>
    );
  },
};

// ─── PasswordInput ────────────────────────────────────────────────

export const PasswordInputStory: StoryObj = {
  name: "PasswordInput",
  render: () => {
    const [v, setV] = useState("");
    return (
      <View style={{ gap: 20 }}>
        <Input
          label="Password"
          placeholder="Enter your password"
          value={v}
          onChangeText={setV}
          onFocus={() => {}}
          onBlur={() => {}}
          error={undefined}
          helperText={undefined}
          leadingElement={<Lock size={20} color="#666" />}
          trailingElement={undefined}
          secureTextEntry
        />
        <Input
          label="Custom icon"
          placeholder="••••••••"
          onFocus={() => {}}
          onBlur={() => {}}
          error={undefined}
          helperText={undefined}
          leadingElement={<Search size={20} color="#666" />}
          trailingElement={undefined}
          secureTextEntry
        />
      </View>
    );
  },
};
