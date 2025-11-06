import React, { useState } from 'react'
import { withRetry, sleep, pMapSeries } from '@upendra.manike/async-utils'
import './Demo.css'

function AsyncUtilsDemo() {
  const [retryResult, setRetryResult] = useState(null)
  const [retryLoading, setRetryLoading] = useState(false)
  const [sleepResult, setSleepResult] = useState(null)
  const [seriesResult, setSeriesResult] = useState(null)

  const simulateApiCall = async () => {
    // Simulate API call that might fail
    const random = Math.random()
    if (random < 0.7) {
      throw new Error('API call failed')
    }
    return { success: true, data: 'Retry successful!' }
  }

  const handleRetry = async () => {
    setRetryLoading(true)
    setRetryResult(null)
    try {
      const result = await withRetry(() => simulateApiCall(), {
        maxRetries: 3,
        delay: 500,
        backoff: 'exponential'
      })
      setRetryResult({ success: true, message: result.data })
    } catch (error) {
      setRetryResult({ success: false, message: error.message })
    } finally {
      setRetryLoading(false)
    }
  }

  const handleSleep = async () => {
    setSleepResult('Sleeping for 2 seconds...')
    await sleep(2000)
    setSleepResult('✅ Wake up! Sleep completed')
  }

  const handleSeries = async () => {
    setSeriesResult('Processing in series...')
    const tasks = [
      async () => {
        await sleep(300)
        return 'Task 1'
      },
      async () => {
        await sleep(300)
        return 'Task 2'
      },
      async () => {
        await sleep(300)
        return 'Task 3'
      }
    ]
    
    const start = Date.now()
    const results = await pMapSeries(tasks, async (task) => await task())
    const duration = Date.now() - start
    
    setSeriesResult(`✅ Completed: ${results.join(', ')} (${duration}ms)`)
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Async Control Utilities</h3>
        <p>Retry with exponential backoff, sleep, timeout, and sequential promise mapping</p>
      </div>

      <div className="demo-section">
        <h4>withRetry - Exponential Backoff</h4>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
          Retry failed operations with exponential backoff. Perfect for API calls that might fail temporarily.
        </p>
        <div className="interactive-demo">
          <button onClick={handleRetry} disabled={retryLoading} className="demo-button">
            {retryLoading ? 'Retrying...' : 'Test Retry (70% failure rate)'}
          </button>
          {retryResult && (
            <div className={`result-box ${retryResult.success ? 'success-box' : 'error-box'}`}>
              {retryResult.message}
            </div>
          )}
          <div className="code-block" style={{ marginTop: '10px' }}>
            <div className="code-label">Code Example:</div>
            <div className="code-result" style={{ fontSize: '12px' }}>
              {`const result = await withRetry(
  () => fetch('/api/data'),
  {
    maxRetries: 3,
    delay: 500,
    backoff: 'exponential' // or 'linear'
  }
)`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>sleep - Delay Execution</h4>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
          Wait for a specified amount of time. Useful for rate limiting, animations, or delays.
        </p>
        <div className="interactive-demo">
          <button onClick={handleSleep} className="demo-button">
            Sleep for 2 seconds
          </button>
          {sleepResult && (
            <div className="result-box success-box">
              {sleepResult}
            </div>
          )}
          <div className="code-block" style={{ marginTop: '10px' }}>
            <div className="code-label">Code Example:</div>
            <div className="code-result" style={{ fontSize: '12px' }}>
              {`await sleep(2000); // Wait 2 seconds
console.log('After delay');`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Additional Utilities</h4>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
          Additional utilities available: backoffDelay (for custom retry logic)
        </p>
        <div className="code-block" style={{ marginTop: '10px' }}>
          <div className="code-label">Available Exports:</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`import { 
  withRetry,    // Retry with exponential backoff
  sleep,        // Delay execution
  pMapSeries,   // Sequential promise processing
  backoffDelay  // Calculate backoff delays
} from '@upendra.manike/async-utils';`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>pMapSeries - Sequential Processing</h4>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
          Process promises sequentially (one after another). Useful when you need to maintain order or limit concurrency.
        </p>
        <div className="interactive-demo">
          <button onClick={handleSeries} className="demo-button">
            Process Tasks in Series
          </button>
          {seriesResult && (
            <div className="result-box success-box">
              {seriesResult}
            </div>
          )}
          <div className="code-block" style={{ marginTop: '10px' }}>
            <div className="code-label">Code Example:</div>
            <div className="code-result" style={{ fontSize: '12px' }}>
              {`const results = await pMapSeries(
  [fetch('/api/1'), fetch('/api/2'), fetch('/api/3')],
  async (task) => await task()
);
// Tasks execute one after another`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Use Cases</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>🔄 API Retry Logic</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Retry failed API calls
const data = await withRetry(
  () => api.get('/users'),
  { maxRetries: 3, delay: 1000 }
);`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>⏱️ Rate Limiting</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Delay between API calls
for (const item of items) {
  await processItem(item);
  await sleep(1000); // Wait 1 second
}`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>⏰ Delay Calculation</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Custom backoff delays
import { backoffDelay } from '@upendra.manike/async-utils';
const delay = backoffDelay(attempt, { type: 'exponential' });
await sleep(delay);`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📋 Sequential Processing</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Process uploads one at a time
await pMapSeries(uploads, async (file) => {
  await uploadFile(file);
});`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Exponential backoff retry logic</li>
          <li>✅ Linear backoff option</li>
          <li>✅ Sleep/delay utility</li>
          <li>✅ Sequential promise processing</li>
          <li>✅ Custom backoff delay calculation</li>
          <li>✅ Signal-aware cancellation support</li>
        </ul>
      </div>
    </div>
  )
}

export default AsyncUtilsDemo

