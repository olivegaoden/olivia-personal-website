// ── Types ─────────────────────────────────────────────────────────────────
export interface AIResponse {
  answer: string
  sources: string[]
  model?: string  // which tier/model answered
}

export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
}

// ── Try FastAPI backend first, then OpenAI direct, then rich static fallback ──
const BACKEND = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function tryBackend(question: string, history: ConversationMessage[]): Promise<AIResponse | null> {
  try {
    const res = await fetch(`${BACKEND}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history: history.slice(-6) }),
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

// ── Static fallback — comprehensive, covers many phrasings ─────────────────
function staticFallback(question: string): AIResponse {
  const q = question.toLowerCase()

  // Define all topic matchers — all are checked, matches are combined
  const topics: { pattern: RegExp; heading: string; answer: string; sources: string[] }[] = [
    {
      pattern: /project|built|made|created|huskyflow|simplif|shell|codebase|github/,
      heading: '## Projects',
      answer: "**HuskyFlow** — full-stack Q&A platform with real-time WebSocket polls, Google OAuth, and community spaces (TypeScript, React, Node.js, MongoDB).\n\n**Text Simplification App** — fine-tuned T5 transformer + React/Flask frontend that simplifies text or audio with text-to-speech output.\n\n**Custom CLI Shell** — Unix-like shell in C using syscalls (fork, exec, pipe) with pipelines and I/O redirection.\n\n**Portfolio OS** — this site!",
      sources: ['projects/'],
    },
    {
      pattern: /experience|work|job|career|att|at&t|skillz|morse|co.op|intern|role|position|company/,
      heading: '## Experience',
      answer: "**AT&T** (Jul 2025–Present) — Software Engineer. Built Kafka real-time pipelines, reworked an Angular table used by 35,000+ technicians, consolidated apps.\n\n**MORSE Corp** (Jan–Jun 2024) — Python Co-op. Built ML monitoring dashboards with Palantir Foundry, maintained AI data pipelines.\n\n**Skillz** (Jan–Aug 2023) — SDK Co-op. Raised tutorial completion 40% and Day-1 retention 30% on a 3M-MAU gaming platform.",
      sources: ['resume.txt'],
    },
    {
      pattern: /skill|tech|language|framework|stack|know|use|tool|react|python|angular|typescript/,
      heading: '## Skills',
      answer: "**Languages:** TypeScript, JavaScript, Python, Java, SQL, C\n\n**Frontend:** React, Angular, React Native\n\n**Backend/Infra:** Node.js, Flask, FastAPI, Docker, Kafka, Jenkins\n\n**Databases:** MongoDB, MySQL\n\n**AI/ML:** PyTorch, NumPy, Pandas, Palantir Foundry\n\n**Design:** Figma, Graphic & Information Design",
      sources: ['resume.txt'],
    },
    {
      pattern: /education|school|university|northeastern|degree|gpa|graduate|study|major|minor/,
      heading: '## Education',
      answer: "Olivia graduated from **Northeastern University** in Boston (May 2025) with a **B.S. in Computer Science** and a **Minor in Graphic & Information Design**. She maintained a **3.9/4.0 GPA** and was on the **Dean's List** throughout.",
      sources: ['education'],
    },
    {
      pattern: /hire|available|open|opportunit|recruit/,
      heading: '## Availability',
      answer: "Olivia is **open to new opportunities** 🎉 She's particularly interested in roles at the intersection of strong engineering and design craft. Reach her at **oliviagao825@gmail.com** or linkedin.com/in/olivia-gao03.",
      sources: ['contact.json'],
    },
    {
      pattern: /contact|email|reach|phone|linkedin|github/,
      heading: '## Contact',
      answer: "✉️ oliviagao825@gmail.com\n📞 (908) 581-2578\n💼 linkedin.com/in/olivia-gao03\n🐙 github.com/olivegaoden",
      sources: ['contact.json'],
    },
    {
      pattern: /who|about|olivia|tell me|introduce|background|summary/,
      heading: '## About',
      answer: "Olivia Gao is a software engineer based in the NYC metro area. She graduated from **Northeastern University** in 2025 (CS + Graphic & Information Design minor, 3.9 GPA) and currently works at **AT&T**. She has industry experience at MORSE Corp and Skillz, and builds things that are both technically solid and feel great to use. ✨",
      sources: ['about_me.txt', 'resume.txt'],
    },
    {
      pattern: /strength|good at|best at|excel|stand out|superpower/,
      heading: '## Strengths',
      answer: "**User experience focus** — her first instinct on anything she builds is whether it's intuitive and frictionless. She spots pain points and fixes them without being asked.\n\n**Shipping in complex codebases** — at AT&T she reworked a table used by 35,000+ technicians and consolidated two apps, making impactful changes in a large existing system.\n\n**Measurable outcomes** — she thinks in metrics: +40% tutorial completion, +30% Day-1 retention, +7% paid conversions at Skillz.\n\n**Independent but collaborative** — solves problems on her own but knows when to ask for help.\n\n**Full-stack breadth** — frontend (Angular, React), backend (Kafka, Flask), ML pipelines (Palantir Foundry), and mobile (React Native).",
      sources: ['about_me.txt', 'resume.txt'],
    },
    {
      pattern: /weakness|weaknesses|area.for.growth|improve|challenge|working.on|struggle/,
      heading: '## Areas for Growth',
      answer: "**Over-scoping** — because she sees the full picture and cares about quality, she sometimes wants to fix everything she notices rather than staying focused on the task at hand. She's working on staying focused and filing separate tickets for improvements she spots.\n\n**Public speaking** — presenting to large audiences is something she finds challenging and is actively working to improve by seeking out opportunities to present.",
      sources: ['about_me.txt'],
    },
    {
      pattern: /interest|hobby|outside|fun|crochet|gaming|sing|personal/,
      heading: '## Interests',
      answer: "Outside of work, Olivia enjoys **crochet** 🧶, **cozy gaming** 🎮, and **singing** 🎤. Her design minor means she thinks carefully about aesthetics and user experience in everything she builds.",
      sources: ['about_me.txt'],
    },
    {
      pattern: /frontend|front.end|front end|ui|interface/,
      heading: '## Specialty Areas',
      answer: "**Frontend:** Olivia has strong frontend experience — Angular at AT&T (35,000+ technicians), React at Skillz (3M MAUs), and React Native for cross-platform mobile. She also has a Graphic & Information Design minor which shapes how she thinks about UI.",
      sources: ['resume.txt', 'projects/'],
    },
    {
      pattern: /backend|back.end|back end/,
      heading: '## Specialty Areas',
      answer: "**Backend:** Olivia has strong backend experience — Node.js, Flask, FastAPI, Kafka pipelines (AT&T), REST APIs, Docker, Jenkins CI/CD.",
      sources: ['resume.txt', 'projects/'],
    },
    {
      pattern: /ml|machine learning|ai|artificial intelligence/,
      heading: '## Specialty Areas',
      answer: "**ML/AI:** Built ML monitoring dashboards at MORSE Corp using Palantir Foundry, fine-tuned a T5 transformer for text simplification, and built a RAG pipeline with FAISS + GPT-4o-mini for this portfolio site.",
      sources: ['resume.txt', 'projects/'],
    },
    {
      pattern: /full.?stack|generalist|breadth/,
      heading: '## Specialty Areas',
      answer: "Olivia has full-stack experience across frontend, backend, and ML/AI. She's comfortable working across the stack and enjoys projects that let her leverage that breadth.",
      sources: ['resume.txt', 'projects/'],
    },
    {
      pattern: /authorized|work authorization|visa|citizen|sponsorship|eligible/,
      heading: '## Work Authorization',
      answer: "Olivia is a **US citizen** and fully authorized to work in the United States. No visa sponsorship is required.",
      sources: ['contact.json'],
    },
    {
      pattern: /location|remote|hybrid|in.person|onsite|on.site|relocat|where.*work|work.*where/,
      heading: '## Location & Work Preference',
      answer: "Olivia is based in the **NYC metro area** and is open to **in-person, hybrid, or fully remote** roles.",
      sources: ['contact.json'],
    },
    {
      pattern: /start|notice|available|when.*start|start.*when/,
      heading: '## Start Date',
      answer: "Olivia can start with **2 weeks notice** after accepting an offer.",
      sources: ['contact.json'],
    },
    {
      pattern: /looking for|next role|ideal role|want in a job|seeking|what.*want|goals|why.*new|why.*looking|career goal/,
      heading: '## What She\'s Looking For',
      answer: "Olivia is looking for a role where she can **grow across the stack** — particularly deepening her experience in **ML and AI** while continuing her full-stack work. She wants to combine both effectively to become a stronger engineer and stay ahead of how the industry is evolving.\n\nBeyond the technical side, she wants to work on a **product she's genuinely passionate about**, at a company where she can **have a voice** — making suggestions, shaping decisions, and contributing beyond just executing tickets.",
      sources: ['about_me.txt'],
    },
    {
      pattern: /salary|compensation|pay|rate|expect.*salary|salary.*expect/,
      heading: '## Compensation',
      answer: "For specific compensation expectations, please reach out to Olivia directly at **oliviagao825@gmail.com** — she's happy to discuss.",
      sources: ['contact.json'],
    },
  ]

  const matches = topics.filter(t => t.pattern.test(q))

  if (matches.length === 0) {
    return {
      answer: "I'm Olivia's AI assistant! I can answer questions about her **projects**, **work experience**, **skills**, **education**, **strengths**, **weaknesses**, **availability**, or how to **contact** her. What would you like to know? ✨",
      sources: [],
    }
  }

  if (matches.length === 1) {
    return { answer: matches[0].answer, sources: matches[0].sources }
  }

  // Multiple topics — combine with headings
  const answer = matches.map(m => `${m.heading}\n${m.answer}`).join('\n\n')
  const sources = [...new Set(matches.flatMap(m => m.sources))]
  return { answer, sources }
}

// ── Main export ────────────────────────────────────────────────────────────
export async function queryAI(
  question: string,
  history: ConversationMessage[] = [],
): Promise<AIResponse> {
  // 1. Try FastAPI RAG backend
  const backendResult = await tryBackend(question, history)
  if (backendResult) {
    console.log('[AI] tier 1: RAG backend')
    return { ...backendResult, model: backendResult.model ?? 'gpt-4o-mini (RAG)' }
  }

  // 2. Static fallback
  console.log('[AI] backend unavailable → static fallback')
  return { ...staticFallback(question), model: 'built-in' }
}
