import React, { useRef, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import {
  Button, Input, PasswordInput, TextArea, Card, Badge,
  Checkbox, Switch, RadioGroup, Slider,
  Avatar, AvatarGroup,
  Select, List, ListItem,
  Divider, Skeleton, SkeletonCard, EmptyState,
  FormField, FormGroup, Pressable,
  ToastContainer, BottomSheet,
  SegmentedControl, OTPInput, Carousel, AnimatedList, RnImage, DatePicker,
  Typography,
  type BottomSheetRef,
} from "@truongdq01/ui";
import { useTokens, useToast, useField, useTheme } from "@truongdq01/headless";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Search,
  Plus,
  Mail,
  ChevronRight,
  Settings,
  Heart,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  ArrowRight,
  LogOut,
  MapPin,
  Clock,
  Star,
  Moon,
  Sun,
  Monitor,
} from "lucide-react-native";

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

function SectionHeader({ title }: { title: string }) {
  const t = useTokens();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 8 }}>
      <Text style={{
        fontSize: 11,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 1.2,
        color: t.color.text.tertiary,
      }}>
        {title}
      </Text>
      <View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: t.color.border.subtle }} />
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const t = useTokens();
  return (
    <View style={{ gap: 10 }}>
      <SectionHeader title={title} />
      <View style={{
        backgroundColor: t.color.surface.default,
        borderRadius: t.radius.xl,
        padding: t.spacing[4],
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: t.color.border.subtle,
        gap: 10,
      }}>
        {children}
      </View>
    </View>
  );
}

export default function KitchenSink() {
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
  const [segIndex, setSegIndex] = useState(0);

  const t = useTokens();
  const toast = useToast();
  const { setColorScheme, colorScheme } = useTheme();

  const emailField = useField({
    defaultValue: "",
    validate: (value) => {
      if (!value) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
      return undefined;
    },
    validateOnChange: true,
  });

  const row: any = { flexDirection: "row", flexWrap: "wrap", gap: 8, alignItems: "center" };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.color.bg.subtle }}>
      {/* Header */}
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: t.color.surface.default,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: t.color.border.subtle,
      }}>
        <View>
          <Typography variant="h5" style={{ color: t.color.text.primary }}>UI Kit</Typography>
          <Typography variant="caption" style={{ color: t.color.text.tertiary }}>Component showcase</Typography>
        </View>
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Pressable
            onPress={() => setColorScheme("light")}
            feedbackMode="scaleSubtle"
            style={{
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: colorScheme === "light" ? t.color.brand.subtle : t.color.bg.muted,
              alignItems: "center", justifyContent: "center",
            }}
          >
            <Sun size={18} color={colorScheme === "light" ? t.color.brand.default : t.color.text.tertiary} />
          </Pressable>
          <Pressable
            onPress={() => setColorScheme("dark")}
            feedbackMode="scaleSubtle"
            style={{
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: colorScheme === "dark" ? t.color.brand.subtle : t.color.bg.muted,
              alignItems: "center", justifyContent: "center",
            }}
          >
            <Moon size={18} color={colorScheme === "dark" ? t.color.brand.default : t.color.text.tertiary} />
          </Pressable>
          <Pressable
            onPress={() => setColorScheme("system")}
            feedbackMode="scaleSubtle"
            style={{
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: t.color.bg.muted,
              alignItems: "center", justifyContent: "center",
            }}
          >
            <Monitor size={18} color={t.color.text.tertiary} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Buttons */}
        <Section title="Buttons">
          <View style={row}>
            <Button label="Solid" onPress={() => {}} />
            <Button label="Outline" variant="outline" onPress={() => {}} />
            <Button label="Ghost" variant="ghost" onPress={() => {}} />
            <Button label="Danger" variant="destructive" onPress={() => {}} />
          </View>
          <View style={row}>
            <Button label="Left Icon" leadingIcon={<Plus />} onPress={() => {}} />
            <Button label="Right Icon" trailingIcon={<ArrowRight />} variant="outline" onPress={() => {}} />
            <Button leadingIcon={<Settings />} variant="ghost" onPress={() => {}} />
            <Button leadingIcon={<Heart />} variant="destructive" size="sm" onPress={() => {}} />
          </View>
          <View style={row}>
            <Button label="Loading" loading={loading}
              onPress={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }} />
            <Button label="Disabled" disabled leadingIcon={<Plus />} onPress={() => {}} />
            <Button label="LG Size" size="lg" trailingIcon={<Plus />} onPress={() => {}} />
            <Button leadingIcon={<Plus />} size="lg" onPress={() => {}} />
          </View>
        </Section>

        {/* Pressable */}
        <Section title="Pressable (Escape Hatch)">
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
        </Section>

        {/* Form */}
        <Section title="Form">
          <FormGroup gap="md">
            <FormField label="Email" required
              error={emailField.touched ? emailField.error : undefined}
              helperText="Your account email">
              <Input
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                leadingElement={<Mail />}
                {...emailField.inputProps}
                onBlur={emailField.onBlur}
              />
            </FormField>

            <FormField label="Username" helperText="Pick a unique handle">
              <Input
                placeholder="johndoe"
                leadingElement={<Search size={18} />}
                trailingElement={<Text style={{ color: t.color.text.tertiary, fontSize: 12 }}>@gmail.com</Text>}
              />
            </FormField>

            <FormField label="Password" helperText="At least 8 characters">
              <PasswordInput placeholder="••••••••" />
            </FormField>

            <FormField label="Bio" helperText="Max 200 characters">
              <TextArea placeholder="Tell us about yourself…"
                value={bio} onChangeText={setBio} maxLength={200} minLines={3} />
            </FormField>
          </FormGroup>
        </Section>

        {/* Divider */}
        <Section title="Divider">
          <View style={{ gap: 4 }}>
            <Text style={{ color: t.color.text.secondary, fontSize: 13 }}>Section A</Text>
            <Divider spacing="sm" />
            <Text style={{ color: t.color.text.secondary, fontSize: 13 }}>Section B</Text>
            <Divider label="OR" spacing="sm" />
            <Text style={{ color: t.color.text.secondary, fontSize: 13 }}>Section C</Text>
          </View>
        </Section>

        {/* Select */}
        <Section title="Select">
          <Select label="Country" options={COUNTRIES} value={country}
            onChange={(v) => setCountry(v as string)}
            placeholder="Choose a country…" searchable />
        </Section>

        {/* Radio */}
        <Section title="Radio">
          <RadioGroup label="Plan" value={plan} onChange={(v) => setPlan(v as string)}
            options={[
              { value: "free", label: "Free", description: "Up to 3 projects" },
              { value: "pro", label: "Pro", description: "$12/month" },
              { value: "enterprise", label: "Enterprise", description: "Custom pricing" },
            ]}
          />
        </Section>

        {/* Slider */}
        <Section title="Slider">
          <Slider label="Volume" showValue showRange min={0} max={100} step={1}
            value={volume} onChange={setVolume} formatValue={(v) => `${v}%`} />
        </Section>

        {/* Checkbox & Switch */}
        <Section title="Checkbox & Switch">
          <Checkbox label="I agree to the terms" description="Required to continue"
            checked={agree} onChange={setAgree} />
          <Switch label="Push notifications" description="Receive alerts on your device"
            on={notifications} onChange={setNotifications} />
          <Switch label="Dark mode" on={colorScheme === "dark"}
            onChange={(v) => setColorScheme(v ? "dark" : "light")} />
        </Section>

        {/* Avatar */}
        <Section title="Avatar">
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
        </Section>

        {/* Badges */}
        <Section title="Badges">
          <View style={row}>
            {(["default", "brand", "success", "warning", "error", "info"] as const).map(v => (
              <Badge key={v} label={v} variant={v} />
            ))}
          </View>
          <View style={row}>
            <Badge label="Verified" variant="brand" icon={<CheckCircle2 />} />
            <Badge label="Pending" variant="warning" icon={<Clock />} />
            <Badge label="Sale" variant="error" icon={<TriangleAlert />} />
            <Badge label="New" variant="success" icon={<Plus />} />
          </View>
        </Section>

        {/* Skeleton */}
        <Section title="Skeleton">
          <Button label={showSkeleton ? "Hide skeleton" : "Show skeleton"}
            variant="outline" size="sm"
            onPress={() => setShowSkeleton(p => !p)} />
          {showSkeleton && (
            <View style={{ gap: 12 }}>
              <SkeletonCard />
              <SkeletonCard />
            </View>
          )}
        </Section>

        {/* Empty State */}
        <Section title="Empty State">
          <Button label={showEmpty ? "Hide" : "Show empty state"}
            variant="outline" size="sm"
            onPress={() => setShowEmpty(p => !p)} />
          {showEmpty && (
            <EmptyState
              title="No results found"
              description="Try adjusting your filters or search terms."
              action={<Button label="Clear filters" variant="outline" size="sm" onPress={() => setShowEmpty(false)} />}
            />
          )}
        </Section>

        {/* List */}
        <Section title="List">
          <View style={{
            borderRadius: t.radius.lg, overflow: "hidden",
            borderWidth: StyleSheet.hairlineWidth, borderColor: t.color.border.subtle,
            backgroundColor: t.color.surface.raised,
          }}>
            <Typography variant="h6" style={{ padding: t.spacing[3], color: t.color.text.primary }}>Team</Typography>
            {CONTACTS.map((c, i) => (
              <ListItem key={c.id}
                onPress={() => toast.info(`Opening ${c.name}`)}
                divider={i < CONTACTS.length - 1}
              >
                <Avatar initials={c.initials} size="sm" />
                <View style={{ flex: 1, marginLeft: t.spacing[3] }}>
                  <Text style={{ fontWeight: "600", color: t.color.text.primary }}>{c.name}</Text>
                  <Text style={{ fontSize: 13, color: t.color.text.secondary }}>{c.role}</Text>
                </View>
                <ChevronRight size={16} color={t.color.text.tertiary} />
              </ListItem>
            ))}
          </View>
        </Section>

        {/* Animated List */}
        <Section title="Animated List">
          <View style={{ height: 200, borderRadius: t.radius.lg, overflow: "hidden", borderWidth: StyleSheet.hairlineWidth, borderColor: t.color.border.subtle }}>
            <AnimatedList
              data={CONTACTS}
              estimatedItemSize={60}
              renderItem={({ item, index }: any) => (
                <ListItem
                  onPress={() => toast.info(`Opening ${item.name}`)}
                  divider={index < CONTACTS.length - 1}
                >
                  <Avatar initials={item.initials} size="sm" />
                  <View style={{ flex: 1, marginLeft: t.spacing[3] }}>
                    <Text style={{ fontWeight: "600", color: t.color.text.primary }}>{item.name}</Text>
                    <Text style={{ fontSize: 13, color: t.color.text.secondary }}>{item.role}</Text>
                  </View>
                </ListItem>
              )}
            />
          </View>
        </Section>

        {/* Segmented Control */}
        <Section title="Segmented Control">
          <SegmentedControl
            options={["Daily", "Weekly", "Monthly"]}
            selectedIndex={segIndex}
            onChange={setSegIndex}
          />
        </Section>

        {/* OTP Input */}
        <Section title="OTP Input">
          <View style={{ alignItems: "center", paddingVertical: 6 }}>
            <OTPInput length={6} value="123" onChange={() => {}} onComplete={(code) => toast.success(`OTP: ${code}`)} />
          </View>
        </Section>

        {/* Date Picker */}
        <Section title="Date Picker">
          <DatePicker label="Birth Date" placeholder="Select your birth date" date={new Date()} onChange={() => toast.info("Open DatePicker modal")} />
        </Section>

        {/* Carousel */}
        <Section title="Carousel">
          <View style={{ height: 160, borderRadius: t.radius.lg, overflow: "hidden" }}>
            <Carousel
              data={["#7C3AED", "#0EA5E9", "#10B981"]}
              renderItem={({ item }: any) => (
                <View style={{ flex: 1, backgroundColor: item, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>Slide</Text>
                </View>
              )}
            />
          </View>
        </Section>

        {/* Image */}
        <Section title="Image with Placeholder">
          <View style={{ flexDirection: "row", gap: 10 }}>
            <RnImage source={{ uri: "https://picsum.photos/200" }} style={{ width: 100, height: 100, borderRadius: t.radius.lg }} />
          </View>
        </Section>

        {/* Toast */}
        <Section title="Toast">
          <View style={row}>
            <Button label="Success" variant="outline" size="sm" leadingIcon={<CheckCircle2 />} onPress={() => toast.success("Changes saved successfully!")} />
            <Button label="Error" variant="outline" size="sm" leadingIcon={<AlertCircle />} onPress={() => toast.error("Failed to connect to server.")} />
            <Button label="Warning" variant="outline" size="sm" leadingIcon={<TriangleAlert />} onPress={() => toast.warning("Your trial ends in 2 days.")} />
            <Button label="Info" variant="outline" size="sm" leadingIcon={<Info />} onPress={() => toast.info("New update available.")} />
          </View>
          <View style={row}>
            <Button label="Custom Icon" variant="outline" size="sm" leadingIcon={<Mail />} onPress={() =>
              toast.show({ message: "You have 3 new messages", icon: <Mail />, variant: "info" })} />
            <Button label="With action" variant="outline" size="sm" leadingIcon={<Clock />} onPress={() =>
              toast.show({ message: "Archived item.", action: { label: "Undo", onPress: () => toast.info("Restored!") } })} />
          </View>
        </Section>

        {/* Bottom Sheet */}
        <Section title="Bottom Sheet">
          <View style={row}>
            <Button label="Half" size="sm" onPress={() => sheetRef.current?.open(0)} />
            <Button label="Full" variant="outline" size="sm" onPress={() => sheetRef.current?.open(1)} />
          </View>
        </Section>

        {/* Theme */}
        <Section title="Theme">
          <View style={row}>
            <Button
              label="Light"
              variant={colorScheme === "light" ? "solid" : "outline"}
              size="sm"
              leadingIcon={<Sun size={14} />}
              onPress={() => setColorScheme("light")}
            />
            <Button
              label="Dark"
              variant={colorScheme === "dark" ? "solid" : "outline"}
              size="sm"
              leadingIcon={<Moon size={14} />}
              onPress={() => setColorScheme("dark")}
            />
            <Button
              label="System"
              variant="ghost"
              size="sm"
              leadingIcon={<Monitor size={14} />}
              onPress={() => setColorScheme("system")}
            />
          </View>
        </Section>

      </ScrollView>

      <BottomSheet ref={sheetRef} snapPoints={["50%", "90%"]} onClose={() => {}}>
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
