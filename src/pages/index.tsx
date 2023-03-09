import { AppLayout } from "@/layouts";

import {
  CreatePostCard,
  PopularToday,
  MainTrends,
  PostsList,
} from "@/features/timeline";

export default function Timeline() {
  return (
    <AppLayout>
      <AppLayout.GridWithSider>
        <AppLayout.Content css={{ gap: "$6" }}>
          <CreatePostCard />
          <PostsList />
        </AppLayout.Content>
        <AppLayout.Sider>
          <MainTrends />
          <PopularToday />
        </AppLayout.Sider>
      </AppLayout.GridWithSider>
    </AppLayout>
  );
}
