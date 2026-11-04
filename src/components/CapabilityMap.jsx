import { useState } from 'react'
import { skills } from '../data'
import { Tags } from './ui'

export default function CapabilityMap() {
  const [selected, setSelected] = useState(0)
  return (
    <div className="capability-layout">
      <div className="capability-map">
        <div className="map-header">
          <span>CAPABILITY TOPOLOGY</span>
          <span>04 CONNECTED LAYERS</span>
        </div>
        <div className="radar-art" aria-hidden="true">
          <svg viewBox="0 0 360 310">
            <g fill="none" stroke="currentColor">
              <circle cx="180" cy="155" r="110" />
              <circle cx="180" cy="155" r="76" />
              <circle cx="180" cy="155" r="42" />
              <path
                d="M180 45V265M70 155H290M103 78L257 232M103 232L257 78"
                strokeDasharray="3 7"
              />
              <path
                d="M180 45L290 155L180 265L70 155Z"
                className="radar-diamond"
              />
            </g>
            <g className="radar-markers">
              {[
                [180, 45],
                [290, 155],
                [180, 265],
                [70, 155],
              ].map(([x, y], index) => (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r={index === selected ? 8 : 4}
                  className={index === selected ? 'selected' : ''}
                />
              ))}
            </g>
            <text x="180" y="152" textAnchor="middle" className="radar-name">
              PYTHON
            </text>
            <text
              x="180"
              y="170"
              textAnchor="middle"
              className="radar-subtitle"
            >
              AT THE CORE
            </text>
            <text x="180" y="22" textAnchor="middle">
              GEN AI
            </text>
            <text x="326" y="159" textAnchor="middle">
              ML
            </text>
            <text x="180" y="294" textAnchor="middle">
              DATA
            </text>
            <text x="28" y="159" textAnchor="middle">
              CLOUD
            </text>
          </svg>
        </div>
        <p className="fine-print">
          Connected capabilities, not proficiency scores.
        </p>
      </div>
      <div className="capability-content">
        <div
          className="capability-select"
          role="group"
          aria-label="Explore technical capabilities"
        >
          {skills.map((skill, index) => (
            <button
              key={skill.title}
              aria-pressed={index === selected}
              onClick={() => setSelected(index)}
            >
              <span>0{index + 1}</span>
              {skill.title}
            </button>
          ))}
        </div>
        <div className="capability-detail" aria-live="polite">
          <p className="eyebrow">LAYER 0{selected + 1}</p>
          <h3>{skills[selected].title}</h3>
          <p>{skills[selected].description}</p>
          <Tags items={skills[selected].items} />
        </div>
      </div>
    </div>
  )
}
