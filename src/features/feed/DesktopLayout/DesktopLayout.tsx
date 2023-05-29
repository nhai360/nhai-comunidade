import { DefaultLayout } from "@/layouts/desktop";
import { CreatePostCard, PostFromUrl } from "@/features/posts";
import { FeedList, MainTrends } from "@/features/feed";

export function DesktopLayout() {
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
          {/* <PopularToday />
              <Suggestions />*/}
        </DefaultLayout.Sider>
      </DefaultLayout.GridWithSider>
    </DefaultLayout>
  );
}
