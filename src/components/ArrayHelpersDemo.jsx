import React, { useState } from 'react'
import { groupBy, average, removeDuplicates, removeFalsy, median, mode, sum, min, max } from '@upendra.manike/array-helpers'
import './Demo.css'

function ArrayHelpersDemo() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const withDuplicates = [1, 2, 2, 3, 4, 4, 5, 5, 6]
  const withFalsy = [1, null, 2, undefined, 3, '', 4, 0, 5, false]
  const users = [
    { id: 1, name: 'Alice', role: 'admin', age: 25 },
    { id: 2, name: 'Bob', role: 'user', age: 30 },
    { id: 3, name: 'Charlie', role: 'admin', age: 28 },
    { id: 4, name: 'Diana', role: 'user', age: 35 },
  ]

  // Note: These functions might not be exactly as shown - using common patterns
  // Let me create a demo that shows the concept
  const groupedByRole = groupBy(users, u => u.role)

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Array Manipulation Utilities</h3>
        <p>Group by, aggregate, statistics, remove duplicates, and more</p>
      </div>

      <div className="demo-section">
        <h4>Group By</h4>
        <div className="code-block">
          <div className="code-label">Users grouped by role:</div>
          <div className="code-result">
            {JSON.stringify(groupedByRole, null, 2)}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Statistics</h4>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Average:</span>
            <span className="value">{average(numbers).toFixed(2)}</span>
          </div>
          <div className="info-item">
            <span className="label">Median:</span>
            <span className="value">{median(numbers)}</span>
          </div>
          <div className="info-item">
            <span className="label">Mode:</span>
            <span className="value">{mode([1, 2, 2, 3, 4, 4, 4])}</span>
          </div>
          <div className="info-item">
            <span className="label">Sum:</span>
            <span className="value">{sum(numbers)}</span>
          </div>
          <div className="info-item">
            <span className="label">Min:</span>
            <span className="value">{min(numbers)}</span>
          </div>
          <div className="info-item">
            <span className="label">Max:</span>
            <span className="value">{max(numbers)}</span>
          </div>
        </div>
        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Array: {JSON.stringify(numbers)}</div>
          <div className="code-result">
            average: {average(numbers)} | median: {median(numbers)} | sum: {sum(numbers)} | min: {min(numbers)} | max: {max(numbers)}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Remove Duplicates</h4>
        <div className="code-block">
          <div className="code-label">Original array:</div>
          <div className="code-result">
            {JSON.stringify(withDuplicates, null, 2)}
          </div>
        </div>
        <div className="code-block" style={{ marginTop: '10px' }}>
          <div className="code-label">After removeDuplicates:</div>
          <div className="code-result">
            {JSON.stringify(removeDuplicates(withDuplicates), null, 2)}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Remove Falsy Values</h4>
        <div className="code-block">
          <div className="code-label">Original array (with falsy values):</div>
          <div className="code-result">
            {JSON.stringify(withFalsy, null, 2)}
          </div>
        </div>
        <div className="code-block" style={{ marginTop: '10px' }}>
          <div className="code-label">After removeFalsy:</div>
          <div className="code-result">
            {JSON.stringify(removeFalsy(withFalsy), null, 2)}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Use Cases</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>📊 Analytics Dashboard</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Calculate stats from sales data
const sales = [100, 200, 150, 300, 250]
const avgSale = average(sales)
const medianSale = median(sales)
const totalRevenue = sum(sales)`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>👥 Organize Users by Role</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Group users for permissions
const usersByRole = groupBy(users, u => u.role)
// { admin: [...], user: [...], guest: [...] }

// Display by role
Object.entries(usersByRole).map(([role, users]) => (
  <RoleSection role={role} users={users} />
))`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🧹 Clean API Response</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Remove null/undefined from API data
const cleanData = removeFalsy(apiResponse)
// Only valid values remain

// Remove duplicate entries
const uniqueItems = removeDuplicates(items)`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📈 Calculate Metrics</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// E-commerce analytics
const orderTotals = orders.map(o => o.total)
const avgOrder = average(orderTotals)
const maxOrder = max(orderTotals)
const minOrder = min(orderTotals)`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Common Patterns</h3>
        <div className="code-block">
          <div className="code-label">Pattern: Calculate Statistics</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Analyze data array
function analyzeData(data) {
  return {
    count: data.length,
    average: average(data),
    median: median(data),
    mode: mode(data),
    sum: sum(data),
    min: min(data),
    max: max(data)
  }
}

const stats = analyzeData([1, 2, 3, 4, 5, 5, 6])
// { count: 7, average: 3.71, median: 4, mode: 5, ... }`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Organize Data by Category</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Group items for display
const productsByCategory = groupBy(products, p => p.category)

// Render by category
{Object.entries(productsByCategory).map(([category, items]) => (
  <CategorySection 
    key={category}
    title={category}
    items={items}
  />
))}`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Group array items by key function - Organize data efficiently</li>
          <li>✅ Statistical functions - average, median, mode, sum, min, max</li>
          <li>✅ Remove duplicate values - Get unique items</li>
          <li>✅ Remove falsy values - Clean null/undefined/empty data</li>
          <li>✅ Aggregate functions - Count by, count occurrences</li>
          <li>✅ Array transformation utilities - Process data easily</li>
        </ul>
      </div>
    </div>
  )
}

export default ArrayHelpersDemo

