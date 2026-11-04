import { useState } from 'react'
import { ArrowDown, ArrowRight, Crosshair } from 'lucide-react'
import { systems } from '../data'
import { iconMap } from './icons'

export default function SystemBlueprint({
  domain = 'healthcare',
  compact = false,
}) {
  const [selected, setSelected] = useState(0)
  const nodes = systems[domain]
  const node = nodes[selected]
  return (
    <div className={`blueprint ${compact ? 'blueprint-compact' : ''}`}>
      <div className="blueprint-toolbar">
        <span>
          <Crosshair size={13} /> SYSTEM SCHEMATIC
        </span>
        <span>
          FIG.{' '}
          {domain === 'healthcare' ? '01' : domain === 'banking' ? '02' : '03'}
        </span>
      </div>
      <div className="blueprint-canvas">
        <div className="input-label">
          <span />{' '}
          {domain === 'healthcare'
            ? 'USER REQUEST / APPROVED CONTEXT'
            : 'VALIDATED DATA / BUSINESS CONTEXT'}{' '}
          <ArrowDown size={12} />
        </div>
        <div
          className="system-nodes"
          role="group"
          aria-label={`${domain} architecture components`}
        >
          {nodes.map((item, index) => {
            const Icon = iconMap[item.icon]
            return (
              <button
                key={item.label}
                className={`system-node node-${index}`}
                aria-pressed={index === selected}
                onClick={() => setSelected(index)}
              >
                <span className="node-type">
                  {String(index + 1).padStart(2, '0')} / {item.type}
                </span>
                <div>
                  <Icon size={21} strokeWidth={1.4} />
                  <strong>{item.label}</strong>
                </div>
                <span className="node-inspect">
                  INSPECT <ArrowRight size={10} />
                </span>
              </button>
            )
          })}
        </div>
        <div className="blueprint-dimensions">
          <span>PYTHON / ENTERPRISE SYSTEMS</span>
          <span>SELECT A COMPONENT ↑</span>
        </div>
      </div>
      <div className="node-detail" aria-live="polite">
        <div>
          <span className="detail-marker">
            {String(selected + 1).padStart(2, '0')}
          </span>
          <h3>{node.label}</h3>
        </div>
        <p>{node.detail}</p>
        <span className="node-technologies">{node.technology}</span>
      </div>
      <p className="blueprint-caption">
        Conceptual architecture derived from resume experience. Not an internal
        client diagram.
      </p>
    </div>
  )
}
