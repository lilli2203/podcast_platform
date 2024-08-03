"use client"

import NoContent from '@/components/NoContent'
import Spinner from '@/components/Spinner'
import PodcastItem from '@/components/PodcastItem'
import SearchInput from '@/components/SearchInput'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

const DiscoverPodcasts = ({ searchParams: { query } }: { searchParams: { query: string }}) => {
  const podcastList = useQuery(api.podcasts.getPodcastBySearch, { search: query || '' });

  return (
    <div className="flex flex-col space-y-9">
      <SearchInput />
      <div className="flex flex-col space-y-9">
        <h1 className="text-xl font-bold text-gray-100">
          {!query ? 'Explore Popular Podcasts' : 'Results for '}
          {query && <span className="text-gray-200">{query}</span>}
        </h1>
        {podcastList ? (
          <>
            {podcastList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {podcastList.map(({ _id, title, description, thumbnail }) => (
                  <PodcastItem 
                    key={_id}
                    image={thumbnail!}
                    title={title}
                    description={description}
                    id={_id}
                  />
                ))}
              </div>
            ) : <NoContent message="No podcasts found" />}
          </>
        ) : <Spinner />}
      </div>
    </div>
  )
}

export default DiscoverPodcasts
