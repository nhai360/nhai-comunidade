import { Videos } from "@/features/videos";
import { withAuth } from "@/middlewares";

function VideosPage() {
  return <Videos.DesktopLayout />;
}

export default withAuth(VideosPage);
