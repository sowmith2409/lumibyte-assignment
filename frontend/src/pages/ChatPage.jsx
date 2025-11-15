import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatHeader } from '../components/ChatHeader';
import { Sidebar } from '../components/Sidebar';
import { MessageList } from '../components/MessageList';
import { ChatInput } from '../components/ChatInput';
import {
  getSessions,
  getSession,
  sendMessage,
  updateMessageFeedback,
  createNewChat,
} from '../lib/apiService';

export default function ChatPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load sessions on mount
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await getSessions();
        setSessions(data);
      } catch (error) {
        console.error('Failed to load sessions:', error);
      }
    };
    loadSessions();
  }, []);

  // Load session messages when sessionId changes
  useEffect(() => {
    if (sessionId) {
      const loadSession = async () => {
        try {
          const session = await getSession(sessionId);
          setMessages(session.messages || []);
        } catch (error) {
          console.error('Failed to load session:', error);
          navigate('/');
        }
      };
      loadSession();
    }
  }, [sessionId, navigate]);

  const handleNewChat = async () => {
    try {
      setIsLoading(true);
      const { sessionId: newSessionId } = await createNewChat();
      setSessions(await getSessions());
      navigate(`/chat/${newSessionId}`);
    } catch (error) {
      console.error('Failed to create new chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (question) => {
    if (!sessionId) return;
    try {
      setIsLoading(true);
      const updatedMessages = await sendMessage(sessionId, question);
      setMessages(updatedMessages);
      setSessions(await getSessions());
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageIndex, feedback) => {
    if (!sessionId) return;
    try {
      const updatedMessages = await updateMessageFeedback(sessionId, messageIndex, feedback);
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Failed to update feedback:', error);
    }
  };

  if (!sessionId) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto">
            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Welcome to InsightBot
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your AI-powered data assistant. Ask questions and get insights in beautiful table formats.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-white dark:bg-gray-900">
      <Sidebar
        sessions={sessions}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader onMenuClick={() => setSidebarOpen(true)} />

        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center space-y-4 max-w-md">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto">
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Start a conversation
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Ask me anything about your data, metrics, or analytics.
              </p>
            </div>
          </div>
        ) : (
          <MessageList
            messages={messages}
            sessionId={sessionId}
            onFeedback={handleFeedback}
          />
        )}

        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}