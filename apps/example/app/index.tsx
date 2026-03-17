import React, { useRef, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import {
  Button, Input, TextArea, Card, Badge,
  Checkbox, Switch, RadioGroup, Slider,
  Avatar, AvatarGroup,
  Select, List, ListItem, SectionHeader,
  Divider, Skeleton, SkeletonCard, EmptyState,
  FormField, FormGroup, Pressable,
  ToastContainer, BottomSheet,
  useTheme, useField, useToast,
  type BottomSheetRef,
} from "@rnui/ui";
import { SafeAreaView } from "react-native-safe-area-context";

const COUNTRIES = [
  { label: "Việt Nam", value: "vn" },
  { label: "Japan", value: "jp" },
  { label: "Singapore", value: "sg" },
  { label: "South Korea", value: "kr" },
];

const CONTACTS = [
  { id: "1", name: "An Nguyen", role: "Designer", initials: "AN" },
  { id: "2", name: "Binh Tran", role: "Engineer", initials: "BT" },
  { id: "3", name: "Chi Le", role: "Product", initials: "CL" },
];

export default function KitchenSink() {
  const { tokens, colorScheme, setColorScheme } = useTheme();
  const toast = useToast();
  const sheetRef = useRef<BottomSheetRef>(null);
  const [agree, setAgree] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [country, setCountry] = useState<string | undefined>();
  const [plan, setPlan] = useState("pro");
  const [volume, setVolume] = useState(60);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const emailField = useField({
    defaultValue: "",
    validate: (v) => (!v.includes("@") ? "Invalid email" : undefined),
  });

  const t = tokens;
  const section = {
    fontSize: 11, fontWeight: "600" as const,
    textTransform: "uppercase" as const,
    letterSpacing: 0.8, marginTop: 16,
    color: t.color.text.tertiary,
  };
  const row = { flexDirection: "row" as const, flexWrap: "wrap" as const, gap: 8, alignItems: "center" as const };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: t.color.bg.default }}
        contentContainerStyle={{ padding: 20, gap: 14 }}
      >
        {/* Buttons */}
        <Text style={section}>Buttons</Text>
        <View style={row}>
          <Button label="Solid" onPress={() => { }} />
          <Button label="Outline" variant="outline" onPress={() => { }} />
          <Button label="Ghost" variant="ghost" onPress={() => { }} />
          <Button label="Danger" variant="destructive" onPress={() => { }} />
        </View>
        <View style={row}>
          <Button label="Loading" loading={loading}
            onPress={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }} />
          <Button label="Disabled" disabled onPress={() => { }} />
          <Button label="SM" size="sm" onPress={() => { }} />
          <Button label="LG" size="lg" onPress={() => { }} />
        </View>

        {/* Pressable — escape hatch */}
        <Text style={section}>Pressable (escape hatch)</Text>
        <Pressable
          onPress={() => toast.info("Custom pressable tapped!")}
          feedbackMode="scaleSubtle"
          style={{
            padding: t.spacing[4], borderRadius: t.radius.lg,
            backgroundColor: t.color.brand.subtle,
            borderWidth: 1, borderColor: t.color.brand.muted,
          }}
        >
          <Text style={{ color: t.color.brand.text, fontWeight: "500" }}>
            Custom pressable layout — bring your own styles
          </Text>
        </Pressable>

        {/* FormField + Input + TextArea */}
        <Text style={section}>Form</Text>
        <FormGroup gap="md">
          <FormField label="Email" required
            error={emailField.touched ? emailField.error : undefined}
            helperText="Your account email">
            <Input placeholder="you@example.com" keyboardType="email-address"
              autoCapitalize="none" {...emailField.inputProps} onBlur={emailField.onBlur} />
          </FormField>

          <FormField label="Bio" helperText="Max 200 characters">
            <TextArea placeholder="Tell us about yourself…"
              value={bio} onChangeText={setBio} maxLength={200} minLines={3} />
          </FormField>
        </FormGroup>

        {/* Divider */}
        <Text style={section}>Divider</Text>
        <View style={{ gap: 4 }}>
          <Text style={{ color: t.color.text.secondary, fontSize: 13 }}>Section A</Text>
          <Divider spacing="sm" />
          <Text style={{ color: t.color.text.secondary, fontSize: 13 }}>Section B</Text>
          <Divider label="OR" spacing="sm" />
          <Text style={{ color: t.color.text.secondary, fontSize: 13 }}>Section C</Text>
        </View>

        {/* Select */}
        <Text style={section}>Select</Text>
        <Select label="Country" options={COUNTRIES} value={country}
          onChange={(v) => setCountry(v as string)}
          placeholder="Choose a country…" searchable />

        {/* Radio */}
        <Text style={section}>Radio</Text>
        <RadioGroup label="Plan" value={plan} onChange={(v) => setPlan(v as string)}
          options={[
            { value: "free", label: "Free", description: "Up to 3 projects" },
            { value: "pro", label: "Pro", description: "$12/month" },
            { value: "enterprise", label: "Enterprise", description: "Custom pricing" },
          ]}
        />

        {/* Slider */}
        <Text style={section}>Slider</Text>
        <Slider label="Volume" showValue showRange min={0} max={100} step={1}
          value={volume} onChange={setVolume} formatValue={(v) => `${v}%`} />

        {/* Checkbox & Switch */}
        <Text style={section}>Checkbox & Switch</Text>
        <View style={{ gap: 12 }}>
          <Checkbox label="I agree to the terms" description="Required to continue"
            checked={agree} onChange={setAgree} />
          <Switch label="Push notifications" description="Receive alerts on your device"
            on={notifications} onChange={setNotifications} />
          <Switch label="Dark mode" on={colorScheme === "dark"}
            onChange={(v) => setColorScheme(v ? "dark" : "light")} />
        </View>

        {/* Avatar */}
        <Text style={section}>Avatar</Text>
        <View style={{ gap: 10 }}>
          <View style={row}>
            {(["xs", "sm", "md", "lg", "xl"] as const).map(size => (
              <Avatar key={size} initials="AN" size={size} />
            ))}
          </View>
          <View style={row}>
            <Avatar initials="ON" size="md" status="online" />
            <Avatar initials="BY" size="md" status="busy" />
            <Avatar initials="AW" size="md" status="away" />
          </View>
          <AvatarGroup size="sm" max={4}
            avatars={CONTACTS.map(c => ({ initials: c.initials }))} />
        </View>

        {/* Badges */}
        <Text style={section}>Badges</Text>
        <View style={row}>
          {(["default", "brand", "success", "warning", "error", "info"] as const).map(v => (
            <Badge key={v} label={v} variant={v} />
          ))}
        </View>

        {/* Skeleton */}
        <Text style={section}>Skeleton</Text>
        <View style={row}>
          <Button label={showSkeleton ? "Hide skeleton" : "Show skeleton"}
            variant="outline" size="sm"
            onPress={() => setShowSkeleton(p => !p)} />
        </View>
        {showSkeleton && (
          <View style={{ gap: 12 }}>
            <SkeletonCard />
            <SkeletonCard />
          </View>
        )}

        {/* EmptyState */}
        <Text style={section}>Empty State</Text>
        <View style={row}>
          <Button label={showEmpty ? "Hide" : "Show empty state"}
            variant="outline" size="sm"
            onPress={() => setShowEmpty(p => !p)} />
        </View>
        {showEmpty && (
          <Card>
            <EmptyState compact
              title="No results found"
              description="Try adjusting your filters or search terms."
              action={{ label: "Clear filters", onPress: () => setShowEmpty(false), variant: "outline" }}
            />
          </Card>
        )}

        {/* List */}
        <Text style={section}>List</Text>
        <View style={{
          borderRadius: t.radius.lg, overflow: "hidden",
          borderWidth: 0.5, borderColor: t.color.border.default
        }}>
          <SectionHeader title="Team" />
          {CONTACTS.map((c, i) => (
            <ListItem key={c.id} title={c.name} subtitle={c.role}
              leading={<Avatar initials={c.initials} size="sm" />}
              trailing={<Text style={{ fontSize: 13, color: t.color.text.tertiary }}>›</Text>}
              onPress={() => toast.info(`Opening ${c.name}`)}
              trailingActions={[{
                label: "Delete", color: t.color.error.icon,
                onPress: () => toast.error(`Deleted ${c.name}`)
              }]}
              leadingActions={[{
                label: "Star", color: t.color.warning.icon,
                onPress: () => toast.success(`Starred ${c.name}`)
              }]}
              showSeparator={i < CONTACTS.length - 1} />
          ))}
        </View>

        {/* Toast */}
        <Text style={section}>Toast</Text>
        <View style={row}>
          <Button label="Success" variant="outline" size="sm" onPress={() => toast.success("Saved!")} />
          <Button label="Error" variant="outline" size="sm" onPress={() => toast.error("Failed.")} />
          <Button label="Warning" variant="outline" size="sm" onPress={() => toast.warning("Low storage.")} />
          <Button label="Info" variant="outline" size="sm" onPress={() => toast.info("FYI.")} />
        </View>
        <Button label="With undo action" variant="outline" size="sm" onPress={() =>
          toast.show({ message: "Archived.", action: { label: "Undo", onPress: () => toast.info("Restored!") } })} />

        {/* Bottom Sheet */}
        <Text style={section}>Bottom Sheet</Text>
        <View style={row}>
          <Button label="Half" size="sm" onPress={() => sheetRef.current?.open(0)} />
          <Button label="Full" variant="outline" size="sm" onPress={() => sheetRef.current?.open(1)} />
        </View>

        {/* Theme */}
        <Text style={section}>Theme</Text>
        <View style={row}>
          <Button label="Light" variant={colorScheme === "light" ? "solid" : "outline"} size="sm"
            onPress={() => setColorScheme("light")} />
          <Button label="Dark" variant={colorScheme === "dark" ? "solid" : "outline"} size="sm"
            onPress={() => setColorScheme("dark")} />
          <Button label="System" variant="ghost" size="sm" onPress={() => setColorScheme("system")} />
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>

      <BottomSheet ref={sheetRef} snapPoints={["50%", "90%"]} onClose={() => { }}>
        <View style={{ padding: 24, gap: 12 }}>
          <Text style={{ color: t.color.text.primary, fontSize: 18, fontWeight: "600" }}>
            Bottom Sheet
          </Text>
          <Text style={{ color: t.color.text.secondary, fontSize: 14, lineHeight: 22 }}>
            Drag handle to snap. Swipe down or tap backdrop to dismiss.
          </Text>
          <Button label="Snap to 50%" variant="outline" onPress={() => sheetRef.current?.snapTo(0)} />
          <Button label="Snap to 90%" variant="outline" onPress={() => sheetRef.current?.snapTo(1)} />
          <Button label="Close" variant="destructive" onPress={() => sheetRef.current?.close()} />
        </View>
      </BottomSheet>

      <ToastContainer position="bottom" />
    </SafeAreaView>
  );
}