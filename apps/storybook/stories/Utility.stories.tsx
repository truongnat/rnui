import type { StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  ThemeProvider,
  Divider,
  Skeleton, SkeletonText, SkeletonCard, SkeletonListItem,
  EmptyState,
  FormField, FormGroup,
  Input, TextArea, Select, Checkbox, Button,
  useField,
  useTheme,
} from "@truongnat/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>{children}</ScrollView>
  </ThemeProvider>
);

const meta = {
  title: "Components/Utility",
  decorators: [(S: React.ComponentType) => <Wrap><S /></Wrap>],
};

export default meta;

// ─── Divider ──────────────────────────────────────────────────────

export const DividerStory: StoryObj = {
  name: "Divider",
  render: () => {
    const { tokens } = useTheme();
    return (
      <View style={{ gap: 8 }}>
        <Text style={{ color: tokens.color.text.primary }}>Section A</Text>
        <Divider />
        <Text style={{ color: tokens.color.text.primary }}>Section B</Text>
        <Divider label="OR" />
        <Text style={{ color: tokens.color.text.primary }}>Section C</Text>
        <Divider emphasis />
        <View style={{ flexDirection: "row", height: 48, alignItems: "center", gap: 12 }}>
          <Text style={{ color: tokens.color.text.primary }}>Left</Text>
          <Divider orientation="vertical" />
          <Text style={{ color: tokens.color.text.primary }}>Right</Text>
        </View>
      </View>
    );
  },
};

// ─── Skeleton ─────────────────────────────────────────────────────

export const SkeletonStory: StoryObj = {
  name: "Skeleton",
  render: () => (
    <View style={{ gap: 20 }}>
      <Skeleton width="100%" height={20} />
      <Skeleton width="60%" height={14} />
      <SkeletonText lines={4} />
      <SkeletonCard />
      <SkeletonListItem />
      <SkeletonListItem />
      <SkeletonListItem />
    </View>
  ),
};

// ─── EmptyState ───────────────────────────────────────────────────

export const EmptyStateStory: StoryObj = {
  name: "EmptyState",
  render: () => (
    <View style={{ gap: 32 }}>
      <EmptyState
        title="No messages yet"
        description="When you receive messages, they will appear here. Start a conversation now."
        icon="mail"
        action={{ label: "New Message", onPress: () => { } }}
        secondaryAction={{ label: "Learn more", onPress: () => { } }}
      />
      <EmptyState
        title="Search returned no results"
        description="Try adjusting your filters or searching for something else."
        icon="search"
        action={{ label: "Clear search", onPress: () => { }, variant: "outline" }}
      />
    </View>
  ),
};

// ─── FormField & FormGroup ────────────────────────────────────────

const SignupForm = () => {
  const [terms, setTerms] = useState(false);
  const [country, setCountry] = useState<string>();

  const name = useField({ defaultValue: "", validate: (v: string) => (!v ? "Required" : undefined) });
  const email = useField({
    defaultValue: "",
    validate: (v: string) => (!v.includes("@") ? "Invalid email" : undefined),
  });

  const handleSubmit = async () => {
    await name.validate();
    await email.validate();
    if (name.error || email.error || !terms) return;
    console.log("Success:", { name: name.value, email: email.value, country, terms });
  };

  return (
    <FormGroup gap="md">
      <FormField
        label="Full name"
        helperText="As it appears on your ID"
        error={name.touched ? name.error : undefined}
      >
        <Input
          placeholder="Ada Lovelace"
          value={name.value}
          onChangeText={name.onChange}
          onBlur={name.onBlur}
        />
      </FormField>

      <FormField
        label="Email address"
        required
        error={email.touched ? email.error : undefined}
        helperText="We'll send a confirmation to this address"
      >
        <Input
          placeholder="ada@example.com"
          value={email.value}
          onChangeText={email.onChange}
          onBlur={email.onBlur}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </FormField>

      <FormField label="Country">
        <Select
          options={[
            { label: "Việt Nam", value: "vn" },
            { label: "Japan", value: "jp" },
            { label: "Singapore", value: "sg" },
          ]}
          value={country}
          onChange={(v: any) => setCountry(v as string)}
          placeholder="Choose country…"
        />
      </FormField>

      <FormField
        label="Bio"
        helperText="Optional — max 200 characters"
      >
        <TextArea placeholder="Tell us about yourself…" maxLength={200} minLines={3} />
      </FormField>

      <Checkbox
        label="I agree to the Terms of Service"
        checked={terms}
        onChange={setTerms}
      />

      <Button
        label="Create Account"
        onPress={handleSubmit}
        variant="solid"
        disabled={!terms}
      />
    </FormGroup>
  );
};

export const SignupStory: StoryObj = {
  name: "Example: Signup Form",
  render: () => <SignupForm />,
};
