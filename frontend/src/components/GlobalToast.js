import { useEffect, useState } from 'react'
import { subscribeToToasts } from '../lib/toastBus'

const TOAST_DURATION_MS = 4000

export default function GlobalToast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const unsubscribe = subscribeToToasts((toast) => {
      setToasts((prev) => [...prev, toast])

      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== toast.id))
      }, TOAST_DURATION_MS)
    })

    return unsubscribe
  }, [])

  if (toasts.length === 0) {
    return null
  }

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>
  )
}
