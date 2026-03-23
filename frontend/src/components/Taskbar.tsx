import React, { useEffect, useState } from 'react'
import type { WindowId, WindowState } from '../hooks/useWindowManager'

const WIN_META: Record<WindowId, { emoji: string; label: string }> = {
  welcome:  { emoji: '🏠', label: 'welcome.exe' },
  about:    { emoji: '👩‍💻', label: 'about_me.txt' },
  projects: { emoji: '📁', label: 'projects/'    },
  contact:  { emoji: '💌', label: 'contact.json' },
  ai:       { emoji: '🤖', label: 'olivia_ai.exe'},
}

interface Props {
  windows: Record<WindowId, WindowState>
  activeId: WindowId | null
  onTabClick: (id: WindowId) => void
  onMinimize: (id: WindowId) => void
}

export const Taskbar: React.FC<Props> = ({ windows, activeId, onTabClick, onMinimize }) => {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const openWindows = Object.values(windows).filter(w => w.isOpen)

  return (
    <div
      className="absolute top-0 left-0 right-0 flex items-end gap-1 px-2 z-[9999]"
      style={{
        height: 36,
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(10px)',
        borderBottom: '3px solid #9b8dd4',
        boxShadow: '0 3px 0 #7c6bc0',
      }}
    >
      {/* OS logo */}
      <div
        className="flex items-center gap-1.5 px-2 py-1 mr-2 flex-shrink-0"
        style={{ border: '2px solid #9b8dd4', background: 'rgba(184,174,232,0.3)', boxShadow: '2px 2px 0 #7c6bc0' }}
      >
        <span className="text-sm">✿</span>
        <span className="font-pixel text-[7px] text-lav-dark">OS</span>
      </div>

      {/* window tabs */}
      {openWindows.map(w => {
        const meta = WIN_META[w.id]
        const isActive = w.id === activeId && !w.isMinimized
        return (
          <button
            key={w.id}
            className={`px-tab h-[28px] flex-shrink-0 ${isActive ? 'active' : ''}`}
            onClick={() => {
              if (isActive) onMinimize(w.id)
              else onTabClick(w.id)
            }}
          >
            <span>{meta.emoji}</span>
            <span>{meta.label}</span>
          </button>
        )
      })}

      {/* clock */}
      <div className="ml-auto mr-1 flex-shrink-0">
        <span
          className="font-pixel text-[7px] text-ink-mid px-2 py-1"
          style={{ border: '2px solid rgba(155,141,212,0.4)', background: 'rgba(255,255,255,0.5)' }}
        >
          {time}
        </span>
      </div>
    </div>
  )
}
