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
        <h3>💡 Real-World Use Cases</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>📱 Mobile App: Cache API Data</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Cache user profile for 5 minutes
const profile = await api.get('/user/profile', {
  cache: { ttl: 300000 }
})

// Subsequent requests use cache
// Reduces API calls & improves performance`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🛒 E-commerce: Product List</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Cache products for 10 minutes
const products = await api.get('/products', {
  cache: { ttl: 600000, storage: 'sessionStorage' }
})

// Fast page loads, reduced server load`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📊 Dashboard: Auto Refresh</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Show cached data immediately
const data = await api.get('/dashboard', {
  cache: { ttl: 60000 }
})

if (data.cached) {
  // Show instant, then refresh in background
}`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Common Patterns</h3>
        <div className="code-block">
          <div className="code-label">Pattern: Create API Client with Base URL</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`import { createApi } from '@upendra.manike/lite-fetcher'

const api = createApi({
  baseURL: 'https://api.example.com/v1',
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  },
  timeout: 5000
})

// All requests use base URL
const users = await api.get('/users')
// → https://api.example.com/v1/users`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: React Hook with Caching</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/users', { cache: { ttl: 60000 } })
      .then(response => {
        setUsers(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  return { users, loading }
}`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ GET/POST/PUT/DELETE requests with fetch API</li>
          <li>✅ Built-in caching with localStorage/sessionStorage</li>
          <li>✅ TTL (Time To Live) support - Auto expiration</li>
          <li>✅ Cache status indicator - Know when data is cached</li>
          <li>✅ Error handling - Graceful failure</li>
          <li>✅ Base URL configuration - Centralized API setup</li>
          <li>✅ Custom headers - Authentication, content-type</li>
        </ul>
      </div>
    </div>
  )
}

export default LiteFetcherDemo

