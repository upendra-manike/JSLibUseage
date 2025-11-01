import React, { useState, useEffect } from 'react'
import { createStorage } from '@upendra.manike/smart-storage'
import './Demo.css'

function SmartStorageDemo() {
  const [storageValue, setStorageValue] = useState('')
  const [retrievedValue, setRetrievedValue] = useState(null)
  const [ttl, setTtl] = useState(60000) // 1 minute default

  const store = createStorage({
    type: 'localStorage',
    prefix: 'demo:',
  })

  useEffect(() => {
    // Try to load existing value on mount
    loadValue()
  }, [])

  const saveValue = async () => {
    try {
      const data = {
        text: storageValue,
        timestamp: new Date().toISOString(),
      }
      await store.set('demo-data', data, ttl)
      alert('Saved to localStorage with TTL!')
      loadValue()
    } catch (err) {
      alert(`Error: ${err.message}`)
    }
  }

  const loadValue = async () => {
    try {
      const value = await store.get('demo-data')
      setRetrievedValue(value)
    } catch (err) {
      setRetrievedValue(null)
    }
  }

  const clearValue = async () => {
    try {
      await store.remove('demo-data')
      setRetrievedValue(null)
      alert('Value cleared!')
    } catch (err) {
      alert(`Error: ${err.message}`)
    }
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Unified Storage API</h3>
        <p>LocalStorage, SessionStorage, and IndexedDB with TTL support</p>
      </div>

      <div className="demo-section">
        <h4>Save Data</h4>
        <input
          type="text"
          value={storageValue}
          onChange={(e) => setStorageValue(e.target.value)}
          placeholder="Enter text to store"
          className="demo-input"
        />
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            TTL (Time To Live) in milliseconds:
          </label>
          <input
            type="number"
            value={ttl}
            onChange={(e) => setTtl(Number(e.target.value))}
            className="demo-input"
            style={{ width: '200px' }}
          />
        </div>
        <div className="button-group">
          <button onClick={saveValue} className="demo-button">
            Save to Storage
          </button>
          <button onClick={loadValue} className="demo-button">
            Load from Storage
          </button>
          <button onClick={clearValue} className="demo-button" style={{ background: '#dc3545' }}>
            Clear Storage
          </button>
        </div>
      </div>

      <div className="demo-section">
        <h4>Retrieved Value</h4>
        {retrievedValue ? (
          <div className="data-display">
            <div className="code-block">
              <div className="code-label">Stored Data:</div>
              <div className="code-result">
                {JSON.stringify(retrievedValue, null, 2)}
              </div>
            </div>
            {retrievedValue.timestamp && (
              <div className="result-box" style={{ marginTop: '10px' }}>
                <strong>Saved at:</strong> {new Date(retrievedValue.timestamp).toLocaleString()}
              </div>
            )}
          </div>
        ) : (
          <div className="result-box">
            No data stored yet. Enter text above and click "Save to Storage"
          </div>
        )}
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Examples</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>🛒 Shopping Cart</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Save cart with 24h expiration
await store.set('cart', cartItems, 86400000)

// Load cart
const savedCart = await store.get('cart')
// Auto-expires after 24 hours`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🔐 Session Data</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Store user session (1 hour)
await store.set('session', {
  userId: 123,
  token: '...'
}, 3600000)

// Auto-logout after 1 hour`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📊 Cache API Responses</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Cache expensive API call
const data = await api.get('/heavy-endpoint')
await store.set('api-cache', data, 600000)

// Use cached data
const cached = await store.get('api-cache')
if (cached) return cached`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>💾 User Preferences</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Save settings (no expiration)
await store.set('preferences', {
  theme: 'dark',
  language: 'en'
})

// Load preferences
const prefs = await store.get('preferences')`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Common Patterns</h3>
        <div className="code-block">
          <div className="code-label">Pattern: Cache with Auto-Refresh</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Smart caching pattern
async function getCachedData(key) {
  // Check cache first
  const cached = await store.get(key)
  if (cached) {
    return cached // Fast return
  }
  
  // Fetch fresh data
  const fresh = await fetchData()
  await store.set(key, fresh, 600000) // 10 min TTL
  return fresh
}

// Usage
const data = await getCachedData('user-profile')`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Multi-Storage Strategy</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Use different storage types
const localStorage = createStorage({ type: 'localStorage' })
const sessionStorage = createStorage({ type: 'sessionStorage' })

// Persistent data
await localStorage.set('user', userData)

// Session-only data
await sessionStorage.set('temp', tempData)
// Cleared on tab close`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ <strong>Store with TTL in localStorage</strong> - Automatic expiration with Time To Live</li>
          <li>✅ Unified API for localStorage, sessionStorage, IndexedDB</li>
          <li>✅ TTL (Time To Live) support - Data expires automatically after specified time</li>
          <li>✅ JSON safe handling - Automatic serialization/deserialization</li>
          <li>✅ Works in Browser, Node.js, and React Native</li>
          <li>✅ Prefix support for namespacing - Avoid key conflicts</li>
          <li>✅ Automatic expiration handling - No manual cleanup needed</li>
        </ul>
      </div>
    </div>
  )
}

export default SmartStorageDemo

