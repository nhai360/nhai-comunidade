import { AppLayout } from "@/layouts";

import { CreatePostCard, PostFromUrl } from "@/features/posts";
import {
  PopularToday,
  MainTrends,
  FeedList,
  Suggestions,
} from "@/features/feed";
import { FeedProvider } from "@/contexts";
import { withAuth } from "../middlewares";
import { FeatureDecoder, useFeatureFlag } from "@/lib/features";

function Feed() {
  const { isEnabled: isEnabledArticlesSection } = useFeatureFlag(
    FeatureDecoder.Values.ARTICLES_SECTION,
  );

  return (
    <FeedProvider>
      <AppLayout>
        <AppLayout.GridWithSider>
          <AppLayout.Content css={{ gap: "$6" }}>
            <CreatePostCard />
            <FeedList />
            <PostFromUrl />
          </AppLayout.Content>
          <AppLayout.Sider>
            <MainTrends />
            {isEnabledArticlesSection && (
              <>
                <PopularToday />
                <Suggestions />
              </>
            )}
          </AppLayout.Sider>
        </AppLayout.GridWithSider>
      </AppLayout>
    </FeedProvider>
  );
}

export default withAuth(Feed);
