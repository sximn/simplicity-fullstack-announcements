import { Injectable } from '@nestjs/common';
import { AnnouncementsRepository } from './announcements.repository';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(private readonly announcementsRepo: AnnouncementsRepository) {}

  async create(dto: CreateAnnouncementDto) {
    const announcementData = {
      title: dto.title,
      content: dto.content,
      publicationDate: new Date(dto.publicationDate),
    };

    return this.announcementsRepo.create({
      announcement: announcementData,
      categoryIds: dto.categoryIds,
    });
  }

  async getAllAnnouncements() {
    return this.announcementsRepo.all();
  }

  async getAllAnnouncementsWithCategories() {
    const rawAnnouncementsAndCategories = await this.announcementsRepo.allWithCategories();

    return rawAnnouncementsAndCategories.map((announcement) => {
      const { announcementsToCategories, ...announcementAttrs } = announcement;
      return {
        ...announcementAttrs,
        categories: announcementsToCategories.map((cat) => {
          return cat.category;
        }),
      };
    });
  }
}
