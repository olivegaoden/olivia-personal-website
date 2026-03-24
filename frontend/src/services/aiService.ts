// ── Olivia's complete knowledge base — embedded directly so the LLM always
//    has full context even when the FastAPI backend is offline.
const OLIVIA_CONTEXT = `
# Olivia Gao — Full Profile

## Personal
- Name: Olivia Gao
- Location: New York Metropolitan Area
- Email: oliviagao825@gmail.com
- Phone: (908) 581-2578
- LinkedIn: linkedin.com/in/olivia-gao03
- GitHub: github.com/olivegaoden
- Open to new opportunities: Yes

## Education
- Northeastern University, Boston MA — B.S. Computer Science, Minor in Graphic & Information Design
- Graduation: May 2025
- GPA: 3.9/4.0, Dean's List throughout

## Technical Skills
- Languages: Java, Python, TypeScript, JavaScript, SQL, C
- Frontend: React, Angular, React Native, HTML, CSS
- Backend/Infra: Node.js, Flask, FastAPI, Docker, Jenkins, Kafka, Git, Linux
- Databases: MongoDB, MySQL
- AI/ML: PyTorch, NumPy, Pandas, Palantir Foundry (ML pipelines)
- Mobile: Xcode (iOS), Android Studio
- Design: Figma, Graphic Design, Information Design, UI/UX

## Work Experience

### AT&T — Software Engineer (Jul 2025 – Present)
- Replaced client-side polling with a Kafka-based event pipeline, enabling real-time updates in the Angular frontend and significantly reducing API load
- Reworked a core Angular data table used daily by 35,000+ AT&T field technicians — added column resizing and optimized rendering performance for large datasets
- Consolidated two separate Angular applications into a unified codebase by merging shared modules, reducing duplication and improving long-term maintainability
- Stack: Angular, TypeScript, Kafka, REST APIs

### MORSE Corp — Python Software Engineer Co-op (Jan 2024 – Jun 2024)
- Built an internal Python dashboard using the Palantir Foundry API to monitor ML model performance metrics (accuracy, drift, precision/recall), helping engineers quickly identify and debug underperforming models
- Maintained data transformation pipelines used for testing and evaluation of machine learning systems
- Integrated heterogeneous data sources: computer vision systems, traditional sensors, and human-labeled ground truth data for AI/ML training workflows
- Stack: Python, Palantir Foundry, data pipelines, ML evaluation

### Skillz — SDK Co-op (Jan 2023 – Aug 2023)
- Increased tutorial completion rate by 40%, Day-1 retention by 30%, and Day-0 paid conversions by 7% for a real-money gaming platform with 3 million monthly active users
- Designed and built a new player onboarding tutorial and procedural username generator that improved first-session engagement
- Developed a cross-platform league progression system integrated into 6M+ daily competitions, improving long-term player retention metrics
- Resolved UI and authentication bugs in single-sign-on (SSO) flows to ensure reliable login across supported games
- Stack: React Native, iOS (Xcode), Android Studio, SSO/OAuth

## Projects

### HuskyFlow (TypeScript, React, Node.js, MongoDB, WebSockets)
- Full-stack Q&A platform inspired by Stack Overflow
- Features: community spaces, user following, Google OAuth sign-in, real-time polls (votes update live and polls auto-expire via WebSockets)
- GitHub: github.com/olivegaoden/CS4530-fake-stack-overflow
- Has a live demo

### Text Simplification Application (Python, PyTorch, React, Flask)
- Built a custom text complexity scorer and fine-tuned a T5 transformer model for text simplification
- Created a React + Flask web app accepting text or audio input that returns simplified output with text-to-speech
- GitHub: github.com/olivegaoden/NLP-text-simplification

### Custom Command Line Shell (C, Linux)
- Implemented a Unix-like shell from scratch in C using Linux syscalls: fork, exec, pipe
- Supports full command execution, multi-stage pipelines, and I/O redirection (< > |)
- GitHub: github.com/olivegaoden

### Portfolio OS (React, TypeScript, Vite, Tailwind, FastAPI, FAISS)
- This interactive portfolio website, designed as a desktop OS UI
- Features draggable/resizable windows, a window manager with z-index focus, responsive layout (desktop OS + mobile scrollable view), and this AI assistant

## Interests & Personality
- Hobbies: crochet, cozy gaming, singing
- Has a design minor which shapes how she thinks about building polished, user-facing software
- Cares about craft, accessibility, and user experience
- Collaborative, curious, enjoys work at the intersection of engineering and design

## Professional Strengths
1. Passion for user experience — first instinct is always whether the design is intuitive and frictionless; actively finds pain points and fixes them
2. Shipping in complex codebases — reworked a table used by 35,000+ AT&T technicians, consolidated two apps; comfortable making impactful changes in large existing systems
3. Attention to measurable outcomes — thinks in metrics: +40% tutorial completion, +30% Day-1 retention, +7% paid conversions at Skillz; Kafka pipeline reducing API load at AT&T
4. Independence — solves problems autonomously but knows when to ask for help to avoid being blocked too long
5. Breadth across the stack — frontend, backend, ML pipelines, mobile

## Weaknesses / Areas for Growth
1. Over-scoping — tends to notice and want to fix everything in scope; working on staying focused on the task and filing separate tickets for improvements spotted along the way
2. Public speaking / presenting to large groups — finds large-audience presentations challenging; actively working on it by seeking out opportunities to present

## Work Preferences
- Work authorization: US citizen, no sponsorship required
- Work location preference: open to in-person, hybrid, or fully remote in NYC metro area
- Start date: available with 2 weeks notice
- Looking for: a role that combines full-stack and ML/AI work, a product she's passionate about, and an environment where she can have a voice and grow
`.trim()

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

// ── Source label → real URL mapping ───────────────────────────────────────
export const SOURCE_URLS: Record<string, { label: string; url: string }> = {
  'resume.txt':                    { label: 'LinkedIn',               url: 'https://www.linkedin.com/in/olivia-gao03' },
  'about_me.txt':                  { label: 'About Me',               url: 'https://www.linkedin.com/in/olivia-gao03' },
  'contact.json':                  { label: 'Contact / LinkedIn',     url: 'https://www.linkedin.com/in/olivia-gao03' },
  'education':                     { label: 'LinkedIn',               url: 'https://www.linkedin.com/in/olivia-gao03' },
  'projects/':                     { label: 'GitHub',                 url: 'https://github.com/olivegaoden' },
  'projects/huskyflow':            { label: 'HuskyFlow on GitHub',    url: 'https://github.com/olivegaoden/CS4530-fake-stack-overflow' },
  'projects/text-simplification':  { label: 'Text Simplification',    url: 'https://github.com/olivegaoden/NLP-text-simplification' },
  'projects/shell':                { label: 'GitHub',                 url: 'https://github.com/olivegaoden' },
  'projects/portfolio-os':         { label: 'Portfolio OS on GitHub', url: 'https://github.com/olivegaoden/olivia-personal-website' },
}


async function callOpenAI(
  question: string,
  history: ConversationMessage[],
): Promise<AIResponse> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  if (!apiKey) throw new Error('no key')

  const systemPrompt = `You are a helpful AI assistant embedded in Olivia Gao's portfolio website.
Answer questions about Olivia using ONLY the information provided below.
Be friendly, concise, and specific. Use **bold** for emphasis. Keep answers to 3–6 sentences unless more detail is needed.
If asked something not covered in the profile, say you don't have that information and suggest contacting Olivia directly at oliviagao825@gmail.com.
Never make up information.

--- OLIVIA'S PROFILE ---
${OLIVIA_CONTEXT}
--- END PROFILE ---`

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-6), // last 3 turns for context
    { role: 'user', content: question },
  ]

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 400,
      temperature: 0.4,
    }),
    signal: AbortSignal.timeout(15000),
  })

  if (!res.ok) throw new Error(`OpenAI ${res.status}`)
  const data = await res.json()
  const answer = data.choices[0].message.content.trim()

  // Derive source labels from what topics were likely referenced
  const sources = deriveSourceLabels(question + ' ' + answer)
  return { answer, sources, model: 'gpt-4o-mini (browser)' }
}

function deriveSourceLabels(text: string): string[] {
  const t = text.toLowerCase()
  const sources: string[] = []
  if (t.match(/project|huskyflow|simplif|shell|portfolio/)) sources.push('projects/')
  if (t.match(/at&t|morse|skillz|co-op|intern|work|experience|job/)) sources.push('resume.txt')
  if (t.match(/northeastern|gpa|degree|university|education/)) sources.push('education')
  if (t.match(/email|phone|linkedin|github|contact|reach/)) sources.push('contact.json')
  if (t.match(/skill|language|framework|react|python|typescript|angular/)) sources.push('resume.txt')
  return [...new Set(sources)]
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

  // 2. Try direct OpenAI browser call (uses conversation history)
  try {
    const result = await callOpenAI(question, history)
    console.log('[AI] tier 2: OpenAI browser')
    return result
  } catch (e) {
    console.warn('[AI] tier 2 failed:', e, '→ using static fallback')
    // 3. Fall back to comprehensive static answers
    return { ...staticFallback(question), model: 'built-in' }
  }
}
