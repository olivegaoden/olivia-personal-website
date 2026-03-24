import React, { useState } from 'react'

const LINKS = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'oliviagao825@gmail.com',
    href: 'mailto:oliviagao825@gmail.com',
    copyValue: 'oliviagao825@gmail.com',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/olivia-gao03',
    href: 'https://www.linkedin.com/in/olivia-gao03',
    copyValue: null,
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'github.com/olivegaoden',
    href: 'https://github.com/olivegaoden',
    copyValue: null,
  },
]

export const ContactWindow: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null)

  const handleClick = (link: typeof LINKS[0]) => {
    if (link.copyValue) {
      navigator.clipboard.writeText(link.copyValue).catch(() => {})
      setCopied(link.label)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* availability badge */}
      <div
        className="flex items-center gap-2.5 px-3 py-2.5"
        style={{ border: '2px solid #77e8a0', background: 'rgba(119,232,160,0.12)', boxShadow: '3px 3px 0 #4db87a' }}
      >
        <div className="w-3 h-3 pulse-green flex-shrink-0" style={{ background: '#77e8a0', border: '1px solid #4db87a' }} />
        <span className="font-pixel text-[7px] text-green-700">OPEN TO OPPORTUNITIES</span>
      </div>

      {LINKS.map(l => (
        <a
          key={l.label}
          href={l.href}
          target={l.href.startsWith('http') ? '_blank' : undefined}
          rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          onClick={() => handleClick(l)}
          className="flex items-center gap-3 px-3 py-3 no-underline"
          style={{
            border: '2px solid #9b8dd4',
            background: 'rgba(255,255,255,0.6)',
            boxShadow: '3px 3px 0 #7c6bc0',
            cursor: 'pointer',
            transition: 'transform 0.1s, box-shadow 0.1s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translate(-2px,-2px)'
            e.currentTarget.style.boxShadow = '5px 5px 0 #7c6bc0'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = ''
            e.currentTarget.style.boxShadow = '3px 3px 0 #7c6bc0'
          }}
        >
          <span className="text-2xl flex-shrink-0">{l.icon}</span>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-pixel text-[7px] text-ink">{l.label}</span>
            <span className="font-mono text-[16px] text-ink-mid truncate">{l.value}</span>
          </div>
          <span className="font-pixel text-[8px] text-ink-light flex-shrink-0">
            {copied === l.label ? '✓' : l.copyValue ? '⎘' : '↗'}
          </span>
        </a>
      ))}

      {copied && (
        <p className="font-pixel text-[7px] text-green-600 text-center mt-1">
          ✓ {copied} COPIED!
        </p>
      )}

      <div
        className="font-mono text-[15px] text-ink-mid text-center py-2 mt-1"
        style={{ borderTop: '2px dashed #9b94c0' }}
      >
        ✨ Always happy to chat about code, design &amp; crochet
      </div>
    </div>
  )
}
