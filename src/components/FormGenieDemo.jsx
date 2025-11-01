import React, { useState } from 'react'
import { FormGenie } from '@upendra.manike/form-genie'
import './Demo.css'

function FormGenieDemo() {
  const [submittedData, setSubmittedData] = useState(null)

  const schema = [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      required: true,
      placeholder: 'Enter your first name',
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      required: true,
      placeholder: 'Enter your last name',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      placeholder: 'your.email@example.com',
    },
    {
      name: 'age',
      type: 'number',
      label: 'Age',
      required: false,
      placeholder: 'Enter your age',
    },
    {
      name: 'country',
      type: 'select',
      label: 'Country',
      required: true,
      options: [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' },
        { value: 'au', label: 'Australia' },
      ],
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biography',
      required: false,
      placeholder: 'Tell us about yourself...',
      rows: 4,
    },
    {
      name: 'subscribe',
      type: 'checkbox',
      label: 'Subscribe to newsletter',
      required: false,
    },
  ]

  const handleSubmit = (data) => {
    setSubmittedData(data)
    alert('Form submitted! Check the result below.')
  }

  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Schema-Based Form Generator</h3>
        <p>Build forms from JSON schema with automatic validation</p>
      </div>

      <div className="demo-section">
        <div className="form-container">
          <FormGenie
            schema={schema}
            onSubmit={handleSubmit}
            submitButtonText="Submit Form"
          />
        </div>
      </div>

      {submittedData && (
        <div className="demo-section">
          <h4>Submitted Data</h4>
          <div className="data-display">
            <div className="code-block">
              <div className="code-label">Form Data:</div>
              <div className="code-result">
                {JSON.stringify(submittedData, null, 2)}
              </div>
            </div>
          </div>
          <button 
            onClick={() => setSubmittedData(null)} 
            className="demo-button"
            style={{ marginTop: '10px' }}
          >
            Clear Result
          </button>
        </div>
      )}

      <div className="demo-section">
        <h3>💡 More Form Examples</h3>
        <div className="code-block">
          <div className="code-label">Complex Form Schema Example:</div>
          <div className="code-result" style={{ fontSize: '12px' }}>
            {`const complexSchema = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    placeholder: 'user@example.com'
  },
  {
    name: 'age',
    type: 'number',
    label: 'Age',
    required: false,
    min: 18,
    max: 100
  },
  {
    name: 'country',
    type: 'select',
    label: 'Country',
    required: true,
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' }
    ]
  },
  {
    name: 'subscribe',
    type: 'checkbox',
    label: 'Subscribe to newsletter',
    default: true
  },
  {
    name: 'bio',
    type: 'textarea',
    label: 'Biography',
    rows: 5,
    maxLength: 500
  }
]`}
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>🎯 Use Cases</h3>
        <div className="use-cases">
          <div className="use-case-item">
            <h4>📝 User Registration</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Auto-generate signup form
const signupSchema = [
  { name: 'username', type: 'text', required: true },
  { name: 'email', type: 'email', required: true },
  { name: 'password', type: 'password', required: true }
]

<FormGenie schema={signupSchema} onSubmit={handleSignup} />`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>📋 Survey Forms</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Dynamic survey from API
const surveySchema = await fetch('/api/survey-schema')
  .then(r => r.json())

<FormGenie schema={surveySchema} onSubmit={submitSurvey} />`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>⚙️ Settings Form</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Generate settings from config
const settingsSchema = [
  { name: 'theme', type: 'select', options: [...] },
  { name: 'notifications', type: 'checkbox' }
]`}
            </div>
          </div>
          <div className="use-case-item">
            <h4>🔍 Search Filters</h4>
            <div className="result-box" style={{ fontSize: '13px' }}>
              {`// Build filter form dynamically
const filterSchema = [
  { name: 'category', type: 'select', options: categories },
  { name: 'priceRange', type: 'number' }
]`}
            </div>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Schema-based form generation - Define once, render everywhere</li>
          <li>✅ Automatic validation - Built-in email, required, min/max checks</li>
          <li>✅ Support for all input types - text, email, number, select, textarea, checkbox, radio</li>
          <li>✅ Required field validation - Visual feedback</li>
          <li>✅ Customizable field components - Override default rendering</li>
          <li>✅ Conditional fields - Show/hide based on values</li>
          <li>✅ Default values - Pre-fill forms</li>
        </ul>
      </div>
    </div>
  )
}

export default FormGenieDemo

