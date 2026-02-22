import { useCategories } from '../api/categories/use-categories';
import { AnnouncementForm, type AnnouncementFormValues } from '../components/AnnouncementForm';
import type { CreateAnnouncement } from '../types';
import { useCreateAnnouncement } from '../api/announcements/use-create-announcement';

export default function NewAnnouncement() {
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
    createMutation.mutate(createAnnouncement);
  };

  return (
    <div>
      <h2>Create Announcement</h2>
      <AnnouncementForm
        allCategories={allCategoryOptions}
        onSubmit={handleCreate}
        isPending={createMutation.isPending}
        submitLabel="Create Announcement"
      />
    </div>
  );
}
