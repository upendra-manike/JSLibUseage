import React from 'react'
import './Demo.css'

const sections = [
  {
    title: 'System Design & Architecture',
    items: [
      { problem: 'Boundary drift between monolith, modular monolith, and microservices', solution: 'Pick topology per domain maturity, deployment cadence, and team size. Split only when bounded contexts are well understood.' },
      { problem: 'Unclear service seams and chatty services', solution: 'Model services around business capabilities. Prefer async domain events for fan-out and user-facing sync calls for immediacy.' },
      { problem: 'API version regressions and protocol sprawl', solution: 'Use additive contracts, contract tests, and documented sunset dates. Default to REST+JSON; adopt GraphQL/gRPC only when use-cases require.' },
      { problem: 'Distributed race conditions & eventual consistency', solution: 'Use optimistic locking, idempotent handlers, and communicate freshness (timestamps, badges) to users.' },
      { problem: 'Cross-service transactions and cascading failures', solution: 'Model workflows as sagas with compensations. Add circuit breakers, retries with jitter, and per-service budgets.' },
      { problem: 'Observability gaps in distributed systems', solution: 'Standardize trace IDs, structured logs, and SLIs tied to business journeys.' }
    ]
  },
  {
    title: 'Performance & Scalability',
    items: [
      { problem: 'Central bottlenecks and resource contention', solution: 'Profile hotspots, shard workloads, and isolate heavy tenants via rate limiting and workload separation.' },
      { problem: 'Traffic spikes & thundering herds', solution: 'Warm spare capacity, implement load shedding, request queues, and exponential backoff clients.' },
      { problem: 'Multi-region database latency', solution: 'Use leader/follower per region with locality-aware reads plus eventual consistency messaging.' },
      { problem: 'Cache coherence & invalidation', solution: 'Version cache keys, emit domain events for invalidation, and keep data ownership clear.' }
    ]
  },
  {
    title: 'Data & Storage',
    items: [
      { problem: 'Wrong database choice and schema migrations', solution: 'Align storage tech with access patterns, run expand/contract migrations, and stage changes.' },
      { problem: 'Data duplication and loss during rollbacks', solution: 'Declare authoritative sources, use CDC pipelines, and automate tested backup/restore playbooks.' },
      { problem: 'Real-time analytics hurting OLTP', solution: 'Offload via CDC into OLAP stores or streaming warehouses to keep transactional paths lean.' }
    ]
  },
  {
    title: 'Security',
    items: [
      { problem: 'Fragmented authentication & authorization', solution: 'Adopt centralized IdP (OIDC) and policy engines (OPA/ABAC) propagated to every request.' },
      { problem: 'Secrets and dependency risk', solution: 'Store secrets in a vault with automatic rotation, maintain SBOMs, and gate builds on CVE severity.' },
      { problem: 'Sensitive data leakage in logs', solution: 'Mask PII at log producers, add log schemas, and restrict sink access.' }
    ]
  },
  {
    title: 'Integration & Communication',
    items: [
      { problem: '3rd-party instability & webhook retries', solution: 'Wrap calls with retries, circuit breakers, fallback caches, and idempotency keys per delivery.' },
      { problem: 'Offline sync conflicts and unstable networks', solution: 'Record change vectors, surface conflict UIs, and use resumable transfers with exponential backoff.' },
      { problem: 'Distributed workflow brittleness', solution: 'Use orchestrators (Temporal) or well-documented choreography, enforcing idempotent steps.' }
    ]
  },
  {
    title: 'Deployment & DevOps',
    items: [
      { problem: 'Coordinated multi-service releases & DB migrations', solution: 'Use release trains, schema-first deployments, and feature flags to decouple rollout from release.' },
      { problem: 'Kubernetes debugging & autoscaling drift', solution: 'Automate runbooks, collect pod/node diagnostics, and externalize session state for scaled pods.' },
      { problem: 'Config drift across environments', solution: 'Manage infra/config as code with versioned changes, automated drift detection, and promotion pipelines.' }
    ]
  },
  {
    title: 'Frontend ↔ Backend & Teams',
    items: [
      { problem: 'Breaking backend changes hitting UI', solution: 'Adopt versioned APIs, generated clients, and contract testing (e.g., Pact).' },
      { problem: 'Feature flag chaos across layers', solution: 'Centralize flag service, expose eval SDKs for FE/BE, and document rollout plans.' },
      { problem: 'Cross-team misalignment & knowledge loss', solution: 'Create architecture decision records, service catalogs with owners, and cross-training rituals.' }
    ]
  }
]

function ArchitectureChallenges() {
  return (
    <div className="demo-content">
      <div className="demo-section">
        <h3>Full-Stack Architecture Problem Map</h3>
        <p>
          Curated list of recurrent technical challenges across system design, scalability, security, and collaboration.
          Each item highlights the core pain point and the pragmatic mitigation.
        </p>
      </div>

      {sections.map(section => (
        <div key={section.title} className="demo-section">
          <h3>{section.title}</h3>
          <div className="challenge-grid">
            {section.items.map(item => (
              <div key={item.problem} className="challenge-card">
                <div className="challenge-problem">
                  <span className="label">Problem</span>
                  <p>{item.problem}</p>
                </div>
                <div className="challenge-solution">
                  <span className="label">Solution</span>
                  <p>{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArchitectureChallenges



