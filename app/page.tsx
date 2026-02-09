'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Users,
  Ticket,
  Star,
  ChevronDown,
  Funnel,
  Heart,
  Share2,
  TrendingUp,
  Zap,
  X,
  ExternalLink
} from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import { sampleEvents, categories, getFeaturedEvents, getFreeEvents, searchEvents, Event } from '@/lib/events-data';


// Floating particles component - client-side only to avoid hydration mismatch
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ left: string, delay: string, duration: string }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${15 + Math.random() * 10}s`,
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="particles">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}

// Event Card Component with enhanced animations
function EventCard({ event, onBookmark, isBookmarked, onSelect }: {
  event: Event;
  onBookmark: (id: string) => void;
  isBookmarked: boolean;
  onSelect: (event: Event) => void;
}) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      music: '#f093fb',
      sports: '#4facfe',
      art: '#43e97b',
      tech: '#fa709a',
      food: '#f8b739',
      wellness: '#a8edea',
      business: '#667eea',
      education: '#f093fb',
    };
    return colors[category] || '#667eea';
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.9), rgba(20, 20, 35, 0.95))',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Category Tag */}
      <div
        className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-semibold"
        style={{
          background: `${getCategoryColor(event.category)}20`,
          color: getCategoryColor(event.category),
          border: `1px solid ${getCategoryColor(event.category)}40`
        }}
      >
        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
      </div>

      {/* Bookmark Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.stopPropagation(); onBookmark(event.objectID); }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all"
        style={{
          background: isBookmarked ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Heart
          size={18}
          className={isBookmarked ? 'text-red-500 fill-red-500' : 'text-white/60'}
        />
      </motion.button>

      {/* Featured Badge */}
      {event.featured && (
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className="featured-badge"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          <Star size={12} fill="currentColor" />
          <span>Featured</span>
        </motion.div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />

        {/* Price Tag */}
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-bold"
          style={{
            background: event.price === 0 ? 'linear-gradient(135deg, #43e97b, #38f9d7)' : 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
          }}
        >
          {event.price === 0 ? 'FREE' : `₹${event.price.toLocaleString()}`}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#667eea] transition-colors line-clamp-1">
            {event.title}
          </h3>
          <p className="text-sm text-white/60 line-clamp-2 mt-1">
            {event.description}
          </p>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 text-xs text-white/70">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-[#667eea]" />
            <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-[#764ba2]" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span>{event.rating}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 text-sm text-white/60">
          <MapPin size={14} className="text-[#4facfe] flex-shrink-0 mt-0.5" />
          <span className="line-clamp-1">{event.location}, {event.city}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Users size={14} />
            <span>{event.attendees.toLocaleString()} / {event.maxAttendees.toLocaleString()}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(event)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <Ticket size={14} />
            View
          </motion.button>
        </div>
      </div>

      {/* Hover Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.15), transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

// Event Modal
function EventModal({ event, onClose }: { event: Event; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.98), rgba(20, 20, 35, 0.99))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div className="relative h-64">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#667eea]/20 text-[#667eea]">
                {event.category}
              </span>
              {event.featured && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#667eea] to-[#764ba2]">
                  <Star size={10} fill="currentColor" /> Featured
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-white">{event.title}</h2>
            <p className="text-white/60 mt-2">{event.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 text-[#667eea] mb-1">
                <Calendar size={16} />
                <span className="text-sm font-medium">Date</span>
              </div>
              <p className="text-white">{new Date(event.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 text-[#764ba2] mb-1">
                <Clock size={16} />
                <span className="text-sm font-medium">Time</span>
              </div>
              <p className="text-white">{event.time}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 text-[#4facfe] mb-1">
                <MapPin size={16} />
                <span className="text-sm font-medium">Location</span>
              </div>
              <p className="text-white">{event.location}</p>
              <p className="text-white/60 text-sm">{event.city}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 text-[#43e97b] mb-1">
                <Users size={16} />
                <span className="text-sm font-medium">Capacity</span>
              </div>
              <p className="text-white">{event.attendees.toLocaleString()} / {event.maxAttendees.toLocaleString()}</p>
              <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2]"
                  style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/70">
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              <Ticket size={18} />
              {event.price === 0 ? 'Register Free' : `Book for ₹${event.price.toLocaleString()}`}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
            >
              <Share2 size={18} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Stats Banner
function StatsBanner() {
  const stats = [
    { icon: <Zap size={20} />, value: '32+', label: 'Events', color: '#667eea' },
    { icon: <MapPin size={20} />, value: '6', label: 'Cities', color: '#4facfe' },
    { icon: <Users size={20} />, value: '50K+', label: 'Attendees', color: '#43e97b' },
    { icon: <TrendingUp size={20} />, value: '4.7', label: 'Avg Rating', color: '#f8b739' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.1 }}
          className="p-4 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(145deg, rgba(30, 30, 50, 0.8), rgba(20, 20, 35, 0.9))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex justify-center mb-2" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <div className="text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-xs text-white/60">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('eventBookmarks');
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  // Save bookmarks to localStorage
  const toggleBookmark = (id: string) => {
    setBookmarks(prev => {
      const updated = prev.includes(id)
        ? prev.filter(b => b !== id)
        : [...prev, id];
      localStorage.setItem('eventBookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  // Filter events
  const filteredEvents = sampleEvents.filter(event => {
    const matchesSearch = !searchQuery ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesBookmark = !showBookmarksOnly || bookmarks.includes(event.objectID);
    const matchesPrice = priceFilter === 'all' ||
      (priceFilter === 'free' && event.price === 0) ||
      (priceFilter === 'paid' && event.price > 0);

    return matchesSearch && matchesCategory && matchesBookmark && matchesPrice;
  });

  const featuredEvents = getFeaturedEvents();

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="gradient-bg" />
      <FloatingParticles />

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#667eea]/10 border border-[#667eea]/20 mb-6">
              <Sparkles size={16} className="text-[#667eea]" />
              <span className="text-sm text-[#667eea]">AI-Powered Event Discovery</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
                EventMatch
              </span>
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
              Discover events that match your vibe. From concerts to conferences,
              find your next unforgettable experience.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="search-container max-w-2xl mx-auto"
          >
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search events, venues, or cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </motion.div>

          {/* Quick Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mt-6"
          >
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${showBookmarksOnly
                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                }`}
            >
              <Heart size={14} className={showBookmarksOnly ? 'fill-red-400' : ''} />
              Saved ({bookmarks.length})
            </button>
            {['all', 'free', 'paid'].map((filter) => (
              <button
                key={filter}
                onClick={() => setPriceFilter(filter as typeof priceFilter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${priceFilter === filter
                  ? 'bg-[#667eea]/20 text-[#667eea] border border-[#667eea]/40'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'
                  }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Stats */}
          <StatsBanner />
        </div>
      </section>

      {/* Featured Events */}
      {!searchQuery && selectedCategory === 'all' && !showBookmarksOnly && (
        <section className="px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Star className="text-[#f8b739]" fill="#f8b739" />
              Featured Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.slice(0, 3).map((event) => (
                <EventCard
                  key={event.objectID}
                  event={event}
                  onBookmark={toggleBookmark}
                  isBookmarked={bookmarks.includes(event.objectID)}
                  onSelect={setSelectedEvent}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories & Events */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Category Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {showBookmarksOnly ? 'Saved Events' : 'Explore Events'}
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              <Funnel size={16} />
              <span>Filters</span>
              <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Category Pills */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-5 py-3 rounded-2xl text-sm font-medium transition-all flex items-center gap-2 ${selectedCategory === cat.id
                        ? 'text-white shadow-lg'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                        }`}
                      style={{
                        background: selectedCategory === cat.id
                          ? `linear-gradient(135deg, ${cat.color}80, ${cat.color}40)`
                          : undefined,
                        borderColor: selectedCategory === cat.id ? cat.color : undefined,
                      }}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Events Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.objectID}
                  event={event}
                  onBookmark={toggleBookmark}
                  isBookmarked={bookmarks.includes(event.objectID)}
                  onSelect={setSelectedEvent}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-white/60">Try adjusting your filters or search query</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <ChatInterface />
    </main>
  );
}
