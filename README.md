# 🏛️ AI-Powered Inquisitor Society Chatbot — Developer & User Guide
**Group AI_07 | Track 1: Inquisitor Chatbot Project**  
**Institution:** University of Engineering & Technology (UET), Lahore  

---

## 📋 1. Project Structure & Modified Files

```
D:\inquisitor-chatbox\inquisitor-chatbox\
├── config.py              # Centralized RAG, LLM, and Fallback Configuration
├── .env.example           # Example environment template for secrets
├── .env                   # Local secrets & API key file (GitIgnored)
├── .gitignore             # Git ignore file protecting API keys & cache
├── knowledge_base.json    # Full 27-Section Grounded JSON Knowledge Base
├── rag_engine.py          # RAG Retriever, Vector Embeddings & Indexer Engine
├── llm_service.py         # Modular LLM Connector & Anti-Hallucination Prompt Service
├── backend.py             # Python REST API Backend Server (Port 8000)
├── index.html             # Existing Web Chat Interface & Live RAG Inspector
├── test_rag_suite.py      # Automated 15-Category Test Suite Script
└── README.md              # Complete Technical Documentation Guide
```

---

## 🔍 2. Explanation of Project Files

1. **`config.py`**: Centralized configuration file reading from `.env`. Contains RAG settings (`TOP_K`, `SIMILARITY_THRESHOLD`, `CHUNK_SIZE`, `CHUNK_OVERLAP`), LLM model name, server host/port, and configurable fallback statements.
2. **`knowledge_base.json`**: Grounded JSON dataset containing 24 structured entries across all 27 sections of the Inquisitors Society documentation.
3. **`rag_engine.py`**: Reads `knowledge_base.json`, tokenizes content, computes TF-IDF Inverse Document Frequency vectors, and performs Cosine Similarity search with score thresholding.
4. **`llm_service.py`**: Formats the Anti-Hallucination System Prompt. Connects to Google Gemini API (if key is set) or runs a Grounded Fallback Synthesizer (offline zero-cost mode).
5. **`backend.py`**: Python HTTP Server exposing `POST /api/chat`, `GET /api/health`, and serving `index.html` on the root URL.
6. **`index.html`**: Existing Web Chat Interface preserved and connected to `/api/chat`, featuring a Live RAG Inspector panel showing detected intent, confidence score, and top vector chunk.
7. **`test_rag_suite.py`**: Automated test suite executing 15 test categories with a pass/fail table report.

---

## 🧠 3. How the RAG Pipeline Works

```
USER QUESTION
     ↓
`backend.py` (Validates query & length)
     ↓
`rag_engine.py` (Vector Search & Cosine Similarity)
     ↓
Retrieves Top 3 Chunks from `knowledge_base.json`
     ↓
Check similarity score >= SIMILARITY_THRESHOLD (0.25)
     ├─► If Score < 0.25: Trigger Configurable Fallback Statement immediately
     └─► If Score >= 0.25: Format Grounded Context
     ↓
`llm_service.py` (Anti-Hallucination System Prompt)
     ↓
LLM / Grounded Engine
     ↓
Generated Grounded Answer ➔ Returned to Chat UI
```

---

## 🤖 4. How the LLM is Connected

The LLM is connected via `llm_service.py` using a modular architecture:
- **Primary API Mode:** If `GEMINI_API_KEY` is present in `.env`, it connects to `google.generativeai` (Gemini 1.5 Flash).
- **Zero-Cost Offline Mode:** If no API key is set, it executes a Rule-Based Grounded Synthesizer that returns the top retrieved chunk directly without hallucination or API costs.
- **Local Open-Source LLM Mode:** Can be pointed to an Ollama endpoint (`http://localhost:11434`) by changing `LLM_MODEL=ollama/llama3` in `config.py`.

---

## 🛠️ 5. How to Install Dependencies

No heavy external dependencies are required! The system runs on standard Python 3.8+:

```bash
# (Optional) Install google-generativeai for Gemini API support
pip install google-generativeai
```

---

## ⚙️ 6. How to Configure Environment Variables

1. Copy `.env.example` to create `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and add your API key (if using Gemini):
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   LLM_MODEL=gemini-1.5-flash
   TOP_K=3
   SIMILARITY_THRESHOLD=0.25
   ```

---

## 🚀 7. How to Start the Application

### Method A: Start Backend Server & Web UI
In your VS Code terminal, run:
```bash
python backend.py
```
Output:
```text
Inquisitor Society AI Chatbot Server Running
URL: http://127.0.0.1:8000
KB Loaded: 24 chunks
```
Then open **`http://127.0.0.1:8000`** in your browser!

### Method B: Standalone Web Interface (Zero-Dependency Offline Mode)
Double click or open **`index.html`** directly in any web browser!

---

## 🔄 8. How to Update the Knowledge Base

To add new FAQs, internship details, or course rules:
1. Open `knowledge_base.json`.
2. Add a new JSON object following this format:
   ```json
   {
     "id": "kb_25",
     "category": "02. Society Activities",
     "question": "What is the new workshop topic?",
     "content": "The upcoming workshop focuses on Advanced Prompt Engineering.",
     "source": "Official Announcement",
     "keywords": ["workshop", "prompt", "engineering"]
   }
   ```
3. Save the file.

---

## ⚡ 9. How to Rebuild/Re-index Embeddings

When `knowledge_base.json` is updated:
- The backend automatically re-indexes vector embeddings when `backend.py` is started.
- You can also trigger programmatic re-indexing by calling `retriever.reindex()` in Python.

---

## 🧪 10. Sample Questions to Test the Chatbot

1. **Normal Question:** *"What is the Inquisitor Society?"*
2. **Internship AI Tools:** *"What AI tools are taught in the 2026 internship?"*
3. **Internship Deadline:** *"How can I apply for the internship and what is the deadline?"*
4. **Membership Rule:** *"Is membership free for UET Lahore students?"*
5. **Course Rule:** *"Can I enroll in 6 courses this semester?"*
6. **Certificate QR Verification:** *"How do digital certificates work and how are they verified?"*
7. **Orphanage Outreach:** *"Tell me about the Orphanage Outreach program."*
8. **Missing Information (Fallback Test):** *"What is the exact external registration fee next month?"* (Triggers safe fallback without hallucination).
