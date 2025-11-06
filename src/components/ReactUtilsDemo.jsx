import React, { useState } from 'react'
import { 
  useDebounce, 
  useThrottle, 
  usePrevious, 
  useWindowSize,
  useSafeState,
  useForm,
  useAsync
} from '@upendra.manike/react-utils'
import './Demo.css'

function DebounceExample() {
  const [input, setInput] = useState('')
  const debouncedValue = useDebounce(input, 500)

  return (
    <div className="demo-card">
      <h4>useDebounce</h4>
      <input 
        type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type quickly..."
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <div className="result-box">
        <div>Input: <strong>{input}</strong></div>
        <div>Debounced (500ms): <strong>{debouncedValue}</strong></div>
      </div>
    </div>
  )
}

function ThrottleExample() {
  const [count, setCount] = useState(0)
  const throttledCount = useThrottle(count, 1000)

  return (
    <div className="demo-card">
      <h4>useThrottle</h4>
      <button onClick={() => setCount(c => c + 1)}>
        Click Fast (Count: {count})
      </button>
      <div className="result-box">
        <div>Throttled (1s): <strong>{throttledCount}</strong></div>
      </div>
    </div>
  )
}

function PreviousExample() {
  const [value, setValue] = useState(0)
  const previousValue = usePrevious(value)

  return (
    <div className="demo-card">
      <h4>usePrevious</h4>
      <div className="button-group">
        <button onClick={() => setValue(v => v + 1)}>Increment</button>
        <button onClick={() => setValue(v => v - 1)}>Decrement</button>
      </div>
      <div className="result-box">
        <div>Current: <strong>{value}</strong></div>
        <div>Previous: <strong>{previousValue ?? 'N/A'}</strong></div>
      </div>
    </div>
  )
}

function WindowSizeExample() {
  const { width, height } = useWindowSize()

  return (
    <div className="demo-card">
      <h4>useWindowSize</h4>
      <div className="result-box">
        <div>Width: <strong>{width}px</strong></div>
        <div>Height: <strong>{height}px</strong></div>
        <p className="note">Resize the window to see updates</p>
      </div>
    </div>
  )
}

function SafeStateExample() {
  const [count, setCount] = useSafeState(0)

  const handleAsyncUpdate = () => {
    setTimeout(() => {
      setCount(c => c + 1)
    }, 2000)
  }

  return (
    <div className="demo-card">
      <h4>useSafeState</h4>
      <p>Prevents state updates after unmount</p>
      <div className="button-group">
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
        <button onClick={handleAsyncUpdate}>Async Update (2s)</button>
      </div>
      <div className="result-box">
        <div>Count: <strong>{count}</strong></div>
      </div>
    </div>
  )
}

function FormExample() {
  const form = useForm({
    initialValues: { name: '', email: '' },
    validate: (values) => {
      const errors = {}
      if (!values.name) errors.name = 'Name is required'
      if (!values.email) errors.email = 'Email is required'
      else if (!values.email.includes('@')) errors.email = 'Invalid email'
      return errors
    },
    onSubmit: async (values) => {
      alert(`Form submitted: ${JSON.stringify(values, null, 2)}`)
    }
  })

  return (
    <div className="demo-card">
      <h4>useForm</h4>
      <form onSubmit={form.handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            placeholder="Name"
            value={form.values.name}
            onChange={(e) => form.setValue('name', e.target.value)}
            onBlur={() => form.setFieldTouched('name')}
            style={{ width: '100%', padding: '8px' }}
          />
          {form.touched.name && form.errors.name && (
            <div style={{ color: 'red', fontSize: '0.9em' }}>{form.errors.name}</div>
          )}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={form.values.email}
            onChange={(e) => form.setValue('email', e.target.value)}
            onBlur={() => form.setFieldTouched('email')}
            style={{ width: '100%', padding: '8px' }}
          />
          {form.touched.email && form.errors.email && (
            <div style={{ color: 'red', fontSize: '0.9em' }}>{form.errors.email}</div>
          )}
        </div>
        <button type="submit" disabled={form.isSubmitting}>
          {form.isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

function AsyncExample() {
  const fetchData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    return { message: 'Data loaded successfully!' }
  }

  const { data, loading, error, execute, reset } = useAsync(fetchData, false)

  return (
    <div className="demo-card">
      <h4>useAsync</h4>
      <div className="button-group">
        <button onClick={execute} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
      <div className="result-box">
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
        {data && <div style={{ color: 'green' }}>{data.message}</div>}
      </div>
    </div>
  )
}

function ReactUtilsDemo() {
  return (
    <div className="demo-container">
      <h2>@upendra.manike/react-utils</h2>
      <p className="demo-description">
        React utilities for common problems: hooks, state management, performance optimization, forms, and async operations.
      </p>

      <div className="demo-section">
        <h3>🎣 React Hooks</h3>
        <div className="demo-grid">
          <DebounceExample />
          <ThrottleExample />
          <PreviousExample />
          <WindowSizeExample />
          <SafeStateExample />
          <FormExample />
          <AsyncExample />
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Examples</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>🔍 Search Input Debouncing</h4>
            <p>Debounce search input to avoid excessive API calls:</p>
            <pre>{`import { useDebounce } from '@upendra.manike/react-utils'

function SearchBox() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  
  useEffect(() => {
    if (debouncedQuery) {
      searchAPI(debouncedQuery)
    }
  }, [debouncedQuery])
}`}</pre>
          </div>

          <div className="use-case-item">
            <h4>📝 Form Management</h4>
            <p>Handle form state, validation, and submission:</p>
            <pre>{`import { useForm } from '@upendra.manike/react-utils'

const form = useForm({
  initialValues: { email: '', password: '' },
  validate: (values) => {
    const errors = {}
    if (!values.email) errors.email = 'Required'
    return errors
  },
  onSubmit: async (values) => {
    await login(values)
  }
})`}</pre>
          </div>

          <div className="use-case-item">
            <h4>📡 Async Data Fetching</h4>
            <p>Handle async operations with loading and error states:</p>
            <pre>{`import { useAsync } from '@upendra.manike/react-utils'

const { data, loading, error, execute } = useAsync(
  () => fetch('/api/data').then(r => r.json()),
  true  // immediate
)`}</pre>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>📝 Common Patterns</h3>
        <div className="code-examples">
          <div className="code-block">
            <h4>Responsive Layout with Window Size</h4>
            <pre>{`import { useWindowSize } from '@upendra.manike/react-utils'

function ResponsiveComponent() {
  const { width } = useWindowSize()
  const isMobile = width < 768
  
  return isMobile ? <MobileView /> : <DesktopView />
}`}</pre>
          </div>

          <div className="code-block">
            <h4>Safe State Updates</h4>
            <pre>{`import { useSafeState } from '@upendra.manike/react-utils'

function Component() {
  const [data, setData] = useSafeState(null)
  
  useEffect(() => {
    fetchData().then(setData)  // Safe even if unmounted
  }, [])
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReactUtilsDemo

