import React, { useState } from 'react'
import { deepClone, deepMerge, deepPick, getNested } from '@upendra.manike/object-helpers'
import './Demo.css'

function ObjectHelpersDemo() {
  const original = {
    name: 'John',
    age: 30,
    address: {
      street: '123 Main St',
      city: 'NYC',
      zip: '10001'
    },
    hobbies: ['reading', 'coding']
  }

  const source = {
    age: 31,
    address: {
      city: 'LA',
      state: 'CA'
    },
    occupation: 'Developer'
  }

  const cloned = deepClone(original)
  const merged = deepMerge(original, source)

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Object Manipulation Utilities</h3>
        <p>Deep clone, deep merge, pick/omit, flatten nested objects</p>
      </div>

      <div className="demo-section">
        <h4>Deep Clone</h4>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          Creates a completely independent copy (no reference sharing)
        </p>
        <div className="code-block">
          <div className="code-label">Original Object:</div>
          <div className="code-result">
            {JSON.stringify(original, null, 2)}
          </div>
        </div>
        <div className="code-block" style={{ marginTop: '10px' }}>
          <div className="code-label">Cloned Object (independent copy):</div>
          <div className="code-result">
            {JSON.stringify(cloned, null, 2)}
          </div>
        </div>
        <div className="result-box" style={{ marginTop: '10px' }}>
          ✅ Clone is independent - modifying clone won't affect original
        </div>
      </div>

      <div className="demo-section">
        <h4>Deep Merge</h4>
        <div className="code-block">
          <div className="code-label">Original Object:</div>
          <div className="code-result">
            {JSON.stringify(original, null, 2)}
          </div>
        </div>
        <div className="code-block" style={{ marginTop: '10px' }}>
          <div className="code-label">Source Object:</div>
          <div className="code-result">
            {JSON.stringify(source, null, 2)}
          </div>
        </div>
        <div className="code-block" style={{ marginTop: '10px' }}>
          <div className="code-label">Deep Merged Result:</div>
          <div className="code-result">
            {JSON.stringify(merged, null, 2)}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Deep Pick (Nested Keys)</h4>
        <div className="code-block">
          <div className="code-label">Pick 'name' and 'address.city':</div>
          <div className="code-result">
            {JSON.stringify(deepPick(original, ['name', 'address.city']), null, 2)}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Get Nested Value</h4>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">getNested(obj, 'address.city'):</span>
            <span className="value">{getNested(original, 'address.city', 'Not found')}</span>
          </div>
          <div className="info-item">
            <span className="label">getNested(obj, 'address.state'):</span>
            <span className="value">{getNested(original, 'address.state', 'Not found')}</span>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Examples</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>📝 Form State: Deep Merge Defaults</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Merge default settings with user preferences
const defaults = {
  theme: { color: 'blue', size: 'medium' },
  notifications: { email: true }
}

const userPrefs = {
  theme: { color: 'green' } // Only override color
}

const final = deepMerge(defaults, userPrefs)
// Theme size preserved, color updated`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>💾 State Management: Safe Updates</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Clone before modifying (Redux pattern)
const newState = deepClone(currentState)
newState.user.profile.name = 'Updated'
// Original state unchanged

// Or use set for nested updates
const updated = set(state, 'user.profile.name', 'Updated')`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🔍 API Response: Extract Specific Fields</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Pick only needed nested fields
const userData = {
  id: 1,
  name: 'John',
  address: { city: 'NYC', zip: '10001' },
  settings: { theme: 'dark' }
}

const displayData = deepPick(userData, [
  'name',
  'address.city',
  'settings.theme'
])
// { name: 'John', address: { city: 'NYC' }, settings: { theme: 'dark' } }`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🛡️ Safe Property Access</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Avoid errors with optional chaining alternative
const city = getNested(user, 'address.city', 'Unknown')
// No need for: user?.address?.city || 'Unknown'

// Update nested safely
const updated = setNested(user, 'address.zip', '90210')`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Common Patterns</h3>
        <div className="code-block">
          <div className="code-label">Pattern: Immutable Updates</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// React state update pattern
function updateUserProfile(userId, updates) {
  const cloned = deepClone(users)
  const user = cloned.find(u => u.id === userId)
  
  // Deep merge updates
  Object.assign(user.profile, updates)
  
  setUsers(cloned)
  // Original users array unchanged`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Extract API Response Fields</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Only extract what you need
const apiResponse = {
  user: { id: 1, name: 'John', email: '...', password: '...' },
  metadata: { timestamp: '...', version: '...' }
}

// Pick only display fields
const displayUser = deepPick(apiResponse, [
  'user.name',
  'user.email',
  'metadata.timestamp'
])

// No password leaked!`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Deep clone - Create independent copies of nested objects</li>
          <li>✅ Deep merge - Merge nested objects recursively (no overwrite)</li>
          <li>✅ Deep pick - Select nested object properties safely</li>
          <li>✅ Get nested values - Safe access to nested properties with defaults</li>
          <li>✅ Set nested values - Update nested properties immutably</li>
          <li>✅ Flatten nested objects - Convert nested to flat structure</li>
          <li>✅ Handle complex object structures - Work with any depth</li>
        </ul>
      </div>
    </div>
  )
}

export default ObjectHelpersDemo

