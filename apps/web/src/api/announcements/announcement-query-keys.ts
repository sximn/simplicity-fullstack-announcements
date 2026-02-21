export const announcementQueryKeys = {
  all: ['announcements'],
  detail: (id: number) => [...announcementQueryKeys.all, `detail ${id}`],
};
