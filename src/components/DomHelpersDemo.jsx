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
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Copy text to clipboard with fallback support</li>
          <li>✅ Detect if element is in viewport</li>
          <li>✅ Smooth scroll to elements</li>
          <li>✅ Debounce/throttle (also available in this package)</li>
          <li>✅ Browser-compatible utilities</li>
        </ul>
      </div>
    </div>
  )
}

export default DomHelpersDemo

