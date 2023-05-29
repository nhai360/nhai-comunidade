import { DefaultLayout } from "@/layouts/app";
import { FeaturedVideoCard } from "../FeaturedVideoCard";
import { useVideos } from "@/client/videos";
import { VideoCard } from "../VideoCard";

export function AppLayout() {
  const { videos } = useVideos();
  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content>
        <FeaturedVideoCard />
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </DefaultLayout.Content>
      <DefaultLayout.CreatePostButton />
      <DefaultLayout.BottomBar />
    </DefaultLayout>
  );
}
