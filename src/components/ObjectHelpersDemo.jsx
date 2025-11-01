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
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Deep clone - Create independent copies of nested objects</li>
          <li>✅ Deep merge - Merge nested objects recursively</li>
          <li>✅ Deep pick - Select nested object properties</li>
          <li>✅ Get nested values - Safe access to nested properties</li>
          <li>✅ Flatten nested objects (also available)</li>
          <li>✅ Handle complex object structures</li>
        </ul>
      </div>
    </div>
  )
}

export default ObjectHelpersDemo

