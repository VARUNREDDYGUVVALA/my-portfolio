import { useRef, useState } from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { projects } from '../data'
import { Tags } from './ui'
import SystemBlueprint from './SystemBlueprint'

const labels = ['Healthcare', 'Banking', 'Retail']
export default function DomainWorkbench({ onSelect }) {
  const [domain, setDomain] = useState(0)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const tabs = useRef([])
  const project = projects[domain]
  function tabKey(e, index) {
    let next
    if (e.key === 'ArrowRight') next = (index + 1) % 3
    if (e.key === 'ArrowLeft') next = (index + 2) % 3
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = 2
    if (next === undefined) return
    e.preventDefault()
    setDomain(next)
    tabs.current[next].focus()
  }
  const filtered = projects.filter(
    (p) =>
      (filter === 'All' || p.id === filter.toLowerCase()) &&
      `${p.title} ${p.client} ${p.tags.join(' ')}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  )
  return (
    <>
      <div className="domain-tabs" role="tablist" aria-label="Project domains">
        {labels.map((label, index) => (
          <button
            key={label}
            id={`domain-tab-${index}`}
            ref={(el) => {
              tabs.current[index] = el
            }}
            role="tab"
            aria-selected={domain === index}
            aria-controls={`domain-panel-${index}`}
            tabIndex={domain === index ? 0 : -1}
            onClick={() => setDomain(index)}
            onKeyDown={(e) => tabKey(e, index)}
          >
            <span>0{index + 1}</span>
            {label}
            <ArrowUpRight size={16} />
          </button>
        ))}
      </div>
      <div
        className="domain-panel"
        id={`domain-panel-${domain}`}
        role="tabpanel"
        aria-labelledby={`domain-tab-${domain}`}
        tabIndex={0}
      >
        <div className="domain-story">
          <p className="eyebrow">
            {project.client} / {project.category.split(' · ')[0]}
          </p>
          <h3>{project.name}</h3>
          <p className="domain-summary">{project.summary}</p>
          <div className="problem-approach">
            <div>
              <span>THE PROBLEM</span>
              <p>{project.challenge}</p>
            </div>
            <div>
              <span>THE APPROACH</span>
              <p>{project.approach}</p>
            </div>
          </div>
          <div className="domain-result">
            <strong>{project.metric}</strong>
            <span>
              {project.label}
              <small>Outcome reported in resume</small>
            </span>
          </div>
          <Tags items={project.tags} />
          <button className="text-button" onClick={() => onSelect(project)}>
            Explore the full case study <ArrowRight size={16} />
          </button>
        </div>
        <SystemBlueprint key={project.id} domain={project.id} />
      </div>
      <div className="project-register">
        <div className="register-header">
          <div>
            <p className="eyebrow">PROJECT REGISTER</p>
            <h3>Find the work that matters to you.</h3>
          </div>
          <div className="register-filters">
            <label>
              Domain
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {['All', ...labels].map((label) => (
                  <option key={label}>{label}</option>
                ))}
              </select>
            </label>
            <label>
              Search
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Technology or client"
              />
            </label>
          </div>
        </div>
        <p className="sr-only" role="status">
          {filtered.length} case studies found
        </p>
        <div className="table-scroll">
          <table>
            <caption className="sr-only">
              Filterable register of professional client case studies
            </caption>
            <thead>
              <tr>
                <th scope="col">SYSTEM / CLIENT</th>
                <th scope="col">DOMAIN</th>
                <th scope="col">REPORTED OUTCOME</th>
                <th scope="col">
                  <span className="sr-only">Open case study</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <th scope="row">
                    <strong>{p.title}</strong>
                    <span>{p.client}</span>
                  </th>
                  <td>{labels[projects.indexOf(p)]}</td>
                  <td>
                    <span className="table-metric">{p.metric}</span> {p.label}
                  </td>
                  <td>
                    <button
                      className="icon-button"
                      aria-label={`Read case study: ${p.title}`}
                      onClick={() => onSelect(p)}
                    >
                      <ArrowUpRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && (
            <div className="empty-results">
              <p>No case studies match these filters.</p>
              <button
                className="text-button"
                onClick={() => {
                  setSearch('')
                  setFilter('All')
                }}
              >
                Reset filters <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
