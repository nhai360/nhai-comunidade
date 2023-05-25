import { DefaultLayout } from "@/layouts/desktop";
import { VideoPlayerCard } from "@/features/video-player";
import { VideosSuggestions } from "@/features/videos/VideosSuggestions";

export function DesktopLayout() {
  return (
    <DefaultLayout>
      <DefaultLayout.GridWithSider>
        <VideoPlayerCard />
        <DefaultLayout.Sider>
          <VideosSuggestions />
        </DefaultLayout.Sider>
      </DefaultLayout.GridWithSider>
    </DefaultLayout>
  );
}
