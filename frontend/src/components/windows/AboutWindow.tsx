import React from 'react'
import { SKILLS_LANGUAGES, SKILLS_FRONTEND, SKILLS_BACKEND, SKILLS_AI, SKILLS_DESIGN, PROFICIENCY } from '../../data/portfolio'

const Section = ({ label }: { label: string }) => (
  <p className="font-pixel text-[6px] text-lav-dark mt-4 mb-2 tracking-wide">{label}</p>
)

const Chips = ({ items, variant = '' }: { items: string[], variant?: string }) => (
  <div className="flex flex-wrap gap-1.5">
    {items.map(i => <span key={i} className={`px-chip ${variant}`}>{i}</span>)}
  </div>
)

export const AboutWindow: React.FC = () => (
  <div className="flex flex-col gap-1">
    <Section label="// ABOUT ME" />
    <p className="font-body text-[12px] text-ink font-semibold leading-relaxed mt-2">
      Software engineer with a background in both <strong>CS and graphic design</strong>. I've shipped features for 35k+ enterprise users at AT&T, built ML tooling at MORSE Corp, and grew engagement metrics at Skillz's 3M-MAU gaming platform.
    </p>

    <Section label="// LANGUAGES" />
    <Chips items={SKILLS_LANGUAGES} />

    <Section label="// FRONTEND + MOBILE" />
    <Chips items={SKILLS_FRONTEND} />

    <Section label="// BACKEND + INFRA" />
    <Chips items={SKILLS_BACKEND} variant="sky" />

    <Section label="// AI / ML" />
    <Chips items={SKILLS_AI} variant="sky" />

    <Section label="// DESIGN" />
    <Chips items={SKILLS_DESIGN} variant="pink" />

    <Section label="// PROFICIENCY" />
    <div className="flex flex-col gap-2.5 mt-1">
      {PROFICIENCY.map(s => (
        <div key={s.label} className="flex items-center gap-3">
          <span className="font-pixel text-[6px] text-ink-mid min-w-[72px]">{s.label}</span>
          <div className="px-bar-track flex-1">
            <div
              className={`px-bar-fill ${s.variant === 'pink' ? 'pink' : ''}`}
              style={{
                width: `${s.pct}%`,
                ...(s.variant === 'sky' ? {
                  background: 'repeating-linear-gradient(90deg,#c5d8f0 0,#c5d8f0 6px,#5b9fd4 6px,#5b9fd4 10px)'
                } : {}),
              }}
            />
          </div>
          <span className="font-pixel text-[6px] text-ink-light">{s.pct}%</span>
        </div>
      ))}
    </div>

    <Section label="// INTERESTS" />
    <div
      className="font-mono text-[16px] text-ink-mid leading-relaxed"
      style={{ border: '2px solid #9b94c0', padding: '10px', background: 'rgba(184,174,232,0.1)' }}
    >
      Crochet enthusiast<br/>
      Cozy gaming fan<br/>
      Singer
    </div>
  </div>
)
