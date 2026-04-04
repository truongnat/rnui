/**
 * RN `TextStyle.fontWeight` typings expect string literals (e.g. "600", "700") — keep consistent to avoid TS noise.
 */
import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  type ListRenderItemInfo,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Constants from 'expo-constants';
import * as Haptics from 'expo-haptics';
import {
  Button,
  Input,
  PasswordInput,
  TextArea,
  Badge,
  Checkbox,
  Switch,
  RadioGroup,
  RadioItem,
  Slider,
  Avatar,
  AvatarGroup,
  Select,
  ListItem,
  Divider,
  Skeleton,
  SkeletonCard,
  SkeletonGroup,
  SkeletonProfile,
  SkeletonMedia,
  SkeletonForm,
  SkeletonGrid,
  SkeletonTable,
  SkeletonText,
  EmptyState,
  FormField,
  FormGroup,
  Pressable,
  ToastContainer,
  BottomSheet,
  SegmentedControl,
  OTPInput,
  Carousel,
  AnimatedList,
  RnImage,
  DatePicker,
  Tooltip,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Modal,
  Alert,
  AlertTitle,
  Typography,
  type BottomSheetRef,
} from '@truongdq01/ui';
import {
  useTokens,
  useToast,
  useField,
  useTheme,
  useRadioGroup,
} from '@truongdq01/headless';
import type { ColorScheme } from '@truongdq01/tokens';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Plus,
  Mail,
  ChevronRight,
  Settings,
  Heart,
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
  ArrowRight,
  Clock,
  Star,
  Moon,
  Sun,
  Monitor,
  Layers,
  Database,
  Bell,
  Bookmark,
  Phone,
  Smartphone,
  Folder,
  User,
  Lock,
} from 'lucide-react-native';
import {
  COUNTRIES,
  LARGE_COUNTRIES,
  CONTACTS,
  type Contact,
  type MainTab,
} from './kitchen/constants';
import {
  Section,
  ScreenHeader,
  PillHeaderButton,
  PillSearchBar,
  GroupDivider,
  UnreadBadge,
} from './kitchen/ui';

const AVATAR_INSET = 16 + 40 + 12; // padding + md avatar ~40 + margin

export default function KitchenSink() {
  const sheetRef = useRef<BottomSheetRef>(null);
  const actionSheetRef = useRef<BottomSheetRef>(null);
  const [mainTab, setMainTab] = useState<MainTab>('components');
  const [agree, setAgree] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [country, setCountry] = useState<string | undefined>();
  const [plan, setPlan] = useState('pro');
  const [volume, setVolume] = useState(60);
  const [bio, setBio] = useState('');
  const [standaloneRadio, setStandaloneRadio] = useState<'one' | 'two'>('one');
  const standaloneRadioGroup = useRadioGroup({
    value: standaloneRadio,
    onChange: (v) => setStandaloneRadio(v as 'one' | 'two'),
  });
  const [gender, setGender] = useState<string | undefined>('m');
  const [partialCheck, setPartialCheck] = useState<boolean | 'indeterminate'>(
    'indeterminate'
  );
  const [loading, setLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [skelPreset, setSkelPreset] = useState(0);
  const [showEmpty, setShowEmpty] = useState(false);
  const [segIndex, setSegIndex] = useState(0);
  const [dataFilterSeg, setDataFilterSeg] = useState(0);
  const [settingsLayoutSeg, setSettingsLayoutSeg] = useState(1);
  const [bigCountry, setBigCountry] = useState<string | undefined>();
  const [bigLoaded, setBigLoaded] = useState(15);
  const [bigLoadingMore, setBigLoadingMore] = useState(false);
  const bigOptions = useMemo(
    () => LARGE_COUNTRIES.slice(0, bigLoaded),
    [bigLoaded]
  );
  const bigHasMore = bigLoaded < LARGE_COUNTRIES.length;
  const onBigLoadMore = useCallback(() => {
    if (!bigHasMore || bigLoadingMore) return;
    setBigLoadingMore(true);
    setTimeout(() => {
      setBigLoaded((n) => Math.min(n + 12, LARGE_COUNTRIES.length));
      setBigLoadingMore(false);
    }, 500);
  }, [bigHasMore, bigLoadingMore]);
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 80]);
  const [vertVol, setVertVol] = useState(35);
  const [starSlider, setStarSlider] = useState(50);
  const [otpValue, setOtpValue] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<{
    pageX: number;
    pageY: number;
    width: number;
    height: number;
  } | null>(null);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [confirmTelegramOpen, setConfirmTelegramOpen] = useState(false);
  const [tabsDemo, setTabsDemo] = useState('one');
  const [dataSearch, setDataSearch] = useState('');
  const [listEditMode, setListEditMode] = useState(false);
  const menuBtnRef = useRef<View>(null);

  const t = useTokens();
  const toast = useToast();
  const { setColorScheme, colorScheme } = useTheme();

  const setThemeScheme = (scheme: ColorScheme | 'system') => {
    setColorScheme(scheme);
    if (Constants.isDevice) {
      void Haptics.selectionAsync();
    }
  };

  const keyExtractorContact = useCallback((item: Contact) => item.id, []);

  const listItemGap = t.spacing[3];
  const listPrimaryColor = t.color.text.primary;
  const listSecondaryColor = t.color.text.secondary;

  const renderAnimatedContact = useCallback(
    ({ item, index }: ListRenderItemInfo<Contact>) => (
      <ListItem
        onPress={() => toast.info(`Opening ${item.name}`)}
        divider={index < CONTACTS.length - 1}
      >
        <Avatar initials={item.initials} size="sm" />
        <View style={{ flex: 1, marginLeft: listItemGap }}>
          <Text style={{ fontWeight: '600', color: listPrimaryColor }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 13, color: listSecondaryColor }}>
            {item.role}
          </Text>
        </View>
      </ListItem>
    ),
    [listItemGap, listPrimaryColor, listSecondaryColor, toast]
  );

  const emailField = useField({
    defaultValue: '',
    validate: (value) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return 'Invalid email format';
      return undefined;
    },
    validateOnChange: true,
  });

  const groupedEmailField = useField({
    defaultValue: '',
    validate: (value) => {
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return 'Invalid email format';
      return undefined;
    },
    validateOnChange: true,
  });

  const [tgProfileName, setTgProfileName] = useState('');
  const [tgUsername, setTgUsername] = useState('');
  const [tgBio, setTgBio] = useState('');

  const row: any = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  };

  const screenTitle: Record<MainTab, string> = {
    components: 'Components',
    data: 'Chats',
    feedback: 'Actions',
    settings: 'Settings',
  };

  const scrollBottomPad = 100;

  const dataHeaderRight =
    mainTab === 'data' ? (
      <PillHeaderButton
        label={listEditMode ? 'Done' : 'Edit'}
        onPress={() => setListEditMode((v) => !v)}
      />
    ) : null;

  const componentsHeaderLeft = (
    <PillHeaderButton
      label="UI Kit"
      onPress={() => toast.info('RNUI showcase')}
    />
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: t.color.bg.subtle }}
      edges={['top']}
    >
      <ScreenHeader
        title={screenTitle[mainTab]}
        leftAction={mainTab === 'components' ? componentsHeaderLeft : undefined}
        rightAction={dataHeaderRight}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {mainTab === 'components' && (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              padding: t.spacing[4],
              gap: t.spacing[4],
              paddingBottom: scrollBottomPad,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Section title="Buttons">
              <View style={row}>
                <Button label="Solid" onPress={() => {}} />
                <Button label="Outline" variant="outline" onPress={() => {}} />
                <Button label="Ghost" variant="ghost" onPress={() => {}} />
                <Button
                  label="Danger"
                  variant="destructive"
                  onPress={() => {}}
                />
              </View>
              <View style={row}>
                <Button
                  label="Left Icon"
                  leadingIcon={<Plus />}
                  onPress={() => {}}
                />
                <Button
                  label="Right Icon"
                  trailingIcon={<ArrowRight />}
                  variant="outline"
                  onPress={() => {}}
                />
                <Button
                  leadingIcon={<Settings />}
                  variant="ghost"
                  onPress={() => {}}
                />
                <Button
                  leadingIcon={<Heart />}
                  variant="destructive"
                  size="sm"
                  onPress={() => {}}
                />
              </View>
              <View style={row}>
                <Button
                  label="Loading"
                  loading={loading}
                  onPress={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 1500);
                  }}
                />
                <Button
                  label="Disabled"
                  disabled
                  leadingIcon={<Plus />}
                  onPress={() => {}}
                />
                <Button
                  label="LG Size"
                  size="lg"
                  trailingIcon={<Plus />}
                  onPress={() => {}}
                />
                <Button leadingIcon={<Plus />} size="lg" onPress={() => {}} />
              </View>
              <Text
                style={{
                  fontSize: t.fontSize.sm,
                  color: t.color.text.tertiary,
                  marginTop: 4,
                }}
              >
                Full-width (Telegram-style CTA)
              </Text>
              <Button
                label="Start messaging"
                fullWidth
                onPress={() => toast.success('Primary action')}
              />
              <Button
                label="Continue with accent"
                color="accent"
                fullWidth
                onPress={() => toast.info('Accent CTA')}
              />
            </Section>

            <Section title="Pressable (Escape Hatch)">
              <Pressable
                onPress={() => toast.info('Custom pressable tapped!')}
                feedbackMode="scaleSubtle"
                style={{
                  padding: t.spacing[4],
                  borderRadius: t.radius.lg,
                  backgroundColor: t.color.brand.subtle,
                  borderWidth: 1,
                  borderColor: t.color.brand.muted,
                }}
              >
                <Text style={{ color: t.color.brand.text, fontWeight: '500' }}>
                  Custom pressable layout — bring your own styles
                </Text>
              </Pressable>
            </Section>

            <Section
              title="Form"
              footer="Grouped fields use inset dividers on larger surfaces; here they stay in one padded block."
            >
              <FormGroup gap="md">
                <FormField
                  label="Email"
                  required
                  error={emailField.touched ? emailField.error : undefined}
                  helperText="Your account email"
                >
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
                    trailingElement={
                      <Text
                        style={{ color: t.color.text.tertiary, fontSize: 12 }}
                      >
                        @gmail.com
                      </Text>
                    }
                  />
                </FormField>

                <FormField label="Password" helperText="At least 8 characters">
                  <PasswordInput placeholder="••••••••" />
                </FormField>

                <FormField
                  label="Bio"
                  helperText="Short intro for your profile (counter shows limit)"
                >
                  <TextArea
                    placeholder="Tell us about yourself…"
                    value={bio}
                    onChangeText={setBio}
                    maxLength={200}
                    minLines={3}
                    counterPosition="inside"
                  />
                </FormField>
              </FormGroup>
            </Section>

            <Section
              title="Form (Telegram-style)"
              footer="Grouped card, floating labels on text fields, hairline dividers, and validation copy below the card."
            >
              <FormGroup
                variant="grouped"
                error={
                  groupedEmailField.touched
                    ? groupedEmailField.error
                    : undefined
                }
                footer="Enter your details. Your username is publicly visible."
              >
                <FormField label="Name">
                  <Input
                    value={tgProfileName}
                    onChangeText={setTgProfileName}
                    leadingElement={<User size={18} />}
                  />
                </FormField>
                <FormField label="Username">
                  <Input
                    value={tgUsername}
                    onChangeText={setTgUsername}
                    leadingElement={<Search size={18} />}
                  />
                </FormField>
                <FormField label="Email" required>
                  <Input
                    keyboardType="email-address"
                    autoCapitalize="none"
                    leadingElement={<Mail size={18} />}
                    {...groupedEmailField.inputProps}
                    onBlur={groupedEmailField.onBlur}
                  />
                </FormField>
                <FormField label="Bio">
                  <TextArea
                    placeholder="Tell us about yourself…"
                    value={tgBio}
                    onChangeText={setTgBio}
                    maxLength={200}
                    minLines={3}
                    counterPosition="inside"
                  />
                </FormField>
              </FormGroup>
            </Section>

            <Section title="Divider">
              <View style={{ gap: 4 }}>
                <Text style={{ color: t.color.text.secondary, fontSize: 13 }}>
                  Section A
                </Text>
                <Divider spacing="sm" />
                <Text style={{ color: t.color.text.secondary, fontSize: 13 }}>
                  Section B
                </Text>
                <Divider label="OR" spacing="sm" />
                <Text style={{ color: t.color.text.secondary, fontSize: 13 }}>
                  Section C
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 40,
                    gap: 12,
                    marginTop: 4,
                  }}
                >
                  <Text style={{ color: t.color.text.secondary, fontSize: 13 }}>
                    Left
                  </Text>
                  <Divider orientation="vertical" spacing="none" />
                  <Text style={{ color: t.color.text.secondary, fontSize: 13 }}>
                    Middle
                  </Text>
                  <Divider orientation="vertical" spacing="none" emphasis />
                  <Text style={{ color: t.color.text.secondary, fontSize: 13 }}>
                    Right
                  </Text>
                </View>
              </View>
            </Section>

            <Section title="Select">
              <Select
                label="Country"
                options={COUNTRIES}
                value={country}
                onChange={(v) => setCountry(v as string)}
                placeholder="Choose a country…"
                searchable
              />
              <Select
                label="Large list (load more)"
                options={bigOptions}
                value={bigCountry}
                onChange={(v) => setBigCountry(v as string)}
                placeholder="Scroll to load more…"
                searchable
                hasMore={bigHasMore}
                loadingMore={bigLoadingMore}
                onLoadMore={onBigLoadMore}
              />
            </Section>

            <Section title="Radio">
              <RadioGroup
                label="Plan"
                value={plan}
                onChange={(v) => setPlan(v as string)}
                options={[
                  {
                    value: 'free',
                    label: 'Free',
                    description: 'Up to 3 projects',
                  },
                  { value: 'pro', label: 'Pro', description: '$12/month' },
                  {
                    value: 'enterprise',
                    label: 'Enterprise',
                    description: 'Custom pricing',
                  },
                ]}
              />
              <RadioGroup
                label="Billing (horizontal)"
                direction="horizontal"
                value={plan}
                onChange={(v) => setPlan(v as string)}
                options={[
                  { value: 'free', label: 'Free' },
                  { value: 'pro', label: 'Pro' },
                  { value: 'enterprise', label: 'Ent.' },
                ]}
                size="sm"
              />
              <RadioGroup
                label="Gender"
                direction="horizontal"
                value={gender}
                onChange={(v) => setGender(v as string)}
                options={[
                  { value: 'm', label: 'Male' },
                  { value: 'f', label: 'Female' },
                  { value: 'o', label: 'Other' },
                ]}
                size="sm"
              />
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 16,
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" color="tertiary">
                  Standalone RadioItem (headless group, no RadioGroup)
                </Typography>
                <RadioItem
                  value="one"
                  label="One"
                  isSelected={standaloneRadioGroup.isSelected('one')}
                  onPress={standaloneRadioGroup.getItemProps('one').onPress}
                  size="sm"
                />
                <RadioItem
                  value="two"
                  label="Two"
                  isSelected={standaloneRadioGroup.isSelected('two')}
                  onPress={standaloneRadioGroup.getItemProps('two').onPress}
                  size="sm"
                />
              </View>
            </Section>

            <Section title="Slider">
              <Slider
                label="Volume"
                showValue
                showMinMaxLabels
                min={0}
                max={100}
                step={1}
                value={volume}
                onChange={setVolume}
                formatValue={(v) => `${v}%`}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  gap: 24,
                  minHeight: 180,
                }}
              >
                <Slider
                  orientation="vertical"
                  sliderHeight={150}
                  label="Vertical"
                  showValue
                  min={0}
                  max={100}
                  value={vertVol}
                  onChange={setVertVol}
                  formatValue={(v) => `${v}%`}
                />
                <View style={{ flex: 1 }}>
                  <Slider
                    range
                    label="Range"
                    showValue
                    showMinMaxLabels
                    min={0}
                    max={100}
                    step={5}
                    value={priceRange}
                    onChange={(v) => setPriceRange(v)}
                    formatValue={(v) => `${v}%`}
                  />
                </View>
              </View>
              <Slider
                label="Custom thumb"
                showValue
                min={0}
                max={100}
                value={starSlider}
                onChange={setStarSlider}
                thumbRenderer={() => (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Star
                      size={18}
                      color={t.color.brand.default}
                      fill={t.color.brand.subtle}
                    />
                  </View>
                )}
              />
            </Section>

            <Section title="Checkbox & Switch">
              <Checkbox
                label="Select all items"
                description="3 of 5 selected"
                checked={partialCheck === true}
                indeterminate={partialCheck === 'indeterminate'}
                onChange={(v) => setPartialCheck(v)}
              />
              <Checkbox
                label="I agree to the terms"
                description="Required to continue"
                checked={agree}
                onChange={setAgree}
              />
              <Switch
                label="Push notifications"
                description="Receive alerts on your device"
                on={notifications}
                onChange={setNotifications}
              />
              <Switch
                label="Dark mode"
                on={colorScheme === 'dark'}
                onChange={(v) => setThemeScheme(v ? 'dark' : 'light')}
              />
            </Section>

            <Section title="Segmented Control">
              <SegmentedControl
                options={['Daily', 'Weekly', 'Monthly']}
                selectedIndex={segIndex}
                onChange={setSegIndex}
              />
            </Section>

            <Section title="OTP Input">
              <View style={{ alignItems: 'center', paddingVertical: 6 }}>
                <OTPInput
                  length={6}
                  value={otpValue}
                  onChange={setOtpValue}
                  onComplete={(code) => toast.success(`OTP: ${code}`)}
                />
              </View>
            </Section>

            <Section title="Tabs (component demo)">
              <Tabs value={tabsDemo} onChange={(v) => setTabsDemo(v as string)}>
                <Tab value="one" label="Tab one" />
                <Tab value="two" label="Tab two" />
              </Tabs>
              <Text
                style={{
                  paddingVertical: 8,
                  color: t.color.text.primary,
                  fontSize: 14,
                }}
              >
                Active tab: {tabsDemo}
              </Text>
            </Section>
          </ScrollView>
        )}

        {mainTab === 'data' && (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              padding: t.spacing[4],
              gap: t.spacing[4],
              paddingBottom: scrollBottomPad,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <PillSearchBar
              value={dataSearch}
              onChangeText={setDataSearch}
              placeholder="Search chats"
            />

            <Section title="Chat list (Telegram-style rows)" flush>
              <View
                style={{
                  paddingHorizontal: t.spacing[3],
                  paddingTop: t.spacing[2],
                }}
              >
                <SegmentedControl
                  options={['All', 'Unread', 'Groups']}
                  selectedIndex={dataFilterSeg}
                  onChange={setDataFilterSeg}
                />
              </View>
              <View style={{ paddingVertical: t.spacing[2] }}>
                {CONTACTS.map((c, i) => (
                  <View key={c.id}>
                    <ListItem
                      onPress={() => toast.info(`Open ${c.name}`)}
                      divider={false}
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: t.spacing[3],
                      }}
                    >
                      {listEditMode ? (
                        <View
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 11,
                            borderWidth: 2,
                            borderColor: t.color.border.strong,
                            marginRight: t.spacing[2],
                          }}
                        />
                      ) : null}
                      <Avatar initials={c.initials} size="md" />
                      <View style={{ flex: 1, marginLeft: t.spacing[3] }}>
                        <Text
                          style={{
                            fontWeight: '700',
                            fontSize: 16,
                            color: t.color.text.primary,
                          }}
                        >
                          {c.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: t.color.text.secondary,
                            marginTop: 2,
                          }}
                          numberOfLines={1}
                        >
                          {c.role}
                        </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end', gap: 6 }}>
                        <Text
                          style={{ fontSize: 13, color: t.color.text.tertiary }}
                        >
                          {c.time}
                        </Text>
                        <UnreadBadge count={c.unread} />
                      </View>
                    </ListItem>
                    {i < CONTACTS.length - 1 ? (
                      <GroupDivider inset={AVATAR_INSET} />
                    ) : null}
                  </View>
                ))}
              </View>
            </Section>

            <Section title="Avatar">
              <View style={row}>
                {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
                  <Avatar key={size} initials="AN" size={size} />
                ))}
              </View>
              <View style={row}>
                <Avatar initials="ON" size="md" status="online" />
                <Avatar initials="BY" size="md" status="busy" />
                <Avatar initials="AW" size="md" status="away" />
              </View>
              <AvatarGroup
                size="sm"
                max={4}
                avatars={CONTACTS.map((c) => ({ initials: c.initials }))}
              />
            </Section>

            <Section title="Badges">
              <View style={row}>
                {(
                  [
                    'default',
                    'brand',
                    'success',
                    'warning',
                    'error',
                    'info',
                  ] as const
                ).map((v) => (
                  <Badge key={v} label={v} variant={v} />
                ))}
              </View>
              <View style={row}>
                <Badge
                  label="Verified"
                  variant="brand"
                  icon={<CheckCircle2 />}
                />
                <Badge label="Pending" variant="warning" icon={<Clock />} />
                <Badge label="Sale" variant="error" icon={<TriangleAlert />} />
                <Badge label="New" variant="success" icon={<Plus />} />
              </View>
              <Text
                style={{
                  fontSize: t.fontSize.sm,
                  color: t.color.text.tertiary,
                }}
              >
                Unread-style (brand pill)
              </Text>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
              >
                <UnreadBadge count={3} />
                <UnreadBadge count={222} />
              </View>
            </Section>

            <Section title="Skeleton">
              <View style={{ paddingHorizontal: t.spacing[3] }}>
                <SegmentedControl
                  options={[
                    'Card',
                    'Profile',
                    'Media',
                    'Form',
                    'Grid',
                    'Table',
                    'Group',
                  ]}
                  selectedIndex={skelPreset}
                  onChange={setSkelPreset}
                />
              </View>
              <Button
                label={showSkeleton ? 'Hide skeleton' : 'Show skeleton'}
                variant="outline"
                size="sm"
                onPress={() => setShowSkeleton((p) => !p)}
              />
              {showSkeleton && (
                <View style={{ gap: 12 }}>
                  {skelPreset === 0 && (
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  )}
                  {skelPreset === 1 && <SkeletonProfile />}
                  {skelPreset === 2 && <SkeletonMedia />}
                  {skelPreset === 3 && <SkeletonForm rows={3} />}
                  {skelPreset === 4 && (
                    <SkeletonGrid columns={4} rows={2} cell={40} />
                  )}
                  {skelPreset === 5 && (
                    <SkeletonTable columns={3} dataRows={2} />
                  )}
                  {skelPreset === 6 && (
                    <SkeletonGroup stagger={100}>
                      <SkeletonText lines={1} />
                      <SkeletonText lines={1} />
                      <SkeletonText lines={1} />
                    </SkeletonGroup>
                  )}
                </View>
              )}
            </Section>

            <Section title="Empty State">
              <View
                style={{
                  alignItems: 'center',
                  paddingVertical: t.spacing[6],
                  gap: t.spacing[4],
                }}
              >
                <EmptyState variant="search" size="sm" />
                <Typography
                  variant="caption"
                  color="tertiary"
                  style={{ textAlign: 'center', paddingHorizontal: 24 }}
                >
                  Recent items will appear here. Use the button below for a
                  custom block.
                </Typography>
                <Button
                  label="Show custom empty"
                  variant="outline"
                  size="sm"
                  onPress={() => setShowEmpty((p) => !p)}
                />
              </View>
              <View style={{ gap: 12 }}>
                <EmptyState variant="error" size="sm" />
                <EmptyState variant="offline" size="sm" />
                <EmptyState variant="permission" size="sm" />
                <EmptyState variant="empty" size="sm" />
              </View>
              {showEmpty && (
                <EmptyState
                  title="No results found"
                  description="Try adjusting your filters or search terms."
                  action={
                    <Button
                      label="Clear filters"
                      variant="outline"
                      size="sm"
                      onPress={() => setShowEmpty(false)}
                    />
                  }
                />
              )}
            </Section>

            <Section title="List (grouped)">
              <View
                style={{
                  borderRadius: t.radius.lg,
                  overflow: 'hidden',
                  backgroundColor: t.color.surface.raised,
                }}
              >
                <Typography
                  variant="h6"
                  style={{ padding: t.spacing[3], color: t.color.text.primary }}
                >
                  Team
                </Typography>
                {CONTACTS.map((c, i) => (
                  <View key={c.id}>
                    <ListItem
                      onPress={() => toast.info(`Opening ${c.name}`)}
                      divider={false}
                      style={{ paddingHorizontal: t.spacing[3] }}
                    >
                      <Avatar initials={c.initials} size="sm" />
                      <View style={{ flex: 1, marginLeft: t.spacing[3] }}>
                        <Text
                          style={{
                            fontWeight: '600',
                            color: t.color.text.primary,
                          }}
                        >
                          {c.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            color: t.color.text.secondary,
                          }}
                        >
                          {c.role}
                        </Text>
                      </View>
                      <ChevronRight size={16} color={t.color.text.tertiary} />
                    </ListItem>
                    {i < CONTACTS.length - 1 ? (
                      <GroupDivider inset={AVATAR_INSET} />
                    ) : null}
                  </View>
                ))}
              </View>
            </Section>

            <Section title="Animated List">
              <View
                style={{
                  height: 200,
                  borderRadius: t.radius.lg,
                  overflow: 'hidden',
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: t.color.border.subtle,
                }}
              >
                <AnimatedList<Contact>
                  data={[...CONTACTS]}
                  estimatedItemSize={72}
                  keyExtractor={keyExtractorContact}
                  renderItem={renderAnimatedContact}
                />
              </View>
            </Section>

            <Section title="Date Picker">
              <DatePicker
                label="Birth Date"
                placeholder="Select your birth date"
                date={birthDate}
                onChange={setBirthDate}
              />
            </Section>

            <Section title="Carousel">
              <View
                style={{
                  height: 160,
                  borderRadius: t.radius.lg,
                  overflow: 'hidden',
                }}
              >
                <Carousel
                  data={['#7C3AED', '#0EA5E9', '#10B981']}
                  renderItem={(item) => (
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: item,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          color: t.color.text.inverse,
                          fontWeight: '700',
                          fontSize: 16,
                        }}
                      >
                        Slide
                      </Text>
                    </View>
                  )}
                />
              </View>
            </Section>

            <Section title="Image with Placeholder">
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <RnImage
                  source={{ uri: 'https://picsum.photos/200' }}
                  style={{ width: 100, height: 100, borderRadius: t.radius.lg }}
                />
              </View>
            </Section>
          </ScrollView>
        )}

        {mainTab === 'feedback' && (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              padding: t.spacing[4],
              gap: t.spacing[4],
              paddingBottom: scrollBottomPad,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Section title="Toast">
              <View style={row}>
                <Button
                  label="Success"
                  variant="outline"
                  size="sm"
                  leadingIcon={<CheckCircle2 />}
                  onPress={() => toast.success('Changes saved successfully!')}
                />
                <Button
                  label="Error"
                  variant="outline"
                  size="sm"
                  leadingIcon={<AlertCircle />}
                  onPress={() => toast.error('Failed to connect to server.')}
                />
                <Button
                  label="Warning"
                  variant="outline"
                  size="sm"
                  leadingIcon={<TriangleAlert />}
                  onPress={() => toast.warning('Your trial ends in 2 days.')}
                />
                <Button
                  label="Info"
                  variant="outline"
                  size="sm"
                  leadingIcon={<Info />}
                  onPress={() => toast.info('New update available.')}
                />
              </View>
              <View style={row}>
                <Button
                  label="Custom Icon"
                  variant="outline"
                  size="sm"
                  leadingIcon={<Mail />}
                  onPress={() =>
                    toast.show({
                      message: 'You have 3 new messages',
                      icon: <Mail />,
                      variant: 'info',
                    })
                  }
                />
                <Button
                  label="With action"
                  variant="outline"
                  size="sm"
                  leadingIcon={<Clock />}
                  onPress={() =>
                    toast.show({
                      message: 'Archived item.',
                      action: {
                        label: 'Undo',
                        onPress: () => toast.info('Restored!'),
                      },
                    })
                  }
                />
              </View>
            </Section>

            <Section title="Bottom Sheet (standard)">
              <View style={row}>
                <Button
                  label="Half"
                  size="sm"
                  onPress={() => sheetRef.current?.open(0)}
                />
                <Button
                  label="Full"
                  variant="outline"
                  size="sm"
                  onPress={() => sheetRef.current?.open(1)}
                />
              </View>
            </Section>

            <Section
              title="Action sheet (Telegram-style)"
              footer="Stacked destructive / primary actions with a separate cancel row, similar to iOS action sheets."
            >
              <Button
                label="Open action sheet"
                variant="outline"
                size="sm"
                onPress={() => actionSheetRef.current?.open(0)}
              />
            </Section>

            <Section title="Overlays">
              <View style={{ gap: 14 }}>
                <Tooltip title="Tooltip — tap the label">
                  <Text
                    style={{
                      color: t.color.brand.default,
                      fontWeight: '600',
                      fontSize: 15,
                    }}
                  >
                    Tap for tooltip
                  </Text>
                </Tooltip>

                <View ref={menuBtnRef} collapsable={false}>
                  <Button
                    label="Open menu"
                    size="sm"
                    variant="outline"
                    onPress={() => {
                      menuBtnRef.current?.measureInWindow(
                        (x, y, width, height) => {
                          setMenuAnchor({ pageX: x, pageY: y, width, height });
                          setMenuOpen(true);
                        }
                      );
                    }}
                  />
                </View>
                <Menu
                  open={menuOpen}
                  onClose={() => setMenuOpen(false)}
                  anchorEl={menuAnchor}
                >
                  <MenuItem
                    onPress={() => {
                      toast.info('Menu action one');
                      setMenuOpen(false);
                    }}
                  >
                    Action one
                  </MenuItem>
                  <MenuItem onPress={() => setMenuOpen(false)}>
                    Action two
                  </MenuItem>
                </Menu>

                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 12,
                    alignItems: 'center',
                  }}
                >
                  <Fab
                    icon={<Plus color="#FFFFFF" />}
                    onPress={() => toast.info('FAB tapped')}
                  />
                  <Fab
                    variant="extended"
                    label="Create"
                    icon={<Plus color="#FFFFFF" />}
                    onPress={() => toast.info('Extended FAB')}
                  />
                </View>

                <Button
                  label="Open modal"
                  variant="outline"
                  size="sm"
                  onPress={() => setDemoModalOpen(true)}
                />
                <Modal
                  open={demoModalOpen}
                  onClose={() => setDemoModalOpen(false)}
                >
                  <Text
                    style={{
                      color: t.color.text.primary,
                      fontSize: 18,
                      fontWeight: '600',
                      marginBottom: 8,
                    }}
                  >
                    Demo modal
                  </Text>
                  <Text
                    style={{
                      color: t.color.text.secondary,
                      marginBottom: 16,
                      fontSize: 14,
                    }}
                  >
                    Modal body — tap backdrop to dismiss.
                  </Text>
                  <Button
                    label="Close"
                    onPress={() => setDemoModalOpen(false)}
                  />
                </Modal>

                <Button
                  label="Telegram-style confirm"
                  variant="outline"
                  size="sm"
                  onPress={() => setConfirmTelegramOpen(true)}
                />

                <Alert severity="info">
                  <AlertTitle>Heads up</AlertTitle>
                  <Text style={{ color: t.color.text.secondary, fontSize: 14 }}>
                    Inline alert with title.
                  </Text>
                </Alert>
                <Alert severity="success" variant="outlined">
                  <Text style={{ color: t.color.text.primary, fontSize: 14 }}>
                    Success — outlined variant.
                  </Text>
                </Alert>
                <Alert severity="warning" variant="filled">
                  <Text style={{ color: '#FFFFFF', fontSize: 14 }}>
                    Warning — filled variant.
                  </Text>
                </Alert>
              </View>
            </Section>
          </ScrollView>
        )}

        {mainTab === 'settings' && (
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              padding: t.spacing[4],
              gap: t.spacing[4],
              paddingBottom: scrollBottomPad,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Section
              title="Appearance"
              footer="Theme follows device when System is selected."
            >
              <View style={{ gap: 10 }}>
                <Text
                  style={{
                    fontSize: t.fontSize.sm,
                    fontWeight: '600',
                    color: t.color.text.secondary,
                  }}
                >
                  Color scheme
                </Text>
                <View style={row}>
                  <Button
                    label="Light"
                    variant={colorScheme === 'light' ? 'solid' : 'outline'}
                    size="sm"
                    leadingIcon={<Sun size={14} />}
                    onPress={() => setThemeScheme('light')}
                  />
                  <Button
                    label="Dark"
                    variant={colorScheme === 'dark' ? 'solid' : 'outline'}
                    size="sm"
                    leadingIcon={<Moon size={14} />}
                    onPress={() => setThemeScheme('dark')}
                  />
                  <Button
                    label="System"
                    variant="ghost"
                    size="sm"
                    leadingIcon={<Monitor size={14} />}
                    onPress={() => setThemeScheme('system')}
                  />
                </View>
                <SegmentedControl
                  options={['Compact', 'Comfortable', 'Spacious']}
                  selectedIndex={settingsLayoutSeg}
                  onChange={setSettingsLayoutSeg}
                />
              </View>
            </Section>

            <Section title="Account" flush>
              {[
                {
                  icon: <Bookmark size={18} color={t.color.text.inverse} />,
                  bg: '#2481CC',
                  label: 'Saved messages',
                  onPress: () => toast.info('Saved messages'),
                },
                {
                  icon: <Phone size={18} color={t.color.text.inverse} />,
                  bg: '#31A24C',
                  label: 'Recent calls',
                  onPress: () => toast.info('Calls'),
                },
                {
                  icon: <Smartphone size={18} color={t.color.text.inverse} />,
                  bg: '#F2A902',
                  label: 'Devices',
                  value: '2',
                  onPress: () => toast.info('Devices'),
                },
                {
                  icon: <Folder size={18} color={t.color.text.inverse} />,
                  bg: '#29B6F6',
                  label: 'Chat folders',
                  onPress: () => toast.info('Folders'),
                },
              ].map((rowItem, i, arr) => (
                <View key={rowItem.label}>
                  <Pressable
                    onPress={rowItem.onPress}
                    feedbackMode="highlight"
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: t.spacing[4],
                      minHeight: 52,
                    }}
                  >
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        backgroundColor: rowItem.bg,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {rowItem.icon}
                    </View>
                    <Text
                      style={{
                        flex: 1,
                        marginLeft: t.spacing[3],
                        fontSize: t.fontSize.md,
                        fontWeight: '500',
                        color: t.color.text.primary,
                      }}
                    >
                      {rowItem.label}
                    </Text>
                    {'value' in rowItem && rowItem.value ? (
                      <Text
                        style={{
                          fontSize: t.fontSize.md,
                          color: t.color.text.tertiary,
                          marginRight: 4,
                        }}
                      >
                        {rowItem.value}
                      </Text>
                    ) : null}
                    <ChevronRight size={18} color={t.color.text.tertiary} />
                  </Pressable>
                  {i < arr.length - 1 ? (
                    <GroupDivider inset={16 + 32 + 12} />
                  ) : null}
                </View>
              ))}
            </Section>

            <Section title="Privacy & security" flush>
              {[
                {
                  icon: <Bell size={18} color={t.color.text.inverse} />,
                  bg: '#FF5548',
                  label: 'Notifications',
                  onPress: () => toast.info('Notifications'),
                },
                {
                  icon: <Lock size={18} color={t.color.text.inverse} />,
                  bg: '#8E8E93',
                  label: 'Privacy',
                  onPress: () => toast.info('Privacy'),
                },
                {
                  icon: <User size={18} color={t.color.text.inverse} />,
                  bg: '#FF9500',
                  label: 'Profile',
                  onPress: () => toast.info('Profile'),
                },
              ].map((rowItem, i, arr) => (
                <View key={rowItem.label}>
                  <Pressable
                    onPress={rowItem.onPress}
                    feedbackMode="highlight"
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                      paddingHorizontal: t.spacing[4],
                      minHeight: 52,
                    }}
                  >
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        backgroundColor: rowItem.bg,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {rowItem.icon}
                    </View>
                    <Text
                      style={{
                        flex: 1,
                        marginLeft: t.spacing[3],
                        fontSize: t.fontSize.md,
                        fontWeight: '500',
                        color: t.color.text.primary,
                      }}
                    >
                      {rowItem.label}
                    </Text>
                    <ChevronRight size={18} color={t.color.text.tertiary} />
                  </Pressable>
                  {i < arr.length - 1 ? (
                    <GroupDivider inset={16 + 32 + 12} />
                  ) : null}
                </View>
              ))}
            </Section>
          </ScrollView>
        )}
      </KeyboardAvoidingView>

      <View
        style={{
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: t.color.border.subtle,
          backgroundColor: t.color.surface.default,
          paddingBottom: Platform.OS === 'ios' ? 8 : 4,
        }}
      >
        <BottomNavigation
          value={mainTab}
          onChange={(v) => setMainTab(v as MainTab)}
          showLabels
        >
          <BottomNavigationAction
            value="components"
            label="Components"
            icon={
              <Layers
                size={22}
                color={
                  mainTab === 'components'
                    ? t.color.brand.default
                    : t.color.text.tertiary
                }
              />
            }
          />
          <BottomNavigationAction
            value="data"
            label="Data"
            icon={
              <Database
                size={22}
                color={
                  mainTab === 'data'
                    ? t.color.brand.default
                    : t.color.text.tertiary
                }
              />
            }
          />
          <BottomNavigationAction
            value="feedback"
            label="Feedback"
            icon={
              <Bell
                size={22}
                color={
                  mainTab === 'feedback'
                    ? t.color.brand.default
                    : t.color.text.tertiary
                }
              />
            }
          />
          <BottomNavigationAction
            value="settings"
            label="Settings"
            icon={
              <Settings
                size={22}
                color={
                  mainTab === 'settings'
                    ? t.color.brand.default
                    : t.color.text.tertiary
                }
              />
            }
          />
        </BottomNavigation>
      </View>

      <BottomSheet
        ref={sheetRef}
        snapPoints={['50%', '90%']}
        onClose={() => {}}
      >
        <View style={{ padding: 24, gap: 12 }}>
          <Text
            style={{
              color: t.color.text.primary,
              fontSize: 18,
              fontWeight: '600',
            }}
          >
            Bottom Sheet
          </Text>
          <Text
            style={{
              color: t.color.text.secondary,
              fontSize: 14,
              lineHeight: 22,
            }}
          >
            Drag handle to snap. Swipe down or tap backdrop to dismiss.
          </Text>
          <Button
            label="Snap to 50%"
            variant="outline"
            onPress={() => sheetRef.current?.snapTo(0)}
          />
          <Button
            label="Snap to 90%"
            variant="outline"
            onPress={() => sheetRef.current?.snapTo(1)}
          />
          <Button
            label="Close"
            variant="destructive"
            onPress={() => sheetRef.current?.close()}
          />
        </View>
      </BottomSheet>

      <BottomSheet ref={actionSheetRef} snapPoints={['42%']} onClose={() => {}}>
        <View
          style={{
            paddingHorizontal: t.spacing[4],
            paddingTop: t.spacing[2],
            gap: 0,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: t.color.text.tertiary,
              fontSize: t.fontSize.sm,
              marginBottom: t.spacing[3],
              paddingHorizontal: t.spacing[2],
            }}
          >
            Leave this call? Your mic and camera will be turned off.
          </Text>
          <View
            style={{
              borderRadius: t.radius.lg,
              overflow: 'hidden',
              backgroundColor: t.color.surface.raised,
            }}
          >
            <Pressable
              onPress={() => {
                actionSheetRef.current?.close();
                toast.error('Ended (demo)');
              }}
              feedbackMode="highlight"
              style={{ paddingVertical: 16, alignItems: 'center' }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color: t.color.error.text,
                }}
              >
                End video chat
              </Text>
            </Pressable>
            <View
              style={{
                height: StyleSheet.hairlineWidth,
                backgroundColor: t.color.border.subtle,
              }}
            />
            <Pressable
              onPress={() => {
                actionSheetRef.current?.close();
                toast.info('Left call (demo)');
              }}
              feedbackMode="highlight"
              style={{ paddingVertical: 16, alignItems: 'center' }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color: t.color.brand.default,
                }}
              >
                Leave video chat
              </Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() => actionSheetRef.current?.close()}
            feedbackMode="highlight"
            style={{
              marginTop: t.spacing[3],
              borderRadius: t.radius.lg,
              backgroundColor: t.color.surface.raised,
              paddingVertical: 16,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: '600',
                color: t.color.brand.default,
              }}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </BottomSheet>

      <Modal
        open={confirmTelegramOpen}
        onClose={() => setConfirmTelegramOpen(false)}
      >
        <View
          style={{ alignItems: 'center', gap: t.spacing[3], width: '100%' }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: '700',
              color: t.color.text.primary,
              textAlign: 'center',
            }}
          >
            +84 969 069 035
          </Text>
          <Text
            style={{
              fontSize: t.fontSize.md,
              color: t.color.text.secondary,
              textAlign: 'center',
            }}
          >
            Is this the correct number for your account?
          </Text>
          <Pressable
            onPress={() => toast.info('Edit number')}
            feedbackMode="scaleSubtle"
          >
            <Text
              style={{
                fontSize: t.fontSize.md,
                fontWeight: '600',
                color: t.color.brand.default,
              }}
            >
              Edit
            </Text>
          </Pressable>
          <Button
            label="Continue"
            fullWidth
            onPress={() => setConfirmTelegramOpen(false)}
          />
          <Button
            label="Not now"
            variant="ghost"
            fullWidth
            onPress={() => setConfirmTelegramOpen(false)}
          />
        </View>
      </Modal>

      <ToastContainer position="bottom" />
    </SafeAreaView>
  );
}
