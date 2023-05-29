import { Videos } from "@/features/videos";
import { withAuth } from "@/middlewares";

function VideosPage() {
  return (
    <>
      <Videos.DesktopLayout />
      <Videos.AppLayout />
    </>
  );
}

export default withAuth(VideosPage);
