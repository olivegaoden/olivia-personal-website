# Olivia Gao — Portfolio OS

A pixel-art desktop OS portfolio with a full React frontend, draggable/resizable windows, a responsive mobile layout, and an AI assistant powered by a RAG pipeline (FastAPI + FAISS + OpenAI).

**Live site:** [olivegaoden.github.io/olivia-personal-website](https://olivegaoden.github.io/olivia-personal-website)

---

## Project Structure

```
olivia-personal-website/
├── frontend/                          ← React + TypeScript + Vite + Tailwind
│   ├── public/
│   │   └── resume.pdf
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts                 ← base: '/olivia-personal-website/' for GitHub Pages
│   ├── tsconfig.json
│   └── src/
│       ├── main.tsx
│       ├── App.tsx                    ← desktop/mobile branch, window orchestration
│       ├── styles/
│       │   └── globals.css            ← pixel design system + Tailwind
│       ├── hooks/
│       │   ├── useWindowManager.ts    ← open/close/focus/move/resize + viewport resize
│       │   ├── useDraggable.ts        ← drag with viewport clamping
│       │   └── useViewport.ts         ← live viewport size, useIsMobile()
│       ├── services/
│       │   └── aiService.ts           ← 2-tier: RAG backend → static fallback
│       ├── data/
│       │   └── portfolio.ts           ← projects, skills, experience
│       └── components/
│           ├── Taskbar.tsx
│           ├── DesktopIcons.tsx       ← single-click pixel SVG icons
│           ├── DesktopBackground.tsx  ← pixel clouds, stars, moon
│           ├── Statusbar.tsx
│           ├── MobileView.tsx         ← full scrollable mobile layout with inline AI chat
│           └── windows/
│               ├── Window.tsx         ← reusable draggable/resizable window shell
│               ├── WelcomeWindow.tsx
│               ├── AboutWindow.tsx
│               ├── ExperienceWindow.tsx
│               ├── ProjectsWindow.tsx
│               ├── ContactWindow.tsx
│               ├── ResumeWindow.tsx   ← PDF embed + download button
│               └── AIWindow.tsx       ← chat UI with conversation memory
│
└── backend/                           ← FastAPI + FAISS + OpenAI
    ├── main.py
    ├── requirements.txt
    ├── .python-version                ← pins Python 3.11.9 for Render
    └── app/
        └── rag/
            ├── pipeline.py            ← chunk → embed → FAISS → GPT-4o-mini (disk-cached)
            └── knowledge_base.py      ← resume data as structured chunks
```

---

## Frontend Setup

```bash
cd frontend
npm install
# optional: create .env and set VITE_API_URL to your backend URL
npm run dev   # → http://localhost:5173
```

Build for production:

```bash
npm run build
```

### Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | FastAPI backend URL (default: `http://localhost:8000`) |

---

## Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt
# create .env and set OPENAI_API_KEY=sk-...
uvicorn main:app --reload --port 8000
```

Endpoints:

- `GET  /health` — check RAG pipeline status (`rag_ready: true/false`)
- `POST /query`  — `{ "question": "...", "history": [] }` → `{ "answer": "...", "sources": [...] }`

The backend accepts optional `history` (array of `{role, content}` objects) for conversation-aware responses.

The FAISS index is cached to disk on first build so subsequent startups load instantly without calling OpenAI.

---

## AI Assistant — 2-Tier Fallback

The AI assistant tries each tier in order, falling back silently if one fails:

1. **FastAPI RAG backend** — FAISS vector search over knowledge base chunks, GPT-4o-mini generation with retrieved context and conversation history
2. **Static fallback** — regex-matched topic responses covering all major topics; supports multi-topic questions by combining matched answers with section headings

Each response is tagged with a model badge (`gpt-4o-mini (RAG)` or `built-in`).

---

## Customising Content

**Projects, skills, experience** → `frontend/src/data/portfolio.ts`

**AI knowledge base** → `backend/app/rag/knowledge_base.py`

Each document chunk:

```python
{
    "id":     "unique_id",
    "source": "about_me.txt",
    "text":   "content that gets embedded and retrieved",
}
```

Updating the knowledge base automatically invalidates the disk cache — the index will be rebuilt on next startup.

**Static fallback topics** → `frontend/src/services/aiService.ts` in `staticFallback()`

---

## Deployment

### Frontend → GitHub Pages

Deployed automatically via GitHub Actions on push to `main`. The workflow builds the frontend and pushes to the `gh-pages` branch.

Set these as GitHub Actions secrets in your repo settings:

| Secret | Value |
|---|---|
| `VITE_API_URL` | Your Render backend URL |

`vite.config.ts` sets `base: '/olivia-personal-website/'` for correct asset paths on GitHub Pages.

### Backend → Render

- Root directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Environment variable: `OPENAI_API_KEY=sk-...`
- Python version pinned to 3.11.9 via `backend/.python-version`

The backend starts successfully even if the OpenAI embedding call fails on startup — it sets `rag.ready = False` and the frontend falls back to the static tier gracefully.

---

## Features

| Feature | Details |
|---|---|
| Window system | Open, close, minimize, drag, resize, z-index focus stacking |
| Desktop OS UI | Taskbar with live clock and open window tabs, pixel icons, statusbar |
| Pixel art aesthetic | SVG pixel icons, clouds, stars, moon, pixel borders, Press Start 2P font |
| Responsive layout | Full desktop OS on large screens; dedicated scrollable mobile layout below 768px |
| AI assistant | RAG pipeline with conversation memory, model badge, multi-topic static fallback |
| Resume window | PDF embed with download button (`public/resume.pdf`) |
| Mobile layout | Sticky nav, hero, about/skills/experience/projects/contact/resume/AI chat sections |
| Zero-backend fallback | Comprehensive static answers always available, no API required |
| FAISS index caching | Embeddings cached to disk — cold starts load instantly without OpenAI calls |
