# Implementation Plan — Member 3: Conversation Flow Designer

## Overview
As **Member 3 (Conversation Flow Designer)** for Group **AI_07 (Inquisitor Chatbot)**, the objective is to design comprehensive, robust, user-centric, and context-aware conversation flows for all primary user scenarios on the Inquisitor platform. 

This work builds strictly upon the official Knowledge Base established by Member 2, ensuring zero hallucination, clear fallback behavior, interactive UI guidance for Member 4 (Frontend), and structured dialogue states for Member 5 (Backend) and Member 6 (LLM/RAG).

---

## Deliverables to Produce

### 1. Conversation Flow Design Specification (`conversation_flows.md`)
A comprehensive technical specification document containing:
- **Bot Persona & Tone Guidelines**: Professional, encouraging, clear, and structured for UET students, faculty, mentors, and partners.
- **Intent Taxonomy & Entity Map**: Definitions of core user intents, entities, slots, and context variables.
- **12 End-to-End Multi-Turn Conversation Flows**:
  - **Flow 1**: Onboarding, Greeting & Interactive Main Menu
  - **Flow 2**: Membership Inquiries, Verification & Eligibility
  - **Flow 3**: Internship Program 2026 Exploration (AI Tools, Workflows, Benefits)
  - **Flow 4**: Internship Application & Deadline Guardrail (Strict adherence to 12 July 2026 rule)
  - **Flow 5**: Learning & Courses (Course limits, 60% passing score, 80% attendance)
  - **Flow 6**: Digital Certificate Issuance & QR Verification
  - **Flow 7**: Events, Workshops & Competitions (24h rule, QR entry, missing event list guardrail)
  - **Flow 8**: Community Activities & Orphanage Outreach Program
  - **Flow 9**: Career Development, Job Board & Portfolio Building
  - **Flow 10**: General FAQs & Quick Inquiries
  - **Flow 11**: Strict Fallback, Missing Info & Human Support Escalation
  - **Flow 12**: Out-of-Scope, Edge Cases & Error Recovery Flow
- **Mermaid Flowcharts**: Visual visual node-by-node representation for every flow.
- **Frontend UI Hints & Suggested Chips**: Quick reply suggestions for Member 4.
- **LLM Prompting & State System Directives**: Concrete instructions for Member 6.

### 2. Member 3 Presentation Slide Deck (`member3_presentation.html` & `member3_slides.md`)
- **Interactive HTML Presentation (`member3_presentation.html`)**: A standalone, polished presentation deck built with modern glassmorphism, responsive slide navigation, interactive diagrams, flow previews, and speaker notes.
- **Markdown Presentation Slides (`member3_slides.md`)**: A markdown version suitable for exporting to PowerPoint, Google Slides, or PDF.

---

## User Review Required

> [!IMPORTANT]
> - All conversation flows strictly enforce Member 2's ground-truth rules: the chatbot will **never** invent membership fees, application deadlines, event dates, or stipends.
> - Fallback responses immediately offer contact details (`info@inquisitorssociety.org` / `+92 (309) 868-8664`).

---

## Proposed File Structure

```
scratch/member3_deliverables/
├── conversation_flows.md      # Full Conversation Flow Specification & Diagrams
├── member3_slides.md          # Markdown Presentation Deck for Member 3
└── member3_presentation.html  # Interactive Web Slide Deck (Ready for Live Demo/Presentation)
```

---

## Verification Plan

### Automated / Syntax Check
- Verify validity of all Mermaid diagrams.
- Validate HTML/CSS structure of `member3_presentation.html`.

### Manual & Logical Verification
- Check all 12 conversation flows against Member 2 Knowledge Base data.
- Ensure all required user scenarios (FAQs, Internships, Memberships, Registration, Support, Course rules, Certificates, Fallback) are fully covered.
- Verify slide deck completeness for final presentation.
