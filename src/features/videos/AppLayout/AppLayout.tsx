import { DefaultLayout } from "@/layouts/app";
import { VideoCard } from "../VideoCard";
import { useVideoContext } from "@/contexts/VideoContext";
import { Typography } from "@/ui";
import { FeaturedVideoCard } from "../FeaturedVideoCard";
import { useLiveContext } from "@/contexts/LiveContext";
import { LiveWatchCard } from "@/features/lives/LiveWatchCard";

export function AppLayout() {
  const { videos } = useVideoContext();
  const { lives } = useLiveContext();
  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content>
        <FeaturedVideoCard isMobile />
        <Typography.Text
          size="h3"
          style={{ textAlign: "center", margin: "32px 0 8px" }}
        >
          Lives para assistir
        </Typography.Text>
        {lives.map((live) => (
          <LiveWatchCard key={live.id} live={live} />
        ))}
        <Typography.Text
          size="h3"
          style={{ textAlign: "center", margin: "32px 0 8px" }}
        >
          Vídeos sugeridos
        </Typography.Text>
        {videos
          .sort((a, b) =>
            parseInt(a.createdAt.replace(/[^\d]/g, "")) > parseInt(b.createdAt.replace(/[^\d]/g, ""))
              ? -1
              : 1
          )
          .map((video) => (
            <VideoCard hasHover={false} key={video.id} video={video} />
          ))
        }
      </DefaultLayout.Content>
      <DefaultLayout.CreatePostButton />
      <DefaultLayout.BottomBar />
    </DefaultLayout>
  );
}
