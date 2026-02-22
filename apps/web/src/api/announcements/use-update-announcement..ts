import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateAnnouncement, UpdateAnnouncementDto } from '../../types';
import { announcementQueryKeys } from './announcement-query-keys';

const updateAnnouncementFn = async (updatedAnnouncement: UpdateAnnouncement) => {
  const updateDto: UpdateAnnouncementDto = {
    title: updatedAnnouncement.title,
    content: updatedAnnouncement.content,
    publicationDate: updatedAnnouncement.publicationDate?.toISOString(),
    categoryIds: updatedAnnouncement.categories?.map((c) => c.id),
  };

  const response = await fetch(`/api/announcements/${updatedAnnouncement.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateDto),
  });

  if (!response.ok) {
    throw new Error('Failed to create announcement');
  }

  return response.json();
};

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAnnouncementFn,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [announcementQueryKeys.all] });
    },
  });
}
