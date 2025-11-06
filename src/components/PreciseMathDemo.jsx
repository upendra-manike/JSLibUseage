import React, { useState } from 'react'
import { add, sub, mul, div, round, preciseMath } from '@upendra.manike/precise-math'
import './Demo.css'

function PreciseMathDemo() {
  const [num1, setNum1] = useState('0.1')
  const [num2, setNum2] = useState('0.2')
  const [precision, setPrecision] = useState(2)

  const result1 = Number(num1) + Number(num2)
  const preciseResult = add(num1, num2)

  return (
    <div className="demo-container">
      <h2>@upendra.manike/precise-math</h2>
      <p className="demo-description">
        Decimal-safe math operations for JavaScript. Avoid floating-point errors like 0.1 + 0.2 = 0.30000000000000004
      </p>

      <div className="demo-section">
        <h3>🔢 Basic Operations</h3>
        <div className="demo-grid">
          <div className="demo-card">
            <h4>Precise Addition</h4>
            <div className="input-group">
              <input 
                type="text" 
                value={num1} 
                onChange={(e) => setNum1(e.target.value)}
                placeholder="0.1"
              />
              <span>+</span>
              <input 
                type="text" 
                value={num2} 
                onChange={(e) => setNum2(e.target.value)}
                placeholder="0.2"
              />
            </div>
            <div className="result-box">
              <div className="error-result">
                <strong>JavaScript:</strong> {num1} + {num2} = {result1}
              </div>
              <div className="success-result">
                <strong>Precise Math:</strong> {num1} + {num2} = {preciseResult}
              </div>
            </div>
          </div>

          <div className="demo-card">
            <h4>Precise Subtraction</h4>
            <div className="result-box">
              <div>1.0 - 0.9 = {sub('1.0', '0.9')}</div>
              <div className="note">JavaScript: {1.0 - 0.9}</div>
            </div>
          </div>

          <div className="demo-card">
            <h4>Precise Multiplication</h4>
            <div className="result-box">
              <div>0.1 × 3 = {mul('0.1', '3')}</div>
              <div className="note">JavaScript: {0.1 * 3}</div>
            </div>
          </div>

          <div className="demo-card">
            <h4>Precise Division</h4>
            <div className="input-group">
              <input 
                type="number" 
                value={precision} 
                onChange={(e) => setPrecision(Number(e.target.value))}
                min="0"
                max="10"
              />
              <span>decimal places</span>
            </div>
            <div className="result-box">
              <div>1 ÷ 3 = {div('1', '3', precision)}</div>
              <div className="note">JavaScript: {(1 / 3).toFixed(precision)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Examples</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>💰 Financial Calculations</h4>
            <p>Calculate prices, taxes, and totals without rounding errors:</p>
            <pre>{`const price = add('19.99', '4.99')  // 24.98
const tax = mul(price, '0.08')        // 1.9984
const total = add(price, tax)          // 26.9784`}</pre>
          </div>

          <div className="use-case-item">
            <h4>📊 Percentage Calculations</h4>
            <p>Accurate percentage calculations for analytics:</p>
            <pre>{`const percentage = div('33', '100', 2)  // 0.33
const result = mul('1000', percentage)      // 330`}</pre>
          </div>

          <div className="use-case-item">
            <h4>🎯 Rounding Values</h4>
            <p>Round numbers to specific decimal places:</p>
            <pre>{`round(3.14159, 2)  // 3.14
round(2.71828, 3)  // 2.718`}</pre>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>📝 Common Patterns</h3>
        <div className="code-examples">
          <div className="code-block">
            <h4>E-commerce Price Calculation</h4>
            <pre>{`import { add, mul, round } from '@upendra.manike/precise-math'

function calculateTotal(items) {
  let total = '0'
  items.forEach(item => {
    const itemTotal = mul(item.price, item.quantity)
    total = add(total, itemTotal)
  })
  const tax = mul(total, '0.08')
  return round(add(total, tax), 2)
}`}</pre>
          </div>

          <div className="code-block">
            <h4>Using the PreciseMath Object</h4>
            <pre>{`import { preciseMath } from '@upendra.manike/precise-math'

const result = preciseMath.add('0.1', '0.2')
const rounded = preciseMath.round(result, 2)`}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreciseMathDemo

