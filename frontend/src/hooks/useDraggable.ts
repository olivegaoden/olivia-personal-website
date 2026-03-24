import { useRef, useCallback } from 'react'

const TASKBAR_H   = 36
const STATUSBAR_H = 22

interface DragOptions {
  onMove:  (x: number, y: number) => void
  onFocus: () => void
}

export function useDraggable({ onMove, onFocus }: DragOptions) {
  const dragging = useRef(false)
  const offset   = useRef({ x: 0, y: 0 })

  /**
   * Call from the titlebar's onMouseDown.
   * winX/winY = current window position, winW/winH = current window size.
   * Clamps so no part of the window can leave the visible viewport.
   */
  const onMouseDown = useCallback(
    (e: React.MouseEvent, winX: number, winY: number, winW: number, winH: number) => {
      if ((e.target as HTMLElement).closest('.win-dot')) return
      dragging.current = true
      offset.current = { x: e.clientX - winX, y: e.clientY - winY }
      onFocus()

      const onMove_ = (me: MouseEvent) => {
        if (!dragging.current) return
        const maxX = window.innerWidth  - winW
        const maxY = window.innerHeight - winH - STATUSBAR_H
        const nx = Math.max(0,         Math.min(maxX, me.clientX - offset.current.x))
        const ny = Math.max(TASKBAR_H, Math.min(maxY, me.clientY - offset.current.y))
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
    },
    [onMove, onFocus],
  )

  return { onMouseDown }
}
