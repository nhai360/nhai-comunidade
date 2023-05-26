import { DefaultLayout } from "@/layouts/app";
import { VideosList } from "../VideosList";
import { useVideos } from "@/client/videos";
import { VideoCard } from "../VideoCard";

export function AppLayout() {
  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content></DefaultLayout.Content>
      <DefaultLayout.CreatePostButton />
      <DefaultLayout.BottomBar />
    </DefaultLayout>
  );
}
