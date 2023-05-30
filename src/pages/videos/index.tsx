import { VideosProvider } from "@/contexts/VideoContext";
import { Videos } from "@/features/videos";
import { withAuth } from "@/middlewares";

function VideosPage() {
  return (
    <>
      <VideosProvider>
        <Videos.DesktopLayout />
        <Videos.AppLayout />
      </VideosProvider>
    </>
  );
}

export default withAuth(VideosPage);
