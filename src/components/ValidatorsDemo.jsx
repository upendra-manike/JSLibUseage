import React, { useState } from 'react'
import { isEmail, isUrl, isEmpty, isBrowser, isPhone, isArray, isDate, isPlainObject } from '@upendra.manike/validators'
import './Demo.css'

function ValidatorsDemo() {
  const [email, setEmail] = useState('test@example.com')
  const [url, setUrl] = useState('https://example.com')
  const [phone, setPhone] = useState('+1234567890')
  const [emptyValue, setEmptyValue] = useState('')

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Validation Utilities</h3>
        <p>Email, URL, phone, empty checks, type checks, and runtime detection</p>
      </div>

      <div className="demo-section">
        <h4>Email Validation</h4>
        <div className="interactive-demo">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="demo-input"
          />
          <div className={`result-box ${isEmail(email) ? 'success-box' : 'error-box'}`}>
            {isEmail(email) ? '✅ Valid email' : '❌ Invalid email'}
          </div>
          <div className="code-result" style={{ marginTop: '10px', fontSize: '12px' }}>
            Examples: test@example.com ✅ | invalid.email ❌ | test@ ✅
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>URL Validation</h4>
        <div className="interactive-demo">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="demo-input"
          />
          <div className={`result-box ${isUrl(url) ? 'success-box' : 'error-box'}`}>
            {isUrl(url) ? '✅ Valid URL' : '❌ Invalid URL'}
          </div>
          <div className="code-result" style={{ marginTop: '10px', fontSize: '12px' }}>
            Examples: https://example.com ✅ | http://test.com ✅ | not-a-url ❌
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Phone Validation</h4>
        <div className="interactive-demo">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="demo-input"
          />
          <div className={`result-box ${isPhone(phone) ? 'success-box' : 'error-box'}`}>
            {isPhone(phone) ? '✅ Valid phone' : '❌ Invalid phone'}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Empty Value Check</h4>
        <div className="interactive-demo">
          <input
            type="text"
            value={emptyValue}
            onChange={(e) => setEmptyValue(e.target.value)}
            placeholder="Type something or leave empty"
            className="demo-input"
          />
          <div className={`result-box ${isEmpty(emptyValue) ? 'error-box' : 'success-box'}`}>
            {isEmpty(emptyValue) ? '⚠️ Empty (null, undefined, empty string, empty array, empty object)' : '✅ Has value'}
          </div>
          <div className="code-block" style={{ marginTop: '10px' }}>
            <div className="code-label">Test Values:</div>
            <div className="code-result">
              isEmpty(null): {isEmpty(null) ? 'true ✅' : 'false'}
              isEmpty(undefined): {isEmpty(undefined) ? 'true ✅' : 'false'}
              isEmpty(''): {isEmpty('') ? 'true ✅' : 'false'}
              isEmpty([]): {isEmpty([]) ? 'true ✅' : 'false'}
              isEmpty({}): {isEmpty({}) ? 'true ✅' : 'false'}
              isEmpty('text'): {isEmpty('text') ? 'true' : 'false ✅'}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Runtime Detection</h4>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">isBrowser():</span>
            <span className="value">{isBrowser() ? 'true ✅' : 'false'}</span>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Email validation</li>
          <li>✅ URL validation</li>
          <li>✅ Phone number validation</li>
          <li>✅ Empty value checks (null, undefined, empty string, array, object)</li>
          <li>✅ Type checks and runtime detection</li>
          <li>✅ Real-time validation feedback</li>
        </ul>
      </div>
    </div>
  )
}

export default ValidatorsDemo

