import { DefaultLayout } from "@/layouts/desktop";
import { CreatePostCard, PostFromUrl } from "@/features/posts";
import { FeedList, MainTrends } from "@/features/feed";
import CardHighlight from "../CardHighlight";
import { useAuthContext } from "@/contexts";
import { useUser } from "@/client/users";

export function DesktopLayout() {
  const { session } = useAuthContext();

  const { user } = useUser({
    id: session?.userId,
  });

  const isAdmin = user?.role?.name === "ADMIN";
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
          {isAdmin && <CardHighlight />}

          {/* <PopularToday />
              <Suggestions />*/}
        </DefaultLayout.Sider>
      </DefaultLayout.GridWithSider>
    </DefaultLayout>
  );
}
