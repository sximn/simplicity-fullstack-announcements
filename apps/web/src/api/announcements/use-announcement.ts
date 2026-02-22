import { useQuery } from '@tanstack/react-query';
import { announcementQueryKeys } from './announcement-query-keys';
import type { Announcement, AnnouncementDto } from '../../types';

const announcementFn = async (id: number) => {
  const response = await fetch(`/api/announcements/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch announcement');
  }

  const res: AnnouncementDto = await response.json();

  const announcement: Announcement = {
    id: res.id,
    title: res.title,
    content: res.content,
    publicationDate: new Date(res.publicationDate),
    updatedAt: new Date(res.updatedAt),
    categories: res.categories.map((c) => c.name),
    createdAt: new Date(res.createdAt),
  };
  return announcement;
};

export function useAnnouncement(id: number) {
  return useQuery({
    queryKey: announcementQueryKeys.detail(id),
    queryFn: async () => {
      return await announcementFn(id);
    },
  });
}
