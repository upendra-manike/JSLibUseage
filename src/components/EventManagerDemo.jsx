import React, { useState, useEffect } from 'react'
import { on, group, TypedEventEmitter } from '@upendra.manike/event-manager'
import './Demo.css'

function EventManagerDemo() {
  const [clickCount, setClickCount] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [keyPress, setKeyPress] = useState('')
  const [emitterMessages, setEmitterMessages] = useState([])

  useEffect(() => {
    // Group multiple event listeners for easy cleanup
    const disposers = group(
      on(window, 'click', () => {
        setClickCount(c => c + 1)
      }),
      on(window, 'scroll', () => {
        setScrollY(window.scrollY)
      }),
      on(window, 'keydown', (e) => {
        setKeyPress(e.key)
        setTimeout(() => setKeyPress(''), 1000)
      })
    )

    // Cleanup all listeners when component unmounts
    return disposers
  }, [])

  // Typed Event Emitter example
  const [emitter] = useState(() => {
    // Events type: { message: (text) => void, userJoined: (userId, username) => void, error: (error) => void }
    return new TypedEventEmitter()
  })

  useEffect(() => {
    const disposers = [
      emitter.on('message', (text) => {
        setEmitterMessages(prev => [...prev, `📨 Message: ${text}`])
      }),
      emitter.on('userJoined', (userId, username) => {
        setEmitterMessages(prev => [...prev, `👤 ${username} (${userId}) joined`])
      }),
      emitter.on('error', (error) => {
        setEmitterMessages(prev => [...prev, `❌ Error: ${error.message}`])
      })
    ]

    return () => {
      disposers.forEach(dispose => dispose())
    }
  }, [emitter])

  const sendMessage = () => {
    emitter.emit('message', `Hello at ${new Date().toLocaleTimeString()}`)
  }

  const simulateUserJoin = () => {
    emitter.emit('userJoined', 'user-123', 'John Doe')
  }

  const simulateError = () => {
    emitter.emit('error', new Error('Something went wrong'))
  }

  return (
    <div className="demo-container">
      <h2>@upendra.manike/event-manager</h2>
      <p className="demo-description">
        Safe event listener management with automatic cleanup to prevent memory leaks. Type-safe event emitters included.
      </p>

      <div className="demo-section">
        <h3>🎯 Window Event Listeners</h3>
        <div className="demo-grid">
          <div className="demo-card">
            <h4>Click Counter</h4>
            <div className="result-box">
              <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{clickCount}</div>
              <p>Click anywhere on the page</p>
            </div>
          </div>

          <div className="demo-card">
            <h4>Scroll Position</h4>
            <div className="result-box">
              <div style={{ fontSize: '1.5em' }}>{scrollY}px</div>
              <p>Scroll the page to see updates</p>
            </div>
          </div>

          <div className="demo-card">
            <h4>Key Press</h4>
            <div className="result-box">
              <div style={{ fontSize: '2em', minHeight: '40px' }}>
                {keyPress || 'Press any key...'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>📡 Typed Event Emitter</h3>
        <div className="demo-card">
          <h4>Event Messages</h4>
          <div className="button-group">
            <button onClick={sendMessage}>Send Message</button>
            <button onClick={simulateUserJoin}>User Joined</button>
            <button onClick={simulateError}>Simulate Error</button>
          </div>
          <div className="result-box" style={{ maxHeight: '200px', overflowY: 'auto', textAlign: 'left' }}>
            {emitterMessages.length === 0 ? (
              <p style={{ opacity: 0.6 }}>No events yet. Click buttons above.</p>
            ) : (
              emitterMessages.map((msg, idx) => (
                <div key={idx} style={{ marginBottom: '8px', padding: '4px' }}>
                  {msg}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Examples</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>🖱️ Mouse & Keyboard Tracking</h4>
            <p>Track user interactions without memory leaks:</p>
            <pre>{`import { on, group } from '@upendra.manike/event-manager'

useEffect(() => {
  const disposers = group(
    on(window, 'mousemove', trackMouse),
    on(window, 'keydown', handleKeyPress),
    on(document, 'click', handleClick)
  )
  return disposers  // All cleaned up automatically
}, [])`}</pre>
          </div>

          <div className="use-case-item">
            <h4>📡 Custom Event System</h4>
            <p>Type-safe event emitters for application events:</p>
            <pre>{`import { TypedEventEmitter } from '@upendra.manike/event-manager'

type AppEvents = {
  userLogin: (userId: string) => void
  dataUpdated: (data: any) => void
}

const appEvents = new TypedEventEmitter<AppEvents>()
appEvents.on('userLogin', (userId) => {
  console.log('User logged in:', userId)
})`}</pre>
          </div>

          <div className="use-case-item">
            <h4>🧹 Automatic Cleanup</h4>
            <p>Prevent memory leaks with automatic disposers:</p>
            <pre>{`import { on } from '@upendra.manike/event-manager'

const dispose = on(element, 'customEvent', handler)
// Later, when done:
dispose()  // Removes listener automatically`}</pre>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>📝 Common Patterns</h3>
        <div className="code-examples">
          <div className="code-block">
            <h4>React Component with Event Listeners</h4>
            <pre>{`import { useEffect } from 'react'
import { on, group } from '@upendra.manike/event-manager'

function MyComponent() {
  useEffect(() => {
    const cleanup = group(
      on(window, 'resize', handleResize),
      on(window, 'scroll', handleScroll),
      on(document, 'visibilitychange', handleVisibility)
    )
    return cleanup  // All listeners removed on unmount
  }, [])
}`}</pre>
          </div>

          <div className="code-block">
            <h4>Event Emitter for State Management</h4>
            <pre>{`import { TypedEventEmitter } from '@upendra.manike/event-manager'

type StateEvents = {
  stateChanged: (newState: any) => void
  error: (error: Error) => void
}

const stateEmitter = new TypedEventEmitter<StateEvents>()

// Subscribe
const unsubscribe = stateEmitter.on('stateChanged', (state) => {
  updateUI(state)
})

// Emit
stateEmitter.emit('stateChanged', newState)`}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventManagerDemo

