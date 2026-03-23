import React, { useState } from 'react'

const LINKS = [
  { icon: '✉️', label: 'Email',       value: 'oliviagao825@gmail.com',       href: 'mailto:oliviagao825@gmail.com', copy: true },
  { icon: '💼', label: 'LinkedIn',    value: 'linkedin.com/in/olivia-gao03/', href: '#' },
  { icon: '🐙', label: 'GitHub',      value: 'github.com/olivegaoden',      href: '#' },
  { icon: '🐦', label: 'Instagram', value: '@olivia.gaoo',             href: '#' },
]

export const ContactWindow: React.FC = () => {
  const [copied, setCopied] = useState(false)

  const handleClick = (link: typeof LINKS[0]) => {
    if (link.copy) {
      navigator.clipboard.writeText(link.value).catch(() => {})
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* availability badge */}
      <div
        className="flex items-center gap-2.5 px-3 py-2.5"
        style={{ border: '2px solid #77e8a0', background: 'rgba(119,232,160,0.12)', boxShadow: '3px 3px 0 #4db87a' }}
      >
        <div className="w-3 h-3 bg-green-400 pulse-green flex-shrink-0" />
        <span className="font-pixel text-[7px] text-green-700">AVAILABLE FOR HIRE</span>
      </div>

      {LINKS.map(l => (
        <a
          key={l.label}
          href={l.href}
          onClick={() => handleClick(l)}
          className="flex items-center gap-3 px-3 py-3 cursor-pointer transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 no-underline"
          style={{
            border: '2px solid #9b8dd4',
            background: 'rgba(255,255,255,0.6)',
            boxShadow: '3px 3px 0 #7c6bc0',
          }}
        >
          <span className="text-2xl flex-shrink-0">{l.icon}</span>
          <div className="flex flex-col min-w-0">
            <span className="font-pixel text-[7px] text-ink">{l.label}</span>
            <span className="font-mono text-[16px] text-ink-mid truncate">{l.value}</span>
          </div>
          <span className="ml-auto font-pixel text-[8px] text-ink-light">→</span>
        </a>
      ))}

      {copied && (
        <p className="font-pixel text-[7px] text-green-600 text-center mt-1">
          ✓ COPIED TO CLIPBOARD!
        </p>
      )}

      <div
        className="font-mono text-[15px] text-ink-mid text-center py-2 mt-1"
        style={{ borderTop: '2px dashed #9b94c0' }}
      >
        ✨ Always happy to chat about design &amp; code
      </div>
    </div>
  )
}
