import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
export default function Modal({ title, children, onClose, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    ref.current.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [])
  function trap(e) {
    if (e.key !== 'Tab') return
    const items = [
      ...ref.current.querySelectorAll('button,a[href],input,[tabindex="0"]'),
    ].filter((el) => !el.disabled && el.getClientRects().length)
    const first = items[0],
      last = items.at(-1)
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
      ref={ref}
      className={`orbit-modal ${className}`}
      aria-label={title}
      onCancel={onClose}
      onKeyDown={trap}
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      <div className="modal-top">
        <span>{title}</span>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label={`Close ${title}`}
        >
          <X size={20} />
        </button>
      </div>
      {children}
    </dialog>
  )
}
