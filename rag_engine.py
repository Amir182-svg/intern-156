"""
rag_engine.py - Improved RAG Retrieval & Vector Search Engine
Inquisitor Society AI Chatbot Project

Features:
1. Knowledge Base Loader
2. TF-IDF-style weighted retrieval
3. Query normalization
4. Synonym / semantic keyword expansion
5. Intent-aware boosting
6. Greeting recognition
7. Better matching for natural-language questions
8. Automatic re-indexing
"""

import json
import re
import math
import os
import config


class RAGRetriever:
    """
    RAG Retriever for the Inquisitor Society knowledge base.

    The retriever is designed to understand different ways of asking
    essentially the same question.

    Example:
        "What events does the society organize?"
        "What activities does the society arrange?"
        "What programs does the society conduct?"

    These can all retrieve the Society Activities section.
    """

    def __init__(self, kb_filepath="knowledge_base.json"):
        self.kb_filepath = kb_filepath
        self.chunks = []
        self.doc_idf = {}
        self.is_indexed = False

        # Natural-language synonym groups.
        # These help when the user's wording differs from the KB wording.
        self.synonym_groups = {
            "event": [
                "event",
                "events",
                "activity",
                "activities",
                "program",
                "programs",
                "session",
                "sessions",
                "workshop",
                "workshops",
                "seminar",
                "seminars",
                "conference",
                "conferences",
                "competition",
                "competitions",
                "initiative",
                "initiatives"
            ],

            "organize": [
                "organize",
                "organizes",
                "organized",
                "organizing",
                "arrange",
                "arranges",
                "arranged",
                "arranging",
                "conduct",
                "conducts",
                "conducted",
                "hold",
                "holds",
                "held",
                "host",
                "hosts",
                "hosted",
                "offer",
                "offers",
                "provide",
                "provides"
            ],

            "internship": [
                "internship",
                "internships",
                "intern",
                "interns",
                "training",
                "placement",
                "placements",
                "industrial training"
            ],

            "apply": [
                "apply",
                "application",
                "applications",
                "applying",
                "submit",
                "submission",
                "register",
                "registration",
                "enroll",
                "enrollment"
            ],

            "membership": [
                "membership",
                "member",
                "members",
                "join",
                "joining",
                "register",
                "registration"
            ],

            "course": [
                "course",
                "courses",
                "learning",
                "class",
                "classes",
                "training",
                "education",
                "program"
            ],

            "contact": [
                "contact",
                "email",
                "phone",
                "number",
                "reach",
                "message",
                "address"
            ],

            "society": [
                "society",
                "organization",
                "organisation",
                "community",
                "inquisitor",
                "inquisitors"
            ],

            "deadline": [
                "deadline",
                "date",
                "dates",
                "last date",
                "closing date",
                "closing",
                "due"
            ]
        }

        self.load_and_index_kb()

    # ------------------------------------------------------------------
    # KNOWLEDGE BASE
    # ------------------------------------------------------------------

    def load_and_index_kb(self):
        """Load knowledge_base.json and build searchable index."""

        if not os.path.exists(self.kb_filepath):
            print(
                f"Warning: Knowledge Base file "
                f"'{self.kb_filepath}' not found."
            )
            return

        try:
            with open(self.kb_filepath, "r", encoding="utf-8") as f:
                data = json.load(f)

            raw_docs = []

            # Support:
            # [
            #   {...},
            #   {...}
            # ]
            if isinstance(data, list):
                raw_docs = data

            # Support:
            # {
            #   "faqs": [...],
            #   "sections": [...]
            # }
            elif isinstance(data, dict):
                raw_docs = (
                    data.get("faqs", [])
                    + data.get("sections", [])
                )

            self.chunks = []

            for item in raw_docs:

                if not isinstance(item, dict):
                    continue

                category = item.get(
                    "category",
                    "General"
                )

                question = item.get(
                    "question",
                    ""
                )

                content = item.get(
                    "content",
                    item.get("answer", "")
                )

                source = item.get(
                    "source",
                    f"KB Category: {category}"
                )

                keywords = item.get(
                    "keywords",
                    []
                )

                if not isinstance(keywords, list):
                    keywords = [str(keywords)]

                # Searchable representation
                searchable_text = (
                    f"{question} "
                    f"{content} "
                    f"{' '.join(map(str, keywords))} "
                    f"{category}"
                )

                self.chunks.append({
                    "id": item.get(
                        "id",
                        f"doc_{len(self.chunks)}"
                    ),
                    "category": category,
                    "question": question,
                    "content": content,
                    "source": source,
                    "keywords": keywords,
                    "searchable_text": searchable_text
                })

            self._compute_idf()

            self.is_indexed = True

            print(
                f"[RAG Indexer] Successfully indexed "
                f"{len(self.chunks)} chunks from "
                f"'{self.kb_filepath}'."
            )

        except Exception as e:
            print(
                f"[RAG Indexer] Error indexing Knowledge Base: {e}"
            )

    # ------------------------------------------------------------------
    # TOKENIZATION
    # ------------------------------------------------------------------

    def tokenize(self, text):
        """
        Convert text into normalized lowercase tokens.
        """

        if not text:
            return []

        text = str(text).lower()

        return re.findall(
            r"[a-zA-Z0-9]+",
            text
        )

    # ------------------------------------------------------------------
    # QUERY NORMALIZATION
    # ------------------------------------------------------------------

    def expand_query(self, query):
        """
        Expand a user's query with related words.

        Example:

        "What events does the society organize?"

        becomes conceptually:

        event activity program workshop seminar
        organize arrange conduct hold host
        society organization
        """

        original_tokens = self.tokenize(query)

        expanded_tokens = list(original_tokens)

        query_lower = query.lower()

        for concept, synonyms in self.synonym_groups.items():

            # Check whether any synonym appears in query.
            matched = False

            for word in synonyms:

                if word in query_lower:
                    matched = True
                    break

            if matched:

                # Add all related words.
                expanded_tokens.extend(
                    synonyms
                )

        return expanded_tokens

    # ------------------------------------------------------------------
    # IDF
    # ------------------------------------------------------------------

    def _compute_idf(self):
        """
        Compute smoothed inverse document frequency.
        """

        self.doc_idf = {}

        N = len(self.chunks)

        if N == 0:
            return

        tokenized_docs = []

        for doc in self.chunks:

            tokens = set(
                self.tokenize(
                    doc["searchable_text"]
                )
            )

            tokenized_docs.append(tokens)

        all_words = set()

        for tokens in tokenized_docs:
            all_words.update(tokens)

        for word in all_words:

            doc_count = sum(
                1
                for tokens in tokenized_docs
                if word in tokens
            )

            self.doc_idf[word] = (
                math.log(
                    (N + 1) /
                    (doc_count + 1)
                )
                + 1.0
            )

    # ------------------------------------------------------------------
    # SIMILARITY
    # ------------------------------------------------------------------

    def compute_similarity(
        self,
        query_tokens,
        doc_tokens,
        original_query=None,
        doc=None
    ):
        """
        Calculate weighted similarity.

        This is a lightweight retrieval method designed for your
        current project without requiring an external embedding model.
        """

        if not query_tokens or not doc_tokens:
            return 0.0

        query_set = set(query_tokens)
        doc_set = set(doc_tokens)

        overlap = query_set.intersection(
            doc_set
        )

        if not overlap:
            return 0.0

        score = 0.0

        doc_length = max(
            len(doc_tokens),
            1
        )

        for token in overlap:

            tf = (
                doc_tokens.count(token)
                / doc_length
            )

            idf = self.doc_idf.get(
                token,
                1.0
            )

            score += tf * idf

        # --------------------------------------------------------------
        # Exact phrase / question-word matching
        # --------------------------------------------------------------

        if original_query and doc:

            q_lower = original_query.lower()

            question = str(
                doc.get("question", "")
            ).lower()

            category = str(
                doc.get("category", "")
            ).lower()

            keywords = " ".join(
                map(
                    str,
                    doc.get("keywords", [])
                )
            ).lower()

            searchable = (
                question
                + " "
                + category
                + " "
                + keywords
            )

            # Strong boost when an important query concept
            # appears in question/category/keywords.
            important_terms = [
                "event",
                "events",
                "activity",
                "activities",
                "internship",
                "internships",
                "membership",
                "course",
                "courses",
                "contact",
                "deadline",
                "apply",
                "application"
            ]

            for term in important_terms:

                if term in q_lower:

                    if term in searchable:
                        score += 0.20

            # Query is asking "what events..."
            if (
                any(
                    x in q_lower
                    for x in [
                        "event",
                        "events",
                        "activity",
                        "activities",
                        "workshop",
                        "workshops"
                    ]
                )
                and
                (
                    "activit" in category
                    or "event" in category
                    or "workshop" in searchable
                )
            ):
                score += 0.35

            # Query is about internship application.
            if (
                "internship" in q_lower
                or "intern" in q_lower
            ):

                if (
                    "internship" in category
                    or "internship" in searchable
                ):
                    score += 0.45

            # Query is about membership.
            if (
                "membership" in q_lower
                or "join" in q_lower
            ):

                if (
                    "membership" in category
                    or "membership" in searchable
                ):
                    score += 0.35

        return score

    # ------------------------------------------------------------------
    # SPECIAL INTENT DETECTION
    # ------------------------------------------------------------------

    def detect_greeting(self, query):
        """
        Detect common greetings before RAG retrieval.

        This allows:
            hi
            hello
            hello again
            hey
            good morning
            good evening

        to receive a natural greeting instead of fallback.
        """

        if not query:
            return False

        text = query.strip().lower()

        # Remove punctuation.
        text = re.sub(
            r"[^a-zA-Z\s]",
            " ",
            text
        )

        text = re.sub(
            r"\s+",
            " ",
            text
        ).strip()

        greetings = {
            "hi",
            "hello",
            "hey",
            "hiya",
            "howdy",
            "good morning",
            "good afternoon",
            "good evening",
            "good night",
            "hello again",
            "hi again",
            "hey again"
        }

        if text in greetings:
            return True

        # Handle:
        # "hello there"
        # "hi there"
        # "hey there"
        greeting_starts = [
            "hello ",
            "hi ",
            "hey "
        ]

        return any(
            text.startswith(x)
            for x in greeting_starts
        )

    # ------------------------------------------------------------------
    # RETRIEVE
    # ------------------------------------------------------------------

    def retrieve(
        self,
        query,
        top_k=None,
        threshold=None
    ):
        """
        Retrieve the most relevant knowledge-base chunks.
        """

        if top_k is None:
            top_k = config.TOP_K

        if threshold is None:
            threshold = config.SIMILARITY_THRESHOLD

        if (
            not self.chunks
            or not query
            or not query.strip()
        ):
            return []

        # --------------------------------------------------------------
        # Greeting is handled separately.
        # --------------------------------------------------------------

        if self.detect_greeting(query):
            return []

        original_tokens = self.tokenize(
            query
        )

        expanded_tokens = self.expand_query(
            query
        )

        scored_chunks = []

        q_lower = query.lower()

        for doc in self.chunks:

            doc_tokens = self.tokenize(
                doc["searchable_text"]
            )

            score = self.compute_similarity(
                expanded_tokens,
                doc_tokens,
                original_query=query,
                doc=doc
            )

            category = str(
                doc.get("category", "")
            ).lower()

            searchable = str(
                doc.get(
                    "searchable_text",
                    ""
                )
            ).lower()

            # ==========================================================
            # SOCIETY ACTIVITIES / EVENTS
            # ==========================================================

            event_query = any(
                word in q_lower
                for word in [
                    "event",
                    "events",
                    "activity",
                    "activities",
                    "workshop",
                    "workshops",
                    "seminar",
                    "seminars",
                    "conference",
                    "conferences",
                    "competition",
                    "competitions",
                    "program",
                    "programs"
                ]
            )

            if event_query:

                if (
                    "02. society activities"
                    in category
                    or "society activities"
                    in category
                ):
                    score += 0.60

                elif any(
                    word in searchable
                    for word in [
                        "technical events",
                        "workshops",
                        "conferences",
                        "seminars",
                        "competitions"
                    ]
                ):
                    score += 0.25

            # ==========================================================
            # INTERNSHIP
            # ==========================================================

            internship_query = (
                "internship" in q_lower
                or "internships" in q_lower
                or "intern" in q_lower
            )

            application_query = any(
                word in q_lower
                for word in [
                    "apply",
                    "application",
                    "submit",
                    "register",
                    "registration",
                    "how can i",
                    "where can i"
                ]
            )

            if internship_query:

                if (
                    "15. internship application"
                    in category
                    or "internship application"
                    in category
                ):
                    score += 0.90

                elif "internship" in searchable:
                    score += 0.40

            # ==========================================================
            # MEMBERSHIP
            # ==========================================================

            membership_query = (
                "membership" in q_lower
                or "member" in q_lower
                or "join" in q_lower
            )

            if membership_query:

                if (
                    "06. membership"
                    in category
                    or "membership"
                    in category
                ):
                    score += 0.70

            # ==========================================================
            # COURSES / LEARNING
            # ==========================================================

            course_query = any(
                word in q_lower
                for word in [
                    "course",
                    "courses",
                    "learning",
                    "class",
                    "training",
                    "attend",
                    "pass"
                ]
            )

            if course_query:

                if (
                    "04. learning & courses"
                    in category
                    or "learning & courses"
                    in category
                ):
                    score += 0.60

            # ==========================================================
            # CONTACT
            # ==========================================================

            contact_query = any(
                word in q_lower
                for word in [
                    "contact",
                    "email",
                    "phone",
                    "number",
                    "reach"
                ]
            )

            if contact_query:

                if "contact" in category:
                    score += 0.60

            # ----------------------------------------------------------
            # Add result only if it passes threshold.
            # ----------------------------------------------------------

            if score >= threshold:

                scored_chunks.append({
                    "score": round(
                        score,
                        3
                    ),
                    "chunk": doc
                })

        # Sort highest relevance first.
        scored_chunks.sort(
            key=lambda x: x["score"],
            reverse=True
        )

        return scored_chunks[:top_k]

    # ------------------------------------------------------------------
    # REINDEX
    # ------------------------------------------------------------------

    def reindex(self):
        """
        Rebuild the knowledge-base index.
        """

        print(
            "[RAG Indexer] "
            "Re-building vector search index..."
        )

        self.load_and_index_kb()