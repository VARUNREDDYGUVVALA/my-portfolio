import { ArrowRight, ArrowUpRight, Orbit } from 'lucide-react'
import { projects } from '../data'
import { Tags, SectionHeading } from './ui'
import { getTechnologyContext } from '../orbitData'
export default function ProjectUniverse({
  onArchitecture,
  onProject,
  onTechnology,
  selectedTechnology,
}) {
  const related = getTechnologyContext(selectedTechnology).projects
  return (
    <section className="section project-universe" id="projects">
      <div className="container">
        <div className="universe-bridge" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
        <SectionHeading
          number="01"
          label="PROJECT UNIVERSE"
          title={
            <>
              Real systems.
              <br />
              <em>Measurable impact.</em>
            </>
          }
        >
          Explore professional client work through the architecture, the
          technologies, and the outcome. No fictional deployments or simulated
          business metrics.
        </SectionHeading>
        <div className="universe-grid">
          {projects.map((project, index) => (
            <article
              id={`project-${project.id}`}
              key={project.id}
              className={`universe-card universe-${project.id} ${related.includes(project.id) ? 'technology-match' : ''}`}
            >
              <div className="project-orbit-art" aria-hidden="true">
                <div className="mini-orbit orbit-one" />
                <div className="mini-orbit orbit-two" />
                <div className="mini-orbit orbit-three" />
                <span className="project-orbit-icon">
                  <Orbit size={31} strokeWidth={1} />
                </span>
                <span className="project-art-label">
                  SYSTEM / {project.number}
                </span>
                <span className="project-art-point" />
              </div>
              <div className="project-card-content">
                <p className="eyebrow">{project.client} / CLIENT ENGAGEMENT</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="universe-metric">
                  <strong>{project.metric}</strong>
                  <span>
                    {project.label}
                    <small>Resume-reported outcome</small>
                  </span>
                </div>
                <Tags items={project.tags} />
                <div className="project-card-actions">
                  <button
                    onClick={() => onArchitecture(project.id)}
                    className="text-button"
                  >
                    Explore architecture <ArrowUpRight size={14} />
                  </button>
                  <button
                    className="icon-button"
                    aria-label={`Read case study: ${project.title}`}
                    onClick={() => onProject(project)}
                  >
                    <ArrowRight size={17} />
                  </button>
                </div>
                <button
                  className="technology-link"
                  onClick={() =>
                    onTechnology(
                      index === 0
                        ? 'LangGraph'
                        : index === 1
                          ? 'MLflow'
                          : 'SQL',
                    )
                  }
                >
                  View technology connections <ArrowRight size={11} />
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="fine-print">
          Client source code and internal diagrams are not published.
          Architecture views are explanatory summaries of the supplied resume.
        </p>
      </div>
    </section>
  )
}
