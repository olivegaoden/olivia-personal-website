const BACKEND = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export interface AIResponse {
  answer: string
  sources: string[]
}

function localFallback(question: string): AIResponse {
  const q = question.toLowerCase()

  if (q.includes('project') || q.includes('built') || q.includes('made') || q.includes('huskyflow') || q.includes('simplif'))
    return {
      answer: "Olivia has built some great projects! 🛠️\n\n**HuskyFlow** — a full-stack Q&A platform (think Stack Overflow) with real-time polls via WebSockets, Google OAuth, and community spaces. Built with TypeScript, React, Node.js, and MongoDB.\n\n**Text Simplification App** — a fine-tuned T5 transformer model with a React + Flask frontend that simplifies text or audio input, with text-to-speech output.\n\n**Custom CLI Shell** — a Unix-like shell in C using Linux syscalls (fork, exec, pipe) with pipelines and I/O redirection.\n\n**Portfolio OS** — this very site!",
      sources: ['projects/huskyflow', 'projects/text-simplification', 'projects/shell'],
    }

  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('framework'))
    return {
      answer: "Here's Olivia's tech stack:\n\n**Languages:** Java, Python, TypeScript, JavaScript, SQL, C\n\n**Frameworks:** Angular, React, React Native, PyTorch, NumPy, Pandas\n\n**Databases:** MongoDB, MySQL\n\n**Tools:** Git, Docker, Jenkins, Kafka, Postman, Palantir Foundry, Xcode, Android Studio",
      sources: ['resume.txt'],
    }

  if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('att') || q.includes('skillz') || q.includes('morse'))
    return {
      answer: "Olivia has strong industry experience across three companies:\n\n**AT&T** (Jul 2025–Present) — Software Engineer. Built Kafka pipelines, reworked a data table used by 35k+ technicians, consolidated Angular apps.\n\n**MORSE Corp** (Jan–Jun 2024) — Python Co-op. Built ML monitoring dashboards with Palantir Foundry, maintained AI data pipelines.\n\n**Skillz** (Jan–Aug 2023) — SDK Co-op. Boosted Day-1 retention 30% and tutorial completion 40% on a 3M-MAU gaming platform.",
      sources: ['experience/att', 'experience/morse-corp', 'experience/skillz'],
    }

  if (q.includes('education') || q.includes('school') || q.includes('university') || q.includes('degree') || q.includes('northeastern') || q.includes('gpa'))
    return {
      answer: "Olivia graduated from **Northeastern University** in Boston, MA in May 2025 with a **B.S. in Computer Science** and a **Minor in Graphic & Information Design**. She had a **3.9/4.0 GPA** and was on the **Dean's List**.",
      sources: ['resume.txt'],
    }

  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('linkedin') || q.includes('github'))
    return {
      answer: "You can reach Olivia here:\n\n✉️ oliviagao825@gmail.com\n📞 (908) 581-2578\n💼 linkedin.com/in/olivia-gao03\n🐙 github.com/olivegaoden\n📍 New York Metropolitan Area",
      sources: ['contact.json'],
    }

  if (q.includes('interest') || q.includes('hobby') || q.includes('outside') || q.includes('fun') || q.includes('crochet') || q.includes('gaming'))
    return {
      answer: "Outside of engineering, Olivia enjoys **crochet**, **cozy gaming**, and **singing**! 🧶🎮🎵 Her background in Graphic & Information Design also shapes how she thinks about building software.",
      sources: ['about_me.txt'],
    }

  if (q.includes('who') || q.includes('olivia') || q.includes('about') || q.includes('tell me'))
    return {
      answer: "Olivia Gao is a software engineer based in the New York Metropolitan Area. She graduated from **Northeastern University** in May 2025 (CS + Graphic & Information Design Minor, 3.9 GPA). She currently works at **AT&T** as a Software Engineer and has co-op experience at MORSE Corp and Skillz. She's strong across frontend, backend, and ML. ✨",
      sources: ['about_me.txt', 'resume.txt'],
    }

  return {
    answer: "I'm Olivia's AI assistant! I can tell you about her **projects**, **work experience**, **skills**, **education**, or how to **contact** her. What would you like to know? ✨",
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
