import { DefaultLayout } from "@/layouts/desktop";

import { MainTrends } from "@/features/feed";
import { FeaturedVideoCard, VideosList } from "@/features/videos";

export function DesktopLayout() {
  return (
    <DefaultLayout>
      <DefaultLayout.GridWithSider>
        <DefaultLayout.Content css={{ gap: "$6" }}>
          <FeaturedVideoCard />
          <VideosList />
        </DefaultLayout.Content>
        <DefaultLayout.Sider>
          <MainTrends />
        </DefaultLayout.Sider>
      </DefaultLayout.GridWithSider>
    </DefaultLayout>
  );
}
