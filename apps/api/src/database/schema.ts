import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import { sqliteTable, int, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';

export const announcements = sqliteTable('announcements', {
  id: int().primaryKey({ autoIncrement: true }),

  title: text().notNull(),
  content: text().notNull(),
  publicationDate: integer({ mode: 'timestamp' }).notNull(),

  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const announcementsRelations = relations(announcements, ({ many }) => ({
  announcementsToCategories: many(announcementsToCategories),
}));

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  announcementsToCategories: many(announcementsToCategories),
}));

export const announcementsToCategories = sqliteTable(
  'announcements_to_categories',
  {
    announcementId: integer('announcement_id')
      .notNull()
      .references(() => announcements.id, { onDelete: 'cascade' }),

    categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.announcementId, table.categoryId] })],
);

export const announcementsToCategoriesRelations = relations(
  announcementsToCategories,
  ({ one }) => ({
    category: one(categories, {
      fields: [announcementsToCategories.categoryId],
      references: [categories.id],
    }),
    announcement: one(announcements, {
      fields: [announcementsToCategories.announcementId],
      references: [announcements.id],
    }),
  }),
);

export type SelectAnnouncement = InferSelectModel<typeof announcements>;
export type InsertAnnouncement = InferInsertModel<typeof announcements>;

export type SelectAnnouncementToCategories = InferSelectModel<typeof announcementsToCategories>;
export type InsertAnnouncementToCategories = InferInsertModel<typeof announcementsToCategories>;

export type SelectCategory = InferSelectModel<typeof categories>;
export type InsertCategory = InferInsertModel<typeof categories>;
