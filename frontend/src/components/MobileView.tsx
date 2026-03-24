import React, { useState } from 'react'
import { PROJECTS, EXPERIENCE, SKILLS_LANGUAGES, SKILLS_FRONTEND, SKILLS_BACKEND, SKILLS_AI, SKILLS_DESIGN, PROFICIENCY } from '../data/portfolio'
import { queryAI } from '../services/aiService'

// ── tiny pixel section header ───────────────────────────────────────────────
const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-4">
    <h2 className="font-pixel text-ink" style={{ fontSize: 10, lineHeight: 1.8 }}>{children}</h2>
    <div style={{ flex: 1, height: 3, background: 'repeating-linear-gradient(90deg,#9b8dd4 0,#9b8dd4 6px,transparent 6px,transparent 12px)' }} />
  </div>
)

// ── pixel chip ───────────────────────────────────────────────────────────────
const Chip = ({ label, variant = '' }: { label: string; variant?: string }) => (
  <span className={`px-chip ${variant}`}>{label}</span>
)

// ── mobile nav ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'about',      label: 'About'      },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'contact',    label: 'Contact'    },
  { id: 'ai',         label: 'AI Chat'    },
]

// ── AI chat (simplified inline version) ─────────────────────────────────────
interface ChatMsg { role: 'user' | 'ai'; text: string; sources?: string[] }

const SUGGESTIONS = [
  "What projects has she built?",
  "Tell me about her experience",
  "What are her skills?",
  "Is she available to hire?",
]

function renderMd(t: string) {
  return t.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
}

const MobileAIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: 'ai', text: "Hi! I'm Olivia's AI assistant. Ask me anything about her projects, skills, or experience! ✨" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async (q: string) => {
    const question = q.trim()
    if (!question || loading) return
    setInput('')
    setMessages(p => [...p, { role: 'user', text: question }])
    setLoading(true)
    const result = await queryAI(question)
    setLoading(false)
    setMessages(p => [...p, { role: 'ai', text: result.answer, sources: result.sources }])
  }

  return (
    <div className="flex flex-col gap-3">
      {/* suggested questions */}
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            onClick={() => send(s)}
            className="font-body font-bold text-lav-dark"
            style={{ fontSize: 10, padding: '5px 10px', border: '2px solid #9b8dd4', background: 'rgba(184,174,232,0.18)', cursor: 'pointer', boxShadow: '2px 2px 0 #7c6bc0' }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* messages */}
      <div className="flex flex-col gap-3" style={{ maxHeight: 360, overflowY: 'auto' }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 items-start ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-sm"
              style={{ border: '2px solid', borderColor: m.role === 'ai' ? '#7c6bc0' : '#e879a0', background: m.role === 'ai' ? 'rgba(184,174,232,0.3)' : 'rgba(247,168,196,0.3)' }}>
              {m.role === 'ai' ? '🤖' : '🧑'}
            </div>
            <div className={`chat-bubble ${m.role === 'user' ? 'user' : ''}`} style={{ maxWidth: '82%' }}
              dangerouslySetInnerHTML={{ __html: renderMd(m.text) }} />
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 items-start">
            <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-sm" style={{ border: '2px solid #7c6bc0', background: 'rgba(184,174,232,0.3)' }}>🤖</div>
            <div className="chat-bubble">
              <div style={{ display: 'flex', gap: 4 }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, background: '#b8aee8', border: '1px solid #7c6bc0', animation: `typing-bounce 1.2s ease-in-out infinite`, animationDelay: `${i*0.2}s` }} />)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Ask about Olivia..."
          className="flex-1 font-body font-semibold text-ink outline-none"
          style={{ fontSize: 12, padding: '9px 12px', border: '2px solid #9b8dd4', background: 'rgba(255,255,255,0.75)', boxShadow: '2px 2px 0 #7c6bc0' }}
        />
        <button onClick={() => send(input)} disabled={loading} className="px-btn pink flex-shrink-0">↑</button>
      </div>
    </div>
  )
}

// ── MAIN MOBILE VIEW ─────────────────────────────────────────────────────────
export const MobileView: React.FC = () => {
  const [activeNav, setActiveNav] = useState('about')

  const scrollTo = (id: string) => {
    setActiveNav(id)
    document.getElementById(`mobile-${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="desktop-bg" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* pixel grid bg */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(155,141,212,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(155,141,212,0.10) 1px, transparent 1px)',
        backgroundSize: '16px 16px',
      }} />

      {/* sticky top nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(12px)',
        borderBottom: '3px solid #9b8dd4',
        boxShadow: '0 3px 0 #7c6bc0',
      }}>
        {/* logo row */}
        <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid rgba(155,141,212,0.2)' }}>
          <span className="font-pixel text-ink" style={{ fontSize: 9 }}>✿ OLIVIA GAO</span>
          <span className="font-pixel text-lav-dark" style={{ fontSize: 7 }}>PORTFOLIO OS</span>
        </div>
        {/* nav tabs */}
        <div className="flex overflow-x-auto" style={{ scrollbarWidth: 'none', gap: 0 }}>
          {NAV_ITEMS.map(n => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="flex-shrink-0 font-pixel"
              style={{
                fontSize: 7, padding: '8px 14px',
                borderRight: '1px solid rgba(155,141,212,0.3)',
                background: activeNav === n.id ? 'rgba(247,168,196,0.3)' : 'transparent',
                borderBottom: activeNav === n.id ? '3px solid #e879a0' : '3px solid transparent',
                color: activeNav === n.id ? '#3a3550' : '#6b6488',
                cursor: 'pointer',
              }}
            >
              {n.label}
            </button>
          ))}
        </div>
      </nav>

      {/* content */}
      <div className="relative z-10 px-4 py-6 flex flex-col gap-10" style={{ maxWidth: 600, margin: '0 auto' }}>

        {/* HERO */}
        <div className="text-center py-4">
          <h1 className="font-pixel text-ink mb-2" style={{ fontSize: 16, lineHeight: 2.2 }}>
            Hi, I'm <span style={{ color: '#e879a0' }}>Olivia Gao</span>
          </h1>
          <p className="font-mono text-ink-mid" style={{ fontSize: 20 }}>
            Software Engineer · CS + Design · NYC Metro
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {["AT&T SWE 📡", "Northeastern '25 🎓", "GPA 3.9 ⭐"].map(t => (
              <span key={t} className="px-chip">{t}</span>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="mobile-about">
          <SectionHeader>// ABOUT ME</SectionHeader>
          <div style={{ background: 'rgba(255,255,255,0.65)', border: '2px solid #9b8dd4', boxShadow: '3px 3px 0 #7c6bc0', padding: 16, marginBottom: 12 }}>
            <p className="font-body font-semibold text-ink" style={{ fontSize: 13, lineHeight: 1.7 }}>
              CS grad from <strong>Northeastern University</strong> (GPA 3.9, Dean's List) with a
              minor in <strong>Graphic &amp; Information Design</strong>. I build full-stack products
              and care deeply about making things that feel great to use.
            </p>
            <p className="font-body font-semibold text-ink-mid mt-2" style={{ fontSize: 12, lineHeight: 1.7 }}>
              Currently a Software Engineer at <strong>AT&amp;T</strong>. Previously co-ops at
              MORSE Corp and Skillz. 🧶 Crochet · 🎮 Cozy gaming · 🎤 Singing
            </p>
          </div>

          <p className="font-pixel text-lav-dark mb-2 mt-4" style={{ fontSize: 6, letterSpacing: 1 }}>// LANGUAGES</p>
          <div className="flex flex-wrap gap-1.5 mb-3">{SKILLS_LANGUAGES.map(s => <Chip key={s} label={s} />)}</div>
          <p className="font-pixel text-lav-dark mb-2" style={{ fontSize: 6, letterSpacing: 1 }}>// FRONTEND + MOBILE</p>
          <div className="flex flex-wrap gap-1.5 mb-3">{SKILLS_FRONTEND.map(s => <Chip key={s} label={s} />)}</div>
          <p className="font-pixel text-lav-dark mb-2" style={{ fontSize: 6, letterSpacing: 1 }}>// BACKEND + INFRA</p>
          <div className="flex flex-wrap gap-1.5 mb-3">{SKILLS_BACKEND.map(s => <Chip key={s} label={s} variant="sky" />)}</div>
          <p className="font-pixel text-lav-dark mb-2" style={{ fontSize: 6, letterSpacing: 1 }}>// AI + DATA</p>
          <div className="flex flex-wrap gap-1.5 mb-3">{SKILLS_AI.map(s => <Chip key={s} label={s} variant="sky" />)}</div>
          <p className="font-pixel text-lav-dark mb-2" style={{ fontSize: 6, letterSpacing: 1 }}>// DESIGN</p>
          <div className="flex flex-wrap gap-1.5 mb-4">{SKILLS_DESIGN.map(s => <Chip key={s} label={s} variant="pink" />)}</div>

          <div className="flex flex-col gap-2.5">
            {PROFICIENCY.map(s => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="font-pixel text-ink-mid" style={{ fontSize: 6, minWidth: 72 }}>{s.label}</span>
                <div className="px-bar-track flex-1">
                  <div className={`px-bar-fill ${s.variant === 'pink' ? 'pink' : ''}`}
                    style={{ width: `${s.pct}%`, ...(s.variant === 'sky' ? { background: 'repeating-linear-gradient(90deg,#c5d8f0 0,#c5d8f0 6px,#5b9fd4 6px,#5b9fd4 10px)' } : {}) }} />
                </div>
                <span className="font-pixel text-ink-light" style={{ fontSize: 6 }}>{s.pct}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="mobile-experience">
          <SectionHeader>// EXPERIENCE</SectionHeader>

          {/* education */}
          <div className="flex items-start gap-3 mb-4" style={{ border: '2px solid #b8aee8', background: 'rgba(184,174,232,0.12)', boxShadow: '3px 3px 0 #7c6bc0', padding: '12px 14px' }}>
            <span style={{ fontSize: 22 }}>🎓</span>
            <div>
              <p className="font-pixel text-ink" style={{ fontSize: 7, lineHeight: 2 }}>Northeastern University</p>
              <p className="font-mono text-ink-mid" style={{ fontSize: 15 }}>B.S. Computer Science · Minor in Graphic &amp; Info Design</p>
              <p className="font-mono text-lav-dark" style={{ fontSize: 14 }}>GPA 3.9/4.0 · Dean's List · May 2025</p>
            </div>
          </div>

          {EXPERIENCE.map(exp => (
            <details key={exp.company} className="mb-3" style={{ border: '2px solid #9b8dd4', background: 'rgba(255,255,255,0.6)', boxShadow: '3px 3px 0 #7c6bc0' }}>
              <summary className="flex items-center gap-3 px-3 py-2.5 cursor-pointer list-none">
                <span style={{ fontSize: 20 }}></span>
                <div className="flex-1 min-w-0">
                  <p className="font-pixel text-ink" style={{ fontSize: 8, lineHeight: 2 }}>{exp.company}</p>
                  <p className="font-mono text-ink-mid" style={{ fontSize: 14 }}>{exp.role}</p>
                </div>
                <span className="font-pixel text-ink-light flex-shrink-0" style={{ fontSize: 5.5, padding: '3px 6px', border: '1.5px solid #9b94c0', background: 'rgba(184,174,232,0.2)' }}>{exp.period}</span>
              </summary>
              <div style={{ borderTop: '2px dashed rgba(155,141,212,0.3)', padding: '10px 14px 14px' }}>
                {exp.bullets.map((b, i) => (
                  <div key={i} className="flex gap-2 items-start mt-2">
                    <span style={{ width: 6, height: 6, background: '#e879a0', border: '1px solid #7c6bc0', display: 'inline-block', flexShrink: 0, marginTop: 4 }} />
                    <p className="font-body font-semibold text-ink" style={{ fontSize: 11, lineHeight: 1.6 }}>{b}</p>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </section>

        {/* PROJECTS */}
        <section id="mobile-projects">
          <SectionHeader>// PROJECTS</SectionHeader>
          {PROJECTS.map(p => (
            <div key={p.id} className="proj-card mb-3">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="font-pixel text-ink" style={{ fontSize: 9, lineHeight: 2 }}>{p.title}</h3>
                {p.badge && <span className="px-chip pink" style={{ fontSize: 5 }}>{p.badge}</span>}
              </div>
              <p className="font-body font-semibold text-ink-mid mb-2" style={{ fontSize: 12, lineHeight: 1.6 }}>{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">{p.tech.map(t => <span key={t} className="px-chip">{t}</span>)}</div>
              <div className="flex gap-2">
                <a href={p.githubUrl} className="px-btn" style={{ fontSize: 7, textDecoration: 'none' }}>🐙 GITHUB</a>
                {p.liveUrl && <a href={p.liveUrl} className="px-btn pink" style={{ fontSize: 7, textDecoration: 'none' }}>▶ DEMO</a>}
              </div>
            </div>
          ))}
        </section>

        {/* CONTACT */}
        <section id="mobile-contact">
          <SectionHeader>// CONTACT</SectionHeader>
          <div style={{ background: 'rgba(119,232,160,0.12)', border: '2px solid #77e8a0', boxShadow: '3px 3px 0 #4db87a', padding: '10px 14px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="pulse-green" style={{ width: 10, height: 10, background: '#77e8a0', border: '1px solid #4db87a', flexShrink: 0 }} />
            <span className="font-pixel text-green-700" style={{ fontSize: 7 }}>OPEN TO OPPORTUNITIES</span>
          </div>
          {[
            { label: 'Email',    value: 'oliviagao825@gmail.com',        href: 'mailto:oliviagao825@gmail.com'  },
            { label: 'LinkedIn', value: 'linkedin.com/in/olivia-gao03',  href: 'https://www.linkedin.com/in/olivia-gao03' },
            { label: 'GitHub',   value: 'github.com/olivegaoden',        href: 'https://github.com/olivegaoden' },
            { label: 'Phone',    value: '(908) 581-2578',                href: 'tel:9085812578'                 },
          ].map(l => (
            <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
              className="flex items-center gap-3 mb-2 no-underline"
              style={{ border: '2px solid #9b8dd4', background: 'rgba(255,255,255,0.6)', boxShadow: '3px 3px 0 #7c6bc0', padding: '11px 13px' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}></span>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-pixel text-ink" style={{ fontSize: 7 }}>{l.label}</span>
                <span className="font-mono text-ink-mid" style={{ fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.value}</span>
              </div>
              <span className="font-pixel text-ink-light" style={{ fontSize: 10 }}>↗</span>
            </a>
          ))}
        </section>

        {/* AI CHAT */}
        <section id="mobile-ai">
          <SectionHeader>// AI ASSISTANT</SectionHeader>
          <div style={{ background: 'rgba(255,255,255,0.7)', border: '2px solid #9b8dd4', boxShadow: '3px 3px 0 #7c6bc0', padding: 16 }}>
            <p className="font-pixel text-ink mb-1" style={{ fontSize: 8 }}>ASK ME ANYTHING ABOUT OLIVIA</p>
            <p className="font-mono text-ink-mid mb-4" style={{ fontSize: 15 }}>AI-powered · RAG pipeline · real resume data</p>
            <MobileAIChat />
          </div>
        </section>

        <div className="text-center pb-6">
          <p className="font-mono text-ink-mid" style={{ fontSize: 16 }}>✨ Made with love &amp; pixels by Olivia</p>
        </div>
      </div>
    </div>
  )
}
