export default function InputDemo() {
  return (
    <div className="rnui-demo-stack rnui-demo-stack--lg">
      <p className="rnui-section-label">Sign in</p>
      <label className="rnui-input">
        <span className="rnui-input__label">Email</span>
        <input
          className="rnui-input__field"
          type="email"
          placeholder="you@company.com"
          readOnly
        />
        <span className="rnui-input__helper">We’ll never share your email.</span>
      </label>
      <label className="rnui-input">
        <span className="rnui-input__label">Password</span>
        <input
          className="rnui-input__field"
          type="password"
          placeholder="••••••••"
          readOnly
        />
      </label>
      <label className="rnui-input">
        <span className="rnui-input__label">Invite code</span>
        <input
          className="rnui-input__field rnui-input__field--error"
          defaultValue="INVALID"
          readOnly
        />
        <span className="rnui-input__error">This code has expired.</span>
      </label>
      <span className="rnui-btn rnui-btn--solid">Continue</span>
    </div>
  );
}
