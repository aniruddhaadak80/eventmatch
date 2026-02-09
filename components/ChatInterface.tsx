'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Loader2, MapPin, Calendar, Ticket } from 'lucide-react';
import { Event } from '@/lib/algolia';
import { sampleEvents } from '@/lib/events-data';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    events?: Event[];
}

const suggestions = [
    "Show me music events in Mumbai",
    "What's happening this weekend?",
    "Find free events near me",
    "Tech conferences in Bangalore",
];

export default function ChatInterface() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hey! 👋 I'm your EventMatch assistant. I can help you discover amazing events based on your interests, location, and schedule. What kind of experiences are you looking for?",
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Simple AI response logic (simulating Algolia Agent Studio)
    const processQuery = (query: string): { response: string; events: Event[] } => {
        const lowerQuery = query.toLowerCase();
        let filteredEvents: Event[] = [];
        let response = '';

        // Category matching
        if (lowerQuery.includes('music') || lowerQuery.includes('concert')) {
            filteredEvents = sampleEvents.filter(e => e.category === 'Music');
            response = `🎵 Found ${filteredEvents.length} music events for you! Here are some amazing concerts and live performances:`;
        } else if (lowerQuery.includes('tech') || lowerQuery.includes('conference') || lowerQuery.includes('hackathon')) {
            filteredEvents = sampleEvents.filter(e => e.category === 'Tech');
            response = `💻 Found ${filteredEvents.length} tech events! From conferences to hackathons, here's what's happening:`;
        } else if (lowerQuery.includes('sport') || lowerQuery.includes('marathon') || lowerQuery.includes('cricket')) {
            filteredEvents = sampleEvents.filter(e => e.category === 'Sports');
            response = `⚽ Found ${filteredEvents.length} sports events for you! Get ready to cheer:`;
        } else if (lowerQuery.includes('art') || lowerQuery.includes('exhibition') || lowerQuery.includes('gallery')) {
            filteredEvents = sampleEvents.filter(e => e.category === 'Art');
            response = `🎨 Found ${filteredEvents.length} art events! Feast your eyes on creativity:`;
        } else if (lowerQuery.includes('food') || lowerQuery.includes('wine') || lowerQuery.includes('culinary')) {
            filteredEvents = sampleEvents.filter(e => e.category === 'Food');
            response = `🍽️ Found ${filteredEvents.length} food events! Get ready for a delicious experience:`;
        } else if (lowerQuery.includes('yoga') || lowerQuery.includes('wellness') || lowerQuery.includes('meditation')) {
            filteredEvents = sampleEvents.filter(e => e.category === 'Wellness');
            response = `🧘 Found ${filteredEvents.length} wellness events! Time for some self-care:`;
        }
        // Location matching
        else if (lowerQuery.includes('mumbai')) {
            filteredEvents = sampleEvents.filter(e => e.location.city === 'Mumbai');
            response = `📍 Found ${filteredEvents.length} events in Mumbai! Here's what's happening in the city:`;
        } else if (lowerQuery.includes('bangalore') || lowerQuery.includes('bengaluru')) {
            filteredEvents = sampleEvents.filter(e => e.location.city === 'Bangalore');
            response = `📍 Found ${filteredEvents.length} events in Bangalore! Check these out:`;
        } else if (lowerQuery.includes('delhi')) {
            filteredEvents = sampleEvents.filter(e => e.location.city === 'Delhi');
            response = `📍 Found ${filteredEvents.length} events in Delhi! The city has lots to offer:`;
        }
        // Price matching
        else if (lowerQuery.includes('free')) {
            filteredEvents = sampleEvents.filter(e => e.price.isFree);
            response = `🆓 Found ${filteredEvents.length} free events! No wallet needed:`;
        } else if (lowerQuery.includes('weekend') || lowerQuery.includes('today') || lowerQuery.includes('tomorrow')) {
            filteredEvents = sampleEvents.slice(0, 4);
            response = `📅 Here are some upcoming events you might enjoy:`;
        } else if (lowerQuery.includes('featured') || lowerQuery.includes('popular') || lowerQuery.includes('best')) {
            filteredEvents = sampleEvents.filter(e => e.featured);
            response = `⭐ Here are our featured events - the best of the best:`;
        } else {
            // Default - show featured events
            filteredEvents = sampleEvents.filter(e => e.featured).slice(0, 3);
            response = `I can help you find events! Try asking about specific categories (music, tech, sports), cities (Mumbai, Bangalore, Delhi), or budget (free events). Here are some featured events to get you started:`;
        }

        return { response, events: filteredEvents.slice(0, 4) };
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const { response, events } = processQuery(userMessage.content);

        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response,
            events,
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
    };

    const formatPrice = (price: { min: number; max: number; isFree: boolean }) => {
        if (price.isFree) return 'Free';
        if (price.min === price.max) return `₹${price.min.toLocaleString()}`;
        return `₹${price.min.toLocaleString()}+`;
    };

    return (
        <div className="chat-container">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="chat-window"
                    >
                        {/* Header */}
                        <div className="chat-header">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] flex items-center justify-center">
                                        <Sparkles size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">EventMatch AI</h3>
                                        <p className="text-xs text-white/60">Powered by Algolia</p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <X size={20} className="text-white/70" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="chat-messages">
                            {messages.map((message) => (
                                <div key={message.id} className="space-y-3">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`chat-message ${message.role}`}
                                    >
                                        <p className="text-sm leading-relaxed">{message.content}</p>
                                    </motion.div>

                                    {/* Event Cards in Chat */}
                                    {message.events && message.events.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-2 ml-0"
                                        >
                                            {message.events.map((event) => (
                                                <motion.div
                                                    key={event.objectID}
                                                    whileHover={{ scale: 1.02 }}
                                                    className="bg-[#1a1a24] rounded-xl p-3 border border-white/[0.08] cursor-pointer hover:border-[#667eea]/50 transition-all"
                                                >
                                                    <div className="flex gap-3">
                                                        <img
                                                            src={event.image}
                                                            alt={event.title}
                                                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-medium text-white text-sm truncate">{event.title}</h4>
                                                            <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
                                                                <Calendar size={10} />
                                                                <span>{new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                                                                <MapPin size={10} />
                                                                <span className="truncate">{event.location.city}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between mt-2">
                                                                <span className="text-xs font-medium text-[#4facfe]">{formatPrice(event.price)}</span>
                                                                <button className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-md text-xs text-white">
                                                                    <Ticket size={10} />
                                                                    Book
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2 text-white/60"
                                >
                                    <Loader2 size={16} className="animate-spin" />
                                    <span className="text-sm">Finding events...</span>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions */}
                        {messages.length === 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="px-4 pb-2"
                            >
                                <p className="text-xs text-white/40 mb-2">Try asking:</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestions.map((suggestion, i) => (
                                        <motion.button
                                            key={suggestion}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ scale: 1.05 }}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="px-3 py-1.5 bg-[#1a1a24] rounded-full text-xs text-white/70 border border-white/[0.08] hover:border-[#667eea]/50 transition-all"
                                        >
                                            {suggestion}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Input */}
                        <div className="chat-input-container">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about events..."
                                    className="flex-1 chat-input"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="p-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={18} />
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="chat-toggle"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X size={26} className="text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageCircle size={26} className="text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
