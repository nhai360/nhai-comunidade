import { DefaultLayout } from "@/layouts/app";
import { VideoCard } from "../VideoCard";
import { useVideoContext } from "@/contexts/VideoContext";
import { Typography } from "@/ui";
import { FeaturedVideoCard } from "../FeaturedVideoCard";

export function AppLayout() {
  const { videos } = useVideoContext();
  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content>
        <FeaturedVideoCard isMobile />
        <Typography.Text
          size="h3"
          style={{ textAlign: "center", margin: "32px 0 8px" }}
        >
          Vídeos sugeridos
        </Typography.Text>
        {videos.map((video) => (
          <VideoCard hasHover={false} key={video.id} video={video} />
        ))}
      </DefaultLayout.Content>
      <DefaultLayout.CreatePostButton />
      <DefaultLayout.BottomBar />
    </DefaultLayout>
  );
}
