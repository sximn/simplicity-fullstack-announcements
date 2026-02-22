import { Injectable } from '@nestjs/common';
import { eq, and, or, like, inArray, SQL } from 'drizzle-orm';
import { type DB } from 'src/database';
import { InjectDatabase } from 'src/database/database.provider';
import {
  announcements,
  announcementsToCategories,
  categories,
  InsertAnnouncement,
  InsertAnnouncementToCategories,
  SelectCategory,
  UpdateAnnouncement,
} from 'src/database/schema';

@Injectable()
export class AnnouncementsRepository {
  constructor(@InjectDatabase() private readonly db: DB) {}

  async create({
    announcement,
    categoryIds,
  }: {
    announcement: InsertAnnouncement;
    categoryIds: Array<InsertAnnouncementToCategories['categoryId']>;
  }) {
    return this.db.transaction(async (tx) => {
      const inserted = await tx.insert(announcements).values(announcement).returning().get();

      await tx.insert(announcementsToCategories).values(
        categoryIds.map((categoryId) => ({
          announcementId: inserted.id,
          categoryId,
        })),
      );

      return inserted;
    });
  }

  async allWithCategories(searchQuery?: string, categoryIds?: SelectCategory['id'][]) {
    const matchingIdsSubquery = this.db
      .select({ id: announcements.id })
      .from(announcements)
      .leftJoin(
        announcementsToCategories,
        eq(announcements.id, announcementsToCategories.announcementId),
      )
      .where(
        and(
          searchQuery
            ? or(
                like(announcements.title, `%${searchQuery}%`),
                like(announcements.content, `%${searchQuery}%`),
              )
            : undefined,
          categoryIds?.length
            ? inArray(announcementsToCategories.categoryId, categoryIds)
            : undefined,
        ),
      );

    return await this.db
      .select({
        announcement: announcements,
        category: {
          id: categories.id,
          name: categories.name,
        },
      })
      .from(announcements)
      .where(inArray(announcements.id, matchingIdsSubquery))
      .leftJoin(
        announcementsToCategories,
        eq(announcements.id, announcementsToCategories.announcementId),
      )
      .leftJoin(categories, eq(announcementsToCategories.categoryId, categories.id))
      .orderBy(announcements.id);
  }

  async findOne(id: number) {
    return await this.db.query.announcements.findFirst({
      where: eq(announcements.id, id),
      with: {
        announcementsToCategories: {
          with: {
            category: true,
          },
        },
      },
    });
  }

  async update(data: UpdateAnnouncement & { categoryIds?: Array<SelectCategory['id']> }) {
    return await this.db.transaction(async (tx) => {
      await tx
        .update(announcements)
        .set({
          title: data.title,
          content: data.content,
          publicationDate: data.publicationDate,
          updatedAt: new Date(),
        })
        .where(eq(announcements.id, data.id));

      // update categories if they were provided
      if (data.categoryIds) {
        // delete existing links
        await tx
          .delete(announcementsToCategories)
          .where(eq(announcementsToCategories.announcementId, data.id));

        // insert new links
        if (data.categoryIds.length > 0) {
          await tx.insert(announcementsToCategories).values(
            data.categoryIds.map((catId) => ({
              announcementId: data.id,
              categoryId: catId,
            })),
          );
        }
      }

      return { success: true };
    });
  }
}
