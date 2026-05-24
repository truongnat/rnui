export default function BadgeDemo() {
  return (
    <div className="rnui-demo-stack rnui-demo-stack--lg">
      <div className="rnui-surface-panel rnui-surface-panel--app">
        <p className="rnui-surface-panel__label">On app background</p>
        <div className="rnui-badge-row">
          <span className="rnui-badge rnui-badge--success">Shipped</span>
          <span className="rnui-badge rnui-badge--warning">Delayed</span>
          <span className="rnui-badge rnui-badge--error">Failed</span>
          <span className="rnui-badge rnui-badge--info">In transit</span>
        </div>
      </div>

      <div className="rnui-card">
        <p className="rnui-section-label">Orders</p>
        <div className="rnui-list-row">
          <span>#1042 — Studio desk</span>
          <span className="rnui-badge rnui-badge--success">Delivered</span>
        </div>
        <div className="rnui-list-row">
          <span>#1041 — Monitor arm</span>
          <span className="rnui-badge rnui-badge--brand">Processing</span>
        </div>
        <div className="rnui-list-row">
          <span>#1040 — Cable kit</span>
          <span className="rnui-badge rnui-badge--default">Draft</span>
        </div>
      </div>

      <div className="rnui-card">
        <p className="rnui-section-label">Account</p>
        <div className="rnui-list-row">
          <span>Subscription</span>
          <span className="rnui-badge rnui-badge--brand">Pro</span>
        </div>
        <div className="rnui-list-row">
          <span>Security</span>
          <span className="rnui-badge rnui-badge--accent">Action needed</span>
        </div>
      </div>

      <div>
        <p className="rnui-section-label">All variants</p>
        <div className="rnui-badge-row">
          <span className="rnui-badge rnui-badge--default">Default</span>
          <span className="rnui-badge rnui-badge--brand">Brand</span>
          <span className="rnui-badge rnui-badge--accent">Accent</span>
          <span className="rnui-badge rnui-badge--success">Success</span>
          <span className="rnui-badge rnui-badge--warning">Warning</span>
          <span className="rnui-badge rnui-badge--error">Error</span>
          <span className="rnui-badge rnui-badge--info">Info</span>
        </div>
      </div>
    </div>
  );
}
