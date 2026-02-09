import algoliasearch from 'algoliasearch';

// Initialize Algolia client
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || 'GITMVWW0QR';
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || '67bdc4910d78cc331a32230a9bde3be1';
const adminKey = process.env.ALGOLIA_ADMIN_KEY || '';

// Search client (for frontend)
export const searchClient = algoliasearch(appId, searchKey);

// Admin client (for indexing - server-side only)
export const adminClient = adminKey ? algoliasearch(appId, adminKey) : null;

// Index names
export const EVENTS_INDEX = 'events';

// Get search index
export const eventsIndex = searchClient.initIndex(EVENTS_INDEX);

// Event type for Algolia
export interface Event {
    objectID: string;
    title: string;
    description: string;
    category: string;
    date: string;
    time: string;
    location: string;
    city: string;
    price: number;
    image: string;
    attendees: number;
    maxAttendees: number;
    featured: boolean;
    tags: string[];
    organizer: string;
    rating: number;
}

// Search function
export async function searchEvents(query: string, filters?: {
    category?: string;
    city?: string;
    priceRange?: [number, number];
    freeOnly?: boolean;
}) {
    let filterString = '';

    if (filters) {
        const filterParts: string[] = [];

        if (filters.category && filters.category !== 'all') {
            filterParts.push(`category:${filters.category}`);
        }

        if (filters.city) {
            filterParts.push(`city:"${filters.city}"`);
        }

        if (filters.freeOnly) {
            filterParts.push('price=0');
        }

        if (filters.priceRange) {
            filterParts.push(`price:${filters.priceRange[0]} TO ${filters.priceRange[1]}`);
        }

        filterString = filterParts.join(' AND ');
    }

    try {
        const results = await eventsIndex.search<Event>(query, {
            filters: filterString,
            hitsPerPage: 20,
        });

        return results.hits;
    } catch (error) {
        console.error('Algolia search error:', error);
        return [];
    }
}

// Get featured events
export async function getFeaturedEvents() {
    try {
        const results = await eventsIndex.search<Event>('', {
            filters: 'featured:true',
            hitsPerPage: 5,
        });

        return results.hits;
    } catch (error) {
        console.error('Algolia search error:', error);
        return [];
    }
}
