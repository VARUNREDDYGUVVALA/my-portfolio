import { ArrowUpRight, GraduationCap, Mail, Printer } from 'lucide-react'
import { contact, experience, profile, projects, skills } from '../data'
import { repositoryUrl } from '../orbitData'
import { Tags } from './ui'
export default function RecruiterProfile({ onProject, onArchitecture }) {
  return (
    <main id="main" tabIndex={-1} className="recruiter-profile">
      <section id="home" className="profile-hero">
        <div className="container">
          <p className="eyebrow">PROFESSIONAL PROFILE / RECRUITER VIEW</p>
          <h1 id="profile-title" tabIndex={-1}>
            Varunreddy Guvvala
          </h1>
          <p className="profile-title">{profile.title}</p>
          <p className="profile-summary">{profile.summary}</p>
          <div className="profile-focus">
            <span>Agentic AI</span>
            <span>Generative AI</span>
            <span>RAG</span>
            <span>MLOps</span>
            <span>Data engineering</span>
          </div>
          <div className="profile-actions">
            <a
              className="button button-secondary"
              href={`mailto:${contact.email}`}
            >
              Get in touch <Mail size={16} />
            </a>
            <button className="text-button" onClick={() => window.print()}>
              Print profile <Printer size={15} />
            </button>
          </div>
          <div className="profile-links">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={13} />
            </a>
            <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
              GitHub source <ArrowUpRight size={13} />
            </a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      </section>
      <section id="projects" className="profile-section container">
        <div className="profile-section-heading">
          <span>01</span>
          <h2>Selected client work</h2>
        </div>
        <div className="profile-projects">
          {projects.map((project) => (
            <article key={project.id}>
              <p className="eyebrow">{project.client}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="profile-project-result">
                <strong>{project.metric}</strong>
                <span>{project.label}</span>
              </div>
              <Tags items={project.tags} />
              <div className="profile-project-actions">
                <button
                  className="text-button"
                  onClick={() => onProject(project)}
                  aria-label={`Read case study: ${project.title}`}
                >
                  Read case study <ArrowUpRight size={14} />
                </button>
                <button
                  className="text-button"
                  onClick={() => onArchitecture(project.id)}
                >
                  Architecture <ArrowUpRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="fine-print">
          Outcomes are reported in the supplied resume. These are client
          engagements, not standalone open-source projects.
        </p>
      </section>
      <section id="skills" className="profile-section container">
        <div className="profile-section-heading">
          <span>02</span>
          <h2>Technical expertise</h2>
        </div>
        <div className="profile-skills">
          {skills.map((skill) => (
            <div key={skill.title}>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <Tags items={skill.items} />
            </div>
          ))}
        </div>
      </section>
      <section id="experience" className="profile-section container">
        <div className="profile-section-heading">
          <span>03</span>
          <h2>Professional experience</h2>
        </div>
        <div className="profile-experience">
          {experience.map((job) => (
            <article key={job.company}>
              <div>
                <span>{job.dates}</span>
                <small>{job.location}</small>
              </div>
              <div>
                <p className="eyebrow">CLIENT ENGAGEMENT</p>
                <h3>{job.company}</h3>
                <p className="profile-job-role">{job.role}</p>
                <p>{job.description}</p>
                <ul>
                  {job.achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Tags items={job.tags} />
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="education" className="profile-section container">
        <div className="profile-section-heading">
          <span>04</span>
          <h2>Education</h2>
        </div>
        <div className="profile-education">
          <GraduationCap size={30} />
          <div>
            <h3>Bachelor of Technology in Computer Science</h3>
            <p>Parul University · India</p>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="profile-section profile-contact container"
      >
        <div className="profile-section-heading">
          <span>05</span>
          <h2>Let’s connect</h2>
        </div>
        <p>
          For engineering opportunities and conversations about enterprise AI
          delivery.
        </p>
        <div className="profile-actions">
          <a className="button button-primary" href={`mailto:${contact.email}`}>
            Say hello <Mail size={16} />
          </a>
          <a
            className="text-button"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect on LinkedIn <ArrowUpRight size={15} />
          </a>
        </div>
      </section>
    </main>
  )
}
