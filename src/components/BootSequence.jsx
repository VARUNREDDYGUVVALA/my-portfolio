import { useEffect, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
const lines = [
  'CONNECTING DATA LAYER',
  'LOADING AGENT NETWORK',
  'INITIALIZING RAG ENGINE',
  'CONNECTING CLOUD INFRASTRUCTURE',
  'INTERFACE ONLINE',
]
export default function BootSequence({ onEnter, onRecruiter }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setStep((s) => Math.min(s + 1, 5)), 430)
    return () => clearInterval(timer)
  }, [])
  return (
    <div
      className="boot-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="AI ORBIT introduction"
      onKeyDown={(e) => {
        if (e.key !== 'Tab') return
        const buttons = e.currentTarget.querySelectorAll('button')
        const first = buttons[0],
          last = buttons[buttons.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }}
    >
      <div className="boot-top">
        <span>AI ORBIT / INTERFACE INITIALIZATION</span>
        <div>
          <button onClick={onRecruiter}>Recruiter view</button>
          <button autoFocus onClick={onEnter}>
            Skip intro <ArrowRight size={14} />
          </button>
        </div>
      </div>
      <div className="boot-content">
        <div className="boot-sphere" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="eyebrow">
          INITIALIZING AI SYSTEMS<span className="boot-cursor">_</span>
        </p>
        <div className="boot-log">
          {lines.slice(0, step).map((line) => (
            <p key={line}>
              <Check size={11} />
              {line}
            </p>
          ))}
        </div>
        <h2>
          VARUNREDDY
          <br />
          <span>GUVVALA</span>
        </h2>
        <p className="boot-role">Senior Python AI/ML Engineer</p>
        <button className="button button-primary" onClick={onEnter}>
          Enter command center <ArrowRight size={16} />
        </button>
        <p className="boot-disclaimer">
          A portfolio experience. No production systems are being connected.
        </p>
      </div>
      <div className="boot-progress">
        <span style={{ width: `${Math.max(5, step * 20)}%` }} />
      </div>
    </div>
  )
}
