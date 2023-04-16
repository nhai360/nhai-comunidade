import { DefaultLayout } from "@/layouts/app";
import { UserProfileBanner, UserProfileInformation } from "@/features/profile";

export function AppLayout() {
  return (
    <DefaultLayout css={{ padding: 0 }}>
      <DefaultLayout.Header backUrl="/" />
      <main>
        <UserProfileBanner />
        <UserProfileInformation />
      </main>
    </DefaultLayout>
  );
}
