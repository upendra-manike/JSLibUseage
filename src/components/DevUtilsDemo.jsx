import { useState } from 'react';
import { logger, measureTime, parseQueryString, buildQueryString, EventEmitter } from '@upendra.manike/dev-utils';
import './Demo.css';

function DevUtilsDemo() {
  const [logOutput, setLogOutput] = useState([]);
  const [timingResult, setTimingResult] = useState(null);
  const [queryInput, setQueryInput] = useState('?name=John&age=30&city=NYC');
  const [queryParams, setQueryParams] = useState({});
  const [eventLog, setEventLog] = useState([]);

  // Logger demo
  const handleLogger = () => {
    const log = logger('MyApp');
    const newLogs = [];
    
    // Capture console.log output
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.log = (...args) => {
      newLogs.push({ type: 'log', message: args.join(' ') });
      originalLog(...args);
    };
    console.error = (...args) => {
      newLogs.push({ type: 'error', message: args.join(' ') });
      originalError(...args);
    };
    console.warn = (...args) => {
      newLogs.push({ type: 'warn', message: args.join(' ') });
      originalWarn(...args);
    };
    
    log.log('Application started');
    log.error('Failed to connect to database');
    log.warn('API rate limit approaching');
    
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
    
    setLogOutput(newLogs);
  };

  // Timing demo
  const handleTiming = async () => {
    const { result, time } = await measureTime(async () => {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
      return { data: 'Operation completed', items: Math.floor(Math.random() * 100) };
    }, 'Data Fetch');
    
    setTimingResult({ result, time: time.toFixed(2) });
  };

  // Query string parsing
  const handleParseQuery = () => {
    const params = parseQueryString(queryInput);
    setQueryParams(params);
  };

  // Query string building
  const handleBuildQuery = () => {
    const params = {
      name: 'John Doe',
      age: 30,
      city: 'New York',
      active: true
    };
    const query = buildQueryString(params);
    setQueryInput(query);
    setQueryParams(params);
  };

  // Event emitter demo
  const handleEventEmitter = () => {
    const emitter = new EventEmitter();
    const newEvents = [];
    
    emitter.on('user:login', (user) => {
      newEvents.push(`User logged in: ${user}`);
    });
    
    emitter.on('user:logout', (user) => {
      newEvents.push(`User logged out: ${user}`);
    });
    
    emitter.once('app:start', () => {
      newEvents.push('App started (one-time event)');
    });
    
    // Emit events
    emitter.emit('app:start');
    emitter.emit('app:start'); // Won't trigger (once)
    emitter.emit('user:login', 'John');
    emitter.emit('user:login', 'Jane');
    emitter.emit('user:logout', 'John');
    
    setEventLog(newEvents);
  };

  return (
    <div className="demo-container">
      <h1>@upendra.manike/dev-utils</h1>
      <p className="demo-description">
        Developer utilities for JavaScript/TypeScript - logging with timestamps, execution time measurement, 
        query string parser, and pub-sub event emitter. Essential tools for development and debugging.
      </p>

      <div className="demo-section">
        <h2>Logger with Timestamps</h2>
        <p>Create contextual loggers with automatic timestamps.</p>
        <button onClick={handleLogger} className="demo-button">Test Logger</button>
        {logOutput.length > 0 && (
          <div className="demo-output">
            <h3>Log Output:</h3>
            {logOutput.map((log, i) => (
              <div key={i} className={`log-entry log-${log.type}`}>
                {log.message}
              </div>
            ))}
          </div>
        )}
        <div className="code-example">
          <pre>{`import { logger } from '@upendra.manike/dev-utils';

const log = logger('MyApp');
log.log('Application started');
log.error('Failed to connect');
log.warn('Rate limit approaching');`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h2>Execution Time Measurement</h2>
        <p>Measure how long async or sync operations take.</p>
        <button onClick={handleTiming} className="demo-button">Measure Time</button>
        {timingResult && (
          <div className="demo-output">
            <h3>Result:</h3>
            <p><strong>Time:</strong> {timingResult.time}ms</p>
            <p><strong>Data:</strong> {JSON.stringify(timingResult.result, null, 2)}</p>
          </div>
        )}
        <div className="code-example">
          <pre>{`import { measureTime } from '@upendra.manike/dev-utils';

const { result, time } = await measureTime(async () => {
  return await fetchData();
}, 'Data Fetch');

console.log(\`Operation took \${time}ms\`);`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h2>Query String Parsing</h2>
        <p>Parse URL query strings into objects.</p>
        <input
          type="text"
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          className="demo-input"
          placeholder="?name=John&age=30"
        />
        <button onClick={handleParseQuery} className="demo-button">Parse Query</button>
        {Object.keys(queryParams).length > 0 && (
          <div className="demo-output">
            <h3>Parsed Parameters:</h3>
            <pre>{JSON.stringify(queryParams, null, 2)}</pre>
          </div>
        )}
        <div className="code-example">
          <pre>{`import { parseQueryString, buildQueryString } from '@upendra.manike/dev-utils';

// Parse query string
const params = parseQueryString('?name=John&age=30&city=NYC');
// { name: 'John', age: '30', city: 'NYC' }

// Build query string
const query = buildQueryString({ name: 'John', age: 30, active: true });
// '?name=John&age=30&active=true'`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h2>Query String Building</h2>
        <p>Build query strings from objects.</p>
        <button onClick={handleBuildQuery} className="demo-button">Build Query</button>
      </div>

      <div className="demo-section">
        <h2>Event Emitter (Pub-Sub)</h2>
        <p>Simple pub-sub event system for decoupled communication.</p>
        <button onClick={handleEventEmitter} className="demo-button">Test Events</button>
        {eventLog.length > 0 && (
          <div className="demo-output">
            <h3>Event Log:</h3>
            {eventLog.map((event, i) => (
              <div key={i} className="log-entry">{event}</div>
            ))}
          </div>
        )}
        <div className="code-example">
          <pre>{`import { EventEmitter } from '@upendra.manike/dev-utils';

const emitter = new EventEmitter();

// Subscribe to events
emitter.on('user:login', (user) => {
  console.log(\`User logged in: \${user}\`);
});

emitter.once('app:start', () => {
  console.log('App started (one-time)');
});

// Emit events
emitter.emit('user:login', 'John');
emitter.emit('app:start');`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h2>Real-World Use Cases</h2>
        <div className="use-cases">
          <div className="use-case-item">
            <strong>Development Debugging:</strong> Use logger with context to track application flow
          </div>
          <div className="use-case-item">
            <strong>Performance Monitoring:</strong> Measure execution time of critical operations
          </div>
          <div className="use-case-item">
            <strong>URL Management:</strong> Parse and build query strings for routing and filters
          </div>
          <div className="use-case-item">
            <strong>Event-Driven Architecture:</strong> Decouple components with event emitter
          </div>
          <div className="use-case-item">
            <strong>API Request Tracking:</strong> Log API calls with timestamps and measure response times
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Common Patterns</h2>
        <div className="code-example">
          <pre>{`// Pattern: Performance monitoring
const { time } = await measureTime(async () => {
  await expensiveOperation();
});

if (time > 1000) {
  logger('Performance').warn(\`Slow operation: \${time}ms\`);
}

// Pattern: URL state management
const params = parseQueryString(window.location.search);
const newParams = { ...params, page: 2 };
window.history.pushState({}, '', buildQueryString(newParams));

// Pattern: Event-driven modules
const appEvents = new EventEmitter();

// Module A
appEvents.on('data:updated', refreshUI);

// Module B
appEvents.emit('data:updated', newData);`}</pre>
        </div>
      </div>
    </div>
  );
}

export default DevUtilsDemo;

