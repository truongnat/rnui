# RNUI Gap Fix - Task Management Plan

> **Created:** 2026-03-29  
> **Based on:** STATUS_REPORT.md  
> **Total Tasks:** 24  
> **Estimated Time:** 2-3 weeks  

---

## 📋 Task Hierarchy

```
RNUI Gap Fix Project
├── Phase 1: Critical (P0) - Week 1, Days 1-2
│   ├── Task 1: Fix CI Branch Configuration
│   ├── Task 2: Setup NPM Publishing
│   ├── Task 3: Create Initial Changeset
│   └── Task 4: Publish v0.1.0 to NPM
├── Phase 2: Documentation (P1) - Week 1, Days 3-4
│   ├── Task 5: Document AnimatedList
│   ├── Task 6: Document Carousel
│   ├── Task 7: Document DatePicker
│   ├── Task 8: Document OTPInput
│   └── Task 9: Document SegmentedControl
├── Phase 3: Component Tokens (P1) - Week 1, Day 5
│   ├── Task 10: Add Tabs Token
│   ├── Task 11: Add Select Token
│   ├── Task 12: Add Rating Token
│   ├── Task 13: Add Pagination Token
│   └── Task 14: Add Timeline Token
├── Phase 4: Critical Hooks (P1) - Week 2, Days 1-3
│   ├── Task 15: Implement useAccordion
│   ├── Task 16: Implement useModal
│   ├── Task 17: Implement useDrawer
│   └── Task 18: Implement useStepper
├── Phase 5: Test Coverage (P1) - Week 2, Days 4-5 + Week 3, Days 1-2
│   ├── Task 19: Test Button Component
│   ├── Task 20: Test Input Component
│   ├── Task 21: Test Select Component
│   └── Task 22: Test Modal Component
└── Phase 6: Polish (P2) - Week 3, Days 3-5
    ├── Task 23: Complete Storybook Coverage
    └── Task 24: Create Landing Page
```

---

## 🔴 Phase 1: Critical Issues (P0)

### Task 1: Fix CI Branch Configuration
**Priority:** 🔴 CRITICAL  
**Estimated Time:** 5 minutes  
**Dependencies:** None  
**Assignee:** DevOps/Lead Developer  

**Description:**
Update GitHub Actions workflow to include `master` branch in CI triggers.

**Acceptance Criteria:**
- [ ] CI runs on push to `master` branch
- [ ] CI runs on PR to `master` branch
- [ ] Verify with test commit

**Implementation Steps:**
1. Open `.github/workflows/ci.yml`
2. Update `on.push.branches` to include `master`
3. Update `on.pull_request.branches` to include `master`
4. Commit and push
5. Verify CI runs

**GitNexus Commands:**
```bash
# Before editing
/impact ci.yml --repo rnui

# After editing
/changes staged --repo rnui
```

**Files to Modify:**
- `.github/workflows/ci.yml`

---

### Task 2: Setup NPM Publishing
**Priority:** 🔴 CRITICAL  
**Estimated Time:** 30 minutes  
**Dependencies:** None  
**Assignee:** Lead Developer  

**Description:**
Configure NPM authentication and publishing workflow.

**Acceptance Criteria:**
- [ ] NPM account created
- [ ] NPM access token generated
- [ ] `NPM_TOKEN` added to GitHub secrets
- [ ] Test publish to npm (dry-run)

**Implementation Steps:**
1. Create NPM account at npmjs.com
2. Generate automation token (Settings → Access Tokens)
3. Add token to GitHub repo secrets as `NPM_TOKEN`
4. Verify release workflow has access
5. Test with `npm publish --dry-run`

**Security Notes:**
- Use automation token (not classic token)
- Set token to read-write for publishing
- Never commit token to repository

---

### Task 3: Create Initial Changeset
**Priority:** 🔴 CRITICAL  
**Estimated Time:** 15 minutes  
**Dependencies:** Task 2  
**Assignee:** Lead Developer  

**Description:**
Create changeset for v0.1.0 initial release.

**Acceptance Criteria:**
- [ ] Changeset created for all 4 packages
- [ ] Version bump set to `minor` (0.1.0)
- [ ] Release notes written
- [ ] Changeset committed

**Implementation Steps:**
```bash
bun changeset
# Select: @truongdq01/tokens, @truongdq01/headless, @truongdq01/ui, @truongdq01/themes
# Choose: minor
# Description: "Initial release with 62 components, 19 hooks, comprehensive token system"
git add .changeset/
git commit -m "chore: add changeset for v0.1.0"
```

**Release Notes Template:**
```markdown
# v0.1.0 - Initial Release

## Features
- 62 production-ready React Native components
- 19 headless hooks for logic separation
- Comprehensive token system (primitive → semantic → component → motion)
- 120+ icons from lucide-react-native
- Full TypeScript support
- Reanimated 3 animations
- Dark mode support

## Packages
- @truongdq01/tokens - Design token system
- @truongdq01/headless - Headless hooks
- @truongdq01/ui - UI components
- @truongdq01/themes - Theme presets
```

---

### Task 4: Publish v0.1.0 to NPM
**Priority:** 🔴 CRITICAL  
**Estimated Time:** 15 minutes  
**Dependencies:** Task 2, Task 3  
**Assignee:** Lead Developer  

**Description:**
Trigger release workflow and publish packages to NPM.

**Acceptance Criteria:**
- [ ] Packages published to npm
- [ ] Version tags created in git
- [ ] GitHub release created
- [ ] Installation verified: `npm install @truongdq01/ui`

**Implementation Steps:**
```bash
# Merge changeset to main/master
git checkout master
git merge feature/initial-release
git push origin master

# Release workflow will:
# 1. Run changesets version
# 2. Build all packages
# 3. Publish to npm
# 4. Create git tags
# 5. Create GitHub release

# Verify
npm view @truongdq01/ui
npm install @truongdq01/ui
```

**Rollback Plan:**
```bash
# If publish fails
npm unpublish @truongdq01/ui@0.1.0
npm unpublish @truongdq01/tokens@0.1.0
npm unpublish @truongdq01/headless@0.1.0
npm unpublish @truongdq01/themes@0.1.0
```

---

## 🟡 Phase 2: Documentation (P1)

### Task 5-9: Document Missing Components
**Priority:** 🟡 HIGH  
**Estimated Time:** 2 hours total (24 min each)  
**Dependencies:** None  
**Assignee:** Technical Writer / Developer  

**Components to Document:**
1. AnimatedList
2. Carousel
3. DatePicker
4. OTPInput
5. SegmentedControl

**Template for Each:**
```markdown
---
title: [ComponentName]
description: [One-line description]
---

# [ComponentName]

[Brief description of what the component does]

## Installation

\`\`\`bash
npm install @truongdq01/ui
\`\`\`

## Usage

\`\`\`tsx
import { [ComponentName] } from '@truongdq01/ui';

export default function Example() {
  return (
    <[ComponentName]
      // props
    />
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| ... | ... | ... | ... |

## Examples

### Basic Usage
[Code example]

### Advanced Usage
[Code example]

## Accessibility

- [Accessibility features]

## Related Components

- [Related components]
```

**GitNexus Commands:**
```bash
# Before documenting, understand the component
/context AnimatedList --repo rnui
/context Carousel --repo rnui
/context DatePicker --repo rnui
/context OTPInput --repo rnui
/context SegmentedControl --repo rnui
```

---

## 🟡 Phase 3: Component Tokens (P1)

### Task 10-14: Add Component Tokens
**Priority:** 🟡 HIGH  
**Estimated Time:** 4 hours total (48 min each)  
**Dependencies:** None  
**Assignee:** Design System Engineer  

**Components:**
1. Tabs
2. Select
3. Rating
4. Pagination
5. Timeline

**Implementation Pattern:**
```typescript
// packages/tokens/src/component.ts

export function tabs(semantic: SemanticTokens): TabsTokens {
  return {
    container: {
      backgroundColor: semantic.color.bg.default,
      borderBottomWidth: 1,
      borderBottomColor: semantic.color.border.default,
    },
    tab: {
      default: {
        paddingHorizontal: semantic.spacing[4],
        paddingVertical: semantic.spacing[3],
        color: semantic.color.text.secondary,
      },
      active: {
        color: semantic.color.brand.default,
        borderBottomWidth: 2,
        borderBottomColor: semantic.color.brand.default,
      },
      disabled: {
        opacity: 0.5,
      },
    },
    indicator: {
      height: 2,
      backgroundColor: semantic.color.brand.default,
    },
  };
}
```

**GitNexus Workflow:**
```bash
# Before editing
/impact component.ts --repo rnui
/context tabs --repo rnui

# After editing
/changes staged --repo rnui
```

**Acceptance Criteria per Component:**
- [ ] Token function created
- [ ] All variants covered (default, active, disabled, etc.)
- [ ] Sizes defined (sm, md, lg)
- [ ] States defined (default, hover, focus, disabled)
- [ ] Component updated to use tokens
- [ ] Storybook story updated
- [ ] Build passes

---

## 🟡 Phase 4: Critical Hooks (P1)

### Task 15: Implement useAccordion
**Priority:** 🟡 HIGH  
**Estimated Time:** 4 hours  
**Dependencies:** None  
**Assignee:** Frontend Engineer  

**Description:**
Create headless hook for accordion expand/collapse logic.

**Features:**
- Single/multiple expand modes
- Keyboard navigation (Arrow keys, Home, End)
- Controlled/uncontrolled state
- Animation support
- Accessibility (ARIA attributes)

**API Design:**
```typescript
interface UseAccordionOptions {
  defaultExpandedItems?: string[];
  expandedItems?: string[];
  onExpandedChange?: (items: string[]) => void;
  allowMultiple?: boolean;
  allowToggle?: boolean;
}

interface UseAccordionReturn {
  expandedItems: string[];
  toggleItem: (id: string) => void;
  expandItem: (id: string) => void;
  collapseItem: (id: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  getItemProps: (id: string) => {
    expanded: boolean;
    onPress: () => void;
    'aria-expanded': boolean;
  };
}
```

**Implementation Steps:**
1. Create `packages/headless/src/hooks/useAccordion.ts`
2. Implement state management
3. Add keyboard navigation
4. Add accessibility attributes
5. Write tests
6. Update component to use hook
7. Create Storybook story

**GitNexus Commands:**
```bash
/explore accordion pattern --repo rnui
/impact Accordion --repo rnui
```

---

### Task 16: Implement useModal
**Priority:** 🟡 HIGH  
**Estimated Time:** 4 hours  
**Dependencies:** None  
**Assignee:** Frontend Engineer  

**Description:**
Create headless hook for modal focus trap and backdrop logic.

**Features:**
- Focus trap (trap focus inside modal)
- Focus restoration (return focus on close)
- Backdrop click to close
- ESC key to close
- Scroll lock on body
- Accessibility (ARIA attributes)

**API Design:**
```typescript
interface UseModalOptions {
  isOpen: boolean;
  onClose: () => void;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  initialFocusRef?: RefObject<any>;
  finalFocusRef?: RefObject<any>;
}

interface UseModalReturn {
  isOpen: boolean;
  close: () => void;
  modalProps: {
    role: 'dialog';
    'aria-modal': boolean;
    'aria-labelledby': string;
  };
  backdropProps: {
    onPress: () => void;
  };
  overlayProps: {
    onStartShouldSetResponder: () => boolean;
  };
}
```

---

### Task 17: Implement useDrawer
**Priority:** 🟡 HIGH  
**Estimated Time:** 4 hours  
**Dependencies:** None  
**Assignee:** Frontend Engineer  

**Description:**
Create headless hook for drawer swipe gestures and animations.

**Features:**
- Swipe to open/close
- Snap points
- Backdrop
- Position (left, right, top, bottom)
- Velocity-based animations

**API Design:**
```typescript
interface UseDrawerOptions {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right' | 'top' | 'bottom';
  swipeToClose?: boolean;
  backdrop?: boolean;
}

interface UseDrawerReturn {
  isOpen: boolean;
  close: () => void;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  panGesture: ReturnType<typeof Gesture.Pan>;
  backdropOpacity: SharedValue<number>;
  animatedStyle: ReturnType<typeof useAnimatedStyle>;
}
```

---

### Task 18: Implement useStepper
**Priority:** 🟡 HIGH  
**Estimated Time:** 4 hours  
**Dependencies:** None  
**Assignee:** Frontend Engineer  

**Description:**
Create headless hook for stepper navigation and validation.

**Features:**
- Step validation
- Linear/non-linear navigation
- Step state (completed, active, error)
- Progress tracking
- Async validation support

**API Design:**
```typescript
interface UseStepperOptions {
  steps: number;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  validateStep?: (step: number) => boolean | Promise<boolean>;
  linear?: boolean;
}

interface UseStepperReturn {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  canGoNext: boolean;
  canGoPrev: boolean;
  goToStep: (step: number) => Promise<void>;
  nextStep: () => Promise<void>;
  prevStep: () => void;
  reset: () => void;
  getStepState: (step: number) => 'completed' | 'active' | 'pending' | 'error';
}
```

---

## 🟡 Phase 5: Test Coverage (P1)

### Task 19-22: Component Tests
**Priority:** 🟡 HIGH  
**Estimated Time:** 2 days total (4 hours each)  
**Dependencies:** None  
**Assignee:** QA Engineer / Developer  

**Components to Test:**
1. Button
2. Input
3. Select
4. Modal

**Test Template:**
```typescript
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with text', () => {
      const { getByText } = render(<Button>Click me</Button>);
      expect(getByText('Click me')).toBeTruthy();
    });

    it('renders with icon', () => {
      const { getByTestId } = render(
        <Button icon="star" testID="button">Click</Button>
      );
      expect(getByTestId('button')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('calls onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button onPress={onPress}>Click me</Button>
      );
      fireEvent.press(getByText('Click me'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('does not call onPress when disabled', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button onPress={onPress} disabled>Click me</Button>
      );
      fireEvent.press(getByText('Click me'));
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('Variants', () => {
    it('renders solid variant', () => {
      const { getByTestId } = render(
        <Button variant="solid" testID="button">Click</Button>
      );
      expect(getByTestId('button')).toBeTruthy();
    });

    it('renders outlined variant', () => {
      const { getByTestId } = render(
        <Button variant="outlined" testID="button">Click</Button>
      );
      expect(getByTestId('button')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const { getByTestId } = render(
        <Button size="sm" testID="button">Click</Button>
      );
      expect(getByTestId('button')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('has correct accessibility role', () => {
      const { getByRole } = render(<Button>Click me</Button>);
      expect(getByRole('button')).toBeTruthy();
    });

    it('has correct accessibility label', () => {
      const { getByLabelText } = render(
        <Button accessibilityLabel="Submit form">Submit</Button>
      );
      expect(getByLabelText('Submit form')).toBeTruthy();
    });
  });
});
```

**Test Coverage Goals:**
- Rendering: 100%
- Interactions: 100%
- Variants: 100%
- Sizes: 100%
- States: 100%
- Accessibility: 100%

**GitNexus Commands:**
```bash
# Before writing tests
/context Button --repo rnui
/impact Button --repo rnui
```

---

## 🟢 Phase 6: Polish (P2)

### Task 23: Complete Storybook Coverage
**Priority:** 🟢 MEDIUM  
**Estimated Time:** 1 day  
**Dependencies:** None  
**Assignee:** Frontend Engineer  

**Description:**
Create Storybook stories for remaining 42 components.

**Components Without Stories:**
AnimatedList, Carousel, DatePicker, OTPInput, SegmentedControl, AppBar, BottomNavigation, Breadcrumbs, ButtonGroup, CircularProgress, Drawer, EmptyState, FormControl, Grid, ImageList, LinearProgress, Popper, SpeedDial, Stack, Stepper, Table, Timeline, Typography, and more...

**Story Template:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '@truongdq01/ui';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    // Define controls
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    // Default props
  },
};

export const Variants: Story = {
  render: () => (
    <>
      <ComponentName variant="default" />
      <ComponentName variant="outlined" />
      <ComponentName variant="filled" />
    </>
  ),
};
```

---

### Task 24: Create Landing Page
**Priority:** 🟢 MEDIUM  
**Estimated Time:** 2 hours  
**Dependencies:** Task 4 (NPM published)  
**Assignee:** Frontend Engineer / Designer  

**Description:**
Create marketing landing page for RNUI library.

**Sections:**
1. Hero - "Beautiful React Native UI Components"
2. Features - Token system, Dark mode, TypeScript, etc.
3. Quick Start - Installation and usage
4. Component Showcase - Interactive demos
5. Documentation Link
6. GitHub Link

**Tech Stack:**
- Next.js or Docusaurus
- Tailwind CSS
- Framer Motion for animations

**Deployment:**
- Domain: `rnui.dev` (landing page)
- Subdomain: `docs.rnui.dev` (documentation)

---

## 📊 Progress Tracking

### Week 1
| Day | Phase | Tasks | Status |
|-----|-------|-------|--------|
| Mon | P0 | 1-4 | ⬜ Not Started |
| Tue | P0 | 1-4 | ⬜ Not Started |
| Wed | P1 | 5-7 | ⬜ Not Started |
| Thu | P1 | 8-9 | ⬜ Not Started |
| Fri | P1 | 10-14 | ⬜ Not Started |

### Week 2
| Day | Phase | Tasks | Status |
|-----|-------|-------|--------|
| Mon | P1 | 15-16 | ⬜ Not Started |
| Tue | P1 | 17-18 | ⬜ Not Started |
| Wed | P1 | 17-18 | ⬜ Not Started |
| Thu | P1 | 19-20 | ⬜ Not Started |
| Fri | P1 | 21-22 | ⬜ Not Started |

### Week 3
| Day | Phase | Tasks | Status |
|-----|-------|-------|--------|
| Mon | P1 | 21-22 | ⬜ Not Started |
| Tue | P1 | 21-22 | ⬜ Not Started |
| Wed | P2 | 23 | ⬜ Not Started |
| Thu | P2 | 23 | ⬜ Not Started |
| Fri | P2 | 24 | ⬜ Not Started |

---

## 🎯 Success Metrics

### Phase 1 (P0) - Critical
- [ ] CI runs on all branches
- [ ] Packages published to npm
- [ ] Users can install: `npm install @truongdq01/ui`

### Phase 2 (P1) - Documentation
- [ ] All 62 components documented
- [ ] Documentation site deployed

### Phase 3 (P1) - Tokens
- [ ] 18/62 components have tokens (from 13)
- [ ] Top 5 priority components tokenized

### Phase 4 (P1) - Hooks
- [ ] 23/62 components have hooks (from 19)
- [ ] 4 critical hooks implemented

### Phase 5 (P1) - Tests
- [ ] Test coverage: 20% (from 15%)
- [ ] Core components tested

### Phase 6 (P2) - Polish
- [ ] Storybook: 100% coverage
- [ ] Landing page live

---

## 🔄 Daily Standup Template

```markdown
## Today's Focus
- [ ] Task #X: [Task Name]

## Yesterday's Progress
- ✅ Completed: Task #Y
- 🚧 In Progress: Task #Z

## Blockers
- None / [Describe blocker]

## GitNexus Commands Used
- /impact [symbol] --repo rnui
- /changes staged --repo rnui
```

---

## 📝 Task Completion Checklist

For each task:
- [ ] GitNexus impact analysis run
- [ ] Code implemented
- [ ] Tests written (if applicable)
- [ ] Documentation updated
- [ ] Storybook story created/updated
- [ ] Build passes
- [ ] GitNexus change detection run
- [ ] PR created and reviewed
- [ ] Merged to main/master

---

*Generated from STATUS_REPORT.md*  
*Last Updated: 2026-03-29*
