import React, { useState, useEffect } from 'react'
import { Skeleton, SkeletonAuto } from '@upendra.manike/react-skeletons'
import './Demo.css'

function ReactSkeletonsDemo() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
      ])
      setLoading(false)
    }, 2000)
  }, [])

  const reload = () => {
    setLoading(true)
    setUsers([])
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
      ])
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Basic Skeletons</h3>
        <div className="skeleton-demo">
          <Skeleton width="200px" height="20px" style={{ marginBottom: '10px' }} />
          <Skeleton width="150px" height="20px" style={{ marginBottom: '10px' }} />
          <Skeleton width="100%" height="40px" />
        </div>
      </div>

      <div className="demo-section">
        <h3>Loading States with Skeletons</h3>
        <button onClick={reload} className="demo-button">
          Reload Data
        </button>

        {loading ? (
          <div className="loading-container">
            <div className="user-list">
              {[1, 2, 3].map((i) => (
                <div key={i} className="user-card-skeleton">
                  <Skeleton width="60px" height="60px" style={{ borderRadius: '50%', marginBottom: '10px' }} />
                  <Skeleton width="150px" height="20px" style={{ marginBottom: '8px' }} />
                  <Skeleton width="200px" height="16px" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="user-list">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <div className="avatar">{user.name[0]}</div>
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="demo-section">
        <h3>Card Skeleton Example</h3>
        <div className="card-container">
          {loading ? (
            <>
              <Skeleton width="100%" height="200px" style={{ borderRadius: '8px', marginBottom: '10px' }} />
              <Skeleton width="80%" height="24px" style={{ marginBottom: '8px' }} />
              <Skeleton width="60%" height="16px" />
            </>
          ) : (
            <div className="card">
              <div className="card-image" style={{ height: '200px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '8px', marginBottom: '10px' }} />
              <h4>Card Title</h4>
              <p>Card description goes here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReactSkeletonsDemo

