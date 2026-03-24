import React from 'react'
import type { WindowId } from '../../hooks/useWindowManager'

interface Props { openWindow: (id: WindowId) => void }

export const WelcomeWindow: React.FC<Props> = ({ openWindow }) => (
  <div className="flex flex-col items-center text-center gap-4 px-4 py-2">

    <div className="flex flex-col items-center gap-1">
      <h1 className="font-pixel text-[14px] text-ink leading-8">
        Hi, I'm <span style={{ color: '#e879a0' }}>Olivia Gao</span>
      </h1>
      <p className="font-mono text-[20px] text-ink-mid leading-snug">
        Software Engineer · CS + Design · NYC Metro
      </p>
    </div>

    <div className="flex flex-wrap gap-2 justify-center">
      {['AT&T SWE', 'Northeastern \'25', 'GPA 3.9'].map(t => (
        <span key={t} className="px-chip">{t}</span>
      ))}
    </div>

    <p className="font-body text-[13px] text-ink-mid leading-relaxed max-w-xs font-semibold">
      CS grad with a minor in Graphic &amp; Information Design. Welcome to my
      portfolio — explore the windows, drag them around, and ask my AI assistant anything!
    </p>

    <div className="flex flex-wrap gap-2 justify-center">
      <button className="px-btn" onClick={() => openWindow('about')}>👩‍💻 About</button>
      <button className="px-btn" onClick={() => openWindow('experience')}>💼 Experience</button>
      <button className="px-btn" onClick={() => openWindow('projects')}>📁 Projects</button>
      <button className="px-btn pink" onClick={() => openWindow('ai')}>🤖 Ask AI</button>
    </div>

    <p
      className="font-pixel text-ink-light leading-relaxed"
      style={{ fontSize: 6, border: '1px dashed #9b94c0', padding: '6px 12px' }}
    >
      CLICK ICONS · DRAG WINDOWS · CLICK TO FOCUS WINDOW
    </p>
  </div>
)