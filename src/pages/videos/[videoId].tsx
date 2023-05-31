import { withAuth } from "@/middlewares";

import { VideoPlayer } from "@/features/video-player";

function VideoPage() {
  return (
    <>
      <VideoPlayer.DesktopLayout />
      <VideoPlayer.AppLayout />
    </>
  );
}

export default withAuth(VideoPage);
