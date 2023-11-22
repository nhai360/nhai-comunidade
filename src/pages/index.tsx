import { Feed } from "@/features/feed";
import { withAuth } from "../middlewares";
import { FeedProvider } from "@/contexts";

function FeedPage() {
  return (
    <FeedProvider>
      <Feed.DesktopLayout />
      <Feed.AppLayout />
    </FeedProvider>
  );
}

export default withAuth(FeedPage);
