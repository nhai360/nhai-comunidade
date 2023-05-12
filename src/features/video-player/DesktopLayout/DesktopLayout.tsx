import { DefaultLayout } from "@/layouts/desktop";
import { VideoPlayerCard } from "@/features/video-player";

export function DesktopLayout() {
  return (
    <DefaultLayout>
      <DefaultLayout.GridWithSider>
        <VideoPlayerCard />
      </DefaultLayout.GridWithSider>
    </DefaultLayout>
  );
}
