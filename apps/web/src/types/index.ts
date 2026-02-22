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
  categories: string[];
  publicationDate: Date;
  updatedAt: Date;
  createdAt: Date;
};

export type CreateAnnouncement = Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>;
