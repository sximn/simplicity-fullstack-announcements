import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  create(@Body() dto: CreateAnnouncementDto) {
    return this.announcementsService.create(dto);
  }

  @Get()
  async getAll() {
    return this.announcementsService.getAllAnnouncementsWithCategories();
  }

  @Get('/:id')
  getAnnouncement(@Param('id') id: number) {
    return this.announcementsService.findOne(id);
  }
}
