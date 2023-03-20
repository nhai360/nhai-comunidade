import { AppLayout } from "@/layouts";

import { CreatePostCard } from "@/features/posts";
import {
  PopularToday,
  MainTrends,
  FeedList,
  Suggestions,
} from "@/features/feed";
import { withAuth } from "@/middlewares";

function Feed() {
  return (
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
  );
}

export default withAuth(Feed);
