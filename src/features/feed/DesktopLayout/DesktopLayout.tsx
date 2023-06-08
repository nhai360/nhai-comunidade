import { DefaultLayout } from "@/layouts/desktop";
import { CreatePostCard, PostFromUrl } from "@/features/posts";
import { FeedList, MainTrends } from "@/features/feed";
import CardHighlight from "../CardHighlight";

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
          <CardHighlight/>

          {/* <PopularToday />
              <Suggestions />*/}
        </DefaultLayout.Sider>
      </DefaultLayout.GridWithSider>
    </DefaultLayout>
  );
}
