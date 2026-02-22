import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

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

  @Get(':id')
  getAnnouncement(@Param('id') id: number) {
    return this.announcementsService.findOne(id);
  }

  @Put(':id')
  updateAnnouncement(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAnnouncementDto) {
    return this.announcementsService.update(id, dto);
  }
}
