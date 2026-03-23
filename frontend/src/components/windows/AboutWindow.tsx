import React from 'react'
import { SKILLS_FRONTEND, SKILLS_UX, SKILLS_BACKEND, PROFICIENCY } from '../../data/portfolio'

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
    <p className="font-body text-[12px] text-ink font-semibold leading-relaxed">
      I'm a software engineer who sits at the intersection of{' '}
      <strong>code&nbsp;and&nbsp;design</strong>. I build interfaces that feel
      as good as they work — delightful, accessible, and fast.
    </p>
    <p className="font-body text-[12px] text-ink-mid font-semibold leading-relaxed">
      Based in NYC, I specialise in <strong>React ecosystems, design systems, and UX engineering</strong>.
      I love the detail work: micro-animations, pixel-perfect layouts, and making complex things feel simple.
    </p>

    <Section label="// FRONTEND" />
    <Chips items={SKILLS_FRONTEND} />

    <Section label="// UX / DESIGN" />
    <Chips items={SKILLS_UX} variant="pink" />

    <Section label="// BACKEND + AI" />
    <Chips items={SKILLS_BACKEND} variant="sky" />

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

    <Section label="// FUN FACTS" />
    <div
      className="font-mono text-[16px] text-ink-mid leading-relaxed"
      style={{ border: '2px solid #9b94c0', padding: '10px', background: 'rgba(184,174,232,0.1)' }}
    >
      🎹 Mechanical keyboard collector<br/>
      🎨 Pixel art creator on weekends<br/>
      🍵 Makes the best matcha latte (allegedly)
    </div>
  </div>
)
