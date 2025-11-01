import React, { useState } from 'react'
import { 
  chunk, uniq, groupBy, flatten, 
  omit, pick, merge, get, set,
  debounce, throttle,
  capitalize, camelCase, kebabCase, snakeCase, truncate
} from '@upendra.manike/tiny-utils'
import './Demo.css'

// Helper functions for utilities not in the package
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))
  if (typeof obj === 'object') {
    const cloned = {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key])
      }
    }
    return cloned
  }
  return obj
}

const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true
  if (obj1 == null || obj2 == null) return false
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false
  
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  
  if (keys1.length !== keys2.length) return false
  
  for (const key of keys1) {
    if (!keys2.includes(key)) return false
    if (!deepEqual(obj1[key], obj2[key])) return false
  }
  
  return true
}

const parseQueryString = (queryString) => {
  const params = new URLSearchParams(queryString)
  const result = {}
  for (const [key, value] of params.entries()) {
    result[key] = value
  }
  return result
}

const buildQueryString = (obj) => {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(obj)) {
    if (value != null) {
      params.append(key, String(value))
    }
  }
  return params.toString()
}

const removeEmptyValues = (obj) => {
  const cleaned = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined && value !== '' && 
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === 'object' && Object.keys(value).length === 0)) {
      if (typeof value === 'object' && !Array.isArray(value)) {
        const nested = removeEmptyValues(value)
        if (Object.keys(nested).length > 0) {
          cleaned[key] = nested
        }
      } else {
        cleaned[key] = value
      }
    }
  }
  return cleaned
}

const generateRandomId = (length = 16) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length]
  }
  return result
}

function TinyUtilsDemo() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debounceResult, setDebounceResult] = useState('')
  const [throttleResult, setThrottleResult] = useState('')
  const [queryString, setQueryString] = useState('name=John&age=30&city=NYC')
  const [randomId, setRandomId] = useState('')

  // Array operations
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const withDuplicates = [1, 2, 2, 3, 4, 4, 5]
  const nested = [[1, 2], [3, 4], [5, 6]]
  const users = [
    { id: 1, name: 'Alice', age: 25, city: 'NYC' },
    { id: 2, name: 'Bob', age: 30, city: 'LA' },
    { id: 3, name: 'Charlie', age: 25, city: 'NYC' },
  ]

  // Object operations
  const userObj = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' }
  const obj1 = { a: 1, b: 2 }
  const obj2 = { b: 3, c: 4 }
  const nestedObj = { user: { profile: { name: 'Jane' } } }
  
  // Deep clone test object
  const complexObj = {
    name: 'Test',
    nested: {
      arr: [1, 2, { deep: 'value' }],
      date: new Date('2024-01-01')
    }
  }
  
  // Object with empty values
  const dirtyObj = {
    name: 'John',
    email: '',
    age: null,
    city: undefined,
    tags: [],
    address: {},
    active: true,
    notes: 'Some notes'
  }
  
  // Deep equal test objects
  const objA = { a: 1, b: { c: 2, d: [3, 4] } }
  const objB = { a: 1, b: { c: 2, d: [3, 4] } }
  const objC = { a: 1, b: { c: 2, d: [3, 5] } }

  // Debounced search
  const debouncedSearch = debounce((value) => {
    setDebounceResult(`Searched: ${value}`)
  }, 500)

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    debouncedSearch(value)
  }

  // Throttled counter
  const throttledUpdate = throttle(() => {
    setThrottleResult(prev => `Updated ${Date.now()}`)
  }, 1000)

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Array Operations</h3>
        
        <div className="code-block">
          <div className="code-label">Chunk (split into groups of 3):</div>
          <div className="code-result">
            {JSON.stringify(chunk(numbers, 3), null, 2)}
          </div>
        </div>

        <div className="code-block">
          <div className="code-label">Uniq (remove duplicates):</div>
          <div className="code-result">
            {JSON.stringify(uniq(withDuplicates), null, 2)}
          </div>
        </div>

        <div className="code-block">
          <div className="code-label">Group By (by city):</div>
          <div className="code-result">
            {JSON.stringify(groupBy(users, (u) => u.city), null, 2)}
          </div>
        </div>

        <div className="code-block">
          <div className="code-label">Flatten:</div>
          <div className="code-result">
            {JSON.stringify(flatten(nested), null, 2)}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Object Operations</h3>
        
        <div className="code-block">
          <div className="code-label">Omit (remove password):</div>
          <div className="code-result">
            {JSON.stringify(omit(userObj, ['password']), null, 2)}
          </div>
        </div>

        <div className="code-block">
          <div className="code-label">Pick (only name & email):</div>
          <div className="code-result">
            {JSON.stringify(pick(userObj, ['name', 'email']), null, 2)}
          </div>
        </div>

        <div className="code-block">
          <div className="code-label">Merge objects:</div>
          <div className="code-result">
            {JSON.stringify(merge(obj1, obj2), null, 2)}
          </div>
        </div>

        <div className="code-block">
          <div className="code-label">Get nested value:</div>
          <div className="code-result">
            {get(nestedObj, 'user.profile.name', 'Not found')}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Function Utilities</h3>
        
        <div className="interactive-demo">
          <h4>Debounced Search (500ms delay)</h4>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Type to see debounce..."
            className="demo-input"
          />
          <div className="result-box">{debounceResult || 'Waiting for input...'}</div>
        </div>

        <div className="interactive-demo">
          <h4>Throttled Updates (max once per second)</h4>
          <button onClick={throttledUpdate} className="demo-button">
            Click Rapidly
          </button>
          <div className="result-box">{throttleResult || 'Click the button above'}</div>
        </div>
      </div>

      <div className="demo-section">
        <h3>String Utilities</h3>
        
        <div className="string-examples">
          <div className="string-item">
            <span className="original">"hello world example"</span>
            <span className="arrow">→</span>
            <div className="results">
              <div><strong>capitalize:</strong> {capitalize('hello world example')}</div>
              <div><strong>camelCase:</strong> {camelCase('hello world example')}</div>
              <div><strong>kebabCase:</strong> {kebabCase('hello world example')}</div>
              <div><strong>snakeCase:</strong> {snakeCase('hello world example')}</div>
              <div><strong>truncate(10):</strong> {truncate('hello world example', 10)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🔍 Deep Clone & Deep Equal</h3>
        
        <div className="code-block">
          <div className="code-label">Deep Clone (prevents reference issues):</div>
          <div className="code-result">
            {JSON.stringify(deepClone(complexObj), null, 2)}
          </div>
        </div>

        <div className="code-block">
          <div className="code-label">Deep Equal Comparison:</div>
          <div className="code-result">
            objA === objB (by reference): false
            deepEqual(objA, objB): {deepEqual(objA, objB) ? 'true ✅' : 'false ❌'}
            deepEqual(objA, objC): {deepEqual(objA, objC) ? 'true ✅' : 'false ❌'}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🔗 Query String Parsing</h3>
        
        <div className="interactive-demo">
          <h4>Parse Query String to Object</h4>
          <input
            type="text"
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
            placeholder="name=John&age=30&city=NYC"
            className="demo-input"
          />
          <div className="code-block" style={{ marginTop: '10px' }}>
            <div className="code-label">Parsed Object:</div>
            <div className="code-result">
              {JSON.stringify(parseQueryString(queryString), null, 2)}
            </div>
          </div>
        </div>

        <div className="interactive-demo">
          <h4>Build Query String from Object</h4>
          <div className="code-block">
            <div className="code-label">Object:</div>
            <div className="code-result">
              {JSON.stringify({ name: 'John', age: 30, city: 'NYC' }, null, 2)}
            </div>
          </div>
          <div className="result-box">
            <strong>Query String:</strong> {buildQueryString({ name: 'John', age: 30, city: 'NYC' })}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🧹 Remove Empty Values</h3>
        
        <div className="code-block">
          <div className="code-label">Original Object (with empty values):</div>
          <div className="code-result">
            {JSON.stringify(dirtyObj, null, 2)}
          </div>
        </div>

        <div className="code-block">
          <div className="code-label">Cleaned Object (empty values removed):</div>
          <div className="code-result">
            {JSON.stringify(removeEmptyValues(dirtyObj), null, 2)}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🔐 Generate Secure Random ID</h3>
        
        <div className="interactive-demo">
          <h4>Cryptographically Secure Random ID</h4>
          <button 
            onClick={() => setRandomId(generateRandomId())} 
            className="demo-button"
          >
            Generate Random ID
          </button>
          {randomId && (
            <div className="result-box">
              <strong>Generated ID:</strong> {randomId}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TinyUtilsDemo

