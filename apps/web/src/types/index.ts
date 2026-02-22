export type CategoryDto = {
  id: number;
  name: string;
  slug: string;
};

export type AnnouncementDto = {
  id: number;
  title: string;
  content: string;
  publicationDate: string;
  updatedAt: string;
  categories: CategoryDto[];
  createdAt: string;
};

export type Announcement = {
  id: number;
  title: string;
  content: string;
  categories: Array<Omit<CategoryDto, 'slug'>>;
  publicationDate: Date;
  updatedAt: Date;
  createdAt: Date;
};

export type CreateAnnouncement = Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateAnnouncement = Partial<CreateAnnouncement> & { id: Announcement['id'] };

export type CreateAnnouncementDto = {
  title: string;
  content: string;
  publicationDate: string;
  categoryIds: number[];
};
