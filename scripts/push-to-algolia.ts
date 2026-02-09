// Script to push events data to Algolia
// Run with: npx ts-node --esm scripts/push-to-algolia.ts

import { algoliasearch } from 'algoliasearch';
import { sampleEvents } from '../lib/events-data';

const appId = 'GITMVWW0QR';
const adminKey = process.env.ALGOLIA_ADMIN_KEY || 'd330a839b5ebb1511643b48005d8f166';

async function pushToAlgolia() {
    const client = algoliasearch(appId, adminKey);

    console.log('🚀 Pushing events to Algolia...');
    console.log(`📦 ${sampleEvents.length} events to upload`);

    try {
        // Configure index settings
        await client.setSettings({
            indexName: 'events',
            indexSettings: {
                searchableAttributes: [
                    'title',
                    'description',
                    'category',
                    'city',
                    'location',
                    'tags',
                    'organizer'
                ],
                attributesForFaceting: [
                    'filterOnly(category)',
                    'filterOnly(city)',
                    'filterOnly(featured)',
                    'filterOnly(price)'
                ],
                customRanking: [
                    'desc(featured)',
                    'desc(rating)',
                    'asc(date)'
                ]
            }
        });

        // Save objects
        const result = await client.saveObjects({
            indexName: 'events',
            objects: sampleEvents
        });

        console.log('✅ Successfully pushed events to Algolia!');
        console.log(`📊 Task ID: ${result.taskID}`);
    } catch (error) {
        console.error('❌ Error pushing to Algolia:', error);
    }
}

pushToAlgolia();
