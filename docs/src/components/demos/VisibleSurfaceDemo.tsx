import type { ReactNode } from 'react';

const BADGE_VARIANTS = [
  { key: 'default', label: 'Default' },
  { key: 'brand', label: 'Brand' },
  { key: 'accent', label: 'Accent' },
  { key: 'success', label: 'Success' },
  { key: 'warning', label: 'Warning' },
  { key: 'error', label: 'Error' },
  { key: 'info', label: 'Info' },
] as const;

function BadgeRow() {
  return (
    <div className="rnui-badge-row">
      {BADGE_VARIANTS.map(({ key, label }) => (
        <span key={key} className={`rnui-badge rnui-badge--${key}`}>
          {label}
        </span>
      ))}
    </div>
  );
}

function ChipRow() {
  return (
    <div className="rnui-demo-row">
      <span className="rnui-chip rnui-chip--solid">Brand</span>
      <span className="rnui-chip rnui-chip--subtle">Neutral</span>
      <span className="rnui-chip rnui-chip--success">Active</span>
    </div>
  );
}

function AlertRow() {
  return (
    <div className="rnui-status-stack">
      <div className="rnui-alert rnui-alert--success">
        <p className="rnui-alert__title">Synced</p>
      </div>
      <div className="rnui-alert rnui-alert--error">
        <p className="rnui-alert__title">Failed</p>
      </div>
    </div>
  );
}

function SurfacePanel({
  label,
  surface,
  children,
}: {
  label: string;
  surface: 'white' | 'app' | 'card' | 'dark' | 'glass';
  children: ReactNode;
}) {
  return (
    <div className={`rnui-surface-panel rnui-surface-panel--${surface}`}>
      <p className="rnui-surface-panel__label">{label}</p>
      <div className="rnui-surface-panel__content">{children}</div>
    </div>
  );
}

export default function VisibleSurfaceDemo() {
  return (
    <div className="rnui-demo-stack rnui-demo-stack--lg">
      <SurfacePanel label="White surface" surface="white">
        <BadgeRow />
        <ChipRow />
        <AlertRow />
      </SurfacePanel>
      <SurfacePanel label="App background" surface="app">
        <BadgeRow />
        <ChipRow />
        <AlertRow />
      </SurfacePanel>
      <SurfacePanel label="Card surface" surface="card">
        <BadgeRow />
        <ChipRow />
        <AlertRow />
      </SurfacePanel>
      <SurfacePanel label="Glass surface" surface="glass">
        <BadgeRow />
        <ChipRow />
        <AlertRow />
      </SurfacePanel>
      <SurfacePanel label="Dark surface" surface="dark">
        <BadgeRow />
        <ChipRow />
        <AlertRow />
      </SurfacePanel>
    </div>
  );
}
