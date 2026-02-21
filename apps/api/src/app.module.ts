import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { DatabaseModule } from "./database/database.module";
import { AnnouncementsModule } from "./announcements/announcements.module";

@Module({
  imports: [DatabaseModule, AnnouncementsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
