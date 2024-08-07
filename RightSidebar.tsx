'use client';

import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Carousel from './Carousel';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import LoaderSpinner from './LoaderSpinner';
import { useAudio } from '@/providers/AudioProvider';
import { cn } from '@/lib/utils';

const RightSidebar = () => {
  const { user } = useUser();
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);
  const recentActivity = useQuery(api.activity.getRecentActivity); // Assuming there's an endpoint for recent activity
  const suggestedPodcasts = useQuery(api.podcasts.getSuggestedPodcasts); // Assuming there's an endpoint for suggested podcasts
  const router = useRouter();

  const { audio } = useAudio();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topPodcasters && recentActivity && suggestedPodcasts) {
      setLoading(false);
    }
  }, [topPodcasters, recentActivity, suggestedPodcasts]);

  if (loading) {
    return <LoaderSpinner size={40} color="orange-500" />;
  }

  return (
    <section className={cn('right_sidebar h-[calc(100vh-5px)]', {
      'h-[calc(100vh-140px)]': audio?.audioUrl
    })}>
      <SignedIn>
        <Link href={`/profile/${user?.id}`} className="flex items-center gap-3 pb-12">
          <UserButton />
          <div className="flex w-full items-center justify-between">
            <h1 className="text-16 truncate font-semibold text-white-1">
              {user?.firstName} {user?.lastName}
            </h1>
            <Image 
              src="/icons/right-arrow.svg"
              alt="arrow"
              width={24}
              height={24}
            />
          </div>
        </Link>
      </SignedIn>
      <section className="pb-12">
        <Header headerTitle="Fans Like You" />
        <Carousel fansLikeDetail={topPodcasters!} />
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Top Podcasters" />
        <div className="flex flex-col gap-6">
          {topPodcasters?.slice(0, 3).map((podcaster) => (
            <div key={podcaster._id} className="flex cursor-pointer justify-between" onClick={() => router.push(`/profile/${podcaster.clerkId}`)}>
              <figure className="flex items-center gap-2">
                <Image
                  src={podcaster.imageUrl}
                  alt={podcaster.name}
                  width={44}
                  height={44}
                  className="aspect-square rounded-lg"
                />
                <h2 className="text-14 font-semibold text-white-1">{podcaster.name}</h2>
              </figure>
              <div className="flex items-center">
                <p className="text-12 font-normal text-white-1">{podcaster.totalPodcasts} podcasts</p>
              </div> 
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Recent Activity" />
        <div className="flex flex-col gap-6">
          {recentActivity?.slice(0, 3).map((activity) => (
            <div key={activity._id} className="flex cursor-pointer items-start gap-3" onClick={() => router.push(`/activity/${activity._id}`)}>
              <Image
                src={activity.imageUrl || '/icons/default-activity.svg'}
                alt={activity.title}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div className="flex flex-col">
                <h2 className="text-14 font-semibold text-white-1">{activity.title}</h2>
                <p className="text-12 font-normal text-white-2">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Suggested Podcasts" />
        <div className="flex flex-col gap-6">
          {suggestedPodcasts?.slice(0, 3).map((podcast) => (
            <div key={podcast._id} className="flex cursor-pointer items-center gap-3" onClick={() => router.push(`/podcast/${podcast._id}`)}>
              <Image
                src={podcast.coverImageUrl || '/icons/default-podcast.svg'}
                alt={podcast.title}
                width={50}
                height={50}
                className="rounded-lg"
              />
              <div className="flex flex-col">
                <h2 className="text-14 font-semibold text-white-1">{podcast.title}</h2>
                <p className="text-12 font-normal text-white-2">By {podcast.creatorName}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default RightSidebar;
