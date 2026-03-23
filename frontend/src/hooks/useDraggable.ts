import { useRef, useCallback } from 'react'

interface DragOptions {
  onMove: (x: number, y: number) => void
  onFocus: () => void
  minY?: number
}

export function useDraggable({ onMove, onFocus, minY = 36 }: DragOptions) {
  const dragging = useRef(false)
  const offset   = useRef({ x: 0, y: 0 })

  const onMouseDown = useCallback((e: React.MouseEvent, winX: number, winY: number) => {
    if ((e.target as HTMLElement).closest('.win-dot')) return
    dragging.current = true
    offset.current = { x: e.clientX - winX, y: e.clientY - winY }
    onFocus()

    const onMove_ = (me: MouseEvent) => {
      if (!dragging.current) return
      const nx = Math.max(0, Math.min(window.innerWidth  - 200, me.clientX - offset.current.x))
      const ny = Math.max(minY, Math.min(window.innerHeight - 80, me.clientY - offset.current.y))
      onMove(nx, ny)
    }
    const onUp = () => {
      dragging.current = false
      window.removeEventListener('mousemove', onMove_)
      window.removeEventListener('mouseup',   onUp)
    }
    window.addEventListener('mousemove', onMove_)
    window.addEventListener('mouseup',   onUp)
    e.preventDefault()
  }, [onMove, onFocus, minY])

  return { onMouseDown }
}
