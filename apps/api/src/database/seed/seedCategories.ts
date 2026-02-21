import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { categories } from '../schema';

const client = createClient({ url: process.env.DB_FILE_NAME! });
const db = drizzle({ client });

async function seedCategories() {
  const existing = await db.select().from(categories);
  if (existing.length > 0) {
    console.log('categories already seeded');
    return;
  }

  await db.insert(categories).values([
    { name: 'City', slug: 'city' },
    { name: 'Community Events', slug: 'community-events' },
    { name: 'Crime & Safety', slug: 'crime-and-safety' },
    { name: 'Culture', slug: 'culture' },
    { name: 'Discounts & Benefits', slug: 'discounts-and-benefits' },
    { name: 'Emergencies', slug: 'emergencies' },
    { name: 'For Seniors', slug: 'for-seniors' },
    { name: 'Health', slug: 'health' },
    { name: 'Kids & Family', slug: 'kids-and-family' },
  ]);

  console.log('categories seeded');
}

seedCategories();
