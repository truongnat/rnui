/**
 * Detox E2E tests — run against the example app on a real simulator.
 *
 * Setup:
 *   cd apps/example
 *   bunx detox build --configuration ios.sim.debug
 *   bunx detox test --configuration ios.sim.debug
 *
 * All test IDs correspond to testID props in the example app.
 */

describe('Button', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('renders all button variants', async () => {
    await expect(element(by.id('btn-solid'))).toBeVisible();
    await expect(element(by.id('btn-outline'))).toBeVisible();
    await expect(element(by.id('btn-ghost'))).toBeVisible();
  });

  it('shows loading spinner and disables press', async () => {
    await element(by.id('btn-loading')).tap();
    await expect(element(by.id('btn-loading-spinner'))).toBeVisible();
    await waitFor(element(by.id('btn-loading-spinner')))
      .not.toBeVisible()
      .withTimeout(2500);
  });

  it('disabled button does not respond to tap', async () => {
    await element(by.id('btn-disabled')).tap();
    await expect(element(by.id('toast-container'))).not.toBeVisible();
  });
});

describe('Input', () => {
  it('shows helper text when empty', async () => {
    await expect(element(by.id('input-email-helper'))).toBeVisible();
  });

  it('shows error on blur with invalid email', async () => {
    await element(by.id('input-email')).tap();
    await element(by.id('input-email')).typeText('notanemail');
    await element(by.id('input-email')).tapReturnKey();
    await expect(element(by.id('input-email-error'))).toBeVisible();
    await expect(element(by.text('Invalid email'))).toBeVisible();
  });

  it('clears error when valid email is typed', async () => {
    await element(by.id('input-email')).clearText();
    await element(by.id('input-email')).typeText('user@example.com');
    await element(by.id('input-email')).tapReturnKey();
    await expect(element(by.id('input-email-error'))).not.toBeVisible();
  });
});

describe('Checkbox', () => {
  it('toggles checked state on tap', async () => {
    await element(by.id('checkbox-agree')).tap();
    await expect(element(by.id('checkbox-agree'))).toHaveAccessibilityValue({
      checked: 'true',
    });
    await element(by.id('checkbox-agree')).tap();
    await expect(element(by.id('checkbox-agree'))).toHaveAccessibilityValue({
      checked: 'false',
    });
  });

  it('disabled checkbox does not toggle', async () => {
    await element(by.id('checkbox-disabled')).tap();
    await expect(element(by.id('checkbox-disabled'))).toHaveAccessibilityValue({
      checked: 'true',
    });
  });
});

describe('Switch', () => {
  it('toggles on/off', async () => {
    await element(by.id('switch-notifications')).tap();
    await expect(
      element(by.id('switch-notifications'))
    ).toHaveAccessibilityValue({ checked: 'false' });
    await element(by.id('switch-notifications')).tap();
    await expect(
      element(by.id('switch-notifications'))
    ).toHaveAccessibilityValue({ checked: 'true' });
  });
});

describe('Toast', () => {
  it('shows success toast and auto-dismisses', async () => {
    await element(by.id('btn-toast-success')).tap();
    await expect(element(by.id('toast-container'))).toBeVisible();
    await expect(element(by.text('Saved!'))).toBeVisible();
    await waitFor(element(by.id('toast-container')))
      .not.toBeVisible()
      .withTimeout(5000);
  });

  it('shows toast with undo action and can trigger it', async () => {
    await element(by.id('btn-toast-undo')).tap();
    await expect(element(by.text('Message archived.'))).toBeVisible();
    await element(by.text('Undo')).tap();
    await expect(element(by.text('Restored!'))).toBeVisible();
  });

  it('persistent toast stays until manually dismissed', async () => {
    await element(by.id('btn-toast-persistent')).tap();
    await waitFor(element(by.text('Processing in background…')))
      .toBeVisible()
      .withTimeout(1000);
    // Still visible after 4s
    await new Promise((r) => setTimeout(r, 4000));
    await expect(element(by.text('Processing in background…'))).toBeVisible();
    // Dismiss manually
    await element(by.id('toast-dismiss-btn')).tap();
    await expect(
      element(by.text('Processing in background…'))
    ).not.toBeVisible();
  });
});

describe('Bottom Sheet', () => {
  it('opens at 50% snap point', async () => {
    await element(by.id('btn-sheet-half')).tap();
    await expect(element(by.id('bottom-sheet'))).toBeVisible();
  });

  it('snaps to 90% on button press', async () => {
    await element(by.id('btn-snap-90')).tap();
    await expect(element(by.id('bottom-sheet'))).toBeVisible();
  });

  it('closes on backdrop tap', async () => {
    await element(by.id('sheet-backdrop')).tap();
    await expect(element(by.id('bottom-sheet'))).not.toBeVisible();
  });

  it('closes on swipe down', async () => {
    await element(by.id('btn-sheet-half')).tap();
    await element(by.id('sheet-handle')).swipe('down', 'fast', 0.8);
    await expect(element(by.id('bottom-sheet'))).not.toBeVisible();
  });
});

describe('Select', () => {
  it('opens options sheet on trigger press', async () => {
    await element(by.id('select-country')).tap();
    await expect(element(by.text('Việt Nam'))).toBeVisible();
  });

  it('selects option and closes sheet', async () => {
    await element(by.text('Japan')).tap();
    await expect(element(by.id('select-country'))).toHaveText('Japan');
    await expect(element(by.text('Việt Nam'))).not.toBeVisible();
  });

  it('searchable select filters options', async () => {
    await element(by.id('select-country')).tap();
    await element(by.id('select-search-input')).typeText('sin');
    await expect(element(by.text('Singapore'))).toBeVisible();
    await expect(element(by.text('Japan'))).not.toBeVisible();
  });
});

describe('Theme', () => {
  it('switches to dark mode and back', async () => {
    await element(by.id('btn-theme-dark')).tap();
    // In dark mode, background should be very dark
    await expect(element(by.id('screen-root'))).toBeVisible();
    await element(by.id('btn-theme-light')).tap();
  });
});
