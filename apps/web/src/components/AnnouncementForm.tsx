import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useEffect } from 'react';
import type { Announcement } from '../types';
import './AnnouncementForm.css';

export interface AnnouncementFormValues {
  title: string;
  content: string;
  categories: { value: number; label: string }[];
  publicationDate: string;
}

interface Props {
  initialData?: Announcement;
  allCategories: { value: number; label: string }[];
  onSubmit: (data: AnnouncementFormValues) => void;
  isPending: boolean;
  submitLabel?: string;
}

export function AnnouncementForm({
  initialData,
  allCategories,
  onSubmit,
  isPending,
  submitLabel = 'Save Announcement',
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AnnouncementFormValues>();

  useEffect(() => {
    if (initialData) {
      const date = new Date(initialData.publicationDate);
      const formattedDate = date.toISOString().slice(0, 16);

      reset({
        title: initialData.title,
        content: initialData.content,
        publicationDate: formattedDate,
        categories:
          initialData.categories?.map((c: any) => ({
            value: c.id,
            label: c.name,
          })) || [],
      });
    } else {
      reset({
        title: '',
        content: '',
        categories: [],
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          Title
          <input
            type="text"
            className={errors.title ? 'input-error' : ''}
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <span className="error-message">{errors.title.message}</span>}
        </label>
      </div>

      <div>
        <label>
          Content
          <textarea
            className={errors.content ? 'input-error' : ''}
            {...register('content', {
              required: 'Content cannot be empty',
            })}
          />
          {errors.content && <span className="error-message">{errors.content.message}</span>}
        </label>
      </div>

      <div>
        <label>
          Categories
          <Controller
            name="categories"
            control={control}
            rules={{ required: 'Select at least one category' }}
            render={({ field }) => (
              <div className={errors.categories ? 'select-error' : ''}>
                <Select {...field} isMulti options={allCategories} />
              </div>
            )}
          />
          {errors.categories && <span className="error-message">{errors.categories.message}</span>}
        </label>
      </div>

      <div>
        <label>
          Publication Date
          <input
            type="datetime-local"
            className={errors.publicationDate ? 'input-error' : ''}
            {...register('publicationDate', { required: 'Select publication date' })}
          />
          {errors.publicationDate && (
            <span className="error-message">{errors.publicationDate.message}</span>
          )}
        </label>
      </div>

      <div className="button-container">
        <button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
