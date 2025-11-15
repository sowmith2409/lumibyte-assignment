import express from 'express';
import cors from 'cors';
import { mockAnswers, sessions, getRandomAnswer, generateSessionId } from './mockData.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());


function getAnswerForQuestion(question) {
  question = question.toLowerCase();

  if (question.includes("climate") || question.includes("co2") || question.includes("environment")) {
    return mockAnswers[0];
  }

  if (question.includes("population") || question.includes("demographics") || question.includes("people")) {
    return mockAnswers[1];
  }

  if (question.includes("education") || question.includes("ranking") || question.includes("score") || question.includes("school")) {
    return mockAnswers[2];
  }

  if (question.includes("ev") || question.includes("electric") || question.includes("vehicle") || question.includes("car")) {
    return mockAnswers[3];
  }

  if (question.includes("tourism") || question.includes("travel") || question.includes("visitors")) {
    return mockAnswers[4];
  }

  // fallback random answer
  return getRandomAnswer();
}


app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/sessions', (req, res) => {
  const sessionsList = sessions.map(session => ({
    sessionId: session.sessionId,
    title: session.title,
    createdAt: session.createdAt,
    messageCount: session.messages.length
  }));

  res.json(sessionsList);
});


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


app.get('/api/session/:id', (req, res) => {
  const { id } = req.params;
  const session = sessions.find(s => s.sessionId === id);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  res.json(session);
});

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

  // Add bot response (correct answer)
  const botMessage = {
    type: 'bot',
    answer: getAnswerForQuestion(question),
    timestamp: new Date().toISOString(),
    feedback: null
  };
  session.messages.push(botMessage);

  // Update session title on first message
  if (session.messages.length === 2) {
    session.title = question.length > 40 ? question.substring(0, 40) + "..." : question;
  }

  res.json(session.messages);
});

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET    /api/sessions`);
  console.log(`  POST   /api/new-chat`);
  console.log(`  GET    /api/session/:id`);
  console.log(`  POST   /api/chat/:id`);
  console.log(`  PUT    /api/chat/:id/feedback`);
});
