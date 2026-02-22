import { Link } from 'react-router-dom';
import type { Announcement } from '../types';
import { formatDateTime } from '../utils/date';
import './AnnouncementsTable.css';
import EditIcon from './EditIcon';

type Props = {
  announcements: Announcement[];
};

export function AnnouncementsTable({ announcements }: Props) {
  return (
    <table className="table-fixed text-gray-800">
      <thead className="text-white bg-cyan-900">
        <tr className="py-4">
          <th className="w-1/12">Title</th>
          <th className="w-3/12">Publication date</th>
          <th className="w-3/12">Last update</th>
          <th className="w-3/12">Categories</th>
          <th className="w-1/12">Detail</th>
        </tr>
      </thead>
      <tbody>
        {announcements &&
          announcements.map((announcement: Announcement) => (
            <tr
              className="bg-white border border-cyan-800 hover:bg-lime-100 active:text-lime-100 active:bg-lime-700"
              key={announcement.id}
            >
              <td>{announcement.title}</td>
              <td>{formatDateTime({ date: announcement.publicationDate })}</td>
              <td>{formatDateTime({ date: announcement.updatedAt, strategy: 'without-time' })}</td>
              <td>{announcement.categories.map((c) => c.name).join(', ')}</td>
              <td>
                <Link className="edit-link" to={`/announcements/${announcement.id}`}>
                  <EditIcon />
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
