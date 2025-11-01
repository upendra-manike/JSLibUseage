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
        <h3>💡 Real-World Examples</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>🗄️ Database Records</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Generate unique ID for new record
const newUser = {
  id: uuid(), // "550e8400-e29b-41d4-a716-446655440000"
  name: 'John',
  createdAt: new Date()
}`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🔗 Short URLs</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Create short link ID
const shortId = shortId(8) // "aB3xK9mP"
const shortUrl = \`https://example.com/\${shortId}\`
// Store mapping: shortId → fullUrl`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🔐 Hash for Cache Keys</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Hash query params for cache
const cacheKey = hash(\`users?page=1&limit=10\`)
// "abc123xyz" - consistent hash
localStorage.setItem(cacheKey, data)`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🔒 Mask Sensitive Data</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Display partial email/phone
const displayEmail = mask(email, 4)
// "jo***@example.com"

const displayPhone = mask(phone, 3)
// "+12***7890"`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Common Patterns</h3>
        <div className="code-block">
          <div className="code-label">Pattern: Generate IDs for Items</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Generate IDs for new items
const createItem = (name) => ({
  id: uuid(), // Unique identifier
  shortId: shortId(6), // Short ID for URLs
  name,
  createdAt: Date.now()
})

// Use in React
const newItem = createItem('Todo Item')
setItems([...items, newItem])`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Privacy-Friendly Display</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Show masked data in UI
function UserCard({ email, phone }) {
  return (
    <div>
      <p>Email: {mask(email, 4)}</p>
      <p>Phone: {mask(phone, 3)}</p>
    </div>
  )
}

// Original: john.doe@example.com
// Displayed: john***@example.com`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Use Cases</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Generate unique identifiers for database records</li>
          <li>✅ Create short IDs for URLs (like bit.ly)</li>
          <li>✅ Hash strings for simple checksums and cache keys</li>
          <li>✅ Mask sensitive data (emails, phones, credit cards) for privacy</li>
          <li>✅ Cryptographically secure random generation</li>
          <li>✅ Generate session IDs, transaction IDs, order numbers</li>
        </ul>
      </div>
    </div>
  )
}

export default IdGeneratorDemo

