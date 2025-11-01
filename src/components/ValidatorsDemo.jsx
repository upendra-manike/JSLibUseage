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
        <h3>📋 Additional Validators</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">isArray([1,2,3]):</span>
            <span className="value">{isArray([1,2,3]) ? 'true ✅' : 'false ❌'}</span>
          </div>
          <div className="info-item">
            <span className="label">isArray('not array'):</span>
            <span className="value">{isArray('not array') ? 'true ✅' : 'false ❌'}</span>
          </div>
          <div className="info-item">
            <span className="label">isDate(new Date()):</span>
            <span className="value">{isDate(new Date()) ? 'true ✅' : 'false ❌'}</span>
          </div>
          <div className="info-item">
            <span className="label">isPlainObject({}):</span>
            <span className="value">{isPlainObject({}) ? 'true ✅' : 'false ❌'}</span>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Use Cases</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>📝 Form Validation</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Before form submit
if (!isEmail(formData.email)) {
  error = 'Invalid email'
}
if (isEmpty(formData.name)) {
  error = 'Name required'
}`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🔗 URL Input Validation</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Validate user-provided URLs
if (isUrl(userInput)) {
  window.open(userInput)
} else {
  showError('Invalid URL')
}`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📱 Phone Number Check</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Verify phone format
if (isPhone(phoneNumber)) {
  sendSMS(phoneNumber)
} else {
  showError('Invalid phone number')
}`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🧹 Data Sanitization</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Clean data before saving
const clean = Object.entries(data)
  .filter(([key, value]) => !isEmpty(value))
  .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Validation Patterns</h3>
        <div className="code-block">
          <div className="code-label">Complete Form Validation Example:</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`function validateForm(data) {
  const errors = {}
  
  if (isEmpty(data.name)) {
    errors.name = 'Name is required'
  }
  
  if (!isEmail(data.email)) {
    errors.email = 'Invalid email format'
  }
  
  if (!isUrl(data.website)) {
    errors.website = 'Invalid website URL'
  }
  
  if (data.phone && !isPhone(data.phone)) {
    errors.phone = 'Invalid phone number'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Email validation - Perfect for forms</li>
          <li>✅ URL validation - Validate user-provided links</li>
          <li>✅ Phone number validation - Format checking</li>
          <li>✅ Empty value checks - Data sanitization</li>
          <li>✅ Type checks - Runtime type detection</li>
          <li>✅ Runtime detection - Browser/Node/WebWorker checks</li>
          <li>✅ Real-time validation feedback</li>
        </ul>
      </div>
    </div>
  )
}

export default ValidatorsDemo

