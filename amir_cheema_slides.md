# 📊 Inquisitor Society AI Chatbot — Requirement Analysis Presentation
**Presenter:** Muhammad Amir Cheema  
**Society:** Inquisitor Society  
**Group:** AI_07  
**Role:** Member 1 — Requirement Analyst  
**Subtitle:** Understanding Users, Problems, Requirements & Chatbot Scope  

---

## 🖼️ Slide 1 — Title Slide
# Requirement Analysis — Inquisitor Society AI Chatbot
### Understanding Users, Problems, Requirements & Chatbot Scope

**Presenter Information:**
- 👤 **Name:** Muhammad Amir Cheema
- 🏢 **Society:** Inquisitor Society
- 👥 **Group:** AI_07
- 🔎 **Role:** Member 1 — Requirement Analyst

*University Semester Project Presentation | Track 1: Chatbot Development*

---

## 🖼️ Slide 2 — Understanding the Inquisitor Society
### Purpose of Requirement Analysis
Requirement Analysis is the foundation of chatbot development. It establishes **WHAT** users need and **WHAT** problems the chatbot must solve before building the system.

**Key Objectives:**
- 🏛️ Study the Inquisitor Society and its core activities.
- 🎯 Identify what information users commonly need.
- 🚨 Understand the real problems users face when finding information.
- 🤖 Determine how an AI chatbot can effectively assist users.
- 🛡️ Define clear boundaries on what the chatbot should and should not handle.

```
┌────────────────────┐     ┌────────────┐     ┌──────────┐     ┌──────────────┐     ┌────────────┐
│ Inquisitor Society │ ──> │ User Needs │ ──> │ Problems │ ──> │ Requirements │ ──> │ AI Chatbot │
└────────────────────┘     └────────────┘     └──────────┘     └──────────────┘     └────────────┘
```

> 📌 *Accuracy Note:* Specific unverified society details are marked as **“To be verified from the official Inquisitor Society information/SRS.”**

---

## 🖼️ Slide 3 — Target Users
### Who Will Use the Inquisitor Society Chatbot?

| User Icon | Target User Group | One-Line Description / Need |
|---|---|---|
| 🏛️ | **Society Members** | Existing members looking for internal updates, committee schedules, and society announcements. |
| 🎓 | **Students** | General university students seeking educational resources and platform guidance. |
| 🆕 | **New Members** | Newly joined members needing orientation, code of conduct, and initial setup guidance. |
| 🤝 | **Prospective Members** | Students interested in joining the society looking for eligibility rules & application steps. |
| 🚀 | **Internship Seekers** | Students looking for virtual/hybrid internship programs, skill tracks, and application deadlines. |
| 📅 | **Event Participants** | Attendees looking for seminar schedules, workshop details, and event registration cutoffs. |
| 📝 | **Registration Seekers** | Users needing step-by-step help with platform or activity registration procedures. |
| 📞 | **Support Seekers** | Users facing technical/platform issues needing contact links and human support escalation. |

---

## 🖼️ Slide 4 — User Problems / Pain Points
### Identifying Core Problems & Chatbot Solutions

```
┌──────────────────────────────────────────────┐          ┌──────────────────────────────────────────────┐
│             USER PAIN POINTS                 │          │               CHATBOT SOLUTION               │
├──────────────────────────────────────────────┤          ├──────────────────────────────────────────────┤
│ 🔍 Difficulty finding society information    │   ───>   │ ⚡ Centralized 24/7 instant AI information   │
│ ❓ Repeatedly asking common questions         │   ───>   │ 🤖 Automated FAQ answering with zero wait    │
│ 📋 Unclear membership joining process        │   ───>   │ 📝 Clear step-by-step eligibility guidance   │
│ ✍️ Registration-related confusion            │   ───>   │ 🔗 Direct links to official registration     │
│ 💼 Difficulty finding internship details     │   ───>   │ 🚀 Structured internship focus & tool info   │
│ 📢 Lack of clear event information          │   ───>   │ 📅 Event cutoff rules & single-entry info    │
│ 📞 Hard to find official support contacts    │   ───>   │ 👤 Immediate human support escalation cards  │
│ ⏳ Long wait times for basic inquiries       │   ───>   │ ⏱️ Sub-second natural language responses     │
└──────────────────────────────────────────────┘          └──────────────────────────────────────────────┘
```

---

## 🖼️ Slide 5 — Common User Questions / FAQs
> 📌 *Label: Sample/Common User Queries — To be verified against the official society information.*

- **General Queries**
  - *"What is Inquisitor Society?"*
  - *"What activities does the society organize?"*
- **Membership Queries**
  - *"How can I join the society?"*
  - *"What are the membership requirements?"*
- **Registration Queries**
  - *"How can I register?"*
  - *"What information is required for registration?"*
- **Event Queries**
  - *"What events are coming up?"*
  - *"How can I register for an event?"*
- **Internship Queries**
  - *"Are internships available?"*
  - *"How can I apply for the internship program?"*
- **Support Queries**
  - *"How can I contact the society?"*
  - *"Where can I get help or talk to a human?"*

---

## 🖼️ Slide 6 — Functional Requirements
### System Functional Capabilities
The Inquisitor Society AI Chatbot must be capable of performing the following 10 core functions:

1. **Answer Frequently Asked Questions:** Instant automated responses to common platform queries.
2. **Provide Society Information:** Explain the society's mission, background, and platform features.
3. **Provide Membership Information:** State free eligibility criteria, verification rules, and profile guidelines.
4. **Explain Registration Procedures:** Guide users through registration forms and step-by-step procedures.
5. **Provide Event Information:** Detail event types, 24-hour cutoff rules, and entry QR requirements.
6. **Answer Internship Queries:** Explain internship tracks, AI tools covered, and application portal details.
7. **Guide Toward Support & Contact:** Provide official email (`info@inquisitorssociety.org`) and phone numbers.
8. **Understand Natural-Language Questions:** Process variations in phrasing, typos, and user tone.
9. **Retrieve Relevant KB Information:** Search grounded knowledge base data accurately.
10. **Provide Safe Fallback Responses:** Gracefully admit when information is unverified and escalate to human support.

---

## 🖼️ Slide 7 — Chatbot Scope
### System Boundaries & Operational Focus

#### ✅ IN SCOPE
- Society FAQs & General Overview
- Membership information & eligibility
- Registration guidance & links
- Event rules & entry requirements
- Internship program details & skills
- Society services & community activities
- Support contact information
- Knowledge-base grounded answers
- Basic conversational turns & greeting chips
- Safe fallback responses for unverified queries

#### ❌ OUT OF SCOPE
- Making decisions for society administrators
- Giving unverified or hallucinated information
- Accessing unauthorized/private user data
- Performing sensitive administrative database actions
- Completely replacing human support

---

> 🎯 **Core Objective Summary:**  
> **“The goal is to provide fast, accurate, and user-friendly information about Inquisitor Society while directing users to human support when necessary.”**

---
*Presentation prepared by Muhammad Amir Cheema (Member 1 — Requirement Analyst, Group AI_07)*
