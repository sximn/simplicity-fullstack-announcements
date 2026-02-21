import { Injectable } from '@nestjs/common';
import { type DB } from 'src/database';
import { InjectDatabase } from 'src/database/database.provider';
import {
  announcements,
  announcementsToCategories,
  InsertAnnouncement,
  InsertAnnouncementToCategories,
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

  async all() {
    return this.db.select().from(announcements);
  }
}
