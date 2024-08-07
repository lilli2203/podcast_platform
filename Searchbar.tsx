'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Input } from './ui/input';
import { useDebounce } from '@/lib/useDebounce';
import { Button } from './ui/button';
import { LoaderSpinner } from './LoaderSpinner'; // Assume a custom loader component is available
import { useLocalStorage } from '@/hooks/useLocalStorage'; // Custom hook for local storage management

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage('recentSearches', []);
  const router = useRouter();
  const currentPath = usePathname();
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      router.push(`/discover?search=${encodeURIComponent(debouncedQuery)}`);
      addRecentSearch(debouncedQuery);
      setLoading(false);
    } else if (!debouncedQuery && currentPath === '/discover') {
      router.push('/discover');
    }
  }, [router, currentPath, debouncedQuery]);

  const addRecentSearch = (search: string) => {
    setRecentSearches(prev => {
      const updated = [search, ...prev].slice(0, 5); // Limit to 5 recent searches
      return [...new Set(updated)]; // Remove duplicates
    });
  };

  const clearSearch = () => {
    setQuery('');
    router.push('/discover');
  };

  return (
    <div className="relative mt-8">
      <Input 
        className="input-style py-6 pl-12 pr-10 focus:outline-none ring-offset-orange-1"
        placeholder='Search for podcasts'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Image 
        src="/icons/search.svg"
        alt="Search Icon"
        height={20}
        width={20}
        className="absolute left-4 top-3.5"
      />
      <Button 
        className="absolute right-4 top-3.5 text-sm text-gray-500"
        onClick={clearSearch}
        disabled={!query}
      >
        Clear
      </Button>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
          <LoaderSpinner size={40} color="orange-500" />
        </div>
      )}
      {recentSearches.length > 0 && (
        <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg mt-2 w-full max-h-60 overflow-y-auto z-10">
          <ul className="list-none p-2">
            {recentSearches.map((search, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setQuery(search);
                  router.push(`/discover?search=${encodeURIComponent(search)}`);
                }}
              >
                {search}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
