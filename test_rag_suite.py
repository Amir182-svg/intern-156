"""
test_rag_suite.py - Automated 15-Category Test Suite
Inquisitor Society AI Chatbot Project

Executes 15 comprehensive test categories:
1. Normal question
2. FAQ question
3. Membership question
4. Internship question
5. Event question
6. Registration question
7. Service question
8. General question
9. Misspelled question
10. Incomplete question
11. Unrelated question
12. Out-of-scope question
13. Repeated question
14. Multi-question query
15. Question whose answer is missing from knowledge base
"""

import json
from rag_engine import RAGRetriever
from llm_service import LLMService
import config

# Initialize RAG Engine for testing
retriever = RAGRetriever(kb_filepath="knowledge_base.json")
llm_service = LLMService()

# 15 Test Cases as specified in project requirements
TEST_CASES = [
    {
        "id": "TC_01",
        "category": "1. Normal Question",
        "question": "What is the Inquisitor Society?",
        "expected": "Provides society overview grounded in Section 01."
    },
    {
        "id": "TC_02",
        "category": "2. FAQ Question",
        "question": "What activities does the society organize?",
        "expected": "Lists workshops, seminars, competitions, industrial tours."
    },
    {
        "id": "TC_03",
        "category": "3. Membership Question",
        "question": "Is membership free for UET Lahore students?",
        "expected": "Confirms free membership for UET Lahore students with valid email."
    },
    {
        "id": "TC_04",
        "category": "4. Internship Question",
        "question": "What AI tools are taught in the 2026 internship?",
        "expected": "Lists ChatGPT, Claude, Gemini, Copilot, Canva AI, Cursor, etc."
    },
    {
        "id": "TC_05",
        "category": "5. Event Question",
        "question": "When does event registration close?",
        "expected": "States registration closes 24 hours before event starts."
    },
    {
        "id": "TC_06",
        "category": "6. Registration Question",
        "question": "What is the internship application portal link?",
        "expected": "Provides www.inquisitorssociety.org/apply and July 12 2026 deadline rule."
    },
    {
        "id": "TC_07",
        "category": "7. Service Question",
        "question": "How do digital certificates work and are they verified?",
        "expected": "Explains digital certificates & QR code verification system."
    },
    {
        "id": "TC_08",
        "category": "8. General Question",
        "question": "Who can use the platform?",
        "expected": "Lists 5 user roles: Students, Faculty, Mentors, Companies, Admins."
    },
    {
        "id": "TC_09",
        "category": "9. Misspelled Question",
        "question": "How to applie for internshp 2026?",
        "expected": "Retrieves internship application details despite minor typos."
    },
    {
        "id": "TC_10",
        "category": "10. Incomplete Question",
        "question": "Course limit?",
        "expected": "States maximum 5 courses per semester limit."
    },
    {
        "id": "TC_11",
        "category": "11. Unrelated Question",
        "question": "What is the capital of France?",
        "expected": "Triggers fallback response."
    },
    {
        "id": "TC_12",
        "category": "12. Out-of-Scope Question",
        "question": "Can you solve my calculus homework?",
        "expected": "Triggers fallback or politely re-orients user."
    },
    {
        "id": "TC_13",
        "category": "13. Repeated Question",
        "question": "Is membership free for UET Lahore students?",
        "expected": "Consistently provides same grounded answer."
    },
    {
        "id": "TC_14",
        "category": "14. Multi-Question Query",
        "question": "What is the course pass score and required attendance?",
        "expected": "Answers 60% completion score and 80% attendance requirement."
    },
    {
        "id": "TC_15",
        "category": "15. Missing Answer Question",
        "question": "What is the exact external member registration fee next month?",
        "expected": "Triggers exact configurable fallback statement."
    }
]

def run_test_suite():
    """Runs all 15 test categories and prints test execution report."""
    print("=" * 80)
    print("INQUISITOR SOCIETY CHATBOT - AUTOMATED 15-CATEGORY TEST SUITE")
    print("=" * 80)
    
    passed_count = 0

    for test in TEST_CASES:
        question = test["question"]
        results = retriever.retrieve(question)
        
        if results:
            response = llm_service.generate_response(question, results)
            context = [r["chunk"]["source"] for r in results]
            is_fallback = False
        else:
            response = config.DEFAULT_FALLBACK_RESPONSE
            context = ["No context (Score below threshold)"]
            is_fallback = True

        # Validation Logic
        if test["id"] in ["TC_11", "TC_12", "TC_15"]:
            # Fallback expected
            passed = (config.DEFAULT_FALLBACK_RESPONSE in response) or (is_fallback)
        else:
            # Grounded answer expected
            passed = len(results) > 0 and (config.DEFAULT_FALLBACK_RESPONSE not in response)

        if passed:
            passed_count += 1
            status_str = "[PASS]"
        else:
            status_str = "[FAIL]"

        print(f"\n{test['id']} | {test['category']} | Status: {status_str}")
        print(f"  User Question   : {question}")
        print(f"  Retrieved Context: {', '.join(context)}")
        print(f"  Expected        : {test['expected']}")
        print(f"  Actual Response : {response[:120]}...")

    print("\n" + "=" * 80)
    print(f"TEST RESULTS: {passed_count}/{len(TEST_CASES)} Passed ({(passed_count/len(TEST_CASES))*100:.1f}%)")
    print("=" * 80)

if __name__ == "__main__":
    run_test_suite()
