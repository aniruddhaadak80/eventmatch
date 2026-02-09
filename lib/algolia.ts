import algoliasearch from 'algoliasearch';

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!;
const adminKey = process.env.ALGOLIA_ADMIN_KEY!;

// Search client (for frontend)
export const searchClient = algoliasearch(appId, searchKey);

// Admin client (for seeding data - server-side only)
export const adminClient = algoliasearch(appId, adminKey);

// Index names
export const EVENTS_INDEX = 'events';

// Event type definition
export interface Event {
    objectID: string;
    title: string;
    description: string;
    category: 'Music' | 'Sports' | 'Art' | 'Tech' | 'Food' | 'Wellness';
    subcategory: string;
    date: string;
    time: string;
    location: {
        city: string;
        venue: string;
        address: string;
        _geoloc: {
            lat: number;
            lng: number;
        };
    };
    price: {
        min: number;
        max: number;
        currency: string;
        isFree: boolean;
    };
    image: string;
    tags: string[];
    capacity: number;
    ticketsAvailable: boolean;
    organizer: string;
    featured: boolean;
}
