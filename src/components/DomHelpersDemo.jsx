import React, { useState, useRef } from 'react'
import { copyToClipboard, isInViewport, smoothScrollTo } from '@upendra.manike/dom-helpers'
import './Demo.css'

function DomHelpersDemo() {
  const [clipboardText, setClipboardText] = useState('Copy this text!')
  const [copyStatus, setCopyStatus] = useState('')
  const [viewportStatus, setViewportStatus] = useState('')
  const testElementRef = useRef(null)

  const handleCopy = async () => {
    const success = await copyToClipboard(clipboardText)
    setCopyStatus(success ? '✅ Copied to clipboard!' : '❌ Failed to copy')
    setTimeout(() => setCopyStatus(''), 3000)
  }

  const checkViewport = () => {
    if (testElementRef.current) {
      const inViewport = isInViewport(testElementRef.current)
      setViewportStatus(inViewport ? '✅ Element is in viewport' : '❌ Element is NOT in viewport')
    }
  }

  const scrollToElement = () => {
    smoothScrollTo('#scroll-target')
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>DOM & Browser Utilities</h3>
        <p>Clipboard, viewport detection, smooth scroll, and more</p>
      </div>

      <div className="demo-section">
        <h4>Copy to Clipboard</h4>
        <div className="interactive-demo">
          <input
            type="text"
            value={clipboardText}
            onChange={(e) => setClipboardText(e.target.value)}
            placeholder="Enter text to copy"
            className="demo-input"
          />
          <button 
            onClick={handleCopy} 
            className="demo-button"
          >
            Copy to Clipboard
          </button>
          {copyStatus && (
            <div className={`result-box ${copyStatus.includes('✅') ? 'success-box' : 'error-box'}`}>
              {copyStatus}
            </div>
          )}
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            Paste somewhere to verify it worked!
          </p>
        </div>
      </div>

      <div className="demo-section">
        <h4>Viewport Detection</h4>
        <div className="interactive-demo">
          <div 
            ref={testElementRef}
            style={{
              background: '#f0f0f0',
              padding: '40px',
              borderRadius: '8px',
              marginBottom: '10px',
              minHeight: '200px',
              border: '2px dashed #667eea'
            }}
          >
            <p>This is a test element. Scroll to see if it's in viewport.</p>
            <button onClick={checkViewport} className="demo-button">
              Check if Element is in Viewport
            </button>
            {viewportStatus && (
              <div className={`result-box ${viewportStatus.includes('✅') ? 'success-box' : 'error-box'}`} style={{ marginTop: '10px' }}>
                {viewportStatus}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Smooth Scroll</h4>
        <div className="interactive-demo">
          <p style={{ marginBottom: '15px' }}>
            Click the button below to smoothly scroll to the target element
          </p>
          <button onClick={scrollToElement} className="demo-button">
            Scroll to Target Element
          </button>
        </div>
        <div style={{ height: '400px' }}></div>
        <div 
          id="scroll-target"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '60px',
            borderRadius: '12px',
            textAlign: 'center',
            marginTop: '20px'
          }}
        >
          <h3 style={{ color: 'white', margin: 0 }}>🎯 Target Element</h3>
          <p style={{ marginTop: '10px' }}>You scrolled here smoothly!</p>
        </div>
        <div style={{ height: '400px' }}></div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Examples</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>📋 Copy to Clipboard</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Copy invite link, code, etc.
async function handleCopy(inviteCode) {
  const success = await copyToClipboard(inviteCode)
  if (success) {
    showToast('Copied to clipboard!')
  }
}

// Usage
<button onClick={() => handleCopy('ABC123')}>
  Copy Invite Code
</button>`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>👁️ Lazy Load Images</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Load image when in viewport
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (isInViewport(imageRef.current)) {
      setImageSrc(imageSrc)
      observer.disconnect()
    }
  })
  observer.observe(imageRef.current)
}, [])`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📜 Smooth Navigation</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Smooth scroll to section
function scrollToSection(id) {
  smoothScrollTo(\`#\${id}\`)
}

// In navigation
<a onClick={() => scrollToSection('about')}>
  About
</a>`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📊 Scroll Tracking</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Track if element is visible
const checkVisibility = throttle(() => {
  if (isInViewport(adElement)) {
    trackImpression()
  }
}, 1000)

window.addEventListener('scroll', checkVisibility)`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Common Patterns</h3>
        <div className="code-block">
          <div className="code-label">Pattern: Copy Share Link</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Share functionality
async function shareLink(url) {
  if (navigator.share) {
    await navigator.share({ url })
  } else {
    // Fallback: copy to clipboard
    await copyToClipboard(url)
    alert('Link copied to clipboard!')
  }
}

// Usage
<button onClick={() => shareLink(currentUrl)}>
  Share
</button>`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Table of Contents Navigation</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Smooth scroll to headings
function TableOfContents({ headings }) {
  return (
    <nav>
      {headings.map(heading => (
        <a
          key={heading.id}
          onClick={() => smoothScrollTo(\`#\${heading.id}\`)}
        >
          {heading.title}
        </a>
      ))}
    </nav>
  )
}`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Copy text to clipboard with fallback support - Cross-browser compatible</li>
          <li>✅ Detect if element is in viewport - Lazy loading, analytics</li>
          <li>✅ Smooth scroll to elements - Better UX for navigation</li>
          <li>✅ Debounce/throttle - Optimize scroll/resize handlers</li>
          <li>✅ Browser-compatible utilities - Works everywhere</li>
        </ul>
      </div>
    </div>
  )
}

export default DomHelpersDemo

