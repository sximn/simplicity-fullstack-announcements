import { Link } from 'react-router-dom';
import type { Announcement } from '../types';
import { formatDateTime } from '../utils/date';
import './AnnouncementsTable.css';

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
              <td>{announcement.categoryIds}</td>
              <td className="inline-flex border-none">
                <Link
                  className="p-2 text-cyan-800 hover:text-cyan-500"
                  to={`/announcements/${announcement.id}`}
                >
                  {/* <AiOutlineEdit /> */}
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
