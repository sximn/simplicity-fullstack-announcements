export type AnnouncementDto = {
  id: number;
  title: string;
  publicationDate: string;
  updatedAt: string;
  categoryIds: number[];
  content: string;
  createdAt: string;
};

export type Announcement = {
  id: number;
  title: string;
  content: string;
  categoryIds: number[];
  publicationDate: Date;
  updatedAt: Date;
  createdAt: Date;
};

export type CreateAnnouncement = Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>;
