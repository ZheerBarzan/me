import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Zheer's AI assistant. Ask me anything about his work or skills." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const responseText = await generateChatResponse(messages, userMessage);
      setMessages(prev => [...prev, { role: 'model', text: responseText || "Sorry, I couldn't generate a response." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] md:w-[400px] max-h-[600px] bg-white border border-zinc-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ring-1 ring-black/5">
          {/* Header */}
          <div className="bg-red-600 p-5 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                  <span className="text-white font-bold block leading-tight">AI Assistant</span>
                  <span className="text-red-200 text-xs">Powered by Gemini</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors bg-white/10 p-1 rounded-full hover:bg-white/20">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 h-[350px] md:h-[400px] overflow-y-auto p-4 md:p-6 space-y-4 bg-zinc-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-zinc-900 text-white rounded-tr-sm' 
                    : 'bg-white text-zinc-700 rounded-tl-sm border border-zinc-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-zinc-100 shadow-sm flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-zinc-100 shrink-0">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about Zheer's skills..."
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-full py-3.5 px-5 pr-14 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-sm font-medium placeholder:text-zinc-400"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-red-600 rounded-full text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-red-600/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 md:h-16 md:w-16 bg-red-600 text-white rounded-full shadow-2xl shadow-red-600/30 flex items-center justify-center hover:scale-110 transition-transform duration-300 group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-red-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isOpen ? (
          <X className="w-6 h-6 md:w-7 md:h-7 relative z-10" />
        ) : (
          <MessageSquare className="w-6 h-6 md:w-7 md:h-7 relative z-10" />
        )}
      </button>
    </div>
  );
};

export default AIChat;