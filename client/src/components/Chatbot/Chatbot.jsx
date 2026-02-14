import { AlertTriangle, Heart, HelpCircle, Maximize2, MessageCircle, Minimize2, RotateCcw, X, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const BASE_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api$/, '') : 'http://localhost:5001';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: "Welcome to LifeSaver Assistant! I'm here to help you with blood donation, finding donors, and saving lives.\n\nHow can I help you today?",
        isUser: false,
        timestamp: new Date().toISOString(),
        showQuickActions: true
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (isMinimized && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.isUser) {
        setUnreadCount(prev => prev + 1);
      }
    }
  }, [messages, isMinimized]);

  useEffect(() => {
    if (!isMinimized) {
      setUnreadCount(0);
    }
  }, [isMinimized]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch(`${BASE_URL}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: conversationHistory.slice(-10)
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        isUser: false,
        timestamp: data.timestamp,
        intent: data.intent,
        entities: data.entities
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.\n\n**Quick links:**\n* Search Donors: /search/Donors\n* Register: /registration\n* Eligibility: /eligibility\n* Contact: /contact",
        isUser: false,
        timestamp: new Date().toISOString(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setIsMinimized(false);
    setUnreadCount(0);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-24 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-300 floating-btn-pulse"
          aria-label="Open LifeSaver Assistant"
        >
          <MessageCircle className="w-6 h-6" />
          <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-20"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 chatbot-slide-in chatbot-container overflow-hidden ${
        isMinimized
          ? 'w-80 h-16'
          : 'w-80 sm:w-96 h-[500px] sm:h-[600px] max-h-[calc(100vh-2rem)]'
      }`}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-base">LifeSaver Assistant</h3>
              <div className="flex items-center gap-1 text-xs opacity-90">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Online</span>
              </div>
            </div>
            {unreadCount > 0 && isMinimized && (
              <span className="bg-yellow-400 text-red-900 text-xs px-2 py-1 rounded-full font-bold ml-2">
                {unreadCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button onClick={toggleMinimize} className="p-2 hover:bg-white/20 rounded-lg transition-colors" aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}>
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button onClick={resetChat} className="p-2 hover:bg-white/20 rounded-lg transition-colors" aria-label="Reset conversation">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors" aria-label="Close chat">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 chatbot-messages bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" style={{
              height: 'calc(100% - 140px)',
              minHeight: '250px'
            }}>
              {messages.length === 0 ? (
                <div className="h-full overflow-y-auto py-4">
                  <div className="text-center chatbot-fade-in w-full max-w-md mx-auto px-2">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
                        <Heart className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        Welcome to LifeSaver!
                      </h2>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                        Your intelligent assistant for blood donations and donor search.
                        <span className="block mt-1 font-medium text-red-600 dark:text-red-400">
                          Let&apos;s save lives together!
                        </span>
                      </p>
                    </div>

                    {/* Quick Start Actions */}
                    <div className="space-y-2 mb-4">
                      <div className="text-left">
                        <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                          <Zap className="w-3 h-3 text-yellow-500" />
                          Quick Actions
                        </h3>
                        <div className="grid gap-2">
                          <button
                            onClick={() => sendMessage("I need to find a blood donor urgently")}
                            className="group flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-700/50 rounded-lg hover:shadow-md transition-all duration-300 text-left"
                          >
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                              <AlertTriangle className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-red-700 dark:text-red-300 text-xs">Emergency Help</div>
                              <div className="text-[10px] text-red-600/70 dark:text-red-400/70">Find donors immediately</div>
                            </div>
                          </button>

                          <button
                            onClick={() => sendMessage("I want to donate blood")}
                            className="group flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700/50 rounded-lg hover:shadow-md transition-all duration-300 text-left"
                          >
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                              <Heart className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-blue-700 dark:text-blue-300 text-xs">Donate Blood</div>
                              <div className="text-[10px] text-blue-600/70 dark:text-blue-400/70">Register as a donor</div>
                            </div>
                          </button>

                          <button
                            onClick={() => sendMessage("I need general help")}
                            className="group flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700/50 rounded-lg hover:shadow-md transition-all duration-300 text-left"
                          >
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                              <HelpCircle className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-green-700 dark:text-green-300 text-xs">General Help</div>
                              <div className="text-[10px] text-green-600/70 dark:text-green-400/70">Questions & support</div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Buttons Grid */}
                    <div className="mt-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 text-center">
                        Or try asking a question:
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { emoji: '🩸', text: 'How to donate?' },
                          { emoji: '🔍', text: 'Search donors' },
                          { emoji: '📝', text: 'Register now' },
                          { emoji: '🩺', text: 'Blood types info' },
                          { emoji: '✅', text: 'Am I eligible?' },
                          { emoji: '😊', text: 'First time nervous' },
                        ].map((btn) => (
                          <button
                            key={btn.text}
                            onClick={() => sendMessage(btn.text)}
                            className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-xs"
                          >
                            <span>{btn.emoji}</span>
                            <span>{btn.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <div key={message.id} className="message-enter">
                      <ChatMessage
                        message={message.text}
                        isUser={message.isUser}
                        timestamp={message.timestamp}
                        isError={message.isError}
                      />

                      {message.showQuickActions && !message.isUser && (
                        <div className="mt-4 space-y-2">
                          {[
                            'I need to find a donor',
                            'I have a donation question',
                            'I want to learn about eligibility'
                          ].map((text) => (
                            <button
                              key={text}
                              onClick={() => sendMessage(text)}
                              className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
                            >
                              <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">{text}</span>
                              <svg className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="flex-shrink-0">
              <ChatInput
                onSendMessage={sendMessage}
                isLoading={isLoading}
                disabled={false}
              />
            </div>
          </>
        )}

        {isMinimized && (
          <div className="flex items-center justify-between p-4 h-full">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Chat minimized</span>
              {unreadCount > 0 && (
                <span className="text-xs text-red-600 font-medium">({unreadCount} new)</span>
              )}
            </div>
            <button onClick={toggleMinimize} className="text-xs text-red-600 hover:text-red-700 font-medium">
              Expand
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
