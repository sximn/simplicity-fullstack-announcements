import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateAnnouncement } from '../../types';
import { announcementQueryKeys } from './announcement-query-keys';

const createAnnouncementFn = async (newAnnouncement: CreateAnnouncement) => {
  const response = await fetch('/api/announcements', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAnnouncement),
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
