export default function StackDemo() {
  return (
    <div className="rnui-demo-stack rnui-demo-stack--lg">
      <div className="rnui-card">
        <p className="rnui-section-label">Trip to Lisbon</p>
        <div className="rnui-demo-stack">
          <div className="rnui-demo-row" style={{ justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--rnui-text)' }}>
              Flight
            </span>
            <span
              style={{
                fontSize: '0.875rem',
                color: 'var(--rnui-text-secondary)',
              }}
            >
              Tue 9:40 AM
            </span>
          </div>
          <div className="rnui-demo-row" style={{ justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--rnui-text)' }}>
              Hotel check-in
            </span>
            <span
              style={{
                fontSize: '0.875rem',
                color: 'var(--rnui-text-secondary)',
              }}
            >
              3:00 PM
            </span>
          </div>
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <span className="rnui-btn rnui-btn--outline rnui-btn--sm">
            View itinerary
          </span>
        </div>
      </div>
    </div>
  );
}
