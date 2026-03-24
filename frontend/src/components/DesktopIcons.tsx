import React from 'react'
import type { WindowId } from '../hooks/useWindowManager'
import { useViewport } from '../hooks/useViewport'

const DEFAULT_ICONS: Record<WindowId, React.FC<{ size: number }>> = {
  welcome: ({ size }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={7} y={0} width={2} height={2} fill="#7c6bc0"/>
      <rect x={5} y={2} width={6} height={2} fill="#7c6bc0"/>
      <rect x={3} y={4} width={10} height={2} fill="#9b8dd4"/>
      <rect x={2} y={6} width={12} height={8} fill="#b8aee8"/>
      <rect x={2} y={6} width={12} height={2} fill="#9b8dd4"/>
      <rect x={6} y={10} width={4} height={4} fill="#7c6bc0"/>
      <rect x={3} y={8} width={3} height={3} fill="#fdd5e5"/>
      <rect x={10} y={8} width={3} height={3} fill="#fdd5e5"/>
    </svg>
  ),
  about: ({ size }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={5} y={1} width={6} height={6} fill="#fde8c0"/>
      <rect x={4} y={2} width={1} height={4} fill="#fde8c0"/>
      <rect x={11} y={2} width={1} height={4} fill="#fde8c0"/>
      <rect x={6} y={4} width={2} height={1} fill="#3a3550"/>
      <rect x={9} y={4} width={1} height={1} fill="#3a3550"/>
      <rect x={6} y={6} width={4} height={1} fill="#c05688"/>
      <rect x={3} y={9} width={10} height={6} fill="#b8aee8"/>
      <rect x={6} y={7} width={4} height={2} fill="#fde8c0"/>
      <rect x={4} y={10} width={3} height={4} fill="#9b8dd4"/>
      <rect x={9} y={10} width={3} height={4} fill="#9b8dd4"/>
    </svg>
  ),
  experience: ({ size }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={2} y={4} width={12} height={9} fill="#c5d8f0"/>
      <rect x={2} y={4} width={12} height={2} fill="#5b9fd4"/>
      <rect x={1} y={3} width={14} height={2} fill="#7c6bc0"/>
      <rect x={5} y={2} width={6} height={2} fill="#7c6bc0"/>
      <rect x={6} y={1} width={4} height={2} fill="#9b8dd4"/>
      <rect x={3} y={8} width={4} height={1} fill="#3a3550"/>
      <rect x={3} y={10} width={6} height={1} fill="#6b6488"/>
      <rect x={3} y={12} width={5} height={1} fill="#6b6488"/>
    </svg>
  ),
  projects: ({ size }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={1} y={4} width={14} height={10} fill="#f7a8c4"/>
      <rect x={1} y={4} width={14} height={2}  fill="#e879a0"/>
      <rect x={1} y={3} width={6}  height={2}  fill="#e879a0"/>
      <rect x={3} y={7} width={10} height={1}  fill="#fdd5e5"/>
      <rect x={3} y={9} width={8}  height={1}  fill="#fdd5e5"/>
      <rect x={3} y={11} width={6} height={1}  fill="#fdd5e5"/>
    </svg>
  ),
  contact: ({ size }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={1} y={3} width={14} height={10} fill="#b8aee8"/>
      <rect x={1} y={3} width={14} height={2}  fill="#7c6bc0"/>
      <rect x={2} y={5} width={5}  height={4}  fill="#fdd5e5"/>
      <rect x={8} y={5} width={6}  height={1}  fill="#fef6ff"/>
      <rect x={8} y={7} width={4}  height={1}  fill="#fef6ff"/>
      <rect x={2} y={10} width={11} height={1} fill="#9b8dd4"/>
    </svg>
  ),
  resume: ({ size }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={2} y={1} width={10} height={14} fill="#fef6ff"/>
      <rect x={2} y={1} width={10} height={14} fill="none" stroke="#e879a0" strokeWidth={1.5}/>
      <rect x={9} y={1} width={3}  height={3}  fill="#fdd5e5"/>
      <rect x={9} y={1} width={3}  height={3}  fill="none" stroke="#e879a0" strokeWidth={1}/>
      <rect x={4} y={6} width={6}  height={1}  fill="#9b8dd4"/>
      <rect x={4} y={8} width={7}  height={1}  fill="#b8aee8"/>
      <rect x={4} y={10} width={5} height={1}  fill="#b8aee8"/>
      <rect x={4} y={12} width={6} height={1}  fill="#b8aee8"/>
    </svg>
  ),
  ai: ({ size }) => (
    <svg viewBox="0 0 16 16" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <rect x={3} y={2} width={10} height={10} fill="#9b8dd4"/>
      <rect x={2} y={3} width={1}  height={4}  fill="#7c6bc0"/>
      <rect x={13} y={3} width={1} height={4}  fill="#7c6bc0"/>
      <rect x={5} y={5} width={2}  height={2}  fill="#fef6ff"/>
      <rect x={9} y={5} width={2}  height={2}  fill="#fef6ff"/>
      <rect x={5} y={8} width={6}  height={1}  fill="#fdd5e5"/>
      <rect x={6} y={12} width={4} height={2}  fill="#7c6bc0"/>
      <rect x={4} y={13} width={8} height={1}  fill="#9b8dd4"/>
    </svg>
  ),
}

const ICON_META: { id: WindowId; label: string }[] = [
  { id: 'welcome',    label: 'Welcome'      },
  { id: 'about',      label: 'About Me'     },
  { id: 'experience', label: 'Experience'   },
  { id: 'projects',   label: 'Projects'     },
  { id: 'contact',    label: 'Contact'      },
  { id: 'resume',     label: 'Resume'       },
  { id: 'ai',         label: 'AI Assistant' },
]

interface Props { onOpen: (id: WindowId) => void }

export const DesktopIcons: React.FC<Props> = ({ onOpen }) => {
  const { height: vpHeight } = useViewport()

  const SLOT_H     = 76
  const EDIT_BTN_H = 0
  const availH     = Math.max(SLOT_H, vpHeight - 44 - 22 - EDIT_BTN_H - 8)
  const perCol     = Math.max(1, Math.floor(availH / SLOT_H))
  const cols       = Math.ceil(ICON_META.length / perCol)

  return (
    <div className="absolute left-4 z-10" style={{ top: 44 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 68px)`,
          gridTemplateRows: `repeat(${perCol}, auto)`,
          gridAutoFlow: 'column',
          gap: 10,
        }}
      >
        {ICON_META.map(({ id, label }) => {
          const Icon = DEFAULT_ICONS[id]
          return (
            <div
              key={id}
              className="desk-icon"
              onClick={() => onOpen(id)}
              title={`Click to open ${label}`}
            >
              <div className="desk-icon-img">
                <Icon size={32} />
              </div>
              <div className="desk-icon-label">{label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
