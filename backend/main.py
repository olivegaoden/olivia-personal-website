"""
Olivia Portfolio — RAG Backend
FastAPI + FAISS + OpenAI
"""
import logging
import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.rag.pipeline import RAGPipeline

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Olivia Portfolio AI",
    description="RAG-powered AI assistant for Olivia's portfolio",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # lock to your domain in production
    allow_methods=["*"],
    allow_headers=["*"],
)

rag: RAGPipeline | None = None


@app.on_event("startup")
async def startup():
    global rag
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        logger.warning("OPENAI_API_KEY not set — AI will be unavailable")
    rag = RAGPipeline(api_key=api_key)
    rag.build_index()
    logger.info("RAG pipeline ready ✓")


class QueryRequest(BaseModel):
    question: str
    history: list[dict] = []  # [{"role": "user"|"assistant", "content": "..."}]

class QueryResponse(BaseModel):
    answer: str
    sources: list[str]


@app.get("/health")
def health():
    return {"status": "ok", "rag_ready": rag is not None and rag.ready}


@app.post("/query", response_model=QueryResponse)
async def query(req: QueryRequest):
    if not req.question.strip():
        raise HTTPException(400, "Question cannot be empty")
    if not rag or not rag.ready:
        raise HTTPException(503, "RAG pipeline not ready")
    try:
        result = rag.query(req.question, history=req.history)
        return QueryResponse(**result)
    except Exception as e:
        logger.error(f"Query error: {e}")
        raise HTTPException(500, str(e))
