import { withAuth } from "@/middlewares";

import { VideoPlayer } from "@/features/video-player";
import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";
import { ArticleDetails } from "@/features/articles/articlesDetails";

function ArticleDetailsPage() {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const isAdmin = user?.role?.name === "ADMIN";

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <ArticleDetails.AppLayout />
      <ArticleDetails.DesktopLayout />
    </>
  );
}

export default withAuth(ArticleDetailsPage);
