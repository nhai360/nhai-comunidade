import { AppLayout } from "@/layouts";
import { CreatePostCard, PopularToday, MainTrends } from "@/features/timeline";

export default function Timeline() {
  return (
    <AppLayout>
      <AppLayout.GridWithSider>
        <AppLayout.Content>
          <CreatePostCard />
        </AppLayout.Content>
        <AppLayout.Sider>
          <MainTrends />
          <PopularToday />
        </AppLayout.Sider>
      </AppLayout.GridWithSider>
    </AppLayout>
  );
}
