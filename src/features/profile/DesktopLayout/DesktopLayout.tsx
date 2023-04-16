import { DefaultLayout } from "@/layouts/desktop";
import { UserProfileBanner, UserProfileInformation } from "@/features/profile";

export function DesktopLayout() {
  return (
    <DefaultLayout>
      <DefaultLayout.SimpleGrid>
        <UserProfileBanner />
        <UserProfileInformation />
      </DefaultLayout.SimpleGrid>
    </DefaultLayout>
  );
}
