import { DefaultLayout } from "@/layouts/app";
import { FeedList } from "../FeedList";

export function AppLayout() {
  return (
    <DefaultLayout>
      <FeedList />
    </DefaultLayout>
  );
}
