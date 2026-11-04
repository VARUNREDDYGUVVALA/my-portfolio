import { ArrowRight, Database, ShieldCheck } from 'lucide-react'
import { orbitSystems } from '../orbitData'
import { projects } from '../data'
import Modal from './Modal'
import SystemBlueprint from './SystemBlueprint'
export default function ArchitectureLab({ systemId, onClose, onChange }) {
  const system = orbitSystems.find((s) => s.id === systemId) ?? {
    ...orbitSystems[0],
    id: 'retail',
    name: projects[2].title,
    client: 'Publix',
    domain: 'retail',
    flow: [
      'POS data',
      'Features',
      'Predictive models',
      'Evaluation',
      'Scoring',
      'Retail decisions',
    ],
  }
  return (
    <Modal
      title="Architecture mode"
      className="architecture-modal"
      onClose={onClose}
    >
      <div className="lab-header">
        <div>
          <p className="eyebrow">ARCHITECTURE LAB / INTERACTIVE SYSTEM VIEW</p>
          <h2>{system.name}</h2>
          <p>
            {system.client} · Conceptual architecture, derived from professional
            experience
          </p>
        </div>
        <ShieldCheck size={34} strokeWidth={1} />
      </div>
      <div
        className="lab-contexts"
        role="group"
        aria-label="Select architecture context"
      >
        {[...orbitSystems, { id: 'retail', name: 'Retail forecasting' }].map(
          (item) => (
            <button
              key={item.id}
              aria-pressed={systemId === item.id}
              onClick={() => onChange(item.id)}
            >
              {item.name}
            </button>
          ),
        )}
      </div>
      <div className="lab-flow">
        <Database size={14} />
        {system.flow.map((step, i) => (
          <span key={step}>
            {step}
            {i < system.flow.length - 1 && <ArrowRight size={12} />}
          </span>
        ))}
      </div>
      <SystemBlueprint key={system.id} domain={system.domain} />
      <div className="lab-bottom">
        <span>
          SELECT ANY COMPONENT TO INSPECT ITS PURPOSE AND TECHNOLOGIES
        </span>
        <button className="text-button" onClick={onClose}>
          Return to portfolio <ArrowRight size={15} />
        </button>
      </div>
    </Modal>
  )
}
