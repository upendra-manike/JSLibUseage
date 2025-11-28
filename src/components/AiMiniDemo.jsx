import React, { useState } from 'react'
import { AIMini } from '@upendra.manike/ai-mini'
import './Demo.css'

function AiMiniDemo() {
  const [prompt, setPrompt] = useState('What is JavaScript?')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [provider, setProvider] = useState('openai')
  const [apiKey, setApiKey] = useState('')

  const handleAsk = async () => {
    if (!apiKey.trim()) {
      setError('Please enter an API key to test')
      return
    }

    setLoading(true)
    setError('')
    setResponse('')

    try {
      const ai = new AIMini({
        provider: provider,
        apiKey: apiKey,
      })

      const result = await ai.ask(prompt)
      setResponse(result.content)
    } catch (err) {
      setError(err.message || 'Failed to get response')
    } finally {
      setLoading(false)
    }
  }

  const handleSummarize = async () => {
    if (!apiKey.trim()) {
      setError('Please enter an API key to test')
      return
    }

    const longText = `JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. It enables interactive web pages and is an essential part of web applications. JavaScript is a dynamic language with dynamic typing, prototype-based object-orientation, and first-class functions. It supports event-driven, functional, and imperative programming styles.`

    setLoading(true)
    setError('')
    setResponse('')

    try {
      const ai = new AIMini({
        provider: provider,
        apiKey: apiKey,
      })

      const summary = await ai.summarize(longText)
      setResponse(summary)
    } catch (err) {
      setError(err.message || 'Failed to summarize')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>🤖 AI Mini - Universal LLM Client</h3>
        <p>Unified API for OpenAI, Gemini, Claude, Groq and more. One interface for all AI providers.</p>
      </div>

      <div className="demo-section">
        <h4>Provider Configuration</h4>
        <div className="interactive-demo">
          <div className="input-group">
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="demo-input"
            >
              <option value="openai">OpenAI</option>
              <option value="claude">Claude (Anthropic)</option>
              <option value="gemini">Gemini (Google)</option>
              <option value="groq">Groq</option>
            </select>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API Key (required for testing)"
              className="demo-input"
            />
          </div>
          <div className="result-box" style={{ background: '#fff3e0', fontSize: '13px' }}>
            <strong>Note:</strong> API key is required to test. Your key is stored only in browser memory and never sent to our servers.
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Ask Question</h4>
        <div className="interactive-demo">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your question"
            className="demo-input"
            onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
          />
          <button
            onClick={handleAsk}
            className="demo-button"
            disabled={loading || !apiKey.trim()}
          >
            {loading ? 'Asking...' : 'Ask AI'}
          </button>
          {error && (
            <div className="error-box" style={{ marginTop: '10px' }}>
              {error}
            </div>
          )}
          {response && (
            <div className="result-box" style={{ marginTop: '10px', background: '#f0fff4' }}>
              <strong>Response:</strong>
              <div style={{ marginTop: '8px', whiteSpace: 'pre-wrap' }}>{response}</div>
            </div>
          )}
        </div>
      </div>

      <div className="demo-section">
        <h4>Summarize Text</h4>
        <div className="interactive-demo">
          <button
            onClick={handleSummarize}
            className="demo-button"
            disabled={loading || !apiKey.trim()}
          >
            {loading ? 'Summarizing...' : 'Summarize Sample Text'}
          </button>
          {response && (
            <div className="result-box" style={{ marginTop: '10px', background: '#f0fff4' }}>
              <strong>Summary:</strong>
              <div style={{ marginTop: '8px', whiteSpace: 'pre-wrap' }}>{response}</div>
            </div>
          )}
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Use Cases</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>📱 Chat Application</h4>
            <div className="code-result" style={{ fontSize: '12px', marginTop: '10px' }}>
              {`import { AIMini } from '@upendra.manike/ai-mini'

const ai = new AIMini({
  provider: 'openai',
  apiKey: process.env.OPENAI_KEY
})

// Chat interface
async function handleMessage(userMessage) {
  const response = await ai.ask(userMessage)
  return response.content
}`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📊 Content Summarization</h4>
            <div className="code-result" style={{ fontSize: '12px', marginTop: '10px' }}>
              {`// Summarize long articles
const ai = new AIMini({
  provider: 'claude',
  apiKey: process.env.CLAUDE_KEY
})

const summary = await ai.summarize(articleText)
// Returns concise summary`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🔄 Multi-Provider Support</h4>
            <div className="code-result" style={{ fontSize: '12px', marginTop: '10px' }}>
              {`// Switch providers easily
const providers = ['openai', 'claude', 'gemini']
const ai = new AIMini({
  provider: providers[currentIndex],
  apiKey: apiKeys[currentIndex]
})

// Same API, different provider`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Common Patterns</h3>
        <div className="code-block">
          <div className="code-label">Pattern: Basic Question Answering</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`import { AIMini } from '@upendra.manike/ai-mini'

const ai = new AIMini({
  provider: 'openai',
  apiKey: 'your-api-key',
  model: 'gpt-4' // optional, uses default if not specified
})

// Ask a question
const response = await ai.ask('What is React?')
console.log(response.content)
// Usage: response.usage.totalTokens`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: System Prompt + User Message</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Use system prompt for context
const response = await ai.ask(
  'Explain this code',
  'You are a helpful coding assistant'
)

// System prompt sets behavior
// User message is the actual question`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Text Summarization</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Summarize long text
const longArticle = '...'
const summary = await ai.summarize(longArticle)
// Returns concise summary automatically`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Extract Structured Data</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Extract specific fields from text
const text = 'John Doe, email: john@example.com, age: 30'
const data = await ai.extract(text, ['name', 'email', 'age'])
// Returns: { name: 'John Doe', email: 'john@example.com', age: '30' }`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Text Classification</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Classify text into categories
const text = 'This product is amazing!'
const category = await ai.classify(text, ['positive', 'negative', 'neutral'])
// Returns: 'positive'`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiMiniDemo

