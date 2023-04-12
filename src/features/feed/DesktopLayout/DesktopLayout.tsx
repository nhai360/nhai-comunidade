import { DefaultLayout } from "@/layouts/desktop";
import { CreatePostCard, PostFromUrl } from "@/features/posts";
import {
  FeedList,
  MainTrends,
  PopularToday,
  Suggestions,
} from "@/features/feed";
import { FeatureDecoder, useFeatureFlag } from "@/lib/features";

export function DesktopLayout() {
  const { isEnabled: isEnabledArticlesSection } = useFeatureFlag(
    FeatureDecoder.Values.ARTICLES_SECTION,
  );

  return (
    <DefaultLayout>
      <DefaultLayout.GridWithSider>
        <DefaultLayout.Content css={{ gap: "$6" }}>
          <CreatePostCard />
          <FeedList />
          <PostFromUrl />
        </DefaultLayout.Content>
        <DefaultLayout.Sider>
          <MainTrends />
          {isEnabledArticlesSection && (
            <>
              <PopularToday />
              <Suggestions />
            </>
          )}
        </DefaultLayout.Sider>
      </DefaultLayout.GridWithSider>
    </DefaultLayout>
  );
}
