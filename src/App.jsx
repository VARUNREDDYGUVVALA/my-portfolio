import { useEffect, useState } from 'react'
import { useReducedMotion, useScroll, useTransform, motion } from 'motion/react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Download,
  GraduationCap,
  Mail,
  Menu,
  Orbit,
  Pause,
  Play,
  X,
} from 'lucide-react'
import { contact, experience, profile } from './data'
import {
  getTechnologyContext,
  orbitSystems,
  repositoryUrl,
  resumeUrl,
} from './orbitData'
import { SectionHeading, Tags } from './components/ui'
import BootSequence from './components/BootSequence'
import CommandCenter from './components/CommandCenter'
import ProjectUniverse from './components/ProjectUniverse'
import ArchitectureLab from './components/ArchitectureLab'
import McpNetwork from './components/McpNetwork'
import TechnologyConstellation from './components/TechnologyConstellation'
import OrbitTerminal from './components/OrbitTerminal'
import RecruiterProfile from './components/RecruiterProfile'
import ProjectDialog from './components/ProjectDialog'
import Modal from './components/Modal'

function stored(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}
function needsIntro() {
  try {
    return (
      !matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !sessionStorage.getItem('ai-orbit-entered') &&
      stored('orbit-view', 'command') !== 'recruiter'
    )
  } catch {
    return false
  }
}
function markEntered() {
  try {
    sessionStorage.setItem('ai-orbit-entered', 'true')
  } catch {
    /* Session storage is optional. */
  }
}
export default function App() {
  const [mode, setMode] = useState(() =>
    stored('orbit-view', 'command') === 'recruiter' ? 'recruiter' : 'command',
  )
  const [intro, setIntro] = useState(needsIntro)
  const [system, setSystem] = useState(orbitSystems[0])
  const [paused, setPaused] = useState(false)
  const [menu, setMenu] = useState(false)
  const [architecture, setArchitecture] = useState(null)
  const [project, setProject] = useState(null)
  const [technology, setTechnology] = useState(null)
  const [selectedTechnology, setSelectedTechnology] = useState('LangGraph')
  const [coreOpen, setCoreOpen] = useState(false)
  const [copied, setCopied] = useState('')
  const reduced = useReducedMotion() ?? false
  const { scrollY } = useScroll()
  const globeScale = useTransform(scrollY, [0, 850], [1, 1.6])
  const globeOpacity = useTransform(scrollY, [0, 1100], [1, 0.2])
  useEffect(() => {
    document.documentElement.dataset.view = mode
    document.documentElement.dataset.motion =
      paused || reduced ? 'paused' : 'running'
    try {
      localStorage.setItem('orbit-view', mode)
    } catch {
      /* Preference storage is optional. */
    }
  }, [mode, paused, reduced])
  useEffect(() => {
    if (!menu) return
    const close = (e) => {
      if (e.key === 'Escape') {
        setMenu(false)
        document.querySelector('.menu-toggle')?.focus()
      }
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [menu])
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(''), 3000)
    return () => clearTimeout(timer)
  }, [copied])
  function enter() {
    markEntered()
    setIntro(false)
    requestAnimationFrame(() => document.getElementById('main')?.focus())
  }
  function switchMode(next) {
    markEntered()
    setIntro(false)
    setMode(next)
    setMenu(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  function openProfile() {
    switchMode('recruiter')
    requestAnimationFrame(() =>
      document.getElementById('profile-title')?.focus(),
    )
  }
  function inspectTechnology(name) {
    setSelectedTechnology(name)
    setTechnology(name)
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied('Email copied')
    } catch {
      setCopied('Please copy the email link manually.')
    }
  }
  const navigation =
    mode === 'command'
      ? [
          ['Systems', 'home'],
          ['Projects', 'projects'],
          ['Agents', 'agents'],
          ['Skills', 'skills'],
          ['Experience', 'experience'],
        ]
      : [
          ['Projects', 'projects'],
          ['Skills', 'skills'],
          ['Experience', 'experience'],
          ['Contact', 'contact'],
        ]
  const context = technology ? getTechnologyContext(technology) : null
  return (
    <>
      {intro && (
        <BootSequence
          onEnter={enter}
          onRecruiter={() => switchMode('recruiter')}
        />
      )}
      <div className="portfolio-shell" inert={intro ? true : undefined}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="header-inner">
            <a className="orbit-brand" href="#home" aria-label="AI ORBIT home">
              <Orbit size={28} strokeWidth={1.2} />
              <span>
                AI <strong>ORBIT</strong>
                <small>VARUNREDDY GUVVALA</small>
              </span>
            </a>
            <nav
              className={`navigation ${menu ? 'is-open' : ''}`}
              id="main-nav"
              aria-label="Main navigation"
            >
              {navigation.map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                  {label}
                </a>
              ))}
            </nav>
            <div className="header-actions">
              <div
                className="view-switch"
                role="group"
                aria-label="Portfolio viewing mode"
              >
                <button
                  aria-label="Command mode"
                  aria-pressed={mode === 'command'}
                  onClick={() => switchMode('command')}
                >
                  Command<span> mode</span>
                </button>
                <button
                  aria-label="Recruiter mode"
                  aria-pressed={mode === 'recruiter'}
                  onClick={() => switchMode('recruiter')}
                >
                  Recruiter<span> mode</span>
                </button>
              </div>
              <button
                className="icon-button menu-toggle"
                aria-expanded={menu}
                aria-controls="main-nav"
                aria-label={menu ? 'Close navigation' : 'Open navigation'}
                onClick={() => setMenu(!menu)}
              >
                {menu ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </div>
        </header>
        <span className="sr-only" role="status">
          {mode === 'command' ? 'Command mode' : 'Recruiter mode'} active
        </span>
        {mode === 'recruiter' ? (
          <RecruiterProfile
            onProject={setProject}
            onArchitecture={setArchitecture}
          />
        ) : (
          <main id="main" tabIndex={-1}>
            <motion.div
              className="command-shell"
              style={
                !reduced && !paused
                  ? {
                      '--globe-scale': globeScale,
                      '--globe-opacity': globeOpacity,
                    }
                  : undefined
              }
            >
              <CommandCenter
                system={system}
                setSystem={setSystem}
                paused={paused}
                setPaused={setPaused}
                reduced={reduced}
                onTechnology={inspectTechnology}
                onArchitecture={setArchitecture}
                onProfile={openProfile}
              />
            </motion.div>
            <ProjectUniverse
              onArchitecture={setArchitecture}
              onProject={setProject}
              onTechnology={inspectTechnology}
              selectedTechnology={selectedTechnology}
            />
            <McpNetwork paused={paused} reduced={reduced} />
            <TechnologyConstellation
              selected={selectedTechnology}
              onSelect={setSelectedTechnology}
              onArchitecture={setArchitecture}
            />
            <section className="section experience-section" id="experience">
              <div className="container">
                <SectionHeading
                  number="04"
                  label="PROFESSIONAL TRAJECTORY"
                  title={
                    <>
                      Engineering depth.
                      <br />
                      <em>Across the enterprise.</em>
                    </>
                  }
                >
                  Five client engagements, four industry domains, and a
                  progression from Python and data to production AI systems.
                </SectionHeading>
                <div className="timeline">
                  {experience.map((job, index) => (
                    <article className="experience-row" key={job.company}>
                      <div className="experience-date">
                        <span className="timeline-dot" />
                        <p>{job.dates}</p>
                        <span>{job.sector}</span>
                      </div>
                      <div className="experience-content">
                        <div className="job-heading">
                          <div>
                            <p className="eyebrow">
                              CLIENT ENGAGEMENT{' '}
                              {index === 0 && (
                                <span className="current-badge">CURRENT</span>
                              )}
                            </p>
                            <h3>{job.company}</h3>
                            <p className="job-role">{job.role}</p>
                          </div>
                          <span className="job-location">{job.location}</span>
                        </div>
                        <p>{job.description}</p>
                        <div className="job-result">
                          <ArrowUpRight size={15} />
                          <strong>{job.metric}</strong>
                          {job.result}
                        </div>
                        <details>
                          <summary>
                            Explore contributions <ChevronDown size={14} />
                          </summary>
                          <ul>
                            {job.achievements.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                          <Tags items={job.tags} />
                        </details>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="orbit-education" id="education">
                  <GraduationCap size={29} strokeWidth={1.2} />
                  <div>
                    <p className="eyebrow">EDUCATION</p>
                    <h3>Bachelor of Technology in Computer Science</h3>
                    <p>Parul University · India</p>
                  </div>
                  <a className="text-button" href={resumeUrl} download>
                    Download resume (.docx) <Download size={15} />
                  </a>
                </div>
              </div>
            </section>
            <section className="github-section">
              <div className="container">
                <span className="github-icon">&lt;/&gt;</span>
                <div>
                  <p className="eyebrow">GITHUB / PORTFOLIO SOURCE</p>
                  <h2>The engineering behind this interface.</h2>
                  <p>
                    React · Vite · Tailwind CSS · Motion · Canvas · GitHub Pages
                  </p>
                </div>
                <a
                  href={repositoryUrl}
                  className="button button-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore repository <ArrowUpRight size={15} />
                </a>
              </div>
            </section>
            <OrbitTerminal
              onArchitecture={setArchitecture}
              onProfile={openProfile}
            />
            <section className="section contact-section" id="contact">
              <div className="container">
                <p className="eyebrow">
                  <span className="status-dot" /> NEXT CONNECTION
                </p>
                <div className="contact-heading">
                  <h2>
                    Let’s engineer
                    <br />
                    <em>what comes next.</em>
                  </h2>
                  <ArrowUpRight size={95} strokeWidth={0.8} />
                </div>
                <p className="contact-description">
                  A complex AI challenge, a new engineering opportunity, or a
                  conversation about reliable intelligent systems. Let’s
                  connect.
                </p>
                <div className="contact-actions">
                  <a
                    className="button button-primary"
                    href={`mailto:${contact.email}`}
                  >
                    Say hello <Mail size={17} />
                  </a>
                  <a
                    className="text-button"
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Connect on LinkedIn <ArrowUpRight size={15} />
                  </a>
                  <button className="text-button" onClick={openProfile}>
                    Open professional profile <ArrowUpRight size={15} />
                  </button>
                </div>
                <div className="email-row">
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  <button
                    className="icon-button"
                    aria-label={
                      copied === 'Email copied'
                        ? 'Email copied'
                        : 'Copy email address'
                    }
                    onClick={copyEmail}
                  >
                    {copied === 'Email copied' ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                  <span role="status">{copied}</span>
                </div>
              </div>
            </section>
          </main>
        )}
        <footer className="site-footer">
          <a className="orbit-brand" href="#home" aria-label="Back to top">
            <Orbit size={22} />
            <span>
              AI <strong>ORBIT</strong>
            </span>
          </a>
          <p>© {new Date().getFullYear()} Varunreddy Guvvala</p>
          <span>PORTFOLIO VISUALIZATION / NOT LIVE TELEMETRY</span>
          <a href="#home">
            Back to top <ArrowDown size={12} />
          </a>
        </footer>
        {mode === 'command' && (
          <div className="floating-controls">
            <button
              className="core-status"
              onClick={() => setCoreOpen(true)}
              aria-label="Open AI core system profile"
            >
              <span className="status-dot" />
              <span>
                AI CORE<small>INTERFACE ONLINE</small>
              </span>
              <ArrowUpRight size={12} />
            </button>
            <button
              className="motion-control icon-button"
              onClick={() => setPaused(!paused)}
              disabled={reduced}
              aria-label={
                reduced
                  ? 'Reduced motion enabled'
                  : paused
                    ? 'Resume all visual motion'
                    : 'Pause all visual motion'
              }
            >
              {paused || reduced ? <Play size={15} /> : <Pause size={15} />}
            </button>
          </div>
        )}
      </div>
      {architecture && (
        <ArchitectureLab
          systemId={architecture}
          onChange={setArchitecture}
          onClose={() => setArchitecture(null)}
        />
      )}
      {project && (
        <ProjectDialog project={project} onClose={() => setProject(null)} />
      )}
      {technology && (
        <Modal
          title="Technology connections"
          className="technology-modal"
          onClose={() => setTechnology(null)}
        >
          <div className="technology-modal-content">
            <p className="eyebrow">ENGINEERING ECOSYSTEM / SELECTED NODE</p>
            <h2>{technology}</h2>
            <p>{context.summary}</p>
            <h3>Connected technologies</h3>
            <div className="modal-technology-links">
              {context.related.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setTechnology(item)
                    setSelectedTechnology(item)
                  }}
                >
                  {item}
                  <ArrowUpRight size={13} />
                </button>
              ))}
            </div>
            <h3>Related professional work</h3>
            {context.projects.length ? (
              context.projects.map((id) => (
                <button
                  className="related-project-button"
                  key={id}
                  onClick={() => {
                    setTechnology(null)
                    setArchitecture(id)
                  }}
                >
                  {id === 'healthcare'
                    ? 'Cigna Healthcare'
                    : id === 'banking'
                      ? 'Regions Bank'
                      : 'Publix'}
                  <ArrowRight size={15} />
                </button>
              ))
            ) : (
              <p className="fine-print">
                Listed in the technical stack. No additional project attribution
                is invented.
              </p>
            )}
          </div>
        </Modal>
      )}
      {coreOpen && (
        <Modal
          title="AI core system profile"
          className="core-modal"
          onClose={() => setCoreOpen(false)}
        >
          <div className="core-profile">
            <Orbit size={43} strokeWidth={1} />
            <p className="eyebrow">
              <span className="status-dot" /> PORTFOLIO INTERFACE ONLINE
            </p>
            <h2>System profile</h2>
            <dl>
              <dt>SPECIALIZATION</dt>
              <dd>{profile.title}</dd>
              <dt>FOCUS</dt>
              <dd>
                Agentic AI · Generative AI · RAG · MLOps · Data engineering
              </dd>
              <dt>PLATFORMS</dt>
              <dd>AWS · Azure · GCP</dd>
              <dt>STATUS SCOPE</dt>
              <dd>
                This status describes the local portfolio interface, not the
                availability of any client production systems.
              </dd>
            </dl>
            <button
              className="button button-primary"
              onClick={() => {
                setCoreOpen(false)
                openProfile()
              }}
            >
              Open professional profile <ArrowRight size={15} />
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
