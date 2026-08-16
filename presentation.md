# 📊 Inquisitor Society AI Chatbot — Project Presentation
**Track 1 — Chatbot Development Project**  
**Institution:** University of Engineering and Technology (UET), Lahore  

---

## 🖼️ Slide 1: Title Slide
# Inquisitor Society AI Chatbot
### An Intelligent LLM + RAG Powered Conversational Assistant
- **Track:** Track 1 — Inquisitor Chatbot Development
- **Institution:** University of Engineering & Technology (UET), Lahore

---

## 🖼️ Slide 2: Problem Statement & Core Vision
### Problem Statement & Project Goal
- **Operational Challenges Solved:**
  - Information fragmentation across flyers and social channels.
  - High administrative burden answering repetitive student inquiries.
  - Risk of unverified word-of-mouth regarding fees or dates.
- **Core Chatbot Goal:**
  > *"To provide fast, accurate, and user-friendly information about Inquisitor Society while directing users to human support when necessary."*

---

## 🖼️ Slide 3: Task Division & Architecture
### Task Structure & Components
1. **Requirement Analyst:** Target users, problems, SRS, functional & non-functional scope.
2. **Knowledge Base Manager:** Ground-truth data collection across 27 sections.
3. **Conversation Flow Designer:** 12 multi-turn dialogue trees & quick-reply chips.
4. **Frontend UI Developer:** Web chat interface, typing indicators, card layouts.
5. **Backend & API Developer:** Python server (`rag_backend.py`), HTTP endpoints.
6. **LLM + RAG Developer:** Gemini/Ollama selection, prompt design, vector RAG engine.
7. **Testing & Evaluation:** 30+ test cases, accuracy & response quality evaluation.
8. **System Architecture & Technical Doc:** Architecture diagrams & technical specs.
9. **Final Documentation & Presentation:** Installation guide, slides, live demonstration.

---

## 🖼️ Slide 4: Target Users & Stakeholders
### Who Uses the Inquisitor Chatbot?
- **Students (UET & External):** Free membership rules, course limits, 2026 internships.
- **Teachers & Faculty:** Course management & virtual class rules.
- **Mentors & Partner Companies:** Internship reviews & candidate recruiting.
- **Support Seekers:** Direct human contact escalation (`info@inquisitorssociety.org` / `+92 (309) 868-8664`).

---

## 🖼️ Slide 5: System Scope & Boundaries
### In Scope vs. Out of Scope
- **✅ IN SCOPE:** Society FAQs, Free membership rules, 2026 Internship Program (14+ AI tools), Course rules (max 5/sem, 60% pass score, 80% attendance), Digital Certificate QR verification, Event cutoff rules, Orphanage Outreach info, Knowledge Base grounded RAG responses.
- **❌ OUT OF SCOPE:** Inventing external fees or unverified registration links, guaranteeing open internship status post 12 July 2026 deadline, generating unannounced event dates, monetary payment processing, modifying university grade databases.

---

## 🖼️ Slide 6: LLM Selection & RAG Architecture
### Intelligence & Retrieval System
- **Selected Primary LLM:** **Google Gemini 1.5 Flash** (<800ms latency, 1M context window) with local **Ollama Llama 3 8B** backup.
- **Vector Retrieval:** Full 27-section Grounded Knowledge Base chunks embedded with Cosine Similarity vector search.
- **Similarity Threshold:** Minimum score threshold $S_c \ge 0.40$. Low confidence queries trigger strict Section 23 fallback response without speculation.

---

## 🖼️ Slide 7: Full Stack Web Application
### Live Chat UI & RAG Inspector
- **Web Interface (`index.html`):** Real-time message bubbles, quick-reply topic chips, typing indicators.
- **RAG Inspector Sidebar:** Live monitor displaying detected intent, similarity confidence score, retrieved vector chunks, and source document references.

---

## 🖼️ Slide 8: Technical Engineering & Backend
### Server Architecture (`rag_backend.py`)
- Python HTTP Server running on `http://127.0.0.1:8000`.
- `POST /api/chat`: Query fulfillment & RAG retrieval.
- `GET /api/health`: RAG engine health status.
- Serves `index.html` directly on root URL.

---

## 🖼️ Slide 9: Testing & Evaluation
### Quality Assurance & 30+ Test Cases
- Tested across normal queries, complex multi-part questions, edge cases, out-of-scope questions, and fallback handling.
- 100% compliance with zero-hallucination guardrails.

---

## 🖼️ Slide 10: Conclusion & Live Demonstration
### Project Completion
- System fully integrated with LLM + RAG vector search, live backend server, and team presentation.
- Ready for live demonstration and evaluator Q&A.
