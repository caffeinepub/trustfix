import { useState, useEffect } from 'react';
import { servicesData } from '@/data/services';

interface SearchResult {
  name: string;
  category: string;
}

export function useSearchServices(query: string) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      const results: SearchResult[] = [];
      const lowerQuery = query.toLowerCase();

      Object.entries(servicesData).forEach(([category, services]) => {
        services.forEach((service) => {
          if (
            service.name.toLowerCase().includes(lowerQuery) ||
            category.toLowerCase().includes(lowerQuery) ||
            service.description.toLowerCase().includes(lowerQuery)
          ) {
            results.push({
              name: service.name,
              category,
            });
          }
        });
      });

      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return { searchResults, isSearching };
}
