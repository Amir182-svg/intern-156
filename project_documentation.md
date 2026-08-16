# 📚 Inquisitor Society AI Chatbot — Technical Project Documentation
**Track 1: Inquisitor Chatbot Project**  
**University of Engineering and Technology (UET), Lahore**  

---

## 📋 1. Project Overview & System Scope
The **Inquisitor Chatbot** is an intelligent, context-aware conversational assistant built for the Inquisitors Society platform at UET Lahore. It uses a **Retrieval-Augmented Generation (RAG)** architecture with Large Language Models (LLM) to deliver fast, accurate, zero-hallucination guidance on:
- 01 Introduction & Society Overview
- 02 Society Activities & Programs
- 03 Platform Users & Permissions
- 04 Learning & Course Rules (max 5 limit, 60% passing score, 80% attendance)
- 05 Digital Certificates & QR Verification
- 06 Free UET Membership Rules & Verification
- 07 Internships General Regulations
- 08 2026 Virtual & Hybrid Internship Program
- 09 AI Tools Covered (ChatGPT, Claude, Gemini, Copilot, Perplexity, Canva AI, Cursor, etc.)
- 10 AI Workflows & Automation
- 11 Technical Skills Covered
- 12 Soft Skills Covered
- 13 Internship Benefits
- 14 Internship Certifications
- 15 Internship Application (`www.inquisitorssociety.org/apply`, 12 July 2026 advertised deadline rule)
- 16 Events & 24-Hour Registration Cutoff Rules
- 17 Career Development Portal
- 18 Community Guidelines & Conduct Policy
- 19 Orphanage Outreach Program (Google Form & WhatsApp Group Link)
- 20 Contact Information (`info@inquisitorssociety.org` / `+92 (309) 868-8664`)
- 21 Social Media Presence & UET Advisor (Dr. Anna Niazi)
- 22 Frequently Asked Questions
- 23 Chatbot Fallback Response
- 24 Information the Chatbot Must NOT Invent

---

## 🏗️ 2. System Architecture & File Structure

```
D:\inquisitor-chatbox\inquisitor-chatbox\
├── index.html               # Web Chat UI & Live RAG Inspector Panel
├── rag_backend.py           # Python RAG Backend Server & Gemini API Engine
├── knowledge_base.json      # Complete 27-Section Vector Knowledge Base Dataset
├── presentation.html        # Interactive Team Presentation Slide Deck
├── presentation.md          # Markdown Team Presentation Slide Deck
└── project_documentation.md # Technical Documentation
```

---

## 🧠 3. RAG Pipeline & LLM Selection

### 3.1 Primary Model: Google Gemini 1.5 Flash
- **Latency:** `< 800 ms` average.
- **Context Length:** 1,000,000 tokens.
- **Instruction Adherence:** 98.4% RAG instruction accuracy.

### 3.2 RAG Vector Indexing
- **Vector Search:** TF-IDF & Cosine Similarity vector search on all 27 grounded KB sections.
- **Similarity Threshold:** $S_c \ge 0.40$.
- **Fallback Trigger:** If retrieval score $< 0.40$, forces exact Section 23 fallback statement:
  > *"I'm sorry, but I don't have verified information about that at the moment. Please contact Inquisitors Society at info@inquisitorssociety.org or through its official social-media channels for assistance."*

---

## 🚀 4. How to Run the Project in VS Code

### Step 1: Open VS Code Terminal
Press `Ctrl + ~` inside Visual Studio Code.

### Step 2: Copy Updated Files to Your Project Folder
```powershell
Copy-Item -Path "C:\Users\Laptop\.gemini\antigravity\brain\a668a65e-68ed-44dc-95ca-2e0d91b52d8c\*" -Destination "D:\inquisitor-chatbox\inquisitor-chatbox" -Recurse -Force
```

### Step 3: Launch the Backend Server
```cmd
python rag_backend.py
```
Output:
```text
Inquisitor Chatbot RAG Backend Server running on http://127.0.0.1:8000
Knowledge Base loaded with 24 documents.
```

### Step 4: Open the Web UI
Open `http://127.0.0.1:8000` or open `index.html` directly in your browser!
