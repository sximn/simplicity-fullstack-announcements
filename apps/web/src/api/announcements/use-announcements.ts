import { useQuery } from '@tanstack/react-query';
import { announcementQueryKeys } from './announcement-query-keys';
import type { Announcement, AnnouncementDto } from '../../types';

const announcementsFn = async () => {
  const response = await fetch('/api/announcements');

  if (!response.ok) {
    throw new Error('Failed to fetch announcement');
  }

  const res: AnnouncementDto[] = await response.json();

  return res.map((r) => {
    const announcement: Announcement = {
      id: r.id,
      title: r.title,
      publicationDate: new Date(r.publicationDate),
      updatedAt: new Date(r.updatedAt),
      categoryIds: r.categoryIds,
      content: '', // TODO: add content to the data model and return it
      createdAt: new Date(r.createdAt),
    };
    return announcement;
  });
};

export function useAnnouncements() {
  return useQuery({
    queryKey: announcementQueryKeys.all,
    queryFn: announcementsFn,
  });
}
