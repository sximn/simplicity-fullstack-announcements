import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateAnnouncement, CreateAnnouncementDto } from '../../types';
import { announcementQueryKeys } from './announcement-query-keys';

const createAnnouncementFn = async (newAnnouncement: CreateAnnouncement) => {
  const createAnnouncementDto: CreateAnnouncementDto = {
    title: newAnnouncement.title,
    content: newAnnouncement.content,
    publicationDate: newAnnouncement.publicationDate.toISOString(),
    categoryIds: newAnnouncement.categories.map((c) => c.id),
  };

  const response = await fetch('/api/announcements', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createAnnouncementDto),
  });

  if (!response.ok) {
    throw new Error('Failed to create announcement');
  }

  return response.json();
};

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAnnouncementFn,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [announcementQueryKeys.all] });
    },
  });
}
