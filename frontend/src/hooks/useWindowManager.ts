import { useState, useCallback } from 'react'

export type WindowId = 'welcome' | 'about' | 'projects' | 'contact' | 'ai'

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

const DEFAULTS: Record<WindowId, Omit<WindowState, 'zIndex' | 'isOpen' | 'isMinimized'>> = {
  welcome:  { id: 'welcome',  x: 120, y: 55,  width: 400, height: 380 },
  about:    { id: 'about',    x: 560, y: 55,  width: 400, height: 460 },
  projects: { id: 'projects', x: 160, y: 65,  width: 440, height: 500 },
  contact:  { id: 'contact',  x: 610, y: 70,  width: 360, height: 360 },
  ai:       { id: 'ai',       x: 370, y: 55,  width: 430, height: 520 },
}

const initWindows = (): Record<WindowId, WindowState> => {
  const ids: WindowId[] = ['welcome', 'about', 'projects', 'contact', 'ai']
  return Object.fromEntries(
    ids.map((id, i) => [id, { ...DEFAULTS[id], isOpen: id === 'welcome', isMinimized: false, zIndex: i + 1 }])
  ) as Record<WindowId, WindowState>
}

export function useWindowManager() {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(initWindows)
  const [zTop, setZTop] = useState(10)

  const open = useCallback((id: WindowId) => {
    setZTop(z => z + 1)
    setWindows(w => ({ ...w, [id]: { ...w[id], isOpen: true, isMinimized: false, zIndex: zTop + 1 } }))
  }, [zTop])

  const close = useCallback((id: WindowId) => {
    setWindows(w => ({ ...w, [id]: { ...w[id], isOpen: false, isMinimized: false } }))
  }, [])

  const minimize = useCallback((id: WindowId) => {
    setWindows(w => ({ ...w, [id]: { ...w[id], isMinimized: true } }))
  }, [])

  const focus = useCallback((id: WindowId) => {
    setZTop(z => z + 1)
    setWindows(w => ({ ...w, [id]: { ...w[id], zIndex: zTop + 1, isMinimized: false } }))
  }, [zTop])

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
