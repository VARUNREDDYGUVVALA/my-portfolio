import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

export function Reveal({ children, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}
export function SectionHeading({ number, label, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children && <p className="section-description">{children}</p>}
    </div>
  )
}
export function Tags({ items }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  )
}
export function ExternalLink({ href, children }) {
  return (
    <a
      className="external-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={16} />
    </a>
  )
}
