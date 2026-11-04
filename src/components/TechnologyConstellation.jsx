import { ArrowRight } from 'lucide-react'
import { constellations, getTechnologyContext } from '../orbitData'
import { projects } from '../data'
import { SectionHeading } from './ui'
export default function TechnologyConstellation({
  selected,
  onSelect,
  onArchitecture,
}) {
  const context = getTechnologyContext(selected)
  return (
    <section className="section constellation-section" id="skills">
      <div className="container">
        <SectionHeading
          number="03"
          label="TECHNOLOGY CONSTELLATION"
          title={
            <>
              Python at the center.
              <br />
              <em>Connections everywhere.</em>
            </>
          }
        >
          Hover, focus, or select a technology to reveal its relationships and
          the client work where it appears. No invented proficiency scores.
        </SectionHeading>
        <div className="constellation-layout">
          <div className="constellation-map">
            <div className="constellation-core">
              <span>THE FOUNDATION</span>
              <strong>PYTHON</strong>
              <span>AI / DATA / SYSTEMS</span>
            </div>
            <svg
              className="constellation-lines"
              viewBox="0 0 800 500"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <g fill="none" stroke="currentColor">
                <path d="M400 215L120 85M400 215L400 65M400 215L680 85M400 215L190 390M400 215L610 390" />
                <circle cx="400" cy="215" r="70" />
                <circle cx="400" cy="215" r="110" strokeDasharray="2 8" />
              </g>
            </svg>
            {constellations.map((group, index) => (
              <div
                className={`constellation-group constellation-group-${index}`}
                key={group.name}
                style={{ '--group-color': group.color }}
              >
                <h3>
                  <i />
                  {group.name}
                </h3>
                {group.items.map((tech) => (
                  <button
                    key={tech}
                    aria-label={tech}
                    aria-pressed={selected === tech}
                    className={
                      context.related.includes(tech) ? 'is-related' : ''
                    }
                    onMouseEnter={() => onSelect(tech)}
                    onFocus={() => onSelect(tech)}
                    onClick={() => onSelect(tech)}
                  >
                    {tech}
                    <span>
                      {selected === tech
                        ? '●'
                        : context.related.includes(tech)
                          ? '↗'
                          : '·'}
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>
          <aside className="technology-inspector" aria-live="polite">
            <p className="eyebrow">SELECTED NODE</p>
            <h3>{selected}</h3>
            <p>{context.summary}</p>
            <span className="micro-label">CONNECTED TECHNOLOGIES</span>
            <div className="inspector-links">
              {context.related.map((tech) => (
                <button key={tech} onClick={() => onSelect(tech)}>
                  {tech}
                  <ArrowRight size={11} />
                </button>
              ))}
            </div>
            <span className="micro-label">RELATED CLIENT WORK</span>
            <div className="related-work">
              {context.projects.length ? (
                context.projects.map((id) => {
                  const project = projects.find((p) => p.id === id)
                  return (
                    <button key={id} onClick={() => onArchitecture(id)}>
                      <span>{project.client}</span>
                      {project.title}
                      <ArrowRight size={13} />
                    </button>
                  )
                })
              ) : (
                <p>
                  Listed in the supplied technical skills. No specific project
                  attribution is added.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
