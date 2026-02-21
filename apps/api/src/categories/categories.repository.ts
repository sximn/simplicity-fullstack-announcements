import { Injectable } from '@nestjs/common';
import { type DB } from 'src/database';
import { InjectDatabase } from 'src/database/database.provider';
import { categories } from 'src/database/schema';

@Injectable()
export class CategoriesRepository {
  constructor(@InjectDatabase() private readonly db: DB) {}

  async all() {
    return this.db.select().from(categories);
  }
}
