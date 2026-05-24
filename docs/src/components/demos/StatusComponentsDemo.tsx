export default function StatusComponentsDemo() {
  return (
    <div className="rnui-demo-stack rnui-demo-stack--lg">
      <div>
        <p className="rnui-section-label">Chips</p>
        <div className="rnui-demo-row">
          <span className="rnui-chip rnui-chip--solid">Product</span>
          <span className="rnui-chip rnui-chip--subtle">Draft</span>
          <span className="rnui-chip rnui-chip--outline">Filter</span>
          <span className="rnui-chip rnui-chip--success">Live</span>
        </div>
      </div>

      <div className="rnui-alert rnui-alert--info">
        <p className="rnui-alert__title">New version available</p>
        <p className="rnui-alert__body">
          Update to 2.4 for faster sync and improved offline mode.
        </p>
      </div>

      <div className="rnui-alert rnui-alert--warning">
        <p className="rnui-alert__title">Payment method expiring</p>
        <p className="rnui-alert__body">
          Your card ends in 12 days. Update billing to avoid interruption.
        </p>
      </div>

      <div className="rnui-toast rnui-toast--success">
        <span className="rnui-toast__icon" aria-hidden="true">
          ✓
        </span>
        <div>
          <p className="rnui-toast__title">Profile saved</p>
          <p className="rnui-toast__body">
            Your changes are live across all devices.
          </p>
        </div>
      </div>

      <div className="rnui-toast rnui-toast--error">
        <span className="rnui-toast__icon" aria-hidden="true">
          !
        </span>
        <div>
          <p className="rnui-toast__title">Could not upload photo</p>
          <p className="rnui-toast__body">Check your connection and try again.</p>
        </div>
      </div>

      <div className="rnui-snackbar">
        <span className="rnui-snackbar__message">Changes saved</span>
        <span className="rnui-snackbar__action">Undo</span>
      </div>

      <div>
        <p className="rnui-section-label">Controls</p>
        <div className="rnui-control-row">
          <label className="rnui-control">
            <span className="rnui-switch rnui-switch--on" aria-hidden="true">
              <span className="rnui-switch__thumb" />
            </span>
            Push notifications
          </label>
          <label className="rnui-control">
            <span className="rnui-switch rnui-switch--disabled" aria-hidden="true">
              <span className="rnui-switch__thumb" />
            </span>
            Marketing emails
          </label>
          <label className="rnui-control">
            <span
              className="rnui-checkbox rnui-checkbox--checked"
              aria-hidden="true"
            >
              ✓
            </span>
            Remember this device
          </label>
          <label className="rnui-control">
            <span
              className="rnui-checkbox rnui-checkbox--disabled"
              aria-hidden="true"
            />
            Share analytics
          </label>
        </div>
      </div>
    </div>
  );
}
