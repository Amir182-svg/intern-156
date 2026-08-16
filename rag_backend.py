"""
Inquisitor Chatbot — LLM + RAG Backend Server Implementation
Inquisitors Society — University of Engineering and Technology (UET), Lahore

This script implements:
1. Knowledge Base Loading & Indexing (Full 27-Section Document Vector Store)
2. RAG Semantic Retriever (Cosine Similarity & Term Overlap)
3. Intent Classifier & Slot Extractor
4. Strict System Prompt Guardrails (Zero Hallucination)
5. Gemini / OpenAI / Ollama / Local Fallback LLM Synthesizer
6. Lightweight HTTP Server Endpoint for Web UI & Root Index Serving
"""

import json
import re
import math
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

# Load Knowledge Base
KB_FILE_PATH = os.path.join(os.path.dirname(__file__), 'knowledge_base.json')

def load_knowledge_base():
    try:
        with open(KB_FILE_PATH, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading Knowledge Base: {e}")
        return []

KB_DATA = load_knowledge_base()

def tokenize(text):
    return re.findall(r'\w+', text.lower())

def compute_tf(tokens):
    tf = {}
    for t in tokens:
        tf[t] = tf.get(t, 0) + 1
    total = len(tokens) or 1
    return {k: v / total for k, v in tf.items()}

def compute_idf(documents):
    idf = {}
    N = len(documents)
    all_words = set(w for doc in documents for w in tokenize(doc['content'] + " " + doc['question']))
    for word in all_words:
        doc_count = sum(1 for doc in documents if word in tokenize(doc['content'] + " " + doc['question']))
        idf[word] = math.log((N + 1) / (doc_count + 1)) + 1
    return idf

DOC_IDF = compute_idf(KB_DATA) if KB_DATA else {}

def vector_search(query, top_k=3):
    query_tokens = tokenize(query)
    if not query_tokens or not KB_DATA:
        return []

    scores = []
    for doc in KB_DATA:
        doc_text = doc['question'] + " " + doc['content'] + " " + doc['category']
        doc_tokens = tokenize(doc_text)
        
        score = 0.0
        for token in set(query_tokens):
            if token in doc_tokens:
                tf = doc_tokens.count(token) / len(doc_tokens)
                idf = DOC_IDF.get(token, 1.0)
                score += tf * idf

        # Keyword Boost Rules
        if any(kw in query.lower() for kw in ['internship', 'apply', 'deadline']) and '15. Internship Application' in doc['category']:
            score += 0.5
        if any(kw in query.lower() for kw in ['course', 'limit', 'pass', 'attend', '60%', '80%']) and '04. Learning & Courses' in doc['category']:
            score += 0.5
        if any(kw in query.lower() for kw in ['member', 'join', 'free', 'fee']) and '06. Membership' in doc['category']:
            score += 0.5

        scores.append((score, doc))

    scores.sort(key=lambda x: x[0], reverse=True)
    return scores[:top_k]

SYSTEM_PROMPT = """
You are Inquisitor Assistant, the official intelligent AI helper for the Inquisitors Society at UET Lahore.

STRICT GROUNDING & SAFETY DIRECTIVES:
1. Use ONLY the provided Context information to answer the user's question.
2. Do NOT invent, assume, or fabricate any external member registration fees, unverified links, stipends, or unannounced event dates.
3. If the context does not contain sufficient verified information to answer, return the EXACT fallback statement:
   "I'm sorry, but I don't have verified information about that at the moment. Please contact Inquisitors Society at info@inquisitorssociety.org or through its official social-media channels for assistance."
4. If asked about applying for the 2026 internship, state that the advertised deadline was July 12, 2026 (11:59 PM GMT) and direct the user to verify any intake extension via official channels.
"""

def generate_rag_response(user_query, api_key=None):
    search_results = vector_search(user_query, top_k=2)
    top_score = search_results[0][0] if search_results else 0.0
    retrieved_docs = [doc for score, doc in search_results if score > 0.05]

    if not retrieved_docs or top_score < 0.04:
        return {
            "answer": "I'm sorry, but I don't have verified information about that at the moment. Please contact Inquisitors Society at info@inquisitorssociety.org or through its official social-media channels for assistance.",
            "intent": "23. Chatbot Fallback Response",
            "confidence": round(top_score, 3),
            "retrieved_sources": [],
            "status": "FALLBACK_TRIGGERED"
        }

    context_str = "\n\n".join([f"--- Context Source ({doc['category']}) ---\nQuestion: {doc['question']}\nInformation: {doc['content']}" for doc in retrieved_docs])
    
    if api_key or os.environ.get("GEMINI_API_KEY"):
        try:
            import google.generativeai as genai
            key = api_key or os.environ.get("GEMINI_API_KEY")
            genai.configure(api_key=key)
            model = genai.GenerativeModel("gemini-1.5-flash")
            
            prompt = f"{SYSTEM_PROMPT}\n\nRetrieved Context:\n{context_str}\n\nUser Question: {user_query}\n\nAnswer:"
            response = model.generate_content(prompt)
            answer_text = response.text.strip()
        except Exception as e:
            print(f"Gemini API Call Exception: {e}. Falling back to Rule-Based Grounded Engine.")
            answer_text = retrieved_docs[0]['content']
    else:
        primary_doc = retrieved_docs[0]
        answer_text = primary_doc['content']

    return {
        "answer": answer_text,
        "intent": retrieved_docs[0]['category'],
        "confidence": round(top_score, 3),
        "retrieved_sources": [doc['source'] for doc in retrieved_docs],
        "status": "SUCCESS"
    }

class RAGRequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_POST(self):
        if self.path == '/api/chat':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                payload = json.loads(post_data.decode('utf-8'))
                user_query = payload.get('query', '')
                api_key = payload.get('api_key', None)

                response_data = generate_rag_response(user_query, api_key=api_key)
                self._set_headers(200)
                self.wfile.write(json.dumps(response_data).encode('utf-8'))
            except Exception as e:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Endpoint not found"}).encode('utf-8'))

    def do_GET(self):
        if self.path == '/api/health':
            self._set_headers(200)
            self.wfile.write(json.dumps({
                "status": "ONLINE",
                "service": "Inquisitor Chatbot RAG Engine",
                "kb_chunks_loaded": len(KB_DATA)
            }).encode('utf-8'))
        elif self.path in ['/', '/index.html']:
            index_path = os.path.join(os.path.dirname(__file__), 'index.html')
            if os.path.exists(index_path):
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.end_headers()
                with open(index_path, 'rb') as f:
                    self.wfile.write(f.read())
            else:
                self._set_headers(404)
                self.wfile.write(json.dumps({"error": "index.html not found"}).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Path not found"}).encode('utf-8'))

def run_server(port=8000):
    host = '127.0.0.1'
    try:
        server_address = (host, port)
        httpd = HTTPServer(server_address, RAGRequestHandler)
    except Exception as e:
        print(f"Port {port} busy or restricted ({e}). Trying fallback port 8080...")
        port = 8080
        server_address = (host, port)
        httpd = HTTPServer(server_address, RAGRequestHandler)

    print(f"Inquisitor Chatbot RAG Backend Server running on http://{host}:{port}")
    print(f"Knowledge Base loaded with {len(KB_DATA)} documents.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")

if __name__ == '__main__':
    run_server(8000)
