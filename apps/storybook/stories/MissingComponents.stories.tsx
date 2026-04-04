import type { StoryObj } from '@storybook/react-native';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  ThemeProvider,
  Divider,
  EmptyState,
  FormField,
  Modal,
  Popover,
  Popper,
  Skeleton,
  SkeletonCard,
  SkeletonText,
  SkeletonProfile,
  SkeletonMedia,
  SkeletonForm,
  SkeletonGrid,
  SkeletonTable,
  SkeletonGroup,
  Button,
  Input,
  Typography,
  Icon,
} from '@truongdq01/ui';

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider override={{}}>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 32 }}>
      {children}
    </ScrollView>
  </ThemeProvider>
);

const meta = {
  title: 'Components/Missing',
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

// ─── Divider ─────────────────────────────────────────────────────────

export const DividerStory: StoryObj = {
  name: 'Divider',
  render: () => (
    <View style={{ gap: 20 }}>
      <View>
        <Text style={{ marginBottom: 8 }}>Default Divider</Text>
        <Divider />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>With Label</Text>
        <Divider label="OR" />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Emphasis</Text>
        <Divider emphasis />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Spacing variants</Text>
        <Divider spacing="none" />
        <Divider spacing="sm" />
        <Divider spacing="md" />
        <Divider spacing="lg" />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Vertical Divider</Text>
        <View
          style={{
            flexDirection: 'row',
            height: 40,
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Text>Item 1</Text>
          <Divider orientation="vertical" />
          <Text>Item 2</Text>
          <Divider orientation="vertical" />
          <Text>Item 3</Text>
        </View>
      </View>
    </View>
  ),
};

// ─── EmptyState ──────────────────────────────────────────────────────

export const EmptyStateStory: StoryObj = {
  name: 'EmptyState',
  render: () => (
    <View style={{ gap: 20 }}>
      <EmptyState
        variant="search"
        title="No results found"
        description="Try adjusting your search or filter to find what you're looking for."
      />
      <EmptyState
        variant="error"
        title="Something went wrong"
        description="We couldn't load this content. Please try again."
        action={<Button label="Try Again" onPress={() => {}} />}
      />
      <EmptyState
        variant="empty"
        title="Nothing here yet"
        description="When there is content, it will show up here."
      />
      <EmptyState
        variant="offline"
        title="You're offline"
        description="Check your connection and try again."
      />
      <EmptyState
        variant="permission"
        title="Access denied"
        description="You don't have permission to view this."
      />
    </View>
  ),
};

// ─── FormField ───────────────────────────────────────────────────────

export const FormFieldStory: StoryObj = {
  name: 'FormField',
  render: () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    return (
      <View style={{ gap: 20 }}>
        <FormField
          label="Full Name"
          helperText="Enter your full name as it appears on your ID"
        >
          <Input placeholder="John Doe" value={name} onChangeText={setName} />
        </FormField>
        <FormField label="Email" required error="Please enter a valid email">
          <Input
            placeholder="john@example.com"
            value={email}
            onChangeText={setEmail}
          />
        </FormField>
        <FormField label="Disabled Field">
          <Input
            placeholder="Cannot edit"
            disabled
            defaultValue="Fixed value"
          />
        </FormField>
      </View>
    );
  },
};

// ─── Modal ───────────────────────────────────────────────────────────

export const ModalStory: StoryObj = {
  name: 'Modal',
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [openCentered, setOpenCentered] = React.useState(false);
    return (
      <View style={{ gap: 12 }}>
        <Button
          label="Open Simple Modal"
          onPress={() => setOpen(true)}
          accessibilityLabel="Open simple modal"
        />
        <Button
          label="Open Centered Modal"
          onPress={() => setOpenCentered(true)}
          accessibilityLabel="Open centered modal"
        />
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          accessibilityLabel="Simple modal"
        >
          <View
            style={{
              padding: 24,
              backgroundColor: '#fff',
              borderRadius: 12,
              minWidth: 280,
            }}
          >
            <Typography variant="h6" style={{ marginBottom: 12 }}>
              Simple Modal
            </Typography>
            <Text style={{ marginBottom: 16, color: '#666' }}>
              This is a basic modal. Tap outside to dismiss.
            </Text>
            <Button
              label="Close"
              onPress={() => setOpen(false)}
              accessibilityLabel="Close modal"
            />
          </View>
        </Modal>
        <Modal
          open={openCentered}
          onClose={() => setOpenCentered(false)}
          accessibilityLabel="Centered modal"
        >
          <View
            style={{
              padding: 24,
              backgroundColor: '#fff',
              borderRadius: 16,
              minWidth: 300,
              alignItems: 'center',
            }}
          >
            <Icon name="checkCircle" size={48} color="#22c55e" />
            <Typography variant="h6" style={{ marginTop: 12, marginBottom: 8 }}>
              Success!
            </Typography>
            <Text
              style={{ marginBottom: 20, color: '#666', textAlign: 'center' }}
            >
              Your action was completed successfully.
            </Text>
            <Button
              label="Got it"
              onPress={() => setOpenCentered(false)}
              accessibilityLabel="Dismiss"
            />
          </View>
        </Modal>
      </View>
    );
  },
};

// ─── Popover ─────────────────────────────────────────────────────────

export const PopoverStory: StoryObj = {
  name: 'Popover',
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<{
      x: number;
      y: number;
      width?: number;
      height?: number;
    } | null>(null);

    const handleOpen = (event: any) => {
      event.target?.measure?.(
        (
          _x: number,
          _y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          setAnchorEl({ x: pageX, y: pageY, width, height });
          setOpen(true);
        }
      );
    };

    return (
      <View style={{ gap: 20 }}>
        <Button
          label="Open Popover"
          onPress={handleOpen}
          accessibilityLabel="Open popover"
        />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <View style={{ padding: 16, minWidth: 200 }}>
            <Text style={{ fontWeight: '600', marginBottom: 8 }}>
              Popover Content
            </Text>
            <Text style={{ color: '#666', marginBottom: 12 }}>
              This is a popover positioned relative to the anchor element.
            </Text>
            <Button
              label="Close"
              size="sm"
              onPress={() => setOpen(false)}
              accessibilityLabel="Close popover"
            />
          </View>
        </Popover>
      </View>
    );
  },
};

// ─── Popper ──────────────────────────────────────────────────────────

export const PopperStory: StoryObj = {
  name: 'Popper',
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState<
      'bottom' | 'top' | 'right' | 'left'
    >('bottom');
    const [anchorEl, setAnchorEl] = React.useState<{
      x: number;
      y: number;
      width?: number;
      height?: number;
    } | null>(null);

    const handleOpen = (event: any, p: 'bottom' | 'top' | 'right' | 'left') => {
      setPlacement(p);
      event.target?.measure?.(
        (
          _x: number,
          _y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          setAnchorEl({ x: pageX, y: pageY, width, height });
          setOpen(true);
        }
      );
    };

    return (
      <View style={{ gap: 20 }}>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Button
            label="Top"
            size="sm"
            onPress={(e: any) => handleOpen(e, 'top')}
            accessibilityLabel="Top"
          />
          <Button
            label="Bottom"
            size="sm"
            onPress={(e: any) => handleOpen(e, 'bottom')}
            accessibilityLabel="Bottom"
          />
          <Button
            label="Left"
            size="sm"
            onPress={(e: any) => handleOpen(e, 'left')}
            accessibilityLabel="Left"
          />
          <Button
            label="Right"
            size="sm"
            onPress={(e: any) => handleOpen(e, 'right')}
            accessibilityLabel="Right"
          />
        </View>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          onClose={() => setOpen(false)}
        >
          <View
            style={{
              padding: 12,
              backgroundColor: '#1e293b',
              borderRadius: 8,
              minWidth: 150,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12 }}>
              Popper at {placement}
            </Text>
          </View>
        </Popper>
      </View>
    );
  },
};

// ─── Skeleton ────────────────────────────────────────────────────────

export const SkeletonStory: StoryObj = {
  name: 'Skeleton',
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ fontWeight: '600', marginBottom: 12 }}>
          Basic Skeletons
        </Text>
        <View style={{ gap: 12 }}>
          <Skeleton width="80%" height={20} />
          <Skeleton width="60%" height={16} />
          <Skeleton width="40%" height={14} />
        </View>
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 12 }}>
          Skeleton with Shimmer
        </Text>
        <Skeleton width="100%" height={16} shimmerDirection="left-to-right" />
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 12 }}>
          Skeleton Text
        </Text>
        <SkeletonText lines={4} />
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 12 }}>
          Skeleton Card
        </Text>
        <SkeletonCard />
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 12 }}>
          Skeleton Profile
        </Text>
        <SkeletonProfile />
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 12 }}>
          Skeleton Media
        </Text>
        <SkeletonMedia />
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 12 }}>
          Skeleton Form
        </Text>
        <SkeletonForm rows={3} />
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 12 }}>
          Skeleton Grid
        </Text>
        <SkeletonGrid columns={4} rows={2} cell={56} />
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 12 }}>
          Skeleton Table
        </Text>
        <SkeletonTable columns={4} dataRows={3} />
      </View>

      <View>
        <Text style={{ fontWeight: '600', marginBottom: 12 }}>
          Skeleton Group (staggered)
        </Text>
        <SkeletonGroup stagger={100}>
          <Skeleton width="90%" height={18} />
          <Skeleton width="70%" height={14} />
          <Skeleton width="50%" height={14} />
          <Skeleton width="100%" height={44} />
        </SkeletonGroup>
      </View>
    </View>
  ),
};
