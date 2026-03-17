import type { Meta, StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  ThemeProvider,
  RadioGroup,
  Slider,
  Avatar,
  AvatarGroup,
  TextArea,
  Checkbox,
  Switch,
  useTheme,
} from "@rnui/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>{children}</ScrollView>
  </ThemeProvider>
);

// ─── Radio ────────────────────────────────────────────────────────

const radioMeta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  decorators: [(Story) => <Wrap><Story /></Wrap>],
};
export default radioMeta;

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
        <Avatar initials="AN" size="xs" />
        <Avatar initials="BT" size="sm" />
        <Avatar initials="CL" size="md" />
        <Avatar initials="DP" size="lg" />
        <Avatar initials="EH" size="xl" />
      </View>

      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <Avatar initials="ON" size="md" status="online" />
        <Avatar initials="OF" size="md" status="offline" />
        <Avatar initials="BY" size="md" status="busy" />
        <Avatar initials="AW" size="md" status="away" />
      </View>

      <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
        <Avatar initials="RD" size="md" shape="rounded" />
        <Avatar size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=1" size="md" />
        <Avatar src="https://i.pravatar.cc/150?img=2" size="md" status="online" />
      </View>

      <AvatarGroup
        size="md"
        avatars={[
          { initials: "AN" },
          { initials: "BT" },
          { initials: "CL" },
          { initials: "DP" },
          { initials: "EH" },
          { initials: "FN" },
          { initials: "GX" },
        ]}
        max={4}
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
          maxLength={200}
          helperText="Used on your public profile"
        />
        <TextArea
          label="Review"
          placeholder="Write your review…"
          value={review}
          onChangeText={setReview}
          minLines={4}
          maxLines={10}
          maxLength={500}
        />
        <TextArea
          label="With error"
          placeholder="Required field"
          value=""
          error="This field is required"
          minLines={2}
        />
        <TextArea
          label="Disabled"
          value="Cannot edit this content."
          disabled
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
        <Checkbox label="Unchecked" checked={a} onChange={setA} />
        <Checkbox label="Checked" description="With description text" checked={b} onChange={setB} />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" disabled defaultChecked />
        <View style={{ flexDirection: "row", gap: 24 }}>
          <Checkbox label="SM" size="sm" defaultChecked />
          <Checkbox label="MD" size="md" defaultChecked />
          <Checkbox label="LG" size="lg" defaultChecked />
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
        <Switch label="Analytics" on={analytics} onChange={setAnalytics} />
        <Switch label="Disabled (on)" disabled defaultOn />
        <Switch label="Disabled (off)" disabled />
        <View style={{ flexDirection: "row", gap: 24, alignItems: "center" }}>
          <Switch size="sm" defaultOn />
          <Switch size="md" defaultOn />
          <Switch size="lg" defaultOn />
        </View>
      </View>
    );
  },
};