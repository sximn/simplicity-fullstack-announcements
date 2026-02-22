import { Injectable, NotFoundException } from '@nestjs/common';
import { AnnouncementsRepository } from './announcements.repository';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { SelectCategory } from 'src/database/schema';

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

  async getAllAnnouncementsWithCategories(searchQuery?: string, categoryIds?: number[]) {
    const rawFlat = await this.announcementsRepo.allWithCategories(searchQuery, categoryIds);
    type AggregatedAnnouncements = (typeof rawFlat)[number]['announcement'] & {
      categories: Omit<SelectCategory, 'slug'>[];
    };

    const aggregated = rawFlat.reduce((acc, row) => {
      const item = acc.get(row.announcement.id);
      const category = row.category;

      if (item) {
        if (category) {
          item.categories.push(category);
        }
      } else {
        acc.set(row.announcement.id, {
          ...row.announcement,
          categories: category ? [category] : [],
        });
      }
      return acc;
    }, new Map<number, AggregatedAnnouncements>());

    const rawAggregatedCategories = Array.from(aggregated.values());

    return rawAggregatedCategories;
  }

  async findOne(id: number) {
    const raw = await this.announcementsRepo.findOne(id);
    if (!raw) {
      throw new NotFoundException('Announcement not found');
    }

    const { announcementsToCategories, ...announcementAttrs } = raw;
    return {
      ...announcementAttrs,
      categories: announcementsToCategories.map((cat) => {
        return cat.category;
      }),
    };
  }

  async update(id: number, dto: UpdateAnnouncementDto) {
    const updateData = {
      ...dto,
      id,
      publicationDate: dto.publicationDate ? new Date(dto.publicationDate) : undefined,
    };

    return this.announcementsRepo.update(updateData);
  }
}
