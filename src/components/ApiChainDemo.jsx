import React, { useState } from 'react'
import { createChain } from '@upendra.manike/api-chain'
import './Demo.css'

function ApiChainDemo() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [steps, setSteps] = useState([])

  const executeChain = async () => {
    setLoading(true)
    setSteps([])
    setResult(null)

    try {
      const chain = createChain()

      // Create a chain of API calls
      chain
        .step(async () => {
          setSteps(prev => [...prev, 'Step 1: Fetching user...'])
          const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
          return res.json()
        })
        .step(async (user) => {
          setSteps(prev => [...prev, `Step 2: Fetching posts for user ${user.name}...`])
          const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
          const posts = await res.json()
          return { user, posts }
        })
        .step(async (data) => {
          setSteps(prev => [...prev, `Step 3: Fetching comments for first post...`])
          const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${data.posts[0].id}`)
          const comments = await res.json()
          return { ...data, comments }
        })
      
      const result = await chain.runData()

      setResult(result)
      setSteps(prev => [...prev, '✅ Chain completed successfully!'])
    } catch (err) {
      setSteps(prev => [...prev, `❌ Error: ${err.message}`])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Declarative API Chaining</h3>
        <p>Create API workflows where each step uses the result of the previous step</p>
      </div>

      <div className="demo-section">
        <button 
          onClick={executeChain} 
          className="demo-button"
          disabled={loading}
        >
          {loading ? 'Executing Chain...' : 'Execute API Chain'}
        </button>
      </div>

      <div className="demo-section">
        <h4>Execution Steps</h4>
        <div className="steps-container">
          {steps.length === 0 ? (
            <div className="result-box">Click "Execute API Chain" to start</div>
          ) : (
            steps.map((step, index) => (
              <div key={index} className={`step-item ${step.includes('✅') ? 'success' : step.includes('❌') ? 'error' : ''}`}>
                {step}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="demo-section">
        {result && (
          <>
            <h4>Final Result</h4>
            <div className="data-display">
              <div className="code-block">
                <div className="code-label">Chained API Response:</div>
                <div className="code-result">
                  {JSON.stringify(result, null, 2)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Use Cases</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>📊 Dashboard Data Loading</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Load all dashboard data sequentially
chain
  .step(() => fetchUser())
  .step((user) => fetchUserStats(user.id))
  .step((data) => fetchRecentActivity(data.userId))
  .execute()`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🛒 Order Processing</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Create order workflow
chain
  .step(() => validateCart())
  .step((cart) => calculateTotal(cart))
  .step((order) => processPayment(order))
  .step((order) => createShipment(order))
  .execute()`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>👤 User Onboarding</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Multi-step setup
chain
  .step(() => createAccount(data))
  .step((user) => sendWelcomeEmail(user))
  .step((user) => setupDefaultPreferences(user))
  .execute()`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🔄 Data Sync</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Sync data across services
chain
  .step(() => fetchLocalData())
  .step((local) => syncWithServer(local))
  .step((server) => updateLocalCache(server))
  .execute()`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Common Patterns</h3>
        <div className="code-block">
          <div className="code-label">Pattern: Error Handling in Chain</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Handle errors gracefully
const chain = createChain({
  onError: (error, step) => {
    console.error(\`Step \${step} failed:\`, error)
    // Optionally continue or stop
  },
  stopOnError: true // Stop on first error
})

chain
  .step(() => fetchUser())
  .step((user) => fetchPosts(user.id))
  .run()

// Result includes success flag and error info`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Transform Data Between Steps</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Transform and pass data
chain
  .step(async () => {
    const raw = await fetch('/api/users')
    return raw.json()
  })
  .step(async (users) => {
    // Transform users
    return users.map(u => ({
      id: u.id,
      displayName: \`\${u.firstName} \${u.lastName}\`
    }))
  })
  .step(async (transformed) => {
    // Use transformed data
    return saveToCache(transformed)
  })
  .runData()`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>How It Works</h3>
        <ol style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Step 1: Fetches user data from API</li>
          <li>Step 2: Uses user ID from step 1 to fetch user's posts</li>
          <li>Step 3: Uses first post ID from step 2 to fetch comments</li>
          <li>Final result contains user, posts, and comments - All in one call!</li>
        </ol>
        <p style={{ marginTop: '15px', padding: '15px', background: '#f0f9ff', borderRadius: '8px', color: '#0369a1' }}>
          <strong>💡 Benefit:</strong> Each step uses the result of the previous step, making complex workflows simple and readable.
        </p>
      </div>
    </div>
  )
}

export default ApiChainDemo

