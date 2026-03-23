"""
Olivia's knowledge base — source documents for the RAG system.
Edit these to customise what the AI knows about you.
"""

DOCUMENTS = [
    {
        "id": "bio",
        "source": "about_me.txt",
        "text": (
            "Olivia is a software engineer based in New York City who specialises in "
            "frontend development and UX engineering. She builds interfaces that are "
            "beautiful, accessible, and performant. She has 4+ years of experience "
            "working at NYC startups, building frontend systems and design systems. "
            "She is passionate about design systems, micro-animations, pixel art, "
            "and making complex things feel simple for users."
        ),
    },
    {
        "id": "skills_frontend",
        "source": "resume.txt",
        "text": (
            "Olivia's frontend skills include React, TypeScript, Next.js, HTML, CSS, "
            "Tailwind CSS, Framer Motion, D3.js, Canvas API, and WebSockets. "
            "She is expert-level in React and TypeScript with 4 years of production use. "
            "She has deep knowledge of CSS animations, layout systems, and responsive design."
        ),
    },
    {
        "id": "skills_ux",
        "source": "about_me.txt",
        "text": (
            "Olivia's UX and design skills include Figma, design systems architecture, "
            "accessibility (WCAG 2.1 AA), user research, usability testing, "
            "pixel art, and interaction design. She approaches engineering from a "
            "design-first perspective and cares deeply about the craft of interfaces."
        ),
    },
    {
        "id": "skills_backend",
        "source": "resume.txt",
        "text": (
            "Olivia's backend and AI skills include Node.js, Python, FastAPI, "
            "PostgreSQL, REST APIs, RAG pipelines, FAISS vector databases, and OpenAI APIs. "
            "She builds full-stack systems but her primary focus is frontend and UX."
        ),
    },
    {
        "id": "project_designflow",
        "source": "projects/designflow",
        "text": (
            "DesignFlow is a collaborative design tool Olivia built with real-time multi-user "
            "editing via WebSockets, version history, and component libraries. "
            "Tech stack: React, WebSockets, Canvas API, Node.js. "
            "It supports multiplayer editing with optimistic UI updates."
        ),
    },
    {
        "id": "project_greenpath",
        "source": "projects/greenpath",
        "text": (
            "GreenPath is a carbon footprint tracker with D3.js data visualisations. "
            "It helps users understand their environmental impact and has 5,000+ users. "
            "Tech stack: Next.js, D3.js, PostgreSQL, Tailwind. Open source."
        ),
    },
    {
        "id": "project_moodboard",
        "source": "projects/moodboard-ai",
        "text": (
            "Moodboard AI is an AI-powered moodboard generator that creates cohesive visual "
            "themes from natural language prompts. Olivia built the RAG pipeline from scratch "
            "using FAISS and OpenAI embeddings. Won Best UX at HackNYC 2024. "
            "Tech stack: TypeScript, FastAPI, FAISS, OpenAI API, Figma API."
        ),
    },
    {
        "id": "project_portfolio",
        "source": "projects/portfolio-os",
        "text": (
            "Portfolio OS is Olivia's interactive portfolio website built as a desktop OS UI "
            "with draggable windows, z-index stacking, and an AI assistant powered by a RAG pipeline. "
            "The design uses a pixel-art aesthetic with a dreamy pink/lavender palette. "
            "Tech stack: React, TypeScript, Framer Motion, FastAPI, FAISS."
        ),
    },
    {
        "id": "experience",
        "source": "resume.txt",
        "text": (
            "Olivia has 4+ years of professional software engineering experience. "
            "She has worked at multiple NYC-based startups as a frontend and UX engineer. "
            "She has led design system initiatives, built real-time collaborative tools, "
            "and shipped features used by thousands. Currently open to new opportunities."
        ),
    },
    {
        "id": "contact_availability",
        "source": "contact.json",
        "text": (
            "Olivia is actively seeking new software engineering opportunities, especially "
            "at frontend-heavy, design-conscious teams. Available for full-time roles. "
            "Email: olivia@example.com. LinkedIn: linkedin.com/in/olivia-dev. "
            "GitHub: github.com/olivia-dev. Twitter: @olivia_builds."
        ),
    },
    {
        "id": "personality",
        "source": "about_me.txt",
        "text": (
            "Olivia values craft, accessibility, and user delight. She believes great software "
            "should feel as good as it works. Outside of work she collects mechanical keyboards, "
            "creates pixel art, and makes excellent matcha lattes. She loves the detail work — "
            "micro-animations, pixel-perfect layouts, and thoughtful interactions."
        ),
    },
]
