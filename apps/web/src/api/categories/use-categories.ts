import { useQuery } from '@tanstack/react-query';
import { categoryQueryKeys } from './category-query-keys';
import type { CategoryDto } from '../../types';

const categoriesFn = async () => {
  const response = await fetch('/api/categories');

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const res: CategoryDto[] = await response.json();

  return res;
};

export function useCategories() {
  return useQuery({
    queryKey: categoryQueryKeys.all,
    queryFn: categoriesFn,
  });
}
