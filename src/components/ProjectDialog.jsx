import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Tags } from './ui'
export default function ProjectDialog({ project, onClose }) {
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
  function handleKey(e) {
    if (e.key !== 'Tab') return
    const nodes = dialog.current.querySelectorAll(
      'button, a[href], [tabindex="0"]',
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
  }
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onKeyDown={handleKey}
      onClick={(e) => {
        if (e.target === dialog.current) onClose()
      }}
    >
      <button
        className="icon-button dialog-close"
        aria-label="Close case study"
        onClick={onClose}
      >
        <X />
      </button>
      <p className="eyebrow">
        CASE STUDY / {project.number} · {project.category}
      </p>
      <h2 id="dialog-title">{project.title}</h2>
      <p className="dialog-client">Client engagement · {project.client}</p>
      <div className="dialog-metric">
        <strong>{project.metric}</strong>
        <span>
          {project.label}
          <small>Resume-reported outcome</small>
        </span>
      </div>
      {[
        ['The challenge', project.challenge],
        ['The approach', project.approach],
        ['The outcome', project.outcome],
      ].map(([title, copy]) => (
        <div className="dialog-section" key={title}>
          <h3>{title}</h3>
          <p>{copy}</p>
        </div>
      ))}
      <Tags items={project.tags} />
      <p className="fine-print">
        Professional experience summary. No proprietary source code, internal
        diagrams, or client data is shared.
      </p>
    </dialog>
  )
}
