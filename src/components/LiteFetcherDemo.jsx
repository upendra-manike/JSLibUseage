import React, { useState, useMemo } from 'react'
import { createApi } from '@upendra.manike/lite-fetcher'
import './Demo.css'

function LiteFetcherDemo() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cached, setCached] = useState(false)

  const api = useMemo(() => createApi(), [])

  const fetchData = async (useCache = false) => {
    setLoading(true)
    setError(null)
    
    try {
      // Using JSONPlaceholder as a test API
      const response = await api.get('https://jsonplaceholder.typicode.com/posts/1', {
        cache: useCache ? { enabled: true, ttl: 30000 } : false,
      })
      setData(response.data)
      setCached(response.cached || false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const clearCache = () => {
    api.clearCache()
    alert('Cache cleared!')
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>API Fetching with Caching</h3>
        <p>Demonstrates GET requests with optional caching support</p>
      </div>

      <div className="demo-section">
        <div className="button-group">
          <button 
            onClick={() => fetchData(false)} 
            className="demo-button"
            disabled={loading}
          >
            Fetch Without Cache
          </button>
          <button 
            onClick={() => fetchData(true)} 
            className="demo-button"
            disabled={loading}
          >
            Fetch With Cache (30s TTL)
          </button>
          <button 
            onClick={clearCache} 
            className="demo-button"
            style={{ background: '#dc3545' }}
          >
            Clear Cache
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
            <div className={cached ? 'success-box' : 'result-box'}>
              {cached ? '✅ Served from cache!' : '🌐 Fetched from API'}
            </div>
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
          <li>✅ GET requests with fetch API</li>
          <li>✅ Built-in caching with localStorage</li>
          <li>✅ TTL (Time To Live) support</li>
          <li>✅ Cache status indicator</li>
          <li>✅ Error handling</li>
        </ul>
      </div>
    </div>
  )
}

export default LiteFetcherDemo

