import React, { useState } from 'react'
import { camelCase, snakeCase, kebabCase, pascalCase, slugify, truncate, capitalizeWords, csvToArray, arrayToCsv } from '@upendra.manike/string-utils'
import './Demo.css'

function StringUtilsDemo() {
  const [inputText, setInputText] = useState('hello world example')
  const [truncateLength, setTruncateLength] = useState(10)
  const [csvData, setCsvData] = useState(`name,age,city
John,30,NYC
Jane,25,LA
Bob,35,Chicago`)

  const csvArray = csvToArray(csvData)

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>String Manipulation Utilities</h3>
        <p>CamelCase, slugify, truncate, CSV conversion, and more</p>
      </div>

      <div className="demo-section">
        <h4>Case Conversion</h4>
        <div className="interactive-demo">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to convert"
            className="demo-input"
          />
          <div className="string-examples">
            <div className="string-item">
              <span className="original">"{inputText}"</span>
              <span className="arrow">→</span>
              <div className="results">
                <div><strong>camelCase:</strong> {camelCase(inputText)}</div>
                <div><strong>snakeCase:</strong> {snakeCase(inputText)}</div>
                <div><strong>kebabCase:</strong> {kebabCase(inputText)}</div>
                <div><strong>pascalCase:</strong> {pascalCase(inputText)}</div>
                <div><strong>capitalizeWords:</strong> {capitalizeWords(inputText)}</div>
                <div><strong>slugify:</strong> {slugify(inputText)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>Truncate String</h4>
        <div className="interactive-demo">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to truncate"
            className="demo-input"
          />
          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Length: {truncateLength}
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={truncateLength}
              onChange={(e) => setTruncateLength(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
          <div className="result-box">
            <strong>Truncated:</strong> {truncate(inputText, truncateLength)}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h4>CSV Conversion</h4>
        <div className="interactive-demo">
          <h4>CSV to Array</h4>
          <textarea
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            className="demo-input"
            rows={5}
            placeholder="Enter CSV data"
          />
          <div className="code-block" style={{ marginTop: '10px' }}>
            <div className="code-label">Parsed Array:</div>
            <div className="code-result">
              {JSON.stringify(csvArray, null, 2)}
            </div>
          </div>
        </div>

        <div className="interactive-demo" style={{ marginTop: '20px' }}>
          <h4>Array to CSV</h4>
          <div className="code-block">
            <div className="code-label">Array Data:</div>
            <div className="code-result">
              {JSON.stringify(csvArray, null, 2)}
            </div>
          </div>
          <div className="result-box" style={{ marginTop: '10px' }}>
            <strong>CSV Output:</strong>
            <pre style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>{arrayToCsv(csvArray)}</pre>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>💡 Real-World Examples</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>🌐 Generate URLs</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Convert title to URL slug
const title = "Hello World Example"
const slug = slugify(title)
// "hello-world-example"

const url = \`/blog/\${slug}\`
// "/blog/hello-world-example"`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🏷️ CSS Classes</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Convert to CSS-friendly class names
const className = kebabCase("UserProfileCard")
// "user-profile-card"

// Or camelCase for JS
const jsName = camelCase("user profile card")
// "userProfileCard"`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📄 Display Truncated Text</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Truncate long descriptions
const description = "Very long text..."
const preview = truncate(description, 100)
// "Very long text..." (if > 100 chars)

// In React
<p>{truncate(post.content, 150)}</p>`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📊 Import/Export CSV Data</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Import CSV to process
const csvData = "name,age\\nJohn,30\\nJane,25"
const users = csvToArray(csvData)

// Export data as CSV
const csv = arrayToCsv(users)
// Download as file`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Common Patterns</h3>
        <div className="code-block">
          <div className="code-label">Pattern: Generate URL Slugs</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Convert titles to SEO-friendly URLs
function createPostUrl(title) {
  const slug = slugify(title)
  return \`/blog/\${slug}\`
}

createPostUrl("My Awesome Post!")
// "/blog/my-awesome-post"

// Store in database
const post = {
  id: uuid(),
  title: "My Awesome Post!",
  slug: slugify(title),
  url: createPostUrl(title)
}`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Convert API Keys</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Convert API response keys to camelCase
function normalizeKeys(data) {
  return Object.keys(data).reduce((obj, key) => {
    obj[camelCase(key)] = data[key]
    return obj
  }, {})
}

// API returns: { user_name: 'John', user_email: '...' }
// Convert to: { userName: 'John', userEmail: '...' }`}
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '15px' }}>
          <div className="code-label">Pattern: Export Data to CSV</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`// Export table data
function exportToCSV(data, filename) {
  const csv = arrayToCsv(data)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}

// Usage
exportToCSV(users, 'users.csv')`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Case conversion - camelCase, snake_case, kebab-case, PascalCase</li>
          <li>✅ Slugify for URL-friendly strings - SEO-friendly URLs</li>
          <li>✅ Truncate with ellipsis - Display previews</li>
          <li>✅ Capitalize words - Proper formatting</li>
          <li>✅ CSV to array conversion - Import spreadsheet data</li>
          <li>✅ Array to CSV conversion - Export data</li>
          <li>✅ Remove BOM and normalize line endings - Clean text processing</li>
        </ul>
      </div>
    </div>
  )
}

export default StringUtilsDemo

