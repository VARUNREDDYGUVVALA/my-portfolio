import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  GraduationCap,
  Mail,
  Menu,
  Moon,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react'
import { contact, experience, profile } from './data'
import { ExternalLink, Reveal, SectionHeading, Tags } from './components/ui'
import SystemBlueprint from './components/SystemBlueprint'
import DomainWorkbench from './components/DomainWorkbench'
import AgentTrace from './components/AgentTrace'
import CapabilityMap from './components/CapabilityMap'
import ProjectDialog from './components/ProjectDialog'

const nav = [
  ['Work', 'projects'],
  ['Approach', 'approach'],
  ['Expertise', 'skills'],
  ['Experience', 'experience'],
]
function initialTheme() {
  try {
    return localStorage.getItem('portfolio-theme') === 'light'
      ? 'light'
      : 'dark'
  } catch {
    return 'dark'
  }
}
export default function App() {
  const [theme, setTheme] = useState(initialTheme)
  const [menu, setMenu] = useState(false)
  const [active, setActive] = useState('')
  const [selected, setSelected] = useState(null)
  const [copyState, setCopyState] = useState('')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      /* Storage can be unavailable in private browsing. */
    }
  }, [theme])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        }),
      { rootMargin: '-15% 0px -65% 0px' },
    )
    document
      .querySelectorAll('main section[id]')
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
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
    if (!copyState) return
    const timer = setTimeout(() => setCopyState(''), 3000)
    return () => clearTimeout(timer)
  }, [copyState])
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopyState('Copied to clipboard')
    } catch {
      setCopyState('Please copy the email link manually.')
    }
  }
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a
            href="#home"
            className="brand"
            aria-label="Varunreddy Guvvala home"
          >
            <span className="brand-mark">
              vg<span>_</span>
            </span>
            <span className="brand-label">
              VARUNREDDY GUVVALA<small>AI / ML ENGINEERING</small>
            </span>
          </a>
          <nav
            id="main-nav"
            className={menu ? 'navigation is-open' : 'navigation'}
            aria-label="Main navigation"
          >
            {nav.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? 'location' : undefined}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
            <a
              className="nav-contact"
              href="#contact"
              onClick={() => setMenu(false)}
            >
              Let’s connect <ArrowUpRight size={14} />
            </a>
          </nav>
          <div className="header-controls">
            <button
              className="icon-button theme-toggle"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="icon-button menu-toggle"
              aria-label={menu ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menu}
              aria-controls="main-nav"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero blueprint-grid" id="home">
          <div className="container">
            <div className="sheet-meta">
              <span>PERSONAL PORTFOLIO / SYSTEMS & INTELLIGENCE</span>
              <span>
                DRAWING NO. VG—001 <i /> AWS · AZURE · GCP
              </span>
            </div>
            <div className="hero-grid">
              <Reveal className="hero-copy">
                <p className="eyebrow">
                  <span className="status-dot" /> {profile.title.toUpperCase()}
                </p>
                <h1>
                  Complexity in.
                  <br />
                  <em>Intelligence out.</em>
                </h1>
                <p className="hero-name">
                  I’m <strong>Varunreddy Guvvala.</strong>
                </p>
                <p className="hero-description">{profile.summary}</p>
                <div className="hero-actions">
                  <a className="button button-primary" href="#projects">
                    Explore the systems <ArrowUpRight size={18} />
                  </a>
                  <a className="text-button" href="#approach">
                    Follow the workflow <ArrowRight size={16} />
                  </a>
                </div>
                <div className="hero-footnote">
                  <ShieldCheck size={15} />
                  <span>
                    Designed for regulated environments. <br />
                    Engineered for production.
                  </span>
                </div>
              </Reveal>
              <Reveal className="hero-schematic">
                <SystemBlueprint compact />
              </Reveal>
            </div>
            <div className="hero-caption">
              <span>GOOD AI IS A SYSTEM, NOT JUST A MODEL.</span>
              <a href="#projects">
                Explore below <ArrowDown size={14} />
              </a>
            </div>
          </div>
        </section>
        <section
          className="metrics-section"
          aria-label="Professional highlights"
        >
          <div className="container">
            <div className="metrics-label">
              <span className="status-dot" /> PROFESSIONAL SIGNALS{' '}
              <span>RESUME-REPORTED · NOT LIVE TELEMETRY</span>
            </div>
            <div className="metrics-grid">
              {[
                ['35%', 'Better knowledge retrieval', 'Cigna Healthcare / AWS'],
                [
                  '20%',
                  'Higher fraud-detection precision',
                  'Regions Bank / Azure',
                ],
                ['3', 'Cloud platforms', 'AWS · Azure · GCP'],
                [
                  '4',
                  'Industry domains',
                  'Healthcare · Banking · Retail · Public sector',
                ],
              ].map(([value, label, note], index) => (
                <div className="metric-tile" key={label}>
                  <span className="metric-index">
                    0{index + 1}
                    <ArrowUpRight size={13} />
                  </span>
                  <strong>{value}</strong>
                  <h2>{label}</h2>
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section work-section" id="projects">
          <div className="container">
            <Reveal>
              <SectionHeading
                number="01"
                label="SYSTEMS IN CONTEXT"
                title={
                  <>
                    Different domains.
                    <br />
                    <em>Deliberate architecture.</em>
                  </>
                }
              >
                Explore the problem, the design, and the reported outcome.
                Select any diagram component to see how it fits.
              </SectionHeading>
            </Reveal>
            <DomainWorkbench onSelect={setSelected} />
          </div>
        </section>
        <section className="section about-section" id="about">
          <div className="container about-layout">
            <Reveal>
              <p className="eyebrow">
                <span>02</span> ENGINEERING PERSPECTIVE
              </p>
              <h2>
                The model is only
                <br />
                <em>the beginning.</em>
              </h2>
              <p className="editorial-statement">
                The real work is connecting intelligence to the systems, people,
                and decisions it needs to serve.
              </p>
              <p className="statement-attribution">
                MY APPROACH TO ENTERPRISE AI
              </p>
            </Reveal>
            <Reveal className="about-copy">
              <p>
                I’m a Python engineer working at the intersection of enterprise
                Generative AI, Agentic AI, and machine learning. My recent work
                focuses on AWS-native systems using Amazon Bedrock, Claude,
                FastAPI, and OpenSearch.
              </p>
              <p>
                Across healthcare, banking, retail, and public-sector
                engagements, I’ve built the layers around the model: validated
                data, secure APIs, retrieval, evaluation, deployment, and
                observability.
              </p>
              <div className="principle-list">
                {[
                  [
                    '01',
                    'Ground the response',
                    'Approved context, relevant retrieval, and response validation.',
                  ],
                  [
                    '02',
                    'Govern the action',
                    'Authorized tools, structured outputs, and human review.',
                  ],
                  [
                    '03',
                    'Own the production path',
                    'Repeatable releases, clear monitoring, and maintainable Python.',
                  ],
                ].map(([number, title, text]) => (
                  <div key={number}>
                    <span>{number}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        <section className="section trace-section" id="approach">
          <div className="container">
            <Reveal>
              <SectionHeading
                number="03"
                label="FROM CONTEXT TO ACTION"
                title={
                  <>
                    An agent workflow.
                    <br />
                    <em>With accountability built in.</em>
                  </>
                }
              >
                Step through an illustrative workflow based on the LangGraph,
                MCP, and human-review practices in my resume.
              </SectionHeading>
            </Reveal>
            <AgentTrace />
          </div>
        </section>
        <section className="section skills-section" id="skills">
          <div className="container">
            <Reveal>
              <SectionHeading
                number="04"
                label="TECHNICAL CAPABILITIES"
                title={
                  <>
                    One connected system.
                    <br />
                    <em>Multiple layers of depth.</em>
                  </>
                }
              >
                Python is the foundation. AI, data, cloud, and delivery are the
                connected layers. Explore the stack by capability.
              </SectionHeading>
            </Reveal>
            <CapabilityMap />
          </div>
        </section>
        <section className="section experience-section" id="experience">
          <div className="container">
            <Reveal>
              <SectionHeading
                number="05"
                label="PROFESSIONAL EXPERIENCE"
                title={
                  <>
                    A career built
                    <br />
                    <em>across the stack.</em>
                  </>
                }
              >
                Five client engagements. A progression from Python and data
                systems to enterprise AI delivery.
              </SectionHeading>
            </Reveal>
            <div className="timeline">
              {experience.map((job, index) => (
                <Reveal className="experience-row" key={job.company}>
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
                      <ArrowUpRight size={16} />
                      <strong>{job.metric}</strong> {job.result}
                    </div>
                    <details>
                      <summary>
                        Explore contributions <ChevronDown size={15} />
                      </summary>
                      <ul>
                        {job.achievements.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <Tags items={job.tags} />
                    </details>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section className="education-section" id="education">
          <div className="container education-inner">
            <div>
              <p className="eyebrow">
                <span>06</span> EDUCATION
              </p>
              <h2>Foundations that last.</h2>
            </div>
            <div className="education-detail">
              <span className="education-icon">
                <GraduationCap size={29} strokeWidth={1.4} />
              </span>
              <div>
                <h3>Bachelor of Technology</h3>
                <p>Computer Science</p>
                <span>Parul University · India</span>
              </div>
            </div>
          </div>
        </section>
        <section
          className="section contact-section blueprint-grid"
          id="contact"
        >
          <div className="container">
            <Reveal>
              <p className="eyebrow">
                <span>07</span> THE NEXT SYSTEM STARTS WITH A CONVERSATION
              </p>
              <div className="contact-heading">
                <h2>
                  What are
                  <br />
                  <em>we building next?</em>
                </h2>
                <ArrowUpRight size={110} strokeWidth={0.8} />
              </div>
              <p className="contact-description">
                An enterprise AI challenge, an engineering opportunity, or a
                conversation about what comes next. I’d like to hear about it.
              </p>
              <div className="contact-actions">
                <a
                  className="button button-primary"
                  href={`mailto:${contact.email}`}
                >
                  Say hello <Mail size={18} />
                </a>
                <ExternalLink href={contact.linkedin}>
                  Connect on LinkedIn
                </ExternalLink>
              </div>
              <div className="email-row">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <button
                  className="icon-button"
                  aria-label={
                    copyState === 'Copied to clipboard'
                      ? 'Email copied'
                      : 'Copy email address'
                  }
                  onClick={copyEmail}
                >
                  {copyState === 'Copied to clipboard' ? (
                    <Check size={17} />
                  ) : (
                    <Copy size={17} />
                  )}
                </button>
                <span role="status">{copyState}</span>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <a href="#home" className="footer-brand" aria-label="Back to top">
            vg<span>_</span>
          </a>
          <p>© {new Date().getFullYear()} Varunreddy Guvvala</p>
          <span className="footer-note">
            ARCHITECTURE / INTELLIGENCE / IMPACT
          </span>
          <a href="#home">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
      {selected && (
        <ProjectDialog project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
