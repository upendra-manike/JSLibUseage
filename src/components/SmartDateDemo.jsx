import React, { useState, useEffect } from 'react'
import { SmartDate } from '@upendra.manike/smart-date'
import './Demo.css'

function SmartDateDemo() {
  const [now, setNow] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const smartDate = new SmartDate(selectedDate)

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Live Clock</h3>
        <div className="clock">
          <p className="time-display">{new SmartDate(now).format('YYYY-MM-DD HH:mm:ss')}</p>
          <p className="time-display" style={{ fontSize: '1rem', marginTop: '10px' }}>
            {new SmartDate(now).fromNow()}
          </p>
        </div>
      </div>

      <div className="demo-section">
        <h3>Date Selector</h3>
        <input
          type="datetime-local"
          value={selectedDate.toISOString().slice(0, 16)}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="date-input"
        />
      </div>

      <div className="demo-section">
        <h3>⏰ Time-Ago Formatter (Relative Time)</h3>
        <p style={{ marginBottom: '15px', color: '#666' }}>
          Convert timestamps to human-readable relative time like "3 minutes ago", "yesterday", etc.
        </p>
        <div className="result-box">
          <strong>fromNow:</strong> {smartDate.fromNow()}
        </div>
        <div className="result-box">
          <strong>fromNow (detailed):</strong> {smartDate.fromNow({ showSeconds: true })}
        </div>
        <div className="result-box">
          <strong>fromNow (with future):</strong> {smartDate.fromNow({ showFuture: true })}
        </div>
      </div>

      <div className="demo-section">
        <h3>Date Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Day Name:</span>
            <span className="value">{smartDate.dayName()}</span>
          </div>
          <div className="info-item">
            <span className="label">Month Name:</span>
            <span className="value">{smartDate.monthName()}</span>
          </div>
          <div className="info-item">
            <span className="label">Is Today:</span>
            <span className="value">{smartDate.isToday() ? 'Yes' : 'No'}</span>
          </div>
          <div className="info-item">
            <span className="label">Is Yesterday:</span>
            <span className="value">{smartDate.isYesterday() ? 'Yes' : 'No'}</span>
          </div>
          <div className="info-item">
            <span className="label">Is Tomorrow:</span>
            <span className="value">{smartDate.isTomorrow() ? 'Yes' : 'No'}</span>
          </div>
          <div className="info-item">
            <span className="label">Is Future:</span>
            <span className="value">{smartDate.isFuture() ? 'Yes' : 'No'}</span>
          </div>
          <div className="info-item">
            <span className="label">Is Past:</span>
            <span className="value">{smartDate.isPast() ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Formatted Dates</h3>
        <div className="result-box">
          <strong>Default format:</strong> {smartDate.format()}
        </div>
        <div className="result-box">
          <strong>Custom format:</strong> {smartDate.format('YYYY-MM-DD HH:mm:ss')}
        </div>
      </div>

      <div className="demo-section">
        <h3>📅 Real-World Date Examples</h3>
        <div className="examples">
          {[
            { date: new Date(Date.now() - 5000), label: '5 seconds ago' },
            { date: new Date(Date.now() - 30000), label: '30 seconds ago' },
            { date: new Date(Date.now() - 60000), label: '1 minute ago' },
            { date: new Date(Date.now() - 300000), label: '5 minutes ago' },
            { date: new Date(Date.now() - 3600000), label: '1 hour ago' },
            { date: new Date(Date.now() - 86400000), label: 'Yesterday' },
            { date: new Date(Date.now() - 172800000), label: '2 days ago' },
            { date: new Date(Date.now() - 604800000), label: 'Last week' },
            { date: new Date(Date.now() + 3600000), label: '1 hour from now' },
            { date: new Date(Date.now() + 86400000), label: 'Tomorrow' },
          ].map((item, idx) => (
            <div key={idx} className="example-item">
              <span style={{ fontWeight: '600', color: '#666' }}>{item.label}:</span>
              <span>{new SmartDate(item.date).format('YYYY-MM-DD HH:mm:ss')}</span>
              <span className="arrow">→</span>
              <span className="relative">{new SmartDate(item.date).fromNow()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Use Cases</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>📱 Social Media Posts</h4>
            <div className="result-box">
              "Posted {new SmartDate(Date.now() - 7200000).fromNow()}"
            </div>
          </div>
          <div className="use-case-item">
            <h4>📧 Email Timestamps</h4>
            <div className="result-box">
              "Received {new SmartDate(Date.now() - 3600000).fromNow()}"
            </div>
          </div>
          <div className="use-case-item">
            <h4>📝 Comment Dates</h4>
            <div className="result-box">
              "Commented {new SmartDate(Date.now() - 86400000).fromNow()}"
            </div>
          </div>
          <div className="use-case-item">
            <h4>🗓️ Event Countdown</h4>
            <div className="result-box">
              "Event starts {new SmartDate(Date.now() + 259200000).fromNow({ showFuture: true })}"
            </div>
          </div>
        </div>
      </div>
      <div className="demo-section">
        <h3>🎯 Common Patterns</h3>
        <div className="code-block">
          <div className="code-label">Display relative time in UI:</div>
          <div className="code-result">
            {`const date = new SmartDate(new Date('2024-01-01'))
date.fromNow() // "2 months ago"

// With options
date.fromNow({ showSeconds: true }) // "2 months ago"
date.fromNow({ showFuture: true }) // Shows "in 2 hours" for future dates`}
          </div>
        </div>
        <div className="code-block">
          <div className="code-label">Format dates for display:</div>
          <div className="code-result">
            {`date.format() // Default format
date.format('YYYY-MM-DD') // "2024-01-01"
date.format('MM/DD/YYYY') // "01/01/2024"
date.format('DD MMM YYYY') // "01 Jan 2024"`}
          </div>
        </div>
        <div className="code-block">
          <div className="code-label">Check date conditions:</div>
          <div className="code-result">
            {`const today = new SmartDate()
today.isToday() // true
today.isTomorrow() // false

// Check past/future
const pastDate = new SmartDate('2023-01-01')
pastDate.isPast() // true
pastDate.isFuture() // false`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmartDateDemo

