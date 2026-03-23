import React from 'react'
import type { WindowId } from '../hooks/useWindowManager'

const ICONS: { id: WindowId; emoji: string; label: string }[] = [
  { id: 'welcome',  emoji: '🏠', label: 'Welcome'   },
  { id: 'about',    emoji: '👩‍💻', label: 'About Me'  },
  { id: 'projects', emoji: '📁', label: 'Projects'  },
  { id: 'contact',  emoji: '💌', label: 'Contact'   },
  { id: 'ai',       emoji: '🤖', label: 'AI Assistant' },
]

interface Props { onOpen: (id: WindowId) => void }

export const DesktopIcons: React.FC<Props> = ({ onOpen }) => (
  <div className="absolute top-12 left-5 flex flex-col gap-4 z-10">
    {ICONS.map(icon => (
      <div
        key={icon.id}
        className="desk-icon"
        onDoubleClick={() => onOpen(icon.id)}
        title={`Double-click to open ${icon.label}`}
      >
        <div className="desk-icon-img">{icon.emoji}</div>
        <div className="desk-icon-label">{icon.label}</div>
      </div>
    ))}
  </div>
)
