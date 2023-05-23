import { DefaultLayout } from "@/layouts/app";

export function AppLayout() {
  return (
    <DefaultLayout>
      <DefaultLayout.Header />
      <DefaultLayout.Content>

      </DefaultLayout.Content>
      <DefaultLayout.CreatePostButton />
      <DefaultLayout.BottomBar />
    </DefaultLayout>
  );
}
