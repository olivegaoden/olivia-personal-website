import React, { useState, useRef, useEffect } from 'react'
import { queryAI, type ConversationMessage } from '../../services/aiService'

interface Message {
  id: string
  role: 'user' | 'ai'
  text: string
  model?: string
}

const SUGGESTIONS = [
  'What projects has she built?',
  'Tell me about her experience',
  'What are her skills?',
  'Is she available to hire?',
]

const renderText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <strong key={i}>{p.slice(2, -2)}</strong>
      : <span key={i}>{p}</span>
  )
}

const TypingDots = () => (
  <div className="flex gap-1 items-center py-1 px-1">
    {[0, 1, 2].map(i => (
      <div
        key={i}
        className="w-2 h-2 rounded-none"
        style={{
          background: '#b8aee8',
          border: '1px solid #7c6bc0',
          animation: `typing-bounce 1.1s ease-in-out infinite`,
          animationDelay: `${i * 0.18}s`,
        }}
      />
    ))}
  </div>
)

export const AIWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'ai',
      text: "Hi! I'm Olivia's AI assistant ✨ I can answer questions about her projects, skills, and experience. What would you like to know?",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<ConversationMessage[]>([])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text: string) => {
    const q = text.trim()
    if (!q || loading) return
    setInput('')

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: q }
    setMessages(m => [...m, userMsg])
    setLoading(true)

    const res = await queryAI(q, historyRef.current)
    setLoading(false)

    historyRef.current = [
      ...historyRef.current,
      { role: 'user', content: q },
      { role: 'assistant', content: res.answer },
    ]

    setMessages(m => [...m, {
      id: (Date.now() + 1).toString(),
      role: 'ai',
      text: res.answer,
      model: res.model,
    }])
  }

  return (
    <div className="flex flex-col h-full -m-4" style={{ height: 'calc(100% + 2rem)' }}>
      {/* header */}
      <div
        className="flex-shrink-0 px-4 py-3"
        style={{ borderBottom: '2px solid rgba(184,174,232,0.4)', background: 'rgba(255,255,255,0.3)' }}
      >
        <p className="font-pixel text-[8px] text-ink">ASK ME ANYTHING ABOUT OLIVIA</p>
        <p className="font-mono text-[15px] text-ink-mid mt-0.5">AI-powered · context-aware · real resume data</p>
      </div>

      {/* suggested questions */}
      <div
        className="flex-shrink-0 flex flex-wrap gap-1.5 px-4 py-2.5"
        style={{ borderBottom: '2px solid rgba(184,174,232,0.2)', background: 'rgba(255,255,255,0.2)' }}
      >
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            onClick={() => send(s)}
            disabled={loading}
            className="font-pixel text-[6px] text-lav-dark px-2 py-1.5 cursor-pointer transition-all hover:-translate-y-px disabled:opacity-40"
            style={{
              border: '2px solid #9b8dd4',
              background: 'rgba(184,174,232,0.18)',
              boxShadow: '2px 2px 0 #7c6bc0',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 min-w-0 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div
              className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-base"
              style={{
                border: '2px solid',
                borderColor: msg.role === 'ai' ? '#9b8dd4' : '#e879a0',
                background: msg.role === 'ai'
                  ? 'linear-gradient(135deg,#b8aee8,#9b8dd4)'
                  : 'linear-gradient(135deg,#f7a8c4,#e879a0)',
                boxShadow: msg.role === 'ai' ? '2px 2px 0 #7c6bc0' : '2px 2px 0 #c05688',
              }}
            >
              {msg.role === 'ai' ? '🤖' : '🧑'}
            </div>

            <div className={`flex flex-col gap-1 min-w-0 max-w-[78%] ${msg.role === 'user' ? 'items-end' : ''}`}>
              <div className={`chat-bubble ${msg.role === 'user' ? 'user' : ''}`}>
                <p className="whitespace-pre-wrap leading-relaxed">
                  {renderText(msg.text)}
                </p>
              </div>
              {msg.model && (
                <span
                  className="font-pixel text-[5px] text-ink-light px-1.5 py-0.5 self-start"
                  style={{ border: '1px solid rgba(155,141,212,0.3)', background: 'rgba(255,255,255,0.4)' }}
                >
                  {msg.model}
                </span>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2">
            <div
              className="w-8 h-8 flex items-center justify-center flex-shrink-0 text-base"
              style={{
                border: '2px solid #9b8dd4',
                background: 'linear-gradient(135deg,#b8aee8,#9b8dd4)',
                boxShadow: '2px 2px 0 #7c6bc0',
              }}
            >
              🤖
            </div>
            <div className="chat-bubble"><TypingDots /></div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* input */}
      <div
        className="flex-shrink-0 flex gap-2 px-4 py-3"
        style={{ borderTop: '2px solid rgba(184,174,232,0.35)', background: 'rgba(255,255,255,0.35)' }}
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send(input)}
          placeholder="Ask about Olivia..."
          disabled={loading}
          className="flex-1 px-3 py-2 font-body text-[12px] font-semibold text-ink outline-none disabled:opacity-50"
          style={{
            border: '2px solid #9b8dd4',
            background: 'rgba(255,255,255,0.7)',
            boxShadow: 'inset 2px 2px 0 rgba(155,141,212,0.15)',
          }}
        />
        <button
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          className="w-10 h-10 flex items-center justify-center text-white font-pixel text-[10px] disabled:opacity-40 transition-transform hover:-translate-y-px active:translate-y-px"
          style={{
            border: '2px solid #7c6bc0',
            background: 'linear-gradient(135deg,#b8aee8,#9b8dd4)',
            boxShadow: '3px 3px 0 #7c6bc0',
          }}
        >
          ↑
        </button>
      </div>
    </div>
  )
}
