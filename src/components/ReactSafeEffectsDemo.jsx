import React, { useState } from 'react'
import { useAsyncEffect } from '@upendra.manike/react-safe-effects'
import './Demo.css'

function ReactSafeEffectsDemo() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cleanupCount, setCleanupCount] = useState(0)
  const [mounted, setMounted] = useState(true)

  // Simulate async data fetching
  useAsyncEffect(async () => {
    if (!mounted) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (!mounted) return // Check if component is still mounted
      
      setData({
        id: 1,
        name: 'Fetched Data',
        timestamp: new Date().toLocaleTimeString()
      })
      setLoading(false)
    } catch (err) {
      if (!mounted) return
      setError(err.message)
      setLoading(false)
    }
  }, [mounted])

  // Cleanup effect
  useAsyncEffect(async () => {
    return () => {
      setCleanupCount(prev => prev + 1)
    }
  }, [])

  const handleRemount = () => {
    setMounted(false)
    setTimeout(() => {
      setData(null)
      setLoading(false)
      setError(null)
      setMounted(true)
    }, 100)
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>React Safe Effects</h3>
        <p>React hooks to avoid common pitfalls: safe async effects, stable callbacks, and cleanup.</p>
      </div>

      <div className="demo-section">
        <h4>useAsyncEffect - Safe Async Operations</h4>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
          Safely handle async operations in useEffect. Automatically prevents state updates after unmount.
        </p>
        <div className="interactive-demo">
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Loading:</span>
              <span className="value">{loading ? '⏳ Yes' : '✅ No'}</span>
            </div>
            <div className="info-item">
              <span className="label">Mounted:</span>
              <span className="value">{mounted ? '✅ Yes' : '❌ No'}</span>
            </div>
            <div className="info-item">
              <span className="label">Cleanup Count:</span>
              <span className="value">{cleanupCount}</span>
            </div>
          </div>
          
          {data && (
            <div className="result-box success-box">
              <div><strong>Data:</strong> {data.name}</div>
              <div><strong>ID:</strong> {data.id}</div>
              <div><strong>Time:</strong> {data.timestamp}</div>
            </div>
          )}
          
          {error && (
            <div className="result-box error-box">
              Error: {error}
            </div>
          )}

          <button onClick={handleRemount} className="demo-button" style={{ marginTop: '10px' }}>
            Remount Component (Test Cleanup)
          </button>

          <div className="code-block" style={{ marginTop: '10px' }}>
            <div className="code-label">Code Example:</div>
            <div className="code-result" style={{ fontSize: '12px' }}>
              {`import { useAsyncEffect } from '@upendra.manike/react-safe-effects';
import { useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useAsyncEffect(async () => {
    setLoading(true);
    
    try {
      const result = await fetch('/api/data');
      const json = await result.json();
      
      // Safe: Won't update if component unmounted
      setData(json);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Handle error safely
    }
  }, []); // Empty deps = run once on mount

  return loading ? <div>Loading...</div> : <div>{data}</div>;
}`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Common Pitfalls Avoided</h4>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>❌ Problem: Memory Leak</h4>
            <div className="result-box" style={{ fontSize: '13px', backgroundColor: '#fee' }}>
              {`// BAD: State update after unmount
useEffect(() => {
  fetch('/api').then(data => {
    setData(data); // ❌ Warns if unmounted
  });
}, []);`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>✅ Solution: Safe Effect</h4>
            <div className="result-box" style={{ fontSize: '13px', backgroundColor: '#efe' }}>
              {`// GOOD: Safe async effect
useAsyncEffect(async () => {
  const data = await fetch('/api');
  setData(data); // ✅ Safe - checks mount state
}, []);`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Cleanup Function</h4>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>
          useAsyncEffect supports cleanup functions, just like useEffect. Cleanup runs when component unmounts or dependencies change.
        </p>
        <div className="code-block">
          <div className="code-label">Cleanup Example:</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`useAsyncEffect(async () => {
  const interval = setInterval(() => {
    console.log('Tick');
  }, 1000);

  // Cleanup function
  return () => {
    clearInterval(interval);
    console.log('Interval cleaned up');
  };
}, []);`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Use Cases</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>📡 Data Fetching</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Safe API calls
useAsyncEffect(async () => {
  const data = await fetchUserData(userId);
  setUser(data); // Safe even if navigated away
}, [userId]);`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🔄 Subscriptions</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Safe subscription cleanup
useAsyncEffect(async () => {
  const unsubscribe = subscribeToUpdates(setData);
  
  return () => {
    unsubscribe(); // Cleanup on unmount
  };
}, []);`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🎯 Polling</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Safe polling with cleanup
useAsyncEffect(async () => {
  const interval = setInterval(async () => {
    const data = await fetchLatest();
    setLatest(data);
  }, 5000);
  
  return () => clearInterval(interval);
}, []);`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🔐 Authentication</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Safe auth state updates
useAsyncEffect(async () => {
  const user = await checkAuth();
  if (user) {
    setAuthenticated(true);
  }
}, []);`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Prevents memory leaks from unmounted components</li>
          <li>✅ Safe async operations in useEffect</li>
          <li>✅ Automatic cleanup on unmount</li>
          <li>✅ Dependency array support</li>
          <li>✅ Cleanup function support</li>
          <li>✅ No warnings in console</li>
          <li>✅ TypeScript support</li>
        </ul>
      </div>

      <div className="demo-section">
        <h3>⚠️ Common Issues Solved</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>🚫 "Can't perform a React state update on an unmounted component" warning</li>
          <li>🚫 Memory leaks from async operations</li>
          <li>🚫 Race conditions in async effects</li>
          <li>🚫 No cleanup for timers/subscriptions</li>
        </ul>
      </div>
    </div>
  )
}

export default ReactSafeEffectsDemo

