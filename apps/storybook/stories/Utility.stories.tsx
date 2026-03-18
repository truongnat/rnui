import type { StoryObj } from "@storybook/react-native";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  ThemeProvider,
  Divider,
  Skeleton, SkeletonText, SkeletonCard, SkeletonListItem,
  EmptyState,
  FormField, FormGroup,
  Input, TextArea, Select, Checkbox,
  useField,
  useTheme,
} from "@rnui/ui";

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>{children}</ScrollView>
  </ThemeProvider>
);

// ─── Divider ──────────────────────────────────────────────────────

export const DividerStory: StoryObj = {
  name: "Divider",
  decorators: [(S) => <Wrap><S /></Wrap>],
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
  decorators: [(S) => <Wrap><S /></Wrap>],
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
  decorators: [(S) => <Wrap><S /></Wrap>],
  render: () => (
    <View style={{ gap: 32 }}>
      <EmptyState
        title="No messages yet"
        description="When you receive a message it will appear here. Start a conversation!"
        action={{ label: "Start chatting", onPress: () => {} }}
        secondaryAction={{ label: "Learn more", onPress: () => {} }}
      />
      <EmptyState
        title="Search returned no results"
        description="Try adjusting your search terms."
        compact
        action={{ label: "Clear search", onPress: () => {}, variant: "outline" }}
      />
    </View>
  ),
};

// ─── FormField & FormGroup ────────────────────────────────────────

function SignupForm() {
  const name = useField({ defaultValue: "", validate: (v) => (!v ? "Required" : undefined) });
  const email = useField({
    defaultValue: "",
    validate: (v) => (!v.includes("@") ? "Invalid email" : undefined),
  });
  const [terms, setTerms] = useState(false);
  const [country, setCountry] = useState<string | undefined>();

  return (
    <FormGroup gap="md">
      <FormField
        label="Full name"
        required
        error={name.touched ? name.error : undefined}
      >
        <Input
          placeholder="Ada Lovelace"
          {...name.inputProps}
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
          keyboardType="email-address"
          autoCapitalize="none"
          {...email.inputProps}
          onBlur={email.onBlur}
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
          onChange={(v) => setCountry(v as string)}
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
    </FormGroup>
  );
}

export const FormFieldStory: StoryObj = {
  name: "FormField",
  decorators: [(S) => <Wrap><S /></Wrap>],
  render: () => <SignupForm />,
};

const meta: Meta = {
  title: "Components/Utility",
};
export default meta;
