import React from 'react'

export const Statusbar: React.FC = () => (
  <div
    className="absolute bottom-0 left-0 right-0 flex items-center px-3 gap-3 z-[9999]"
    style={{
      height: 22,
      background: 'rgba(255,255,255,0.45)',
      backdropFilter: 'blur(8px)',
      borderTop: '2px solid rgba(155,141,212,0.3)',
    }}
  >
    <div className="w-2 h-2 flex-shrink-0 pulse-green" style={{ background: '#77e8a0', border: '1px solid #4db87a' }} />
    <span className="font-pixel text-[6px] text-ink-light">OLIVIA.DEV OS v1.0</span>
    <span className="font-pixel text-[6px] text-ink-light ml-auto">✨ MADE BY OLIVIA</span>
  </div>
)
