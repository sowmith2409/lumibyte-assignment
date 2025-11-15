// API service for backend communication
const API_URL =
  (process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim()) ||
  'https://lumibyte-assignment.onrender.com';

// Get all sessions
export async function getSessions() {
  try {
    const response = await fetch(`${API_URL}/api/sessions`);
    if (!response.ok) throw new Error('Failed to fetch sessions');
    return response.json();
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return [];
  }
}

// Create a new chat session
export async function createNewChat() {
  try {
    const response = await fetch(`${API_URL}/api/new-chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to create new chat');
    return response.json();
  } catch (error) {
    console.error('Error creating new chat:', error);
    throw error;
  }
}

// Get a specific session with messages
export async function getSession(sessionId) {
  try {
    const response = await fetch(`${API_URL}/api/session/${sessionId}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error('Session not found');
      throw new Error('Failed to fetch session');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching session:', error);
    throw error;
  }
}

// Send a message and get response
export async function sendMessage(sessionId, question) {
  try {
    const response = await fetch(`${API_URL}/api/chat/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    if (!response.ok) throw new Error('Failed to send message');
    return response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Update feedback for a message
export async function updateMessageFeedback(sessionId, messageIndex, feedback) {
  try {
    const response = await fetch(`${API_URL}/api/chat/${sessionId}/feedback`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageIndex, feedback })
    });
    if (!response.ok) throw new Error('Failed to update feedback');
    return response.json();
  } catch (error) {
    console.error('Error updating feedback:', error);
    throw error;
  }
}