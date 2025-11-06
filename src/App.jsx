import React, { useEffect, useMemo, useState } from 'react'
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
import DownloadsStats from './components/DownloadsStats'
import AsyncUtilsDemo from './components/AsyncUtilsDemo'
import DeepAccessDemo from './components/DeepAccessDemo'
import ReactSafeEffectsDemo from './components/ReactSafeEffectsDemo'
import './App.css'

function App() {
  // Read initial demo and solo mode from URL on first load
  const initialParams = useMemo(() => new URLSearchParams(window.location.search), [])
  const initialDemoFromUrl = initialParams.get('demo')
  const isSoloMode = initialParams.get('solo') === '1'

  const [activeDemo, setActiveDemo] = useState(initialDemoFromUrl || null)

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
    { id: 'async-utils', name: 'Async Utils', component: AsyncUtilsDemo },
    { id: 'deep-access', name: 'Deep Access', component: DeepAccessDemo },
    { id: 'react-safe-effects', name: 'React Safe Effects', component: ReactSafeEffectsDemo },
    { id: 'downloads', name: 'NPM Downloads', component: DownloadsStats },
  ]

  const ActiveComponent = activeDemo ? demos.find(d => d.id === activeDemo)?.component : null

  // Keep URL in sync when user changes demo (without reloading)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (activeDemo) {
      params.set('demo', activeDemo)
      if (isSoloMode) params.set('solo', '1')
    } else {
      params.delete('demo')
      params.delete('solo')
    }
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
    window.history.replaceState({}, '', newUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDemo])

  const openInNewWindow = (demoId) => {
    const basePath = window.location.pathname
    const url = `${basePath}?demo=${demoId}&solo=1`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="app">
      {!isSoloMode && (
        <>
          <header className="app-header">
            <h1>@upendra.manike Packages Demo</h1>
            <p>Interactive demonstrations of all packages in real-time</p>
          </header>

          <nav className="demo-nav">
            {demos.map(demo => (
              <div key={demo.id} style={{ display: 'inline-flex', gap: 6 }}>
                <button
                  className={`demo-button ${activeDemo === demo.id ? 'active' : ''}`}
                  onClick={() => setActiveDemo(activeDemo === demo.id ? null : demo.id)}
                >
                  {demo.name}
                </button>
                <button
                  className="demo-button"
                  title="Open in new window"
                  onClick={() => openInNewWindow(demo.id)}
                  style={{ padding: '8px 10px' }}
                >
                  ↗
                </button>
              </div>
            ))}
          </nav>
        </>
      )}

      <main className="demo-container">
        {ActiveComponent ? (
          <div className="demo-wrapper">
            {!isSoloMode && <h2>{demos.find(d => d.id === activeDemo)?.name}</h2>}
            <ActiveComponent />
          </div>
        ) : (
          !isSoloMode && (
            <div className="welcome">
              <h2>Welcome!</h2>
              <p>Click on any package above to see a live demonstration</p>
              <div className="package-list">
                <h3>Available Packages:</h3>
                <ul>
                  {demos.map(demo => (
                    <li key={demo.id}>{demo.name} <a href={`?demo=${demo.id}&solo=1`} target="_blank" rel="noreferrer" style={{ marginLeft: 6 }}>open ↗</a></li>
                  ))}
                </ul>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  )
}

export default App

