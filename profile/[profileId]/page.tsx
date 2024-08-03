"use client";

import { useQuery } from "convex/react";

import NoContent from "@/components/NoContent";
import LoadingIndicator from "@/components/LoadingIndicator";
import PodcastItem from "@/components/PodcastItem";
import UserProfile from "@/components/UserProfile";
import { api } from "@/convex/_generated/api";

const UserProfilePage = ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const userData = useQuery(api.users.fetchUserById, {
    clerkId: params.userId,
  });
  const userPodcasts = useQuery(api.podcasts.fetchPodcastsByAuthorId, {
    authorId: params.userId,
  });

  if (!userData || !userPodcasts) return <LoadingIndicator />;

  return (
    <section className="mt-8 flex flex-col">
      <h1 className="text-xl font-bold text-gray-900 text-center">
        Profile of Podcaster
      </h1>
      <div className="mt-4 flex flex-col gap-4 items-center md:flex-row">
        <UserProfile
          profileImage={userData?.profileImage!}
          fullName={userData?.fullName!}
          podcastList={userPodcasts!}
        />
      </div>
      <section className="mt-8 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-900">Podcasts Created</h2>
        {userPodcasts && userPodcasts.podcasts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userPodcasts.podcasts
              .slice(0, 4)
              .map((podcast) => (
                <PodcastItem
                  key={podcast._id}
                  thumbnailUrl={podcast.thumbnailUrl!}
                  title={podcast.title!}
                  description={podcast.description}
                  podcastId={podcast._id}
                />
              ))}
          </div>
        ) : (
          <NoContent
            message="You haven't created any podcasts yet."
            actionLink="/create-podcast"
            actionText="Start a New Podcast"
          />
        )}
      </section>
    </section>
  );
};

export default UserProfilePage;
