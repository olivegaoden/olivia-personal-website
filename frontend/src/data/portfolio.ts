export interface Project {
  id: string
  emoji: string
  title: string
  description: string
  tech: string[]
  githubUrl: string
  liveUrl?: string
  badge?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'designflow',
    emoji: '🎨',
    title: 'DesignFlow',
    description: 'Collaborative design tool with real-time multi-user editing via WebSockets, version history, and a shared component library.',
    tech: ['React', 'WebSockets', 'Canvas API', 'Node.js'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'greenpath',
    emoji: '🌱',
    title: 'GreenPath',
    description: 'Carbon footprint tracker with beautiful D3.js visualisations. Makes sustainability feel accessible — used by 5,000+ people.',
    tech: ['Next.js', 'D3.js', 'PostgreSQL', 'Tailwind'],
    githubUrl: '#',
    liveUrl: '#',
    badge: 'Open Source',
  },
  {
    id: 'moodboard-ai',
    emoji: '🔮',
    title: 'Moodboard AI',
    description: 'AI-powered moodboard generator that builds cohesive visual themes from natural language. Built the RAG pipeline from scratch.',
    tech: ['TypeScript', 'FastAPI', 'FAISS', 'OpenAI'],
    githubUrl: '#',
    badge: '🏆 Best UX — HackNYC 2024',
  },
  {
    id: 'portfolio-os',
    emoji: '🖥️',
    title: 'Portfolio OS',
    description: 'This site! A pixel-art desktop OS portfolio with a draggable window system, taskbar, and an AI assistant with RAG.',
    tech: ['React', 'TypeScript', 'FastAPI', 'FAISS'],
    githubUrl: '#',
  },
]

export interface Skill {
  label: string
  pct: number
  variant?: 'lav' | 'pink' | 'sky'
}

export const SKILLS_FRONTEND: string[] = ['React', 'TypeScript', 'Next.js', 'CSS / Tailwind', 'Framer Motion', 'D3.js']
export const SKILLS_UX: string[]       = ['Figma', 'Design Systems', 'Accessibility', 'User Research', 'Pixel Art ✨']
export const SKILLS_BACKEND: string[]  = ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'RAG / AI']

export const PROFICIENCY: Skill[] = [
  { label: 'Frontend',  pct: 95, variant: 'lav'  },
  { label: 'UX Design', pct: 88, variant: 'pink' },
  { label: 'Backend',   pct: 72, variant: 'sky'  },
  { label: 'AI / RAG',  pct: 68, variant: 'sky'  },
]
