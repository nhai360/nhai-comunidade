import { LivesProvider } from "@/contexts/LiveContext";
import { VideosProvider } from "@/contexts/VideoContext";
import { Videos } from "@/features/videos";
import { withAuth } from "@/middlewares";

function VideosPage() {
  return (
    <>
      <LivesProvider>
        <VideosProvider>
          <Videos.DesktopLayout />
          <Videos.AppLayout />
        </VideosProvider>
      </LivesProvider>
    </>
  );
}

export default withAuth(VideosPage);
