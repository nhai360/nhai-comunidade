import { AppLayout } from "@/layouts";
import { CreatePostCard, MainTrends } from "@/features/timeline";

export default function Timeline() {
  return (
    <AppLayout>
      <AppLayout.GridWithSider>
        <AppLayout.Content>
          <CreatePostCard />
        </AppLayout.Content>
        <AppLayout.Sider>
          <MainTrends />
        </AppLayout.Sider>
      </AppLayout.GridWithSider>
    </AppLayout>
  );
}
