import { AppLayout } from "@/layouts";

import { CreatePostCard } from "@/features/posts";
import {
  PopularToday,
  MainTrends,
  FeedList,
  Suggestions,
} from "@/features/feed";
import { FeedProvider } from "@/contexts";
import { withAuth } from "../middlewares";

function Feed() {
  return (
    <FeedProvider>
      <AppLayout>
        <AppLayout.GridWithSider>
          <AppLayout.Content css={{ gap: "$6" }}>
            <CreatePostCard />
            <FeedList />
          </AppLayout.Content>
          <AppLayout.Sider>
            <MainTrends />
            <PopularToday />
            <Suggestions />
          </AppLayout.Sider>
        </AppLayout.GridWithSider>
      </AppLayout>
    </FeedProvider>
  );
}

export default withAuth(Feed);
