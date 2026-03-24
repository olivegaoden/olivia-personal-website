export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  githubUrl?: string
  liveUrl?: string
  badge?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'huskyflow',
    title: 'HuskyFlow',
    description: 'Full-stack Q&A platform inspired by Stack Overflow with community spaces, user following, Google OAuth, and real-time polls via WebSockets that auto-expire.',
    tech: ['TypeScript', 'React', 'Node.js', 'MongoDB', 'WebSockets'],
    githubUrl: 'https://github.com/olivegaoden/CS4530-fake-stack-overflow',
    liveUrl: 'https://cs4530-s25-103.onrender.com',
  },
  {
    id: 'text-simplification',
    title: 'Text Simplification App',
    description: 'Text simplification model using a custom word complexity approach and a fine-tuned T5 transformer. React + Flask app that accepts text or audio and returns simplified output with text-to-speech.',
    tech: ['Python', 'PyTorch', 'React', 'Flask'],
    githubUrl: 'https://github.com/olivegaoden/NLP-text-simplification',
  },
  {
    id: 'shell',
    title: 'Custom Command Line Shell',
    description: 'Unix-like shell implemented in C using Linux syscalls (fork, exec, pipe) with full support for command execution, pipelines, and I/O redirection.',
    tech: ['C', 'Linux']
  },
  {
    id: 'portfolio-os',
    title: 'Portfolio OS',
    description: 'This site! A pixel-art desktop OS portfolio with a draggable window system, taskbar, and an AI assistant.',
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    githubUrl: 'https://github.com/olivegaoden/olivia-personal-website',
  },
]

export interface Experience {
  company: string
  role: string
  period: string
  bullets: string[]
}

export const EXPERIENCE: Experience[] = [
  {
    company: 'AT&T',
    role: 'Software Engineer',
    period: 'Jul 2025 – Present',
    bullets: [
      'Replaced client-side polling with a Kafka-based pipeline for real-time Angular frontend updates, reducing API load.',
      'Reworked a core Angular data table used by 35,000+ AT&T technicians — added column resizing and improved performance for large datasets.',
      'Consolidated two Angular apps into a single codebase by merging shared modules, reducing duplication.',
    ],
  },
  {
    company: 'MORSE Corp',
    role: 'Python Software Engineer Co-op',
    period: 'Jan 2024 – Jun 2024',
    bullets: [
      'Built a Python dashboard using the Palantir Foundry API to monitor ML model performance and accuracy metrics.',
      'Maintained data pipelines and transforms for testing and evaluation of machine learning models.',
      'Integrated data from computer vision systems, traditional sensors, and human-labeled data for AI projects.',
    ],
  },
  {
    company: 'Skillz',
    role: 'SDK Co-op',
    period: 'Jan 2023 – Aug 2023',
    bullets: [
      'Increased tutorial completion 40%, Day-1 retention 30%, and Day-0 paid conversions 7% for a platform with 3M MAUs.',
      'Developed a cross-platform league progression system used in 6M+ daily competitions.',
      'Resolved UI and authentication bugs in SSO flows across supported games.',
    ],
  },
]

export interface Skill {
  label: string
  pct: number
  variant?: 'lav' | 'pink' | 'sky'
}

export const SKILLS_LANGUAGES: string[] = ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'C']
export const SKILLS_FRONTEND: string[]  = ['React', 'Angular', 'React Native', 'Node.js', 'WebSockets']
export const SKILLS_BACKEND: string[]   = ['MongoDB', 'MySQL', 'Docker', 'Kafka', 'Jenkins', 'Flask']
export const SKILLS_AI: string[]        = ['PyTorch', 'NumPy', 'Pandas', 'Palantir Foundry']
export const SKILLS_DESIGN: string[]    = ['Graphic Design', 'Information Design', 'Figma']

export const PROFICIENCY: Skill[] = [
  { label: 'Frontend',  pct: 94, variant: 'lav'  },
  { label: 'Backend',   pct: 80, variant: 'sky'  },
  { label: 'AI / ML',   pct: 72, variant: 'sky'  },
  { label: 'Design',    pct: 85, variant: 'pink' },
]
