import React, { useState } from 'react'
import { uuid, shortId, hash, mask } from '@upendra.manike/id-generator'
import './Demo.css'

function IdGeneratorDemo() {
  const [generatedUuid, setGeneratedUuid] = useState('')
  const [generatedShortId, setGeneratedShortId] = useState('')
  const [hashInput, setHashInput] = useState('Hello World')
  const [maskInput, setMaskInput] = useState('john.doe@example.com')
  const [visibleChars, setVisibleChars] = useState(4)

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Secure ID Generation</h3>
        <p>UUID, GUID, short unique strings, hash, and mask utilities</p>
      </div>

      <div className="demo-section">
        <h4>UUID v4 Generation</h4>
        <div className="interactive-demo">
          <button 
            onClick={() => setGeneratedUuid(uuid())} 
            className="demo-button"
          >
            Generate UUID
          </button>
          {generatedUuid && (
            <div className="result-box">
              <strong>UUID:</strong> {generatedUuid}
            </div>
          )}
        </div>
      </div>

      <div className="demo-section">
        <h4>Short Unique ID</h4>
        <div className="interactive-demo">
          <button 
            onClick={() => setGeneratedShortId(shortId(12))} 
            className="demo-button"
          >
            Generate Short ID (12 chars)
          </button>
          {generatedShortId && (
            <div className="result-box">
              <strong>Short ID:</strong> {generatedShortId}
            </div>
          )}
          <div className="code-block" style={{ marginTop: '10px' }}>
            <div className="code-label">Examples:</div>
            <div className="code-result">
              8 chars: {shortId(8)}
              16 chars: {shortId(16)}
              32 chars: {shortId(32)}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Hash Function</h4>
        <div className="interactive-demo">
          <input
            type="text"
            value={hashInput}
            onChange={(e) => setHashInput(e.target.value)}
            placeholder="Enter text to hash"
            className="demo-input"
          />
          <div className="result-box">
            <strong>Hash:</strong> {hash(hashInput)}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Mask String (Privacy)</h4>
        <div className="interactive-demo">
          <input
            type="text"
            value={maskInput}
            onChange={(e) => setMaskInput(e.target.value)}
            placeholder="Enter text to mask"
            className="demo-input"
          />
          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Visible Characters: {visibleChars}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={visibleChars}
              onChange={(e) => setVisibleChars(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <div className="result-box">
            <strong>Masked:</strong> {mask(maskInput, visibleChars)}
          </div>
          <div className="code-block" style={{ marginTop: '10px' }}>
            <div className="code-label">Examples:</div>
            <div className="code-result">
              Email: {mask('john.doe@example.com', 4)}
              Phone: {mask('+1234567890', 3)}
              Credit Card: {mask('1234567890123456', 4)}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Use Cases</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Generate unique identifiers for database records</li>
          <li>✅ Create short IDs for URLs (like bit.ly)</li>
          <li>✅ Hash strings for simple checksums</li>
          <li>✅ Mask sensitive data (emails, phones, credit cards)</li>
          <li>✅ Cryptographically secure random generation</li>
        </ul>
      </div>
    </div>
  )
}

export default IdGeneratorDemo

