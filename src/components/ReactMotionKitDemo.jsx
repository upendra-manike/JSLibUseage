import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  useFadeIn, useSlideIn, useBounce, useScale, 
  useRotate, useShake, usePulse, useHover,
  AnimatedButton, AnimatedModal 
} from '@upendra.manike/react-motion-kit'
import './Demo.css'

function ReactMotionKitDemo() {
  const [showModal, setShowModal] = useState(false)
  const [key, setKey] = useState(0)

  const fadeIn = useFadeIn({ duration: 0.5 })
  const slideIn = useSlideIn({ direction: 'up', distance: 50 })
  const bounce = useBounce()
  const scale = useScale({ from: 0, to: 1 })
  const rotate = useRotate({ from: 0, to: 360 })
  const shake = useShake()
  const pulse = usePulse({ duration: 1.5 })
  const hover = useHover({ scale: 1.1, translateY: -5 })

  const resetAnimations = () => {
    setKey(prev => prev + 1)
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Prebuilt Animation Hooks for React</h3>
        <p>Framer Motion-based animations with easy-to-use hooks</p>
      </div>

      <div className="demo-section">
        <h4>Animation Hooks</h4>
        <div className="animation-showcase">
          <motion.div key={`fade-${key}`} {...fadeIn} className="animation-card">
            Fade In
          </motion.div>
          
          <motion.div key={`slide-${key}`} {...slideIn} className="animation-card">
            Slide In (Up)
          </motion.div>
          
          <motion.div key={`bounce-${key}`} {...bounce} className="animation-card">
            Bounce
          </motion.div>
          
          <motion.div key={`scale-${key}`} {...scale} className="animation-card">
            Scale
          </motion.div>
          
          <motion.div key={`rotate-${key}`} {...rotate} className="animation-card">
            Rotate
          </motion.div>
          
          <motion.div key={`shake-${key}`} {...shake} className="animation-card">
            Shake
          </motion.div>
          
          <motion.div {...pulse} className="animation-card">
            Pulse (Infinite)
          </motion.div>
          
          <motion.div {...hover} className="animation-card" style={{ cursor: 'pointer' }}>
            Hover Me!
          </motion.div>
        </div>
        <button onClick={resetAnimations} className="demo-button" style={{ marginTop: '15px' }}>
          Reset Animations
        </button>
      </div>

      <div className="demo-section">
        <h4>Animated Components</h4>
        <div className="button-group">
          <AnimatedButton variant="default" onClick={() => alert('Default variant clicked!')}>
            Default Button
          </AnimatedButton>
          <AnimatedButton variant="bounce" onClick={() => alert('Bounce variant clicked!')}>
            Bounce Button
          </AnimatedButton>
          <AnimatedButton variant="scale" onClick={() => alert('Scale variant clicked!')}>
            Scale Button
          </AnimatedButton>
          <AnimatedButton variant="pulse" onClick={() => setShowModal(true)}>
            Open Modal
          </AnimatedButton>
        </div>
      </div>

      <AnimatedModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        variant="scale"
      >
        <div style={{ 
          background: 'white', 
          padding: '30px', 
          borderRadius: '12px',
          maxWidth: '500px',
          width: '90%'
        }}>
          <h2 style={{ marginBottom: '15px', color: '#333' }}>Animated Modal</h2>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            This modal uses the AnimatedModal component with a scale animation variant.
          </p>
          <button 
            onClick={() => setShowModal(false)}
            className="demo-button"
          >
            Close Modal
          </button>
        </div>
      </AnimatedModal>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Prebuilt animation hooks (fade, slide, bounce, scale, etc.)</li>
          <li>✅ Easy-to-use API with sensible defaults</li>
          <li>✅ Customizable duration, delay, and easing</li>
          <li>✅ Pre-animated components (Button, Modal)</li>
          <li>✅ Built on Framer Motion for smooth animations</li>
        </ul>
      </div>
    </div>
  )
}

export default ReactMotionKitDemo

