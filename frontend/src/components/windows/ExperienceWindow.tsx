import React, { useState } from 'react'
import { EXPERIENCE } from '../../data/portfolio'

export const ExperienceWindow: React.FC = () => {
  // Using 'expanded' instead of 'open' to avoid any name collision
  const [expanded, setExpanded] = useState<string | null>('AT&T')

  if (!EXPERIENCE || EXPERIENCE.length === 0) {
    return <p className="font-mono text-[16px] text-ink-mid p-4">No experience data found.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Education card */}
      <p className="font-pixel text-[6px] text-lav-dark tracking-wide">// EDUCATION EXPERIENCE</p>
      <div
        className="flex items-start gap-3 px-3 py-3"
        style={{ border: '2px solid #b8aee8', background: 'rgba(184,174,232,0.12)', boxShadow: '3px 3px 0 #7c6bc0' }}
      >
        <div
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
          style={{ border: '2px solid #7c6bc0', background: 'rgba(184,174,232,0.25)' }}
        >
          <svg viewBox="0 0 12 12" width={18} height={18} xmlns="http://www.w3.org/2000/svg">
            <rect x={0} y={5} width={12} height={2} fill="#7c6bc0"/>
            <rect x={4} y={2} width={4}  height={4} fill="#9b8dd4"/>
            <rect x={5} y={0} width={2}  height={3} fill="#b8aee8"/>
            <rect x={2} y={7} width={3}  height={4} fill="#b8aee8"/>
            <rect x={7} y={7} width={3}  height={4} fill="#b8aee8"/>
          </svg>
        </div>
        <div>
          <p className="font-pixel text-[7px] text-ink leading-5">Northeastern University</p>
          <p className="font-mono text-[15px] text-ink-mid leading-tight">
            B.S. Computer Science · Minor in Graphic &amp; Info Design
          </p>
          <p className="font-mono text-[14px] text-lav-dark">GPA 3.9/4.0 · Dean's List · May 2025</p>
        </div>
      </div>

      <p className="font-pixel text-[6px] text-lav-dark tracking-wide">// WORK EXPERIENCE</p>

      {EXPERIENCE.map(exp => {
        const isExpanded = expanded === exp.company
        return (
          <div
            key={exp.company}
            style={{
              border: `2px solid ${isExpanded ? '#e879a0' : '#9b8dd4'}`,
              background: 'rgba(255,255,255,0.6)',
              boxShadow: `3px 3px 0 ${isExpanded ? '#e879a0' : '#7c6bc0'}`,
            }}
          >
            <button
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left"
              style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}
              onClick={() => setExpanded(isExpanded ? null : exp.company)}
            >
              <div
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-base"
                style={{
                  border: '2px solid',
                  borderColor: isExpanded ? '#e879a0' : '#9b8dd4',
                  background: isExpanded ? 'rgba(247,168,196,0.2)' : 'rgba(184,174,232,0.15)',
                }}
              >
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-pixel text-[8px] text-ink leading-5 truncate">{exp.company}</p>
                <p className="font-mono text-[15px] text-ink-mid truncate">{exp.role}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span
                  className="font-pixel text-[5.5px] px-1.5 py-0.5"
                  style={{
                    border: '1.5px solid #9b94c0',
                    background: 'rgba(184,174,232,0.2)',
                    color: '#6b6488',
                  }}
                >
                  {exp.period}
                </span>
                <span className="font-pixel text-[7px] text-lav-dark">{isExpanded ? '▴' : '▾'}</span>
              </div>
            </button>

            {isExpanded && (
              <div
                className="px-3 pb-3 flex flex-col gap-2"
                style={{ borderTop: '2px dashed rgba(155,141,212,0.3)' }}
              >
                {(exp.bullets ?? []).map((b, i) => (
                  <div key={i} className="flex gap-2 items-start mt-2">
                    <span
                      className="flex-shrink-0"
                      style={{
                        width: 6, height: 6,
                        background: '#e879a0',
                        border: '1px solid #7c6bc0',
                        display: 'inline-block',
                        marginTop: 4,
                      }}
                    />
                    <p className="font-body text-[11px] text-ink font-semibold leading-relaxed">{b}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
