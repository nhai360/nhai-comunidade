import { AppLayout } from "@/layouts";

import { UserProfileBanner, UserProfileInformation } from "@/features/profile";

export default function Profile() {
  return (
    <AppLayout>
      <AppLayout.SimpleGrid>
        <UserProfileBanner />
        <UserProfileInformation />
      </AppLayout.SimpleGrid>
    </AppLayout>
  );
}
