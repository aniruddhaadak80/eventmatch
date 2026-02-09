'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Star, Ticket } from 'lucide-react';
import { Event } from '@/lib/algolia';

interface EventCardProps {
    event: Event;
    index: number;
}

const categoryColors: Record<string, string> = {
    Music: 'music',
    Sports: 'sports',
    Art: 'art',
    Tech: 'tech',
    Food: 'food',
    Wellness: 'wellness',
};

export default function EventCard({ event, index }: EventCardProps) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatPrice = (price: { min: number; max: number; isFree: boolean }) => {
        if (price.isFree) return 'Free';
        if (price.min === price.max) return `₹${price.min.toLocaleString()}`;
        return `₹${price.min.toLocaleString()} - ₹${price.max.toLocaleString()}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-3xl bg-[#13131a] border border-white/[0.08] cursor-pointer"
        >
            {/* Featured Badge */}
            {event.featured && (
                <div className="absolute top-4 left-4 z-20">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.3 + index * 0.1 }}
                        className="featured-badge"
                    >
                        <Star size={12} fill="currentColor" />
                        Featured
                    </motion.div>
                </div>
            )}

            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <motion.img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13131a] via-transparent to-transparent opacity-80" />

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                    <span className={`category-pill ${categoryColors[event.category]}`}>
                        {event.category}
                    </span>
                </div>

                {/* Price Tag */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-semibold">
                    {formatPrice(event.price)}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#667eea] group-hover:to-[#764ba2] group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
                        {event.title}
                    </h3>
                    <p className="text-sm text-white/60 mt-2 line-clamp-2">{event.description}</p>
                </div>

                {/* Info Row */}
                <div className="flex flex-wrap gap-3 text-sm text-white/70">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#667eea]" />
                        <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-[#764ba2]" />
                        <span>{event.time}</span>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-white/60">
                    <MapPin size={14} className="text-[#4facfe] flex-shrink-0" />
                    <span className="truncate">{event.location.venue}, {event.location.city}</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                    <div className="flex items-center gap-2 text-sm text-white/50">
                        <Users size={14} />
                        <span>{event.capacity.toLocaleString()} capacity</span>
                    </div>

                    {event.ticketsAvailable ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full text-sm font-medium text-white"
                        >
                            <Ticket size={14} />
                            Get Tickets
                        </motion.button>
                    ) : (
                        <span className="text-sm text-rose-400 font-medium">Sold Out</span>
                    )}
                </div>
            </div>

            {/* Hover Glow Effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.15), transparent 50%)',
                }}
            />
        </motion.div>
    );
}
