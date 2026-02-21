import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { DatabaseModule } from "./database/database.module";
import { AnnouncementsModule } from "./announcements/announcements.module";
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [DatabaseModule, AnnouncementsModule, CategoriesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
