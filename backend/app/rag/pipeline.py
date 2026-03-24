"""
RAG Pipeline
============
1. Chunk documents
2. Embed via OpenAI text-embedding-3-small
3. Store in FAISS
4. At query time: embed → retrieve top-k → generate with gpt-4o-mini
"""
import logging
from typing import Any

logger = logging.getLogger(__name__)

try:
    import numpy as np
    import faiss
    from openai import OpenAI
    DEPS_OK = True
except ImportError:
    DEPS_OK = False
    logger.warning("numpy / faiss-cpu / openai not installed — running in stub mode")

from app.rag.knowledge_base import DOCUMENTS

EMBED_MODEL = "text-embedding-3-small"
CHAT_MODEL  = "gpt-4o-mini"
TOP_K       = 6
CHUNK_WORDS = 120
OVERLAP     = 20


class RAGPipeline:
    def __init__(self, api_key: str | None = None):
        self.api_key = api_key
        self.ready   = False
        self.chunks: list[dict] = []
        self.index   = None
        self.client  = None

        if DEPS_OK and api_key:
            self.client = OpenAI(api_key=api_key)

    # ── Build FAISS index ─────────────────────────────────────────────────
    def build_index(self):
        if not DEPS_OK or not self.client:
            logger.warning("Skipping FAISS build — missing deps or API key")
            return

        self.chunks = self._chunk_documents(DOCUMENTS)
        texts = [c["text"] for c in self.chunks]

        logger.info(f"Embedding {len(texts)} chunks…")
        vectors = self._embed(texts)

        dim = len(vectors[0])
        self.index = faiss.IndexFlatL2(dim)
        self.index.add(np.array(vectors, dtype="float32"))
        self.ready = True
        logger.info(f"FAISS index built — {self.index.ntotal} vectors, dim={dim}")

    # ── Query ─────────────────────────────────────────────────────────────
    def query(self, question: str, history: list | None = None) -> dict:
        if not self.ready:
            return {"answer": "AI backend not configured. Set OPENAI_API_KEY.", "sources": []}

        q_vec = np.array(self._embed([question]), dtype="float32")
        _, idxs = self.index.search(q_vec, TOP_K)
        hits = [self.chunks[i] for i in idxs[0] if i < len(self.chunks)]

        context = "\n\n".join(f"[{c['source']}]\n{c['text']}" for c in hits)
        sources = list(dict.fromkeys(c["source"] for c in hits))

        system_msg = {
            "role": "system",
            "content": (
                "You are a helpful AI assistant embedded in Olivia Gao's portfolio website. "
                "Answer questions about Olivia using ONLY the provided context. "
                "Be friendly, specific, and enthusiastic. Use **bold** for key terms. "
                "For simple questions answer in 2-3 sentences. "
                "For questions about experience, projects, or skills, give structured detail "
                "with bullet points or clear sections as needed. "
                "If the answer isn't in the context, say so honestly and suggest emailing "
                "oliviagao825@gmail.com. Never make up information.\n\n"
                f"Context about Olivia:\n{context}"
            ),
        }

        prior = (history or [])[-6:]
        messages = [system_msg, *prior, {"role": "user", "content": question}]

        resp = self.client.chat.completions.create(
            model=CHAT_MODEL,
            messages=messages,
            temperature=0.4,
            max_tokens=500,
        )

        return {"answer": resp.choices[0].message.content.strip(), "sources": sources}

    # ── Helpers ───────────────────────────────────────────────────────────
    def _chunk_documents(self, docs: list[dict]) -> list[dict]:
        chunks = []
        for doc in docs:
            words = doc["text"].split()
            i = 0
            while i < len(words):
                chunk = " ".join(words[i : i + CHUNK_WORDS])
                chunks.append({"text": chunk, "source": doc["source"], "doc_id": doc["id"]})
                if i + CHUNK_WORDS >= len(words):
                    break
                i += CHUNK_WORDS - OVERLAP
        return chunks

    def _embed(self, texts: list[str]) -> list[list[float]]:
        resp = self.client.embeddings.create(model=EMBED_MODEL, input=texts)
        return [item.embedding for item in resp.data]
