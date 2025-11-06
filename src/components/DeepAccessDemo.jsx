import React, { useState } from 'react'
import { get, set } from '@upendra.manike/deep-access'
import './Demo.css'

function DeepAccessDemo() {
  const [obj, setObj] = useState({
    user: {
      profile: {
        name: 'John Doe',
        email: 'john@example.com',
        address: {
          city: 'New York',
          country: 'USA'
        }
      },
      settings: {
        theme: 'dark'
      }
    },
    metadata: {
      version: '1.0.0'
    }
  })

  const [getPath, setGetPath] = useState('user.profile.name')
  const [getResult, setGetResult] = useState(null)
  const [setPath, setSetPath] = useState('user.profile.name')
  const [setValue, setSetValue] = useState('Jane Doe')
  const [setResult, setSetResult] = useState(null)

  const handleGet = () => {
    try {
      const result = get(obj, getPath, 'Default Value')
      setGetResult({ success: true, value: JSON.stringify(result), path: getPath })
    } catch (error) {
      setGetResult({ success: false, message: error.message })
    }
  }

  const handleSet = () => {
    try {
      const newObj = JSON.parse(JSON.stringify(obj)) // Deep clone
      set(newObj, setPath, setValue)
      setObj(newObj)
      setSetResult({ success: true, message: 'Value set successfully!' })
      setTimeout(() => setSetResult(null), 2000)
    } catch (error) {
      setSetResult({ success: false, message: error.message })
    }
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Deep Access Utilities</h3>
        <p>Safe deep get/set with dotted paths and default values. Access nested object properties without errors.</p>
      </div>

      <div className="demo-section">
        <h4>Current Object Structure</h4>
        <div className="code-block">
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(obj, null, 2)}
          </pre>
        </div>
      </div>

      <div className="demo-section">
        <h4>deepGet - Safe Deep Property Access</h4>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
          Access nested properties safely. Returns default value if path doesn't exist.
        </p>
        <div className="interactive-demo">
          <input
            type="text"
            value={getPath}
            onChange={(e) => setGetPath(e.target.value)}
            placeholder="Enter path (e.g., user.profile.name)"
            className="demo-input"
            style={{ marginBottom: '10px' }}
          />
          <button onClick={handleGet} className="demo-button">
            Get Value
          </button>
          {getResult && (
            <div className={`result-box ${getResult.success ? 'success-box' : 'error-box'}`}>
              {getResult.success ? (
                <>
                  <div><strong>Path:</strong> {getResult.path}</div>
                  <div><strong>Value:</strong> {getResult.value}</div>
                </>
              ) : (
                getResult.message
              )}
            </div>
          )}
          <div className="code-block" style={{ marginTop: '10px' }}>
            <div className="code-label">Code Example:</div>
            <div className="code-result" style={{ fontSize: '12px' }}>
              {`import { get } from '@upendra.manike/deep-access';

const user = {
  profile: {
    name: 'John',
    email: 'john@example.com'
  }
};

// Safe access with default
get(user, 'profile.name'); // 'John'
get(user, 'profile.phone', 'N/A'); // 'N/A' (default)
get(user, 'invalid.path', 'Default'); // 'Default'`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>deepSet - Safe Deep Property Setting</h4>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
          Set nested properties safely. Creates intermediate objects if they don't exist.
        </p>
        <div className="interactive-demo">
          <input
            type="text"
            value={setPath}
            onChange={(e) => setSetPath(e.target.value)}
            placeholder="Enter path (e.g., user.profile.name)"
            className="demo-input"
            style={{ marginBottom: '10px' }}
          />
          <input
            type="text"
            value={setValue}
            onChange={(e) => setSetValue(e.target.value)}
            placeholder="Enter value"
            className="demo-input"
            style={{ marginBottom: '10px' }}
          />
          <button onClick={handleSet} className="demo-button">
            Set Value
          </button>
          {setResult && (
            <div className={`result-box ${setResult.success ? 'success-box' : 'error-box'}`}>
              {setResult.message}
            </div>
          )}
          <div className="code-block" style={{ marginTop: '10px' }}>
            <div className="code-label">Code Example:</div>
            <div className="code-result" style={{ fontSize: '12px' }}>
              {`import { set } from '@upendra.manike/deep-access';

const user = {};

// Set nested value (creates objects if needed)
set(user, 'profile.name', 'John');
// user = { profile: { name: 'John' } }

set(user, 'profile.email', 'john@example.com');
// user = { profile: { name: 'John', email: 'john@example.com' } }`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Try Example Paths</h4>
        <div className="info-grid">
          <div className="info-item">
            <button 
              className="demo-button" 
              style={{ fontSize: '12px', padding: '5px 10px' }}
              onClick={() => {
                setGetPath('user.profile.name')
                handleGet()
              }}
            >
              user.profile.name
            </button>
          </div>
          <div className="info-item">
            <button 
              className="demo-button"
              style={{ fontSize: '12px', padding: '5px 10px' }}
              onClick={() => {
                setGetPath('user.profile.email')
                handleGet()
              }}
            >
              user.profile.email
            </button>
          </div>
          <div className="info-item">
            <button 
              className="demo-button"
              style={{ fontSize: '12px', padding: '5px 10px' }}
              onClick={() => {
                setGetPath('user.profile.address.city')
                handleGet()
              }}
            >
              user.profile.address.city
            </button>
          </div>
          <div className="info-item">
            <button 
              className="demo-button"
              style={{ fontSize: '12px', padding: '5px 10px' }}
              onClick={() => {
                setGetPath('user.settings.theme')
                handleGet()
              }}
            >
              user.settings.theme
            </button>
          </div>
          <div className="info-item">
            <button 
              className="demo-button"
              style={{ fontSize: '12px', padding: '5px 10px' }}
              onClick={() => {
                setGetPath('metadata.version')
                handleGet()
              }}
            >
              metadata.version
            </button>
          </div>
          <div className="info-item">
            <button 
              className="demo-button"
              style={{ fontSize: '12px', padding: '5px 10px' }}
              onClick={() => {
                setGetPath('nonexistent.path')
                handleGet()
              }}
            >
              nonexistent.path (default)
            </button>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Use Cases</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>🔒 Safe Configuration Access</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Access config safely
const apiUrl = get(
  config,
  'api.baseUrl',
  'https://api.default.com'
);`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📝 Form Data Handling</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Update nested form state
set(formData, 'user.profile.name', newName);
set(formData, 'user.profile.email', newEmail);`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🎯 API Response Parsing</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Extract nested data safely
const userName = get(
  apiResponse,
  'data.user.profile.name',
  'Unknown User'
);`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🔄 State Management</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Update nested state
const newState = { ...state };
set(newState, 'app.settings.theme', 'dark');
setState(newState);`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Safe nested property access</li>
          <li>✅ Default value fallback</li>
          <li>✅ Automatic object creation</li>
          <li>✅ Dotted path notation</li>
          <li>✅ No errors on missing paths</li>
          <li>✅ TypeScript support</li>
        </ul>
      </div>
    </div>
  )
}

export default DeepAccessDemo

