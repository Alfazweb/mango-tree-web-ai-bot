'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

interface Message {
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! How can I help you today? You can ask me about our services, pricing, or contact information.",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const fetchBotResponse = async (userMessage: string): Promise<string> => {
    const apiMessages = [
      { role: 'system' as const, content: 'Chat history for context.' },
      ...messages.map((m) => ({
        role: (m.isUser ? 'user' : 'assistant') as const,
        content: m.text,
      })),
      { role: 'user' as const, content: userMessage },
    ]

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage, messages: apiMessages }),
    })

    const data = (await res.json()) as { reply?: string; error?: string }
    if (!res.ok) throw new Error(data.error || 'Failed to get response')
    return data.reply || "Sorry — I couldn't generate a response right now."
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Get bot response from Python (Groq)
    setTimeout(async () => {
      try {
        const reply = await fetchBotResponse(userMessage.text)
        const botMessage: Message = {
          text: reply,
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      } catch {
        const botMessage: Message = {
          text: "Sorry — I'm having trouble responding right now.",
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }
    }, 1000)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-40 bg-accent p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 ${isOpen ? 'hidden' : ''}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-6 z-50 w-96 h-[500px] bg-secondary rounded-lg shadow-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Chat Support</h3>
                <p className="text-sm text-text-secondary">Ask me anything about our services!</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-accent text-white rounded-br-none'
                        : 'bg-primary text-white rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                    <span className="text-xs opacity-75 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 bg-primary">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-secondary border border-gray-700 rounded-md focus:outline-none focus:border-accent text-white"
                />
                <button
                  type="submit"
                  className="bg-accent p-2 rounded-md hover:bg-accent/90 transition-colors"
                >
                  <PaperAirplaneIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 