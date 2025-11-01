import React, { useState } from 'react'
import { cacheableFetch } from '@upendra.manike/cacheable-fetch'
import './Demo.css'

function CacheableFetchDemo() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cacheStatus, setCacheStatus] = useState('')

  const fetchData = async () => {
    setLoading(true)
    setCacheStatus('')
    
    try {
      const startTime = Date.now()
      const json = await cacheableFetch('https://jsonplaceholder.typicode.com/posts/1', {
        ttl: 30000, // 30 seconds
        cache: 'localStorage',
      })
      const duration = Date.now() - startTime
      
      setData(json)
      
      // Check if cached (very fast response usually means cached)
      if (duration < 10) {
        setCacheStatus(`✅ Served from cache (${duration}ms)`)
      } else {
        setCacheStatus(`🌐 Fetched from network (${duration}ms)`)
      }
    } catch (err) {
      setCacheStatus(`❌ Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Offline-First API with Caching</h3>
        <p>Automatic localStorage/IndexedDB caching with TTL and background refresh</p>
      </div>

      <div className="demo-section">
        <button 
          onClick={fetchData} 
          className="demo-button"
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch Data'}
        </button>
        <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          Try clicking multiple times quickly - second request should be instant from cache!
        </p>
      </div>

      <div className="demo-section">
        {cacheStatus && (
          <div className={cacheStatus.includes('✅') ? 'success-box' : cacheStatus.includes('❌') ? 'error-box' : 'result-box'}>
            <strong>Status:</strong> {cacheStatus}
          </div>
        )}

        {data && (
          <div className="data-display">
            <div className="code-block">
              <div className="code-label">Cached Data:</div>
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
          <li>✅ Offline-first caching strategy</li>
          <li>✅ Automatic localStorage caching</li>
          <li>✅ TTL (Time To Live) expiration</li>
          <li>✅ Background refresh support</li>
          <li>✅ Works with PWA offline scenarios</li>
        </ul>
      </div>
    </div>
  )
}

export default CacheableFetchDemo

