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
        <h3>Time Examples</h3>
        <div className="examples">
          {[
            new Date(Date.now() - 5000), // 5 seconds ago
            new Date(Date.now() - 60000), // 1 minute ago
            new Date(Date.now() - 3600000), // 1 hour ago
            new Date(Date.now() - 86400000), // yesterday
            new Date(Date.now() + 3600000), // 1 hour from now
          ].map((date, idx) => (
            <div key={idx} className="example-item">
              <span>{new SmartDate(date).format('YYYY-MM-DD HH:mm:ss')}</span>
              <span className="arrow">→</span>
              <span className="relative">{new SmartDate(date).fromNow()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SmartDateDemo

