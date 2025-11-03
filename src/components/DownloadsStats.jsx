import React, { useEffect, useMemo, useState } from 'react'
import './Demo.css'

const PACKAGES = [
  '@upendra.manike/smart-date',
  '@upendra.manike/tiny-utils',
  '@upendra.manike/validators',
  '@upendra.manike/id-generator',
  '@upendra.manike/string-utils',
  '@upendra.manike/array-helpers',
  '@upendra.manike/object-helpers',
  '@upendra.manike/dom-helpers',
  '@upendra.manike/motion-kit',
  '@upendra.manike/react-skeletons',
  '@upendra.manike/react-motion-kit',
  '@upendra.manike/lite-fetcher',
  '@upendra.manike/fetch-plus',
  '@upendra.manike/cacheable-fetch',
  '@upendra.manike/smart-storage',
  '@upendra.manike/api-chain',
  '@upendra.manike/form-genie',
  '@upendra.manike/env-checker'
]

function DownloadsStats() {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const controller = useMemo(() => new AbortController(), [])

  const fetchStats = async () => {
    setLoading(true)
    setError(null)
    try {
      const results = await Promise.all(
        PACKAGES.map(async (pkg) => {
          const encoded = encodeURIComponent(pkg)
          const res = await fetch(`https://api.npmjs.org/downloads/point/last-month/${encoded}`, {
            signal: controller.signal,
          })
          if (!res.ok) throw new Error(`Failed to fetch ${pkg}`)
          const json = await res.json()
          return {
            name: pkg,
            downloads: json.downloads || 0,
            start: json.start,
            end: json.end,
          }
        })
      )

      results.sort((a, b) => b.downloads - a.downloads)
      setStats(results)
    } catch (e) {
      if (e.name !== 'AbortError') setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const total = stats.reduce((sum, s) => sum + s.downloads, 0)

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>NPM Downloads (last 30 days)</h3>
        <p>Live stats pulled from the npm downloads API for all @upendra.manike packages</p>
        <div className="button-group" style={{ marginTop: 10 }}>
          <button className="demo-button" onClick={fetchStats} disabled={loading}>
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-box" style={{ marginTop: 10 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="demo-section">
        <div className="data-display">
          <div className="code-block">
            <div className="code-label">Totals</div>
            <div className="code-result">Total downloads (last month): {total.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px', borderBottom: '1px solid #e5e7eb' }}>Package</th>
                <th style={{ textAlign: 'right', padding: '10px', borderBottom: '1px solid #e5e7eb' }}>Downloads (last month)</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((s) => (
                <tr key={s.name}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>
                    <a href={`https://www.npmjs.com/package/${s.name}`} target="_blank" rel="noreferrer">
                      {s.name}
                    </a>
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9', textAlign: 'right' }}>
                    {s.downloads.toLocaleString()}
                  </td>
                </tr>
              ))}
              {stats.length === 0 && !loading && (
                <tr>
                  <td colSpan={2} style={{ padding: '12px', color: '#64748b' }}>No data yet. Click Refresh.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DownloadsStats


