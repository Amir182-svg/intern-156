"""
backend.py - REST API & Backend Server
Inquisitor Society AI Chatbot Project - Group AI_07

Flow:

User Question
      ↓
Simple Intent Detection
      ↓
 ┌───────────────────────┐
 │                       │
Greeting / Thanks      Knowledge Question
 │                       │
Gemini                RAG Retrieval
                         ↓
                       Gemini
                         ↓
                  Natural Response
"""

import json
import os
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler

import config
from rag_engine import RAGRetriever
from llm_service import LLMService


# ============================================================
# INITIALIZE RAG & LLM
# ============================================================

RETRIEVER = RAGRetriever(
    kb_filepath="knowledge_base.json"
)

LLM_ENGINE = LLMService()


# ============================================================
# SIMPLE INTENT DETECTION
# ============================================================
def detect_simple_intent(message):
    """
    Detect simple conversational messages before RAG.
    """

    text = message.lower().strip()

    greetings = {
        "hi",
        "hello",
        "hey",
        "hiya",
        "helo",
        "good morning",
        "good afternoon",
        "good evening"
    }

    thanks = {
        "thanks",
        "thank you",
        "thankyou",
        "thx",
        "many thanks"
    }

    goodbyes = {
        "bye",
        "goodbye",
        "good bye",
        "see you",
        "see you later"
    }

    # Exact greeting
    if text in greetings:
        return "greeting"

    # Greeting containing common conversational additions
    greeting_words = [
        "hello",
        "hi",
        "hey",
        "hiya",
        "helo"
    ]

    words = text.split()

    if any(
        word in greeting_words
        for word in words
    ):
        # Only treat short messages as greetings.
        #
        # Example:
        # "hello again" -> greeting
        # "hi there" -> greeting
        # "hello bro" -> greeting
        #
        # But:
        # "how can I apply for internship"
        # should remain a knowledge question.

        if len(words) <= 4:
            return "greeting"

    if text in thanks:
        return "thanks"

    if text in goodbyes:
        return "goodbye"

    return "knowledge"


# ============================================================
# GEMINI CONVERSATIONAL RESPONSE
# ============================================================

def generate_conversational_response(
    user_question,
    intent
):
    """
    Generate a natural conversational response using Gemini.
    """

    if intent == "greeting":

        prompt = f"""
You are the friendly AI assistant for the Inquisitor Society.

The user has greeted you.

User message:
{user_question}

Respond naturally and briefly.

If this is the first greeting, welcome the user.
If the user says hello again or greets repeatedly, respond naturally
without giving exactly the same response every time.

Do not invent facts about the Inquisitor Society.

Example style:
"Hello! 👋 Welcome to the Inquisitor Society Assistant.
How can I help you today?"

Return only the response.
"""

    elif intent == "thanks":

        prompt = f"""
You are the friendly AI assistant for the Inquisitor Society.

The user said:
{user_question}

Respond naturally and briefly.

Example:
"You're welcome! 😊 Feel free to ask me anything about the
Inquisitor Society."

Return only the response.
"""

    elif intent == "goodbye":

        prompt = f"""
You are the friendly AI assistant for the Inquisitor Society.

The user said:
{user_question}

Respond naturally and briefly.

Example:
"Goodbye! 👋 Have a great day!"

Return only the response.
"""

    else:
        return None

    try:

        # Gemini API
        if LLM_ENGINE.api_key:

            from google import genai

            client = genai.Client(
                api_key=LLM_ENGINE.api_key
            )

            response = client.models.generate_content(
                model=LLM_ENGINE.model_name,
                contents=prompt
            )

            if response and response.text:
                return response.text.strip()

    except Exception as e:

        print(
            f"[Gemini Conversation Error] {e}",
            file=sys.stderr
        )

    # Safe fallback if Gemini fails

    if intent == "greeting":
        return (
            "Hello! 👋 Welcome to the Inquisitor Society "
            "Assistant. How can I help you today?"
        )

    if intent == "thanks":
        return (
            "You're welcome! 😊 Feel free to ask me "
            "anything about the Inquisitor Society."
        )

    if intent == "goodbye":
        return (
            "Goodbye! 👋 Have a great day!"
        )

    return None


# ============================================================
# HTTP HANDLER
# ============================================================

class ChatBackendHandler(
    BaseHTTPRequestHandler
):
    """
    HTTP Request Handler for Inquisitor Chatbot REST API.
    """

    # --------------------------------------------------------
    # JSON RESPONSE
    # --------------------------------------------------------

    def _send_json_response(
        self,
        status_code,
        data
    ):

        self.send_response(status_code)

        self.send_header(
            "Content-Type",
            "application/json; charset=utf-8"
        )

        self.send_header(
            "Access-Control-Allow-Origin",
            "*"
        )

        self.send_header(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS"
        )

        self.send_header(
            "Access-Control-Allow-Headers",
            "Content-Type"
        )

        self.end_headers()

        self.wfile.write(
            json.dumps(
                data,
                ensure_ascii=False
            ).encode("utf-8")
        )

    # --------------------------------------------------------
    # OPTIONS
    # --------------------------------------------------------

    def do_OPTIONS(self):

        self._send_json_response(
            200,
            {
                "status": "OK"
            }
        )

    # --------------------------------------------------------
    # POST
    # --------------------------------------------------------

    def do_POST(self):

        if self.path != "/api/chat":

            self._send_json_response(
                404,
                {
                    "error": "Endpoint not found"
                }
            )

            return

        try:

            # =================================================
            # READ REQUEST
            # =================================================

            content_length = int(
                self.headers.get(
                    "Content-Length",
                    0
                )
            )

            if content_length == 0:

                self._send_json_response(
                    400,
                    {
                        "answer": "Empty request payload.",
                        "status": "ERROR"
                    }
                )

                return

            post_data = self.rfile.read(
                content_length
            )

            payload = json.loads(
                post_data.decode("utf-8")
            )

            # =================================================
            # GET USER QUESTION
            # =================================================

            user_question = payload.get(
                "question",
                payload.get(
                    "query",
                    ""
                )
            ).strip()

            # =================================================
            # EMPTY QUESTION
            # =================================================

            if not user_question:

                self._send_json_response(
                    200,
                    {
                        "answer": (
                            "Please ask a valid question "
                            "about the Inquisitor Society."
                        ),
                        "intent": "Validation Error",
                        "confidence": 0.0,
                        "retrieved_sources": [],
                        "status": "EMPTY_QUESTION"
                    }
                )

                return

            # =================================================
            # QUERY LENGTH
            # =================================================

            if len(user_question) > config.MAX_QUERY_LENGTH:

                self._send_json_response(
                    200,
                    {
                        "answer": (
                            "Your question is too long. "
                            "Please keep it under 1000 characters."
                        ),
                        "intent": "Validation Error",
                        "confidence": 0.0,
                        "retrieved_sources": [],
                        "status": "QUERY_TOO_LONG"
                    }
                )

                return

            # =================================================
            # STEP 1: INTENT DETECTION
            # =================================================

            intent = detect_simple_intent(
                user_question
            )

            print(
                f"[Intent] {user_question} -> {intent}"
            )

            # =================================================
            # STEP 2: CONVERSATIONAL MESSAGE
            # =================================================

            if intent in {
                "greeting",
                "thanks",
                "goodbye"
            }:

                answer = (
                    generate_conversational_response(
                        user_question,
                        intent
                    )
                )

                self._send_json_response(
                    200,
                    {
                        "answer": answer,
                        "intent": intent,
                        "confidence": 1.0,
                        "retrieved_sources": [],
                        "status": "CONVERSATIONAL"
                    }
                )

                return

            # =================================================
            # STEP 3: RAG RETRIEVAL
            # =================================================

            print(
                f"[RAG] Searching knowledge base for: "
                f"{user_question}"
            )

            retrieved_results = (
                RETRIEVER.retrieve(
                    user_question
                )
            )

            # =================================================
            # STEP 4: NO RAG RESULT
            # =================================================

            if not retrieved_results:

                print(
                    "[RAG] No relevant knowledge found."
                )

                self._send_json_response(
                    200,
                    {
                        "answer": (
                            config.DEFAULT_FALLBACK_RESPONSE
                        ),
                        "intent": "Fallback Response",
                        "confidence": 0.0,
                        "retrieved_sources": [],
                        "status": "FALLBACK_TRIGGERED"
                    }
                )

                return

            # =================================================
            # STEP 5: GEMINI + RAG
            # =================================================

            print(
                f"[RAG] Retrieved "
                f"{len(retrieved_results)} chunks."
            )

            # Allow optional API key from request,
            # otherwise use configured key.

            custom_api_key = payload.get(
                "api_key",
                None
            )

            if custom_api_key:

                llm = LLMService(
                    api_key=custom_api_key
                )

            else:

                llm = LLM_ENGINE

            # Generate grounded natural response

            answer = llm.generate_response(
                user_question,
                retrieved_results
            )

            # =================================================
            # RESPONSE INFORMATION
            # =================================================

            top_chunk = (
                retrieved_results[0]["chunk"]
            )

            top_score = (
                retrieved_results[0]["score"]
            )

            sources = []

            for result in retrieved_results:

                chunk = result["chunk"]

                sources.append(
                    chunk.get(
                        "source",
                        "Knowledge Base"
                    )
                )

            # =================================================
            # FINAL RESPONSE
            # =================================================

            self._send_json_response(
                200,
                {
                    "answer": answer,
                    "intent": top_chunk.get(
                        "category",
                        "General"
                    ),
                    "confidence": top_score,
                    "retrieved_sources": sources,
                    "status": "SUCCESS"
                }
            )

        # =====================================================
        # INVALID JSON
        # =====================================================

        except json.JSONDecodeError:

            self._send_json_response(
                400,
                {
                    "answer": "Invalid JSON payload format.",
                    "status": "JSON_DECODE_ERROR"
                }
            )

        # =====================================================
        # OTHER ERROR
        # =====================================================

        except Exception as e:

            print(
                f"[Backend Error] {e}",
                file=sys.stderr
            )

            self._send_json_response(
                500,
                {
                    "answer": (
                        "An unexpected error occurred while "
                        "processing your request."
                    ),
                    "status": "INTERNAL_SERVER_ERROR"
                }
            )

    # ========================================================
    # GET
    # ========================================================

    def do_GET(self):

        # ----------------------------------------------------
        # HEALTH CHECK
        # ----------------------------------------------------

        if self.path == "/api/health":

            self._send_json_response(
                200,
                {
                    "status": "ONLINE",
                    "service": (
                        "Inquisitor Society "
                        "AI Chatbot RAG Engine"
                    ),
                    "kb_chunks_loaded": len(
                        RETRIEVER.chunks
                    ),
                    "config": {
                        "top_k": config.TOP_K,
                        "similarity_threshold": (
                            config.SIMILARITY_THRESHOLD
                        ),
                        "llm_model": config.LLM_MODEL
                    }
                }
            )

            return

        # ----------------------------------------------------
        # WEB UI
        # ----------------------------------------------------

        if self.path in [
            "/",
            "/index.html"
        ]:

            index_path = os.path.join(
                os.path.dirname(__file__),
                "index.html"
            )

            if os.path.exists(index_path):

                self.send_response(200)

                self.send_header(
                    "Content-Type",
                    "text/html; charset=utf-8"
                )

                self.end_headers()

                with open(
                    index_path,
                    "rb"
                ) as f:

                    self.wfile.write(
                        f.read()
                    )

                return

            self._send_json_response(
                404,
                {
                    "error": "index.html not found"
                }
            )

            return

        # ----------------------------------------------------
        # UNKNOWN PATH
        # ----------------------------------------------------

        self._send_json_response(
            404,
            {
                "error": "Path not found"
            }
        )


# ============================================================
# START SERVER
# ============================================================

def start_server(
    host=None,
    port=None
):

    host = (
        host
        or config.SERVER_HOST
    )

    port = (
        port
        or config.SERVER_PORT
    )

    try:

        server_address = (
            host,
            port
        )

        httpd = HTTPServer(
            server_address,
            ChatBackendHandler
        )

    except Exception as e:

        print(
            f"Port {port} busy ({e}). "
            f"Trying fallback port 8080..."
        )

        port = 8080

        server_address = (
            host,
            port
        )

        httpd = HTTPServer(
            server_address,
            ChatBackendHandler
        )

    print(
        "=================================================="
    )

    print(
        "Inquisitor Society AI Chatbot Server Running"
    )

    print(
        f"URL: http://{host}:{port}"
    )

    print(
        f"KB Loaded: {len(RETRIEVER.chunks)} chunks"
    )

    print(
        f"LLM Model: {config.LLM_MODEL}"
    )

    print(
        "Gemini API: "
        + (
            "CONNECTED"
            if config.GEMINI_API_KEY
            else "NOT CONFIGURED"
        )
    )

    print(
        "=================================================="
    )

    try:

        httpd.serve_forever()

    except KeyboardInterrupt:

        print(
            "\nStopping server."
        )

        httpd.server_close()


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":

    start_server()