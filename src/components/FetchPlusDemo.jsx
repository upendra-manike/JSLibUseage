import React, { useState } from 'react'
import { api } from '@upendra.manike/fetch-plus'
import './Demo.css'

function FetchPlusDemo() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWithRetry = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await api.get('https://jsonplaceholder.typicode.com/posts/1', {
        retry: { attempts: 3, delay: 1000 },
        cache: 60000, // 1 minute cache
      })
      setData(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchWithTimeout = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await api.get('https://jsonplaceholder.typicode.com/posts/1', {
        timeout: 5000,
      })
      setData(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Enhanced Fetch with Advanced Features</h3>
        <p>Demonstrates retry logic, timeout, and caching</p>
      </div>

      <div className="demo-section">
        <div className="button-group">
          <button 
            onClick={fetchWithRetry} 
            className="demo-button"
            disabled={loading}
          >
            Fetch with Retry (3 attempts)
          </button>
          <button 
            onClick={fetchWithTimeout} 
            className="demo-button"
            disabled={loading}
          >
            Fetch with Timeout (5s)
          </button>
        </div>
      </div>

      <div className="demo-section">
        {loading && (
          <div className="loading-container">
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="error-box">
            <strong>Error:</strong> {error}
          </div>
        )}

        {data && !loading && (
          <div className="data-display">
            <div className="code-block">
              <div className="code-label">Response Data:</div>
              <div className="code-result">
                {JSON.stringify(data, null, 2)}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ <strong>Promise retry + timeout utility</strong> - Automatic retry on failure with configurable attempts and delay</li>
          <li>✅ Request timeout handling - Prevents hanging requests</li>
          <li>✅ Built-in caching support - Cache responses for better performance</li>
          <li>✅ AbortController support (cancellation) - Cancel in-flight requests</li>
          <li>✅ Request/response interceptors - Modify requests/responses globally</li>
        </ul>
      </div>
    </div>
  )
}

export default FetchPlusDemo

