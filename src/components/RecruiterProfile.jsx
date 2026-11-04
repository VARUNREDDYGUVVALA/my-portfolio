import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  GraduationCap,
  Mail,
  Phone,
  Printer,
  Search,
  X,
} from 'lucide-react'
import resume from '../resume.json'
import { experience, projects } from '../data'
import { repositoryUrl } from '../orbitData'
import { Tags } from './ui'

const sections = [
  ['Overview', 'home'],
  ['Professional summary', 'resume-summary'],
  ['Technical expertise', 'skills'],
  ['Client experience', 'experience'],
  ['Selected work', 'projects'],
  ['Education', 'education'],
  ['Contact', 'contact'],
]
const summaryGroups = [
  {
    title: 'Intelligence & orchestration',
    label: '01 / AI SYSTEMS',
    points: resume.summary.slice(0, 5),
  },
  {
    title: 'Engineering & delivery',
    label: '02 / PRODUCTION',
    points: resume.summary.slice(5, 10),
  },
  {
    title: 'Evaluation & business context',
    label: '03 / ENTERPRISE',
    points: resume.summary.slice(10),
  },
]
export default function RecruiterProfile({ onProject, onArchitecture }) {
  const [detail, setDetail] = useState('full')
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState([])
  const [active, setActive] = useState('home')
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        }),
      { rootMargin: '-12% 0px -62% 0px' },
    )
    document
      .querySelectorAll('.resume-atlas section[id]')
      .forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  const filtered = resume.skills.filter((skill) =>
    `${skill.category} ${skill.content}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  )
  const total = resume.experience.reduce(
    (sum, job) => sum + job.responsibilities.length,
    0,
  )
  function printFullResume() {
    setQuery('')
    setDetail('full')
    requestAnimationFrame(() => window.print())
  }
  function toggleJob(index) {
    setExpanded((items) =>
      items.includes(index)
        ? items.filter((i) => i !== index)
        : [...items, index],
    )
  }
  return (
    <main
      id="main"
      tabIndex={-1}
      className="recruiter-profile resume-atlas"
      data-detail={detail}
    >
      <div className="atlas-layout">
        <aside className="atlas-index">
          <div className="atlas-index-monogram">
            VG<span>CAREER ATLAS</span>
          </div>
          <p>THE COMPLETE PROFILE</p>
          <nav aria-label="Resume section index">
            {sections.map(([label, id], index) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? 'location' : undefined}
              >
                <span>0{index + 1}</span>
                {label}
                <ArrowUpRight size={11} />
              </a>
            ))}
          </nav>
          <div className="atlas-index-footer">
            <span>CORE DISCIPLINE</span>
            <strong>Python → AI → Enterprise</strong>
            <a href={`mailto:${resume.contact.email}`}>
              Start a conversation <ArrowRight size={12} />
            </a>
          </div>
        </aside>
        <div className="atlas-document">
          <section id="home" className="atlas-hero">
            <div className="atlas-sheet-line">
              <span>PROFESSIONAL PROFILE</span>
              <span>ENGINEERING / INTELLIGENCE / IMPACT</span>
            </div>
            <div className="atlas-hero-content">
              <p className="eyebrow">A CAREER IN CONNECTED SYSTEMS</p>
              <h1 id="profile-title" tabIndex={-1}>
                Varunreddy <br />
                <em>Guvvala</em>
              </h1>
              <p className="atlas-role">{resume.title}</p>
              <p className="atlas-introduction">{resume.summary[0]}</p>
              <div className="atlas-hero-actions">
                <a
                  className="button button-primary"
                  href={`mailto:${resume.contact.email}`}
                >
                  Let’s connect <Mail size={16} />
                </a>
                <a className="text-button" href="#experience">
                  Explore the experience <ArrowDown size={14} />
                </a>
                <button
                  className="atlas-print text-button"
                  onClick={printFullResume}
                >
                  Print profile <Printer size={14} />
                </button>
              </div>
            </div>
            <div className="atlas-hero-stamp" aria-hidden="true">
              <span>PYTHON</span>
              <span>AI / ML</span>
              <span>ENGINEERING</span>
              <i />
              <strong>VG</strong>
              <span>BUILT FOR THE ENTERPRISE</span>
            </div>
            <div className="atlas-facts">
              <div>
                <strong>05</strong>
                <span>Client engagements</span>
              </div>
              <div>
                <strong>04</strong>
                <span>Industry domains</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Cloud platforms</span>
              </div>
              <div>
                <strong>
                  2015<span> → </span>Present
                </strong>
                <span>Resume timeline</span>
              </div>
            </div>
          </section>
          <div className="atlas-reading-bar">
            <div>
              <span className="atlas-reading-label">
                CHOOSE YOUR READING DEPTH
              </span>
              <p aria-live="polite">
                {detail === 'full'
                  ? 'The complete resume, organized for the web.'
                  : 'A shorter reading view. Full resume restores every point.'}
              </p>
            </div>
            <div
              className="atlas-detail-switch"
              role="group"
              aria-label="Resume reading depth"
            >
              <button
                aria-pressed={detail === 'full'}
                onClick={() => setDetail('full')}
              >
                Full resume {detail === 'full' && <Check size={12} />}
              </button>
              <button
                aria-pressed={detail === 'quick'}
                onClick={() => setDetail('quick')}
              >
                Quick scan {detail === 'quick' && <Check size={12} />}
              </button>
            </div>
          </div>
          <section id="resume-summary" className="atlas-section">
            <div className="atlas-section-heading">
              <span>01 / PROFESSIONAL SUMMARY</span>
              <h2>The full perspective.</h2>
              <p>
                Enterprise AI, production engineering, and the business context
                that connects them.
              </p>
            </div>
            <div className="atlas-summary-grid">
              {summaryGroups.map((group) => (
                <article key={group.title}>
                  <span>{group.label}</span>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.points.map((point, index) => (
                      <li
                        key={point}
                        className={index > 0 ? 'quick-extra' : ''}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="atlas-source-note">
              All {resume.summary.length} professional-summary statements from
              the supplied resume are included in full view.
            </p>
          </section>
          <section id="skills" className="atlas-section atlas-skills-section">
            <div className="atlas-section-heading">
              <span>02 / TECHNICAL EXPERTISE</span>
              <h2>A stack with depth.</h2>
              <p>
                Every technical category from the resume, organized as a
                searchable reference.
              </p>
            </div>
            <div className="atlas-skill-toolbar">
              <label htmlFor="resume-skill-search">
                <Search size={15} />
                <input
                  id="resume-skill-search"
                  aria-label="Find a technology, platform, or domain"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find a technology, platform, or domain"
                  type="search"
                />
              </label>
              <span role="status">
                {filtered.length} of {resume.skills.length} categories
              </span>
              {query && (
                <button className="text-button" onClick={() => setQuery('')}>
                  Clear <X size={12} />
                </button>
              )}
            </div>
            <div className="atlas-full-skills">
              {filtered.map((skill) => (
                <article key={skill.category}>
                  <span>
                    {String(resume.skills.indexOf(skill) + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{skill.category}</h3>
                    <p>{skill.content}</p>
                  </div>
                </article>
              ))}
            </div>
            {!filtered.length && (
              <div className="atlas-empty">
                <p>No matching skill categories.</p>
                <button className="text-button" onClick={() => setQuery('')}>
                  Show all categories <ArrowRight size={14} />
                </button>
              </div>
            )}
          </section>
          <section
            id="experience"
            className="atlas-section atlas-experience-section"
          >
            <div className="atlas-section-heading">
              <span>03 / PROFESSIONAL EXPERIENCE</span>
              <h2>Every chapter. Every contribution.</h2>
              <p>
                All five client engagements, with full responsibilities and the
                complete technology environment for each.
              </p>
            </div>
            <nav
              className="atlas-career-map"
              aria-label="Jump to client engagement"
            >
              {resume.experience.map((job, index) => (
                <a href={`#resume-job-${index}`} key={job.company}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{job.company}</strong>
                  <small>{job.dates}</small>
                </a>
              ))}
            </nav>
            <div className="profile-experience atlas-experience">
              {resume.experience.map((job, index) => {
                const highlight = experience.find(
                  (item) => item.company === job.company,
                )
                const isExpanded = expanded.includes(index)
                return (
                  <article
                    className="atlas-job"
                    id={`resume-job-${index}`}
                    data-expanded={isExpanded ? 'true' : 'false'}
                    key={job.company}
                  >
                    <header className="atlas-job-header">
                      <div className="atlas-job-period">
                        <span>CHAPTER 0{index + 1}</span>
                        <p>{job.dates}</p>
                        <small>{job.location}</small>
                      </div>
                      <div className="atlas-job-identity">
                        <p className="eyebrow">
                          CLIENT ENGAGEMENT{' '}
                          {index === 0 && (
                            <span className="atlas-current">
                              CURRENT IN RESUME
                            </span>
                          )}
                        </p>
                        <h3>{job.company}</h3>
                        <p className="atlas-job-role">{job.role}</p>
                      </div>
                    </header>
                    {highlight && (
                      <div className="atlas-job-impact">
                        <ArrowUpRight size={19} />
                        <strong>{highlight.metric}</strong>
                        <span>
                          {highlight.result}
                          <small>Outcome reported in resume</small>
                        </span>
                      </div>
                    )}
                    <div className="atlas-responsibility-heading">
                      <h4>Responsibilities & contributions</h4>
                      <span>{job.responsibilities.length} POINTS</span>
                    </div>
                    <ol className="atlas-responsibilities">
                      {job.responsibilities.map((point, i) => (
                        <li key={point} className={i >= 3 ? 'quick-extra' : ''}>
                          {point}
                        </li>
                      ))}
                    </ol>
                    {detail === 'quick' && (
                      <button
                        className="text-button atlas-expand-role"
                        onClick={() => toggleJob(index)}
                      >
                        {isExpanded
                          ? 'Show fewer contributions'
                          : `Show all ${job.responsibilities.length} contributions`}
                        <ChevronDown
                          size={14}
                          style={
                            isExpanded
                              ? { transform: 'rotate(180deg)' }
                              : undefined
                          }
                        />
                      </button>
                    )}
                    <div className="atlas-environment">
                      <span>TECHNOLOGY ENVIRONMENT</span>
                      <p>{job.environment}</p>
                    </div>
                  </article>
                )
              })}
            </div>
            <p className="atlas-source-note">
              Full view includes all {total} responsibility statements and all
              five technology environments from the supplied resume.
            </p>
          </section>
          <section id="projects" className="atlas-section atlas-selected-work">
            <div className="atlas-section-heading">
              <span>04 / SELECTED CLIENT WORK</span>
              <h2>The work, in context.</h2>
              <p>
                Resume-backed case studies that connect the problem, the
                architecture, and the result.
              </p>
            </div>
            <div className="atlas-project-grid">
              {projects.map((project) => (
                <article key={project.id}>
                  <span className="atlas-project-number">
                    /{project.number}
                  </span>
                  <p className="eyebrow">{project.client}</p>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <Tags items={project.tags} />
                  <div className="atlas-project-actions">
                    <button
                      className="text-button"
                      onClick={() => onProject(project)}
                      aria-label={`Read case study: ${project.title}`}
                    >
                      Read case study <ArrowUpRight size={13} />
                    </button>
                    <button
                      className="text-button"
                      onClick={() => onArchitecture(project.id)}
                    >
                      Architecture <ArrowUpRight size={13} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <p className="atlas-source-note">
              These are summaries of professional client engagements, not
              additional projects or public client source code.
            </p>
          </section>
          <section id="education" className="atlas-section">
            <div className="atlas-section-heading">
              <span>05 / EDUCATION</span>
              <h2>The foundation.</h2>
            </div>
            <div className="profile-education atlas-education">
              <GraduationCap size={35} strokeWidth={1.2} />
              <div>
                <h3>{resume.education.degree}</h3>
                <p>
                  {resume.education.institution} · {resume.education.location}
                </p>
              </div>
              <span>COMPUTER SCIENCE</span>
            </div>
          </section>
          <section id="contact" className="atlas-section atlas-contact">
            <div className="atlas-section-heading">
              <span>06 / CONTACT</span>
              <h2>
                A conversation is
                <br />
                <em>where the next chapter starts.</em>
              </h2>
            </div>
            <div className="atlas-contact-grid">
              <a href={`mailto:${resume.contact.email}`}>
                <span>EMAIL</span>
                <strong>{resume.contact.email}</strong>
                <Mail size={18} />
              </a>
              <a href={`tel:${resume.contact.telephone}`}>
                <span>PHONE</span>
                <strong>{resume.contact.phone}</strong>
                <Phone size={18} />
              </a>
              <a
                href={resume.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>PROFESSIONAL NETWORK</span>
                <strong>Connect on LinkedIn</strong>
                <ArrowUpRight size={18} />
              </a>
              <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                <span>PORTFOLIO SOURCE</span>
                <strong>GitHub repository</strong>
                <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="atlas-colophon">
              <span>VARUNREDDY GUVVALA / CAREER ATLAS</span>
              <span>FULL PROFILE · NO RESUME FILE DOWNLOAD</span>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
