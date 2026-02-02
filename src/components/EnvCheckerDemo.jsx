import React, { useState } from 'react'
import { checkEnv, validateEnv } from '@upendra.manike/env-checker'
import './Demo.css'

function EnvCheckerDemo() {
  const [envVars, setEnvVars] = useState({
    API_URL: 'https://api.example.com',
    PORT: '3000',
    DEBUG: 'true',
    DATABASE_URL: 'postgresql://localhost:5432/mydb',
    EMAIL: 'admin@example.com'
  })
  const [validationResult, setValidationResult] = useState(null)
  const [error, setError] = useState('')

  const handleCheckEnv = () => {
    setError('')
    setValidationResult(null)

    // Simulate environment variables
    const originalEnv = { ...process.env }
    
    // Set mock env vars for demo
    Object.keys(envVars).forEach(key => {
      if (typeof window !== 'undefined') {
        // Browser environment - use localStorage to simulate
        window.localStorage.setItem(`env_${key}`, envVars[key])
      }
    })

    try {
      const schema = {
        API_URL: 'url',
        PORT: 'number',
        DEBUG: 'boolean',
        DATABASE_URL: 'string',
        EMAIL: {
          type: 'email',
          required: true
        }
      }

      // In browser, we'll simulate the check
      // In real Node.js, this would check process.env
      const mockEnv = {
        API_URL: envVars.API_URL,
        PORT: envVars.PORT,
        DEBUG: envVars.DEBUG,
        DATABASE_URL: envVars.DATABASE_URL,
        EMAIL: envVars.EMAIL
      }

      // Validate the mock environment
      const result = validateEnv(schema)
      
      // Check each value manually for demo
      const checks = []
      if (!mockEnv.API_URL || !mockEnv.API_URL.startsWith('http')) {
        checks.push({ key: 'API_URL', valid: false, message: 'Must be a valid URL' })
      } else {
        checks.push({ key: 'API_URL', valid: true, message: 'Valid URL' })
      }

      if (!mockEnv.PORT || isNaN(Number(mockEnv.PORT))) {
        checks.push({ key: 'PORT', valid: false, message: 'Must be a number' })
      } else {
        checks.push({ key: 'PORT', valid: true, message: 'Valid number' })
      }

      if (mockEnv.DEBUG !== 'true' && mockEnv.DEBUG !== 'false') {
        checks.push({ key: 'DEBUG', valid: false, message: 'Must be boolean (true/false)' })
      } else {
        checks.push({ key: 'DEBUG', valid: true, message: 'Valid boolean' })
      }

      if (!mockEnv.DATABASE_URL) {
        checks.push({ key: 'DATABASE_URL', valid: false, message: 'Required' })
      } else {
        checks.push({ key: 'DATABASE_URL', valid: true, message: 'Valid string' })
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!mockEnv.EMAIL || !emailRegex.test(mockEnv.EMAIL)) {
        checks.push({ key: 'EMAIL', valid: false, message: 'Must be a valid email' })
      } else {
        checks.push({ key: 'EMAIL', valid: true, message: 'Valid email' })
      }

      setValidationResult({
        allValid: checks.every(c => c.valid),
        checks
      })

    } catch (err) {
      setError(err.message || 'Validation failed')
    }
  }

  const updateEnvVar = (key, value) => {
    setEnvVars(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>🔍 Env Checker - Environment Variable Validator</h3>
        <p>Validate environment variables against schema at startup. Prevent app crashes from missing configuration.</p>
      </div>

      <div className="demo-section">
        <h4>Environment Variables Configuration</h4>
        <div className="interactive-demo">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>API_URL (url):</label>
              <input
                type="text"
                value={envVars.API_URL}
                onChange={(e) => updateEnvVar('API_URL', e.target.value)}
                placeholder="https://api.example.com"
                className="demo-input"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>PORT (number):</label>
              <input
                type="text"
                value={envVars.PORT}
                onChange={(e) => updateEnvVar('PORT', e.target.value)}
                placeholder="3000"
                className="demo-input"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>DEBUG (boolean):</label>
              <input
                type="text"
                value={envVars.DEBUG}
                onChange={(e) => updateEnvVar('DEBUG', e.target.value)}
                placeholder="true or false"
                className="demo-input"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>DATABASE_URL (string):</label>
              <input
                type="text"
                value={envVars.DATABASE_URL}
                onChange={(e) => updateEnvVar('DATABASE_URL', e.target.value)}
                placeholder="postgresql://localhost:5432/mydb"
                className="demo-input"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>EMAIL (email):</label>
              <input
                type="text"
                value={envVars.EMAIL}
                onChange={(e) => updateEnvVar('EMAIL', e.target.value)}
                placeholder="admin@example.com"
                className="demo-input"
              />
            </div>
          </div>
          <button onClick={handleCheckEnv} className="demo-button" style={{ marginTop: '15px' }}>
            Validate Environment Variables
          </button>
          {error && (
            <div className="error-box" style={{ marginTop: '10px' }}>
              {error}
            </div>
          )}
          {validationResult && (
            <div style={{ marginTop: '15px' }}>
              <div className={`result-box ${validationResult.allValid ? 'success-box' : 'error-box'}`}>
                <strong>{validationResult.allValid ? '✅ All environment variables are valid!' : '❌ Some environment variables are invalid'}</strong>
              </div>
              <div style={{ marginTop: '10px' }}>
                {validationResult.checks.map((check, idx) => (
                  <div
                    key={idx}
                    className={`result-box ${check.valid ? 'success-box' : 'error-box'}`}
                    style={{ marginTop: '8px', fontSize: '14px' }}
                  >
                    <strong>{check.key}:</strong> {check.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Use Cases</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>🚀 Node.js Application</h4>
            <div className="code-result" style={{ fontSize: '12px', marginTop: '10px' }}>
              {`import { checkEnv } from '@upendra.manike/env-checker'

// Validate at startup
checkEnv({
  DATABASE_URL: 'string',
  API_KEY: 'string',
  PORT: 'number',
  NODE_ENV: {
    type: 'string',
    required: true,
    default: 'development'
  }
})

// App will throw error if env vars are missing
// Prevents runtime crashes`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>⚛️ Next.js Application</h4>
            <div className="code-result" style={{ fontSize: '12px', marginTop: '10px' }}>
              {`// In next.config.js or app initialization
import { checkEnv } from '@upendra.manike/env-checker'

checkEnv({
  NEXT_PUBLIC_API_URL: 'url',
  DATABASE_URL: 'string',
  SECRET_KEY: 'string'
})

// Ensures all required env vars are set
// Fails fast at startup`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🔐 Secure Configuration</h4>
            <div className="code-result" style={{ fontSize: '12px', marginTop: '10px' }}>
              {`// Validate sensitive configuration
checkEnv({
  JWT_SECRET: {
    type: 'string',
    required: true
  },
  DB_PASSWORD: {
    type: 'string',
    required: true
  },
  ADMIN_EMAIL: {
    type: 'email',
    required: true
  }
})

// Prevents deploying with missing secrets`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Common Patterns</h3>
        <div className="code-block">
          <div className="code-label">Pattern: Basic Validation</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`import { checkEnv } from '@upendra.manike/env-checker'

// Simple type checking
checkEnv({
  API_URL: 'url',      // Must be valid URL
  PORT: 'number',      // Must be number
  DEBUG: 'boolean',    // Must be boolean
  APP_NAME: 'string'   // Must be string
})

// Throws error if validation fails`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: With Defaults</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Provide default values
checkEnv({
  PORT: {
    type: 'number',
    default: 3000
  },
  NODE_ENV: {
    type: 'string',
    default: 'development'
  },
  LOG_LEVEL: {
    type: 'string',
    default: 'info'
  }
})

// Uses default if env var not set`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Validate and Get Values</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`import { validateEnv } from '@upendra.manike/env-checker'

// Validate and get typed values
const env = validateEnv({
  PORT: 'number',
  API_URL: 'url',
  DEBUG: 'boolean'
})

// Returns: { PORT: 3000, API_URL: 'https://...', DEBUG: true }
// All values are properly typed`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Required Fields</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Mark fields as required
checkEnv({
  DATABASE_URL: {
    type: 'string',
    required: true  // Will throw if missing
  },
  API_KEY: {
    type: 'string',
    required: true
  },
  OPTIONAL_CONFIG: 'string'  // Optional
})

// Fails fast if required vars missing`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Email and URL Validation</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Validate email and URL types
checkEnv({
  ADMIN_EMAIL: {
    type: 'email',
    required: true
  },
  API_BASE_URL: {
    type: 'url',
    required: true
  },
  WEBHOOK_URL: 'url'
})

// Ensures proper format for emails and URLs`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnvCheckerDemo
