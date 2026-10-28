import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Check,
  ChevronDown,
  X,
  Menu,
  Mail,
  ContactRound,
  BrainCircuit,
  Database,
  Layers3,
  Cloud,
  Cpu,
  ShieldCheck,
  Copy,
  GraduationCap,
} from 'lucide-react'
import { contact, experience, projects, skills } from './data'
const navigation = [
  ['Work', 'projects'],
  ['About', 'about'],
  ['Expertise', 'skills'],
  ['Experience', 'experience'],
]
const icons = { ai: BrainCircuit, ml: Cpu, data: Database, cloud: Cloud }
function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  )
}
function Heading({ number, eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      {children && <p className="section-intro">{children}</p>}
    </div>
  )
}
function Tags({ items }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  )
}
function Architecture() {
  const [stage, setStage] = useState(1)
  const stages = [
    {
      label: 'Retrieve',
      text: 'Bring relevant knowledge into context.',
      icon: Database,
      detail:
        'Chunking, embeddings, hybrid search, and metadata filters turn enterprise documents into relevant context.',
      input: 'Documents + enterprise knowledge',
      output: 'Relevant, filtered context',
      tools: ['Embeddings', 'OpenSearch', 'Metadata filters'],
    },
    {
      label: 'Reason',
      text: 'Ground the answer. Connect the next step.',
      icon: BrainCircuit,
      detail:
        'Ground model responses in retrieved evidence. Orchestrate tool calls with state management and human review.',
      input: 'Context + user intent',
      output: 'Grounded responses + governed actions',
      tools: ['Bedrock', 'LangGraph', 'MCP'],
    },
    {
      label: 'Deliver',
      text: 'Serve through secure, observable APIs.',
      icon: Layers3,
      detail:
        'Package services, validate behavior, and monitor the production path with repeatable deployment controls.',
      input: 'Evaluated AI workflow',
      output: 'Observable enterprise service',
      tools: ['FastAPI', 'Kubernetes', 'CI/CD'],
    },
  ]
  const current = stages[stage]
  const Icon = current.icon
  return (
    <div
      className="architecture"
      aria-label="Interactive illustration of an AI system"
    >
      <div className="architecture-top">
        <span>
          <i /> INSIDE THE SYSTEM
        </span>
        <span>INTERACTIVE / 0{stage + 1}</span>
      </div>
      <div className="system-map" aria-hidden="true">
        <svg viewBox="0 0 420 200">
          <defs>
            <pattern
              id="signal-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="#465044" />
            </pattern>
          </defs>
          <rect width="420" height="200" fill="url(#signal-grid)" />
          <g fill="none" stroke="#748064" strokeWidth="1">
            <path d="M25 40H100L165 100H260L325 35H395" />
            <path d="M25 100H165M260 100H395" />
            <path d="M25 160H100L165 100M260 100L325 165H395" />
          </g>
          <g fill="#c4f36b">
            {[40, 100, 160].map((y) => (
              <circle key={y} cx="25" cy={y} r="4" />
            ))}
            <circle cx="395" cy="35" r="4" />
            <circle cx="395" cy="100" r="4" />
            <circle cx="395" cy="165" r="4" />
          </g>
          <rect x="175" y="63" width="76" height="76" rx="16" fill="#c4f36b" />
          <rect
            x="166"
            y="54"
            width="94"
            height="94"
            rx="23"
            fill="none"
            stroke="#c4f36b"
            strokeOpacity=".25"
          />
        </svg>
        <div className="system-core">
          <Icon size={34} strokeWidth={1.4} />
        </div>
        <span className="system-map-label">KNOWLEDGE IN</span>
        <span className="system-map-label output">IMPACT OUT</span>
      </div>
      <div
        className="stage-buttons"
        role="group"
        aria-label="Explore AI system stages"
      >
        {stages.map((item, i) => (
          <button
            key={item.label}
            aria-pressed={i === stage}
            onClick={() => setStage(i)}
          >
            <span>0{i + 1}</span>
            {item.label}
            <ArrowUpRight size={13} />
          </button>
        ))}
      </div>
      <div className="system-detail" aria-live="polite">
        <p className="system-stage-title">{current.text}</p>
        <p>{current.detail}</p>
        <div className="system-io">
          <span>
            IN <b>{current.input}</b>
          </span>
          <span>
            OUT <b>{current.output}</b>
          </span>
        </div>
        <Tags items={current.tools} />
      </div>
      <div className="architecture-caption">
        CONCEPTUAL WALKTHROUGH · NO LIVE MODEL CALLS
      </div>
    </div>
  )
}
function ProjectVisual({ type }) {
  if (type === 'rag')
    return (
      <div className="project-diagram rag-diagram" aria-hidden="true">
        <div className="diagram-source">
          <Database size={23} />
          <span>KNOWLEDGE</span>
        </div>
        <span className="connector" />
        <div className="diagram-model">
          <BrainCircuit size={35} />
          <span>RAG + AGENTS</span>
        </div>
        <span className="connector" />
        <div className="diagram-source">
          <ShieldCheck size={23} />
          <span>GROUNDED OUTPUT</span>
        </div>
        <div className="diagram-footnote">RETRIEVE → REASON → VALIDATE</div>
      </div>
    )
  if (type === 'risk')
    return (
      <div className="project-diagram risk-diagram" aria-hidden="true">
        <div className="risk-grid">
          {Array.from({ length: 40 }, (_, i) => (
            <span
              key={i}
              className={[5, 12, 23, 29].includes(i) ? 'signal' : ''}
            />
          ))}
        </div>
        <div className="signal-label">
          <span /> SIGNAL, THROUGH THE NOISE
        </div>
      </div>
    )
  return (
    <div className="project-diagram forecast-diagram" aria-hidden="true">
      <div className="chart-bars">
        {[25, 37, 29, 44, 39, 58, 51, 66, 57, 78, 70, 91].map((height, i) => (
          <span key={i} style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="diagram-footnote">PATTERNS → PREDICTIONS → PLANNING</div>
    </div>
  )
}
function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    dialog.current.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [])
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      onKeyDown={(e) => {
        if (e.key !== 'Tab') return
        const nodes = dialog.current.querySelectorAll(
          'button, a[href], input, select, textarea, [tabindex="0"]',
        )
        const first = nodes[0],
          last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose()
      }}
      aria-labelledby="dialog-title"
    >
      <button
        className="dialog-close icon-button"
        onClick={onClose}
        aria-label="Close case study"
      >
        <X />
      </button>
      <p className="eyebrow">{project.category}</p>
      <p className="project-index" aria-hidden="true">
        /{project.number}
      </p>
      <h2 id="dialog-title">{project.title}</h2>
      <p className="dialog-client">Client engagement · {project.client}</p>
      <div className="dialog-metric">
        <strong>{project.metric}</strong>
        <span>{project.label}</span>
      </div>
      {[
        ['The challenge', project.challenge],
        ['The approach', project.approach],
        ['The outcome', project.outcome],
      ].map(([label, text]) => (
        <div className="dialog-section" key={label}>
          <h3>{label}</h3>
          <p>{text}</p>
        </div>
      ))}
      <Tags items={project.tags} />
      <p className="confidentiality">
        Summary based on professional experience. Client source code and
        internal materials are not published.
      </p>
    </dialog>
  )
}
export default function App() {
  const [industry, setIndustry] = useState('All')
  const [menu, setMenu] = useState(false),
    [active, setActive] = useState(''),
    [selected, setSelected] = useState(null),
    [copied, setCopied] = useState(false),
    [copyError, setCopyError] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
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
      if (e.key === 'Escape') setMenu(false)
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [menu])
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2500)
    return () => clearTimeout(timer)
  }, [copied])
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setCopyError(false)
    } catch {
      setCopyError(true)
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="brand"
            href="#home"
            aria-label="Varunreddy Guvvala home"
          >
            vg<span>.</span>
          </a>
          <nav
            className={menu ? 'navigation is-open' : 'navigation'}
            id="primary-nav"
            aria-label="Main navigation"
          >
            {navigation.map(([name, id]) => (
              <a
                key={id}
                className={active === id ? 'active' : ''}
                href={`#${id}`}
                onClick={() => setMenu(false)}
                aria-current={active === id ? 'location' : undefined}
              >
                {name}
              </a>
            ))}
            <a
              href="#contact"
              className="nav-contact"
              onClick={() => setMenu(false)}
            >
              Let’s connect <ArrowUpRight size={16} />
            </a>
          </nav>
          <button
            className="mobile-toggle icon-button"
            aria-label={menu ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menu}
            aria-controls="primary-nav"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <aside className="folio-rail" aria-hidden="true">
        <span>VG / ENGINEERING FIELDBOOK</span>
        <span>PYTHON → INTELLIGENCE → IMPACT</span>
        <span>EST. 2015</span>
      </aside>
      <main id="main">
        <section className="hero container" id="home">
          <div className="hero-masthead">
            <p>
              VARUNREDDY GUVVALA<span>Senior Python AI Engineer</span>
            </p>
            <span className="folio-edition">SELECTED WORK & THINKING / 01</span>
          </div>
          <div className="hero-grid">
            <Reveal className="hero-copy">
              <p className="eyebrow">
                <span className="small-line" /> ENGINEERING BEYOND THE NOTEBOOK
              </p>
              <h1>
                AI that earns
                <br />
                its place in
                <br />
                <em>production.</em>
              </h1>
              <p className="hero-description">
                I’m Varunreddy. I build the bridge between AI possibility and
                enterprise reality — grounded retrieval, capable agents, and
                systems people can trust.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  See the work <ArrowUpRight size={19} />
                </a>
                <a className="text-link" href="#contact">
                  Let’s talk <ArrowRight size={17} />
                </a>
              </div>
              <div className="hero-note">
                <ShieldCheck size={16} />
                <span>Python at the core. Trust at every layer.</span>
              </div>
            </Reveal>
            <Reveal className="hero-art" delay={0.15}>
              <Architecture />
            </Reveal>
          </div>
          <div className="hero-bottom">
            <span>REAL-WORLD CONTEXT</span>
            <div>
              <span>Healthcare</span>
              <i />
              <span>Banking</span>
              <i />
              <span>Retail</span>
              <i />
              <span>Public sector</span>
            </div>
            <a href="#projects" aria-label="Scroll to selected work">
              <ArrowDown size={17} />
            </a>
          </div>
        </section>
        <section className="projects-section section" id="projects">
          <div className="container">
            <Reveal>
              <Heading
                number="01"
                eyebrow="SELECTED WORK"
                title={
                  <>
                    The work.
                    <br />
                    <em>The difference it made.</em>
                  </>
                }
              >
                A closer look at systems delivered through professional client
                engagements.
              </Heading>
            </Reveal>
            <div className="work-toolbar">
              <span>EXPLORE BY DOMAIN</span>
              <div role="group" aria-label="Filter case studies by industry">
                {['All', 'Healthcare', 'Banking', 'Retail'].map((item) => (
                  <button
                    key={item}
                    aria-pressed={industry === item}
                    onClick={() => setIndustry(item)}
                  >
                    {item}
                    {item === 'All' && <span>03</span>}
                  </button>
                ))}
              </div>
            </div>
            <div className="projects-grid" aria-live="polite">
              {projects
                .filter(
                  (project) =>
                    industry === 'All' || project.category.endsWith(industry),
                )
                .map((project, index) => (
                  <Reveal
                    className="project-card"
                    key={project.id}
                    delay={index * 0.07}
                  >
                    <button
                      onClick={() => setSelected(project)}
                      aria-label={`Read case study: ${project.title}`}
                    >
                      <div
                        className={`project-visual visual-${project.visual}`}
                      >
                        <div className="visual-top">
                          <span>CASE STUDY / {project.number}</span>
                          <ArrowUpRight size={20} />
                        </div>
                        <ProjectVisual type={project.visual} />
                        <div className="visual-result">
                          <strong>{project.metric}</strong>
                          <span>{project.label}</span>
                        </div>
                      </div>
                      <div className="project-content">
                        <p className="eyebrow">{project.category}</p>
                        <p className="project-index" aria-hidden="true">
                          /{project.number}
                        </p>
                        <h3>{project.name}</h3>
                        <p>{project.summary}</p>
                        <Tags items={project.tags} />
                        <div className="project-footer">
                          <span>{project.client}</span>
                          <span className="read-case">
                            View case study <ArrowUpRight size={15} />
                          </span>
                        </div>
                      </div>
                    </button>
                  </Reveal>
                ))}
            </div>
            <p className="project-note">
              <ShieldCheck size={15} /> Professional work summaries. No
              proprietary code or internal client materials are shared.
            </p>
          </div>
        </section>
        <section className="about-section section" id="about">
          <div className="container">
            <Reveal>
              <Heading
                number="02"
                eyebrow="THE ENGINEER BEHIND THE SYSTEMS"
                title={
                  <>
                    The person behind
                    <br />
                    the production system.
                  </>
                }
              >
                I connect AI research, robust software engineering, and the
                realities of enterprise delivery.
              </Heading>
            </Reveal>
            <div className="about-grid">
              <Reveal>
                <p className="about-lead">
                  Good AI goes beyond a promising model. It needs the right
                  data, thoughtful evaluation, and a dependable path to
                  production.
                </p>
                <p>
                  My work spans generative AI, machine learning, backend
                  engineering, and cloud platforms. I build RAG architectures,
                  orchestrate tool-using agents, and develop predictive systems
                  for environments where trust and reliability matter.
                </p>
                <p>
                  Across client engagements in healthcare, banking, retail, and
                  the public sector, I partner with product, engineering,
                  analytics, and compliance teams to turn complex requirements
                  into maintainable systems.
                </p>
                <a className="text-link blue" href="#experience">
                  Follow my journey <ArrowRight size={16} />
                </a>
              </Reveal>
              <Reveal className="principles">
                {[
                  [
                    'Grounded in context',
                    'Retrieval, response validation, and human review for reliable AI behavior.',
                  ],
                  [
                    'Engineered end to end',
                    'From data pipelines and APIs to deployment, monitoring, and model governance.',
                  ],
                  [
                    'Measured by impact',
                    'Technical decisions connected to efficiency, precision, and useful outcomes.',
                  ],
                ].map(([title, text], i) => (
                  <div key={title}>
                    <span>0{i + 1} /</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
            <Reveal className="impact-strip">
              {[
                ['35%', 'Better knowledge retrieval', 'Cigna Healthcare'],
                ['20%', 'Higher fraud-detection precision', 'Regions Bank'],
                [
                  '25%',
                  'Better processing efficiency',
                  'San Bernardino County',
                ],
                ['18%', 'Better recommendation & forecast accuracy', 'Publix'],
              ].map(([value, label, client]) => (
                <div key={client}>
                  <strong>
                    {value}
                    <ArrowUpRight size={22} />
                  </strong>
                  <p>{label}</p>
                  <span>{client}</span>
                </div>
              ))}
            </Reveal>
            <p className="metric-source">
              Reported outcomes from the client engagements described in my
              resume.
            </p>
          </div>
        </section>
        <section className="skills-section section" id="skills">
          <div className="container">
            <Reveal>
              <Heading
                number="03"
                eyebrow="TECHNICAL EXPERTISE"
                title={
                  <>
                    Deep foundations.
                    <br />
                    Connected capabilities.
                  </>
                }
              >
                The tools change. The goal stays the same: intelligent systems
                that work in production.
              </Heading>
            </Reveal>
            <div className="skills-grid">
              {skills.map((skill, index) => {
                const Icon = icons[skill.icon]
                return (
                  <Reveal
                    className="skill-card"
                    key={skill.title}
                    delay={index * 0.05}
                  >
                    <div className="skill-card-top">
                      <Icon size={25} strokeWidth={1.5} />
                      <span>0{index + 1}</span>
                    </div>
                    <h3>{skill.title}</h3>
                    <p>{skill.description}</p>
                    <Tags items={skill.items} />
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
        <section className="experience-section section" id="experience">
          <div className="container">
            <Reveal>
              <Heading
                number="04"
                eyebrow="PROFESSIONAL JOURNEY"
                title={
                  <>
                    Every role,
                    <br />
                    another layer.
                  </>
                }
              >
                From Python and data engineering to production AI, across five
                client engagements.
              </Heading>
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
                        <p className="client-label">
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
                      <ArrowUpRight size={18} />
                      <strong>{job.metric}</strong>
                      <span>{job.result}</span>
                    </div>
                    <details>
                      <summary>
                        Explore contributions <ChevronDown size={16} />
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
                <span>05</span> EDUCATION
              </p>
              <h2>Where it started.</h2>
            </div>
            <div className="education-detail">
              <span className="education-icon">
                <GraduationCap size={28} strokeWidth={1.5} />
              </span>
              <div>
                <h3>Bachelor of Technology</h3>
                <p>Computer Science</p>
                <span>Parul University · India</span>
              </div>
            </div>
          </div>
        </section>
        <section className="contact-section section" id="contact">
          <div className="container">
            <Reveal>
              <p className="eyebrow">
                <span>06</span> WHAT’S NEXT?
              </p>
              <div className="contact-heading">
                <h2>
                  Your next challenge.
                  <br />
                  <em>Let’s engineer it.</em>
                </h2>
                <ArrowUpRight className="contact-arrow" strokeWidth={0.8} />
              </div>
              <p className="contact-description">
                Have a challenging AI problem, an engineering opportunity, or an
                idea worth exploring? Let’s start a conversation.
              </p>
              <div className="contact-actions">
                <a
                  className="button button-primary"
                  href={`mailto:${contact.email}`}
                >
                  Say hello <Mail size={18} />
                </a>
                <a
                  className="contact-social"
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ContactRound size={19} /> Connect on LinkedIn{' '}
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="email-row">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <button
                  className="icon-button"
                  aria-label={copied ? 'Email copied' : 'Copy email address'}
                  onClick={copyEmail}
                >
                  {copied ? <Check size={17} /> : <Copy size={17} />}
                </button>
                <span role="status">
                  {copied
                    ? 'Copied!'
                    : copyError
                      ? 'Please copy the email link manually.'
                      : ''}
                </span>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand" href="#home" aria-label="Back to top">
            vg<span>.</span>
          </a>
          <p>© {new Date().getFullYear()} Varunreddy Guvvala</p>
          <a href="#home">
            Back to top <ArrowUpRight size={15} />
          </a>
        </div>
      </footer>
      {selected && (
        <ProjectDialog project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
