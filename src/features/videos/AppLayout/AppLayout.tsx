import { DefaultLayout } from "@/layouts/app";
import { VideoCard } from "../VideoCard";
import { useVideoContext } from "@/contexts/VideoContext";

export function AppLayout() {
  const { videos } = useVideoContext();
  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content>
        {/* <FeaturedVideoCard /> */}
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </DefaultLayout.Content>
      <DefaultLayout.CreatePostButton />
      <DefaultLayout.BottomBar />
    </DefaultLayout>
  );
}
