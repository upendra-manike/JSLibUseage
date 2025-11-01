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
        <h3>How It Works</h3>
        <ol style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Step 1: Fetches user data from API</li>
          <li>Step 2: Uses user ID to fetch user's posts</li>
          <li>Step 3: Uses first post ID to fetch comments</li>
          <li>Final result contains user, posts, and comments</li>
        </ol>
      </div>
    </div>
  )
}

export default ApiChainDemo

