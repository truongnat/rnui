import type { ReactNode } from 'react';

function SurfaceBlock({
  label,
  surface,
  children,
}: {
  label: string;
  surface: 'white' | 'app' | 'card' | 'glass' | 'dark';
  children: ReactNode;
}) {
  return (
    <div className={`rnui-surface-panel rnui-surface-panel--${surface}`}>
      <p className="rnui-surface-panel__label">{label}</p>
      <div className="rnui-surface-panel__content">{children}</div>
    </div>
  );
}

function NoShadowCard({ children }: { children: ReactNode }) {
  return <div className="rnui-noshadow-card">{children}</div>;
}

function NoShadowPaper({ children }: { children: ReactNode }) {
  return <div className="rnui-noshadow-paper">{children}</div>;
}

function BadgeRow() {
  return (
    <div className="rnui-badge-row">
      <span className="rnui-badge rnui-badge--default">Default</span>
      <span className="rnui-badge rnui-badge--success">Success</span>
      <span className="rnui-badge rnui-badge--error">Error</span>
    </div>
  );
}

function ChipRow() {
  return (
    <div className="rnui-demo-row">
      <span className="rnui-chip rnui-chip--solid">Solid</span>
      <span className="rnui-chip rnui-chip--outlined">Outlined</span>
    </div>
  );
}

function AlertBlock() {
  return (
    <div className="rnui-alert rnui-alert--info">
      <p className="rnui-alert__title">Info alert</p>
      <p className="rnui-alert__body">Visible without shadow.</p>
    </div>
  );
}

function InputBlock() {
  return (
    <div className="rnui-input rnui-input--field">
      <label className="rnui-input__label">Email</label>
      <input
        className="rnui-input__field"
        placeholder="you@example.com"
        readOnly
      />
    </div>
  );
}

function ButtonRow() {
  return (
    <div className="rnui-demo-row">
      <button type="button" className="rnui-btn rnui-btn--outline">
        Outline
      </button>
      <button type="button" className="rnui-btn rnui-btn--ghost">
        Ghost
      </button>
      <button type="button" className="rnui-btn rnui-btn--solid" disabled>
        Disabled
      </button>
    </div>
  );
}

function NoShadowStack() {
  return (
    <>
      <NoShadowCard>
        <p className="rnui-typo-body">Card · shadow none</p>
      </NoShadowCard>
      <NoShadowPaper>
        <p className="rnui-typo-body">Paper · elevation none</p>
      </NoShadowPaper>
      <BadgeRow />
      <ChipRow />
      <AlertBlock />
      <InputBlock />
      <ButtonRow />
    </>
  );
}

export default function NoShadowSurfaceDemo() {
  return (
    <div className="rnui-demo-stack rnui-demo-stack--lg">
      <SurfaceBlock label="App background" surface="app">
        <NoShadowStack />
      </SurfaceBlock>
      <SurfaceBlock label="Card surface" surface="card">
        <NoShadowStack />
      </SurfaceBlock>
      <SurfaceBlock label="White surface" surface="white">
        <NoShadowStack />
      </SurfaceBlock>
      <SurfaceBlock label="Glass surface" surface="glass">
        <NoShadowStack />
      </SurfaceBlock>
      <SurfaceBlock label="Dark surface" surface="dark">
        <BadgeRow />
        <ChipRow />
        <AlertBlock />
      </SurfaceBlock>
    </div>
  );
}
