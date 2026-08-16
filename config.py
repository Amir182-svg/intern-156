"""
config.py - Centralized Configuration Module
Inquisitor Society AI Chatbot Project (Group AI_07)

Configuration for:
- RAG retrieval
- Gemini LLM
- API key
- Safety / fallback
- Backend server
"""

import os


# ============================================================
# LOAD .ENV FILE
# ============================================================

def load_env_file(filepath=".env"):

    if os.path.exists(filepath):

        try:

            with open(
                filepath,
                "r",
                encoding="utf-8"
            ) as f:

                for line in f:

                    line = line.strip()

                    if (
                        line
                        and not line.startswith("#")
                        and "=" in line
                    ):

                        key, val = line.split(
                            "=",
                            1
                        )

                        os.environ[
                            key.strip()
                        ] = val.strip().strip(
                            "'"
                        ).strip(
                            '"'
                        )

        except Exception as e:

            print(
                f"Notice: Could not parse .env file: {e}"
            )


load_env_file()


# ============================================================
# RAG CONFIGURATION
# ============================================================

TOP_K = int(
    os.getenv(
        "TOP_K",
        "3"
    )
)


SIMILARITY_THRESHOLD = float(
    os.getenv(
        "SIMILARITY_THRESHOLD",
        "0.25"
    )
)


CHUNK_SIZE = int(
    os.getenv(
        "CHUNK_SIZE",
        "200"
    )
)


CHUNK_OVERLAP = int(
    os.getenv(
        "CHUNK_OVERLAP",
        "50"
    )
)


# ============================================================
# LLM CONFIGURATION
# ============================================================

# Gemini model
#
# You can change this from .env without
# editing Python code.

LLM_MODEL = os.getenv(
    "LLM_MODEL",
    "gemini-1.5-flash"
)


# ============================================================
# EMBEDDING CONFIGURATION
# ============================================================

EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL",
    "tfidf-vectorizer"
)


# ============================================================
# GEMINI API KEY
# ============================================================

GEMINI_API_KEY = os.getenv(
    "GEMINI_API_KEY",
    ""
)


# ============================================================
# FALLBACK RESPONSE
# ============================================================

DEFAULT_FALLBACK_RESPONSE = (
    "Sorry, I don't currently have verified information "
    "about that in the Inquisitor Society knowledge base. "
    "I can help with information about the society, "
    "membership, events, internships, registration, "
    "services, and support."
)


# ============================================================
# QUERY SAFETY
# ============================================================

MAX_QUERY_LENGTH = 1000


# ============================================================
# BACKEND SERVER
# ============================================================

SERVER_HOST = os.getenv(
    "SERVER_HOST",
    "127.0.0.1"
)


SERVER_PORT = int(
    os.getenv(
        "SERVER_PORT",
        "8000"
    )
)