import { useAnnouncements } from '../api/announcements/use-announcements';
import { AnnouncementsTable } from '../components/AnnouncementsTable';

export default function Announcements() {
  const announcements = useAnnouncements();

  return (
    <div>
      <h2 className="mb-4">Announcements</h2>
      <div>
        {announcements.isLoading && <div className="py-2 text-teal-900 font-bold">Loading...</div>}

        {announcements.isFetching && (
          <div className="py-2 text-teal-900 font-bold">Fetching...</div>
        )}

        {announcements.error instanceof Error && <div>{announcements.error.message}</div>}

        {announcements.isSuccess && (
          <div>
            <AnnouncementsTable announcements={announcements.data} />
          </div>
        )}
      </div>
    </div>
  );
}
