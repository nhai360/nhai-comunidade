import { DefaultLayout } from "@/layouts/app";
import { VideoPlayerCard } from "../VideoPlayerCard";
import BtnGoBack from "@/ui/BtnGoBack";

export function AppLayout() {
  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content>
        <div style={{ margin: "8px 0 12px" }}>
          <BtnGoBack url={"/videos"} />
        </div>
        <VideoPlayerCard isMobile />
      </DefaultLayout.Content>
      <DefaultLayout.CreatePostButton />
      <DefaultLayout.BottomBar />
    </DefaultLayout>
  );
}
