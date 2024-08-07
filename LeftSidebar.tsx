'use client';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { SignedIn, SignedOut, useClerk, UserProfile } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useAudio } from '@/providers/AudioProvider';
import { Search } from 'lucide-react'; // Assuming you're using Lucide icons
import { useToggle } from '@/hooks/useToggle'; // Custom hook for toggle state

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, user } = useClerk();
  const { audio } = useAudio();
  const [isSettingsOpen, toggleSettings] = useToggle(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className={cn("left_sidebar h-[calc(100vh-5px)]", {
      'h-[calc(100vh-140px)]': audio?.audioUrl
    })}>
      <nav className="flex flex-col gap-6">
        <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center">
          <Image src="/icons/logo.svg" alt="logo" width={23} height={27} />
          <h1 className="text-24 font-extrabold text-white max-lg:hidden">Podcastr</h1>
        </Link>

        <div className="flex items-center gap-4 px-4 mb-4">
          <Search className="text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-gray-800 text-white px-2 py-1 rounded-lg placeholder-gray-500 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {sidebarLinks.map(({ route, label, imgURL }) => {
          const isActive = pathname === route || pathname.startsWith(`${route}/`);

          return (
            <Link href={route} key={label} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start", {
              'bg-nav-focus border-r-4 border-orange-1': isActive
            })}>
              <Image src={imgURL} alt={label} width={24} height={24} />
              <p>{label}</p>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-4 px-4 mt-auto">
        <SignedIn>
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleSettings()}>
            {user?.profileImageUrl && (
              <Image src={user.profileImageUrl} alt="Profile" width={40} height={40} className="rounded-full" />
            )}
            <div className="text-white-1">
              <p className="font-semibold">{user?.fullName || 'User'}</p>
              <p className="text-gray-300 text-sm">{user?.emailAddress || ''}</p>
            </div>
          </div>
          {isSettingsOpen && (
            <div className="mt-4 bg-gray-900 rounded-lg shadow-md p-4">
              <Link href="/profile" className="block text-white-1 py-2 hover:bg-gray-800 rounded-md">Profile</Link>
              <Link href="/settings" className="block text-white-1 py-2 hover:bg-gray-800 rounded-md">Settings</Link>
              <Button className="text-16 w-full bg-red-600 mt-2 font-extrabold" onClick={() => signOut(() => router.push('/'))}>
                Log Out
              </Button>
            </div>
          )}
        </SignedIn>
        <SignedOut>
          <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
            <Button asChild className="text-16 w-full bg-orange-1 font-extrabold">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>
        </SignedOut>
      </div>
    </section>
  );
};

export default LeftSidebar;
