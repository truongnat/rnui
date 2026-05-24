export default function CardDemo() {
  return (
    <div className="rnui-demo-stack">
      <div className="rnui-card">
        <h3 className="rnui-card__title">Alex Morgan</h3>
        <p className="rnui-card__body">
          Product designer · San Francisco. Usually replies within a few hours.
        </p>
        <div className="rnui-demo-row">
          <span className="rnui-btn rnui-btn--solid rnui-btn--sm">Message</span>
          <span className="rnui-btn rnui-btn--outline rnui-btn--sm">View profile</span>
        </div>
      </div>
      <div className="rnui-card">
        <h3 className="rnui-card__title">Weekly summary</h3>
        <p className="rnui-card__body">
          12 tasks completed · 3 meetings · Focus time up 18% from last week.
        </p>
      </div>
    </div>
  );
}
