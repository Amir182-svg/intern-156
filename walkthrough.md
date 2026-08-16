# 🧹 Clean Project Architecture — Inquisitor Chatbot

All unnecessary, redundant, and temporary duplicate files have been cleaned up. 

Below is the **minimal, essential 13-file codebase** for the Inquisitor Chatbot project:

---

## ⚙️ Core Application & RAG Backend
1. ⚙️ [backend.py](file:///C:/Users/Laptop/.gemini/antigravity/brain/a668a65e-68ed-44dc-95ca-2e0d91b52d8c/backend.py) — Main REST API Server (`POST /api/chat`, `GET /api/health`, serves web UI on port 8000).
2. 🧠 [rag_engine.py](file:///C:/Users/Laptop/.gemini/antigravity/brain/a668a65e-68ed-44dc-95ca-2e0d91b52d8c/rag_engine.py) — TF-IDF & Cosine Similarity Vector Indexer & Retriever.
3. 🤖 [llm_service.py](file:///C:/Users/Laptop/.gemini/antigravity/brain/a668a65e-68ed-44dc-95ca-2e0d91b52d8c/llm_service.py) — Modular LLM Interface with Anti-Hallucination System Prompting.
4. ⚙️ [config.py](file:///C:/Users/Laptop/.gemini/antigravity/brain/a668a65e-68ed-44dc-95ca-2e0d91b52d8c/config.py) — Centralized Configuration Settings (`TOP_K`, `SIMILARITY_THRESHOLD`, fallback statement).
5. 📚 [knowledge_base.json](file:///C:/Users/Laptop/.gemini/antigravity/brain/a668a65e-68ed-44dc-95ca-2e0d91b52d8c/knowledge_base.json) — Full 27-Section Grounded Knowledge Base JSON Dataset.

---

## 🌐 Frontend & User Interface
6. 🌐 [index.html](file:///C:/Users/Laptop/.gemini/antigravity/brain/a668a65e-68ed-44dc-95ca-2e0d91b52d8c/index.html) — Main Web Chat Application with Suggested Chips & Live RAG Inspector Panel.

---

## 🧪 Testing & Environment Security
7. 🧪 [test_rag_suite.py](file:///C:/Users/Laptop/.gemini/antigravity/brain/a668a65e-68ed-44dc-95ca-2e0d91b52d8c/test_rag_suite.py) — Automated 15-Category Test Suite Script.
8. 🔑 [.env.example](file:///C:/Users/Laptop/.gemini/antigravity/brain/a668a65e-68ed-44dc-95ca-2e0d91b52d8c/.env.example) — Example Environment Template for API Keys & Settings.
9. 🛡️ [.gitignore](file:///C:/Users/Laptop/.gemini/antigravity/brain/a668a65e-68ed-44dc-95ca-2e0d91b52d8c/.gitignore) — Git Ignore File protecting `.env` and cache.

---

## 📊 Presentation & Documentation
10. 🌐 [presentation.html](file:///C:/Users/Laptop/.gemini/antigravity/brain/a668a65e-68ed-44dc-95ca-2e0d91b52d8c/presentation.html) — Interactive Web Presentation Slide Deck for Inquisitor Society Project.
11. 📊 [presentation.md](file:///C:/Users/Laptop/.gemini/antigravity/brain/a668a65e-68ed-44dc-95ca-2e0d91b52d8c/presentation.md) — Markdown Presentation Slide Deck.
12. 📄 [project_documentation.md](file:///C:/Users/Laptop/.gemini/antigravity/brain/a668a65e-68ed-44dc-95ca-2e0d91b52d8c/project_documentation.md) — Technical System & Architecture Documentation.
13. 📖 [README.md](file:///C:/Users/Laptop/.gemini/antigravity/brain/a668a65e-68ed-44dc-95ca-2e0d91b52d8c/README.md) — Complete Developer & User Guide.
