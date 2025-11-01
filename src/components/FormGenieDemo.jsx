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
        <h3>Features Demonstrated</h3>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>✅ Schema-based form generation</li>
          <li>✅ Automatic validation</li>
          <li>✅ Support for text, email, number, select, textarea, checkbox</li>
          <li>✅ Required field validation</li>
          <li>✅ Customizable field components</li>
        </ul>
      </div>
    </div>
  )
}

export default FormGenieDemo

