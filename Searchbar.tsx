'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Input } from './ui/input';
import { useDebounce } from '@/lib/useDebounce';

const Searchbar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const currentPath = usePathname();
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      router.push(`/discover?search=${encodeURIComponent(debouncedQuery)}`);
    } else if (!debouncedQuery && currentPath === '/discover') {
      router.push('/discover');
    }
  }, [router, currentPath, debouncedQuery]);

  return (
    <div className="relative mt-8">
      <Input 
        className="input-style py-6 pl-12 focus:outline-none ring-offset-orange-1"
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
    </div>
  );
}

export default Searchbar;
