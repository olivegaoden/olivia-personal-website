# Olivia.dev — Portfolio OS

A pixel-art desktop OS portfolio with a full React frontend, draggable windows, and an AI assistant powered by a RAG pipeline (FastAPI + FAISS + OpenAI).

---

## Project Structure

```
portfolio-os/
├── frontend/                     ← React + TypeScript + Vite
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── src/
│       ├── main.tsx              ← entry point
│       ├── App.tsx               ← root layout, window orchestration
│       ├── styles/
│       │   └── globals.css       ← pixel design system + Tailwind
│       ├── hooks/
│       │   ├── useWindowManager.ts  ← open/close/focus/z-index state
│       │   └── useDraggable.ts      ← drag logic for windows
│       ├── services/
│       │   └── aiService.ts      ← calls /query, falls back locally
│       ├── data/
│       │   └── portfolio.ts      ← projects, skills (edit to customise)
│       └── components/
│           ├── Taskbar.tsx
│           ├── DesktopIcons.tsx
│           ├── DesktopBackground.tsx  ← pixel clouds, stars, moon
│           ├── Statusbar.tsx
│           └── windows/
│               ├── Window.tsx        ← reusable draggable window shell
│               ├── WelcomeWindow.tsx
│               ├── AboutWindow.tsx
│               ├── ProjectsWindow.tsx
│               ├── ContactWindow.tsx
│               └── AIWindow.tsx      ← chat UI with RAG
│
└── backend/                      ← FastAPI + FAISS + OpenAI
    ├── main.py
    ├── requirements.txt
    ├── .env.example
    └── app/
        └── rag/
            ├── pipeline.py       ← chunk → embed → FAISS → generate
            └── knowledge_base.py ← Olivia's resume data (edit this!)
```

---

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env        # edit VITE_API_URL if needed
npm run dev                  # → http://localhost:5173
```

Build for production:
```bash
npm run build
```

---

## Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# → edit .env and set OPENAI_API_KEY=sk-...

uvicorn main:app --reload --port 8000
```

Endpoints:
- `GET  /health` — check RAG status
- `POST /query`  — `{ "question": "..." }` → `{ "answer": "...", "sources": [...] }`

> **Note:** The AI assistant works without the backend — it uses a smart built-in fallback so the portfolio always looks fully functional.

---

## Customising Content

**Projects & skills** → `frontend/src/data/portfolio.ts`

**AI knowledge base** → `backend/app/rag/knowledge_base.py`
Each document is:
```python
{
    "id":     "unique_id",
    "source": "shown as citation in chat",
    "text":   "content that gets embedded and retrieved",
}
```

---

## Deployment

**Frontend** → Vercel / Netlify / GitHub Pages (static export)
```bash
npm run build   # outputs to dist/
```

**Backend** → Render
- Set `OPENAI_API_KEY` environment variable
- Update `VITE_API_URL` in frontend `.env` to your deployed URL

---

## Features

| Feature | Details |
|---|---|
| Window system | Open, close, minimize, drag, resize, z-index stacking |
| Desktop OS UI | Taskbar with tabs + clock, icons, statusbar |
| Pixel art aesthetic | SVG pixel clouds, stars, moon, pixel borders, pixel fonts |
| AI assistant | RAG pipeline (FAISS + OpenAI) with typing animation + source citations |
| Responsive | Works on desktop; windows scroll on smaller screens |
| Zero-backend fallback | Smart local answers if API isn't running |
