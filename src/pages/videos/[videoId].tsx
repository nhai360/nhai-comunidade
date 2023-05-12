import { withAuth } from "@/middlewares";

import { VideoPlayer } from "@/features/video-player";
import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";

function VideoPage() {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const isEnabled =
    user?.email.endsWith("@nhai360.com") ||
    user?.email.endsWith("@catency.com");

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      <VideoPlayer.DesktopLayout />
    </>
  );
}

export default withAuth(VideoPage);
