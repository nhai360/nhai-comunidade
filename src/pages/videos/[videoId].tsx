import { withAuth } from "@/middlewares";

import { VideoPlayer } from "@/features/video-player";
function VideoPage() {
  return (
    <>
      <VideoPlayer.DesktopLayout />
    </>
  );
}

export default withAuth(VideoPage);
