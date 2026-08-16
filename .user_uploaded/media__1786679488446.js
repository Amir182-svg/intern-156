const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load knowledge base
const knowledgeBase = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../knowledge-base/knowledge.json'), 'utf8')
);

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here'
});

// Store conversations in memory (in production, use database)
const conversations = new Map();

// Helper: Find best match in knowledge base
function findBestMatch(query) {
  const queryLower = query.toLowerCase().trim();
  
  // Exact match check
  for (const faq of knowledgeBase.faqs) {
    if (faq.question.toLowerCase() === queryLower) {
      return faq;
    }
  }
  
  // Keyword matching
  let bestMatch = null;
  let highestScore = 0;
  
  for (const faq of knowledgeBase.faqs) {
    let score = 0;
    const keywords = faq.keywords || [];
    const questionWords = faq.question.toLowerCase().split(' ');
    
    // Check if any keyword matches
    for (const keyword of keywords) {
      if (queryLower.includes(keyword.toLowerCase())) {
        score += 2;
      }
    }
    
    // Check if any question word matches
    for (const word of queryLower.split(' ')) {
      if (word.length > 3 && faq.question.toLowerCase().includes(word)) {
        score += 1;
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = faq;
    }
  }
  
  return bestMatch && highestScore >= 2 ? bestMatch : null;
}

// Helper: Generate AI response
async function generateAIResponse(query, context = '') {
  try {
    // Prepare knowledge base context
    const faqContext = knowledgeBase.faqs
      .slice(0, 10)
      .map(f => `Q: ${f.question}\nA: ${f.answer}`)
      .join('\n\n');
    
    const systemPrompt = `You are the Inquisitors Society Assistant, a helpful chatbot for the Inquisitors Society platform. 
    Use the following knowledge to answer questions. If you don't know something, say so politely.
    
    Knowledge Base:
    ${faqContext}
    
    Rules:
    1. Be helpful and friendly
    2. Provide accurate information based on the knowledge base
    3. Suggest follow-up questions if appropriate
    4. If out of scope, politely redirect to platform topics
    5. Keep responses concise and clear`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('AI Error:', error);
    return null;
  }
}

// Main chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId, userId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Check if session exists, create if not
    if (!conversations.has(sessionId)) {
      conversations.set(sessionId, {
        messages: [],
        context: {}
      });
    }
    
    const session = conversations.get(sessionId);
    session.messages.push({ role: 'user', content: message });
    
    // First try: Knowledge base match
    let faqMatch = findBestMatch(message);
    let response = null;
    let isAI = false;
    
    if (faqMatch) {
      // Return from knowledge base
      response = {
        text: faqMatch.answer,
        source: 'knowledge-base',
        links: faqMatch.links || [],
        followup: faqMatch.followup || []
      };
    } else {
      // Check if it's a greeting
      const isGreeting = ['hi', 'hello', 'hey', 'greetings'].some(g => 
        message.toLowerCase().includes(g)
      );
      
      if (isGreeting) {
        const greetings = knowledgeBase.greetings || [
          'Hello! How can I help you today?',
          'Hi there! What would you like to know?'
        ];
        response = {
          text: greetings[Math.floor(Math.random() * greetings.length)],
          source: 'greeting',
          links: [],
          followup: ['How do I enroll in a course?', 'Tell me about events', 'How do I apply for internships?']
        };
      } else {
        // Try AI
        try {
          const aiResponse = await generateAIResponse(message);
          if (aiResponse) {
            response = {
              text: aiResponse,
              source: 'ai',
              links: [],
              followup: ['Tell me more', 'What else can you help with?']
            };
            isAI = true;
          } else {
            // Fallback
            const fallbacks = knowledgeBase.fallbacks || [
              "I don't have information about that yet. Please try rephrasing your question."
            ];
            response = {
              text: fallbacks[Math.floor(Math.random() * fallbacks.length)],
              source: 'fallback',
              links: [],
              followup: ['What courses are available?', 'Tell me about events', 'How do I get a certificate?']
            };
          }
        } catch (error) {
          // Fallback if AI fails
          const fallbacks = knowledgeBase.fallbacks || [
            "I couldn't find an answer. Please contact support for assistance."
          ];
          response = {
            text: fallbacks[Math.floor(Math.random() * fallbacks.length)],
            source: 'fallback',
            links: ['/support'],
            followup: ['How do I contact support?']
          };
        }
      }
    }
    
    // Store response in session
    session.messages.push({ role: 'assistant', content: response.text });
    
    // Send response
    res.json({
      success: true,
      response: response.text,
      source: response.source || 'knowledge-base',
      links: response.links || [],
      followup: response.followup || [],
      sessionId: sessionId
    });
    
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again.',
      response: 'I apologize, but I encountered an error. Please try again later.'
    });
  }
});

// Get conversation history
app.get('/api/chat/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  
  if (conversations.has(sessionId)) {
    res.json({
      success: true,
      history: conversations.get(sessionId).messages
    });
  } else {
    res.json({
      success: false,
      history: []
    });
  }
});

// Clear conversation
app.delete('/api/chat/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  
  if (conversations.has(sessionId)) {
    conversations.delete(sessionId);
    res.json({ success: true, message: 'Conversation cleared' });
  } else {
    res.json({ success: false, message: 'No conversation found' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    knowledgeBaseCount: knowledgeBase.faqs.length
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Knowledge base loaded: ${knowledgeBase.faqs.length} FAQs`);
});