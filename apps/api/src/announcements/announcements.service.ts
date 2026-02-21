import { Injectable } from "@nestjs/common";
import { AnnouncementsRepository } from "./announcements.repository";

@Injectable()
export class AnnouncementsService {
  constructor(private readonly announcementsRepo: AnnouncementsRepository) {}

  async getAllAnnouncements() {
    return this.announcementsRepo.all();
  }
}
