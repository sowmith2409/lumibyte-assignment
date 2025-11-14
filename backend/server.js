import express from 'express';
import cors from 'cors';
import { sessions, getRandomAnswer, generateSessionId } from './mockData.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// GET /api/sessions - Get all sessions
app.get('/api/sessions', (req, res) => {
  const sessionsList = sessions.map(session => ({
    sessionId: session.sessionId,
    title: session.title,
    createdAt: session.createdAt,
    messageCount: session.messages.length
  }));
  res.json(sessionsList);
});

// POST /api/new-chat - Create a new session
app.post('/api/new-chat', (req, res) => {
  const newSessionId = generateSessionId();
  const newSession = {
    sessionId: newSessionId,
    title: 'New Chat',
    createdAt: new Date().toISOString(),
    messages: []
  };
  sessions.push(newSession);
  res.json({ sessionId: newSessionId });
});

// GET /api/session/:id - Get specific session with all messages
app.get('/api/session/:id', (req, res) => {
  const { id } = req.params;
  const session = sessions.find(s => s.sessionId === id);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  res.json(session);
});

// POST /api/chat/:id - Send a message in a session
app.post('/api/chat/:id', (req, res) => {
  const { id } = req.params;
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const session = sessions.find(s => s.sessionId === id);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  // Add user message
  const userMessage = {
    type: 'user',
    question,
    timestamp: new Date().toISOString(),
    feedback: null
  };
  session.messages.push(userMessage);

  // Add bot response
  const botMessage = {
    type: 'bot',
    answer: getRandomAnswer(),
    timestamp: new Date().toISOString(),
    feedback: null
  };
  session.messages.push(botMessage);

  // Update session title if it's the first message
  if (session.messages.length === 2) {
    session.title = question.length > 40 ? question.substring(0, 40) + '...' : question;
  }

  res.json(session.messages);
});

// PUT /api/chat/:id/feedback - Update feedback for a message
app.put('/api/chat/:id/feedback', (req, res) => {
  const { id } = req.params;
  const { messageIndex, feedback } = req.body;

  if (messageIndex === undefined || !feedback) {
    return res.status(400).json({ error: 'messageIndex and feedback are required' });
  }

  const session = sessions.find(s => s.sessionId === id);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  if (!session.messages[messageIndex]) {
    return res.status(400).json({ error: 'Invalid message index' });
  }

  session.messages[messageIndex].feedback = feedback;
  res.json(session.messages);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET    http://localhost:${PORT}/api/sessions`);
  console.log(`  POST   http://localhost:${PORT}/api/new-chat`);
  console.log(`  GET    http://localhost:${PORT}/api/session/:id`);
  console.log(`  POST   http://localhost:${PORT}/api/chat/:id`);
  console.log(`  PUT    http://localhost:${PORT}/api/chat/:id/feedback`);
});