import React, { useState } from 'react'
import { AIMini } from '@upendra.manike/ai-mini'
import './Demo.css'

function AiMiniDemo() {
  const [prompt, setPrompt] = useState('Tell me a short joke')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [provider, setProvider] = useState('openai')

  // Note: This demo shows the API structure, but actual API calls require API keys
  // which should not be hardcoded. For demo purposes, we'll show the structure.
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResponse('')

    try {
      // In a real app, you'd initialize with your API key
      // const client = new AIMini({
      //   provider: provider,
      //   apiKey: process.env[`${provider.toUpperCase()}_API_KEY`]
      // })
      
      // const result = await client.ask(prompt)
      // setResponse(result.content)

      // For demo purposes, showing structure:
      setTimeout(() => {
        setResponse(`This is a demo response. In a real app, you would:\n\n1. Initialize the client with: new AIMini({ provider: '${provider}', apiKey: 'YOUR_API_KEY' })\n2. Call client.ask("${prompt}")\n3. Get the AI response from result.content\n\nAvailable methods:\n- ask(prompt, systemPrompt?)\n- summarize(text)\n- extract(text, fields)\n- classify(text, categories)\n\nActual API call requires valid API keys.`)
        setLoading(false)
      }, 1500)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Universal LLM Client</h3>
        <p>Unified API for OpenAI, Gemini, Claude, Groq and more</p>
      </div>

      <div className="demo-section">
        <div className="code-block" style={{ marginBottom: '20px' }}>
          <div className="code-label">Supported Providers:</div>
          <div className="code-result" style={{ padding: '15px' }}>
            OpenAI, Anthropic (Claude), Google (Gemini), Groq, and more
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>AI Chat Interface</h4>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Provider:
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="demo-input"
            >
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic (Claude)</option>
              <option value="google">Google (Gemini)</option>
              <option value="groq">Groq</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Prompt:
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="demo-input"
              rows={3}
              placeholder="Enter your prompt..."
            />
          </div>

          <button 
            type="submit" 
            className="demo-button"
            disabled={loading || !prompt.trim()}
          >
            {loading ? 'Processing...' : 'Send to AI'}
          </button>
        </form>
      </div>

      <div className="demo-section">
        {error && (
          <div className="error-box">
            <strong>Error:</strong> {error}
          </div>
        )}

        {response && (
          <div className="data-display">
            <h4>AI Response:</h4>
            <div className="result-box" style={{ whiteSpace: 'pre-wrap' }}>
              {response}
            </div>
          </div>
        )}

        {!response && !loading && !error && (
          <div className="result-box">
            Enter a prompt and select a provider above to see how the unified API works.
            <br /><br />
            <strong>Note:</strong> This is a demo. Actual API calls require valid API keys configured.
          </div>
        )}
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Unified API across multiple LLM providers</li>
          <li>✅ Switch between OpenAI, Claude, Gemini, Groq easily</li>
          <li>✅ Consistent interface regardless of provider</li>
          <li>✅ TypeScript support</li>
          <li>✅ Simple, clean API</li>
        </ul>
      </div>

      <div className="demo-section">
        <h4>Code Example</h4>
        <div className="code-block">
          <div className="code-label">Usage:</div>
          <div className="code-result" style={{ fontSize: '13px' }}>
{`import { AIMini } from '@upendra.manike/ai-mini'

const client = new AIMini({
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY
})

const response = await client.ask('Hello!')
console.log(response.content)`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiMiniDemo

