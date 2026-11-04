import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Database,
  Network,
  Search,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import { SectionHeading } from './ui'
const agents = [
  ['Claims context', 'Prepare validated claims and eligibility context.'],
  [
    'Policy retrieval',
    'Retrieve approved healthcare knowledge and policy context.',
  ],
  ['Response validation', 'Check grounding and structured response behavior.'],
  [
    'Data preparation',
    'Validate, transform, and reconcile operational inputs.',
  ],
]
const tools = [
  ['Search', Search],
  ['Database', Database],
  ['Enterprise API', Network],
  ['Knowledge services', Workflow],
]
const trace = [
  'User request',
  'LangGraph orchestration',
  'Selected capability',
  'MCP interface',
  'Authorized tool',
  'Human review',
  'Grounded response',
]
export default function McpNetwork({ paused, reduced }) {
  const [agent, setAgent] = useState(1),
    [tool, setTool] = useState(0),
    [step, setStep] = useState(0),
    [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (!playing || paused || step === 6) return
    const timer = setInterval(() => setStep((s) => Math.min(s + 1, 6)), 600)
    return () => clearInterval(timer)
  }, [playing, paused, step])
  const complete = step === 6
  function start() {
    setStep(reduced ? 6 : 0)
    setPlaying(!reduced)
  }
  return (
    <section className="section mcp-section" id="agents">
      <div className="container">
        <SectionHeading
          number="02"
          label="MULTI-STEP AGENT SYSTEMS"
          title={
            <>
              Give intelligence tools.
              <br />
              <em>Keep control in the loop.</em>
            </>
          }
        >
          An illustrative view of LangGraph orchestration, MCP tool interfaces,
          and human review. Functional labels explain responsibilities; they are
          not claims about internal agent names.
        </SectionHeading>
        <div className="mcp-workbench">
          <div className="panel-heading">
            <span>ORCHESTRATION EXPLORER</span>
            <span>LOCAL WALKTHROUGH / NO MODEL CALLS</span>
          </div>
          <div className="mcp-supervisor">
            <Workflow size={22} />
            <div>
              <span>LANGGRAPH ORCHESTRATION</span>
              <p>State · routing · structured outputs</p>
            </div>
            <span className="connection-point" />
          </div>
          <div
            className="agent-branches"
            role="group"
            aria-label="Explore agent responsibilities"
          >
            {agents.map(([label, description], i) => (
              <button
                key={label}
                aria-pressed={agent === i}
                onClick={() => setAgent(i)}
              >
                <span>0{i + 1}</span>
                <strong>{label}</strong>
                <small>{description}</small>
              </button>
            ))}
          </div>
          <div className="mcp-gateway">
            <span className="connection-point" />
            <Network size={22} />
            <div>
              <strong>PYTHON MCP INTERFACES</strong>
              <p>Authorized discovery & controlled tool execution</p>
            </div>
            <ShieldCheck size={18} />
          </div>
          <div
            className="tool-branches"
            role="group"
            aria-label="Explore connected tools"
          >
            {tools.map(([label, Icon], i) => (
              <button
                key={label}
                aria-pressed={tool === i}
                onClick={() => setTool(i)}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
          <div className="mcp-trace">
            <div className="mcp-trace-heading">
              <div>
                <span className="micro-label">ILLUSTRATIVE REQUEST PATH</span>
                <p>
                  {agents[agent][0]} → {tools[tool][0]}
                </p>
              </div>
              <button className="button button-secondary" onClick={start}>
                {playing && !complete ? 'Restart request' : 'Trace a request'}
                <ArrowRight size={14} />
              </button>
            </div>
            <ol className="request-path">
              {trace.map((item, i) => (
                <li
                  key={item}
                  className={`${i === step ? 'is-current' : ''} ${i < step ? 'is-complete' : ''}`}
                >
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
            <p className="trace-announcement" aria-live="polite">
              {complete
                ? 'Walkthrough complete. This was a local visualization, not a real healthcare request.'
                : `${playing ? 'Tracing' : 'Ready'}: ${trace[step]}. ${paused && playing ? 'Visual motion is paused.' : ''}`}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
