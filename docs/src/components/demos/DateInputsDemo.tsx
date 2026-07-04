export default function DateInputsDemo() {
  return (
    <div className="rnui-demo-stack rnui-demo-stack--lg">
      <p className="rnui-section-label">Scheduling</p>
      <label className="rnui-input">
        <span className="rnui-input__label">Due date</span>
        <span className="rnui-input__field rnui-input__field--readonly">
          Jul 18, 2026
        </span>
        <span className="rnui-input__helper">
          Optional fields can show a clear affordance in native.
        </span>
      </label>
      <label className="rnui-input">
        <span className="rnui-input__label">Reporting period</span>
        <span className="rnui-input__field rnui-input__field--readonly">
          Jul 1, 2026 - Jul 31, 2026
        </span>
      </label>
      <label className="rnui-input">
        <span className="rnui-input__label">Starts at</span>
        <span className="rnui-input__field rnui-input__field--readonly">
          Jul 18, 2026, 09:30
        </span>
      </label>
    </div>
  );
}
