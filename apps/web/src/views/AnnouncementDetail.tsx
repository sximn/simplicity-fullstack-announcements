import { useParams } from 'react-router-dom';
import { useAnnouncement } from '../api/announcements/use-announcement';

export default function AnnouncementDetail() {
  const { id } = useParams<{ id: string }>();

  const announcement = useAnnouncement(Number(id));
  return (
    <div>
      <h2>Announcement Detail {id}</h2>
      <p>Error {announcement?.error?.message}</p>
      <div>
        {announcement.isLoading ? (
          <div className="loading">Loading...</div>
        ) : announcement.isError ? (
          <div className="error">{announcement.error.message}</div>
        ) : (
          <div>
            {announcement.isFetching && <div className="fetching-top-bar">Updating...</div>}

            {announcement.isSuccess && (
              <div>
                <p>{announcement.data.title}</p>
                <p>{announcement.data.content}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
