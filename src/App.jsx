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
import PreciseMathDemo from './components/PreciseMathDemo'
import EventManagerDemo from './components/EventManagerDemo'
import ReactUtilsDemo from './components/ReactUtilsDemo'
import DevUtilsDemo from './components/DevUtilsDemo'
import CommitGenDemo from './components/CommitGenDemo'
import ChangelogBuddyDemo from './components/ChangelogBuddyDemo'
import './App.css'

function App() {
  // Read initial demo and solo mode from URL on first load
  const initialParams = useMemo(() => new URLSearchParams(window.location.search), [])
  const initialDemoFromUrl = initialParams.get('demo')
  const isSoloMode = initialParams.get('solo') === '1'

  const [activeDemo, setActiveDemo] = useState(initialDemoFromUrl || null)
  const [searchTerm, setSearchTerm] = useState('')

  const demos = [
    { id: 'smart-date', name: 'Smart Date', component: SmartDateDemo, category: 'Date & Time', description: 'Human-readable date formatting and relative time' },
    { id: 'tiny-utils', name: 'Tiny Utils', component: TinyUtilsDemo, category: 'Utilities', description: 'Essential utility functions for arrays, objects, and strings' },
    { id: 'validators', name: 'Validators', component: ValidatorsDemo, category: 'Validation', description: 'Input validation and data checking utilities' },
    { id: 'id-generator', name: 'ID Generator', component: IdGeneratorDemo, category: 'Utilities', description: 'Generate unique IDs and identifiers' },
    { id: 'string-utils', name: 'String Utils', component: StringUtilsDemo, category: 'Utilities', description: 'String manipulation and formatting helpers' },
    { id: 'array-helpers', name: 'Array Helpers', component: ArrayHelpersDemo, category: 'Data', description: 'Powerful array manipulation utilities' },
    { id: 'object-helpers', name: 'Object Helpers', component: ObjectHelpersDemo, category: 'Data', description: 'Object manipulation and transformation tools' },
    { id: 'dom-helpers', name: 'DOM Helpers', component: DomHelpersDemo, category: 'DOM', description: 'DOM manipulation and query utilities' },
    { id: 'motion-kit', name: 'Motion Kit', component: MotionKitDemo, category: 'Animation', description: 'CSS animation utilities and presets' },
    { id: 'react-skeletons', name: 'React Skeletons', component: ReactSkeletonsDemo, category: 'React', description: 'Loading skeleton components for React' },
    { id: 'lite-fetcher', name: 'Lite Fetcher', component: LiteFetcherDemo, category: 'Network', description: 'Lightweight fetch wrapper with utilities' },
    { id: 'fetch-plus', name: 'Fetch Plus', component: FetchPlusDemo, category: 'Network', description: 'Enhanced fetch with retry and timeout' },
    { id: 'cacheable-fetch', name: 'Cacheable Fetch', component: CacheableFetchDemo, category: 'Network', description: 'Fetch with built-in caching support' },
    { id: 'smart-storage', name: 'Smart Storage', component: SmartStorageDemo, category: 'Storage', description: 'Enhanced localStorage and sessionStorage' },
    { id: 'api-chain', name: 'API Chain', component: ApiChainDemo, category: 'Network', description: 'Chain API calls with error handling' },
    { id: 'form-genie', name: 'Form Genie', component: FormGenieDemo, category: 'Forms', description: 'Form generation and validation utilities' },
    { id: 'react-motion-kit', name: 'React Motion Kit', component: ReactMotionKitDemo, category: 'React', description: 'React animation components and hooks' },
    { id: 'async-utils', name: 'Async Utils', component: AsyncUtilsDemo, category: 'Async', description: 'Async/await utilities and helpers' },
    { id: 'deep-access', name: 'Deep Access', component: DeepAccessDemo, category: 'Data', description: 'Safe deep object property access' },
    { id: 'react-safe-effects', name: 'React Safe Effects', component: ReactSafeEffectsDemo, category: 'React', description: 'Safe useEffect hooks and utilities' },
    { id: 'precise-math', name: 'Precise Math', component: PreciseMathDemo, category: 'Math', description: 'Precision math operations for decimals' },
    { id: 'event-manager', name: 'Event Manager', component: EventManagerDemo, category: 'Events', description: 'Event management and pub/sub system' },
    { id: 'react-utils', name: 'React Utils', component: ReactUtilsDemo, category: 'React', description: 'Common React utility hooks and components' },
    { id: 'dev-utils', name: 'Dev Utils', component: DevUtilsDemo, category: 'Development', description: 'Development and debugging utilities' },
    { id: 'commit-gen', name: 'Commit Gen', component: CommitGenDemo, category: 'Development', description: 'Generate conventional commit messages' },
    { id: 'changelog-buddy', name: 'Changelog Buddy', component: ChangelogBuddyDemo, category: 'Development', description: 'Generate changelogs from commits' },
    { id: 'downloads', name: 'NPM Downloads', component: DownloadsStats, category: 'Stats', description: 'View NPM download statistics' },
  ]

  // Filter demos based on search term
  const filteredDemos = useMemo(() => {
    if (!searchTerm.trim()) return demos
    const term = searchTerm.toLowerCase()
    return demos.filter(demo => 
      demo.name.toLowerCase().includes(term) ||
      demo.category.toLowerCase().includes(term) ||
      demo.description.toLowerCase().includes(term)
    )
  }, [searchTerm, demos])

  // Group demos by category
  const demosByCategory = useMemo(() => {
    const grouped = {}
    filteredDemos.forEach(demo => {
      if (!grouped[demo.category]) {
        grouped[demo.category] = []
      }
      grouped[demo.category].push(demo)
    })
    return grouped
  }, [filteredDemos])

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
            <h1>@upendra.manike Packages</h1>
            <p>Interactive demonstrations and usage examples for all packages</p>
          </header>

          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Search packages by name, category, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <nav className="demo-nav">
            {Object.keys(demosByCategory).length > 0 ? (
              Object.entries(demosByCategory).map(([category, categoryDemos]) => (
                <div key={category} className="category-section">
                  <h3 className="category-title">{category}</h3>
                  <div className="demo-buttons-grid">
                    {categoryDemos.map(demo => (
                      <div key={demo.id} className="demo-button-wrapper">
                        <button
                          className={`demo-button ${activeDemo === demo.id ? 'active' : ''}`}
                          onClick={() => setActiveDemo(activeDemo === demo.id ? null : demo.id)}
                          title={demo.description}
                        >
                          <span className="demo-name">{demo.name}</span>
                          <span className="demo-description">{demo.description}</span>
                        </button>
                        <button
                          className="demo-button-icon"
                          title="Open in new window"
                          onClick={() => openInNewWindow(demo.id)}
                        >
                          ↗
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No packages found matching "{searchTerm}"</p>
                <button onClick={() => setSearchTerm('')} className="demo-button">
                  Clear Search
                </button>
              </div>
            )}
          </nav>
        </>
      )}

      <main className="demo-container">
        {ActiveComponent ? (
          <div className="demo-wrapper">
            {!isSoloMode && (
              <div className="demo-header">
                <h2>{demos.find(d => d.id === activeDemo)?.name}</h2>
                <p className="demo-subtitle">{demos.find(d => d.id === activeDemo)?.description}</p>
              </div>
            )}
            <ActiveComponent />
          </div>
        ) : (
          !isSoloMode && (
            <div className="welcome">
              <div className="welcome-content">
                <h2>👋 Welcome to Package Demos!</h2>
                <p>Explore interactive examples and usage patterns for all packages</p>
                <div className="welcome-stats">
                  <div className="stat-card">
                    <div className="stat-number">{demos.length}</div>
                    <div className="stat-label">Packages</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">{Object.keys(demosByCategory).length}</div>
                    <div className="stat-label">Categories</div>
                  </div>
                </div>
                <div className="quick-start">
                  <h3>Quick Start</h3>
                  <ul>
                    <li>🔍 Use the search bar to find packages by name or category</li>
                    <li>📦 Click any package to see live examples and usage</li>
                    <li>🔗 Click the ↗ icon to open a package in a new window</li>
                    <li>💡 Each demo includes real-world use cases and code examples</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  )
}

export default App

