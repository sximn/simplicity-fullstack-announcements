import { Injectable } from '@nestjs/common';
import { type DB } from 'src/database';
import { InjectDatabase } from 'src/database/database.provider';
import { announcements } from 'src/database/schema';

@Injectable()
export class AnnouncementsRepository {
  constructor(@InjectDatabase() private readonly db: DB) {}

  async all() {
    return this.db.select().from(announcements);
  }
}
