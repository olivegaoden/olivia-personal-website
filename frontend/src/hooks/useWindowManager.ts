import { useState, useCallback, useRef, useEffect } from 'react'

export type WindowId = 'welcome' | 'about' | 'experience' | 'projects' | 'contact' | 'ai'

export interface WindowState {
  id: WindowId
  isOpen: boolean
  isMinimized: boolean
  x: number
  y: number
  width: number
  height: number
  zIndex: number
}

const TASKBAR_H   = 36
const STATUSBAR_H = 22

const WIN_FRACTIONS: Record<WindowId, { wFrac: number; hFrac: number }> = {
  welcome:    { wFrac: 0.38, hFrac: 0.62 },
  about:      { wFrac: 0.42, hFrac: 0.78 },
  experience: { wFrac: 0.42, hFrac: 0.74 },
  projects:   { wFrac: 0.44, hFrac: 0.80 },
  contact:    { wFrac: 0.34, hFrac: 0.60 },
  ai:         { wFrac: 0.40, hFrac: 0.82 },
}

const IDS: WindowId[] = ['welcome', 'about', 'experience', 'projects', 'contact', 'ai']

function makeWindowState(id: WindowId, zIndex: number, isOpen: boolean): WindowState {
  const vw  = window.innerWidth
  const vh  = window.innerHeight - TASKBAR_H - STATUSBAR_H
  const { wFrac, hFrac } = WIN_FRACTIONS[id]
  const width  = Math.round(vw * wFrac)
  const height = Math.round(vh * hFrac)
  const x = Math.max(0, Math.round((vw - width)  / 2))
  const y = Math.max(0, Math.round((vh - height) / 2)) + TASKBAR_H
  return { id, x, y, width, height, zIndex, isOpen, isMinimized: false }
}

const initWindows = (): Record<WindowId, WindowState> =>
  Object.fromEntries(
    IDS.map((id, i) => [id, makeWindowState(id, i + 1, id === 'welcome')])
  ) as Record<WindowId, WindowState>

export function useWindowManager() {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(initWindows)
  const zTopRef = useRef(10)

  // Re-center and resize all OPEN windows when viewport changes
  useEffect(() => {
    const handleResize = () => {
      setWindows(prev => {
        const next = { ...prev }
        for (const id of IDS) {
          const w = prev[id]
          if (!w.isOpen) continue
          const vw  = window.innerWidth
          const vh  = window.innerHeight - TASKBAR_H - STATUSBAR_H
          const { wFrac, hFrac } = WIN_FRACTIONS[id]
          const width  = Math.round(vw * wFrac)
          const height = Math.round(vh * hFrac)
          const x = Math.max(0, Math.round((vw - width)  / 2))
          const y = Math.max(0, Math.round((vh - height) / 2)) + TASKBAR_H
          next[id] = { ...w, x, y, width, height }
        }
        return next
      })
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const open = useCallback((id: WindowId) => {
    zTopRef.current += 1
    const nextZ = zTopRef.current
    setWindows(w => ({ ...w, [id]: makeWindowState(id, nextZ, true) }))
  }, [])

  const close = useCallback((id: WindowId) => {
    setWindows(w => ({ ...w, [id]: { ...w[id], isOpen: false, isMinimized: false } }))
  }, [])

  const minimize = useCallback((id: WindowId) => {
    setWindows(w => ({ ...w, [id]: { ...w[id], isMinimized: true } }))
  }, [])

  const focus = useCallback((id: WindowId) => {
    zTopRef.current += 1
    const nextZ = zTopRef.current
    setWindows(w => ({ ...w, [id]: { ...w[id], zIndex: nextZ, isMinimized: false } }))
  }, [])

  const move = useCallback((id: WindowId, x: number, y: number) => {
    setWindows(w => ({ ...w, [id]: { ...w[id], x, y } }))
  }, [])

  const resize = useCallback((id: WindowId, width: number, height: number) => {
    setWindows(w => ({ ...w, [id]: { ...w[id], width, height } }))
  }, [])

  const activeId = Object.values(windows)
    .filter(w => w.isOpen && !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null

  return { windows, open, close, minimize, focus, move, resize, activeId }
}
