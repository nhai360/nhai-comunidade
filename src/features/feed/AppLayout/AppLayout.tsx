import { DefaultLayout } from "@/layouts/app";
import { FeedList } from "../FeedList";
import CardHighlight from "../CardHighlight";

export function AppLayout() {
  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content>
      <CardHighlight isMobile={true} />
        <FeedList />
      </DefaultLayout.Content>
      <DefaultLayout.CreatePostButton />
      <DefaultLayout.BottomBar />
    </DefaultLayout>
  );
}
