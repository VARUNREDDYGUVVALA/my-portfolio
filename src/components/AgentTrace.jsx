import { useState } from 'react'
import { ArrowRight, RotateCcw, Check } from 'lucide-react'
import { traceSteps } from '../data'
import { iconMap } from './icons'

export default function AgentTrace() {
  const [step, setStep] = useState(0)
  const current = traceSteps[step]
  const Icon = iconMap[current.icon]
  return (
    <div className="trace-viewer">
      <div className="panel-toolbar">
        <span>
          <span className="status-dot" /> WORKFLOW EXPLORER
        </span>
        <span>ILLUSTRATIVE · NOT A LIVE AGENT</span>
      </div>
      <div className="trace-layout">
        <div
          className="trace-steps"
          role="group"
          aria-label="Explore agent workflow"
        >
          {traceSteps.map((item, index) => (
            <button
              key={item.label}
              aria-pressed={step === index}
              onClick={() => setStep(index)}
            >
              <span className="trace-step-number">
                {index < step ? (
                  <Check size={14} />
                ) : (
                  String(index + 1).padStart(2, '0')
                )}
              </span>
              <span>
                {item.label}
                <small>{item.code.split(' / ')[1]}</small>
              </span>
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
        <div className="trace-detail" aria-live="polite">
          <p className="eyebrow">{current.code}</p>
          <Icon size={31} strokeWidth={1.3} />
          <h3>{current.title}</h3>
          <p>{current.detail}</p>
          <span className="trace-evidence">{current.evidence}</span>
          <div className="trace-controls">
            <span>STEP {step + 1} OF 4</span>
            <button
              className="text-button"
              onClick={() => setStep(step === 3 ? 0 : step + 1)}
            >
              {step === 3 ? (
                <>
                  Restart walkthrough <RotateCcw size={15} />
                </>
              ) : (
                <>
                  Next step <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
