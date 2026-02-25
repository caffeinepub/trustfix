import { useMemo } from 'react';
import { categoryOrder, servicesData } from '../data/services';

export interface SearchResult {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  image: string;
}

export function useSearchServices(query: string): SearchResult[] {
  return useMemo(() => {
    if (!query || query.trim().length < 2) return [];
    const q = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    for (const categoryId of categoryOrder) {
      const category = servicesData[categoryId];
      if (!category) continue;

      // Match category name itself
      if (category.name.toLowerCase().includes(q)) {
        results.push({
          id: category.id,
          name: category.name,
          category: category.name,
          categoryId: category.id,
          image: category.image,
        });
      }

      // Match individual services
      for (const service of category.services) {
        if (
          service.name.toLowerCase().includes(q) ||
          service.description.toLowerCase().includes(q)
        ) {
          results.push({
            id: service.id,
            name: service.name,
            category: category.name,
            categoryId: category.id,
            image: service.image,
          });
        }
      }
    }

    // Deduplicate by id
    const seen = new Set<string>();
    return results.filter((r) => {
      if (seen.has(r.id)) return false;
      seen.add(r.id);
      return true;
    }).slice(0, 8);
  }, [query]);
}
