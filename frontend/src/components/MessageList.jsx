import { useEffect, useRef } from 'react';
import { AnswerCard } from './AnswerCard.jsx';

export function MessageList({ messages, sessionId, onFeedback }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xl ${
              message.type === 'user'
                ? 'bg-blue-500 text-white rounded-lg rounded-tr-none'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg rounded-tl-none'
            } p-4`}
          >
            {message.type === 'user' ? (
              <p className="text-sm">{message.question}</p>
            ) : (
              <div className="space-y-3">
                <AnswerCard answer={message.answer} />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onFeedback(index, 'like')}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                      message.feedback === 'like' ? 'text-blue-500' : 'text-gray-500'
                    }`}
                    title="Like this response"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 10h4.764a2 2 0 0 1 1.789 2.894l-3.646 7.692A2 2 0 0 1 15.118 23H7a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h4.555c.375-1.318 1.316-3.591 2.368-5.953.259-.592.654-.9 1.077-.9 1.614 0 2 1.2 2 2.5s-.5 2.5-1 4z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onFeedback(index, 'dislike')}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                      message.feedback === 'dislike' ? 'text-red-500' : 'text-gray-500'
                    }`}
                    title="Dislike this response"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 14H5.236a2 2 0 0 1-1.789-2.894l3.646-7.692A2 2 0 0 1 8.882 1h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4.555c-.375 1.318-1.316 3.591-2.368 5.953-.259.592-.654.9-1.077.9-1.614 0-2-1.2-2-2.5s.5-2.5 1-4z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}