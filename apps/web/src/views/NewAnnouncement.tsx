import { useCategories } from '../api/categories/use-categories';
import { AnnouncementForm, type AnnouncementFormValues } from '../components/AnnouncementForm';
import type { CreateAnnouncement } from '../types';
import { useCreateAnnouncement } from '../api/announcements/use-create-announcement';
import { useNavigate } from 'react-router-dom';

export default function NewAnnouncement() {
  const navigate = useNavigate();
  const categories = useCategories();
  const createMutation = useCreateAnnouncement();

  const allCategoryOptions =
    categories.data?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  const handleCreate = (formData: AnnouncementFormValues) => {
    const createAnnouncement: CreateAnnouncement = {
      ...formData,
      publicationDate: new Date(formData.publicationDate),
      categories: formData.categories.map((c) => ({ id: c.value, name: c.label })),
    };
    createMutation.mutate(createAnnouncement, {
      onSuccess: () => {
        navigate('/announcements');
      },
    });
  };

  return (
    <div>
      <h2>Create Announcement</h2>
      <AnnouncementForm
        allCategories={allCategoryOptions}
        onSubmit={handleCreate}
        isPending={createMutation.isPending}
        submitLabel="Publish" // "Create Announcement" to signify the intent
      />
    </div>
  );
}
