import React from 'react'
import type { WindowId } from '../../hooks/useWindowManager'

interface Props { openWindow: (id: WindowId) => void }

export const WelcomeWindow: React.FC<Props> = ({ openWindow }) => (
  <div className="flex flex-col items-center text-center gap-3 h-full justify-center">
    <h1 className="font-pixel text-[11px] text-ink leading-6">
      Hi, I'm <span className="text-pink-dark">Olivia!</span> ✨
    </h1>
    <p className="font-mono text-[18px] text-ink-mid leading-snug px-4">
      Software Engineer · UX Developer · AI Enthusiast
    </p>

    <div className="flex flex-wrap gap-2 justify-center mt-1">
      {['NYC Based','Open to Work','Frontend Focus'].map(t => (
        <span key={t} className="px-chip">{t}</span>
      ))}
    </div>

    <p className="font-body text-[12px] text-ink-mid leading-relaxed px-4 font-semibold">
      Welcome to my portfolio! Explore windows, drag them around, and chat with my AI assistant.
    </p>

    <div className="flex flex-wrap gap-2 justify-center mt-1">
      {([['👩‍💻','about'],['📁','projects'],['🤖','ai']] as const).map(([em, id]) => (
        <button key={id} className="px-btn" onClick={() => openWindow(id)}>
          {em} {id.toUpperCase()}
        </button>
      ))}
    </div>

    <p className="font-pixel text-[5.5px] text-ink-light mt-2 leading-relaxed px-2"
       style={{ border: '1px dashed #9b94c0', padding: '6px 10px' }}>
      💡 DOUBLE-CLICK ICONS · DRAG TITLEBARS · CLICK TO FOCUS
    </p>
  </div>
)
