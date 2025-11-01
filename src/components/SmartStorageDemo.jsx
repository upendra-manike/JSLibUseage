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
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ <strong>Store with TTL in localStorage</strong> - Automatic expiration with Time To Live</li>
          <li>✅ Unified API for localStorage, sessionStorage, IndexedDB</li>
          <li>✅ TTL (Time To Live) support - Data expires automatically after specified time</li>
          <li>✅ JSON safe handling - Automatic serialization/deserialization</li>
          <li>✅ Works in Browser, Node.js, and React Native</li>
          <li>✅ Prefix support for namespacing</li>
          <li>✅ Automatic expiration handling</li>
        </ul>
      </div>
    </div>
  )
}

export default SmartStorageDemo

