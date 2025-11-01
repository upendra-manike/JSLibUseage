import React, { useState } from 'react'
import SmartDateDemo from './components/SmartDateDemo'
import TinyUtilsDemo from './components/TinyUtilsDemo'
import MotionKitDemo from './components/MotionKitDemo'
import ReactSkeletonsDemo from './components/ReactSkeletonsDemo'
import LiteFetcherDemo from './components/LiteFetcherDemo'
import FetchPlusDemo from './components/FetchPlusDemo'
import CacheableFetchDemo from './components/CacheableFetchDemo'
import SmartStorageDemo from './components/SmartStorageDemo'
import ApiChainDemo from './components/ApiChainDemo'
import FormGenieDemo from './components/FormGenieDemo'
import ReactMotionKitDemo from './components/ReactMotionKitDemo'
import ValidatorsDemo from './components/ValidatorsDemo'
import IdGeneratorDemo from './components/IdGeneratorDemo'
import DomHelpersDemo from './components/DomHelpersDemo'
import StringUtilsDemo from './components/StringUtilsDemo'
import ArrayHelpersDemo from './components/ArrayHelpersDemo'
import ObjectHelpersDemo from './components/ObjectHelpersDemo'
import './App.css'

function App() {
  const [activeDemo, setActiveDemo] = useState(null)

  const demos = [
    { id: 'smart-date', name: 'Smart Date', component: SmartDateDemo },
    { id: 'tiny-utils', name: 'Tiny Utils', component: TinyUtilsDemo },
    { id: 'validators', name: 'Validators', component: ValidatorsDemo },
    { id: 'id-generator', name: 'ID Generator', component: IdGeneratorDemo },
    { id: 'string-utils', name: 'String Utils', component: StringUtilsDemo },
    { id: 'array-helpers', name: 'Array Helpers', component: ArrayHelpersDemo },
    { id: 'object-helpers', name: 'Object Helpers', component: ObjectHelpersDemo },
    { id: 'dom-helpers', name: 'DOM Helpers', component: DomHelpersDemo },
    { id: 'motion-kit', name: 'Motion Kit', component: MotionKitDemo },
    { id: 'react-skeletons', name: 'React Skeletons', component: ReactSkeletonsDemo },
    { id: 'lite-fetcher', name: 'Lite Fetcher', component: LiteFetcherDemo },
    { id: 'fetch-plus', name: 'Fetch Plus', component: FetchPlusDemo },
    { id: 'cacheable-fetch', name: 'Cacheable Fetch', component: CacheableFetchDemo },
    { id: 'smart-storage', name: 'Smart Storage', component: SmartStorageDemo },
    { id: 'api-chain', name: 'API Chain', component: ApiChainDemo },
    { id: 'form-genie', name: 'Form Genie', component: FormGenieDemo },
    { id: 'react-motion-kit', name: 'React Motion Kit', component: ReactMotionKitDemo },
  ]

  const ActiveComponent = activeDemo ? demos.find(d => d.id === activeDemo)?.component : null

  return (
    <div className="app">
      <header className="app-header">
        <h1>@upendra.manike Packages Demo</h1>
        <p>Interactive demonstrations of all packages in real-time</p>
      </header>

      <nav className="demo-nav">
        {demos.map(demo => (
          <button
            key={demo.id}
            className={`demo-button ${activeDemo === demo.id ? 'active' : ''}`}
            onClick={() => setActiveDemo(activeDemo === demo.id ? null : demo.id)}
          >
            {demo.name}
          </button>
        ))}
      </nav>

      <main className="demo-container">
        {ActiveComponent ? (
          <div className="demo-wrapper">
            <h2>{demos.find(d => d.id === activeDemo)?.name}</h2>
            <ActiveComponent />
          </div>
        ) : (
          <div className="welcome">
            <h2>Welcome!</h2>
            <p>Click on any package above to see a live demonstration</p>
            <div className="package-list">
              <h3>Available Packages:</h3>
              <ul>
                {demos.map(demo => (
                  <li key={demo.id}>{demo.name}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

