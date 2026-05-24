import { describe, expect, test } from 'bun:test';
import {
  getLazyLoadPlan,
  loginScreenSchemaExample,
} from '@truongdq01/component-schema';
import {
  createLazyComponentMap,
  prepareScreenRender,
} from '../component-loader';
import { exportScreenSchemaToTsx } from '../export-tsx';
import { resolveNodeRender } from '../resolve-props';
import { resolveScreenPadding } from '../token-map';

describe('resolveScreenPadding', () => {
  test('maps md preset to 16', () => {
    expect(resolveScreenPadding('md')).toBe(16);
  });

  test('falls back to md for unknown values', () => {
    expect(resolveScreenPadding('unknown')).toBe(16);
  });
});

describe('resolveNodeRender', () => {
  test('maps Screen to Stack with flex and padding', () => {
    const resolved = resolveNodeRender({
      type: 'Screen',
      props: { padding: 'lg', spacing: 'md' },
      children: [],
    });

    expect(resolved.componentType).toBe('Stack');
    expect(resolved.props.style).toEqual({ flex: 1, padding: 24 });
    expect(resolved.props.spacing).toBe('md');
  });

  test('maps Button action to onPress when handler provided', () => {
    const resolved = resolveNodeRender(
      {
        type: 'Button',
        props: { label: 'Go', action: 'signIn' },
      },
      { signIn: () => {} }
    );

    expect(resolved.props.label).toBe('Go');
    expect(resolved.props.action).toBeUndefined();
    expect(typeof resolved.props.onPress).toBe('function');
  });

  test('promotes Typography children prop to text child', () => {
    const resolved = resolveNodeRender({
      type: 'Typography',
      props: { variant: 'h4', children: 'Hello' },
    });

    expect(resolved.children).toBe('Hello');
    expect(resolved.props.children).toBeUndefined();
  });
});

describe('prepareScreenRender', () => {
  test('accepts valid login schema', () => {
    const result = prepareScreenRender(loginScreenSchemaExample);
    expect(result.valid).toBe(true);
    expect(result.plan?.components.length).toBeGreaterThan(0);
  });

  test('rejects invalid schema', () => {
    const result = prepareScreenRender({
      id: '',
      name: '',
      version: '1',
      root: { type: 'Nope' },
    });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

describe('exportScreenSchemaToTsx', () => {
  test('exports login screen with Stack root and ThemeProvider', () => {
    const tsx = exportScreenSchemaToTsx(loginScreenSchemaExample, {
      componentName: 'LoginScreen',
    });

    expect(tsx).toContain(
      "import { ThemeProvider } from '@truongdq01/headless'"
    );
    expect(tsx).toContain(
      "import { Button, Input, Stack, Typography } from '@truongdq01/ui'"
    );
    expect(tsx).toContain('export function LoginScreen');
    expect(tsx).toContain(
      '<Stack spacing="md" style={{ flex: 1, padding: 16 }}>'
    );
    expect(tsx).toContain('onPress={handleSignIn}');
    expect(tsx).toContain('const handleSignIn');
  });
});

describe('component maps', () => {
  test('createLazyComponentMap includes Screen lazy key', () => {
    const map = createLazyComponentMap();
    expect(typeof map.Screen).toBe('function');
    expect(typeof map.Button).toBe('function');
  });

  test('getLazyLoadPlan matches web preview types used in login schema', () => {
    const plan = getLazyLoadPlan(loginScreenSchemaExample);
    const types = plan.components.map((entry) => entry.type);
    expect(types).toContain('Screen');
    expect(types).toContain('Button');
    expect(types).toContain('Input');
  });
});
