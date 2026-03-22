import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Inline SVG Icons
const Icons = {
  Github: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  Palette: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      <circle cx="13.5" cy="6.5" r="2.5"/>
      <circle cx="17.5" cy="10.5" r="2.5"/>
      <circle cx="8.5" cy="7.5" r="2.5"/>
      <circle cx="6.5" cy="12.5" r="2.5"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Bolt: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Layers: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  Mobile: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
};

const FEATURES = [
  {
    icon: <Icons.Palette />,
    title: 'Design Tokens',
    desc: 'A systematic approach to styling. Primitive → semantic → component tokens. Override everything.',
  },
  {
    icon: <Icons.Code />,
    title: '62+ Components',
    desc: 'Crafted for production apps. From basic buttons to complex data displays.',
  },
  {
    icon: <Icons.Bolt />,
    title: 'Headless Logic',
    desc: 'Take the logic, bring your own styles. Full control over accessibility and interaction state.',
  },
  {
    icon: <Icons.Layers />,
    title: 'Dual-Layer',
    desc: 'Styled components for speed, headless hooks for total freedom. Choose your path.',
  },
  {
    icon: <Icons.Mobile />,
    title: 'Native Performance',
    desc: 'Built with Reanimated 3 and FlashList. 60fps animations on the UI thread.',
  },
  {
    icon: <Icons.Check />,
    title: 'Multi-Brand',
    desc: 'Switch themes with a single prop. Perfect for white-label applications.',
  },
];

const COMPONENTS_SHOWCASE = [
  { category: 'Forms', items: ['Button', 'Input', 'Select', 'DatePicker', 'Checkbox', 'Switch'] },
  { category: 'Navigation', items: ['Tabs', 'Bottom Sheet', 'Drawer', 'Menu', 'AppBar'] },
  { category: 'Feedback', items: ['Alert', 'Dialog', 'Snackbar', 'Toast', 'Progress'] },
  { category: 'Data Display', items: ['Table', 'List', 'Card', 'Badge', 'Avatar', 'Timeline'] },
];

const CODE_EXAMPLE = `import { ThemeProvider } from "@rnui/ui";
import { Button, Input, Card } from "@rnui/ui";

function MyForm() {
  return (
    <Card>
      <Input label="Email" placeholder="name@example.com" />
      <Button 
        label="Submit" 
        variant="solid" 
        onPress={handleSubmit} 
      />
    </Card>
  );
}`;

const STATS = [
  { value: '62+', label: 'Components' },
  { value: '120+', label: 'Icons' },
  { value: '5', label: 'Brand Themes' },
  { value: '60fps', label: 'Performance' },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <Layout
      title={`${siteConfig.title} - Premium React Native UI Components`}
      description="Sophisticated UI framework for React Native with 62+ components, headless hooks, and multi-brand theming.">

      {/* Hero Section */}
      <header className="heroSection">
        <div className="hero-bg-decoration">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        
        <div className="container">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            v0.1.0 Now Available — Production Ready
          </div>
          
          <h1 className="heroTitle">
            The sophisticated UI<br />
            <span className="hero-title-accent">framework</span> for React Native
          </h1>
          
          <p className="heroSubtitle">
            A dual-layer design system crafted for clarity and performance.
            <br />
            Styled components for speed, headless hooks for total freedom.
          </p>
          
          <div className="heroButtons">
            <Link className="btn btnPrimary" to="/docs/getting-started">
              Get Started
              <Icons.ArrowRight />
            </Link>
            <Link className="btn btnSecondary" to="https://github.com/rnui/rnui">
              <Icons.Github />
              View on GitHub
            </Link>
          </div>
          
          {/* Stats */}
          <div className="heroStats">
            {STATS.map((stat, idx) => (
              <div key={idx} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Components Showcase */}
      <section className="section components-showcase">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Components</span>
            <h2 className="section-title">Everything you need</h2>
            <p className="section-subtitle">
              62+ beautifully crafted components ready for production
            </p>
          </div>
          
          <div className="components-grid">
            {COMPONENTS_SHOWCASE.map((group, idx) => (
              <div key={idx} className="component-card">
                <div className="component-card-header">
                  <div className="component-icon">
                    <Icons.Layers />
                  </div>
                  <h3 className="component-category">{group.category}</h3>
                </div>
                <div className="component-list">
                  {group.items.map((item, i) => (
                    <div key={i} className="component-item">
                      <Icons.Check />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="section code-section">
        <div className="container">
          <div className="code-layout">
            <div className="code-content">
              <span className="section-tag">Developer Experience</span>
              <h2 className="section-title">Simple by default,<br />powerful when needed</h2>
              <p className="section-subtitle">
                Get started in minutes with intuitive defaults. 
                Customize every detail when you need to.
              </p>
              
              <div className="code-features">
                <div className="code-feature">
                  <Icons.Check />
                  <span>TypeScript support out of the box</span>
                </div>
                <div className="code-feature">
                  <Icons.Check />
                  <span>Accessible by default (WCAG 2.1 AA)</span>
                </div>
                <div className="code-feature">
                  <Icons.Check />
                  <span>Dark mode ready</span>
                </div>
                <div className="code-feature">
                  <Icons.Check />
                  <span>Hot reload friendly</span>
                </div>
              </div>
            </div>
            
            <div className="code-preview">
              <div className="code-header">
                <div className="code-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="code-filename">MyForm.tsx</span>
              </div>
              <pre className="code-block">
                <code>{CODE_EXAMPLE}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Features</span>
            <h2 className="section-title">Built for modern apps</h2>
            <p className="section-subtitle">
              Every feature designed to accelerate your development
            </p>
          </div>
          
          <div className="features-grid">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="section architecture-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Architecture</span>
            <h2 className="section-title">Dual-layer design</h2>
            <p className="section-subtitle">
              Choose your level of abstraction
            </p>
          </div>
          
          <div className="architecture-grid">
            <div className="arch-card styled">
              <div className="arch-badge">Option A</div>
              <h3>Styled Components</h3>
              <p>Use pre-built components out of the box. Perfect for rapid development.</p>
              <div className="arch-code">
                <code>{`import { Button } from "@rnui/ui";
<Button label="Save" />`}</code>
              </div>
            </div>
            
            <div className="arch-card headless">
              <div className="arch-badge">Option B</div>
              <h3>Headless Hooks</h3>
              <p>Bring your own styles. Complete control over appearance and behavior.</p>
              <div className="arch-code">
                <code>{`import { usePressable } from "@rnui/headless";
const { gesture, animatedStyle } = usePressable({ onPress });`}</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to build something amazing?</h2>
            <p className="cta-subtitle">
              Join developers building beautiful, performant React Native apps with RNUI.
            </p>
            <div className="cta-buttons">
              <Link className="btn btnPrimary btn-large" to="/docs/getting-started">
                Start Building
                <Icons.ArrowRight />
              </Link>
              <Link className="btn btnSecondary btn-large" to="https://github.com/rnui/rnui">
                <Icons.Github />
                Star on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>RNUI</h3>
              <p>Premium React Native UI components for high-end applications.</p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4>Learn</h4>
                <Link to="/docs/">Introduction</Link>
                <Link to="/docs/getting-started">Installation</Link>
                <Link to="/docs/theming">Theming</Link>
              </div>
              <div className="footer-col">
                <h4>Advanced</h4>
                <Link to="/docs/headless">Headless Hooks</Link>
                <Link to="/docs/theming">Design Tokens</Link>
              </div>
              <div className="footer-col">
                <h4>Community</h4>
                <a href="https://github.com/rnui/rnui">GitHub</a>
                <a href="https://github.com/rnui/rnui/issues">Issues</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright © {new Date().getFullYear()} RNUI Project. Built with passion.</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
