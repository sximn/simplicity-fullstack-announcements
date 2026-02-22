import { useParams } from 'react-router-dom';
import { useAnnouncement } from '../api/announcements/use-announcement';
import { useUpdateAnnouncement } from '../api/announcements/use-update-announcement.';
import { useCategories } from '../api/categories/use-categories';
import { AnnouncementForm, type AnnouncementFormValues } from '../components/AnnouncementForm';
import type { UpdateAnnouncement } from '../types';

export default function AnnouncementDetail() {
  const { id } = useParams<{ id: string }>();
  const numId = Number(id);

  const { data, isLoading, isError, error } = useAnnouncement(numId);
  const categories = useCategories();
  const updateMutation = useUpdateAnnouncement();

  const allCategoryOptions =
    categories.data?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  const handleUpdate = (formData: AnnouncementFormValues) => {
    const updateAnnouncement: UpdateAnnouncement = {
      ...formData,
      id: numId,
      publicationDate: new Date(formData.publicationDate),
      categories: formData.categories.map((c) => ({ id: c.value, name: c.label })),
    };
    updateMutation.mutate(updateAnnouncement);
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">{error.message}</div>;

  return (
    <div>
      <h2>Edit Announcement {id}</h2>
      <AnnouncementForm
        initialData={data}
        allCategories={allCategoryOptions}
        onSubmit={handleUpdate}
        isPending={updateMutation.isPending}
        submitLabel="Update Announcement"
      />
    </div>
  );
}
