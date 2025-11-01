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
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Case conversion (camelCase, snake_case, kebab-case, PascalCase)</li>
          <li>✅ Slugify for URL-friendly strings</li>
          <li>✅ Truncate with ellipsis</li>
          <li>✅ Capitalize words</li>
          <li>✅ CSV to array conversion</li>
          <li>✅ Array to CSV conversion</li>
          <li>✅ Remove BOM and normalize line endings</li>
        </ul>
      </div>
    </div>
  )
}

export default StringUtilsDemo

