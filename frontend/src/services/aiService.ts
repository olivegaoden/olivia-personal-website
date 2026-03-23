const BACKEND = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export interface AIResponse {
  answer: string
  sources: string[]
}

// Smart fallback when backend is not running
function localFallback(question: string): AIResponse {
  const q = question.toLowerCase()
  if (q.includes('project') || q.includes('built') || q.includes('made'))
    return {
      answer: "Olivia has built some great projects! 🎨\n\n**DesignFlow** — a collaborative real-time design tool using WebSockets and Canvas API.\n\n**GreenPath** — a carbon tracker with beautiful D3 visualisations (5k+ users).\n\n**Moodboard AI** — an AI moodboard generator that **won Best UX at HackNYC 2024**, built with a custom RAG pipeline.\n\n**Portfolio OS** — this very site you're looking at! A pixel-art desktop OS.",
      sources: ['projects/designflow', 'projects/greenpath', 'projects/moodboard-ai'],
    }
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('know'))
    return {
      answer: "Here's what Olivia works with:\n\n**Frontend:** React, TypeScript, Next.js, CSS, Tailwind, Framer Motion, D3.js\n\n**UX/Design:** Figma, design systems, accessibility (WCAG 2.1), pixel art ✨\n\n**Backend:** Node.js, Python, FastAPI, PostgreSQL\n\n**AI:** RAG pipelines, FAISS vector search, OpenAI APIs",
      sources: ['resume.txt', 'about_me.txt'],
    }
  if (q.includes('experience') || q.includes('background') || q.includes('career') || q.includes('work'))
    return {
      answer: "Olivia has **4+ years** of professional software engineering experience. She has worked at NYC-based startups as a frontend and UX engineer, leading design system initiatives and shipping products used by thousands. She currently focuses on frontend-heavy, design-conscious engineering.",
      sources: ['resume.txt'],
    }
  if (q.includes('hire') || q.includes('available') || q.includes('job') || q.includes('opportunit') || q.includes('contact'))
    return {
      answer: "Yes! Olivia is **actively looking** for new opportunities 🎉\n\nShe's especially interested in frontend-heavy, design-conscious teams. Reach her at:\n\n✉️ olivia@example.com\n💼 linkedin.com/in/olivia-dev\n🐙 github.com/olivia-dev",
      sources: ['contact.json'],
    }
  if (q.includes('who') || q.includes('olivia') || q.includes('about') || q.includes('tell me'))
    return {
      answer: "Olivia is a **software engineer based in NYC** who sits at the intersection of code and design. She builds interfaces that feel as good as they work — delightful, accessible, and fast. Outside of work she collects mechanical keyboards, creates pixel art, and makes excellent matcha lattes ☕",
      sources: ['about_me.txt'],
    }
  return {
    answer: "Great question! I'm Olivia's AI assistant powered by a RAG pipeline. I can answer questions about her **projects**, **skills**, **experience**, and **availability**. What would you like to know? ✨",
    sources: [],
  }
}

export async function queryAI(question: string): Promise<AIResponse> {
  try {
    const res = await fetch(`${BACKEND}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error('bad response')
    return await res.json()
  } catch {
    return localFallback(question)
  }
}
