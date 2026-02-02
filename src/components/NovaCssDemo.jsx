import React from 'react'
import './Demo.css'

function NovaCssDemo() {
  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>🎨 Nova CSS - Hybrid CSS Framework</h3>
        <p>A hybrid CSS framework combining utility classes and prebuilt components with glassmorphism-inspired design</p>
      </div>

      <div className="demo-section">
        <h4>Installation</h4>
        <div className="code-block">
          <div className="code-label">Install via npm:</div>
          <div className="code-result">
            {`npm install @upendra.manike/nova-css`}
          </div>
        </div>
        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Import in your project:</div>
          <div className="code-result">
            {`// In your main CSS file or component
import '@upendra.manike/nova-css/dist/nova.css'

// Or in HTML
<link rel="stylesheet" href="node_modules/@upendra.manike/nova-css/dist/nova.css">`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Features</h4>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Utility Classes:</span>
            <span className="value">✅ Included</span>
          </div>
          <div className="info-item">
            <span className="label">Prebuilt Components:</span>
            <span className="value">✅ Included</span>
          </div>
          <div className="info-item">
            <span className="label">Glassmorphism:</span>
            <span className="value">✅ Included</span>
          </div>
          <div className="info-item">
            <span className="label">Responsive:</span>
            <span className="value">✅ Included</span>
          </div>
          <div className="info-item">
            <span className="label">Animations:</span>
            <span className="value">✅ Included</span>
          </div>
          <div className="info-item">
            <span className="label">Lightweight:</span>
            <span className="value">✅ Optimized</span>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Utility Classes Preview</h4>
        <div className="code-block">
          <div className="code-label">Spacing Utilities:</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`<!-- Margin and Padding -->
<div class="m-1">Margin 1</div>
<div class="p-2">Padding 2</div>
<div class="mt-4">Margin Top 4</div>
<div class="mb-3">Margin Bottom 3</div>

<!-- Responsive -->
<div class="p-2 md:p-4 lg:p-6">Responsive padding</div>`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Flexbox Utilities:</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`<!-- Flex containers -->
<div class="flex">Flex container</div>
<div class="flex-row">Row direction</div>
<div class="flex-col">Column direction</div>
<div class="justify-center">Center justify</div>
<div class="items-center">Center items</div>
<div class="gap-4">Gap between items</div>`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Glassmorphism Effects:</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`<!-- Glass effect -->
<div class="glass">Glassmorphism card</div>
<div class="glass-blur">Blurred glass</div>
<div class="glass-light">Light glass effect</div>

<!-- With backdrop -->
<div class="glass-backdrop">Glass with backdrop</div>`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Prebuilt Components</h4>
        <div className="code-block">
          <div className="code-label">Button Components:</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`<!-- Primary button -->
<button class="btn btn-primary">Primary Button</button>

<!-- Secondary button -->
<button class="btn btn-secondary">Secondary Button</button>

<!-- Glass button -->
<button class="btn btn-glass">Glass Button</button>

<!-- Sizes -->
<button class="btn btn-sm">Small</button>
<button class="btn btn-lg">Large</button>`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Card Components:</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`<!-- Basic card -->
<div class="card">Card content</div>

<!-- Glass card -->
<div class="card glass">Glass card</div>

<!-- Card with header -->
<div class="card">
  <div class="card-header">Header</div>
  <div class="card-body">Body</div>
  <div class="card-footer">Footer</div>
</div>`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Animations</h4>
        <div className="code-block">
          <div className="code-label">Animation Classes:</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`<!-- Fade animations -->
<div class="fade-in">Fade in</div>
<div class="fade-out">Fade out</div>

<!-- Slide animations -->
<div class="slide-in-left">Slide from left</div>
<div class="slide-in-right">Slide from right</div>

<!-- Scale animations -->
<div class="scale-in">Scale in</div>
<div class="bounce">Bounce effect</div>

<!-- Hover effects -->
<div class="hover-lift">Lift on hover</div>
<div class="hover-glow">Glow on hover</div>`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Use Cases</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>🎨 Modern Dashboard</h4>
            <div className="code-result" style={{ fontSize: '12px', marginTop: '10px' }}>
              {`<!-- Dashboard with glass cards -->
<div class="dashboard">
  <div class="card glass">
    <h3>Stats</h3>
    <div class="stat-value">1,234</div>
  </div>
  <div class="card glass">
    <h3>Charts</h3>
    <!-- Chart content -->
  </div>
</div>`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📱 Mobile-First Design</h4>
            <div className="code-result" style={{ fontSize: '12px', marginTop: '10px' }}>
              {`<!-- Responsive layout -->
<div class="container">
  <div class="flex flex-col md:flex-row gap-4">
    <div class="w-full md:w-1/2">Column 1</div>
    <div class="w-full md:w-1/2">Column 2</div>
  </div>
</div>`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>✨ Interactive UI</h4>
            <div className="code-result" style={{ fontSize: '12px', marginTop: '10px' }}>
              {`<!-- Interactive buttons -->
<button class="btn btn-primary hover-lift">
  Click Me
</button>

<!-- Animated cards -->
<div class="card fade-in hover-glow">
  Hover for glow effect
</div>`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Common Patterns</h3>
        <div className="code-block">
          <div className="code-label">Pattern: Responsive Grid Layout</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`<!-- Grid system -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
</div>

<!-- Auto-responsive -->
<div class="flex flex-wrap gap-4">
  <div class="flex-1 min-w-64">Flex item</div>
  <div class="flex-1 min-w-64">Flex item</div>
</div>`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Glassmorphism Card</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`<!-- Modern glass card -->
<div class="card glass glass-blur p-6 rounded-lg">
  <h2 class="text-2xl mb-4">Glass Card</h2>
  <p>Beautiful glassmorphism effect</p>
  <button class="btn btn-primary mt-4">
    Action
  </button>
</div>`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Animated Navigation</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`<!-- Navigation with animations -->
<nav class="flex gap-4 p-4">
  <a href="#" class="btn btn-link hover-lift">
    Home
  </a>
  <a href="#" class="btn btn-link hover-lift">
    About
  </a>
  <a href="#" class="btn btn-link hover-lift">
    Contact
  </a>
</nav>`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>📚 Documentation</h3>
        <div className="result-box">
          <p>For complete documentation, visit:</p>
          <p style={{ marginTop: '10px' }}>
            <a href="https://github.com/upendra-manike/JSLib/tree/main/nova-css" target="_blank" rel="noreferrer" style={{ color: '#667eea' }}>
              Nova CSS GitHub Repository
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NovaCssDemo
