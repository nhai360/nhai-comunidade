import { Feed } from "@/features/feed";
import { FeedProvider } from "@/contexts";
import { withAuth } from "../middlewares";

function FeedPage() {
  return (
    <FeedProvider>
      <Feed.DesktopLayout />
      <Feed.AppLayout />
    </FeedProvider>
  );
}

export default withAuth(FeedPage);
