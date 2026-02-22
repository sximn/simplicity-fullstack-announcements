import { useAnnouncements } from '../api/announcements/use-announcements';
import { AnnouncementsTable } from '../components/AnnouncementsTable';
import './Announcements.css';

export default function Announcements() {
  const announcements = useAnnouncements();

  return (
    <div>
      <h2>Announcements</h2>
      <div>
        {announcements.isLoading ? (
          <div className="loading">Loading...</div>
        ) : announcements.isError ? (
          <div className="error">{announcements.error.message}</div>
        ) : (
          <div>
            {announcements.isFetching && <div className="fetching-top-bar">Updating...</div>}

            {announcements.isSuccess && <AnnouncementsTable announcements={announcements.data} />}
          </div>
        )}
      </div>
    </div>
  );
}
