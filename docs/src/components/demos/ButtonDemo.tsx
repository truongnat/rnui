export default function ButtonDemo() {
  return (
    <div className="rnui-demo-stack rnui-demo-stack--lg">
      <div className="rnui-card">
        <h3 className="rnui-card__title">Upgrade to Pro</h3>
        <p className="rnui-card__body">
          Unlock offline mode, shared workspaces, and priority support for your
          team.
        </p>
        <div className="rnui-demo-row">
          <span className="rnui-btn rnui-btn--solid">Start free trial</span>
          <span className="rnui-btn rnui-btn--outline">Learn more</span>
        </div>
      </div>
      <div>
        <p className="rnui-section-label">Variants</p>
        <div className="rnui-demo-row">
          <span className="rnui-btn rnui-btn--solid">Primary</span>
          <span className="rnui-btn rnui-btn--outline">Outline</span>
          <span className="rnui-btn rnui-btn--ghost">Ghost</span>
          <span className="rnui-btn rnui-btn--destructive rnui-btn--sm">
            Delete
          </span>
        </div>
      </div>
    </div>
  );
}
