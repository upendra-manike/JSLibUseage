import React, { useRef } from 'react'
import { fadeIn, slideIn, bounce, scale } from '@upendra.manike/motion-kit'
import './Demo.css'

function MotionKitDemo() {
  const fadeRef = useRef(null)
  const slideRef = useRef(null)
  const bounceRef = useRef(null)
  const scaleRef = useRef(null)

  const triggerFadeIn = () => {
    if (fadeRef.current) {
      fadeIn(fadeRef.current)
    }
  }

  const triggerSlideIn = () => {
    if (slideRef.current) {
      slideIn(slideRef.current, 'up')
    }
  }

  const triggerBounce = () => {
    if (bounceRef.current) {
      bounce(bounceRef.current)
    }
  }

  const triggerScale = () => {
    if (scaleRef.current) {
      scale(scaleRef.current)
    }
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Framework-Agnostic Animations</h3>
        <p>These animations work with vanilla JavaScript and any framework</p>
      </div>

      <div className="demo-section">
        <div className="animation-grid">
          <div className="animation-item">
            <div ref={fadeRef} className="animation-box" style={{ opacity: 0 }}>
              Fade In Box
            </div>
            <button onClick={triggerFadeIn} className="demo-button">
              Trigger Fade In
            </button>
          </div>

          <div className="animation-item">
            <div ref={slideRef} className="animation-box">
              Slide In Box
            </div>
            <button onClick={triggerSlideIn} className="demo-button">
              Trigger Slide In
            </button>
          </div>

          <div className="animation-item">
            <div ref={bounceRef} className="animation-box">
              Bounce Box
            </div>
            <button onClick={triggerBounce} className="demo-button">
              Trigger Bounce
            </button>
          </div>

          <div className="animation-item">
            <div ref={scaleRef} className="animation-box">
              Scale Box
            </div>
            <button onClick={triggerScale} className="demo-button">
              Trigger Scale
            </button>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Instructions</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>Click each button to trigger the corresponding animation</li>
          <li>These animations work on any DOM element</li>
          <li>No framework dependencies required</li>
        </ul>
      </div>
    </div>
  )
}

export default MotionKitDemo

