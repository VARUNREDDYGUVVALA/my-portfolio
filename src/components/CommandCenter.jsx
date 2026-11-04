import {
  ArrowRight,
  ArrowUpRight,
  Crosshair,
  Maximize2,
  Pause,
  Play,
} from 'lucide-react'
import { orbitLayers, orbitSystems, telemetry } from '../orbitData'
import GlobeScene from './GlobeScene'

export default function CommandCenter({
  system,
  setSystem,
  paused,
  setPaused,
  reduced,
  onTechnology,
  onArchitecture,
  onProfile,
}) {
  return (
    <section id="home" className="command-center">
      <div className="command-heading">
        <div>
          <p className="eyebrow">
            <span className="status-dot" /> PERSONAL ENGINEERING ECOSYSTEM
          </p>
          <h1>
            VARUNREDDY <span>GUVVALA</span>
          </h1>
          <p className="command-subtitle">
            Senior Python AI/ML Engineer
            <span>Engineering intelligent systems that scale.</span>
          </p>
        </div>
        <div className="command-heading-actions">
          <button className="text-button" onClick={onProfile}>
            Open profile <ArrowUpRight size={14} />
          </button>
          <span className="interface-label">PORTFOLIO INTERFACE / v04</span>
        </div>
      </div>
      <div className="telemetry-bar" aria-label="Engineering disciplines">
        {telemetry.map(([label, stack], index) => (
          <div key={label}>
            <span>
              {String(index + 1).padStart(2, '0')} / {label}
            </span>
            <strong>{stack}</strong>
            <svg className="waveform" viewBox="0 0 120 16" aria-hidden="true">
              <path d="M0 9H14L19 5L24 12L29 3L35 10H52L58 5L63 12L68 7H84L91 3L97 12L103 8H120" />
            </svg>
          </div>
        ))}
      </div>
      <div className="command-grid">
        <aside className="system-selector">
          <div className="panel-heading">
            <span>AI SYSTEMS</span>
            <Crosshair size={13} />
          </div>
          <p className="panel-description">Select an engineering workstream.</p>
          <div
            className="system-options"
            role="group"
            aria-label="Select engineering system"
          >
            {orbitSystems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSystem(item)}
                aria-pressed={system.id === item.id}
              >
                <span className="system-number">{item.number}</span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.client}</small>
                </span>
                <ArrowUpRight size={12} />
              </button>
            ))}
          </div>
          <div className="system-footer">
            <span>SELECTED CONTEXT</span>
            <h2>{system.client}</h2>
            <p>{system.description}</p>
            <button
              className="text-button"
              onClick={() => onArchitecture(system.id)}
            >
              Explore architecture <ArrowRight size={14} />
            </button>
          </div>
        </aside>
        <div className="globe-panel">
          <div className="globe-panel-top">
            <span>
              <span className="status-dot" /> GLOBAL INTELLIGENCE MAP
            </span>
            <button
              className="icon-button"
              aria-label={
                paused ? 'Resume visual motion' : 'Pause visual motion'
              }
              onClick={() => setPaused(!paused)}
              disabled={reduced}
            >
              {paused || reduced ? <Play size={13} /> : <Pause size={13} />}
            </button>
          </div>
          <GlobeScene
            paused={paused}
            reduced={reduced}
            system={system}
            onTechnology={onTechnology}
            onArchitecture={onArchitecture}
          />
          <div
            className="orbital-legend"
            role="group"
            aria-label="Explore orbital layers"
          >
            {orbitLayers.map((layer) => (
              <button
                key={layer.id}
                style={{ '--layer-color': layer.color }}
                onClick={() => onTechnology(layer.technologies[0])}
              >
                <i />
                {layer.name}
              </button>
            ))}
          </div>
          <div
            className="globe-shortcuts"
            role="group"
            aria-label="Navigate architecture from globe"
          >
            {[
              ['RAG', 'healthcare'],
              ['MCP', 'agents'],
              ['MLOps', 'banking'],
            ].map(([label, id]) => (
              <button key={id} onClick={() => onArchitecture(id)}>
                {label}
                <ArrowUpRight size={11} />
              </button>
            ))}
          </div>
          <button
            className="expand-architecture"
            onClick={() => onArchitecture(system.id)}
          >
            <Maximize2 size={12} /> ENTER ARCHITECTURE MODE
          </button>
        </div>
        <aside className="intelligence-panel">
          <div className="panel-heading">
            <span>SYSTEM INTELLIGENCE</span>
            <span className="status-dot" />
          </div>
          <div className="intelligence-section">
            <p className="micro-label">ACTIVE STACK / SELECTED WORKSTREAM</p>
            <div className="active-stack">
              {system.tags.map((tech, i) => (
                <button key={tech} onClick={() => onTechnology(tech)}>
                  <span>0{i + 1}</span>
                  {tech}
                  <ArrowUpRight size={11} />
                </button>
              ))}
            </div>
          </div>
          <div className="intelligence-section">
            <p className="micro-label">SYSTEM CAPABILITIES</p>
            <div className="capability-buttons">
              {system.capabilities.map((item) => (
                <button key={item} onClick={() => onTechnology(item)}>
                  {item}
                  <ArrowUpRight size={11} />
                </button>
              ))}
            </div>
          </div>
          <div className="interface-notice">
            <span className="status-dot" />
            <p>
              Interactive portfolio.
              <br />
              Not live production telemetry.
            </p>
          </div>
        </aside>
      </div>
      <div
        className="flow-strip"
        aria-label={`${system.name} conceptual workflow`}
      >
        <span>CONCEPTUAL DATA FLOW</span>
        <ol>
          {system.flow.map((label, i) => (
            <li key={label}>
              <span>{label}</span>
              {i < system.flow.length - 1 && <ArrowRight size={11} />}
            </li>
          ))}
        </ol>
      </div>
      <a className="universe-scroll" href="#projects">
        <span>SCROLL TO PROJECT UNIVERSE</span>
        <ArrowRight size={13} />
      </a>
    </section>
  )
}
