import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Simple SVG Icons
const Icons = {
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  Palette: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="32"
      height="32"
    >
      <circle cx="13.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="10.5" r="2.5" />
      <circle cx="8.5" cy="7.5" r="2.5" />
      <circle cx="6.5" cy="12.5" r="2.5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  ),
  Zap: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="32"
      height="32"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Layers: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="32"
      height="32"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Smartphone: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="32"
      height="32"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  Check: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      width="18"
      height="18"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="20"
      height="20"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Box: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="32"
      height="32"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Code: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="32"
      height="32"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
};

const FEATURES = [
  {
    icon: <Icons.Palette />,
    title: 'Design Tokens',
    desc: 'Primitive → semantic → component tokens. Systematic styling with full override control.',
    color: '#6366f1',
  },
  {
    icon: <Icons.Code />,
    title: '62+ Components',
    desc: 'Production-ready components from basic buttons to complex data displays.',
    color: '#8b5cf6',
  },
  {
    icon: <Icons.Zap />,
    title: 'Headless Hooks',
    desc: 'Logic without styles. Complete control over accessibility and interactions.',
    color: '#a855f7',
  },
  {
    icon: <Icons.Layers />,
    title: 'Dual Architecture',
    desc: 'Styled components for speed or headless hooks for total customization.',
    color: '#d946ef',
  },
  {
    icon: <Icons.Smartphone />,
    title: '60fps Performance',
    desc: 'Reanimated 3 and FlashList for buttery smooth animations.',
    color: '#ec4899',
  },
  {
    icon: <Icons.Box />,
    title: 'Multi-Brand Ready',
    desc: 'Switch themes instantly. Perfect for white-label applications.',
    color: '#f43f5e',
  },
];

const CODE_EXAMPLE = `// Simple and intuitive
import { Button, Input, Card } from "@truongdq01/ui";

function MyForm() {
  return (
    <Card>
      <Input label="Email" placeholder="name@example.com" />
      <Button label="Submit" onPress={handleSubmit} />
    </Card>
  );
}`;

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Premium React Native UI components"
    >
      {/* Hero Section - Modern Gradient */}
      <header className="hero-modern">
        <div className="hero-gradient-bg"></div>
        <div className="hero-grid-bg"></div>

        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-pulse"></span>
              v0.1.0 — Production Ready
            </div>

            <h1 className="hero-title">
              Build beautiful React Native apps{' '}
              <span className="gradient-text">faster</span>
            </h1>

            <p className="hero-description">
              A complete UI toolkit with 62+ components, headless hooks, and
              design tokens. Everything you need to ship stunning apps.
            </p>

            <div className="hero-cta">
              <Link className="btn btn-primary" to="/docs/getting-started">
                Start Building Free
                <Icons.ArrowRight />
              </Link>
              <Link className="btn btn-ghost" to="https://github.com/rnui/rnui">
                <Icons.Github />
                Star on GitHub
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">62+</div>
                <div className="stat-label">Components</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <div className="stat-number">120+</div>
                <div className="stat-label">Icons</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <div className="stat-number">5</div>
                <div className="stat-label">Themes</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <div className="stat-number">60fps</div>
                <div className="stat-label">Performance</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hero-visual">
            <div className="code-window">
              <div className="code-window-header">
                <div className="code-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <span className="code-title">App.tsx</span>
              </div>
              <pre className="code-window-content">
                <code>{CODE_EXAMPLE}</code>
              </pre>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Features</span>
            <h2 className="section-title">Everything you need</h2>
            <p className="section-subtitle">
              Powerful features to accelerate your development workflow
            </p>
          </div>

          <div className="features-grid-modern">
            {FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="feature-card-modern"
                style={{ '--feature-color': feature.color }}
              >
                <div className="feature-icon-wrapper">{feature.icon}</div>
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Preview */}
      <section className="section components-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Components</span>
            <h2 className="section-title">62+ Ready to use</h2>
            <p className="section-subtitle">
              From simple buttons to complex forms - we've got you covered
            </p>
          </div>

          <div className="components-showcase-modern">
            <div className="component-group">
              <h4>Forms & Input</h4>
              <div className="component-tags">
                {[
                  'Button',
                  'Input',
                  'Select',
                  'Checkbox',
                  'Switch',
                  'Slider',
                  'DatePicker',
                ].map((item) => (
                  <span key={item} className="component-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="component-group">
              <h4>Navigation</h4>
              <div className="component-tags">
                {[
                  'Tabs',
                  'Bottom Sheet',
                  'Drawer',
                  'Menu',
                  'AppBar',
                  'Pagination',
                ].map((item) => (
                  <span key={item} className="component-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="component-group">
              <h4>Feedback</h4>
              <div className="component-tags">
                {[
                  'Alert',
                  'Dialog',
                  'Snackbar',
                  'Toast',
                  'Progress',
                  'Skeleton',
                ].map((item) => (
                  <span key={item} className="component-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="component-group">
              <h4>Data Display</h4>
              <div className="component-tags">
                {[
                  'Table',
                  'List',
                  'Card',
                  'Badge',
                  'Avatar',
                  'Timeline',
                  'Chip',
                ].map((item) => (
                  <span key={item} className="component-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="section architecture-section-modern">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Architecture</span>
            <h2 className="section-title">Two ways to build</h2>
            <p className="section-subtitle">
              Choose the approach that fits your needs
            </p>
          </div>

          <div className="architecture-cards">
            <div className="arch-card-modern">
              <div className="arch-card-header">
                <div
                  className="arch-icon"
                  style={{ background: 'rgba(99, 102, 241, 0.1)' }}
                >
                  <Icons.Layers />
                </div>
                <h3>Styled Components</h3>
              </div>
              <p>
                Pre-built, beautifully styled components ready to use out of the
                box.
              </p>
              <div className="arch-code-block">
                <code>{`import { Button } from "@truongdq01/ui";
<Button variant="primary" />`}</code>
              </div>
              <ul className="arch-list">
                <li>
                  <Icons.Check /> Quick setup
                </li>
                <li>
                  <Icons.Check /> Consistent design
                </li>
                <li>
                  <Icons.Check /> Theme support
                </li>
              </ul>
            </div>

            <div className="arch-card-modern">
              <div className="arch-card-header">
                <div
                  className="arch-icon"
                  style={{ background: 'rgba(16, 185, 129, 0.1)' }}
                >
                  <Icons.Zap />
                </div>
                <h3>Headless Hooks</h3>
              </div>
              <p>Logic and state management with complete styling freedom.</p>
              <div className="arch-code-block">
                <code>{`import { usePressable } from "@truongdq01/headless";
const { gesture, style } = usePressable();`}</code>
              </div>
              <ul className="arch-list">
                <li>
                  <Icons.Check /> Full control
                </li>
                <li>
                  <Icons.Check /> Custom designs
                </li>
                <li>
                  <Icons.Check /> Accessibility built-in
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section-modern">
        <div className="container">
          <div className="cta-box">
            <h2 className="cta-title">Ready to get started?</h2>
            <p className="cta-text">
              Join developers building amazing React Native apps with RNUI
            </p>
            <div className="cta-actions">
              <Link
                className="btn btn-primary btn-large"
                to="/docs/getting-started"
              >
                Get Started
                <Icons.ArrowRight />
              </Link>
              <Link
                className="btn btn-outline btn-large"
                to="https://github.com/rnui/rnui"
              >
                <Icons.Github />
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer-modern">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>RNUI</h3>
              <p>Premium React Native UI components for modern applications.</p>
            </div>
            <div className="footer-links-grid">
              <div className="footer-col">
                <h4>Docs</h4>
                <Link to="/docs/">Getting Started</Link>
                <Link to="/docs/getting-started">Installation</Link>
                <Link to="/docs/theming">Theming</Link>
              </div>
              <div className="footer-col">
                <h4>Components</h4>
                <Link to="/docs/headless">Headless</Link>
                <Link to="/docs/components/button">UI Kit</Link>
              </div>
              <div className="footer-col">
                <h4>Community</h4>
                <a href="https://github.com/rnui/rnui">GitHub</a>
                <a href="https://github.com/rnui/rnui/issues">Issues</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom-modern">
            <p>
              © {new Date().getFullYear()} RNUI. Open source under MIT license.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
